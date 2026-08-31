<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LanguageSelector from '../components/LanguageSelector.vue'
import LinkDisplayPanel from '../components/LinkDisplayPanel.vue'
import TableOfContents from '../components/TableOfContents.vue'
import { wikipediaClient } from '../api/wikipediaClient'
import { sanitizeHtml, isInternalWikipediaLink, extractArticleTitle } from '../security/sanitizer'
import { currentLanguage } from '../state/language'
import { linkDisplay } from '../state/linkDisplay'
import { prepareArticleToc, type TocHeading } from '../utils/articleToc'

const route = useRoute()
const router = useRouter()

const articleHtml = ref('')
const tocHeadings = ref<TocHeading[]>([])
const isLoading = ref(true)
const error = ref<string>()
const articleTitle = computed(() => route.params.title as string)

/** CSS custom properties applied only to article content — never to the panel. */
const hasCustomLinkStyle = computed(
  () =>
    linkDisplay.noVisualStyle ||
    linkDisplay.color !== null ||
    !linkDisplay.underline,
)

const articleLinkStyle = computed(() => {
  if (linkDisplay.noVisualStyle) {
    return {
      '--article-link-color': 'inherit',
      '--article-link-decoration': 'none',
      '--article-link-hover-color': 'inherit',
    } as Record<string, string>
  }

  const style: Record<string, string> = {
    '--article-link-decoration': linkDisplay.underline ? 'underline' : 'none',
  }

  if (linkDisplay.color) {
    style['--article-link-color'] = linkDisplay.color
    style['--article-link-hover-color'] = linkDisplay.color
  }

  return style
})

// Watch for route param changes to reload article content when navigating
// between articles via internal wikilinks (same component, different params)
watch(
  () => route.params.title,
  (newTitle, oldTitle) => {
    if (newTitle && newTitle !== oldTitle) {
      articleHtml.value = ''
      tocHeadings.value = []
      loadArticle()
    }
  },
  { immediate: false }
)

onMounted(async () => {
  await loadArticle()
})

const loadArticle = async () => {
  if (!articleTitle.value) {
    error.value = 'No article title provided'
    isLoading.value = false
    return
  }

  isLoading.value = true
  error.value = undefined

  try {
    const rawHtml = await wikipediaClient.getArticle(articleTitle.value)
    // MANDATORY: Sanitize all Wikipedia HTML before rendering
    const sanitized = sanitizeHtml(rawHtml)
    const prepared = prepareArticleToc(sanitized)
    articleHtml.value = prepared.html
    tocHeadings.value = prepared.headings
    // Scroll to top so user starts at beginning of new article
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load article'
    articleHtml.value = ''
    tocHeadings.value = []
  } finally {
    isLoading.value = false
  }
}

// Watch for language changes to reload article in new language
watch(currentLanguage, () => {
  articleHtml.value = ''
  tocHeadings.value = []
  loadArticle()
})

const handleLinkClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const anchor = target.closest('a')
  
  if (!anchor) return

  const href = anchor.getAttribute('href')
  if (!href) return

  // Intercept internal Wikipedia links for in-app navigation
  if (isInternalWikipediaLink(href)) {
    event.preventDefault()
    const title = extractArticleTitle(href)
    if (title) {
      router.push({ name: 'article', params: { title: title.replace(/ /g, '_') } })
    }
  }
  // External links open normally (browser default behavior)
}

const goBack = () => {
  router.push({ name: 'search' })
}
</script>

<template>
  <div class="article-view">
    <div class="article-view__container">
      <div class="article-view__header">
        <div class="article-view__header-left">
          <button 
            class="article-view__back-button"
            @click="goBack"
            aria-label="Back to search"
          >
            ← Back to Search
          </button>
          <h1 class="article-view__title">{{ articleTitle.replace(/_/g, ' ') }}</h1>
        </div>
        <div class="article-view__header-actions">
          <LinkDisplayPanel />
          <LanguageSelector />
        </div>
      </div>

      <div v-if="isLoading" class="article-view__loading">
        Loading article...
      </div>

      <div v-else-if="error" class="article-view__error">
        <p>{{ error }}</p>
        <button @click="loadArticle" class="article-view__retry-button">
          Retry
        </button>
      </div>

      <div v-else class="article-view__body">
        <aside class="article-view__toc" aria-label="Artikel-Navigation">
          <TableOfContents :headings="tocHeadings" />
        </aside>
        <div
          class="article-view__content"
          :class="{ 'article-view__content--custom-links': hasCustomLinkStyle }"
          :style="articleLinkStyle"
          v-html="articleHtml"
          @click="handleLinkClick"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-view {
  min-height: 100vh;
  padding: 2rem 1rem;
  background-color: #f9fafb;
}

