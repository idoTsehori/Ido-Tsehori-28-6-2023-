<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <div>
      <el-menu-item>
        <img
          src="https://spinomenal.com/wp-content/uploads/2021/01/spinomenal_logo.png"
          alt="spinomental logo" />
      </el-menu-item>
      <DarkModeToggle :darkMode="darkMode" />
    </div>
    <div>
      <el-menu-item index="1"><RouterLink to="/">Home</RouterLink></el-menu-item>
      <el-menu-item index="2"><RouterLink to="/favorites">Favorites</RouterLink></el-menu-item>
      <el-sub-menu index="3">
        <template #title>About</template>
        <el-menu-item index="4-1"><RouterLink to="/about">About me</RouterLink></el-menu-item>
        <el-menu-item index="4-2">Wallak Nothing</el-menu-item>
      </el-sub-menu>
    </div>
  </el-menu>
</template>

<script>
import DarkModeToggle from './DarkModeToggle.vue'
export default {
  data() {
    return {
      activeIndex: '1',
      darkMode: false,
    }
  },
  components: {
    DarkModeToggle,
  },
}
</script>
