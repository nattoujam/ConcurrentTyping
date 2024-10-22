<template>
  <div class="box">
    <div class="content">
      <h1>Score Board</h1>
      <h3>Complete: {{ score.complete }} / Timeout: {{ score.timeout }}</h3>
      <p>Rank: {{ score.rank }}</p>
      <p>Score: {{ score.score }}</p>
      <progress
        class="progress is-small is-info"
        :value="score.score"
        :max="score.rankUpThreashold"
      ></progress>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScoreStore } from '@/stores/score'

const score = useScoreStore()
</script>
