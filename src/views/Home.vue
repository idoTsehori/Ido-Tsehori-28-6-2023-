<template>
  <CitySearch @changeCity="changeCity" />

  <section class="home" v-if="currCity && days">
    <div class="city-details">
      <div class="city flex align-center">
        <img :src="currCity.img" alt="logo" />
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

    <h1 class="todays-title">{{ this.currCity.WeatherText }}</h1>

    <div v-if="this.days.length" class="days-list">
      <article :key="day.EpochDate" v-for="day in days" class="day">
        <DayPreview :day="day" />
      </article>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import CitySearch from '../cmps/CitySearch.vue'
import DayPreview from '../cmps/DayPreview.vue'
import { localStorageService } from '../services/storage.service'
import { useToast } from 'vue-toast-notification'
import { API_KEY, UNSPLASH_KEY } from '../../config'

export default {
  name: 'Home',
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
      this.fetchDefaultCity()
    }
  },

  methods: {
    async fetchDefaultCity() {
      try {
        await this.searchCity()
        await this.setCityTemp()
        await this.setCity5DaysTemp()
        // await this.getCityImg(this.currCity.Country.LocalizedName)
        this.currCity.img =
          'https://images.unsplash.com/photo-1599340695274-f8a2f344174d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc0NTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODc5MDE3NDl8&ixlib=rb-4.0.3&q=80&w=200'
        localStorageService.store('DefaultCity', this.currCity)
        localStorageService.store('DefaultDays', this.days)
      } catch (error) {
        console.log('error:', error)
        console.log('refresh')
      }
    },

    async searchCity(cityName = 'Tel Aviv') {
      const url = 'http://dataservice.accuweather.com/locations/v1/cities/search'
      try {
        const { data } = await axios(url, {
          params: {
            apikey: API_KEY,
            q: cityName,
            language: 'en',
          },
        })

        this.currCity = data[0]
      } catch (error) {
        console.error(error)
      }
    },

    async getCityImg(city) {
      const { data } = await axios(
        `https://api.unsplash.com/photos/random?query=${city}&client_id=${UNSPLASH_KEY}`
      )
      this.currCity.img = data.urls.thumb
    },

    async setCityTemp(key = '215854') {
      try {
        const { data } = await axios(
          `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}`
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
      try {
        const { data } = await axios(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day//${key}?apikey=${API_KEY}`
        )
        const res = Array.from(data.DailyForecasts)
        this.days = res
      } catch (error) {
        console.error(error)
        useToast().error('Error while fetching Citys 5 Days Temp, please refresh')
      }
    },

    changeCity(val) {
      this.currCity = val
      this.setCityTemp(this.currCity.Key)
      this.getCityImg(this.currCity.img)
    },

    addCityToFavorites() {
      console.log('this.currCity', this.currCity)
      let toast = useToast().success(`${this.currCity.LocalizedName} added to favorites`)
    },
  },

  components: {
    CitySearch,
    DayPreview,
  },
}
</script>
