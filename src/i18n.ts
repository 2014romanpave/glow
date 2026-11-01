import { BLOG } from './blog';
export const LANGS = ['pl', 'ua'] as const;
export type Lang = (typeof LANGS)[number];
export const HTML_LANG: Record<Lang, string> = { pl: 'pl', ua: 'uk' };
export const SITE_URL = 'https://glowpoznan.com';
export const BOOKSY = 'https://glowhairatelier.booksy.com/a/';
export const BOOKSY_PROFILE = 'https://booksy.com/pl-pl/190507_glow-hair-atelier_fryzjer_15608_poznan';
export const RATING = { value: '5.0', count: 503 };
export const C = {
  name: 'GLOW Hair Atelier',
  phone: '+48 789 822 636',
  email: 'glowhairatelier@gmail.com',
  instagram: 'https://www.instagram.com/glow.poznan',
  youtube: 'https://www.youtube.com/@GLOWHAIRAtelier/shorts',
  facebook: 'https://www.facebook.com/glow.poznan',
  tiktok: 'https://www.tiktok.com/@glowhairatelier',
  street: 'Romka Strzałkowskiego 11',
  zip: '60-854',
  city: 'Poznań',
  district: 'Jeżyce',
  maps: 'https://maps.app.goo.gl/UaWPZjVQbtzsgh7y8', mapEmbed: 'https://maps.google.com/maps?cid=5580633792286186044&output=embed', hasMap: 'https://maps.google.com/?cid=5580633792286186044',
  gbp: '', // TODO: link do profilu Google Business, gdy powstanie
  geo: { lat: 52.4130122, lng: 16.9073264 },
};
export const PAGES = ['home', 'coloring', 'haircuts', 'hairstyles', 'makeup', 'brows', 'kursy', 'praca', 'contact', 'blog'] as const;
export type Page = (typeof PAGES)[number];
export const path = (lang: Lang, p: Page) => `${lang === 'ua' ? '/ua' : ''}/${p === 'home' ? '' : p}`.replace(/\/$/, '') || '/';

type Svc = { title: string; h1: string; lead: string; points: string[]; meta: string; dir: string; n: number; alt: string };

export const REVIEWS = [
  { a: 'Monika', s: 'Upięcia i półupięcia', w: 'Wiktoria', t: 'Przepiękne upięcie, które bez żadnych zastrzeżeń wytrzymało do samego rana 😊 Pani Wiktoria przemiła osoba, która doskonale zna się na tym, co robi.' },
  { a: 'Patrycja', s: 'Laminacja rzęs + farbowanie', w: 'Wiktoria', t: 'Szczerze polecam. profesjonalizm, kultura i miła atmosfera. polecam' },
  { a: 'B', s: 'Laminacja brwi + regulacja + farbowanie', w: 'Wiktoria', t: 'Bardzo, bardzo polecam! Cudowny efekt, bardzo miła atmosfera, jestem zachwycona!' },
  { a: 'Геннадий', s: 'Strzyżenie męskie', w: 'Ola', t: 'gorąco polecam panią. fryzura była wykonana doskonale' },
  { a: 'Emily', s: 'Przedłużanie rzęs 1:1', w: 'Wiktoria', t: 'Jestem mega zadowolona, już drugi raz, robię delikatne rzęsy.' },
  { a: 'Wiktoria', s: 'Regulacja brwi + geometria', w: '', t: 'Polecam! Wszystko profesjonalnie!' },
];

