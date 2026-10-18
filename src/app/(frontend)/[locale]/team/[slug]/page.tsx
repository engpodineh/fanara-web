import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { payload, img } from '@/lib/payload'
import { isLocale, t, type Locale } from '@/lib/i18n'
import { SITE, hreflang, OG_LOCALE } from '@/lib/seo'
import { CONTRACTING } from '@/lib/contracting-content'

export const dynamic = 'force-dynamic'

const L: Record<Locale, { docs: string; docsLead: string; view: string; download: string; resume: string; back: string; contact: string; hire: string; kinds: Record<string, string> }> = {
  fa: { docs: 'رزومه، نامه‌ها و مدارک', docsLead: 'فایل‌ها را آنلاین ببینید یا دانلود کنید.', view: 'مشاهده', download: 'دانلود', resume: 'سوابق کاری', back: 'بازگشت به تیم', contact: 'راه‌های ارتباط', hire: 'درخواست همکاری / پیمانکاری', kinds: { resume: 'رزومه', 'cover-letter': 'نامه', portfolio: 'نمونه‌کار', certificate: 'مدرک', poster: 'پوستر', other: 'فایل' } },
  ar: { docs: 'السيرة الذاتية والرسائل والوثائق', docsLead: 'اعرض الملفات مباشرة أو حمّلها.', view: 'عرض', download: 'تحميل', resume: 'الخبرات', back: 'العودة إلى الفريق', contact: 'التواصل', hire: 'اطلب التعاون / المقاولة', kinds: { resume: 'سيرة ذاتية', 'cover-letter': 'رسالة', portfolio: 'أعمال', certificate: 'شهادة', poster: 'بوستر', other: 'ملف' } },
  en: { docs: 'Résumé, letters and documents', docsLead: 'View the files online or download them.', view: 'View', download: 'Download', resume: 'Experience', back: 'Back to team', contact: 'Contact', hire: 'Hire / request contracting', kinds: { resume: 'Résumé', 'cover-letter': 'Letter', portfolio: 'Portfolio', certificate: 'Certificate', poster: 'Poster', other: 'File' } },
  tr: { docs: 'Özgeçmiş, yazılar ve belgeler', docsLead: 'Dosyaları çevrimiçi görüntüleyin veya indirin.', view: 'Görüntüle', download: 'İndir', resume: 'Deneyim', back: 'Ekibe dön', contact: 'İletişim', hire: 'İş birliği / taşeronluk talebi', kinds: { resume: 'Özgeçmiş', 'cover-letter': 'Ön yazı', portfolio: 'Portföy', certificate: 'Belge', poster: 'Afiş', other: 'Dosya' } },
}

async function load(l: Locale, slug: string) {
  const r = await (await payload()).find({ collection: 'team', locale: l, where: { and: [{ slug: { equals: slug } }, { published: { equals: true } }] }, limit: 1, depth: 1 })
  return r.docs[0]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const m = await load(locale, slug)
  if (!m) return {}
  const path = `/team/${slug}`, title = `${m.name} — ${m.position} | Fanara`
  const photo = img(m.photo, 'card')
  return {
    title, description: m.bio ?? m.position,
    alternates: { canonical: `/${locale}${path}`, languages: hreflang(path) },
    openGraph: { type: 'profile', title, description: m.bio ?? m.position, url: `/${locale}${path}`, locale: OG_LOCALE[locale], images: photo ? [{ url: photo }] : ['/og.jpg'] },
  }
}

type Doc = { id?: string | null; title: string; kind: string; lang?: string | null; file: any; preview?: any }

