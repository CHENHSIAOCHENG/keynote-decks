<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <div class="win">
    <div class="bar">
      <span class="dot r" /><span class="dot y" /><span class="dot g" />
      <span class="title">{{ title }}</span>
    </div>
    <div class="content"><slot /></div>
  </div>
</template>

<style scoped>
.win {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: #1e1e1e;
  border: 1px solid rgba(255, 255, 255, .1);
  box-shadow: 0 40px 80px rgba(0, 0, 0, .55), 0 0 0 1px rgba(0, 0, 0, .4);
}
.bar {
  height: 44px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 18px;
  background: #2a2a2a;
  position: relative;
}
.dot { width: 12px; height: 12px; border-radius: 50%; }
.r { background: #ff5f57; }
.y { background: #febc2e; }
.g { background: #28c840; }
.title {
  position: absolute;
  left: 0; right: 0;
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, .55);
  pointer-events: none;
}
.content :deep(img) { display: block; width: 100%; height: auto; }
</style>
