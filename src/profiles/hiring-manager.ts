import type { Profile } from '@/data'

// DEMO PROFILE — a landing for people hiring for a role.
export default {
  slug: 'contractor/hiring-manager',
  audience: 'Recruiters and hiring managers screening candidates quickly.',
  sections: ['hero', 'proof', 'work', 'contact'],
  content: {
    es: {
      hero: {
        title: 'Diseñador de producto senior, disponible para tu equipo',
        cta: 'Descargar CV',
      },
    },
    en: {
      hero: {
        title: 'Senior product designer, available for your team',
        cta: 'Download CV',
      },
    },
  },
  projects: ['fintech-dashboard', 'ai-assistant'],
  seo: {
    es: {
      title: 'Tu Nombre — Diseñador de producto senior',
      description: 'Experiencia, disponibilidad y trabajo seleccionado en 10 segundos.',
    },
    en: {
      title: 'Your Name — Senior product designer',
      description: 'Experience, availability, and selected work in 10 seconds.',
    },
  },
  intro: 'none',
} satisfies Profile
