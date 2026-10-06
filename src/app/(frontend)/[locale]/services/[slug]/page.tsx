import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, t, locales, type Locale } from '@/lib/i18n'
import { SERVICE_PAGES, serviceBySlug } from '@/lib/services-content'
import { SITE } from '@/lib/seo'
import { payload } from '@/lib/payload'

export const dynamic = 'force-dynamic'
const OG_LOCALE: Record<Locale, string> = { fa: 'fa_IR', ar: 'ar_IQ', en: 'en_US' }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const sp = serviceBySlug(slug)
  if (!isLocale(locale) || !sp) return {}
  const c = sp[locale], path = `/services/${slug}`
  return {
    title: c.title, description: c.description,
    alternates: { canonical: `/${locale}${path}`, languages: { 'ar-IQ': `/ar${path}`, 'fa-IR': `/fa${path}`, en: `/en${path}`, 'x-default': `/ar${path}` } },
    openGraph: { type: 'website', title: c.title, description: c.description, url: `/${locale}${path}`, locale: OG_LOCALE[locale], images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const sp = serviceBySlug(slug)
  if (!isLocale(locale) || !sp) notFound()
  const l = locale as Locale, u = t(l), c = sp[l]
  const profile = await (await payload()).findGlobal({ slug: 'profile', locale: l }).catch(() => null) as any
  const wa = profile?.whatsapp ? `https://wa.me/${String(profile.whatsapp).replace(/\D/g, '')}` : null
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', name: c.h1, description: c.description, serviceType: c.h1, url: `${SITE}/${l}/services/${slug}`,
        provider: { '@id': `${SITE}/#org` }, areaServed: [{ '@type': 'Country', name: 'Iraq' }, { '@type': 'Country', name: 'Iran' }] },
      { '@type': 'FAQPage', mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Fanara', item: `${SITE}/${l}` },
        { '@type': 'ListItem', position: 2, name: u.svcNav, item: `${SITE}/${l}/services` },
        { '@type': 'ListItem', position: 3, name: c.h1, item: `${SITE}/${l}/services/${slug}` } ] },
    ],
  }
  return (
    <main className="page"><div className="wrap svc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <nav className="crumbs" aria-label="breadcrumb"><Link href={`/${l}`}>Fanara</Link> / <Link href={`/${l}/services`}>{u.svcNav}</Link></nav>
      <span className="kicker">{u.svcKicker}</span>
      <h1>{c.h1}</h1>
      <p className="lead svc-intro">{c.intro}</p>
      <div className="ctas">
        <Link className="btn btn-maroon" href={`/${l}/order`}>{u.svcCta}</Link>
        {wa && <a className="btn btn-green" href={wa} target="_blank" rel="noopener">{u.svcWa}</a>}
      </div>
      <h2>{u.svcWhat}</h2>
      <ul className="svc-points">{c.points.map((p) => <li key={p}>{p}</li>)}</ul>
      <h2>{u.svcFaq}</h2>
      <div className="faq">{c.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      <h2>{u.svcOther}</h2>
      <ul className="svc-links">
        {SERVICE_PAGES.filter((x) => x.slug !== slug).map((x) => <li key={x.slug}><Link href={`/${l}/services/${x.slug}`}>{x.icon} {x[l].h1}</Link></li>)}
      </ul>
    </div></main>
  )
}

export function generateStaticParams() { return locales.flatMap((locale) => SERVICE_PAGES.map((s) => ({ locale, slug: s.slug }))) }
