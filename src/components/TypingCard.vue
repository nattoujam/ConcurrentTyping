<template>
  <div class="card">
    <div class="card-content p-1">
      <TypingWord
        :class="{ 'has-text-danger': timeout }"
        :correct="inputProgress.correct"
        :remain="inputProgress.remain"
      />
    </div>
    <footer class="card-footer">
      <ProgressBar
        v-show="props.active"
        :time-elapsed="elapsed"
        :timeLimit="props.timeLimit"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

import { useScoreStore } from '@/stores/score'
import { useSharedTimerStore } from '@/stores/sharedTimer'
import { useInputStore } from '@/stores/input'

import TypingWord from '@/components/atoms/TypingWord.vue'
import ProgressBar from '@/components/atoms/ProgressBar.vue'

const score = useScoreStore()
const sharedTimer = useSharedTimerStore()
const input = useInputStore()

const props = withDefaults(
  defineProps<{
    correctWord: string
    timeLimit: number
    active?: boolean
  }>(),
  {
    active: false,
  },
)

const emits = defineEmits<{
  timeout: [timeoutWord: string]
  complete: [completeWord: string]
}>()

const inputProgress = ref({
  correct: '',
  remain: props.correctWord,
  correctCount: 0,
})

const elapsed = computed(() => {
  const lapTime = sharedTimer.lapTimes.get(props.correctWord)
  return sharedTimer.elapsed - (lapTime ?? sharedTimer.elapsed)
})

const timeout = computed(() => {
  return props.timeLimit <= elapsed.value
})

const resetInputProgress = () => {
  inputProgress.value = {
    correct: '',
    remain: props.correctWord,
    correctCount: 0,
  }
}

watch(timeout, async (newTimeout: boolean) => {
  if (newTimeout) {
    await nextTick()
    emits('timeout', props.correctWord)
  }
})

watch(
  () => input.text,
  (newInput: string) => {
    if (!props.active) return
    if (newInput === '') return
    if (!sharedTimer.running) return

    const lastCharacter = newInput.slice(-1)[0]

    if (inputProgress.value.remain.startsWith(lastCharacter)) {
      const newCorrectCount = inputProgress.value.correctCount + 1
      const newCorrect = props.correctWord.substring(0, newCorrectCount)
      const newRemain = props.correctWord.substring(newCorrectCount)

      inputProgress.value = {
        correct: newCorrect,
        remain: newRemain,
        correctCount: newCorrectCount,
      }

      const correctWordLength = [...props.correctWord].length
      if (correctWordLength === inputProgress.value.correctCount) {
        emits('complete', props.correctWord)
      }
    }
  },
)

watch(
  () => score.complete,
  () => resetInputProgress(),
)

watch(
  () => props.active,
  newActive => {
    if (newActive) sharedTimer.registerLapTime(props.correctWord)
  },
  { immediate: true },
)
</script>
