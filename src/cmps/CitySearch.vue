<template>
  <section class="city-search">
    <label for="city">
      Search:
      <input @input="this.searchCities" v-model="userInput" id="city" name="city" type="text" />
      <ul v-if="suggestions" class="suggestion-list">
        <li
          v-for="suggestion in suggestions"
          :key="suggestion.Key"
          @click="selectSuggestion(suggestion)">
          {{ suggestion.LocalizedName }}
        </li>
      </ul>
    </label>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CitySearch',
  data() {
    return {
      userInput: '',
      suggestions: null,
    }
  },
  methods: {
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
      console.log('Selected suggestion:', suggestion)
      this.suggestions = null
      this.userInput = ''
      this.$emit('changeCity', suggestion)
    },
  },
  computed: {},
  created() {},
  components: {},
  emits: ['changeCity'],
}
</script>

<style>
.suggestion-list {
  position: absolute;
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-top: none;
}

.suggestion-list li {
  padding: 8px;
  cursor: pointer;
}

.suggestion-list li:hover {
  background-color: #e9e9e9;
}
</style>
