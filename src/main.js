import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'

import './assets/styles/main.scss'
import App from './App.vue'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ToastPlugin)
app.use(ElementPlus)

app.mount('#app')
