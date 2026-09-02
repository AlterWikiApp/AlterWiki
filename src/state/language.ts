
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
export const NOT_FOUND_MESSAGES: Record<LanguageCode, string> = {
  en: 'This article does not exist in English',
  de: 'Dieser Artikel existiert nicht auf Deutsch',
  fr: "Cet article n'existe pas en français",
  es: 'Este artículo no existe en español',
  it: 'Questo articolo non esiste in italiano',
  pt: 'Este artigo não existe em português',
  ru: 'Эта статья не существует на русском',
  ja: 'この記事は日本語では存在しません',
  zh: '该文章不存在于中文',
  ar: 'هذه المقالة غير موجودة باللغة العربية',
}
export function getLanguageName(code: LanguageCode): string {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code)
  return lang?.native || code
}
