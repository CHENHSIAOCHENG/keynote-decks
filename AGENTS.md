# AGENTS.md — Keynote Decks

這份文件寫給在本專案工作的 AI 代理（Claude Code、Codex、Cursor 等）與協作者。動手前先讀完；跟其他文件或習慣衝突時，以本文件為準。

## 1. 專案目的

把「做簡報」變成可重複的流程：每份簡報都是一個 Slidev deck，共用同一套 Apple Keynote 風格的版型（黑底、白灰字、一頁一個重點），建置後放在同一個網站上，首頁自動列出所有簡報。

- 新增簡報 = 在 `decks/` 新增一個資料夾，其餘（版型、樣式、首頁卡片、網址）都由共用設定處理。
- 內容以「可查證」為原則：所有事實先寫進 `outline.md` 並標出處，投影片只能從 outline 取材。
- 畫面與講稿一律使用**繁體中文**（台灣用語）。原始資料是簡體中文或英文時，翻譯成繁體中文，專有名詞第一次出現可附原文。

## 2. 目錄結構

```
keynote-decks/
├── AGENTS.md              本文件：專案規則（所有 AI 代理共用）
├── CLAUDE.md              Claude Code 專用補充，開頭匯入本文件
├── package.json           唯一的相依套件與 npm 指令
├── theme/                 共用版型（Slidev addon），所有 deck 都載入它
│   ├── layouts/           8 種 layout：cover statement grid stats chart bento diagram tech
│   ├── components/        GridCell Stat BarChart UsageBars BentoCell MacWindow
│   ├── style.css          色彩與字體 token
│   ├── global-top.vue     dev 模式右上角調色盤
│   └── vite.config.ts     調色盤「儲存」寫回 style.css
├── decks/
│   └── <slug>/            一份簡報一個資料夾
│       ├── outline.md     大綱與出處（唯一的內容來源）
│       ├── slides.md      投影片
│       ├── diagrams.mjs   本 deck 的示意圖（可無）
│       ├── 講稿.md        由 npm run notes 產生
│       └── public/
│           ├── shots/     示意圖 SVG、截圖
│           └── thumb.png  首頁卡片縮圖（npm run shots 產生）
├── site/index.html        首頁樣板（卡片由 build 插入 <!-- DECKS -->）
├── scripts/               建置與工具腳本
└── dist/                  建置輸出（不進版控）
```

## 3. 指令

都在專案根目錄執行。針對單一 deck 的指令要在 `--` 後面帶 slug。

| 指令 | 用途 |
|---|---|
| `npm run new -- <slug> "<標題>" "<一句簡介>"` | 建立新 deck |
| `npm run dev -- <slug>` | 開發預覽（http://localhost:3030，`/presenter` 簡報者模式） |
| `npm run diagrams -- <slug>` | 執行該 deck 的 `diagrams.mjs`，輸出到 `public/shots/` |
| `npm run shots -- <slug>` | 每頁匯出 PNG 到 `decks/<slug>/dist/png/`，並更新 `public/thumb.png` |
| `npm run contact -- <slug>` | 每 4 頁拼一張縮圖到 `dist/contact/`，快速檢查用 |
| `npm run notes -- <slug>` | 從每頁備註匯出 `講稿.md` |
| `npm run shot -- <slug> <網址> public/shots/<檔名>.png` | 擷取網頁畫面當截圖 |
| `npm run build` | 建置所有 deck 與首頁到 `dist/` |
| `npm run build -- <slug>` | 只重建一份 deck（首頁仍會重新產生） |
| `npm run preview` | 預覽 `dist/`（http://localhost:4173/keynote-decks/） |

第一次執行 shots / contact 若提示缺瀏覽器，先跑 `npx playwright install chromium`。

## 4. 新增一份簡報的流程

1. **決定 slug 與標題**：slug 用英文 kebab-case（`grid-systems`、`water-alert`），之後就是網址的一段，建立後不要改。
2. **建立**：`npm run new -- <slug> "<標題>" "<一句簡介>"`。
3. **讀資料、寫 `outline.md`**（格式見第 5 節）。使用者只給主題、沒給資料時，先起草 outline 給使用者確認，確認後才寫 slides.md。
4. **寫 `slides.md`**：照第 6–8 節的文字與 layout 規則。
5. **畫示意圖**（需要時）：寫 `diagrams.mjs`，跑 `npm run diagrams -- <slug>`。
6. **潤飾文字**：照 `.claude/skills/humanizer-zh-tw/SKILL.md` 去 AI 味，只改看得到的文字與講稿（細節見第 6 節最後）。
7. **檢查**：`npm run shots` + `npm run contact`，照第 11 節逐項看，有問題就修，修完重出。
8. **講稿**：`npm run notes -- <slug>`。
9. **建置確認**：`npm run build`，`npm run preview` 打開首頁，確認新卡片出現、點得進去、頁數正確。
10. **回報**（格式見第 13 節）。

