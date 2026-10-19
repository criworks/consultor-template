import type { gsap as GsapType } from 'gsap'
import { createReveal } from '@/lib/animations'

/** Reveals the Contact section's `contact-*` targets as it scrolls into view. */
export function createContactAnimation(gsap: typeof GsapType, section: Element): void {
  createReveal(gsap, section, '[data-animate^="contact-"]')
}
