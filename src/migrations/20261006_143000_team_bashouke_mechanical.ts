import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import fs from 'node:fs'
import path from 'node:path'

// Owner correction: Eng. Al-Bashouke is in the MECHANICAL unit; new portrait supplied.
const POS = { fa: 'سرپرست واحد مکانیک', ar: 'مشرف القسم الميكانيكي', en: 'Mechanical Supervisor' }
const NAME = { fa: 'مهندس الباشوکه', ar: 'المهندس الباشوكه', en: 'Eng. Al-Bashouke' }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const r = await payload.find({ collection: 'team', locale: 'en', where: { name: { equals: NAME.en } }, limit: 1, depth: 0, req, overrideAccess: true })
  const m = r.docs[0]
  if (!m) { payload.logger.warn('team: Al-Bashouke not found, skipped'); return }
  const file = path.resolve(process.cwd(), 'content/team/team-06-v2.jpg')
  let photo: number | string | undefined
  if (fs.existsSync(file)) {
    const media = await payload.create({
      collection: 'media', locale: 'fa', filePath: file, req, overrideAccess: true,
      data: { alt: `${NAME.fa} — ${POS.fa}`, sourceFile: 'team/team-06-v2.jpg', inGallery: false, category: 'team' } as any,
    })
    for (const l of ['ar', 'en'] as const) await payload.update({ collection: 'media', id: media.id, locale: l, data: { alt: `${NAME[l]} — ${POS[l]}` } as any, req, overrideAccess: true })
    photo = media.id
  }
  const old = m.photo
  await payload.update({ collection: 'team', id: m.id, locale: 'fa', data: { discipline: 'mechanical', position: POS.fa, ...(photo ? { photo } : {}) } as any, req, overrideAccess: true })
  for (const l of ['ar', 'en'] as const) await payload.update({ collection: 'team', id: m.id, locale: l, data: { position: POS[l] } as any, req, overrideAccess: true })
  if (photo && old && old !== photo) await payload.delete({ collection: 'media', id: old as any, req, overrideAccess: true }).catch(() => {})
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
