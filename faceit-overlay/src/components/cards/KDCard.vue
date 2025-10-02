<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="text-sm text-gray-400 font-semibold">Performance</div>
    </div>
    
    <div class="space-y-3">
      <!-- K/D Ratio -->
      <div>
        <div class="text-4xl font-bold text-primary mb-1">
          {{ kd || '--' }}
        </div>
        <div class="text-xs text-gray-500">K/D Ratio</div>
      </div>
      
      <!-- Stats Grid 2x2 -->
      <div class="grid grid-cols-2 gap-2">
        <div class="bg-orange-500/10 rounded-lg p-2">
          <div class="text-orange-400 font-bold text-lg">{{ adr || '--' }}</div>
          <div class="text-xs text-gray-400">ADR</div>
        </div>
        <div class="bg-blue-500/10 rounded-lg p-2">
          <div class="text-blue-400 font-bold text-lg">{{ headshots || '--' }}%</div>
          <div class="text-xs text-gray-400">Headshots</div>
        </div>
        <div class="bg-purple-500/10 rounded-lg p-2">
          <div class="text-purple-400 font-bold text-lg">{{ kast || '--' }}%</div>
          <div class="text-xs text-gray-400">KAST</div>
        </div>
        <div class="bg-green-500/10 rounded-lg p-2">
          <div class="text-green-400 font-bold text-lg">{{ entrySuccess || '--' }}%</div>
          <div class="text-xs text-gray-400">Entry Success</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

// Use correct API fields
const kd = computed(() => {
  // k5 = Average K/D Ratio
  return playerStore.stats?.lifetime?.k5 || null
})

const adr = computed(() => {
  // k17 = ADR (Average Damage per Round)
  const value = playerStore.stats?.lifetime?.k17
  return value ? parseFloat(value).toFixed(0) : null
})

const headshots = computed(() => {
  // k8 = Average Headshots %
  const value = playerStore.stats?.lifetime?.k8
  return value ? parseFloat(value).toFixed(0) : null
})

const kast = computed(() => {
  // k20 = KAST % (Kill, Assist, Survive, Trade) - comes as decimal (0.42 = 42%)
  const value = playerStore.stats?.lifetime?.k20
  return value ? (parseFloat(value) * 100).toFixed(0) : null
})

const entrySuccess = computed(() => {
  // k18 = Entry Success Rate (% successful entry frags) - might be decimal too
  const value = playerStore.stats?.lifetime?.k18
  if (!value) return null
  const numValue = parseFloat(value)
  // If value is less than 1, it's a decimal (0.5 = 50%)
  return numValue < 1 ? (numValue * 100).toFixed(0) : numValue.toFixed(0)
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
