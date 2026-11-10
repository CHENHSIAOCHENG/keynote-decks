// 建置整個網站到 dist/：npm run build
// 1. 每個 decks/<slug>/slides.md 用 Slidev build 成 dist/<slug>/
// 2. 讀每個 deck 的 headmatter（title、info、date）和頁數，套進 site/index.html 產生首頁
// GitHub Pages 的子路徑由環境變數 SITE_BASE 決定，預設 /keynote-decks/（repo 名稱）
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DIST = path.join(ROOT, 'dist')
const BASE = (process.env.SITE_BASE ?? '/keynote-decks/').replace(/\/?$/, '/')
const only = process.argv[2]

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function readDeck(slug) {
  const src = fs.readFileSync(path.join(ROOT, 'decks', slug, 'slides.md'), 'utf8').replace(/\r\n/g, '\n')
  const head = src.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
  const get = key => head.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? ''
  return {
    slug,
    title: get('title') || slug,
    info: get('info'),
    date: get('date'),
    pages: (src.match(/^layout:\s*\S+/gm) ?? []).length,
    thumb: fs.existsSync(path.join(ROOT, 'decks', slug, 'public/thumb.png')),
  }
}

const decks = fs.readdirSync(path.join(ROOT, 'decks'))
  .filter(d => fs.existsSync(path.join(ROOT, 'decks', d, 'slides.md')))
  .map(readDeck)
  .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))

if (!only) fs.rmSync(DIST, { recursive: true, force: true })
fs.mkdirSync(DIST, { recursive: true })

for (const d of decks) {
  if (only && d.slug !== only) continue
  console.log(`\n▸ build ${d.slug}  →  ${BASE}${d.slug}/`)
  const r = spawnSync(`npx slidev build slides.md --base ${BASE}${d.slug}/ --out "${path.join(DIST, d.slug)}"`, {
    cwd: path.join(ROOT, 'decks', d.slug), shell: true, stdio: 'inherit',
  })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

const cards = decks.map(d => `
      <a class="card" href="./${d.slug}/">
        <div class="thumb">${d.thumb ? `<img src="./${d.slug}/thumb.png" alt="" loading="lazy">` : `<span>${esc(d.title)}</span>`}</div>
        <div class="meta"><span>${esc(d.date)}</span><span>${d.pages} 頁</span></div>
        <h2>${esc(d.title)}</h2>
        <p>${esc(d.info)}</p>
      </a>`).join('')

const tpl = fs.readFileSync(path.join(ROOT, 'site/index.html'), 'utf8')
fs.writeFileSync(path.join(DIST, 'index.html'), tpl.replace('<!-- DECKS -->', cards).replace('<!-- COUNT -->', String(decks.length)))
fs.writeFileSync(path.join(DIST, '.nojekyll'), '')
console.log(`\n首頁：dist/index.html（${decks.length} 份簡報）`)
