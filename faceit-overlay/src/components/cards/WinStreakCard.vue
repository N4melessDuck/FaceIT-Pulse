<template>
  <div class="stat-card glass rounded-xl p-6 text-center">
    <div class="text-4xl mb-2">🔥</div>
    <div class="text-3xl font-bold text-primary mb-1">
      {{ streakText }}
    </div>
    <div class="text-sm text-gray-400">Current Streak</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

const streakText = computed(() => {
  if (!playerStore.recentMatches || playerStore.recentMatches.length === 0) {
    return '--'
  }
  
  const firstResult = playerStore.recentMatches[0].i10
  let count = 1
  
  for (let i = 1; i < playerStore.recentMatches.length; i++) {
    if (playerStore.recentMatches[i].i10 === firstResult) {
      count++
    } else {
      break
    }
  }
  
  return `${count}${firstResult === '1' ? 'W' : 'L'}`
})
</script>
