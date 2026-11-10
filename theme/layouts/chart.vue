<script setup lang="ts">
defineProps<{
  section?: string
  unit?: string
  source?: string
}>()
</script>

<template>
  <div class="slidev-layout chart-page">
    <header class="top">
      <span class="eyebrow">{{ section }}</span>
    </header>

    <div class="titlebar">
      <div class="title"><slot /></div>
      <div class="unit">{{ unit }}</div>
    </div>
    <div class="lead body-text"><slot name="lead" /></div>

    <div class="chart"><slot name="chart" /></div>

    <footer class="source">{{ source }}</footer>
  </div>
</template>

<style scoped>
/* 直接畫在投影片上的圖表：標題靠左、單位靠右、底部標資料來源 */
.chart-page {
  height: 100%;
  padding: 104px 120px 88px;
  display: grid;
  grid-template-rows: auto auto auto 1fr auto;
}
.top {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}
.top .eyebrow { margin: 0; }
.titlebar {
  margin-top: 48px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 48px;
}
.title :deep(h1) { font-size: 88px; text-align: left; }
.unit {
  padding-bottom: 14px;
  font-size: 22px;
  font-weight: 600;
  color: var(--fg-faint);
  white-space: nowrap;
}
.lead {
  margin-top: 20px;
  max-width: 1100px;
  text-align: left;
}
.chart {
  min-height: 0;
  padding: 56px 0 32px;
}
.source {
  padding-top: 20px;
  border-top: 1px solid var(--line);
  font-size: 20px;
  font-weight: 500;
  color: var(--fg-faint);
}
</style>
