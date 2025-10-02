<template>
  <div 
    :class="[
      'overlay-container',
      `size-${settingsStore.settings.size}`,
      {
        'animate-fade-in': settingsStore.settings.animations.fadeIn,
        'animate-slide-in': settingsStore.settings.animations.slideIn
      }
    ]"
    :style="{ opacity: settingsStore.settings.opacity / 100 }"
  >
    <!-- Error State -->
    <div v-if="playerStore.error" class="error-screen">
      <h2>Ошибка загрузки</h2>
      <p>{{ playerStore.error }}</p>
    </div>

    <!-- Loading State -->
    <div v-else-if="playerStore.isLoading" class="loading-screen">
      <div class="spinner"></div>
      <p>Загрузка данных...</p>
    </div>

    <!-- Main Overlay Content -->
    <div v-else-if="playerStore.user" class="overlay-content">
      <!-- Cards Display -->
      <div v-if="hasVisibleCards" :class="cardGridClass">
        <!-- Show all visible cards OR current card(s) in rotation -->
        <Transition :name="transitionName" mode="out-in">
          <div :key="currentCardIndex" class="card-container">
            <StatCard
              v-for="card in visibleCardsToShow"
              :key="card.id"
              :type="card.type"
            />
          </div>
        </Transition>
      </div>

      <!-- Rotation Indicator -->
      <div v-if="settingsStore.settings.rotation.enabled && visibleCards.length > maxCardsPerView" class="rotation-indicator">
        <div class="flex items-center gap-2 justify-center">
          <div
            v-for="(_, index) in Math.ceil(visibleCards.length / maxCardsPerView)"
            :key="index"
            :class="[
              'w-2 h-2 rounded-full transition-all',
              Math.floor(currentCardIndex / maxCardsPerView) === index
                ? 'bg-primary w-4'
                : 'bg-gray-600'
            ]"
          ></div>
        </div>
      </div>
    </div>

    <!-- No Nickname State -->
    <div v-else class="error-screen">
      <div class="error-icon">👤</div>
      <h2>Никнейм не указан</h2>
      <p>Пожалуйста, настройте оверлей на главной странице</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useSettingsStore } from '@/stores/settings'
import { SIZE_PRESETS } from '@/types/cards'
import StatCard from '@/components/cards/StatCard.vue'

const playerStore = usePlayerStore()
const settingsStore = useSettingsStore()

const currentCardIndex = ref(0)
let rotationInterval: number | null = null

// Get preset for current size
const currentPreset = computed(() => SIZE_PRESETS[settingsStore.settings.size])

// Max cards to show at once based on size
const maxCardsPerView = computed(() => currentPreset.value.maxCards)

// Get visible (enabled) cards
const visibleCards = computed(() => settingsStore.activeCards)

// Has any visible cards
const hasVisibleCards = computed(() => visibleCards.value.length > 0)

// Cards to show (either all if no rotation, or current slice if rotation enabled)
const visibleCardsToShow = computed(() => {
  if (!settingsStore.settings.rotation.enabled || visibleCards.value.length <= maxCardsPerView.value) {
    // No rotation or all cards fit - show all
    return visibleCards.value
  }
  
  // Rotation enabled - show current card(s)
  const start = currentCardIndex.value
  const end = start + maxCardsPerView.value
  return visibleCards.value.slice(start, end)
})

// Grid class based on number of cards
const cardGridClass = computed(() => {
  const count = visibleCardsToShow.value.length
  if (count === 1) return 'grid grid-cols-1 gap-4'
  if (count === 2) return 'grid grid-cols-1 md:grid-cols-2 gap-4'
  if (count === 3) return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
  return 'grid grid-cols-1 md:grid-cols-2 gap-4'
})

// Transition name based on settings
const transitionName = computed(() => {
  const transition = settingsStore.settings.rotation.transition
  if (transition === 'fade') return 'fade'
  if (transition === 'slide') return 'slide'
  return ''
})

// Start rotation if enabled
function startRotation() {
  if (!settingsStore.settings.rotation.enabled) return
  if (visibleCards.value.length <= maxCardsPerView.value) return
  
  const interval = settingsStore.settings.rotation.interval * 1000
  
  rotationInterval = window.setInterval(() => {
    currentCardIndex.value = (currentCardIndex.value + maxCardsPerView.value) % visibleCards.value.length
  }, interval)
}

// Stop rotation
function stopRotation() {
  if (rotationInterval) {
    clearInterval(rotationInterval)
    rotationInterval = null
  }
}

onMounted(async () => {
  // Load settings from URL parameters
  console.log('🔍 Current URL:', window.location.href)
  console.log('🔍 Search params:', window.location.search)
  
  settingsStore.loadFromUrl()
  
  console.log('⚙️ Loaded nickname:', settingsStore.settings.nickname)

  // Load player data if nickname is provided
  if (settingsStore.settings.nickname) {
    await playerStore.loadPlayer(settingsStore.settings.nickname)
    
    // Start card rotation
    startRotation()
    
    // Auto-refresh every 5 minutes
    setInterval(() => {
      playerStore.refreshStats()
    }, 5 * 60 * 1000)
  }
})

onUnmounted(() => {
  stopRotation()
})
</script>

<style scoped>
.overlay-container {
  min-height: 100vh;
  background: transparent;
  padding: 1rem;
  color: white;
}

/* Size variants */
.size-compact {
  max-width: 400px;
  font-size: 0.875rem;
}

.size-medium {
  max-width: 600px;
  font-size: 1rem;
}

.size-full {
  max-width: 800px;
  font-size: 1rem;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-in {
  animation: slideIn 0.5s ease-out;
}

/* Card Rotation Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.card-container {
  display: contents;
}

.rotation-indicator {
  margin-top: 1.5rem;
  padding: 0.5rem;
}

/* Loading and Error states */
.loading-screen,
.error-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  padding: 2rem;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 85, 0, 0.2);
  border-top-color: #ff5500;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.error-screen h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #ff5500;
}

.error-screen p {
  color: #9ca3af;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
