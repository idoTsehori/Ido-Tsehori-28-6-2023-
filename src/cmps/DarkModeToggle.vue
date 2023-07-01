<template>
  <div class="mode-toggle" @click="toggleMode" :class="{ dark: darkMode }">
    <div class="toggle">
      <div id="dark-mode" type="checkbox"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DarkModeToggle',
  methods: {
    toggleMode() {
      document.body.classList.toggle('dark-mode')
    },
  },
}
</script>
