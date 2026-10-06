import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { payload } from '@/lib/payload'
import { isLocale, t, type Locale } from '@/lib/i18n'
import { pageMeta } from '@/lib/seo'
import TeamGrid from '@/components/TeamGrid'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMeta(locale, 'team') : {}
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale, u = t(l), p = await payload()
  const res = await p.find({ collection: 'team', locale: l, where: { published: { equals: true } }, sort: 'order', limit: 100 })
  return (
    <main>
      <section><div className="wrap">
        <div className="sec-head">
          <div><span className="kicker">{u.tKicker}</span><h1 className="h2">{u.tTitle}</h1></div>
          <p className="lead">{u.tLead}</p>
        </div>
        <TeamGrid members={res.docs} disc={u.tDisc} labels={{ resume: u.tResume }} />
      </div></section>
    </main>
  )
}
