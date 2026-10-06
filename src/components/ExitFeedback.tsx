'use client'
import { useEffect, useRef, useState } from 'react'

type Texts = { fbTitle: string; fbPlaceholder: string; fbSend: string; fbLater: string; fbThanks: string }
const KEY = 'fanara-feedback-shown'
const DAYS = 30

// Exit-intent comment box: desktop = cursor leaves through the top of the window;
// phone = after 25s on the site, a fast scroll back up (typical "about to leave" gesture).
// Shown at most once per visitor every 30 days.
export default function ExitFeedback({ u, locale }: { u: Texts; locale: string }) {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    let seen = false
    try { const t = Number(localStorage.getItem(KEY) || 0); seen = Date.now() - t < DAYS * 864e5 } catch { /* storage blocked */ }
    if (seen) return
    const start = Date.now()
    const show = () => {
      if (Date.now() - start < 8000) return
      setOpen(true)
      try { localStorage.setItem(KEY, String(Date.now())) } catch { /* ignore */ }
      cleanup()
    }
    const onMouseOut = (e: MouseEvent) => { if (!e.relatedTarget && e.clientY <= 0) show() }
    let lastY = window.scrollY, lastT = Date.now()
    const onScroll = () => {
      const y = window.scrollY, now = Date.now()
      const speed = (lastY - y) / Math.max(1, now - lastT) // px per ms, positive = scrolling up
      if (now - start > 25000 && speed > 2.5 && y < lastY && lastY > 400) show()
      lastY = y; lastT = now
    }
    document.addEventListener('mouseout', onMouseOut)
    window.addEventListener('scroll', onScroll, { passive: true })
    const cleanup = () => { document.removeEventListener('mouseout', onMouseOut); window.removeEventListener('scroll', onScroll) }
    return cleanup
  }, [])

  useEffect(() => { if (open) ref.current?.focus() }, [open])
  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', esc); return () => window.removeEventListener('keydown', esc)
  }, [open])

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('website')) { setState('done'); return } // honeypot: bots fill hidden fields
    const message = String(f.get('message') || '').trim()
    if (!message) return
    setState('sending')
    try {
      const r = await fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, locale, page: location.pathname }) })
      setState(r.ok ? 'done' : 'error')
      if (r.ok) setTimeout(() => setOpen(false), 1800)
    } catch { setState('error') }
  }

  if (!open) return null
  return (
    <div className="fb-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
      <div className="fb-box" role="dialog" aria-modal="true" aria-labelledby="fb-title">
        {state === 'done' ? <p className="fb-thanks">{u.fbThanks}</p> : (
          <form onSubmit={send}>
            <p id="fb-title" className="fb-title">{u.fbTitle}</p>
            <textarea ref={ref} name="message" rows={4} maxLength={2000} required placeholder={u.fbPlaceholder} />
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="fb-hp" aria-hidden="true" />
            <div className="fb-actions">
              <button type="button" className="btn fb-later" onClick={() => setOpen(false)}>{u.fbLater}</button>
              <button type="submit" className="btn btn-maroon" disabled={state === 'sending'}>{u.fbSend}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
