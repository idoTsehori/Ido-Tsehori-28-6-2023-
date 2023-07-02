<template>
  <section class="basic-container fav-container" v-if="favCities.length">
    <h1 class="fav-cities-title">Your Favorite Cities</h1>
    <div class="fav-cities-list">
      <article v-for="city in favCities" :key="city._id" class="favCity">
        <CityPreview :city="city" @city-selected="setCurrCity" @removeFavCity="removeFavCity" />
      </article>
    </div>
  </section>

  <section v-else>
    <h1>There's no Favorite Cities</h1>
  </section>
</template>

<script>
import CityPreview from '../cmps/CityPreview.vue'
export default {
  name: 'Favorites',

  methods: {
    removeFavCity(cityId) {
      this.$store.dispatch({ type: 'removeFavCity', cityId })
    },

    setCurrCity(city) {
      this.$store.dispatch({ type: 'setNewCity', city })
      this.$router.push('/')
    },
  },
  computed: {
    favCities() {
      return this.$store.getters.getFavCities
    },
  },

  components: {
    CityPreview,
  },
}
</script>
