import type { Profile } from '@/data'

// DEMO PROFILE — a landing for agencies looking for a design partner.
export default {
  slug: 'freelance/agency',
  audience: 'Agencies that need senior design capacity per project.',
  sections: ['hero', 'work', 'about', 'contact'],
  content: {
    es: {
      hero: {
        title: 'Capacidad de diseño senior para los proyectos de tu agencia',
        subtitle: 'Me integro a tu equipo por proyecto, con tus procesos y tus herramientas.',
      },
      contact: { cta: 'Agenda una llamada' },
    },
    en: {
      hero: {
        title: "Senior design capacity for your agency's projects",
        subtitle: 'I join your team per project, with your processes and tools.',
      },
      contact: { cta: 'Book a call' },
    },
  },
  projects: ['brand-refresh', 'fintech-dashboard'],
  seo: {
    es: {
      title: 'Tu Nombre — Diseño para agencias',
      description: 'Diseño de producto y marca para agencias, por proyecto.',
    },
    en: {
      title: 'Your Name — Design for agencies',
      description: 'Product and brand design for agencies, per project.',
    },
  },
  intro: 'full',
} satisfies Profile
