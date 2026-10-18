import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, t, type Locale } from '@/lib/i18n'
import { SERVICE_PAGES } from '@/lib/services-content'
import { CITY_PAGES, cityPath } from '@/lib/cities-content'
import { hreflang } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const u = t(locale)
  return {
    title: `${u.svcIndexTitle} | ${locale === 'ar' ? 'فن آرا' : locale === 'fa' ? 'دفتر مهندسی فن آرا' : locale === 'tr' ? 'Fanara Mühendislik' : 'Fanara Engineering'}`,
    description: u.svcIndexLead,
    alternates: { canonical: `/${locale}/services`, languages: hreflang('/services') },
  }
}

export default async function Services({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale, u = t(l)
  return (
    <main className="page"><div className="wrap">
      <span className="kicker">{u.svcKicker}</span>
      <h1>{u.svcIndexTitle}</h1>
      <p className="lead" style={{ marginBottom: 28 }}>{u.svcIndexLead}</p>
      <div className="svc-cards">
        {SERVICE_PAGES.map((s) => (
          <Link key={s.slug} className="svc-card" href={`/${l}/services/${s.slug}`}>
            <span className="svc-ic" aria-hidden>{s.icon}</span>
            <h2>{s[l].h1}</h2>
            <p>{s[l].description}</p>
            <span className="svc-more">{u.svcMore} ←</span>
          </Link>
        ))}
      </div>
      <div className="city-chips">
        {CITY_PAGES.map((c) => <Link key={c.slug} href={`/${l}${cityPath(c)}`}>📍 {c[l].name}</Link>)}
      </div>
    </div></main>
  )
}
