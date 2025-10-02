import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CardConfig, RotationConfig, PresetSize } from '@/types/cards'
import { SIZE_PRESETS } from '@/types/cards'

export interface LiveMatchSettings {
  enabled: boolean
  opacity: number  // 0-100
  autoHide: boolean  // Автоматически скрывать после завершения
  autoHideDelay: number  // Задержка перед скрытием (секунды)
  showDuration: number  // Длительность показа карточки (секунды)
  hideDuration: number  // Длительность скрытия карточки (секунды)
}

export interface OverlaySettings {
  nickname: string
  size: PresetSize
  opacity: number  // 0-100
  cards: CardConfig[]
  rotation: RotationConfig
  animations: {
    fadeIn: boolean
    slideIn: boolean
  }
  liveMatch: LiveMatchSettings
}

const DEFAULT_SETTINGS: OverlaySettings = {
  nickname: '',
  size: 'medium',
  opacity: 100,  // 100% по умолчанию (полностью непрозрачный)
  liveMatch: {
    enabled: true,
    opacity: 100,
    autoHide: false,
    autoHideDelay: 60,  // 60 секунд после завершения матча
    showDuration: 15,  // 15 секунд показа
    hideDuration: 45   // 45 секунд скрытия
  },
  cards: [
    // Существующие карточки
    { id: '1', type: 'elo', enabled: true, order: 0, duration: 10 },
    { id: '2', type: 'winrate', enabled: true, order: 1, duration: 10 },
    { id: '3', type: 'kd', enabled: true, order: 2, duration: 10 },
    { id: '4', type: 'recentStreak', enabled: true, order: 3, duration: 10 },
    { id: '7', type: 'recentMatches', enabled: false, order: 4, duration: 10 },
    { id: '9', type: 'winStreak', enabled: false, order: 5, duration: 10 },
    { id: '10', type: 'performance', enabled: false, order: 6, duration: 10 },
    { id: '11', type: 'maps', enabled: false, order: 7, duration: 10 },
    // Tier 1 новые карточки
    { id: '12', type: 'multiKill', enabled: false, order: 8, duration: 10 },
    { id: '13', type: 'mapPerformance', enabled: false, order: 9, duration: 10 },
    { id: '14', type: 'performanceTrend', enabled: false, order: 10, duration: 10 },
    // Tier 2 новые карточки
    { id: '15', type: 'entryFragging', enabled: false, order: 11, duration: 10 },
    { id: '16', type: 'mvpAssist', enabled: false, order: 12, duration: 10 },
    { id: '17', type: 'sessionStats', enabled: false, order: 13, duration: 10 }
  ],
  rotation: {
    enabled: true,
    interval: 10,
    transition: 'fade'
  },
  animations: {
    fadeIn: true,
    slideIn: true
  }
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<OverlaySettings>({
    ...DEFAULT_SETTINGS,
    cards: DEFAULT_SETTINGS.cards.map(c => ({ ...c })),
    rotation: { ...DEFAULT_SETTINGS.rotation },
    animations: { ...DEFAULT_SETTINGS.animations },
    liveMatch: { ...DEFAULT_SETTINGS.liveMatch }
  })

  // Получить preset для текущего размера
  const currentPreset = computed(() => SIZE_PRESETS[settings.value.size])

  // Активные карточки (включенные и отсортированные)
  const activeCards = computed(() => {
    if (!settings.value.cards || !Array.isArray(settings.value.cards)) {
      return []
    }
    return settings.value.cards
      .filter(card => card.enabled)
      .sort((a, b) => a.order - b.order)
  })

  // Computed URL для OBS
  const overlayUrl = computed(() => {
    const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') // Remove trailing slash
    const baseUrl = window.location.origin + basePath + '/overlay'
    const params = new URLSearchParams()

    // Обязательный параметр - nickname
    if (settings.value.nickname) {
      params.append('nickname', settings.value.nickname)
    }

    // Размер окна
    if (settings.value.size !== 'medium') {
      params.append('size', settings.value.size)
    }

    // Карточки (передаем только включенные в порядке отображения)
    const enabledCards = activeCards.value.map(c => c.type).join(',')
    if (enabledCards) {
      params.append('cards', enabledCards)
    }

    // Ротация
    if (settings.value.rotation.enabled) {
      params.append('rotation', 'true')
      params.append('interval', settings.value.rotation.interval.toString())
      params.append('transition', settings.value.rotation.transition)
    }

    // Анимации (передаем только включенные)
    const enabledAnimations = Object.entries(settings.value.animations)
      .filter(([_, enabled]) => enabled)
      .map(([name]) => name)
    
    if (enabledAnimations.length > 0) {
      params.append('animations', enabledAnimations.join(','))
    }

    // Прозрачность (если не 100%)
    if (settings.value.opacity !== 100) {
      params.append('opacity', settings.value.opacity.toString())
    }

    return `${baseUrl}?${params.toString()}`
  })

  // Computed URL для Live Match виджета
  const liveMatchUrl = computed(() => {
    const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') // Remove trailing slash
    const baseUrl = window.location.origin + basePath + '/live-match'
    const params = new URLSearchParams()

    // Обязательный параметр - nickname
    if (settings.value.nickname) {
      params.append('nickname', settings.value.nickname)
    }

    // Live Match настройки
    if (settings.value.liveMatch?.opacity !== undefined && settings.value.liveMatch.opacity !== 100) {
      params.append('opacity', settings.value.liveMatch.opacity.toString())
    }

    if (settings.value.liveMatch?.showDuration !== undefined && settings.value.liveMatch.showDuration !== 15) {
      params.append('showDuration', settings.value.liveMatch.showDuration.toString())
    }

    if (settings.value.liveMatch?.hideDuration !== undefined && settings.value.liveMatch.hideDuration !== 45) {
      params.append('hideDuration', settings.value.liveMatch.hideDuration.toString())
    }

    if (settings.value.liveMatch?.autoHide) {
      params.append('autoHide', 'true')
      if (settings.value.liveMatch.autoHideDelay !== undefined) {
        params.append('autoHideDelay', settings.value.liveMatch.autoHideDelay.toString())
      }
    }

    return `${baseUrl}?${params.toString()}`
  })

  // Загрузка настроек из URL (для overlay страницы)
  function loadFromUrl() {
    const params = new URLSearchParams(window.location.search)

    const nickname = params.get('nickname')
    if (nickname) {
      settings.value.nickname = nickname
    }

    const size = params.get('size') as PresetSize
    if (size && ['compact', 'medium', 'full'].includes(size)) {
      settings.value.size = size
    }

    // Загрузка карточек из URL
    const cardsParam = params.get('cards')
    if (cardsParam) {
      const cardTypes = cardsParam.split(',')
        .filter(type => !REMOVED_CARD_TYPES.includes(type)) // Фильтруем удаленные карточки
      
      if (cardTypes.length > 0) {
        settings.value.cards = cardTypes.map((type, index) => ({
          id: `${index + 1}`,
          type: type as any,
          enabled: true,
          order: index,
          duration: 10
        }))
      }
    }

    // Ротация
    const rotation = params.get('rotation')
    if (rotation === 'true') {
      settings.value.rotation.enabled = true
      const interval = params.get('interval')
      if (interval) settings.value.rotation.interval = parseInt(interval)
      const transition = params.get('transition')
      if (transition) settings.value.rotation.transition = transition as any
    }

    // Анимации
    const animations = params.get('animations')
    if (animations) {
      const animList = animations.split(',')
      settings.value.animations = {
        fadeIn: animList.includes('fadeIn'),
        slideIn: animList.includes('slideIn')
      }
    }

    // Прозрачность
    const opacity = params.get('opacity')
    if (opacity) {
      const opacityValue = parseInt(opacity)
      if (opacityValue >= 0 && opacityValue <= 100) {
        settings.value.opacity = opacityValue
        // Также применяем к liveMatch если это live-match роут
        if (window.location.pathname === '/live-match') {
          settings.value.liveMatch.opacity = opacityValue
        }
      }
    }

    // Live Match настройки (только для /live-match роута)
    if (window.location.pathname === '/live-match') {
      // Ensure liveMatch object exists
      if (!settings.value.liveMatch) {
        settings.value.liveMatch = { ...DEFAULT_SETTINGS.liveMatch }
      }

      const showDuration = params.get('showDuration')
      if (showDuration) {
        const durationValue = parseInt(showDuration)
        if (durationValue >= 5) {
          settings.value.liveMatch.showDuration = durationValue
        }
      }

      const hideDuration = params.get('hideDuration')
      if (hideDuration) {
        const durationValue = parseInt(hideDuration)
        if (durationValue >= 5) {
          settings.value.liveMatch.hideDuration = durationValue
        }
      }

      const autoHide = params.get('autoHide')
      if (autoHide === 'true') {
        settings.value.liveMatch.autoHide = true
        const autoHideDelay = params.get('autoHideDelay')
        if (autoHideDelay) {
          settings.value.liveMatch.autoHideDelay = parseInt(autoHideDelay)
        }
      }
    }
  }

  // Обновление настроек
  function updateSettings(newSettings: Partial<OverlaySettings>) {
    settings.value = {
      ...settings.value,
      ...newSettings
    }
  }

  // Сброс до дефолтных
  function resetSettings() {
    settings.value = {
      ...DEFAULT_SETTINGS,
      cards: DEFAULT_SETTINGS.cards.map(c => ({ ...c })),
      rotation: { ...DEFAULT_SETTINGS.rotation },
      animations: { ...DEFAULT_SETTINGS.animations },
      liveMatch: { ...DEFAULT_SETTINGS.liveMatch }
    }
  }

  // Сохранение в localStorage (для сохранения последних настроек)
  function saveToStorage() {
    localStorage.setItem('overlay-settings', JSON.stringify(settings.value))
  }

  // Удаленные типы карточек (для миграции данных)
  const REMOVED_CARD_TYPES = ['avgKills', 'avgDeaths', 'eloDiff']

  // Загрузка из localStorage
  function loadFromStorage() {
    const saved = localStorage.getItem('overlay-settings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        
        // Фильтрация удаленных карточек из сохраненных настроек
        let migratedCards = Array.isArray(parsed.cards) && parsed.cards.length > 0 
          ? parsed.cards.filter((card: CardConfig) => !REMOVED_CARD_TYPES.includes(card.type))
          : DEFAULT_SETTINGS.cards
        
        // Если после фильтрации не осталось карточек, используем дефолтные
        if (migratedCards.length === 0) {
          migratedCards = DEFAULT_SETTINGS.cards
        }
        
        // Merge with defaults to ensure all fields exist
        settings.value = {
          ...DEFAULT_SETTINGS,
          ...parsed,
          // Ensure cards array exists and has default structure (без удаленных карточек)
          cards: migratedCards,
          // Ensure rotation config exists
          rotation: parsed.rotation || DEFAULT_SETTINGS.rotation,
          // Ensure animations exist
          animations: parsed.animations || DEFAULT_SETTINGS.animations,
          // Ensure liveMatch has all required fields (migration from old version)
          liveMatch: {
            ...DEFAULT_SETTINGS.liveMatch,
            ...parsed.liveMatch
          }
        }
        
        // Если были удалены какие-то карточки, сохраняем обновленные настройки
        if (parsed.cards && parsed.cards.length !== migratedCards.length) {
          console.log(`Migrated settings: removed ${parsed.cards.length - migratedCards.length} deprecated card(s)`)
          saveToStorage()
        }
      } catch (e) {
        console.error('Failed to parse saved settings:', e)
        settings.value = { ...DEFAULT_SETTINGS }
      }
    } else {
      // No saved settings, use defaults
      settings.value = { ...DEFAULT_SETTINGS }
    }
  }

  // Применить preset для размера
  function applyPreset(size: PresetSize) {
    const preset = SIZE_PRESETS[size]
    settings.value.size = size
    
    // Загрузить карточки по умолчанию для этого размера
    settings.value.cards = preset.defaultCards.map((type, index) => ({
      id: `${Date.now()}-${index}`,
      type,
      enabled: true,
      order: index,
      duration: 10
    }))
  }

  // Обновить порядок карточек (для drag & drop)
  function reorderCards(newOrder: CardConfig[]) {
    settings.value.cards = newOrder.map((card, index) => ({
      ...card,
      order: index
    }))
  }

  // Добавить новую карточку
  function addCard(type: CardConfig['type']) {
    const newCard: CardConfig = {
      id: `${Date.now()}`,
      type,
      enabled: true,
      order: settings.value.cards.length,
      duration: 10
    }
    settings.value.cards.push(newCard)
  }

  // Удалить карточку
  function removeCard(cardId: string) {
    settings.value.cards = settings.value.cards.filter(c => c.id !== cardId)
  }

  // Переключить видимость карточки
  function toggleCard(cardId: string) {
    const card = settings.value.cards.find(c => c.id === cardId)
    if (card) {
      card.enabled = !card.enabled
    }
  }

  return {
    settings,
    currentPreset,
    activeCards,
    overlayUrl,
    liveMatchUrl,
    loadFromUrl,
    updateSettings,
    resetSettings,
    saveToStorage,
    loadFromStorage,
    applyPreset,
    reorderCards,
    addCard,
    removeCard,
    toggleCard
  }
})
