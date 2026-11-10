<script setup lang="ts">
defineProps<{ section?: string }>()
</script>

<template>
  <div class="slidev-layout bento-page">
    <header class="top">
      <span class="eyebrow">{{ section }}</span>
    </header>

    <div class="titlebar">
      <div class="title"><slot /></div>
      <div class="lead body-text"><slot name="lead" /></div>
    </div>

    <div class="cells"><slot name="cells" /></div>
  </div>
</template>

<style scoped>
/* 一大多小的不對稱卡片：大卡放最重要的數字，小卡補充 */
.bento-page {
  height: 100%;
  padding: 104px 120px 96px;
  display: grid;
  grid-template-rows: auto auto 1fr;
}
.top {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}
.top .eyebrow { margin: 0; }
.titlebar {
  margin: 48px 0 48px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 64px;
}
.title :deep(h1) { font-size: 80px; text-align: left; white-space: nowrap; }
.lead {
  max-width: 640px;
  padding-bottom: 8px;
  text-align: right;
}
.cells {
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 24px;
}
</style>
