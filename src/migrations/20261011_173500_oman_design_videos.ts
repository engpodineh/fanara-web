import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import fs from 'node:fs'
import path from 'node:path'

// Owner request (2026-10-11): design/modelling videos of the Oman project, prepared by his colleagues.
const SLUG = 'oman-al-hail-1306-office-building'
const FILES = ['oman-1306-design-video-1.mp4', 'oman-1306-design-video-2.mp4', 'oman-1306-design-video-3.mp4']
const ALT = {
  fa: 'ویدیوی طراحی و مدل‌سازی تأسیسات، ساختمان اداری مسقط',
  ar: 'فيديو تصميم ونمذجة الأنظمة، مبنى المكاتب في مسقط',
  en: 'MEP design and modelling video, Muscat office building',
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const r = await payload.find({ collection: 'projects', where: { slug: { equals: SLUG } }, limit: 1, depth: 0, req, overrideAccess: true })
  const pr = r.docs[0] as any
  if (!pr) { payload.logger.warn('oman videos: project not found'); return }
  const dir = path.resolve(process.cwd(), 'content/projects/oman')
  const ids: (number | string)[] = (pr.videos ?? []).map((v: any) => (typeof v === 'object' ? v.id : v))
  for (const f of FILES) {
    const src = `projects/oman/${f}`
    const had = await payload.find({ collection: 'media', where: { sourceFile: { equals: src } }, limit: 1, depth: 0, req, overrideAccess: true })
    if (had.docs[0]) { if (!ids.includes(had.docs[0].id)) ids.push(had.docs[0].id); continue }
    if (!fs.existsSync(path.join(dir, f))) continue
    const m = await payload.create({ collection: 'media', locale: 'fa', filePath: path.join(dir, f), data: { alt: ALT.fa, sourceFile: src, inGallery: false } as any, req, overrideAccess: true })
    for (const l of ['ar', 'en'] as const) await payload.update({ collection: 'media', id: m.id, locale: l, data: { alt: ALT[l] } as any, req, overrideAccess: true })
    ids.push(m.id)
  }
  await payload.update({ collection: 'projects', id: pr.id, data: { videos: ids } as any, req, overrideAccess: true })
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
