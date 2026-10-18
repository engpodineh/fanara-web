import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n'
import { BIM_COPY, BIM_POSTERS, BIM_TAGS } from '@/lib/bim-content'
import { hreflang } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const c = BIM_COPY[locale]
  return {
    title: c.metaTitle, description: c.metaDesc,
    keywords: ['BIM Iraq', 'Revit Architecture', 'Revit Structure', 'Revit MEP', 'هندسة معمارية', 'تصميم هندسي', 'بغداد', 'BIM العراق', 'رويت'],
    alternates: { canonical: `/${locale}/bim`, languages: hreflang('/bim') },
    openGraph: { type: 'website', url: `/${locale}/bim`, title: c.metaTitle, description: c.metaDesc, images: [{ url: '/bim/bim-revit-services.jpg', width: 768, height: 1376 }] },
  }
}

export default async function Bim({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale, c = BIM_COPY[l]
  return (
    <main className="page"><div className="wrap">
      <span className="kicker">{c.kicker}</span>
      <h1>{c.title}</h1>
      <p className="lead" style={{ marginBottom: 18 }}>{c.lead}</p>
      <div className="bim-tags" aria-label={c.tags}>
        {BIM_TAGS.map((t) => <a key={t} href={`https://www.instagram.com/explore/tags/${encodeURIComponent(t)}/`} target="_blank" rel="noopener nofollow">#{t}</a>)}
      </div>
      <div className="bim-grid">
        {BIM_POSTERS.map((p) => (
          <figure key={p.file} className="bim-poster">
            <a href={`/bim/${p.file}`} target="_blank" rel="noopener"><img src={`/bim/${p.file}`} alt={c.posters[p.key]} width={1024} height={1536} loading="lazy" /></a>
            <figcaption>{c.posters[p.key]}</figcaption>
          </figure>
        ))}
      </div>
      <div className="ctas" style={{ marginTop: 28 }}>
        <Link className="btn btn-gold" href={`/${l}/order`}>{c.cta}</Link>
        <Link className="btn btn-line" href={`/${l}/services/mep-design`}>{{ ar: 'تصميم التأسيسات', fa: 'طراحی تأسیسات', en: 'MEP design', tr: 'MEP tasarımı' }[l]}</Link>
      </div>
    </div></main>
  )
}
