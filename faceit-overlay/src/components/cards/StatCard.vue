<template>
  <component :is="cardComponent" v-if="cardComponent" />
  <div v-else class="stat-card glass rounded-xl p-6 text-center text-gray-400">
    <div class="text-4xl mb-2">❓</div>
    <div class="text-sm">Unknown card type: {{ type }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { CardType } from '@/types/cards'

interface Props {
  type: CardType
}

const props = defineProps<Props>()

// Lazy load card components
const cardComponents = {
  elo: defineAsyncComponent(() => import('./EloCard.vue')),
  winrate: defineAsyncComponent(() => import('./WinRateCard.vue')),
  kd: defineAsyncComponent(() => import('./KDCard.vue')),
  avgKills: defineAsyncComponent(() => import('./AvgKillsCard.vue')),
  avgDeaths: defineAsyncComponent(() => import('./AvgDeathsCard.vue')),
  recentMatches: defineAsyncComponent(() => import('./RecentMatchesCard.vue')),
  recentStreak: defineAsyncComponent(() => import('./RecentStreakCard.vue')),
  eloDiff: defineAsyncComponent(() => import('./EloDiffCard.vue')),
  winStreak: defineAsyncComponent(() => import('./WinStreakCard.vue')),
  performance: defineAsyncComponent(() => import('./PerformanceCard.vue')),
  maps: defineAsyncComponent(() => import('./MapsCard.vue')),
  // Tier 1 новые карточки
  multiKill: defineAsyncComponent(() => import('./MultiKillCard.vue')),
  mapPerformance: defineAsyncComponent(() => import('./MapPerformanceCard.vue')),
  performanceTrend: defineAsyncComponent(() => import('./PerformanceTrendCard.vue')),
  // Tier 2 новые карточки
  entryFragging: defineAsyncComponent(() => import('./EntryFraggingCard.vue')),
  mvpAssist: defineAsyncComponent(() => import('./MvpAssistCard.vue')),
  sessionStats: defineAsyncComponent(() => import('./SessionStatsCard.vue'))
}

const cardComponent = computed(() => {
  return cardComponents[props.type as keyof typeof cardComponents] || null
})
</script>
