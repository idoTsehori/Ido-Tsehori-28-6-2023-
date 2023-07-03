import { cityService as cityService } from '../services/city.service'

export const cityStore = {
  state() {
    return {
      currCity: null,
      favCities: [],
      isCeliusTemp: true,
    }
  },
  mutations: {
    setFavCities(state, { cities }) {
      state.favCities = cities
    },

    addCityToFavorites(state, { city }) {
      state.favCities.push(city)
    },

    setCity(state, { city }) {
      state.currCity = city
    },

    toggleTempMode(state) {
      state.isCeliusTemp = !state.isCeliusTemp
    },
  },

  getters: {
    getCurrCity({ currCity }) {
      return currCity
    },

    getFavCities({ favCities }) {
      return favCities
    },
    isCeliusTemp({ isCeliusTemp }) {
      return isCeliusTemp
    },
  },

  actions: {
    setNewCity({ commit }, { city }) {
      commit({ type: 'setCity', city })
    },

    loadDefaultCity({ state, commit }) {
      return cityService.query().then((city) => {
        commit({ type: 'setCity', city })
        return city
      })
    },

    loadFavCities({ commit }) {
      return cityService.getFavCities().then((cities) => {
        if (cities.length) commit({ type: 'setFavCities', cities })
      })
    },

    async changeCity({ commit }, { newCity }) {
      try {
        const city = await cityService.save(newCity)
        if (city) {
          commit({ type: 'setCity', city })
          return city
        } else {
          throw new Error(`${newCity} is not found`)
        }
      } catch (error) {
        throw error
      }
    },

    addCityToFavorites({ commit }, { city }) {
      return cityService.saveCityToFavorites(city).then(() => {
        commit({ type: 'addCityToFavorites', city })
      })
    },

    async removeFavCity({ commit }, { cityId }) {
      const cities = await cityService.removeFavCity(cityId)
      commit({ type: 'setFavCities', cities })
    },

    toggleTempMode({ commit }) {
      commit({ type: 'toggleTempMode' })
    },
  },
}
