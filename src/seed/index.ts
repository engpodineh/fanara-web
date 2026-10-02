import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import crypto from 'crypto'

type L3 = { fa: string; ar: string; en: string }
const L = (fa: string, ar: string, en: string): L3 => ({ fa, ar, en })
const M = '/home/claude/fanara-media'

const payload = await getPayload({ config })

// Create a doc in fa, then write ar/en for each localized field.
async function make(collection: any, base: Record<string, any>, loc: Record<string, L3 | L3[] | undefined>) {
  const pick = (k: 'fa' | 'ar' | 'en') => Object.fromEntries(Object.entries(loc).map(([f, v]) =>
    [f, Array.isArray(v) ? v.map((x) => ({ text: x[k] })) : v?.[k]]))
  const doc = await payload.create({ collection, locale: 'fa', data: { ...base, ...pick('fa') } as any })
  for (const k of ['ar', 'en'] as const) await payload.update({ collection, id: doc.id, locale: k, data: pick(k) as any })
  return doc
}
async function upload(file: string, alt?: L3) {
  const doc = await payload.create({ collection: 'media', locale: 'fa', filePath: path.join(M, file), data: { alt: alt?.fa } as any })
  if (alt) for (const k of ['ar', 'en'] as const) await payload.update({ collection: 'media', id: doc.id, locale: k, data: { alt: alt[k] } as any })
  return doc.id
}

// ---- admin user
const tempPassword = crypto.randomBytes(9).toString('base64url')
await payload.create({ collection: 'users', data: { email: 'fanarateb@gmail.com', password: tempPassword, name: 'Omid Podineh', role: 'admin' } as any })

// ---- media
const hero = await upload('02-hero/aerial-team-site-masterplan-BEST.jpg', L('تیم مهندسی فن‌آرا با نقشه‌ی سایت', 'فريق فن‌آرا الهندسي مع مخطط الموقع', 'Fanara engineering team with the site plan'))
const portrait = await upload('../fanara-preview/img/portrait.webp', L('مهندس امید پودینه', 'المهندس أميد پودينه', 'Eng. Omid Podineh'))
const negin = await upload('26-negin-residential-chabahar/facade-completed-1-BEST.jpg')
const aldhaman = await upload('02-hero/hero-concrete-pump-villas.jpg')
const sewer = await upload('22-site-sewer-network/manhole-S185-lowering.jpg')
const hls: [string, L3][] = [
  ['11-onsite-selfies/selfie-night-footing-survey.jpg', L('کار شب', 'عمل ليلي', 'Night shift')],
  ['26-negin-residential-chabahar/lighting-panel-neat-wiring-BEST.jpg', L('تابلو برق', 'لوحة كهرباء', 'Panel')],
  ['10-plant-room/boiler-alfa-ecoflam.jpg', L('موتورخانه', 'غرفة المراجل', 'Plant room')],
  ['20-hvac-ducting/duct-cable-tray-ceiling-1.jpg', L('کانال‌کشی', 'مجاري الهواء', 'Ductwork')],
  ['08-plumbing-water/ppr-manifold-front.jpg', L('لوله‌کشی', 'التمديدات', 'Pipework')],
  ['16-steel-building-drainage/drainage-network-wide.jpg', L('فاضلاب', 'الصرف الصحي', 'Drainage')],
  ['19-awards/aldhaman-certificate-ceremony.jpg', L('تقدیرنامه', 'شهادة تقدير', 'Award')],
  ['06-team/team-night-group-20.jpg', L('تیم', 'الفريق', 'Team')],
]

