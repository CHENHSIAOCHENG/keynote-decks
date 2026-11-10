<script setup lang="ts">
defineProps<{ section?: string }>()
</script>

<template>
  <div class="slidev-layout grid-page">
    <header class="head">
      <div class="eyebrow">{{ section }}</div>
      <slot />
      <div class="lead body-text"><slot name="lead" /></div>
    </header>

    <div class="cells"><slot name="cells" /></div>
  </div>
</template>

<style scoped>
/* 12 欄格線：欄寬 = (1920 - 120*2 - 24*11) / 12 = 118px */
.grid-page {
  height: 100%;
  padding: 104px 120px 96px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto 1fr;
  column-gap: 24px;
  row-gap: 72px;
}
.head {
  grid-column: 2 / span 10;
  text-align: center;
}
.lead { margin: 28px auto 0; max-width: 30em; }
.cells {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  row-gap: 24px;
  align-self: center;
}
</style>
