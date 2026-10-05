import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { notFound } from 'next/navigation'
import { payload, img } from '@/lib/payload'
import { isLocale, t, type Locale } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMeta(locale, 'resume') : {}
}
const fmt = (d?: string | null, l: Locale = 'en') =>
  d ? new Intl.DateTimeFormat(l === 'en' ? 'en-GB' : l === 'ar' ? 'ar-IQ' : 'fa-IR-u-ca-gregory', { month: 'short', year: 'numeric' }).format(new Date(d)) : ''

export default async function Resume({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale, u = t(l), p = await payload()
  const [profile, exp, creds] = await Promise.all([
    p.findGlobal({ slug: 'profile', locale: l }),
    p.find({ collection: 'experience', locale: l, sort: '-start', limit: 50 }),
    p.find({ collection: 'credentials', locale: l, sort: 'order', limit: 50 }),
  ])
  const by = (k: string) => creds.docs.filter((c) => c.kind === k)
  return (
    <main className="page"><div className="wrap">
      <div className="cv-head">
        {img(profile.portrait, 'thumb') && <img src={img(profile.portrait, 'card')} alt="" />}
        <div>
          <h1 className="f-name" style={{ margin: 0 }}>{profile.name}</h1>
          <p className="f-role">{profile.role}</p>
          <p className="f-text" style={{ margin: 0 }}>{profile.summary}</p>
        </div>
      </div>
      <div className="cv-grid">
        <div>
          <h2>{u.experience}</h2>
          {exp.docs.map((e) => (
            <article className="job" key={e.id}>
              <div className="when">{fmt(e.start, l)} – {e.current ? u.present : fmt(e.end, l)}</div>
              <div>
                <h3>{e.title}</h3>
                <p className="co">{e.company}{e.location ? ` · ${e.location}` : ''}</p>
                {!!e.bullets?.length && <ul>{e.bullets.map((b) => <li key={b.id}>{b.text}</li>)}</ul>}
              </div>
            </article>
          ))}
        </div>
        <aside className="side">
          {[['degree', u.education], ['certificate', u.certificates], ['award', u.awards]].map(([k, label]) =>
            by(k).length ? (
              <div key={k}><h3>{label}</h3><ul>{by(k).map((c) => (
                <li key={c.id}>{c.title}<small>{[c.issuer, c.year, c.hours ? `${c.hours} ${u.hours}` : ''].filter(Boolean).join(' · ')}</small></li>
              ))}</ul></div>
            ) : null,
          )}
          {!!profile.skills?.length && <div><h3>{u.skills}</h3><ul>{profile.skills.map((s) => (
            <li key={s.id}>{s.group}<small>{s.items?.split('\n').join(' · ')}</small></li>
          ))}</ul></div>}
          {!!profile.languages?.length && <div><h3>{u.languages}</h3><ul>{profile.languages.map((s) => (
            <li key={s.id}>{s.language}<small>{s.level}</small></li>
          ))}</ul></div>}
        </aside>
      </div>
    </div></main>
  )
}
