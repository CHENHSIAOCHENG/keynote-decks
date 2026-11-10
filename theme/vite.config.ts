import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// 調色盤可以改寫的 token；其他變數一律拒絕
const TOKENS = ['--bg', '--fg', '--fg-muted', '--fg-faint', '--surface', '--glow', '--glow-strength']
const VALUE = /^(#[0-9a-f]{6}|\d{1,3}%)$/i
const STYLE = fileURLToPath(new URL('./style.css', import.meta.url))

export default defineConfig({
  plugins: [{
    name: 'palette-save',
    apply: 'serve',
    configureServer(server) {
      // POST /__palette  { "--bg": "#000000", ... } → 寫回 style.css 的 :root
      server.middlewares.use('/__palette', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end()
        }
        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', () => {
          try {
            let css = fs.readFileSync(STYLE, 'utf8')
            for (const [key, value] of Object.entries(JSON.parse(body))) {
              if (!TOKENS.includes(key) || typeof value !== 'string' || !VALUE.test(value))
                throw new Error(`invalid token ${key}`)
              css = css.replace(new RegExp(`(^\\s*${key}:\\s*)[^;]+;`, 'm'), `$1${value};`)
            }
            fs.writeFileSync(STYLE, css)
            res.end('ok')
          }
          catch (e) {
            res.statusCode = 400
            res.end(String(e))
          }
        })
      })
    },
  }],
})
