# Model Preview Funnel (SFW) — v2

- `index.html` — SFW microsite s carousel fotek, CTA a bio modelky.
- `gate.html` — Gate: odpočet do 23:59, scarcity a slide-in notifikace.

**Pozn.:** Vizuály v `assets/img/slide*.jpg` jsou generované placeholdery (bezpečné pro Meta).

## Nasazení
Nahraj jako statický web (Netlify/Vercel/Cloudflare Pages). Vstupní stránka: `index.html`.

## Co vyměnit při ostrém nasazení
- Fotky: nahraď reálnými SFW snímky (fashion/lifestyle).
- CTA redirect: v `gate.html` (JS) nahradit DEMO alert za POST + 302.
- (Volit.) Přidej IG in-app escape do další vrstvy, pokud budeš posílat traffic z IG.
