// Every section the template ships. A profile can list any of them, in any order.
// The Hero (with the Header) always renders first, listed or not.
// To add one: create src/sections/{Name}/, add its copy to config/content.ts,
// then add its key here.
export const sectionNames = ['hero', 'statement', 'proof', 'work', 'about', 'contact'] as const

export type SectionName = (typeof sectionNames)[number]

// Sections and order for the home page.
export const homeSections = ['hero', 'statement', 'proof', 'work', 'about', 'contact'] as const satisfies readonly SectionName[]
