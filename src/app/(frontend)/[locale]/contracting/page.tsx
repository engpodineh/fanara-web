import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { payload, img } from '@/lib/payload'
import { isLocale, t, type Locale } from '@/lib/i18n'
import { SITE, hreflang, OG_LOCALE } from '@/lib/seo'
import { CONTRACTING, SCOPES, SCOPE_GROUPS } from '@/lib/contracting-content'
import { CITY_PAGES, cityPath, COUNTRY_NAME, type Country } from '@/lib/cities-content'
import TeamGrid from '@/components/TeamGrid'
import ContractForm from './ContractForm'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const c = CONTRACTING[locale]
  return {
    title: c.metaTitle, description: c.metaDesc,
    alternates: { canonical: `/${locale}/contracting`, languages: hreflang('/contracting') },
    openGraph: { type: 'website', title: c.metaTitle, description: c.metaDesc, url: `/${locale}/contracting`, locale: OG_LOCALE[locale], images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
  }
}

const DEFAULT_COUNTRY: Record<Locale, string> = { ar: 'العراق', fa: 'عراق', en: '', tr: 'Türkiye' }

export default async function Contracting({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale, u = t(l), c = CONTRACTING[l], p = await payload()
  const [profile, team] = await Promise.all([
    p.findGlobal({ slug: 'profile', locale: l }),
    p.find({ collection: 'team', locale: l, where: { published: { equals: true } }, sort: 'order', limit: 100 }),
  ])
  const wa = (profile as any)?.whatsapp ? `https://wa.me/${String((profile as any).whatsapp).replace(/\D/g, '')}` : null
  const groups = SCOPE_GROUPS.map((g) => ({ g, title: c.groups[g], items: SCOPES.filter((s) => s.g === g) }))
  const countries: Country[] = ['iraq', 'turkiye', 'armenia']
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'Service', name: c.title, description: c.metaDesc, url: `${SITE}/${l}/contracting`, provider: { '@id': `${SITE}/#org` },
      serviceType: ['Finishing works contractor', 'MEP subcontractor', 'Construction management'],
      areaServed: countries.map((k) => ({ '@type': 'Country', name: COUNTRY_NAME[k].en })),
      hasOfferCatalog: { '@type': 'OfferCatalog', name: c.nav, itemListElement: groups.map((g) => ({ '@type': 'OfferCatalog', name: g.title, itemListElement: g.items.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.l[l] } })) })) },
    }],
  }
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <section className="ct-hero"><div className="wrap">
        <span className="kicker">{c.kicker}</span>
        <h1>{c.title}</h1>
        <p className="lead">{c.lead}</p>
        <div className="ctas">
          <a className="btn btn-maroon" href="#request">{c.cta}</a>
          {wa && <a className="btn btn-green" href={wa} target="_blank" rel="noopener">{u.svcWa}</a>}
        </div>
        <div className="stamp ct-stats">{c.stats.map(([v, k]) => <div key={k}><b>{v}</b><span>{k}</span></div>)}</div>
      </div></section>

      <section id="scope"><div className="wrap">
        <div className="ct-groups">
          {groups.map((g) => (
            <div className={`ct-group ${g.g}`} key={g.g}>
              <h2 className="h3">{g.title}</h2>
              <ul>{g.items.map((s) => <li key={s.v}><span aria-hidden="true">{s.icon}</span>{s.l[l]}</li>)}</ul>
            </div>
          ))}
        </div>
      </div></section>

      <section><div className="wrap ct-two">
        <div>
          <h2>{c.whyTitle}</h2>
          <ul className="svc-points">{c.why.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div>
          <h2>{c.models}</h2>
          <dl className="ct-models">{c.modelList.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </div>
      </div></section>

      <section id="people"><div className="wrap">
        <div className="sec-head">
          <div><span className="kicker">{c.peopleKicker}</span><h2>{c.peopleTitle}</h2></div>
          <p className="lead">{c.peopleLead}</p>
        </div>
        <div className="ct-founder">
          {img(profile.portrait, 'thumb') && <img src={img(profile.portrait, 'thumb')} alt={profile.name ?? ''} loading="lazy" />}
          <div>
            <span className="tm-disc management">{c.founder}</span>
            <b className="ct-fname">{profile.name}</b>
            {profile.role && <span className="tm-pos">{profile.role}</span>}
            {profile.summary && <p>{profile.summary}</p>}
            <Link className="btn btn-green" href={`/${l}/resume`}>{c.founderCta}</Link>
          </div>
        </div>
        <TeamGrid members={team.docs} disc={u.tDisc} labels={{ resume: u.tResume, profile: u.tProfile }} base={`/${l}/team`} />
      </div></section>

      <section id="markets"><div className="wrap">
        <h2>{c.marketsTitle}</h2>
        {countries.map((k) => (
          <div className="ct-market" key={k}>
            <b>{COUNTRY_NAME[k][l]}</b>
            <div className="city-chips">{CITY_PAGES.filter((x) => x.country === k).map((x) => <Link key={x.slug} href={`/${l}${cityPath(x)}`}>📍 {x[l].name}</Link>)}</div>
          </div>
        ))}
      </div></section>

      <section id="request" className="ct-request"><div className="wrap">
        <h2>{c.formTitle}</h2>
        <p className="lead" style={{ marginBottom: 22 }}>{c.formLead}</p>
        <ContractForm u={u} f={c.f} lang={l} submitLabel={c.cta} defaultCountry={DEFAULT_COUNTRY[l]}
          groups={groups.map((g) => ({ title: g.title, items: g.items.map((s) => ({ v: s.v, label: s.l[l] })) }))} />
      </div></section>
    </main>
  )
}
