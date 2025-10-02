<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">FACEIT Overlay Generator</h1>
        <p class="text-gray-400">Настройте карточки статистики для OBS</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Panel: Settings -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Nickname Input -->
          <div class="bg-gray-800 rounded-lg shadow-xl p-6">
            <label class="block text-white font-semibold mb-2">
              Никнейм FACEIT
            </label>
            <input
              v-model="settingsStore.settings.nickname"
              type="text"
              placeholder="Введите ваш никнейм"
              class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-faceit-orange focus:outline-none transition"
            />
          </div>

          <!-- Size Presets -->
          <div class="bg-gray-800 rounded-lg shadow-xl p-6">
            <label class="block text-white font-semibold mb-3">
              Размер оверлея
            </label>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="(preset, key) in SIZE_PRESETS"
                :key="key"
                @click="settingsStore.applyPreset(key)"
                :class="[
                  'p-4 rounded-lg border-2 transition-all text-left',
                  settingsStore.settings.size === key
                    ? 'border-faceit-orange bg-faceit-orange/10'
                    : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                ]"
              >
                <div class="text-white font-semibold mb-1">{{ preset.label }}</div>
                <div class="text-xs text-gray-400 mb-2">{{ preset.dimensions.width }}x{{ preset.dimensions.height }}</div>
                <div class="text-xs text-gray-500">{{ preset.description }}</div>
              </button>
            </div>
          </div>

          <!-- Cards Configuration -->
          <div class="bg-gray-800 rounded-lg shadow-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <label class="text-white font-semibold">
                Карточки статистики
              </label>
              <div class="text-sm text-gray-400">
                Перетащите для изменения порядка
              </div>
            </div>

            <!-- Draggable Cards List -->
            Анимации
          </label>
          <div class="space-y-3">
            <label
              v-for="(label, key) in animationLabels"
              :key="key"
              class="flex items-center gap-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition"
            >
              <input
                v-model="localSettings.animations[key]"
                type="checkbox"
                class="w-5 h-5 text-faceit-orange bg-gray-600 border-gray-500 rounded focus:ring-faceit-orange focus:ring-2"
              />
              <span class="text-white">{{ label }}</span>
            </label>
          </div>
        </div>

        <!-- Visibility -->
        <div class="mb-6">
          <label class="block text-white font-semibold mb-3">
            Отображаемые элементы
          </label>
          <div class="grid grid-cols-2 gap-3">
            <label
              v-for="(label, key) in visibilityLabels"
              :key="key"
              class="flex items-center gap-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition"
            >
              <input
                v-model="localSettings.visibility[key]"
                type="checkbox"
                class="w-5 h-5 text-faceit-orange bg-gray-600 border-gray-500 rounded focus:ring-faceit-orange focus:ring-2"
              />
              <span class="text-white">{{ label }}</span>
            </label>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-4">
          <button
            @click="saveSettings"
            class="flex-1 px-6 py-3 bg-faceit-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition"
          >
            Сохранить настройки
          </button>
          <button
            @click="resetToDefaults"
            class="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
          >
            Сбросить
          </button>
        </div>
      </div>

      <!-- Generated URL -->
      <div v-if="settingsStore.settings.nickname" class="bg-gray-800 rounded-lg shadow-xl p-6">
        <h2 class="text-2xl font-bold text-white mb-4">Ваша ссылка для OBS</h2>
        
        <div class="bg-gray-900 p-4 rounded-lg mb-4">
          <code class="text-faceit-orange text-sm break-all">{{ settingsStore.overlayUrl }}</code>
        </div>

        <div class="flex gap-4">
          <button
            @click="copyUrl"
            class="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ copied ? 'Скопировано!' : 'Копировать ссылку' }}
          </button>
          <a
            :href="settingsStore.overlayUrl"
            target="_blank"
            class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Открыть предпросмотр
          </a>
        </div>

        <!-- Instructions -->
        <div class="mt-6 p-4 bg-gray-900 rounded-lg">
          <h3 class="text-white font-semibold mb-2">Как использовать в OBS:</h3>
          <ol class="text-gray-300 space-y-2 text-sm list-decimal list-inside">
            <li>Скопируйте ссылку выше</li>
            <li>В OBS добавьте источник "Браузер" (Browser Source)</li>
            <li>Вставьте скопированную ссылку в поле URL</li>
            <li>Настройте размер окна в зависимости от выбранного режима</li>
            <li>Готово! Оверлей будет обновляться автоматически</li>
          </ol>
        </div>
      </div>

      <div v-else class="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4 text-center">
        <p class="text-yellow-400">Введите никнейм, чтобы сгенерировать ссылку</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import type { OverlaySettings } from '@/stores/settings'

const settingsStore = useSettingsStore()
const copied = ref(false)

// Load saved settings on mount
settingsStore.loadFromStorage()

// Local copy for form binding
const localSettings = reactive<OverlaySettings>({ ...settingsStore.settings })

// Watch for changes and update store
watch(() => localSettings, (newSettings) => {
  settingsStore.updateSettings(newSettings)
}, { deep: true })

const sizes = [
  { value: 'compact' as const, label: 'Компактный', description: '400x600px' },
  { value: 'medium' as const, label: 'Средний', description: '600x800px' },
  { value: 'full' as const, label: 'Полный', description: '800x1000px' }
]

const animationLabels = {
  fadeIn: 'Плавное появление',
  slideIn: 'Появление со сдвигом',
  pulse: 'Пульсация при обновлении'
}

const visibilityLabels = {
  header: 'Шапка с аватаром',
  stats: 'Карточки статистики',
  matches: 'Последние матчи',
  winRate: 'Винрейт',
  avgKD: 'Средний K/D',
  avgKills: 'Средние киллы',
  avgDeaths: 'Средние смерти'
}

function saveSettings() {
  settingsStore.updateSettings(localSettings)
  settingsStore.saveToStorage()
  
  // Show success feedback
  alert('Настройки сохранены!')
}

function resetToDefaults() {
  settingsStore.resetSettings()
  Object.assign(localSettings, settingsStore.settings)
}

async function copyUrl() {
  try {
    await navigator.clipboard.writeText(settingsStore.overlayUrl)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
    alert('Не удалось скопировать ссылку')
  }
}
</script>
