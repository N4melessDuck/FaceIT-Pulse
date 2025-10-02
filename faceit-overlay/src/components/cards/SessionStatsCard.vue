<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="text-sm text-gray-400 font-semibold">Session</div>
      <div class="text-xs text-gray-500">{{ sessionSize }} games</div>
    </div>
    
    <!-- Main Session Stats -->
    <div class="grid grid-cols-3 gap-2 mb-3">
      <!-- Win Rate -->
      <div class="bg-green-500/10 rounded-lg p-2">
        <div class="text-xs text-gray-400">WR</div>
        <div 
          :class="[
            'text-xl font-bold',
            sessionWinRate >= 60 ? 'text-green-400' :
            sessionWinRate >= 50 ? 'text-primary' :
            'text-red-400'
          ]"
        >
          {{ sessionWinRate }}%
        </div>
      </div>

      <!-- K/D Ratio -->
      <div class="bg-primary/10 rounded-lg p-2">
        <div class="text-xs text-gray-400">K/D</div>
        <div 
          :class="[
            'text-xl font-bold',
            parseFloat(sessionKD) >= 1.0 ? 'text-green-400' :
            parseFloat(sessionKD) >= 0.8 ? 'text-primary' :
            'text-red-400'
          ]"
        >
          {{ sessionKD }}
        </div>
      </div>

      <!-- ADR -->
      <div class="bg-blue-500/10 rounded-lg p-2">
        <div class="text-xs text-gray-400">ADR</div>
        <div 
          :class="[
            'text-xl font-bold',
            parseFloat(sessionADR) >= 80 ? 'text-green-400' :
            parseFloat(sessionADR) >= 70 ? 'text-primary' :
            'text-red-400'
          ]"
        >
          {{ sessionADR }}
        </div>
      </div>
    </div>

    <!-- Session Summary -->
    <div class="mt-3 pt-3 border-t border-gray-700/30">
      <div class="flex items-center justify-between text-xs">
        <span class="text-gray-400">Rating</span>
        <span 
          :class="[
            'font-bold',
            sessionRating === 'Excellent' ? 'text-green-400' :
            sessionRating === 'Good' ? 'text-primary' :
            sessionRating === 'Average' ? 'text-yellow-400' :
            'text-red-400'
          ]"
        >
          {{ sessionRating }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

// Размер сессии (последние N матчей)
const sessionSize = computed(() => {
  const matches = playerStore.recentMatches.length
  return Math.min(matches, 10) // Максимум 10 матчей
})

// Матчи текущей сессии
const sessionMatches = computed(() => {
  return playerStore.recentMatches.slice(0, sessionSize.value)
})

// Win Rate за сессию
const sessionWins = computed(() => {
  return sessionMatches.value.filter(m => m.i10 === '1').length
})

const sessionWinRate = computed(() => {
  if (sessionMatches.value.length === 0) return 0
  return Math.round((sessionWins.value / sessionMatches.value.length) * 100)
})

// K/D за сессию
const totalKills = computed(() => {
  return sessionMatches.value.reduce((sum, m) => sum + parseInt(m.i6), 0)
})

const totalDeaths = computed(() => {
  return sessionMatches.value.reduce((sum, m) => sum + parseInt(m.i8), 0)
})

const sessionKD = computed(() => {
  if (totalDeaths.value === 0) return totalKills.value.toFixed(2)
  return (totalKills.value / totalDeaths.value).toFixed(2)
})

// ADR за сессию
const sessionADR = computed(() => {
  if (sessionMatches.value.length === 0) return '0'
  const sum = sessionMatches.value.reduce((acc, m) => acc + parseFloat(m.c10), 0)
  return Math.round(sum / sessionMatches.value.length).toString()
})

// Рейтинг сессии (0-10)
const sessionRatingScore = computed(() => {
  let score = 5.0 // базовый рейтинг
  
  // Win Rate влияние (±2)
  if (sessionWinRate.value >= 70) score += 2
  else if (sessionWinRate.value >= 60) score += 1.5
  else if (sessionWinRate.value >= 50) score += 1
  else if (sessionWinRate.value >= 40) score += 0.5
  else if (sessionWinRate.value < 30) score -= 2
  else score -= 1
  
  // K/D влияние (±1.5)
  const kd = parseFloat(sessionKD.value)
  if (kd >= 1.3) score += 1.5
  else if (kd >= 1.1) score += 1
  else if (kd >= 0.9) score += 0.5
  else if (kd < 0.7) score -= 1.5
  else score -= 1
  
  // ADR влияние (±1.5)
  const adr = parseFloat(sessionADR.value)
  if (adr >= 90) score += 1.5
  else if (adr >= 80) score += 1
  else if (adr >= 70) score += 0.5
  else if (adr < 60) score -= 1.5
  else score -= 1
  
  return Math.max(0, Math.min(10, score)).toFixed(1)
})

const sessionRating = computed(() => {
  const score = parseFloat(sessionRatingScore.value)
  
  if (score >= 8.0) return 'Excellent'
  if (score >= 6.5) return 'Good'
  if (score >= 5.0) return 'Average'
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