修改既有 deck 時從第 3 步開始：先改 outline，再改 slides。

## 5. outline.md 格式

```markdown
# Outline — <標題>

來源：<作者、書名／文件名、版本>；頁碼說明

## 3. Purpose — 網格的用途
Layout: grid
來源：書頁 11（PDF 7）
- 平面設計：報紙、廣告、小冊子
- 展覽設計：展覽、櫥窗
Notes: 講稿全文，平鋪直敘的口語報告。
```

- 每頁一個 `## <頁碼>. <Section> — <中文標題>` 區塊，依序對應 slides.md 的每一頁。
- 必寫 `Layout:`；用到圖時寫 `Diagram: <檔名>.svg` 或 `Screenshot: <檔名>.png`。
- 每個數字、引述都要有 `來源:`（頁碼、網址或文件段落）。沒有出處的數字要請使用者核實，不可自己編。
- 計算出來的數字（例如頁碼相減）要註明算法。
- `Notes:` 是講稿全文，slides.md 的備註直接取自這裡。

## 6. 文字規則

- **只能刪、改短，不可新增事實**：slides.md 與講稿的內容都必須能在 outline.md 找到。
- **標題用名詞**：「網格的用途」「排版度量」「全書架構」。不要標語、口號、對比句或金句（「不是 X 而是 Y」「X，就 Y。」「一個 A 包辦全部」都不行）。標題不加句號，≤ 16 個中文字。
- **畫面只放關鍵詞**：數字、專有名詞、短詞組。完整說明一律放講稿。
- **導言**（`::lead::`、`::body::`）可省略；要寫就寫一行事實，例如「A4 開本 29.7 × 21 cm」。
- **卡片內文用詞組**，可以寫成「問題 → 對策」，不寫完整句子、不加句號。
- **語氣**：中性、學術、可查證。講稿用平鋪直敘的口語，說明背景、做法與限制，不誇大、不煽情。
- **斷行**：出現孤字或斷在數字中間時，用 `<br>` 手動斷行。
- **去 AI 味**：照 `.claude/skills/humanizer-zh-tw/SKILL.md` 潤飾，但 frontmatter、layout、`section`、元件標籤與屬性、`image` 路徑、`<br>`、數字都不動；改完對照 outline.md。

## 7. slides.md 格式

### Headmatter（第一頁）

```yaml
---
theme: default
addons:
  - ../theme          # 共用版型。Slidev 從 decks/ 解析這個路徑，所以是 ../theme，不是 ../../theme
title: 網格系統        # 首頁卡片標題、瀏覽器分頁標題
info: 一句簡介          # 首頁卡片說明
date: 2026-11-10       # 首頁排序用（新的在前），格式 YYYY-MM-DD
aspectRatio: 16/9
canvasWidth: 1920
routerMode: hash       # GitHub Pages 沒有 SPA fallback，必須用 hash 路由
fonts:
  mono: JetBrains Mono
transition: fade
footer: '副標，顯示在封面'
layout: cover
section: Cover
---
```

`npm run new` 會產生這段，`title`、`info`、`date` 以外不要改。

### 每一頁

```markdown
---
layout: grid
section: Purpose
---

# 網格的用途

::lead::

一行事實

::cells::

<GridCell title="平面設計">
報紙、廣告<br>書籍、期刊
</GridCell>

<!--
講稿（取自 outline.md 的 Notes）
-->
```

- 每頁 frontmatter 都要有 `layout` 與 `section`（一個英文單字，例如 Overview、Purpose、Measure）。
- 每頁最後一個區塊是 `<!-- 講稿 -->`，不可省略。
- 圖片路徑寫成 `./shots/<檔名>`（相對路徑）。不要寫 `/shots/...`，建置到子路徑後會找不到。

## 8. Layout 選擇

只能使用下表 8 種 layout。需要新版型時先向使用者提案，同意後才加到 `theme/layouts/`。

| 內容 | layout | 寫法 |
|---|---|---|
| 封面 | `cover` | 標題用 `#`，副標寫在 headmatter 的 `footer` |
| 單一主題句、分段頁、結尾 | `statement` | eyebrow（section）+ 大標題 |
| 3–4 個並列項目 | `grid` | `::lead::` + `::cells::` + `<GridCell value? title :span?>`，最多 4 張 |
| 幾個關鍵數字 | `stats` | 左側標題 + `::stats::` 內 `<Stat value title>`（最多 4 欄）+ `::foot::` 一行結論 |
| 數量比較 | `chart` | frontmatter 必填 `unit`、`source`；`<BarChart :items>` 或 `<UsageBars :items>`，只標一個 `hi: true` |
| 一個主數字 + 補充 | `bento` | `<BentoCell value title :span :rows>`，大卡 `:rows="2"`，12 欄排滿兩列 |
| 架構、流程、時程、資料表 | `diagram` | frontmatter `image: ./shots/<檔名>.svg` + `::body::`（一行說明，可省略） |
| 真實畫面截圖 | `tech` | `image` + `windowTitle` + `::body::`，圖會放進 MacWindow |

