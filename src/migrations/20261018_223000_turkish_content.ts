import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Turkish (tr) translations for CMS content. Only the tr locale is written; other languages are untouched.
const PROFILE = {
  name: 'Müh. Omid Podineh',
  role: 'Son görevi: Mekanik Bölüm Müdürü, Al-Dhaman Co. · Makine Mühendisliği Yüksek Lisans',
  summary: '2007’den bu yana konut, sanayi, petrokimya ve otel şantiyelerinde çalışıyorum — uygulama kontrolünden mekanik ve elektrik birimlerini birlikte yönetmeye kadar. Tesisat projelerini kendim çiziyor, aynı projeleri uygulamaya kadar götürüyorum.',
  heroEyebrow: 'Mekanik ve Elektrik · Tasarım ve Uygulama · İnce İşler',
  heroTitle: 'Projeden teslime, tek ve sorumlu bir ekip',
  heroText: 'Fanara; Irak, Türkiye ve Ermenistan’da konut, sanayi ve otel projeleri için bina tesisatını tasarlar ve uygular, ince işleri üstlenir — 15 yılı aşkın şantiye deneyimine sahip bir mühendisin liderliğinde.',
}
const STAT_TR: Record<string, string> = { '15+': '2007’den bu yana şantiyede yıl', '3,500': 'Konut — mevcut proje', '800': 'Konutun tesisatı 9 ayda teslim edildi', '3': 'Çalışma dili: Farsça, Arapça, İngilizce' }
const SERVICES: Record<string, { title: string; description: string }> = {
  'Mechanical services': { title: 'Mekanik tesisat', description: 'HVAC, temiz su ve atık su, yangın tesisatı, gaz ve kazan daireleri.' },
  'Electrical services': { title: 'Elektrik tesisatı', description: 'Aydınlatma, priz, panolar ve tek hat şemaları, topraklama, zayıf akım.' },
  Architecture: { title: 'Mimari', description: 'Ekibin mimarlarından planlar, görünüşler ve mobilya yerleşimleri.' },
  'Shop drawings & Revit': { title: 'Uygulama projeleri ve Revit', description: 'Statik ve mimariyle koordineli uygulama projeleri ve tesisat modeli.' },
  'Quantities & cost': { title: 'Metraj ve maliyet', description: 'Resmî birim fiyat listesine veya piyasa fiyatlarına göre metraj ve keşif.' },
  'Supervision & advice': { title: 'Kontrol ve danışmanlık', description: 'Şantiye kontrolü, kalite kontrol ve devreye alma.' },
}
const PROJECTS: Record<string, { title: string; summary: string; location?: string; role?: string }> = {
  'shams-najaf-1600-units': { title: 'Şems 1.600 konutluk konut projesi, Necef', summary: 'Al-Dhaman Co. tarafından yapılan Necef’teki 1.600 konutluk Şems projesi. Mekanik bölüm yönetimi: konutların su, kanalizasyon, elektrik ve altyapı tesisatı — temelden karkas ve duvar aşamasına kadar.', location: 'Necef, Irak', role: 'Mekanik Bölüm Müdürü (Al-Dhaman Co.)' },
  'oman-al-hail-1306-office-building': { title: 'Sekiz katlı ofis binası, Maskat — Umman', summary: 'Maskat Al Hail’de 1306 numaralı parselde B+Z+6+çatı katlı ofis ve ticaret binası: 49 ofis ve 2 dükkân. Mekanik, elektrik ve yangın tesisatının kontrol ve uygulaması; yüklenici Al-Dhaman Co. Umman yapı yönetmeliklerine (OBC/OMC/OPC) ve onaylı Sivil Savunma (CDAA) gereklerine göre tasarlandı.', location: 'Maskat, Umman', role: 'Kontrol ve uygulama (yüklenici: Al-Dhaman Co.)' },
  'negin-residential-complex': { title: 'Negin Konut Kompleksi, Çabahar', summary: 'Mekanik, elektrik ve ince işlerin açılışa kadar şantiye kontrolü.', location: 'Çabahar, İran', role: 'Şantiye Şefi (MEP ve ince işler)' },
  'al-dhaman-3500-units': { title: '3.500 konutluk konut projesi, Irak', summary: 'Al-Dhaman Co. mekanik bölüm yönetimi. 800 konutun tesisatı 9 ayda teslim edildi.', location: 'Irak', role: 'Mekanik Bölüm Müdürü' },
  'sewer-network-precast-manholes': { title: 'Kanalizasyon şebekesi ve prefabrik rögarlar', summary: 'HDPE ana hatlar, bitüm kaplı prefabrik rögarlar, kazı işleri.', location: 'Irak' },
}
const TEAM: Record<string, { name: string; position: string; bio?: string; resume?: string }> = {
  'Eng. Ebrahimi': { name: 'Müh. Ebrahimi', position: 'Elektrik Uygulama Müdürü' },
  'Eng. Ario': { name: 'Müh. Ario', position: 'Elektrik Bölüm Şefi' },
  'Eng. Sadeghi': { name: 'Müh. Sadeghi', position: 'Mekanik Uygulama Şefi' },
  'Eng. Heidari': { name: 'Müh. Heidari', position: 'Mekanik Birim Uygulama Şefi' },
  'Eng. Alkasir': { name: 'Müh. Alkasir', position: 'Mekanik Birim Uygulama Şefi' },
  'Eng. Al-Bashouke': { name: 'Müh. Al-Bashouke', position: 'Mekanik Şefi' },
  'Eng. Ghobadnejad': { name: 'Müh. Ghobadnejad', position: 'Elektrik Birim Uygulama Şefi' },
  'Eng. Behzad Goljaei': {
    name: 'Müh. Behzad Goljaei', position: 'Proje Şefi — Kıdemli İnşaat Mühendisi',
    bio: 'Irak ve İran’da konut, ticari, otel ve altyapı projelerinin yönetimi, kontrolü ve uygulamasında 15 yılı aşkın deneyime sahip inşaat mühendisi; 3. sınıf kontrol ve uygulama yetki belgeli (inşaat). 1.600 konutluk Şems Necef projesinin proje şefi.',
    resume: [
      'Proje Şefi, Şems konut kompleksi (1.600 konut) — Necef, Irak (2025 – günümüz)',
      'Uygulama Şefi, Namotel beş yıldızlı otel — Kerbela, Irak (2024–2025)',
      'Uygulama Şefi, misafirhane projesi — Çabahar (2021–2024)',
      'Şantiye Şefi, Sedes Oteli; kalite kontrol ve beton laboratuvarı sorumlusu — Çabahar Serbest Bölgesi (2016–2021)',
      'İnşaat Projeleri Şefi — Meşhed (2015–2016)',
      'Şantiye Şefi, trapez saclı döşemeler, Razi Tıp Binası — Tahran (2015)',
      'Şantiye Şefi, Uygulama Müdür Yardımcısı ve Teknik Ofis Mühendisi, Alborz Mall — Kerec (2012–2015)',
      'Kalite Kontrol Mühendisi, yapı ve sanayi ekipmanları fabrikası (2009–2010)',
      'Kontrol Mühendisi, inşaat projeleri — Çabahar (2007–2009)',
      'Şantiye Mühendisi, Aftab ve Sasan konut projeleri — Tahran (2005–2007)',
      'Eğitim: İnşaat Mühendisliği Yüksek Lisans — İslami Azad Üniversitesi, Şahrud',
      'Yetkinlikler: şantiye ve taşeron yönetimi, proje kontrolü, teknik ofis ve hakediş, kalite kontrol, betonarme ve çelik yapılar, İSG, AutoCAD, Excel',
      'Diller: Farsça, Türkçe, Arapça ve İngilizce (orta)',
    ].join('\n'),
  },
  'Eng. Amin Parvaei': {
    name: 'Müh. Amin Parvaei', position: 'İnşaat Mühendisi ve Mimar — Uygulama ve İnce İşler Şefi',
    bio: '17 yılı aşkın şantiye ve yönetim deneyimine sahip inşaat mühendisi ve mimar: yapım işlerinin kontrolü ve uygulaması, ekip ve taşeron yönetimi, kalite kontrol, tekrar işlerin ve malzeme israfının azaltılması.',
    resume: [
      'Al-Sadiq konut kompleksi (1.800 konut) — Necef, Irak: uygulama ve ince işler kontrolü (taş, seramik, alçı, çimento sıva), ekip ve taşeron organizasyonu, kalite kontrol ve konut teslimi',
      'Almas Golestan turizm ve konut kompleksi (6.000 m²) — Meşhed: işveren temsilcisi ve proje müdürü; tasarım, uygulama ve satın alma; 3 salon, 6 konaklama ünitesi, 2 dubleks, restoran ve mescit ile mekanik-elektrik tesisatı',
      'Uzmanlık: şantiye uygulama yönetimi, projelere uygunluk kontrolü, uygulama, ince işler ve tesisat koordinasyonu, iş aşamalarının planlanması, kalite kontrol ve eksik giderme',
      'Yazılımlar: AutoCAD, Revit, Microsoft Office',
      'Diller: Farsça (ana dil), Arapça (ileri), İngilizce (başlangıç)',
    ].join('\n'),
  },
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const o = { req, overrideAccess: true } as const
  const pr: any = await payload.findGlobal({ slug: 'profile', locale: 'en', ...o })
  const stats = (pr?.stats ?? []).map((s: any) => ({ id: s.id, value: s.value, label: STAT_TR[s.value] ?? s.label }))
  await payload.updateGlobal({ slug: 'profile', locale: 'tr' as any, data: { ...PROFILE, ...(stats.length ? { stats } : {}) } as any, ...o })

  const sv = await payload.find({ collection: 'services', locale: 'en', limit: 100, depth: 0, ...o })
  for (const d of sv.docs as any[]) if (SERVICES[d.title]) await payload.update({ collection: 'services', id: d.id, locale: 'tr' as any, data: SERVICES[d.title] as any, ...o })

  const pj = await payload.find({ collection: 'projects', locale: 'en', limit: 100, depth: 0, ...o })
  for (const d of pj.docs as any[]) if (PROJECTS[d.slug]) await payload.update({ collection: 'projects', id: d.id, locale: 'tr' as any, data: PROJECTS[d.slug] as any, ...o })

  const tm = await payload.find({ collection: 'team', locale: 'en', limit: 100, depth: 0, ...o })
  for (const d of tm.docs as any[]) if (TEAM[d.name]) await payload.update({ collection: 'team', id: d.id, locale: 'tr' as any, data: TEAM[d.name] as any, ...o })
}
export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
