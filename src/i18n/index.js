import { createI18n } from 'vue-i18n/index'
import pt from './pt'
// import en from './en'

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  globalInjection: true,
  messages: {
    pt
    // en
  }
})

export default i18n