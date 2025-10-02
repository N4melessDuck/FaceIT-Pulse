<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Language Switcher -->
      <div class="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <!-- Header -->
      <div class="text-center mb-8 relative">
        <router-link 
          to="/" 
          class="absolute left-0 top-0 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          {{ t('settings.backButton') }}
        </router-link>
        <h1 class="text-4xl font-bold text-white mb-2">{{ t('settings.title') }}</h1>
        <p class="text-gray-400">{{ t('settings.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Panel: Settings -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Nickname Input -->
          <div class="bg-gray-800 rounded-lg shadow-xl p-6">
            <label class="block text-white font-semibold mb-2">
              {{ t('settings.nickname.label') }}
            </label>
            <input
              v-model="settingsStore.settings.nickname"
              type="text"
              :placeholder="t('settings.nickname.placeholder')"
              class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-faceit-orange focus:outline-none transition"
            />
          </div>

          <!-- Size Presets -->
          <div class="bg-gray-800 rounded-lg shadow-xl p-6">
            <label class="block text-white font-semibold mb-3">
              {{ t('settings.size.label') }}
            </label>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="(preset, key) in sizePresets"
                :key="key"
                @click="settingsStore.applyPreset(key as any)"
                :class="[
                  'p-4 rounded-lg border-2 transition-all text-left',
                  settingsStore.settings.size === key
                    ? 'border-faceit-orange bg-faceit-orange/10'
                    : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                ]"
              >
                <div class="text-white font-semibold mb-1">{{ t(`settings.size.presets.${preset.label}`) }}</div>
                <div class="text-xs text-gray-400 mb-2">{{ preset.dimensions.width }}x{{ preset.dimensions.height }}</div>
              </button>
            </div>
          </div>

          <!-- Cards List -->
          <div class="bg-gray-800 rounded-lg shadow-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <label class="text-white font-semibold">
                {{ t('settings.cards.label') }} ({{settingsStore.activeCards.length}})
              </label>
            </div>

            <div v-if="settingsStore.settings.cards && settingsStore.settings.cards.length > 0" class="space-y-2">
              <div
                v-for="card in settingsStore.settings.cards"
                :key="card.id"
                @click="settingsStore.toggleCard(card.id)"
                class="flex items-center gap-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
              >
                <input
                  type="checkbox"
                  :checked="card.enabled"
                  @click.stop
                  class="w-5 h-5 text-faceit-orange bg-gray-600 border-gray-500 rounded focus:ring-faceit-orange pointer-events-none"
                />
                <div class="flex-1">
                  <div class="text-white font-medium">{{ t(`settings.cards.metadata.${card.type}.title`) }}</div>
                  <div class="text-xs text-gray-400">{{ t(`settings.cards.metadata.${card.type}.description`) }}</div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-gray-500 py-4">
              {{ t('settings.cards.noCards') }}
            </div>
          </div>

          <!-- Rotation Settings -->
          <div class="bg-gray-800 rounded-lg shadow-xl p-6">
            <label class="block text-white font-semibold mb-3">
              {{ t('settings.rotation.label') }}
            </label>
            
            <div v-if="settingsStore.settings.rotation" class="space-y-4">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="settingsStore.settings.rotation.enabled"
                  type="checkbox"
                  class="w-5 h-5 text-faceit-orange bg-gray-600 border-gray-500 rounded focus:ring-faceit-orange"
                />
                <span class="text-white">{{ t('settings.rotation.enable') }}</span>
              </label>

              <div v-if="settingsStore.settings.rotation.enabled" class="space-y-3">
                <div>
                  <label class="block text-sm text-gray-400 mb-2">
                    {{ t('settings.rotation.interval') }}
                  </label>
                  <input
                    v-model.number="settingsStore.settings.rotation.interval"
                    type="number"
                    min="5"
                    max="60"
                    class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-faceit-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label class="block text-sm text-gray-400 mb-2">
                    {{ t('settings.rotation.animation') }}
                  </label>
                  <select
                    v-model="settingsStore.settings.rotation.transition"
                    class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-faceit-orange focus:outline-none"
                  >
                    <option value="fade">{{ t('settings.rotation.animations.fade') }}</option>
                    <option value="slide">{{ t('settings.rotation.animations.slide') }}</option>
                    <option value="none">{{ t('settings.rotation.animations.none') }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Animations -->
          <div class="bg-gray-800 rounded-lg shadow-xl p-6">
            <label class="block text-white font-semibold mb-3">
              {{ t('settings.animations.label') }}
            </label>
            <div v-if="settingsStore.settings.animations" class="space-y-2">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="settingsStore.settings.animations.fadeIn"
                  type="checkbox"
                  class="w-5 h-5 text-faceit-orange bg-gray-600 border-gray-500 rounded focus:ring-faceit-orange"
                />
                <span class="text-white">{{ t('settings.animations.fadeIn') }}</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="settingsStore.settings.animations.slideIn"
                  type="checkbox"
                  class="w-5 h-5 text-faceit-orange bg-gray-600 border-gray-500 rounded focus:ring-faceit-orange"
                />
                <span class="text-white">{{ t('settings.animations.slideIn') }}</span>
              </label>
            </div>
          </div>

          <!-- Opacity Settings -->
          <div class="bg-gray-800 rounded-lg shadow-xl p-6">
            <label class="block text-white font-semibold mb-3">
              {{ t('settings.opacity.label') }}
            </label>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-400">{{ settingsStore.settings.opacity }}%</span>
                <span class="text-xs text-gray-500">
                  {{ settingsStore.settings.opacity === 100 ? t('settings.opacity.levels.opaque') : 
                     settingsStore.settings.opacity >= 75 ? t('settings.opacity.levels.almostOpaque') :
                     settingsStore.settings.opacity >= 50 ? t('settings.opacity.levels.semiTransparent') : t('settings.opacity.levels.transparent') }}
                </span>
              </div>
              <input
                v-model.number="settingsStore.settings.opacity"
                type="range"
                min="0"
                max="100"
                step="5"
                class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-faceit-orange"
              />
              <div class="flex justify-between text-xs text-gray-500">
                <span>0% ({{ t('settings.opacity.levels.fullyTransparent') }})</span>
                <span>100% ({{ t('settings.opacity.levels.opaqueShort') }})</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4">
            <button
              @click="saveSettings"
              class="flex-1 px-6 py-3 bg-faceit-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition"
            >
              {{ t('settings.actions.save') }}
            </button>
            <button
              @click="resetToDefaults"
              class="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
            >
              {{ t('settings.actions.reset') }}
            </button>
          </div>
        </div>

        <!-- Right Panel: URL Generator -->
        <div class="lg:col-span-1">
          <div v-if="settingsStore.settings.nickname" class="bg-gray-800 rounded-lg shadow-xl p-6 sticky top-8">
            <h2 class="text-xl font-bold text-white mb-4">{{ t('settings.preview.title') }}</h2>
            
            <div class="bg-gray-900 p-3 rounded-lg mb-4 max-h-32 overflow-auto">
              <code class="text-faceit-orange text-xs break-all">{{ settingsStore.overlayUrl }}</code>
            </div>

            <div class="space-y-3">
              <button
                @click="copyUrl"
                class="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ copied ? t('settings.preview.copied') : t('settings.preview.copyUrl') }}
              </button>
              
              <a
                :href="settingsStore.overlayUrl"
                target="_blank"
                class="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {{ t('settings.preview.openOverlay') }}
              </a>
            </div>

            <!-- Quick Guide -->
            <div class="mt-6 p-3 bg-gray-900 rounded-lg">
              <p class="text-xs text-gray-400">{{ t('settings.preview.urlHint') }}</p>
            </div>
          </div>

          <div v-else class="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4 text-center">
            <p class="text-yellow-400 text-sm">{{ t('settings.nickname.placeholder') }}</p>
          </div>

          <!-- Live Match Widget -->
          <div v-if="settingsStore.settings.nickname" class="bg-gray-800 rounded-lg shadow-xl p-6 mt-6">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span class="text-2xl text-red-500">LIVE</span>
              Match Widget
            </h2>
            
            <!-- Settings -->
            <div class="space-y-6 mb-6">
              <!-- Visibility Cycle Settings -->
              <div class="bg-gray-900/50 rounded-xl p-5 border border-gray-700/50">
                <h3 class="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ t('settings.liveMatch.visibilityCycle') }}
                </h3>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                    <label class="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
                      {{ t('settings.liveMatch.showDuration') }}
                    </label>
                    <div class="flex items-baseline gap-2">
                      <input 
                        v-model.number="settingsStore.settings.liveMatch.showDuration"
                        type="number"
                        min="5"
                        max="120"
                        step="5"
                        class="w-20 bg-gray-900 text-white text-2xl font-bold px-3 py-2 rounded-lg border border-gray-600 focus:border-primary focus:outline-none text-center"
                      />
                      <span class="text-sm text-gray-500">{{ t('settings.liveMatch.seconds') }}</span>
                    </div>
                    <div class="text-xs text-gray-500 mt-2">{{ t('settings.liveMatch.showDescription') }}</div>
                  </div>
                  
                  <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                    <label class="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
                      {{ t('settings.liveMatch.hideDuration') }}
                    </label>
                    <div class="flex items-baseline gap-2">
                      <input 
                        v-model.number="settingsStore.settings.liveMatch.hideDuration"
                        type="number"
                        min="5"
                        max="300"
                        step="5"
                        class="w-20 bg-gray-900 text-white text-2xl font-bold px-3 py-2 rounded-lg border border-gray-600 focus:border-primary focus:outline-none text-center"
                      />
                      <span class="text-sm text-gray-500">{{ t('settings.liveMatch.seconds') }}</span>
                    </div>
                    <div class="text-xs text-gray-500 mt-2">{{ t('settings.liveMatch.hideDescription') }}</div>
                  </div>
                </div>
              </div>

              <!-- Opacity Setting -->
              <div class="bg-gray-900/50 rounded-xl p-5 border border-gray-700/50">
                <h3 class="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  {{ t('settings.liveMatch.opacity') }}
                </h3>
                <div class="flex items-center gap-4">
                  <input 
                    v-model.number="settingsStore.settings.liveMatch.opacity"
                    type="range"
                    min="0"
                    max="100"
                    class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style="accent-color: #ff5500;"
                  />
                  <div class="min-w-[60px] text-right">
                    <span class="text-2xl font-bold text-primary">{{ settingsStore.settings.liveMatch.opacity }}</span>
                    <span class="text-sm text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gray-900 p-3 rounded-lg mb-4 max-h-32 overflow-auto">
              <code class="text-red-400 text-xs break-all">{{ settingsStore.liveMatchUrl }}</code>
            </div>

            <div class="space-y-3">
              <button
                @click="copyLiveMatchUrl"
                class="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <svg v-if="!copiedLiveMatch" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ copiedLiveMatch ? t('settings.preview.copied') : t('settings.preview.copyUrl') }}
              </button>
              
              <a
                :href="settingsStore.liveMatchUrl"
                target="_blank"
                class="w-full px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {{ t('settings.preview.openLiveMatch') }}
              </a>
            </div>

            <div class="mt-4 space-y-2">
              <!-- Информация -->
              <div class="p-3 bg-gray-900 rounded-lg">
                <p class="text-gray-400 text-xs" v-html="'<strong class=\'text-blue-400\'>INFO:</strong> ' + t('settings.liveMatch.info.text')"></p>
              </div>
              
              <!-- Рекомендуемые настройки OBS -->
              <div class="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h4 class="text-blue-400 font-semibold text-xs mb-2">{{ t('settings.liveMatch.obsSettings.title') }}</h4>
                <ul class="text-blue-300 text-xs space-y-1">
                  <li>• <strong>{{ t('settings.liveMatch.obsSettings.width') }}</strong> 1920px (Full HD)</li>
                  <li>• <strong>{{ t('settings.liveMatch.obsSettings.height') }}</strong> 1080px</li>
                  <li>• <strong>{{ t('settings.liveMatch.obsSettings.fps') }}</strong> {{ t('settings.liveMatch.obsSettings.fpsValue') }}</li>
                  <li>• ✅ <strong>{{ t('settings.liveMatch.obsSettings.fullscreen') }}</strong> {{ t('settings.liveMatch.obsSettings.fullscreenValue') }}</li>
                  <li>• 💡 {{ t('settings.liveMatch.obsSettings.adaptive') }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settings'
import { SIZE_PRESETS } from '@/types/cards'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { t } = useI18n()
const settingsStore = useSettingsStore()
const copied = ref(false)
const copiedLiveMatch = ref(false)

const sizePresets = SIZE_PRESETS

onMounted(() => {
  settingsStore.loadFromStorage()
})

function saveSettings() {
  settingsStore.saveToStorage()
  alert(t('settings.actions.saved'))
}

function resetToDefaults() {
  if (confirm(t('settings.actions.confirmReset'))) {
    settingsStore.resetSettings()
  }
}

async function copyUrl() {
  try {
    await navigator.clipboard.writeText(settingsStore.overlayUrl)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    alert(t('settings.actions.copyError'))
  }
}

async function copyLiveMatchUrl() {
  try {
    await navigator.clipboard.writeText(settingsStore.liveMatchUrl)
    copiedLiveMatch.value = true
    setTimeout(() => {
      copiedLiveMatch.value = false
    }, 2000)
  } catch (err) {
    alert(t('settings.actions.copyError'))
  }
}
</script>
