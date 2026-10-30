import { useState, type ReactNode } from 'react';
import { BOOKSY, BOOKSY_PROFILE, C, DICT, PAGES, REVIEWS, path, type Lang, type Page } from './i18n';
import { GAL } from './gallery';

const NAV: Page[] = ['coloring', 'haircuts', 'hairstyles', 'keratinbotox', 'makeup', 'brows', 'kursy', 'praca', 'contact'];
const SVC = ['coloring', 'haircuts', 'hairstyles', 'keratinbotox', 'makeup', 'brows'] as const;

const Btn = ({ href, children, light }: { href: string; children: ReactNode; light?: boolean }) => (
  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener"
    className={`inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm uppercase tracking-[0.15em] transition ${light ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'}`}>
    {children} <span aria-hidden>→</span>
  </a>
);
const H2 = ({ children, light }: { children: ReactNode; light?: boolean }) => (
  <h2 className={`font-serif text-4xl md:text-6xl leading-[1.05] mb-10 ${light ? 'text-white' : ''}`}>{children}</h2>
);
const Sec = ({ children, dark, id }: { children: ReactNode; dark?: boolean; id?: string }) => (
  <section id={id} className={`${dark ? 'bg-black text-white' : ''} px-5 md:px-12 py-20 md:py-28`}><div className="mx-auto max-w-6xl">{children}</div></section>
);
const Stars = () => <span className="tracking-[0.2em]">★★★★★</span>;

function Header({ lang, page }: { lang: Lang; page: Page }) {
  const t = DICT[lang];
  const [open, setOpen] = useState(false);
  const other: Lang = lang === 'pl' ? 'ua' : 'pl';
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-black/10">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 md:px-12 h-16">
        <a href={path(lang, 'home')} aria-label={C.name}><img src="/img/logo.svg" alt={C.name} className="h-8 w-auto" /></a>
        <nav className="hidden xl:flex gap-5 whitespace-nowrap text-[12px] uppercase tracking-[0.12em]">
          {NAV.map((p) => <a key={p} href={path(lang, p)} className={`hover:opacity-60 ${p === page ? 'underline underline-offset-8' : ''}`}>{t.nav[p as keyof typeof t.nav]}</a>)}
        </nav>
        <div className="flex items-center gap-4">
          <a href={path(other, page)} hrefLang={other === 'ua' ? 'uk' : 'pl'} className="text-xs uppercase tracking-widest border border-black/30 rounded-full px-3 py-1">{other === 'ua' ? 'UA' : 'PL'}</a>
          <a href={BOOKSY} target="_blank" rel="noopener" className="hidden sm:inline-flex rounded-full bg-black text-white text-xs uppercase tracking-widest px-4 py-2">{t.bookShort}</a>
          <button className="xl:hidden text-xs uppercase tracking-widest" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? t.close : t.menu}</button>
        </div>
      </div>
      {open && <nav className="xl:hidden border-t border-black/10 px-5 py-4 flex flex-col gap-3 text-lg font-serif">
        {NAV.map((p) => <a key={p} href={path(lang, p)}>{t.nav[p as keyof typeof t.nav]}</a>)}
        <a href={BOOKSY} className="mt-2 font-sans text-sm uppercase tracking-widest">{t.bookShort} →</a>
      </nav>}
    </header>
  );
}

