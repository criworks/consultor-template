import { locales } from '@/config/i18n'
import type { Profile } from '@/data'

// First URL segments the template already uses for its own pages.
const RESERVED_SEGMENTS = ['work', 'kit']
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/

/** Fails the build with a clear message when two profiles collide or a slug is unusable. */
export function validateProfiles(profiles: readonly Profile[]): void {
  const seen = new Set<string>()
  for (const { slug } of profiles) {
    if (!SLUG_PATTERN.test(slug)) {
      throw new Error(`Profile slug "${slug}" must be lowercase words joined by "-" and "/", e.g. "contractor/cto".`)
    }
    const first = slug.split('/')[0] ?? ''
    if ((locales as readonly string[]).includes(first) || RESERVED_SEGMENTS.includes(first)) {
      throw new Error(`Profile slug "${slug}" cannot start with "${first}": that path is reserved.`)
    }
    if (seen.has(slug)) throw new Error(`Two profiles use the slug "${slug}".`)
    seen.add(slug)
  }
}
