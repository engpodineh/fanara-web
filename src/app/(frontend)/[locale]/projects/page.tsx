import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { payload, img } from '@/lib/payload'
import { isLocale, t, type Locale } from '@/lib/i18n'
import { pageMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMeta(locale, 'projects') : {}
}

export default async function ProjectsIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale, u = t(l), p = await payload()
  // in-progress first, delivered last
  const res = await p.find({ collection: 'projects', locale: l, where: { published: { equals: true } }, sort: ['-status', 'order'], limit: 100 })
  return (
    <main>
      <section><div className="wrap">
        <div className="sec-head">
          <div><span className="kicker">{u.pKicker}</span><h1 className="h2">{u.pIndexTitle}</h1></div>
          <p className="lead">{u.pIndexLead}</p>
        </div>
        <div className="proj-list">
          {res.docs.map((pr) => (
            <Link key={pr.id} className="proj" href={`/${l}/projects/${pr.slug}`}>
              {img(pr.cover) && <img src={img(pr.cover)} alt="" loading="lazy" />}
              <div className="pc">
                <span className={`tag ${pr.status === 'delivered' ? 'done' : 'live'}`}>{pr.status === 'delivered' ? u.delivered : u.inProgress}</span>
                <h2 className="h3">{pr.title}</h2>
                {pr.summary && <p>{pr.summary}</p>}
                <div className="meta">
                  {pr.location && <span>{pr.location}</span>}
                  {pr.period && <span>{pr.period}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div></section>
    </main>
  )
}
