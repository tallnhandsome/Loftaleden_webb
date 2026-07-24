# Handover: Löftaleden webb

Migrering från Wix till självbyggd statisk sajt.

Repo: https://github.com/tallnhandsome/Loftaleden_webb.git

## Kontext

Löftaleden Ideell Förening flyttar sajten `loftaleden.se` från Wix till en statisk sajt i egen regi. Domänen ligger idag hos one.com.

Nuvarande kostnader:

| Post | Kostnad per år |
|---|---|
| Wix | ca 2 500 kr |
| one.com hostingpaket (oanvänt) | 588 kr |
| Domän .se | 239 kr |
| **Totalt** | **ca 3 330 kr** |

Målbild: ca 150 kr per år, alltså enbart domänkostnad. Hosting och utskick löses inom gratisnivåer.

Föreningens e-post går via `loftaleden@gmail.com`. one.coms e-posthosting har aldrig tagits i bruk.

## Vad som ska byggas

Statisk sajt med sju sidor, motsvarande dagens struktur:

- Hem (hero, senaste nyheter, om oss, kontakt)
- Nyhetsflöde (blogg)
- Karta
- Informationspunkter
- Bli medlem
- Om
- Kontakt

## Rekommenderad stack

- **Generator:** Astro eller Eleventy. Båda ger Markdown-baserade bloggposter och minimal JavaScript i output.
- **Hosting:** Cloudflare Pages. Gratis, automatisk SSL, bygger direkt från GitHub-push.
- **Utskick:** MailerLite eller Brevo, med inbäddat formulär på Bli medlem-sidan. 120 mottagare och fyra utskick per år ryms i gratisnivå hos båda. Villkoren bör verifieras mot leverantörens aktuella prissida.
- **E-post:** ingen ändring. `loftaleden@gmail.com` fortsätter som förut.

## Migreringsuppgifter

1. Exportera bloggposter från Wix till Markdown. Wix saknar ren export, så innehållet behöver hämtas manuellt eller skrapas från `/blog`. Tre poster syns i dagens flöde, men arkivet kan innehålla fler.
2. Ladda ner bilder från `static.wixstatic.com` och optimera till WebP.
3. Undersök hur kartan är byggd. Inbäddad Google Maps följer med som iframe. En Wix-specifik komponent måste byggas om.
4. Exportera medlemsregistret (ca 120 personer) från Wix kontakthantering till CSV. Personuppgifter: hanteras varsamt och läggs aldrig i repot.

## Publiceringsflöde för styrelsen

Kritisk punkt: fler än en person måste kunna publicera. Två alternativ:

- **Markdown i repot.** Bloggposter som filer i `src/content/blog/`. Andra redigerar via GitHubs webbgränssnitt, vilket fungerar utan Git-kunskap.
- **Webbaserat CMS.** Decap CMS eller Sveltia CMS ovanpå repot ger ett redigeringsgränssnitt i webbläsaren.

Med fyra till fem inlägg per år räcker sannolikt det första alternativet.

## Säkerhet

- Tvåfaktorsautentisering på GitHub, Cloudflare och registrarkontot.
- Minst två personer med åtkomst till varje konto, via delad lösenordshanterare.
- Inga personuppgifter eller nycklar i repot. Medlemsregistret ligger utanför.
- `_headers`-fil i `public/` med Content-Security-Policy, X-Frame-Options och Referrer-Policy.
- Dependabot aktiverad om npm-beroenden används. Håll antalet beroenden lågt.
- Transfer lock aktiverad hos registraren.

## Ordning att arbeta i

1. Sätt upp projektet lokalt. Verifiera att bygget fungerar och deployar till Cloudflare Pages på en testadress.
2. Bygg sidmallar och navigation.
3. Migrera innehåll och bilder.
4. Sätt upp utskickstjänst och koppla Bli medlem-formuläret.
5. Testa mot testadressen. Låt någon i styrelsen prova att publicera ett inlägg.
6. Peka om DNS för `loftaleden.se` till Cloudflare Pages.
7. Säg upp Wix först efter att sajten fungerar i skarpt läge.

## Åtgärder oberoende av projektet

- Säg upp one.coms hostingpaket. 588 kr per år för en oanvänd tjänst. Uppsägning senast en månad före förnyelse, alltså före 2027-07-21.
- Kontrollera vilken Wix-plan föreningen faktiskt har, som jämförelsepunkt.
- Redovisa utlägg på 2 042,50 kr som dragits från privat kort (fakturor 2025-06-21 och 2026-06-21).

## Öppna frågor

- Hur kartan är byggd.
- Antal bloggposter i arkivet.
- Om medlemsformuläret idag skriver till Wix kontakthantering eller till mejl.
- Var domänen ska ligga efter flytt: kvar hos one.com eller flyttas till billigare registrar.
