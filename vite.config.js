import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Ido-Tsehori-28-6-2023-/' : '',
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
