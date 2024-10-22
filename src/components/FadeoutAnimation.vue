<template>
  <transition-group>
    <slot v-if="!props.end"></slot>
  </transition-group>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  end: boolean
}>()

const emits = defineEmits<{
  animationEnd: []
}>()

watch(
  () => props.end,
  newEnd => {
    if (newEnd) setTimeout(() => emits('animationEnd'), 300)
  },
)
</script>

<style scoped>
.v-leave-active {
  transition: all 300ms;
  position: absolute;
}

.v-leave-to {
  opacity: 0;
}

.v-move {
  transition: all 500ms;
}
</style>
