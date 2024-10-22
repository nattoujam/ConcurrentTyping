<template>
  <div class="box">
    <div class="columns">
      <transition-group>
        <TypingCard
          v-for="(target, index) in props.typingTargets"
          class="column is-4"
          :key="target.word"
          :correct-word="target.word"
          :time-limit="target.timeLimit"
          :active="index === 0"
          @timeout="(w: string) => (index === 0 ? onTimeout(w) : null)"
          @complete="(w: string) => (index === 0 ? onComplete(w) : null)"
        />
        <TypingCard
          class="column is-4"
          key="dummy"
          correct-word="dummy"
          :time-limit="100"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Target } from '@/types'

import TypingCard from '@/components/TypingCard.vue'

const props = defineProps<{
  typingTargets: Array<Target>
}>()

const emits = defineEmits<{
  timeout: [timeoutWord: string]
  complete: [completeWord: string]
}>()

const onTimeout = (timeoutWord: string) => {
  emits('timeout', timeoutWord)
}

const onComplete = (completeWord: string) => {
  emits('complete', completeWord)
}
</script>

<style scoped>
.v-leave-active {
  transition: all 500ms;
  position: absolute;
}

.v-leave-to {
  opacity: 0;
}

.v-move {
  transition: all 700ms;
}

/* 最後の要素だけheightが長くなるため */
.column {
  margin-bottom: var(--bulma-block-spacing);
}
</style>
