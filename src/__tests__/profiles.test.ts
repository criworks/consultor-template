import { describe, it, expect } from 'vitest'
import type { Profile } from '@/data'
import { validateProfiles } from '@/lib/profiles'
import { profiles } from '@/profiles'
import { projects } from '@/data/projects'
import { sectionNames } from '@/config/sections'

const make = (slug: string): Profile => ({
  slug,
  audience: '',
  sections: ['hero'],
  seo: { es: { title: '', description: '' }, en: { title: '', description: '' } },
  intro: 'none',
})

describe('validateProfiles', () => {
  it('accepts nested kebab-case slugs', () => {
    expect(() => validateProfiles([make('contractor/cto'), make('freelance/small-business')])).not.toThrow()
  })

  it('rejects duplicate slugs', () => {
    expect(() => validateProfiles([make('a'), make('a')])).toThrow(/Two profiles/)
  })

  it('rejects slugs that start with a locale or a reserved path', () => {
    expect(() => validateProfiles([make('en/cto')])).toThrow(/reserved/)
    expect(() => validateProfiles([make('work/cto')])).toThrow(/reserved/)
    expect(() => validateProfiles([make('kit')])).toThrow(/reserved/)
  })

  it('rejects malformed slugs', () => {
    expect(() => validateProfiles([make('/cto')])).toThrow(/lowercase/)
    expect(() => validateProfiles([make('CTO')])).toThrow(/lowercase/)
  })
})

describe('shipped profiles', () => {
  it('loads the demo profiles and skips _template', () => {
    expect(profiles.map(p => p.slug)).toEqual(['contractor/hiring-manager', 'freelance/agency'])
  })

  it('only reference existing projects and sections', () => {
    const slugs = projects.map(p => p.slug) as string[]
    for (const profile of profiles) {
      for (const slug of profile.projects ?? []) expect(slugs).toContain(slug)
      for (const section of profile.sections) expect(sectionNames).toContain(section)
    }
  })
})
