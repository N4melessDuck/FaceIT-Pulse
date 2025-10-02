<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="text-sm text-gray-400 font-semibold">Performance</div>
    </div>
    
    <div class="space-y-3">
      <!-- ADR -->
      <div class="flex items-center justify-between">
        <div class="text-xs text-gray-400">ADR</div>
        <div class="text-lg font-bold text-primary">{{ adr }}</div>
      </div>
      
      <!-- Headshots % -->
      <div class="flex items-center justify-between">
        <div class="text-xs text-gray-400">Headshots</div>
        <div class="text-lg font-bold text-yellow-400">{{ headshotPercent }}%</div>
      </div>
      
      <!-- K/R Ratio -->
      <div class="flex items-center justify-between">
        <div class="text-xs text-gray-400">K/R Ratio</div>
        <div class="text-lg font-bold text-white">{{ krRatio }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

const adr = computed(() => {
  return playerStore.stats?.lifetime.k17 || '--'
})

const headshotPercent = computed(() => {
  return playerStore.stats?.lifetime.k8 || '--'
})

const krRatio = computed(() => {
  return playerStore.stats?.lifetime.k25 || '--'
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
