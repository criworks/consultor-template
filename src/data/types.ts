import type { locales } from '@/config/i18n'
import type { SectionName } from '@/config/sections'

export type Locale = (typeof locales)[number]
export type Localized<T> = { readonly [L in Locale]: T }

// Recursive optional for content overrides. Arrays are replaced as a whole.
export type DeepPartial<T> = T extends readonly unknown[]
  ? T
  : T extends object
    ? { readonly [K in keyof T]?: DeepPartial<T[K]> }
    : T

export interface NavItem { readonly label: string; readonly href: string }
export interface SocialLink { readonly label: string; readonly href: string }

export interface SeoContent { readonly title: string; readonly description: string }
export interface HeroContent { readonly title: string; readonly subtitle: string; readonly cta: string }
export interface SectionContent { readonly title: string; readonly subtitle?: string }
export interface AboutContent extends SectionContent { readonly bio: string; readonly skills: readonly string[] }
export interface ProofContent {
  readonly role: string
  readonly years: number
  readonly specialties: readonly string[]
  readonly availability: string
  readonly timezone: string
  readonly languages: readonly string[]
  readonly cvUrl?: string
}
export interface ContactContent { readonly title: string; readonly tagline: string; readonly cta: string }
export interface UIStrings {
  readonly emailCopied: string
  readonly openMenu: string
  readonly closeMenu: string
  readonly viewProject: string
  readonly viewWork: string
  readonly backToHome: string
  readonly downloadCv: string
  readonly switchLanguage: string
}

export interface Content {
  readonly seo: SeoContent
  readonly nav: readonly NavItem[]
  readonly hero: HeroContent
  readonly proof: ProofContent
  readonly work: SectionContent
  readonly about: AboutContent
  readonly contact: ContactContent
  readonly ui: UIStrings
}

export interface ProjectItem {
  readonly slug: string
  readonly title: Localized<string>
  readonly description: Localized<string>
  readonly thumbnail: string
  readonly tags: readonly string[]
  readonly url?: string
  readonly year: number
}

export interface Palette {
  readonly bg: string
  readonly fg: string
  readonly accent: string
  readonly accentDark: string
  readonly muted: string
  readonly border: string
}

export interface Typography {
  readonly sans: string
  readonly display: string
}

export type IntroMode = 'none' | 'subtle' | 'full'

export interface SiteConfig {
  readonly name: string
  readonly email: string
  readonly url: string
  readonly ogImage: string
  readonly social: readonly SocialLink[]
  readonly defaultIntro: IntroMode
}

export interface Profile {
  /** URL path without slashes at the ends, e.g. 'contractor/cto'. */
  readonly slug: string
  /** Internal note about who this landing is for. Not rendered. */
  readonly audience: string
  /** Sections on the page, in order. */
  readonly sections: readonly SectionName[]
  /** Only the copy that differs from config/content.ts, per locale. */
  readonly content?: { readonly [L in Locale]?: DeepPartial<Content> }
  /** Slugs from data/projects.ts to feature, in order. All projects when omitted. */
  readonly projects?: readonly string[]
  /** Every landing needs its own title and description. */
  readonly seo: Localized<SeoContent>
  readonly intro: IntroMode
}
