import type { Metadata } from 'next'
import type { Locale } from './i18n'

export const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://engfanara.com'
export type PageKey = 'home' | 'resume' | 'order' | 'gallery' | 'projects' | 'team'
const PATH: Record<PageKey, string> = { home: '', resume: '/resume', order: '/order', gallery: '/gallery', projects: '/projects', team: '/team' }

// Arabic copy targets Iraq first (main market); Persian for Iran; English for international clients.
const COPY: Record<PageKey, Record<Locale, { title: string; description: string }>> = {
  home: {
    ar: { title: 'تصميم وتنفيذ التأسيسات الصحية والكهربائية والميكانيكية في العراق | مكتب فن آرا الهندسي', description: 'مكتب هندسي في العراق لتصميم وتنفيذ التأسيسات: تأسيس ماء ومجاري (صحيات)، تأسيس كهربائيات واللوحات، التكييف والتهوية، غرف المراجل والمضخات، تأسيسات المسابح، ومقاولات التشطيبات (لبخ، كاشي، حجر، جبسن بورد)، والتصميم المعماري والإنشائي — في النجف وكربلاء وبغداد والبصرة وأربيل، بإشراف المهندس أميد پودينه وخبرة تزيد على 15 عامًا.' },
    fa: { title: 'دفتر مهندسی فن آرا | طراحی و اجرای تأسیسات مکانیکی و برقی — مهندس امید پودینه', description: 'فن آرا (فن‌آرا پارسیان کهن) دفتر مهندسی طراحی و اجرای تأسیسات ساختمان در مشهد، ایران و عراق: تهویه مطبوع، موتورخانه، آب و فاضلاب، برق و روشنایی، و نقشه‌های معماری و سازه؛ زیر نظر مهندس امید پودینه با بیش از ۱۵ سال تجربه.' },
    en: { title: 'MEP, Plumbing, Electrical & HVAC Design and Installation in Iraq | Fanara Engineering', description: 'Fanara Engineering designs and installs MEP systems — HVAC, water and drainage, power and lighting — and takes finishing and MEP contracts for residential, commercial and industrial projects in Iraq, Türkiye and Armenia, led by Mechanical Engineer Omid Podineh (15+ years).' },
    tr: { title: 'Irak, Türkiye ve Ermenistan’da Tesisat, İnce İşler ve İnşaat Taşeronluğu | Fanara Mühendislik', description: 'Fanara Mühendislik; mekanik ve elektrik tesisat (MEP), sıhhi tesisat, HVAC, kazan daireleri ile ince işler ve inşaat uygulamalarında tasarım, taşeronluk ve şantiye yönetimi hizmeti verir. Irak (Necef, Kerbela, Bağdat, Basra, Erbil), Türkiye ve Ermenistan’daki işverenler için; Mak. Müh. Omid Podineh liderliğinde 15+ yıl deneyim.' },
  },
  resume: {
    ar: { title: 'المهندس أميد پودينه | مهندس ميكانيك ومهندس MEP — مؤسس فن آرا', description: 'السيرة الذاتية للمهندس أميد پودينه، مؤسس مكتب فن آرا الهندسي (آخر منصب وظيفي: مدير القسم الميكانيكي في شركة الضمان)، خبرة أكثر من 15 عامًا في تأسيسات المشاريع السكنية والصناعية والفندقية في العراق وإيران.' },
    fa: { title: 'رزومه‌ی مهندس امید پودینه | مؤسس فن آرا، مهندس مکانیک و مدیر تأسیسات', description: 'رزومه‌ی مهندس امید پودینه، مؤسس دفتر مهندسی فن آرا (آخرین جایگاه شغلی: مدیر بخش مکانیک شرکت الضمان در عراق)، بیش از ۱۵ سال سابقه در تأسیسات پروژه‌های مسکونی، صنعتی، پتروشیمی و هتل.' },
    en: { title: 'Omid Podineh | Mechanical & MEP Engineer, Founder of Fanara — Resume', description: 'Resume of Omid Podineh, founder of Fanara Engineering (latest position: Mechanical Manager, Al-Dhaman Co., Iraq): 15+ years delivering MEP works on residential, industrial, petrochemical and hotel projects.' },
    tr: { title: 'Omid Podineh | Makine ve MEP Mühendisi, Fanara Kurucusu — Özgeçmiş', description: 'Fanara Mühendislik kurucusu Omid Podineh’in özgeçmişi (son görevi: Al-Dhaman Co., Irak — Mekanik Bölüm Müdürü): konut, sanayi, petrokimya ve otel projelerinde 15 yılı aşkın MEP uygulama deneyimi.' },
  },
  order: {
    ar: { title: 'طلب تصميم مخططات ميكانيك وكهرباء ومعماري | فن‌آرا', description: 'أرسل مخططات مشروعك واحصل على عرض سعر وجدول زمني لتصميم التأسيسات الميكانيكية والكهربائية والمخططات المعمارية والإنشائية من فريق فن‌آرا.' },
    fa: { title: 'سفارش طراحی نقشه‌ی تأسیسات، برق، معماری و سازه | دفتر مهندسی فن آرا', description: 'نقشه‌های پروژه را بفرستید و پیش‌فاکتور و زمان‌بندی طراحی تأسیسات مکانیکی، برقی، معماری و سازه را از تیم فن‌آرا دریافت کنید.' },
    en: { title: 'Order MEP, Architectural & Structural Design | Fanara', description: 'Send your drawings and get a quote and schedule for mechanical, electrical, architectural and structural design from the Fanara team.' },
    tr: { title: 'MEP, Mimari ve Statik Proje Tasarımı Siparişi | Fanara', description: 'Çizimlerinizi gönderin; Fanara ekibinden mekanik, elektrik, mimari ve statik proje tasarımı için fiyat teklifi ve iş programı alın.' },
  },
  projects: {
    ar: { title: 'مشاريع التأسيسات في العراق: النجف والمجمعات السكنية | فن آرا', description: 'مشاريع تأسيسات الماء والمجاري والكهرباء والميكانيك في العراق، منها مشروع الشمس السكني 1600 وحدة في النجف ومجمع سكني من 3500 وحدة، مع صور وفيديوهات من الموقع.' },
    fa: { title: 'پروژه‌های تأسیسات در عراق و ایران | دفتر مهندسی فن آرا', description: 'پروژه‌های تأسیسات آب و فاضلاب، برق و مکانیک در عراق و ایران؛ از جمله پروژه‌ی ۱۶۰۰ واحدی شمس نجف و مجتمع ۳۵۰۰ واحدی، با تصاویر و ویدیوی کارگاه.' },
    en: { title: 'MEP Projects in Iraq & Iran — Najaf, Housing Developments | Fanara', description: 'Water, drainage, electrical and mechanical projects in Iraq and Iran, including the 1,600-unit Shams project in Najaf and a 3,500-unit development, with site photos and videos.' },
    tr: { title: 'Irak ve İran’da MEP Projeleri — Necef, Toplu Konut Projeleri | Fanara', description: 'Irak ve İran’da su, kanalizasyon, elektrik ve mekanik tesisat projeleri; Necef’teki 1.600 konutluk Şems projesi ve 3.500 konutluk proje dahil, şantiye fotoğrafları ve videolarıyla.' },
  },
  team: {
    ar: { title: 'فريق فن آرا: مهندسو مدني وميكانيك وكهرباء لتنفيذ المشاريع في العراق', description: 'تعرّف على فريق مكتب فن آرا الهندسي: مدراء مواقع ومشرفو تنفيذ الأقسام المدنية والميكانيكية والكهربائية لمشاريع البناء والتأسيسات في العراق.' },
    fa: { title: 'اعضای تیم فن آرا | مهندسان عمران، مکانیک و برق', description: 'آشنایی با تیم دفتر مهندسی فن آرا: سرپرستان پروژه و مدیران اجرای واحدهای عمران، مکانیک و برق در پروژه‌های عراق و ایران.' },
    en: { title: 'The Fanara Team — Civil, Mechanical & Electrical Engineers | Fanara', description: 'Meet the Fanara Engineering team: project superintendents and execution supervisors of the civil, mechanical and electrical units on projects in Iraq and Iran.' },
    tr: { title: 'Fanara Ekibi — İnşaat, Makine ve Elektrik Mühendisleri | Fanara', description: 'Fanara Mühendislik ekibiyle tanışın: Irak ve İran’daki projelerde inşaat, makine ve elektrik birimlerinin proje şefleri ve uygulama sorumluları.' },
  },
  gallery: {
    ar: { title: 'معرض صور مشاريع التأسيسات في العراق وإيران | فن‌آرا', description: 'صور حقيقية من مواقع العمل: شبكات المجاري والماء، غرف المراجل، مجاري التكييف، اللوحات الكهربائية والمخططات التصميمية.' },
    fa: { title: 'گالری پروژه‌های تأسیسات | دفتر مهندسی فن آرا', description: 'تصاویر واقعی از کارگاه‌ها: شبکه‌ی فاضلاب و آب، موتورخانه، کانال‌کشی تهویه، تابلوهای برق و نقشه‌های طراحی.' },
    en: { title: 'Project Photo Gallery — MEP Works in Iraq & Iran | Fanara', description: 'Real site photos: sewer and water networks, plant rooms, HVAC ductwork, electrical panels and design drawings.' },
    tr: { title: 'Proje Fotoğraf Galerisi — Irak ve İran’da MEP Uygulamaları | Fanara', description: 'Şantiyelerden gerçek fotoğraflar: kanalizasyon ve su şebekeleri, kazan daireleri, HVAC kanalları, elektrik panoları ve tasarım çizimleri.' },
  },
}

