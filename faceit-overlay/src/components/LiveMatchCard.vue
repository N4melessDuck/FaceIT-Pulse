<template>
  <div v-if="playerStore.currentMatch" class="live-match-card glass rounded-lg p-4">
    <!-- Header -->
    <div class="text-center mb-3">
      <div class="flex items-center justify-center gap-3 mb-1">
        <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <h2 class="text-3xl font-bold text-white">{{ getMatchStatusText() }}</h2>
        <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
      </div>
      <div class="text-primary font-bold text-lg flex items-center justify-center gap-2">
        <span>{{ match.gameModeLabel?.en || match.game || '5v5' }} • {{ match.entity?.name || 'Matchmaking' }}</span>
        <span v-if="getMapName()" class="text-yellow-400">
          • {{ getMapName() }}
        </span>
      </div>
      <div class="text-xs text-gray-400 mt-1">
        Цифры показывают отклонение от среднего по команде
      </div>
    </div>

    <!-- Win Probability Bar -->
    <div v-if="match.winProbability" class="mb-3">
      <div class="relative h-10 bg-gray-800 rounded-full overflow-hidden">
        <div 
          class="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000"
          :style="{ width: `${match.winProbability.team1}%` }"
        ></div>
        <div 
          class="absolute right-0 top-0 h-full bg-gradient-to-l from-red-500 to-red-600 transition-all duration-1000"
          :style="{ width: `${match.winProbability.team2}%` }"
        ></div>
        <div class="absolute inset-0 flex items-center justify-between px-5 text-white font-bold text-lg">
          <span>{{ match.teams.faction1.name }} {{ match.winProbability.team1 }}%</span>
          <span>{{ match.winProbability.team2 }}% {{ match.teams.faction2.name }}</span>
        </div>
      </div>
    </div>

    <!-- Teams Display -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Team 1 (faction1) -->
      <div class="team-container px-1">
        <!-- Team Header with Stats -->
        <div class="team-header mb-2.5 pb-2 border-b-2 border-green-500/40">
          <h3 class="text-xl font-bold text-green-400 mb-1.5">{{ match.teams.faction1.name }}</h3>
          <div class="flex justify-between">
            <div class="text-center">
              <div class="text-green-400 font-bold text-lg">{{ Math.round(match.teams.faction1.avgStats.elo) }}</div>
              <div class="text-gray-400 text-xs">ELO</div>
            </div>
            <div class="text-center">
              <div class="text-green-400 font-bold text-lg">{{ match.teams.faction1.avgStats.kd.toFixed(2) }}</div>
              <div class="text-gray-400 text-xs">K/D</div>
            </div>
            <div class="text-center">
              <div class="text-green-400 font-bold text-lg">{{ Math.round(match.teams.faction1.avgStats.winRate) }}%</div>
              <div class="text-gray-400 text-xs">WR</div>
            </div>
            <div class="text-center">
              <div class="text-green-400 font-bold text-lg">{{ Math.round(match.teams.faction1.avgStats.adr) }}</div>
              <div class="text-gray-400 text-xs">ADR</div>
            </div>
          </div>
        </div>
        
        <!-- Players with Stats -->
        <div class="space-y-3">
          <div 
            v-for="player in match.teams.faction1.roster" 
            :key="player.id"
            class="player-card bg-gray-800/40 rounded-xl p-3 transition-all"
            :class="{ 
              'border-[3px] border-primary bg-gradient-to-r from-primary/20 to-primary/10 shadow-xl shadow-primary/50': player.id === playerStore.user?.id 
            }"
          >
            <!-- Player Header -->
            <div class="flex items-center gap-2.5 mb-1.5">
              <img 
                :src="player.avatar" 
                :alt="player.nickname"
                class="w-11 h-11 rounded-full border-2 transition-all"
                :class="player.id === playerStore.user?.id ? 'border-primary shadow-lg shadow-primary/50' : 'border-green-500/50'"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-baseline justify-between">
                  <div class="font-bold text-lg truncate"
                       :class="player.id === playerStore.user?.id ? 'text-primary' : 'text-white'">
                    {{ player.nickname }}
                  </div>
                  <div class="text-right ml-2">
                    <div class="text-primary font-bold text-base">{{ player.elo }}</div>
                    <div class="text-gray-500 text-xs">{{ player.stats.matches }} игр</div>
                  </div>
                </div>
                <!-- Recent Matches History -->
                <div v-if="player.recentMatches" class="flex items-center gap-1 text-sm mt-0.5 tracking-wider">
                  <span 
                    v-for="(result, index) in player.recentMatches.split('')" 
                    :key="index"
                    :class="result === 'W' ? 'text-green-400' : 'text-red-400'"
                    class="font-black"
                  >
                    {{ result }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Player Stats Grid -->
            <div class="grid grid-cols-5 gap-2.5">
              <div>
                <div class="text-gray-400 text-xs mb-0.5">K/D</div>
                <div class="flex items-center gap-1">
                  <span class="text-white font-bold text-lg">{{ player.stats.kd.toFixed(2) }}</span>
                  <span 
                    v-if="player.deviation && !isNaN(player.deviation.kd) && Math.round(player.deviation.kd * 10) !== 0"
                    :class="player.deviation.kd >= 0 ? 'text-green-400' : 'text-red-400'"
                    class="text-xs font-bold"
                  >
                    {{ player.deviation.kd >= 0 ? '+' : '' }}{{ player.deviation.kd.toFixed(1) }}
                  </span>
                </div>
              </div>
              <div>
                <div class="text-gray-400 text-xs mb-0.5">WR</div>
                <div class="flex items-center gap-1">
                  <span class="text-white font-bold text-lg">{{ Math.round(player.stats.winRate) }}%</span>
                  <span 
                    v-if="player.deviation && Math.round(player.deviation.winRate) !== 0"
                    :class="player.deviation.winRate >= 0 ? 'text-green-400' : 'text-red-400'"
                    class="text-xs font-bold"
                  >
                    {{ player.deviation.winRate >= 0 ? '+' : '' }}{{ Math.round(player.deviation.winRate) }}
                  </span>
                </div>
              </div>
              <div>
                <div class="text-gray-400 text-xs mb-0.5">ADR</div>
                <div class="flex items-center gap-1">
                  <span class="text-white font-bold text-lg">{{ Math.round(player.stats.adr) }}</span>
                  <span 
                    v-if="player.deviation && Math.round(player.deviation.adr) !== 0"
                    :class="player.deviation.adr >= 0 ? 'text-green-400' : 'text-red-400'"
                    class="text-xs font-bold"
                  >
                    {{ player.deviation.adr >= 0 ? '+' : '' }}{{ Math.round(player.deviation.adr) }}
                  </span>
                </div>
              </div>
              <div>
                <div class="text-gray-400 text-xs mb-0.5">HS%</div>
                <div class="flex items-center gap-1">
                  <span class="text-white font-bold text-lg">{{ Math.round(player.stats.headshots) }}%</span>
                  <span 
                    v-if="player.deviation && Math.round(player.deviation.headshots) !== 0"
                    :class="player.deviation.headshots >= 0 ? 'text-green-400' : 'text-red-400'"
                    class="text-xs font-bold"
                  >
                    {{ player.deviation.headshots >= 0 ? '+' : '' }}{{ Math.round(player.deviation.headshots) }}
                  </span>
                </div>
              </div>
              <div>
                <div class="text-gray-400 text-xs mb-0.5">KAST</div>
                <div class="flex items-center gap-1">
                  <span class="text-white font-bold text-lg">{{ Math.round(player.stats.kast) }}%</span>
                  <span 
                    v-if="player.deviation && Math.round(player.deviation.kast) !== 0"
                    :class="player.deviation.kast >= 0 ? 'text-green-400' : 'text-red-400'"
                    class="text-xs font-bold"
                  >
                    {{ player.deviation.kast >= 0 ? '+' : '' }}{{ Math.round(player.deviation.kast) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team 2 (faction2) -->
      <div class="team-container px-1">
        <!-- Team Header with Stats -->
        <div class="team-header mb-2.5 pb-2 border-b-2 border-red-500/40">
          <h3 class="text-xl font-bold text-red-400 mb-1.5">{{ match.teams.faction2.name }}</h3>
          <div class="flex justify-between">
            <div class="text-center">
              <div class="text-red-400 font-bold text-lg">{{ Math.round(match.teams.faction2.avgStats.elo) }}</div>
              <div class="text-gray-400 text-xs">ELO</div>
            </div>
            <div class="text-center">
              <div class="text-red-400 font-bold text-lg">{{ match.teams.faction2.avgStats.kd.toFixed(2) }}</div>
              <div class="text-gray-400 text-xs">K/D</div>
            </div>
            <div class="text-center">
              <div class="text-red-400 font-bold text-lg">{{ Math.round(match.teams.faction2.avgStats.winRate) }}%</div>
              <div class="text-gray-400 text-xs">WR</div>
            </div>
            <div class="text-center">
              <div class="text-red-400 font-bold text-lg">{{ Math.round(match.teams.faction2.avgStats.adr) }}</div>
              <div class="text-gray-400 text-xs">ADR</div>
            </div>
          </div>
        </div>
        
        <!-- Players with Stats -->
        <div class="space-y-3">
          <div 
            v-for="player in match.teams.faction2.roster" 
            :key="player.id"
            class="player-card bg-gray-800/40 rounded-xl p-3 transition-all"
            :class="{ 
              'border-[3px] border-primary bg-gradient-to-r from-primary/20 to-primary/10 shadow-xl shadow-primary/50': player.id === playerStore.user?.id 
            }"
          >
            <!-- Player Header -->
            <div class="flex items-center gap-2.5 mb-1.5">
              <img 
                :src="player.avatar" 
                :alt="player.nickname"
                class="w-11 h-11 rounded-full border-2 transition-all"
                :class="player.id === playerStore.user?.id ? 'border-primary shadow-lg shadow-primary/50' : 'border-red-500/50'"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-baseline justify-between">
                  <div class="font-bold text-lg truncate"
                       :class="player.id === playerStore.user?.id ? 'text-primary' : 'text-white'">
                    {{ player.nickname }}
                  </div>
                  <div class="text-right ml-2">
                    <div class="text-primary font-bold text-base">{{ player.elo }}</div>
                    <div class="text-gray-500 text-xs">{{ player.stats.matches }} игр</div>
                  </div>
                </div>
                <!-- Recent Matches History -->
                <div v-if="player.recentMatches" class="flex items-center gap-1 text-sm mt-0.5 tracking-wider">
                  <span 
                    v-for="(result, index) in player.recentMatches.split('')" 
                    :key="index"
                    :class="result === 'W' ? 'text-green-400' : 'text-red-400'"
                    class="font-black"
                  >
                    {{ result }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Player Stats Grid -->
            <div class="grid grid-cols-5 gap-2.5">
              <div>
                <div class="text-gray-400 text-xs mb-0.5">K/D</div>
                <div class="flex items-center gap-1">
                  <span class="text-white font-bold text-lg">{{ player.stats.kd.toFixed(2) }}</span>
                  <span 
                    v-if="player.deviation && !isNaN(player.deviation.kd) && Math.round(player.deviation.kd * 10) !== 0"
                    :class="player.deviation.kd >= 0 ? 'text-green-400' : 'text-red-400'"
                    class="text-xs font-bold"
                  >
                    {{ player.deviation.kd >= 0 ? '+' : '' }}{{ player.deviation.kd.toFixed(1) }}
                  </span>
                </div>
              </div>
              <div>
                <div class="text-gray-400 text-xs mb-0.5">WR</div>
                <div class="flex items-center gap-1">
                  <span class="text-white font-bold text-lg">{{ Math.round(player.stats.winRate) }}%</span>
                  <span 
                    v-if="player.deviation && !isNaN(player.deviation.winRate) && Math.round(player.deviation.winRate) !== 0"
                    :class="player.deviation.winRate >= 0 ? 'text-green-400' : 'text-red-400'"
                    class="text-xs font-bold"
                  >
                    {{ player.deviation.winRate >= 0 ? '+' : '' }}{{ Math.round(player.deviation.winRate) }}
                  </span>
                </div>
              </div>
              <div>
                <div class="text-gray-400 text-xs mb-0.5">ADR</div>
                <div class="flex items-center gap-1">
                  <span class="text-white font-bold text-lg">{{ Math.round(player.stats.adr) }}</span>
                  <span 
                    v-if="player.deviation && !isNaN(player.deviation.adr) && Math.round(player.deviation.adr) !== 0"
                    :class="player.deviation.adr >= 0 ? 'text-green-400' : 'text-red-400'"
                    class="text-xs font-bold"
                  >
                    {{ player.deviation.adr >= 0 ? '+' : '' }}{{ Math.round(player.deviation.adr) }}
                  </span>
                </div>
              </div>
              <div>
                <div class="text-gray-400 text-xs mb-0.5">HS%</div>
                <div class="flex items-center gap-1">
                  <span class="text-white font-bold text-lg">{{ Math.round(player.stats.headshots) }}%</span>
                  <span 
                    v-if="player.deviation && !isNaN(player.deviation.headshots) && Math.round(player.deviation.headshots) !== 0"
                    :class="player.deviation.headshots >= 0 ? 'text-green-400' : 'text-red-400'"
                    class="text-xs font-bold"
                  >
                    {{ player.deviation.headshots >= 0 ? '+' : '' }}{{ Math.round(player.deviation.headshots) }}
                  </span>
                </div>
              </div>
              <div>
                <div class="text-gray-400 text-xs mb-0.5">KAST</div>
                <div class="flex items-center gap-1">
                  <span class="text-white font-bold text-lg">{{ Math.round(player.stats.kast) }}%</span>
                  <span 
                    v-if="player.deviation && !isNaN(player.deviation.kast) && Math.round(player.deviation.kast) !== 0"
                    :class="player.deviation.kast >= 0 ? 'text-green-400' : 'text-red-400'"
                    class="text-xs font-bold"
                  >
                    {{ player.deviation.kast >= 0 ? '+' : '' }}{{ Math.round(player.deviation.kast) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

const match = computed(() => playerStore.currentMatch!)

function getMatchStatusText(): string {
  if (!match.value) return ''
  
  if (match.value.state === 'READY') {
    return 'CONNECTING TO SERVER'
  } else if (match.value.status === 'LIVE' && match.value.playing !== false) {
    return 'LIVE MATCH'
  } else if (match.value.state === 'ONGOING') {
    return 'ONGOING'
  }
  
  return 'ACTIVE MATCH'
}

function getMapName(): string {
  if (!match.value) return ''
  
  // Проверяем voting.map.pick (если есть выбранная карта)
  const votingMap = match.value.voting?.map?.pick?.[0]
  if (votingMap) {
    return votingMap.charAt(0).toUpperCase() + votingMap.slice(1)
  }
  
  return ''
}
</script>

<style scoped>
/**
 * Адаптивный дизайн с увеличенными шрифтами
 * Оптимизирован для Full HD (1920x1080) с хорошей читаемостью
 */

.live-match-card {
  position: relative;
  animation: slideIn 0.4s ease-out;
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.team-container {
  position: relative;
  min-width: 0;
  overflow: hidden;
}

.glass {
  background: rgba(17, 25, 40, 0.9);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.player-card {
  transition: all 0.2s;
}

/* Адаптивные размеры для разных разрешений */
@media (max-height: 900px) {
  .live-match-card {
    padding: 0.75rem !important;
    font-size: 0.9rem;
  }
  
  .player-card {
    padding: 0.5rem !important;
  }
  
  .space-y-2 > * + * {
    margin-top: 0.375rem !important;
  }
}

@media (max-width: 1600px) {
  .live-match-card {
    font-size: 0.95rem;
  }
}

@media (min-width: 2560px) {
  .live-match-card {
    font-size: 1.2rem;
    padding: 2rem !important;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
