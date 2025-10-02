<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="text-sm text-gray-400 font-semibold">Performance Trend</div>
      <div class="text-xs text-gray-500">{{ matchCount }} games</div>
    </div>
    
    <!-- Trend Indicators -->
    <div class="grid grid-cols-2 gap-3 mb-3">
      <!-- K/D Trend -->
      <div class="bg-green-500/10 rounded-lg p-2">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs text-gray-400">K/D</span>
          <span 
            :class="[
              'text-xs font-bold',
              kdTrend > 0 ? 'text-green-400' :
              kdTrend < 0 ? 'text-red-400' :
              'text-gray-400'
            ]"
          >
            {{ kdTrend > 0 ? '↑' : kdTrend < 0 ? '↓' : '=' }}{{ Math.abs(kdTrend) }}%
          </span>
        </div>
        <div class="text-lg font-bold text-white">{{ avgKD }}</div>
      </div>

      <!-- ADR Trend -->
      <div class="bg-blue-500/10 rounded-lg p-2">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs text-gray-400">ADR</span>
          <span 
            :class="[
              'text-xs font-bold',
              adrTrend > 0 ? 'text-green-400' :
              adrTrend < 0 ? 'text-red-400' :
              'text-gray-400'
            ]"
          >
            {{ adrTrend > 0 ? '↑' : adrTrend < 0 ? '↓' : '=' }}{{ Math.abs(adrTrend) }}%
          </span>
        </div>
        <div class="text-lg font-bold text-white">{{ avgADR }}</div>
      </div>
    </div>

    <!-- Mini Chart -->
    <div>
      <div class="text-xs text-gray-400 mb-1">Recent Form</div>
      <div class="flex items-end gap-0.5 h-12">
        <div
          v-for="(match, index) in recentPerformance.slice(0, 10).reverse()"
          :key="index"
          class="flex-1"
        >
          <div
            :class="[
              'w-full rounded-t',
              parseFloat(match.kd) >= 1.0 ? 'bg-green-500/60' :
              parseFloat(match.kd) >= 0.8 ? 'bg-blue-500/60' :
              'bg-red-500/60'
            ]"
            :style="{ height: `${Math.min((parseFloat(match.kd) / 2) * 100, 100)}%` }"
          />
        </div>
      </div>
    </div>

    <!-- Form Status -->
    <div class="mt-3 pt-3 border-t border-gray-700/30">
      <div class="flex items-center justify-between text-xs">
        <span class="text-gray-400">Form</span>
        <span 
          :class="[
            'font-bold',
            formStatus === 'Excellent' ? 'text-green-400' :
            formStatus === 'Good' ? 'text-primary' :
            formStatus === 'Average' ? 'text-yellow-400' :
            'text-red-400'
          ]"
        >
          {{ formStatus }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

interface PerformanceData {
  kd: string
  adr: string
}

// Последние матчи для анализа тренда
const recentPerformance = computed<PerformanceData[]>(() => {
  if (!playerStore.recentMatches.length) return []
  
  return playerStore.recentMatches.map(match => ({
    kd: match.c2,
    adr: match.c10
  }))
})

const matchCount = computed(() => recentPerformance.value.length)

// Средние показатели за последние матчи
const avgKD = computed(() => {
  if (!recentPerformance.value.length) return '0.00'
  const sum = recentPerformance.value.reduce((acc, match) => acc + parseFloat(match.kd), 0)
  return (sum / recentPerformance.value.length).toFixed(2)
})

const avgADR = computed(() => {
  if (!recentPerformance.value.length) return '0'
  const sum = recentPerformance.value.reduce((acc, match) => acc + parseFloat(match.adr), 0)
  return Math.round(sum / recentPerformance.value.length).toString()
})

// Lifetime средние для сравнения
const lifetimeKD = computed(() => {
  return playerStore.stats?.lifetime?.k5 || '0.00'
})

const lifetimeADR = computed(() => {
  return playerStore.stats?.lifetime?.k17 || '0'
})

// Тренд K/D (процентное изменение относительно lifetime)
const kdTrend = computed(() => {
  const recent = parseFloat(avgKD.value)
  const lifetime = parseFloat(lifetimeKD.value)
  
  if (lifetime === 0) return 0
  
  const change = ((recent - lifetime) / lifetime) * 100
  return Math.round(change)
})

// Тренд ADR (процентное изменение относительно lifetime)
const adrTrend = computed(() => {
  const recent = parseFloat(avgADR.value)
  const lifetime = parseFloat(lifetimeADR.value)
  
  if (lifetime === 0) return 0
  
  const change = ((recent - lifetime) / lifetime) * 100
  return Math.round(change)
})

// Оценка текущей формы
const formStatus = computed(() => {
  const kd = parseFloat(avgKD.value)
  const adr = parseFloat(avgADR.value)
  
  if (kd >= 1.2 && adr >= 85) return 'Excellent'
  if (kd >= 1.0 && adr >= 75) return 'Good'
  if (kd >= 0.8 && adr >= 60) return 'Average'
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
