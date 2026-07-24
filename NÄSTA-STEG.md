# Färdplan: loftaleden.se från Wix till egen drift

_Uppdaterad 2026-07-24._

## Läget just nu

- Sajten är **live som utkast**: https://loftaleden.birger-lofgren.workers.dev
- `loftaleden.se` pekar orört kvar på Wix — inget är synligt för allmänheten.
- GitHub-push → Cloudflare bygger automatiskt (verifierat, ~1 minut).
- Säkerhet klar: 2FA på GitHub + Cloudflare, skyddad main, Dependabot, secret scanning.

---

## Etapp 1: Din egen reviewrunda (nu)

1. Be Claude starta dev-servern (eller kör `npm run dev`) → öppna **http://localhost:4321**.
2. Klicka igenom alla sidor, säg ändringar till Claude — flera per meddelande, skärmdumpar funkar.
3. Iterera tills det känns bra → säg "pusha" → live på workers.dev inom en minut.

Kolla särskilt:

- [ ] **Mobilvyn** — smalt fönster; hamburgermeny, nyhetskort, kontakt
- [ ] **Texterna** — ordagrant från Wix inkl. småfel ("brev intervjuade" i SVT-posten → "blev"?)
- [ ] **Bildplaceringar** — särskilt Om- och Bli medlem-sidorna
- [ ] **Kartsidan** — klicka "Visa kartan"
- [ ] **Startsidans hero** — rätt bild/känsla? (alternativ finns: flygfotot)

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
- [ ] Kolla i Wix att inget annat innehåll glömts (sidor, filer, formulärsvar).
- [ ] Kontrollera vilken Wix-plan föreningen faktiskt har (jämförelsepunkt för besparingen).

## Etapp 4: Go live — DNS-flytt (efter styrelsens godkännande)

Be Claude om hjälp här; ungefärliga steg:

- [ ] Lägg till `loftaleden.se` som zon i Cloudflare (gratisplan) → få namnservrar.
- [ ] Kolla först befintliga DNS-poster hos one.com så inget tappas (e-post går via
      Gmail så troligen inga MX att bevara — men verifiera).
- [ ] Byt namnservrar hos one.com till Cloudflares. Domänregistreringen ligger kvar
      hos one.com — bara DNS flyttar.
- [ ] Koppla domänen till Workern (loftaleden → Settings → Domains & Routes →
      `loftaleden.se` + `www.loftaleden.se`).
- [ ] Verifiera HTTPS, testa gamla `/post/...`-länkar → 301, klicka igenom sajten.
- [ ] Lägg till sajten i Google Search Console + skicka in sitemapen.
- [ ] Transfer lock på domänen hos one.com (handoverns krav).

## Etapp 5: Efter 1–2 veckors stabil drift

- [ ] **Säg upp Wix-abonnemanget** (~2 500 kr/år sparas).
- [ ] **Säg upp one.com-hostingpaketet** (588 kr/år, oanvänt). Senast **2027-07-21**
      (en månad före förnyelse) — men kan göras direkt efter DNS-flytten funkar.
- [ ] Besluta var domänen ska ligga långsiktigt: kvar hos one.com (239 kr/år) eller
      flyttas till billigare registrar (t.ex. Cloudflare Registrar). Ingen brådska.

## Etapp 6: Utskick/nyhetsbrev (medvetet uppskjutet)

- [ ] Välj tjänst: MailerLite eller Brevo — verifiera att gratisnivån räcker
      (120 mottagare, ~4 utskick/år) mot aktuell prissida.
- [ ] Skapa konto på föreningens e-post, importera medlemslistan (CSV från etapp 3).
- [ ] Be Claude bädda in prenumerationsformulär på Bli medlem-sidan.

## Övrigt (oberoende av sajten, från handovern)

- [ ] Redovisa utlägg **2 042,50 kr** dragna från privat kort
      (fakturor 2025-06-21 och 2026-06-21) till kassören.
