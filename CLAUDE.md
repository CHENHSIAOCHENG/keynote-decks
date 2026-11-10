# CLAUDE.md

專案規則全部寫在 AGENTS.md，以下匯入後再補充 Claude Code 專用的做法。

@AGENTS.md

## Claude Code 補充

### 開工前
- 先讀 AGENTS.md，再讀要處理的 deck 的 `outline.md` 與 `slides.md`。新增 deck 時，先看 `decks/grid-systems/` 當範例。
- 原始資料是 PDF 時，用 Python（PyMuPDF）抽出文字，寫成 UTF-8 檔案後再讀；.docx 用 `zipfile` 讀 `word/document.xml`。Windows 主控台直接印中文可能亂碼，不要直接 print 到終端機。
- 抽出的文字記下 PDF 頁碼，寫進 outline.md 的 `來源:`。

### 該問使用者的情況
- 只給主題、沒給資料：先起草 outline.md，請使用者確認後才寫 slides.md。
- 數字找不到出處。
- 需要 8 種 layout 以外的新版型，或要改 `theme/` 底下的檔案、style.css 的 token。
- 需要真實截圖但沒有圖：請使用者把圖放進 `decks/<slug>/public/shots/`，或先改用其他 layout，並在回報中註明。
- git push、建立 repo、開啟 GitHub Pages 等對外動作：一律先問，使用者同意後才做。

### 檢查截圖
- 用 Read 工具看 `decks/<slug>/dist/contact/sheet-*.png`，有疑慮再看 `dist/png/<頁>.png`。不要只看指令有沒有成功就回報完成。
- 修改後重新跑 `npm run shots -- <slug>`，確認修好才算完成。

### 預覽與背景工作
- `npm run dev -- <slug>` 與 `npm run preview` 用背景執行（run_in_background），把網址告訴使用者。
- 結束自己開的伺服器時，只停自己開的那個工作，不要用 taskkill 之類的指令一次結束所有 node 程序。

### Windows 注意事項
- 在 Git Bash 裡，以 `/` 開頭的參數（例如 `--base /keynote-decks/`）會被自動轉成 Windows 路徑。需要帶這類參數時一律透過 `npm run`（走 cmd）或 PowerShell 執行，不要在 Git Bash 直接打 `npx vite ...`、`npx slidev ...`。
- npm script 不要用 `&&` 串接，Windows 的 npm 可能用 PowerShell 5 執行；多步驟寫進 `scripts/*.mjs`。

### 輸出風格
- 回報用繁體中文、條列，照 AGENTS.md 第 13 節的格式。
- 不加 emoji。
