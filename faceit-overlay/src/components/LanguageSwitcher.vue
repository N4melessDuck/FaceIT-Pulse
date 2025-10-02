<template>
  <div class="language-switcher">
    <button
      v-for="lang in languages"
      :key="lang.code"
      @click="changeLanguage(lang.code)"
      :class="[
        'lang-button',
        { active: currentLocale === lang.code }
      ]"
      :title="lang.name"
    >
      {{ lang.code.toUpperCase() }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale } = useI18n()

const languages = [
  { code: 'uk', name: 'Українська' },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' }
]

const currentLocale = computed(() => locale.value)

const changeLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
  background: rgba(30, 41, 59, 0.5);
  padding: 0.25rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.lang-button {
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.lang-button:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #cbd5e1;
}

.lang-button.active {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  color: white;
}
</style>
