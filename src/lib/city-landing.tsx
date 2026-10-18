import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, t, type Locale } from '@/lib/i18n'
import { CITY_PAGES, cityBySlug, cityPath, COUNTRY_NAME, type Country } from '@/lib/cities-content'
import { SERVICE_PAGES } from '@/lib/services-content'
import { SITE, hreflang, OG_LOCALE } from '@/lib/seo'
import { payload } from '@/lib/payload'

const L: Record<Locale, { needs: string; svc: string; faq: string; other: string; contract: string }> = {
  fa: { needs: 'نیازهای ویژه‌ی این شهر', svc: 'خدمات ما', faq: 'پرسش‌های رایج', other: 'شهرهای دیگر', contract: 'سفارش پیمانکاری' },
  ar: { needs: 'احتياجات خاصة بالمدينة', svc: 'خدماتنا', faq: 'أسئلة شائعة', other: 'مدن أخرى', contract: 'اطلب مقاولة المشروع' },
  en: { needs: 'What this city needs', svc: 'Our services', faq: 'FAQ', other: 'Other cities', contract: 'Request contracting' },
  tr: { needs: 'Bu şehrin ihtiyaçları', svc: 'Hizmetlerimiz', faq: 'Sık sorulan sorular', other: 'Diğer şehirler', contract: 'Taşeronluk teklifi isteyin' },
}

export async function cityMetadata(country: Country, locale: string, city: string): Promise<Metadata> {
  const cp = cityBySlug(city, country)
  if (!isLocale(locale) || !cp) return {}
  const c = cp[locale], path = cityPath(cp)
  return {
    title: c.title, description: c.description,
    alternates: { canonical: `/${locale}${path}`, languages: hreflang(path) },
    openGraph: { type: 'website', title: c.title, description: c.description, url: `/${locale}${path}`, locale: OG_LOCALE[locale], images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
  }
}

export const cityParams = (country: Country) => CITY_PAGES.filter((c) => c.country === country).map((c) => ({ city: c.slug }))

export async function CityLanding({ country, locale, city }: { country: Country; locale: string; city: string }) {
  const cp = cityBySlug(city, country)
  if (!isLocale(locale) || !cp) notFound()
  const l = locale as Locale, u = t(l), c = cp[l], x = L[l]
  const profile = await (await payload()).findGlobal({ slug: 'profile', locale: l }).catch(() => null) as any
  const wa = profile?.whatsapp ? `https://wa.me/${String(profile.whatsapp).replace(/\D/g, '')}` : null
  const url = `${SITE}/${l}${cityPath(cp)}`
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', name: c.h1, description: c.description, url, provider: { '@id': `${SITE}/#org` },
        serviceType: ['MEP contracting', 'Finishing works', 'Building services design'],
        areaServed: { '@type': 'City', name: cp.en.name, containedInPlace: { '@type': 'Country', name: COUNTRY_NAME[country].en } },
        hasOfferCatalog: { '@type': 'OfferCatalog', name: x.svc, itemListElement: SERVICE_PAGES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s[l].h1, url: `${SITE}/${l}/services/${s.slug}` } })) } },
      { '@type': 'FAQPage', mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Fanara', item: `${SITE}/${l}` },
        { '@type': 'ListItem', position: 2, name: COUNTRY_NAME[country][l], item: `${SITE}/${l}/contracting` },
        { '@type': 'ListItem', position: 3, name: c.name, item: url },
      ] },
    ],
  }
  return (
    <main className="page"><div className="wrap svc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <nav className="crumbs" aria-label="breadcrumb"><Link href={`/${l}`}>Fanara</Link> / <Link href={`/${l}/contracting`}>{COUNTRY_NAME[country][l]}</Link> / {c.name}</nav>
      <span className="kicker">📍 {c.name} · {COUNTRY_NAME[country][l]}</span>
      <h1>{c.h1}</h1>
      <p className="lead svc-intro">{c.intro}</p>
      <div className="ctas">
        <Link className="btn btn-maroon" href={`/${l}/contracting#request`}>{x.contract}</Link>
        <Link className="btn btn-gold" href={`/${l}/order`}>{u.svcCta}</Link>
        {wa && <a className="btn btn-green" href={wa} target="_blank" rel="noopener">{u.svcWa}</a>}
      </div>
      <h2>{x.needs}</h2>
      <ul className="svc-points">{c.needs.map((p) => <li key={p}>{p}</li>)}</ul>
      <h2>{x.svc} — {c.name}</h2>
      <ul className="svc-links">{SERVICE_PAGES.map((s) => <li key={s.slug}><Link href={`/${l}/services/${s.slug}`}>{s.icon} {s[l].h1}</Link></li>)}</ul>
      <h2>{x.faq}</h2>
      <div className="faq">{c.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      <h2>{x.other}</h2>
      <ul className="svc-links">{CITY_PAGES.filter((o) => o.slug !== city).map((o) => <li key={o.slug}><Link href={`/${l}${cityPath(o)}`}>📍 {o[l].name} · {COUNTRY_NAME[o.country][l]}</Link></li>)}</ul>
    </div></main>
  )
}
