<template>
  <div class="stat-card glass rounded-xl p-6 text-center">
    <div class="text-4xl mb-2">☠️</div>
    <div class="text-3xl font-bold text-red-400 mb-1">
      {{ playerStore.avgDeaths || '--' }}
    </div>
    <div class="text-sm text-gray-400">Average Deaths</div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
const playerStore = usePlayerStore()
</script>
