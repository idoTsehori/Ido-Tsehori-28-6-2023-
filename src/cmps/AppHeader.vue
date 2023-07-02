<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <div>
      <img
        class="spinomenal-logo"
        src="https://spinomenal.com/wp-content/uploads/2021/01/spinomenal_logo.png"
        alt="spinomenal logo" />

      <DarkModeToggle :darkMode="darkMode" />
      <el-switch
        v-model="isCelius"
        @change="toggleCelius"
        class="ml-2"
        inline-prompt
        style="--el-switch-on-color: #a04e9d; --el-switch-off-color: #33bdd6"
        active-text="Fahrenheit "
        inactive-text="Celius" />
    </div>

    <div>
      <el-menu-item index="/"><RouterLink to="/">Home</RouterLink></el-menu-item>
      <el-menu-item index="/favorites"
        ><RouterLink to="/favorites">Favorites</RouterLink></el-menu-item
      >
      <el-sub-menu index="3">
        <template #title>About</template>
        <el-menu-item index="/about"><RouterLink to="/about">About me</RouterLink></el-menu-item>
        <el-menu-item index="/video"
          ><RouterLink to="/video">App demo video</RouterLink></el-menu-item
        >
      </el-sub-menu>
    </div>
  </el-menu>
</template>

<script>
import DarkModeToggle from './DarkModeToggle.vue'

export default {
  data() {
    return {
      activeIndex: '/',
      darkMode: false,
      isCelius: false,
    }
  },
  created() {
    this.setActiveIndex()
  },
  methods: {
    toggleCelius() {
      this.$store.dispatch({ type: 'toggleTempMode' })
    },
    setActiveIndex() {
      this.activeIndex = this.$route.path
    },
  },
  watch: {
    $route() {
      this.setActiveIndex()
    },
  },
  components: {
    DarkModeToggle,
  },
}
</script>
