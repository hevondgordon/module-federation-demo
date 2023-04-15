import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";
import dns from 'dns'
import { ViteAliases } from 'vite-aliases'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'classic' }),
    federation({
      name: 'vite-remote',
      filename: 'remoteEntry.js',
      // Modules to expose
      exposes: {
        './Button.js': './src/Button',
      },
      shared: ['react']
    }),
    ViteAliases({
      useConfig: true,
      useTypescript: true,
    })
  ]
})