const pl = {
  nav: { coloring: 'Koloryzacja', haircuts: 'Strzyżenie', hairstyles: 'Fryzury', makeup: 'Makijaż', brows: 'Brwi', kursy: 'Kursy', praca: 'Praca', blog: 'Blog', contact: 'Kontakty' },
  book: 'Umów bezpłatną konsultację', bookShort: 'Zarezerwuj wizytę', more: 'Zobacz więcej', menu: 'Menu', close: 'Zamknij',
  rating: `${RATING.value} ★ · ${RATING.count}+ opinii na Booksy`,
  home: {
    title: 'GLOW Hair Atelier — fryzjer i koloryzacja AirTouch w Poznaniu (Jeżyce)',
    meta: 'Salon fryzjerski GLOW Hair Atelier w Poznaniu, Jeżyce. Koloryzacja AirTouch, strzyżenie, przedłużanie rzęs, makijaż. Ocena 5.0 na Booksy. Bezpłatna konsultacja i pasmo testowe.',
    eyebrow: 'Poznań · Jeżyce',
    h1a: 'Salon piękności', h1b: 'Glow', h1c: 'Poznaniu', 
    lead: 'Koloryzacja AirTouch, strzyżenia, rzęsy, brwi i makijaż w Poznaniu. Zaczynamy od bezpłatnej konsultacji.',
    topT: 'W czym jesteśmy najlepsi', 
    top: [
      { p: 'coloring', t: 'Koloryzacja AirTouch', d: 'Miękkie, naturalne przejścia koloru i jasny blond bez efektu odrostu. Technika, która wymaga doświadczenia — i ono widać na zdjęciach.', img: '/img/coloring/airtouch3_1x.webp' },
      { p: 'brows', t: 'Rzęsy i brwi', d: 'Przedłużanie rzęs 1:1, laminacja rzęs i brwi, geometria. Delikatny, dopracowany efekt, który trzyma się tygodniami.', img: '/img/brows/brows3_1x.webp' },
      { p: 'makeup', t: 'Makijaż', d: 'Makijaż okolicznościowy, ślubny i artystyczny. Trwały, fotogeniczny, dopasowany do Twojej urody i okazji.', img: '/img/makeup/makeup2_1x.webp' },
    ],
    whyT: 'Dlaczego nie ma cennika?', 
    why: 'Każde włosy mają inną historię: długość, gęstość, wcześniejsze farbowania. Zamiast „ceny z sufitu” proponujemy bezpłatną konsultację i pasmo testowe. Mistrzyni oceni stan włosów, dobierze technikę i poda dokładny koszt jeszcze przed zabiegiem. Bez niespodzianek.',
    whySteps: ['Bezpłatna konsultacja (20 min)', 'Pasmo testowe i plan zabiegu', 'Dokładna wycena przed rozpoczęciem'],
    teamT: 'Nasze mistrzynie',
    team: [
      { n: 'Ola', r: 'Fryzjerka uniwersalna · strzyżenie, koloryzacja, AirTouch', d: 'Założycielka GLOW. Od strzyżenia po złożone koloryzacje — zawsze z dbałością o kondycję włosów.', b: 'https://booksy.com/pl-pl/190507_glow-hair-atelier_fryzjer_15608_poznan/staffer/397957#ba_s=dl_1', c: 'Umów się do Oli' },
      { n: 'Wiktoria', r: 'Brwi · rzęsy · upięcia · makijaż', d: 'Laminacje, przedłużanie rzęs 1:1, upięcia wieczorowe i makijaż okolicznościowy.', b: 'https://booksy.com/pl-pl/190507_glow-hair-atelier_fryzjer_15608_poznan/staffer/396048#ba_s=dl_1', c: 'Umów się do Wiktorii' },
    ],
    photoTodo: 'Zdjęcie wkrótce',
    revT: 'Co mówią klientki', revAll: 'Wszystkie opinie na Booksy', revG: 'Opinie Google — wkrótce',
    galT: 'Nasze prace',
    kursT: 'Kursy GLOW Academy', kursSoon: 'Wkrótce',
    vacT: 'Szukamy kolorystki / kolorysty', vacD: 'Dołącz do zespołu z oceną 5.0. Wynagrodzenie prowizyjne — procent ustalamy na rozmowie.', vacCta: 'Szczegóły oferty',
  },
  svc: {
    coloring: { title: 'Koloryzacja AirTouch, balayage i blond w Poznaniu | GLOW Hair Atelier', meta: 'Koloryzacja włosów w Poznaniu (Jeżyce): AirTouch, Brazilian blonde, balayage, Total Blond, kolor jednolity. Bezpłatna konsultacja i pasmo testowe.', h1: 'Koloryzacja włosów i AirTouch w Poznaniu', lead: 'AirTouch, balayage, Brazilian blonde, Total Blond i kolor jednolity. Dobieramy odcień do Twojej karnacji i kondycji włosów, a rozjaśniamy z ochroną struktury.', points: ['AirTouch — naturalne, miękkie przejścia', 'Brazilian blonde / balayage / pasemka', 'Total Blond i wyjście z ciemnego koloru', 'Tonowanie, konturowanie, koloryzacja odrostu'], dir: 'coloring', n: 12, alt: 'Koloryzacja AirTouch Poznań' },
    haircuts: { title: 'Strzyżenie damskie, męskie i dziecięce — fryzjer Poznań Jeżyce | GLOW', meta: 'Fryzjer w Poznaniu na Jeżycach: strzyżenie damskie, męskie, dziecięce, grzywka. Fryzura dopasowana do kształtu twarzy i stylu życia.', h1: 'Strzyżenie', lead: 'Fryzura dopasowana do kształtu twarzy, struktury włosów i Twojego stylu życia — łatwa w codziennym układaniu.', points: ['Strzyżenie damskie', 'Strzyżenie męskie', 'Strzyżenie dziecka', 'Cięcie grzywki, modelowanie'], dir: 'haircut', n: 15, alt: 'Strzyżenie damskie Poznań' },
    hairstyles: { title: 'Upięcia ślubne i wieczorowe w Poznaniu | GLOW Hair Atelier', meta: 'Upięcia i półupięcia ślubne, wieczorowe i okolicznościowe w Poznaniu. Trwałe fryzury, które wytrzymają całą noc. Pakiet makijaż + upięcie.', h1: 'Upięcia i fryzury okolicznościowe', lead: 'Ślub, studniówka, sesja zdjęciowa — upięcia, które wyglądają lekko i wytrzymują do rana.', points: ['Upięcia i półupięcia', 'Fryzury ślubne', 'Modelowanie', 'Pakiet makijaż + upięcie'], dir: 'hairstyles', n: 22, alt: 'Upięcie wieczorowe Poznań' },
    makeup: { title: 'Makijaż ślubny i okolicznościowy w Poznaniu | GLOW Hair Atelier', meta: 'Makijaż ślubny, okolicznościowy, artystyczny i próbny w Poznaniu (Jeżyce). Trwały i fotogeniczny. Pakiet makijaż + upięcie.', h1: 'Makijaż', lead: 'Trwały, fotogeniczny makijaż, który podkreśla urodę — na ślub, wieczór, sesję lub ważne wydarzenie.', points: ['Makijaż okolicznościowy', 'Makijaż ślubny i próbny', 'Makijaż artystyczny / charakteryzacja', 'Pakiet makijaż + upięcie'], dir: 'makeup', n: 8, alt: 'Makijaż okolicznościowy Poznań' },
    brows: { title: 'Laminacja brwi i przedłużanie rzęs 1:1 w Poznaniu | GLOW', meta: 'Laminacja brwi i rzęs, regulacja z geometrią, przedłużanie rzęs 1:1 w Poznaniu na Jeżycach. Naturalny, trwały efekt.', h1: 'Brwi i rzęsy', lead: 'Laminacja, geometria i przedłużanie rzęs 1:1. Naturalny efekt, który podkreśla spojrzenie i utrzymuje się tygodniami.', points: ['Przedłużanie rzęs 1:1', 'Laminacja rzęs + farbowanie', 'Laminacja brwi + regulacja', 'Regulacja brwi z geometrią'], dir: 'brows', n: 13, alt: 'Laminacja brwi Poznań' },
  } as Record<string, Omit<Svc, 'meta'> & { meta: string }>,
  kursy: {
    title: 'Kursy fryzjerskie w Poznaniu — karé i bob-karé | GLOW Academy', meta: 'Kursy fryzjerskie GLOW Academy w Poznaniu. Pierwszy kurs: karé i bob-karé. Wkrótce: koloryzacja i techniki farbowania. Zapisz się na listę oczekujących.',
    eyebrow: 'GLOW Academy · Kurs karé i bob-karé', hook: 'Strzyż karé i bob-karé pewnie, precyzyjnie i drożej',
    forT: 'Dla kogo', forList: ['Fryzjerów, którzy chcą podnieść swoje umiejętności', 'Początkujących po szkole fryzjerskiej', 'Mistrzów, którzy chcą opanować karé i bob-karé do perfekcji'],
    getT: 'Co zyskasz', getList: [['15+ lat doświadczenia', 'Wiedza Oli zebrana w praktyce salonu z oceną 5.0.'], ['Wszystkie odmiany karé i bob-karé', 'Od klasyki po nowoczesne formy — w jednym kursie.'], ['Praktyka', 'Uczysz się na realnych przykładach, nie tylko z teorii.'], ['Techniki od razu do pracy', 'Wdrożysz je w salonie już następnego dnia.'], ['Pewność i wyższe ceny', 'Lepszy efekt to zadowolone klientki i odwaga, by cenić swoją pracę.'], ['Indywidualne podejście', 'Mała grupa lub zajęcia indywidualne — czas na każde pytanie.']],
    progT: 'Program', soon: 'Wkrótce', first: 'Pierwszy kurs', detailsSoon: 'Termin, czas trwania i szczegóły — wkrótce.',
    cta: 'Zapisz się na listę oczekujących', videoAlt: 'Najlepsze prace: karé, bob-karé i koloryzacja',
    h1: 'GLOW Academy — kursy fryzjerskie', lead: 'Praktyczne kursy prowadzone przez Olę — fryzjerkę z ponad 15-letnim doświadczeniem i salonem z oceną 5.0.',
    list: [{ t: 'Karé i bob-karé', s: 'Pierwszy kurs · wkrótce', d: 'Wszystkie odmiany karé i bob-karé w jednym kursie: dobór formy, geometria cięcia, praca z różną strukturą włosów i stylizacja.' }, { t: 'Koloryzacja', s: 'W przygotowaniu', d: 'Teoria koloru, dobór odcienia, praca z rozjaśniaczem.' }, { t: 'Techniki farbowania', s: 'W przygotowaniu', d: 'AirTouch, balayage, Brazilian blonde w praktyce.' }],
    bioT: 'Prowadząca: Ola', bio: 'Ola pracuje w zawodzie od ponad 15 lat. Przez ten czas stała się mistrzynią uniwersalną — równie pewnie czuje się w strzyżeniu, jak i w koloryzacji. W pierwszym kursie zebrała najbardziej przydatną wiedzę o wszystkich odmianach karé i bob-karé: od doboru formy do twarzy, przez geometrię cięcia, po stylizację. O terminy i szczegóły zapytaj nas dowolnym kanałem podanym na stronie.', 
    waitT: 'Zapisz się na listę oczekujących', wait: 'Napisz do nas na Instagramie, zadzwoń lub wyślij e-mail — damy znać jako pierwsi o terminie i szczegółach kursu.',
  },
  praca: {
    title: 'Praca: kolorystka / kolorysta w Poznaniu | GLOW Hair Atelier', meta: 'GLOW Hair Atelier w Poznaniu (Jeżyce) szuka fryzjera-kolorysty. Wynagrodzenie prowizyjne, procent ustalany na rozmowie. Aplikuj przez Instagram, telefon lub e-mail.',
    h1: 'Szukamy kolorystki / kolorysty', lead: 'Dołącz do zespołu GLOW Hair Atelier — salonu z oceną 5.0 i stałą bazą klientek na poznańskich Jeżycach.',
    offerT: 'Oferujemy', offer: ['Wynagrodzenie prowizyjne — procent ustalamy indywidualnie na rozmowie', 'Stały napływ klientek z Booksy', 'Estetyczne, nowoczesne miejsce pracy', 'Profesjonalne kosmetyki i zgrany zespół'],
    needT: 'Czekamy na Ciebie, jeśli', need: ['masz doświadczenie w koloryzacji (blond, AirTouch, balayage)', 'dbasz o jakość i kondycję włosów klientki', 'lubisz pracę z ludźmi i rozwój'],
    applyT: 'Jak aplikować', apply: 'Wyślij portfolio na Instagramie, zadzwoń lub napisz e-mail.',
  },
  contact: { title: 'Kontakt — GLOW Hair Atelier, Romka Strzałkowskiego 11, Poznań', meta: 'GLOW Hair Atelier: Romka Strzałkowskiego 11, 60-854 Poznań (Jeżyce). Tel. +48 789 822 636. Pn–pt 10–19, sob 10–17. Zapisy przez Booksy.', h1: 'Kontakt', hoursT: 'Godziny otwarcia', hours: [['Poniedziałek – piątek', '10:00 – 19:00'], ['Sobota', '10:00 – 17:00'], ['Niedziela', 'nieczynne']], route: 'Wyznacz trasę' },
  footer: { rights: 'Wszelkie prawa zastrzeżone.', design: 'Design: Roman Pavel' },
};

