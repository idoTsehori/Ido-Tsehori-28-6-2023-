<template>
  <section>{{ favCities }}</section>
</template>

<script>
export default {
  name: 'Favorites',
  data() {
    return {}
  },
  methods: {},
  computed: {
    favCities() {
      return this.$store.getters.getFavCities
    },
  },
  created() {},
  components: {},
}
</script>

<style></style>
