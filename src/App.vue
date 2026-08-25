<script setup lang="ts">
import OfflineBanner from './components/OfflineBanner.vue'
import ThemeToggle from './components/ThemeToggle.vue'
</script>

<template>
  <div class="app">
    <header class="app__header">
      <ThemeToggle />
    </header>
    <OfflineBanner />
    <router-view />
  </div>
</template>

<style scoped>
.app__header {
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem 1rem 0;
}

@media (max-width: 640px) {
  .app__header {
    padding: 0.5rem 0.75rem 0;
  }
}
</style>
