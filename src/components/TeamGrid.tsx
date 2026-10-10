import { img } from '@/lib/payload'
import type { Team } from '@/payload-types'

const wa = (n: string) => `https://wa.me/${n.replace(/\D/g, '')}`

export default function TeamGrid({ members, disc, labels }: { members: Team[]; disc: Record<string, string>; labels?: { resume: string } }) {
  return (
    <div className="team-grid">
      {members.map((m) => {
        const ig = m.instagram?.replace(/^@/, '').trim()
        const links = [
          m.phone && { href: `tel:${m.phone.replace(/[^\d+]/g, '')}`, t: m.phone },
          m.email && { href: `mailto:${m.email}`, t: 'Email' },
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
              {(m.whatsapp || ig) && (
                <div className="tm-contact">
                  {m.whatsapp && (
                    <a className="tm-wa" href={wa(m.whatsapp)} target="_blank" rel="noopener nofollow" dir="ltr" aria-label={`WhatsApp ${m.whatsapp}`}>
                      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>
                      <span>{m.whatsapp}</span>
                    </a>
                  )}
                  {ig && (
                    <a className="tm-ig" href={`https://www.instagram.com/${ig}/`} target="_blank" rel="noopener nofollow" dir="ltr" aria-label={`Instagram @${ig}`}>
                      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
                      <span>@{ig}</span>
                    </a>
                  )}
                </div>
              )}
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