function Rating({ lang, light }: { lang: Lang; light?: boolean }) {
  return <a href={BOOKSY_PROFILE} target="_blank" rel="noopener" className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.15em] ${light ? 'border-white/40' : 'border-black/30'}`}><Stars /> {DICT[lang].rating}</a>;
}

function Gallery({ imgs, alt }: { imgs: string[]; alt: string }) {
  return <div className="columns-2 md:columns-3 gap-3 [&>img]:mb-3">
    {imgs.map((s, i) => <img key={s} src={s} alt={`${alt} — ${i + 1}`} loading="lazy" className="w-full break-inside-avoid grayscale-[15%] hover:grayscale-0 transition" />)}
  </div>;
}

function Reviews({ lang }: { lang: Lang }) {
  const t = DICT[lang].home;
  return <Sec dark>
    <div className="flex flex-wrap items-end justify-between gap-6 mb-10"><H2 light>{t.revT}</H2><Rating lang={lang} light /></div>
    <div className="grid md:grid-cols-3 gap-6">
      {REVIEWS.map((r) => <figure key={r.a + r.s} className="border border-white/20 p-6 flex flex-col justify-between">
        <blockquote className="font-serif italic text-xl leading-snug">„{r.t}”</blockquote>
        <figcaption className="mt-6 text-xs uppercase tracking-[0.15em] text-white/60"><Stars /><br />{r.a} · {r.s}{r.w && ` · ${r.w}`}</figcaption>
      </figure>)}
    </div>
    <div className="mt-10 flex flex-wrap gap-6 text-sm uppercase tracking-[0.15em]">
      <a href={BOOKSY_PROFILE} target="_blank" rel="noopener" className="underline underline-offset-8">{t.revAll} →</a>
      {/* TODO: Google Business Profile — wstawić link i opinie Google, gdy profil powstanie (C.gbp) */}
      {C.gbp ? <a href={C.gbp} className="underline underline-offset-8">Google →</a> : <span className="text-white/40">{t.revG}</span>}
    </div>
  </Sec>;
}

function Contacts({ lang, h1 }: { lang: Lang; h1?: boolean }) {
  const t = DICT[lang].contact;
  const H = h1 ? 'h1' : 'h2';
  return <Sec id="kontakt">
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <H className="font-serif text-4xl md:text-6xl mb-8">{t.h1}</H>
        <address className="not-italic text-lg leading-relaxed">{C.name}<br />{C.street}, {C.zip} {C.city}, {C.district}</address>
        <p className="mt-4 text-lg"><a href={`tel:${C.phone.replace(/\s/g, '')}`}>{C.phone}</a><br /><a href={`mailto:${C.email}`}>{C.email}</a><br /><a href={C.instagram} target="_blank" rel="noopener">Instagram @glow.poznan</a></p>
        <div className="mt-8 flex flex-wrap gap-4"><Btn href={BOOKSY}>{DICT[lang].bookShort}</Btn><a href={C.maps} target="_blank" rel="noopener" className="self-center underline underline-offset-8 text-sm uppercase tracking-[0.15em]">{t.route}</a></div>
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] mb-4">{t.hoursT}</h3>
        <dl className="divide-y divide-black/10 border-y border-black/10">{t.hours.map(([d, h]) => <div key={d} className="flex justify-between py-3"><dt>{d}</dt><dd>{h}</dd></div>)}</dl>
        <iframe title="Mapa" loading="lazy" className="mt-8 w-full h-64 grayscale border-0" src={`https://maps.google.com/maps?q=${encodeURIComponent(`${C.street}, ${C.zip} ${C.city}`)}&z=16&output=embed`} />
      </div>
    </div>
  </Sec>;
}

function CTA({ lang }: { lang: Lang }) {
  const t = DICT[lang].home;
  return <Sec dark>
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div><H2 light>{t.whyT}</H2><p className="text-lg text-white/80 leading-relaxed">{t.why}</p></div>
      <div>
        <ol className="space-y-4 mb-10">{t.whySteps.map((s, i) => <li key={s} className="flex gap-5 items-baseline border-b border-white/20 pb-4"><span className="font-serif italic text-3xl">0{i + 1}</span><span className="text-lg">{s}</span></li>)}</ol>
        <Btn href={BOOKSY} light>{DICT[lang].book}</Btn>
      </div>
    </div>
  </Sec>;
}

