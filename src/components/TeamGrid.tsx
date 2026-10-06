import { img } from '@/lib/payload'
import type { Team } from '@/payload-types'

export default function TeamGrid({ members, disc }: { members: Team[]; disc: Record<string, string> }) {
  return (
    <div className="team-grid">
      {members.map((m) => (
        <figure key={m.id} className="tm">
          {img(m.photo) && <img src={img(m.photo)} alt={`${m.name} — ${m.position}`} loading="lazy" />}
          <figcaption>
            <span className={`tm-disc ${m.discipline}`}>{disc[m.discipline] ?? ''}</span>
            <b>{m.name}</b>
            <span>{m.position}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
