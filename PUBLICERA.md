# Publicera ett inlägg på loftaleden.se

Den här guiden visar hur du publicerar ett nytt inlägg i nyhetsflödet, direkt i
webbläsaren. Du behöver inget installerat på datorn – bara ett GitHub-konto med
åtkomst till detta repo.

Sajten byggs om automatiskt när du sparar. Inom ett par minuter syns inlägget på
loftaleden.se.

## Steg för steg

1. **Gå till mappen med inlägg:**
   öppna [github.com/tallnhandsome/Loftaleden_webb](https://github.com/tallnhandsome/Loftaleden_webb)
   och klicka dig fram till `src/content/blogg/`.

2. **Skapa en mapp för inlägget:** klicka **Add file → Create new file**.
   I namnrutan skriver du mappnamn + `/index.md`, till exempel:

   ```
   varvandring-i-maj/index.md
   ```

   Mappnamnet blir webbadressen. Använd små bokstäver och bindestreck,
   inga å/ä/ö (skriv `a` och `o` i stället).

3. **Klistra in mallen** nedan och fyll i din text:

   ```markdown
   ---
   title: "Vårvandring i maj"
   description: "En kort sammanfattning som visas i nyhetslistan och på Google."
   pubDate: 2026-05-15
   heroImage: ./hero.jpg
   ---

   Här skriver du själva inlägget. Tomrad = nytt stycke.

   ## En mellanrubrik

   Fler stycken. Du kan **fetstila** och länka så här:
   [texten som syns](https://exempel.se).

   ![Bildtext för en bild i texten](./bild-1.jpg)
   ```

   - `pubDate` skrivs som år-månad-dag.
   - Raden `heroImage: ./hero.jpg` pekar på inläggets huvudbild.
     **Tar du ingen bild – ta bort hela raden.**

4. **Spara:** klicka på den gröna knappen **Commit changes**, och sedan
   **Commit changes** igen i rutan som dyker upp. (Skriv gärna en kort
   beskrivning, t.ex. "Nytt inlägg om vårvandringen".)

5. **Ladda upp bilder** (om du använder några): gå in i mappen du just skapade
   (`src/content/blogg/varvandring-i-maj/`), klicka **Add file → Upload files**
   och dra in bilderna. Döp dem som i texten: `hero.jpg`, `bild-1.jpg` osv.
   Klicka **Commit changes**.

6. **Klart!** Efter ett par minuter finns inlägget på
   `loftaleden.se/nyhetsflode/`. Bilder förminskas och optimeras automatiskt.

## Rätta ett misstag

Gå till inläggets `index.md` på GitHub, klicka på pennan (**Edit**), ändra och
klicka **Commit changes**. Sajten byggs om igen automatiskt.

## Ta bort ett inlägg

Öppna inläggets mapp, klicka på de tre prickarna uppe till höger och välj
**Delete directory**, sedan **Commit changes**.

## Om något går fel

- Ser inlägget konstigt ut? Vanligaste felen är att raderna `---` överst
  försvunnit, eller att `title:`/`description:` saknar citattecken.
- Byggs sajten inte om? Kontrollera att filen heter just `index.md` och ligger i
  en egen mapp under `src/content/blogg/`.
- Kör det ihop sig helt: hör av dig till den tekniskt ansvariga i styrelsen –
  ingenting du gör här kan förstöra sajten permanent, allt går att backa.
