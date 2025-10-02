<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="text-sm text-gray-400 font-semibold">ELO Changes</div>
    </div>
    
    <div class="space-y-3">
      <!-- ELO Trend -->
      <div class="flex items-center gap-3">
        <div :class="['text-3xl font-bold', eloDiffClass]">
          {{ eloDiffFormatted }}
        </div>
        <div class="text-2xl">
          {{ eloDiffIcon }}
        </div>
      </div>
      
      <div class="text-xs text-gray-400">
        Last {{ eloChanges.length }} games
      </div>
      
      <!-- Mini Chart -->
      <div class="flex items-end gap-1 h-16">
        <div
          v-for="(change, index) in eloChanges"
          :key="index"
          :class="[
            'flex-1 rounded-t transition-all',
            change > 0 ? 'bg-green-500/40' : 'bg-red-500/40'
          ]"
          :style="{
            height: `${Math.abs(change) / maxChange * 100}%`,
            minHeight: '4px'
          }"
          :title="`${change > 0 ? '+' : ''}${change}`"
        ></div>
      </div>
      
      <!-- Range Info -->
      <div class="flex items-center justify-between text-xs">
        <div class="text-gray-400">
          <span class="text-green-400">+{{ maxGain }}</span> max
        </div>
        <div class="text-gray-400">
          <span class="text-red-400">{{ maxLoss }}</span> max
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

// Calculate ELO changes from recent matches
const eloChanges = computed(() => {
  if (!playerStore.recentMatches || playerStore.recentMatches.length === 0) {
    return []
  }
  
  // Get last 7 matches with ELO data
  const matches = playerStore.recentMatches.slice(0, 7)
  const changes: number[] = []
  
  for (let i = 0; i < matches.length - 1; i++) {
    const current = matches[i].elo
    const previous = matches[i + 1].elo
    
    if (current !== undefined && previous !== undefined) {
      changes.push(current - previous)
    }
  }
  
  return changes.reverse() // Oldest to newest
})

// Calculate total ELO diff
const totalEloDiff = computed(() => {
  return eloChanges.value.reduce((sum, change) => sum + change, 0)
})

// Format ELO diff with +/- sign
const eloDiffFormatted = computed(() => {
  if (eloChanges.value.length === 0) return '--'
  const diff = totalEloDiff.value
  return diff > 0 ? `+${diff}` : diff.toString()
})

// Color class based on diff
const eloDiffClass = computed(() => {
  if (eloChanges.value.length === 0) return 'text-gray-400'
  return totalEloDiff.value > 0 ? 'text-green-400' : 'text-red-400'
})

// Icon based on trend
const eloDiffIcon = computed(() => {
  if (eloChanges.value.length === 0) return '📊'
  return totalEloDiff.value > 0 ? '📈' : '📉'
})

// Max change for scaling chart
const maxChange = computed(() => {
  if (eloChanges.value.length === 0) return 25
  return Math.max(...eloChanges.value.map(Math.abs), 25)
})

// Max gain and loss
const maxGain = computed(() => {
  if (eloChanges.value.length === 0) return 0
  return Math.max(...eloChanges.value.filter(c => c > 0), 0)
})

const maxLoss = computed(() => {
  if (eloChanges.value.length === 0) return 0
  return Math.min(...eloChanges.value.filter(c => c < 0), 0)
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