export default async function Member({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale, u = t(l), x = L[l]
  const m = await load(l, slug)
  if (!m) notFound()
  const docs = ((m.documents ?? []) as Doc[]).filter((d) => d.file && typeof d.file === 'object' && d.file.url)
  const cv = (m.resume ?? '').split('\n').map((s) => s.trim()).filter(Boolean)
  const wa = m.whatsapp ? `https://wa.me/${m.whatsapp.replace(/\D/g, '')}` : null
  const ig = m.instagram?.replace(/^@/, '').trim()
  const ld = {
    '@context': 'https://schema.org', '@type': 'Person', name: m.name, jobTitle: m.position, description: m.bio ?? undefined,
    image: img(m.photo, 'card') ? `${SITE}${img(m.photo, 'card')}` : undefined, url: `${SITE}/${l}/team/${slug}`,
    worksFor: { '@id': `${SITE}/#org` }, email: m.email ? `mailto:${m.email}` : undefined,
  }
  return (
    <main className="page"><div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <nav className="crumbs" aria-label="breadcrumb"><Link href={`/${l}`}>Fanara</Link> / <Link href={`/${l}/team`}>{u.navTeam}</Link> / {m.name}</nav>
      <div className="mb-head">
        {img(m.photo, 'card') && <img className="mb-photo" src={img(m.photo, 'card')} alt={`${m.name} — ${m.position}`} />}
        <div className="mb-info">
          <span className={`tm-disc ${m.discipline}`}>{(u.tDisc as Record<string, string>)[m.discipline] ?? ''}</span>
          <h1>{m.name}</h1>
          <p className="mb-pos">{m.position}</p>
          {m.bio && <p className="mb-bio">{m.bio}</p>}
          <div className="mb-contact" aria-label={x.contact}>
            {wa && <a className="btn btn-green" href={wa} target="_blank" rel="noopener nofollow" dir="ltr">WhatsApp {m.whatsapp}</a>}
            {m.phone && <a className="btn btn-line" href={`tel:${m.phone.replace(/[^\d+]/g, '')}`} dir="ltr">{m.phone}</a>}
            {m.email && <a className="btn btn-line" href={`mailto:${m.email}`} dir="ltr">{m.email}</a>}
            {ig && <a className="btn btn-line" href={`https://www.instagram.com/${ig}/`} target="_blank" rel="noopener nofollow" dir="ltr">@{ig}</a>}
          </div>
          <Link className="btn btn-maroon" href={`/${l}/contracting#request`}>{x.hire}</Link>
        </div>
      </div>

      {!!docs.length && (
        <section className="mb-docs" id="documents">
          <h2>{x.docs}</h2>
          <p className="lead">{x.docsLead}</p>
          <div className="mb-grid">
            {docs.map((d, i) => {
              const isPdf = String(d.file.mimeType ?? '').includes('pdf') || /\.pdf$/i.test(d.file.filename ?? '')
              const thumb = img(d.preview, 'card') || (!isPdf ? img(d.file, 'card') : undefined)
              return (
                <figure className="mb-doc" key={d.id ?? i}>
                  <a className="mb-thumb" href={d.file.url} target="_blank" rel="noopener">
                    {thumb ? <img src={thumb} alt={d.title} loading="lazy" /> : <span className="mb-pdf">PDF</span>}
                    {isPdf && <span className="mb-badge">PDF</span>}
                  </a>
                  <figcaption>
                    <span className="mb-kind">{x.kinds[d.kind] ?? x.kinds.other}{d.lang ? ` · ${d.lang}` : ''}</span>
                    <b>{d.title}</b>
                    <span className="mb-actions">
                      <a className="btn btn-line" href={d.file.url} target="_blank" rel="noopener">{x.view}</a>
                      <a className="btn btn-green" href={d.file.url} download={d.file.filename ?? true}>{x.download}</a>
                    </span>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </section>
      )}

      {!!cv.length && (
        <section className="mb-cv">
          <h2>{x.resume}</h2>
          <ul className="svc-points">{cv.map((c, i) => <li key={i}>{c}</li>)}</ul>
        </section>
      )}

      <div className="ctas" style={{ marginTop: 28 }}>
        <Link className="btn btn-line" href={`/${l}/team`}>{x.back}</Link>
        <Link className="btn btn-maroon" href={`/${l}/contracting`}>{CONTRACTING[l].nav}</Link>
      </div>
    </div></main>
  )
}
