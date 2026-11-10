// 示意圖共用元件：產生透明背景 SVG，給 diagram 版型直接放在投影片上
// 用法見 decks/<slug>/diagrams.mjs。平台圖示來自 simple-icons（npm 套件，CC0）。
import fs from 'node:fs'
import path from 'node:path'
import * as si from 'simple-icons'

// 輸出到「目前 deck」的 public/shots/（由 scripts/deck.mjs 以 deck 資料夾為 cwd 執行）
export const OUT = path.resolve('public/shots')
fs.mkdirSync(OUT, { recursive: true })

// diagram 版型的圖區約 1680 × 620（寬 × 高）
export const W = 1680
export const H = 620

export const C = {
  card: '#161617',
  card2: '#222224',
  line: 'rgba(255,255,255,.14)',
  fg: '#f5f5f7',
  muted: '#a1a1a6',
  faint: '#6e6e73',
  accent: '#2997ff',
  accentBg: 'rgba(41,151,255,.10)',
  gray: '#6e6e73',
  green: '#30d158',
  yellow: '#ffd60a',
  orange: '#ff9f0a',
  red: '#ff453a',
  dark: '#c62f25',
}
export const FONT = `'PingFang TC','Microsoft JhengHei','Noto Sans TC',-apple-system,sans-serif`
export const MONO = `'JetBrains Mono',Consolas,ui-monospace,monospace`

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ---------- 圖示 ----------
// 品牌圖示：[simple-icons 物件, 在黑底上可讀的顏色]。需要別的平台就加一行，
// slug 查 https://simpleicons.org ，變數名是 si + 首字大寫的 slug（例如 siGithub）。
export const BRAND = {
  workers: [si.siCloudflareworkers, '#f38020'],
  cloudflare: [si.siCloudflare, '#f38020'],
  discord: [si.siDiscord, '#5865f2'],
  line: [si.siLine, '#06c755'],
  react: [si.siReact, '#61dafb'],
  three: [si.siThreedotjs, '#ffffff'],
  ts: [si.siTypescript, '#3178c6'],
  vite: [si.siVite, '#9499ff'],
  github: [si.siGithub, '#ffffff'],
  figma: [si.siFigma, '#f24e1e'],
  python: [si.siPython, '#3776ab'],
  nodejs: [si.siNodedotjs, '#5fa04e'],
  docker: [si.siDocker, '#2496ed'],
  postgres: [si.siPostgresql, '#4169e1'],
  sqlite: [si.siSqlite, '#7fb4d6'],
  vercel: [si.siVercel, '#ffffff'],
}
// 沒有官方圖示的概念，用簡單線條圖示
export const CUSTOM = {
  drop: c => `<path fill="${c}" d="M12 1.5C12 1.5 4.5 10 4.5 15a7.5 7.5 0 0 0 15 0C19.5 10 12 1.5 12 1.5z"/>`,
  db: c => `<g fill="none" stroke="${c}" stroke-width="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></g>`,
  clock: c => `<g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.8 2.3"/></g>`,
  user: c => `<g fill="${c}"><circle cx="12" cy="7.5" r="4.5"/><path d="M3 22c0-5 4-8.5 9-8.5s9 3.5 9 8.5z"/></g>`,
  engine: c => `<g fill="none" stroke="${c}" stroke-width="2"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></g>`,
  map: c => `<g fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round"><path d="M2 5l6.5-2.5 7 2.5L22 2.5v16.5l-6.5 2.5-7-2.5L2 21.5z"/><path d="M8.5 2.5v16.5M15.5 5v16.5"/></g>`,
  panel: c => `<g fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round"><rect x="2.5" y="3.5" width="19" height="17" rx="2.5"/><path d="M6 15l3.5-4 3 2.5L18 8"/></g>`,
  list: c => `<g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1" fill="${c}"/><circle cx="3.5" cy="12" r="1" fill="${c}"/><circle cx="3.5" cy="18" r="1" fill="${c}"/></g>`,
  flask: c => `<g fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round"><path d="M9 2.5h6M10 2.5v6L4 19.5a1.5 1.5 0 0 0 1.3 2h13.4a1.5 1.5 0 0 0 1.3-2L14 8.5v-6"/><path d="M7 15h10"/></g>`,
}
const DEFAULT_C = { drop: '#2997ff', db: '#f38020' }

export function icon(name, x, y, size, color) {
  if (CUSTOM[name]) {
    const c = color ?? DEFAULT_C[name] ?? C.fg
    return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24">${CUSTOM[name](c)}</svg>`
  }
  if (!BRAND[name]) throw new Error(`unknown icon: ${name}`)
  const [ic, c] = BRAND[name]
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24"><path fill="${color ?? c}" d="${ic.path}"/></svg>`
}

// ---------- 基本元件 ----------
export const text = (x, y, s, { size = 24, w = 500, c = C.fg, a = 'start', mono = false } = {}) =>
  `<text x="${x}" y="${y}" font-family="${mono ? MONO : FONT}" font-size="${size}" font-weight="${w}" fill="${c}" text-anchor="${a}">${esc(s)}</text>`

export const rect = (x, y, w, h, { r = 24, f = C.card, s = C.line, sw = 1.5, dash = '' } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${s}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

// 重點節點：每張圖只用一次
export const hiRect = (x, y, w, h, r = 24) => rect(x, y, w, h, { r, f: C.accentBg, s: C.accent, sw: 2.5 })

const defs = `<defs>
  <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C.accent}"/></marker>
  <marker id="arrg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C.gray}"/></marker>
</defs>`

export function arrow(d, { c = C.accent, dash = '', both = false, w = 3 } = {}) {
  const m = c === C.accent ? 'arr' : 'arrg'
  return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''} marker-end="url(#${m})"${both ? ` marker-start="url(#${m})"` : ''}/>`
}

export function save(name, body, h = H) {
  fs.writeFileSync(path.join(OUT, name), `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}">${defs}${body}</svg>`)
  console.log('wrote', name)
}

// 橫向節點：圖示在左，標題與說明在右
export function hnode(x, y, w, h, { ics, title, sub, hi = false }) {
  let o = hi ? hiRect(x, y, w, h) : rect(x, y, w, h)
  const isz = 52
  let ix = x + 32
  for (const n of ics) { o += icon(n, ix, y + h / 2 - isz / 2, isz); ix += isz + 14 }
  const tx = ix + 10
  o += text(tx, y + h / 2 + (sub ? -4 : 11), title, { size: 32, w: 700 })
  if (sub) o += text(tx, y + h / 2 + 34, sub, { size: 22, c: C.muted })
  return o
}

// 直向節點：圖示在上
export function vnode(x, y, w, h, { ic, title, sub = [], hi = false }) {
  let o = hi ? hiRect(x, y, w, h) : rect(x, y, w, h)
  o += icon(ic, x + 32, y + 32, 56)
  o += text(x + 32, y + 140, title, { size: 34, w: 700 })
  sub.forEach((s, i) => { o += text(x + 32, y + 184 + i * 34, s, { size: 23, c: C.muted }) })
  return o
}
