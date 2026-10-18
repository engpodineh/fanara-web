import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import fs from 'node:fs'
import path from 'node:path'

// Owner request (2026-10-18): add Eng. Behzad Goljaei and Eng. Amin Parvaei (civil unit) with resumes and contacts.
type L3 = { fa: string; ar: string; en: string }
type M = { file: string; order: number; name: L3; position: L3; bio: L3; resume: L3; whatsapp?: string; phone?: string; email?: string }

const MEMBERS: M[] = [
  {
    file: 'team-08-goljaei.jpg', order: 5,
    name: { fa: 'مهندس بهزاد قولجایی', ar: 'المهندس بهزاد قولجايي', en: 'Eng. Behzad Goljaei' },
    position: { fa: 'سرپرست پروژه — کارشناس ارشد عمران', ar: 'مدير موقع المشروع — ماجستير هندسة مدنية', en: 'Project Superintendent — Senior Civil Engineer' },
    bio: {
      fa: 'مهندس عمران با بیش از ۱۵ سال سابقه در مدیریت، نظارت و اجرای پروژه‌های مسکونی، تجاری، هتل‌سازی و زیرساختی در ایران و عراق؛ دارای پروانه اشتغال پایه ۳ نظارت و اجرا (عمران). سرپرست پروژه ۱۶۰۰ واحدی شمس نجف.',
      ar: 'مهندس مدني بخبرة تزيد على 15 سنة في إدارة والإشراف على وتنفيذ المشاريع السكنية والتجارية والفندقية والبنى التحتية في العراق وإيران؛ حاصل على إجازة مزاولة المهنة (درجة 3 إشراف وتنفيذ — مدني). مدير موقع مشروع شمس النجف السكني (1600 وحدة).',
      en: 'Civil engineer with 15+ years managing, supervising and executing residential, commercial, hotel and infrastructure projects in Iraq and Iran; licensed (Grade 3, supervision & execution — civil). Project superintendent of the 1,600-unit Shams Najaf complex.',
    },
    resume: {
      fa: [
        'سرپرست پروژه مجتمع مسکونی ۱۶۰۰ واحدی شمس — نجف اشرف، عراق (۱۴۰۴ تاکنون)',
        'سرپرست اجرایی پروژه هتل پنج‌ستاره ناموتل — کربلا، عراق (۱۴۰۳–۱۴۰۴)',
        'سرپرست اجرایی پروژه مهمانسرا — چابهار (۱۴۰۰–۱۴۰۳)',
        'سرپرست کارگاه هتل سدس و مسئول کنترل کیفیت و آزمایشگاه بتن — منطقه آزاد چابهار (۱۳۹۵–۱۴۰۰)',
        'سرپرست پروژه‌های عمرانی — مشهد (۱۳۹۴–۱۳۹۵)',
        'سرپرست کارگاه سقف عرشه فولادی، ساختمان پزشکان رازی — تهران (۱۳۹۴)',
        'سرپرست کارگاه، معاون اجرا و کارشناس دفتر فنی پروژه البرز مال — کرج (۱۳۹۱–۱۳۹۴)',
        'کارشناس کنترل کیفیت، کارخانه تجهیزات ساختمانی و صنعتی (۱۳۸۸–۱۳۸۹)',
        'ناظر پروژه‌های عمرانی — چابهار (۱۳۸۶–۱۳۸۸)',
        'کارشناس اجرا، پروژه‌های مسکونی آفتاب و ساسان — تهران (۱۳۸۴–۱۳۸۶)',
        'تحصیلات: کارشناسی ارشد مهندسی عمران — دانشگاه آزاد اسلامی شاهرود',
        'مهارت‌ها: مدیریت کارگاه و پیمانکاران، کنترل پروژه، دفتر فنی و صورت‌وضعیت، QC، سازه‌های بتنی و فلزی، مقررات ملی ساختمان، HSE، AutoCAD، Excel',
        'زبان‌ها: فارسی، ترکی، عربی و انگلیسی (متوسط)',
      ].join('\n'),
      ar: [
        'مدير موقع مجمع شمس السكني (1600 وحدة) — النجف الأشرف، العراق (2025 – الآن)',
        'مشرف تنفيذ فندق ناموتل خمس نجوم — كربلاء، العراق (2024–2025)',
        'مشرف تنفيذ مشروع دار ضيافة — چابهار (2021–2024)',
        'مدير موقع فندق سدس ومسؤول السيطرة النوعية ومختبر الخرسانة — منطقة چابهار الحرة (2016–2021)',
        'مشرف مشاريع مدنية — مشهد (2015–2016)',
        'مدير موقع سقف الديك الحديدي (Steel deck)، بناية أطباء الرازي — طهران (2015)',
        'مدير موقع، معاون تنفيذ ومهندس مكتب فني لمشروع البرز مول — كرج (2012–2015)',
        'مهندس سيطرة نوعية في مصنع معدات إنشائية وصناعية (2009–2010)',
        'مهندس مشرف على مشاريع مدنية — چابهار (2007–2009)',
        'مهندس تنفيذ، مشاريع آفتاب وساسان السكنية — طهران (2005–2007)',
        'المؤهل: ماجستير هندسة مدنية — جامعة آزاد الإسلامية، شاهرود',
        'المهارات: إدارة المواقع والمقاولين، ضبط المشروع، المكتب الفني والمستخلصات، السيطرة النوعية، المنشآت الخرسانية والحديدية، السلامة (HSE)، AutoCAD، Excel',
        'اللغات: الفارسية، التركية، العربية والإنجليزية (متوسط)',
      ].join('\n'),
      en: [
        'Project Superintendent, Shams Najaf residential complex (1,600 units) — Najaf, Iraq (2025–present)',
        'Execution Superintendent, Namotel five-star hotel — Karbala, Iraq (2024–2025)',
        'Execution Superintendent, guesthouse project — Chabahar (2021–2024)',
        'Site Manager, Sedes Hotel; QC and concrete lab lead — Chabahar Free Zone (2016–2021)',
        'Civil Projects Supervisor — Mashhad (2015–2016)',
        'Site Manager, steel-deck slabs, Razi Medical Building — Tehran (2015)',
        'Site Manager, Deputy Construction Manager and Technical Office Engineer, Alborz Mall — Karaj (2012–2015)',
        'QC Engineer, building & industrial equipment factory (2009–2010)',
        'Supervising Engineer, civil projects — Chabahar (2007–2009)',
        'Site Engineer, Aftab & Sasan residential projects — Tehran (2005–2007)',
        'Education: M.Sc. Civil Engineering — Islamic Azad University, Shahrood',
        'Skills: site & subcontractor management, project control, technical office & payment certificates, QC, concrete & steel structures, HSE, AutoCAD, Excel',
        'Languages: Persian, Turkish, Arabic and English (intermediate)',
      ].join('\n'),
    },
    whatsapp: '+989373338705', phone: '09373338705', email: 'behzadgh919@gmail.com',
  },
  {
    file: 'team-09-parvaei.jpg', order: 6,
    name: { fa: 'مهندس امین پروایی', ar: 'المهندس أمين پروايي', en: 'Eng. Amin Parvaei' },
    position: { fa: 'مهندس عمران و معماری — سرپرست اجرا و نازک‌کاری', ar: 'مهندس مدني ومعماري — مشرف التنفيذ والإنهاءات', en: 'Civil Engineer & Architect — Execution & Finishing Supervisor' },
    bio: {
      fa: 'مهندس عمران و معماری با بیش از ۱۷ سال تجربه‌ی میدانی و مدیریتی؛ متخصص نظارت و اجرای عملیات ساختمانی، مدیریت تیم‌ها و پیمانکاران، کنترل کیفیت و کاهش دوباره‌کاری و هدررفت مصالح.',
      ar: 'مهندس مدني ومعماري بخبرة ميدانية وإدارية تزيد على 17 سنة؛ متخصص في الإشراف على أعمال البناء وتنفيذها، وإدارة الفرق والمقاولين، والسيطرة النوعية وتقليل إعادة العمل وهدر المواد.',
      en: 'Civil engineer and architect with 17+ years of site and management experience: supervising and executing building works, leading teams and subcontractors, quality control, and cutting rework and material waste.',
    },
    resume: {
      fa: [
        'مجتمع مسکونی صادق (۱۸۰۰ واحد) — نجف، عراق: نظارت و مدیریت اجرای عملیات ساختمانی و نازک‌کاری (سنگ، سرامیک، گچ، سیمان)، سازمان‌دهی تیم‌ها و پیمانکاران، کنترل کیفیت و تحویل واحدها',
        'مجتمع گردشگری و مسکونی الماس گلستان (۶۰۰۰ مترمربع) — مشهد: نماینده کارفرما و مدیر پروژه؛ مدیریت طراحی، اجرا و تدارکات؛ ۳ سالن، ۶ واحد اقامتی، ۲ واحد دوبلکس، رستوران و مسجد با تأسیسات برقی و مکانیکی',
        'توانمندی‌ها: مدیریت و نظارت اجرا، نظارت بر اجرای نقشه‌ها، هماهنگی اجرا، نازک‌کاری و تأسیسات، برنامه‌ریزی مراحل کار، کنترل کیفیت و رفع ایرادات',
        'نرم‌افزارها: AutoCAD، Revit، Microsoft Office',
        'زبان‌ها: فارسی (زبان مادری)، عربی (پیشرفته)، انگلیسی (مقدماتی)',
      ].join('\n'),
      ar: [
        'مجمع الصادق السكني (1800 وحدة) — النجف، العراق: الإشراف على تنفيذ أعمال البناء والإنهاءات (حجر، سيراميك، جص، لبخ)، تنظيم الفرق والمقاولين، السيطرة النوعية وتسليم الوحدات',
        'مجمع ألماس گلستان السياحي والسكني (6000 م²) — مشهد: ممثل صاحب العمل ومدير المشروع؛ إدارة التصميم والتنفيذ والمشتريات؛ 3 قاعات، 6 وحدات سكنية، وحدتا دوبلكس، مطعم ومسجد مع التأسيسات الكهربائية والميكانيكية',
        'الاختصاص: إدارة التنفيذ والإشراف، متابعة تطبيق المخططات، التنسيق بين التنفيذ والإنهاءات والتأسيسات، جدولة مراحل العمل، السيطرة النوعية ومعالجة الملاحظات',
        'البرامج: AutoCAD، Revit، Microsoft Office',
        'اللغات: الفارسية (اللغة الأم)، العربية (متقدم)، الإنجليزية (مبتدئ)',
      ].join('\n'),
      en: [
        'Al-Sadiq residential complex (1,800 units) — Najaf, Iraq: execution and finishing supervision (stone, ceramic, plaster, cement render), organising teams and subcontractors, QC and unit handover',
        'Almas Golestan tourism & residential complex (6,000 m²) — Mashhad: owner\'s representative and project manager; design, execution and procurement; 3 halls, 6 residential units, 2 duplexes, restaurant and mosque with MEP systems',
        'Expertise: site execution management, drawing compliance on site, coordination of execution, finishing and MEP trades, work-stage planning, QC and snag resolution',
        'Software: AutoCAD, Revit, Microsoft Office',
        'Languages: Persian (native), Arabic (advanced), English (basic)',
      ].join('\n'),
    },
    whatsapp: '+9647861269411', phone: '09151770076', email: 'amin.parvae66@gmail.com',
  },
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const dir = path.resolve(process.cwd(), 'content/team')
  for (const m of MEMBERS) {
    const p = path.join(dir, m.file)
    if (!fs.existsSync(p)) continue
    const src = `team/${m.file}`
    const had = await payload.find({ collection: 'media', where: { sourceFile: { equals: src } }, limit: 1, depth: 0, req, overrideAccess: true })
    if (had.docs.length) continue
    const photo = await payload.create({
      collection: 'media', locale: 'fa', filePath: p, req, overrideAccess: true,
      data: { alt: `${m.name.fa} — ${m.position.fa}`, sourceFile: src, inGallery: false, category: 'team' } as any,
    })
    for (const l of ['ar', 'en'] as const) await payload.update({ collection: 'media', id: photo.id, locale: l, data: { alt: `${m.name[l]} — ${m.position[l]}` } as any, req, overrideAccess: true })
    const doc = await payload.create({
      collection: 'team', locale: 'fa', req, overrideAccess: true,
      data: { name: m.name.fa, position: m.position.fa, bio: m.bio.fa, resume: m.resume.fa, discipline: 'civil', photo: photo.id, whatsapp: m.whatsapp, phone: m.phone, email: m.email, published: true, order: m.order } as any,
    })
    for (const l of ['ar', 'en'] as const) await payload.update({ collection: 'team', id: doc.id, locale: l, data: { name: m.name[l], position: m.position[l], bio: m.bio[l], resume: m.resume[l] } as any, req, overrideAccess: true })
  }
}
export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
