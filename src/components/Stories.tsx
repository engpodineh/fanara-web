'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

export type StoryItem = { id: string | number; thumb?: string; full?: string; caption?: string | null; igId?: string | null; link?: string | null }
type Texts = { close: string; prev: string; next: string; openIg: string; reel: string; cmTitle: string; cmName: string; cmMsg: string; cmSend: string; cmEmpty: string; cmNoLinks: string; cmFail: string }
type Comment = { id: number; name: string; message: string; createdAt: string }

// Instagram-style highlights: circles that open a full-screen viewer.
// Photos auto-advance after 6s; Instagram reels play inside the site (official embed) with a link to the original.
export default function Stories({ items, t, layout = 'strip' }: { items: StoryItem[]; t: Texts; layout?: 'strip' | 'grid' }) {
  const [idx, setIdx] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const touchX = useRef<number | null>(null)
  const cur = idx === null ? null : items[idx]
  const [comments, setComments] = useState<Comment[]>([])
  const [sheet, setSheet] = useState(false)
  const [cmState, setCmState] = useState<'idle' | 'sending' | 'error' | 'links'>('idle')
  const [name, setName] = useState('')

  useEffect(() => { try { setName(localStorage.getItem('fanara-cm-name') || '') } catch { /* storage blocked */ } }, [])
  // load visible comments for the open highlight
  useEffect(() => {
    setComments([]); setSheet(false); setCmState('idle')
    if (!cur) return
    let off = false
    fetch(`/api/highlight-comments?where[highlight][equals]=${cur.id}&sort=-createdAt&limit=100&depth=0`)
      .then((r) => r.json()).then((d) => { if (!off) setComments(d.docs || []) }).catch(() => {})
    return () => { off = true }
  }, [cur])

  async function sendComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!cur) return
    const f = new FormData(e.currentTarget)
    if (f.get('website')) return
    const n = String(f.get('name') || '').trim(), m = String(f.get('message') || '').trim()
    if (!n || !m) return
    if (/(https?:\/\/|www\.)/i.test(n + m)) { setCmState('links'); return }
    setCmState('sending')
    try {
      const r = await fetch('/api/highlight-comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ highlight: cur.id, name: n, message: m }) })
      if (!r.ok) throw new Error()
      const d = await r.json()
      setComments((c) => [d.doc, ...c]); setCmState('idle'); (e.target as HTMLFormElement).reset()
      try { localStorage.setItem('fanara-cm-name', n); setName(n) } catch { /* ignore */ }
    } catch { setCmState('error') }
  }

  const close = useCallback(() => setIdx(null), [])
  const go = useCallback((d: number) => setIdx((i) => {
    if (i === null) return i
    const n = i + d
    return n < 0 || n >= items.length ? null : n
  }), [items.length])

  // auto-advance photos (not reels)
  useEffect(() => {
    if (!cur || cur.igId || sheet) { if (!sheet) setProgress(0); return }
    setProgress(0)
    const start = Date.now()
    const timer = setInterval(() => {
      const p = (Date.now() - start) / 6000
      if (p >= 1) { clearInterval(timer); go(1) } else setProgress(p)
    }, 60)
    return () => clearInterval(timer)
  }, [cur, go, sheet])

  useEffect(() => {
    if (idx === null) return
    const rtl = document.documentElement.dir === 'rtl'
    const key = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest?.('.st-sheet')) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') go(rtl ? -1 : 1)
      if (e.key === 'ArrowLeft') go(rtl ? 1 : -1)
    }
    window.addEventListener('keydown', key)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = prevOverflow }
  }, [idx, close, go])

  return (
    <>
      <div className={layout === 'grid' ? 'hl hl-grid' : 'hl'}>
        {items.map((h, i) => (
          <figure key={h.id}>
            <button type="button" className="ring" onClick={() => setIdx(i)} aria-label={h.caption || t.reel}>
              <img src={h.thumb} alt="" loading="lazy" />
              {h.igId && <span className="hl-badge" aria-hidden>▶</span>}
            </button>
            {h.caption && <figcaption>{h.caption}</figcaption>}
          </figure>
        ))}
      </div>

      {cur && (
        <div className="st-view" role="dialog" aria-modal="true" aria-label={cur.caption || t.reel}
          onTouchStart={(e) => { touchX.current = (e.target as HTMLElement).closest('.st-sheet') ? null : e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current; touchX.current = null
            if (Math.abs(dx) > 50) { const rtl = document.documentElement.dir === 'rtl'; go((dx < 0) !== rtl ? 1 : -1) }
          }}>
          <div className="st-bars">
            {items.map((_, i) => <span key={i}><i style={{ width: i < idx! ? '100%' : i === idx ? `${cur.igId ? 100 : progress * 100}%` : '0%' }} /></span>)}
          </div>
          <button type="button" className="st-close" onClick={close} aria-label={t.close}>✕</button>
          <div className="st-stage">
            {cur.igId ? (
              <iframe key={cur.igId} className="st-reel" src={`https://www.instagram.com/reel/${cur.igId}/embed/`} title={cur.caption || t.reel}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen loading="lazy" />
            ) : (
              <img key={String(cur.id)} className="st-img" src={cur.full || cur.thumb} alt={cur.caption || ''} />
            )}
          </div>
          <div className="st-foot">
            {cur.caption && <p>{cur.caption}</p>}
            <div className="st-actions">
              <button type="button" className="btn st-cm-btn" onClick={() => setSheet((s) => !s)} aria-expanded={sheet}>💬 {t.cmTitle} ({comments.length})</button>
              {cur.link && <a href={cur.link} target="_blank" rel="noopener" className="btn btn-gold">{t.openIg}</a>}
            </div>
          </div>
          {sheet && (
            <div className="st-sheet" role="region" aria-label={t.cmTitle}>
              <form onSubmit={sendComment} className="st-cm-form">
                <input name="name" defaultValue={name} maxLength={40} required placeholder={t.cmName} />
                <textarea name="message" maxLength={500} rows={2} required placeholder={t.cmMsg} />
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="fb-hp" aria-hidden="true" />
                <button type="submit" className="btn btn-maroon" disabled={cmState === 'sending'}>{t.cmSend}</button>
                {cmState === 'links' && <p className="st-cm-err">{t.cmNoLinks}</p>}
                {cmState === 'error' && <p className="st-cm-err">{t.cmFail}</p>}
              </form>
              <ul className="st-cm-list">
                {comments.length === 0 && <li className="st-cm-empty">{t.cmEmpty}</li>}
                {comments.map((c) => (
                  <li key={c.id}><b>{c.name}</b><span>{c.message}</span><time dateTime={c.createdAt}>{new Date(c.createdAt).toLocaleDateString(document.documentElement.lang === 'fa' ? 'fa-IR' : document.documentElement.lang === 'ar' ? 'ar-IQ' : 'en-GB')}</time></li>
                ))}
              </ul>
            </div>
          )}
          <button type="button" className="st-nav st-prev" onClick={() => go(-1)} aria-label={t.prev}>‹</button>
          <button type="button" className="st-nav st-next" onClick={() => go(1)} aria-label={t.next}>›</button>
        </div>
      )}
    </>
  )
}
