<template>
  <div class="slidev-layout cover-page">
    <main><slot /></main>
    <footer class="subtitle">{{ $slidev.configs.footer }}</footer>
  </div>
</template>

<style scoped>
.cover-page {
  height: 100%;
  padding: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
main :deep(h1) { font-size: 150px; letter-spacing: -0.03em; line-height: 1.06; }
.subtitle {
  margin-top: 64px;
  font-size: 32px;
  font-weight: 500;
  color: var(--fg-faint);
}
</style>
