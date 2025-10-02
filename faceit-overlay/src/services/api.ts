import axios, { AxiosInstance } from 'axios'
import { API_ENDPOINTS, GAME } from '@/config/constants'
import type { FaceitUser, PlayerStats, Match, MatchDetails, GroupByStateResponse, OngoingMatch } from '@/types'

class FaceitAPI {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   * Получить пользователя по никнейму
   */
  async getUserByNickname(nickname: string): Promise<FaceitUser> {
    const response = await this.client.get<{ payload: FaceitUser }>(
      API_ENDPOINTS.USER_BY_NICKNAME(nickname)
    )
    return response.data.payload
  }

  /**
   * Получить статистику игрока
   */
  async getUserStats(userId: string, game: string = GAME): Promise<PlayerStats> {
    const response = await this.client.get<PlayerStats>(
      API_ENDPOINTS.USER_STATS(userId, game)
    )
    return response.data
  }

  /**
   * Получить историю матчей
   */
  async getMatchHistory(userId: string, size: number = 20): Promise<Match[]> {
    const response = await this.client.get<Match[]>(
      API_ENDPOINTS.MATCH_HISTORY(userId, GAME, size)
    )
    return response.data
  }

  /**
   * Получить детали конкретного матча
   */
  async getMatchDetails(matchId: string): Promise<MatchDetails> {
    const response = await this.client.get<MatchDetails[]>(
      API_ENDPOINTS.MATCH_DETAILS(matchId)
    )
    return response.data[0] // API возвращает массив с одним элементом
  }

  /**
   * Получить полную информацию о пользователе (юзер + статистика)
   */
  async getFullUserInfo(nickname: string) {
    const user = await this.getUserByNickname(nickname)
    const stats = await this.getUserStats(user.id)
    const matches = await this.getMatchHistory(user.id, 10)
    
    return {
      user,
      stats,
      matches
    }
  }

  /**
   * Загрузить статистику игрока по никнейму (для построения команд в live match)
   */
  async getPlayerStatsByNickname(nickname: string): Promise<{ user: FaceitUser, stats: PlayerStats }> {
    const user = await this.getUserByNickname(nickname)
    const stats = await this.getUserStats(user.id)
    return { user, stats }
  }

  /**
   * Получить текущие матчи игрока (ONGOING, READY, FINISHED)
   */
  async getMatchesByState(userId: string): Promise<GroupByStateResponse> {
    const response = await this.client.get<GroupByStateResponse>(
      API_ENDPOINTS.GROUP_BY_STATE(userId)
    )
    return response.data
  }

  /**
   * Получить текущий активный матч игрока (если есть)
   */
  async getOngoingMatch(userId: string): Promise<OngoingMatch | null> {
    const response = await this.getMatchesByState(userId)
    const ongoingMatches = response.payload.ONGOING || []
    return ongoingMatches.length > 0 ? ongoingMatches[0] : null
  }
}

export const faceitAPI = new FaceitAPI()
