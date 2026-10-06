import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import fs from 'node:fs'
import path from 'node:path'

// Owner request: "اعضا تیم فن آرا" — seven team members with their portraits (content/team).
type L3 = { fa: string; ar: string; en: string }
const POS = {
  elecMgr: { fa: 'مدیر اجرای واحد برق', ar: 'مدير تنفيذ القسم الكهربائي', en: 'Electrical Construction Manager' },
  elecHead: { fa: 'سرپرست واحد برق', ar: 'رئيس القسم الكهربائي', en: 'Head of Electrical Department' },
  mechSup: { fa: 'سرپرست واحد مکانیک', ar: 'مشرف القسم الميكانيكي', en: 'Mechanical Execution Supervisor' },
  mechExec: { fa: 'سرپرست اجرای واحد مکانیک', ar: 'مشرف تنفيذ القسم الميكانيكي', en: 'Mechanical Unit Execution Supervisor' },
  elecExec: { fa: 'سرپرست اجرای واحد برق', ar: 'مشرف تنفيذ القسم الكهربائي', en: 'Electrical Unit Execution Supervisor' },
} satisfies Record<string, L3>

const MEMBERS: { file: string; name: L3; position: L3; discipline: 'mechanical' | 'electrical' }[] = [
  { file: 'team-01.jpg', name: { fa: 'مهندس ابراهیمی', ar: 'المهندس إبراهيمي', en: 'Eng. Ebrahimi' }, position: POS.elecMgr, discipline: 'electrical' },
  { file: 'team-02.jpg', name: { fa: 'مهندس آریو', ar: 'المهندس آريو', en: 'Eng. Ario' }, position: POS.elecHead, discipline: 'electrical' },
  { file: 'team-03.jpg', name: { fa: 'مهندس صادقی', ar: 'المهندس صادقي', en: 'Eng. Sadeghi' }, position: POS.mechSup, discipline: 'mechanical' },
  { file: 'team-04.jpg', name: { fa: 'مهندس حیدری', ar: 'المهندس حيدري', en: 'Eng. Heidari' }, position: POS.mechExec, discipline: 'mechanical' },
  { file: 'team-05.jpg', name: { fa: 'مهندس الکاسر', ar: 'المهندس الكاسر', en: 'Eng. Alkasir' }, position: POS.mechExec, discipline: 'mechanical' },
  { file: 'team-06.jpg', name: { fa: 'مهندس الباشوکه', ar: 'المهندس الباشوكه', en: 'Eng. Al-Bashouke' }, position: POS.elecExec, discipline: 'electrical' },
  { file: 'team-07.jpg', name: { fa: 'مهندس قبادنژاد', ar: 'المهندس قبادنجاد', en: 'Eng. Ghobadnejad' }, position: POS.elecExec, discipline: 'electrical' },
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const dir = path.resolve(process.cwd(), 'content/team')
  if (!fs.existsSync(dir)) { payload.logger.warn(`team: ${dir} missing, skipped`); return }
  for (const [i, m] of MEMBERS.entries()) {
    const src = `team/${m.file}`
    const had = await payload.find({ collection: 'media', where: { sourceFile: { equals: src } }, limit: 1, depth: 0, req, overrideAccess: true })
    if (had.docs.length) continue
    const photo = await payload.create({
      collection: 'media', locale: 'fa', filePath: path.join(dir, m.file), req, overrideAccess: true,
      data: { alt: `${m.name.fa} — ${m.position.fa}`, sourceFile: src, inGallery: false, category: 'team' } as any,
    })
    for (const l of ['ar', 'en'] as const) await payload.update({ collection: 'media', id: photo.id, locale: l, data: { alt: `${m.name[l]} — ${m.position[l]}` } as any, req, overrideAccess: true })
    const doc = await payload.create({
      collection: 'team', locale: 'fa', req, overrideAccess: true,
      data: { name: m.name.fa, position: m.position.fa, discipline: m.discipline, photo: photo.id, published: true, order: (i + 1) * 10 } as any,
    })
    for (const l of ['ar', 'en'] as const) await payload.update({ collection: 'team', id: doc.id, locale: l, data: { name: m.name[l], position: m.position[l] } as any, req, overrideAccess: true })
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({ collection: 'team', where: { id: { exists: true } }, req, overrideAccess: true })
}
