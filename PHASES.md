# Implementation Phases — consultor-template

Handoff document for each implementation chat.
Read "Stack & Architecture" once, then jump to your phase.

---

## Stack & Architecture

- **Astro 6.3.7** — SSG. Pages in `src/pages/`. No server rendering.
- **Tailwind CSS v4** — configured via `@theme` blocks in CSS. Plugin via `@tailwindcss/vite`. No `tailwind.config.js`.
- **GSAP 3.15 + ScrollTrigger** — all animations. Singleton in `src/lib/gsap.ts` via `initGsap()`. **No Lenis** — GSAP handles smooth scroll needs directly.
- **TypeScript strict** — `noUncheckedIndexedAccess: true`. Path aliases: `@/lib`, `@/config`, `@/components`, `@/sections`, `@/data`, `@/layouts`, `@/styles`, `@/assets`.
- **Vitest 3** — unit tests in `src/__tests__/`. jsdom environment. `getViteConfig` from `astro/config` for Vite 7 compatibility.

### Key architectural decisions

1. **Config layer**: all buyer customization in `src/config/` (site.ts, theme.ts, content.ts, sections.ts). No strings in components.
2. **ThemeStyle.astro**: reads `config/theme.ts` and emits CSS vars in `<head>`. Color values are NEVER hardcoded in CSS files.
3. **Sections in `src/sections/`**: each section has its own folder with `{Name}.astro` + `{Name}.anim.ts`. NOT in `components/`.
4. **Animation ownership**: each section declares its own scroll animation in `{Name}.anim.ts`. The page orchestrator in `pages/index.astro` composes them. No monolithic scroll timeline.
5. **`data-animate` pattern**: GSAP selects elements via `[data-animate="section-element"]`. Never animate by class that also has styles.
6. **`satisfies` typing**: config data typed as `value satisfies Type[]`, enabling intellisense without losing `as const` inference.
7. **No custom grid**: standard Tailwind layout utilities. No `site-col-*` system, no grid generator script.
8. **Hero image**: full-bleed wide panoramic image. Animated via GSAP `x` + `filter:blur()` during scroll (pan left + blur). No floating PNG overlay. No gradient blob.

### Directory map
```
src/
├── config/       ← buyer zone (site, theme, content, sections)
├── assets/
│   └── images/   ← portrait.png, hero-bg.{jpg,webp}, work-{slug}.png
├── components/
│   ├── ui/       ← Button, Link, Badge, Tag, Toast
│   ├── layout/   ← ThemeStyle, Container, Stack
│   └── composed/ ← SectionHeader, ProjectCard, NavDrawer
├── sections/     ← one folder per section + _template/
├── pages/
│   ├── index.astro
│   └── work/[slug].astro
├── data/         ← types.ts, projects.ts
├── lib/          ← constants, gsap, motion, animations/
├── layouts/      ← BaseLayout, PageLayout
└── styles/
    ├── global.css
    ├── base/     ← fonts.css, reset.css
    ├── theme/    ← colors.css, typography.css, layout.css
    └── animations/ ← backdrop.css, hero-initial.css
```

---

## Coding Rules — Tailwind Class Shorthand

**CR-T1: Prefer named scale values over arbitrary `[]` syntax.**

The Cursor linter (and Tailwind IntelliSense) warns when an arbitrary value has a direct named equivalent. Always use the named form.

| Wrong ❌ | Correct ✅ |
|---|---|
| `max-w-[240px]` | `max-w-60` (240px = 60 × 4px) |
| `w-[100vw]` | `w-screen` |
| `h-[100vh]` | `h-screen` |
| `h-[100dvh]` | `h-dvh` |
| `opacity-[0.5]` | `opacity-50` |
| `gap-[8px]` | `gap-2` |
| `p-[16px]` | `p-4` |
| `m-[24px]` | `m-6` |
| `text-[16px]` | `text-base` |
| `[grid-column-end:-1]` | `-col-end-1` |

**How to check**: before using `[n]` syntax, verify whether the value maps to a Tailwind scale step. Tailwind spacing scale: 1 unit = 4px. So `[24px]` = `6`, `[32px]` = `8`, etc. For `w-`, `h-`, `max-w-`, `gap-`, `p-`, `m-` check the scale before using brackets.

