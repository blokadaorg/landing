import Vue from 'vue'
import VueI18n from 'vue-i18n'
import langs from '../translate/langs.js'

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

function decideLocale() {
  let savedLocale = sessionStorage.getItem("blokada_locale")
  if (savedLocale) {
    return savedLocale
  }

  let userLocale = navigator.language || navigator.userLanguage
  console.log(userLocale)
  if (langs.langs.includes(userLocale)) {
    return userLocale
  }

  let langLocale = userLocale.split('-')[0]
  if (langs.langs.includes(langLocale)) {
    return langLocale
  }

  return 'en'
}

export default new VueI18n({
  locale: decideLocale(),
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
