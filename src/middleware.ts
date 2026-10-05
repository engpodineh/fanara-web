import { NextResponse, type NextRequest } from 'next/server'

const LANGS = ['ar', 'fa', 'en']
const COOKIE = 'lang'

// "/" → first visit shows the language picker; later visits go straight to the remembered language.
// Any visit to /{lang}/… remembers that language for a year.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname === '/') {
    const saved = req.cookies.get(COOKIE)?.value
    if (saved && LANGS.includes(saved)) {
      // Behind nginx, req.nextUrl carries the internal host (localhost:3000): rebuild from the public Host header.
      const h = (req.headers.get('x-forwarded-host') || req.headers.get('host') || '').toLowerCase()
      const local = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(h)
      const host = local || ['engfanara.com', 'www.engfanara.com'].includes(h) ? h : 'engfanara.com'
      const proto = local ? 'http' : 'https'
      return NextResponse.redirect(new URL(`/${saved}`, `${proto}://${host}`), 307)
    }
    return NextResponse.next()
  }
  const lang = pathname.split('/')[1]
  const res = NextResponse.next()
  if (LANGS.includes(lang) && req.cookies.get(COOKIE)?.value !== lang) {
    res.cookies.set(COOKIE, lang, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
  }
  return res
}
export const config = { matcher: ['/', '/ar/:path*', '/fa/:path*', '/en/:path*'] }
