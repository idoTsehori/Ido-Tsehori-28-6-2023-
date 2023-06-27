<template>
  <p>{{ formatDateToDay }}</p>
  <p>{{ formatTemperature }}c</p>
</template>

<script>
export default {
  name: 'DayPreview',
  props: {
    day: {
      type: Object,
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
      const temp = this.day.Temperature.Minimum.Value
      const celsius = ((temp - 32) * 5) / 9
      return celsius.toFixed(1)
    },
  },
}
</script>
