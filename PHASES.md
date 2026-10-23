# Implementation Phases — consultor-template

Handoff document for each implementation chat.
Read "Product model" and "Stack & Architecture" once, then jump to your phase.

---

## Product model

- **consultor-template is the paid "pro" product.** It only ever contains code and demo content. Its git history must never include anyone's personal data, photos, or copy.
- **The author's own site is a separate repo** created from this template (`criworks/criworks-web`), with this repo as its `upstream` remote. Personal content lives only there, and only in `src/config/`, `src/profiles/` and `src/assets/`. Template improvements are made here and pulled into the site with `git pull upstream main`.
- **Paid distribution is a zip without `.git`** (`git archive`), one zip per version with a CHANGELOG.
- **A free "lite" version** (open source, MIT) is derived later as a smaller product. It is not this template.

---

## Stack & Architecture

- **Astro 7** — SSG. Pages in `src/pages/`. No server rendering. Built-in i18n routing.
- **Vite 8** — comes with Astro. No `overrides`.
- **Tailwind CSS v4** — configured via `@theme` blocks in CSS. Plugin via `@tailwindcss/vite`. No `tailwind.config.js`.
- **GSAP 3.15 + ScrollTrigger** — all animations. Singleton in `src/lib/gsap.ts` via `initGsap()`. **No Lenis.**
- **TypeScript strict** (TS 5.9 or 6; `@astrojs/check` does not support TS 7 yet) — `noUncheckedIndexedAccess: true`. Path aliases: `@/lib`, `@/config`, `@/components`, `@/sections`, `@/data`, `@/layouts`, `@/styles`, `@/assets`, `@/profiles`.
- **Vitest 5** — unit tests in `src/__tests__/`. jsdom environment. `getViteConfig` from `astro/config`.
- **Node** — `>=22.22.0`, `.nvmrc` on 24. CI runs on Node 22, 24 and 26.
- **Font** — Switzer variable (Fontshare). Confirm the Fontshare license allows shipping the files in a paid product before Phase 10.

### Key architectural decisions

1. **Three layers, never mixed**: template code (`components/`, `sections/`, `lib/`, `layouts/`, `styles/`), brand (`config/`, `assets/`), audience profiles (`profiles/`). A brand or profile need that requires editing a component becomes a config option or a new reusable section.
2. **Config layer**: all buyer customization in `src/config/` (site.ts, theme.ts, content.ts, sections.ts). No strings in components.
3. **Profiles**: one file per audience landing in `src/profiles/`. A profile only declares what differs from the base content (slug, sections, copy overrides, featured projects, SEO, intro mode). `pages/[...path].astro` generates the home and one page per profile, per locale.
4. **i18n from the start**: content is keyed by locale (`es`, `en`). Default locale at `/`, the other under its prefix (`/en/...`). Adding it later would change the config shape.
5. **ThemeStyle.astro**: reads `config/theme.ts` and emits CSS vars in `<head>`. Color values are NEVER hardcoded in CSS files.
6. **Sections in `src/sections/`**: each section has its own folder with `{Name}.astro` + `{Name}.anim.ts`. NOT in `components/`.
7. **Animation ownership**: each section declares its own scroll animation in `{Name}.anim.ts`. The page orchestrator composes them. No monolithic scroll timeline.
8. **`data-animate` pattern**: GSAP selects elements via `[data-animate="section-element"]`. Never animate by class that also has styles.
9. **Content first, motion second**: no splash loader. The hero is readable at first paint and without JS (`hero-initial.css` dims, never hides). The entrance lasts under 0.8 s (`HERO_ENTRANCE`), plays once per session, and is skipped with reduced motion. Intro intensity is per profile: `'none' | 'subtle' | 'full'`.
10. **`satisfies` typing**: config data typed as `value satisfies Type`, enabling intellisense without losing `as const` inference.
11. **No custom grid**: standard Tailwind layout utilities. No `site-col-*` system, no grid generator script.
12. **Hero image**: full-bleed wide panoramic image, AVIF/WebP via `<Image>`, `loading="eager"`. Animated via GSAP `x` + `filter:blur()` during scroll (pan left + blur). Target: LCP < 2 s on mobile.

