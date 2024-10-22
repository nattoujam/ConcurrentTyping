import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useSharedTimerStore = defineStore('sharedTimer', () => {
  const DURATION = 100
  const running = ref<boolean>(false)
  const elapsed = ref<number>(0)
  const lapTimes = reactive<Map<string, number>>(new Map())
  let timer: NodeJS.Timeout

  const start = () => {
    if (running.value) return

    running.value = true
    timer = setInterval(() => (elapsed.value += DURATION), DURATION)
  }

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      reset()
    }
  }

  const pause = () => {
    if (timer) {
      running.value = false
      clearInterval(timer)
    }
  }

  const resume = start

  const reset = () => {
    elapsed.value = 0
    running.value = false
    lapTimes.clear()
  }

  const registerLapTime = (key: string) => {
    lapTimes.set(key, elapsed.value)
  }

  const unregisterLapTime = (key: string) => {
    lapTimes.delete(key)
  }

  return {
    running,
    elapsed,
    lapTimes,
    start,
    stop,
    pause,
    resume,
    reset,
    registerLapTime,
    unregisterLapTime,
  }
})
