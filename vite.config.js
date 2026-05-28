import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/


export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: "0.0.0.0",   // 👈 MOST IMPORTANT (network access)
    port: 5173,        // frontend port
    strictPort: true,  // port change aagakoodadhu
  },
})