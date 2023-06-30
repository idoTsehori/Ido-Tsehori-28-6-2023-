import Vuex from 'vuex'

import { cityStore } from './city.store'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    cityStore,
  },
  state: {},
  mutations: {},
  actions: {},
})
