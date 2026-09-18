import { getViteConfig } from 'astro/config'
import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'url'

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig(
  getViteConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: ['node_modules/', 'dist/', '.astro/', '**/*.d.ts', '**/*.config.*'],
      },
    },
    resolve: {
      alias: {
        '@/lib': r('src/lib'),
        '@/config': r('src/config/index.ts'),
        '@/data': r('src/data/index.ts'),
      },
    },
  })
)
