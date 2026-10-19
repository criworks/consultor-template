// Single source for the site's languages. astro.config.mjs imports this file,
// so routing and content always agree. Add a locale here, then add its copy
// to every Localized value (TypeScript lists what is missing).
export const locales = ['es', 'en'] as const
export const defaultLocale = 'es' satisfies (typeof locales)[number]
