<script setup lang="ts">
import type { TocHeading } from '../utils/articleToc'

defineProps<{
  headings: TocHeading[]
}>()

const scrollToHeading = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // Move focus for keyboard / screen reader users
  if (!el.hasAttribute('tabindex')) {
    el.setAttribute('tabindex', '-1')
  }
  el.focus({ preventScroll: true })
}
</script>

<template>
  <nav
    v-if="headings.length > 0"
    class="toc"
    aria-label="Table of contents"
  >
    <h2 class="toc__title">Contents</h2>
    <ol class="toc__list">
      <li
        v-for="item in headings"
        :key="item.id"
        class="toc__item"
        :class="`toc__item--level-${item.level}`"
      >
        <a
          class="toc__link"
          :href="`#${item.id}`"
          @click.prevent="scrollToHeading(item.id)"
        >
          {{ item.text }}
        </a>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.toc {
  position: sticky;
  top: 1rem;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  padding: 0.75rem 0.875rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #ffffff;
  /* Isolation from article link customizations */
  color: #1f2937;
  text-decoration: none;
  scrollbar-gutter: stable;
}

.dark .toc {
  background-color: #1f2937;
  border-color: #374151;
  color: #f9fafb;
}

.toc__title {
  position: sticky;
  top: 0;
  z-index: 1;
  margin: 0 0 0.75rem;
  padding-bottom: 0.35rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
  background-color: #ffffff;
}

.dark .toc__title {
  color: #9ca3af;
  background-color: #1f2937;
}

.toc__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.toc__item {
  margin: 0;
}

.toc__item--level-3 {
  padding-left: 0.75rem;
}

.toc__item--level-4 {
  padding-left: 1.25rem;
}

.toc__item--level-5,
.toc__item--level-6 {
  padding-left: 1.75rem;
}

.toc__link {
  display: block;
  padding: 0.35rem 0.25rem;
  font-size: 0.8125rem;
  line-height: 1.35;
  color: #374151;
  text-decoration: none;
  border-radius: 0.25rem;
  border-left: 2px solid transparent;
}

.toc__link:hover {
  color: #1d4ed8;
  background-color: #eff6ff;
}

.toc__link:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 1px;
}

.dark .toc__link {
  color: #d1d5db;
}

.dark .toc__link:hover {
  color: #93c5fd;
  background-color: #1e3a5f;
}

@media (max-width: 640px) {
  .toc {
    top: 0.5rem;
    max-height: calc(100vh - 1rem);
    padding: 0.5rem 0.5rem;
  }

  .toc__link {
    font-size: 0.75rem;
    padding: 0.25rem 0.15rem;
  }

  .toc__item--level-3 {
    padding-left: 0.4rem;
  }

  .toc__item--level-4 {
    padding-left: 0.7rem;
  }

  .toc__item--level-5,
  .toc__item--level-6 {
    padding-left: 1rem;
  }
}
</style>
