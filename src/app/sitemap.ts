import type { MetadataRoute } from 'next'
import { SITE, sitePages, pagePath } from '@/lib/seo'
import { locales } from '@/lib/i18n'
import { SERVICE_PAGES } from '@/lib/services-content'
import { CITY_PAGES, cityPath } from '@/lib/cities-content'

// published project pages (kept here because the sitemap is static)
const TEAM_SLUGS = ['behzad-goljaei', 'amin-parvaei']
const PROJECT_SLUGS = ['shams-najaf-1600-units', 'oman-al-hail-1306-office-building', 'al-dhaman-3500-units', 'negin-residential-complex', 'sewer-network-precast-manholes']

export const dynamic = 'force-static'
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const svc = ['/highlights', '/services', '/contracting', '/bim', '/academy', ...SERVICE_PAGES.map((s) => `/services/${s.slug}`), ...CITY_PAGES.map((c) => cityPath(c)), ...PROJECT_SLUGS.map((s) => `/projects/${s}`), ...TEAM_SLUGS.map((s) => `/team/${s}`)].flatMap((p) => locales.map((l) => ({
    url: `${SITE}/${l}${p}`, lastModified: now, changeFrequency: 'monthly' as const, priority: l === 'ar' ? 0.9 : l === 'tr' ? 0.8 : 0.7,
    alternates: { languages: { 'ar-IQ': `${SITE}/ar${p}`, 'fa-IR': `${SITE}/fa${p}`, en: `${SITE}/en${p}`, 'tr-TR': `${SITE}/tr${p}` } },
  })))
  return [...svc, ...sitePages.flatMap((pg) => locales.map((l) => ({
    url: `${SITE}/${l}${pagePath(pg)}`,
    lastModified: now,
    changeFrequency: (pg === 'gallery' || pg === 'home' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: pg === 'home' ? (l === 'ar' ? 1 : 0.9) : 0.7,
    alternates: { languages: { 'ar-IQ': `${SITE}/ar${pagePath(pg)}`, 'fa-IR': `${SITE}/fa${pagePath(pg)}`, en: `${SITE}/en${pagePath(pg)}`, 'tr-TR': `${SITE}/tr${pagePath(pg)}` } },
  }))),
  ]
}