type D = typeof pl;
const ua: D = {
  nav: { coloring: 'Фарбування', haircuts: 'Стрижки', hairstyles: 'Зачіски', makeup: 'Макіяж', brows: 'Брови й вії', kursy: 'Курси', praca: 'Вакансія', blog: 'Блог', contact: 'Контакти' },
  book: 'Записатися на безкоштовну консультацію', bookShort: 'Записатися', more: 'Детальніше', menu: 'Меню', close: 'Закрити',
  rating: `${RATING.value} ★ · ${RATING.count}+ відгуків на Booksy`,
  home: {
    title: 'GLOW Hair Atelier — перукар і фарбування AirTouch у Познані (Єжице)',
    meta: 'Салон GLOW Hair Atelier у Познані, район Єжице. Фарбування AirTouch, стрижки, нарощування вій, макіяж. Рейтинг 5.0 на Booksy. Безкоштовна консультація і тестове пасмо.',
    eyebrow: 'Познань · Єжице',
    h1a: 'Салон краси', h1b: 'Glow', h1c: 'Познані',
    lead: 'Фарбування AirTouch, стрижки, вії, брови та макіяж у Познані. Починаємо з безкоштовної консультації.',
    topT: 'У чому ми найкращі',
    top: [
      { p: 'coloring', t: 'Фарбування AirTouch', d: 'М’які природні переходи кольору й чистий блонд без помітного відростання. Техніка, що потребує досвіду — і він видно на фото.', img: '/img/coloring/airtouch3_1x.webp' },
      { p: 'brows', t: 'Вії та брови', d: 'Нарощування вій 1:1, ламінування вій і брів, геометрія. Делікатний результат, що тримається тижнями.', img: '/img/brows/brows3_1x.webp' },
      { p: 'makeup', t: 'Макіяж', d: 'Святковий, весільний і художній макіяж. Стійкий, фотогенічний, підібраний під вашу зовнішність і подію.', img: '/img/makeup/makeup2_1x.webp' },
    ],
    whyT: 'Чому немає прайсу?',
    why: 'Кожне волосся має свою історію: довжина, густота, попередні фарбування. Тому замість «середньої ціни» ми пропонуємо безкоштовну консультацію і тестове пасмо. Майстриня оцінить стан волосся, підбере техніку і назве точну вартість ще до початку процедури. Без сюрпризів.',
    whySteps: ['Безкоштовна консультація (20 хв)', 'Тестове пасмо і план процедури', 'Точна вартість до початку роботи'],
    teamT: 'Наші майстрині',
    team: [
      { n: 'Оля', r: 'Майстер-універсал · стрижки, фарбування, AirTouch', d: 'Засновниця GLOW. Від стрижки до складних фарбувань — завжди з турботою про якість волосся.', b: 'https://booksy.com/pl-pl/190507_glow-hair-atelier_fryzjer_15608_poznan/staffer/397957#ba_s=dl_1', c: 'Записатися до Олі' },
      { n: 'Вікторія', r: 'Брови · вії · зачіски · макіяж', d: 'Ламінування, нарощування вій 1:1, вечірні зачіски та святковий макіяж.', b: 'https://booksy.com/pl-pl/190507_glow-hair-atelier_fryzjer_15608_poznan/staffer/396048#ba_s=dl_1', c: 'Записатися до Вікторії' },
    ],
    photoTodo: 'Фото незабаром',
    revT: 'Що кажуть клієнтки', revAll: 'Усі відгуки на Booksy', revG: 'Відгуки Google — незабаром',
    galT: 'Наші роботи',
    kursT: 'Курси GLOW Academy', kursSoon: 'Незабаром',
    vacT: 'Шукаємо майстра-колориста', vacD: 'Приєднуйтесь до команди з рейтингом 5.0. Оплата — відсоток, який узгоджуємо на співбесіді.', vacCta: 'Деталі вакансії',
  },
  svc: {
    coloring: { title: 'Фарбування AirTouch, балаяж і блонд у Познані | GLOW Hair Atelier', meta: 'Фарбування волосся в Познані (Єжице): AirTouch, Brazilian blonde, балаяж, Total Blond, однотонне фарбування. Безкоштовна консультація і тестове пасмо.', h1: 'Фарбування волосся і AirTouch у Познані', lead: 'AirTouch, балаяж, Brazilian blonde, Total Blond та однотонне фарбування. Підбираємо відтінок під ваш колорит і стан волосся, освітлюємо зі збереженням структури.', points: ['AirTouch — природні м’які переходи', 'Brazilian blonde / балаяж / мелірування', 'Total Blond і вихід із темного кольору', 'Тонування, контуринг, фарбування коренів'], dir: 'coloring', n: 12, alt: 'Фарбування AirTouch Познань' },
    haircuts: { title: 'Жіночі, чоловічі та дитячі стрижки — перукар у Познані | GLOW', meta: 'Перукар у Познані (Єжице): жіночі, чоловічі, дитячі стрижки, чубчик. Стрижка під форму обличчя і ваш ритм життя.', h1: 'Стрижки', lead: 'Стрижка під форму обличчя, структуру волосся і ваш ритм життя — легко укладати щодня.', points: ['Жіноча стрижка', 'Чоловіча стрижка', 'Дитяча стрижка', 'Чубчик, укладка'], dir: 'haircut', n: 15, alt: 'Жіноча стрижка Познань' },
    hairstyles: { title: 'Весільні та вечірні зачіски в Познані | GLOW Hair Atelier', meta: 'Зачіски й напівзачіски для весілля, вечора і фотосесії в Познані. Стійкі укладки на всю ніч. Пакет макіяж + зачіска.', h1: 'Зачіски та укладки', lead: 'Весілля, випускний, фотосесія — зачіски, що виглядають легко і тримаються до ранку.', points: ['Зачіски й напівзачіски', 'Весільні зачіски', 'Укладка', 'Пакет макіяж + зачіска'], dir: 'hairstyles', n: 22, alt: 'Вечірня зачіска Познань' },
    makeup: { title: 'Весільний і святковий макіяж у Познані | GLOW Hair Atelier', meta: 'Весільний, святковий, художній і пробний макіяж у Познані (Єжице). Стійкий і фотогенічний. Пакет макіяж + зачіска.', h1: 'Макіяж', lead: 'Стійкий, фотогенічний макіяж, що підкреслює вашу красу — на весілля, вечір, фотосесію чи важливу подію.', points: ['Святковий макіяж', 'Весільний і пробний макіяж', 'Художній макіяж', 'Пакет макіяж + зачіска'], dir: 'makeup', n: 8, alt: 'Святковий макіяж Познань' },
    brows: { title: 'Ламінування брів і нарощування вій 1:1 у Познані | GLOW', meta: 'Ламінування брів і вій, корекція з геометрією, нарощування вій 1:1 у Познані (Єжице). Природний стійкий результат.', h1: 'Брови й вії', lead: 'Ламінування, геометрія і нарощування вій 1:1. Природний результат, що підкреслює погляд і тримається тижнями.', points: ['Нарощування вій 1:1', 'Ламінування вій + фарбування', 'Ламінування брів + корекція', 'Корекція брів з геометрією'], dir: 'brows', n: 13, alt: 'Ламінування брів Познань' },
  },
  kursy: {
    title: 'Курси перукарів у Познані — стрижка боб | GLOW Academy', meta: 'Курси GLOW Academy у Познані. Перший курс: стрижка боб-каре. Незабаром: колористика і техніки фарбування. Запишіться в лист очікування.',
    eyebrow: 'GLOW Academy · Курс каре та боб-каре', hook: 'Стрижіть каре та боб-каре впевнено, точно і дорожче',
    forT: 'Для кого', forList: ['Перукарів, які хочуть підвищити майстерність', 'Початківців після перукарської школи', 'Майстрів, які хочуть досконало опанувати каре та боб-каре'],
    getT: 'Що ви отримаєте', getList: [['15+ років досвіду', 'Знання Олі, зібрані на практиці в салоні з рейтингом 5.0.'], ['Усі варіації каре та боб-каре', 'Від класики до сучасних форм — в одному курсі.'], ['Практика', 'Навчаєтесь на реальних прикладах, а не лише в теорії.'], ['Техніки одразу в роботу', 'Застосуєте їх у салоні вже наступного дня.'], ['Впевненість і вищі ціни', 'Кращий результат — це задоволені клієнтки й сміливість цінувати свою роботу.'], ['Індивідуальний підхід', 'Мала група або індивідуальні заняття — час на кожне питання.']],
    progT: 'Програма', soon: 'Незабаром', first: 'Перший курс', detailsSoon: 'Дата, тривалість і деталі — незабаром.',
    cta: 'Записатися в лист очікування', videoAlt: 'Найкращі роботи: каре, боб-каре та фарбування',
    h1: 'GLOW Academy — курси для перукарів', lead: 'Практичні курси від Олі — майстрині з понад 15-річним досвідом і салоном з рейтингом 5.0.',
    list: [{ t: 'Каре та боб-каре', s: 'Перший курс · незабаром', d: 'Усі варіації каре та боб-каре в одному курсі: підбір форми, геометрія стрижки, робота з різною структурою волосся та укладка.' }, { t: 'Колористика', s: 'Готуємо', d: 'Теорія кольору, підбір відтінку, робота з освітлювачем.' }, { t: 'Техніки фарбування', s: 'Готуємо', d: 'AirTouch, балаяж, Brazilian blonde на практиці.' }],
    bioT: 'Викладачка: Оля', bio: 'Оля працює в професії понад 15 років. За цей час вона стала майстром-універсалом — однаково впевнено працює і зі стрижками, і з фарбуванням. У першому курсі вона зібрала найкорисніші знання про всі варіації каре та боб-каре: від підбору форми під тип обличчя й геометрії стрижки до укладки. Про дати й деталі питайте нас будь-яким зручним способом зі сторінки.',
    waitT: 'Запишіться в лист очікування', wait: 'Напишіть нам в Instagram, зателефонуйте або надішліть e-mail — ми першими повідомимо дату і деталі курсу.',
  },
  praca: {
    title: 'Вакансія: майстер-колорист у Познані | GLOW Hair Atelier', meta: 'GLOW Hair Atelier у Познані (Єжице) шукає перукаря-колориста. Оплата — відсоток, узгоджуємо на співбесіді. Відгукнутися через Instagram, телефон або e-mail.',
    h1: 'Шукаємо майстра-колориста', lead: 'Приєднуйтесь до команди GLOW Hair Atelier — салону з рейтингом 5.0 і постійними клієнтками в районі Єжице.',
    offerT: 'Ми пропонуємо', offer: ['Оплата — відсоток, який узгоджуємо індивідуально на співбесіді', 'Постійний потік клієнток з Booksy', 'Сучасне естетичне робоче місце', 'Професійна косметика і дружня команда'],
    needT: 'Чекаємо на вас, якщо ви', need: ['маєте досвід у фарбуванні (блонд, AirTouch, балаяж)', 'дбаєте про якість і стан волосся клієнтки', 'любите працювати з людьми і розвиватися'],
    applyT: 'Як відгукнутися', apply: 'Надішліть портфоліо в Instagram, зателефонуйте або напишіть e-mail.',
  },
  contact: { title: 'Контакти — GLOW Hair Atelier, Romka Strzałkowskiego 11, Познань', meta: 'GLOW Hair Atelier: Romka Strzałkowskiego 11, 60-854 Познань (Єжице). Тел. +48 789 822 636. Пн–пт 10–19, сб 10–17. Запис через Booksy.', h1: 'Контакти', hoursT: 'Години роботи', hours: [['Понеділок – пʼятниця', '10:00 – 19:00'], ['Субота', '10:00 – 17:00'], ['Неділя', 'вихідний']], route: 'Прокласти маршрут' },
  footer: { rights: 'Усі права захищені.', design: 'Design: Roman Pavel' },
};
export const DICT: Record<Lang, D> = { pl, ua };

