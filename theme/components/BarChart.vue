<script setup lang="ts">
import { computed } from 'vue'

// 直立長條圖：只把 hi 的那一根上 accent 色，其他是灰階
const props = defineProps<{
  items: { label: string, value: number, display?: string, note?: string, hi?: boolean }[]
  max?: number
}>()

const top = computed(() => props.max ?? Math.max(...props.items.map(i => i.value)))
</script>

<template>
  <div class="bars" :style="{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }">
    <div v-for="it in items" :key="it.label" class="col" :class="{ hi: it.hi }">
      <div class="track">
        <div class="bar" :style="{ height: `${(it.value / top) * 100}%` }">
          <span class="num">{{ it.display ?? it.value }}</span>
        </div>
      </div>
      <div class="label">{{ it.label }}</div>
      <div v-if="it.note" class="note">{{ it.note }}</div>
    </div>
  </div>
</template>

<style scoped>
.bars {
  height: 100%;
  display: grid;
  column-gap: 56px;
  border-bottom: 1px solid var(--line);
}
.col {
  min-height: 0;
  display: grid;
  grid-template-rows: 1fr auto auto;
}
.track {
  min-height: 0;
  display: flex;
  align-items: flex-end;
  padding-top: 96px;
}
.bar {
  position: relative;
  width: 100%;
  border-radius: 12px 12px 0 0;
  background: #3a3a3c;
}
.hi .bar { background: var(--accent); }
.num {
  position: absolute;
  left: 0;
  bottom: calc(100% + 16px);
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--fg-muted);
}
.hi .num { color: var(--fg); }
.label {
  margin-top: 24px;
  font-size: 28px;
  font-weight: 700;
}
.note {
  margin: 6px 0 24px;
  font-size: 22px;
  font-weight: 500;
  color: var(--fg-muted);
}
</style>
