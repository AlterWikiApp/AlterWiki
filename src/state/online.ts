import { ref } from 'vue'

export const isOnline = ref(
  typeof navigator !== 'undefined' ? navigator.onLine : true,
)

export function initOnlineStatus(): void {
  const update = () => {
    isOnline.value = navigator.onLine
  }

  window.addEventListener('online', update)
  window.addEventListener('offline', update)
}
