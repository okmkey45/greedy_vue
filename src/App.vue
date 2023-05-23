<script setup lang="ts">
import { RouterView } from 'vue-router'
import GreedyLogo from '@/components/atoms/GreedyLogo.vue'
</script>

<template>
  <div class="max-w-sm my-0 mx-auto">
    <header>
      <GreedyLogo />
    </header>

    <RouterView />
  </div>
</template>
