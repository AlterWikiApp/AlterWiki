<script setup lang="ts">
import { computed } from 'vue'
import {
  themePreference,
  isDarkMode,
  cycleThemePreference,
  toggleLightDark,
} from '../state/theme'

const modeLabels: Record<string, string> = {
  system: 'Automatisch',
  light: 'Hell',
  dark: 'Dunkel',
}

const currentModeLabel = computed(() => modeLabels[themePreference.value])

const ariaLabel = computed(() => {
  const mode = currentModeLabel.value
  const state = isDarkMode.value ? 'dunkel' : 'hell'
  return `Design: ${mode} (${state}). Klicken für nächsten Modus.`
})

const handleClick = () => {
  cycleThemePreference()
}

const handleSwitchToggle = () => {
  toggleLightDark()
}
</script>

<template>
  <div class="theme-toggle">
    <button
      type="button"
      class="theme-toggle__mode"
      :aria-label="ariaLabel"
      :title="`Design: ${currentModeLabel}`"
      @click="handleClick"
    >
      <span class="theme-toggle__icon" aria-hidden="true">
        <template v-if="themePreference === 'system'">◐</template>
        <template v-else-if="themePreference === 'light'">☀</template>
        <template v-else>☽</template>
      </span>
      <span class="theme-toggle__label">{{ currentModeLabel }}</span>
    </button>

    <button
      type="button"
      role="switch"
      class="theme-toggle__switch"
      :class="{ 'theme-toggle__switch--dark': isDarkMode }"
      :aria-checked="isDarkMode"
      aria-label="Hell/Dunkel umschalten"
      @click="handleSwitchToggle"
    >
      <span class="theme-toggle__switch-track" aria-hidden="true">
        <span class="theme-toggle__switch-thumb" />
      </span>
    </button>
  </div>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-toggle__mode {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #374151;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.theme-toggle__mode:hover {
  border-color: #9ca3af;
}

.theme-toggle__mode:focus-visible {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

.dark .theme-toggle__mode {
  color: #e5e7eb;
  background-color: #1f2937;
  border-color: #4b5563;
}

.dark .theme-toggle__mode:hover {
  border-color: #6b7280;
}

.theme-toggle__icon {
  font-size: 1rem;
  line-height: 1;
}

.theme-toggle__label {
  white-space: nowrap;
}

.theme-toggle__switch {
  position: relative;
  flex-shrink: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  width: 2.75rem;
  height: 1.5rem;
}

.theme-toggle__switch:focus-visible .theme-toggle__switch-track {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.theme-toggle__switch-track {
  display: block;
  width: 2.75rem;
  height: 1.5rem;
  background-color: #d1d5db;
  border-radius: 9999px;
  transition: background-color 0.3s ease;
}

.theme-toggle__switch--dark .theme-toggle__switch-track {
  background-color: #3b82f6;
}

.theme-toggle__switch-thumb {
  position: absolute;
  top: 0.1875rem;
  left: 0.1875rem;
  width: 1.125rem;
  height: 1.125rem;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.theme-toggle__switch--dark .theme-toggle__switch-thumb {
  transform: translateX(1.25rem);
}

@media (max-width: 480px) {
  .theme-toggle__label {
    display: none;
  }

  .theme-toggle__mode {
    padding: 0.375rem;
  }
}
</style>
