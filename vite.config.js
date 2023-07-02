import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/https://idoTsehori.github.io/Ido-Tsehori-28-6-2023-/',
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
