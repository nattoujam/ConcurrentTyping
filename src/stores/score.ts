import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useScoreStore = defineStore('score', () => {
  const RANK_UP_THREASHOLDS = [100, 200, 300, 400, 500]
  const complete = ref<number>(0)
  const timeout = ref<number>(0)
  const score = ref<number>(0)
  const rank = ref<number>(1)
  const rankUpThreashold = ref<number>(RANK_UP_THREASHOLDS[0])

  watch(score, (newScore: number) => {
    if (rankUpThreashold.value <= newScore) {
      if (rank.value < RANK_UP_THREASHOLDS.length) {
        rankUpThreashold.value = RANK_UP_THREASHOLDS[rank.value]
      } else {
        rankUpThreashold.value += 1000
      }

      rank.value += 1
    }
  })

  const incrementComplete = () => {
    complete.value += 1
  }

  const incrementTimeout = () => {
    timeout.value += 1
  }

  const addScore = (value: number) => {
    score.value += value
  }

  const reset = () => {
    complete.value = 0
    timeout.value = 0
    score.value = 0
    rank.value = 1
  }

  return {
    complete,
    timeout,
    score,
    rank,
    rankUpThreashold,
    incrementComplete,
    incrementTimeout,
    addScore,
    reset,
  }
})
