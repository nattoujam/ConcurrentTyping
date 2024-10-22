<template>
  <header>
    <HelloWorld msg="Concurrent Typing" />
  </header>
  <nav class="panel">
    <p class="panel-tabs">
      <InlineLink link="/" is-router-link>Home</InlineLink>
      <InlineLink link="/about" is-router-link>About</InlineLink>
    </p>
    <div class="panel-block">
      <div class="container">
        <RouterView />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { RouterView } from 'vue-router'

import { useInputStore } from '@/stores/input'

import InlineLink from '@/components/atoms/InlineLink.vue'
import HelloWorld from '@/components/HelloWorld.vue'

const input = useInputStore()

onMounted(() => document.addEventListener('keydown', input.keydownListener))
onBeforeUnmount(() =>
  document.removeEventListener('keydown', input.keydownListener),
)
</script>
