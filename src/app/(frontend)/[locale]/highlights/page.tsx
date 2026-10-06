import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { payload, img } from '@/lib/payload'
import { isLocale, t, type Locale } from '@/lib/i18n'
import Stories from '@/components/Stories'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const u = t(locale)
  return {
    title: `${u.stTitle} | ${locale === 'en' ? 'Fanara Engineering' : locale === 'ar' ? 'فن آرا' : 'دفتر مهندسی فن آرا'}`,
    description: u.stLead,
    alternates: { canonical: `/${locale}/highlights`, languages: { 'ar-IQ': '/ar/highlights', 'fa-IR': '/fa/highlights', en: '/en/highlights', 'x-default': '/ar/highlights' } },
  }
}

export default async function Highlights({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale, u = t(l)
  const res = await (await payload()).find({ collection: 'highlights', locale: l, sort: ['-source', '-createdAt'], limit: 200 })
  return (
    <main className="page"><div className="wrap">
      <span className="kicker">{u.hKicker}</span>
      <h1>{u.stTitle}</h1>
      <p className="lead" style={{ marginBottom: 28 }}>{u.stLead}</p>
      <Stories layout="grid"
        items={res.docs.map((h) => ({ id: h.id, thumb: img(h.media, 'thumb'), full: img(h.media, 'hero'), caption: h.caption, igId: h.source === 'instagram' && h.instagramId && !h.instagramId.startsWith('story-') ? h.instagramId : null, link: h.link }))}
        t={{ close: u.stClose, prev: u.stPrev, next: u.stNext, openIg: u.stOpenIg, reel: u.stReel }} />
    </div></main>
  )
}
