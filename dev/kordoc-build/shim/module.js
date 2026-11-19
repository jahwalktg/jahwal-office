import * as cfb from "cfb";
const MODS = { cfb: cfb.default || cfb };
export function createRequire() { return (n) => { if (MODS[n]) return MODS[n]; throw new Error('require ' + n + ' not in browser'); }; }
export default { createRequire };
