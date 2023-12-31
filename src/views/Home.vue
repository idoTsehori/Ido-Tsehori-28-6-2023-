<template>
  <CitySearch @changeCity="changeCity" />

  <section class="basic-container" v-if="currCity">
    <div class="city-details">
      <div class="city flex align-center">
        <img :src="currCity.img" alt="logo" />
        <div>
          <h3 class="city-name">{{ currCity.LocalizedName }}</h3>
          <h4 class="country-name">{{ currCity.Country.LocalizedName }}</h4>
          <h4 class="city-temp">{{ formatTemperature }}</h4>
        </div>
      </div>

      <div class="favorite-btn" style="margin-top: 1em">
        <button @click="toggleFavorite">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
            <path
              :fill="starColor"
              d="M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z"></path>
          </svg>
          {{ favoriteButtonLabel }}
        </button>
      </div>
    </div>

    <h1 class="todays-title">{{ currCity.WeatherText }}</h1>

    <div v-if="currCity.days.length" class="days-list">
      <article :key="day.EpochDate" v-for="day in currCity.days" class="day">
        <DayPreview :isCeliusTemp="isCeliusTemp" :day="day" />
      </article>
    </div>
  </section>
</template>

<script>
import CitySearch from '../cmps/CitySearch.vue'
import DayPreview from '../cmps/DayPreview.vue'

export default {
  name: 'Home',

  methods: {
    async changeCity(newCity) {
      try {
        await this.$store.dispatch('changeCity', { newCity })
      } catch (error) {
        this.showNotification(error.message, 'error')
      }
    },

    toggleFavorite() {
      const cityId = this.currCity._id
      const city = this.currCity
      try {
        if (this.checkIfCurrCityIsFav) this.$store.dispatch({ type: 'removeFavCity', cityId })
        else this.$store.dispatch({ type: 'addCityToFavorites', city })
        const title = this.checkIfCurrCityIsFav ? 'Removed favorite' : 'Added favorite'
        this.showNotification(title, 'success')
      } catch (error) {
        this.showNotification('Error', 'error')
      }
    },

    showNotification(title, icon) {
      this.$swal({
        title,
        width: '20%',
        icon,
        position: 'bottom-end',
        timer: 1750,
        timerProgressBar: true,
      })
    },
  },

  computed: {
    currCity() {
      return this.$store.getters.getCurrCity
    },
    isCeliusTemp() {
      return this.$store.getters.isCeliusTemp
    },
    favoriteCities() {
      return this.$store.getters.getFavCities
    },
    checkIfCurrCityIsFav() {
      return this.favoriteCities.includes(this.currCity)
    },
    favoriteButtonLabel() {
      return this.checkIfCurrCityIsFav ? 'Remove from Favorites' : 'Add to Favorites'
    },
    starColor() {
      return this.checkIfCurrCityIsFav ? 'white' : 'yellow'
    },
    formatTemperature() {
      let temp = +this.currCity.temp.slice(0, -1)
      if (!this.isCeliusTemp) temp = (temp * 9) / 5 + 32
      const currTempSymbol = this.isCeliusTemp ? 'C' : 'F'
      return `${temp}${currTempSymbol}`
    },
  },

  components: {
    CitySearch,
    DayPreview,
    // FavoriteBtn,
  },
}
</script>
