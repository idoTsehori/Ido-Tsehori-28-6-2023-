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
import axios from 'axios'
import debounce from 'lodash.debounce'

export default {
  name: 'CitySearch',
  data() {
    return {
      userInput: '',
      suggestions: null,
    }
  },

  methods: {
    debouncedSearchCities: debounce(function (ev) {
      this.searchCities(ev)
    }, 1200),

    async searchCities(ev) {
      this.userInput = ev.target.value

      const apiKey = 'V8HnHdRU0wGAHHGaANMWYsia8qFlmjyo'
      const url = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'

      try {
        const res = await axios.get(url, {
          params: {
            apikey: apiKey,
            q: this.userInput,
            language: 'en',
          },
        })
        this.suggestions = res.data
        console.log('this.suggestions', this.suggestions)
      } catch (error) {
        console.error(error)
      }
    },

    selectSuggestion(suggestion) {
      console.log('suggestion:', suggestion)
      this.suggestions = null
      this.userInput = ''
      this.$emit('changeCity', suggestion)
    },
  },

  emits: ['changeCity'],
}
</script>
