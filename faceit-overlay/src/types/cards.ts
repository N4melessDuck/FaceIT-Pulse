// Типы карточек статистики

export type CardType = 
  | 'elo'           // ELO и уровень
  | 'winrate'       // Винрейт
  | 'kd'            // K/D Ratio
  | 'avgKills'      // Средние киллы
  | 'avgDeaths'     // Средние смерти
  | 'recentMatches' // Последние матчи (полный список)
  | 'recentStreak'  // Последние 7 матчей (минималистично)
  | 'eloDiff'       // ELO изменения за последние матчи
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
    label: 'Компактный',
    description: 'Минималистичный вид',
    dimensions: { width: 400, height: 300 },
    maxCards: 1,  // Только одна карточка за раз с ротацией
    defaultCards: [
      'elo', 'recentStreak', 'eloDiff', 'sessionStats',
      'winrate', 'kd', 'winStreak', 'performance',
      'multiKill', 'mapPerformance', 'performanceTrend',
      'entryFragging', 'mvpAssist', 'avgKills', 'avgDeaths',
      'recentMatches', 'maps'
    ]
  },
  medium: {
    name: 'medium',
    label: 'Средний',
    description: 'Оптимальный баланс',
    dimensions: { width: 600, height: 800 },
    maxCards: 2,  // Две карточки одновременно
    defaultCards: [
      'elo', 'winrate', 'kd', 'recentStreak',
      'eloDiff', 'winStreak', 'performance', 'sessionStats',
      'multiKill', 'mapPerformance', 'performanceTrend',
      'entryFragging', 'mvpAssist', 'avgKills', 'avgDeaths',
      'recentMatches', 'maps'
    ]
  },
  full: {
    name: 'full',
    label: 'Полный',
    description: 'Вся статистика',
    dimensions: { width: 800, height: 1000 },
    maxCards: 4,  // Четыре карточки одновременно
    defaultCards: [
      'elo', 'winrate', 'kd', 'avgKills',
      'recentMatches', 'performance', 'recentStreak', 'eloDiff',
      'winStreak', 'avgDeaths', 'maps', 'sessionStats',
      'multiKill', 'mapPerformance', 'performanceTrend',
      'entryFragging', 'mvpAssist'
    ]
  }
}

// Метаданные карточек
export interface CardMetadata {
  type: CardType
  title: string
  description: string
  minSize: PresetSize  // Минимальный размер, где карточка доступна
}

export const CARD_METADATA: Record<CardType, CardMetadata> = {
  elo: {
    type: 'elo',
    title: 'ELO и Уровень',
    description: 'Текущий рейтинг и уровень FACEIT',
    minSize: 'compact'
  },
  winrate: {
    type: 'winrate',
    title: 'Винрейт',
    description: 'Процент побед',
    minSize: 'medium'
  },
  kd: {
    type: 'kd',
    title: 'K/D Ratio',
    description: 'Соотношение убийств к смертям',
    minSize: 'medium'
  },
  avgKills: {
    type: 'avgKills',
    title: 'Средние киллы',
    description: 'Среднее количество убийств за матч',
    minSize: 'full'
  },
  avgDeaths: {
    type: 'avgDeaths',
    title: 'Средние смерти',
    description: 'Среднее количество смертей за матч',
    minSize: 'full'
  },
  recentMatches: {
    type: 'recentMatches',
    title: 'Последние матчи',
    description: 'Детальный список последних 10 матчей',
    minSize: 'full'
  },
  recentStreak: {
    type: 'recentStreak',
    title: 'Недавние результаты',
    description: 'Последние 7 матчей (W/L)',
    minSize: 'compact'
  },
  eloDiff: {
    type: 'eloDiff',
    title: 'ELO изменения',
    description: 'График изменения ELO за последние матчи',
    minSize: 'compact'
  },
  winStreak: {
    type: 'winStreak',
    title: 'Серия',
    description: 'Текущая серия побед/поражений',
    minSize: 'medium'
  },
  performance: {
    type: 'performance',
    title: 'Перформанс',
    description: 'ADR, Headshots %, K/R',
    minSize: 'full'
  },
  maps: {
    type: 'maps',
    title: 'Карты',
    description: 'Статистика по картам',
    minSize: 'full'
  },
  // Tier 1 новые карточки
  multiKill: {
    type: 'multiKill',
    title: 'Мультикиллы',
    description: '2K, 3K, 4K, 5K статистика',
    minSize: 'medium'
  },
  mapPerformance: {
    type: 'mapPerformance',
    title: 'Топ Карты',
    description: 'Лучшие карты по win rate',
    minSize: 'medium'
  },
  performanceTrend: {
    type: 'performanceTrend',
    title: 'Тренд Формы',
    description: 'График K/D и ADR',
    minSize: 'medium'
  },
  // Tier 2 новые карточки
  entryFragging: {
    type: 'entryFragging',
    title: 'Entry Fragging',
    description: 'Статистика первых фрагов',
    minSize: 'medium'
  },
  mvpAssist: {
    type: 'mvpAssist',
    title: 'MVP & Assists',
    description: 'MVP раунды и ассисты',
    minSize: 'medium'
  },
  sessionStats: {
    type: 'sessionStats',
    title: 'Сессия',
    description: 'Статистика за последние матчи',
    minSize: 'compact'
  }
}
