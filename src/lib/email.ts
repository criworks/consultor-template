import { showToast } from '@/lib/animations'
import { gsap } from '@/lib/gsap'

/**
 * Wires every EmailButton on the page: assembles the address from data-u and
 * data-d, shows it, and copies it on click (Toast), falling back to mailto:.
 * Safe to call more than once.
 */
export function bindEmailButtons(): void {
  document.querySelectorAll<HTMLElement>('[data-email-button]:not([data-bound])').forEach(btn => {
    btn.dataset.bound = ''
    const email = `${btn.dataset.u ?? ''}@${btn.dataset.d ?? ''}`
    const label = btn.querySelector('[data-email-label]')
    if (label && btn.dataset.showAddress !== undefined) label.textContent = email
    btn.setAttribute('aria-label', `${btn.dataset.copyLabel ?? ''}: ${email}`)

    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email)
        showToast(gsap, btn.dataset.copied ?? email)
      } catch {
        window.location.href = `mailto:${email}`
      }
    })
  })
}
