// Типы карточек статистики

export type CardType = 
  | 'elo'           // ELO и уровень
  | 'winrate'       // Винрейт
  | 'kd'            // K/D Ratio
  | 'recentMatches' // Последние матчи (полный список)
  | 'recentStreak'  // Последние 7 матчей (минималистично)
  | 'winStreak'     // Серия побед/поражений
  | 'performance'   // Перформанс (ADR, Headshots)
  | 'maps'          // Статистика по картам
  // Tier 1 новые карточки
  | 'multiKill'     // Мультикиллы (2K, 3K, 4K, 5K)
  | 'mapPerformance' // Топ карты по win rate
  | 'performanceTrend' // Тренд формы (ADR/K/D график)
  // Tier 2 новые карточки
  | 'entryFragging' // Entry fragging статистика
  | 'mvpAssist'     // MVP и ассисты
  | 'sessionStats'  // Статистика текущей сессии

export interface CardConfig {
  id: string          // Уникальный ID карточки
  type: CardType      // Тип карточки
  enabled: boolean    // Включена ли карточка
  order: number       // Порядок отображения
  duration?: number   // Длительность показа в секундах (для ротации)
}

export interface RotationConfig {
  enabled: boolean      // Включена ли ротация
  interval: number      // Интервал смены карточек (в секундах)
  transition: 'fade' | 'slide' | 'none'  // Тип анимации перехода
}

export type PresetSize = 'compact' | 'medium' | 'full'

export interface SizePreset {
  name: PresetSize
  label: string
  description: string
  dimensions: {
    width: number
    height: number
  }
  maxCards: number           // Максимум одновременно видимых карточек
  defaultCards: CardType[]   // Карточки по умолчанию для этого размера
}

// Пресеты размеров
export const SIZE_PRESETS: Record<PresetSize, SizePreset> = {
  compact: {
    name: 'compact',
    label: 'compact',
    description: 'compact',
    dimensions: { width: 400, height: 300 },
    maxCards: 1,  // Только одна карточка за раз с ротацией
    defaultCards: [
      'elo', 'recentStreak', 'sessionStats',
      'winrate', 'kd', 'winStreak', 'performance',
      'multiKill', 'mapPerformance', 'performanceTrend',
      'entryFragging', 'mvpAssist',
      'recentMatches', 'maps'
    ]
  },
  medium: {
    name: 'medium',
    label: 'medium',
    description: 'medium',
    dimensions: { width: 600, height: 800 },
    maxCards: 2,  // Две карточки одновременно
    defaultCards: [
      'elo', 'winrate', 'kd', 'recentStreak',
      'winStreak', 'performance', 'sessionStats',
      'multiKill', 'mapPerformance', 'performanceTrend',
      'entryFragging', 'mvpAssist',
      'recentMatches', 'maps'
    ]
  },
  full: {
    name: 'full',
    label: 'full',
    description: 'full',
    dimensions: { width: 800, height: 1000 },
    maxCards: 4,  // Четыре карточки одновременно
    defaultCards: [
      'elo', 'winrate', 'kd',
      'recentMatches', 'performance', 'recentStreak',
      'winStreak', 'maps', 'sessionStats',
      'multiKill', 'mapPerformance', 'performanceTrend',
      'entryFragging', 'mvpAssist'
    ]
  }
}

// Метаданные карточек
export interface CardMetadata {
  type: CardType
  minSize: PresetSize  // Минимальный размер, где карточка доступна
}

export const CARD_METADATA: Record<CardType, CardMetadata> = {
  elo: {
    type: 'elo',
    minSize: 'compact'
  },
  winrate: {
    type: 'winrate',
    minSize: 'medium'
  },
  kd: {
    type: 'kd',
    minSize: 'medium'
  },
  recentMatches: {
    type: 'recentMatches',
    minSize: 'full'
  },
  recentStreak: {
    type: 'recentStreak',
    minSize: 'compact'
  },
  winStreak: {
    type: 'winStreak',
    minSize: 'medium'
  },
  performance: {
    type: 'performance',
    minSize: 'full'
  },
  maps: {
    type: 'maps',
    minSize: 'full'
  },
  // Tier 1 новые карточки
  multiKill: {
    type: 'multiKill',
    minSize: 'medium'
  },
  mapPerformance: {
    type: 'mapPerformance',
    minSize: 'medium'
  },
  performanceTrend: {
    type: 'performanceTrend',
    minSize: 'medium'
  },
  // Tier 2 новые карточки
  entryFragging: {
    type: 'entryFragging',
    minSize: 'medium'
  },
  mvpAssist: {
    type: 'mvpAssist',
    minSize: 'medium'
  },
  sessionStats: {
    type: 'sessionStats',
    minSize: 'compact'
  }
}
