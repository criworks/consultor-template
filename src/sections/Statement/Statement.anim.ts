import type { gsap as GsapType } from 'gsap'
import { ANIMATION_DELAYS, ANIMATION_EASING, ANIMATION_TIMINGS } from '@/lib/constants'

/**
 * Lines rise in while the section scrolls over the hero. Scrubbed with the
 * same range as the hero scroll so both read as one transition.
 */
export function createStatementReveal(gsap: typeof GsapType, section: Element): ReturnType<typeof GsapType.timeline> {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top bottom-=1', end: 'top top', scrub: 1 },
  })
  tl.fromTo(
    section.querySelectorAll('[data-animate="statement-text"]'),
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, stagger: ANIMATION_DELAYS.STAGGER, duration: ANIMATION_TIMINGS.NORMAL, ease: ANIMATION_EASING.POWER_OUT },
    ANIMATION_TIMINGS.FAST * 1.33,
  )
  return tl
}
