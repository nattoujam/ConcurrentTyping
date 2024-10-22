<template>
  <Teleport to="body">
    <RankUpModal
      v-show="modalVisible"
      :reward-list="rewardList"
      @reward-selected="onModalClose"
    />
  </Teleport>
  <div class="fixed-grid has-1-cols">
    <div class="grid">
      <div class="cell">
        <button
          class="button is-info is-fullwidth"
          :disabled="status === 'playing'"
          @click="onClick"
        >
          {{ status }}
        </button>
      </div>
      <div class="cell scroll">
        <TypingCarousel
          v-for="queue in skill.slots"
          :key="queue.code"
          :typing-targets="queue.targetList"
          @timeout="(w: string) => onTimeout(queue.code, w)"
          @complete="(w: string) => onComplete(queue.code, w)"
        />
      </div>
      <div class="cell">
        <ScoreBoard />
      </div>
      <div class="cell">
        <div class="content">
          <h3>Debug</h3>
          <p>{{ input.text }}</p>
          <button
            class="button"
            :disabled="!sharedTimer.running"
            @click="sharedTimer.pause()"
          >
            pause
          </button>
          <button
            class="button"
            :disabled="status === 'play' || sharedTimer.running"
            @click="sharedTimer.resume()"
          >
            resume
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

import type { TargetQueue, Status, RankupReward } from '@/types'
import { findTargetQueue, TEST_QUEUE } from '@/const'
import { useScoreStore } from '@/stores/score'
import { useSharedTimerStore } from '@/stores/sharedTimer'
import { useInputStore } from '@/stores/input'

import ScoreBoard from '@/components/ScoreBoard.vue'
import TypingCarousel from '@/components/TypingCarousel.vue'
import RankUpModal from '@/components/modals/RankUpModal.vue'
import { fetchRankupRewardList } from '@/api'
import { useSkillStore } from '@/stores/skill'

const modalVisible = ref<boolean>(false)
const rewardList = ref<Array<RankupReward>>([])

const score = useScoreStore()
const sharedTimer = useSharedTimerStore()
const input = useInputStore()
const skill = useSkillStore()

const status = ref<Status>('play')

const onTimeout = (code: string, timeoutWord: string) => {
  score.incrementTimeout()
  sharedTimer.unregisterLapTime(timeoutWord)
  skill.removeFirstWord(code)
}

const onComplete = async (code: string, completeWord: string) => {
  input.clear()

  await nextTick()

  score.incrementComplete()
  score.addScore(completeWord.length ** 2)
  sharedTimer.unregisterLapTime(completeWord)
  skill.removeFirstWord(code)
}

const onClick = () => {
  if (['play', 'restart'].includes(status.value)) {
    status.value = 'playing'
    input.clear()
  } else if (status.value === 'playing') {
    status.value = 'restart'
  } else {
    status.value = 'restart'
  }
}

const onModalClose = (rewardId: number) => {
  const reward = rewardList.value.find(
    (reward: RankupReward) => reward.id === rewardId,
  )
  if (reward?.type === 'queue') {
    const queue = findTargetQueue(reward.code)
    if (queue) skill.appendTargetQueue(queue)
  }

  modalVisible.value = false
  sharedTimer.resume()
}

const startGame = () => {
  skill.clearSlots()
  skill.appendTargetQueue(TEST_QUEUE)
  score.reset()
  sharedTimer.start()
}

const gameover = () => {
  status.value = 'restart'
}

watch(status, (newState: Status) => {
  if (newState === 'playing') {
    startGame()
  }
  if (newState === 'restart') {
    sharedTimer.stop()
  }
})

watch(
  () => score.rank,
  (newRank: number, oldRank: number) => {
    if (newRank < oldRank) return

    input.clear()
    sharedTimer.pause()

    const excludeCodeList = skill.slots.map((q: TargetQueue) => q.code)
    rewardList.value = fetchRankupRewardList('queue', excludeCodeList)

    if (rewardList.value.length) modalVisible.value = true
    else sharedTimer.resume()
  },
)

watch(
  () => score.timeout,
  (newTimeout: number) => {
    if (newTimeout > 3) {
      gameover()
    }
  },
)
</script>

<style scoped>
.scroll {
  overflow-x: hidden;
}
</style>
