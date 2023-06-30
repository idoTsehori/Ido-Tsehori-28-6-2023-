<template>
  <section class="city-search">
    <form @submit.prevent="selectSuggestion">
      <label for="city"> Search for your city: </label>
      <input @input="debouncedSearchCities" v-model="userInput" id="city" name="city" type="text" />
      <button type="submit">Search</button>
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

    selectSuggestion(suggestion) {
      this.suggestions = null
      this.userInput = ''
      this.$emit('changeCity', suggestion)
    },
  },

  emits: ['changeCity'],
}
</script>
