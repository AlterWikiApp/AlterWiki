<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchInput from '../components/SearchInput.vue'
import SearchResults from '../components/SearchResults.vue'
import LanguageSelector from '../components/LanguageSelector.vue'
import { wikipediaClient } from '../api/wikipediaClient'
import { isOnline } from '../state/online'
import { currentLanguage } from '../state/language'

const router = useRouter()
const searchResults = ref<any[] | null>(null)
const isLoading = ref(false)
const error = ref<string>()

const handleSearch = async (query: string) => {
  if (!query.trim()) {
    searchResults.value = null
    return
  }

  if (!isOnline.value) {
    error.value = 'Du bist offline – keine neuen Artikel'
    searchResults.value = []
    return
  }

  isLoading.value = true
  error.value = undefined
  
  try {
    const response = await wikipediaClient.search(query, currentLanguage.value, 10)
    
    if (response.pages) {
      searchResults.value = response.pages.map((page: any) => ({
        title: page.title,
        description: page.description,
        thumbnail: page.thumbnail?.source,
      }))
    } else {
      searchResults.value = []
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Search failed'
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}

const handleSelectResult = (title: string) => {
  router.push({ name: 'article', params: { title: title.replace(/ /g, '_') } })
}
</script>

<template>
  <div class="search-page">
    <div class="search-page__container">
            <div class="search-page__header">
        <h1 class="search-page__title">New Wikipedia Viewer</h1>
        <LanguageSelector />
      </div>
      
      <div class="search-page__input-wrapper">
        <SearchInput
          v-model="searchQuery"
          @search="handleSearch"
          placeholder="Search Wikipedia..."
        />
      </div>
      
      <SearchResults
        :results="searchResults"
        :loading="isLoading"
        :error="error"
        @select="handleSelectResult"
      />
    </div>
  </div>
</template>

<style scoped>
.search-page {
  min-height: 100vh;
  padding: 2rem 1rem;
  background-color: #f9fafb;
}

.dark .search-page {
  background-color: #111827;
}

.search-page__container {
  max-width: 800px;
  margin: 0 auto;
}

.search-page__title {
  margin: 0 0 2rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
}

.dark .search-page__title {
  color: #f9fafb;
}
.search-page__input-wrapper {
  margin-bottom: 1rem;
}
.search-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

@media (max-width: 640px) {
  .search-page__header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
.search-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

@media (max-width: 640px) {
  .search-page__header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