.dark .article-view {
  background-color: #111827;
}

.article-view__container {
  max-width: 1120px;
  margin: 0 auto;
}

.article-view__body {
  display: grid;
  /* Aside must stretch to content height so sticky TOC can follow scroll */
  grid-template-columns: minmax(11rem, 15rem) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: stretch;
}

.article-view__toc {
  min-width: 0;
  /* Tall column: sticky child stays visible while article scrolls */
}

@media (max-width: 640px) {
  .article-view__body {
    grid-template-columns: minmax(8.5rem, 10rem) minmax(0, 1fr);
    gap: 0.75rem;
  }
}

.article-view__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.dark .article-view__header {
  border-bottom-color: #374151;
}

.article-view__header-left {
  flex: 1;
  min-width: 0;
}

.article-view__header-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .article-view__header {
    flex-direction: column;
    align-items: stretch;
  }

  .article-view__header-actions {
    justify-content: flex-start;
  }
}

.article-view__back-button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.article-view__back-button:hover {
  background-color: #2563eb;
}

.article-view__title {
  margin: 1rem 0 0 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.dark .article-view__title {
  color: #f9fafb;
}

.article-view__loading,
.article-view__error {
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}

.dark .article-view__loading,
.dark .article-view__error {
  color: #9ca3af;
}

.article-view__error {
  color: #ef4444;
}

.dark .article-view__error {
  color: #f87171;
}

.article-view__retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.article-view__retry-button:hover {
  background-color: #2563eb;
}

.article-view__content {
  line-height: 1.7;
  color: #1f2937;
}

.dark .article-view__content {
  color: #f9fafb;
}

/* Article content styling overrides */
.article-view__content :deep(h1),
.article-view__content :deep(h2),
.article-view__content :deep(h3),
.article-view__content :deep(h4),
.article-view__content :deep(h5),
.article-view__content :deep(h6) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #111827;
  scroll-margin-top: 1rem;
}

.dark .article-view__content :deep(h1),
.dark .article-view__content :deep(h2),
.dark .article-view__content :deep(h3),
.dark .article-view__content :deep(h4),
.dark .article-view__content :deep(h5),
.dark .article-view__content :deep(h6) {
  color: #f9fafb;
}

.article-view__content :deep(h1) {
  font-size: 1.875rem;
}

.article-view__content :deep(h2) {
  font-size: 1.5rem;
}

.article-view__content :deep(h3) {
  font-size: 1.25rem;
}

.article-view__content :deep(p) {
  margin-bottom: 1rem;
}

.article-view__content :deep(a) {
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;
}

.article-view__content :deep(a:hover) {
  color: #2563eb;
}

.dark .article-view__content :deep(a) {
  color: #60a5fa;
}

.dark .article-view__content :deep(a:hover) {
  color: #3b82f6;
}

/* Custom demo styles — only when user changed defaults; panel stays unaffected */
.article-view__content--custom-links :deep(a) {
  color: var(--article-link-color, #3b82f6);
  text-decoration: var(--article-link-decoration, underline);
}

.article-view__content--custom-links :deep(a:hover) {
  color: var(--article-link-hover-color, #2563eb);
}

.dark .article-view__content--custom-links :deep(a) {
  color: var(--article-link-color, #60a5fa);
}

.dark .article-view__content--custom-links :deep(a:hover) {
  color: var(--article-link-hover-color, #3b82f6);
}

.article-view__content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
}

.article-view__content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.article-view__content :deep(th),
.article-view__content :deep(td) {
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
}

.dark .article-view__content :deep(th),
.dark .article-view__content :deep(td) {
  border-color: #374151;
}

.article-view__content :deep(th) {
  background-color: #f3f4f6;
  font-weight: 600;
}

.dark .article-view__content :deep(th) {
  background-color: #374151;
}

.article-view__content :deep(blockquote) {
  margin: 1rem 0;
  padding-left: 1rem;
  border-left: 4px solid #3b82f6;
  color: #6b7280;
}

.dark .article-view__content :deep(blockquote) {
  color: #9ca3af;
}

.article-view__content :deep(code) {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: monospace;
}

.dark .article-view__content :deep(code) {
  background-color: #374151;
}
</style>