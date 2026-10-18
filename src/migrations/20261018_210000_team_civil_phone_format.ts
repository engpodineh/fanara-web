import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Match the spaced phone format used for the other team members.
const FIX: [string, string, string][] = [
  ['behzadgh919@gmail.com', '+98 937 333 8705', ''],
  ['amin.parvae66@gmail.com', '+964 786 126 9411', '+98 915 177 0076'],
]
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const [email, whatsapp, phone] of FIX) {
    const r = await payload.find({ collection: 'team', where: { email: { equals: email } }, limit: 1, depth: 0, req, overrideAccess: true })
    if (!r.docs.length) continue
    await payload.update({ collection: 'team', id: r.docs[0].id, data: { whatsapp, phone } as any, req, overrideAccess: true })
  }
}
export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
