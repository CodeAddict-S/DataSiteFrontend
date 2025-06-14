import './main.css'

import en from '../locales/en.json'
import uz from '../locales/uz.json'
import ru from '../locales/ru.json'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './lib/router.js'
import { createI18n } from 'vue-i18n'

const app = createApp(App)

app.use(createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        en,
        uz,
        ru
    }
}))
app.use(createPinia())
app.use(router)

app.mount('#app')
