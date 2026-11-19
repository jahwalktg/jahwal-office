export function format(f, ...a) { let i = 0; return String(f).replace(/%[sdifjoO%]/g, (m) => m === '%%' ? '%' : (i < a.length ? (typeof a[i] === 'object' ? JSON.stringify(a[i++]) : String(a[i++])) : m)) + (i < a.length ? ' ' + a.slice(i).join(' ') : ''); }
export const inspect = (x) => { try { return JSON.stringify(x); } catch (e) { return String(x); } };
export const promisify = (fn) => (...a) => new Promise((ok, no) => fn(...a, (e, v) => e ? no(e) : ok(v)));
export const deprecate = (fn) => fn;
export const TextDecoder = globalThis.TextDecoder, TextEncoder = globalThis.TextEncoder;
export const types = { isUint8Array: (x) => x instanceof Uint8Array };
export default { format, inspect, promisify, deprecate, TextDecoder, TextEncoder, types };
