import aiAssistant from '@/assets/images/work/ai-assistant.webp'
import brandRefresh from '@/assets/images/work/brand-refresh.webp'
import fintechDashboard from '@/assets/images/work/fintech-dashboard.webp'
import type { ProjectItem } from './types'

// DEMO PROJECTS — replace with your own work. Put thumbnails in
// src/assets/images/work/ and import them above. Each project gets a page at
// /work/{slug} (and /en/work/{slug}). Leave the list empty to hide the Work
// section and the "View work" button until you have projects to show.
export const projects: readonly ProjectItem[] = [
  {
    slug: 'fintech-dashboard',
    title: { es: 'Dashboard financiero', en: 'Fintech dashboard' },
    description: {
      es: 'Proyecto de ejemplo: rediseño de un panel de control para una startup financiera.',
      en: 'Sample project: dashboard redesign for a fintech startup.',
    },
    body: {
      es: [
        'Texto de ejemplo. Explica el problema, tu papel y las decisiones clave.',
        'Cierra con el resultado: qué cambió para el cliente y cómo lo mediste.',
      ],
      en: [
        'Sample text. Explain the problem, your role, and the key decisions.',
        'Close with the outcome: what changed for the client and how you measured it.',
      ],
    },
    thumbnail: fintechDashboard,
    tags: ['Product design', 'Design system'],
    url: 'https://example.com',
    year: 2025,
  },
  {
    slug: 'brand-refresh',
    title: { es: 'Renovación de marca', en: 'Brand refresh' },
    description: {
      es: 'Proyecto de ejemplo: identidad visual y sitio web para un estudio.',
      en: 'Sample project: visual identity and website for a studio.',
    },
    thumbnail: brandRefresh,
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
    thumbnail: aiAssistant,
    tags: ['AI', 'UX'],
    year: 2024,
  },
]
