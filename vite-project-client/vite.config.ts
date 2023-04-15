import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'classic' }),
    federation({
      name: 'host-app',
      remotes: {
        outsiders: {
          external: "http://localhost:5001/assets/remoteEntry.js",
          externalType: "url"
        },
      },
      shared: ['react']
    })
  ]
})
