<template>
  <div @click="$emit('city-selected', this.city)">
    <h3 class="city-name">{{ city.LocalizedName }}</h3>
    <p class="temp">{{ city.temp }}</p>
    <p class="temp-info">{{ city.WeatherText }}</p>
  </div>
  <img :src="city.img" :alt="city.LocalizedName" />
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
  emits: ['city-selected'],
}
</script>
<style></style>
