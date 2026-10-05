import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { payload, img } from '@/lib/payload'
import { isLocale, t, type Locale } from '@/lib/i18n'
import { pageMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'
const CATS = ['site', 'mep', 'design', 'team', 'management'] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return pageMeta(locale, 'gallery')
}

export default async function Gallery({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ c?: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const { c } = await searchParams
  const cat = (CATS as readonly string[]).includes(c ?? '') ? c : undefined
  const l = locale as Locale, u = t(l), p = await payload()
  const res = await p.find({
    collection: 'media', locale: l, limit: 400, sort: 'order', depth: 0,
    where: { and: [{ inGallery: { equals: true } }, ...(cat ? [{ category: { equals: cat } }] : [])] },
  })
  return (
    <main>
      <section><div className="wrap">
        <div className="sec-head">
          <div><span className="kicker">{u.gKicker}</span><h1 className="h2">{u.gTitle}</h1></div>
          <p className="lead">{u.gLead}</p>
        </div>
        <nav className="g-tabs" aria-label={u.gKicker}>
          <Link href={`/${l}/gallery`} aria-current={!cat ? 'page' : undefined}>{u.gAll}</Link>
          {CATS.map((k) => <Link key={k} href={`/${l}/gallery?c=${k}`} aria-current={cat === k ? 'page' : undefined}>{u.gCats[k]}</Link>)}
        </nav>
        <div className="g-grid">
          {res.docs.map((m) => (
            <a key={m.id} className="g-item" href={m.url ?? '#'} target="_blank" rel="noopener" title={m.alt ?? undefined}>
              <img src={img(m, 'card')} alt={m.alt ?? ''} loading="lazy" width={m.width ?? undefined} height={m.height ?? undefined} />
            </a>
          ))}
        </div>
      </div></section>
    </main>
  )
}
