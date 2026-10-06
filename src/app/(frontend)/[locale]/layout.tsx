import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import './site.css'
import { dir, isLocale, locales, t } from '@/lib/i18n'
import { SITE, jsonLd } from '@/lib/seo'
import { payload } from '@/lib/payload'
import { SERVICE_PAGES } from '@/lib/services-content'
import { CITY_PAGES } from '@/lib/cities-content'
import ExitFeedback from '@/components/ExitFeedback'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Eng.Fanara · فن‌آرا',
  icons: { icon: '/logo-mark.png', apple: '/logo-mark.png' },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } : undefined,
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large' } as Metadata['robots'],
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const u = t(locale)
  const profile = await (await payload()).findGlobal({ slug: 'profile', locale }).catch(() => null)
  const ld = jsonLd(locale, (profile as any)?.contact ?? (profile as any))
  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;800&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600;700&family=Montserrat:wght@700&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      </head>
      <body>
        <header className="top">
          <div className="wrap">
            <Link className="brand" href={`/${locale}`} aria-label="Eng.Fanara">
              <img src="/logo-mark.png" alt="" />
              <span className="wm"><b><span>Eng.</span>Fanara</b><small>Professional Engineering &amp; Construction</small></span>
            </Link>
            <nav className="nav" aria-label="Main">
              <Link href={`/${locale}/services`}>{u.svcNav}</Link>
              <Link href={`/${locale}/resume`}>{u.navAbout}</Link>
              <Link href={`/${locale}#projects`}>{u.navProjects}</Link>
              <Link href={`/${locale}/gallery`}>{u.navGallery}</Link>
              <Link href={`/${locale}/order`}>{u.navServices}</Link>
              <Link href={`/${locale}#contact`}>{u.navContact}</Link>
            </nav>
            <div className="langs" role="group" aria-label="Language">
              {locales.map((l) => (
                <Link key={l} href={`/${l}`} aria-current={l === locale} style={{ padding: '6px 11px', textDecoration: 'none', fontSize: 13, background: l === locale ? 'var(--gold)' : undefined, color: l === locale ? 'var(--char-2)' : 'var(--muted)' }}>
                  {l === 'fa' ? 'فا' : l === 'ar' ? 'ع' : 'EN'}
                </Link>
              ))}
            </div>
          </div>
        </header>
        {children}
        <ExitFeedback locale={locale} u={{ fbTitle: u.fbTitle, fbPlaceholder: u.fbPlaceholder, fbSend: u.fbSend, fbLater: u.fbLater, fbThanks: u.fbThanks }} />
        <footer>
          <div className="wrap foot-svc" aria-label={u.svcNav}>
            {SERVICE_PAGES.map((s) => <Link key={s.slug} href={`/${locale}/services/${s.slug}`}>{s[locale].h1}</Link>)}
            {CITY_PAGES.map((c) => <Link key={c.slug} href={`/${locale}/iraq/${c.slug}`}>📍 {c[locale].name}</Link>)}
          </div>
          <div className="wrap"><span>{u.foot}</span><span className="en">engfanara.com</span></div>
        </footer>
      </body>
    </html>
  )
}
