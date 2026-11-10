<script setup lang="ts">
defineProps<{
  section?: string
  image?: string
}>()
</script>

<template>
  <div class="slidev-layout diagram-page">
    <header class="head">
      <div class="eyebrow">{{ section }}</div>
      <slot />
      <div class="body-text"><slot name="body" /></div>
    </header>

    <!-- 示意圖直接放在投影片上，不加視窗外框 -->
    <figure class="fig">
      <img v-if="image" :src="image" alt="" />
    </figure>
  </div>
</template>

<style scoped>
.diagram-page {
  height: 100%;
  padding: 88px 120px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.head .body-text { margin-top: 20px; }
.fig {
  flex: 1;
  min-height: 0;
  width: 1680px;
  margin: 40px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fig img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
