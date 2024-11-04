import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react-swc'

const apiURL = process.env.VITE_API_URL || "http://localhost:3000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: apiURL,
        secure: false,
      },
    }
  },
})
