<template>
  <progress
    class="progress is-small is-link"
    :class="{ 'is-danger': isWarn }"
    :value="props.timeElapsed"
    :max="props.timeLimit"
  ></progress>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  timeElapsed: number
  timeLimit: number
}>()

const isWarn = computed(() => props.timeElapsed / props.timeLimit > 0.7)
</script>
