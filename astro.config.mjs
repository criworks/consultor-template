import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import { defaultLocale, locales } from './src/config/i18n.ts'

export default defineConfig({
  i18n: {
    locales: [...locales],
    defaultLocale,
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
