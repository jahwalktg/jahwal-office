# kordoc HWP→HWPX 변환 묶음 다시 만들기 (lib/kordoc-conv.js)

1. 이 폴더 옆 아무 곳에 `kd/` 폴더를 만들고 `npm i kordoc@버전 esbuild@0.24.0 pako@2.1.0 buffer@6.0.3 --ignore-scripts`
2. `kd/node_modules/kordoc/dist/`에서 `function hwpToHwpx`가 든 chunk 파일을 찾아(`grep -l "function hwpToHwpx" *.js`) entry.js의 import 경로를 그 파일로 바꾼다 (버전마다 이름이 바뀜). VERSION도 같은 방식.
3. build.mjs의 `kd` 경로를 맞추고 `node build.mjs` → kordoc-conv.js (약 290KB)
4. `node test.cjs 입력.hwp 출력.hwpx`로 확인 → 한글로 열어 쪽 수·글자 수 비교 → `lib/`에 복사, hwp2hwpx.html의 `kordoc-conv.js?v=` 올리기
5. lib/kordoc-conv.LICENSES.txt 버전 갱신

대체 조각: zlib→pako, Buffer·process→inject.js, module.createRequire→cfb만, 나머지 Node 기능(fs·crypto 등)은 「쓰면 오류」(empty.cjs). 암호·배포용 문서는 crypto가 없어 못 바꿈(화면에 안내).
