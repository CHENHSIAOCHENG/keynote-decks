// 擷取網頁畫面當投影片截圖：node scripts/shot-url.mjs <網址> <輸出檔，例如 public/shots/app.png> [等待毫秒]
// WebGL（three.js 等）頁面用 swiftshader 軟體繪圖，也能截到畫面
import { chromium } from 'playwright-chromium'

const [url, out = 'public/shots/app.png', wait = '6000'] = process.argv.slice(2)
if (!url) {
  console.error('usage: node scripts/shot-url.mjs <url> [out.png] [waitMs]')
  process.exit(1)
}
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1.5 })
const errors = []
page.on('pageerror', e => errors.push(String(e)))
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(Number(wait))
await page.screenshot({ path: out })
console.log('saved', out, errors.length ? errors : 'no page errors')
await browser.close()
