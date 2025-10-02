<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="text-sm text-gray-400 font-semibold">Win Rate</div>
    </div>
    
    <div class="space-y-3">
      <!-- Win Rate Percentage -->
      <div>
        <div class="text-4xl font-bold text-green-400 mb-1">
          {{ playerStore.winRate || '--' }}%
        </div>
        <div class="text-xs text-gray-500">Victory Rate</div>
      </div>
      
      <!-- Matches Info -->
      <div class="flex items-center justify-between text-sm">
        <div>
          <div class="text-white font-medium">{{ totalMatches }}</div>
          <div class="text-xs text-gray-400">Total Games</div>
        </div>
        <div>
          <div class="text-green-400 font-medium">{{ wins }}</div>
          <div class="text-xs text-gray-400">Wins</div>
        </div>
        <div>
          <div class="text-red-400 font-medium">{{ losses }}</div>
          <div class="text-xs text-gray-400">Losses</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

const totalMatches = computed(() => {
  return playerStore.stats?.lifetime.m1 || '0'
})

const wins = computed(() => {
  return playerStore.stats?.lifetime.m2 || '0'
})

const losses = computed(() => {
  const total = parseInt(totalMatches.value)
  const w = parseInt(wins.value)
  return (total - w).toString()
})
</script>

<style scoped>
.stat-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(34, 197, 94, 0.2);
}
</style>
