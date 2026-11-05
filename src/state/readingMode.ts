import { ref, computed } from 'vue'

/**
 * Distraction-free reading mode (session-only, deliberately NOT persisted).
 * Entered from the article view; exits via Escape key, the hover exit bar
 * at the top edge, or automatically when leaving the article view.
 */
const distractionFree = ref(false)

export function useReadingMode() {
  const isDistractionFree = computed(() => distractionFree.value)

  const enterDistractionFree = () => {
    distractionFree.value = true
  }

  const exitDistractionFree = () => {
    distractionFree.value = false
  }

  const toggleDistractionFree = () => {
    distractionFree.value = !distractionFree.value
  }

  return {
    isDistractionFree,
    enterDistractionFree,
    exitDistractionFree,
    toggleDistractionFree,
  }
}
