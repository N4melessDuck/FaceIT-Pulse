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

      <!-- K/R Trend -->
      <div class="bg-purple-500/10 rounded-lg p-2">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs text-gray-400">K/R</span>
          <span 
            :class="[
              'text-xs font-bold',
              krTrend > 0 ? 'text-green-400' :
              krTrend < 0 ? 'text-red-400' :
              'text-gray-400'
            ]"
          >
            {{ krTrend > 0 ? '↑' : krTrend < 0 ? '↓' : '=' }}{{ Math.abs(krTrend) }}%
          </span>
        </div>
        <div class="text-lg font-bold text-white">{{ avgKR }}</div>
      </div>

      <!-- Multi-kill Average -->
      <div class="bg-orange-500/10 rounded-lg p-2">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs text-gray-400">Multi-K</span>
          <span 
            :class="[
              'text-xs font-bold',
              multiKillTrend > 0 ? 'text-green-400' :
              multiKillTrend < 0 ? 'text-red-400' :
              'text-gray-400'
            ]"
          >
            {{ multiKillTrend > 0 ? '↑' : multiKillTrend < 0 ? '↓' : '=' }}{{ Math.abs(multiKillTrend) }}%
          </span>
        </div>
        <div class="text-lg font-bold text-white">{{ avgMultiKill }}</div>
      </div>
    </div>

    <!-- Consistency Score -->
    <div>
      <div class="text-xs text-gray-400 mb-2">Consistency Score</div>
      <div class="space-y-2">
        <!-- Consistency Bar -->
        <div class="relative h-8 bg-gray-800/50 rounded-lg overflow-hidden">
          <div 
            class="absolute inset-y-0 left-0 rounded-lg transition-all duration-500"
            :class="consistencyColorClass"
            :style="{ width: `${consistencyScore}%` }"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-sm font-bold text-white drop-shadow-lg">
              {{ consistencyScore }}%
            </span>
          </div>
        </div>
        
        <!-- Consistency Description -->
        <div class="flex items-center justify-between text-xs">
          <span class="text-gray-400">Stability</span>
          <span 
            :class="[
              'font-bold',
              consistencyScore >= 80 ? 'text-green-400' :
              consistencyScore >= 60 ? 'text-primary' :
              consistencyScore >= 40 ? 'text-yellow-400' :
              'text-red-400'
            ]"
          >
            {{ consistencyLabel }}
          </span>
        </div>
        
        <!-- Stats Variance Info -->
        <div class="text-[10px] text-gray-500 flex justify-between">
          <span>K/D σ: {{ kdStdDev }}</span>
          <span>ADR σ: {{ adrStdDev }}</span>
        </div>
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
  kr: string
  multiKills: number
}

