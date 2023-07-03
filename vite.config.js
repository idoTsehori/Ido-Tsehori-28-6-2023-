import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/Ido-Tsehori-28-6-2023-/',
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
