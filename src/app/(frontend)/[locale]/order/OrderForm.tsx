'use client'
import { useState } from 'react'
import type { UI } from '@/lib/i18n'

const MAX_MB = 50

export default function OrderForm({ u, services }: { u: UI; services: { id: number | string; title: string }[] }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed' | 'tooBig'>('idle')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    const f = new FormData(e.currentTarget)
    if ((f.getAll('files') as File[]).some((x) => x.size > MAX_MB * 1024 * 1024)) { setState('tooBig'); return }
    try {
      const fileIds: (number | string)[] = []
      for (const file of f.getAll('files') as File[]) {
        if (!file.size) continue
        const fd = new FormData(); fd.append('file', file)
        const r = await fetch('/api/order-files', { method: 'POST', body: fd })
        if (!r.ok) throw new Error('upload')
        fileIds.push((await r.json()).doc.id)
      }
      const num = (k: string) => (f.get(k) ? Number(f.get(k)) : undefined)
      const body = {
        name: f.get('name'), phone: f.get('phone'), email: f.get('email') || undefined,
        country: f.get('country'), city: f.get('city'), projectType: f.get('projectType'),
        area: num('area'), floors: num('floors'), deadline: f.get('deadline'), notes: f.get('notes'),
        services: f.getAll('services').map(Number), files: fileIds,
      }
      const r = await fetch('/api/design-orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!r.ok) throw new Error('order')
      setState('sent')
    } catch {
      setState('failed')
    }
  }

  if (state === 'sent') return <p className="ok">{u.sent}</p>
  return (
    <form className="order" onSubmit={submit}>
      <div className="row">
        <label>{u.name}<input id="name" name="name" required /></label>
        <label>{u.phone}<input id="phone" name="phone" required dir="ltr" inputMode="tel" /></label>
      </div>
      <div className="row">
        <label>{u.email}<input id="email" name="email" type="email" dir="ltr" /></label>
        <label>{u.projectType}<select id="projectType" name="projectType" required defaultValue="residential">
          {Object.entries(u.types).map(([v, label]) => <option key={v} value={v}>{label}</option>)}
        </select></label>
      </div>
      <div className="row">
        <label>{u.country}<input id="country" name="country" /></label>
        <label>{u.city}<input id="city" name="city" /></label>
      </div>
      <div className="row">
        <label>{u.area}<input id="area" name="area" type="number" min="0" /></label>
        <label>{u.floors}<input id="floors" name="floors" type="number" min="0" /></label>
      </div>
      <fieldset><legend>{u.services}</legend>
        {services.map((s) => <label key={s.id}><input type="checkbox" name="services" value={s.id} />{s.title}</label>)}
      </fieldset>
      <label>{u.files}<input id="files" name="files" type="file" multiple accept=".pdf,.dwg,.zip,image/*" /></label>
      <label>{u.deadline}<input id="deadline" name="deadline" /></label>
      <label>{u.notes}<textarea id="notes" name="notes" rows={4} /></label>
      {state === 'failed' && <p className="err">{u.failed}</p>}
      {state === 'tooBig' && <p className="err">{u.tooBig}</p>}
      <div><button className="btn btn-maroon" type="submit" disabled={state === 'sending'}>{state === 'sending' ? u.sending : u.submit}</button></div>
    </form>
  )
}
