import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import validation from './includes/validation'
import { db, auth } from './includes/firebase'
import Icon from './directives/icon'
import { registerSW } from 'virtual:pwa-register'

import './assets/tailwind.css'
import './assets/base.css'
import './assets/main.css'

registerSW({ immediate: true })

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(validation)
    app.directive('icon', Icon)
    app.config.globalProperties.$db = db
    app.config.globalProperties.$auth = auth

    app.mount('#app')
  }
})
