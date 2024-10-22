<template>
  <div>
    <h1>文字列リスト</h1>
    <StringList v-model:items="stringArray" />
  </div>
</template>

<script setup lang="ts">
import StringList from '@/views/StringList.vue'
import { ref } from 'vue'

const stringArray = ref<string[]>([
  'りんご',
  'ばなな',
  'オレンジ',
  'hoge',
  'fuga',
  'piyp',
  'ohge',
])
</script>
