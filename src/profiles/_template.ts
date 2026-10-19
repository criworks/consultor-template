import type { Profile } from '@/data'

// HOW TO CREATE A LANDING FOR AN AUDIENCE
//
// 1. Copy this file in the same folder and rename it, e.g. `founders.ts`.
//    Files starting with "_" are ignored.
// 2. Set `slug`: the URL of the landing. 'freelance/founders' becomes
//    /freelance/founders in the default language and /en/freelance/founders
//    in English.
// 3. Choose `sections` and their order (see config/sections.ts).
// 4. In `content`, write only the copy that changes for this audience.
//    Everything you leave out comes from config/content.ts.
// 5. Give the landing its own `seo` title and description in every language.
// 6. Pick `intro`: 'none' (no entrance animation), 'subtle' or 'full'.
//
// Run `npm run dev` and open the URL. TypeScript points out unknown
// sections, missing languages, and typos in content keys.

export default {
  slug: 'your-audience',
  audience: 'Who this landing is for (internal note).',
  sections: ['hero', 'work', 'contact'],
  content: {
    es: { hero: { title: 'Título para esta audiencia' } },
    en: { hero: { title: 'Headline for this audience' } },
  },
  seo: {
    es: { title: 'Título SEO', description: 'Descripción SEO.' },
    en: { title: 'SEO title', description: 'SEO description.' },
  },
  intro: 'subtle',
} satisfies Profile
