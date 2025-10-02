<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="text-sm text-gray-400 font-semibold">K/D Ratio</div>
    </div>
    
    <div class="space-y-3">
      <!-- K/D Ratio -->
      <div>
        <div class="text-4xl font-bold text-primary mb-1">
          {{ playerStore.avgKD || '--' }}
        </div>
        <div class="text-xs text-gray-500">Avg K/D Ratio</div>
      </div>
      
      <!-- Kills and Deaths -->
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-green-500/10 rounded-lg p-2">
          <div class="text-green-400 font-bold text-lg">{{ playerStore.avgKills || '--' }}</div>
          <div class="text-xs text-gray-400">Avg Kills</div>
        </div>
        <div class="bg-red-500/10 rounded-lg p-2">
          <div class="text-red-400 font-bold text-lg">{{ playerStore.avgDeaths || '--' }}</div>
          <div class="text-xs text-gray-400">Avg Deaths</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
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
