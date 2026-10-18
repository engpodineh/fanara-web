import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Owner correction: Negin complex role is "سرپرست اجرا (تأسیسات برق و مکانیک)", not "سرپرست کارگاه (تأسیسات و نازک‌کاری)".
const OLD_FA = 'سرپرست کارگاه (تأسیسات و نازک‌کاری)'
const NEW = { fa: 'سرپرست اجرا (تأسیسات برق و مکانیک)', ar: 'مشرف التنفيذ (الأعمال الكهربائية والميكانيكية)', en: 'Execution Supervisor (Electrical & Mechanical)', tr: 'Uygulama Şefi (Elektrik ve Mekanik Tesisat)' }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const o = { req, overrideAccess: true } as const
  const ex = await payload.find({ collection: 'experience', locale: 'fa', where: { title: { in: [OLD_FA, NEW.fa] } }, limit: 10, depth: 0, ...o })
  for (const d of ex.docs) for (const [l, v] of Object.entries(NEW)) await payload.update({ collection: 'experience', id: d.id, locale: l as any, data: (l === 'tr' ? { title: v, company: 'Negin Konut Kompleksi · İşveren: NMPC', location: 'Çabahar, İran' } : { title: v }) as any, ...o })
  const pj = await payload.find({ collection: 'projects', where: { slug: { equals: 'negin-residential-complex' } }, limit: 1, depth: 0, ...o })
  for (const d of pj.docs) for (const [l, v] of Object.entries(NEW)) await payload.update({ collection: 'projects', id: d.id, locale: l as any, data: { role: v } as any, ...o })
}
export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
