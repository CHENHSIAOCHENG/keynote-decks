// 把 dist/png 每 4 張拼成一張 2x2 縮圖，方便檢查：node scripts/contact.mjs <outdir>
import { chromium } from 'playwright-chromium'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
const out = process.argv[2]; fs.mkdirSync(out, { recursive: true })
const files = fs.readdirSync('dist/png').filter(f => f.endsWith('.png')).sort((a, b) => parseInt(a) - parseInt(b))
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } })
for (let i = 0; i < files.length; i += 4) {
  const imgs = files.slice(i, i + 4).map(f => `<img src="${pathToFileURL(path.resolve('dist/png', f)).href}">`).join('')
  const html = path.resolve(out, 'sheet.html')
  fs.writeFileSync(html, `<style>body{margin:0;display:grid;grid-template-columns:960px 960px;background:#333}img{width:960px;height:540px}</style>${imgs}`)
  await p.goto(pathToFileURL(html).href)
  await p.waitForTimeout(300)
  await p.screenshot({ path: `${out}/sheet-${i / 4 + 1}.png` })
}
await b.close()