選擇順序：數字優先用 stats / chart / bento，流程與架構用 diagram，真實截圖才用 tech。

GridCell 寬度：預設 `span 4`（一排 3 張）；2 張用 `:span="6"`，4 張用 `:span="3"`。

## 9. 設計系統

設計 token 在 `theme/style.css`。除非使用者要求，不要改 token，也不要改 `theme/` 底下的 layout 與元件。

### 畫布
- 16:9，以 1920 × 1080 為設計基準；黑底，底部中央一層很淡的藍色放射漸層
- 不顯示頁碼、footer、章節編號等介面元素；換頁一律 fade

### 色彩
| token | 值 | 用途 |
|---|---|---|
| `--bg` | `#000000` | 背景 |
| `--fg` | `#F5F5F7` | 標題、大數字 |
| `--fg-muted` | `#A1A1A6` | 導言、內文 |
| `--fg-faint` | `#6E6E73` | eyebrow、副標、來源 |
| `--accent` | `#2997FF` | **只用在圖形**（一根長條、一個節點），文字不用 |
| `--surface` | `#161617` | 卡片底色 |

`npm run dev` 右上角的調色盤可以即時調整並寫回 style.css；只在使用者要求換色時使用。

### 字體
- 系統字：SF Pro / PingFang TC / Noto Sans TC
- 標題 700、96px（statement 140px、封面 150px），行高 1.08
- eyebrow 600、28px；導言與內文 500、32px，最多 2 行

### 格線
- 12 欄，左右邊界 120px，欄距 24px
- cover / statement / grid / tech / diagram 置中；stats / chart / bento 靠左

### 禁止
- inline style、彩色文字、漸層文字、陰影文字、底線裝飾
- bullet 清單、emoji、stock icon
- 一頁超過一個主張；一頁超過 4 張卡片

## 10. 示意圖

- 寫在 `decks/<slug>/diagrams.mjs`，從 `../../scripts/diagram-kit.mjs` 匯入：`rect`、`hiRect`、`arrow`、`text`、`icon`、`hnode`、`vnode`、`save`、`C`。
- 畫布 1680 × 620、透明背景；字級至少 20px；圖裡的文字也用短詞。
- 每張圖只用一次 `hiRect`（重點），其餘灰階。
- 平台一律用真實圖示（`BRAND`，來自 simple-icons）；缺的平台在 `BRAND` 加一行。沒有官方圖示的概念用 `CUSTOM` 線條圖示。
- accent 以外的顏色（狀態色、品牌色）只能出現在圖裡。
- 範例：`decks/grid-systems/diagrams.mjs`（四段流程，重點節點用 hiRect）。

## 11. 檢查清單（每次改完都要做）

`npm run shots -- <slug>` 與 `npm run contact -- <slug>` 之後，先看 `dist/contact/sheet-*.png`，有疑慮再看 `dist/png/<頁>.png`：

- [ ] 文字溢出、換行難看、孤字
- [ ] 文字有沒有被上色（應全為白／灰）
- [ ] 元件文字的字型有沒有被全域 class 影響
- [ ] 圖表對齊、示意圖標籤是否重疊或被裁切
- [ ] 每頁都有 section 與講稿
- [ ] 畫面上的每個數字都能在 outline.md 找到出處
- [ ] `npm run build` 成功，首頁卡片顯示正確縮圖、標題、頁數

## 12. 首頁、建置與部署

- 首頁由 `scripts/build-site.mjs` 產生：讀每個 deck 的 `title`、`info`、`date` 與頁數，把卡片插入 `site/index.html` 的 `<!-- DECKS -->`。新增 deck 不需要改首頁。
- 首頁的外觀改 `site/index.html`，色彩沿用第 9 節的 token。
- 網站子路徑由環境變數 `SITE_BASE` 決定，預設 `/keynote-decks/`（GitHub repo 名稱）。repo 改名時，`package.json` 的 `preview` 指令要一起改。
- 部署：push 到 `main` 後，`.github/workflows/pages.yml` 會自動執行 `npm run build`（`SITE_BASE` 自動帶入 repo 名稱）並發佈到 GitHub Pages。CI 不會截圖，所以新增或修改 deck 後，要先在本機跑 `npm run shots`，把更新後的 `public/thumb.png` 一起 commit。
- 每份 deck 的網址：`<網站>/<slug>/`，指定頁數用 `#/<頁碼>`。
- `dist/`、`decks/*/dist/`、`node_modules/` 不進版控；`public/thumb.png` 和 `public/shots/` 要進版控。

## 13. 完成時的回報

最後用條列回報：
- deck 路徑與頁數
- 新增或修改了哪些頁（頁碼 + 標題）
- 檢查時發現並修掉的問題
- 還缺的截圖、待使用者確認的事實或數字
