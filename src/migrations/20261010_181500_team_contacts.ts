import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Owner request (2026-10-10): WhatsApp number + Instagram for each team member, shown under name and photo.
const CONTACTS: { en: string; whatsapp: string; instagram: string }[] = [
  { en: 'Eng. Ario', whatsapp: '+98 999 176 6050', instagram: 'ario.000' },
  { en: 'Eng. Alkasir', whatsapp: '+98 933 660 9953', instagram: 'omidn1364' },
  { en: 'Eng. Ebrahimi', whatsapp: '+98 938 876 0070', instagram: 'amir.ebrahimi461' },
  { en: 'Eng. Sadeghi', whatsapp: '+98 936 270 4533', instagram: 'mr.sadeghi' },
  { en: 'Eng. Al-Bashouke', whatsapp: '+98 990 241 5328', instagram: 'hasaani_a.l' },
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const c of CONTACTS) {
    const r = await payload.find({ collection: 'team', locale: 'en', where: { name: { equals: c.en } }, limit: 1, depth: 0, req, overrideAccess: true })
    if (!r.docs[0]) { payload.logger.warn(`team contact: ${c.en} not found`); continue }
    await payload.update({ collection: 'team', id: r.docs[0].id, data: { whatsapp: c.whatsapp, instagram: c.instagram } as any, req, overrideAccess: true })
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
