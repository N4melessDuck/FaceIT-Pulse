<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="text-sm text-gray-400 font-semibold">ELO & Level</div>
    </div>
    
    <div class="space-y-3">
      <!-- ELO -->
      <div>
        <div class="text-4xl font-bold text-primary mb-1">
          {{ playerStore.currentElo || '---' }}
        </div>
        <div class="text-xs text-gray-500">Current ELO</div>
      </div>
      
      <!-- Level -->
      <div class="flex items-center gap-2">
        <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
          <span class="text-white font-bold text-xl">{{ playerStore.skillLevel || '?' }}</span>
        </div>
        <div>
          <div class="text-sm font-semibold text-white">Level {{ playerStore.skillLevel || '?' }}</div>
          <div class="text-xs text-gray-400">FACEIT</div>
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
