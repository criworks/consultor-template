import { describe, it, expect } from 'vitest'
import {
  ANIMATION_TIMINGS,
  ANIMATION_EASING,
  ANIMATION_DELAYS,
  HERO_BG,
  HERO_ENTRANCE,
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

describe('HERO_ENTRANCE', () => {
  it('START_OPACITY keeps content readable without JS', () => {
    expect(HERO_ENTRANCE.START_OPACITY).toBeGreaterThanOrEqual(0.5)
    expect(HERO_ENTRANCE.START_OPACITY).toBeLessThan(1)
  })

  it('MAX_DURATION stays under one second', () => {
    expect(HERO_ENTRANCE.MAX_DURATION).toBeLessThan(1)
  })
})
