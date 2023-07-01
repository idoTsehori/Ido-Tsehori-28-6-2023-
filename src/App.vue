<template>
  <main>
    <AppHeader />
    <RouterView />
    <Animation />
  </main>
</template>

<script>
// import { store } from './store/store'
import Animation from './cmps/Animation.vue'
import AppHeader from './cmps/AppHeader.vue'

export default {
  created() {
    this.$store.dispatch({ type: 'loadFavCities' })
    this.$store.dispatch({ type: 'loadDefaultCity' })
  },
  components: {
    AppHeader,
    Animation,
  },
}
</script>
