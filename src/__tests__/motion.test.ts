import { describe, it, expect, vi, beforeEach } from 'vitest'
import { prefersReducedMotion, shouldAnimateByPreference } from '@/lib/motion'

describe('prefersReducedMotion', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns false when matchMedia is not available (SSR)', () => {
    const original = globalThis.window
    // @ts-expect-error simulating SSR
    delete globalThis.window
    expect(prefersReducedMotion()).toBe(false)
    globalThis.window = original
  })

  it('returns true when prefers-reduced-motion: reduce', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList)
    expect(prefersReducedMotion()).toBe(true)
  })

  it('returns false when prefers-reduced-motion: no-preference', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList)
    expect(prefersReducedMotion()).toBe(false)
  })
})

describe('shouldAnimateByPreference', () => {
  it('returns inverse of prefersReducedMotion', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList)
    expect(shouldAnimateByPreference()).toBe(true)

    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList)
    expect(shouldAnimateByPreference()).toBe(false)
  })
})
