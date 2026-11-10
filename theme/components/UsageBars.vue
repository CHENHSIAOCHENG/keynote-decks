<script setup lang="ts">
// 水平用量條：左邊項目、中間進度條、右邊數值；hi 的那一列上 accent 色
defineProps<{
  items: { label: string, note?: string, value: string, pct: number, hi?: boolean }[]
}>()
</script>

<template>
  <div class="rows">
    <div v-for="it in items" :key="it.label" class="row" :class="{ hi: it.hi }">
      <div class="ub-meta">
        <div class="ub-label">{{ it.label }}</div>
        <div v-if="it.note" class="ub-note">{{ it.note }}</div>
      </div>
      <div class="track">
        <div class="fill" :style="{ width: `${Math.max(it.pct, 1.5)}%` }" />
      </div>
      <div class="value">{{ it.value }}</div>
    </div>
  </div>
</template>

<style scoped>
.rows {
  height: 100%;
  display: grid;
  grid-auto-rows: 1fr;
  align-content: stretch;
}
.row {
  display: grid;
  grid-template-columns: 560px 1fr 220px;
  align-items: center;
  column-gap: 48px;
  border-bottom: 1px solid var(--line);
}
.row:first-child { border-top: 1px solid var(--line); }
.ub-label {
  font-family: var(--font-sans);
  font-size: 32px;
  font-weight: 700;
}
.ub-note {
  font-family: var(--font-sans);
  margin-top: 6px;
  font-size: 22px;
  font-weight: 500;
  color: var(--fg-muted);
}
.track {
  height: 44px;
  border-radius: 22px;
  background: var(--surface);
  overflow: hidden;
}
.fill {
  height: 100%;
  border-radius: 22px;
  background: #48484a;
}
.hi .fill { background: var(--accent); }
.value {
  text-align: right;
  font-size: 64px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--fg-muted);
}
.hi .value { color: var(--fg); }
</style>
