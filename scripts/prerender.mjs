import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const dist = path.resolve('dist');
const { render, render404, POSTS, AUTHORS, postPath, DICT, LANGS, HTML_LANG, SITE_URL, PAGES, C, RATING, BOOKSY, meta, path: p } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const tpl = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const url = (l, pg) => SITE_URL + (p(l, pg) === '/' ? '/' : p(l, pg));
const OG = { pl: 'pl_PL', ua: 'uk_UA' };

const salon = {
  '@context': 'https://schema.org', '@type': 'HairSalon', '@id': `${SITE_URL}/#salon`, name: C.name, url: SITE_URL + '/',
  image: `${SITE_URL}/og-image.jpg`, logo: `${SITE_URL}/img/logo.webp`, telephone: C.phone.replace(/\s/g, ''), email: C.email,
  address: { '@type': 'PostalAddress', streetAddress: C.street, postalCode: C.zip, addressLocality: C.city, addressRegion: 'wielkopolskie', addressCountry: 'PL' },
  geo: { '@type': 'GeoCoordinates', latitude: C.geo.lat, longitude: C.geo.lng },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '17:00' }],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: RATING.value, bestRating: '5', reviewCount: RATING.count },
  sameAs: [C.instagram, C.facebook, C.youtube, C.tiktok, 'https://booksy.com/pl-pl/190507_glow-hair-atelier_fryzjer_15608_poznan'],
  hasMap: C.hasMap, potentialAction: { '@type': 'ReserveAction', target: BOOKSY },
};
function ld(lang, pg) {
  const t = DICT[lang];
  const out = [salon];
  if (pg === 'kursy') out.push(...t.kursy.list.map((c) => ({ '@context': 'https://schema.org', '@type': 'Course', name: c.t, description: c.d, inLanguage: HTML_LANG[lang], provider: { '@type': 'Organization', name: C.name, sameAs: SITE_URL } })));
  if (pg === 'praca') out.push({ '@context': 'https://schema.org', '@type': 'JobPosting', title: t.praca.h1, description: `<p>${t.praca.lead}</p><ul>${[...t.praca.offer, ...t.praca.need].map((x) => `<li>${x}</li>`).join('')}</ul>`,
    datePosted: '2026-10-30', employmentType: ['FULL_TIME', 'PART_TIME', 'CONTRACTOR'], hiringOrganization: { '@type': 'Organization', name: C.name, sameAs: SITE_URL, logo: `${SITE_URL}/img/logo.webp` },
    jobLocation: { '@type': 'Place', address: salon.address }, directApply: false });
  return out.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n    ');
}
function head(lang, pg) {
  const m = meta(lang, pg), u = url(lang, pg);
  return `<title>${esc(m.title)}</title>
    <meta name="description" content="${esc(m.desc)}" />
    <link rel="canonical" href="${u}" />
    ${LANGS.map((l) => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${url(l, pg)}" />`).join('\n    ')}
    <link rel="alternate" hreflang="x-default" href="${url('pl', pg)}" />
    <meta property="og:type" content="website" /><meta property="og:site_name" content="${C.name}" />
    <meta property="og:url" content="${u}" /><meta property="og:title" content="${esc(m.title)}" />
    <meta property="og:description" content="${esc(m.desc)}" /><meta property="og:image" content="${SITE_URL}/og-image.jpg" />
    <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
    <meta property="og:locale" content="${OG[lang]}" /><meta name="twitter:card" content="summary_large_image" />
    ${ld(lang, pg)}`;
}
for (const l of LANGS) for (const pg of PAGES) {
  const html = tpl.replace(/<html lang="[^"]*">/, `<html lang="${HTML_LANG[l]}">`).replace(/<title>.*?<\/title>/, '').replace('<!--head-->', head(l, pg))
    .replace('<div id="root"><!--app--></div>', `<div id="root" data-ssr="1">${render(l, pg)}</div>`);
  const dir = path.join(dist, p(l, pg));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}
{ const h = tpl.replace(/<title>.*?<\/title>/, '').replace('<!--head-->', `<title>Nie znaleziono strony — ${C.name}</title>\n    <meta name="robots" content="noindex, follow" />`)
    .replace('<div id="root"><!--app--></div>', `<div id="root" data-ssr="1" data-nf="1">${render404('pl')}</div>`);
  fs.writeFileSync(path.join(dist, '404.html'), h); }
// blog posts
const postUrl = (l, slug) => SITE_URL + postPath(l, slug);
for (const post of POSTS) for (const l of LANGS) {
  const t = post[l], a = AUTHORS[post.author], u = postUrl(l, post.slug), img = SITE_URL + (post.ogImage || post.cover);
  const ldj = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: t.title.split(' | ')[0], description: t.desc, image: img, datePublished: post.date, dateModified: post.date, inLanguage: HTML_LANG[l],
    mainEntityOfPage: u, url: u, author: { '@type': 'Person', name: a.name[l] + ' — ' + C.name, jobTitle: a.role[l], worksFor: { '@id': `${SITE_URL}/#salon` }, url: a.booksy, ...(a.img ? { image: SITE_URL + a.img + '.jpg' } : {}) },
    publisher: { '@type': 'Organization', name: C.name, logo: { '@type': 'ImageObject', url: `${SITE_URL}/img/logo.webp` } } };
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: C.name, item: url(l, 'home') }, { '@type': 'ListItem', position: 2, name: 'Blog', item: url(l, 'blog') }, { '@type': 'ListItem', position: 3, name: t.title.split(' | ')[0], item: u }] };
  const hd = `<title>${esc(t.title)}</title>
    <meta name="description" content="${esc(t.desc)}" />
    <link rel="canonical" href="${u}" />
    ${LANGS.map((x) => `<link rel="alternate" hreflang="${HTML_LANG[x]}" href="${postUrl(x, post.slug)}" />`).join('\n    ')}
    <link rel="alternate" hreflang="x-default" href="${postUrl('pl', post.slug)}" />
    <meta property="og:type" content="article" /><meta property="og:site_name" content="${C.name}" />
    <meta property="og:url" content="${u}" /><meta property="og:title" content="${esc(t.title)}" />
    <meta property="og:description" content="${esc(t.desc)}" /><meta property="og:image" content="${img}" />
    <meta property="og:locale" content="${OG[l]}" /><meta property="article:published_time" content="${post.date}" /><meta property="article:author" content="${esc(a.name[l])}" />
    <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${esc(t.title)}" /><meta name="twitter:description" content="${esc(t.desc)}" /><meta name="twitter:image" content="${img}" />
    <script type="application/ld+json">${JSON.stringify(ldj)}</script>
    <script type="application/ld+json">${JSON.stringify(crumbs)}</script>`;
  const html = tpl.replace(/<html lang="[^"]*">/, `<html lang="${HTML_LANG[l]}">`).replace(/<title>.*?<\/title>/, '').replace('<!--head-->', hd)
    .replace('<div id="root"><!--app--></div>', `<div id="root" data-ssr="1">${render(l, 'blog', post.slug)}</div>`);
  const dir = path.join(dist, postPath(l, post.slug)); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, 'index.html'), html);
}
const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.flatMap((pg) => LANGS.map((l) => `  <url><loc>${url(l, pg)}</loc><lastmod>${today}</lastmod>${LANGS.map((a) => `<xhtml:link rel="alternate" hreflang="${HTML_LANG[a]}" href="${url(a, pg)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${url('pl', pg)}"/></url>`)).join('\n');
const purls = POSTS.flatMap((post) => LANGS.map((l) => `  <url><loc>${postUrl(l, post.slug)}</loc><lastmod>${post.date}</lastmod>${LANGS.map((a) => `<xhtml:link rel="alternate" hreflang="${HTML_LANG[a]}" href="${postUrl(a, post.slug)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${postUrl('pl', post.slug)}"/></url>`)).join('\n');
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n${purls}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.rmSync('dist-ssr', { recursive: true, force: true });
console.log('prerendered', LANGS.length * PAGES.length, 'pages +', POSTS.length * LANGS.length, 'posts');
