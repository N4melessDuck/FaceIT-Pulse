import { createI18n } from 'vue-i18n'
import ru from './ru'
import ua from './uk'
import en from './en'

// Определяем язык браузера
const getBrowserLocale = (): string => {
  const browserLang = navigator.language.toLowerCase()
  
  // Проверяем точное совпадение
  if (browserLang.startsWith('uk') || browserLang.startsWith('ua')) return 'ua'
  if (browserLang.startsWith('ru')) return 'ru'
  if (browserLang.startsWith('en')) return 'en'
  
  // По умолчанию английский
  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || getBrowserLocale(),
  fallbackLocale: 'en',
  messages: {
    ru,
    ua,
    en
  }
})

export default i18n
