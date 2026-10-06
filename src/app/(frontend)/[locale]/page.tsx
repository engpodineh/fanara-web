import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import InstaBadge from '@/components/InstaBadge'
import Stories from '@/components/Stories'
import { CITY_PAGES } from '@/lib/cities-content'
import Link from 'next/link'
import { payload, img } from '@/lib/payload'
import { isLocale, t, type Locale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMeta(locale, 'home') : {}
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale, u = t(l), p = await payload()
  const [profile, projects, services, highlights] = await Promise.all([
    p.findGlobal({ slug: 'profile', locale: l }),
    p.find({ collection: 'projects', locale: l, where: { featured: { equals: true }, published: { equals: true } }, sort: 'order', limit: 3 }),
    p.find({ collection: 'services', locale: l, sort: 'order', limit: 12 }),
    p.find({ collection: 'highlights', locale: l, sort: ['-source', '-createdAt'], limit: 16 }),
  ])
  const igPhoto = img(profile.portrait, 'thumb')
  return (
    <main>
      <div className="hero" id="top">
        {img(profile.heroImage, 'hero') && <img src={img(profile.heroImage, 'hero')} alt="" fetchPriority="high" />}
        <div className="over" />
        <div className="copy"><div className="wrap">
          {profile.heroEyebrow && <span className="eyebrow">{profile.heroEyebrow}</span>}
          <h1>{profile.heroTitle}</h1>
          {profile.heroText && <p>{profile.heroText}</p>}
          <div className="ctas">
            <Link className="btn btn-gold" href={`/${l}/order`}>{u.ctaOrder}</Link>
            <Link className="btn btn-ghost" href={`/${l}/resume`}>{u.ctaCv}</Link>
          </div>
        </div></div>
      </div>

      <section className="founder" id="about">
        <div className="wrap f-grid">
          {img(profile.portrait) && <div className="f-photo"><img src={img(profile.portrait)} alt={profile.name ?? ''} /></div>}
          <div>
            <span className="kicker">{u.fKicker}</span>
            <p className="f-name">{profile.name}</p>
            {profile.role && <p className="f-role">{profile.role}</p>}
            {profile.summary && <p className="f-text">{profile.summary}</p>}
            {!!profile.stats?.length && (
              <div className="stamp">{profile.stats.map((s) => <div key={s.id}><b>{s.value}</b><span>{s.label}</span></div>)}</div>
            )}
            <div className="ctas">
              <Link className="btn btn-green" href={`/${l}/resume`}>{u.cvFull}</Link>
              {profile.instagramPersonal && <InstaBadge handle={profile.instagramPersonal} photo={igPhoto} label={u.igLabel} cta={u.igCta} />}
            </div>
          </div>
        </div>
      </section>

      {!!projects.docs.length && (
        <section id="projects"><div className="wrap">
          <div className="sec-head">
            <div><span className="kicker">{u.pKicker}</span><h2>{u.pTitle}</h2></div>
            <p className="lead">{u.pLead}</p>
          </div>
          <div className="proj-grid">
            {projects.docs.map((pr, i) => (
              <div key={pr.id} className={`proj${i === 0 ? ' big' : ''}`}>
                {img(pr.cover) && <img src={img(pr.cover)} alt="" />}
                <div className="pc">
                  <span className={`tag ${pr.status === 'delivered' ? 'done' : 'live'}`}>{pr.status === 'delivered' ? u.delivered : u.inProgress}</span>
                  <h3>{pr.title}</h3>
                  {pr.summary && <p>{pr.summary}</p>}
                  <div className="meta">
                    {pr.showClientName && pr.client && <span>{u.client}: {pr.client}</span>}
                    {pr.period && <span>{pr.period}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div></section>
      )}

      <section className="services" id="services"><div className="wrap">
        <div className="sec-head">
          <div><span className="kicker">{u.sKicker}</span><h2>{u.sTitle}</h2></div>
          <p className="lead">{u.sLead}</p>
        </div>
        <div className="svc-grid">
          {services.docs.map((s) => (
            <div className="svc" key={s.id}><span className="code">{s.code}</span><h3>{s.title}</h3>{s.description && <p>{s.description}</p>}</div>
          ))}
        </div>
        <div className="ctas" style={{ marginTop: 28 }}>
          <Link className="btn btn-maroon" href={`/${l}/order`}>{u.ctaOrder2}</Link>
          <Link className="btn btn-ghost" href={`/${l}/services`}>{u.svcIndexTitle}</Link>
        </div>
        <div className="city-chips home-cities">
          {CITY_PAGES.map((c) => <Link key={c.slug} href={`/${l}/iraq/${c.slug}`}>📍 {c[l].name}</Link>)}
        </div>
      </div></section>

      {!!highlights.docs.length && (
        <section><div className="wrap">
          <div className="sec-head"><div><span className="kicker">{u.hKicker}</span><h2>{u.hTitle}</h2></div>
            {profile.instagramOffice && <InstaBadge handle={profile.instagramOffice} photo={igPhoto} label={u.igLabel} cta={u.igCta} />}
          </div>
          <Stories
            items={highlights.docs.map((h) => ({ id: h.id, thumb: img(h.media, 'thumb'), full: img(h.media, 'hero'), caption: h.caption, igId: h.source === 'instagram' && h.instagramId && !h.instagramId.startsWith('story-') ? h.instagramId : null, link: h.link }))}
            t={{ close: u.stClose, prev: u.stPrev, next: u.stNext, openIg: u.stOpenIg, reel: u.stReel }} />
          <div style={{ marginTop: 18 }}><Link className="btn btn-green" href={`/${l}/highlights`}>{u.stAll}</Link></div>
        </div></section>
      )}

      <section className="contact" id="contact"><div className="wrap">
        <span className="kicker">{u.cKicker}</span>
        <h2>{u.cTitle}</h2>
        <div className="c-grid">
          {profile.whatsapp && <div className="c-item"><div className="k">{u.whatsapp}</div><div className="v"><a href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener">{profile.whatsapp}</a></div></div>}
          {profile.phoneIraq && <div className="c-item"><div className="k">{u.phoneIq}</div><div className="v"><span>{profile.phoneIraq}</span></div></div>}
          {profile.email && <div className="c-item"><div className="k">{u.email}</div><div className="v"><span>{profile.email}</span></div></div>}
        </div>
        {profile.instagramOffice && <div style={{ marginTop: 22 }}><InstaBadge handle={profile.instagramOffice} photo={igPhoto} label={u.igLabel} cta={u.igCta} variant="dark" /></div>}
      </div></section>
    </main>
  )
}
