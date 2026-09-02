<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  linkDisplay,
  LINK_COLOR_PRESETS,
  resetLinkDisplay,
  setLinkColor,
  setLinkUnderline,
  setNoVisualLinkStyle,
} from '../state/linkDisplay'

const isOpen = ref(false)
const rootEl = ref<HTMLElement | null>(null)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const onDocumentClick = (event: MouseEvent) => {
  if (!isOpen.value || !rootEl.value) return
  if (!rootEl.value.contains(event.target as Node)) {
    close()
  }
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})

const onColorInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  setLinkColor(input.value)
}

const colorPickerValue = computed(() => linkDisplay.color ?? '#2563eb')
</script>

<template>
  <!--
    Panel styles are scoped to this component and never inherit article
    content link customizations (PRINCIPLES.md §5).
  -->
  <div ref="rootEl" class="link-display-panel">
    <button
      type="button"
      class="link-display-panel__trigger"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      aria-controls="link-display-popover"
      @click="toggle"
    >
      Link Display
    </button>

    <div
      v-if="isOpen"
      id="link-display-popover"
      class="link-display-panel__popover"
      role="dialog"
      aria-label="Adjust link display in article"
    >
      <fieldset class="link-display-panel__fieldset">
        <legend class="link-display-panel__legend">Color</legend>
        <div class="link-display-panel__color-row">
          <label class="link-display-panel__color-label">
            <span class="link-display-panel__sr-only">Custom color</span>
            <input
              type="color"
              class="link-display-panel__color-input"
              :value="colorPickerValue"
              :disabled="linkDisplay.noVisualStyle"
              @input="onColorInput"
            />
          </label>
          <div class="link-display-panel__presets" role="group" aria-label="Color presets">
            <button
              v-for="preset in LINK_COLOR_PRESETS"
              :key="preset.id"
              type="button"
              class="link-display-panel__preset"
              :class="{
                'link-display-panel__preset--active':
                  !linkDisplay.noVisualStyle && linkDisplay.color === preset.value,
              }"
              :style="{ backgroundColor: preset.value }"
              :aria-label="preset.label"
              :title="preset.label"
              :disabled="linkDisplay.noVisualStyle"
              @click="setLinkColor(preset.value)"
            />
          </div>
        </div>
      </fieldset>

      <label class="link-display-panel__check">
        <input
          type="checkbox"
          :checked="linkDisplay.underline"
          :disabled="linkDisplay.noVisualStyle"
          @change="setLinkUnderline(($event.target as HTMLInputElement).checked)"
        />
        Underlined
      </label>

      <label class="link-display-panel__check">
        <input
          type="checkbox"
          :checked="linkDisplay.noVisualStyle"
          @change="setNoVisualLinkStyle(($event.target as HTMLInputElement).checked)"
        />
        No visual link styling
      </label>

      <p v-if="linkDisplay.noVisualStyle" class="link-display-panel__hint">
        Links look like normal text but remain clickable.
      </p>

      <button
        type="button"
        class="link-display-panel__reset"
        @click="resetLinkDisplay"
      >
        Reset to default
      </button>
    </div>
  </div>
</template>

<style scoped>
.link-display-panel {
  position: relative;
  display: inline-block;
  /* Explicit base styles so article link CSS can never bleed in */
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.4;
  text-decoration: none;
}

.dark .link-display-panel {
  color: #e5e7eb;
}

.link-display-panel__trigger {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  text-decoration: none;
}

.link-display-panel__trigger:hover {
  border-color: #9ca3af;
}

.link-display-panel__trigger:focus-visible {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

.dark .link-display-panel__trigger {
  color: #e5e7eb;
  background-color: #1f2937;
  border-color: #4b5563;
}

.link-display-panel__popover {
  position: absolute;
  top: calc(100% + 0.35rem);
  right: 0;
  z-index: 60;
  width: min(18rem, calc(100vw - 2rem));
  padding: 0.875rem;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  color: #1f2937;
  text-decoration: none;
}

.dark .link-display-panel__popover {
  background-color: #1f2937;
  border-color: #4b5563;
  color: #f9fafb;
}

.link-display-panel__fieldset {
  margin: 0 0 0.75rem;
  padding: 0;
  border: none;
}

.link-display-panel__legend {
  margin-bottom: 0.4rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #6b7280;
}

.dark .link-display-panel__legend {
  color: #9ca3af;
}

.link-display-panel__color-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.link-display-panel__color-input {
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: none;
  cursor: pointer;
}

.dark .link-display-panel__color-input {
  border-color: #4b5563;
}

.link-display-panel__color-input:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.link-display-panel__presets {
  display: flex;
  gap: 0.35rem;
}

.link-display-panel__preset {
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 9999px;
  cursor: pointer;
}

.link-display-panel__preset--active {
  border-color: #111827;
  box-shadow: 0 0 0 1px #ffffff;
}

.dark .link-display-panel__preset--active {
  border-color: #f9fafb;
  box-shadow: 0 0 0 1px #1f2937;
}

.link-display-panel__preset:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.link-display-panel__preset:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.link-display-panel__check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.link-display-panel__check input {
  width: 1rem;
  height: 1rem;
  accent-color: #3b82f6;
}

.link-display-panel__hint {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.dark .link-display-panel__hint {
  color: #9ca3af;
}

.link-display-panel__reset {
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #1f2937;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  text-decoration: none;
}

.link-display-panel__reset:hover {
  background-color: #e5e7eb;
}

.link-display-panel__reset:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.dark .link-display-panel__reset {
  color: #f9fafb;
  background-color: #374151;
  border-color: #4b5563;
}

.dark .link-display-panel__reset:hover {
  background-color: #4b5563;
}

.link-display-panel__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 640px) {
  .link-display-panel__popover {
    right: auto;
    left: 0;
  }
}
</style>