export const OG_LOCALE: Record<Locale, string> = { fa: 'fa_IR', ar: 'ar_IQ', en: 'en_US', tr: 'tr_TR' }

/** hreflang map for a path (without locale prefix). Arabic (Iraq) is the default market. */
export const hreflang = (p: string) => ({ 'ar-IQ': `/ar${p}`, 'fa-IR': `/fa${p}`, en: `/en${p}`, 'tr-TR': `/tr${p}`, 'x-default': p ? `/ar${p}` : '/' })

export function pageMeta(l: Locale, page: PageKey): Metadata {
  const c = COPY[page][l], p = PATH[page]
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: `/${l}${p}`,
      languages: hreflang(p),
    },
    openGraph: {
      type: page === 'resume' ? 'profile' : 'website', siteName: 'Eng.Fanara · فن‌آرا', url: `/${l}${p}`,
      title: c.title, description: c.description, locale: OG_LOCALE[l],
      alternateLocale: Object.values(OG_LOCALE).filter((x) => x !== OG_LOCALE[l]),
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: c.title }],
    },
    twitter: { card: 'summary_large_image', title: c.title, description: c.description, images: ['/og.jpg'] },
  }
}

export const sitePages = Object.keys(PATH) as PageKey[]
export const pagePath = (p: PageKey) => PATH[p]

