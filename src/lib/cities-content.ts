// City landing pages for Iraq SEO. Each city gets its own angle (real local conditions), not duplicated text.
import type { Locale } from './i18n'

type Block = { name: string; title: string; h1: string; description: string; intro: string; needs: string[]; faq: [string, string][] }
export type CityPage = { slug: string } & Record<Locale, Block>

export const CITY_PAGES: CityPage[] = [
  {
    slug: 'basra',
    ar: {
      name: 'البصرة',
      title: 'تأسيسات صحية وكهربائية وميكانيكية في البصرة — تصميم وتنفيذ وصيانة | فن آرا',
      h1: 'شركة تأسيسات صحية وكهربائية وميكانيكية في البصرة',
      description: 'تصميم وتنفيذ وصيانة التأسيسات في البصرة: صحيات وتأسيس ماء ومجاري، كهربائيات ولوحات، تكييف، غرف مضخات ومراجل ومسابح — مع حلول للرطوبة والملوحة وحرارة الصيف.',
      intro: 'في البصرة، الرطوبة العالية وملوحة الماء والتربة وحرارة الصيف الشديدة تختصر عمر التأسيسات إذا لم تُصمَّم لها. نختار مواد مقاومة للتآكل، ونصمم معالجة الماء وحماية الأنابيب المدفونة، ونحسب أحمال التكييف لأقسى أيام الصيف.',
      needs: ['أنابيب ووصلات مقاومة للتآكل والملوحة', 'فلاتر ومعالجة الماء قبل الخزانات والسخانات', 'حماية الأنابيب والكابلات المدفونة من الرطوبة', 'تكييف محسوب لدرجات حرارة ورطوبة البصرة', 'صيانة دورية للمضخات والمراجل في الأجواء الرطبة'],
      faq: [['هل تعملون في البصرة؟', 'نعم، نصمم وننفذ ونشرف على مشاريع التأسيسات في البصرة، ونستلم المخططات والطلبات عبر الموقع وواتساب.'], ['ما أهم مشكلة للتأسيسات في البصرة؟', 'التآكل بسبب الملوحة والرطوبة؛ لذلك نختار المواد والحماية المناسبة من مرحلة التصميم.']],
    },
    fa: {
      name: 'بصره',
      title: 'طراحی و اجرای تأسیسات ساختمان در بصره | دفتر مهندسی فن آرا',
      h1: 'تأسیسات مکانیکی، برقی و بهداشتی در بصره',
      description: 'طراحی، اجرا و نگهداری تأسیسات در بصره با راهکار برای رطوبت، شوری آب و خاک و گرمای شدید تابستان.',
      intro: 'در بصره رطوبت بالا، شوری آب و خاک و گرمای شدید، عمر تأسیسات را کوتاه می‌کند؛ مصالح ضدخوردگی، تصفیه‌ی آب و محاسبه‌ی دقیق بار سرمایشی را از مرحله‌ی طراحی در نظر می‌گیریم.',
      needs: ['لوله و اتصالات مقاوم در برابر خوردگی و شوری', 'فیلتر و تصفیه‌ی آب پیش از مخزن و آبگرمکن', 'حفاظت لوله‌ها و کابل‌های مدفون', 'سرمایش متناسب با دما و رطوبت بصره', 'نگهداری دوره‌ای پمپ‌ها و دیگ‌ها'],
      faq: [['در بصره کار می‌کنید؟', 'بله؛ طراحی، اجرا و نظارت پروژه‌های تأسیسات در بصره.']],
    },
    en: {
      name: 'Basra',
      title: 'MEP Contractor in Basra — Plumbing, Electrical & HVAC | Fanara',
      h1: 'Plumbing, Electrical and Mechanical Installations in Basra',
      description: 'MEP design, installation and maintenance in Basra — plumbing, electrical, HVAC, pump and boiler rooms, pools — engineered for humidity, salinity and extreme summer heat.',
      intro: 'In Basra, high humidity, saline water and soil and extreme summer heat shorten the life of building services that are not designed for them. We specify corrosion-resistant materials, water treatment and protection for buried services, and size cooling for the hottest days.',
      needs: ['Corrosion- and salt-resistant pipes and fittings', 'Water filtration/treatment before tanks and heaters', 'Protection for buried pipes and cables', 'Cooling sized for Basra temperature and humidity', 'Planned maintenance of pumps and boilers'],
      faq: [['Do you work in Basra?', 'Yes — we design, install and supervise MEP projects in Basra; send drawings via the site or WhatsApp.']],
    },
  },
  {
    slug: 'baghdad',
    ar: {
      name: 'بغداد',
      title: 'تأسيسات صحية وكهربائية وميكانيكية في بغداد — تصميم وتنفيذ وصيانة | فن آرا',
      h1: 'شركة تأسيسات صحية وكهربائية وميكانيكية في بغداد',
      description: 'تصميم وتنفيذ وصيانة التأسيسات في بغداد: تأسيس ماء ومجاري، كهربائيات ولوحات مع الوطنية والمولدة، تكييف وتهوية، غرف مضخات ومراجل ومسابح — للبيوت والعمارات والمجمعات السكنية.',
      intro: 'في بغداد تكثر العمارات والمجمعات السكنية الجديدة، ومعها مشاكل ضعف ضغط الماء في الطوابق العليا وتوزيع الكهرباء بين الوطنية والمولدة. نصمم خزانات ومضخات رفع الضغط، وتوزيعًا كهربائيًا مع مفاتيح تحويل آمنة، وتنسيقًا كاملًا بين التأسيسات والمخطط المعماري.',
      needs: ['مضخات رفع الضغط للطوابق العليا والخزانات', 'توزيع كهربائي للوطنية والمولدة ومفاتيح التحويل', 'شبكات مجاري للمجمعات السكنية والمنهولات', 'تكييف وتهوية للعمارات والمحلات التجارية', 'عقود صيانة للعمارات والمجمعات'],
      faq: [['هل تعملون في بغداد؟', 'نعم، نصمم وننفذ ونشرف على مشاريع التأسيسات في بغداد، ونستلم الطلبات عبر الموقع وواتساب.'], ['لماذا يضعف ضغط الماء في الطوابق العليا؟', 'لعدم وجود مضخة رفع ضغط أو سوء تصميم الأقطار؛ نحسبها ونصمم منظومة الضخ المناسبة.']],
    },
    fa: {
      name: 'بغداد',
      title: 'طراحی و اجرای تأسیسات ساختمان در بغداد | دفتر مهندسی فن آرا',
      h1: 'تأسیسات مکانیکی، برقی و بهداشتی در بغداد',
      description: 'طراحی، اجرا و نگهداری تأسیسات در بغداد: پمپ افزایش فشار، توزیع برق شبکه و ژنراتور، فاضلاب مجتمع‌ها و تهویه.',
      intro: 'در بغداد ساختمان‌ها و مجتمع‌های مسکونی جدید زیاد است و مشکل افت فشار آب در طبقات بالا و توزیع برق بین شبکه و ژنراتور رایج است؛ برای هر دو، راهکار طراحی‌شده ارائه می‌دهیم.',
      needs: ['بوستر پمپ و مخازن برای طبقات بالا', 'توزیع برق شبکه و ژنراتور با کلید انتقال', 'شبکه‌ی فاضلاب مجتمع و منهول', 'تهویه‌ی ساختمان‌ها و واحدهای تجاری', 'قرارداد نگهداری'],
      faq: [['در بغداد کار می‌کنید؟', 'بله؛ طراحی، اجرا و نظارت پروژه‌های تأسیسات در بغداد.']],
    },
    en: {
      name: 'Baghdad',
      title: 'MEP Contractor in Baghdad — Plumbing, Electrical & HVAC | Fanara',
      h1: 'Plumbing, Electrical and Mechanical Installations in Baghdad',
      description: 'MEP design, installation and maintenance in Baghdad — booster pumps, grid-plus-generator electrical distribution, compound drainage, HVAC — for houses, apartment buildings and compounds.',
      intro: 'Baghdad is building many new apartment blocks and compounds — and with them low water pressure on upper floors and power split between grid and generator. We design booster sets, safe changeover distribution and full MEP coordination.',
      needs: ['Booster pumps and tanks for upper floors', 'Grid + generator distribution with changeover', 'Compound drainage networks and manholes', 'HVAC for apartments and shops', 'Maintenance contracts'],
      faq: [['Do you work in Baghdad?', 'Yes — design, installation and supervision of MEP projects in Baghdad.']],
    },
  },
  {
    slug: 'najaf',
    ar: {
      name: 'النجف',
      title: 'تأسيسات صحية وكهربائية وميكانيكية في النجف — فنادق وسكن ومشاريع | فن آرا',
      h1: 'شركة تأسيسات صحية وكهربائية وميكانيكية في النجف الأشرف',
      description: 'تصميم وتنفيذ وصيانة التأسيسات في النجف: صحيات وماء حار للفنادق ودور الزائرين، غرف مراجل ومضخات، كهرباء ولوحات، تكييف — للمشاريع السكنية والفندقية والتجارية.',
      intro: 'في النجف الأشرف تحتاج الفنادق ودور الزائرين إلى منظومات ماء حار وتكييف تتحمل ذروة الاستخدام في مواسم الزيارة. نصمم غرف المراجل وخزانات الماء الحار والمضخات بسعة تكفي الذروة، وتأسيسات صحية تتحمل الاستخدام المكثف.',
      needs: ['غرف مراجل وماء حار مركزي للفنادق بسعة الذروة', 'تأسيسات صحية للاستخدام المكثف (حمامات ومغاسل كثيرة)', 'تكييف وتهوية للصالات والغرف', 'كهرباء ولوحات مع مولدات احتياطية', 'صيانة قبل مواسم الزيارة'],
      faq: [['هل تعملون في النجف؟', 'نعم، نصمم وننفذ ونشرف على مشاريع التأسيسات في النجف، ونستلم الطلبات عبر الموقع وواتساب.'], ['كيف يكفي الماء الحار في موسم الزيارة؟', 'بحساب الاستهلاك المتزامن في الذروة وتصميم المراجل وخزانات التخزين على أساسه.']],
    },
    fa: {
      name: 'نجف',
      title: 'طراحی و اجرای تأسیسات هتل و ساختمان در نجف | دفتر مهندسی فن آرا',
      h1: 'تأسیسات مکانیکی، برقی و بهداشتی در نجف اشرف',
      description: 'طراحی، اجرا و نگهداری تأسیسات در نجف: آب گرم و موتورخانه‌ی هتل‌ها و زائرسراها، تأسیسات بهداشتی پرمصرف، برق و تهویه.',
      intro: 'هتل‌ها و زائرسراهای نجف در ایام زیارت به آب گرم و سرمایش با ظرفیت اوج نیاز دارند؛ موتورخانه، منابع آب گرم و پمپ‌ها را بر اساس مصرف هم‌زمان اوج طراحی می‌کنیم.',
      needs: ['موتورخانه و آب گرم مرکزی با ظرفیت اوج', 'تأسیسات بهداشتی برای مصرف زیاد', 'سرمایش و تهویه‌ی سالن‌ها و اتاق‌ها', 'برق و ژنراتور پشتیبان', 'نگهداری پیش از ایام زیارت'],
      faq: [['در نجف کار می‌کنید؟', 'بله؛ طراحی، اجرا و نظارت پروژه‌های تأسیسات در نجف.']],
    },
    en: {
      name: 'Najaf',
      title: 'MEP Contractor in Najaf — Hotels, Housing & Projects | Fanara',
      h1: 'Plumbing, Electrical and Mechanical Installations in Najaf',
      description: 'MEP design, installation and maintenance in Najaf — central hot water and boiler rooms for hotels and pilgrim lodgings, heavy-use plumbing, electrical and HVAC.',
      intro: 'Hotels and pilgrim lodgings in Najaf need hot water and cooling that hold up at peak demand during visitation seasons. We size boiler rooms, hot-water storage and pumps for the peak, with plumbing built for heavy use.',
      needs: ['Boiler rooms and central hot water sized for peak', 'Heavy-use sanitary installations', 'HVAC for halls and rooms', 'Electrical with standby generators', 'Pre-season maintenance'],
      faq: [['Do you work in Najaf?', 'Yes — design, installation and supervision of MEP projects in Najaf.']],
    },
  },
  {
    slug: 'karbala',
    ar: {
      name: 'كربلاء',
      title: 'تأسيسات صحية وكهربائية وميكانيكية في كربلاء — فنادق ومواكب ومشاريع | فن آرا',
      h1: 'شركة تأسيسات صحية وكهربائية وميكانيكية في كربلاء المقدسة',
      description: 'تصميم وتنفيذ وصيانة التأسيسات في كربلاء: ماء حار وغرف مراجل للفنادق، صحيات للمواكب ودور الضيافة، مضخات وخزانات، كهرباء وتكييف — للمشاريع الفندقية والسكنية.',
      intro: 'في كربلاء المقدسة يتضاعف الضغط على تأسيسات الفنادق ودور الضيافة والمواكب في الزيارات المليونية. نصمم شبكات ماء ومجاري بأقطار وسعات تتحمل هذا الضغط، وخزانات ومضخات احتياطية، وكهرباء وتكييف لا يتوقفان في الذروة.',
      needs: ['شبكات ماء ومجاري بسعة الزيارات المليونية', 'خزانات ومضخات احتياطية للماء', 'ماء حار ومراجل للفنادق ودور الضيافة', 'كهرباء ومولدات وتكييف للذروة', 'صيانة وفحص قبل المواسم'],
      faq: [['هل تعملون في كربلاء؟', 'نعم، نصمم وننفذ ونشرف على مشاريع التأسيسات في كربلاء، ونستلم الطلبات عبر الموقع وواتساب.'], ['هل تصممون تأسيسات المواكب ودور الضيافة؟', 'نعم، صحيات وماء حار وكهرباء بسعة الاستخدام الكثيف.']],
    },
    fa: {
      name: 'کربلا',
      title: 'طراحی و اجرای تأسیسات هتل و ساختمان در کربلا | دفتر مهندسی فن آرا',
      h1: 'تأسیسات مکانیکی، برقی و بهداشتی در کربلای معلی',
      description: 'طراحی، اجرا و نگهداری تأسیسات در کربلا: آب گرم و موتورخانه‌ی هتل‌ها، تأسیسات موکب‌ها و مهمان‌سراها، پمپ و مخزن، برق و تهویه.',
      intro: 'در زیارت‌های میلیونی، فشار روی تأسیسات هتل‌ها، مهمان‌سراها و موکب‌های کربلا چند برابر می‌شود؛ شبکه‌ی آب و فاضلاب، مخازن و پمپ‌های پشتیبان و برق و سرمایش را برای این اوج طراحی می‌کنیم.',
      needs: ['شبکه‌ی آب و فاضلاب برای اوج زیارت', 'مخزن و پمپ پشتیبان', 'آب گرم و موتورخانه‌ی هتل‌ها', 'برق، ژنراتور و سرمایش اوج', 'نگهداری پیش از ایام زیارت'],
      faq: [['در کربلا کار می‌کنید؟', 'بله؛ طراحی، اجرا و نظارت پروژه‌های تأسیسات در کربلا.']],
    },
    en: {
      name: 'Karbala',
      title: 'MEP Contractor in Karbala — Hotels, Guest Houses & Projects | Fanara',
      h1: 'Plumbing, Electrical and Mechanical Installations in Karbala',
      description: 'MEP design, installation and maintenance in Karbala — hotel hot water and boiler rooms, plumbing for guest houses and mawakib, pumps and tanks, electrical and HVAC.',
      intro: 'During the million-visitor pilgrimages, the load on hotels, guest houses and mawakib in Karbala multiplies. We size water and drainage networks, standby tanks and pumps, and electrical and cooling systems for that peak.',
      needs: ['Water and drainage sized for pilgrimage peaks', 'Standby tanks and pumps', 'Hotel hot water and boiler rooms', 'Generators, electrical and cooling for peak load', 'Pre-season inspection and maintenance'],
      faq: [['Do you work in Karbala?', 'Yes — design, installation and supervision of MEP projects in Karbala.']],
    },
  },
]

export const cityBySlug = (s: string) => CITY_PAGES.find((c) => c.slug === s)
