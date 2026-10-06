'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

export type StoryItem = { id: string | number; thumb?: string; full?: string; caption?: string | null; igId?: string | null; link?: string | null }
type Texts = { close: string; prev: string; next: string; openIg: string; reel: string }

// Instagram-style highlights: circles that open a full-screen viewer.
// Photos auto-advance after 6s; Instagram reels play inside the site (official embed) with a link to the original.
export default function Stories({ items, t, layout = 'strip' }: { items: StoryItem[]; t: Texts; layout?: 'strip' | 'grid' }) {
  const [idx, setIdx] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const touchX = useRef<number | null>(null)
  const cur = idx === null ? null : items[idx]

  const close = useCallback(() => setIdx(null), [])
  const go = useCallback((d: number) => setIdx((i) => {
    if (i === null) return i
    const n = i + d
    return n < 0 || n >= items.length ? null : n
  }), [items.length])

  // auto-advance photos (not reels)
  useEffect(() => {
    if (!cur || cur.igId) { setProgress(0); return }
    setProgress(0)
    const start = Date.now()
    const timer = setInterval(() => {
      const p = (Date.now() - start) / 6000
      if (p >= 1) { clearInterval(timer); go(1) } else setProgress(p)
    }, 60)
    return () => clearInterval(timer)
  }, [cur, go])

  useEffect(() => {
    if (idx === null) return
    const rtl = document.documentElement.dir === 'rtl'
    const key = (e: KeyboardEvent) => {
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
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
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
            {cur.link && <a href={cur.link} target="_blank" rel="noopener" className="btn btn-gold">{t.openIg}</a>}
          </div>
          <button type="button" className="st-nav st-prev" onClick={() => go(-1)} aria-label={t.prev}>‹</button>
          <button type="button" className="st-nav st-next" onClick={() => go(1)} aria-label={t.next}>›</button>
        </div>
      )}
    </>
  )
}