// Последние матчи для анализа тренда
const recentPerformance = computed<PerformanceData[]>(() => {
  if (!playerStore.recentMatches || !playerStore.recentMatches.length) {
    return []
  }
  
  return playerStore.recentMatches.map(match => {
    // Подсчет multi-kills (2K, 3K, 4K, 5K)
    const doubleKills = parseInt(match.i40 || '0')
    const tripleKills = parseInt(match.i14 || '0')
    const quadroKills = parseInt(match.i15 || '0')
    const pentaKills = parseInt(match.i16 || '0')
    const totalMultiKills = doubleKills + tripleKills + quadroKills + pentaKills
    
    return {
      kd: match.c2 || '0',
      adr: match.c10 || '0',
      kr: match.c3 || '0',  // c3 = K/R Ratio
      multiKills: totalMultiKills
    }
  }).filter(match => {
    // Фильтруем матчи у которых есть хоть какие-то данные
    return parseFloat(match.kd) > 0 || parseFloat(match.adr) > 0
  })
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

const avgKR = computed(() => {
  if (!recentPerformance.value.length) return '0.00'
  const sum = recentPerformance.value.reduce((acc, match) => acc + parseFloat(match.kr), 0)
  return (sum / recentPerformance.value.length).toFixed(2)
})

const avgMultiKill = computed(() => {
  if (!recentPerformance.value.length) return '0.0'
  const sum = recentPerformance.value.reduce((acc, match) => acc + match.multiKills, 0)
  return (sum / recentPerformance.value.length).toFixed(1)
})

// Lifetime средние для сравнения
const lifetimeKD = computed(() => {
  return playerStore.stats?.lifetime?.k5 || '0.00'
})

const lifetimeADR = computed(() => {
  return playerStore.stats?.lifetime?.k17 || '0'
})

const lifetimeKR = computed(() => {
  return playerStore.stats?.lifetime?.k9 || '0.00'
})

const lifetimeMultiKill = computed(() => {
  // k10, k11, k12 = Average Triple, Quadro, Penta Kills
  const avg2K = parseFloat(playerStore.stats?.lifetime?.k40 || '0') // если есть
  const avg3K = parseFloat(playerStore.stats?.lifetime?.k10 || '0')
  const avg4K = parseFloat(playerStore.stats?.lifetime?.k11 || '0')
  const avg5K = parseFloat(playerStore.stats?.lifetime?.k12 || '0')
  return (avg2K + avg3K + avg4K + avg5K).toFixed(1)
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

// Тренд K/R (процентное изменение относительно lifetime)
const krTrend = computed(() => {
  const recent = parseFloat(avgKR.value)
  const lifetime = parseFloat(lifetimeKR.value)
  
  if (lifetime === 0) return 0
  
  const change = ((recent - lifetime) / lifetime) * 100
  return Math.round(change)
})

// Тренд Multi-kills (процентное изменение относительно lifetime)
const multiKillTrend = computed(() => {
  const recent = parseFloat(avgMultiKill.value)
  const lifetime = parseFloat(lifetimeMultiKill.value)
  
  if (lifetime === 0) return 0
  
  const change = ((recent - lifetime) / lifetime) * 100
  return Math.round(change)
})

// Вычисление стандартного отклонения (мера разброса данных)
function calculateStdDev(values: number[]): number {
  if (values.length === 0) return 0
  
  const avg = values.reduce((a, b) => a + b, 0) / values.length
  const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length
  return Math.sqrt(variance)
}

// Стандартное отклонение K/D
const kdStdDev = computed(() => {
  if (!recentPerformance.value.length) return '0.00'
  const kdValues = recentPerformance.value.map(m => parseFloat(m.kd))
  return calculateStdDev(kdValues).toFixed(2)
})

// Стандартное отклонение ADR
const adrStdDev = computed(() => {
  if (!recentPerformance.value.length) return '0'
  const adrValues = recentPerformance.value.map(m => parseFloat(m.adr))
  return Math.round(calculateStdDev(adrValues)).toString()
})

// Consistency Score (0-100%) - обратная величина нормализованного отклонения
const consistencyScore = computed(() => {
  if (!recentPerformance.value.length) return 0
  
  const kdValues = recentPerformance.value.map(m => parseFloat(m.kd))
  const adrValues = recentPerformance.value.map(m => parseFloat(m.adr))
  
  const kdAvg = kdValues.reduce((a, b) => a + b, 0) / kdValues.length
  const adrAvg = adrValues.reduce((a, b) => a + b, 0) / adrValues.length
  
  const kdStd = calculateStdDev(kdValues)
  const adrStd = calculateStdDev(adrValues)
  
  // Коэффициент вариации (CV) - отклонение относительно среднего
  const kdCV = kdAvg > 0 ? (kdStd / kdAvg) : 0
  const adrCV = adrAvg > 0 ? (adrStd / adrAvg) : 0
  
  // Средний CV (чем меньше - тем стабильнее)
  const avgCV = (kdCV + adrCV) / 2
  
  // Конвертируем в процент стабильности (инвертируем и нормализуем)
  // CV > 0.5 = очень нестабильно (0%), CV = 0 = идеально стабильно (100%)
  const consistency = Math.max(0, Math.min(100, 100 - (avgCV * 150)))
  
  return Math.round(consistency)
})

// Цветовой класс для индикатора стабильности
const consistencyColorClass = computed(() => {
  const score = consistencyScore.value
  if (score >= 80) return 'bg-gradient-to-r from-green-500 to-green-400'
  if (score >= 60) return 'bg-gradient-to-r from-primary to-orange-400'
  if (score >= 40) return 'bg-gradient-to-r from-yellow-500 to-yellow-400'
  return 'bg-gradient-to-r from-red-500 to-red-400'
})

// Текстовая метка стабильности
const consistencyLabel = computed(() => {
  const score = consistencyScore.value
  if (score >= 80) return 'Very Stable'
  if (score >= 60) return 'Stable'
  if (score >= 40) return 'Moderate'
  return 'Inconsistent'
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
