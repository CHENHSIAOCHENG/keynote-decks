// 從 slides.md 每頁的 <!-- 備註 --> 匯出講稿：node scripts/script-md.mjs
import fs from 'node:fs'
const src = fs.readFileSync('slides.md', 'utf8').replace(/\r\n/g, '\n')
const slides = []
const re = /(^|\n)---\n([\s\S]*?)\n---\n([\s\S]*?)(?=\n---\n[a-z]+:|$)/g
let m
while ((m = re.exec(src))) slides.push({ fm: m[2], body: m[3] })
const deckTitle = src.match(/^title:\s*(.+)$/m)?.[1]?.trim() ?? 'Deck'
let out = '# ' + deckTitle + ' — 講稿\n\n共 ' + slides.length + ' 頁。內容與 slides.md 的簡報者備註相同，預覽時開 /presenter 可邊看邊講。\n'
slides.forEach((s, i) => {
  const title = (s.body.match(/^# (.+)$/m)?.[1] ?? '').replace(/<br>(?=\S{2,3}$)/, '｜').replace(/<br>/g, '')
  const note = s.body.match(/<!--\s*([\s\S]*?)\s*-->\s*$/)?.[1] ?? ''
  const section = s.fm.match(/section:\s*(.+)/)?.[1] ?? ''
  out += `\n## ${i + 1}. ${title}\n\n_${section}_\n\n${note}\n`
})
fs.writeFileSync('講稿.md', out)
console.log('slides:', slides.length)
