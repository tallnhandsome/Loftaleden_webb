# Löftaleden webb

Statisk sajt för [loftaleden.se](https://loftaleden.se), byggd med [Astro](https://astro.build) och hostad på Cloudflare Pages. Ersätter föreningens tidigare Wix-sajt.

**Vill du bara publicera ett inlägg?** Läs [PUBLICERA.md](PUBLICERA.md) – det kräver ingen teknisk kunskap.

## Teknik

- **[Astro](https://docs.astro.build)** – statisk sajtgenerator. Bloggposter är Markdown-filer i `src/content/blogg/`, allt annat är mallar i `src/`.
- **Cloudflare Workers** (statiska assets) – bygger och publicerar sajten automatiskt vid varje push till `main`. Build-kommando `npm run build`, deploy `npx wrangler deploy` (konfiguration i `wrangler.jsonc`).
- **Raleway** självhostas (`src/assets/fonts/`) – inga anrop till Google Fonts.
- Kartan (Google My Maps) laddas först när besökaren klickar – sajtens enda JavaScript.

## Utveckling

```sh
npm install        # engångs
npm run dev        # dev-server på localhost:4321
npm run build      # bygger till dist/
npm run preview    # förhandsgranska byggd sajt
```

## Struktur

| Plats | Innehåll |
|---|---|
| `src/content/blogg/<slug>/index.md` | Bloggposter, en mapp per inlägg med bilder bredvid |
| `src/pages/` | Sajtens sidor (Hem, Nyhetsflöde, Karta, …) |
| `src/data/kontakter.ts` | Kontaktuppgifter (används på Hem + Kontakt) |
| `src/data/infopunkter.ts` | Informationspunkter längs leden |
| `src/components/`, `src/layouts/` | Byggstenar och sidmallar |
| `src/styles/global.css` | Färger (CSS-variabler) och grundstilar |
| `public/_headers` | Säkerhetsheaders (CSP m.m.) |
| `public/_redirects` | 301-omdirigeringar från gamla Wix-adresser (`/post/…`) |
| `public/dokument/` | Årsberättelser (PDF) |

## Vanliga ändringar

- **Nytt telefonnummer/adress:** redigera `src/data/kontakter.ts`.
- **Ny informationspunkt:** lägg bilden i `src/assets/infopunkter/` och lägg till en post i `src/data/infopunkter.ts`.
- **Ny bloggpost:** se [PUBLICERA.md](PUBLICERA.md).

## Säkerhet och drift

- Tvåfaktorsautentisering ska vara aktiv på GitHub- och Cloudflare-kontona; minst två personer ska ha åtkomst till varje konto.
- Inga personuppgifter eller nycklar i repot – medlemsregistret ligger utanför.
- Aktivera Dependabot i GitHub-repots inställningar (Settings → Code security).
- Domänen: se `HANDOVER.md` för migreringsplan och DNS-flytt.
