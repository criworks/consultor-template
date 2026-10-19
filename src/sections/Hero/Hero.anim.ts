import type { gsap as GsapType } from 'gsap'
import { ANIMATION_DELAYS, ANIMATION_EASING, ANIMATION_TIMINGS, HERO_BG, HERO_ENTRANCE } from '@/lib/constants'

type Timeline = ReturnType<typeof GsapType.timeline>

const TEXT = '[data-animate="hero-title"], [data-animate="hero-sub"]'
const CHROME =
  '[data-animate="hero-nav"], [data-animate="hero-contact"], [data-animate="hero-tagline"], [data-animate="hero-social"]'
const CTA = '[data-animate="hero-cta"]'

/**
 * Entrance: lifts the hero from the dimmed state in hero-initial.css to full
 * opacity. Never starts from invisible, and the whole cascade fits in
 * HERO_ENTRANCE.MAX_DURATION. 'full' also settles the background image.
 */
export function createHeroEntrance(gsap: typeof GsapType, full: boolean): Timeline {
  const from = { opacity: HERO_ENTRANCE.START_OPACITY, y: HERO_ENTRANCE.OFFSET_Y }
  const to = { opacity: 1, y: 0, duration: ANIMATION_TIMINGS.FAST * 1.5 }
  const tl = gsap.timeline({ defaults: { ease: ANIMATION_EASING.EASE_OUT_STRONG } })

  if (full) {
    tl.fromTo('[data-animate="hero-bg"]', { scale: 1.06 }, { scale: 1, duration: HERO_ENTRANCE.MAX_DURATION }, 0)
  }
  tl.fromTo(TEXT, from, { ...to, stagger: ANIMATION_DELAYS.STAGGER_TITLE }, 0)
    .fromTo(CHROME, from, { ...to, stagger: ANIMATION_DELAYS.STAGGER / 2 }, ANIMATION_TIMINGS.FAST / 3)
    .fromTo(CTA, from, to, ANIMATION_TIMINGS.FAST)

  return tl
}

/** Puts the hero in its final state without animating ('none', or already seen). */
export function setHeroFinal(gsap: typeof GsapType): void {
  gsap.set([TEXT, CHROME, CTA].join(', '), { opacity: 1, y: 0 })
}

/**
 * Scroll from the hero into the next section: the background pans and blurs,
 * the backdrop fades in, and the hero text fades out from the bottom up.
 * The next section's own `*-text` targets are revealed by its .anim.ts.
 */
export function createHeroScroll(gsap: typeof GsapType, next: Element): Timeline {
  const D = ANIMATION_TIMINGS.SLOWEST
  const tl = gsap.timeline({
    scrollTrigger: { trigger: next, start: 'top bottom-=1', end: 'top top', scrub: 1 },
  })

  tl.to('[data-animate="hero-bg"]', { x: HERO_BG.PAN_X, filter: `blur(${HERO_BG.BLUR_ENTER}px)`, duration: D * 0.35, ease: ANIMATION_EASING.POWER_OUT }, 0)
    .to('[data-animate="hero-bg"]', { filter: `blur(${HERO_BG.BLUR_EXIT}px)`, opacity: HERO_BG.OPACITY, duration: D * 0.65, ease: 'none' }, D * 0.35)
    .to('[data-animate="intro-backdrop"]', { opacity: 1, duration: D, ease: 'none' }, 0)
    .to(CTA, { opacity: 0, duration: ANIMATION_TIMINGS.FAST, ease: 'none' }, 0)
    .to(TEXT, { opacity: 0, duration: ANIMATION_TIMINGS.FAST, ease: 'none' }, ANIMATION_TIMINGS.FAST * 0.67)
    .to(CHROME, { opacity: 0, duration: ANIMATION_TIMINGS.FAST, ease: 'none' }, ANIMATION_TIMINGS.FAST * 1.33)

  return tl
}
