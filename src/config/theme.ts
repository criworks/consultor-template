import type { Palette, Typography } from '@/data'

// BUYER: pick a palette with `activePalette`, or add your own to PALETTES.
// ThemeStyle turns the active one into CSS variables (--color-*).
export const PALETTES = {
  'teal-dark': {
    bg: '#000000',
    fg: '#ffffff',
    accent: '#8dcde3',
    accentDark: '#2b5568',
    muted: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  'sage-light': {
    bg: '#f4f5f0',
    fg: '#1c1f1a',
    accent: '#5f7d5a',
    accentDark: '#33452f',
    muted: 'rgba(28, 31, 26, 0.65)',
    border: 'rgba(28, 31, 26, 0.12)',
  },
  'warm-dark': {
    bg: '#14110f',
    fg: '#f5efe6',
    accent: '#e3a26f',
    accentDark: '#6b3f1f',
    muted: 'rgba(245, 239, 230, 0.7)',
    border: 'rgba(245, 239, 230, 0.1)',
  },
  'mono-light': {
    bg: '#ffffff',
    fg: '#111111',
    accent: '#111111',
    accentDark: '#000000',
    muted: 'rgba(17, 17, 17, 0.6)',
    border: 'rgba(17, 17, 17, 0.1)',
  },
} as const satisfies Record<string, Palette>

export type PaletteName = keyof typeof PALETTES

export const activePaletteName: PaletteName = 'teal-dark'
export const activePalette: Palette = PALETTES[activePaletteName]

// BUYER: to change the font, replace the files in public/fonts/, update
// src/styles/base/fonts.css, and the family names here.
export const typography = {
  sans: "'Switzer', system-ui, sans-serif",
  display: "'Switzer', system-ui, sans-serif",
} as const satisfies Typography