// ---- profile
await payload.updateGlobal({ slug: 'profile', locale: 'fa', data: {
  heroImage: hero, portrait,
  heroEyebrow: 'تأسیسات مکانیکی و برقی · طراحی و اجرا',
  heroTitle: 'از نقشه تا تحویل، با یک تیم مسئول',
  heroText: 'فن‌آرا طراحی و اجرای تأسیسات ساختمان را برای پروژه‌های مسکونی، صنعتی و هتلی در ایران و عراق انجام می‌دهد؛ زیر نظر مهندسی با بیش از ۱۵ سال تجربه‌ی کارگاهی.',
  name: 'مهندس امید پودینه', role: 'مدیر بخش مکانیک، شرکت الضمان · کارشناس ارشد مهندسی مکانیک',
  summary: 'از ۲۰۰۷ در کارگاه‌های مسکونی، صنعتی، پتروشیمی و هتلی کار کرده‌ام؛ از سرپرستی اجرا تا مدیریت هم‌زمان واحدهای مکانیک و برق. نقشه‌های تأسیسات را خودم طراحی می‌کنم و اجرای همان نقشه‌ها را در کارگاه پیش می‌برم.',
  stats: [{ value: '15+', label: 'سال سابقه، از ۲۰۰۷' }, { value: '3,500', label: 'واحد مسکونی در پروژه‌ی فعلی' }, { value: '800', label: 'واحد؛ تأسیسات تحویل‌شده در ۹ ماه' }, { value: '3', label: 'زبان کاری: فارسی، عربی، انگلیسی' }],
  languages: [{ language: 'فارسی', level: 'زبان مادری' }, { language: 'عربی (عراقی)', level: 'مکالمه‌ی کاری در کارگاه' }, { language: 'انگلیسی', level: 'مکاتبات و مستندات فنی' }],
  skills: [
    { group: 'مکانیک', items: 'تأسیسات گرمایی، سرمایی و تهویه\nآب، فاضلاب و آتش‌نشانی\nلوله‌کشی صنعتی و پمپ‌ها\nجوشکاری گاز و بازرسی جوش' },
    { group: 'برق', items: 'نقشه‌کشی تک‌خطی و پلان قدرت و روشنایی\nمحاسبه‌ی بار و انتخاب کابل و کلید\nاجرا، تست و راه‌اندازی تابلو' },
    { group: 'نرم‌افزار', items: 'AutoCAD (پیشرفته)\nRevit MEP (پیشرفته)\nWord و Excel' },
  ],
  whatsapp: '+98 990 160 0905', phoneIraq: '+964 780 770 5104', email: 'fanarateb@gmail.com', instagramOffice: 'fanara.eng', instagramPersonal: 'pudineh.eng',
} as any })
const prof = await payload.findGlobal({ slug: 'profile', locale: 'fa' })
const ids = (arr: any[] | null | undefined) => (arr ?? []).map((x) => x.id)
const [sid, lid, kid] = [ids(prof.stats), ids(prof.languages), ids(prof.skills)]
await payload.updateGlobal({ slug: 'profile', locale: 'ar', data: {
  heroEyebrow: 'الأعمال الميكانيكية والكهربائية · تصميم وتنفيذ', heroTitle: 'من المخطط إلى التسليم، مع فريق مسؤول واحد',
  heroText: 'تقدّم فن‌آرا تصميم وتنفيذ أنظمة المباني للمشاريع السكنية والصناعية والفندقية في العراق وإيران، بإشراف مهندس يتمتع بخبرة ميدانية تتجاوز 15 عامًا.',
  name: 'المهندس أميد پودينه', role: 'مدير القسم الميكانيكي، شركة الضمان · ماجستير هندسة ميكانيكية',
  summary: 'أعمل منذ 2007 في مواقع سكنية وصناعية وبتروكيماوية وفندقية؛ من الإشراف على التنفيذ إلى إدارة الوحدتين الميكانيكية والكهربائية معًا. أصمّم مخططات الأنظمة بنفسي وأتابع تنفيذها في الموقع.',
  stats: [['15+', 'سنة خبرة منذ 2007'], ['3,500', 'وحدة سكنية في المشروع الحالي'], ['800', 'وحدة؛ أعمال الأنظمة سُلّمت خلال 9 أشهر'], ['3', 'لغات عمل: الفارسية والعربية والإنجليزية']].map(([value, label], i) => ({ id: sid[i], value, label })),
  languages: [['الفارسية', 'اللغة الأم'], ['العربية (العراقية)', 'تواصل عملي في الموقع'], ['الإنجليزية', 'المراسلات والوثائق الفنية']].map(([language, level], i) => ({ id: lid[i], language, level })),
  skills: [['الميكانيك', 'التدفئة والتبريد والتهوية\nالمياه والصرف ومكافحة الحريق\nالأنابيب الصناعية والمضخات\nلحام الغاز وفحص اللحام'], ['الكهرباء', 'المخططات أحادية الخط ومخططات القدرة والإنارة\nحساب الأحمال واختيار الكابلات والقواطع\nتنفيذ اللوحات وفحصها وتشغيلها'], ['البرامج', 'AutoCAD (متقدم)\nRevit MEP (متقدم)\nWord وExcel']].map(([group, items], i) => ({ id: kid[i], group, items })),
} as any })
await payload.updateGlobal({ slug: 'profile', locale: 'en', data: {
  heroEyebrow: 'Mechanical & Electrical · Design and Execution', heroTitle: 'From drawing to handover, one accountable team',
  heroText: 'Fanara designs and builds building services for residential, industrial and hospitality projects in Iran and Iraq, led by an engineer with over 15 years on site.',
  name: 'Eng. Omid Podineh', role: 'Mechanical Manager, Al-Dhaman Co. · M.Sc. Mechanical Engineering',
  summary: 'Since 2007 I have worked on residential, industrial, petrochemical and hotel sites — from execution supervision to running mechanical and electrical units together. I design the services drawings myself and take the same drawings through to installation.',
  stats: [['15+', 'Years on site, since 2007'], ['3,500', 'Housing units, current project'], ['800', 'Units — services delivered in 9 months'], ['3', 'Working languages: Persian, Arabic, English']].map(([value, label], i) => ({ id: sid[i], value, label })),
  languages: [['Persian', 'Native'], ['Arabic (Iraqi)', 'Working proficiency on site'], ['English', 'Technical correspondence and documents']].map(([language, level], i) => ({ id: lid[i], language, level })),
  skills: [['Mechanical', 'HVAC\nWater supply, drainage and firefighting\nIndustrial piping and pumps\nGas welding and weld inspection'], ['Electrical', 'Single-line diagrams, power and lighting layouts\nLoad calculation, cable and breaker sizing\nPanel installation, testing and commissioning'], ['Software', 'AutoCAD (advanced)\nRevit MEP (advanced)\nWord and Excel']].map(([group, items], i) => ({ id: kid[i], group, items })),
} as any })

