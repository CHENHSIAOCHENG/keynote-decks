<script setup lang="ts">
defineProps<{ section?: string }>()
</script>

<template>
  <div class="slidev-layout stats-page">
    <header class="top">
      <span class="eyebrow">{{ section }}</span>
    </header>

    <main class="main">
      <div class="headline"><slot /></div>
      <div class="stats"><slot name="stats" /></div>
    </main>

    <footer class="foot"><slot name="foot" /></footer>
  </div>
</template>

<style scoped>
/* 左側大標題 + 右側以細直線分隔的數字欄，上下各一條細線收邊 */
.stats-page {
  height: 100%;
  padding: 104px 120px 96px;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.top {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}
.top .eyebrow { margin: 0; }
.main {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: start;
  align-content: center;
  padding: 48px 0;
}
.headline { grid-column: 1 / span 4; }
.headline :deep(h1) { font-size: 88px; text-align: left; }
.stats {
  grid-column: 5 / -1;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  align-self: stretch;
}
.stats :deep(.stat) {
  border-left: 1px solid var(--line);
  padding: 8px 0 8px 40px;
}
/* 四欄時數字縮小，避免擠出欄寬 */
.stats:has(> :nth-child(4)) :deep(.value) { font-size: 84px; }
.foot {
  padding-top: 28px;
  border-top: 1px solid var(--line);
  font-size: 28px;
  font-weight: 500;
  color: var(--fg-muted);
}
.foot :deep(p) { margin: 0; line-height: 1.4; }
</style>