function Home({ lang }: { lang: Lang }) {
  const t = DICT[lang]; const h = t.home;
  return <>
    <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-black text-white">
      <img src="/img/coloring/airtouch.webp" alt={t.svc.coloring.alt} className="absolute inset-0 h-full w-full object-cover opacity-60" fetchPriority="high" />
      <div className="relative mx-auto max-w-6xl w-full px-5 md:px-12 pb-16 pt-32">
        <p className="font-serif italic text-2xl md:text-3xl mb-3">{h.eyebrow}</p>
        <h1 className="font-serif text-5xl md:text-8xl leading-[0.95]"><em>{h.h1a}</em> {h.h1b}<br />{h.h1c}</h1>
        <p className="mt-6 max-w-xl text-lg text-white/85">{h.lead}</p>
        <div className="mt-8 flex flex-wrap items-center gap-5"><Btn href={BOOKSY} light>{t.book}</Btn><Rating lang={lang} light /></div>
      </div>
    </section>
    <Sec>
      <H2><em>{h.topT}</em></H2>
      <div className="grid md:grid-cols-3 gap-8">
        {h.top.map((s) => <a key={s.p} href={path(lang, s.p as Page)} className="group">
          <div className="overflow-hidden aspect-[4/5]"><img src={s.img} alt={s.t} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
          <h3 className="font-serif text-3xl mt-5">{s.t}</h3><p className="mt-3 text-neutral-600">{s.d}</p>
          <span className="mt-4 inline-block text-xs uppercase tracking-[0.2em] underline underline-offset-8">{t.more} →</span>
        </a>)}
      </div>
    </Sec>
    <CTA lang={lang} />
    <Sec>
      <H2>{h.teamT}</H2>
      <div className="grid md:grid-cols-2 gap-10">
        {h.team.map((m) => <div key={m.n} className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] gap-6 items-center">
          {/* TODO Roman: podmienić placeholder na zdjęcie mistrzyni (public/img/team/) */}
          <div className="aspect-[3/4] bg-neutral-100 border border-black/10 flex items-center justify-center text-center p-3"><span className="font-script text-5xl">{m.n[0]}</span></div>
          <div><h3 className="font-serif text-4xl">{m.n}</h3><p className="mt-2 text-xs uppercase tracking-[0.15em] text-neutral-500">{m.r}</p><p className="mt-4 text-neutral-700">{m.d}</p></div>
        </div>)}
      </div>
    </Sec>
    <Reviews lang={lang} />
    <Sec>
      <H2>{h.galT}</H2>
      <Gallery imgs={[GAL.coloring[1], GAL.makeup[0], GAL.brows[1], GAL.hairstyles[2], GAL.coloring[5], GAL.haircut[2], GAL.makeup[3], GAL.coloring[9], GAL.hairstyles[6]]} alt="GLOW Hair Atelier Poznań" />
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm uppercase tracking-[0.15em]">{SVC.map((p) => <a key={p} href={path(lang, p)} className="underline underline-offset-8">{t.nav[p]}</a>)}</div>
    </Sec>
    <Sec dark>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="font-serif italic text-2xl mb-2">{h.kursSoon}</p><H2 light>{h.kursT}</H2>
          <ul className="space-y-3">{t.kursy.list.map((k) => <li key={k.t} className="flex justify-between border-b border-white/20 pb-3"><span className="font-serif text-2xl">{k.t}</span><span className="text-xs uppercase tracking-widest text-white/60 self-center">{k.s}</span></li>)}</ul>
          <div className="mt-8"><Btn href={path(lang, 'kursy')} light>{t.more}</Btn></div>
        </div>
        <div className="border border-white/30 p-8 self-start">
          <H2 light>{h.vacT}</H2><p className="text-white/80 text-lg">{h.vacD}</p>
          <div className="mt-8"><Btn href={path(lang, 'praca')} light>{h.vacCta}</Btn></div>
        </div>
      </div>
    </Sec>
  </>;
}

function Service({ lang, p }: { lang: Lang; p: (typeof SVC)[number] }) {
  const s = DICT[lang].svc[p];
  return <>
    <Sec>
      <div className="grid md:grid-cols-2 gap-10 items-end">
        <div><Rating lang={lang} /><h1 className="font-serif text-5xl md:text-7xl mt-6 leading-[1]">{s.h1}</h1></div>
        <div><p className="text-lg text-neutral-700">{s.lead}</p>
          <ul className="mt-6 space-y-2">{s.points.map((x) => <li key={x} className="border-b border-black/10 pb-2">— {x}</li>)}</ul>
          <div className="mt-8"><Btn href={BOOKSY}>{DICT[lang].book}</Btn></div></div>
      </div>
    </Sec>
    <section className="px-5 md:px-12 pb-20"><div className="mx-auto max-w-6xl"><Gallery imgs={GAL[s.dir]} alt={s.alt} /></div></section>
    <CTA lang={lang} />
  </>;
}