**CR-T2: Only use `[]` syntax when no named equivalent exists.**
Examples where arbitrary IS correct:
- `max-w-[860px]` — no named equivalent for 860px
- `top-[40px]` — no named equivalent (40px = 10, but check if `top-10` matches the design intent)
- `w-auto`, `h-dvh` — always prefer semantic utilities over computed sizes

**CR-T3: Prefer semantic size utilities over computed ones.**
- `h-dvh` over `h-[100dvh]`
- `min-h-dvh` over `min-h-[100dvh]`
- `w-full` over `w-[100%]`

---

## Phase 1 — Foundation ✅ COMPLETE

**Goal**: Repo init, tooling config, lib utilities, styles skeleton.

**Commits done**:
- `chore: init astro 6 project with typescript strict and vite 7`
- `chore: add placeholder page and copy Switzer variable font`
- `feat(styles): add global css, fonts, reset, theme tokens, and animation base`
- `feat(lib): add animation constants, motion utilities, and gsap singleton`
- `test: add unit tests for constants and motion — 9 passing`
- `docs: add PHASES.md — phased plan with updated architecture`

**What exists after Phase 1**:
- All config files: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`
- `src/lib/`: `constants.ts` (with HERO_BG, SPLASH_CIRCUMFERENCE — no GRID_CONFIG), `gsap.ts`, `motion.ts`, `index.ts`. **No lenis.ts.**
- `src/styles/`: `global.css`, `base/fonts.css`, `base/reset.css`, `theme/colors.css`, `theme/typography.css`, `theme/layout.css` (breakpoints only), `animations/backdrop.css` (intro-backdrop only), `animations/hero-initial.css`
- `src/__tests__/`: 9 tests passing
- `src/pages/index.astro`: placeholder
- `public/fonts/`: Switzer Variable woff2 files

**Switzer fonts location**: `public/fonts/Switzer-Variable.woff2` and `public/fonts/Switzer-VariableItalic.woff2`.

---

## Phase 2 — Config layer + Design system tokens

**Goal**: The buyer-facing config layer, ThemeStyle injector, and type definitions.

**Files to create**:

### `src/data/types.ts`
All interfaces with `readonly` properties:
```ts
export interface NavItem { readonly label: string; readonly href: string }
export interface SocialLink { readonly label: string; readonly href: string }
export interface HeroContent { readonly title: string; readonly subtitle: string; readonly cta: string }
export interface SectionContent { readonly title: string; readonly subtitle?: string }
export interface AboutContent extends SectionContent { readonly bio: string; readonly skills: readonly string[] }
export interface ContactContent { readonly title: string; readonly tagline: string; readonly cta: string }
export interface UIStrings {
  readonly emailCopied: string
  readonly loading: string
  readonly openMenu: string
  readonly closeMenu: string
  readonly viewProject: string
  readonly backToHome: string
}
export interface ProjectItem {
  readonly slug: string
  readonly title: string
  readonly description: string
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
export interface SiteConfig {
  readonly name: string
  readonly role: string
  readonly tagline: string
  readonly email: string
  readonly locale: string
  readonly seo: { readonly title: string; readonly description: string; readonly url: string; readonly image: string }
  readonly nav: readonly NavItem[]
  readonly social: readonly SocialLink[]
  readonly features: { readonly smoothScroll: boolean; readonly splashLoader: boolean; readonly reducedMotion: boolean }
}
```

### `src/data/projects.ts`
2–3 placeholder `ProjectItem[]`. Mark clearly as placeholders.

### `src/data/index.ts`
Barrel: `export * from './types'` + `export * from './projects'`

### `src/config/site.ts`
```ts
import type { SiteConfig, NavItem, SocialLink } from '@/data'
export const site = {
  name: 'Your Name',
  role: 'Consultant',
  tagline: 'Based in your city.',
  email: 'you@yourdomain.com',
  locale: 'en',
  seo: {
    title: 'Your Name — Consultant',
    description: 'Short description of your work.',
    url: 'https://yourdomain.com',
    image: '/og-image.png',
  },
  nav: [
    { label: 'Work',    href: '#work' },
    { label: 'About',   href: '#about' },
    { label: 'Contact', href: '#contact' },
  ] satisfies NavItem[],
  social: [
    { label: 'LinkedIn',  href: 'https://linkedin.com/in/...' },
    { label: 'Instagram', href: 'https://instagram.com/...' },
  ] satisfies SocialLink[],
  features: { smoothScroll: true, splashLoader: true, reducedMotion: true },
} as const satisfies SiteConfig
```

### `src/config/theme.ts`
Export `PALETTES` record (4 palettes: teal-dark, sage-light, warm-dark, mono-light) + `activePalette` + `typography` + no spacing (grid removed). Palette type: matches `Palette` interface from data/types.ts.

### `src/config/content.ts`
All section text. Keys: `hero`, `work`, `about`, `contact`, `ui`. Use `satisfies` typing against the interfaces.

### `src/config/sections.ts`
```ts
export const homeSections = ['hero', 'work', 'about', 'contact'] as const
export type SectionName = typeof homeSections[number]
```

### `src/config/index.ts`
Barrel: export all config.

### `src/components/layout/ThemeStyle.astro`
Reads `activePalette` and `typography` from `@/config`. Emits `<style define:vars={...}>` with all CSS vars. Maps palette keys to `--color-*` vars. Typography maps to `--font-sans`, `--font-display`.

Update `src/styles/theme/colors.css` so all values are `var(--color-*)` references, since ThemeStyle now drives the actual values.

**Commits for Phase 2**:
```
feat(data): add type definitions for all config and data shapes
feat(data): add placeholder projects data
feat(config): add site, theme, content, and sections config files
feat(components): add ThemeStyle — config/theme.ts to CSS vars injector
```

---

## Phase 3 — Layouts + UI primitives

**Goal**: BaseLayout, PageLayout, and all UI components. Dev server renders a styled placeholder.

**Files to create**:

### `src/layouts/BaseLayout.astro`
- Imports `@/styles/global.css`
- Injects `<ThemeStyle />` in `<head>`
- Uses `site.seo.*` for meta tags
- Inline script: `history.scrollRestoration = 'manual'`
- **No Lenis** — no initLenis() call
- Props: `title`, `description`, `image`

### `src/layouts/PageLayout.astro`
Wraps BaseLayout. Adds fixed nav at top for inner pages.

### `src/layouts/index.ts`
Barrel.

### `src/components/layout/Container.astro`
Max-width centered wrapper. Props: `maxWidth`, `tag`.

### `src/components/layout/Stack.astro`
Flex column with `gap` prop.

### `src/components/layout/index.ts`
Barrel: Container, Stack, ThemeStyle.

### `src/components/ui/Button.astro`
Props: `variant` ('primary' | 'secondary' | 'ghost'), `icon`, `size`, `type` (default 'button').

### `src/components/ui/Link.astro`
Three variants:
- `primary`: CTA with icon in circle
- `secondary`: nav link with optional `active` dot
- `tertiary`: social link — dot mode if `active` prop passed, arrow+`_blank` if absent

### `src/components/ui/Badge.astro`
Props: `label`, `color` ('default' | 'accent').

### `src/components/ui/Toast.astro`
Fixed toast container. DOM id: `toast`, inner `#toast-message`.

### `src/components/ui/index.ts`
Barrel.

### `src/components/composed/SectionHeader.astro`
Props: `eyebrow`, `title`, `subtitle`.

### `src/components/composed/ProjectCard.astro`
Props: `project` (ProjectItem). `data-animate="work-card"`.

### `src/components/composed/NavDrawer.astro`
Mobile overlay. Animated open/close via GSAP in `<script>` inside component.

### `src/components/composed/index.ts` + `src/components/index.ts`
Barrels.

Update `src/pages/index.astro` to use `BaseLayout`. Confirm dev server renders.

**Commits for Phase 3**:
```
feat(layouts): add BaseLayout and PageLayout
feat(components): add Container and Stack layout primitives
feat(components): add Link, Button, Badge, and Toast ui primitives
feat(components): add SectionHeader, ProjectCard, and NavDrawer composed components
```

---

## Phase 4 — Splash + Hero sections

**Goal**: Splash loader, Hero section, Header, and page-level animation orchestration.
Splash exits → hero text cascades in → scroll drives bg pan + blur + intro fade.

**IMPORTANT: Hero image is a full-bleed wide panoramic background image (no floating PNG, no gradient blob).**

### Hero image structure in `pages/index.astro`
```astro
<!-- Full-bleed hero background — wide panoramic, animated by GSAP during scroll -->
<div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
  <img
    src={heroBg}
    alt=""
    data-animate="hero-bg"
    loading="eager"
    class="h-dvh w-auto max-w-none"
  />
</div>

<!-- Intro backdrop — starts invisible, GSAP drives opacity + blur during scroll -->
<div
  class="fixed inset-0 z-10 pointer-events-none"
  data-animate="intro-backdrop"
/>

<main class="relative z-40">
  <Hero />
  {/* other sections added in Phase 5 */}
</main>
```

The hero bg image has a wide natural aspect ratio (≥3:1). At `h-dvh w-auto max-w-none`, it fills the full viewport height and extends wide naturally. During scroll, GSAP translates it left by `HERO_BG.PAN_X` (-320px) and applies blur.

**No accent-gradient-block. No hero-backdrop div. No floating-image div.**

### `src/lib/animations/shared.ts`
```ts
// runSplashExit({ gsap, pill, imgWrap, onComplete }) — uses SPLASH_CIRCUMFERENCE
// showToast({ gsap, message }), hideToast({ gsap })
```

### `src/lib/animations/index.ts`
Barrel.

### `src/sections/Splash/`
- `Splash.astro`: Fixed overlay (`z-splash`), pill with SVG progress arc (`r=8`, `strokeDasharray=SPLASH_CIRCUMFERENCE`), optional background portrait preview. DOM ids: `splash-loader`, `splash-arc`, `splash-pct`, `splash-pill`, `splash-img-wrap`.
- `index.ts`

### `src/sections/Hero/`
- `Hero.astro`: `section#hero sticky top-0 h-dvh overflow-hidden`. Text is layered over the fixed bg image. Uses Tailwind flex/grid utilities (no custom site-col-* classes). Content from `content.hero.*`. Includes `<Header />` at top. Uses `data-animate` attrs throughout.
- `Hero.anim.ts`: exports:
  - `createHeroEntrance({ gsap, paused })` — cascading text entrance (stagger 0.12s title, -0.3 sub, -0.36 chrome, -0.18 cta). All `power3.out`.
  - `createScrollAnimation({ gsap, trigger, isMobile })` — scrub:1 timeline:
    - `[data-animate="hero-bg"]`: `x: HERO_BG.PAN_X`, `filter: blur(HERO_BG.BLUR_ENTER)px` then `blur(HERO_BG.BLUR_EXIT)px` in 2 phases, `opacity: HERO_BG.OPACITY`
    - `[data-animate="intro-backdrop"]`: opacity → 1, blur → 40px in 2 phases
    - Hero text elements: fade out in 3 staggered groups
    - `[data-animate="intro-text"]`: fade in from `y:50`
- `index.ts`

### `src/components/header/Header.astro`
Nav links from `site.nav`. Contact button with email obfuscation (split on `@`, assembled in JS via `dataset.u` + `dataset.d`). Mobile hamburger. GSAP toast on email copy. Script in component.

### Splash animation sequence in `pages/index.astro`
```ts
runSplash(() => {
  if (!shouldAnimateByPreference()) return

  const introEl = document.querySelector('#intro')
  const isMobile = window.matchMedia('(width < 721px)').matches

  const heroTl = createHeroEntrance({ gsap, paused: true })
  heroTl.eventCallback('onComplete', () => {
    if (introEl) {
      requestAnimationFrame(() => {
        createScrollAnimation({ gsap, trigger: introEl, isMobile })
      })
    }
  })

  // No floating image entrance — splash exits directly into hero text
  heroTl.play()
})
```

Note: hero text plays immediately after splash exits (no image entrance animation).

**Commits for Phase 4**:
```
feat(lib): add shared animation utilities — splash exit and toast
feat(sections): add Splash section with progress arc
feat(sections): add Hero section markup and Tailwind layout
feat(sections): add Hero animations — entrance and scroll timeline with bg pan+blur
feat(components): add Header with email obfuscation and toast integration
feat(pages): wire index.astro — hero bg image, fixed layers, splash→hero sequence
```

**After Phase 4**: `npm run dev` shows splash → hero text cascading → scroll pans bg image left + blurs, intro text fades in.

---

## Phase 5 — Remaining sections + _template + complete orchestration

**Goal**: Work, About, Contact sections. `_template/` for buyer extensibility. Full page wired.

### `src/sections/Work/`
- `Work.astro`: `section#work min-h-dvh`. `<SectionHeader>`. Grid of `<ProjectCard>` from `data/projects.ts`.
- `Work.anim.ts`: `createWorkAnimation({ gsap, trigger })` — scroll-triggered entrance, stagger from y:32.
- `index.ts`

### `src/sections/About/`
- `About.astro`: Bio, skills (`<Badge>`), portrait.
- `About.anim.ts`: `createAboutAnimation({ gsap, trigger })`.
- `index.ts`

### `src/sections/Contact/`
- `Contact.astro`: Title, tagline, email button, social links.
- `Contact.anim.ts`: `createContactAnimation({ gsap, trigger })`.
- `index.ts`

### `src/sections/_template/`
Both files fully commented step-by-step (copy this folder → rename → add to content.ts → register in sections.ts → add animation call in pages/index.astro).

Update `pages/index.astro`: import and render Work, About, Contact. Add their `createXAnimation` calls inside `requestAnimationFrame` after hero timeline.

**Commits for Phase 5**:
```
feat(sections): add Work section with project grid
feat(sections): add About section with bio and portrait
feat(sections): add Contact section
feat(sections): add _template section for buyer extensibility
feat(pages): complete index.astro — all sections and full animation orchestration
```

---

## Phase 6 — Inner pages + assets + buyer docs

**Goal**: Project detail page, placeholder assets, all buyer documentation. Ready to package.

### `src/pages/work/[slug].astro`
Dynamic route from `data/projects.ts`. Uses `PageLayout`. Project hero (thumbnail), title, year, tags, description, links.

### Assets
- `src/assets/images/hero-bg-placeholder.jpg` — wide panoramic placeholder (≥3:1 ratio)
- `src/assets/images/portrait-placeholder.png`
- Work thumbnails

### `public/`
- `favicon.svg` — buyer replaces
- `og-image.png` — 1200×630 placeholder

### Documentation
- `QUICK_START.md` — L1: clone → config → assets → npm run dev
- `THEME_GUIDE.md` — L2: switch palette, create custom, change font
- `SECTION_GUIDE.md` — L3: copy _template step by step
- `CODING_RULES.md` — L4: all rules including CR-T1/T2/T3 from this file + animation rules
- `README.md` — overview, stack, screenshot link

**Commits for Phase 6**:
```
feat(pages): add work/[slug] dynamic project detail page
feat(assets): add placeholder hero-bg, portrait, and project images
chore: add favicon and og-image placeholders
docs: add buyer guides — QUICK_START, THEME_GUIDE, SECTION_GUIDE, CODING_RULES
docs: update README
```

---

## Rules for all phases

- `npm run test:run` must pass before every commit.
- `npm run build` at end of each phase to catch TypeScript / Astro errors.
- No strings in `.astro` files — import from `@/config/content.ts`.
- No color values in CSS — use `var(--color-*)` tokens driven by ThemeStyle.
- Tailwind arbitrary `[]` only when no named equivalent exists (see CR-T1 above).
- `data-animate="{section}-{element}"` for all GSAP targets. Never select by style class.
- Wrap all GSAP calls in `if (shouldAnimateByPreference())`.
- Scroll timelines created inside `onComplete` + `requestAnimationFrame` — ensures ScrollTrigger captures correct DOM state.
- When adding a section: (1) folder in `sections/`, (2) key in `config/content.ts`, (3) register in `config/sections.ts`, (4) animation call in `pages/index.astro`.