### Directory map
```
src/
├── config/       ← brand zone (site, theme, content per locale, sections)
├── profiles/     ← one file per audience landing + _template.ts
├── assets/
│   └── images/   ← hero-bg, portrait, work-{slug} (demo placeholders here)
├── components/
│   ├── ui/       ← Button, Link, Badge, Toast
│   ├── layout/   ← ThemeStyle, Container, Stack, Seo
│   ├── header/   ← Header
│   └── composed/ ← SectionHeader, ProjectCard, NavDrawer
├── sections/     ← one folder per section + _template/
├── pages/
│   ├── [...path].astro   ← home + every profile, every locale
│   └── work/[slug].astro
├── data/         ← types.ts, projects.ts
├── lib/          ← constants, gsap, motion, i18n, animations/
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

**How to check**: before using `[n]` syntax, verify whether the value maps to a Tailwind scale step. Tailwind spacing scale: 1 unit = 4px. So `[24px]` = `6`, `[32px]` = `8`, etc.

**CR-T2: Only use `[]` syntax when no named equivalent exists.**
Example where arbitrary IS correct: `max-w-[860px]` — no named equivalent for 860px.

**CR-T3: Prefer semantic size utilities over computed ones.**
- `h-dvh` over `h-[100dvh]`
- `min-h-dvh` over `min-h-[100dvh]`
- `w-full` over `w-[100%]`

---

## Phase overview

| Phase | Scope | Done when |
|---|---|---|
| 1. Foundation ✅ | Repo, tooling, lib utilities, styles skeleton | — |
| 2. Cleanup + CI ✅ | Unused deps and fonts out, Astro 7, readable hero without JS, CI | CI green on `main` |
| 3. Config, profiles, i18n ✅ | Types, config per locale, profiles, ThemeStyle, routes | Two demo profiles build in ES and EN |
| 4. Layouts + UI (port) ✅ | BaseLayout with Seo, primitives ported from consultant-web | Sample page shows every component |
| 5. Header, Hero, intro (port) ✅ | Header, Hero entrance, scroll pan+blur, intro modes | Hero readable at 0 ms, LCP < 2 s mobile |
| 6. Sections ✅ | Work, About, Proof, Services, Contact, `_template/`, `work/[slug]` | Full home driven by config |
| 7. Author site + deploy | `criworks-web` repo from the template, real content, deploy | Author site in production |
| 8. Leads + analytics | Form, booking link, cookieless analytics, events per profile | Leads and visits visible per landing |
| 9. Real use | Remaining landings, copy tuned with data, fixes made here | Weeks without structural changes |
| 10. Store | Demo content, packaging, docs, license, CHANGELOG | v1.0 zip ready |

`criworks-website` (local only) can be deleted after Phase 2. `criworks/consultant-web` is archived after Phase 5, once Header, Hero, Link, Button and images live in the template or the author site.

---

## Phase 1 — Foundation ✅ COMPLETE

Repo init, tooling config, lib utilities (`constants`, `gsap`, `motion`), styles skeleton, Switzer variable font, unit tests.

---

## Phase 2 — Cleanup + CI ✅ COMPLETE

- Removed the 20 unused static Switzer files (the variable files cover every weight).
- Removed `tsx`, `@vitest/ui` and the `vite` override. Moved `@astrojs/check` and `typescript` to devDependencies. Added `npm run check`.
- Upgraded Astro 6 → 7 and Vitest 3 → 5: Astro ≤ 7.2.7 and Vitest ≤ 4.1.10 have security advisories with no fix on the old majors. `npm audit` is clean.
- `engines.node` is `>=22.22.0` (Astro 7 minimum); `.nvmrc` is 24.
- Replaced `SPLASH_CIRCUMFERENCE` with `HERO_ENTRANCE`. `hero-initial.css` dims the hero only when `<html>` has the `js` class, so content is readable without JS.
- Fixed the `matchMedia` tests (jsdom has no `matchMedia`; tests stub it).
- Added `.github/workflows/ci.yml`: `npm ci`, `check`, `test:run`, `build` on Node 22, 24, 26.

---

## Phase 3 — Config layer, profiles, i18n ✅ COMPLETE

**What exists**:
- `src/config/i18n.ts` — single source for `locales` (`es`, `en`) and `defaultLocale` (`es`). `astro.config.mjs` imports it for Astro's i18n routing (`prefixDefaultLocale: false`).
- `src/data/types.ts` — `Locale`, `Localized<T>`, `DeepPartial<T>`, `Content` (seo, nav, hero, proof, work, about, contact, ui), `ProjectItem` (localized title and description), `Palette`, `Typography`, `SiteConfig`, `IntroMode`, `Profile`.
- `src/data/projects.ts` — three demo projects.
- `src/config/` — `site.ts` (identity, social, `defaultIntro`), `theme.ts` (4 palettes, `activePaletteName`, typography), `content.ts` (`Localized<Content>`), `sections.ts` (`sectionNames`, `homeSections`), barrel.
- `src/profiles/` — `_template.ts` (commented how-to), demo `hiring-manager.ts` (`contractor/hiring-manager`, intro `none`) and `agency.ts` (`freelance/agency`, intro `full`), `index.ts` loader (`import.meta.glob`, skips `_*` and `index`, validates).
- `src/lib/i18n.ts` — `isLocale`, `localizedPath`. `src/lib/content.ts` — `deepMerge`, `resolveContent`, `selectProjects`. `src/lib/profiles.ts` — `validateProfiles` (slug format, duplicates, reserved first segments: locales and `work`).
- `src/components/layout/ThemeStyle.astro` — emits an unlayered `:root{--color-*;--font-*}` rule that overrides the `@theme` fallbacks in `colors.css`.
- `src/pages/[...path].astro` — one route for the home and every profile in every locale (6 pages with the demo data). Placeholder markup that prints the resolved title, sections, projects and intro mode.
- 30 unit tests. Vitest resolves the tsconfig aliases through `getViteConfig`, so `vitest.config.ts` has no alias block.

**Decisions taken while building**:
- One `[...path].astro` route instead of `index.astro` + `[...profile].astro`: the home is the page with no profile, so both share one code path.
- SEO copy and nav live in `Content` (per locale). A profile's required `seo` replaces `content.seo` for its page.
- Arrays in overrides replace the base array; objects merge field by field.

**How a page resolves its data**: `resolveContent(content, locale, profile?.content)` → copy; `profile?.seo[locale] ?? copy.seo` → SEO; `profile?.sections ?? homeSections` → sections; `selectProjects(projects, profile?.projects)` → projects; `profile?.intro ?? site.defaultIntro` → intro mode.

---

## Phase 4 — Layouts + UI primitives (port from consultant-web) ✅ COMPLETE

**What exists**:
- `src/components/layout/Seo.astro` — title, description, canonical, Open Graph, Twitter card, `hreflang` for every locale plus `x-default`, JSON-LD (`Person` + `ProfessionalService`). Absolute URLs from `site.url`.
- `src/layouts/BaseLayout.astro` — `<html lang>`, favicon, Switzer preload, inline head script (`js` class + `history.scrollRestoration = 'manual'`), Seo, ThemeStyle. Props: `title`, `description`, `locale`, `path`, `image`.
- `src/layouts/PageLayout.astro` — BaseLayout plus a fixed top bar (site name, language switch) for inner pages.
- `src/components/layout/` — `Container` (`tag`, `maxWidth`), `Stack` (`tag`, `gap`).
- `src/components/ui/` — `Link` (ported; `icon` typed as Lucide `AstroComponent`), `Button` (ported secondary, plus primary and ghost; `size`), `Badge`, `Toast` (`#toast` / `#toast-message`, centered without transforms so GSAP can own `y`).
- `src/components/composed/` — `SectionHeader` (optional `animate` prefix for `data-animate`), `ProjectCard` (links to `work/{slug}` per locale), `NavDrawer` (ported; opened by any `[data-nav-drawer-open]`, closes on Escape, close button or link; moves focus in and back; GSAP fade + stagger, skipped with reduced motion).
- `src/pages/kit/[...locale].astro` — component kit at `/kit` and `/kit/en`, built only in `npm run dev`. `kit` is a reserved profile slug.
- Demo assets: `public/favicon.svg`, `public/images/work-placeholder.svg`. New UI string `ui.mainNavigation`.

