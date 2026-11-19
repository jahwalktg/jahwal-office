const no = () => { throw new Error('not in browser'); };
const bn = (p) => String(p).split(/[\\/]/).pop();
const dn = (p) => String(p).replace(/[\\/][^\\/]*$/, '');
export const execFile = no, spawn = no, exec = no, execSync = no;
export const platform = () => 'browser', tmpdir = () => '/tmp', homedir = () => '/', cpus = () => [], EOL = '\n';
export const win32 = { join: (...a) => a.join(String.fromCharCode(92)), basename: bn, dirname: dn };
export const posix = { join: (...a) => a.join('/'), basename: bn, dirname: dn };
export const join = (...a) => a.join('/'), basename = bn, dirname = dn, resolve = (...a) => a.join('/'), sep = '/', extname = (p) => (String(p).match(/\.[^.\\/]*$/) || [''])[0], isAbsolute = () => false, relative = (a, b) => b;
export const readFile = no, writeFile = no, mkdir = no, readdir = no, stat = no, rm = no, unlink = no, access = no;
export const readFileSync = no, writeFileSync = no, existsSync = () => false, mkdirSync = no, statSync = no, readdirSync = no, createReadStream = no, createWriteStream = no;
export const pipeline = no, Readable = class {}, Writable = class {}, Transform = class {};
export const fileURLToPath = (u) => String(u), pathToFileURL = (p) => ({ href: 'file:///' + p });
export const createHash = no, randomUUID = () => Math.random().toString(36).slice(2), randomBytes = (n) => crypto.getRandomValues(new Uint8Array(n));
export const Worker = class {}, isMainThread = true, parentPort = null, workerData = null;
export class EventEmitter { on() { return this; } once() { return this; } emit() { return false; } off() { return this; } }
export const promises = { readFile: no, writeFile: no, mkdir: no, readdir: no, stat: no, rm: no };
const all = { execFile, spawn, exec, execSync, platform, tmpdir, homedir, cpus, EOL, win32, posix, join, basename, dirname, resolve, sep, extname, isAbsolute, relative, readFile, writeFile, mkdir, readdir, stat, rm, unlink, access, readFileSync, writeFileSync, existsSync, mkdirSync, statSync, readdirSync, createReadStream, createWriteStream, pipeline, Readable, Writable, Transform, fileURLToPath, pathToFileURL, createHash, randomUUID, randomBytes, Worker, isMainThread, parentPort, workerData, EventEmitter, promises };
export default all;
