# Färdplan: loftaleden.se från Wix till egen drift

_Uppdaterad 2026-09-14._

## Läget just nu

- Sajten är **live som utkast**: https://loftaleden.birger-lofgren.workers.dev
- `loftaleden.se` pekar orört kvar på Wix — inget är synligt för allmänheten.
- GitHub-push → Cloudflare bygger automatiskt (verifierat, ~1 minut).
- Säkerhet klar: 2FA på GitHub + Cloudflare, skyddad main, Dependabot, secret scanning.
- Sajten är **35 sidor** och har **noll beroenden kvar till Wix**.

### Två saker vi fick reda på 2026-09-14 som ändrade planen

**1. DNS ligger hos Wix, inte hos one.com.** Färdplanen antog tidigare one.com. Faktiskt läge:

```
NS loftaleden.se  →  ns4.wixdns.net, ns5.wixdns.net
MX loftaleden.se  →  loftaleden.se.mx.one.com
```

Konsekvens: Wix kontrollerar DNS. Namnserverbytet görs hos one.com (registraren).
MX-posten måste återskapas i Cloudflare — handovern säger att one.coms e-post aldrig
togs i bruk, men posten finns, så kopiera över den så inget tappas.

**2. Det fanns två Wix-abonnemang, inte ett.**

| Abonnemang | Kostnad | Status |
|---|---|---|
| E-postmarknadsföring "Essentials" | €150/år | **Autoförnyelse avstängd 2026-09-14.** Löper ut 19 sep 2026. €150 sparade. |
| Premiumpaket "Light" (sajt + domän) | betald t.o.m. **1 aug 2027** | Aktiv. Autoförnyelse bör stängas av. |

Ingen tidspress alltså — Premiumpaketet är betalt till 1 aug 2027.

**Om uppsägning av Premiumpaketet:** ingen återbetalning är möjlig. Wix 14-dagarsgaranti
gäller bara nya planer, inte förnyelser, och betalningen 1 aug 2026 var en förnyelse.
Enligt Wix egen dokumentation ligger planen kvar aktiv till slutet av betalperioden även
om man säger upp ("remains active until the end of the billing cycle"), så knappen
"Avsluta nu" tar **inte** ner sajten direkt — dialogens varningslista beskriver vad som
händer när planen tar slut. Att säga upp nu stoppar 2027-debiteringen och är att föredra
framför att riskera att glömma det före 1 aug 2027. Kontrollera raden efteråt: den ska se
ut som e-postmarknadsföringsraden, alltså aktiv med autoförnyelse av.

---

## Etapp 1: Din egen reviewrunda (pågår)

1. Be Claude starta dev-servern (eller kör `npm run dev`) → öppna **http://localhost:4321**.
2. Klicka igenom alla sidor, säg ändringar till Claude — flera per meddelande, skärmdumpar funkar.
3. Iterera tills det känns bra → säg "pusha" → live på workers.dev inom en minut.

Kolla särskilt:

- [ ] **Mobilvyn** — smalt fönster; hamburgermeny, nyhetskort, kontakt
- [ ] **Bildplaceringar** — särskilt Om- och Bli medlem-sidorna
- [ ] **Kartsidan** — klicka "Visa kartan"
- [ ] **Startsidans hero** — rätt bild/känsla? (alternativ finns: flygfotot)
- [ ] **Informationspunkterna** — ordningen på de tolv skyltarna, se nedan

Avklarat i etapp 1:

- [x] Texterna genomgångna. Rättat: "brev intervjuade" → "blev" (SVT-inlägget),
      "enklelt" → "enkelt", saknade blanksteg runt handbokslänken, två interna länkar
      som gick via absolut `http://www.loftaleden.se`.
- [x] Beroenden uppdaterade, 10 sårbarheter → 0.

## Etapp 1b: Modernare design (parallellt spår)

Utvärderas i en separat git worktree. Notera att en worktree skapas från ett commit —
committa först, annars saknas allt ocommitterat arbete i den nya worktreen.

## Etapp 2: Styrelsen granskar

- [ ] Dela workers.dev-länken med styrelsen, samla synpunkter → ny putsrunda med Claude.
- [ ] Bjud in styrelsemedlemmar som ska kunna publicera: GitHub → Settings →
      Collaborators → Add people, roll **Write**. (De behöver egna GitHub-konton med 2FA.)
- [ ] **Generalrepetition:** låt någon i styrelsen testpublicera ett inlägg enligt `PUBLICERA.md`.
- [ ] Bjud in en styrelsekollega till Cloudflare-kontot (Manage Account → Members).
- [ ] Lägg inloggningsuppgifter/återställningskoder i föreningens delade lösenordshanterare
      (handoverns krav: minst två personer per konto).

