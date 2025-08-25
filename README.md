# Funnel Dummy Prototype (Landing 1 + Landing 2)

Tahle složka obsahuje dvě statické stránky pro rychlý test mimo IG WebView:

- `index.html` — Landing 1 (vizitka): hero + claim, dominantní CTA, trust badges, social proof, collapsible "About".
- `gate.html` — Landing 2 (gate): geo‑headline, perzistentní countdown do 23:59, scarcity counter, slide‑in notifikace, finální CTA.

## Rychlé spuštění (Netlify / jakýkoli static host)
1. Nahraj celý obsah složky na hosting jako statický web (např. Netlify, Vercel, Cloudflare Pages).
2. Otevři `index.html` jako vstupní stránku.
3. Klik na **Odemknout přístup** → otevře `gate.html` a uvidíš flip timer, „spots left“, notifikace a finální CTA.

> Poznámky:
> - Všechno je čistá statika bez externích knihoven a bez backendu.
> - Obrázky jsou generované placeholdery (`assets/img/hero*.jpg`), logo je inline SVG.
> - Geo text („v Praze“) je odvozen z časové zóny; mimo podporované zóny se zobrazí „ve tvé oblasti“.
> - Timer je per‑device (localStorage), stejně jako „spots left“ a „joined today“.
> - Finální CTA na `gate.html` je DEMO: zobrazí alert místo redirectu.

## Struktura
- `assets/css/styles.css` — jednotné styly pro obě stránky
- `assets/js/landing1.js` — logika Landing 1 (toast, progress, lokalizace)
- `assets/js/gate.js` — logika Landing 2 (flip timer, scarcity, notifikace)
- `assets/img/*` — placeholder obrázky + logo

## Co dál (až bude potřeba)
- Nahradit demo alert na `gate.html` skutečným POST + server‑side 302 (tokenizace).
- Přidat backendovou validaci a logování.
- Přidat escape z IG WebView do D2 (tahle verze řeší až stránky mimo IG).
