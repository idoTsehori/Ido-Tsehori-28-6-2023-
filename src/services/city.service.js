import { storageService } from './async-storage.service'
import { API_KEY, UNSPLASH_KEY } from '../../config'
import axios from 'axios'
import { utilService } from './util.service'

export const cityService = {
  query,
  save,
  searchCitySuggestions,
  getFavCities,
  saveCityToFavorites,
  // getById,
  // remove,
  // getEmptyCity,
}

const Default_City_Key = 'DefaultCity'
const FAV_CITIES_KEY = 'FavoriteCities'

async function query() {
  const storageData = await storageService.query(Default_City_Key)
  if (storageData) return storageData
  try {
    const city = await searchCity()
    const { temp, WeatherText } = await setCityTemp()
    const fiveDaysTemp = await setCity5DaysTemp()
    city.temp = temp
    city.WeatherText = WeatherText
    city.days = fiveDaysTemp
    city.img =
      'https://images.unsplash.com/photo-1599340695274-f8a2f344174d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc0NTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODc5MDE3NDl8&ixlib=rb-4.0.3&q=80&w=200'

    return storageService.post(Default_City_Key, city)
  } catch (error) {
    console.log('error:', error)
    console.log('refresh')
  }
}

async function getFavCities() {
  const favCities = await storageService.query(FAV_CITIES_KEY)
  return favCities || utilService.saveToStorage(FAV_CITIES_KEY, [])
}

async function saveCityToFavorites(city) {
  const cities = await getFavCities()
  const foundCity = cities.find((favCity) => favCity._id === city)
  if (foundCity) return null
  return storageService.post(FAV_CITIES_KEY, city)
}

async function searchCity(cityName = 'Tel Aviv') {
  const url = 'http://dataservice.accuweather.com/locations/v1/cities/search'
  try {
    const { data } = await axios(url, {
      params: {
        apikey: API_KEY,
        q: cityName,
        language: 'en',
      },
    })
    if (!data.length) {
      return null
    }
    return data[0]
  } catch (error) {
    console.error(error)
  }
}

async function getCityImg(city) {
  const { data } = await axios(
    `https://api.unsplash.com/photos/random?query=${city}&client_id=${UNSPLASH_KEY}`
  )
  return data.urls.thumb
}

async function setCityTemp(key = '215854') {
  try {
    const { data } = await axios(
      `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}`
    )
    const { WeatherText, Temperature } = data[0]
    {
    }
    return { temp: Temperature.Metric.Value + Temperature.Metric.Unit, WeatherText }
  } catch (error) {
    // useToast().error('Error while fetching TEMP, please refresh')
    console.error(error)
  }
}

async function setCity5DaysTemp(key = '215854') {
  try {
    const { data } = await axios(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day//${key}?apikey=${API_KEY}`
    )
    return Array.from(data.DailyForecasts)
  } catch (error) {
    console.error(error)
    // useToast().error('Error while fetching Citys 5 Days Temp, please refresh')
  }
}

async function searchCitySuggestions(val) {
  try {
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
    const res = await axios.get(url, {
      params: {
        apikey: API_KEY,
        q: val,
        language: 'en',
      },
    })
    console.log('res:', res)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

async function save(city) {
  const { LocalizedName = city } = city
  try {
    const newCity = await searchCity(LocalizedName)
    if (!newCity) return
    const { temp, WeatherText } = await setCityTemp(newCity.Key)
    const fiveDaysTemp = await setCity5DaysTemp(newCity.Key)
    const img = await getCityImg(LocalizedName)

    newCity.temp = temp
    newCity.WeatherText = WeatherText
    newCity.days = fiveDaysTemp
    newCity.img = img

    return storageService.post('DefaultCity', newCity)
  } catch (error) {
    this.$swal.fire({
      position: 'top-end',
      icon: 'error',
      title: `error saving the city`,
      showConfirmButton: false,
      timer: 1000,
    })
    console.log('error:', error)
    console.log('refresh')
  }
}
