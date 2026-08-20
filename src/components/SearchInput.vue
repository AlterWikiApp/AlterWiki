<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  debounceMs?: number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'search', query: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search Wikipedia...',
  debounceMs: 300,
})

const emit = defineEmits<Emits>()
const localValue = ref(props.modelValue)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue)
  
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  
  if (newValue.trim()) {
    debounceTimer = setTimeout(() => {
      emit('search', newValue.trim())
    }, props.debounceMs)
  }
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  localValue.value = target.value
}
</script>

<template>
  <div class="search-input">
    <input
      :value="localValue"
      :placeholder="placeholder"
      type="text"
      class="search-input__field"
      @input="handleInput"
      aria-label="Search Wikipedia"
    />
  </div>
</template>

<style scoped>
.search-input {
  width: 100%;
}

.search-input__field {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
  color: #1f2937;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input__field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dark .search-input__field {
  background-color: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

.dark .search-input__field:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
}
</style>
