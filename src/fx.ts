const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const root = document.documentElement;

function lightbox() {
  let box: HTMLDivElement | null = null, list: HTMLImageElement[] = [], idx = 0, img: HTMLImageElement, count: HTMLElement;
  const fit = (el: HTMLImageElement) => { const nw = el.naturalWidth || 4, nh = el.naturalHeight || 5; const W = innerWidth * 0.9, H = innerHeight * 0.86; const k = Math.min(W / nw, H / nh); const w = nw * k, h = nh * k; return { left: (innerWidth - w) / 2, top: (innerHeight - h) / 2, width: w, height: h }; };
  const set = (r: { left: number; top: number; width: number; height: number }) => Object.assign(img.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
  const rect = (el: Element) => { const r = el.getBoundingClientRect(); return { left: r.left, top: r.top, width: r.width, height: r.height }; };
  const show = (i: number) => { idx = (i + list.length) % list.length; const src = list[idx]; img.style.opacity = '0'; setTimeout(() => { img.src = src.currentSrc || src.src; img.alt = src.alt; const go = () => { set(fit(src)); img.style.opacity = '1'; }; img.decode ? img.decode().then(go, go) : go(); }, 180); count.textContent = `${idx + 1} / ${list.length}`; };
  const close = () => { if (!box) return; const b = box; const t = list[idx]; const r = t.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight && !reduce) set(rect(t)); else img.style.opacity = '0'; b.classList.remove('open'); root.style.overflow = ''; removeEventListener('keydown', key); setTimeout(() => b.remove(), 500); box = null; };
  const key = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') show(idx + 1); if (e.key === 'ArrowLeft') show(idx - 1); };
  document.addEventListener('click', (e) => {
    const t = (e.target as Element).closest?.('img[data-lb]') as HTMLImageElement | null; if (!t) return;
    const scope = t.closest('.gal-swap, .columns-2') ?? document;
    list = [...scope.querySelectorAll<HTMLImageElement>('img[data-lb]')]; idx = list.indexOf(t);
    box = document.createElement('div'); box.className = 'lb'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<img class="lb-img" alt=""><button class="lb-x" style="top:10px;right:14px" aria-label="Close">✕</button><button class="lb-p" style="left:10px;top:50%;font-size:28px" aria-label="Prev">←</button><button class="lb-n" style="right:10px;top:50%;font-size:28px" aria-label="Next">→</button><span class="lb-count"></span>';
    document.body.appendChild(box); img = box.querySelector('.lb-img')!; count = box.querySelector('.lb-count')!;
    img.src = t.currentSrc || t.src; img.alt = t.alt; set(rect(t)); count.textContent = `${idx + 1} / ${list.length}`;
    root.style.overflow = 'hidden'; addEventListener('keydown', key);
    requestAnimationFrame(() => requestAnimationFrame(() => { box!.classList.add('open'); set(fit(t)); }));
    box.addEventListener('click', (ev) => { const el = ev.target as Element; if (el.closest('.lb-p')) show(idx - 1); else if (el.closest('.lb-n')) show(idx + 1); else if (el === box || el.closest('.lb-x')) close(); });
    let x0 = 0; box.addEventListener('touchstart', (ev) => { x0 = ev.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', (ev) => { const dx = ev.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); }, { passive: true });
  });
  addEventListener('resize', () => { if (box && img) set(fit(list[idx])); });
}

export function startFx() {
  lightbox();
  // load fly-in
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('in')));
  setTimeout(() => root.classList.add('settled'), 1600);

  // lazy video: load sources when near viewport
  const vio = new IntersectionObserver((es) => es.forEach((e) => { const v = e.target as HTMLVideoElement;
    if (e.isIntersecting) { if (!v.dataset.loaded) { v.querySelectorAll<HTMLSourceElement>('source[data-src]').forEach((s) => (s.src = s.dataset.src!)); v.load(); v.dataset.loaded = '1'; } if (!reduce) v.play().catch(() => {}); } else v.pause(); }), { rootMargin: '200px' });
  document.querySelectorAll('video.lazy-video').forEach((v) => vio.observe(v));

  // scroll reveal
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  document.querySelectorAll('.rv, .reveal-img').forEach((el) => io.observe(el));

  // photo swap with clip-path reveal
  const feat = document.querySelector<HTMLImageElement>('[data-feature]');
  let current = feat?.getAttribute('src') ?? '';
  let busy = false;
  const swap = (src: string, btn: Element, soft = false) => {
    if (!feat || src === current || busy) return;
    document.querySelectorAll('.thumb.is-active').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    current = src;
    const box = feat.parentElement!;
    const img = new Image();
    img.src = src; img.alt = feat.alt; img.className = 'absolute inset-0 h-full w-full object-cover ' + (soft ? 'xfade' : 'incoming');
    if (reduce) { feat.src = src; return; }
    busy = true;
    const go = () => { box.appendChild(img); requestAnimationFrame(() => requestAnimationFrame(() => img.classList.add('go'))); setTimeout(() => { feat.src = src; img.remove(); busy = false; }, 950); };
    img.decode ? img.decode().then(go, go) : go();
  };
  let hoverT = 0;
  document.querySelectorAll<HTMLElement>('[data-swap]').forEach((b) => {
    b.addEventListener('click', () => swap(b.dataset.swap!, b));
    if (fine) b.addEventListener('mouseenter', () => { clearTimeout(hoverT); hoverT = window.setTimeout(() => swap(b.dataset.swap!, b), 140); });
  });

  // hero autoplay (home only)
  const hero = document.querySelector<HTMLElement>('.hh');
  if (hero && feat && !reduce) {
    const vis = () => [...hero.querySelectorAll<HTMLElement>('[data-swap]')].filter((b) => b.offsetParent);
    const srcs = () => { const seen: string[] = []; vis().forEach((b) => { if (!seen.includes(b.dataset.swap!)) seen.push(b.dataset.swap!); }); return seen; };
    let pauseUntil = 0, onScreen = true, timer = 0;
    const preload = (src?: string) => { if (src) { const i = new Image(); i.src = src; } };
    const nextSrc = () => { const l = srcs(); const i = l.indexOf(current); return l[(i + 1) % l.length]; };
    const tick = () => {
      if (document.hidden || !onScreen || Date.now() < pauseUntil || busy) return;
      const src = nextSrc(); if (!src) return;
      const btn = vis().find((b) => b.dataset.swap === src)!;
      swap(src, btn, true);
      const strip = btn.closest('.hh-strip') as HTMLElement | null;
      if (strip) strip.scrollTo({ left: btn.offsetLeft - strip.clientWidth / 2 + btn.clientWidth / 2, behavior: 'smooth' });
      setTimeout(() => preload(nextSrc()), 1200);
    };
    const start = () => { clearInterval(timer); timer = window.setInterval(tick, 4000); };
    preload(nextSrc()); start();
    const pause = (ms: number) => { pauseUntil = Date.now() + ms; };
    const grid = hero.querySelector('[data-magnet-area]');
    if (fine && grid) {
      grid.querySelectorAll('[data-swap]').forEach((b) => b.addEventListener('mouseenter', () => pause(1e9)));
      grid.addEventListener('mouseleave', () => { pause(2000); start(); });
    }
    hero.querySelectorAll('[data-swap]').forEach((b) => b.addEventListener('click', () => { pause(6000); start(); }));
    hero.querySelector('.hh-strip')?.addEventListener('touchstart', () => pause(6000), { passive: true });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
    new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }, { threshold: 0.2 }).observe(hero);
  }

  if (reduce) return;

  // magnetic / parallax grid on desktop
  const area = document.querySelector<HTMLElement>('[data-magnet-area]');
  if (area && fine) {
    const thumbs = [...area.querySelectorAll<HTMLElement>('.thumb')];
    let raf = 0;
    area.parentElement!.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = area.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        thumbs.forEach((t) => { const d = Number(t.dataset.depth || 0.5); t.style.setProperty('--mx', `${(-nx * 28 * d).toFixed(1)}px`); t.style.setProperty('--my', `${(-ny * 22 * d).toFixed(1)}px`); });
      });
    });
  }

  // scroll parallax for giant words
  const par = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
  if (par.length) {
    let ticking = false;
    const upd = () => { const y = scrollY; par.forEach((el) => { const f = Number(el.dataset.parallax); const base = el.classList.contains('-translate-x-1/2') ? 'translateX(-50%) ' : ''; el.style.transform = `${base}translate3d(0, ${(y * f).toFixed(1)}px, 0)`; }); ticking = false; };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  // draggable carousels with inertia (mouse; touch uses native scrolling)
  document.querySelectorAll<HTMLElement>('[data-drag]').forEach((el) => {
    let down = false, x0 = 0, s0 = 0, lastX = 0, lastT = 0, v = 0, moved = 0, raf = 0;
    el.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = 0; x0 = lastX = e.clientX; s0 = el.scrollLeft; lastT = performance.now(); v = 0; cancelAnimationFrame(raf); el.classList.add('grabbing'); });
    addEventListener('pointermove', (e) => { if (!down) return; const now = performance.now(); v = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now; moved += Math.abs(e.movementX); el.scrollLeft = s0 - (e.clientX - x0); });
    addEventListener('pointerup', () => { if (!down) return; down = false; el.classList.remove('grabbing'); let vel = v * 16; const step = () => { el.scrollLeft -= vel; vel *= 0.94; if (Math.abs(vel) > 0.4) raf = requestAnimationFrame(step); }; step(); });
    el.addEventListener('click', (e) => { if (moved > 6) { e.stopPropagation(); e.preventDefault(); } }, true);
  });

  // custom cursor
  const cur = document.querySelector<HTMLElement>('.cursor');
  if (cur && fine) {
    const dot = cur.firstElementChild as HTMLElement;
    let tx = -100, ty = -100, cx = -100, cy = -100;
    addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      const t = (e.target as Element).closest?.('[data-cursor]') as HTMLElement | null;
      cur.classList.toggle('lbl', !!t); cur.classList.toggle('link', !t && !!(e.target as Element).closest?.('a,button')); if (t) dot.textContent = t.dataset.cursor || '';
      cur.classList.toggle('dark', !!(e.target as Element).closest?.('.bg-black'));
    });
    const loop = () => { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; cur.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; requestAnimationFrame(loop); };
    loop();
  }
}
