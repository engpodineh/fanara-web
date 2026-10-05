import type { MetadataRoute } from 'next'
import { SITE, sitePages, pagePath } from '@/lib/seo'
import { locales } from '@/lib/i18n'

export const dynamic = 'force-static'
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return sitePages.flatMap((pg) => locales.map((l) => ({
    url: `${SITE}/${l}${pagePath(pg)}`,
    lastModified: now,
    changeFrequency: pg === 'gallery' || pg === 'home' ? 'weekly' : 'monthly',
    priority: pg === 'home' ? (l === 'ar' ? 1 : 0.9) : 0.7,
    alternates: { languages: { 'ar-IQ': `${SITE}/ar${pagePath(pg)}`, 'fa-IR': `${SITE}/fa${pagePath(pg)}`, en: `${SITE}/en${pagePath(pg)}` } },
  })))
}
