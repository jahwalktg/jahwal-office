// node test.cjs <입력.hwp> <출력.hwpx> — 브라우저용 묶음이 그대로 도는지 시험
const fs = require('fs'), path = require('path');
globalThis.window = globalThis;
const src = fs.readFileSync(path.join(__dirname, 'kordoc-conv.js'), 'utf8');
new Function(src)();
const [, , inp, out] = process.argv;
const t = Date.now();
window.KordocConv.hwpToHwpx(new Uint8Array(fs.readFileSync(inp))).then((u8) => {
  fs.writeFileSync(out, Buffer.from(u8));
  console.log('ok', path.basename(inp), fs.statSync(inp).size, '->', u8.length, (Date.now() - t) + 'ms');
}).catch((e) => { console.log('fail', path.basename(inp), e && e.message); });
