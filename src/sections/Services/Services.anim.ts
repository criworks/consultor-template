import type { gsap as GsapType } from 'gsap'
import { createReveal } from '@/lib/animations'

/** Reveals the Services section's `services-*` targets as it scrolls into view. */
export function createServicesAnimation(gsap: typeof GsapType, section: Element): void {
  createReveal(gsap, section, '[data-animate^="services-"]')
}
