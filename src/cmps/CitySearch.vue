<template>
  <section class="city-search">
    <form @submit.prevent="searchCity">
      <label for="city"> Search for your city: </label>
      <input
        @input="debouncedSearchCities"
        placeholder="Write here ..."
        v-model="userInput"
        id="city"
        name="city"
        type="text" />
      <button class="serach-btn" type="submit">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
          <path
            fill="currentColor"
            d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"></path>
        </svg>
      </button>
    </form>

    <ul v-if="suggestions" class="suggestion-list">
      <li
        v-for="suggestion in suggestions"
        :key="suggestion.Key"
        @click="selectSuggestion(suggestion)">
        {{ suggestion.LocalizedName }}
      </li>
    </ul>
  </section>
</template>

<script>
import debounce from 'lodash.debounce'
import { cityService } from '../services/city.service'

export default {
  name: 'CitySearch',
  data() {
    return {
      userInput: '',
      suggestions: null,
      debouncedSearchCities: debounce(this.searchCities, 1000),
    }
  },

  methods: {
    async searchCities() {
      this.suggestions = await cityService.searchCitySuggestions(this.userInput)
    },
    searchCity(ev) {
      ev.preventDefault()
      console.log('this.userInput', this.userInput)
      this.$emit('changeCity', this.userInput)
      this.suggestions = null
      this.userInput = ''
    },

    selectSuggestion(suggestion) {
      this.suggestions = null
      this.userInput = ''
      this.$emit('changeCity', suggestion)
    },
  },

  emits: ['changeCity'],
}
</script>
