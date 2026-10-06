import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Content fix requested by the owner: the role line under his name must read as his *latest position*,
// so the site is clearly his own and not an Al-Dhaman publication.
const ROLES = {
  fa: 'آخرین جایگاه شغلی: مدیر بخش مکانیک، شرکت الضمان · کارشناس ارشد مهندسی مکانیک',
  ar: 'آخر منصب وظيفي: مدير القسم الميكانيكي، شركة الضمان · ماجستير هندسة ميكانيكية',
  en: 'Latest position: Mechanical Manager, Al-Dhaman Co. · M.Sc. Mechanical Engineering',
} as const

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const [locale, role] of Object.entries(ROLES)) {
    await payload.updateGlobal({ slug: 'profile', locale: locale as any, data: { role } as any, req, overrideAccess: true })
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  for (const [locale, role] of Object.entries(ROLES)) {
    await payload.updateGlobal({ slug: 'profile', locale: locale as any, data: { role: role.replace(/^[^:]+:\s*/, '') } as any, req, overrideAccess: true })
  }
}
