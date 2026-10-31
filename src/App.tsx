import { useEffect, useState, type ReactNode } from 'react';
import { BOOKSY, BOOKSY_PROFILE, C, DICT, PAGES, REVIEWS, path, type Lang, type Page } from './i18n';
import { GAL } from './gallery';

const MENU: Page[] = ['coloring', 'haircuts', 'hairstyles', 'makeup', 'brows', 'keratinbotox', 'kursy', 'praca'];
const SVC = ['coloring', 'haircuts', 'hairstyles', 'keratinbotox', 'makeup', 'brows'] as const;
const tel = C.phone.replace(/\s/g, '');
const Arrow = () => <span aria-hidden className="ml-3 inline-block transition-transform group-hover:translate-x-1">→</span>;

const Pill = ({ href, children, light }: { href: string; children: ReactNode; light?: boolean }) => (
  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener" data-magnet
    className={`group inline-flex items-center rounded-full px-6 py-3.5 text-[13px] tracking-wide transition-colors ${light ? 'bg-white text-black hover:bg-[#e9e9e9]' : 'bg-black text-white hover:bg-[#222]'}`}>{children}<Arrow /></a>
);
const Stack = ({ a, b }: { a: string; b: string }) => <span className="inline-flex flex-col text-[11px] leading-[1.05] tracking-[0.12em] font-semibold"><span>{a}</span><span>{b}</span></span>;
const Logo = ({ inv }: { inv?: boolean }) => <img src="/img/logo.svg" alt={C.name} width={48} height={53} className={`h-11 w-auto ${inv ? 'invert' : ''}`} />;

