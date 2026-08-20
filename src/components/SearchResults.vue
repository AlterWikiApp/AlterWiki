<script setup lang="ts">
interface SearchResult {
  title: string
  description?: string
  thumbnail?: string
}

interface Props {
  results: SearchResult[]
  loading: boolean
  error?: string
}

interface Emits {
  (e: 'select', title: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSelect = (title: string) => {
  emit('select', title)
}
</script>

<template>
  <div class="search-results">
    <div v-if="loading" class="search-results__loading">
      Loading...
    </div>
    
    <div v-else-if="error" class="search-results__error">
      {{ error }}
    </div>
    
    <div v-else-if="results.length === 0" class="search-results__empty">
      No results found
    </div>
    
    <ul v-else class="search-results__list">
      <li
        v-for="result in results"
        :key="result.title"
        class="search-results__item"
        @click="handleSelect(result.title)"
        @keydown.enter="handleSelect(result.title)"
        tabindex="0"
        role="button"
        :aria-label="`Open article: ${result.title}`"
      >
        <div class="search-results__item-content">
          <h3 class="search-results__title">{{ result.title }}</h3>
          <p v-if="result.description" class="search-results__description">
            {{ result.description }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-results {
  margin-top: 1rem;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
}

.dark .search-results {
  border-color: #4b5563;
  background-color: #374151;
}

.search-results__loading,
.search-results__error,
.search-results__empty {
  padding: 1rem;
  text-align: center;
  color: #6b7280;
}

.dark .search-results__loading,
.dark .search-results__error,
.dark .search-results__empty {
  color: #9ca3af;
}

.search-results__error {
  color: #ef4444;
}

.dark .search-results__error {
  color: #f87171;
}

.search-results__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-results__item {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dark .search-results__item {
  border-bottom-color: #4b5563;
}

.search-results__item:hover,
.search-results__item:focus {
  background-color: #f3f4f6;
  outline: none;
}

.dark .search-results__item:hover,
.dark .search-results__item:focus {
  background-color: #4b5563;
}

.search-results__item:last-child {
  border-bottom: none;
}

.search-results__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
}

.dark .search-results__title {
  color: #f9fafb;
}

.search-results__description {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.4;
}

.dark .search-results__description {
  color: #9ca3af;
}
</style>
