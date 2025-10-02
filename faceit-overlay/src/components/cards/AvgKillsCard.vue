<template>
  <div class="stat-card glass rounded-xl p-6 text-center">
    <div class="text-sm text-gray-400 font-semibold mb-3">Average Kills</div>
    <div class="text-4xl font-bold text-green-400">
      {{ playerStore.avgKills || '--' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
const playerStore = usePlayerStore()
</script>
