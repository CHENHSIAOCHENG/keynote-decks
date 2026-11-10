<script setup lang="ts">
defineProps<{ section?: string }>()
</script>

<template>
  <div class="slidev-layout statement-page">
    <div class="eyebrow">{{ section }}</div>
    <slot />
  </div>
</template>

<style scoped>
.statement-page {
  height: 100%;
  padding: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.statement-page :deep(h1) { font-size: 140px; letter-spacing: -0.03em; }
</style>
