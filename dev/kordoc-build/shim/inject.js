// 묶음 안 모든 파일의 전역 Buffer·process 참조를 이것으로 (esbuild inject)
import { Buffer as B } from 'buffer';
export const Buffer = B;
export const process = { env: { NODE_ENV: 'production' }, platform: 'browser', versions: {}, version: '', cwd: () => '/', nextTick: (f, ...a) => Promise.resolve().then(() => f(...a)), browser: true };
