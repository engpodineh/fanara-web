import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import fs from 'node:fs'
import path from 'node:path'

// Owner's own booklet (Eng.Fanara series, book 1 of 12) — stored privately like the other study materials.
const TITLE = 'تكنولوجيا تصميم الخرسانة — الكتيب 1 من 12'
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const p = path.resolve(process.cwd(), 'content/materials/EngFanara-01-Concrete-Technology-AR.pdf')
  if (!fs.existsSync(p)) return
  const had = await payload.find({ collection: 'study-materials', where: { title: { equals: TITLE } }, limit: 1, depth: 0, req, overrideAccess: true })
  if (had.docs.length) return
  await payload.create({ collection: 'study-materials', filePath: p, data: { title: TITLE, kind: 'booklet', language: 'ar', order: 0, published: false } as any, req, overrideAccess: true })
}
export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
