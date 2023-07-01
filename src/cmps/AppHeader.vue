<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <div>
      <el-menu-item>
        <img
          src="https://spinomenal.com/wp-content/uploads/2021/01/spinomenal_logo.png"
          alt=""
          srcset="" />
      </el-menu-item>
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
  <!-- <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/favorites">Favorites</RouterLink>
    </nav>
  </header> -->
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
    }
  },
}
</script>
