// Selected works from GLOW Hair Atelier Booksy portfolio (base paths; -600/-1200 .webp/.avif)
const L = (c: string, n: number) => Array.from({ length: n }, (_, i) => `/img/works/${c}/${c}-${String(i + 1).padStart(2, '0')}`);
export const WORKS: Record<string, string[]> = {
  coloring: L('coloring', 12), haircut: L('haircut', 10), hairstyles: L('hairstyles', 12), makeup: ['/img/works/makeup/makeup-red', ...L('makeup', 12)],
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
export const wAlt = (s: string, lang: string) => s.endsWith('makeup-red') ? RED[lang] : WALT[s.split('/')[3]]?.[lang] ?? '';
