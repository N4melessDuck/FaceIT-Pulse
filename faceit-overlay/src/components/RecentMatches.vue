<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'
import type { Match } from '@/types'

const playerStore = usePlayerStore()

const matches = computed(() => playerStore.recentMatches.slice(0, 10))

function isWin(match: Match): boolean {
  return match.i10 === '1'
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  
  if (diffHours < 1) return 'Только что'
  if (diffHours < 24) return `${diffHours}ч назад`
  
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return 'Вчера'
  if (diffDays < 7) return `${diffDays}д назад`
  
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

function getMapName(mapCode: string): string {
  return mapCode.replace('de_', '').replace('cs_', '').toUpperCase()
}
</script>

<template>
  <div class="glass rounded-2xl p-6 animate-slide-up" style="animation-delay: 0.2s">
    <h3 class="text-xl font-bold text-white mb-4">Последние матчи</h3>
    
    <div v-if="!matches.length" class="text-center text-gray-400 py-8">
      Нет данных о матчах
    </div>

    <div v-else class="space-y-2 max-h-[600px] overflow-y-auto scrollbar-thin">
      <div
        v-for="match in matches"
        :key="match.matchId"
        class="flex items-center gap-4 p-4 rounded-lg transition-all hover:bg-faceit-gray/50"
        :class="isWin(match) ? 'bg-green-400/5 border-l-4 border-green-400' : 'bg-red-400/5 border-l-4 border-red-400'"
      >
        <!-- Win/Loss Badge -->
        <div class="flex-shrink-0">
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
            :class="isWin(match) ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'"
          >
            {{ isWin(match) ? 'W' : 'L' }}
          </div>
        </div>

        <!-- Map & Score -->
        <div class="flex-1">
          <div class="font-semibold text-white">
            {{ getMapName(match.i1) }}
          </div>
          <div class="text-sm text-gray-400">
            {{ match.i18 }}
          </div>
        </div>

        <!-- Stats -->
        <div class="flex gap-4 text-sm">
          <div class="text-center">
            <div class="text-gray-400 text-xs">K/D/A</div>
            <div class="text-white font-mono">
              {{ match.i6 }}/{{ match.i8 }}/{{ match.i7 }}
            </div>
          </div>
          
          <div class="text-center">
            <div class="text-gray-400 text-xs">K/D</div>
            <div 
              class="font-mono font-bold"
              :class="parseFloat(match.c2) >= 1 ? 'text-green-400' : 'text-red-400'"
            >
              {{ parseFloat(match.c2).toFixed(2) }}
            </div>
          </div>
          
          <div class="text-center">
            <div class="text-gray-400 text-xs">ADR</div>
            <div class="text-primary font-mono font-bold">
              {{ parseFloat(match.c10).toFixed(0) }}
            </div>
          </div>
          
          <div class="text-center">
            <div class="text-gray-400 text-xs">HS%</div>
            <div class="text-white font-mono">
              {{ match.c4 }}%
            </div>
          </div>
        </div>

        <!-- ELO Change (if available) -->
        <div v-if="match.elo" class="flex-shrink-0 text-right">
          <div class="text-xs text-gray-400">ELO</div>
          <div class="text-primary font-mono font-bold">
            {{ match.elo.toLocaleString() }}
          </div>
        </div>

        <!-- Time -->
        <div class="flex-shrink-0 text-xs text-gray-500">
          {{ formatDate(match.date) }}
        </div>
      </div>
    </div>
  </div>
</template>
