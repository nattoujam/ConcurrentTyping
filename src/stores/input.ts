import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useInputStore = defineStore('input', () => {
  const text = ref<string>('')
  const isPause = ref<boolean>(false)

  const keydownListener = (e: KeyboardEvent) => {
    if (isPause.value) return
    if (allowKey(e)) {
      appendKey(e.key)
    }
  }

  const appendKey = (key: string) => (text.value += key)
  const pause = () => (isPause.value = true)
  const resume = () => (isPause.value = false)

  const clear = () => {
    text.value = ''
  }

  const allowKey = (e: KeyboardEvent): boolean => {
    if (e.code === `Key${e.key.toUpperCase()}`) return true
    else if (e.code === `Digit${e.key}`) return true
    else if (e.code === 'Enter') return true
    else return false
  }

  return {
    text,
    keydownListener,
    pause,
    resume,
    clear,
  }
})
