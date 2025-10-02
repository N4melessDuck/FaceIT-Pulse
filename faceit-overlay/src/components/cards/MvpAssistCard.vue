<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="text-sm text-gray-400 font-semibold mb-4">Utility & Support</div>
    
    <!-- Main Stats Grid -->
    <div class="grid grid-cols-2 gap-2">
      <!-- Utility Damage per Round -->
      <div class="bg-orange-500/10 rounded-lg p-2">
        <div class="text-xs text-gray-400 mb-1">Utility DMG</div>
        <div class="text-xl font-bold text-orange-400">{{ utilityDamage || '--' }}</div>
        <div class="text-xs text-gray-500">per round</div>
      </div>

      <!-- Flashes per Round -->
      <div class="bg-purple-500/10 rounded-lg p-2">
        <div class="text-xs text-gray-400 mb-1">Flashes</div>
        <div class="text-xl font-bold text-purple-400">{{ flashesPerRound || '--' }}</div>
        <div class="text-xs text-gray-500">per round</div>
      </div>

      <!-- 1v2 Win Rate -->
      <div class="bg-blue-500/10 rounded-lg p-2">
        <div class="text-xs text-gray-400 mb-1">1v2 Clutch</div>
        <div class="text-xl font-bold text-blue-400">{{ clutch1v2Rate || '--' }}%</div>
        <div class="text-xs text-gray-500">win rate</div>
      </div>

      <!-- Enemies Flashed per Round -->
      <div class="bg-green-500/10 rounded-lg p-2">
        <div class="text-xs text-gray-400 mb-1">Flash Impact</div>
        <div class="text-xl font-bold text-green-400">{{ enemiesFlashed || '--' }}</div>
        <div class="text-xs text-gray-500">enemies/round</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

// k26 - Utility Damage per Round (урон от гранат за раунд)
const utilityDamage = computed(() => {
  const value = playerStore.stats?.lifetime?.k26
  return value ? parseFloat(value).toFixed(1) : null
})

// k24 - Flashes per Round (количество флешек за раунд)
const flashesPerRound = computed(() => {
  const value = playerStore.stats?.lifetime?.k24
  return value ? parseFloat(value).toFixed(2) : null
})

// k21 - 1v2 Win Rate (винрейт в клатчах 1v2) - значение в виде десятичной дроби, нужно *100
const clutch1v2Rate = computed(() => {
  const value = playerStore.stats?.lifetime?.k21
  if (!value) return null
  const rate = parseFloat(value)
  // Если значение < 1, то это десятичная дробь (0.28 = 28%)
  return rate < 1 ? (rate * 100).toFixed(0) : rate.toFixed(0)
})

// k22 - Enemies Flashed per Round (ослепленных врагов за раунд)
const enemiesFlashed = computed(() => {
  const value = playerStore.stats?.lifetime?.k22
  return value ? parseFloat(value).toFixed(2) : null
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
