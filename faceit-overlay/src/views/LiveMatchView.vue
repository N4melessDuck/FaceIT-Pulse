<template>
  <!-- Показываем только при наличии активного матча и в соответствии с циклом показа/скрытия -->
  <Transition name="fade">
    <div 
      v-if="isVisible && playerStore.currentMatch && !playerStore.error && !playerStore.isLoading"
      class="live-match-container"
      :style="{ opacity: settingsStore.settings.liveMatch.opacity / 100 }"
    >
      <LiveMatchCard />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useSettingsStore } from '@/stores/settings'
import LiveMatchCard from '@/components/LiveMatchCard.vue'

const playerStore = usePlayerStore()
const settingsStore = useSettingsStore()

const isVisible = ref(true)
const visibilityTimeouts: number[] = []

// Функция для управления циклом видимости
function startVisibilityCycle() {
  const showDuration = settingsStore.settings.liveMatch.showDuration * 1000
  const hideDuration = settingsStore.settings.liveMatch.hideDuration * 1000
  
  // Начинаем с показа карточки
  isVisible.value = true
  
  // Функция переключения видимости
  async function toggleVisibility() {
    isVisible.value = false
    
    // После hideDuration обновляем данные и снова показываем
    const hideTimeout = window.setTimeout(async () => {
      // Обновляем данные матча перед показом
      await playerStore.checkForOngoingMatch()
      
      isVisible.value = true
      
      // И через showDuration снова скрываем
      const showTimeout = window.setTimeout(toggleVisibility, showDuration)
      visibilityTimeouts.push(showTimeout)
    }, hideDuration)
    visibilityTimeouts.push(hideTimeout)
  }
  
  // Первое скрытие после showDuration
  const initialTimeout = window.setTimeout(toggleVisibility, showDuration)
  visibilityTimeouts.push(initialTimeout)
  
  console.log(`👁️ Visibility cycle: show ${showDuration / 1000}s, hide ${hideDuration / 1000}s`)
  console.log(`🔄 Match data will refresh before each show`)
}

// Очистка всех таймеров
function cleanupTimers() {
  visibilityTimeouts.forEach(timeout => clearTimeout(timeout))
  visibilityTimeouts.length = 0
}

onMounted(async () => {
  // Load settings from URL parameters
  settingsStore.loadFromUrl()

  // Load player data if nickname is provided
  if (settingsStore.settings.nickname) {
    await playerStore.loadPlayer(settingsStore.settings.nickname)
    
    // Initial check for ongoing match
    await playerStore.checkForOngoingMatch()

    // Start visibility cycle (будет автоматически обновлять данные перед каждым показом)
    startVisibilityCycle()
  }
})

onUnmounted(() => {
  cleanupTimers()
})
</script>

<style scoped>
/**
 * РЕКОМЕНДУЕМЫЕ НАСТРОЙКИ ДЛЯ OBS:
 * - Ширина: 1920px
 * - Высота: 1080px (Full HD)
 * - Или используйте размер вашей сцены
 * 
 * Виджет автоматически адаптируется под размер окна
 */

.live-match-container {
  width: 100vw;
  height: 100vh;
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  padding: clamp(0.5rem, 2vw, 2rem);
}

.live-match-content {
  width: 100%;
  height: 100%;
  max-width: 1920px;
  max-height: 1080px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Адаптивность для разных размеров */
@media (max-width: 1920px) {
  .live-match-container {
    padding: clamp(0.5rem, 1.5vw, 1.5rem);
  }
}

@media (max-width: 1280px) {
  .live-match-container {
    padding: clamp(0.25rem, 1vw, 1rem);
  }
}

/* Error Screen */
.error-screen {
  text-align: center;
  padding: 3rem;
  background: rgba(220, 38, 38, 0.1);
  border: 2px solid rgba(220, 38, 38, 0.3);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.error-screen h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #ef4444;
}

.error-screen p {
  color: #fca5a5;
}

/* Loading Screen */
.loading-screen {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid rgba(255, 85, 0, 0.1);
  border-top-color: #ff5500;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Fade transition for visibility cycle */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* No Match Screen */
.no-match-screen {
  text-align: center;
  padding: 3rem;
  background: rgba(59, 130, 246, 0.05);
  border: 2px solid rgba(59, 130, 246, 0.2);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  max-width: 500px;
  margin: 0 auto;
}

.no-match-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

.no-match-screen h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #60a5fa;
}

.no-match-screen p {
  color: #93c5fd;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

/* Fade In Animation */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
