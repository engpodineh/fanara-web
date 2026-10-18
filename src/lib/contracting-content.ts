// "Contracting" section: Fanara takes building works as main contractor or subcontractor — from finishing to MEP.
import type { Locale } from './i18n'

export const SCOPE_GROUPS = ['finishing', 'mep', 'structure', 'management'] as const
export type ScopeGroup = (typeof SCOPE_GROUPS)[number]

/** Work packages (values stored on the request; labels per language). */
export const SCOPES: { v: string; g: ScopeGroup; icon: string; l: Record<Locale, string> }[] = [
  { v: 'plaster', g: 'finishing', icon: '🧱', l: { fa: 'گچ‌کاری و سیمان‌کاری (لبخ)', ar: 'اللبخ والجص', en: 'Gypsum and cement plastering', tr: 'Alçı ve çimento sıva' } },
  { v: 'tiling', g: 'finishing', icon: '◻️', l: { fa: 'کاشی و سرامیک و پرسلان', ar: 'الكاشي والسيراميك والبورسلان', en: 'Ceramic and porcelain tiling', tr: 'Seramik ve porselen kaplama' } },
  { v: 'stone', g: 'finishing', icon: '🪨', l: { fa: 'سنگ‌کاری کف و نما', ar: 'أعمال الحجر والمرمر للأرضيات والواجهات', en: 'Stone and marble — floors and façades', tr: 'Zemin ve cephe taş/mermer kaplama' } },
  { v: 'painting', g: 'finishing', icon: '🎨', l: { fa: 'رنگ و پوشش‌های تزئینی', ar: 'الصبغ والطلاءات الديكورية', en: 'Painting and decorative coatings', tr: 'Boya ve dekoratif kaplamalar' } },
  { v: 'ceilings', g: 'finishing', icon: '▦', l: { fa: 'سقف کاذب و دیوار خشک (کناف)', ar: 'السقوف الثانوية والجبسن بورد', en: 'False ceilings and drywall (gypsum board)', tr: 'Asma tavan ve alçıpan' } },
  { v: 'doors-windows', g: 'finishing', icon: '🚪', l: { fa: 'نصب درب و پنجره (UPVC، آلومینیوم)', ar: 'تركيب الأبواب والشبابيك (UPVC، ألمنيوم)', en: 'Doors and windows (UPVC, aluminium)', tr: 'Kapı ve pencere montajı (PVC, alüminyum)' } },
  { v: 'waterproofing', g: 'finishing', icon: '💧', l: { fa: 'عایق رطوبتی و حرارتی', ar: 'العزل المائي والحراري', en: 'Waterproofing and thermal insulation', tr: 'Su ve ısı yalıtımı' } },
  { v: 'facade', g: 'finishing', icon: '🏢', l: { fa: 'نماسازی (سنگ، کامپوزیت، GRC)', ar: 'تغليف الواجهات (حجر، كلادينغ، GRC)', en: 'Façade cladding (stone, composite, GRC)', tr: 'Cephe kaplama (taş, kompozit, GRC)' } },
  { v: 'plumbing', g: 'mep', icon: '🚰', l: { fa: 'تأسیسات آب و فاضلاب', ar: 'تأسيسات الماء والمجاري (الصحيات)', en: 'Plumbing and drainage', tr: 'Sıhhi tesisat ve atık su' } },
  { v: 'electrical', g: 'mep', icon: '⚡', l: { fa: 'تأسیسات برق و روشنایی و تابلو', ar: 'الكهربائيات والإنارة واللوحات', en: 'Electrical, lighting and panels', tr: 'Elektrik, aydınlatma ve panolar' } },
  { v: 'hvac', g: 'mep', icon: '❄️', l: { fa: 'تهویه مطبوع و کانال‌کشی', ar: 'التكييف والتهوية والدكتات', en: 'HVAC and ductwork', tr: 'HVAC ve kanal işleri' } },
  { v: 'plant-room', g: 'mep', icon: '🔥', l: { fa: 'موتورخانه، گرمایش و بوستر پمپ', ar: 'غرف المراجل والتدفئة ومضخات الرفع', en: 'Plant rooms, heating and booster pumps', tr: 'Kazan dairesi, ısıtma ve hidrofor' } },
  { v: 'fire', g: 'mep', icon: '🧯', l: { fa: 'اطفا و اعلام حریق', ar: 'منظومات إطفاء وإنذار الحريق', en: 'Fire fighting and fire alarm', tr: 'Yangın söndürme ve algılama' } },
  { v: 'low-current', g: 'mep', icon: '📡', l: { fa: 'جریان ضعیف (شبکه، دوربین، آیفون)', ar: 'التيار الخفيف (شبكات، كاميرات، انتركم)', en: 'Low current (data, CCTV, intercom)', tr: 'Zayıf akım (data, CCTV, diyafon)' } },
  { v: 'networks', g: 'mep', icon: '🛠️', l: { fa: 'شبکه‌های بیرونی آب و فاضلاب و منهول', ar: 'شبكات الماء والمجاري الخارجية والمنهولات', en: 'External water and sewer networks', tr: 'Dış su ve kanalizasyon şebekeleri' } },
  { v: 'pools', g: 'mep', icon: '🏊', l: { fa: 'تأسیسات استخر', ar: 'تأسيسات المسابح', en: 'Swimming-pool services', tr: 'Havuz tesisatı' } },
  { v: 'concrete', g: 'structure', icon: '🏗️', l: { fa: 'اجرای اسکلت بتنی', ar: 'تنفيذ الهيكل الخرساني', en: 'Reinforced-concrete frame', tr: 'Betonarme karkas' } },
  { v: 'steel', g: 'structure', icon: '🔩', l: { fa: 'اسکلت فلزی و سقف عرشه فولادی', ar: 'الهياكل الحديدية وسقوف الستيل ديك', en: 'Steel structure and steel-deck slabs', tr: 'Çelik yapı ve trapez saclı döşeme' } },
  { v: 'masonry', g: 'structure', icon: '🧱', l: { fa: 'بنایی و دیوارچینی (آجر، بلوک)', ar: 'البناء بالطابوق والبلوك', en: 'Masonry and blockwork', tr: 'Tuğla ve blok duvar' } },
  { v: 'site-management', g: 'management', icon: '👷', l: { fa: 'مدیریت و سرپرستی کارگاه', ar: 'إدارة الموقع والإشراف', en: 'Site management and supervision', tr: 'Şantiye yönetimi ve kontrol' } },
  { v: 'technical-office', g: 'management', icon: '📋', l: { fa: 'دفتر فنی: متره، صورت‌وضعیت، برنامه زمان‌بندی', ar: 'المكتب الفني: الكميات والمستخلصات والجداول الزمنية', en: 'Technical office: BOQ, payment certificates, scheduling', tr: 'Teknik ofis: metraj, hakediş, iş programı' } },
  { v: 'design-bim', g: 'management', icon: '📐', l: { fa: 'طراحی و BIM (معماری، سازه، تأسیسات)', ar: 'التصميم وBIM (معماري، إنشائي، MEP)', en: 'Design and BIM (architecture, structure, MEP)', tr: 'Tasarım ve BIM (mimari, statik, MEP)' } },
]