export function meta(lang: Lang, p: Page) {
  const t = DICT[lang];
  if (p === 'home') return { title: t.home.title, desc: t.home.meta };
  if (p === 'blog') return { title: BLOG[lang].title, desc: BLOG[lang].desc };
  if (p === 'kursy' || p === 'praca' || p === 'contact') return { title: t[p].title, desc: t[p].meta };
  return { title: t.svc[p].title, desc: t.svc[p].meta };
}

type Why = { whyT: string; why: string; whySteps: string[] };
export const WHY: Record<Lang, Record<string, Why>> = {
  pl: {
    home: { whyT: 'Dlaczego nie ma stałego cennika?', why: 'Każda klientka przychodzi z innymi włosami, oczekiwaniami i okazją. Dlatego zamiast cen „z sufitu” zaczynamy od rozmowy: mistrzyni oceni sytuację, zaproponuje najlepsze rozwiązanie i poda koszt, zanim zaczniemy.', whySteps: ['Bezpłatna konsultacja', 'Plan dopasowany do Ciebie', 'Cena znana przed rozpoczęciem'] },
    coloring: { whyT: 'Dlaczego koloryzacja zaczyna się od konsultacji?', why: 'Każde włosy mają swoją historię: długość, gęstość, wcześniejsze farbowania i rozjaśnienia. Przed AirTouch czy blondem oceniamy ich kondycję i robimy pasmo testowe — tak dobieramy technikę i odcień, a dokładny koszt znasz jeszcze przed zabiegiem.', whySteps: ['Bezpłatna konsultacja i ocena historii włosów', 'Pasmo testowe i plan koloryzacji', 'Dokładna wycena przed rozpoczęciem'] },
    haircuts: { whyT: 'Dlaczego cena strzyżenia zależy od Ciebie?', why: 'Dobre strzyżenie to forma dopasowana do kształtu twarzy, rodzaju włosów i Twojego stylu życia. Na początku wizyty rozmawiamy o tym, czego oczekujesz, a cena zależy przede wszystkim od długości włosów.', whySteps: ['Krótka konsultacja przed strzyżeniem', 'Forma dobrana do twarzy i typu włosów', 'Cena zależna od długości włosów'] },
    hairstyles: { whyT: 'Dlaczego każde upięcie wyceniamy indywidualnie?', why: 'Upięcie zależy od okazji, sukienki i długości włosów. Opowiedz nam o wydarzeniu i pokaż inspiracje — dobierzemy fryzurę, która wytrzyma do rana. Przed ważnym dniem możesz umówić się na próbę.', whySteps: ['Rozmowa o okazji, stylizacji i inspiracjach', 'Możliwość fryzury próbnej', 'Cena zależna od długości włosów i formy upięcia'] },
    makeup: { whyT: 'Dlaczego makijaż dobieramy indywidualnie?', why: 'Inny makijaż sprawdzi się na ślubie, inny na wieczornym wyjściu czy sesji. Bierzemy pod uwagę okazję, rodzaj skóry i Twoje preferencje, a przed ślubem polecamy makijaż próbny.', whySteps: ['Rozmowa o okazji i oczekiwaniach', 'Dobór looku do rodzaju skóry i urody', 'Możliwość makijażu próbnego'] },
    brows: { whyT: 'Dlaczego cena brwi i rzęs zależy od efektu?', why: 'Kształt brwi, efekt i objętość rzęs dobieramy do rysów twarzy i Twoich oczekiwań. Od wybranej techniki — laminacji, regulacji czy przedłużania 1:1 — zależy też cena.', whySteps: ['Dobór kształtu i efektu', 'Wybór techniki i objętości', 'Cena zależna od techniki'] },
  },
  ua: {
    home: { whyT: 'Чому немає фіксованого прайсу?', why: 'Кожна клієнтка приходить зі своїм волоссям, очікуваннями та подією. Тому замість «середніх цін» ми починаємо з розмови: майстриня оцінить ситуацію, запропонує найкраще рішення і назве вартість до початку роботи.', whySteps: ['Безкоштовна консультація', 'План саме для вас', 'Вартість відома до початку'] },
    coloring: { whyT: 'Чому фарбування починається з консультації?', why: 'Кожне волосся має свою історію: довжина, густота, попередні фарбування й освітлення. Перед AirTouch чи блондом ми оцінюємо його стан і робимо тестове пасмо — так підбираємо техніку й відтінок, а точну вартість ви знаєте ще до процедури.', whySteps: ['Безкоштовна консультація та оцінка історії волосся', 'Тестове пасмо і план фарбування', 'Точна вартість до початку роботи'] },
    haircuts: { whyT: 'Чому ціна стрижки залежить від вас?', why: 'Хороша стрижка — це форма під тип обличчя, структуру волосся і ваш ритм життя. На початку візиту ми обговорюємо ваші очікування, а ціна залежить передусім від довжини волосся.', whySteps: ['Коротка консультація перед стрижкою', 'Форма під обличчя і тип волосся', 'Ціна залежить від довжини волосся'] },
    hairstyles: { whyT: 'Чому кожну зачіску оцінюємо індивідуально?', why: 'Зачіска залежить від події, сукні та довжини волосся. Розкажіть про подію і покажіть референси — ми підберемо зачіску, що протримається до ранку. Перед важливим днем можна записатися на пробну зачіску.', whySteps: ['Розмова про подію, образ і референси', 'Можливість пробної зачіски', 'Ціна залежить від довжини волосся і форми зачіски'] },
    makeup: { whyT: 'Чому макіяж підбираємо індивідуально?', why: 'Для весілля, вечора чи фотосесії потрібен різний макіяж. Ми враховуємо подію, тип шкіри та ваші побажання, а перед весіллям радимо пробний макіяж.', whySteps: ['Розмова про подію та очікування', 'Підбір образу під тип шкіри', 'Можливість пробного макіяжу'] },
    brows: { whyT: 'Чому ціна брів і вій залежить від ефекту?', why: 'Форму брів, ефект і обʼєм вій ми підбираємо під риси обличчя та ваші побажання. Від обраної техніки — ламінування, корекції чи нарощування 1:1 — залежить і ціна.', whySteps: ['Підбір форми та ефекту', 'Вибір техніки та обʼєму', 'Ціна залежить від техніки'] },
  },
};
