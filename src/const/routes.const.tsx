import { isLocal } from "../utils/env.utils"

export const AppRoutes = {
  HOME: '/',
  SPELLS: '/spells',
  EQUIPMENT: '/equipment',
  RANDOM: {
    SPELLS: '/random/spells',
    LOOT: '/random/loot',
    SHOP: '/random/shop', 
  },
  UNKNOWN: '/*'
}

export function getNavLink(path: string): string {
  if (isLocal()) {
    return `/#${path}`
  }
  return `/pf2-tools/#${path}`
}