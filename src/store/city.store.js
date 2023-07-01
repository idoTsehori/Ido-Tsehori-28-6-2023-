import { cityService as cityService } from '../services/city.service'

export const cityStore = {
  state() {
    return {
      currCity: null,
      favCities: [],
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

    removeToy({ toys }, { toyId }) {
      const idx = toys.findIndex((toy) => toy._id === toyId)
      toys.splice(idx, 1)
    },
    updateToy({ toys }, { toy }) {
      const idx = toys.findIndex((currToy) => currToy._id === toy._id)
      toys.splice(idx, 1, toy)
    },
    addToy(state, { toy }) {
      state.toys.unshift(toy)
    },
  },

  getters: {
    getCurrCity({ currCity }) {
      return currCity
    },

    getFavCities({ favCities }) {
      return favCities
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

    changeCity({ commit }, { newCity }) {
      return cityService.save(newCity).then((city) => {
        if (city) commit({ type: 'setCity', city })
        else console.log(`${newCity} is not found`)
      })
    },

    addCityToFavorites({ commit }, { city }) {
      return cityService.saveCityToFavorites(city).then((cities) => {
        commit({ type: 'addCityToFavorites', city })
      })
    },

    async removeFavCity({ commit }, { cityId }) {
      const cities = await cityService.removeFavCity(cityId)
      console.log('cities:', cities)
      commit({ type: 'setFavCities', cities })
    },
  },
}