function Header({ lang, page }: { lang: Lang; page: Page }) {
  const t = DICT[lang];
  const [open, setOpen] = useState(false);
  const other: Lang = lang === 'pl' ? 'ua' : 'pl';
  const close = () => setOpen(false);
  useEffect(() => { document.documentElement.style.overflow = open ? 'hidden' : ''; const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, [open]);
  return (<>
    <header className="fixed inset-x-0 top-0 z-50 bg-[#F7F7F7]/85 backdrop-blur-md" style={{ viewTransitionName: 'hdr' }}>
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
        <a href={path(lang, 'home')} aria-label={C.name}><Logo /></a>
        <nav className="hidden xl:flex gap-7 text-[13px]">
          {MENU.map((p) => <a key={p} href={path(lang, p)} className={`navl ${p === page ? 'is-on' : ''}`}>{t.nav[p as keyof typeof t.nav]}</a>)}
        </nav>
        <div className="flex items-center gap-5 text-[13px]">
          <a href={path(other, page)} hrefLang={other === 'ua' ? 'uk' : 'pl'} className="text-[11px] tracking-[0.15em] text-[#8D8787] hover:text-black">{other === 'ua' ? 'UA' : 'PL'}</a>
          <a href={path(lang, 'contact')} className="hidden xl:inline navl">◦ {t.nav.contact}</a>
          <button className="xl:hidden" onClick={() => setOpen(true)} aria-label={t.menu}><Stack a="ME" b="NU" /></button>
        </div>
      </div>
    </header>
    <div className={`mshade xl:hidden ${open ? 'is-open' : ''}`} onClick={close} aria-hidden />
    <aside className={`mpanel xl:hidden ${open ? 'is-open' : ''}`} aria-hidden={!open} aria-label={t.menu}>
      <div className="flex h-[72px] items-center justify-between px-6 border-b border-black/10"><Logo /><button onClick={close} aria-label={t.close}><Stack a="BA" b="CK" /></button></div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8 font-serif text-[28px] leading-tight">
        <a href={path(lang, 'home')} onClick={close} className={page === 'home' ? 'italic' : ''}>Home</a>
        {[...MENU, 'contact' as Page].map((p, i) => <a key={p} href={path(lang, p)} onClick={close} className={`py-1 ${p === page ? 'italic' : ''}`} style={{ transitionDelay: `${60 + i * 35}ms` }}>{t.nav[p as keyof typeof t.nav]}</a>)}
      </nav>
      <div className="border-t border-black/10 px-6 py-6 text-sm">
        <a href={BOOKSY} target="_blank" rel="noopener" className="mb-4 flex justify-center rounded-full bg-black px-6 py-3.5 text-white">{t.bookShort} →</a>
        <div className="flex justify-between text-[#8D8787]"><a href={`tel:${tel}`}>{C.phone}</a><a href={path(other, page)} onClick={close}>{other.toUpperCase()}</a></div>
      </div>
    </aside>
  </>);
}

/* scattered grid slots (x%, y%, size vw) — sparse asymmetric, around the centre feature */
const SLOTS = [[3, 14, 5.2], [14, 30, 4.2], [6, 46, 4.6], [22, 10, 4.4], [27, 38, 5.6], [17, 56, 3.8], [66, 12, 4.6], [76, 32, 5.4], [88, 14, 4.2], [70, 50, 3.8], [91, 44, 5], [82, 58, 4]];

function Hero({ lang, imgs, h1, lead, scatter }: { lang: Lang; imgs: string[]; h1: ReactNode; lead: string; scatter?: boolean }) {
  const t = DICT[lang];
  const pics = imgs.slice(0, 12);
  return (
    <section className="hero relative overflow-hidden" data-hero>
      <div aria-hidden className="giant pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 select-none font-serif leading-none text-[#ececec]" data-parallax="0.25">GLOW</div>
      {/* scattered grid (desktop) */}
      {scatter && <div className="absolute inset-0 hidden md:block" data-magnet-area>
        {pics.map((s, i) => { const [x, y, w] = SLOTS[i % SLOTS.length]; return (
          <button key={s} className="thumb fly absolute" data-swap={s} data-cursor={lang === 'pl' ? 'Zobacz' : 'Дивитись'} data-depth={(0.4 + (i % 4) * 0.25).toFixed(2)}
            style={{ left: `${x}%`, top: `calc(72px + ${y * 0.62}%)`, width: `${w}vw`, ['--d' as string]: `${120 + i * 55}ms` }}>
            <img src={s} alt="" loading={i < 6 ? 'eager' : 'lazy'} className="aspect-square w-full object-cover" />
          </button>); })}
      </div>}
      {/* carousel row (service pages, and mobile on home) */}
      <div className={`${scatter ? 'md:hidden' : ''} absolute inset-x-0 top-[84px] z-10`}>
        <div className="drag flex gap-3 overflow-x-auto px-5 md:px-10 no-sb" data-drag data-cursor={lang === 'pl' ? 'Przeciągnij' : 'Тягніть'}>
          {imgs.map((s, i) => <button key={s} className="thumb fly shrink-0" data-swap={s} style={{ ['--d' as string]: `${100 + Math.min(i, 10) * 50}ms` }}>
            <img src={s} alt="" draggable={false} loading={i < 8 ? 'eager' : 'lazy'} className="h-16 w-16 md:h-20 md:w-20 object-cover" /></button>)}
        </div>
      </div>
      {/* feature photo bridging the split */}
      <div className="feature fly absolute left-1/2 z-20 -translate-x-1/2" style={{ ['--d' as string]: '80ms' }} data-cursor={lang === 'pl' ? 'Zobacz' : 'Дивитись'}>
        <div className="relative h-full w-full overflow-hidden">
          <img data-feature src={imgs[0]} alt={typeof h1 === 'string' ? h1 : C.name} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
      {/* bottom band, inverted */}
      <div className="absolute inset-x-0 bottom-0 z-30 text-white">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-5 pb-8 md:grid-cols-[1.2fr_1fr_auto] md:items-end md:px-10 md:pb-12">
          <h1 className={`fly font-serif leading-[1.02] ${scatter ? "text-[40px] md:text-[64px] xl:text-[76px]" : "text-[34px] md:text-[44px] xl:text-[54px] md:max-w-[36vw]"}`} style={{ ['--d' as string]: '260ms' }}>{h1}</h1>
          <p className="fly max-w-sm text-sm text-white/70 md:mb-3" style={{ ['--d' as string]: '360ms' }}>{lead}</p>
          <div className="fly flex flex-wrap items-center gap-5 md:mb-2 md:flex-col md:items-end" style={{ ['--d' as string]: '440ms' }}>
            <Pill href={BOOKSY} light>{t.bookShort}</Pill>
            <a href={`tel:${tel}`} className="text-sm text-white/80 hover:text-white">{C.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const Eyebrow = ({ children }: { children: ReactNode }) => <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#8D8787]">{children}</p>;
const Sec = ({ children, dark, id, cls = '' }: { children: ReactNode; dark?: boolean; id?: string; cls?: string }) => (
  <section id={id} className={`${dark ? 'bg-black text-white' : 'bg-[#F7F7F7]'} px-5 py-24 md:px-10 md:py-32 ${cls}`}><div className="mx-auto max-w-[1280px]">{children}</div></section>
);
const H2 = ({ children }: { children: ReactNode }) => <h2 className="rv font-serif text-[40px] leading-[1.05] md:text-[64px] mb-12">{children}</h2>;
const Badge = ({ lang, light }: { lang: Lang; light?: boolean }) => (
  <a href={BOOKSY_PROFILE} target="_blank" rel="noopener" className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.18em] ${light ? 'border-white/30' : 'border-black/20'}`}><span className="tracking-[0.15em]">★★★★★</span>{DICT[lang].rating}</a>
);

function Reviews({ lang }: { lang: Lang }) {
  const t = DICT[lang].home;
  const row = [...REVIEWS, ...REVIEWS];
  return <section className="overflow-hidden bg-black py-24 text-white md:py-32">
    <div className="mx-auto mb-12 flex max-w-[1280px] flex-wrap items-end justify-between gap-6 px-5 md:px-10">
      <h2 className="rv font-serif text-[40px] leading-none md:text-[64px]">{t.revT}</h2>
      <div className="rv flex flex-col items-start gap-3 md:items-end"><span className="font-serif text-6xl">5.0<span className="ml-2 text-2xl align-top">★</span></span><Badge lang={lang} light /></div>
    </div>
    <div className="marquee" data-cursor={lang === 'pl' ? 'Opinie' : 'Відгуки'}>
      <div className="marquee-track">
        {row.map((r, i) => <figure key={i} aria-hidden={i >= REVIEWS.length} className="w-[320px] shrink-0 border border-white/15 p-7 md:w-[400px]">
          <p className="mb-5 text-xs tracking-[0.2em]">★★★★★</p>
          <blockquote className="font-serif text-xl italic leading-snug">„{r.t}”</blockquote>
          <figcaption className="mt-6 text-[11px] uppercase tracking-[0.18em] text-white/50">{r.a} · {r.s}{r.w && ` · ${r.w}`}</figcaption>
        </figure>)}
      </div>
    </div>
    <div className="mx-auto mt-10 flex max-w-[1280px] flex-wrap gap-6 px-5 text-[13px] md:px-10">
      <a href={BOOKSY_PROFILE} target="_blank" rel="noopener" className="navl">{t.revAll} →</a>
      {/* TODO: Google Business Profile — link i opinie Google, gdy profil powstanie (C.gbp) */}
      {C.gbp ? <a href={C.gbp} className="navl">Google →</a> : <span className="text-white/40">{t.revG}</span>}
    </div>
  </section>;
}

const Social = () => <div className="flex gap-3">
  <a href={C.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="ico"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg></a>
  <a href={BOOKSY_PROFILE} target="_blank" rel="noopener" aria-label="Booksy" className="ico text-[11px] font-bold">B</a>
  <a href={`tel:${tel}`} aria-label="Telefon" className="ico"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" /></svg></a>
</div>;

function Contacts({ lang, h1 }: { lang: Lang; h1?: boolean }) {
  const t = DICT[lang].contact;
  const H = h1 ? 'h1' : 'h2';
  const intro = lang === 'pl' ? 'Cenisz profesjonalizm i najwyższą jakość? W Glow zadbasz o siebie i znajdziesz chwilę relaksu w codziennym biegu.' : 'Цінуєте професіоналізм і найвищу якість? У Glow ви подбаєте про себе і знайдете хвилину відпочинку серед щоденного поспіху.';
  return <section id="kontakt" className={`bg-white px-5 md:px-10 ${h1 ? 'pt-28 pb-20' : 'py-24 md:py-32'}`}>
    <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-2 md:gap-16">
      <div className="rv order-2 md:order-1 flex flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1a1b1f] md:aspect-auto md:flex-1 md:min-h-[440px]">
          <iframe title="Mapa" loading="lazy" className="absolute inset-0 h-full w-full border-0 map-dark" src={`https://maps.google.com/maps?q=${encodeURIComponent(`${C.street}, ${C.zip} ${C.city}`)}&z=16&output=embed`} />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <address className="not-italic text-sm">{C.street}, {C.zip} {C.city}, {C.district}</address>
          <Pill href={C.maps}>{t.route}</Pill>
        </div>
      </div>
      <div className="order-1 md:order-2">
        <H className="rv font-serif text-[44px] leading-none md:text-[64px]">{C.name}</H>
        <p className="rv mt-5 max-w-md text-sm text-[#8D8787]">{intro}</p>
        <p className="rv mt-8 font-serif text-3xl"><a href={`tel:${tel}`}>{C.phone}</a></p>
        <p className="rv mt-1 text-sm"><a href={`mailto:${C.email}`} className="navl">{C.email}</a></p>
        <dl className="rv mt-8 border-t border-black/10 text-sm">{t.hours.map(([d, h]) => <div key={d} className="flex justify-between border-b border-black/10 py-3"><dt className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-black" />{d}</dt><dd className="text-[#8D8787]">{h}</dd></div>)}</dl>
        <div className="rv mt-8 flex items-center justify-between gap-4"><Social /><Pill href={BOOKSY}>{DICT[lang].bookShort}</Pill></div>
      </div>
    </div>
  </section>;
}

function Consult({ lang }: { lang: Lang }) {
  const t = DICT[lang].home;
  return <Sec dark>
    <div className="grid gap-12 md:grid-cols-2 md:items-center">
      <div><Eyebrow>{lang === 'pl' ? 'Konsultacja' : 'Консультація'}</Eyebrow><H2>{t.whyT}</H2><p className="rv text-lg leading-relaxed text-white/70">{t.why}</p></div>
      <div>
        <ol className="mb-10">{t.whySteps.map((s, i) => <li key={s} className="rv flex items-baseline gap-6 border-b border-white/15 py-5"><span className="font-serif text-4xl italic text-white/40">0{i + 1}</span><span className="text-lg">{s}</span></li>)}</ol>
        <div className="rv"><Pill href={BOOKSY} light>{DICT[lang].book}</Pill></div>
      </div>
    </div>
  </Sec>;
}

function Gallery({ imgs, alt, lang }: { imgs: string[]; alt: string; lang: Lang }) {
  return <div className="columns-2 gap-3 md:columns-4 [&>figure]:mb-3">
    {imgs.map((s, i) => <figure key={s} className="rv reveal-img overflow-hidden break-inside-avoid" data-cursor={lang === 'pl' ? 'Zobacz' : 'Дивитись'}>
      <img src={s} alt={`${alt} — ${i + 1}`} loading="lazy" className="w-full transition duration-700 hover:scale-[1.04]" /></figure>)}
  </div>;
}

const Placeholder = ({ ch }: { ch: string }) => (
  /* TODO Roman: podmienić na zdjęcie (public/img/team/) */
  <div className="flex aspect-[3/4] items-center justify-center bg-[#ececec]"><span className="font-serif text-7xl italic text-[#8D8787]">{ch}</span></div>
);

function Home({ lang }: { lang: Lang }) {
  const t = DICT[lang]; const h = t.home;
  const heroImgs = [GAL.coloring[0], GAL.coloring[3], GAL.makeup[1], GAL.brows[2], GAL.hairstyles[1], GAL.haircut[3], GAL.coloring[6], GAL.makeup[4], GAL.coloring[9], GAL.hairstyles[5], GAL.haircut[7], GAL.brows[5], GAL.coloring[11]];
  return <>
    <Hero lang={lang} scatter imgs={heroImgs} lead={h.lead}
      h1={<><em className="italic">{h.h1a.split(' ')[0]}</em> {h.h1a.split(' ').slice(1).join(' ')}<br />{h.h1b} <em className="text-[0.55em] italic">{lang === 'pl' ? 'w' : 'у'}</em> {h.h1c}</>} />
    <Sec>
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6"><div><Eyebrow>{h.eyebrow}</Eyebrow><H2><em>{h.topT}</em></H2></div><div className="rv"><Badge lang={lang} /></div></div>
      <div className="grid gap-10 md:grid-cols-3">
        {h.top.map((s, i) => <a key={s.p} href={path(lang, s.p as Page)} className="rv group" style={{ ['--d' as string]: `${i * 120}ms` }} data-cursor={t.more}>
          <div className="reveal-img aspect-[4/5] overflow-hidden"><img src={s.img} alt={s.t} loading="lazy" className="h-full w-full object-cover transition duration-[1.2s] ease-out group-hover:scale-105" /></div>
          <div className="mt-6 flex items-baseline justify-between"><h3 className="font-serif text-3xl">{s.t}</h3><span className="font-serif italic text-[#8D8787]">0{i + 1}</span></div>
          <p className="mt-3 text-sm leading-relaxed text-[#8D8787]">{s.d}</p>
          <span className="navl mt-5 inline-block text-[13px]">{t.more} →</span>
        </a>)}
      </div>
    </Sec>
    <Consult lang={lang} />
    <Sec>
      <Eyebrow>GLOW Hair Atelier</Eyebrow><H2>{h.teamT}</H2>
      <div className="grid gap-12 md:grid-cols-2">
        {h.team.map((m, i) => <div key={m.n} className="rv grid grid-cols-[130px_1fr] items-end gap-6 md:grid-cols-[220px_1fr]" style={{ ['--d' as string]: `${i * 140}ms` }}>
          <Placeholder ch={m.n[0]} />
          <div><h3 className="font-serif text-5xl">{m.n}</h3><p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#8D8787]">{m.r}</p><p className="mt-4 text-sm leading-relaxed">{m.d}</p></div>
        </div>)}
      </div>
    </Sec>
    <Reviews lang={lang} />
    <Sec>
      <div className="flex flex-wrap items-end justify-between gap-6"><H2>{h.galT}</H2>
        <div className="rv mb-12 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">{SVC.map((p) => <a key={p} href={path(lang, p)} className="navl">{t.nav[p]}</a>)}</div></div>
      <Gallery lang={lang} alt="GLOW Hair Atelier Poznań" imgs={[GAL.coloring[1], GAL.makeup[0], GAL.brows[1], GAL.hairstyles[2], GAL.coloring[5], GAL.haircut[2], GAL.makeup[3], GAL.coloring[8]]} />
    </Sec>
    <Courses lang={lang} />
  </>;
}

function CourseVideo({ lang }: { lang: Lang }) {
  return <div className="rv relative aspect-[4/5] w-full overflow-hidden bg-[#111]" data-cursor={lang === 'pl' ? 'Prace' : 'Роботи'}>
    <video className="lazy-video absolute inset-0 h-full w-full object-cover" muted loop playsInline autoPlay preload="none" poster="/video/kurs-poster.jpg" aria-label={DICT[lang].kursy.videoAlt}>
      <source data-src="/video/kurs.webm" type="video/webm" /><source data-src="/video/kurs.mp4" type="video/mp4" />
    </video>
    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-black">GLOW Academy</span>
  </div>;
}

const Waitlist = ({ lang }: { lang: Lang }) => <div className="flex flex-wrap items-center gap-3">
  <Pill href={C.instagram} light>{DICT[lang].kursy.cta}</Pill>
  <a href={`tel:${tel}`} className="rounded-full border border-white/40 px-5 py-3.5 text-[13px] hover:bg-white hover:text-black transition-colors">{C.phone}</a>
  <a href={`mailto:${C.email}`} className="rounded-full border border-white/40 px-5 py-3.5 text-[13px] hover:bg-white hover:text-black transition-colors">E-mail</a>
</div>;

function Courses({ lang, full }: { lang: Lang; full?: boolean }) {
  const k = DICT[lang].kursy;
  return <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32" id="kursy">
    <div className="mx-auto max-w-[1280px]">
      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-20">
        <div>
          <Eyebrow>{k.eyebrow}</Eyebrow>
          {full ? <h1 className="fly font-serif text-[40px] leading-[1.04] md:text-[68px]">{k.hook}</h1> : <h2 className="rv font-serif text-[40px] leading-[1.04] md:text-[64px]">{k.hook}</h2>}
          <p className="rv mt-6 max-w-xl text-lg text-white/70">{k.lead}</p>
          <div className="rv mt-10"><p className="mb-4 text-[11px] uppercase tracking-[0.25em] text-white/50">{k.forT}</p>
            <ul>{k.forList.map((x, i) => <li key={x} className="flex gap-5 border-b border-white/15 py-3.5"><span className="font-serif italic text-white/40">0{i + 1}</span>{x}</li>)}</ul></div>
          <div className="rv mt-10"><Waitlist lang={lang} /></div>
        </div>
        <CourseVideo lang={lang} />
      </div>
      <div className="mt-24"><p className="rv mb-8 text-[11px] uppercase tracking-[0.25em] text-white/50">{k.getT}</p>
        <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">{k.getList.map(([t, d], i) => <div key={t} className="rv bg-black p-8" style={{ ['--d' as string]: `${(i % 3) * 100}ms` }}>
          <span className="font-serif text-4xl italic text-white/30">0{i + 1}</span><h3 className="mt-5 font-serif text-2xl">{t}</h3><p className="mt-3 text-sm leading-relaxed text-white/60">{d}</p></div>)}</div></div>
      <div className="mt-24 grid gap-10 md:grid-cols-[1fr_2fr]">
        <p className="rv text-[11px] uppercase tracking-[0.25em] text-white/50">{k.progT}</p>
        <ul>{k.list.map((c, i) => <li key={c.t} className="rv flex flex-wrap items-baseline justify-between gap-3 border-b border-white/15 py-5">
          <span className="font-serif text-3xl md:text-4xl">{c.t}</span>
          <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${i === 0 ? 'bg-white text-black' : 'border border-white/30 text-white/60'}`}>{i === 0 ? k.first : k.soon}</span>
          <span className="w-full text-sm text-white/55">{c.d}</span></li>)}
          <li className="rv pt-5 text-sm text-white/45">{k.detailsSoon}</li></ul>
      </div>
      {!full && <div className="rv mt-14"><a href={path(lang, 'kursy')} className="navl text-[13px]">GLOW Academy →</a></div>}
    </div>
  </section>;
}

function Vacancy({ lang }: { lang: Lang }) {
  const h = DICT[lang].home, v = DICT[lang].praca;
  return <section className="bg-[#F7F7F7] px-5 py-20 md:px-10 md:py-24">
    <div className="rv mx-auto grid max-w-[1280px] gap-10 border border-black/15 bg-white p-8 md:grid-cols-[1.4fr_1fr] md:items-end md:p-14">
      <div><Eyebrow>{DICT[lang].nav.praca}</Eyebrow><h2 className="font-serif text-[36px] leading-[1.05] md:text-[56px]">{h.vacT}</h2><p className="mt-5 max-w-xl text-[#8D8787]">{h.vacD}</p></div>
      <div className="flex flex-col items-start gap-4 md:items-end"><Pill href={path(lang, 'praca')}>{h.vacCta}</Pill><span className="text-sm text-[#8D8787]">{v.apply}</span></div>
    </div>
  </section>;
}

function Service({ lang, p }: { lang: Lang; p: (typeof SVC)[number] }) {
  const s = DICT[lang].svc[p];
  const imgs = GAL[s.dir];
  return <>
    <Hero lang={lang} imgs={imgs} h1={s.h1} lead={s.lead} />
    <Sec>
      <div className="grid gap-12 md:grid-cols-2">
        <div><Eyebrow>GLOW Hair Atelier · Poznań</Eyebrow><p className="rv font-serif text-3xl leading-snug md:text-4xl">{s.lead}</p><div className="rv mt-8"><Badge lang={lang} /></div></div>
        <ul>{s.points.map((x, i) => <li key={x} className="rv flex items-baseline gap-6 border-b border-black/10 py-5" style={{ ['--d' as string]: `${i * 80}ms` }}><span className="font-serif italic text-[#8D8787]">0{i + 1}</span><span className="text-lg">{x}</span></li>)}
          <li className="rv pt-8"><Pill href={BOOKSY}>{DICT[lang].book}</Pill></li></ul>
      </div>
    </Sec>
    <Sec cls="!pt-0"><Gallery lang={lang} imgs={imgs} alt={s.alt} /></Sec>
    <Consult lang={lang} />
  </>;
}

const Apply = ({ light }: { light?: boolean }) => <div className="mt-8 flex flex-wrap items-center gap-4">
  <Pill href={C.instagram} light={light}>Instagram</Pill>
  <a href={`tel:${tel}`} className="rounded-full border border-current px-6 py-3.5 text-[13px]">{C.phone}</a>
  <a href={`mailto:${C.email}`} className="rounded-full border border-current px-6 py-3.5 text-[13px]">{C.email}</a>
</div>;

function PageHead({ eyebrow, h1, lead }: { eyebrow: string; h1: string; lead: string }) {
  return <section className="relative overflow-hidden bg-[#F7F7F7] px-5 pt-40 pb-20 md:px-10">
    <div aria-hidden className="giant pointer-events-none absolute -right-[5vw] top-16 select-none font-serif leading-none text-[#ececec]" data-parallax="0.2">GLOW</div>
    <div className="relative mx-auto max-w-[1280px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="fly max-w-4xl font-serif text-[44px] leading-[1.02] md:text-[80px]" style={{ ['--d' as string]: '120ms' }}>{h1}</h1>
      <p className="fly mt-8 max-w-2xl text-lg text-[#8D8787]" style={{ ['--d' as string]: '240ms' }}>{lead}</p>
    </div>
  </section>;
}

function Kursy({ lang }: { lang: Lang }) {
  const k = DICT[lang].kursy;
  return <>
    <div className="h-[72px] bg-black" />
    <Courses lang={lang} full />
    <Sec>
      <div className="grid items-end gap-10 md:grid-cols-[260px_1fr]">
        <div className="rv"><Placeholder ch="O" /></div>
        <div><Eyebrow>15+ {lang === 'pl' ? 'lat doświadczenia' : 'років досвіду'}</Eyebrow><h2 className="rv font-serif text-5xl">{k.bioT}</h2><p className="rv mt-6 max-w-2xl text-lg leading-relaxed">{k.bio}</p></div>
      </div>
    </Sec>
    <Sec dark><H2>{k.waitT}</H2><p className="rv max-w-2xl text-white/70">{k.wait}</p><div className="rv mt-8"><Waitlist lang={lang} /></div></Sec>
  </>;
}

function Praca({ lang }: { lang: Lang }) {
  const v = DICT[lang].praca;
  return <>
    <PageHead eyebrow={DICT[lang].nav.praca} h1={v.h1} lead={v.lead} />
    <Sec>
      <div className="grid gap-16 md:grid-cols-2">
        {([[v.offerT, v.offer], [v.needT, v.need]] as [string, string[]][]).map(([h, l]) => <div key={h}><h2 className="rv mb-6 font-serif text-4xl">{h}</h2>
          <ul>{l.map((x, i) => <li key={x} className="rv flex gap-5 border-b border-black/10 py-4"><span className="font-serif italic text-[#8D8787]">0{i + 1}</span>{x}</li>)}</ul></div>)}
      </div>
    </Sec>
    <Sec dark><H2>{v.applyT}</H2><p className="rv text-white/70">{v.apply}</p><div className="rv"><Apply light /></div></Sec>
  </>;
}

function Footer({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  return <footer className="bg-black px-5 pt-20 pb-8 text-white/60 md:px-10">
    <div className="mx-auto max-w-[1280px]">
      <div aria-hidden className="mb-14 select-none font-serif text-[22vw] leading-[0.8] text-white/[0.06] md:text-[16vw]" data-parallax="-0.08">GLOW</div>
      <div className="flex flex-wrap justify-between gap-10 text-sm">
        <div><Logo inv /><p className="mt-4">{C.street}, {C.zip} {C.city}</p><p><a href={`tel:${tel}`} className="hover:text-white">{C.phone}</a></p></div>
        <nav className="grid grid-cols-2 gap-x-10 gap-y-2">{[...MENU, 'contact' as Page].map((p) => <a key={p} href={path(lang, p)} className="hover:text-white">{t.nav[p as keyof typeof t.nav]}</a>)}</nav>
      </div>
      <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-xs">
        <span>© 2026 {C.name}. {t.footer.rights}</span>
        <a href="https://pavelroman.com" target="_blank" rel="noopener" className="hover:text-white">{t.footer.design}</a>
      </div>
    </div>
  </footer>;
}

export default function App({ lang, page }: { lang: Lang; page: Page }) {
  const body = page === 'home' ? <Home lang={lang} /> : page === 'kursy' ? <Kursy lang={lang} /> : page === 'praca' ? <Praca lang={lang} /> : page === 'contact' ? null : <Service lang={lang} p={page} />;
  return <>
    <Header lang={lang} page={page} />
    <main style={{ viewTransitionName: 'main' }}>{body}<Contacts lang={lang} h1={page === 'contact'} />{page !== 'praca' && <Vacancy lang={lang} />}</main>
    <Footer lang={lang} />
    <div className="cursor" aria-hidden><span /></div>
  </>;
}
export { PAGES };
