import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import fs from 'node:fs'
import path from 'node:path'

// Owner request (2026-10-12): Arabic study booklets + calculator for Iraqi students — stored PRIVATELY (admin-only) until a launch plan.
const ITEMS = [
  { file: 'Fanara-01-Plumbing-AR.pdf', title: 'أساسيات تصميم التأسيسات الصحية', kind: 'booklet', order: 1 },
  { file: 'Fanara-02-Electrical-AR.pdf', title: 'أساسيات التأسيسات الكهربائية في المباني', kind: 'booklet', order: 2 },
  { file: 'Fanara-03-HVAC-AR.pdf', title: 'أساسيات التكييف والتهوية', kind: 'booklet', order: 3 },
  { file: 'Fanara-04-Concrete-AR.pdf', title: 'أساسيات تصميم الخرسانة المسلحة', kind: 'booklet', order: 4 },
  { file: 'Fanara-05-Masonry-AR.pdf', title: 'المباني والجدران الطابوقية', kind: 'booklet', order: 5 },
  { file: 'Fanara-BedJoint-Wall-Calculator-AR.xlsx', title: 'حاسبة جدار طابوقي مسلح بتسليح العرقات', kind: 'calculator', order: 10, notes: 'رمز حماية الأوراق والملف: Fanara-214f8e28' },
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const dir = path.resolve(process.cwd(), 'content/materials')
  for (const it of ITEMS) {
    const p = path.join(dir, it.file)
    if (!fs.existsSync(p)) continue
    const had = await payload.find({ collection: 'study-materials', where: { title: { equals: it.title } }, limit: 1, depth: 0, req, overrideAccess: true })
    if (had.docs.length) continue
    await payload.create({ collection: 'study-materials', filePath: p, data: { title: it.title, kind: it.kind, language: 'ar', order: it.order, published: false, notes: (it as any).notes } as any, req, overrideAccess: true })
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
