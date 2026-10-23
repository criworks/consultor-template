# Two ways to use this template

There are two kinds of buyer, and they differ in one way: **does the buyer
edit template files or not?** That one choice decides whether template
updates arrive cleanly or with merge conflicts.

| | Basic | Advanced |
|---|---|---|
| Who | Wants a professional site fast, with their own content, colors and landings | Has their own design system and wants new components and sections |
| Edits | Only the files listed in [Your files](#your-files) | Anything, including components, sections, layouts and styles |
| Updates | Pulled in with conflicts only in your own files, resolved by keeping yours | Pulled in by hand; every template file you changed can conflict |
| Example | The demo in this repo | `criworks/criworks-web` (the author's own site) |

You can start basic and move to advanced later. Going back is harder.

---

## Your files

These are the only files a basic buyer edits. Everything else belongs to
the template.

| File | What you set there |
|---|---|
| `src/config/site.ts` | Name, email, domain, social links, default intro, hero focus on phones |
| `src/config/content.ts` | All copy, per language: SEO, nav, hero, statement, proof, services, work, about, contact, UI strings |
| `src/config/theme.ts` | Color palette (pick one or add your own) and font family names |
| `src/config/sections.ts` | Which sections the home shows, and their order |
| `src/config/i18n.ts` | Languages and the default one |
| `src/profiles/*.ts` | One file per audience landing (copy `_template.ts`) |
| `src/data/projects.ts` | Your projects (see [Pending](#pending)) |
| `src/assets/images/` | `hero-bg.webp`, `portrait.webp`, `work/*.webp` (same names, your images) |
| `public/` | `favicon.svg`, `og-image.png`, `cv.pdf` |

---

## Case 1: Basic buyer

You customize content, colors and landings, and never touch a component.

1. Install: `npm install`, then `npm run dev`.
2. Identity: fill in `src/config/site.ts`.
3. Copy: rewrite `src/config/content.ts` in every language. TypeScript tells
   you if a key or a language is missing (`npm run check`).
4. Colors: in `src/config/theme.ts`, set `activePaletteName` to one of the
   palettes, or add your own to `PALETTES` and select it. ThemeStyle turns it
   into CSS variables, so no CSS file needs editing.
5. Sections: choose and order the home's sections in `src/config/sections.ts`.
6. Projects: replace the demo projects and their thumbnails. Leave the list
   empty to hide the Work section until you have projects.
7. Landings: copy `src/profiles/_template.ts` for each audience. A profile
   only declares what differs from the base copy.
8. Images and files: replace the demo images in `src/assets/images/` and the
   files in `public/`, keeping the same names.
9. Before publishing: `npm run check && npm run test:run && npm run build`.

### Getting updates

The paid version ships as a zip without git history. Keep the template's
code on its own branch so each new version can be merged in:

```sh
# Once, right after unzipping version 1.0
git init
git checkout -b template
git add -A && git commit -m "consultor-template 1.0"
git checkout -b main
# ...your changes, committed on main...

# For each new version
git checkout template
# delete everything except .git, unzip the new version here, then:
git add -A && git commit -m "consultor-template 1.1"
git checkout main
git merge template
```

If you got the template from GitHub instead, add it as a remote and run
`git pull upstream main`.

What to expect when you merge:

- **Template files** (components, sections, lib, styles, layouts, pages)
  merge with no conflicts, because you never changed them.
- **Your config files** can conflict when a version adds a new option or a
  new piece of copy. Keep your version of the file, run `npm run check`, and
  add whatever TypeScript reports as missing. The CHANGELOG lists every new
  key.
- **Images you replaced** conflict only if the template changed the demo
  image too. Keep yours: `git checkout --ours <file>`.

---

## Case 2: Advanced buyer

You use the template as a base and grow it with your own design system:
new components, new sections, a different home, other animations. The
author's site, `criworks/criworks-web`, is this case. On top of the template
it added a home made of a Toolbar, Cards, a color picker and a splash
loader.

What you gain: full control. What you give up: clean updates. Every
template file you edit is a file that can conflict on the next version.

### Keep updates possible

1. **Add, don't edit.** New files never conflict. Put your work in your own
   folders (`src/components/{yours}/`, `src/sections/{NewSection}/`,
   `src/lib/{yours}.ts`, `src/styles/{yours}.css`).
2. **Copy instead of changing.** To change a template component, copy it
   into your folder under a new name and use the copy. The original keeps
   receiving updates.
3. **When you must edit a template file, keep the change small** and in one
   place. A new line is easier to merge than a rewritten block.
4. **Write down which template files you touched.** Those are the files to
   review on each update. `git diff template --stat -- src/components
   src/sections src/lib src/layouts src/pages src/styles src/data/types.ts`
   lists them.
5. **Merge, don't rebase**, when you bring in a new version, so each
   conflict is solved once.

### Files you will usually touch

Some extensions still need a template file today:

| To do this | You also edit |
|---|---|
| Add a section | `src/data/types.ts` (its copy type), `src/sections/index.ts`, `src/pages/[...path].astro` (render it). See `src/sections/_template/`. |
| Add a field to existing copy or to a social link | `src/data/types.ts` |
| Change a component's markup | the component, or copy it (rule 2) |
| Change the font | `src/styles/base/fonts.css` and `public/fonts/` |
| Change spacing or type sizes | `src/styles/theme/layout.css`, `typography.css` |

For example, `criworks-web` edited `data/types.ts`, `pages/[...path].astro`,
`sections/Hero/Hero.astro`, `ui/Toast.astro`, `ui/EmailButton.astro`,
`lib/email.ts`, `styles/global.css` and `styles/animations/hero-initial.css`.
Those are the files where its updates can conflict. Its new components and
sections never will.

---

## Pending

Gaps found while writing this guide. Each one makes a basic buyer edit a
template file, or makes an advanced buyer touch more files than needed.

- **Projects live outside `config/`.** `src/data/projects.ts` is buyer
  content, but sits next to `src/data/types.ts`, which is template code.
  Proposal: move it to `src/config/projects.ts` and export it from
  `@/config`.
- **The font needs a template file.** Changing it means editing
  `src/styles/base/fonts.css`. Proposal: a buyer-owned font file, or font
  sources declared in `config/theme.ts`.
- **Spacing and type sizes are only in CSS.** `layout.css` (page, indent)
  and `typography.css` are not in `config/theme.ts`, so a basic buyer can
  pick colors but not spacing or sizes. Proposal: move them to the theme
  config and emit them through ThemeStyle like the colors.
- **Adding a section edits three template files.** Proposal: a section
  registry, so a new section is one folder plus one line in
  `config/sections.ts`, and a way to extend the copy types without editing
  `data/types.ts`.
- **`colors.css` holds fallback colors.** ThemeStyle overrides them, and the
  file says so, yet `criworks-web` edited it anyway (`muted`). Worth a louder
  note pointing to `config/theme.ts`. `public/fonts/README.md` also points to
  `colors.css` for the font families instead of `config/theme.ts`.
- **CHANGELOG.** The update flow above relies on it listing new config keys.
  Planned for Phase 10.
