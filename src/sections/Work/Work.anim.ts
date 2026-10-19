import type { gsap as GsapType } from 'gsap'
import { createReveal } from '@/lib/animations'
import { ANIMATION_DELAYS } from '@/lib/constants'

/** Reveals the Work section's `work-*` targets as it scrolls into view. */
export function createWorkAnimation(gsap: typeof GsapType, section: Element): void {
  createReveal(gsap, section, '[data-animate^="work-"]:not([data-animate="work-card"])')
  createReveal(gsap, section, '[data-animate="work-card"]', { stagger: ANIMATION_DELAYS.STAGGER_TITLE })
}
