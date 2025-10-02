<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { UPDATE_INTERVALS } from '@/config/constants'
import PlayerHeader from './PlayerHeader.vue'
import StatsCards from './StatsCards.vue'
import RecentMatches from './RecentMatches.vue'

const playerStore = usePlayerStore()

let statsInterval: number | undefined
let userInterval: number | undefined

onMounted(() => {
  // Обновление статистики каждую минуту
  statsInterval = window.setInterval(() => {
    playerStore.refreshStats()
  }, UPDATE_INTERVALS.STATS)

  // Обновление ELO каждые 30 секунд
  userInterval = window.setInterval(() => {
    playerStore.refreshUser()
  }, UPDATE_INTERVALS.ELO)
})

onUnmounted(() => {
  if (statsInterval) clearInterval(statsInterval)
  if (userInterval) clearInterval(userInterval)
})
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-6 animate-fade-in">
    <PlayerHeader />
    <StatsCards />
    <RecentMatches />
    
    <div class="text-center text-xs text-gray-500">
      Последнее обновление: 
      {{ playerStore.lastUpdate?.toLocaleTimeString('ru-RU') || 'никогда' }}
    </div>
  </div>
</template>
