import { createI18n } from 'vue-i18n'
import ru from './ru'
import uk from './uk'
import en from './en'

// Определяем язык браузера
const getBrowserLocale = (): string => {
  const browserLang = navigator.language.toLowerCase()
  
  // Проверяем точное совпадение
  if (browserLang.startsWith('uk')) return 'uk'
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
    uk,
    en
  }
})

export default i18n
