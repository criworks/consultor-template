import { describe, it, expect, vi, afterEach } from 'vitest'
import { prefersReducedMotion, shouldAnimateByPreference } from '@/lib/motion'

// jsdom does not implement matchMedia, so each test stubs it.
function stubMatchMedia(matches: boolean): void {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches } as MediaQueryList))
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('prefersReducedMotion', () => {
  it('returns false when matchMedia is not available (SSR)', () => {
    const original = globalThis.window
    // @ts-expect-error simulating SSR
    delete globalThis.window
    expect(prefersReducedMotion()).toBe(false)
    globalThis.window = original
  })

  it('returns true when prefers-reduced-motion: reduce', () => {
    stubMatchMedia(true)
    expect(prefersReducedMotion()).toBe(true)
  })

  it('returns false when prefers-reduced-motion: no-preference', () => {
    stubMatchMedia(false)
    expect(prefersReducedMotion()).toBe(false)
  })
})

describe('shouldAnimateByPreference', () => {
  it('returns inverse of prefersReducedMotion', () => {
    stubMatchMedia(false)
    expect(shouldAnimateByPreference()).toBe(true)

    stubMatchMedia(true)
    expect(shouldAnimateByPreference()).toBe(false)
  })
})
