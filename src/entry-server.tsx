import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import type { Lang, Page } from './i18n';
export { DICT, LANGS, HTML_LANG, SITE_URL, PAGES, C, RATING, BOOKSY, meta, path } from './i18n';
export const render = (lang: Lang, page: Page, post?: string) => renderToString(<StrictMode><App lang={lang} page={page} post={post} /></StrictMode>);
export { POSTS, AUTHORS, postPath, BLOG } from './blog';
export const render404 = (lang: Lang) => renderToString(<StrictMode><App lang={lang} page="home" nf /></StrictMode>);
