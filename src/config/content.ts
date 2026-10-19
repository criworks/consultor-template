import type { Content, Localized } from '@/data'

// BUYER: default copy for every language. The home page uses it as is;
// each profile in src/profiles/ overrides only what it needs.
export const content = {
  es: {
    seo: {
      title: 'Tu Nombre — Consultor de producto',
      description: 'Diseño y desarrollo de productos digitales, marcas y uso de IA.',
    },
    nav: [
      { label: 'Trabajo', href: '#work' },
      { label: 'Sobre mí', href: '#about' },
      { label: 'Contacto', href: '#contact' },
    ],
    hero: {
      title: 'Diseño productos digitales que tu equipo puede construir',
      subtitle: 'Consultor de diseño y desarrollo. Web, apps, marca e IA.',
      cta: 'Ver trabajo',
    },
    proof: {
      role: 'Consultor de producto',
      years: 10,
      specialties: ['Diseño de producto', 'Design systems', 'Front-end'],
      availability: 'Disponible desde el próximo mes',
      timezone: 'UTC−5',
      languages: ['Español', 'Inglés'],
      cvUrl: '/cv.pdf',
    },
    work: { title: 'Trabajo seleccionado', subtitle: 'Algunos proyectos recientes.' },
    about: {
      title: 'Sobre mí',
      bio: 'Texto de ejemplo: cuenta en dos o tres frases quién eres y cómo trabajas.',
      skills: ['Estrategia', 'UX/UI', 'Prototipado', 'Desarrollo web'],
    },
    contact: {
      title: 'Hablemos',
      tagline: 'Cuéntame qué estás construyendo.',
      cta: 'Escríbeme',
    },
    ui: {
      emailCopied: 'Email copiado',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      viewProject: 'Ver proyecto',
      viewWork: 'Ver trabajo',
      backToHome: 'Volver al inicio',
      downloadCv: 'Descargar CV',
      switchLanguage: 'English',
      mainNavigation: 'Navegación principal',
    },
  },
  en: {
    seo: {
      title: 'Your Name — Product consultant',
      description: 'Design and development of digital products, brands, and AI use.',
    },
    nav: [
      { label: 'Work', href: '#work' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
    hero: {
      title: 'I design digital products your team can build',
      subtitle: 'Design and development consultant. Web, apps, brand, and AI.',
      cta: 'See work',
    },
    proof: {
      role: 'Product consultant',
      years: 10,
      specialties: ['Product design', 'Design systems', 'Front-end'],
      availability: 'Available from next month',
      timezone: 'UTC−5',
      languages: ['Spanish', 'English'],
      cvUrl: '/cv.pdf',
    },
    work: { title: 'Selected work', subtitle: 'A few recent projects.' },
    about: {
      title: 'About',
      bio: 'Sample copy: say in two or three sentences who you are and how you work.',
      skills: ['Strategy', 'UX/UI', 'Prototyping', 'Web development'],
    },
    contact: {
      title: "Let's talk",
      tagline: 'Tell me what you are building.',
      cta: 'Write to me',
    },
    ui: {
      emailCopied: 'Email copied',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      viewProject: 'View project',
      viewWork: 'See work',
      backToHome: 'Back to home',
      downloadCv: 'Download CV',
      switchLanguage: 'Español',
      mainNavigation: 'Main navigation',
    },
  },
} as const satisfies Localized<Content>