export function jsonLd(l: Locale, contact?: { phoneIraq?: string | null; whatsapp?: string | null; email?: string | null }) {
  const name = { fa: 'دفتر مهندسی فن‌آرا', ar: 'مكتب فن‌آرا الهندسي', en: 'Fanara Engineering', tr: 'Fanara Mühendislik' }[l]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'], '@id': `${SITE}/#org`, name,
        alternateName: ['Eng.Fanara', 'Fanara Engineering', 'Fan Ara', 'فن‌آرا', 'فن آرا', 'فنارا', 'دفتر مهندسی فن آرا', 'فن آرا پارسیان کهن', 'فن‌آرا پارسیان کهن', 'Fan Ara Parsian Kohan', 'مكتب فن آرا الهندسي'], url: `${SITE}/${l}`,
        logo: `${SITE}/logo-mark.png`, image: `${SITE}/og.jpg`,
        email: contact?.email || 'fanarateb@gmail.com', telephone: contact?.phoneIraq || undefined,
        areaServed: [{ '@type': 'Country', name: 'Iraq' }, ...['Baghdad', 'Basra', 'Najaf', 'Karbala', 'Erbil'].map((n) => ({ '@type': 'City', name: n, containedInPlace: { '@type': 'Country', name: 'Iraq' } })), { '@type': 'Country', name: 'Türkiye' }, ...['Istanbul', 'Ankara'].map((n) => ({ '@type': 'City', name: n, containedInPlace: { '@type': 'Country', name: 'Türkiye' } })), { '@type': 'Country', name: 'Armenia' }, { '@type': 'City', name: 'Yerevan', containedInPlace: { '@type': 'Country', name: 'Armenia' } }, { '@type': 'Country', name: 'Iran' }],
        knowsLanguage: ['ar', 'fa', 'en', 'tr'],
        address: { '@type': 'PostalAddress', addressLocality: 'Mashhad', addressCountry: 'IR' },
        founder: { '@id': `${SITE}/#omid` },
        knowsAbout: ['Finishing works contracting', 'MEP subcontracting', 'Construction site management', 'Plastering and tiling', 'Fire fighting systems', 'MEP design', 'HVAC', 'Plumbing and drainage', 'Electrical design', 'Building services installation', 'Architectural design', 'Structural design'],
        sameAs: ['https://www.instagram.com/pudineh.eng'],
      },
      {
        '@type': 'Person', '@id': `${SITE}/#omid`, name: 'Omid Podineh',
        alternateName: ['امید پودینه', 'أميد پودينه', 'Eng. Omid Podineh'],
        jobTitle: 'Mechanical & MEP Engineer', url: `${SITE}/${l}/resume`, image: `${SITE}/og.jpg`,
        knowsLanguage: ['fa', 'ar', 'en', 'tr'],
        sameAs: ['https://www.instagram.com/pudineh.eng'],
      },
    ],
  }
}
