import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // Import the 'path' module from Node.js

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Map '@' to the 'src' directory
    },
  },
  // optimizeDeps was for the FontAwesome issue, can be kept or removed if FA is working now
  // optimizeDeps: {
  //   include: ['@fortawesome/vue-fontawesome']
  // }
})