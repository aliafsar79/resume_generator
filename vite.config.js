//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//export default defineConfig({
//  plugins: [react()],
//})

// vite.config.js
export default {
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'aa7daf41-9158-47af-88d3-827fee0054f6-00-2p32tn72vnkau.sisko.replit.dev'
    ]
  }
};