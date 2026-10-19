import type { Content, DeepPartial, Locale, ProjectItem } from '@/data'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Merges `override` into `base`. Objects merge deeply; arrays and primitives replace. */
export function deepMerge<T>(base: T, override: DeepPartial<T> | undefined): T {
  if (override === undefined) return base
  if (!isPlainObject(base) || !isPlainObject(override)) return override as T
  const result: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue
    result[key] = deepMerge(base[key], value as DeepPartial<unknown>)
  }
  return result as T
}

/** Copy for one page: the base content of the locale with the profile's overrides on top. */
export function resolveContent(
  base: { readonly [L in Locale]: Content },
  locale: Locale,
  override?: { readonly [L in Locale]?: DeepPartial<Content> },
): Content {
  return deepMerge<Content>(base[locale], override?.[locale])
}

/** Projects in the order of `slugs`; all projects when `slugs` is omitted. Throws on unknown slugs. */
export function selectProjects<P extends ProjectItem>(all: readonly P[], slugs?: readonly string[]): P[] {
  if (!slugs) return [...all]
  return slugs.map(slug => {
    const project = all.find(p => p.slug === slug)
    if (!project) throw new Error(`Unknown project slug "${slug}". Check data/projects.ts.`)
    return project
  })
}
