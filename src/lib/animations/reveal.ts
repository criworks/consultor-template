import type { gsap as GsapType } from 'gsap'
import { ANIMATION_DELAYS, ANIMATION_EASING, ANIMATION_TIMINGS } from '@/lib/constants'

export interface RevealOptions {
  /** px the targets rise from. */
  y?: number
  stagger?: number
}

/**
 * Fades and lifts `targets` in once when `trigger` scrolls into view. Content
 * is in the HTML at full opacity; this only runs with JS and motion allowed,
 * so call it from a section's .anim.ts after checking the preference.
 */
export function createReveal(
  gsap: typeof GsapType,
  trigger: Element,
  targets: string,
  { y = 32, stagger = ANIMATION_DELAYS.STAGGER }: RevealOptions = {},
): ReturnType<typeof GsapType.timeline> | undefined {
  const elements = trigger.querySelectorAll(targets)
  if (elements.length === 0) return undefined
  const tl = gsap.timeline({ scrollTrigger: { trigger, start: 'top 80%', once: true } })
  tl.from(elements, { opacity: 0, y, duration: ANIMATION_TIMINGS.NORMAL, stagger, ease: ANIMATION_EASING.POWER_OUT })
  return tl
}
