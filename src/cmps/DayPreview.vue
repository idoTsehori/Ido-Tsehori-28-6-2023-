<template>
  <p>{{ formatDateToDay }}</p>
  <p>{{ formatTemperature }}</p>
</template>

<script>
export default {
  name: 'DayPreview',
  props: {
    day: {
      type: Object,
      required: true,
    },
    isCeliusTemp: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    formatDateToDay() {
      const date = new Date(this.day.Date)
      const dayName = date.toLocaleString('en-US', { weekday: 'short' })
      return dayName
    },

    formatTemperature() {
      let minTemp = this.day.Temperature.Minimum.Value
      let maxTemp = this.day.Temperature.Maximum.Value
      if (this.isCeliusTemp) {
        minTemp = (((minTemp - 32) * 5) / 9).toFixed(1)
        maxTemp = (((maxTemp - 32) * 5) / 9).toFixed(1)
      }
      const currTempSymbol = this.isCeliusTemp ? 'C' : 'F'
      return `${minTemp}${currTempSymbol} - ${maxTemp}${currTempSymbol}`
    },
  },
}
</script>
