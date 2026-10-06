'use client'
import { useEffect, useRef, useState } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }
type Texts = { aiOpen: string; aiTitle: string; aiSub: string; aiHello: string; aiPlaceholder: string; aiSend: string; aiLimit: string; aiFail: string; aiSuggest: string[] }

// Render assistant text safely: markdown links to site pages / WhatsApp / Instagram only, plus line breaks and **bold**.
function Rich({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  const re = /\[([^\]]{1,80})\]\(((?:\/[a-z]{2}(?:\/[\w\-/?=&]*)?)|https:\/\/(?:wa\.me|www\.instagram\.com|engfanara\.com)\/[\w\-/?=&.%]*)\)|\*\*([^*]{1,120})\*\*/g
  let last = 0, m: RegExpExecArray | null, k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1]) parts.push(<a key={k++} href={m[2]} target={m[2].startsWith('http') ? '_blank' : undefined} rel="noopener">{m[1]}</a>)
    else parts.push(<b key={k++}>{m[3]}</b>)
    last = re.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

export default function Assistant({ locale, t }: { locale: string; t: Texts }) {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState('')
  const end = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }) }, [msgs, busy, open])
  useEffect(() => { if (open) input.current?.focus() }, [open])

  async function ask(text: string) {
    const q = text.trim()
    if (!q || busy) return
    const next: Msg[] = [...msgs, { role: 'user', content: q }]
    setMsgs(next); setBusy(true); setNote('')
    try {
      const r = await fetch('/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ locale, messages: next }) })
      if (r.status === 429) { setNote(t.aiLimit); return }
      const d = await r.json()
      if (!r.ok || !d.reply) { setNote(t.aiFail); return }
      setMsgs([...next, { role: 'assistant', content: d.reply }])
    } catch { setNote(t.aiFail) } finally { setBusy(false) }
  }

  return (
    <>
      <button type="button" className="ai-fab" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={t.aiOpen}>
        <span aria-hidden>🤖</span><span className="ai-fab-t">{t.aiOpen}</span>
      </button>
      {open && (
        <div className="ai-panel" role="dialog" aria-label={t.aiTitle}>
          <div className="ai-head">
            <div><b>{t.aiTitle}</b><small>{t.aiSub}</small></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="✕">✕</button>
          </div>
          <div className="ai-body">
            <div className="ai-msg ai-bot">{t.aiHello}</div>
            {msgs.length === 0 && (
              <div className="ai-sugg">{t.aiSuggest.map((s) => <button key={s} type="button" onClick={() => ask(s)}>{s}</button>)}</div>
            )}
            {msgs.map((m, i) => <div key={i} className={`ai-msg ${m.role === 'user' ? 'ai-user' : 'ai-bot'}`}>{m.role === 'assistant' ? <Rich text={m.content} /> : m.content}</div>)}
            {busy && <div className="ai-msg ai-bot ai-typing"><i /><i /><i /></div>}
            {note && <div className="ai-note">{note}</div>}
            <div ref={end} />
          </div>
          <form className="ai-form" onSubmit={(e) => { e.preventDefault(); const v = input.current?.value || ''; if (input.current) input.current.value = ''; ask(v) }}>
            <textarea ref={input} rows={1} maxLength={1500} placeholder={t.aiPlaceholder}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); (e.currentTarget.form as HTMLFormElement).requestSubmit() } }} />
            <button type="submit" className="btn btn-maroon" disabled={busy}>{t.aiSend}</button>
          </form>
        </div>
      )}
    </>
  )
}
