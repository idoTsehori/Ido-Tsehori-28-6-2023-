import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'

import './assets/styles/main.scss'
import App from './App.vue'
import ToastPlugin from 'vue-toast-notification'
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css'
const app = createApp(App)
app.use(router)
app.use(store)
app.use(ToastPlugin)

app.mount('#app')
