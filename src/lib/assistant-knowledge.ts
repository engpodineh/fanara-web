// Builds the assistant's knowledge from live site content (cached for 10 minutes).
import { payload } from './payload'
import { SERVICE_PAGES } from './services-content'
import { CITY_PAGES } from './cities-content'
import type { Locale } from './i18n'

const cache = new Map<string, { at: number; text: string }>()
const LANG = { fa: 'Persian', ar: 'Arabic (use clear Iraqi-friendly Modern Standard Arabic)', en: 'English' }

export async function knowledge(l: Locale): Promise<string> {
  const hit = cache.get(l)
  if (hit && Date.now() - hit.at < 10 * 60_000) return hit.text
  const p = await payload()
  const [profile, services, projects, exp, standards] = await Promise.all([
    p.findGlobal({ slug: 'profile', locale: l }),
    p.find({ collection: 'services', locale: l, sort: 'order', limit: 50 }),
    p.find({ collection: 'projects', locale: l, where: { published: { equals: true } }, limit: 50 }),
    p.find({ collection: 'experience', locale: l, sort: '-start', limit: 30 }),
    // Only PUBLIC standards. Private/restricted standards are never given to the public assistant.
    p.find({ collection: 'standards', where: { accessTier: { equals: 'public' } }, limit: 500, overrideAccess: true, depth: 0 }),
  ])
  const pr = profile as any
  const lines: string[] = []
  lines.push(`# About\nName: ${pr.name}\nRole: ${pr.role}\n${pr.summary ?? ''}`)
  if (pr.stats?.length) lines.push('Key numbers: ' + pr.stats.map((s: any) => `${s.value} ${s.label}`).join(' · '))
  lines.push(`Contact: WhatsApp ${pr.whatsapp ?? '-'} · Iraq phone ${pr.phoneIraq ?? '-'} · Email ${pr.email ?? '-'} · Instagram @${pr.instagramPersonal ?? 'pudineh.eng'}`)
  lines.push('# Services (CMS)\n' + services.docs.map((s: any) => `- ${s.title}: ${s.description ?? ''}`).join('\n'))
  lines.push('# Service pages on the site\n' + SERVICE_PAGES.map((s) => `- ${s[l].h1} — /${l}/services/${s.slug}\n  ${s[l].intro}\n  Includes: ${s[l].points.join('; ')}`).join('\n'))
  lines.push('# Cities served in Iraq\n' + CITY_PAGES.map((c) => `- ${c[l].name} — /${l}/iraq/${c.slug}: ${c[l].intro}`).join('\n'))
  lines.push('# Projects\n' + projects.docs.map((x: any) => `- ${x.title} (${x.status === 'delivered' ? 'delivered' : 'in progress'})${x.showClientName && x.client ? `, client: ${x.client}` : ''}${x.location ? `, ${x.location}` : ''}: ${x.summary ?? ''}`).join('\n'))
  lines.push('# Experience (resume)\n' + exp.docs.map((e: any) => `- ${e.title} — ${e.company}${e.location ? ', ' + e.location : ''} (${String(e.start ?? '').slice(0, 4)}–${e.current ? 'present' : String(e.end ?? '').slice(0, 4)}): ${(e.bullets ?? []).map((b: any) => b.text).join(' ')}`).join('\n'))
  if (standards.docs.length) lines.push('# Public engineering standards in the library (titles only)\n' + standards.docs.map((s: any) => `- ${s.title}${s.number ? ' ' + s.number : ''}${s.publisher ? ' (' + s.publisher + ')' : ''}${s.notes ? ': ' + s.notes : ''}`).join('\n'))
  lines.push(`# Site pages\nHome /${l} · Services /${l}/services · Order a design (upload drawings, get a quote) /${l}/order · Resume /${l}/resume · Gallery /${l}/gallery · Stories & reels /${l}/highlights`)
  const text = `Reply language: ${LANG[l]} unless the visitor writes in another language — then reply in theirs.\n\n` + lines.join('\n\n')
  cache.set(l, { at: Date.now(), text })
  return text
}
