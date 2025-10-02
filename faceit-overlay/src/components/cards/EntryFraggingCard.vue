<template>
  <div class="stat-card glass rounded-xl p-6">
    <div class="text-sm text-gray-400 font-semibold mb-4">Entry Fragging</div>
    
    <!-- Main Stats Grid -->
    <div class="grid grid-cols-2 gap-3 mb-3">
      <!-- Entry Success Rate -->
      <div class="bg-primary/10 rounded-lg p-2">
        <div class="text-xs text-gray-400 mb-1">Success</div>
        <div class="text-2xl font-bold text-primary">{{ entrySuccessRate }}%</div>
      </div>

      <!-- Entry Rate -->
      <div class="bg-blue-500/10 rounded-lg p-2">
        <div class="text-xs text-gray-400 mb-1">Rate</div>
        <div class="text-2xl font-bold text-blue-400">{{ entryRate }}%</div>
      </div>
    </div>

    <!-- Performance Rating -->
    <div class="mt-3 pt-3 border-t border-gray-700/30">
      <div class="flex items-center justify-between text-xs">
        <span class="text-gray-400">Role</span>
        <span 
          :class="[
            'font-bold',
            entryRating === 'Aggressive Entry' ? 'text-red-400' :
            entryRating === 'Entry Fragger' ? 'text-primary' :
            entryRating === 'Support' ? 'text-blue-400' :
            'text-gray-400'
          ]"
        >
          {{ entryRating }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

// Entry Success Rate - k18
const entrySuccessRate = computed(() => {
  const rate = playerStore.stats?.lifetime?.k18
  if (!rate) return '0'
  
  // Если данные в формате 0.XX (decimal), конвертируем в проценты
  const numRate = parseFloat(rate)
  if (numRate < 1) {
    return (numRate * 100).toFixed(0)
  }
  
  return Math.round(numRate).toString()
})

// Entry Rate - k19
const entryRate = computed(() => {
  const rate = playerStore.stats?.lifetime?.k19
  if (!rate) return '0'
  
  // Если данные в формате 0.XX (decimal), конвертируем в проценты
  const numRate = parseFloat(rate)
  if (numRate < 1) {
    return (numRate * 100).toFixed(0)
  }
  
  return Math.round(numRate).toString()
})

// Вычисляем приблизительное количество входов из общих данных
// Оценка роли игрока по entry статистике
const entryRating = computed(() => {
  const rate = parseFloat(entryRate.value)
  const success = parseFloat(entrySuccessRate.value)
  
  if (rate >= 40 && success >= 50) return 'Aggressive Entry'
  if (rate >= 25 && success >= 45) return 'Entry Fragger'
  if (rate >= 15) return 'Support'
  return 'Passive'
})
</script>

<style scoped>
.stat-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(255, 85, 0, 0.2);
}
</style>
