import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defaultLocale, locales } from './src/config/i18n.ts'
import { site } from './src/config/site.ts'

export default defineConfig({
  // Absolute URLs for the sitemap, canonical links, and robots.txt.
  site: site.url,
  // Matches the canonical links in Seo.astro (no trailing slash).
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // The dev-only component kit never ships, but keep it out regardless.
      filter: page => !page.includes('/kit'),
      i18n: { defaultLocale, locales: Object.fromEntries(locales.map(l => [l, l])) },
    }),
  ],
  i18n: {
    locales: [...locales],
    defaultLocale,
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
