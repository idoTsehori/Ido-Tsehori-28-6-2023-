<template>
  <CitySearch @changeCity="changeCity" />

  <section class="home" v-if="currCity">
    <div class="city-details">
      <div class="city flex align-center">
        <img :src="currCity.img" alt="logo" />
        <div>
          <h3 class="city-name">{{ currCity.LocalizedName }}</h3>
          <h4 class="country-name">{{ currCity.Country.LocalizedName }}</h4>
          <h4 class="city-temp">{{ currCity.temp }}</h4>
        </div>
      </div>

      <div class="add-favorite" style="margin-top: 1em">
        <span>💖</span>
        <button @click="addCityToFavorites">Add to Favorites</button>
      </div>
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

export default {
  name: 'Home',

  methods: {
    changeCity(city) {
      this.$store.dispatch({ type: 'changeCity', city })
    },

    addCityToFavorites() {
      // let toast = useToast().success(`${this.currCity.LocalizedName} added to favorites`)
      const city = this.currCity
      this.$store.dispatch({ type: 'addCityToFavorites', city })
    },
  },

  computed: {
    currCity() {
      return this.$store.getters.getCurrCity
    },
  },

  components: {
    CitySearch,
    DayPreview,
  },
}
</script>
