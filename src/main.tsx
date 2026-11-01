import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { PAGES, type Lang, type Page } from './i18n';
import './index.css';
const seg = location.pathname.split('/').filter(Boolean);
const lang: Lang = seg[0] === 'ua' ? 'ua' : 'pl';
const p = (lang === 'ua' ? seg[1] : seg[0]) ?? 'home';
const page: Page = (PAGES as readonly string[]).includes(p) ? (p as Page) : 'home';
const post = page === 'blog' ? (lang === 'ua' ? seg[2] : seg[1]) : undefined;
const el = document.getElementById('root')!;
const nf = el.dataset.nf === '1';
if (nf && lang === 'ua') { document.documentElement.lang = 'uk'; document.title = 'Сторінку не знайдено — GLOW Hair Atelier'; }
const app = <StrictMode><App lang={lang} page={page} nf={nf} post={post} /></StrictMode>;
if (el.dataset.ssr === '1' && !(nf && lang === 'ua')) hydrateRoot(el, app); else createRoot(el).render(app);
import('./fx').then((m) => m.startFx());
