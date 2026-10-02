import { getPayload } from 'payload'
import config from '@payload-config'
export const payload = () => getPayload({ config })
export const img = (m: unknown, size: 'thumb' | 'card' | 'hero' = 'card') => {
  if (!m || typeof m !== 'object') return undefined
  const media = m as { url?: string; sizes?: Record<string, { url?: string | null }> }
  return media.sizes?.[size]?.url || media.url || undefined
}
