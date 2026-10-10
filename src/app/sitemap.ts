import type { MetadataRoute } from 'next'
import { SITE, sitePages, pagePath } from '@/lib/seo'
import { locales } from '@/lib/i18n'
import { SERVICE_PAGES } from '@/lib/services-content'
import { CITY_PAGES } from '@/lib/cities-content'

// published project pages (kept here because the sitemap is static)
const PROJECT_SLUGS = ['shams-najaf-1600-units', 'oman-al-hail-1306-office-building', 'al-dhaman-3500-units', 'negin-residential-complex', 'sewer-network-precast-manholes']

export const dynamic = 'force-static'
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const svc = ['/highlights', '/services', ...SERVICE_PAGES.map((s) => `/services/${s.slug}`), ...CITY_PAGES.map((c) => `/iraq/${c.slug}`), ...PROJECT_SLUGS.map((s) => `/projects/${s}`)].flatMap((p) => locales.map((l) => ({
    url: `${SITE}/${l}${p}`, lastModified: now, changeFrequency: 'monthly' as const, priority: l === 'ar' ? 0.9 : 0.7,
    alternates: { languages: { 'ar-IQ': `${SITE}/ar${p}`, 'fa-IR': `${SITE}/fa${p}`, en: `${SITE}/en${p}` } },
  })))
  return [...svc, ...sitePages.flatMap((pg) => locales.map((l) => ({
    url: `${SITE}/${l}${pagePath(pg)}`,
    lastModified: now,
    changeFrequency: (pg === 'gallery' || pg === 'home' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: pg === 'home' ? (l === 'ar' ? 1 : 0.9) : 0.7,
    alternates: { languages: { 'ar-IQ': `${SITE}/ar${pagePath(pg)}`, 'fa-IR': `${SITE}/fa${pagePath(pg)}`, en: `${SITE}/en${pagePath(pg)}` } },
  }))),
  ]
}
