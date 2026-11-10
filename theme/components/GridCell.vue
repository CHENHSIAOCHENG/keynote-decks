<script setup lang="ts">
withDefaults(defineProps<{
  value?: string
  title?: string
  span?: number
}>(), { span: 4 })
</script>

<template>
  <div class="cell" :class="{ 'no-value': !value }" :style="{ gridColumn: `span ${span}` }">
    <div v-if="value" class="value">{{ value }}</div>
    <div class="title">{{ title }}</div>
    <div class="text"><slot /></div>
  </div>
</template>

<style scoped>
.cell {
  background: var(--surface);
  border-radius: 32px;
  padding: 48px 44px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.value {
  font-size: 112px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  margin-bottom: 28px;
}
.title {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.no-value .title { font-size: 52px; letter-spacing: -0.02em; }
.no-value .text { margin-top: 16px; font-size: 26px; }
.text {
  margin-top: 12px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--fg-muted);
  text-wrap: balance;
}
</style>
