<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="text-sm text-gray-400 font-semibold mb-4">Multi-Kills</div>
    
    <div class="space-y-2">
      <!-- 5K / ACE -->
      <div class="flex items-center justify-between bg-yellow-500/10 rounded-lg p-2">
        <div class="text-xs text-gray-400">ACE</div>
        <div class="text-xl font-bold text-yellow-400">{{ aceCount }}</div>
      </div>

      <!-- 4K -->
      <div class="flex items-center justify-between bg-purple-500/10 rounded-lg p-2">
        <div class="text-xs text-gray-400">Quadro</div>
        <div class="text-xl font-bold text-purple-400">{{ quadroCount }}</div>
      </div>

      <!-- 3K -->
      <div class="flex items-center justify-between bg-orange-500/10 rounded-lg p-2">
        <div class="text-xs text-gray-400">Triple</div>
        <div class="text-xl font-bold text-orange-400">{{ tripleCount }}</div>
      </div>

      <!-- 2K -->
      <div class="flex items-center justify-between bg-blue-500/10 rounded-lg p-2">
        <div class="text-xs text-gray-400">Double</div>
        <div class="text-xl font-bold text-blue-400">{{ doubleCount }}</div>
      </div>
    </div>

    <!-- Средняя статистика -->
    <div class="mt-3 pt-3 border-t border-gray-700/30">
      <div class="flex items-center justify-between text-xs">
        <span class="text-gray-400">Rate</span>
        <span class="text-primary font-bold">{{ multiKillRate }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

// Подсчет мультикиллов из последних матчей
const aceCount = computed(() => {
  if (!playerStore.recentMatches.length) return 0
  return playerStore.recentMatches.reduce((sum: number, match) => {
    return sum + (parseInt(match.i16 || '0'))
  }, 0)
})

const quadroCount = computed(() => {
  if (!playerStore.recentMatches.length) return 0
  return playerStore.recentMatches.reduce((sum: number, match) => {
    return sum + (parseInt(match.i15 || '0'))
  }, 0)
})

const tripleCount = computed(() => {
  if (!playerStore.recentMatches.length) return 0
  return playerStore.recentMatches.reduce((sum: number, match) => {
    return sum + (parseInt(match.i14 || '0'))
  }, 0)
})

const doubleCount = computed(() => {
  if (!playerStore.recentMatches.length) return 0
  return playerStore.recentMatches.reduce((sum: number, match) => {
    return sum + (parseInt(match.i40 || '0'))
  }, 0)
})

// Multi-Kill rate - процент матчей с мультикиллами (3K+)
const multiKillRate = computed(() => {
  if (!playerStore.recentMatches.length) return 0
  const matchesWithMultiKills = playerStore.recentMatches.filter(match => {
    const triples = parseInt(match.i14 || '0')
    const quadros = parseInt(match.i15 || '0')
    const aces = parseInt(match.i16 || '0')
    return (triples + quadros + aces) > 0
  }).length
  
  return ((matchesWithMultiKills / playerStore.recentMatches.length) * 100).toFixed(0)
})
</script>

<style scoped>
.stat-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(255, 85, 0, 0.2);
}
</style>
