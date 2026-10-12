import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n'
import { ACADEMY, BOOKLETS, PREVIEW_PAGES } from '@/lib/academy-content'
import BookletPreview from '@/components/BookletPreview'

export const dynamic = 'force-dynamic'

// Not launched yet: viewable by link, not indexed, not in the menu or sitemap.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const c = ACADEMY[locale]
  return { title: `${c.kicker} — ${c.title}`, description: c.lead, robots: { index: false, follow: false } }
}

export default async function Academy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale, c = ACADEMY[l]
  return (
    <main className="page"><div className="wrap">
      <span className="kicker">{c.kicker}</span>
      <h1>{c.title}</h1>
      <p className="lead" style={{ marginBottom: 26 }}>{c.lead}</p>
      <BookletPreview n={PREVIEW_PAGES}
        items={BOOKLETS.map((b) => ({ slug: b.slug, title: b.title, sub: l === 'fa' ? b.fa : l === 'en' ? b.en : '', pages: b.pages }))}
        t={{ preview: c.preview, pages: c.pages, close: c.close, prev: c.prev, next: c.next, locked: c.locked, soon: c.soon }} />
      <div className="ac-calc">
        <div>
          <span className="tag live">{c.soon}</span>
          <h2 className="h3">{c.calcTitle}</h2>
          <p>{c.calcText}</p>
          <ul>{c.calcPoints.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
        <Link className="btn btn-gold" href={`/${l}/#contact`}>{c.contact}</Link>
      </div>
    </div></main>
  )
}
