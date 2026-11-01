import type { Lang } from '../i18n';

export type AuthorId = 'ola' | 'wiktoria';
export type PostLang = { title: string; desc: string; lead: string; body: string };
export type Post = { slug: string; date: string; author: AuthorId; cover: string; coverAlt: Record<Lang, string>; related?: string[] } & Record<Lang, PostLang>;

const STAFF = 'https://booksy.com/pl-pl/190507_glow-hair-atelier_fryzjer_15608_poznan/staffer/';
export const AUTHORS: Record<AuthorId, { name: Record<Lang, string>; role: Record<Lang, string>; booksy: string; cta: Record<Lang, string> }> = {
  ola: { name: { pl: 'Ola', ua: 'Оля' }, role: { pl: 'Fryzjerka · strzyżenie i koloryzacja', ua: 'Перукар · стрижки та фарбування' }, booksy: STAFF + '397957#ba_s=dl_1', cta: { pl: 'Umów się do Oli', ua: 'Записатися до Олі' } },
  wiktoria: { name: { pl: 'Wiktoria', ua: 'Вікторія' }, role: { pl: 'Brwi, rzęsy, upięcia i makijaż', ua: 'Брови, вії, зачіски та макіяж' }, booksy: STAFF + '396048#ba_s=dl_1', cta: { pl: 'Umów się do Wiktorii', ua: 'Записатися до Вікторії' } },
};

const mods = import.meta.glob<{ default: Post }>('./posts/*.ts', { eager: true });
export const POSTS: Post[] = Object.values(mods).map((m) => m.default).sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
export const postPath = (lang: Lang, slug: string) => `${lang === 'ua' ? '/ua' : ''}/blog/${slug}`;
export const readMin = (p: PostLang) => Math.max(2, Math.round((p.lead + ' ' + p.body).split(/\s+/).length / 200));
export const fmtDate = (d: string, lang: Lang) => new Intl.DateTimeFormat(lang === 'ua' ? 'uk-UA' : 'pl-PL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Warsaw' }).format(new Date(d + 'T12:00:00Z'));
export const related = (p: Post) => [...(p.related ?? []).map(getPost).filter(Boolean) as Post[], ...POSTS.filter((x) => x.slug !== p.slug && !(p.related ?? []).includes(x.slug))].slice(0, 2);

export const BLOG = {
  pl: { title: 'Blog — porady fryzjerki i stylistki z Poznania | GLOW Hair Atelier', desc: 'Porady mistrzyń GLOW Hair Atelier z Poznania (Jeżyce): koloryzacja AirTouch, strzyżenie karé i bob, brwi, rzęsy i makijaż. Nowy artykuł co tydzień.', h1: 'Blog GLOW', lead: 'Co tydzień nowy artykuł od Oli i Wiktorii — praktyczna wiedza z fotela w salonie na Jeżycach.', eyebrow: 'Porady mistrzyń', read: 'min czytania', by: 'Autorka', more: 'Czytaj', relatedT: 'Przeczytaj też', share: 'Udostępnij', copy: 'Kopiuj link', copied: 'Skopiowano', rateT: 'Czy ten artykuł był pomocny?', rateThanks: 'Dziękujemy za ocenę!', rateErr: 'Nie udało się zapisać oceny. Spróbuj później.', ctaT: 'Masz pytanie o swoje włosy lub brwi?', ctaD: 'Umów bezpłatną konsultację — mistrzyni oceni sytuację i zaproponuje rozwiązanie dopasowane do Ciebie.', back: 'Wszystkie artykuły' },
  ua: { title: 'Блог — поради перукаря і стиліста з Познані | GLOW Hair Atelier', desc: 'Поради майстринь GLOW Hair Atelier у Познані (Єжиці): фарбування AirTouch, стрижки каре і боб, брови, вії та макіяж. Нова стаття щотижня.', h1: 'Блог GLOW', lead: 'Щотижня нова стаття від Олі та Вікторії — практичні знання з крісла в салоні на Єжицях.', eyebrow: 'Поради майстринь', read: 'хв читання', by: 'Авторка', more: 'Читати', relatedT: 'Читайте також', share: 'Поділитися', copy: 'Копіювати посилання', copied: 'Скопійовано', rateT: 'Чи була ця стаття корисною?', rateThanks: 'Дякуємо за оцінку!', rateErr: 'Не вдалося зберегти оцінку. Спробуйте пізніше.', ctaT: 'Маєте питання щодо волосся чи брів?', ctaD: 'Запишіться на безкоштовну консультацію — майстриня оцінить ситуацію і запропонує рішення саме для вас.', back: 'Усі статті' },
};
