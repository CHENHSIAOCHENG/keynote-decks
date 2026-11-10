// 建立新 deck：node scripts/new-deck.mjs <slug> "<標題>" "<一句簡介>"
// 產生 decks/<slug>/ 的 outline.md、slides.md（只有封面）、diagrams.mjs 與 public/shots/
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const [slug, title, info = ''] = process.argv.slice(2)
if (!slug || !title || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error('usage: node scripts/new-deck.mjs <kebab-case-slug> "<標題>" "<一句簡介>"')
  process.exit(1)
}

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const dest = path.join(ROOT, 'decks', slug)
if (fs.existsSync(dest)) {
  console.error(`refuse: decks/${slug} 已存在`)
  process.exit(1)
}
fs.mkdirSync(path.join(dest, 'public/shots'), { recursive: true })
fs.writeFileSync(path.join(dest, 'public/shots/.gitkeep'), '')

const today = new Date().toISOString().slice(0, 10)

fs.writeFileSync(path.join(dest, 'outline.md'), `# Outline — ${title}

來源：（列出資料來源與頁碼）

## 1. Cover
Layout: cover
- ${title}
Notes:
`)

fs.writeFileSync(path.join(dest, 'slides.md'), `---
theme: default
addons:
  - ../theme
title: ${title}
info: ${info}
date: ${today}
aspectRatio: 16/9
canvasWidth: 1920
routerMode: hash
fonts:
  mono: JetBrains Mono
transition: fade
footer: ''
layout: cover
section: Cover
---

# ${title}

<!--
-->
`)

fs.writeFileSync(path.join(dest, 'diagrams.mjs'), `// 本 deck 的示意圖：npm run diagrams -- ${slug}（輸出到 public/shots/）
import { C, arrow, hiRect, rect, save, text } from '../../scripts/diagram-kit.mjs'
`)

console.log(`created decks/${slug}`)
