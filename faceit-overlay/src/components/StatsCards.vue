<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { computed } from 'vue'

interface Props {
  visibleStats?: {
    winRate?: boolean
    avgKD?: boolean
    avgKills?: boolean
    avgDeaths?: boolean
  }
}

const props = withDefaults(defineProps<Props>(), {
  visibleStats: () => ({
    winRate: true,
    avgKD: true,
    avgKills: true,
    avgDeaths: true
  })
})

const playerStore = usePlayerStore()

// Filter visible stats
const visibleStatsCount = computed(() => {
  return Object.values(props.visibleStats).filter(Boolean).length
})

const gridCols = computed(() => {
  if (visibleStatsCount.value === 1) return 'grid-cols-1'
  if (visibleStatsCount.value === 2) return 'grid-cols-1 md:grid-cols-2'
  if (visibleStatsCount.value === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
})
</script>

<template>
  <div :class="['grid gap-4 animate-slide-up', gridCols]" style="animation-delay: 0.1s">
    <!-- Винрейт -->
    <div v-if="visibleStats.winRate" class="glass rounded-xl p-6">
      <div class="text-gray-400 text-sm mb-2">Винрейт</div>
      <div class="text-3xl font-bold text-white">
        {{ playerStore.winRate || '--' }}%
      </div>
      <div class="text-xs text-gray-500 mt-1">
        {{ playerStore.totalMatches || '0' }} матчей
      </div>
    </div>

    <!-- Средний K/D -->
    <div v-if="visibleStats.avgKD" class="glass rounded-xl p-6">
      <div class="text-gray-400 text-sm mb-2">Avg K/D</div>
      <div class="text-3xl font-bold text-primary">
        {{ playerStore.avgKD || '--' }}
      </div>
    </div>

    <!-- Средние убийства -->
    <div v-if="visibleStats.avgKills" class="glass rounded-xl p-6">
      <div class="text-gray-400 text-sm mb-2">Avg Kills</div>
      <div class="text-3xl font-bold text-green-400">
        {{ playerStore.avgKills || '--' }}
      </div>
    </div>

    <!-- Средние смерти -->
    <div v-if="visibleStats.avgDeaths" class="glass rounded-xl p-6">
      <div class="text-gray-400 text-sm mb-2">Avg Deaths</div>
      <div class="text-3xl font-bold text-red-400">
        {{ playerStore.avgDeaths || '--' }}
      </div>
    </div>
  </div>
</template>
