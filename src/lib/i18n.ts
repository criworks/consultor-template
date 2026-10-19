import { defaultLocale, locales } from '@/config/i18n'
import type { Locale } from '@/data'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Adds the locale prefix unless it is the default locale: ('en', '/cto') → '/en/cto'. */
export function localizedPath(locale: Locale, path = '/'): string {
  const clean = `/${path.replace(/^\/+|\/+$/g, '')}`
  if (locale === defaultLocale) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}
