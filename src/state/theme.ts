import { ref, computed, watch } from 'vue'

export type ThemePreference = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'alterwiki-theme'
const TRANSITION_CLASS = 'theme-transition'
const TRANSITION_MS = 300

export function getSystemDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function resolveIsDark(preference: ThemePreference): boolean {
  if (preference === 'dark') return true
  if (preference === 'light') return false
  return getSystemDark()
}

function getStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  } catch {
    // localStorage not available
  }
  return 'system'
}

function storePreference(preference: ThemePreference): void {
  try {
    localStorage.setItem(STORAGE_KEY, preference)
  } catch {
    // localStorage not available
  }
}

let transitionTimeout: ReturnType<typeof setTimeout> | undefined

function applyTheme(isDark: boolean, animate = false): void {
  const root = document.documentElement

  if (animate) {
    root.classList.add(TRANSITION_CLASS)
    if (transitionTimeout) clearTimeout(transitionTimeout)
    transitionTimeout = setTimeout(() => {
      root.classList.remove(TRANSITION_CLASS)
    }, TRANSITION_MS)
  }

  root.classList.toggle('dark', isDark)
  root.style.colorScheme = isDark ? 'dark' : 'light'

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', isDark ? '#111827' : '#3b82f6')
  }
}

export const themePreference = ref<ThemePreference>(getStoredPreference())

export const isDarkMode = computed(() => resolveIsDark(themePreference.value))

export function setThemePreference(preference: ThemePreference): void {
  themePreference.value = preference
}

export function cycleThemePreference(): void {
  const order: ThemePreference[] = ['system', 'light', 'dark']
  const index = order.indexOf(themePreference.value)
  themePreference.value = order[(index + 1) % order.length]
}

export function toggleLightDark(): void {
  themePreference.value = isDarkMode.value ? 'light' : 'dark'
}

export function initTheme(): void {
  applyTheme(resolveIsDark(themePreference.value), false)

  watch(themePreference, (preference) => {
    storePreference(preference)
    applyTheme(resolveIsDark(preference), true)
  })

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (themePreference.value === 'system') {
      applyTheme(getSystemDark(), true)
    }
  })
}
