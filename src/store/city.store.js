import { localStorageService } from '../services/storage.service'

export const cityStore = {
  state() {
    return {
      favCities: [],
    }
  },
  mutations: {
    setFavCities(state, { cities }) {
      console.log('cities:', cities)
      state.favCities = cities
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
    favCityById:
      ({ toys }) =>
      (toyId) => {
        return { ...toys.find((toy) => toy._id === toyId) }
      },
    favCities({ cities }) {
      return toys
    },
  },
  actions: {
    loadFavCities({ commit }) {
      const cities = localStorageService.load('favCities')
      if (!cities) return
      commit({ type: 'setFavCities', cities })
    },
    // saveFavCity({ commit, dispatch }, { city }) {
    //   const type = toy._id ? 'updateToy' : 'addToy'
    //   return toyService
    //     .save(toy)
    //     .then((savedToy) => {
    //       commit({ type, toy: savedToy })
    //       // const txt= `${toy._id?'Updated':'Added'} toy: ${savedToy.txt}`
    //       // dispatch({type:'addActivity',txt})
    //     })
    //     .catch((err) => {
    //       console.error('Cannot save toy', err)
    //       throw err
    //     })
    // },
    // removeFavCity({ commit, dispatch, getters }, { cityId }) {
    //   return toyService
    //     .remove(cityId)
    //     .then(() => {
    //       // const removedToy= getters.toyById(toyId)
    //       commit({ type: 'removeToy', toyId })
    //       // const txt= `Removed toy: ${removedToy.txt}`
    //       // dispatch({type:'addActivity',txt})
    //     })
    //     .catch((err) => {
    //       console.error('Cannot remove toy', err)
    //       throw err
    //     })
    // },
  },
}
