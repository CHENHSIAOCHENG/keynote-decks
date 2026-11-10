<script setup lang="ts">
// bento 版型的卡片：rows=2 是大卡（文字在上、超大數字在下），其他是小卡（數字在上）
withDefaults(defineProps<{
  value?: string
  title?: string
  span?: number
  rows?: number
}>(), { span: 5, rows: 1 })
</script>

<template>
  <div
    class="cell" :class="{ lg: rows > 1 }"
    :style="{ gridColumn: `span ${span}`, gridRow: `span ${rows}` }"
  >
    <div class="words">
      <div class="title">{{ title }}</div>
      <div class="text"><slot /></div>
    </div>
    <div v-if="value" class="value">{{ value }}</div>
  </div>
</template>

<style scoped>
.cell {
  min-height: 0;
  background: var(--surface);
  border-radius: 32px;
  padding: 40px 44px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: 20px;
  overflow: hidden;
}
.value {
  font-size: 96px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.035em;
  white-space: nowrap;
}
.title {
  font-size: 32px;
  font-weight: 700;
}
.text {
  margin-top: 10px;
  font-size: 23px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--fg-muted);
}
.text :deep(p) { margin: 0; line-height: inherit; }

/* 大卡：說明在上，數字壓在左下角 */
.lg {
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 56px;
}
.lg .title { font-size: 40px; }
.lg .text { font-size: 28px; max-width: 18em; }
.lg .value { font-size: 260px; letter-spacing: -0.05em; margin-left: -8px; }
</style>
