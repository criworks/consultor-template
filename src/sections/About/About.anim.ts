import type { gsap as GsapType } from 'gsap'
import { createReveal } from '@/lib/animations'

/** Reveals the About section's `about-*` targets as it scrolls into view. */
export function createAboutAnimation(gsap: typeof GsapType, section: Element): void {
  createReveal(gsap, section, '[data-animate^="about-"]')
}
