// API Base URL - используем относительный путь для dev (через Vite proxy)
// В production можно переключить на CORS proxy или собственный backend
const isDev = import.meta.env.DEV
export const API_BASE_URL = isDev ? '/api' : 'https://corsproxy.io/?https://www.faceit.com/api'

// API Endpoints
export const API_ENDPOINTS = {
  USER_BY_NICKNAME: (nickname: string) => `${API_BASE_URL}/users/v1/nicknames/${nickname}`,
  USER_STATS: (userId: string, game: string) => `${API_BASE_URL}/stats/v1/stats/users/${userId}/games/${game}`,
  STATS_CONFIG: (game: string) => `${API_BASE_URL}/stats/v1/stats/configuration/${game}`,
  MATCH_HISTORY: (userId: string, game: string, size: number = 20) => 
    `${API_BASE_URL}/stats/v1/stats/time/users/${userId}/games/${game}?size=${size}&game_mode=5v5`,
  MATCH_DETAILS: (matchId: string) => `${API_BASE_URL}/stats/v3/matches/${matchId}`,
  GROUP_BY_STATE: (userId: string) => `${API_BASE_URL}/match/v1/matches/groupByState?userId=${userId}`
} as const

// Game constants
export const GAME = 'cs2'

// Update intervals (in milliseconds)
export const UPDATE_INTERVALS = {
  STATS: 60000,      // 1 minute
  MATCH: 10000,      // 10 seconds when checking for active match
  ELO: 30000         // 30 seconds
} as const

// LocalStorage keys
export const STORAGE_KEYS = {
  NICKNAME: 'faceit_nickname',
  USER_ID: 'faceit_user_id'
} as const
