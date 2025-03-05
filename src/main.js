import { createApp } from '/vue/dist/vue.esm-bundler';
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import piniaPersist from 'pinia-plugin-persistedstate'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
pinia.use(piniaPersist)