// ---- services
const svc: [string, L3, L3][] = [
  ['MECH', L('تأسیسات مکانیکی', 'الأعمال الميكانيكية', 'Mechanical services'), L('گرمایش، سرمایش و تهویه، آب و فاضلاب، آتش‌نشانی، گاز و موتورخانه.', 'التدفئة والتبريد والتهوية، المياه والصرف، مكافحة الحريق، الغاز وغرف المراجل.', 'HVAC, water supply and drainage, firefighting, gas and plant rooms.')],
  ['ELEC', L('تأسیسات برقی', 'الأعمال الكهربائية', 'Electrical services'), L('روشنایی، قدرت، تابلو و دیاگرام تک‌خطی، ارتینگ، جریان ضعیف.', 'الإنارة والقدرة، اللوحات والمخطط أحادي الخط، التأريض، التيار الخفيف.', 'Lighting, power, panels and single-line diagrams, earthing, low current.')],
  ['ARCH', L('معماری', 'العمارة', 'Architecture'), L('پلان، نما و پلان مبلمان توسط معماران تیم.', 'المساقط والواجهات ومخططات الأثاث من قبل معماريي الفريق.', "Plans, elevations and furniture layouts by the team's architects.")],
  ['SHOP', L('نقشه‌ی اجرایی و Revit', 'المخططات التنفيذية وRevit', 'Shop drawings & Revit'), L('Shop Drawing و مدل هماهنگ تأسیسات با سازه و معماری.', 'Shop Drawings ونموذج منسّق للأنظمة مع الإنشائي والمعماري.', 'Shop drawings and a services model coordinated with structure and architecture.')],
  ['BOQ', L('برآورد مقادیر و هزینه', 'حساب الكميات والكلفة', 'Quantities & cost'), L('متره و برآورد بر اساس فهرست‌بها یا قیمت روز.', 'جداول الكميات والتكاليف وفق قوائم الأسعار أو أسعار السوق.', 'Take-off and estimates against the official price list or market rates.')],
  ['SUP', L('نظارت و مشاوره', 'الإشراف والاستشارة', 'Supervision & advice'), L('نظارت اجرایی، کنترل کیفیت و راه‌اندازی.', 'الإشراف التنفيذي وضبط الجودة والتشغيل.', 'Site supervision, quality control and commissioning.')],
]
for (const [i, [code, title, description]] of svc.entries()) await make('services', { code, order: i }, { title, description })

