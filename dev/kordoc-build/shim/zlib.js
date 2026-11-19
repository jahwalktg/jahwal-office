import pako from "pako";
import { Buffer } from "buffer";
const B = (u) => Buffer.from(u.buffer, u.byteOffset, u.byteLength);
export function inflateRawSync(d) { return B(pako.inflateRaw(d)); }
export function inflateSync(d) { return B(pako.inflate(d)); }
export function deflateRawSync(d, o) { return B(pako.deflateRaw(d, o)); }
export function deflateSync(d, o) { return B(pako.deflate(d, o)); }
export default { inflateRawSync, inflateSync, deflateRawSync, deflateSync };
