
<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  currentLanguage,
  setLanguage,
  SUPPORTED_LANGUAGES,
  type LanguageCode,
} from '../state/language'

const isOpen = ref(false)

const currentLabel = computed(() => {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage.value)
  return lang?.native || currentLanguage.value
})

const selectLanguage = (code: LanguageCode) => {
  console.log('Selecting language:', code)
  setLanguage(code)
  isOpen.value = false
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="language-selector">
    <button
      class="language-selector__button"
      @click="toggleDropdown"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :aria-label="`Current language: ${currentLabel}. Change language.`"
    >
      <span class="language-selector__current">{{ currentLabel }}</span>
      <span class="language-selector__arrow" :class="{ 'language-selector__arrow--open': isOpen }">
        ▼
      </span>
    </button>

    <ul
      v-if="isOpen"
      class="language-selector__dropdown"
      role="listbox"
      aria-label="Select language"
    >
      <li
        v-for="lang in SUPPORTED_LANGUAGES"
        :key="lang.code"
        class="language-selector__option"
        :class="{ 'language-selector__option--active': lang.code === currentLanguage }"
        role="option"
        :aria-selected="lang.code === currentLanguage"
        @click="selectLanguage(lang.code)"
      >
        <span class="language-selector__native">{{ lang.native }}</span>
        <span class="language-selector__name">{{ lang.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.language-selector {
  position: relative;
  display: inline-block;
}

.language-selector__button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.language-selector__button:hover {
  border-color: #9ca3af;
}

.language-selector__button:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.dark .language-selector__button {
  background-color: #1f2937;
  border-color: #4b5563;
  color: #e5e7eb;
}

.dark .language-selector__button:hover {
  border-color: #6b7280;
}

.language-selector__current {
  font-weight: 500;
}

.language-selector__arrow {
  font-size: 0.625rem;
  transition: transform 0.2s;
}

.language-selector__arrow--open {
  transform: rotate(180deg);
}

.language-selector__dropdown {
  position: absolute;
  top: calc(100% + 0.25rem);
  right: 0;
  min-width: 12rem;
  margin: 0;
  padding: 0.25rem 0;
  list-style: none;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 50;
}

.dark .language-selector__dropdown {
  background-color: #1f2937;
  border-color: #4b5563;
}

.language-selector__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
  transition: background-color 0.15s;
}

.language-selector__option:hover {
  background-color: #f3f4f6;
}

.language-selector__option--active {
  background-color: #eff6ff;
  color: #1d4ed8;
  font-weight: 500;
}

.dark .language-selector__option {
  color: #e5e7eb;
}

.dark .language-selector__option:hover {
  background-color: #374151;
}

.dark .language-selector__option--active {
  background-color: #1e3a5f;
  color: #93c5fd;
}

.language-selector__native {
  font-weight: 500;
}

.language-selector__name {
  font-size: 0.75rem;
  color: #6b7280;
}

.dark .language-selector__name {
  color: #9ca3af;
}
</style>
