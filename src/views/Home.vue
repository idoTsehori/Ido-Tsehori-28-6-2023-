<template>
  <CitySearch @changeCity="changeCity" />

  <section class="basic-container" v-if="currCity">
    <div class="city-details">
      <div class="city flex align-center">
        <img :src="currCity.img" alt="logo" />
        <div>
          <h3 class="city-name">{{ currCity.LocalizedName }}</h3>
          <h4 class="country-name">{{ currCity.Country.LocalizedName }}</h4>
          <h4 class="city-temp">{{ currCity.temp }}</h4>
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
      <!-- <FavoriteBtn :currCity="currCity" style="margin-top: 1em" /> -->
    </div>

    <h1 class="todays-title">{{ currCity.WeatherText }}</h1>

    <div v-if="currCity.days.length" class="days-list">
      <article :key="day.EpochDate" v-for="day in currCity.days" class="day">
        <DayPreview :day="day" />
      </article>
    </div>
  </section>
</template>

<script>
import CitySearch from '../cmps/CitySearch.vue'
import DayPreview from '../cmps/DayPreview.vue'
// import FavoriteBtn from '../cmps/FavoriteBtn.vue'

export default {
  name: 'Home',

  methods: {
    changeCity(newCity) {
      this.$store.dispatch({ type: 'changeCity', newCity })
    },

    addCityToFavorites() {
      const city = this.currCity
      this.$store.dispatch({ type: 'addCityToFavorites', city })
    },

    removeFavCity() {
      const cityId = this.currCity._id
      this.$store.dispatch({ type: 'removeFavCity', cityId })
    },

    toggleFavorite() {
      const cityId = this.currCity._id
      const city = this.currCity
      if (this.checkIfCurrCityIsFav) this.$store.dispatch({ type: 'removeFavCity', cityId })
      else this.$store.dispatch({ type: 'addCityToFavorites', city })
    },
  },

  computed: {
    currCity() {
      return this.$store.getters.getCurrCity
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
  },

  components: {
    CitySearch,
    DayPreview,
    FavoriteBtn,
  },
}
</script>
