import type { Metadata } from 'next'
import type { Locale } from './i18n'

export const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://engfanara.com'
export type PageKey = 'home' | 'resume' | 'order' | 'gallery'
const PATH: Record<PageKey, string> = { home: '', resume: '/resume', order: '/order', gallery: '/gallery' }

// Arabic copy targets Iraq first (main market); Persian for Iran; English for international clients.
const COPY: Record<PageKey, Record<Locale, { title: string; description: string }>> = {
  home: {
    ar: { title: 'فن‌آرا | تصميم وتنفيذ التأسيسات الميكانيكية والكهربائية في العراق', description: 'مكتب فن‌آرا الهندسي: تصميم وتنفيذ أنظمة MEP — التكييف والتهوية، شبكات الماء والمجاري، الكهرباء والإنارة — للمشاريع السكنية والتجارية والصناعية في العراق، بإشراف المهندس أميد پودينه وخبرة تزيد على 15 عامًا.' },
    fa: { title: 'فن‌آرا | طراحی و اجرای تأسیسات مکانیکی و برقی در ایران و عراق', description: 'دفتر مهندسی فن‌آرا: طراحی و اجرای تأسیسات ساختمان (تهویه مطبوع، آب و فاضلاب، برق و روشنایی) برای پروژه‌های مسکونی، تجاری و صنعتی در ایران و عراق، زیر نظر مهندس امید پودینه با بیش از ۱۵ سال تجربه.' },
    en: { title: 'Fanara Engineering | MEP Design & Installation in Iraq and Iran', description: 'Fanara Engineering designs and installs MEP systems — HVAC, water and drainage, power and lighting — for residential, commercial and industrial projects in Iraq and Iran, led by Mechanical Engineer Omid Podineh (15+ years).' },
  },
  resume: {
    ar: { title: 'المهندس أميد پودينه | مدير قسم الميكانيك ومهندس MEP في العراق', description: 'السيرة الذاتية للمهندس أميد پودينه: مدير الميكانيك في شركة الضمان، خبرة أكثر من 15 عامًا في تأسيسات المشاريع السكنية والصناعية والفندقية في العراق وإيران.' },
    fa: { title: 'رزومه‌ی مهندس امید پودینه | مهندس مکانیک و مدیر تأسیسات', description: 'رزومه‌ی مهندس امید پودینه: مدیر مکانیک شرکت الضمان در عراق، بیش از ۱۵ سال سابقه در تأسیسات پروژه‌های مسکونی، صنعتی، پتروشیمی و هتل.' },
    en: { title: 'Omid Podineh | Mechanical Manager & MEP Engineer — Resume', description: 'Resume of Omid Podineh, Mechanical Manager at Al-Dhaman Co. in Iraq: 15+ years delivering MEP works on residential, industrial, petrochemical and hotel projects.' },
  },
  order: {
    ar: { title: 'طلب تصميم مخططات ميكانيك وكهرباء ومعماري | فن‌آرا', description: 'أرسل مخططات مشروعك واحصل على عرض سعر وجدول زمني لتصميم التأسيسات الميكانيكية والكهربائية والمخططات المعمارية والإنشائية من فريق فن‌آرا.' },
    fa: { title: 'سفارش طراحی نقشه‌ی تأسیسات، برق و معماری | فن‌آرا', description: 'نقشه‌های پروژه را بفرستید و پیش‌فاکتور و زمان‌بندی طراحی تأسیسات مکانیکی، برقی، معماری و سازه را از تیم فن‌آرا دریافت کنید.' },
    en: { title: 'Order MEP, Architectural & Structural Design | Fanara', description: 'Send your drawings and get a quote and schedule for mechanical, electrical, architectural and structural design from the Fanara team.' },
  },
  gallery: {
    ar: { title: 'معرض صور مشاريع التأسيسات في العراق وإيران | فن‌آرا', description: 'صور حقيقية من مواقع العمل: شبكات المجاري والماء، غرف المراجل، مجاري التكييف، اللوحات الكهربائية والمخططات التصميمية.' },
    fa: { title: 'گالری تصاویر پروژه‌های تأسیسات | فن‌آرا', description: 'تصاویر واقعی از کارگاه‌ها: شبکه‌ی فاضلاب و آب، موتورخانه، کانال‌کشی تهویه، تابلوهای برق و نقشه‌های طراحی.' },
    en: { title: 'Project Photo Gallery — MEP Works in Iraq & Iran | Fanara', description: 'Real site photos: sewer and water networks, plant rooms, HVAC ductwork, electrical panels and design drawings.' },
  },
}

const OG_LOCALE: Record<Locale, string> = { fa: 'fa_IR', ar: 'ar_IQ', en: 'en_US' }

export function pageMeta(l: Locale, page: PageKey): Metadata {
  const c = COPY[page][l], p = PATH[page]
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: `/${l}${p}`,
      languages: { 'ar-IQ': `/ar${p}`, 'fa-IR': `/fa${p}`, en: `/en${p}`, 'x-default': p ? `/ar${p}` : '/' },
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
  const name = { fa: 'دفتر مهندسی فن‌آرا', ar: 'مكتب فن‌آرا الهندسي', en: 'Fanara Engineering' }[l]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'], '@id': `${SITE}/#org`, name,
        alternateName: ['Eng.Fanara', 'فن‌آرا', 'Fan Ara Parsian Kohan'], url: `${SITE}/${l}`,
        logo: `${SITE}/logo-mark.png`, image: `${SITE}/og.jpg`,
        email: contact?.email || 'fanarateb@gmail.com', telephone: contact?.phoneIraq || undefined,
        areaServed: [{ '@type': 'Country', name: 'Iraq' }, { '@type': 'Country', name: 'Iran' }],
        address: { '@type': 'PostalAddress', addressLocality: 'Mashhad', addressCountry: 'IR' },
        founder: { '@id': `${SITE}/#omid` },
        knowsAbout: ['MEP design', 'HVAC', 'Plumbing and drainage', 'Electrical design', 'Building services installation', 'Architectural design', 'Structural design'],
        sameAs: ['https://www.instagram.com/pudineh.eng'],
      },
      {
        '@type': 'Person', '@id': `${SITE}/#omid`, name: 'Omid Podineh',
        alternateName: ['امید پودینه', 'أميد پودينه', 'Eng. Omid Podineh'],
        jobTitle: 'Mechanical Manager', url: `${SITE}/${l}/resume`, image: `${SITE}/og.jpg`,
        worksFor: { '@type': 'Organization', name: 'Al-Dhaman Co.' },
        knowsLanguage: ['fa', 'ar', 'en'],
        sameAs: ['https://www.instagram.com/pudineh.eng'],
      },
    ],
  }
}