// ---- projects
const neginP = await make('projects', { slug: 'negin-residential-complex', published: true, featured: true, order: 1, status: 'delivered', category: 'execution', period: '2023 – 2025', showClientName: true, cover: negin, systems: ['hvac', 'plumbing', 'fire', 'electrical-power', 'lighting', 'finishing'] }, {
  title: L('مجتمع اقامتی نگین، چابهار', 'مجمع نگين السكني، تشابهار', 'Negin Residential Complex, Chabahar'),
  summary: L('سرپرستی کارگاه؛ تأسیسات مکانیکی، برقی و نازک‌کاری تا افتتاح.', 'إدارة الموقع؛ الأعمال الميكانيكية والكهربائية والتشطيبات حتى الافتتاح.', 'Site supervision of mechanical, electrical and finishing works through to opening.'),
  client: L('نگین مکران (NMPC)', 'نگين مكران (NMPC)', 'Negin Makran (NMPC)'), location: L('چابهار، ایران', 'تشابهار، إيران', 'Chabahar, Iran'),
  role: L('سرپرست کارگاه (تأسیسات و نازک‌کاری)', 'مشرف الموقع (الأنظمة والتشطيبات)', 'Site Supervisor (MEP & finishing)'),
})
const aldP = await make('projects', { slug: 'al-dhaman-3500-units', published: true, featured: true, order: 2, status: 'in-progress', category: 'execution', period: '2026 –', showClientName: false, cover: aldhaman, systems: ['plumbing', 'drainage', 'electrical-power', 'infrastructure'] }, {
  title: L('مجتمع مسکونی ۳۵۰۰ واحدی، عراق', 'مجمع سكني من 3500 وحدة، العراق', '3,500-unit residential development, Iraq'),
  summary: L('مدیریت بخش مکانیک، شرکت الضمان. تأسیسات ۸۰۰ واحد در ۹ ماه تحویل شد.', 'إدارة القسم الميكانيكي، شركة الضمان. تم تسليم أنظمة 800 وحدة خلال 9 أشهر.', 'Mechanical department lead, Al-Dhaman Co. Services for 800 units delivered in 9 months.'),
  client: L('شرکت الضمان', 'شركة الضمان', 'Al-Dhaman Co.'), location: L('عراق', 'العراق', 'Iraq'),
  role: L('مدیر بخش مکانیک', 'مدير القسم الميكانيكي', 'Mechanical Manager'),
})
await make('projects', { slug: 'sewer-network-precast-manholes', published: true, featured: true, order: 3, status: 'in-progress', category: 'execution', cover: sewer, systems: ['drainage', 'infrastructure'] }, {
  title: L('شبکه‌ی فاضلاب و منهول‌های پیش‌ساخته', 'شبكة الصرف الصحي والمنهولات مسبقة الصنع', 'Sewer network and precast manholes'),
  summary: L('لوله‌ی HDPE، منهول بتنی با پوشش قیر، اجرای ترانشه.', 'أنابيب HDPE، منهولات خرسانية مطلية بالقار، تنفيذ الخنادق.', 'HDPE mains, bitumen-coated precast manholes, trench works.'),
  location: L('عراق', 'العراق', 'Iraq'),
})

