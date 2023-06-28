import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import Favorites from './views/Favorites.vue'
import About from './views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
  },

  {
    path: '/about',
    name: 'About',
    component: About,
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
  // base: process.env.BASE_URL,
})
