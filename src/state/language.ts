
// Central language state with localStorage persistence
// Default: English ('en')

import { ref, watch } from 'vue'

const STORAGE_KEY = 'alterwiki-language'

// Supported Wikipedia language codes
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'zh', name: 'Chinese', native: '中文' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
] as const

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code']

function getStoredLanguage(): LanguageCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const isValid = SUPPORTED_LANGUAGES.some((lang) => lang.code === stored)
      if (isValid) return stored as LanguageCode
    }
  } catch {
    // localStorage not available (e.g. private mode)
  }
  return 'en'
}

function storeLanguage(code: LanguageCode): void {
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    // localStorage not available — ignore
  }
}

// Reactive global language state
export const currentLanguage = ref<LanguageCode>(getStoredLanguage())

// Persist changes to localStorage
watch(currentLanguage, (newLang) => {
  storeLanguage(newLang)
})

export function setLanguage(code: LanguageCode): void {
  currentLanguage.value = code
}

export function getLanguageName(code: LanguageCode): string {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code)
  return lang?.native || code
}
