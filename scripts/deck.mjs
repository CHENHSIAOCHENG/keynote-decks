// 對單一 deck 執行工作：node scripts/deck.mjs <task> <slug>
// 也可以用 npm：npm run <task> -- <slug>
// 所有指令都以 decks/<slug>/ 為工作目錄執行，所以 deck 內的相對路徑（public/、dist/）都指向那個 deck
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SCRIPTS = path.join(ROOT, 'scripts')
const [task, slug] = process.argv.slice(2)

const TASKS = {
  dev: ['npx slidev --open'],
  diagrams: ['node diagrams.mjs'],
  shots: ['npx slidev export --format png --output dist/png'],
  contact: [`node "${path.join(SCRIPTS, 'contact.mjs')}" dist/contact`],
  notes: [`node "${path.join(SCRIPTS, 'script-md.mjs')}"`],
  shot: [`node "${path.join(SCRIPTS, 'shot-url.mjs')}" ${process.argv.slice(4).join(' ')}`],
}

const decks = fs.readdirSync(path.join(ROOT, 'decks'))
  .filter(d => fs.existsSync(path.join(ROOT, 'decks', d, 'slides.md')))

if (!TASKS[task] || !slug) {
  console.error(`usage: node scripts/deck.mjs <${Object.keys(TASKS).join('|')}> <slug>`)
  console.error(`decks: ${decks.join(', ') || '(none)'}`)
  process.exit(1)
}
if (!decks.includes(slug)) {
  console.error(`找不到 decks/${slug}/slides.md。現有 deck：${decks.join(', ')}`)
  process.exit(1)
}

const cwd = path.join(ROOT, 'decks', slug)
if (task === 'shots') fs.rmSync(path.join(cwd, 'dist/png'), { recursive: true, force: true })

for (const cmd of TASKS[task]) {
  const r = spawnSync(cmd, { cwd, shell: true, stdio: 'inherit' })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

// 截圖後把第 1 頁存成首頁卡片的縮圖：public/thumb.png（1920 寬，build 時跟著 deck 一起輸出）
if (task === 'shots') {
  const { chromium } = await import('playwright-chromium')
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } })
  await page.setContent(`<style>body{margin:0}img{width:960px;height:540px;display:block}</style><img src="data:image/png;base64,${fs.readFileSync(path.join(cwd, 'dist/png/1.png')).toString('base64')}">`)
  await page.screenshot({ path: path.join(cwd, 'public/thumb.png') })
  await browser.close()
  console.log(`thumb: decks/${slug}/public/thumb.png`)
}
