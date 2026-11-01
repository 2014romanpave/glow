// Selected works from GLOW Hair Atelier Booksy portfolio (base paths; -600/-1200 .webp/.avif)
const L = (c: string, n: number) => Array.from({ length: n }, (_, i) => `/img/works/${c}/${c}-${String(i + 1).padStart(2, '0')}`);
const LT = '/img/works/latest/';
export const WORKS: Record<string, string[]> = {
  coloring: [LT + 'balayage', LT + 'caramel', LT + 'platinum', ...L('coloring', 12)], haircut: [11, 1, 2, 12, 3, 4, 5, 6, 13, 9, 10].map((n) => `/img/works/haircut/haircut-${String(n).padStart(2, '0')}`), hairstyles: [LT + 'waves', LT + 'caramel', LT + 'medusa', ...L('hairstyles', 12)], makeup: [LT + 'catrina', LT + 'medusa', LT + 'pampas', LT + 'leopard', '/img/works/makeup/makeup-red', LT + 'waves', ...L('makeup', 12)],
  brows: [...L('brows', 10).slice(0, 6), ...L('lashes', 8).slice(0, 4), ...L('brows', 10).slice(6), ...L('lashes', 8).slice(4)],
};
export const WALT: Record<string, Record<string, string>> = {
  coloring: { pl: 'Koloryzacja AirTouch i blond', ua: 'Фарбування AirTouch та блонд' },
  haircut: { pl: 'Strzyżenie damskie i karé', ua: 'Жіноча стрижка та каре' },
  hairstyles: { pl: 'Upięcie i stylizacja fryzury', ua: 'Зачіска та укладка' },
  makeup: { pl: 'Makijaż okolicznościowy', ua: 'Святковий макіяж' },
  lashes: { pl: 'Laminacja i stylizacja rzęs', ua: 'Ламінування та стилізація вій' },
  brows: { pl: 'Stylizacja i laminacja brwi', ua: 'Стилізація та ламінування брів' },
};
export const isWork = (s: string) => s.startsWith('/img/works/');
const RED: Record<string, string> = { pl: 'Czerwony makijaż wieczorowy — czerwone usta i oko', ua: 'Червоний вечірній макіяж — червоні губи та очі' };
const LATEST: Record<string, [string, string]> = {
  catrina: ['Makijaż kreatywny / charakteryzacja z czerwonymi różami', 'Креативний макіяж / грим із червоними трояндами'],
  medusa: ['Makijaż kreatywny / charakteryzacja w zieleni i złocie z warkoczami', 'Креативний макіяж / грим у зелено-золотих тонах із косами'],
  pampas: ['Makijaż wieczorowy glam', 'Вечірній glam-макіяж'],
  leopard: ['Makijaż kreatywny / charakteryzacja z motywem panterki', 'Креативний макіяж / грим із леопардовим мотивом'],
  platinum: ['Platynowy blond — koloryzacja', 'Платиновий блонд — фарбування'],
  balayage: ['Beżowy blond AirTouch na długich włosach', 'Бежевий блонд AirTouch на довгому волоссі'],
  caramel: ['Brąz z karmelowymi pasmami przy twarzy i fale', 'Брюнет із карамельними пасмами біля обличчя та локони'],
  waves: ['Blond fale i makijaż z kreską', 'Блонд-локони та макіяж зі стрілками'],
};
export const wAlt = (s: string, lang: string) => s.includes('/latest/') ? LATEST[s.split('/').pop()!][lang === 'pl' ? 0 : 1] : s.endsWith('makeup-red') ? RED[lang] : WALT[s.split('/')[3]]?.[lang] ?? '';
