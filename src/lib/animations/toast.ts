import type { gsap as GsapType } from 'gsap'
import { ANIMATION_EASING } from '@/lib/constants'

const VISIBLE_MS = 2200
let hideTimer: ReturnType<typeof setTimeout> | undefined

/** Shows the page's Toast (components/ui/Toast.astro) with a message. */
export function showToast(gsap: typeof GsapType, message: string): void {
  const toast = document.getElementById('toast')
  const text = document.getElementById('toast-message')
  if (!toast || !text) return

  text.textContent = message
  clearTimeout(hideTimer)
  gsap.killTweensOf(toast)
  gsap.fromTo(toast, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.2, ease: ANIMATION_EASING.POWER_OUT })
  hideTimer = setTimeout(() => {
    gsap.to(toast, { opacity: 0, y: 8, duration: 0.25, ease: ANIMATION_EASING.POWER_IN })
  }, VISIBLE_MS)
}
