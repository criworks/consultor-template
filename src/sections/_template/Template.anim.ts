import type { gsap as GsapType } from 'gsap'
import { createReveal } from '@/lib/animations'

// STEP 6 (optional) — the scroll animation.
// Rename the function to match your section (createPricingAnimation) and the
// selector to your data-animate prefix. createReveal fades and lifts every
// matching element once, when the section enters the viewport. For anything
// custom, build a gsap.timeline here; keep content visible without JS.
export function createTemplateAnimation(gsap: typeof GsapType, section: Element): void {
  createReveal(gsap, section, '[data-animate^="template-"]')
}