// ---- experience
const exp: [string, string | null, L3, L3, L3, L3[], number?][] = [
  ['2026-02-01', null, L('مدیر بخش مکانیک', 'مدير القسم الميكانيكي', 'Mechanical Manager'), L('شرکت الضمان · مجتمع مسکونی ۳۵۰۰ واحدی', 'شركة الضمان · مجمع سكني من 3500 وحدة', 'Al-Dhaman Co. · 3,500-unit residential development'), L('عراق', 'العراق', 'Iraq'), [
    L('مدیریت واحدهای مکانیک و برق، شامل تیم‌های اجرایی و دفتر فنی.', 'إدارة الوحدتين الميكانيكية والكهربائية بفرقها الميدانية ومكتبها الفني.', 'Leads the mechanical and electrical units across field and technical teams.'),
    L('تحویل تأسیسات ۸۰۰ واحد مسکونی در ۹ ماه.', 'تسليم أنظمة 800 وحدة سكنية خلال 9 أشهر.', 'Delivered building services for 800 housing units in 9 months.'),
    L('نظارت بر نقشه‌ها، برآورد هزینه و کیفیت نصب؛ هماهنگی برنامه‌ی اجرای رشته‌ها.', 'الإشراف على المخططات وتقدير الكلف وجودة التركيب؛ وتنسيق جداول التنفيذ بين التخصصات.', 'Oversees drawings, cost estimates and installation quality; aligns schedules across trades.'),
  ]],
  ['2023-06-01', '2025-08-01', L('سرپرست کارگاه (تأسیسات و نازک‌کاری)', 'مشرف الموقع (الأنظمة والتشطيبات)', 'Site Supervisor (MEP & Finishing)'), L('مجتمع اقامتی نگین · کارفرما: NMPC', 'مجمع نگين السكني · صاحب العمل: NMPC', 'Negin Residential Complex · Client: NMPC'), L('چابهار، ایران', 'تشابهار، إيران', 'Chabahar, Iran'), [
    L('سرپرستی اجرای تأسیسات مکانیکی، برقی و نازک‌کاری تا تحویل و افتتاح.', 'الإشراف على تنفيذ الأعمال الميكانيكية والكهربائية والتشطيبات حتى التسليم والافتتاح.', 'Supervised mechanical, electrical and finishing works through to handover and opening.'),
    L('مدیریت ماشین‌آلات، نیروی کارگاه و گزارش روزانه‌ی اجرا.', 'إدارة الآليات والقوى العاملة والتقارير اليومية.', 'Managed machinery, site workforce and daily execution reports.'),
  ]],
  ['2024-06-01', '2025-03-01', L('سرپرست کارگاه', 'مشرف الموقع', 'Site Supervisor'), L('سیف بنا · پروژه‌ی تجاری لنج (مشارکت با شهرداری)', 'سيف بنا · مشروع لنج التجاري (بالشراكة مع البلدية)', 'Saif Bana · Lanj Commercial Project (JV with Municipality)'), L('چابهار، ایران', 'تشابهار، إيران', 'Chabahar, Iran'), [
    L('سرپرستی عملیات خاکی و دفتر فنی.', 'الإشراف على أعمال الحفر والمكتب الفني.', 'Led earthworks execution and the technical office.'),
  ]],
  ['2024-04-01', '2024-09-01', L('سرپرست تأسیسات', 'مشرف الأعمال الكهروميكانيكية', 'MEP Supervisor'), L('نخل تابان مکران · هتل سیدوس و رستوران ویکولند', 'نخل تابان مكران · فندق سيدوس ومطعم ويكولاند', 'Nakhl Taban Makran · Sidous Hotel & Vikoland Restaurant'), L('منطقه آزاد چابهار', 'منطقة تشابهار الحرة', 'Chabahar Free Zone'), [
    L('بازسازی و ارتقای سیستم‌های تأسیساتی.', 'تجديد وتطوير الأنظمة الكهروميكانيكية.', 'Supervised renovation and system upgrades.'),
  ]],
  ['2022-05-01', '2023-02-01', L('کارشناس تأسیسات', 'أخصائي الأنظمة', 'Facilities Specialist'), L('سیف بنا · پروژه‌ی تجاری اسکادا', 'سيف بنا · مشروع إسكادا التجاري', 'Saif Bana · Eskada Commercial Project'), L('ارمنستان', 'أرمينيا', 'Armenia'), [
    L('نخستین مأموریت بین‌المللی؛ سرپرستی تأسیسات پروژه‌ی تجاری.', 'أول مهمة دولية؛ الإشراف على أنظمة مشروع تجاري.', 'First international assignment; supervised facilities systems for a commercial project.'),
  ]],
  ['2019-06-01', '2020-03-01', L('کارشناس تأسیسات', 'خبير الأنظمة', 'Facilities Expert'), L('شهرداری تهران، منطقه ۴ · تصفیه‌خانه', 'بلدية طهران، المنطقة 4 · محطة معالجة المياه', 'Tehran Municipality, District 4 · Water Treatment Plant'), L('تهران، ایران', 'طهران، إيران', 'Tehran, Iran'), [
    L('اجرای زیرساخت مکانیکی تصفیه‌خانه‌ی شهری.', 'تنفيذ البنية التحتية الميكانيكية لمحطة معالجة بلدية.', 'Mechanical infrastructure installation for a municipal water treatment plant.'),
  ]],
  ['2013-08-01', '2015-01-01', L('سرپرست اجرا', 'مشرف التنفيذ', 'Execution Supervisor'), L('کارخانه پنیر صبا', 'مصنع صبا للأجبان', 'Saba Cheese Factory'), L('گنبد کاووس، ایران', 'گنبد كاووس، إيران', 'Gonbad-e Kavus, Iran'), [
    L('اجرای تأسیسات صنعتی کارخانه.', 'تنفيذ الأنظمة الصناعية للمصنع.', 'Supervised industrial facilities installation.'),
  ]],
  ['2010-10-01', '2012-02-01', L('پیمانکار تأسیسات', 'مقاول الأنظمة', 'Contractor'), L('باران', 'باران', 'Baran'), L('مشهد، ایران', 'مشهد، إيران', 'Mashhad, Iran'), [
    L('اجرای پیمانی تأسیسات پروژه‌های مسکونی.', 'تنفيذ أعمال الأنظمة بالمقاولة لمشاريع سكنية.', 'Contracted facilities works for residential projects.'),
  ]],
  ['2009-06-01', '2010-08-01', L('پیمانکار تأسیسات مکانیکی', 'مقاول الأعمال الميكانيكية', 'Mechanical Contractor'), L('نگین · برج سلمان', 'نگين · برج سلمان', 'Negin · Salman Tower'), L('مشهد، ایران', 'مشهد، إيران', 'Mashhad, Iran'), [
    L('پیمانکار درجه‌یک اجرای تأسیسات مکانیکی.', 'مقاول من الدرجة الأولى لتنفيذ الأعمال الميكانيكية.', 'First-tier contractor for mechanical works.'),
  ]],
  ['2008-07-01', '2009-03-01', L('سرپرست اجرا', 'مشرف التنفيذ', 'Execution Supervisor'), L('مهندسی الماس · مسکن ملی اندیشه', 'الماس للهندسة · الإسكان الوطني في أنديشه', 'Almas Engineering · National housing, Andisheh'), L('مشهد، ایران', 'مشهد، إيران', 'Mashhad, Iran'), []],
  ['2007-05-01', '2008-05-01', L('سرپرست تأسیسات', 'مشرف الأنظمة', 'Facilities Supervisor'), L('فلات شرق · ۱۲۰۰ واحد مسکن ملی مهرگان', 'فلات شرق · 1200 وحدة إسكان وطني في مهرگان', 'Falat-e Sharq · 1,200-unit national housing, Mehregan'), L('مشهد، ایران', 'مشهد، إيران', 'Mashhad, Iran'), []],
]
for (const [start, end, title, company, location, bullets] of exp)
  await make('experience', { start, end, current: !end, project: start === '2026-02-01' ? aldP.id : start === '2023-06-01' ? neginP.id : undefined }, { title, company, location, bullets })

