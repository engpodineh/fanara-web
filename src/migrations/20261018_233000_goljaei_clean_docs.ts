import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import fs from 'node:fs'
import path from 'node:path'

// Owner request: remove Eng. Goljaei's home address and military-service line from his public files,
// and use 14 years of experience. Old files are deleted so their URLs stop working.
type L4 = { fa: string; ar: string; en: string; tr: string }
const DOCS: { file: string; preview?: string; kind: string; lang: string; title: L4 }[] = [
  { file: 'goljaei-resume-en-v2.pdf', preview: 'goljaei-resume-en-v2-preview.jpg', kind: 'resume', lang: 'EN', title: { fa: 'رزومه — انگلیسی', ar: 'السيرة الذاتية — إنجليزي', en: 'Résumé — English', tr: 'Özgeçmiş — İngilizce' } },
  { file: 'goljaei-resume-tr-v2.pdf', preview: 'goljaei-resume-tr-v2-preview.jpg', kind: 'resume', lang: 'TR', title: { fa: 'رزومه — ترکی', ar: 'السيرة الذاتية — تركي', en: 'Résumé — Turkish', tr: 'Özgeçmiş — Türkçe' } },
  { file: 'goljaei-cover-letter-tr-v2.pdf', preview: 'goljaei-cover-letter-tr-v2-preview.jpg', kind: 'cover-letter', lang: 'TR', title: { fa: 'نامه‌ی معرفی (کاور لتر) — ترکی', ar: 'رسالة تعريفية — تركي', en: 'Cover letter — Turkish', tr: 'Ön yazı — Türkçe' } },
  { file: 'goljaei-poster.jpg', kind: 'poster', lang: 'EN', title: { fa: 'پوستر معرفی', ar: 'بوستر تعريفي', en: 'Profile poster', tr: 'Tanıtım afişi' } },
]
const OLD = ['goljaei-resume-en.pdf', 'goljaei-resume-tr.pdf', 'goljaei-cover-letter-tr.pdf', 'goljaei-resume-en-preview.jpg', 'goljaei-resume-tr-preview.jpg', 'goljaei-cover-letter-tr-preview.jpg']
const YEARS: Record<string, [string, string]> = { fa: ['بیش از ۱۵ سال', 'بیش از ۱۴ سال'], ar: ['تزيد على 15 سنة', 'تزيد على 14 سنة'], en: ['15+ years', '14+ years'], tr: ['15 yılı aşkın', '14 yılı aşkın'] }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const o = { req, overrideAccess: true } as const
  const dir = path.resolve(process.cwd(), 'content/team-docs')
  const r = await payload.find({ collection: 'team', where: { email: { equals: 'behzadgh919@gmail.com' } }, limit: 1, depth: 0, ...o })
  const member: any = r.docs[0]
  if (!member) return
  const media = async (file: string, alt: string) => {
    const src = `team-docs/${file}`
    const had = await payload.find({ collection: 'media', where: { sourceFile: { equals: src } }, limit: 1, depth: 0, ...o })
    if (had.docs.length) return had.docs[0].id
    const p = path.join(dir, file)
    if (!fs.existsSync(p)) return null
    return (await payload.create({ collection: 'media', locale: 'fa', filePath: p, data: { alt, sourceFile: src, inGallery: false, category: 'team' } as any, ...o })).id
  }
  const docs: any[] = []
  for (const d of DOCS) {
    const file = await media(d.file, d.title.fa)
    if (file) docs.push({ d, file, preview: d.preview ? await media(d.preview, d.title.fa) : null })
  }
  const fa: any = await payload.update({ collection: 'team', id: member.id, locale: 'fa', data: { slug: 'behzad-goljaei', documents: docs.map(({ d, file, preview }) => ({ title: d.title.fa, kind: d.kind, lang: d.lang, file, preview })) } as any, ...o })
  const rows: any[] = fa.documents ?? []
  for (const l of ['ar', 'en', 'tr'] as const) {
    await payload.update({ collection: 'team', id: member.id, locale: l as any, data: { documents: rows.map((row, i) => ({ id: row.id, title: docs[i].d.title[l], kind: row.kind, lang: row.lang, file: docs[i].file, preview: docs[i].preview })) } as any, ...o })
  }
  for (const [l, [a, b]] of Object.entries(YEARS)) {
    const d: any = await payload.findByID({ collection: 'team', id: member.id, locale: l as any, fallbackLocale: false as any, depth: 0, ...o })
    if (d.bio?.includes(a)) await payload.update({ collection: 'team', id: member.id, locale: l as any, data: { bio: d.bio.replace(a, b) } as any, ...o })
  }
  for (const f of OLD) {
    const old = await payload.find({ collection: 'media', where: { sourceFile: { equals: `team-docs/${f}` } }, limit: 5, depth: 0, ...o })
    for (const m of old.docs) await payload.delete({ collection: 'media', id: m.id, ...o })
  }
}
export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
