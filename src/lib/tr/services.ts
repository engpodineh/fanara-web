// Turkish copy for the service landing pages (Turkish employers and contractors working in Iraq, Türkiye and the region).
type Block = { title: string; h1: string; description: string; intro: string; points: string[]; faq: [string, string][] }

export const SERVICES_TR: Record<string, Block> = {
  'mep-design': {
    title: 'Irak ve Türkiye’de MEP Tasarım ve Tesisat Uygulama | Fanara Mühendislik',
    h1: 'Mekanik, Elektrik ve Sıhhi Tesisat (MEP) Tasarım ve Uygulama',
    description: 'Fanara Mühendislik; su ve kanalizasyon, elektrik, HVAC, pompa ve kazan daireleri ile yüzme havuzu tesisatı için MEP projeleri çizer ve uygular — Irak, Türkiye ve Ermenistan’daki konut, ticari ve endüstriyel projeler için şantiye kontrolüyle birlikte.',
    intro: 'Her bina türü için mekanik ve elektrik tesisatı tasarlıyor, teslime kadar şantiyede takip ediyoruz. 15 yılı aşkın deneyim; Irak’ta 3.500 konutluk bir projede 9 ayda teslim edilen 800 konutun tesisatı dahil.',
    points: ['Boru çapı ve eğim hesaplarıyla temiz su ve atık su projeleri', 'Elektrik: aydınlatma, priz, pano, yük ve kablo hesapları', 'HVAC: ısı kazancı/kaybı hesabı ve sistem seçimi', 'Pompa daireleri, kazan daireleri ve su depoları', 'Mimari ve statik projelerle MEP koordinasyonu (çakışmasız)', 'Metraj (BOQ), şartnameler ve şantiye kontrolü'],
    faq: [['Tek bir ev veya villa için proje çiziyor musunuz?', 'Evet — tek villadan komple konut sitesine kadar. Fiyat teklifi için mimari planı gönderin.'], ['Şantiyede uygulamayı kontrol ediyor musunuz?', 'Evet. Beton dökümü ve kapatma öncesinde tesisatı projeye göre kontrol ediyoruz.'], ['MEP tasarımı ne kadar sürer?', 'Projenin büyüklüğüne bağlıdır; iş programı fiyat teklifiyle birlikte gönderilir.']],
  },
  plumbing: {
    title: 'Sıhhi Tesisat ve Kanalizasyon Tasarım ve Uygulama | Fanara',
    h1: 'Sıhhi Tesisat: Temiz Su ve Atık Su Tesisatı Uygulaması',
    description: 'Konut, apartman ve toplu konut projeleri için sıcak-soğuk su, pis su ve yağmur suyu şebekeleri, su depoları ve hidrofor sistemlerinin tasarım ve uygulaması — Irak, Türkiye ve Ermenistan.',
    intro: 'Doğru yapılmış sıhhi tesisat yıllarca kaçak, tıkanma ve basınç sorunu yaşatmaz. Su ve atık su şebekesini doğru boyutlandırıyor, uygun malzemeyle (PPR, UPVC, HDPE) uyguluyor ve kapatmadan önce basınç testi yapıyoruz.',
    points: ['Kollektörlü PPR sıcak ve soğuk su tesisatı', 'Doğru eğim ve rögarlarla iç ve dış atık su tesisatı', 'Çatı ve yağmur suyu drenajı', 'Çatı ve zemin depoları, hidroforlar', 'Banyo, mutfak ve gömme rezervuar sistemleri', 'Kapatma öncesi basınç ve sızdırmazlık testi'],
    faq: [['İyi bir sıhhi tesisatı ne belirler?', 'Doğru boru çapı ve eğimi ile basınç testi — teslimden sonra kaçak ve düşük basınç olmaz.'], ['Site genelinde kanalizasyon şebekesi yapıyor musunuz?', 'Evet, Irak’taki büyük konut projelerinde rögarlı dış kanalizasyon şebekeleri uyguladık.']],
  },
  electrical: {
    title: 'Elektrik Tesisatı Tasarım ve Uygulama | Fanara Mühendislik',
    h1: 'Elektrik Tesisatı: Proje ve Kablolama Uygulaması',
    description: 'Elektrik proje ve uygulaması: aydınlatma ve priz tesisatı, ana ve tali dağıtım panoları, yük hesabı, jeneratör ve transfer şalterleri, topraklama — Irak, Türkiye ve Ermenistan’daki konut ve projeler için.',
    intro: 'Elektrik sistemini yük hesabından panolara ve devrelere kadar tasarlıyoruz; şebeke ile jeneratör beslemesinin birlikte kullanıldığı koşullara uygun, doğru transfer ve dağıtımla.',
    points: ['Aydınlatma ve priz yerleşimi, devre dağılımı', 'Ana ve tali pano tasarımı ve montajı', 'Yük, kablo ve sigorta boyutlandırma', 'Jeneratör bağlantısı ve ATS transferi', 'Topraklama ve koruma', 'Şantiye kontrolü ve enerji verme öncesi testler'],
    faq: [['Şebeke + jeneratör beslemesine göre tasarım yapıyor musunuz?', 'Evet — önemli yüklerin jeneratörde güvenle çalışması için transfer ve dağıtım sistemi kuruyoruz.'], ['Elektrik panosu tasarlıyor musunuz?', 'Evet, tek hat şemasından montaj ve kuruluma kadar.']],
  },
  hvac: {
    title: 'HVAC ve Merkezi Klima Tasarımı | Fanara Mühendislik',
    h1: 'HVAC: İklimlendirme ve Havalandırma Tasarımı',
    description: 'Sıcak iklimdeki konut ve ticari binalar için ısı yükü hesabı ile split, kanallı, fan-coil/chiller ve VRF sistemleri ve havalandırma tasarımı — Irak, Türkiye ve Ermenistan.',
    intro: 'Sıcak yaz koşullarında doğru sistem enerji ve para tasarrufu sağlar. Her mahallin ısı yükünü hesaplıyor ve doğru sistemi seçiyoruz — split, kanallı split, fan-coil ve chiller veya VRF — kanal ve havalandırmasıyla birlikte.',
    points: ['Mahal bazında ısı yükü hesabı', 'Kanal ve menfez tasarımı', 'Fan-coil, chiller ve VRF sistemleri', 'Banyo, mutfak ve bodrum havalandırması', 'Enerji verimli cihaz seçimi', 'Elektrik ve statikle güzergâh koordinasyonu'],
    faq: [['Split klima mı, merkezi sistem mi?', 'Alana, kat sayısına ve kullanıma bağlıdır; yük hesabından sonra en ekonomik seçeneği öneriyoruz.']],
  },
  'plant-room': {
    title: 'Kazan Dairesi ve Pompa Dairesi Tasarımı | Fanara Mühendislik',
    h1: 'Mekanik Daireler: Kazanlar, Sıcak Su, Isıtma ve Hidroforlar',
    description: 'Siteler, oteller ve hastaneler için mekanik daire tasarım ve uygulaması — kazan ve brülörler, merkezi boylerler, sirkülasyon ve hidrofor pompaları, genleşme tankları ve tesisat şemaları.',
    intro: 'Kazan dairesi binanın kalbidir. Güvenli işletme ve kolay bakım için kazanları, sıcak su depolamayı, pompaları, vanaları ve kontrolleri tasarlıyoruz.',
    points: ['Kazan, brülör ve boyler seçimi', 'Sirkülasyon ve hidrofor pompa grupları', 'Genleşme tankları, vanalar ve emniyet ekipmanları', 'Kazan dairesi hidrolik şeması', 'Yerleşim, havalandırma ve baca koordinasyonu', 'Devreye alma ve balanslama'],
    faq: [['Kazan kapasitesi nasıl belirlenir?', 'Isıtma ve sıcak su yüklerine, daire sayısına ve eş zamanlılığa göre; ekipman seçmeden önce hesaplıyoruz.']],
  },
  'swimming-pools': {
    title: 'Yüzme Havuzu Tesisatı: Filtrasyon, Sirkülasyon ve Isıtma | Fanara',
    h1: 'Yüzme Havuzu Tesisatı: Filtrasyon, Sirkülasyon ve Isıtma',
    description: 'Konut, villa ve oteller için yüzme havuzu tesisatının tasarım ve uygulaması: filtre dairesi, sirkülasyon pompaları, ısıtma, gömme parçalar ve su altı aydınlatması.',
    intro: 'İyi bir havuz, beton dökümünden önce doğru tesisatla başlar. Su hacmini ve devir süresini hesaplıyor; ardından filtre dairesini, pompaları, ısıtmayı ve gömme parçaları tasarlıyoruz.',
    points: ['Devir süresi, kum filtreleri ve pompa seçimi', 'Havuz makine dairesi ve vanalar', 'Gömme parçalar: skimmer, nozul, dip süzgeci', 'Havuz suyu ısıtma ve eşanjörler', 'Güvenli topraklamalı su altı aydınlatması', 'Su arıtma ve klorlama'],
    faq: [['Havuz tesisatı ne zaman yapılmalı?', 'Gömme parçalar ve borular havuz gövdesi dökülmeden önce yerleştirilir.']],
  },
  maintenance: {
    title: 'Bina Tesisatı Bakımı: Sıhhi, Elektrik, Kazan ve HVAC | Fanara',
    h1: 'Bina Tesisatı Bakımı: Sıhhi, Elektrik ve Mekanik',
    description: 'Bina tesisatlarının periyodik ve acil bakımı: kaçak tespiti, kanalizasyon, elektrik panoları, kazanlar ve pompalar, HVAC ve havuz ekipmanları — yıllık bakım sözleşmeleriyle.',
    intro: 'Planlı bakım, arıza sonrası onarımdan çok daha ucuzdur. Kaçak, düşük basınç, elektrik arızası veya zayıf soğutmanın kök nedenini bulup kalıcı olarak gideriyoruz — binalar, oteller ve siteler için yıllık sözleşmelerle.',
    points: ['Kaçak tespiti ve gider tıkanıklıkları', 'Elektrik panoları, sigortalar, topraklama ve yükler', 'Kazanlar, termosifonlar ve pompalar', 'HVAC sistem bakımı', 'Havuz ekipmanları ve filtreler', 'Denetim raporlu bakım sözleşmeleri'],
    faq: [['Yıllık bakım sözleşmesi yapıyor musunuz?', 'Evet — her ziyaretten sonra rapor verilen periyodik ziyaretlerle.']],
  },
  'engineering-design': {
    title: 'Mimari, Statik ve MEP Proje Ofisi | Fanara Mühendislik',
    h1: 'Mühendislik Tasarımı: Mimari, Statik ve MEP Projeleri',
    description: 'Konut, apartman ve ticari projeler için mimari, statik, mekanik ve elektrik projelerini metrajlarıyla birlikte hazırlayan çok disiplinli mühendislik ofisi.',
    intro: 'Fanara ekibi tüm disiplinleri kapsar; mimari, statik ve MEP projelerini tek yerden, koordineli olarak alırsınız — şantiyede çakışma olmaz.',
    points: ['Mimari planlar, görünüşler ve kesitler', 'Statik projeler', 'Mekanik ve elektrik projeleri', 'Disiplinler arası koordinasyon', 'Metraj ve maliyet tahmini', 'Onaya kadar revizyonlar'],
    faq: [['Tüm projeleri tek sözleşmeyle teslim ediyor musunuz?', 'Evet — mimari, statik ve MEP tek bir koordineli ekipten.']],
  },
}
