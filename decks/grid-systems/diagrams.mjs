// 本 deck 的示意圖：npm run diagrams -- grid-systems（輸出到 public/shots/）
import { C, arrow, hiRect, rect, save, text } from '../../scripts/diagram-kit.mjs'

// 全書架構：依目錄分四段，重點是「結構」
{
  const parts = [
    { title: '基礎', pages: '書頁 13–18', items: ['紙張尺寸', '度量系統', '字體樣式'] },
    { title: '排版', pages: '書頁 19–44', items: ['欄寬、行距', '頁邊距、頁碼', '正文與標題字體'] },
    { title: '結構', pages: '書頁 45–56', items: ['版心的結構', '網格的結構'], hi: true },
    { title: '應用', pages: '書頁 57–148', items: ['8／20／32 格', '圖片、插圖、色塊', '企業識別、展覽'] },
  ]
  const w = 360, gap = 80, y = 110, h = 400
  let b = ''
  parts.forEach((p, i) => {
    const x = i * (w + gap)
    b += p.hi ? hiRect(x, y, w, h, 28) : rect(x, y, w, h, { r: 28 })
    b += text(x + 40, y + 76, p.title, { size: 44, w: 700 })
    b += text(x + 40, y + 122, p.pages, { size: 22, c: C.faint, mono: true })
    p.items.forEach((s, j) => { b += text(x + 40, y + 210 + j * 52, s, { size: 28, c: C.muted }) })
    if (i < parts.length - 1) b += arrow(`M${x + w + 10} ${y + h / 2} L${x + w + gap - 10} ${y + h / 2}`, { c: C.gray })
  })
  save('book-structure.svg', b)
}
