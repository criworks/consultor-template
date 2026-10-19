export const ANIMATION_TIMINGS = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 0.8,
  SLOWEST: 1,
} as const

export const ANIMATION_EASING = {
  POWER_IN: 'power2.in',
  POWER_OUT: 'power2.out',
  POWER_INOUT: 'power2.inOut',
  LINEAR: 'linear',
  EASE_OUT_STRONG: 'power3.out',
  EASE_INOUT_SUBTLE: 'power1.inOut',
} as const

export const ANIMATION_DELAYS = {
  STAGGER: 0.08,
  STAGGER_TITLE: 0.12,
} as const

// Hero background image — wide panoramic, scroll-driven pan + blur
export const HERO_BG = {
  PAN_X: -320,        // px to translate left during hero→intro scroll
  BLUR_ENTER: 15,     // blur at phase 1 transition (px)
  BLUR_EXIT: 28,      // blur at phase 2 completion (px)
  OPACITY: 0.4,       // image opacity at scroll end
} as const

// Hero entrance — content is readable before JS runs; the entrance only
// lifts it from a dimmed state. Keep START_OPACITY in sync with hero-initial.css.
export const HERO_ENTRANCE = {
  START_OPACITY: 0.6, // visible even if JS never runs
  OFFSET_Y: 16,       // px the text rises during the entrance
  MAX_DURATION: 0.8,  // s, whole cascade — never blocks reading
} as const
