import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'
const LANGS = [
  { code: 'ar', name: 'العربية', hint: 'العراق والدول العربية', dir: 'rtl' },
  { code: 'fa', name: 'فارسی', hint: 'ایران', dir: 'rtl' },
  { code: 'en', name: 'English', hint: 'International', dir: 'ltr' },
] as const

// First visit: ask for the language. The choice is remembered (cookie set by middleware on /{lang}).
export default async function Gate() {
  const al = ((await headers()).get('accept-language') || '').toLowerCase()
  const guess = al.split(',').map((s) => s.trim().slice(0, 2)).find((s) => ['ar', 'fa', 'en'].includes(s)) || 'ar'
  return (
    <main className="gate">
      <style>{CSS}</style>
      <div className="g-card">
        <img className="g-logo" src="/logo-mark.png" alt="" width={84} height={84} />
        <p className="g-brand" dir="ltr"><b><span>Eng.</span>Fanara</b></p>
        <p className="g-q">اختر اللغة · زبان را انتخاب کنید · Choose your language</p>
        <div className="g-list">
          {LANGS.map((l) => (
            <a key={l.code} href={`/${l.code}`} dir={l.dir} className={l.code === guess ? 'on' : undefined} lang={l.code}>
              <b>{l.name}</b><small>{l.hint}</small>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}

const CSS = `
:root{--green:#285A35;--gold:#F4B321;--maroon:#741729;--bg:#F5F5F2;--surface:#fff;--ink:#1E2124;--muted:#5D6461;--rule:#DCDDD6}
@media (prefers-color-scheme:dark){:root{--bg:#151719;--surface:#1E2124;--ink:#ECEDE8;--muted:#A3A9A4;--rule:#30343A;--green:#5FAE7E}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Vazirmatn,Tahoma,sans-serif}
.gate{min-height:100dvh;display:grid;place-items:center;padding:24px 16px;background:radial-gradient(1200px 500px at 50% -10%,rgba(244,179,33,.18),transparent),var(--bg)}
.g-card{width:100%;max-width:440px;text-align:center}
.g-logo{display:block;margin:0 auto 8px;height:84px;width:auto}
.g-brand{margin:0 0 6px;font:700 30px Montserrat,sans-serif;color:var(--maroon)}.g-brand span{color:var(--gold)}
.g-q{margin:0 0 22px;color:var(--muted);font-size:14px}
.g-list{display:grid;gap:12px}
.g-list a{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 20px;border:1px solid var(--rule);border-radius:12px;background:var(--surface);color:var(--ink);text-decoration:none;transition:border-color .15s,transform .15s}
.g-list a:hover,.g-list a:focus-visible{border-color:var(--green);transform:translateY(-1px)}
.g-list a.on{border:2px solid var(--gold)}
.g-list b{font-size:20px}.g-list a[lang=en] b{font-family:Barlow,sans-serif}
.g-list small{color:var(--muted);font-size:13px}
`
