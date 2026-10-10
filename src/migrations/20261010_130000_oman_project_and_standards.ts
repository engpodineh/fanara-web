import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import fs from 'node:fs'
import path from 'node:path'

// Owner request (2026-10-10):
// 1) add the Oman office building (Plot 1306, Al Hail, Muscat) to in-progress projects — supervision & execution,
//    contractor Al-Dhaman, Iraqi client (name not published). Cover = front elevation from the approved drawings
//    (drawing area only; title block with owner/consultant names cropped out).
// 2) archive his Oman design-references guide (OMN-STD-001 R01) and its reference list in the PRIVATE standards bank.
const SLUG = 'oman-al-hail-1306-office-building'
const TEXT = {
  fa: {
    title: 'ساختمان اداری ۸ طبقه، مسقط — عمان',
    summary: 'ساختمان اداری‌تجاری B+G+6+PH در قطعه‌ی ۱۳۰۶ الحیل، مسقط: ۴۹ واحد اداری و ۲ مغازه. نظارت و اجرای تأسیسات مکانیکی، برقی و اطفای حریق؛ مجری: شرکت الضمان، کارفرما: عراقی. طراحی بر مبنای کدهای ساختمانی عمان (OBC/OMC/OPC) و الزامات تأییدشده‌ی پدافند مدنی (CDAA).',
    location: 'مسقط، عمان', role: 'نظارت و اجرا (مجری: شرکت الضمان)',
  },
  ar: {
    title: 'مبنى مكاتب من 8 طوابق، مسقط — سلطنة عمان',
    summary: 'مبنى إداري وتجاري B+G+6+PH على القطعة 1306 في الحيل، مسقط: 49 مكتبًا ومحلّان. الإشراف وتنفيذ الأعمال الميكانيكية والكهربائية وأنظمة مكافحة الحريق؛ المقاول المنفّذ: شركة الضمان، وصاحب العمل عراقي. التصميم وفق أكواد البناء العُمانية (OBC/OMC/OPC) ومتطلبات الدفاع المدني والإسعاف المعتمدة.',
    location: 'مسقط، سلطنة عمان', role: 'الإشراف والتنفيذ (المقاول: شركة الضمان)',
  },
  en: {
    title: 'Eight-storey office building, Muscat — Oman',
    summary: 'B+G+6+PH office and retail building on Plot 1306, Al Hail, Muscat: 49 offices and 2 shops. Supervision and execution of mechanical, electrical and fire-protection works; contractor Al-Dhaman Co., Iraqi client. Designed to the Oman building codes (OBC/OMC/OPC) and the approved Civil Defence (CDAA) requirements.',
    location: 'Muscat, Oman', role: 'Supervision & execution (contractor: Al-Dhaman Co.)',
  },
} as const

const GUIDE_NOTES = `راهنمای مراجع طراحی ساختمان در سلطنت عمان — نامه‌ی راهنما برای همکاری مهندسین ایرانی (بردبار عمان، OMN-STD-001 / R01، 2026/10/08).
مبنا: کدهای وزارت مسکن و برنامه‌ریزی شهری عمان (MoHUP) — OBC، OMC، OPC، OPSDC، OEESC، OEHBC — بر پایه‌ی ICC (IBC 2021 با اصلاحات عمان و برخی احکام IBC 2024). طبق بند 102.4 OBC در تعارض، حکم کد اولویت دارد؛ استاندارد معادل (BS/EN/ISO) فقط با تأیید مرجع.
برق: OES 4 (APSR) و Nama Distribution؛ IEC 60364 و BS 7671. آتش: NFPA 13/14/20/72 و CDAA.`