type Copy = {
  nav: string; kicker: string; title: string; lead: string; metaTitle: string; metaDesc: string
  groups: Record<ScopeGroup, string>
  whyTitle: string; why: string[]
  models: string; modelList: [string, string][]
  stats: [string, string][]
  peopleKicker: string; peopleTitle: string; peopleLead: string; founder: string; founderCta: string
  marketsTitle: string
  formTitle: string; formLead: string
  f: { company: string; role: string; roles: Record<string, string>; scopes: string; contract: string; contracts: Record<string, string>; start: string; units: string; sent: string }
  cta: string
}

const ROLES_V = ['employer', 'main-contractor', 'developer', 'consultant', 'other'] as const
const CONTRACTS_V = ['unit-price', 'lump-sum', 'labour', 'supply-install', 'management'] as const
export { ROLES_V, CONTRACTS_V }

export const CONTRACTING: Record<Locale, Copy> = {
  ar: {
    nav: 'المقاولات', kicker: 'مقاولات البناء · من التشطيبات إلى التأسيسات',
    title: 'نستلم مقاولة مشروعك: تشطيبات، تأسيسات، وهيكل',
    lead: 'فريق فن آرا يستلم أعمال البناء كمقاول رئيسي أو مقاول باطن في العراق وتركيا وأرمينيا: من اللبخ والكاشي والحجر والسقوف الثانوية، إلى تأسيسات الماء والمجاري والكهرباء والتكييف وغرف المراجل، مع إدارة الموقع والمكتب الفني — بمهندسين وعمال تنفيذ من فريقنا.',
    metaTitle: 'مقاولات تشطيبات وتأسيسات في العراق — مقاول باطن للمشاريع السكنية والتجارية | فن آرا',
    metaDesc: 'مقاول تشطيبات وتأسيسات ميكانيكية وكهربائية في العراق (النجف، كربلاء، بغداد، البصرة، أربيل) وتركيا وأرمينيا: لبخ، كاشي وسيراميك، حجر، جبسن بورد، صحيات، كهربائيات، تكييف، إطفاء حريق — مع إدارة موقع ومكتب فني.',
    groups: { finishing: 'أعمال التشطيبات', mep: 'التأسيسات الميكانيكية والكهربائية', structure: 'الهيكل والبناء', management: 'الإدارة والمكتب الفني والتصميم' },
    whyTitle: 'لماذا فن آرا؟',
    why: ['فريق واحد للتشطيبات والتأسيسات — تنسيق أقل ومشاكل أقل في الموقع', 'خبرة في مشاريع سكنية كبيرة في العراق (1600 و3500 وحدة)', 'مهندسو مدني وميكانيك وكهرباء مع عمال تنفيذ مدرَّبين', 'مكتب فني: كميات، مستخلصات، جداول زمنية وتقارير يومية', 'سيطرة نوعية ونقاط استلام قبل كل مرحلة', 'تواصل بالعربية والتركية والإنجليزية والفارسية'],
    models: 'طرق التعاقد', modelList: [['بسعر الوحدة (BOQ)', 'حسب جدول الكميات وأسعار الفقرات.'], ['مقطوعة (Lump sum)', 'سعر ثابت لنطاق عمل محدد.'], ['أجور عمل فقط', 'فريق التنفيذ والإشراف، والمواد على صاحب العمل.'], ['تجهيز وتركيب', 'المواد والتنفيذ معًا بمواصفات معتمدة.'], ['إدارة المشروع', 'إدارة الموقع والمكتب الفني والإشراف على المقاولين.']],
    stats: [['+15', 'سنة خبرة'], ['+100', 'عامل تنفيذ'], ['1600', 'وحدة سكنية قيد التنفيذ في النجف'], ['3', 'دول: العراق، تركيا، أرمينيا']],
    peopleKicker: 'الفريق', peopleTitle: 'من المؤسس إلى آخر فرد في الفريق', peopleLead: 'المهندسون الذين سيعملون على مشروعك — بالاسم والصورة وطرق التواصل.', founder: 'المؤسس والمدير الفني', founderCta: 'السيرة الذاتية الكاملة',
    marketsTitle: 'أين نعمل',
    formTitle: 'اطلب عرض سعر للمقاولة', formLead: 'اكتب معلومات المشروع ونطاق العمل وارفع المخططات أو جدول الكميات. نراجعها ونتواصل معك بعرض السعر.',
    f: { company: 'الشركة / الجهة', role: 'صفتك', roles: { employer: 'صاحب عمل', 'main-contractor': 'مقاول رئيسي', developer: 'مستثمر / مطوّر', consultant: 'استشاري', other: 'أخرى' }, scopes: 'نطاق العمل المطلوب', contract: 'طريقة التعاقد', contracts: { 'unit-price': 'بسعر الوحدة', 'lump-sum': 'مقطوعة', labour: 'أجور عمل فقط', 'supply-install': 'تجهيز وتركيب', management: 'إدارة المشروع' }, start: 'موعد البدء المتوقع', units: 'عدد الوحدات / الطوابق', sent: 'تم استلام طلبك. سنتواصل معك قريبًا عبر الهاتف أو واتساب أو البريد.' },
    cta: 'اطلب عرض سعر',
  },
  fa: {
    nav: 'پیمانکاری', kicker: 'پیمانکاری ساختمان · از نازک‌کاری تا تأسیسات',
    title: 'پیمانکاری پروژه‌ی شما: نازک‌کاری، تأسیسات و سفت‌کاری',
    lead: 'تیم فن آرا کارهای ساختمانی را به‌صورت پیمانکار اصلی یا پیمانکار جزء در عراق، ترکیه و ارمنستان قبول می‌کند: از گچ و سیمان، کاشی و سرامیک، سنگ و سقف کاذب تا تأسیسات آب و فاضلاب، برق، تهویه و موتورخانه — همراه با مدیریت کارگاه و دفتر فنی، با مهندسان و نیروی اجرایی خودمان.',
    metaTitle: 'پیمانکاری نازک‌کاری و تأسیسات ساختمان در عراق، ترکیه و ارمنستان | فن آرا',
    metaDesc: 'پیمانکار نازک‌کاری و تأسیسات مکانیکی و برقی در عراق، ترکیه و ارمنستان: گچ و سیمان، کاشی، سنگ، کناف، آب و فاضلاب، برق، تهویه، اطفای حریق؛ با مدیریت کارگاه و دفتر فنی.',
    groups: { finishing: 'نازک‌کاری', mep: 'تأسیسات مکانیکی و برقی', structure: 'سفت‌کاری و اسکلت', management: 'مدیریت، دفتر فنی و طراحی' },
    whyTitle: 'چرا فن آرا؟',
    why: ['یک تیم برای نازک‌کاری و تأسیسات — هماهنگی بهتر و دوباره‌کاری کمتر', 'سابقه‌ی پروژه‌های بزرگ مسکونی در عراق (۱۶۰۰ و ۳۵۰۰ واحدی)', 'مهندسان عمران، مکانیک و برق همراه با نیروی اجرایی آموزش‌دیده', 'دفتر فنی: متره، صورت‌وضعیت، برنامه زمان‌بندی و گزارش روزانه', 'کنترل کیفیت و نقاط تحویل پیش از هر مرحله', 'ارتباط به عربی، ترکی، انگلیسی و فارسی'],
    models: 'نوع قرارداد', modelList: [['فهرست‌بهایی (BOQ)', 'بر اساس جدول مقادیر و قیمت آیتم‌ها.'], ['مقطوع (Lump sum)', 'مبلغ ثابت برای محدوده‌ی کار مشخص.'], ['دستمزدی', 'نیروی اجرایی و سرپرستی؛ مصالح با کارفرما.'], ['تأمین و نصب', 'مصالح و اجرا با هم، با مشخصات تأییدشده.'], ['مدیریت پیمان', 'مدیریت کارگاه، دفتر فنی و نظارت بر پیمانکاران.']],
    stats: [['+۱۵', 'سال سابقه'], ['+۱۰۰', 'نیروی اجرایی'], ['۱۶۰۰', 'واحد در حال اجرا در نجف'], ['۳', 'کشور: عراق، ترکیه، ارمنستان']],
    peopleKicker: 'تیم', peopleTitle: 'از مؤسس تا تک‌تک اعضای تیم', peopleLead: 'مهندسانی که روی پروژه‌ی شما کار می‌کنند — با نام، عکس و راه ارتباطی.', founder: 'مؤسس و مدیر فنی', founderCta: 'رزومه‌ی کامل',
    marketsTitle: 'کجا کار می‌کنیم',
    formTitle: 'درخواست پیشنهاد قیمت پیمانکاری', formLead: 'مشخصات پروژه و محدوده‌ی کار را بنویسید و نقشه‌ها یا جدول مقادیر را بارگذاری کنید. بعد از بررسی با پیشنهاد قیمت با شما تماس می‌گیریم.',
    f: { company: 'شرکت / مجموعه', role: 'سمت شما', roles: { employer: 'کارفرما', 'main-contractor': 'پیمانکار اصلی', developer: 'سرمایه‌گذار / سازنده', consultant: 'مشاور', other: 'سایر' }, scopes: 'محدوده‌ی کار موردنیاز', contract: 'نوع قرارداد', contracts: { 'unit-price': 'فهرست‌بهایی', 'lump-sum': 'مقطوع', labour: 'دستمزدی', 'supply-install': 'تأمین و نصب', management: 'مدیریت پیمان' }, start: 'زمان شروع حدودی', units: 'تعداد واحد / طبقه', sent: 'درخواست شما ثبت شد. به‌زودی از طریق تلفن، واتساپ یا ایمیل با شما تماس می‌گیریم.' },
    cta: 'درخواست پیشنهاد قیمت',
  },
  en: {
    nav: 'Contracting', kicker: 'Building contracting · from finishing to MEP',
    title: 'We contract your project: finishing, MEP and structure',
    lead: 'Fanara takes building works as main contractor or subcontractor in Iraq, Türkiye and Armenia: from plastering, tiling, stone and false ceilings to plumbing, electrical, HVAC and plant rooms — with site management and a technical office, delivered by our own engineers and site crews.',
    metaTitle: 'Finishing & MEP Subcontractor in Iraq, Türkiye and Armenia | Fanara Engineering',
    metaDesc: 'Finishing works and MEP contractor in Iraq (Najaf, Karbala, Baghdad, Basra, Erbil), Türkiye and Armenia: plastering, tiling, stone, drywall, plumbing, electrical, HVAC, fire fighting — with site management and technical office.',
    groups: { finishing: 'Finishing works', mep: 'Mechanical, electrical & plumbing', structure: 'Structure and masonry', management: 'Management, technical office & design' },
    whyTitle: 'Why Fanara?',
    why: ['One team for finishing and MEP — less coordination, less rework on site', 'Track record on large housing projects in Iraq (1,600 and 3,500 units)', 'Civil, mechanical and electrical engineers with trained site crews', 'Technical office: BOQ, payment certificates, schedules and daily reports', 'Quality control with hold points before every stage', 'We work in Arabic, Turkish, English and Persian'],
    models: 'Contract models', modelList: [['Unit price (BOQ)', 'Priced per item against the bill of quantities.'], ['Lump sum', 'Fixed price for a defined scope.'], ['Labour only', 'Crews and supervision; materials by the employer.'], ['Supply and install', 'Materials and installation together, to approved specs.'], ['Construction management', 'Site management, technical office and supervision of trades.']],
    stats: [['15+', 'years of experience'], ['100+', 'site workers'], ['1,600', 'units in progress in Najaf'], ['3', 'countries: Iraq, Türkiye, Armenia']],
    peopleKicker: 'Team', peopleTitle: 'From the founder to every team member', peopleLead: 'The engineers who will work on your project — with names, photos and contacts.', founder: 'Founder and technical director', founderCta: 'Full resume',
    marketsTitle: 'Where we work',
    formTitle: 'Request a contracting quote', formLead: 'Describe the project and scope, and upload drawings or the BOQ. We review them and come back with a quote.',
    f: { company: 'Company', role: 'You are', roles: { employer: 'Employer / owner', 'main-contractor': 'Main contractor', developer: 'Developer / investor', consultant: 'Consultant', other: 'Other' }, scopes: 'Scope of work', contract: 'Contract model', contracts: { 'unit-price': 'Unit price', 'lump-sum': 'Lump sum', labour: 'Labour only', 'supply-install': 'Supply & install', management: 'Construction management' }, start: 'Expected start', units: 'Units / floors', sent: 'Request received. We will contact you shortly by phone, WhatsApp or email.' },
    cta: 'Request a quote',
  },
  tr: {
    nav: 'Taşeronluk', kicker: 'İnşaat taşeronluğu · ince işlerden tesisata',
    title: 'Projenizi üstleniyoruz: ince işler, tesisat ve kaba inşaat',
    lead: 'Fanara; Irak, Türkiye ve Ermenistan’da ana yüklenici veya taşeron olarak inşaat işlerini üstlenir: sıva, seramik, taş ve asma tavandan sıhhi tesisat, elektrik, HVAC ve kazan dairelerine kadar — şantiye yönetimi ve teknik ofisle birlikte, kendi mühendis ve usta ekiplerimizle.',
    metaTitle: 'Irak, Türkiye ve Ermenistan’da İnce İşler ve Mekanik-Elektrik Tesisat Taşeronu | Fanara',
    metaDesc: 'Irak (Necef, Kerbela, Bağdat, Basra, Erbil), Türkiye ve Ermenistan’da ince işler ve MEP taşeronu: sıva, seramik, taş, alçıpan, sıhhi tesisat, elektrik, HVAC, yangın tesisatı — şantiye yönetimi ve teknik ofisle.',
    groups: { finishing: 'İnce işler', mep: 'Mekanik ve elektrik tesisat', structure: 'Kaba inşaat ve karkas', management: 'Yönetim, teknik ofis ve tasarım' },
    whyTitle: 'Neden Fanara?',
    why: ['İnce işler ve tesisat için tek ekip — daha az koordinasyon, daha az tekrar iş', 'Irak’taki büyük konut projelerinde deneyim (1.600 ve 3.500 konut)', 'Eğitimli usta ekipleriyle inşaat, makine ve elektrik mühendisleri', 'Teknik ofis: metraj, hakediş, iş programı ve günlük raporlar', 'Her aşamadan önce kabul noktalarıyla kalite kontrol', 'Türkçe, Arapça, İngilizce ve Farsça iletişim'],
    models: 'Sözleşme modelleri', modelList: [['Birim fiyat (BOQ)', 'Metraj cetveline göre kalem bazında fiyat.'], ['Götürü bedel', 'Belirli iş kapsamı için sabit fiyat.'], ['Yalnız işçilik', 'Ekip ve kontrol bizden, malzeme işverenden.'], ['Malzeme + montaj', 'Onaylı şartnameye göre malzeme ve uygulama birlikte.'], ['Proje yönetimi', 'Şantiye yönetimi, teknik ofis ve taşeron kontrolü.']],
    stats: [['15+', 'yıl deneyim'], ['100+', 'şantiye çalışanı'], ['1.600', 'konut Necef’te devam ediyor'], ['3', 'ülke: Irak, Türkiye, Ermenistan']],
    peopleKicker: 'Ekip', peopleTitle: 'Kurucudan ekibin her üyesine', peopleLead: 'Projenizde çalışacak mühendisler — isim, fotoğraf ve iletişim bilgileriyle.', founder: 'Kurucu ve teknik müdür', founderCta: 'Tam özgeçmiş',
    marketsTitle: 'Nerede çalışıyoruz',
    formTitle: 'Taşeronluk teklifi isteyin', formLead: 'Proje bilgilerini ve iş kapsamını yazın, çizimleri veya metraj cetvelini yükleyin. İnceledikten sonra teklifle size dönüyoruz.',
    f: { company: 'Firma', role: 'Siz', roles: { employer: 'İşveren / mal sahibi', 'main-contractor': 'Ana yüklenici', developer: 'Yatırımcı / geliştirici', consultant: 'Müşavir', other: 'Diğer' }, scopes: 'İstenen iş kapsamı', contract: 'Sözleşme modeli', contracts: { 'unit-price': 'Birim fiyat', 'lump-sum': 'Götürü bedel', labour: 'Yalnız işçilik', 'supply-install': 'Malzeme + montaj', management: 'Proje yönetimi' }, start: 'Tahmini başlangıç', units: 'Konut / kat sayısı', sent: 'Talebiniz alındı. Kısa süre içinde telefon, WhatsApp veya e-posta ile size ulaşacağız.' },
    cta: 'Teklif isteyin',
  },
}
