// node build.mjs  — kordoc의 HWP→HWPX 변환만 브라우저용 한 파일로 (Node 전용 부분은 대체 조각으로)
import { createRequire } from 'module';
import path from 'path';
const here = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1');
const kd = path.join(here, '..', 'kd');
const require = createRequire(path.join(kd, 'package.json'));
const esbuild = require('esbuild');
const SH = (f) => path.join(here, 'shim', f);
const BUILTIN = /^(node:)?(fs|fs\/promises|path|os|child_process|url|crypto|stream|stream\/promises|events|worker_threads|http|https|net|tls|readline|assert|v8|perf_hooks|async_hooks|process|tty|string_decoder|querystring|dns|cluster|vm)$/;
const HEAVY = /^(sharp|onnxruntime-node|onnxruntime-web|@napi-rs\/canvas|canvas|tesseract\.js|pdfjs-dist.*|@rhwp\/core|@modelcontextprotocol\/.*|commander|zod|markdown-it|@hyzyla\/pdfium.*|@huggingface\/tokenizers.*|zxing-wasm.*)$/;
const used = new Set();
const plugin = {
  name: 'browser-shims',
  setup(b) {
    b.onResolve({ filter: /^(node:)?zlib$/ }, () => ({ path: SH('zlib.js') }));
    b.onResolve({ filter: /^(node:)?util$/ }, () => ({ path: SH('util.js') }));
    b.onResolve({ filter: /^(node:)?module$/ }, () => ({ path: SH('module.js') }));
    b.onResolve({ filter: /^(node:)?buffer$/ }, () => ({ path: require.resolve('buffer/') }));
    b.onResolve({ filter: BUILTIN }, (a) => { used.add(a.path); return { path: SH('empty.cjs') }; });
    b.onResolve({ filter: HEAVY }, (a) => { used.add(a.path); return { path: SH('empty.cjs') }; });
    /* hwpx·xlsx zip 읽기: jszip nodeStream(브라우저 미지원) → async('uint8array') 한 번에 (크기 한도 검사는 그대로 data 콜백에서) */
    const NS = 'const stream = file.nodeStream("nodebuffer");';
    const NS2 = 'const stream = (() => { const h = {}; const s = { on(e, f) { h[e] = f; return s; }, pause() {} }; file.async("uint8array").then((u) => { h.data && h.data(Buffer.from(u)); h.end && h.end(); }, (e) => { h.error && h.error(e); }); return s; })();';
    b.onLoad({ filter: /kordoc[\\/]dist[\\/].*\.js$/ }, async (a) => {
      const fs = await import('fs'); let src = fs.readFileSync(a.path, 'utf8');
      if (src.includes(NS)) { src = src.split(NS).join(NS2); used.add('nodeStream 패치 ' + a.path.split(/[\\/]/).pop()); }
      return { contents: src, loader: 'js', resolveDir: path.dirname(a.path) };
    });
  }
};
const r = await esbuild.build({
  entryPoints: [path.join(here, process.argv[2] || 'entry.js')], bundle: true, format: 'iife', platform: 'browser', target: 'es2020', minify: true,
  outfile: path.join(here, process.argv[3] || 'kordoc-conv.js'), nodePaths: [path.join(kd, 'node_modules')], mainFields: ['browser', 'module', 'main'],
  define: { 'import.meta.url': '"file:///kordoc.js"', 'process.env.NODE_ENV': '"production"' },
  inject: [path.join(here, 'shim', 'inject.js')], plugins: [plugin], metafile: true, logLevel: 'error',
  banner: { js: '/* kordoc ' + require(path.join(kd, 'node_modules/kordoc/package.json')).version + ' (MIT, chrisryugj/kordoc) — HWP→HWPX 변환만 브라우저용으로 묶음. 대체: zlib→pako, Buffer→buffer */' }
});
console.log('대체한 모듈:', [...used].join(', '));
const out = Object.values(r.metafile.outputs)[0];
console.log('크기:', Math.round(out.bytes / 1024) + 'KB');
const ins = Object.entries(r.metafile.inputs).sort((a, b) => b[1].bytes - a[1].bytes).slice(0, 12).map(([k, v]) => Math.round(v.bytes / 1024) + 'KB ' + k.replace(/.*node_modules[\\/]/, ''));
console.log(ins.join('\n'));
