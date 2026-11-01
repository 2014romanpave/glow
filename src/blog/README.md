# Blog GLOW — jak dodać artykuł / як додати статтю

1. Skopiuj dowolny plik z `src/blog/posts/` jako `src/blog/posts/<slug>.ts` (slug: małe litery, cyfry, myślniki — będzie adresem `/blog/<slug>` i `/ua/blog/<slug>`).
2. Uzupełnij pola:
   - `slug` — taki sam jak nazwa pliku,
   - `date` — `RRRR-MM-DD` (najnowsze artykuły są na górze listy),
   - `author` — `'ola'` lub `'wiktoria'`,
   - `cover` — zdjęcie z `public/img/...` (np. `/img/coloring/airtouch3_1x.webp`) + `coverAlt` pl/ua,
   - `related` (opcjonalnie) — slugi 1–2 powiązanych artykułów,
   - `pl` i `ua`: `title` (SEO, do ~60 znaków + `| Blog GLOW`), `desc` (meta description, ~150 znaków), `lead`, `body`.
3. `body` to prosty markdown: akapity oddzielone pustą linią, nagłówki `## Tytuł`, listy — linie zaczynające się od `- `.
4. `npm run build` — strona, sitemap, hreflang, JSON-LD (BlogPosting) i OG generują się automatycznie. Commit + push do `redesign`.

Zasady treści: bez cen, bez keratyny/botoksu/zabiegów pielęgnacyjnych, bez wymyślonych opinii i statystyk.
