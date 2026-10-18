import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import fs from 'node:fs'
import path from 'node:path'

// Profile pages for Eng. Behzad Goljaei and Eng. Amin Parvaei: résumés, cover letter, portfolio and posters.
type L4 = { fa: string; ar: string; en: string; tr: string }
type Doc = { file: string; preview?: string; kind: string; lang: string; title: L4 }

const MEMBERS: { email: string; slug: string; docs: Doc[] }[] = [
  {
    email: 'behzadgh919@gmail.com', slug: 'behzad-goljaei',
    docs: [
      { file: 'goljaei-resume-en.pdf', preview: 'goljaei-resume-en-preview.jpg', kind: 'resume', lang: 'EN', title: { fa: 'رزومه — انگلیسی', ar: 'السيرة الذاتية — إنجليزي', en: 'Résumé — English', tr: 'Özgeçmiş — İngilizce' } },
      { file: 'goljaei-resume-tr.pdf', preview: 'goljaei-resume-tr-preview.jpg', kind: 'resume', lang: 'TR', title: { fa: 'رزومه — ترکی', ar: 'السيرة الذاتية — تركي', en: 'Résumé — Turkish', tr: 'Özgeçmiş — Türkçe' } },
      { file: 'goljaei-cover-letter-tr.pdf', preview: 'goljaei-cover-letter-tr-preview.jpg', kind: 'cover-letter', lang: 'TR', title: { fa: 'نامه‌ی معرفی (کاور لتر) — ترکی', ar: 'رسالة تعريفية — تركي', en: 'Cover letter — Turkish', tr: 'Ön yazı — Türkçe' } },
      { file: 'goljaei-poster.jpg', kind: 'poster', lang: 'EN', title: { fa: 'پوستر معرفی', ar: 'بوستر تعريفي', en: 'Profile poster', tr: 'Tanıtım afişi' } },
    ],
  },
  {
    email: 'amin.parvae66@gmail.com', slug: 'amin-parvaei',
    docs: [
      { file: 'parvaei-resume-en.jpg', kind: 'resume', lang: 'EN', title: { fa: 'رزومه — انگلیسی', ar: 'السيرة الذاتية — إنجليزي', en: 'Résumé — English', tr: 'Özgeçmiş — İngilizce' } },
      { file: 'parvaei-resume-fa.jpg', kind: 'resume', lang: 'FA', title: { fa: 'رزومه — فارسی', ar: 'السيرة الذاتية — فارسي', en: 'Résumé — Persian', tr: 'Özgeçmiş — Farsça' } },
      { file: 'parvaei-portfolio-en.jpg', kind: 'portfolio', lang: 'EN', title: { fa: 'نمونه پروژه‌ها و تجربه‌های اجرایی — انگلیسی', ar: 'نماذج المشاريع والخبرات التنفيذية — إنجليزي', en: 'Project experience & portfolio — English', tr: 'Proje deneyimi ve portföy — İngilizce' } },
      { file: 'parvaei-portfolio-fa.jpg', kind: 'portfolio', lang: 'FA', title: { fa: 'نمونه پروژه‌ها و تجربه‌های اجرایی — فارسی', ar: 'نماذج المشاريع والخبرات التنفيذية — فارسي', en: 'Project experience & portfolio — Persian', tr: 'Proje deneyimi ve portföy — Farsça' } },
      { file: 'parvaei-poster-1.jpg', kind: 'poster', lang: 'EN', title: { fa: 'پوستر معرفی ۱', ar: 'بوستر تعريفي 1', en: 'Profile poster 1', tr: 'Tanıtım afişi 1' } },
      { file: 'parvaei-poster-2.jpg', kind: 'poster', lang: 'EN', title: { fa: 'پوستر معرفی ۲', ar: 'بوستر تعريفي 2', en: 'Profile poster 2', tr: 'Tanıtım afişi 2' } },
      { file: 'parvaei-banner.jpg', kind: 'poster', lang: 'EN', title: { fa: 'بنر معرفی', ar: 'بانر تعريفي', en: 'Profile banner', tr: 'Tanıtım bannerı' } },
    ],
  },
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const dir = path.resolve(process.cwd(), 'content/team-docs')
  const o = { req, overrideAccess: true } as const
  const media = async (file: string, alt: string) => {
    const src = `team-docs/${file}`
    const had = await payload.find({ collection: 'media', where: { sourceFile: { equals: src } }, limit: 1, depth: 0, ...o })
    if (had.docs.length) return had.docs[0].id
    const p = path.join(dir, file)
    if (!fs.existsSync(p)) return null
    const m = await payload.create({ collection: 'media', locale: 'fa', filePath: p, data: { alt, sourceFile: src, inGallery: false, category: 'team' } as any, ...o })
    return m.id
  }
  for (const m of MEMBERS) {
    const r = await payload.find({ collection: 'team', where: { email: { equals: m.email } }, limit: 1, depth: 0, ...o })
    const member: any = r.docs[0]
    if (!member) continue
    const docs: any[] = []
    for (const d of m.docs) {
      const file = await media(d.file, d.title.fa)
      if (!file) continue
      const preview = d.preview ? await media(d.preview, d.title.fa) : null
      docs.push({ d, file, preview })
    }
    const fa = await payload.update({ collection: 'team', id: member.id, locale: 'fa', data: { slug: m.slug, documents: docs.map(({ d, file, preview }) => ({ title: d.title.fa, kind: d.kind, lang: d.lang, file, preview })) } as any, ...o })
    const rows: any[] = (fa as any).documents ?? []
    for (const l of ['ar', 'en', 'tr'] as const) {
      await payload.update({ collection: 'team', id: member.id, locale: l as any, data: { documents: rows.map((row, i) => ({ id: row.id, title: docs[i].d.title[l], kind: row.kind, lang: row.lang, file: docs[i].file, preview: docs[i].preview })) } as any, ...o })
    }
  }
}
export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
