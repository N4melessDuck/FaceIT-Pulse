<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="text-sm text-gray-400 font-semibold mb-4">Recent Matches</div>
    
    <div v-if="matches.length > 0" class="space-y-2">
      <div
        v-for="match in matches.slice(0, 5)"
        :key="match.matchId"
        class="flex items-center justify-between"
      >
        <!-- Map & Result -->
        <div class="flex items-center gap-2 flex-1">
          <div 
            :class="[
              'w-6 h-6 flex items-center justify-center rounded text-xs font-bold',
              match.i10 === '1' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            ]"
          >
            {{ match.i10 === '1' ? 'W' : 'L' }}
          </div>
          <div class="text-sm text-white">{{ getMapName(match.i1) }}</div>
        </div>

        <!-- Stats -->
        <div class="flex items-center gap-3 text-xs">
          <div class="text-gray-400">
            {{ match.i6 }}/{{ match.i8 }}
          </div>
          <div 
            :class="[
              'font-bold',
              parseFloat(match.c2) >= 1 ? 'text-green-400' : 'text-red-400'
            ]"
          >
            {{ parseFloat(match.c2).toFixed(2) }}
          </div>
          <div class="text-primary font-bold">
            {{ Math.round(parseFloat(match.c10)) }}
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-4 text-gray-500 text-sm">
      No matches
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

const matches = computed(() => playerStore.recentMatches)

function getMapName(mapCode: string): string {
  const name = mapCode.replace('de_', '').replace('cs_', '')
  return name.charAt(0).toUpperCase() + name.slice(1)
}
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