**Notes for Phase 5**: the Header renders the hamburger with `data-nav-drawer-open` and places `<NavDrawer>` and `<Toast>` once per page. Avoid overriding a component's text size through `class` (Tailwind has no class merging here); add a prop instead.

---

## Phase 5 — Header, Hero, intro (port from consultant-web) ✅ COMPLETE

**What exists**:
- `src/pages/[...path].astro` — fixed hero background (`<Image>` eager + `fetchpriority="high"`, `data-animate="hero-bg"`) with a bottom gradient for contrast, `intro-backdrop` layer, `<main>` with the Hero then the profile's sections, one `NavDrawer` (nav + language links) and one `Toast`. Sections other than Hero and Statement are placeholders until Phase 6.
- `src/components/composed/Header.astro` — props only (no config imports). Nav links, language switch (`hreflang`), email button: address split into `data-u`/`data-d`, never in the HTML; reads `ui.email` until JS shows it; click copies and shows the Toast, `mailto:` fallback. Hamburger with `data-nav-drawer-open` below `narrow`.
- `src/lib/animations/toast.ts` — `showToast(gsap, message)`. Not re-exported from `@/lib` (DOM code); import from `@/lib/animations`.
- `src/lib/intro.ts` — `INTRO_SEEN_KEY` and pure `shouldPlayEntrance(mode, seen, reducedMotion)`, tested.
- `src/sections/Hero/` — `Hero.astro` (Header, tagline, title, social links, subtitle, CTA to `hero.ctaHref`; `data-intro-mode`; sticky only with JS and motion allowed) and `Hero.anim.ts` (`createHeroEntrance`, `setHeroFinal`, `createHeroScroll`: bg pan + blur + opacity, backdrop in, hero text out in three groups, triggered by the next section).
- `src/sections/Statement/` — ported Intro; copy in `content.statement`; lines rise in on scroll (`Statement.anim.ts`). Solid background when the scroll animation can't run.
- Intro modes: `none` never dims or animates; `subtle` plays once per session (the inline head script adds `intro-seen` to `<html>` so a repeat visit is not dimmed); `full` plays every visit and also settles the bg image. Reduced motion skips all of it.
- Content additions: `hero.tagline`, `hero.ctaHref`, `statement`, `ui.email`, `ui.copyEmail`; `statement` section key. Demo image `src/assets/images/hero-bg.webp` (3600×1200).

