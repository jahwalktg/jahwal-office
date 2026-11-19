// node test_read.cjs <파일> — 읽기 묶음 시험: 앞부분 글과 가리기 결과 수만 출력(개인정보 내용은 출력 안 함)
const fs = require('fs'), path = require('path');
globalThis.window = globalThis;
new Function(fs.readFileSync(path.join(__dirname, 'kordoc-read.js'), 'utf8'))();
const K = window.KordocRead, f = process.argv[2], ext = path.extname(f).toLowerCase();
const fn = { '.hwp': K.parseHwp, '.hwpx': K.parseHwpx, '.xlsx': K.parseXlsx, '.xls': K.parseXls, '.docx': K.parseDocx, '.pptx': K.parsePptx }[ext];
const b = fs.readFileSync(f), ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength), t = Date.now();
fn.call(K, ab).then((r) => {
  if (!r.success) { console.log('fail', JSON.stringify(r).slice(0,400)); return; }
  const md = r.markdown, red = K.redactMarkdown(md);
  const kinds = {}; (red.hits || []).forEach((h) => { kinds[h.rule || h.type] = (kinds[h.rule || h.type] || 0) + 1; });
  console.log(path.basename(f), (Date.now() - t) + 'ms', md.length + '자', '표 줄', (md.match(/^\|/gm) || []).length, '가림', JSON.stringify(kinds));
  if (process.argv[3]) console.log(md.slice(0, +process.argv[3]));
}).catch((e) => console.log('err', e.message));
