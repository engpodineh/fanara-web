import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import fs from 'node:fs'
import path from 'node:path'

// Owner's Arabic supervision work-order forms (one "folder": full set + the 8 individual forms). Private like other study materials.
const F = 'نماذج أوامر العمل الإشرافية'
const FILES: [string, string][] = [
  ['EngFanara-Work-Orders-AR.pdf', `${F} — المجموعة الكاملة (8 نماذج)`],
  ['wo-01-demolition.pdf', `${F} / 1 — أعمال الهدم`],
  ['wo-02-excavation.pdf', `${F} / 2 — الحفر والسند`],
  ['wo-03-foundation.pdf', `${F} / 3 — الأسس`],
  ['wo-04-concrete-frame.pdf', `${F} / 4 — الهيكل الخرساني`],
  ['wo-05-steel-frame.pdf', `${F} / 5 — الهيكل الحديدي`],
  ['wo-06-masonry.pdf', `${F} / 6 — البناء بالطابوق والبلوك`],
  ['wo-07-finishing.pdf', `${F} / 7 — التشطيبات`],
  ['wo-08-site-safety.pdf', `${F} / 8 — السلامة في الموقع`],
]
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  let order = 20
  for (const [file, title] of FILES) {
    order++
    const p = path.resolve(process.cwd(), 'content/materials/work-orders', file)
    if (!fs.existsSync(p)) continue
    const had = await payload.find({ collection: 'study-materials', where: { title: { equals: title } }, limit: 1, depth: 0, req, overrideAccess: true })
    if (had.docs.length) continue
    await payload.create({ collection: 'study-materials', filePath: p, data: { title, kind: 'booklet', language: 'ar', order, published: false, notes: F } as any, req, overrideAccess: true })
  }
}
export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
