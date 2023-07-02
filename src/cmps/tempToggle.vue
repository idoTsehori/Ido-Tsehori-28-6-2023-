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
  props: {
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    // toggleMode() {
    //   document.body.classList.toggle('dark-mode')
    // },
  },
}
</script>
