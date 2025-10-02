// User types
export interface FaceitUser {
  id: string
  nickname: string
  avatar: string
  country: string
  games: {
    cs2?: {
      skill_level: number
      faceit_elo: number
      game_player_id: string
      region: string
    }
  }
}

// Stats types
export interface PlayerStats {
  player_id: string
  game_id: string
  lifetime: {
    // Totals (m prefix)
    m1?: string   // Matches
    m2?: string   // Wins
    m7?: string   // K/D Ratio
    m13?: string  // Total Kills
    m19?: string  // Total Deaths
    m20?: string  // Total Assists
    m21?: string  // Total MVPs
    m22?: string  // Total Triple Kills
    m23?: string  // Total Quadro Kills
    m24?: string  // Total Penta Kills
    m32?: string  // Total Headshots
    
    // Averages (k prefix) - Note: k1 and k2 are NOT returned by API, calculate manually
    k5?: string  // Average K/D Ratio
    k6?: string  // Win Rate %
    k8?: string  // Average Headshots %
    k17?: string // ADR (Average Damage per Round)
    k18?: string // Entry Success Rate
    k19?: string // Entry Rate
    k20?: string // KAST
    k25?: string // Average Kills per Round
    
    // Legacy names (for backward compatibility)
    Matches?: string
    Wins?: string
    'Win Rate %'?: string
    'Average K/D Ratio'?: string
    'Average Kills'?: string
    'Average Deaths'?: string
    'Average Assists'?: string
    'Average Headshots %'?: string
    'Average MVPs'?: string
    
    [key: string]: string | undefined  // Allow any other keys
  }
  segments: any[]
}

// Match types
export interface Match {
  matchId: string
  date: number
  i1: string  // map
  i6: string  // kills
  i7: string  // assists
  i8: string  // deaths
  i9?: string  // MVPs
  i10: string // result (1=win, 0=loss)
  i13?: string // headshots
  i14?: string // Triple Kills (3K)
  i15?: string // Quadro Kills (4K)
  i16?: string // Penta Kills (5K/ACE)
  i18: string // score
  i40?: string // Double Kills (2K)
  c2: string  // K/D ratio
  c3: string  // K/R ratio
  c4: string  // HS%
  c10: string // ADR
  elo?: number
  gameMode: string
  competitionId?: string
  status?: string // APPLIED | READY | ONGOING | FINISHED
}

// Match details types
export interface MatchDetails {
  _id: string
  matchId: string
  game: string
  gameMode: string
  date: number
  i1: string // map
  i18: string // final score
  status?: string // APPLIED | READY | ONGOING | FINISHED
  teams: TeamDetails[]
}

export interface TeamDetails {
  teamId: string
  i5: string // team name
  i17: string // team win (1=win, 0=loss)
  c5: string // final score
  i3: string // first half score
  i4: string // second half score
  players: PlayerDetails[]
  premade: boolean
}

export interface PlayerDetails {
  playerId: string
  nickname: string
  elo?: number
  i6: string  // kills
  i7: string  // assists
  i8: string  // deaths
  i9: string  // MVPs
  i10: string // result
  i13: string // headshots
  c2: string  // K/D
  c3: string  // K/R
  c4: string  // HS%
  c10: string // ADR
}

// Ongoing Match types (from groupByState API)
export interface OngoingMatchPlayer {
  id: string
  avatar: string
  nickname: string
}

// Extended player with full stats
export interface OngoingMatchPlayerWithStats extends OngoingMatchPlayer {
  elo: number
  stats: {
    kd: number
    winRate: number
    adr: number
    matches: number
    avgKills: number
    avgDeaths: number
    avgAssists: number
    headshots: number
    kast: number
    entryRate: number
  }
  // Отклонения от среднего по команде
  deviation?: {
    elo: number        // +150 или -200 от среднего по команде
    kd: number         // +0.15 или -0.20
    winRate: number    // +5% или -3%
    adr: number        // +10 или -15
    headshots: number  // +5% или -8%
    kast: number       // +3% или -5%
  }
  // История последних матчей в виде W/L
  recentMatches?: string  // например "WWLWW" - последние 5-10 матчей
}

export interface OngoingMatchTeam {
  id: string
  avatar: string
  name: string
  leader: string
  roster: OngoingMatchPlayer[]
}

export interface OngoingMatchTeamWithStats extends Omit<OngoingMatchTeam, 'roster'> {
  roster: OngoingMatchPlayerWithStats[]
  // Средние показатели команды
  avgStats: {
    elo: number
    kd: number
    winRate: number
    adr: number
    matches: number
  }
}

export interface OngoingMatch {
  id: string
  game: string
  region: string
  gameModeType: string
  gameModeLabel: {
    en: string
  }
  entity: {
    type: string
    id: string
    name: string
  }
  entityCustom: {
    queueId: string
    parties: Record<string, string[]>
    matcherMatchId: string
    partyQueueDurations: Record<string, number>
    effectiveRanking: number
  }
  teams: {
    faction1: OngoingMatchTeam
    faction2: OngoingMatchTeam
  }
  state: string  // ONGOING, READY, FINISHED
  status: string // LIVE, PENDING
  playing: boolean
  createdAt: string
  voting?: {
    map?: {
      pick?: string[]
    }
  }
}

// Extended match with full stats
export interface OngoingMatchWithStats extends Omit<OngoingMatch, 'teams'> {
  teams: {
    faction1: OngoingMatchTeamWithStats
    faction2: OngoingMatchTeamWithStats
  }
  // Вероятность победы команд
  winProbability?: {
    team1: number
    team2: number
  }
}

export interface GroupByStateResponse {
  code: string
  env: string
  message: string
  payload: {
    ONGOING?: OngoingMatch[]
    READY?: OngoingMatch[]
    FINISHED?: OngoingMatch[]
  }
  time: number
  version: string
}

// Component state types
export interface StatsState {
  user: FaceitUser | null
  stats: PlayerStats | null
  recentMatches: Match[]
  isLoading: boolean
  error: string | null
  lastUpdate: Date | null
}
