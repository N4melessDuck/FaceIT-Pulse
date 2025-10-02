<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="text-sm text-gray-400 font-semibold mb-4">Top Maps</div>
    
    <div v-if="topMaps.length > 0" class="space-y-2">
      <div
        v-for="(map, index) in topMaps.slice(0, 3)"
        :key="map.name"
        class="flex items-center justify-between"
      >
        <!-- Map Name -->
        <div class="flex items-center gap-2 flex-1">
          <div 
            :class="[
              'w-6 h-6 flex items-center justify-center rounded text-xs font-bold',
              index === 0 ? 'bg-yellow-500/20 text-yellow-400' : 
              index === 1 ? 'bg-gray-400/20 text-gray-300' :
              'bg-orange-600/20 text-orange-400'
            ]"
          >
            {{ index + 1 }}
          </div>
          <div class="text-sm text-white">{{ map.displayName }}</div>
        </div>

        <!-- Win Rate -->
        <div class="text-right">
          <div 
            :class="[
              'text-lg font-bold',
              map.winRate >= 60 ? 'text-green-400' :
              map.winRate >= 50 ? 'text-primary' :
              'text-red-400'
            ]"
          >
            {{ map.winRate }}%
          </div>
          <div class="text-xs text-gray-500">{{ map.wins }}W {{ map.losses }}L</div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-4 text-gray-500 text-sm">
      No map data
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

// Маппинг названий карт
const MAP_NAMES: Record<string, string> = {
  'de_dust2': 'Dust 2',
  'de_mirage': 'Mirage',
  'de_inferno': 'Inferno',
  'de_nuke': 'Nuke',
  'de_vertigo': 'Vertigo',
  'de_ancient': 'Ancient',
  'de_anubis': 'Anubis',
  'de_overpass': 'Overpass',
  'de_train': 'Train',
  'de_cache': 'Cache',
  'de_cobblestone': 'Cobblestone'
}

interface MapStats {
  name: string
  displayName: string
  matches: number
  wins: number
  losses: number
  winRate: number
}

// Вычисляем статистику по картам из segments
const topMaps = computed(() => {
  if (!playerStore.stats?.segments) return []

  // Находим сегмент с картами (csgo_map или cs2_map)
  const mapSegment = playerStore.stats.segments.find(s => 
    s._id?.segmentId === 'csgo_map' || s._id?.segmentId === 'cs2_map'
  )

  if (!mapSegment?.segments) return []

  // Преобразуем данные карт в массив со статистикой
  const mapStats: MapStats[] = []
  
  for (const [mapName, stats] of Object.entries(mapSegment.segments)) {
    const matches = parseInt((stats as any).m1 || '0')
    const wins = parseInt((stats as any).m2 || '0')
    const losses = matches - wins
    const winRate = matches > 0 ? Math.round((wins / matches) * 100) : 0

    // Фильтруем карты с минимум 3 матчами для статистической значимости
    if (matches >= 3) {
      mapStats.push({
        name: mapName,
        displayName: MAP_NAMES[mapName] || mapName,
        matches,
        wins,
        losses,
        winRate
      })
    }
  }

  // Сортируем по win rate, затем по количеству матчей
  return mapStats.sort((a, b) => {
    if (b.winRate !== a.winRate) {
      return b.winRate - a.winRate
    }
    return b.matches - a.matches
  })
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
