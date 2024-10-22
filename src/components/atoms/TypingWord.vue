<template>
  <div class="column has-text-centered p-1">
    <span class="has-text-link has-text-weight-bold is-size-4">{{
      props.correct
    }}</span
    ><span class="is-size-4">{{ props.remain }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  correct: string
  remain: string
}>()
</script>
