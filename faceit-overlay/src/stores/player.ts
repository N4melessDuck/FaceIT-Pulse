import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { faceitAPI } from '@/services/api'
import { STORAGE_KEYS } from '@/config/constants'
import type { FaceitUser, PlayerStats, Match, OngoingMatchWithStats } from '@/types'

export const usePlayerStore = defineStore('player', () => {
  // State
  const user = ref<FaceitUser | null>(null)
  const stats = ref<PlayerStats | null>(null)
  const recentMatches = ref<Match[]>([])
  const currentMatch = ref<OngoingMatchWithStats | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const lastUpdate = ref<Date | null>(null)

  // Getters
  const currentElo = computed(() => {
    return user.value?.games?.cs2?.faceit_elo ?? null
  })

  const skillLevel = computed(() => {
    return user.value?.games?.cs2?.skill_level ?? null
  })

  const winRate = computed(() => {
    if (!stats.value?.lifetime) return null
    // k6 = Win Rate %
    return stats.value.lifetime.k6 || null
  })

  const avgKD = computed(() => {
    if (!stats.value?.lifetime) return null
    // k5 = Average K/D Ratio
    return stats.value.lifetime.k5 || null
  })

  const avgKills = computed(() => {
    if (!stats.value?.lifetime) return null
    // Calculate from m13 (Total Kills) / m1 (Total Matches)
    const totalKills = parseFloat(stats.value.lifetime.m13 || '0')
    const totalMatches = parseFloat(stats.value.lifetime.m1 || '1')
    return totalMatches > 0 ? (totalKills / totalMatches).toFixed(1) : null
  })

  const avgDeaths = computed(() => {
    if (!stats.value?.lifetime) return null
    // Calculate from m19 (Total Deaths) / m1 (Total Matches)
    const totalDeaths = parseFloat(stats.value.lifetime.m19 || '0')
    const totalMatches = parseFloat(stats.value.lifetime.m1 || '1')
    return totalMatches > 0 ? (totalDeaths / totalMatches).toFixed(1) : null
  })

  const totalMatches = computed(() => {
    if (!stats.value?.lifetime) return null
    // m1 = Matches
    return stats.value.lifetime.m1 || null
  })

  // Actions
  async function loadPlayer(nickname: string) {
    isLoading.value = true
    error.value = null

    try {
      const data = await faceitAPI.getFullUserInfo(nickname)
      
      user.value = data.user
      stats.value = data.stats
      recentMatches.value = data.matches
      lastUpdate.value = new Date()

      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.NICKNAME, nickname)
      localStorage.setItem(STORAGE_KEYS.USER_ID, data.user.id)

      return data
    } catch (err: any) {
      console.error('Error loading player:', err)
      error.value = err.response?.data?.message || 'Не удалось загрузить данные игрока'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function refreshStats() {
    if (!user.value) return

    try {
      const [freshStats, freshMatches] = await Promise.all([
        faceitAPI.getUserStats(user.value.id),
        faceitAPI.getMatchHistory(user.value.id, 10)
      ])

      stats.value = freshStats
      recentMatches.value = freshMatches
      lastUpdate.value = new Date()
    } catch (err: any) {
      console.error('Failed to refresh stats:', err)
    }
  }

  async function refreshUser() {
    const savedNickname = localStorage.getItem(STORAGE_KEYS.NICKNAME)
    if (!savedNickname) return

    try {
      const freshUser = await faceitAPI.getUserByNickname(savedNickname)
      user.value = freshUser
    } catch (err: any) {
      console.error('Failed to refresh user:', err)
    }
  }

  function clearPlayer() {
    user.value = null
    stats.value = null
    recentMatches.value = []
    error.value = null
    lastUpdate.value = null
    localStorage.removeItem(STORAGE_KEYS.NICKNAME)
    localStorage.removeItem(STORAGE_KEYS.USER_ID)
  }

  function loadFromStorage() {
    const savedNickname = localStorage.getItem(STORAGE_KEYS.NICKNAME)
    if (savedNickname) {
      loadPlayer(savedNickname)
    }
  }

  /**
   * Проверить наличие активного матча и загрузить статистику всех игроков
   */
  async function checkForOngoingMatch() {
    if (!user.value) {
      currentMatch.value = null
      return
    }

    try {
      console.log('🔍 Checking for active match (ONGOING/READY)...')
      const activeMatch = await faceitAPI.getOngoingMatch(user.value.id)
      
      if (activeMatch) {
        const status = activeMatch.state === 'READY' ? 'Players connecting' : 'Match in progress'
        console.log(`✅ Active match found [${activeMatch.state}]:`, activeMatch.id, `- ${status}`)
        console.log('📊 Loading stats for all players...')
        
        // Загружаем статистику всех игроков обеих команд
        const matchWithStats = await loadMatchStats(activeMatch)
        currentMatch.value = matchWithStats
      } else {
        console.log('⛔ No active match')
        currentMatch.value = null
      }
    } catch (err) {
      console.error('❌ Failed to check for active match:', err)
      currentMatch.value = null
    }
  }

  /**
   * Загрузить статистику для всех игроков матча
   */
  async function loadMatchStats(match: any): Promise<OngoingMatchWithStats> {
    // Загружаем детальную информацию о матче с вероятностью победы от FACEIT
    let matchDetails
    try {
      const detailsResponse = await faceitAPI.getMatchDetailsV2(match.id)
      matchDetails = detailsResponse.payload
      console.log('📊 Win probability from FACEIT:', {
        faction1: matchDetails.teams.faction1.stats?.winProbability,
        faction2: matchDetails.teams.faction2.stats?.winProbability
      })
    } catch (error) {
      console.warn('⚠️ Failed to get match details v2, using basic match data:', error)
      matchDetails = match
    }

    const faction1Roster = matchDetails.teams.faction1.roster
    const faction2Roster = matchDetails.teams.faction2.roster

    // Загружаем статистику всех игроков параллельно
    const [faction1WithStats, faction2WithStats] = await Promise.all([
      loadTeamStats(faction1Roster),
      loadTeamStats(faction2Roster)
    ])

    // Вычисляем средние показатели команд
    const faction1AvgStats = calculateTeamAverage(faction1WithStats)
    const faction2AvgStats = calculateTeamAverage(faction2WithStats)

    // Вычисляем отклонения от среднего для каждого игрока
    const faction1WithDeviations = calculateDeviations(faction1WithStats, faction1AvgStats)
    const faction2WithDeviations = calculateDeviations(faction2WithStats, faction2AvgStats)

    // Получаем реальную вероятность победы от FACEIT API (в формате 0.0-1.0)
    const winProbabilityFromAPI = {
      team1: matchDetails.teams.faction1.stats?.winProbability 
        ? Math.round(matchDetails.teams.faction1.stats.winProbability * 100) 
        : null,
      team2: matchDetails.teams.faction2.stats?.winProbability 
        ? Math.round(matchDetails.teams.faction2.stats.winProbability * 100) 
        : null
    }

    return {
      ...matchDetails,
      teams: {
        faction1: {
          ...matchDetails.teams.faction1,
          roster: faction1WithDeviations,
          avgStats: faction1AvgStats
        },
        faction2: {
          ...matchDetails.teams.faction2,
          roster: faction2WithDeviations,
          avgStats: faction2AvgStats
        }
      },
      // Используем реальную вероятность от FACEIT, если доступна
      winProbability: (winProbabilityFromAPI.team1 && winProbabilityFromAPI.team2) 
        ? winProbabilityFromAPI 
        : undefined
    }
  }

  /**
   * Загрузить статистику для команды
   */
  async function loadTeamStats(roster: any[]) {
    const playersWithStats = await Promise.all(
      roster.map(async (player) => {
        try {
          const { user: playerUser, stats: playerStats } = await faceitAPI.getPlayerStatsByNickname(player.nickname)
          
          // Загружаем историю матчей для формирования строки W/L
          let recentMatches = undefined
          try {
            const matches = await faceitAPI.getMatchHistory(playerUser.id)
            recentMatches = calculateRecentMatches(matches)
          } catch (err) {
            console.warn(`Failed to load match history for ${player.nickname}:`, err)
          }
          
          return {
            ...player,
            elo: playerUser.games?.cs2?.faceit_elo || 1000,
            stats: {
              kd: parseFloat(playerStats.lifetime.k5 || '1.0'),
              winRate: parseFloat(playerStats.lifetime.k6 || '50'),
              adr: parseFloat(playerStats.lifetime.k17 || '70'),
              matches: parseInt(playerStats.lifetime.m1 || '0'),
              avgKills: parseFloat(playerStats.lifetime.m13 || '0') / Math.max(parseInt(playerStats.lifetime.m1 || '1'), 1),
              avgDeaths: parseFloat(playerStats.lifetime.m19 || '0') / Math.max(parseInt(playerStats.lifetime.m1 || '1'), 1),
              avgAssists: parseFloat(playerStats.lifetime.m20 || '0') / Math.max(parseInt(playerStats.lifetime.m1 || '1'), 1),
              headshots: parseFloat(playerStats.lifetime.k8 || '0'),
              // k20 (KAST) приходит в десятичном формате (0.42 = 42%), умножаем на 100
              kast: parseFloat(playerStats.lifetime.k20 || '0.7') * 100,
              // k19 (Entry Rate) тоже может быть в десятичном формате, проверяем
              entryRate: parseFloat(playerStats.lifetime.k19 || '0.05') < 1 
                ? parseFloat(playerStats.lifetime.k19 || '0.05') * 100 
                : parseFloat(playerStats.lifetime.k19 || '5')
            },
            recentMatches
          }
        } catch (err) {
          console.error(`Failed to load stats for ${player.nickname}:`, err)
          // Возвращаем дефолтные значения
          return {
            ...player,
            elo: 1000,
            stats: {
              kd: 1.0,
              winRate: 50,
              adr: 70,
              matches: 0,
              avgKills: 15,
              avgDeaths: 15,
              avgAssists: 3,
              headshots: 45,
              kast: 70,
              entryRate: 5
            }
          }
        }
      })
    )

    return playersWithStats
  }

  /**
   * Вычислить средние показатели команды
   */
  function calculateTeamAverage(players: any[]) {
    const count = players.length
    return {
      elo: players.reduce((sum, p) => sum + p.elo, 0) / count,
      kd: players.reduce((sum, p) => sum + p.stats.kd, 0) / count,
      winRate: players.reduce((sum, p) => sum + p.stats.winRate, 0) / count,
      adr: players.reduce((sum, p) => sum + p.stats.adr, 0) / count,
      headshots: players.reduce((sum, p) => sum + p.stats.headshots, 0) / count,
      kast: players.reduce((sum, p) => sum + p.stats.kast, 0) / count,
      matches: players.reduce((sum, p) => sum + p.stats.matches, 0) / count
    }
  }

  /**
   * Вычислить отклонения игроков от среднего по команде
   */
  function calculateDeviations(players: any[], teamAvg: any) {
    return players.map(player => ({
      ...player,
      deviation: {
        elo: player.elo - teamAvg.elo,
        kd: player.stats.kd - teamAvg.kd,
        winRate: player.stats.winRate - teamAvg.winRate,
        adr: player.stats.adr - teamAvg.adr,
        headshots: player.stats.headshots - teamAvg.headshots,
        kast: player.stats.kast - teamAvg.kast
      }
    }))
  }

  /**
   * Вычислить текущую серию побед/поражений
   */
  function calculateRecentMatches(matches: any[]) {
    if (!matches || matches.length === 0) return undefined

    // Сортируем матчи по дате (самые новые первыми)
    const sortedMatches = [...matches].sort((a, b) => b.date - a.date)
    
    // Берем последние 10 матчей и формируем строку W/L
    const recentHistory = sortedMatches
      .slice(0, 10)
      .map(match => match.i10 === '1' ? 'W' : 'L')
      .join('')

    return recentHistory
  }

  return {
    // State
    user,
    stats,
    recentMatches,
    currentMatch,
    isLoading,
    error,
    lastUpdate,
    
    // Getters
    currentElo,
    skillLevel,
    winRate,
    avgKD,
    avgKills,
    avgDeaths,
    totalMatches,
    
    // Actions
    loadPlayer,
    refreshStats,
    refreshUser,
    clearPlayer,
    loadFromStorage,
    checkForOngoingMatch
  }
})
