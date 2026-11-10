<script setup lang="ts">
defineProps<{
  section?: string
  image?: string
  windowTitle?: string
}>()
</script>

<template>
  <div class="slidev-layout tech">
    <header class="head">
      <div class="eyebrow">{{ section }}</div>
      <slot />
      <div class="body-text"><slot name="body" /></div>
    </header>

    <!-- 截圖刻意超出畫面底部，製造產品圖的延伸感 -->
    <section class="shot">
      <MacWindow v-if="image" :title="windowTitle">
        <img :src="image" alt="" />
      </MacWindow>
    </section>
  </div>
</template>

<style scoped>
.tech {
  position: relative;
  height: 100%;
  padding: 96px 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  text-align: center;
}
.head .body-text { margin-top: 24px; }
.shot {
  width: 1320px;
  margin-top: 64px;
}
</style>
