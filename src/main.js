import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'

import './assets/styles/main.scss'
import App from './App.vue'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueSweetalert2)
app.use(ElementPlus)

app.mount('#app')
