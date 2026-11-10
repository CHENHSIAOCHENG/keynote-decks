<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useNav } from '@slidev/client'

// dev 預覽專用的調色盤：即時改 CSS 變數，按儲存寫回 style.css（見 vite.config.ts）
const { isPrintMode } = useNav()
const visible = computed(() =>
  import.meta.env.DEV
  && !isPrintMode.value
  && !/^\/(presenter|overview|export|print)/.test(location.pathname))

const FIELDS = [
  { key: '--bg', label: '背景' },
  { key: '--glow', label: '漸層光' },
  { key: '--fg', label: '標題文字' },
  { key: '--fg-muted', label: '內文' },
  { key: '--fg-faint', label: '小標' },
  { key: '--surface', label: '卡片' },
] as const

const PRESETS = [
  { name: 'Ocean', vars: { '--bg': '#000000', '--glow': '#2997ff', '--glow-strength': '34%', '--surface': '#161617' } },
  { name: 'Teal', vars: { '--bg': '#000000', '--glow': '#30d5c8', '--glow-strength': '30%', '--surface': '#141818' } },
  { name: 'Indigo', vars: { '--bg': '#000000', '--glow': '#5e5ce6', '--glow-strength': '38%', '--surface': '#16161c' } },
  { name: 'Midnight', vars: { '--bg': '#05070d', '--glow': '#2997ff', '--glow-strength': '48%', '--surface': '#121620' } },
  { name: 'Graphite', vars: { '--bg': '#000000', '--glow': '#8e8e93', '--glow-strength': '22%', '--surface': '#1c1c1e' } },
]

const open = ref(false)
const status = ref('')
const values = reactive<Record<string, string>>({})
let saved: Record<string, string> = {}

const strength = computed({
  get: () => Number.parseInt(values['--glow-strength'] ?? '0'),
  set: (n: number) => apply('--glow-strength', `${n}%`),
})
const dirty = computed(() => Object.keys(values).some(k => values[k] !== saved[k]))

function apply(key: string, value: string) {
  values[key] = value
  document.documentElement.style.setProperty(key, value)
  status.value = ''
}

function applyPreset(vars: Record<string, string>) {
  for (const [key, value] of Object.entries(vars))
    apply(key, value)
}

function reset() {
  for (const key of Object.keys(saved))
    apply(key, saved[key])
}

async function save() {
  status.value = '儲存中…'
  const res = await fetch('/__palette', { method: 'POST', body: JSON.stringify(values) })
  if (res.ok) {
    saved = { ...values }
    status.value = '已寫入 style.css'
  }
  else {
    status.value = `儲存失敗：${await res.text()}`
  }
}

onMounted(() => {
  const css = getComputedStyle(document.documentElement)
  for (const key of [...FIELDS.map(f => f.key), '--glow-strength'])
    values[key] = css.getPropertyValue(key).trim()
  saved = { ...values }
})
</script>

<template>
  <Teleport v-if="visible" to="body">
    <div class="palette" :class="{ open }">
      <button class="toggle" @click="open = !open">
        {{ open ? '關閉' : '調色盤' }}<span v-if="dirty" class="dot" />
      </button>

      <div v-if="open" class="panel">
        <div class="section">預設配色</div>
        <div class="presets">
          <button
            v-for="p in PRESETS" :key="p.name" class="preset"
            :style="{ background: `radial-gradient(circle at 50% 120%, ${p.vars['--glow']}, ${p.vars['--bg']} 70%)` }"
            :title="p.name" @click="applyPreset(p.vars)"
          >
            <span>{{ p.name }}</span>
          </button>
        </div>

        <div class="section">顏色</div>
        <label v-for="f in FIELDS" :key="f.key" class="row">
          <span>{{ f.label }}</span>
          <code>{{ values[f.key] }}</code>
          <input type="color" :value="values[f.key]" @input="apply(f.key, ($event.target as HTMLInputElement).value)">
        </label>

        <label class="row">
          <span>漸層強度</span>
          <code>{{ values['--glow-strength'] }}</code>
          <input v-model.number="strength" type="range" min="0" max="80">
        </label>

        <div class="actions">
          <button :disabled="!dirty" @click="reset">還原</button>
          <button class="primary" :disabled="!dirty" @click="save">儲存</button>
        </div>
        <div class="status">{{ status || (dirty ? '尚未儲存，重新整理會遺失' : '與 style.css 同步') }}</div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.palette {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  font: 13px/1.4 -apple-system, BlinkMacSystemFont, 'PingFang TC', sans-serif;
  color: #f5f5f7;
}
button {
  font: inherit;
  color: inherit;
  cursor: pointer;
}
.toggle {
  float: right;
  position: relative;
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 999px;
  background: rgba(30, 30, 32, .8);
  backdrop-filter: blur(20px);
}
.dot {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff9f0a;
}
.panel {
  clear: both;
  width: 280px;
  margin-top: 44px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 16px;
  background: rgba(28, 28, 30, .92);
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, .5);
}
.section {
  margin: 4px 0 8px;
  font-size: 11px;
  font-weight: 600;
  color: #8e8e93;
}
.presets {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  margin-bottom: 14px;
}
.preset {
  height: 40px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.preset span {
  font-size: 9px;
  padding-bottom: 3px;
  color: rgba(255, 255, 255, .8);
}
.row {
  display: grid;
  grid-template-columns: 1fr auto 44px;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
}
.row code {
  font: 11px ui-monospace, monospace;
  color: #8e8e93;
}
.row input[type='color'] {
  width: 44px;
  height: 26px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 6px;
  background: none;
  cursor: pointer;
}
.row input[type='range'] {
  grid-column: 1 / -1;
  width: 100%;
  accent-color: #2997ff;
}
.actions {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}
.actions button {
  flex: 1;
  padding: 7px 0;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 8px;
  background: rgba(255, 255, 255, .06);
}
.actions .primary {
  border-color: transparent;
  background: #0a84ff;
}
.actions button:disabled {
  opacity: .4;
  cursor: default;
}
.status {
  margin-top: 10px;
  font-size: 11px;
  color: #8e8e93;
}
</style>
