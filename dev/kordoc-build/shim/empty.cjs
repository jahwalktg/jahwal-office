// 브라우저에 없는 Node 기능: 어떤 이름이든 「쓰면 오류」인 함수로 대신 (HWP→HWPX 변환 경로에서는 쓰지 않음)
const no = function (name) { return function () { throw new Error(name + ' 기능은 브라우저에서 쓰지 않습니다'); }; };
const base = {
  platform: () => 'browser', tmpdir: () => '/tmp', homedir: () => '/', cpus: () => [], EOL: '\n', sep: '/',
  existsSync: () => false, isMainThread: true, parentPort: null, workerData: null,
  basename: (p) => String(p).split(/[\\/]/).pop(), dirname: (p) => String(p).replace(/[\\/][^\\/]*$/, ''),
  join: (...a) => a.join('/'), resolve: (...a) => a.join('/'), extname: (p) => (String(p).match(/\.[^.\\/]*$/) || [''])[0],
  fileURLToPath: (u) => String(u), pathToFileURL: (p) => ({ href: 'file:///' + p }),
  EventEmitter: class { on() { return this; } once() { return this; } emit() { return false; } off() { return this; } },
  Readable: class {}, Writable: class {}, Transform: class {}, Worker: class {}
};
base.win32 = base; base.posix = base;
module.exports = new Proxy(base, { get(t, k) { if (k in t) return t[k]; if (k === '__esModule') return false; if (k === 'default') return module.exports; if (k === 'promises') return module.exports; return no(String(k)); } });
