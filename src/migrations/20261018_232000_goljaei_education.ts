import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Align Eng. Goljaei's site text with his official résumé (Oct 2026): M.Sc. is at thesis stage; add B.Sc.
const FIX: Record<string, [string, string][]> = {
  fa: [['سرپرست پروژه — کارشناس ارشد عمران', 'سرپرست پروژه — مهندس عمران'], ['تحصیلات: کارشناسی ارشد مهندسی عمران — دانشگاه آزاد اسلامی شاهرود', 'تحصیلات: کارشناسی ارشد مهندسی عمران — دانشگاه آزاد اسلامی شاهرود (در مرحله‌ی پایان‌نامه)؛ کارشناسی مهندسی عمران — مؤسسه‌ی آموزش عالی شمس گنبد کاووس']],
  ar: [['مدير موقع المشروع — ماجستير هندسة مدنية', 'مدير موقع المشروع — مهندس مدني'], ['المؤهل: ماجستير هندسة مدنية — جامعة آزاد الإسلامية، شاهرود', 'المؤهل: ماجستير هندسة مدنية — جامعة آزاد الإسلامية، شاهرود (مرحلة الرسالة)؛ بكالوريوس هندسة مدنية — مؤسسة شمس للتعليم العالي، گنبد كاووس']],
  en: [['Education: M.Sc. Civil Engineering — Islamic Azad University, Shahrood', 'Education: M.Sc. Civil Engineering — Islamic Azad University, Shahrood (thesis stage); B.Sc. Civil Engineering — Shams Institute of Higher Education, Gonbad-e Kavus']],
  tr: [['Eğitim: İnşaat Mühendisliği Yüksek Lisans — İslami Azad Üniversitesi, Şahrud', 'Eğitim: İnşaat Mühendisliği Yüksek Lisans — İslami Azad Üniversitesi, Şahrud (tez aşamasında); İnşaat Mühendisliği Lisans — Şems Yükseköğretim Kurumu, Gonbad-e Kavus']],
}
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const o = { req, overrideAccess: true } as const
  const r = await payload.find({ collection: 'team', where: { email: { equals: 'behzadgh919@gmail.com' } }, limit: 1, depth: 0, ...o })
  const id = r.docs[0]?.id
  if (!id) return
  for (const [l, pairs] of Object.entries(FIX)) {
    const d: any = await payload.findByID({ collection: 'team', id, locale: l as any, fallbackLocale: false as any, depth: 0, ...o })
    let position = d.position ?? '', resume = d.resume ?? ''
    for (const [a, b] of pairs) { position = position.replace(a, b); resume = resume.replace(a, b) }
    if (position !== d.position || resume !== d.resume) await payload.update({ collection: 'team', id, locale: l as any, data: { position, resume } as any, ...o })
  }
}
export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