type Ref = [number: string, title: string, publisher: string, discipline: string, country: string, url: string]
const REFS: Ref[] = [
  ['MoHUP Codes', 'Oman Building Codes (index)', 'MoHUP', 'general', 'OM', 'https://mohup.gov.om/en/open-data/building-code'],
  ['OBC', 'Oman Building Code', 'MoHUP / ICC', 'architecture', 'OM', 'https://mohup.gov.om/pdf/open-data/codes/buildings.pdf'],
  ['OMC', 'Oman Mechanical Code', 'MoHUP / ICC', 'mechanical', 'OM', 'https://mohup.gov.om/pdf/open-data/codes/mechanical.pdf'],
  ['OPC', 'Oman Plumbing Code', 'MoHUP / ICC', 'mechanical', 'OM', 'https://mohup.gov.om/pdf/open-data/codes/plumbing.pdf'],
  ['OPSDC', 'Oman Private Sewage Disposal Code', 'MoHUP / ICC', 'mechanical', 'OM', 'https://mohup.gov.om/en/open-data/building-code'],
  ['OEESC', 'Oman Energy Efficiency & Sustainability Code', 'MoHUP / ICC', 'energy', 'OM', 'https://mohup.gov.om/pdf/open-data/codes/energy.pdf'],
  ['OEHBC', 'Oman Existing & Historic Buildings Code', 'MoHUP / ICC', 'civil', 'OM', 'https://mohup.gov.om/pdf/open-data/codes/historical.pdf'],
  ['OES 4', 'Electrical Installations in Buildings', 'APSR', 'electrical', 'OM', 'https://apsr.om/pdfs/oes/OES4ElectricalInstallationsinBuildings.pdf'],
  ['Nama OES', 'Oman Electrical Standards', 'Nama Distribution', 'electrical', 'OM', 'https://distribution.nama.om/oes'],
  ['OBC Ch.16', 'Oman OBC Chapter 16 — Structural Design', 'ICC', 'structural', 'OM', 'https://codes.iccsafe.org/content/OBC2025P1/chapter-16-structural-design'],
  ['CDAA', 'Civil Defence & Ambulance Authority — publications / services', 'CDAA', 'fire', 'OM', 'https://cdaa.gov.om/?page_id=923'],
  ['MOI services', 'Ministry of Interior — municipal services', 'Ministry of Interior', 'general', 'OM', 'https://msp.moi.gov.om/HS/tservicesar'],
  ['ASCE/SEI 7', 'Minimum Design Loads and Associated Criteria for Buildings and Other Structures', 'ASCE', 'structural', 'US', 'https://www.asce.org/publications-and-news/asce-7/'],
  ['ACI 318', 'Building Code Requirements for Structural Concrete', 'ACI', 'structural', 'US', 'https://www.concrete.org/topicsinconcrete/318buildingcodeportal.aspx'],
  ['AISC 360 / 341', 'Structural Steel Buildings / Seismic Provisions', 'AISC', 'structural', 'US', 'https://www.aisc.org/aisc/publications/current-standards/aisc-360'],
  ['ASTM D2487', 'Soil Classification (USCS)', 'ASTM', 'civil', 'US', 'https://store.astm.org/standards/d2487'],
  ['ASTM D1586', 'Standard Penetration Test (SPT)', 'ASTM', 'civil', 'US', 'https://doi.org/10.1520/D1586_D1586M-18E01'],
  ['ASHRAE 62.1 / 62.2', 'Ventilation and Acceptable Indoor Air Quality', 'ASHRAE', 'mechanical', 'US', 'https://www.ashrae.org/technical-resources/bookstore/standards-62-1-62-2'],
  ['ASHRAE/IES 90.1', 'Energy Standard for Buildings', 'ASHRAE / IES', 'energy', 'US', 'https://www.ashrae.org/technical-resources/bookstore/standard-90-1'],
  ['NFPA 13', 'Installation of Sprinkler Systems', 'NFPA', 'fire', 'US', 'https://www.nfpa.org/product/nfpa-13-standard-for-the-installation-of-sprinkler-systems/p0013code'],
  ['NFPA 14 / 20', 'Standpipe and Hose Systems / Stationary Fire Pumps', 'NFPA', 'fire', 'US', 'https://www.nfpa.org/for-professionals/codes-and-standards/list-of-codes-and-standards'],
  ['NFPA 72', 'National Fire Alarm and Signaling Code', 'NFPA', 'fire', 'US', 'https://link.nfpa.org/all-publications/72/2022'],
  ['IEC 60364', 'Low-voltage Electrical Installations', 'IEC', 'electrical', 'INT', 'https://webstore.iec.ch/en/publication/63699'],
  ['BS 7671', 'Requirements for Electrical Installations (IET Wiring Regulations)', 'IET / BSI', 'electrical', 'UK', 'https://electrical.theiet.org/bs-7671-18th-edition-wiring-regulations/about-bs-7671/'],
  ['ACI 301', 'Specifications for Concrete Construction', 'ACI', 'structural', 'US', 'https://www.concrete.org/store/productdetail.aspx?ItemID=301U20&Language=English&Units=US_Units'],
  ['ACI 117', 'Concrete Construction Tolerances', 'ACI', 'structural', 'US', 'https://www.concrete.org/getinvolved/committees/directoryofcommittees/acommitteehome/committee_code/c0011700.aspx'],
  ['ACI MNL-15', 'Concrete construction reference collection', 'ACI', 'structural', 'US', 'https://www.concrete.org/store/productdetail.aspx?ItemID=MNL1520&Language=English&Units=US_Units'],
  ['ASTM A615/A615M', 'Carbon-steel reinforcing bars', 'ASTM', 'structural', 'US', 'https://store.astm.org/a0615_a0615m-26.html'],
  ['ASTM A706/A706M', 'Low-alloy steel reinforcing bars', 'ASTM', 'structural', 'US', 'https://store.astm.org/a0706_a0706m-22.html'],
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const root = process.cwd()

  // ---- project
  const exists = await payload.find({ collection: 'projects', where: { slug: { equals: SLUG } }, limit: 1, depth: 0, req, overrideAccess: true })
  if (!exists.docs.length) {
    let cover: number | string | undefined
    const coverFile = path.resolve(root, 'content/projects/oman/oman-1306-front-elevation.jpg')
    if (fs.existsSync(coverFile)) {
      const alt = { fa: 'نمای اصلی ساختمان اداری قطعه‌ی ۱۳۰۶، مسقط', ar: 'الواجهة الأمامية لمبنى المكاتب، القطعة 1306، مسقط', en: 'Front elevation, Plot 1306 office building, Muscat' }
      const m = await payload.create({ collection: 'media', locale: 'fa', filePath: coverFile, req, overrideAccess: true, data: { alt: alt.fa, sourceFile: 'projects/oman/oman-1306-front-elevation.jpg', inGallery: false } as any })
      for (const l of ['ar', 'en'] as const) await payload.update({ collection: 'media', id: m.id, locale: l, data: { alt: alt[l] } as any, req, overrideAccess: true })
      cover = m.id
    }
    const doc = await payload.create({
      collection: 'projects', locale: 'fa', req, overrideAccess: true,
      data: {
        slug: SLUG, published: true, featured: true, order: 1, status: 'in-progress', category: 'execution', period: '2026 –',
        showClientName: false, systems: ['hvac', 'plumbing', 'drainage', 'fire', 'electrical-power', 'lighting', 'low-current'],
        ...(cover ? { cover, gallery: [cover] } : {}), ...TEXT.fa,
      } as any,
    })
    for (const l of ['ar', 'en'] as const) await payload.update({ collection: 'projects', id: doc.id, locale: l, data: { ...TEXT[l] } as any, req, overrideAccess: true })
  }

  // ---- private standards bank
  const has = await payload.find({ collection: 'standards', where: { number: { equals: 'OMN-STD-001' } }, limit: 1, depth: 0, req, overrideAccess: true })
  if (has.docs.length) return
  let file: number | string | undefined
  const pdf = path.resolve(root, 'content/standards/OMN-STD-001-R01-oman-design-references.pdf')
  if (fs.existsSync(pdf)) file = (await payload.create({ collection: 'standard-files', filePath: pdf, data: {}, req, overrideAccess: true })).id
  await payload.create({
    collection: 'standards', req, overrideAccess: true,
    data: {
      title: 'راهنمای مراجع طراحی ساختمان در عمان (نامه‌ی راهنما برای مهندسین ایرانی)', publisher: 'بردبار عمان', number: 'OMN-STD-001', edition: 'R01', year: '2026',
      discipline: 'general', country: 'OM', status: 'valid', accessTier: 'private', ...(file ? { file } : {}), notes: GUIDE_NOTES,
    } as any,
  })
  for (const [number, title, publisher, discipline, country, url] of REFS) {
    await payload.create({
      collection: 'standards', req, overrideAccess: true,
      data: {
        title, publisher, number, discipline, country, status: 'verify', accessTier: 'private',
        notes: `منبع: ${url}\nاز فهرست مراجع OMN-STD-001 R01 (پروژه‌های عمان). ویرایش قابل اعمال را از کد پروژه و مرجع تأیید مشخص کنید.`,
      } as any,
    })
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({ collection: 'projects', where: { slug: { equals: SLUG } }, req, overrideAccess: true })
}
