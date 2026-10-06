import { img } from '@/lib/payload'
import type { Team } from '@/payload-types'

const wa = (n: string) => `https://wa.me/${n.replace(/\D/g, '')}`

export default function TeamGrid({ members, disc, labels }: { members: Team[]; disc: Record<string, string>; labels?: { resume: string } }) {
  return (
    <div className="team-grid">
      {members.map((m) => {
        const links = [
          m.whatsapp && { href: wa(m.whatsapp), t: 'WhatsApp' },
          m.phone && { href: `tel:${m.phone.replace(/[^\d+]/g, '')}`, t: m.phone },
          m.email && { href: `mailto:${m.email}`, t: 'Email' },
          m.instagram && { href: `https://www.instagram.com/${m.instagram.replace(/^@/, '')}/`, t: 'Instagram' },
          m.linkedin && /^https:\/\/([a-z]+\.)?linkedin\.com\//.test(m.linkedin) && { href: m.linkedin, t: 'LinkedIn' },
        ].filter(Boolean) as { href: string; t: string }[]
        const cv = (m.resume ?? '').split('\n').map((x) => x.trim()).filter(Boolean)
        return (
          <figure key={m.id} className="tm" id={`m${m.id}`}>
            {img(m.photo) && <img src={img(m.photo)} alt={`${m.name} — ${m.position}`} loading="lazy" />}
            <figcaption>
              <span className={`tm-disc ${m.discipline}`}>{disc[m.discipline] ?? ''}</span>
              <b>{m.name}</b>
              <span className="tm-pos">{m.position}</span>
              {m.bio && <p className="tm-bio">{m.bio}</p>}
              {!!cv.length && labels && (
                <details className="tm-cv"><summary>{labels.resume}</summary><ul>{cv.map((x, k) => <li key={k}>{x}</li>)}</ul></details>
              )}
              {!!links.length && <div className="tm-links">{links.map((x) => <a key={x.href} href={x.href} target="_blank" rel="noopener nofollow" dir="ltr">{x.t}</a>)}</div>}
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}
