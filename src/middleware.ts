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
      // Relative Location: behind nginx, req.nextUrl carries the internal host (localhost:3000).
      return new NextResponse(null, { status: 307, headers: { Location: `/${saved}` } })
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
