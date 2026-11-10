<script setup lang="ts">
defineProps<{
  value?: string
  title?: string
}>()
</script>

<template>
  <div class="stat">
    <div class="value">{{ value }}</div>
    <div class="title">{{ title }}</div>
    <div class="text"><slot /></div>
  </div>
</template>

<style scoped>
.value {
  font-size: 120px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.035em;
  white-space: nowrap;
}
.title {
  margin-top: 32px;
  font-size: 30px;
  font-weight: 700;
}
.text {
  margin-top: 12px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--fg-muted);
}
.text :deep(p) { margin: 0; line-height: inherit; }
</style>
