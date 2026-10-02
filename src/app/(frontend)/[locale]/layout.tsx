import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import './site.css'
import { dir, isLocale, locales, t } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Eng.Fanara · فن‌آرا',
  description: 'Fanara Engineering — MEP design and execution. Omid Podineh, Mechanical Engineer.',
}
export function generateStaticParams() { return locales.map((locale) => ({ locale })) }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const u = t(locale)
  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;800&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600;700&family=Montserrat:wght@700&display=swap" />
      </head>
      <body>
        <header className="top">
          <div className="wrap">
            <Link className="brand" href={`/${locale}`} aria-label="Eng.Fanara">
              <img src="/logo-mark.png" alt="" />
              <span className="wm"><b><span>Eng.</span>Fanara</b><small>Professional Engineering &amp; Construction</small></span>
            </Link>
            <nav className="nav" aria-label="Main">
              <Link href={`/${locale}/resume`}>{u.navAbout}</Link>
              <Link href={`/${locale}#projects`}>{u.navProjects}</Link>
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
        <footer><div className="wrap"><span>{u.foot}</span><span className="en">engfanara.com</span></div></footer>
      </body>
    </html>
  )
}
