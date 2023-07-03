import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import Favorites from './views/Favorites.vue'
import About from './views/About.vue'
import Video from './views/Video.vue'

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
  {
    path: '/video',
    name: 'Video',
    component: Video,
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory('/Ido-Tsehori-28-6-2023-/'),
  // base: process.env.BASE_URL,
  base: '/Ido-Tsehori-28-6-2023-/',
})
