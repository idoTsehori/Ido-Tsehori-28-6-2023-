import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import Favorites from './views/Favorites.vue'

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
  // {
  //   path: '/review',
  //   name: 'ReviewIndex',
  //   component: ReviewIndex
  // },
  // {
  //   path: '/chat',
  //   name: 'Chat',
  //   component: Chat
  // },
  // {
  //   path: '/login',
  //   name: 'LoginSignup',
  //   component: LoginSignup
  // },
  // {
  //   path: '/user/:id',
  //   name: 'UserDetails',
  //   component: UserDetails
  // }
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
  // base: process.env.BASE_URL,
})
