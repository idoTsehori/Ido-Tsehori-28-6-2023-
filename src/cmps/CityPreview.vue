<template>
  <div>
    <h3 class="city-name">{{ this.city.LocalizedName }}</h3>
    <p class="temp">{{ this.city.temp }}</p>
    <p class="temp-info">{{ this.city.WeatherText }}</p>
  </div>
  <img :src="this.city.img" :alt="this.city.LocalizedName" />
</template>

<script>
export default {
  name: 'CityPreview',
  props: {
    city: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
