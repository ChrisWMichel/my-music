import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import validation from './includes/validation'
import { db, auth } from './includes/firebase'

//import 'materialize-css/dist/css/materialize.min.css'
//import 'materialize-css/dist/js/materialize.min.js'
import './assets/tailwind.css'
import './assets/base.css'
import './assets/main.css'

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(validation)
    app.config.globalProperties.$db = db
    app.config.globalProperties.$auth = auth

    app.mount('#app')
  }
})
