import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n'
import { ACADEMY, BOOKLETS, PREVIEW_PAGES, WORK_ORDERS, WO_ITEMS, WO_COPY } from '@/lib/academy-content'
import BookletPreview from '@/components/BookletPreview'

export const dynamic = 'force-dynamic'

// Public (menu + sitemap + indexed). Files stay private: only watermarked preview pages are served, no downloads.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const c = ACADEMY[locale]
  return { title: `${c.kicker} — ${c.title}`, description: c.lead, alternates: { canonical: `/${locale}/academy`, languages: { 'ar-IQ': '/ar/academy', 'fa-IR': '/fa/academy', en: '/en/academy', 'x-default': '/ar/academy' } } }
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
      <section className="ac-folder">
        <div className="ac-folder-head">
          <span className="tag">📁 {WO_COPY[l].folder}</span>
          <h2 className="h3">{WO_COPY[l].title}</h2>
          <p>{WO_COPY[l].text}</p>
          <ol className="ac-folder-list">{WO_ITEMS.map((x) => <li key={x}>{x}</li>)}</ol>
        </div>
        <BookletPreview n={PREVIEW_PAGES}
          items={[{ slug: WORK_ORDERS.slug, title: WO_COPY.ar.title, sub: l === 'ar' ? WO_COPY.ar.sub : `${WO_COPY[l].title} · ${WO_COPY[l].sub}`, pages: WORK_ORDERS.pages }]}
          t={{ preview: c.preview, pages: c.pages, close: c.close, prev: c.prev, next: c.next, locked: c.locked, soon: c.soon }} />
      </section>
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
