<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="text-sm text-gray-400 font-semibold">Recent Form</div>
    </div>
    
    <div class="space-y-4">
      <!-- Match Results with ELO -->
      <div class="flex items-start justify-between gap-2">
        <div
          v-for="(match, index) in matchesWithElo"
          :key="index"
          class="flex flex-col items-center gap-1.5 flex-1"
        >
          <!-- Result Badge -->
          <div
            :class="[
              'w-full aspect-square max-w-[50px] rounded-lg flex items-center justify-center font-bold text-base transition-all',
              match.result === 'W' 
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
            ]"
            :title="`${match.result === 'W' ? 'Victory' : 'Defeat'} • ${match.eloDiff > 0 ? '+' : ''}${match.eloDiff} ELO`"
          >
            {{ match.result }}
          </div>
          <!-- ELO Change -->
          <div 
            v-if="match.eloDiff !== 0"
            :class="[
              'text-xs font-bold leading-none',
              match.eloDiff > 0 ? 'text-green-400' : 'text-red-400'
            ]"
          >
            {{ match.eloDiff > 0 ? '+' : '' }}{{ match.eloDiff }}
          </div>
        </div>
      </div>
      
      <!-- Stats Row -->
      <div class="flex items-center justify-between">
        <!-- Current Streak -->
        <div v-if="currentStreak" class="flex items-center gap-2">
          <div 
            :class="[
              'px-4 py-2 rounded-full font-bold text-base',
              currentStreak.type === 'W' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
            ]"
          >
            {{ currentStreak.count }}{{ currentStreak.type }} Streak
          </div>
        </div>
        
        <!-- Total ELO Change -->
        <div v-if="totalEloDiff !== 0" class="flex flex-col items-end">
          <span 
            :class="[
              'text-2xl font-bold leading-none',
              totalEloDiff > 0 ? 'text-green-400' : 'text-red-400'
            ]"
          >
            {{ totalEloDiff > 0 ? '+' : '' }}{{ totalEloDiff }}
          </span>
          <span class="text-xs text-gray-500 mt-1">Total ELO</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

// Get last 7 matches with ELO changes
const matchesWithElo = computed(() => {
  if (!playerStore.recentMatches || playerStore.recentMatches.length === 0) {
    return []
  }
  
  // Take 8 matches to calculate ELO diff for the 7th match
  const matches = playerStore.recentMatches.slice(0, 8)
  const result = []
  
  // But only show 7 matches
  for (let i = 0; i < Math.min(7, matches.length); i++) {
    const match = matches[i]
    const nextMatch = matches[i + 1]
    
    // Calculate ELO diff
    // Match is newer, nextMatch is older (before this match)
    // So: current match ELO - previous match ELO = ELO change in this match
    let eloDiff = 0
    if (match.elo !== undefined && nextMatch?.elo !== undefined) {
      eloDiff = match.elo - nextMatch.elo
    }
    
    result.push({
      result: match.i10 === '1' ? 'W' : 'L',
      eloDiff
    })
  }
  
  return result
})

// Calculate current streak
const currentStreak = computed(() => {
  if (matchesWithElo.value.length === 0) return null
  
  const firstResult = matchesWithElo.value[0].result
  let count = 1
  
  for (let i = 1; i < matchesWithElo.value.length; i++) {
    if (matchesWithElo.value[i].result === firstResult) {
      count++
    } else {
      break
    }
  }
  
  return {
    type: firstResult,
    count
  }
})

// Total ELO change from recent matches
const totalEloDiff = computed(() => {
  return matchesWithElo.value.reduce((sum, match) => sum + match.eloDiff, 0)
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