function Kursy({ lang }: { lang: Lang }) {
  const k = DICT[lang].kursy;
  return <Sec>
    <p className="font-script text-4xl">GLOW Academy</p>
    <h1 className="font-serif text-5xl md:text-7xl mt-2 leading-[1]">{k.h1}</h1>
    <p className="mt-6 max-w-2xl text-lg text-neutral-700">{k.lead}</p>
    <div className="mt-14 grid md:grid-cols-3 gap-6">{k.list.map((c, i) => <div key={c.t} className={`p-8 border ${i === 0 ? 'bg-black text-white border-black' : 'border-black/15'}`}>
      <p className="text-xs uppercase tracking-[0.2em] opacity-70">{c.s}</p><h2 className="font-serif text-3xl mt-3">{c.t}</h2><p className="mt-4 opacity-80">{c.d}</p></div>)}</div>
    <div className="mt-16 grid md:grid-cols-[200px_1fr] gap-8 items-center">
      {/* TODO Roman: zdjęcie Oli */}
      <div className="aspect-[3/4] bg-neutral-100 border border-black/10 flex items-center justify-center"><span className="font-script text-6xl">O</span></div>
      <div><h2 className="font-serif text-4xl">{k.bioT}</h2><p className="mt-4 text-neutral-600">{k.bio}</p></div>
    </div>
    <div className="mt-16 border-t border-black/10 pt-12"><h2 className="font-serif text-4xl">{k.waitT}</h2><p className="mt-4 max-w-2xl text-neutral-700">{k.wait}</p><Apply /></div>
  </Sec>;
}

const Apply = () => <div className="mt-8 flex flex-wrap gap-4">
  <Btn href={C.instagram}>Instagram</Btn>
  <a href={`tel:${C.phone.replace(/\s/g, '')}`} className="rounded-full border border-black px-7 py-4 text-sm uppercase tracking-[0.15em]">{C.phone}</a>
  <a href={`mailto:${C.email}`} className="rounded-full border border-black px-7 py-4 text-sm tracking-[0.05em]">{C.email}</a>
</div>;

function Praca({ lang }: { lang: Lang }) {
  const v = DICT[lang].praca;
  return <Sec>
    <Rating lang={lang} />
    <h1 className="font-serif text-5xl md:text-7xl mt-6 leading-[1]">{v.h1}</h1>
    <p className="mt-6 max-w-2xl text-lg text-neutral-700">{v.lead}</p>
    <div className="mt-14 grid md:grid-cols-2 gap-10">
      {[[v.offerT, v.offer], [v.needT, v.need]].map(([h, l]) => <div key={h as string}><h2 className="font-serif text-3xl mb-4">{h as string}</h2><ul className="space-y-2">{(l as string[]).map((x) => <li key={x} className="border-b border-black/10 pb-2">— {x}</li>)}</ul></div>)}
    </div>
    <div className="mt-14"><h2 className="font-serif text-3xl">{v.applyT}</h2><p className="mt-3 text-neutral-700">{v.apply}</p><Apply /></div>
  </Sec>;
}

function Footer({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  return <footer className="bg-black text-white/70 px-5 md:px-12 py-12 text-sm">
    <div className="mx-auto max-w-6xl flex flex-wrap justify-between gap-6">
      <div><p className="font-serif text-2xl text-white">{C.name}</p><p className="mt-2">{C.street}, {C.zip} {C.city} · {C.phone}</p></div>
      <nav className="flex flex-wrap gap-x-5 gap-y-2">{NAV.map((p) => <a key={p} href={path(lang, p)} className="hover:text-white">{t.nav[p as keyof typeof t.nav]}</a>)}</nav>
    </div>
    <div className="mx-auto max-w-6xl mt-10 flex flex-wrap justify-between gap-4 text-xs">
      <span>© {new Date().getFullYear()} {C.name}. {t.footer.rights}</span>
      <a href="https://pavelroman.com" target="_blank" rel="noopener" className="hover:text-white">{t.footer.design}</a>
    </div>
  </footer>;
}

export default function App({ lang, page }: { lang: Lang; page: Page }) {
  const body = page === 'home' ? <Home lang={lang} /> : page === 'kursy' ? <Kursy lang={lang} /> : page === 'praca' ? <Praca lang={lang} />
    : page === 'contact' ? null : <Service lang={lang} p={page} />;
  return <>
    <Header lang={lang} page={page} />
    <main>{body}{page !== 'contact' && page !== 'home' ? null : null}<Contacts lang={lang} h1={page === 'contact'} /></main>
    <Footer lang={lang} />
  </>;
}
export { PAGES };
