import type { gsap as GsapType } from 'gsap'
import { createReveal } from '@/lib/animations'

/** Reveals the Proof section's `proof-*` targets as it scrolls into view. */
export function createProofAnimation(gsap: typeof GsapType, section: Element): void {
  createReveal(gsap, section, '[data-animate^="proof-"]')
}
