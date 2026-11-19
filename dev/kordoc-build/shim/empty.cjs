// 브라우저에 없는 Node 기능·무거운 부품: 어떤 이름이든 대신하는 빈 부품.
// 불러올 때(모듈 초기화) new·호출해도 터지지 않게 함수 모양으로, 실제로 쓰면 오류.
const no = function (name) { return function () { throw new Error(name + ' 기능은 브라우저에서 쓰지 않습니다'); }; };
const base = {
  platform: () => 'browser', tmpdir: () => '/tmp', homedir: () => '/', cpus: () => [], EOL: '\n', sep: '/',
  existsSync: () => false, isMainThread: true, parentPort: null, workerData: null,
  basename: (p) => String(p).split(/[\\/]/).pop(), dirname: (p) => String(p).replace(/[\\/][^\\/]*$/, ''),
  join: (...a) => a.join('/'), resolve: (...a) => a.join('/'), extname: (p) => (String(p).match(/\.[^.\\/]*$/) || [''])[0],
  fileURLToPath: (u) => String(u), pathToFileURL: (p) => ({ href: 'file:///' + p }),
  EventEmitter: class { on() { return this; } once() { return this; } emit() { return false; } off() { return this; } }
};
function Stub() { if (!(this instanceof Stub)) return P; }
const P = new Proxy(Stub, {
  get(t, k) {
    if (k in base) return base[k];
    if (k === '__esModule') return false;
    if (k === 'default' || k === 'promises' || k === 'win32' || k === 'posix') return P;
    if (k === 'prototype') return t.prototype;
    if (typeof k === 'symbol') return t[k];
    return P;   // 이름이 무엇이든 또 빈 부품(클래스·함수로 써도 불러올 때는 안 터짐)
  },
  apply() { return P; },
  construct() { return P; }
});
base.win32 = P; base.posix = P;
module.exports = P;
