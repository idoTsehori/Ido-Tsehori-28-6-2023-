<template>
  <!-- <section style="border: 1px salmon solid" class="container home text-center"> -->
  <CitySearch @changeCity="changeCity" />

  <!-- Home container -->
  <section v-if="this.currCity && this.days" class="home">
    <div class="city-details">
      <div class="city flex align-center">
        <img src="../assets/logo.png" alt="logo" />
        <div>
          <h3 class="city-name">{{ this.currCity.LocalizedName }}</h3>
          <h4 class="country-name">{{ this.currCity.Country.LocalizedName }}</h4>
          <h4 class="city-temp">{{ this.currCity.temp }}</h4>
        </div>
      </div>

      <div class="add-favorite" style="margin-top: 1em">
        <span>💖</span>
        <button @click="addCityToFavorites">Add to Favorites</button>
      </div>
    </div>
    <!-- /////////// -->
    <h1 class="todays-title">{{ this.currCity.WeatherText }}</h1>
    <!-- /////////// -->
    <div v-if="this.days.length" class="days-list">
      <article v-for="day in days" class="day">
        <!-- <p>{{ this.formatDateToDay(day.Date) }}</p> -->
        <!-- <p>{{ day.Date }}</p> -->
        <p>38c</p>
      </article>
    </div>
  </section>
</template>

<script>
import CitySearch from '../cmps/CitySearch.vue'
import { localStorageService } from '../services/storage.service'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'

export default {
  name: 'home',
  data() {
    return {
      currCity: null,
      days: [],
    }
  },
  async created() {
    const defaultCity = localStorageService.load('DefaultCity')
    const defaultDays = localStorageService.load('DefaultDays')

    if (defaultCity && defaultDays) {
      this.currCity = defaultCity
      this.days = defaultDays
    } else {
      try {
        await this.searchCity()
        await this.setCityTemp()
        await this.setCity5DaysTemp()
        localStorageService.store('DefaultCity', this.currCity)
        localStorageService.store('DefaultDays', this.days)
      } catch (error) {
        console.log('error:', error)
        console.log('refresh')
      }
    }
  },

  methods: {
    async searchCity(cityName = 'Tel Aviv') {
      const apiKey = 'V8HnHdRU0wGAHHGaANMWYsia8qFlmjyo'
      const url = 'http://dataservice.accuweather.com/locations/v1/cities/search'
      try {
        const { data } = await axios.get(url, {
          params: {
            apikey: apiKey,
            q: cityName,
            language: 'en',
          },
        })
        this.currCity = data[0]
      } catch (error) {
        console.error(error)
      }
    },

    async setCityTemp(key = '215854') {
      const apiKey = 'V8HnHdRU0wGAHHGaANMWYsia8qFlmjyo'
      try {
        const { data } = await axios(
          `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apiKey}`
        )
        const { WeatherText, Temperature } = data[0]

        this.currCity.temp = Temperature.Metric.Value + Temperature.Metric.Unit
        this.currCity.WeatherText = WeatherText
      } catch (error) {
        useToast().error('Error while fetching TEMP, please refresh')
        console.error(error)
      }
    },

    async setCity5DaysTemp(key = '215854') {
      const apiKey = 'V8HnHdRU0wGAHHGaANMWYsia8qFlmjyo'
      try {
        const { data } = await axios(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day//${key}?apikey=${apiKey}`
        )
        const res = Array.from(data.DailyForecasts)
        console.log('res:', res)
        this.days = res
      } catch (error) {
        console.error(error)
        useToast().error('Error while fetching Citys 5 Days Temp, please refresh')
      }
    },

    changeCity(val) {
      this.currCity = val
      this.setCityTemp()
      this.setCityTemp(this.currCity.Key)
    },

    addCityToFavorites() {
      console.log('this.currCity', this.currCity)
      let toast = useToast().success(`${this.currCity.LocalizedName} added to favorites`)
    },
  },
  computed: {
    formatDateToDay(dateString) {
      // const dateString = '2023-06-27T07:00:00+03:00'
      const date = new Date(dateString)
      const dayName = date.toLocaleString('en-US', { weekday: 'long' })
      return dayName
    },
  },
  components: {
    CitySearch,
  },
}
</script>
