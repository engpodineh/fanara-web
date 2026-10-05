import { NextResponse, type NextRequest } from 'next/server'

// "/" → best language from the browser. Unknown languages (e.g. Kurdish) go to Arabic: Iraq is the main market.
export function middleware(req: NextRequest) {
  const al = (req.headers.get('accept-language') || '').toLowerCase()
  const first = al.split(',').map((s) => s.trim().slice(0, 2)).find((s) => ['ar', 'fa', 'en'].includes(s))
  const url = req.nextUrl.clone()
  url.pathname = `/${first || 'ar'}`
  return NextResponse.redirect(url, 307)
}
export const config = { matcher: ['/'] }
