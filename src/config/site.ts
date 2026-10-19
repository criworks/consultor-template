import type { SiteConfig } from '@/data'

// BUYER: your identity. Copy per language lives in content.ts.
export const site = {
  name: 'Your Name',
  email: 'you@yourdomain.com',
  url: 'https://yourdomain.com',
  ogImage: '/og-image.png',
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/your-handle' },
    { label: 'Instagram', href: 'https://instagram.com/your-handle' },
  ],
  defaultIntro: 'subtle',
} as const satisfies SiteConfig
