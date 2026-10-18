import type { Locale } from './i18n'

export const BIM_TAGS = ['BIM_Iraq', 'Revit_Architecture', 'Revit_Structure', 'Revit_MEP', 'هندسة_معمارية', 'تصميم_هندسي', 'العراق_بغداد']

export const BIM_POSTERS = [
  { file: 'bim-integrated-v2.jpg', key: 'bim' },
  { file: 'revit-mep-v2.jpg', key: 'mep' },
  { file: 'revit-architecture-v2.jpg', key: 'arch' },
  { file: 'revit-structure-v2.jpg', key: 'str' },
] as const

type Copy = { nav: string; kicker: string; title: string; lead: string; metaTitle: string; metaDesc: string; cta: string; posters: Record<'bim' | 'mep' | 'arch' | 'str', string>; tags: string; homeLead: string }
export const BIM_COPY: Record<Locale, Copy> = {
  ar: {
    nav: 'خدمات BIM ورويت', kicker: 'BIM · Revit', title: 'خدمات BIM وتصميم رويت في العراق',
    lead: 'نمذجة معلومات البناء (BIM) المتكاملة: رويت معماري وإنشائي وميكانيك وكهرباء وسباكة (Revit MEP)، كشف التعارضات، حساب الكميات، ومخططات تنفيذية — لمشاريع بغداد والبصرة والنجف وكربلاء وكل العراق.',
    metaTitle: 'خدمات BIM وتصميم Revit في العراق — معماري، إنشائي، MEP | فن آرا',
    metaDesc: 'تطبيق BIM المتكامل وتصميم رويت معماري وإنشائي وميكانيك وكهرباء وسباكة في العراق وبغداد: نمذجة ثلاثية الأبعاد، كشف التعارضات، حساب الكميات ومخططات تنفيذية.',
    cta: 'اطلب عرض سعر', tags: 'الوسوم', homeLead: 'رويت معماري وإنشائي وMEP، كشف التعارضات وحساب الكميات.',
    posters: { bim: 'تطبيق BIM المتكامل', mep: 'تصميم رويت ميكانيك وكهرباء وسباكة (Revit MEP)', arch: 'تصميم رويت معماري (Revit Architecture)', str: 'تصميم رويت إنشائي (Revit Structure)' },
  },
  fa: {
    nav: 'خدمات BIM و رویت', kicker: 'BIM · Revit', title: 'خدمات BIM و طراحی رویت',
    lead: 'مدل‌سازی اطلاعات ساختمان (BIM) یکپارچه: رویت معماری، سازه و تأسیسات مکانیکی و برقی (Revit MEP)، کشف تداخلات، استخراج مقادیر و نقشه‌های اجرایی — برای پروژه‌های عراق و ایران.',
    metaTitle: 'خدمات BIM و طراحی رویت — معماری، سازه، MEP | دفتر مهندسی فن آرا',
    metaDesc: 'BIM یکپارچه و طراحی رویت معماری، سازه و تأسیسات مکانیکی و برقی: مدل‌سازی سه‌بعدی، کشف تداخلات، متره و نقشه‌های اجرایی؛ برای پروژه‌های عراق و ایران.',
    cta: 'دریافت پیش‌فاکتور', tags: 'هشتگ‌ها', homeLead: 'رویت معماری، سازه و MEP؛ کشف تداخلات و متره.',
    posters: { bim: 'BIM یکپارچه', mep: 'رویت تأسیسات مکانیکی و برقی (Revit MEP)', arch: 'رویت معماری (Revit Architecture)', str: 'رویت سازه (Revit Structure)' },
  },
  en: {
    nav: 'BIM & Revit', kicker: 'BIM · Revit', title: 'BIM & Revit design services in Iraq',
    lead: 'Integrated Building Information Modelling: Revit Architecture, Structure and MEP, clash detection, quantity take-off and construction drawings — for projects in Baghdad, Basra, Najaf, Karbala and across Iraq.',
    metaTitle: 'BIM & Revit Services in Iraq — Architecture, Structure, MEP | Fanara',
    metaDesc: 'Integrated BIM and Revit Architecture, Structure and MEP design in Iraq and Baghdad: 3D modelling, clash detection, quantity take-off and construction drawings.',
    cta: 'Request a quote', tags: 'Hashtags', homeLead: 'Revit Architecture, Structure and MEP; clash detection and take-off.',
    posters: { bim: 'Integrated BIM', mep: 'Revit MEP design', arch: 'Revit Architecture design', str: 'Revit Structure design' },
  },
  tr: {
    nav: 'BIM ve Revit', kicker: 'BIM · Revit', title: 'Irak ve Türkiye’de BIM ve Revit tasarım hizmetleri',
    lead: 'Bütünleşik Yapı Bilgi Modellemesi (BIM): Revit mimari, statik ve MEP modelleme, çakışma kontrolü (clash detection), metraj ve uygulama projeleri — Bağdat, Basra, Necef, Kerbela, Erbil ve tüm Irak ile Türkiye’deki projeler için.',
    metaTitle: 'BIM ve Revit Hizmetleri — Mimari, Statik, MEP | Fanara Mühendislik',
    metaDesc: 'Irak ve Türkiye’de bütünleşik BIM ile Revit mimari, statik ve MEP tasarımı: 3B modelleme, çakışma kontrolü, metraj ve uygulama projeleri.',
    cta: 'Teklif isteyin', tags: 'Etiketler', homeLead: 'Revit mimari, statik ve MEP; çakışma kontrolü ve metraj.',
    posters: { bim: 'Bütünleşik BIM', mep: 'Revit MEP tasarımı', arch: 'Revit mimari tasarım', str: 'Revit statik tasarım' },
  },
}
