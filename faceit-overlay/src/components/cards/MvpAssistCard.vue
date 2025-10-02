<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="text-sm text-gray-400 font-semibold mb-4">Team Impact</div>
    
    <!-- Main Stats -->
    <div class="grid grid-cols-2 gap-3 mb-3">
      <!-- MVP -->
      <div class="bg-yellow-500/10 rounded-lg p-2">
        <div class="text-xs text-gray-400 mb-1">MVP</div>
        <div class="text-2xl font-bold text-yellow-400">{{ totalMVPs }}</div>
        <div class="text-xs text-gray-500">{{ mvpRate }}%</div>
      </div>

      <!-- Assists -->
      <div class="bg-blue-500/10 rounded-lg p-2">
        <div class="text-xs text-gray-400 mb-1">Assists</div>
        <div class="text-2xl font-bold text-blue-400">{{ avgAssists }}</div>
        <div class="text-xs text-gray-500">per match</div>
      </div>
    </div>

    <!-- Team Impact Rating -->
    <div class="mt-3 pt-3 border-t border-gray-700/30">
      <div class="flex items-center justify-between text-xs">
        <span class="text-gray-400">Impact</span>
        <span 
          :class="[
            'font-bold',
            impactRating === 'Excellent' ? 'text-green-400' :
            impactRating === 'Good' ? 'text-primary' :
            impactRating === 'Average' ? 'text-yellow-400' :
            'text-gray-400'
          ]"
        >
          {{ impactRating }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

// Total matches
const totalMatches = computed(() => {
  return parseInt(playerStore.stats?.lifetime?.m1 || '0')
})

// Total MVPs - m21
const totalMVPs = computed(() => {
  return parseInt(playerStore.stats?.lifetime?.m21 || '0')
})

// Total Assists - m20
const totalAssists = computed(() => {
  return parseInt(playerStore.stats?.lifetime?.m20 || '0')
})

// MVP Rate (% of matches where player got MVP)
const mvpRate = computed(() => {
  if (totalMatches.value === 0) return '0'
  return ((totalMVPs.value / totalMatches.value) * 100).toFixed(1)
})

// Average Assists per Match
const avgAssists = computed(() => {
  if (totalMatches.value === 0) return '0.0'
  return (totalAssists.value / totalMatches.value).toFixed(1)
})

// Impact Rating
const impactRating = computed(() => {
  const mvpPct = parseFloat(mvpRate.value)
  const assists = parseFloat(avgAssists.value)
  
  if (mvpPct >= 15 || assists >= 5) return 'Excellent'
  if (mvpPct >= 10 || assists >= 4) return 'Good'
  if (mvpPct >= 5 || assists >= 3) return 'Average'
  return 'Below Average'
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
