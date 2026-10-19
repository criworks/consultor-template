import { describe, expect, it } from 'vitest'
import { shouldPlayEntrance } from '@/lib/intro'

describe('shouldPlayEntrance', () => {
  it('never plays with intro none', () => {
    expect(shouldPlayEntrance('none', false, false)).toBe(false)
  })

  it('plays subtle only once per session', () => {
    expect(shouldPlayEntrance('subtle', false, false)).toBe(true)
    expect(shouldPlayEntrance('subtle', true, false)).toBe(false)
  })

  it('plays full on every visit', () => {
    expect(shouldPlayEntrance('full', true, false)).toBe(true)
  })

  it('never plays with reduced motion', () => {
    expect(shouldPlayEntrance('full', false, true)).toBe(false)
    expect(shouldPlayEntrance('subtle', false, true)).toBe(false)
  })
})
