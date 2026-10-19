import type { Profile } from '@/data'
import { validateProfiles } from '@/lib/profiles'

// Every .ts file in this folder is a landing, except index.ts and files starting with "_".
const modules = import.meta.glob<{ default: Profile }>(['./*.ts', '!./index.ts', '!./_*.ts'], { eager: true })

export const profiles: readonly Profile[] = Object.values(modules)
  .map(m => m.default)
  .sort((a, b) => a.slug.localeCompare(b.slug))

validateProfiles(profiles)
