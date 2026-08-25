import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import './style.css'
import App from './App.vue'
import router from './router'
import { initOnlineStatus } from './state/online'
import { initTheme } from './state/theme'

registerSW({ immediate: true })
initOnlineStatus()
initTheme()

createApp(App).use(router).mount('#app')