// ---- credentials
const cr: [string, string | undefined, number | undefined, L3, L3][] = [
  ['degree', undefined, undefined, L('کارشناسی ارشد مهندسی مکانیک', 'ماجستير الهندسة الميكانيكية', 'M.Sc. Mechanical Engineering'), L('مؤسسه آموزش عالی ماهان', 'معهد ماهان للتعليم العالي', 'Mahan Institute of Higher Education')],
  ['degree', '2016', undefined, L('کارشناسی مهندسی مکانیک (حرارت و سیالات)', 'بكالوريوس الهندسة الميكانيكية (حرارة وموائع)', 'B.Sc. Mechanical Engineering (Thermal & Fluids)'), L('دانشگاه آزاد اسلامی، بناب', 'جامعة آزاد الإسلامية، بناب', 'Islamic Azad University, Bonab')],
  ['certificate', undefined, 640, L('متخصص لوله‌کشی صنعتی', 'أخصائي الأنابيب الصناعية', 'Industrial Piping Specialist'), L('NPC', 'NPC', 'NPC')],
  ['certificate', undefined, 230, L('مهارت لوله‌کشی گاز (مسکونی و تجاری)', 'مهارة تمديدات الغاز (سكني وتجاري)', 'Gas Pipeline Skills (Residential & Commercial)'), L('', '', '')],
  ['certificate', '1404', 100, L('افسر ایمنی HSE', 'ضابط السلامة HSE', 'HSE Safety Officer'), L('مرکز آموزش هرمس', 'مركز هرمس للتدريب', 'Hermes Training Center')],
  ['certificate', undefined, 100, L('تجهیزات پتروشیمی', 'معدات البتروكيماويات', 'Petrochemical Equipment Specialist'), L('', '', '')],
  ['certificate', undefined, undefined, L('جوشکاری گاز و بازرسی جوش', 'لحام الغاز وفحص اللحام', 'Gas Welding & Weld Inspection'), L('', '', '')],
  ['certificate', undefined, undefined, L('پمپ‌ها و تجهیزات پالایشگاهی', 'مضخات ومعدات المصافي', 'Refinery Pumps & Equipment'), L('', '', '')],
  ['award', '2026', undefined, L('تقدیرنامه‌ی روز مهندس', 'شهادة تقدير بمناسبة يوم المهندس', "Engineer's Day Appreciation"), L('شرکت الضمان', 'شركة الضمان', 'Al-Dhaman Co.')],
]
for (const [i, [kind, year, hours, title, issuer]] of cr.entries()) await make('credentials', { kind, year, hours, order: i }, { title, issuer })

// ---- highlights
for (const [file, caption] of hls) { const m = await upload(file); await make('highlights', { media: m, album: 'site' }, { caption }) }

console.log('\nSEED OK. Admin: fanarateb@gmail.com  temp password:', tempPassword)
process.exit(0)
