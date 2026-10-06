import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, t, type Locale } from '@/lib/i18n'
import { CITY_PAGES, cityBySlug } from '@/lib/cities-content'
import { SERVICE_PAGES } from '@/lib/services-content'
import { SITE } from '@/lib/seo'
import { payload } from '@/lib/payload'

export const dynamic = 'force-dynamic'
const OG_LOCALE: Record<Locale, string> = { fa: 'fa_IR', ar: 'ar_IQ', en: 'en_US' }
const L = { fa: { needs: 'نیازهای ویژه‌ی این شهر', svc: 'خدمات ما', faq: 'پرسش‌های رایج', other: 'شهرهای دیگر' },
  ar: { needs: 'احتياجات خاصة بالمدينة', svc: 'خدماتنا', faq: 'أسئلة شائعة', other: 'مدن أخرى' },
  en: { needs: 'What this city needs', svc: 'Our services', faq: 'FAQ', other: 'Other cities' } }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; city: string }> }): Promise<Metadata> {
  const { locale, city } = await params
  const cp = cityBySlug(city)
  if (!isLocale(locale) || !cp) return {}
  const c = cp[locale], path = `/iraq/${city}`
  return {
    title: c.title, description: c.description,
    alternates: { canonical: `/${locale}${path}`, languages: { 'ar-IQ': `/ar${path}`, 'fa-IR': `/fa${path}`, en: `/en${path}`, 'x-default': `/ar${path}` } },
    openGraph: { type: 'website', title: c.title, description: c.description, url: `/${locale}${path}`, locale: OG_LOCALE[locale], images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
  }
}

export default async function CityPage({ params }: { params: Promise<{ locale: string; city: string }> }) {
  const { locale, city } = await params
  const cp = cityBySlug(city)
  if (!isLocale(locale) || !cp) notFound()
  const l = locale as Locale, u = t(l), c = cp[l], x = L[l]
  const profile = await (await payload()).findGlobal({ slug: 'profile', locale: l }).catch(() => null) as any
  const wa = profile?.whatsapp ? `https://wa.me/${String(profile.whatsapp).replace(/\D/g, '')}` : null
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', name: c.h1, description: c.description, url: `${SITE}/${l}/iraq/${city}`, provider: { '@id': `${SITE}/#org` },
        areaServed: { '@type': 'City', name: cp.en.name, containedInPlace: { '@type': 'Country', name: 'Iraq' } },
        hasOfferCatalog: { '@type': 'OfferCatalog', name: x.svc, itemListElement: SERVICE_PAGES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s[l].h1, url: `${SITE}/${l}/services/${s.slug}` } })) } },
      { '@type': 'FAQPage', mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  }
  return (
    <main className="page"><div className="wrap svc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <nav className="crumbs" aria-label="breadcrumb"><Link href={`/${l}`}>Fanara</Link> / <Link href={`/${l}/services`}>{u.svcNav}</Link> / {c.name}</nav>
      <span className="kicker">📍 {c.name}</span>
      <h1>{c.h1}</h1>
      <p className="lead svc-intro">{c.intro}</p>
      <div className="ctas">
        <Link className="btn btn-maroon" href={`/${l}/order`}>{u.svcCta}</Link>
        {wa && <a className="btn btn-green" href={wa} target="_blank" rel="noopener">{u.svcWa}</a>}
      </div>
      <h2>{x.needs}</h2>
      <ul className="svc-points">{c.needs.map((p) => <li key={p}>{p}</li>)}</ul>
      <h2>{x.svc} — {c.name}</h2>
      <ul className="svc-links">{SERVICE_PAGES.map((s) => <li key={s.slug}><Link href={`/${l}/services/${s.slug}`}>{s.icon} {s[l].h1}</Link></li>)}</ul>
      <h2>{x.faq}</h2>
      <div className="faq">{c.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      <h2>{x.other}</h2>
      <ul className="svc-links">{CITY_PAGES.filter((o) => o.slug !== city).map((o) => <li key={o.slug}><Link href={`/${l}/iraq/${o.slug}`}>📍 {o[l].h1}</Link></li>)}</ul>
    </div></main>
  )
}
