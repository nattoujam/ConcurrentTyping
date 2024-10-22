import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TargetQueue } from '@/types'
import { fetchTargetList } from '@/api'

export const useSkillStore = defineStore('skill', () => {
  const REFILL_THRESHOLD = 3
  const slots = ref<Array<TargetQueue>>([])

  const clearSlots = () => (slots.value = [])
  const appendTargetQueue = (queue: TargetQueue) => {
    slots.value.push(queue)
  }

  const removeFirstWord = (queueCode: string) => {
    slots.value = slots.value.map((q: TargetQueue) => {
      if (q.code === queueCode) {
        let newTargetList = q.targetList.slice(1)

        if (newTargetList.length < REFILL_THRESHOLD) {
          newTargetList = [...newTargetList, ...fetchTargetList(queueCode)]
        }

        return {
          ...q,
          targetList: newTargetList,
        }
      } else {
        return q
      }
    })
  }

  return {
    slots,
    clearSlots,
    appendTargetQueue,
    removeFirstWord,
  }
})
