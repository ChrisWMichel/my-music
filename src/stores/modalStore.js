import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)

  const hiddenClass = computed(() => {
    return !isOpen.value ? 'hidden' : ''
  })

  function toggle() {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    hiddenClass,
    toggle,
  }
})
