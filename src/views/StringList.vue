<template>
  <div>
    <button class="button" @click="removeFirstItem" v-if="items.length > 0">
      先頭を削除
    </button>
    <transition-group tag="ul">
      <li
        v-for="(item, index) in items"
        :key="item"
        :class="{ 'red-text': index === 0 }"
      >
        {{ item }}
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

interface Props {
  items: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (event: 'update:items', items: string[]): void
}>()

const { items } = toRefs(props)

const removeFirstItem = () => {
  if (items.value.length > 0) {
    const deleteItem = items.value[0]
    const newItems = items.value.slice(1)
    newItems.push(deleteItem)
    emit('update:items', newItems)
  }
}
</script>

<style scoped>
.red-text {
  color: red;
}

.remove-button {
  margin-left: 10px;
  cursor: pointer;
}

/* 要素が移動する時に700msで移動するように指定 */
.v-move {
  transition: all 700ms;
}

.v-leave-active {
  /* 移動のトランジションをさせる場合は非表示アニメーション中に position: absoluteを指定しないと正しく動作しない */
  position: absolute;
  transition: all 500ms;
}

.v-leave-to {
  opacity: 0;
}
</style>
