<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="fixed-grid has-3-cols">
        <div class="grid">
          <div
            v-for="(reward, index) in props.rewardList"
            :key="`select-${index}`"
            class="cell"
          >
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">new {{ reward.type }}</p>
              </header>
              <div class="card-content">
                <div class="content">
                  <h2>{{ reward.name }} queue</h2>
                  <p>{{ reward.description }}</p>
                </div>
              </div>
              <div class="card-footer">
                <div
                  class="button is-fullwidth"
                  :class="{ 'is-info': selectChoice === index }"
                  @click="emits('rewardSelected', reward.id)"
                >
                  {{ index + 1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>Type "Enter" to select choice.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useInputStore } from '@/stores/input'
import type { RankupReward } from '@/types'
const selectChoice = ref<number>(0)
const input = useInputStore()

const props = defineProps<{
  rewardList: Array<RankupReward>
}>()

const emits = defineEmits<{
  rewardSelected: [number]
}>()

watch(
  () => input.text,
  (newText: string) => {
    for (let i = 0; i <= 10; i++) {
      if (newText.endsWith(String(i + 1))) {
        selectChoice.value = i
        return
      }
    }

    if (newText.endsWith('Enter')) {
      emits('rewardSelected', props.rewardList[selectChoice.value].id)
      selectChoice.value = 0
    }
  },
)
</script>

<style scoped>
.modal-content {
  width: 80%;
}

.card-content {
  min-height: 500px;
}
</style>
