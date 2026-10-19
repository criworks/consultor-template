import { describe, it, expect } from 'vitest'
import { isLocale, localizedPath } from '@/lib/i18n'

describe('localizedPath', () => {
  it('keeps default-locale paths unprefixed', () => {
    expect(localizedPath('es')).toBe('/')
    expect(localizedPath('es', 'contractor/cto')).toBe('/contractor/cto')
  })

  it('prefixes other locales', () => {
    expect(localizedPath('en')).toBe('/en')
    expect(localizedPath('en', '/contractor/cto/')).toBe('/en/contractor/cto')
  })
})

describe('isLocale', () => {
  it('accepts configured locales only', () => {
    expect(isLocale('en')).toBe(true)
    expect(isLocale('fr')).toBe(false)
  })
})