**Checked in Chromium**: no console errors; without JS the hero is at full opacity and the email address is absent from the HTML; email copy + toast work; scroll fades the hero out and reveals the statement; `none` and repeat `subtle` visits are not dimmed; drawer opens on mobile. LCP element is the H1 (local preview); run Lighthouse on the Vercel preview for the mobile number.

---

## Phase 6 — Sections + _template + project pages ✅ COMPLETE

**What exists**:
- `src/sections/` — `Proof` (role, years, specialties, availability, timezone, languages; "View work" and "Download CV", the latter only when `proof.cvUrl` is set), `Services` (offer cards + numbered process), `Work` (`ProjectCard` grid of the profile's projects), `About` (portrait, bio paragraphs, skill badges), `Contact` (large title, copy-email pill, social links). Each has `{Name}.anim.ts` built on `createReveal` (`lib/animations/reveal.ts`: fade + lift once on scroll, skipped with reduced motion; content is in the HTML at full opacity).
- `src/sections/_template/` — `Template.astro` + `Template.anim.ts`, commented step by step (copy, type, copy per locale, register in `config/sections.ts`, export, render, animation). Never rendered.
- `src/pages/[...locale]/work/[slug].astro` — project page per project and locale (`/work/{slug}`, `/en/work/{slug}`) with `PageLayout`: title, description, image, year, tags, optional `body` and `url`.
- `ui/EmailButton` + `lib/email.ts` — the copy-email logic from the Header, shared with Contact (`plain` and `pill` variants).
- Content and data: `services`, `proof.title` and `proof.labels`, `about.bio` as paragraphs, `about.portraitAlt`, `ui.visitProject` / `allWork` / `year` / `tags`; `ui.switchLanguage` replaced by `ui.languageName` (each language's own name, so the switch reads "English" on the Spanish page). `ProjectItem.thumbnail` is now an imported image (optimized by `astro:assets`) and gains optional `body`. `services` added to `sectionNames` and the home.
- Demo assets: `src/assets/images/work/*.webp`, `src/assets/images/portrait.webp`, `public/og-image.png` (1200×630), `public/cv.pdf`. `public/images/work-placeholder.svg` removed.

---

## Phase 7 — Author site + deploy

Done outside this repo, in `criworks/criworks-web`:
- Create the repo from this template; add this repo as `upstream`.
- Real content only in `src/config/`, `src/profiles/`, `src/assets/` (images exported to AVIF/WebP).
- First three landings (e.g. hiring managers, CTOs, agencies) in ES and EN.
- Domain, `@astrojs/sitemap`, `robots.txt`, static deploy (Cloudflare Pages or Vercel) with branch previews.

Changes needed in this repo while doing it (new options, fixes) are made here first, then pulled into the site. So far:
- `site.heroFocusX` — which part of the wide hero image stays centered on phones.
- `styles/base/reset.css` moved into `@layer base`; unlayered, its `img { max-width: 100% }` beat Tailwind's `max-w-none` and squashed the hero image to the viewport width.
- `@astrojs/sitemap` (with hreflang alternates) and a `robots.txt` endpoint, both from `site.url`; `trailingSlash: 'never'` so sitemap URLs match the canonical links.

---

## Phase 8 — Leads + analytics

In this repo, selected from config so buyers can swap providers:
- Contact form via a serverless provider (Web3Forms or Formspree) + optional booking link (Cal.com).
- Cookieless analytics (Plausible, Umami, or Cloudflare Web Analytics).
- Events tagged with the profile slug: CTA click, CV download, email copy, form submit. UTM per landing.

---

## Phase 9 — Real use

Remaining landings in the author site, copy tuned with real data. Every fix lands in the template, never in a copy.

---

## Phase 10 — Store packaging

- Demo content complete and coherent; leak test in CI that fails if `components/` or `sections/` reference brand names or non-demo assets.
- Confirm the font license for redistribution.
- `npm run package:store` → `git archive` zip without `.git`.
- Buyer docs: `BUYERS.md` (basic vs advanced buyer, update flow, pending gaps; written early), `QUICK_START.md` (clone → config → assets → `npm run dev`), `THEME_GUIDE.md`, `SECTION_GUIDE.md`, `PROFILE_GUIDE.md`, `CODING_RULES.md` (CR-T rules + animation rules), `README.md`.
- Commercial license, `CHANGELOG.md`, published demo, screenshots.
- Test install with npm and pnpm on Node 22, 24, 26.

---

## Rules for all phases

- `npm run check`, `npm run test:run` and `npm run build` must pass before every PR (CI enforces it).
- No personal content in this repo: demo values only.
- No strings in `.astro` files — import from config or resolved content.
- No color values in CSS — use `var(--color-*)` tokens driven by ThemeStyle.
- Tailwind arbitrary `[]` only when no named equivalent exists (see CR-T1 above).
- `data-animate="{section}-{element}"` for all GSAP targets. Never select by style class.
- Wrap all GSAP calls in `if (shouldAnimateByPreference())`.
- Never hide content before JS runs; dim it at most.
- Scroll timelines created inside `onComplete` + `requestAnimationFrame` — ensures ScrollTrigger captures correct DOM state.
- When adding a section: (1) folder in `sections/`, (2) content type and copy in `config/content.ts`, (3) register in `config/sections.ts`, (4) animation call in the page orchestrator.
