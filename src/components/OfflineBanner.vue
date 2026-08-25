<script setup lang="ts">
import { isOnline } from '../state/online'
</script>

<template>
  <div
    v-if="!isOnline"
    class="offline-banner"
    role="status"
    aria-live="polite"
  >
    Du bist offline – keine neuen Artikel
  </div>
</template>

<style scoped>
.offline-banner {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 0.75rem 1rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  background-color: #fef3c7;
  border-bottom: 1px solid #fcd34d;
}

.dark .offline-banner {
  color: #fef3c7;
  background-color: #78350f;
  border-bottom-color: #92400e;
}
</style>
