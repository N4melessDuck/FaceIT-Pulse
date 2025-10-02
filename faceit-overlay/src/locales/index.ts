import { createI18n } from 'vue-i18n'
import ru from './ru'
import uk from './uk'
import en from './en'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'ru',
  fallbackLocale: 'en',
  messages: {
    ru,
    uk,
    en
  }
})

export default i18n
