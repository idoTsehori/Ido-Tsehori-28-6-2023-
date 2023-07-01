<template>
  <section class="basic-container" v-if="favCities.length">
    <h1 class="fav-cities-title">Favorite Cities</h1>
    <div class="days-list">
      <article v-for="city in favCities" :key="city._id" class="favCity">
        <CityPreview :city="city" @city-selected="setCurrCity" />
      </article>
    </div>
  </section>

  <section v-else>There's no Favorite Cities</section>
</template>

<script>
import CityPreview from '../cmps/CityPreview.vue'
export default {
  name: 'Favorites',

  methods: {
    setCurrCity(city) {
      console.log('city:', city)
      // I need to get the clicked city
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

<style></style>
