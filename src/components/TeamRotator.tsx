'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type M = { id: number | string; photo?: string; name: string; position: string }

/** Hero strip: team portraits rotating every few seconds (cross-fade), linking to the team page. */
export default function TeamRotator({ members, label, href }: { members: M[]; label: string; href: string }) {
  const list = members.filter((m) => m.photo)
  const [i, setI] = useState(0)
  useEffect(() => {
    if (list.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((x) => (x + 1) % list.length), 3500)
    return () => clearInterval(t)
  }, [list.length])
  if (!list.length) return null
  const cur = list[i]
  return (
    <Link href={href} className="team-rot" aria-label={label}>
      <span className="tr-ring"><span className="tr-clip">
        {list.map((m, k) => (
          <img key={m.id} src={m.photo} alt={k === i ? m.name : ''} className={k === i ? 'on' : ''} loading={k < 2 ? 'eager' : 'lazy'} />
        ))}
      </span></span>
      <span className="tr-txt" aria-live="polite">
        <small>{label}</small>
        <b key={`n${cur.id}`}>{cur.name}</b>
        <span key={`p${cur.id}`}>{cur.position}</span>
      </span>
      <span className="tr-dots" aria-hidden="true">{list.map((m, k) => <i key={m.id} className={k === i ? 'on' : ''} />)}</span>
    </Link>
  )
}
