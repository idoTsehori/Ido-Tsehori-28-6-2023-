<template>
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
</template>

<script>
export default {
  name: 'FavoriteBtn',
  data() {
    return {}
  },
  methods: {
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
    computed: {
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
  },
}
</script>
