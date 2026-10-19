import type { ProjectItem } from './types'

// DEMO PROJECTS — replace with your own work.
export const projects = [
  {
    slug: 'fintech-dashboard',
    title: { es: 'Dashboard financiero', en: 'Fintech dashboard' },
    description: {
      es: 'Proyecto de ejemplo: rediseño de un panel de control para una startup financiera.',
      en: 'Sample project: dashboard redesign for a fintech startup.',
    },
    thumbnail: '/images/work-placeholder.svg',
    tags: ['Product design', 'Design system'],
    year: 2025,
  },
  {
    slug: 'brand-refresh',
    title: { es: 'Renovación de marca', en: 'Brand refresh' },
    description: {
      es: 'Proyecto de ejemplo: identidad visual y sitio web para un estudio.',
      en: 'Sample project: visual identity and website for a studio.',
    },
    thumbnail: '/images/work-placeholder.svg',
    tags: ['Brand', 'Web'],
    year: 2024,
  },
  {
    slug: 'ai-assistant',
    title: { es: 'Asistente con IA', en: 'AI assistant' },
    description: {
      es: 'Proyecto de ejemplo: flujo conversacional para atención al cliente.',
      en: 'Sample project: conversational support flow.',
    },
    thumbnail: '/images/work-placeholder.svg',
    tags: ['AI', 'UX'],
    year: 2024,
  },
] as const satisfies readonly ProjectItem[]
