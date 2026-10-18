'use client'
import { useState } from 'react'
import type { UI } from '@/lib/i18n'

const MAX_MB = 50
type Opt = { v: string; label: string }
type F = { company: string; role: string; roles: Record<string, string>; scopes: string; contract: string; contracts: Record<string, string>; start: string; units: string; sent: string }

export default function ContractForm({ u, f, lang, groups, defaultCountry, submitLabel }: { u: UI; f: F; lang: string; submitLabel: string; groups: { title: string; items: Opt[] }[]; defaultCountry: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed' | 'tooBig'>('idle')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('website')) { setState('sent'); return }
    if ((fd.getAll('files') as File[]).some((x) => x.size > MAX_MB * 1024 * 1024)) { setState('tooBig'); return }
    setState('sending')
    try {
      const files: (number | string)[] = []
      for (const file of fd.getAll('files') as File[]) {
        if (!file.size) continue
        const up = new FormData(); up.append('file', file)
        const r = await fetch('/api/order-files', { method: 'POST', body: up })
        if (!r.ok) throw new Error('upload')
        files.push((await r.json()).doc.id)
      }
      const s = (k: string) => String(fd.get(k) ?? '').trim() || undefined
      const body = {
        name: s('name'), company: s('company'), role: s('role'), phone: s('phone'), email: s('email'),
        country: s('country'), city: s('city'), scopes: fd.getAll('scopes').map(String), contractType: s('contractType'),
        projectType: s('projectType'), area: fd.get('area') ? Number(fd.get('area')) : undefined, units: s('units'), start: s('start'),
        notes: s('notes'), files, lang,
      }
      const r = await fetch('/api/contract-requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!r.ok) throw new Error('request')
      setState('sent')
    } catch {
      setState('failed')
    }
  }

  if (state === 'sent') return <p className="ok">{f.sent}</p>
  return (
    <form className="order ct-form" onSubmit={submit}>
      <div className="row">
        <label>{u.name}<input name="name" required maxLength={120} autoComplete="name" /></label>
        <label>{f.company}<input name="company" maxLength={160} autoComplete="organization" /></label>
      </div>
      <div className="row">
        <label>{u.phone}<input name="phone" required dir="ltr" inputMode="tel" maxLength={40} autoComplete="tel" /></label>
        <label>{u.email}<input name="email" type="email" dir="ltr" autoComplete="email" /></label>
      </div>
      <div className="row">
        <label>{f.role}<select name="role" defaultValue="employer">{Object.entries(f.roles).map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></label>
        <label>{u.projectType}<select name="projectType" defaultValue="residential">{Object.entries(u.types).map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></label>
      </div>
      <div className="row">
        <label>{u.country}<input name="country" defaultValue={defaultCountry} maxLength={60} /></label>
        <label>{u.city}<input name="city" maxLength={80} /></label>
      </div>
      <fieldset className="ct-scopes"><legend>{f.scopes}</legend>
        {groups.map((g) => (
          <div key={g.title} className="ct-sg"><b>{g.title}</b>
            {g.items.map((o) => <label key={o.v}><input type="checkbox" name="scopes" value={o.v} />{o.label}</label>)}
          </div>
        ))}
      </fieldset>
      <div className="row">
        <label>{f.contract}<select name="contractType" defaultValue="unit-price">{Object.entries(f.contracts).map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></label>
        <label>{u.area}<input name="area" type="number" min="0" /></label>
      </div>
      <div className="row">
        <label>{f.units}<input name="units" maxLength={60} /></label>
        <label>{f.start}<input name="start" maxLength={80} /></label>
      </div>
      <label>{u.files}<input name="files" type="file" multiple accept=".pdf,.dwg,.zip,.xlsx,.xls,image/*" /></label>
      <label>{u.notes}<textarea name="notes" rows={4} maxLength={4000} /></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="fb-hp" aria-hidden="true" />
      {state === 'failed' && <p className="err">{u.failed}</p>}
      {state === 'tooBig' && <p className="err">{u.tooBig}</p>}
      <div><button className="btn btn-maroon" type="submit" disabled={state === 'sending'}>{state === 'sending' ? u.sending : submitLabel}</button></div>
    </form>
  )
}
