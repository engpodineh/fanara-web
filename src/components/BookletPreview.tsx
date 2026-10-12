'use client'
import { useEffect, useState } from 'react'

type B = { slug: string; title: string; sub: string; pages: number }
type T = { preview: string; pages: string; close: string; prev: string; next: string; locked: string; soon: string }

/** Read-only preview: watermarked page images only, no file links, right-click/drag disabled. */
export default function BookletPreview({ items, n, t }: { items: B[]; n: number; t: T }) {
  const [open, setOpen] = useState<B | null>(null)
  const [pg, setPg] = useState(1)
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowLeft') setPg((p) => Math.min(n + 1, p + 1))
      if (e.key === 'ArrowRight') setPg((p) => Math.max(1, p - 1))
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [open, n])
  const block = (e: React.SyntheticEvent) => e.preventDefault()
  return (
    <>
      <div className="ac-grid">
        {items.map((b) => (
          <button key={b.slug} type="button" className="ac-card" onClick={() => { setOpen(b); setPg(1) }} onContextMenu={block}>
            <img src={`/academy/${b.slug}/p1.webp`} alt="" draggable={false} loading="lazy" />
            <span className="ac-meta"><b>{b.title}</b><span>{b.sub}</span><span className="ac-pages">{b.pages} {t.pages} · <u>{t.preview}</u></span></span>
          </button>
        ))}
      </div>
      {open && (
        <div className="ac-view" role="dialog" aria-modal="true" aria-label={open.title} onClick={(e) => { if (e.target === e.currentTarget) setOpen(null) }} onContextMenu={block}>
          <div className="ac-box">
            <div className="ac-bar">
              <b>{open.title}</b>
              <span>{Math.min(pg, n)} / {n}</span>
              <button type="button" className="btn" onClick={() => setOpen(null)}>{t.close}</button>
            </div>
            <div className="ac-page">
              {pg <= n
                ? <img key={pg} src={`/academy/${open.slug}/p${pg}.webp`} alt="" draggable={false} onDragStart={block} />
                : <div className="ac-lock"><b>🔒 {t.soon}</b><p>{t.locked}</p></div>}
            </div>
            <div className="ac-nav">
              <button type="button" className="btn" disabled={pg <= 1} onClick={() => setPg((p) => p - 1)}>{t.prev}</button>
              <button type="button" className="btn btn-green" disabled={pg > n} onClick={() => setPg((p) => p + 1)}>{t.next}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
