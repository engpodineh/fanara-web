// Uploads gallery-media/<folder>/<file> into Media with inGallery + category + trilingual alt.
// Safe to re-run: files already in Media (same filename) are updated, not duplicated.
// Also applies small content fixes (Instagram handle).
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

type L3 = { fa: string; ar: string; en: string }
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../gallery-media')
const F: Record<string, [string, L3]> = {
  '01-portrait': ['team', { fa: 'مهندس امید پودینه در کارگاه', ar: 'المهندس أميد پودينه في الموقع', en: 'Eng. Omid Podineh on site' }],
  '02-hero': ['site', { fa: 'نمای کارگاه پروژه‌ی مسکونی در عراق', ar: 'موقع مشروع سكني في العراق', en: 'Residential project site in Iraq' }],
  '03-project-raft-mep': ['site', { fa: 'تأسیسات مدفون زیر رادیه', ar: 'تمديدات التأسيسات تحت الحصيرة الخرسانية', en: 'MEP sleeves and pipes under the raft slab' }],
  '04-project-steel-frame': ['site', { fa: 'اجرای ساختمان اسکلت فلزی', ar: 'تنفيذ مبنى بهيكل حديدي', en: 'Steel-frame building under construction' }],
  '05-site-work': ['site', { fa: 'اجرای کارگاهی و بتن‌ریزی', ar: 'أعمال الموقع وصب الخرسانة', en: 'Site works and concrete pours' }],
  '06-team': ['team', { fa: 'تیم اجرایی پروژه', ar: 'فريق التنفيذ في الموقع', en: 'Project site team' }],
  '07-electrical': ['mep', { fa: 'تأسیسات برقی و تابلو', ar: 'التأسيسات الكهربائية واللوحات', en: 'Electrical works and panels' }],
  '08-plumbing-water': ['mep', { fa: 'لوله‌کشی آب ساختمان', ar: 'تمديدات المياه في المبنى', en: 'Building water plumbing' }],
  '09-drainage': ['mep', { fa: 'لوله‌کشی فاضلاب و زهکشی', ar: 'تمديدات الصرف الصحي', en: 'Drainage and soil piping' }],
  '10-plant-room': ['mep', { fa: 'موتورخانه و دیگ بخار', ar: 'غرفة المراجل', en: 'Plant room and boilers' }],
  '11-onsite-selfies': ['team', { fa: 'در کارگاه همراه تیم', ar: 'في الموقع مع الفريق', en: 'On site with the crew' }],
  '12-design-drawings': ['design', { fa: 'نقشه‌های طراحی تأسیسات و معماری', ar: 'مخططات تصميم التأسيسات والمعماري', en: 'MEP and architectural design drawings' }],
  '13-office-management': ['management', { fa: 'دفتر فنی و مدیریت پروژه', ar: 'المكتب الفني وإدارة المشروع', en: 'Technical office and project management' }],
  '15-teaching-material': ['design', { fa: 'جزئیات اجرایی آموزشی', ar: 'تفاصيل تنفيذية تعليمية', en: 'Construction detail for training' }],
  '16-steel-building-drainage': ['site', { fa: 'شبکه‌ی فاضلاب ساختمان فلزی', ar: 'شبكة صرف مبنى حديدي', en: 'Drainage network in a steel building' }],
  '17-water-treatment': ['mep', { fa: 'دستگاه تصفیه آب', ar: 'وحدة معالجة المياه', en: 'Water treatment unit' }],
  '18-power-generation': ['mep', { fa: 'ژنراتور و تابلو برق اصلی', ar: 'المولدات واللوحة الرئيسية', en: 'Generators and main panel' }],
  '19-awards': ['management', { fa: 'تقدیرنامه‌ی شرکت الضمان', ar: 'شهادة تقدير من شركة الضمان', en: 'Appreciation from Al-Dhaman Co.' }],
  '20-hvac-ducting': ['mep', { fa: 'کانال‌کشی تهویه و سینی کابل', ar: 'مجاري التكييف وحاملات الكابلات', en: 'HVAC ductwork and cable trays' }],
  '21-panel-design-to-build': ['mep', { fa: 'تابلو برق؛ از طراحی تا اجرا', ar: 'لوحة كهربائية من التصميم إلى التنفيذ', en: 'Electrical panel from design to build' }],
  '22-site-sewer-network': ['site', { fa: 'اجرای شبکه‌ی فاضلاب سایت', ar: 'تنفيذ شبكة مجاري الموقع', en: 'Site sewer network installation' }],
  '24-precast-yard': ['site', { fa: 'کارگاه قطعات پیش‌ساخته', ar: 'ساحة الخرسانة مسبقة الصب', en: 'Precast yard' }],
  '25-iran-projects': ['site', { fa: 'پروژه در ایران', ar: 'مشروع في إيران', en: 'Project in Iran' }],
  '26-negin-residential-chabahar': ['site', { fa: 'مجتمع مسکونی نگین، چابهار', ar: 'مجمع نگین السكني، چابهار', en: 'Negin Residential Complex, Chabahar' }],
}

const payload = await getPayload({ config })
let created = 0, updated = 0
for (const folder of Object.keys(F).sort()) {
  const dir = path.join(ROOT, folder)
  if (!fs.existsSync(dir)) continue
  const [category, alt] = F[folder]
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()
  for (const [i, file] of files.entries()) {
    const order = parseInt(folder) * 100 + i
    const sourceFile = `${folder}/${file}`
    const base = { inGallery: true, category, order, sourceFile } as any
    const found = await payload.find({ collection: 'media', where: { or: [{ sourceFile: { equals: sourceFile } }, { and: [{ filename: { equals: file } }, { sourceFile: { exists: false } }] }] }, limit: 1, depth: 0 })
    let id = found.docs[0]?.id
    if (id) { await payload.update({ collection: 'media', id, locale: 'fa', data: { ...base, alt: alt.fa } }); updated++ }
    else { id = (await payload.create({ collection: 'media', locale: 'fa', filePath: path.join(dir, file), data: { ...base, alt: alt.fa } })).id; created++ }
    for (const k of ['ar', 'en'] as const) await payload.update({ collection: 'media', id, locale: k, data: { alt: alt[k] } as any })
  }
}
// Instagram: one account everywhere (owner's request).
await payload.updateGlobal({ slug: 'profile', data: { instagramOffice: 'pudineh.eng', instagramPersonal: 'pudineh.eng' } as any })
console.log(`GALLERY OK created=${created} updated=${updated}`)
process.exit(0)
