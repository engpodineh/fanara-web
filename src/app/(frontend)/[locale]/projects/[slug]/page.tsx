import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { payload, img } from '@/lib/payload'
import { isLocale, t, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/seo'

export const dynamic = 'force-dynamic'

async function load(l: Locale, slug: string) {
  const p = await payload()
  const r = await p.find({ collection: 'projects', locale: l, where: { and: [{ slug: { equals: slug } }, { published: { equals: true } }] }, limit: 1, depth: 1 })
  return r.docs[0]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const pr = await load(locale, slug)
  if (!pr) return {}
  const path = `/projects/${pr.slug}`
  const title = `${pr.title} | ${{ fa: 'دفتر مهندسی فن آرا', ar: 'مكتب فن آرا الهندسي', en: 'Fanara Engineering' }[locale]}`
  const cover = img(pr.cover, 'hero')
  return {
    title, description: pr.summary ?? undefined,
    alternates: { canonical: `/${locale}${path}`, languages: { 'ar-IQ': `/ar${path}`, 'fa-IR': `/fa${path}`, en: `/en${path}`, 'x-default': `/ar${path}` } },
    openGraph: { type: 'article', url: `/${locale}${path}`, title, description: pr.summary ?? undefined, images: cover ? [{ url: cover }] : ['/og.jpg'] },
  }
}

type M = { id: number | string; url?: string | null; alt?: string | null; width?: number | null; height?: number | null; mimeType?: string | null }

export default async function ProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale, u = t(l)
  const pr = await load(l, slug)
  if (!pr) notFound()
  const photos = ((pr.gallery ?? []) as unknown[]).filter((m): m is M => !!m && typeof m === 'object')
  const videos = (((pr as { videos?: unknown[] }).videos ?? []) as unknown[]).filter((m): m is M => !!m && typeof m === 'object' && !!(m as M).url)
  const ld = {
    '@context': 'https://schema.org', '@type': 'CreativeWork', name: pr.title, description: pr.summary ?? undefined,
    url: `${SITE}/${l}/projects/${pr.slug}`, image: img(pr.cover, 'hero') ? `${SITE}${img(pr.cover, 'hero')}` : undefined,
    locationCreated: pr.location ? { '@type': 'Place', name: pr.location } : undefined,
    creator: { '@type': 'Person', name: { fa: 'مهندس امید پودینه', ar: 'المهندس أميد پودينه', en: 'Omid Podineh' }[l] },
  }
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <div className="hero proj-hero">
        {img(pr.cover, 'hero') && <img src={img(pr.cover, 'hero')} alt="" fetchPriority="high" />}
        <div className="over" />
        <div className="copy"><div className="wrap">
          <span className={`tag ${pr.status === 'delivered' ? 'done' : 'live'}`}>{pr.status === 'delivered' ? u.delivered : u.inProgress}</span>
          <h1>{pr.title}</h1>
          {pr.summary && <p>{pr.summary}</p>}
        </div></div>
      </div>
      <section><div className="wrap">
        <div className="stamp proj-facts">
          {pr.role && <div><b>{pr.role}</b><span>{u.pRole}</span></div>}
          {pr.location && <div><b>{pr.location}</b><span>{u.pLoc}</span></div>}
          {pr.period && <div><b>{pr.period}</b><span>{u.pPeriod}</span></div>}
          {pr.showClientName && pr.client && <div><b>{pr.client}</b><span>{u.client}</span></div>}
        </div>

        {!!videos.length && (<>
          <h2 className="h3 sub-h">{u.pVideos}</h2>
          <div className="v-grid">
            {videos.map((v) => (
              <video key={v.id} controls playsInline preload="metadata" src={`${v.url}#t=0.5`} aria-label={v.alt ?? ''} />
            ))}
          </div>
        </>)}

        {!!photos.length && (<>
          <h2 className="h3 sub-h">{u.pPhotos}</h2>
          <div className="g-grid">
            {photos.map((m) => (
              <a key={m.id} className="g-item" href={m.url ?? '#'} target="_blank" rel="noopener" title={m.alt ?? undefined}>
                <img src={img(m, 'card')} alt={m.alt ?? ''} loading="lazy" width={m.width ?? undefined} height={m.height ?? undefined} />
              </a>
            ))}
          </div>
        </>)}

        <div className="ctas" style={{ marginTop: 28 }}>
          <Link className="btn btn-green" href={`/${l}/projects`}>{u.pBack}</Link>
          <Link className="btn btn-maroon" href={`/${l}/order`}>{u.ctaOrder2}</Link>
        </div>
      </div></section>
    </main>
  )
}
