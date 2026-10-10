import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Owner request: contact details for Eng. Alireza Heidari (Iraqi WhatsApp, Iranian mobile, Instagram).
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const r = await payload.find({ collection: 'team', locale: 'en', where: { name: { equals: 'Eng. Heidari' } }, limit: 1, depth: 0, req, overrideAccess: true })
  if (!r.docs[0]) { payload.logger.warn('team contact: Eng. Heidari not found'); return }
  await payload.update({ collection: 'team', id: r.docs[0].id, data: { whatsapp: '+964 782 674 8140', phone: '+98 903 718 0564', instagram: 'alireza36608' } as any, req, overrideAccess: true })
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
