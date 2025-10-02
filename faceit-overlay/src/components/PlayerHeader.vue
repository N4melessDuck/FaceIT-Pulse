<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
</script>

<template>
  <div class="glass rounded-2xl p-6 flex items-center gap-4 animate-slide-up">
    <img
      v-if="playerStore.user"
      :src="playerStore.user.avatar"
      :alt="playerStore.user.nickname"
      class="w-16 h-16 rounded-full border-2 border-primary"
    />
    
    <div class="flex-1">
      <h2 class="text-2xl font-bold text-white">
        {{ playerStore.user?.nickname }}
      </h2>
      
      <div class="flex items-center gap-4 mt-1">
        <div class="flex items-center gap-2">
          <span class="text-gray-400 text-sm">ELO:</span>
          <span class="text-primary font-mono text-xl font-bold">
            {{ playerStore.currentElo?.toLocaleString() || '----' }}
          </span>
        </div>
        
        <div class="flex items-center gap-2">
          <span class="text-gray-400 text-sm">Level:</span>
          <span class="text-white font-semibold">
            {{ playerStore.skillLevel || '--' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
