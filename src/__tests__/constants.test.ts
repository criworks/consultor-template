import { describe, it, expect } from 'vitest'
import {
  ANIMATION_TIMINGS,
  ANIMATION_EASING,
  ANIMATION_DELAYS,
  HERO_BG,
  SPLASH_CIRCUMFERENCE,
} from '@/lib/constants'

describe('ANIMATION_TIMINGS', () => {
  it('has ordered values: FAST < NORMAL < SLOW < SLOWEST', () => {
    expect(ANIMATION_TIMINGS.FAST).toBeLessThan(ANIMATION_TIMINGS.NORMAL)
    expect(ANIMATION_TIMINGS.NORMAL).toBeLessThan(ANIMATION_TIMINGS.SLOW)
    expect(ANIMATION_TIMINGS.SLOW).toBeLessThan(ANIMATION_TIMINGS.SLOWEST)
  })
})

describe('ANIMATION_EASING', () => {
  it('has all required easing strings', () => {
    expect(ANIMATION_EASING.EASE_OUT_STRONG).toBe('power3.out')
    expect(ANIMATION_EASING.LINEAR).toBe('linear')
  })
})

describe('ANIMATION_DELAYS', () => {
  it('STAGGER_TITLE is larger than STAGGER', () => {
    expect(ANIMATION_DELAYS.STAGGER_TITLE).toBeGreaterThan(ANIMATION_DELAYS.STAGGER)
  })
})

describe('HERO_BG', () => {
  it('PAN_X is negative (pans left)', () => {
    expect(HERO_BG.PAN_X).toBeLessThan(0)
  })

  it('blur values increase: BLUR_ENTER < BLUR_EXIT', () => {
    expect(HERO_BG.BLUR_ENTER).toBeLessThan(HERO_BG.BLUR_EXIT)
  })

  it('OPACITY is between 0 and 1', () => {
    expect(HERO_BG.OPACITY).toBeGreaterThan(0)
    expect(HERO_BG.OPACITY).toBeLessThan(1)
  })
})

describe('SPLASH_CIRCUMFERENCE', () => {
  it('matches 2πr for r=8', () => {
    expect(SPLASH_CIRCUMFERENCE).toBeCloseTo(2 * Math.PI * 8, 2)
  })
})
