import { describe, it, expect } from 'vitest'
import { content } from '@/config/content'
import { projects } from '@/data/projects'
import { deepMerge, resolveContent, selectProjects } from '@/lib/content'

describe('deepMerge', () => {
  it('overrides one nested field and keeps the rest', () => {
    const base = { a: { b: 1, c: 2 }, d: 3 }
    expect(deepMerge(base, { a: { b: 9 } })).toEqual({ a: { b: 9, c: 2 }, d: 3 })
  })

  it('replaces arrays instead of merging them', () => {
    expect(deepMerge({ list: [1, 2, 3] }, { list: [4] })).toEqual({ list: [4] })
  })

  it('does not mutate the base', () => {
    const base = { a: { b: 1 } }
    deepMerge(base, { a: { b: 2 } })
    expect(base.a.b).toBe(1)
  })
})

describe('resolveContent', () => {
  it('returns the base copy when the profile has no override', () => {
    expect(resolveContent(content, 'en')).toEqual(content.en)
  })

  it('applies only the override of the requested locale', () => {
    const resolved = resolveContent(content, 'es', { en: { hero: { title: 'EN only' } } })
    expect(resolved.hero.title).toBe(content.es.hero.title)
  })

  it('changes one field of a section and keeps its siblings', () => {
    const resolved = resolveContent(content, 'en', { en: { hero: { title: 'New' } } })
    expect(resolved.hero.title).toBe('New')
    expect(resolved.hero.cta).toBe(content.en.hero.cta)
  })
})

describe('selectProjects', () => {
  it('returns all projects when no slugs are given', () => {
    expect(selectProjects(projects)).toHaveLength(projects.length)
  })

  it('keeps the order of the slugs', () => {
    const picked = selectProjects(projects, ['ai-assistant', 'fintech-dashboard'])
    expect(picked.map(p => p.slug)).toEqual(['ai-assistant', 'fintech-dashboard'])
  })

  it('throws on an unknown slug', () => {
    expect(() => selectProjects(projects, ['nope'])).toThrow(/Unknown project slug "nope"/)
  })
})