## Etapp 3: Innan Wix rörs — rädda datat

- [ ] **Exportera medlemsregistret** (~120 personer) från Wix kontakthantering till CSV.
      Spara utanför repot (t.ex. föreningens Google Drive). Måste göras INNAN Wix sägs upp!
      Gör det gärna före 19 sep 2026 — e-postmarknadsföringsappen löper ut då, och
      eventuella prenumerantlistor där kan försvinna med den.
- [ ] Kolla i Wix att inget annat innehåll glömts (sidor, filer, formulärsvar).

Avklarat i etapp 3:

- [x] **Wix-planen kontrollerad** — se tabellen ovan. Handoverns öppna fråga är besvarad.
- [x] **Innehållsinventering klar.** Allt textinnehåll är migrerat:
      15 bloggposter, 12 informationsskyltar, sju sidor. Wix-sajtens övriga dynamiska
      sidor (`/items/this-is-a-title-01` m.fl.) är Wix demo-innehåll utan värde.
      Wix-apparna Members Area, Events och Groups är installerade men används inte
      (inga publika sidor). Sökfunktionen (Wix Site Search) har ingen motsvarighet på
      nya sajten — bedömdes som acceptabelt.
- [x] **Handboks-PDF räddad.** Den låg på Wix filhotell (`usrfiles.com`) och hade dött
      vid uppsägning. Nu i `public/dokument/bygga-cykelvag-pa-landet.pdf`.

## Etapp 4: Go live — DNS-flytt (efter styrelsens godkännande)

Be Claude om hjälp här; ungefärliga steg:

- [ ] Lägg till `loftaleden.se` som zon i Cloudflare (gratisplan) → få namnservrar.
- [ ] **Återskapa MX-posten** (`loftaleden.se.mx.one.com`, prio 10) i Cloudflare-zonen.
      Det finns inga TXT/SPF-poster idag, så där finns inget att bevara.
- [ ] Byt namnservrar **hos one.com** från `ns4/ns5.wixdns.net` till Cloudflares.
      Domänregistreringen ligger kvar hos one.com — bara DNS flyttar.
- [ ] Koppla domänen till Workern (loftaleden → Settings → Domains & Routes →
      `loftaleden.se` + `www.loftaleden.se`).
- [ ] Verifiera HTTPS, testa gamla `/post/...`- och `/info-skyltar/...`-länkar → 301,
      klicka igenom sajten.
- [ ] Lägg till sajten i Google Search Console + skicka in sitemapen.
- [ ] Transfer lock på domänen hos one.com (handoverns krav).

## Etapp 5: Efter 1–2 veckors stabil drift

- [ ] **Stäng av autoförnyelse på Wix Premiumpaketet** (kan göras när som helst, se ovan).
- [ ] **Säg upp one.com-hostingpaketet** (588 kr/år, oanvänt). Senast **2027-07-21**
      (en månad före förnyelse) — men kan göras direkt efter DNS-flytten funkar.
- [ ] Besluta var domänen ska ligga långsiktigt: kvar hos one.com (239 kr/år) eller
      flyttas till billigare registrar (t.ex. Cloudflare Registrar). Ingen brådska.

## Etapp 6: Utskick/nyhetsbrev (medvetet uppskjutet)

Wix e-postmarknadsföring är uppsagd, så någon ersättning behövs om föreningen vill
fortsätta skicka nyhetsbrev.

- [ ] Välj tjänst: MailerLite eller Brevo — verifiera att gratisnivån räcker
      (120 mottagare, ~4 utskick/år) mot aktuell prissida.
- [ ] Skapa konto på föreningens e-post, importera medlemslistan (CSV från etapp 3).
- [ ] Be Claude bädda in prenumerationsformulär på Bli medlem-sidan.

## Öppna frågor på innehållet

- [ ] **Ordningen på informationspunkterna.** De ligger i Wix ordning (Tjuadal först,
      sedan alfabetiskt). Vill ni ha dem i ordning längs leden: ändra `ordning`-siffran
      i respektive `src/content/infopunkter/<slug>/index.md`.
- [ ] **Mannen på Håfors-fotot** (`hafors-en-by-i-tva-socknar`, bild 2) är inte namngiven
      i skyltens text. Alt-texten är neutral tills någon vet vem det är.
- [ ] **Hero-bilder på bloggposterna** saknar alt-text (`heroImageAlt` finns i schemat men
      används inte av något inlägg). Tomt alt är formellt korrekt för en bild intill sin
      rubrik, men beskrivande texter vore bättre. Claude kan skriva dem på begäran.

## Övrigt (oberoende av sajten, från handovern)

- [ ] Redovisa utlägg **2 042,50 kr** dragna från privat kort
      (fakturor 2025-06-21 och 2026-06-21) till kassören.
