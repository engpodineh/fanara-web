// Instagram handle shown with the owner's profile photo in a story-style ring (draws the eye).
export default function InstaBadge({ handle, photo, label, cta, variant = 'light' }: { handle: string; photo?: string; label: string; cta: string; variant?: 'light' | 'dark' }) {
  return (
    <a className={`ig-badge ig-${variant}`} href={`https://www.instagram.com/${handle}`} target="_blank" rel="noopener" aria-label={`${label} @${handle}`}>
      <span className="ig-ring">{photo ? <img src={photo} alt="" loading="lazy" /> : <span className="ig-initial">F</span>}</span>
      <span className="ig-text"><small>{label}</small><b dir="ltr">@{handle}</b></span>
      <span className="ig-cta">{cta}</span>
    </a>
  )
}
