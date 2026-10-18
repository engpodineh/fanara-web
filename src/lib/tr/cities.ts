// Turkish copy for the Iraqi city pages — written for Turkish contractors and employers working in Iraq.
type Block = { name: string; title: string; h1: string; description: string; intro: string; needs: string[]; faq: [string, string][] }

export const CITIES_TR: Record<string, Block> = {
  basra: {
    name: 'Basra',
    title: 'Basra’da Tesisat ve İnce İşler Taşeronu — Sıhhi, Elektrik, HVAC | Fanara',
    h1: 'Basra’da Mekanik, Elektrik ve Sıhhi Tesisat Uygulamaları',
    description: 'Basra’da MEP tasarım, uygulama ve bakım: sıhhi tesisat, elektrik, HVAC, pompa ve kazan daireleri, havuzlar — nem, tuzluluk ve aşırı yaz sıcağına göre tasarlanmış. Basra’da çalışan Türk yükleniciler için yerel taşeron ekip.',
    intro: 'Basra’da yüksek nem, tuzlu su ve zemin ile aşırı yaz sıcaklığı, bunlara göre tasarlanmamış tesisatın ömrünü kısaltır. Korozyona dayanıklı malzeme, su arıtma ve gömülü tesisat koruması belirliyor; soğutmayı en sıcak günlere göre boyutlandırıyoruz.',
    needs: ['Korozyona ve tuza dayanıklı boru ve bağlantı parçaları', 'Depo ve ısıtıcılardan önce su filtreleme/arıtma', 'Gömülü boru ve kabloların korunması', 'Basra sıcaklık ve nemine göre boyutlandırılmış soğutma', 'Pompa ve kazanların planlı bakımı'],
    faq: [['Basra’da çalışıyor musunuz?', 'Evet — Basra’da MEP projelerini tasarlıyor, uyguluyor ve kontrol ediyoruz; çizimleri site veya WhatsApp üzerinden gönderebilirsiniz.'], ['Türk yüklenicilere taşeron olarak çalışıyor musunuz?', 'Evet. Tesisat ve ince işler paketlerini kendi mühendis ve usta ekibimizle taşeron olarak üstleniyoruz.']],
  },
  baghdad: {
    name: 'Bağdat',
    title: 'Bağdat’ta Tesisat ve İnce İşler Taşeronu — Sıhhi, Elektrik, HVAC | Fanara',
    h1: 'Bağdat’ta Mekanik, Elektrik ve Sıhhi Tesisat Uygulamaları',
    description: 'Bağdat’ta MEP tasarım, uygulama ve bakım — hidroforlar, şebeke + jeneratör elektrik dağıtımı, site kanalizasyonu, HVAC — konut, apartman ve siteler için. Türk müteahhitlere yerel taşeronluk.',
    intro: 'Bağdat’ta çok sayıda yeni apartman ve site inşa ediliyor; bununla birlikte üst katlarda düşük su basıncı ve şebeke ile jeneratör arasında bölünen enerji sorunu geliyor. Hidrofor grupları, güvenli transferli dağıtım ve tam MEP koordinasyonu tasarlıyoruz.',
    needs: ['Üst katlar için hidrofor ve depolar', 'Transferli şebeke + jeneratör dağıtımı', 'Site kanalizasyon şebekeleri ve rögarlar', 'Daire ve dükkânlar için HVAC', 'Bakım sözleşmeleri'],
    faq: [['Bağdat’ta çalışıyor musunuz?', 'Evet — Bağdat’ta MEP projelerinin tasarım, uygulama ve kontrolünü yapıyoruz.']],
  },
  najaf: {
    name: 'Necef',
    title: 'Necef’te Tesisat ve İnce İşler Taşeronu — Otel ve Konut Projeleri | Fanara',
    h1: 'Necef’te Mekanik, Elektrik ve Sıhhi Tesisat Uygulamaları',
    description: 'Necef’te MEP tasarım, uygulama ve bakım — oteller ve hacı konaklamaları için merkezi sıcak su ve kazan daireleri, yoğun kullanıma uygun sıhhi tesisat, elektrik ve HVAC. 1.600 konutluk Şems Necef projesinde aktif ekip.',
    intro: 'Necef’teki oteller ve hacı konaklamaları, ziyaret sezonlarındaki en yüksek talepte dayanan sıcak su ve soğutmaya ihtiyaç duyar. Kazan dairelerini, sıcak su depolamayı ve pompaları pik yüke göre, sıhhi tesisatı da yoğun kullanıma göre tasarlıyoruz.',
    needs: ['Pik yüke göre kazan daireleri ve merkezi sıcak su', 'Yoğun kullanıma uygun sıhhi tesisat', 'Salon ve odalar için HVAC', 'Yedek jeneratörlü elektrik', 'Sezon öncesi bakım'],
    faq: [['Necef’te çalışıyor musunuz?', 'Evet — ekibimiz şu anda Necef’te 1.600 konutluk Şems projesinde çalışıyor; tasarım, uygulama ve kontrol hizmeti veriyoruz.']],
  },
  karbala: {
    name: 'Kerbela',
    title: 'Kerbela’da Tesisat ve İnce İşler Taşeronu — Otel ve Misafirhaneler | Fanara',
    h1: 'Kerbela’da Mekanik, Elektrik ve Sıhhi Tesisat Uygulamaları',
    description: 'Kerbela’da MEP tasarım, uygulama ve bakım — otel sıcak suyu ve kazan daireleri, misafirhane ve mevkipler için sıhhi tesisat, pompa ve depolar, elektrik ve HVAC.',
    intro: 'Milyonlarca ziyaretçinin geldiği dönemlerde Kerbela’daki otel, misafirhane ve mevkiplerin yükü katlanır. Su ve atık su şebekelerini, yedek depo ve pompaları, elektrik ve soğutma sistemlerini bu pik yüke göre boyutlandırıyoruz.',
    needs: ['Ziyaret pikine göre su ve atık su şebekesi', 'Yedek depolar ve pompalar', 'Otel sıcak suyu ve kazan daireleri', 'Pik yük için jeneratör, elektrik ve soğutma', 'Sezon öncesi kontrol ve bakım'],
    faq: [['Kerbela’da çalışıyor musunuz?', 'Evet — Kerbela’da MEP projelerinin tasarım, uygulama ve kontrolünü yapıyoruz.']],
  },
}
