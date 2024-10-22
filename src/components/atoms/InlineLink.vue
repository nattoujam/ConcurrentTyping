<template>
  <RouterLink v-if="props.isRouterLink" :to="props.link">
    <slot></slot>
  </RouterLink>
  <a v-else :href="props.link">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps<{
  isRouterLink?: boolean
  link: string
}>()
</script>

<style scoped>
@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}
</style>
