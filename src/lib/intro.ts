import type { IntroMode } from '@/data'

/** sessionStorage key set once the 'subtle' entrance has played. */
export const INTRO_SEEN_KEY = 'intro-seen'

/**
 * Whether the hero entrance plays on this visit.
 * - 'none': never; the hero shows as is.
 * - 'subtle': once per browser session.
 * - 'full': every visit.
 * Reduced motion always wins.
 */
export function shouldPlayEntrance(mode: IntroMode, seen: boolean, reducedMotion: boolean): boolean {
  if (reducedMotion || mode === 'none') return false
  if (mode === 'subtle') return !seen
  return true
}
