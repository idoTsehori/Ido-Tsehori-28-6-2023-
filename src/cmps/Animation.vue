<template>
  <div class="animation-container">
    <img :src="imageSrc" class="animated-image" :class="{ visible: isVisible }" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc:
        'https://spinomenal.com/wp-content/uploads/2021/08/TitansRising_Uranus_Hero-min-1.png',
      isVisible: false,
    }
  },
  mounted() {
    setInterval(() => {
      this.isVisible = true
      setTimeout(() => {
        this.isVisible = false
      }, 2000)
    }, 15000)
  },
}
</script>

<style></style>
