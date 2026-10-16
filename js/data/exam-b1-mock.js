/* EXAM PRACTICE – Goethe-Zertifikat B1 MOCK EXAM (Lesen, Hören, Schreiben). Original texts written for Deutsch30 in the official task formats. */
(function () {
  'use strict';
  const E = (GL.exam = GL.exam || {});
  const T = (E.tasks = E.tasks || {});
  const add = (t) => (T[t.id] = t);

  /* ───────────────────────── LESEN ───────────────────────── */

  add({
    id: 'mock-b1-lesen-1',
    level: 'B1',
    exam: 'goethe',
    module: 'lesen',
    teil: 1,
    title: 'Lesen Teil 1 – Blogeintrag',
    en: 'A personal blog post – decide whether six statements are right or wrong.',
    minutes: 10,
    instr: 'Lesen Sie den Text und die Aufgaben 1 bis 6 dazu. Wählen Sie: Sind die Aussagen Richtig oder Falsch?',
    instrEn: 'Read the text and tasks 1 to 6. Choose: are the statements right or wrong?',
    tip: 'The statements follow the order of the text. Watch out for small changes: a different number (“seit einem Jahr” vs. “seit sechs Monaten”) or “früher” vs. “jetzt” makes a statement false.',
    gloss: [
      ['das Dorf', 'village'],
      ['der Umzug', 'move (house)'],
      ['bereuen', 'to regret'],
      ['die Miete', 'rent'],
      ['der Anschluss', 'connection (internet)'],
      ['der Nachbarort', 'neighbouring village'],
      ['der Gesangsverein', 'choir (club)'],
      ['die Probe', 'rehearsal'],
      ['vermissen', 'to miss'],
    ],
    kind: 'mc',
    text:
      'Raus aufs Land – mein erstes halbes Jahr in Kleinrieden\n\n' +
      'Liebe Leserinnen und Leser, seit sechs Monaten wohne ich jetzt nicht mehr in Frankfurt, sondern in Kleinrieden, einem Dorf mit 900 Einwohnern im Odenwald. Viele von euch haben mich gefragt, ob ich den Umzug schon bereue. Die ehrliche Antwort: manchmal ein bisschen, aber meistens nicht.\n\n' +
      'Eigentlich wollte ich nie aufs Land. Aber als meine Firma im letzten Jahr erlaubt hat, dass wir drei Tage pro Woche von zu Hause arbeiten, haben mein Freund Jonas und ich gerechnet: Für unsere kleine Zweizimmerwohnung in der Stadt haben wir mehr Miete bezahlt als jetzt für ein ganzes Haus mit Garten.\n\n' +
      'Am Anfang war vieles schwierig. Der Bus in die nächste Stadt fährt nur alle zwei Stunden und am Sonntag gar nicht. Deshalb mussten wir ein zweites Auto kaufen – das hatten wir eigentlich nicht geplant. Und das Internet war in den ersten Wochen so langsam, dass ich für Videokonferenzen ins Café im Nachbarort fahren musste. Inzwischen haben wir zum Glück einen schnellen Anschluss.\n\n' +
      'Was mich am meisten überrascht hat: die Nachbarn. Ich dachte, auf dem Dorf bleibt man als „Neue“ lange fremd. Aber schon in der ersten Woche stand die Nachbarin mit einem Kuchen vor der Tür, und im Frühling hat mich der Gesangsverein gefragt, ob ich mitsingen möchte. Jetzt gehe ich jeden Dienstag zur Probe.\n\n' +
      'Und was ich vermisse? Ehrlich gesagt das Kino und spontane Abende mit Freunden. Meine Freundinnen aus Frankfurt kommen zwar gern zu Besuch, aber meistens nur am Wochenende und leider nicht so oft, wie ich gehofft hatte.\n\n' +
      'Bis bald, eure Clara',
    items: [
      {
        q: 'Clara wohnt seit einem Jahr auf dem Land.',
        o: ['Richtig', 'Falsch'],
        a: 1,
        ex: '“seit sechs Monaten wohne ich jetzt … in Kleinrieden” = for six months. “im letzten Jahr” refers to when her company allowed working from home, not to the move.',
      },
      {
        q: 'Für das Haus zahlen Clara und Jonas mehr Miete als früher für die Wohnung.',
        o: ['Richtig', 'Falsch'],
        a: 1,
        ex: '“Für unsere kleine Zweizimmerwohnung … haben wir mehr Miete bezahlt als jetzt für ein ganzes Haus” = the flat used to cost MORE than the house costs now.',
      },
      {
        q: 'Clara und Jonas brauchten auf dem Land ein zweites Auto.',
        o: ['Richtig', 'Falsch'],
        a: 0,
        ex: '“Deshalb mussten wir ein zweites Auto kaufen” = that’s why we had to buy a second car (the bus only runs every two hours).',
      },
      {
        q: 'Clara hat immer noch Probleme mit dem Internet.',
        o: ['Richtig', 'Falsch'],
        a: 1,
        ex: 'The slow internet was only “in den ersten Wochen” (in the first weeks). “Inzwischen haben wir zum Glück einen schnellen Anschluss” = by now we luckily have a fast connection.',
      },
      {
        q: 'Clara hat schnell Kontakt zu den Leuten im Dorf gefunden.',
        o: ['Richtig', 'Falsch'],
        a: 0,
        ex: '“schon in der ersten Woche stand die Nachbarin mit einem Kuchen vor der Tür” = already in the first week the neighbour was at the door with a cake; now she sings in the choir.',
      },
      {
        q: 'Clara würde ihre Freundinnen aus Frankfurt gern öfter sehen.',
        o: ['Richtig', 'Falsch'],
        a: 0,
        ex: '“leider nicht so oft, wie ich gehofft hatte” = unfortunately not as often as I had hoped – so she would like to see them more often.',
      },
    ],
  });

  add({
    id: 'mock-b1-lesen-2',
    level: 'B1',
    exam: 'goethe',
    module: 'lesen',
    teil: 2,
    title: 'Lesen Teil 2 – Zeitungsartikel',
    en: 'Two newspaper articles – three a/b/c questions on each.',
    minutes: 20,
    instr: 'Lesen Sie die beiden Texte aus der Presse und die Aufgaben 7 bis 12 dazu. Wählen Sie bei jeder Aufgabe die richtige Lösung a, b oder c.',
    instrEn: 'Read the two press articles and tasks 7 to 12. For each task choose the right answer a, b or c.',
    tip: 'The first question usually asks for the main topic – read the headline and the first paragraph carefully. For the other questions, find the paragraph with the key word and compare every option with the exact sentence.',
    gloss: [
      ['die Fahrradstraße', 'cycle street (bikes have priority)'],
      ['der Vorrang', 'priority'],
      ['der Anwohner', 'resident'],
      ['der Lieferdienst', 'delivery service'],
      ['der Stadtrat', 'city council'],
      ['sich beschweren', 'to complain'],
      ['das Parkhaus', 'multi-storey car park'],
      ['ehrenamtlich', 'voluntary, unpaid'],
      ['der/die Freiwillige', 'volunteer'],
      ['die Fahrtkosten (Pl.)', 'travel costs'],
      ['das Referat', 'presentation (at school)'],
    ],
    kind: 'mc',
    items: [
      {
        text:
          'Fahrradstraße statt Parkplätze – Hellbrück testet neues Verkehrskonzept\n\n' +
          'Seit dem 1. April dürfen in der Lindenstraße in Hellbrück Autos nur noch 20 Kilometer pro Stunde fahren. Die Straße ist jetzt eine sogenannte Fahrradstraße: Radfahrer haben hier Vorrang und dürfen auch nebeneinander fahren. Mit dem Auto dürfen nur noch Anwohner und Lieferdienste hineinfahren. Außerdem hat die Stadt 40 Parkplätze entfernt und dort Abstellplätze für 300 Fahrräder gebaut.\n\n' +
          'Der Versuch dauert zunächst ein Jahr. „Danach entscheidet der Stadtrat, ob die Fahrradstraße bleibt“, sagt Verkehrsplanerin Miriam Haas. Die ersten Zahlen sind positiv: Pro Tag fahren schon 30 Prozent mehr Menschen mit dem Rad durch die Lindenstraße als im letzten Jahr.\n\n' +
          'Nicht alle sind zufrieden. Besonders einige Geschäftsleute beschweren sich. „Meine Kunden finden keinen Parkplatz mehr und kaufen jetzt im Einkaufszentrum am Stadtrand ein“, sagt Bäcker Thomas Wendt. Die Stadt möchte den Geschäften helfen: Im Parkhaus am Marktplatz, nur drei Minuten zu Fuß entfernt, ist die erste Stunde ab Mai kostenlos.\n\n' +
          'Viele Eltern freuen sich dagegen über das Projekt. Weil in der Lindenstraße eine Grundschule liegt, fühlen sie sich sicherer, wenn ihre Kinder mit dem Rad zur Schule fahren.',
        q: 'In diesem Text geht es darum, dass …',
        o: [
          'Autofahrer in Hellbrück mehr Parkplätze bekommen.',
          'eine Stadt eine Straße für Radfahrer umgestaltet hat.',
          'Hellbrück eine neue Grundschule gebaut hat.',
        ],
        a: 1,
        ex: 'The whole article is about the new “Fahrradstraße” (cycle street): “Radfahrer haben hier Vorrang” = cyclists have priority here. Parking spaces were removed, and the school is only mentioned at the end.',
      },
      {
        q: 'Mit dem Auto …',
        o: [
          'dürfen nur noch Anwohner und Lieferdienste in die Lindenstraße fahren.',
          'darf ab nächstem Jahr niemand mehr in die Lindenstraße fahren.',
          'darf man in der Lindenstraße weiterhin 30 km/h fahren.',
        ],
        a: 0,
        ex: '“Mit dem Auto dürfen nur noch Anwohner und Lieferdienste hineinfahren” = only residents and delivery services may still drive in. The speed limit is 20, not 30; after one year the council decides.',
      },
      {
        q: 'Was macht die Stadt für die Geschäftsleute?',
        o: [
          'Sie baut wieder Parkplätze in der Lindenstraße.',
          'Sie eröffnet ein Einkaufszentrum am Stadtrand.',
          'Man kann im Parkhaus eine Stunde gratis parken.',
        ],
        a: 2,
        ex: '“Im Parkhaus am Marktplatz … ist die erste Stunde ab Mai kostenlos” = the first hour in the car park is free from May. The shopping centre is where customers go now – the city didn’t open it.',
      },
      {
        text:
          'Zeit schenken: Immer mehr Rentner arbeiten als Lernpaten\n\n' +
          'Jeden Mittwochnachmittag sitzt Heinz Bauer, 71, in der Stadtbücherei von Hellbrück neben dem elfjährigen Amir. Zusammen lesen sie Geschichten, machen Matheaufgaben oder bereiten Referate vor. Herr Bauer ist kein Lehrer – er war vierzig Jahre lang Elektriker. Seit zwei Jahren arbeitet er ehrenamtlich als Lernpate.\n\n' +
          'Das Projekt „Zeit schenken“ gibt es seit 2019. Damals haben nur zwölf Freiwillige mitgemacht, heute sind es über hundert. Die meisten sind Rentnerinnen und Rentner, aber auch einige Studierende sind dabei. Geld bekommen die Paten nicht, nur die Fahrtkosten werden bezahlt. Bevor sie anfangen, besuchen alle einen kostenlosen Kurs, in dem sie lernen, wie man Kindern beim Lernen hilft.\n\n' +
          '„Viele Kinder brauchen nicht unbedingt Nachhilfe von Profis“, erklärt Projektleiterin Sandra Yilmaz. „Sie brauchen vor allem einen Erwachsenen, der regelmäßig Zeit für sie hat und ihnen zuhört.“ Die meisten Kinder im Projekt kommen aus Familien, in denen die Eltern lange arbeiten oder selbst noch Deutsch lernen.\n\n' +
          'Auch für die Paten lohnt sich die Arbeit. „Nach meinem letzten Arbeitstag hatte ich oft das Gefühl, dass mich niemand mehr braucht“, sagt Heinz Bauer. „Jetzt freue ich mich die ganze Woche auf den Mittwoch.“ Das Projekt sucht weiter neue Freiwillige, vor allem für Grundschulkinder.',
        q: 'In diesem Text geht es um …',
        o: [
          'eine neue Nachhilfeschule für Kinder.',
          'ältere Menschen, die Kindern beim Lernen helfen.',
          'Studierende, die in einer Bücherei arbeiten.',
        ],
        a: 1,
        ex: '“Immer mehr Rentner arbeiten als Lernpaten” = more and more pensioners work as learning mentors. It is not a school, and students are only “einige” (a few) of the volunteers.',
      },
      {
        q: 'Die Lernpaten …',
        o: [
          'bekommen für ihre Arbeit einen kleinen Lohn.',
          'müssen früher als Lehrer gearbeitet haben.',
          'machen vor dem Start eine Schulung.',
        ],
        a: 2,
        ex: '“Bevor sie anfangen, besuchen alle einen kostenlosen Kurs” = before they start, everyone attends a free course. “Geld bekommen die Paten nicht” – they get no money, only travel costs; Herr Bauer was an electrician, not a teacher.',
      },
      {
        q: 'Herr Bauer …',
        o: [
          'fühlt sich durch das Projekt wieder gebraucht.',
          'möchte bald mit Grundschulkindern arbeiten.',
          'hilft Amir nur bei Mathe.',
        ],
        a: 0,
        ex: 'Before, he felt “dass mich niemand mehr braucht” (nobody needs me any more); “Jetzt freue ich mich die ganze Woche auf den Mittwoch” = now he looks forward to Wednesday all week. They do stories, maths AND presentations.',
      },
    ],
  });

  add({
    id: 'mock-b1-lesen-3',
    level: 'B1',
    exam: 'goethe',
    module: 'lesen',
    teil: 3,
    title: 'Lesen Teil 3 – Anzeigen',
    en: 'Seven situations and ten adverts – find the right advert for each person; one situation has no matching advert (x).',
    minutes: 10,
    instr: 'Lesen Sie die Situationen 13 bis 19 und die Anzeigen a bis j. Wählen Sie: Welche Anzeige passt zu welcher Situation? Sie können jede Anzeige nur einmal verwenden. Für eine Situation gibt es keine passende Anzeige. In diesem Fall wählen Sie x.',
    instrEn: 'Read situations 13 to 19 and adverts a to j. Which advert matches which situation? You can use each advert only once. For one situation there is no matching advert – then choose x.',
    tip: 'Underline the two or three conditions in each situation (who? when? what exactly?). Many adverts match the topic but miss one condition – e.g. the right activity but the wrong day or the wrong age group.',
    gloss: [
      ['die Anzeige', 'advert'],
      ['der Lauftreff', 'running group'],
      ['die Werkstatt', 'workshop'],
      ['das Werkzeug', 'tools'],
      ['der Standplatz', 'stall space (at a market)'],
      ['das Tierheim', 'animal shelter'],
      ['Gassi gehen', 'to walk a dog'],
      ['die Anmeldung', 'registration'],
      ['die Vollwertküche', 'wholefood cooking'],
      ['die Sprechstunde', 'consultation hours'],
    ],
    kind: 'match',
    x: true,
    ads: [
      {
        k: 'a',
        title: 'Endlich schwimmen lernen!',
        t: 'Schwimmkurs für Erwachsene (ab 18 Jahren) im Hallenbad Nord. Kleine Gruppen, geduldige Trainer. 8 Abende, montags 19:30 Uhr. Auch in den Sommerferien. 95 €.',
      },
      {
        k: 'b',
        title: 'Lauftreff Grüne Lunge',
        t: 'Laufen macht gemeinsam mehr Spaß! Wir treffen uns jeden Dienstag und Donnerstag um 18:30 Uhr am Eingang zum Stadtpark. Anfänger und Fortgeschrittene willkommen, Gruppen nach Tempo. Kostenlos, ohne Anmeldung.',
      },
      {
        k: 'c',
        title: 'Gesund und schnell kochen',
        t: 'Familienbildungsstätte Hellbrück: 6 Abende, immer dienstags von 19 bis 21:30 Uhr. Wir kochen leichte Gerichte für den Feierabend. Kursgebühr 60 € plus Lebensmittel.',
      },
      {
        k: 'd',
        title: 'Großer Hofflohmarkt Weststadt',
        t: 'Am 24. Mai öffnen über 50 Höfe ihre Tore! Privatleute verkaufen Möbel, Bücher, Kleidung und mehr. Sie möchten selbst verkaufen? Melden Sie Ihren Standplatz bis 15. Mai an: 10 € pro Stand.',
      },
      {
        k: 'e',
        title: 'Fahrrad-Service Speiche',
        t: 'Ihr Rad macht Probleme? Wir reparieren es in 24 Stunden – mit Abhol- und Bringservice. Inspektion ab 39 €. Montag bis Freitag 9–18 Uhr.',
      },
      {
        k: 'f',
        title: 'Tierheim Hellbrück sucht Gassigeher',
        t: 'Unsere Hunde warten auf Sie! Wir suchen ehrenamtliche Helferinnen und Helfer, die regelmäßig mit unseren Hunden spazieren gehen. Einführung jeden ersten Sonntag im Monat um 11 Uhr.',
      },
      {
        k: 'g',
        title: 'FitPoint – Neueröffnung',
        t: 'Das modernste Fitnessstudio der Stadt: über 100 Geräte, Sauna, persönliche Trainer. Nur im Juni: die ersten 3 Monate zum halben Preis!',
      },
      {
        k: 'h',
        title: 'Digital-Sprechstunde in der Stadtbibliothek',
        t: 'Fragen zu Handy, Tablet oder Apps? Junge Freiwillige helfen Ihnen geduldig – vom Online-Ticket bis zum Fotoversand. Jeden Donnerstag 15–17 Uhr, kostenlos und ohne Anmeldung.',
      },
      {
        k: 'i',
        title: 'Offene Fahrradwerkstatt im Jugendzentrum',
        t: 'Hier reparierst du dein Rad selbst! Wir haben das Werkzeug, unsere Ehrenamtlichen zeigen dir, wie es geht. Jeden Samstag 10–14 Uhr, für alle Altersgruppen. Spende erwünscht.',
      },
      {
        k: 'j',
        title: 'Kochwerkstatt am Markt',
        t: 'Samstagskurse „Vollwertküche“: Wir kaufen zusammen auf dem Wochenmarkt ein und kochen danach gesunde Gerichte mit frischem Gemüse. Jeden Samstag 10–14 Uhr, 35 € pro Termin.',
      },
    ],
    items: [
      {
        q: 'Ihre Kollegin möchte nach der Arbeit zusammen mit anderen draußen Sport machen. Geld möchte sie dafür nicht ausgeben.',
        a: 'b',
        ex: 'b: “Laufen macht gemeinsam mehr Spaß … jeden Dienstag und Donnerstag um 18:30 Uhr am Eingang zum Stadtpark … Kostenlos” – a group, in the evening, outdoors, free. a (swimming) is indoors in the Hallenbad and costs 95 €; g is a gym (“Fitnessstudio”) and not free.',
      },
      {
        q: 'Ein Freund hat ein altes Fahrrad, das nicht mehr richtig funktioniert. Er möchte lernen, wie er es selbst reparieren kann.',
        a: 'i',
        ex: 'i: “Hier reparierst du dein Rad selbst! … unsere Ehrenamtlichen zeigen dir, wie es geht.” e also repairs bikes, but “Wir reparieren es” – the shop does it, he doesn’t learn anything.',
      },
      {
        q: 'Ihre Nachbarin zieht bald um und möchte ihre alten Möbel und Bücher verkaufen.',
        a: 'd',
        ex: 'd: “Sie möchten selbst verkaufen? Melden Sie Ihren Standplatz … an” = you can register a stall to sell your own furniture and books.',
      },
      {
        q: 'Ein Bekannter ist neu in der Stadt. Er möchte sich ehrenamtlich engagieren, am liebsten mit Tieren.',
        a: 'f',
        ex: 'f: “Wir suchen ehrenamtliche Helferinnen und Helfer, die … mit unseren Hunden spazieren gehen” = voluntary work with animals.',
      },
      {
        q: 'Ihr Bruder möchte lernen, gesünder zu kochen. Er arbeitet aber auch abends und hat nur am Wochenende Zeit.',
        a: 'j',
        ex: 'j: “Samstagskurse … gesunde Gerichte mit frischem Gemüse” – on Saturdays. c is also healthy cooking, but “immer dienstags von 19 bis 21:30 Uhr” – a weekday evening, when he works.',
      },
      {
        q: 'Eine Freundin sucht für ihre achtjährige Tochter einen Schwimmkurs in den Sommerferien.',
        a: 'x',
        ex: 'x: the only swimming course, a, is “für Erwachsene (ab 18 Jahren)” = for adults only, so there is no ad for an eight-year-old child.',
      },
      {
        q: 'Ihr Vater ist 68. Er möchte lernen, wie man mit dem Smartphone Bahntickets kauft und Fotos verschickt.',
        a: 'h',
        ex: 'h: “Fragen zu Handy, Tablet oder Apps? … vom Online-Ticket bis zum Fotoversand” = help with phones, from online tickets to sending photos.',
      },
    ],
  });

  add({
    id: 'mock-b1-lesen-4',
    level: 'B1',
    exam: 'goethe',
    module: 'lesen',
    teil: 4,
    title: 'Lesen Teil 4 – Meinungen',
    en: 'Seven readers’ comments on a debate question – decide for each person: for (Ja) or against (Nein)?',
    minutes: 15,
    instr: 'Lesen Sie die Texte 20 bis 26. Wählen Sie: Ist die Person für ein Recht auf Homeoffice? In einer Zeitschrift lesen Sie Kommentare zu einem Artikel über ein gesetzliches Recht auf Arbeit im Homeoffice.',
    instrEn: 'Read texts 20 to 26. Choose: is the person in favour of a right to work from home? In a magazine you read comments on an article about a legal right to work from home.',
    tip: 'Do not decide after the first sentence – many writers start with the other side (“Natürlich …”, “Viele sagen …”) and then give their real opinion after “aber”, “trotzdem” or “deshalb”. The last sentence often sums up the opinion.',
    gloss: [
      ['das Homeoffice', 'working from home'],
      ['das Recht auf', 'the right to'],
      ['das Gesetz', 'law'],
      ['gesetzlich', 'legal, by law'],
      ['der Arbeitsweg', 'commute'],
      ['ungerecht', 'unfair'],
      ['der Vorgesetzte', 'boss, superior'],
      ['vereinbaren', 'to agree (on)'],
      ['sich konzentrieren', 'to concentrate'],
    ],
    kind: 'mc',
    items: [
      {
        text: 'Lukas, 29, Hamburg: Früher war ich jeden Tag 90 Minuten zur Arbeit und zurück unterwegs – im vollen Zug. Seit ich dreimal pro Woche zu Hause arbeite, habe ich endlich Zeit für Sport und schlafe besser. Leider entscheidet bei uns jeder Abteilungsleiter selbst, wer darf und wer nicht. So etwas sollte nicht vom Chef abhängen, sondern für alle gleich geregelt sein.',
        q: 'Ist Lukas für ein Recht auf Homeoffice?',
        o: ['Ja', 'Nein'],
        a: 0,
        ex: '“So etwas sollte nicht vom Chef abhängen, sondern für alle gleich geregelt sein” = it shouldn’t depend on the boss but be regulated the same for everyone – he wants a general right.',
      },
      {
        text: 'Petra, 52, Köln: Ich bin Krankenpflegerin. Meine Arbeit kann ich nicht am Küchentisch machen, und die Kassiererin im Supermarkt auch nicht. Ein Recht auf Homeoffice wäre deshalb nur ein Recht für Büroangestellte. Ich finde das ungerecht. Die Firmen und ihre Mitarbeiter sollen das lieber selbst miteinander klären.',
        q: 'Ist Petra für ein Recht auf Homeoffice?',
        o: ['Ja', 'Nein'],
        a: 1,
        ex: '“Ich finde das ungerecht” = I find that unfair; companies and employees should “das lieber selbst miteinander klären” (sort it out themselves) – so no law.',
      },
      {
        text: 'Mehmet, 41, Stuttgart: Ehrlich gesagt war ich am Anfang skeptisch. Ich dachte, zu Hause arbeitet doch niemand richtig. Heute weiß ich: Mein Team ist im Homeoffice sogar produktiver. Trotzdem lehnen viele Chefs es immer noch ab, nur aus Gewohnheit. Ohne Gesetz wird sich da nichts ändern.',
        q: 'Ist Mehmet für ein Recht auf Homeoffice?',
        o: ['Ja', 'Nein'],
        a: 0,
        ex: 'He WAS sceptical (“am Anfang skeptisch”), but now: “Ohne Gesetz wird sich da nichts ändern” = without a law nothing will change – he is for it.',
      },
      {
        text: 'Anja, 36, Dresden: Viele finden Homeoffice toll, und ein, zwei Tage pro Woche sind auch für mich in Ordnung. Aber ich mache mir Sorgen: Wenn es ein Recht darauf gibt, sparen die Firmen bald Büros und schicken alle nach Hause, ob sie wollen oder nicht. Mir würden meine Kolleginnen und Kollegen sehr fehlen. Ein Gesetz halte ich für keine gute Idee.',
        q: 'Ist Anja für ein Recht auf Homeoffice?',
        o: ['Ja', 'Nein'],
        a: 1,
        ex: 'She likes one or two days at home, but “Ein Gesetz halte ich für keine gute Idee” = I don’t think a law is a good idea.',
      },
      {
        text: 'Robert, 63, Bremen: Ich habe Probleme mit dem Rücken, und die lange Autofahrt ins Büro ist für mich jeden Tag eine Qual. Zu Hause kann ich mir die Zeit besser einteilen und zwischendurch eine Pause machen. Gerade für ältere Menschen wie mich wäre ein Recht auf Homeoffice eine große Hilfe. Dann könnten wir länger im Beruf bleiben.',
        q: 'Ist Robert für ein Recht auf Homeoffice?',
        o: ['Ja', 'Nein'],
        a: 0,
        ex: '“Gerade für ältere Menschen wie mich wäre ein Recht auf Homeoffice eine große Hilfe” = a right to work from home would be a great help for older people like me.',
      },
      {
        text: 'Sabine, 45, München: Ich arbeite manchmal zu Hause, und das funktioniert gut, wenn die Kinder in der Schule sind. Aber dafür brauchen wir wirklich kein neues Gesetz. In meiner Firma vereinbaren Chef und Mitarbeiter das einfach im Gespräch. Ich finde, der Staat muss nicht alles regeln.',
        q: 'Ist Sabine für ein Recht auf Homeoffice?',
        o: ['Ja', 'Nein'],
        a: 1,
        ex: 'Working from home is fine for her, but “dafür brauchen wir wirklich kein neues Gesetz” = we really don’t need a new law for that; “der Staat muss nicht alles regeln” = the state doesn’t have to regulate everything.',
      },
      {
        text: 'Felix, 24, Berlin: Viele Ältere sagen, junge Leute lernen im Büro mehr, weil sie dort die Kollegen direkt fragen können. Das stimmt vielleicht. Trotzdem: Ich habe gerade meinen ersten Job angefangen, und ohne Homeoffice könnte ich mir die teure Wohnung in der Stadt gar nicht leisten. Ich wohne deshalb weit draußen. Ein gesetzliches Recht würde mir viel Sicherheit geben.',
        q: 'Ist Felix für ein Recht auf Homeoffice?',
        o: ['Ja', 'Nein'],
        a: 0,
        ex: 'He first mentions the counter-argument (“Das stimmt vielleicht”), then “Trotzdem … Ein gesetzliches Recht würde mir viel Sicherheit geben” = a legal right would give me a lot of security.',
      },
    ],
  });

  add({
    id: 'mock-b1-lesen-5',
    level: 'B1',
    exam: 'goethe',
    module: 'lesen',
    teil: 5,
    title: 'Lesen Teil 5 – Regeln und Hinweise',
    en: 'A set of rules (library user regulations) – four a/b/c questions.',
    minutes: 10,
    instr: 'Lesen Sie die Aufgaben 27 bis 30 und den Text dazu. Wählen Sie bei jeder Aufgabe die richtige Lösung a, b oder c. Sie informieren sich über die Benutzungsordnung der Stadtbibliothek.',
    instrEn: 'Read tasks 27 to 30 and the text. For each task choose the right answer a, b or c. You are reading the user regulations of the city library.',
    tip: 'Read the questions first, then use the paragraph headings (§ 1, § 2 …) to find the right place. Watch out for small words like “nur”, “bis zu”, “nicht” – they decide the answer.',
    gloss: [
      ['die Benutzungsordnung', 'user regulations'],
      ['der Bibliotheksausweis', 'library card'],
      ['die Ausleihe', 'lending'],
      ['die Leihfrist', 'loan period'],
      ['verlängern', 'to renew, extend'],
      ['vorbestellen', 'to reserve'],
      ['der Lesesaal', 'reading room'],
      ['die Gebühr', 'fee'],
      ['der Rückgabekasten', 'return box'],
      ['die Theke', 'counter'],
    ],
    kind: 'mc',
    text:
      'Stadtbibliothek Hellbrück – Benutzungsordnung (Auszug)\n\n' +
      '§ 1 Bibliotheksausweis\nFür die Ausleihe brauchen Sie einen Bibliotheksausweis. Sie bekommen ihn an der Information, wenn Sie Ihren Personalausweis oder Reisepass vorlegen. Der Ausweis kostet für Erwachsene 15 € pro Jahr. Kinder und Jugendliche bis 18 Jahre, Schülerinnen und Schüler sowie Studierende zahlen nichts. Kinder unter 14 Jahren brauchen die Unterschrift eines Elternteils.\n\n' +
      '§ 2 Ausleihe und Verlängerung\nBücher, Hörbücher und Zeitschriften können Sie vier Wochen ausleihen, DVDs und Konsolenspiele nur eine Woche. Sie können die Leihfrist bis zu zweimal online oder am Telefon verlängern, wenn keine andere Person das Medium vorbestellt hat. Die neueste Ausgabe von Zeitungen und Zeitschriften kann nicht ausgeliehen werden; Sie können sie im Lesesaal lesen.\n\n' +
      '§ 3 Rückgabe und Gebühren\nFür jede Woche, die Sie ein Medium zu spät zurückgeben, zahlen Sie 1 € pro Medium. Außerhalb der Öffnungszeiten können Sie Bücher und Zeitschriften in den Rückgabekasten am Haupteingang werfen. DVDs und Spiele geben Sie bitte nur an der Theke zurück, da sie im Kasten leicht kaputtgehen.\n\n' +
      '§ 4 Aufenthalt in der Bibliothek\nDie Arbeitsplätze im ersten Stock sind für ruhiges Lernen reserviert; Gespräche und Telefonate sind dort nicht erlaubt. Gruppenräume für bis zu sechs Personen können Sie an der Information für maximal drei Stunden reservieren. Getränke in geschlossenen Flaschen dürfen Sie überall mitnehmen, Essen ist nur in der Cafeteria im Erdgeschoss erlaubt.',
    items: [
      {
        q: 'Einen Bibliotheksausweis …',
        o: [
          'können Kinder unter 14 Jahren allein beantragen.',
          'kann man nur online beantragen.',
          'bekommen Studierende kostenlos.',
        ],
        a: 2,
        ex: '“Schülerinnen und Schüler sowie Studierende zahlen nichts” = pupils and students pay nothing. Children under 14 need “die Unterschrift eines Elternteils” (a parent’s signature); you get the card “an der Information”.',
      },
      {
        q: 'Eine DVD …',
        o: [
          'kann man vier Wochen behalten.',
          'darf man nicht in den Rückgabekasten werfen.',
          'kann man dreimal verlängern.',
        ],
        a: 1,
        ex: '“DVDs und Spiele geben Sie bitte nur an der Theke zurück” = please return DVDs and games only at the counter. DVDs are lent for only one week, and you can renew “bis zu zweimal” (up to twice).',
      },
      {
        q: 'Die neueste Ausgabe einer Zeitschrift …',
        o: [
          'kann man nur in der Bibliothek lesen.',
          'kann man eine Woche ausleihen.',
          'muss man vorher reservieren.',
        ],
        a: 0,
        ex: '“Die neueste Ausgabe … kann nicht ausgeliehen werden; Sie können sie im Lesesaal lesen” = it can’t be borrowed; you can read it in the reading room.',
      },
      {
        q: 'In der Bibliothek …',
        o: [
          'darf man an den Arbeitsplätzen im ersten Stock telefonieren.',
          'kann man einen Gruppenraum für einen ganzen Tag reservieren.',
          'darf man Wasser in einer geschlossenen Flasche dabeihaben.',
        ],
        a: 2,
        ex: '“Getränke in geschlossenen Flaschen dürfen Sie überall mitnehmen” = you may take drinks in closed bottles everywhere. Phone calls on the first floor are “nicht erlaubt”; group rooms only “für maximal drei Stunden”.',
      },
    ],
  });

  /* ───────────────────────── HÖREN ───────────────────────── */

  const h1t1 = [
    ['lisa', 'Hallo, hier ist Lisa. Es geht um unsere Fahrradtour am Samstag. Die findet natürlich statt, das Wetter soll ja super werden!'],
    ['lisa', 'Aber es gibt eine kleine Änderung: Wir treffen uns nicht um neun Uhr am Bahnhof, sondern um halb zehn am Marktplatz, vor dem Rathaus.'],
    ['lisa', 'Am Bahnhof ist am Samstag nämlich eine Baustelle, da kann man die Räder nicht abstellen. Bring bitte deinen Helm und genug zu trinken mit. Belegte Brote mache ich für alle. Bis Samstag!'],
  ];
  const h1t2 = [
    ['_', 'Und nun die Verkehrsmeldungen. Auf der A5 zwischen Darmstadt und Frankfurt-Süd gibt es nach einem Unfall zwölf Kilometer Stau. Bitte rechnen Sie mit mindestens einer Stunde Verspätung.'],
    ['_', 'Und eine Information für alle, die mit der S-Bahn fahren: Wegen Bauarbeiten fährt die S3 am kommenden Wochenende nicht zwischen Hauptbahnhof und Flughafen.'],
    ['_', 'Statt der Bahnen fahren Busse, alle fünfzehn Minuten. Ab Montag früh fährt die S3 dann wieder normal.'],
  ];
  const h1t3 = [
    ['vogel', 'Liebe Kundinnen und Kunden, herzlich willkommen im Baumarkt Werner! Nur heute: alle Gartenmöbel dreißig Prozent günstiger – Sie finden sie im Erdgeschoss neben dem Eingang.'],
    ['vogel', 'Und um fünfzehn Uhr gibt es in unserer Gartenabteilung eine kostenlose Beratung zum Thema Balkonpflanzen.'],
    ['vogel', 'Weil schon so viele Kunden danach gefragt haben, bieten wir die Beratung heute zusätzlich noch einmal um siebzehn Uhr an. Wir freuen uns auf Sie!'],
  ];
  const h1t4 = [
    ['_', 'Das Wetter am Wochenende: Am Samstag scheint in ganz Deutschland die Sonne. Die Temperaturen steigen auf zweiundzwanzig bis sechsundzwanzig Grad.'],
    ['_', 'Am Sonntag kommen dann von Westen Wolken. Im Süden bleibt es bis zum Abend freundlich, im Norden muss man aber schon ab Mittag mit Gewittern rechnen.'],
    ['_', 'Dabei wird es deutlich kühler, mit Höchstwerten zwischen sechzehn und neunzehn Grad.'],
  ];
  const h1t5 = [
    ['meier', 'Guten Tag, Herr Demir, hier ist die Zahnarztpraxis Dr. Berg. Leider müssen wir Ihren Termin am Donnerstag absagen, Frau Doktor Berg ist krank.'],
    ['meier', 'Wir können Ihnen einen neuen Termin am Montag um acht Uhr fünfzehn anbieten, oder am Dienstagnachmittag.'],
    ['meier', 'Bitte rufen Sie uns bis Freitag zurück und sagen Sie uns, welcher Termin für Sie besser passt. Unsere Nummer ist null sechs eins drei eins, vier vier zwei null acht. Vielen Dank und auf Wiederhören!'],
  ];

  add({
    id: 'mock-b1-hoeren-1',
    level: 'B1',
    exam: 'goethe',
    module: 'hoeren',
    teil: 1,
    title: 'Hören Teil 1 – Kurze Texte',
    en: 'Five short texts (messages, announcements, radio) – two tasks each: right/wrong and a/b/c. You hear each text twice.',
    minutes: 10,
    plays: 2,
    instr: 'Sie hören nun fünf kurze Texte. Sie hören jeden Text zweimal. Zu jedem Text lösen Sie zwei Aufgaben. Wählen Sie bei jeder Aufgabe die richtige Lösung.',
    instrEn: 'You will hear five short texts. You hear each text twice. For each text you solve two tasks. Choose the right answer for each task.',
    tip: 'Read both tasks before you listen. The right answer is often a correction: “nicht um neun …, sondern um halb zehn”. Use the first listening for the Richtig/Falsch statement and the second to check the a/b/c detail.',
    gloss: [
      ['die Änderung', 'change'],
      ['die Baustelle', 'construction site'],
      ['der Stau', 'traffic jam'],
      ['die Bauarbeiten (Pl.)', 'construction work'],
      ['zusätzlich', 'additionally'],
      ['die Beratung', 'advice session'],
      ['das Gewitter', 'thunderstorm'],
      ['absagen', 'to cancel'],
      ['zurückrufen', 'to call back'],
    ],
    kind: 'mc',
    items: [
      {
        audio: h1t1,
        q: 'Die Fahrradtour am Samstag fällt aus.',
        o: ['Richtig', 'Falsch'],
        a: 1,
        ex: '“Die findet natürlich statt” = of course it takes place. Only the meeting point and time change.',
      },
      {
        audio: h1t1,
        q: 'Wo treffen sich die Freunde?',
        o: ['am Bahnhof', 'am Marktplatz', 'vor Lisas Wohnung'],
        a: 1,
        ex: '“nicht um neun Uhr am Bahnhof, sondern um halb zehn am Marktplatz” = not at the station but at the market square (there is a construction site at the station).',
      },
      {
        audio: h1t2,
        q: 'Auf der A5 gibt es einen langen Stau.',
        o: ['Richtig', 'Falsch'],
        a: 0,
        ex: '“Auf der A5 … gibt es nach einem Unfall zwölf Kilometer Stau” = a 12-kilometre traffic jam after an accident.',
      },
      {
        audio: h1t2,
        q: 'Was gilt für die S3 am Wochenende?',
        o: ['Sie fährt nur einmal pro Stunde.', 'Statt der Bahn fahren Busse.', 'Sie fährt wie immer.'],
        a: 1,
        ex: '“Statt der Bahnen fahren Busse, alle fünfzehn Minuten” = buses run instead of the trains, every fifteen minutes. The S3 runs normally again only from Monday.',
      },
      {
        audio: h1t3,
        q: 'Im Baumarkt sind heute alle Produkte billiger.',
        o: ['Richtig', 'Falsch'],
        a: 1,
        ex: 'Only the garden furniture is cheaper: “Nur heute: alle Gartenmöbel dreißig Prozent günstiger”.',
      },
      {
        audio: h1t3,
        q: 'Wann gibt es eine zusätzliche Beratung zu Balkonpflanzen?',
        o: ['um 15 Uhr', 'um 16 Uhr', 'um 17 Uhr'],
        a: 2,
        ex: '15 Uhr is the normal session; “bieten wir die Beratung heute zusätzlich noch einmal um siebzehn Uhr an” = additionally once more at 5 pm.',
      },
      {
        audio: h1t4,
        q: 'Am Samstag wird das Wetter überall schön.',
        o: ['Richtig', 'Falsch'],
        a: 0,
        ex: '“Am Samstag scheint in ganz Deutschland die Sonne” = on Saturday the sun shines all over Germany.',
      },
      {
        audio: h1t4,
        q: 'Was passiert am Sonntag?',
        o: [
          'Im Norden kann es ab Mittag Gewitter geben.',
          'Im Süden regnet es den ganzen Tag.',
          'Es wird wärmer als am Samstag.',
        ],
        a: 0,
        ex: '“im Norden muss man aber schon ab Mittag mit Gewittern rechnen” = in the north you must expect thunderstorms from midday. The south stays “freundlich”, and it gets “deutlich kühler” (much cooler).',
      },
      {
        audio: h1t5,
        q: 'Der Termin am Donnerstag findet nicht statt.',
        o: ['Richtig', 'Falsch'],
        a: 0,
        ex: '“Leider müssen wir Ihren Termin am Donnerstag absagen” = unfortunately we have to cancel your appointment on Thursday.',
      },
      {
        audio: h1t5,
        q: 'Was soll Herr Demir tun?',
        o: ['bis Freitag in der Praxis anrufen', 'am Montag um 8:15 Uhr kommen', 'eine E-Mail an die Praxis schreiben'],
        a: 0,
        ex: '“Bitte rufen Sie uns bis Freitag zurück” = please call us back by Friday. Monday 8:15 is only one of two offered appointments – he must choose first.',
      },
    ],
  });

  add({
    id: 'mock-b1-hoeren-2',
    level: 'B1',
    exam: 'goethe',
    module: 'hoeren',
    teil: 2,
    title: 'Hören Teil 2 – Führung',
    en: 'A guided museum tour – five a/b/c questions. You hear the text only once.',
    minutes: 8,
    plays: 1,
    instr: 'Sie hören einen Text. Sie hören den Text einmal. Dazu lösen Sie fünf Aufgaben. Wählen Sie bei jeder Aufgabe die richtige Lösung a, b oder c. Sie nehmen an einer Führung durch das Textilmuseum Hellbrück teil.',
    instrEn: 'You will hear a text once. You solve five tasks. For each task choose the right answer a, b or c. You are taking part in a guided tour of the Hellbrück textile museum.',
    tip: 'You hear this only once, so read all five questions before the recording starts. The questions follow the order of the talk; numbers and years are typical traps – note them down as you hear them.',
    gloss: [
      ['die Führung', 'guided tour'],
      ['die Tuchfabrik', 'cloth factory'],
      ['der Stoff', 'fabric'],
      ['der Webstuhl', 'loom'],
      ['weben', 'to weave'],
      ['schwerhörig', 'hard of hearing'],
      ['die Sonderausstellung', 'special exhibition'],
      ['der Eintritt', 'admission'],
      ['das Schließfach', 'locker'],
      ['die Renovierung', 'renovation'],
    ],
    kind: 'mc',
    audio: [
      ['hoffmann', 'Guten Tag, meine Damen und Herren, und herzlich willkommen im Textilmuseum Hellbrück. Ich begleite Sie heute durch unser Haus.'],
      ['hoffmann', 'Normalerweise dauern unsere Führungen anderthalb Stunden. Heute Nachmittag kommt aber noch eine Schulklasse, deshalb machen wir es etwas kürzer: Wir brauchen etwa eine Stunde.'],
      ['hoffmann', 'Bevor wir anfangen, noch eine Bitte: Fotografieren ist überall erlaubt, aber bitte ohne Blitz. Rucksäcke und große Taschen schließen Sie bitte in die Schließfächer neben der Kasse ein.'],
      ['hoffmann', 'Wir stehen hier in der alten Tuchfabrik. Sie wurde 1872 gebaut, und bis 1978 haben hier Menschen Stoffe hergestellt.'],
      ['hoffmann', 'In den besten Jahren arbeiteten hier über achthundert Menschen, viele davon Frauen und sogar Kinder ab zwölf Jahren.'],
      ['hoffmann', 'Dann ging die Produktion ins Ausland, und das Gebäude stand fast zwanzig Jahre leer. Erst 1997 hat die Stadt es gekauft und hier das Museum eröffnet.'],
      ['hoffmann', 'Gleich gehen wir in die Webhalle im Erdgeschoss. Dort stehen Maschinen, die noch heute funktionieren. Selbst bedienen dürfen Sie sie aber aus Sicherheitsgründen leider nicht.'],
      ['hoffmann', 'Zweimal am Tag, um elf und um fünfzehn Uhr, zeigt Ihnen Herr Lehmann, wie ein Webstuhl arbeitet. Er hat selbst dreißig Jahre hier in der Fabrik gearbeitet.'],
      ['hoffmann', 'Halten Sie sich dann ruhig die Ohren zu – es ist sehr laut. Früher sind viele Arbeiterinnen davon schwerhörig geworden.'],
      ['hoffmann', 'Im ersten Stock zeigen wir, wie die Familien der Arbeiter gelebt haben. Dort haben wir eine Arbeiterwohnung aus dem Jahr 1900 nachgebaut: zwei kleine Zimmer für sechs, sieben Personen.'],
      ['hoffmann', 'Ganz neu ist unsere Sonderausstellung im zweiten Stock: „Mode aus zweiter Hand“. Dort geht es um die Frage, was mit unserer alten Kleidung passiert.'],
      ['hoffmann', 'Die Ausstellung ist noch bis Ende Oktober zu sehen. Sie brauchen dafür kein extra Ticket – sie ist im normalen Eintrittspreis schon enthalten.'],
      ['hoffmann', 'Am Ende der Führung kommen wir in unsere Museumswerkstatt. Dort können Sie selbst an einem kleinen Webrahmen ein Armband weben, und das dürfen Sie natürlich mit nach Hause nehmen.'],
      ['hoffmann', 'Wer danach eine Pause braucht: Unser Museumscafé ist zurzeit leider wegen Renovierung geschlossen. Aber direkt gegenüber gibt es eine Bäckerei mit Sitzplätzen.'],
      ['hoffmann', 'So, wenn Sie keine Fragen mehr haben, gehen wir jetzt los. Bitte folgen Sie mir.'],
    ],
    items: [
      {
        q: 'Wie lange dauert die Führung heute?',
        o: ['etwa eine Stunde', 'anderthalb Stunden', 'den ganzen Nachmittag'],
        a: 0,
        ex: '“Normalerweise … anderthalb Stunden … Wir brauchen etwa eine Stunde” = normally 90 minutes, but today about one hour because of a school class.',
      },
      {
        q: 'Das Museum …',
        o: ['wurde 1872 eröffnet.', 'war früher eine Schule.', 'ist seit 1997 in der alten Fabrik.'],
        a: 2,
        ex: '1872 is when the factory was built. “Erst 1997 hat die Stadt es gekauft und hier das Museum eröffnet” = only in 1997 did the city buy it and open the museum here.',
      },
      {
        q: 'In der Webhalle …',
        o: [
          'dürfen die Besucher die Maschinen selbst bedienen.',
          'zeigt ein früherer Mitarbeiter, wie ein Webstuhl funktioniert.',
          'ist es heute ganz ruhig.',
        ],
        a: 1,
        ex: 'Herr Lehmann “hat selbst dreißig Jahre hier in der Fabrik gearbeitet” = worked in the factory himself for 30 years. Visitors may NOT operate the machines (“dürfen Sie … leider nicht”), and “es ist sehr laut”.',
      },
      {
        q: 'Die Sonderausstellung …',
        o: [
          'kostet keinen zusätzlichen Eintritt.',
          'ist nur noch bis Ende September geöffnet.',
          'zeigt, wie Arbeiterfamilien gewohnt haben.',
        ],
        a: 0,
        ex: '“Sie brauchen dafür kein extra Ticket – sie ist im normalen Eintrittspreis schon enthalten” = no extra ticket, it’s included in the normal price. It runs until the end of October; the workers’ flat is on the first floor.',
      },
      {
        q: 'Was können die Besucher am Ende der Führung machen?',
        o: ['im Museumscafé etwas trinken', 'selbst ein Armband weben', 'mit Herrn Lehmann sprechen'],
        a: 1,
        ex: '“Dort können Sie selbst an einem kleinen Webrahmen ein Armband weben” = you can weave a bracelet yourself. The café is “wegen Renovierung geschlossen” (closed for renovation).',
      },
    ],
  });

  add({
    id: 'mock-b1-hoeren-3',
    level: 'B1',
    exam: 'goethe',
    module: 'hoeren',
    teil: 3,
    title: 'Hören Teil 3 – Gespräch',
    en: 'An everyday conversation between two acquaintances – seven right/wrong statements. You hear it only once.',
    minutes: 8,
    plays: 1,
    instr: 'Sie hören ein Gespräch. Sie hören das Gespräch einmal. Dazu lösen Sie sieben Aufgaben. Wählen Sie: Sind die Aussagen Richtig oder Falsch? Sie sind im Bus und hören, wie sich eine Frau und ein Mann unterhalten.',
    instrEn: 'You will hear a conversation once. You solve seven tasks. Choose: are the statements right or wrong? You are on a bus and hear a woman and a man talking.',
    tip: 'Read the seven statements before listening and notice who each one is about (Jana or Tim). Plans that were changed (“Eigentlich wollte ich …, aber …”) are a classic trap.',
    gloss: [
      ['der Flohmarkt', 'flea market'],
      ['der Stand', 'stall'],
      ['sich lohnen', 'to be worth it'],
      ['die Kasse', 'cash box, till'],
      ['das Umzugsunternehmen', 'removal company'],
      ['der Transporter', 'van'],
      ['Bescheid sagen', 'to let someone know'],
      ['loswerden', 'to get rid of'],
      ['die Kleinanzeige', 'classified ad'],
      ['abholen', 'to pick up'],
    ],
    kind: 'mc',
    audio: [
      ['jana', 'Hallo Tim! So früh schon unterwegs? Du fährst doch sonst immer mit dem Rad zur Arbeit.'],
      ['tim', 'Hallo Jana! Normalerweise schon, aber mein Fahrrad ist seit letzter Woche kaputt. In der Werkstatt haben sie gesagt, die Reparatur dauert noch bis Freitag.'],
      ['jana', 'So ein Pech! Sag mal, was hast du eigentlich am Sonntag gemacht? Ich habe dich auf dem Flohmarkt am Hafen gesucht.'],
      ['tim', 'Da war ich gar nicht. Eigentlich wollte ich hin, aber meine Schwester hatte Geburtstag, und wir haben bei meinen Eltern gefeiert. Wie war es denn?'],
      ['jana', 'Super! Ich hatte zum ersten Mal einen eigenen Stand. Ich habe fast alle Kinderkleider von Paul verkauft und auch seine alten Spielsachen.'],
      ['tim', 'Und? Hat sich das gelohnt?'],
      ['jana', 'Na ja, reich bin ich nicht geworden. Der Stand hat zwölf Euro gekostet, und am Ende hatte ich ungefähr fünfzig Euro in der Kasse. Aber das Wichtigste ist: Der Keller ist endlich leer!'],
      ['tim', 'Das klingt gut. Ich muss auch dringend aufräumen. Anna und ich ziehen ja Anfang Dezember in die neue Wohnung.'],
      ['jana', 'Stimmt, das hast du erzählt. Habt ihr schon ein Umzugsunternehmen gefunden?'],
      ['tim', 'Nein, das ist uns zu teuer. Wir machen das mit Freunden. Ich habe schon einen Transporter reserviert, für Samstag, den zweiten Dezember.'],
      ['jana', 'Wenn ihr noch Leute braucht, sag einfach Bescheid. Mein Mann und ich können gern mittragen.'],
      ['tim', 'Echt? Das wäre toll, danke! Vorher möchte ich aber noch ein paar Möbel loswerden. Das alte Sofa zum Beispiel passt nicht in die neue Wohnung. Wann ist denn der nächste Flohmarkt?'],
      ['jana', 'Der am Hafen ist nur einmal im Monat, der nächste also am fünfzehnten November. Aber für Möbel ist der nicht so gut. Die meisten Leute kommen ja zu Fuß oder mit dem Fahrrad.'],
      ['tim', 'Hm, da hast du recht. Was würdest du denn machen?'],
      ['jana', 'Stell das Sofa doch ins Internet, auf eine Seite für Kleinanzeigen. Dann kommen die Käufer selbst und holen es ab. So haben wir letztes Jahr unseren alten Schrank verkauft.'],
      ['tim', 'Gute Idee, das probiere ich heute Abend gleich aus. Oh, hier muss ich aussteigen. Bis bald, Jana!'],
      ['jana', 'Tschüss, Tim, und viel Glück mit dem Sofa!'],
    ],
    items: [
      {
        q: 'Tim fährt heute mit dem Bus, weil sein Fahrrad kaputt ist.',
        o: ['Richtig', 'Falsch'],
        a: 0,
        ex: '“Normalerweise schon, aber mein Fahrrad ist seit letzter Woche kaputt” = usually yes, but my bike has been broken since last week.',
      },
      {
        q: 'Tim war am Sonntag auf dem Flohmarkt.',
        o: ['Richtig', 'Falsch'],
        a: 1,
        ex: '“Da war ich gar nicht. Eigentlich wollte ich hin, aber meine Schwester hatte Geburtstag” = I wasn’t there at all; I wanted to go, but it was my sister’s birthday.',
      },
      {
        q: 'Jana hat auf dem Flohmarkt vor allem Sachen von ihrem Kind verkauft.',
        o: ['Richtig', 'Falsch'],
        a: 0,
        ex: '“Ich habe fast alle Kinderkleider von Paul verkauft und auch seine alten Spielsachen” = almost all of Paul’s children’s clothes and his old toys.',
      },
      {
        q: 'Jana hat auf dem Flohmarkt viel Geld verdient.',
        o: ['Richtig', 'Falsch'],
        a: 1,
        ex: '“reich bin ich nicht geworden” = I didn’t get rich – about fifty euros minus twelve for the stall. For her, the empty cellar is the most important thing.',
      },
      {
        q: 'Tim und Anna ziehen mit einem Umzugsunternehmen um.',
        o: ['Richtig', 'Falsch'],
        a: 1,
        ex: '“Nein, das ist uns zu teuer. Wir machen das mit Freunden” = no, that’s too expensive for us; we’re doing it with friends.',
      },
      {
        q: 'Jana bietet Tim Hilfe beim Umzug an.',
        o: ['Richtig', 'Falsch'],
        a: 0,
        ex: '“Mein Mann und ich können gern mittragen” = my husband and I are happy to help carry.',
      },
      {
        q: 'Jana empfiehlt Tim, das Sofa auf dem Flohmarkt zu verkaufen.',
        o: ['Richtig', 'Falsch'],
        a: 1,
        ex: 'Jana says about the flea market: “für Möbel ist der nicht so gut” (not so good for furniture); she says “Stell das Sofa doch ins Internet, auf eine Seite für Kleinanzeigen” = put the sofa on a classified-ads website.',
      },
    ],
  });

  add({
    id: 'mock-b1-hoeren-4',
    level: 'B1',
    exam: 'goethe',
    module: 'hoeren',
    teil: 4,
    title: 'Hören Teil 4 – Diskussion',
    en: 'A radio discussion with a presenter and two guests – decide who says what. You hear it twice.',
    minutes: 12,
    plays: 2,
    instr: 'Sie hören eine Diskussion. Sie hören die Diskussion zweimal. Dazu lösen Sie acht Aufgaben. Ordnen Sie die Aussagen zu: Wer sagt was? Die Moderatorin der Radiosendung „Treffpunkt Alltag“ diskutiert mit Frau Richter, Ernährungsberaterin, und Herrn Krüger, Chef einer Firma für Haustechnik, über das Thema „Gesundes Essen am Arbeitsplatz“.',
    instrEn: 'You will hear a discussion twice. You solve eight tasks. Match the statements: who says what? The presenter of the radio programme “Treffpunkt Alltag” talks with Ms Richter, a nutrition adviser, and Mr Krüger, head of a plumbing and heating company, about healthy eating at work.',
    tip: 'The statements are paraphrases, not the exact words, and they follow the order of the discussion. The presenter (Moderatorin) usually gets one or two statements too – often when she reports listeners’ opinions or talks about herself.',
    gloss: [
      ['die Ernährungsberaterin', 'nutrition adviser'],
      ['die Haustechnik', 'building services (heating, plumbing)'],
      ['die Kantine', 'staff canteen'],
      ['sich einmischen', 'to interfere'],
      ['die Krankmeldung', 'sick note, sick leave'],
      ['die Stimmung', 'mood, atmosphere'],
      ['der Automat', 'vending machine'],
      ['das Vorbild', 'role model'],
      ['der Lohn', 'wage'],
      ['sich etwas leisten können', 'to be able to afford sth.'],
    ],
    kind: 'mc',
    audio: [
      ['_', 'Guten Abend und herzlich willkommen zu „Treffpunkt Alltag“. Unser Thema heute: gesundes Essen am Arbeitsplatz. Viele Menschen essen mittags nur schnell ein Brötchen am Schreibtisch – oder gar nichts.'],
      ['_', 'Müssen die Arbeitgeber etwas dagegen tun? Darüber spreche ich mit Frau Richter, Ernährungsberaterin aus Köln, und mit Herrn Krüger. Er leitet eine Firma für Haustechnik mit vierzig Mitarbeitern.'],
      ['_', 'Frau Richter, wie sieht die Mittagspause in deutschen Firmen heute aus?'],
      ['richter', 'Leider oft nicht gut. Etwa ein Drittel der Berufstätigen macht überhaupt keine richtige Pause. Man isst nebenbei, liest dabei E-Mails, und am Nachmittag ist man müde und unkonzentriert.'],
      ['richter', 'Das Problem ist nicht nur, was man isst, sondern auch, wie man isst. Wer sich Zeit nimmt und in Ruhe isst, isst automatisch weniger und gesünder.'],
      ['_', 'Herr Krüger, in Ihrer Firma gibt es keine Kantine. Wie essen Ihre Mitarbeiter?'],
      ['krueger', 'Die meisten meiner Leute sind ja den ganzen Tag bei Kunden unterwegs – sie reparieren Heizungen oder bauen Bäder ein. Da wäre eine Kantine sowieso keine Lösung.'],
      ['krueger', 'Und ehrlich gesagt habe ich früher gedacht: Was meine Mitarbeiter essen, ist ihre Privatsache. Da will ich mich als Chef nicht einmischen.'],
      ['_', 'Und heute sehen Sie das anders?'],
      ['krueger', 'Teilweise. Vor zwei Jahren hatten wir im Winter sehr viele Krankmeldungen. Da habe ich angefangen, jeden Morgen frisches Obst in die Werkstatt zu stellen. Das kostet mich ungefähr hundert Euro im Monat.'],
      ['krueger', 'Und siehe da: Das Obst ist jeden Tag weg. Ob die Leute deshalb weniger krank sind, kann ich nicht sagen. Aber die Stimmung im Team ist viel besser geworden.'],
      ['_', 'Also kleine Schritte statt großer Programme. Frau Richter, reicht das?'],
      ['richter', 'Obst ist ein guter Anfang, keine Frage. Aber es nützt wenig, wenn gleichzeitig im Pausenraum ein Automat mit Schokoriegeln und süßen Getränken steht.'],
      ['richter', 'Ich rate Firmen, lieber Wasser kostenlos anzubieten. Das ist billig und hat trotzdem eine große Wirkung.'],
      ['_', 'Viele Hörerinnen und Hörer haben uns geschrieben: Sie würden gern gesünder essen, aber das Essen in der Kantine ist ihnen zu teuer. Sollte der Arbeitgeber das Mittagessen bezahlen?'],
      ['krueger', 'Für eine kleine Firma wie meine ist das unmöglich. Ich zahle faire Löhne. Wenn ich auch noch das Mittagessen bezahle, muss ich die Preise für meine Kunden erhöhen.'],
      ['richter', 'Das verstehe ich. Es muss auch gar nicht immer Geld sein. Oft hilft es schon, wenn der Chef selbst eine richtige Pause macht und mit seinen Leuten zusammen isst. Chefs sind Vorbilder.'],
      ['_', 'Herr Krüger, essen Sie denn mittags mit Ihren Mitarbeitern?'],
      ['krueger', 'Ehrlich gesagt: zu selten. Aber freitags grillen wir manchmal zusammen auf dem Hof. Das ist immer sehr nett.'],
      ['_', 'Zum Schluss: Was kann jeder Einzelne tun?'],
      ['richter', 'Ganz einfach: Planen Sie Ihre Pause wie einen Termin – und verlassen Sie dafür den Schreibtisch. Schon zwanzig Minuten können viel bewirken.'],
      ['_', 'Ein guter Rat, den ich mir selbst zu Herzen nehme. Ich esse nämlich auch viel zu oft vor dem Bildschirm. Frau Richter, Herr Krüger, vielen Dank für das Gespräch!'],
    ],
    items: [
      {
        q: 'Nicht nur das Essen selbst ist wichtig, sondern auch, dass man sich dafür Zeit nimmt.',
        o: ['Moderatorin', 'Frau Richter', 'Herr Krüger'],
        a: 1,
        ex: 'Frau Richter: “Das Problem ist nicht nur, was man isst, sondern auch, wie man isst. Wer sich Zeit nimmt und in Ruhe isst …”',
      },
      {
        q: 'Früher fand ich, dass das Essen der Mitarbeiter den Chef nichts angeht.',
        o: ['Moderatorin', 'Frau Richter', 'Herr Krüger'],
        a: 2,
        ex: 'Herr Krüger: “früher habe ich gedacht: Was meine Mitarbeiter essen, ist ihre Privatsache” = used to think it was their private matter.',
      },
      {
        q: 'Eine kleine Maßnahme hat die Atmosphäre in der Firma verbessert.',
        o: ['Moderatorin', 'Frau Richter', 'Herr Krüger'],
        a: 2,
        ex: 'Herr Krüger about the fruit: “die Stimmung im Team ist viel besser geworden” = the team atmosphere has become much better.',
      },
      {
        q: 'Kostenloses Wasser für die Mitarbeiter ist billig und hilft viel.',
        o: ['Moderatorin', 'Frau Richter', 'Herr Krüger'],
        a: 1,
        ex: 'Frau Richter: “lieber Wasser kostenlos anzubieten. Das ist billig und hat trotzdem eine große Wirkung” = offer free water – cheap but very effective.',
      },
      {
        q: 'Viele Menschen finden das Kantinenessen zu teuer.',
        o: ['Moderatorin', 'Frau Richter', 'Herr Krüger'],
        a: 0,
        ex: 'The presenter reports listeners’ letters: “das Essen in der Kantine ist ihnen zu teuer” = canteen food is too expensive for them.',
      },
      {
        q: 'Ein kostenloses Mittagessen für alle kann sich meine Firma nicht leisten.',
        o: ['Moderatorin', 'Frau Richter', 'Herr Krüger'],
        a: 2,
        ex: 'Herr Krüger: “Für eine kleine Firma wie meine ist das unmöglich” – otherwise he would have to raise his prices.',
      },
      {
        q: 'Vorgesetzte sollten beim Thema Pause ein gutes Beispiel geben.',
        o: ['Moderatorin', 'Frau Richter', 'Herr Krüger'],
        a: 1,
        ex: 'Frau Richter: “wenn der Chef selbst eine richtige Pause macht … Chefs sind Vorbilder” = bosses are role models.',
      },
      {
        q: 'Ich esse selbst oft am Computer.',
        o: ['Moderatorin', 'Frau Richter', 'Herr Krüger'],
        a: 0,
        ex: 'The presenter at the end: “Ich esse nämlich auch viel zu oft vor dem Bildschirm” = I also eat far too often in front of the screen.',
      },
    ],
  });

  /* ───────────────────────── SCHREIBEN ───────────────────────── */

  add({
    id: 'mock-b1-schreiben-1',
    level: 'B1',
    exam: 'goethe',
    module: 'schreiben',
    teil: 1,
    title: 'Schreiben Aufgabe 1 – E-Mail an einen Freund',
    en: 'An informal email to a friend about something you did – cover three points in about 80 words.',
    minutes: 20,
    instr: 'Schreiben Sie eine E-Mail (circa 80 Wörter). Schreiben Sie etwas zu allen drei Punkten. Achten Sie auf den Textaufbau (Anrede, Einleitung, Reihenfolge der Inhaltspunkte, Schluss).',
    instrEn: 'Write an email (about 80 words). Write something about all three points. Pay attention to the structure (greeting, introduction, order of the points, closing).',
    tip: 'Write one short paragraph per point, in the given order, and link your sentences with weil, deshalb, außerdem. Informal style: du, dich, dir – and a friendly closing like “Viele Grüße”.',
    gloss: [
      ['die Tafel', 'food bank'],
      ['ehrenamtlich helfen', 'to volunteer'],
      ['die Lebensmittel (Pl.)', 'food, groceries'],
      ['sortieren', 'to sort'],
      ['ausgeben', 'to hand out'],
      ['anstrengend', 'tiring'],
      ['dankbar', 'grateful'],
      ['der Vorschlag', 'suggestion'],
    ],
    kind: 'write',
    task: 'Sie haben letzten Samstag zum ersten Mal ehrenamtlich bei der Tafel in Ihrem Stadtteil geholfen. Ihr Freund / Ihre Freundin war nicht dabei.\n\nSchreiben Sie Ihrem Freund / Ihrer Freundin eine E-Mail:\n– Beschreiben Sie: Was haben Sie bei der Tafel gemacht?\n– Begründen Sie: Warum möchten Sie dort weiter helfen?\n– Machen Sie einen Vorschlag, wie Ihr Freund / Ihre Freundin mitmachen kann.',
    taskEn: 'Last Saturday you volunteered at the food bank in your neighbourhood for the first time. Your friend was not there.\n\nWrite an email to your friend:\n– Describe: what did you do at the food bank?\n– Give reasons: why do you want to continue helping there?\n– Make a suggestion how your friend can join in.',
    points: [
      'Beschreiben Sie: Was haben Sie bei der Tafel gemacht?',
      'Begründen Sie: Warum möchten Sie dort weiter helfen?',
      'Machen Sie einen Vorschlag, wie Ihr Freund / Ihre Freundin mitmachen kann.',
    ],
    pointsEn: [
      'Describe: what did you do at the food bank?',
      'Give reasons: why do you want to continue helping there?',
      'Make a suggestion how your friend can join in.',
    ],
    count: 80,
    model:
      'Liebe Sarah,\n\nwie geht es dir? Stell dir vor: Letzten Samstag habe ich zum ersten Mal bei der Tafel in unserem Stadtteil geholfen. Am Vormittag habe ich Obst und Gemüse sortiert, und am Nachmittag habe ich die Lebensmittel an die Kunden ausgegeben. Es war anstrengend, aber sehr schön.\n\nIch möchte unbedingt weitermachen, weil die Leute so dankbar waren und das Team wirklich nett ist. Außerdem finde ich es schlimm, wenn gute Lebensmittel im Müll landen.\n\nHast du nicht Lust, nächsten Samstag mitzukommen? Wir brauchen immer Hilfe, und danach könnten wir zusammen einen Kaffee trinken.\n\nViele Grüße\nDeine Miriam',
    modelEn:
      'Dear Sarah,\n\nhow are you? Imagine: last Saturday I helped at the food bank in our neighbourhood for the first time. In the morning I sorted fruit and vegetables, and in the afternoon I handed out the food to the customers. It was tiring but very nice.\n\nI definitely want to carry on, because the people were so grateful and the team is really nice. Besides, I think it’s terrible when good food ends up in the bin.\n\nWouldn’t you like to come along next Saturday? We always need help, and afterwards we could have a coffee together.\n\nBest wishes,\nMiriam',
    redemittel: [
      ['Stell dir vor: …', 'Imagine: …'],
      ['Letzten Samstag habe ich zum ersten Mal …', 'Last Saturday I … for the first time'],
      ['Es war anstrengend, aber sehr schön.', 'It was tiring but very nice.'],
      ['Ich möchte unbedingt weitermachen, weil …', 'I definitely want to carry on because …'],
      ['Außerdem finde ich es wichtig, dass …', 'Besides, I think it’s important that …'],
      ['Hast du nicht Lust, … mitzukommen?', 'Wouldn’t you like to come along …?'],
      ['Wie wäre es, wenn du …?', 'How about you …?'],
      ['Ich freue mich auf deine Antwort.', 'I look forward to your answer.'],
    ],
    check: [
      'Informal greeting (Liebe/Lieber …) and closing (Viele Grüße)?',
      'All three points answered, in the right order?',
      'Past events in the Perfekt (habe … sortiert, habe … geholfen)?',
      'At least one weil-clause with the verb at the end?',
      'About 80 words?',
    ],
  });

  add({
    id: 'mock-b1-schreiben-2',
    level: 'B1',
    exam: 'goethe',
    module: 'schreiben',
    teil: 2,
    title: 'Schreiben Aufgabe 2 – Meinung im Gästebuch',
    en: 'React to someone’s opinion in an online guest book and give your own opinion in about 80 words.',
    minutes: 25,
    instr: 'Schreiben Sie nun Ihre Meinung (circa 80 Wörter).',
    instrEn: 'Now write your opinion (about 80 words).',
    tip: 'Refer to the quoted opinion first (“Ich verstehe Kai, aber …”), then give your own view with one or two reasons and an example. A short conclusion (“Meiner Meinung nach sollte man …”) rounds it off. No greeting is needed in a guest book.',
    gloss: [
      ['die Innenstadt', 'city centre'],
      ['autofrei', 'car-free'],
      ['der Verkehr', 'traffic'],
      ['die Fußgängerzone', 'pedestrian zone'],
      ['auf etwas angewiesen sein', 'to depend on sth.'],
      ['der Handwerker', 'tradesperson'],
      ['das Fahrzeug', 'vehicle'],
      ['verbieten', 'to ban, forbid'],
    ],
    kind: 'write',
    task: 'Sie haben im Fernsehen eine Diskussionssendung zum Thema „Autofreie Innenstadt“ gesehen. Im Online-Gästebuch der Sendung finden Sie folgende Meinung:\n\n„Ich wohne mitten in der Stadt und finde: Autos haben in der Innenstadt nichts mehr zu suchen. Mit Fahrrad, Bus und Bahn kommt man überall hin – und die Luft wäre endlich sauberer.“ (Kai, 31)\n\nSchreiben Sie nun Ihre Meinung (circa 80 Wörter).',
    taskEn: 'You watched a TV discussion programme on the topic “car-free city centre”. In the programme’s online guest book you find the following opinion:\n\n“I live right in the city and think: cars no longer belong in the city centre. You can get everywhere by bike, bus and train – and the air would finally be cleaner.” (Kai, 31)\n\nNow write your opinion (about 80 words).',
    points: [
      'Reagieren Sie auf Kais Meinung und sagen Sie Ihre eigene Meinung.',
      'Begründen Sie Ihre Meinung (Gründe, Beispiele).',
      'Berichten Sie von Ihren Erfahrungen in Ihrer Stadt oder in Ihrem Heimatland.',
    ],
    pointsEn: [
      'React to Kai’s opinion and give your own opinion.',
      'Give reasons for your opinion (reasons, examples).',
      'Report on your experiences in your town or home country.',
    ],
    count: 80,
    model:
      'Ich verstehe Kai gut, denn in vielen Städten ist der Verkehr wirklich ein großes Problem. Trotzdem bin ich nicht ganz seiner Meinung. Eine Innenstadt ganz ohne Autos ist für viele Menschen schwierig. Meine Großmutter kann zum Beispiel nicht mehr gut laufen und ist auf das Auto angewiesen. Auch Handwerker und Lieferdienste brauchen ihre Fahrzeuge.\n\nIn meiner Heimatstadt gibt es seit ein paar Jahren eine große Fußgängerzone, und das gefällt mir sehr. Meiner Meinung nach sollte man deshalb mehr Radwege bauen und Bus und Bahn billiger machen, aber Autos nicht komplett verbieten.',
    modelEn:
      'I understand Kai well, because in many cities traffic really is a big problem. Still, I don’t completely agree with him. A city centre entirely without cars is difficult for many people. My grandmother, for example, can’t walk well any more and depends on the car. Tradespeople and delivery services also need their vehicles.\n\nIn my home town there has been a large pedestrian zone for a few years, and I like that very much. In my opinion we should therefore build more cycle paths and make buses and trains cheaper, but not ban cars completely.',
    redemittel: [
      ['Ich verstehe …, aber …', 'I understand …, but …'],
      ['Ich bin (nicht ganz) seiner/ihrer Meinung.', 'I (don’t completely) agree with him/her.'],
      ['Meiner Meinung nach …', 'In my opinion …'],
      ['Ein wichtiger Grund ist, dass …', 'An important reason is that …'],
      ['zum Beispiel …', 'for example …'],
      ['In meiner Heimatstadt / In meinem Land …', 'In my home town / In my country …'],
      ['Einerseits …, andererseits …', 'On the one hand …, on the other hand …'],
      ['Deshalb finde ich, man sollte …', 'That’s why I think we should …'],
    ],
    check: [
      'Did you refer to Kai’s opinion?',
      'Is your own opinion clear?',
      'At least one reason and one example?',
      'Connectors like denn, trotzdem, deshalb (with correct word order)?',
      'About 80 words?',
    ],
  });

  add({
    id: 'mock-b1-schreiben-3',
    level: 'B1',
    exam: 'goethe',
    module: 'schreiben',
    teil: 3,
    title: 'Schreiben Aufgabe 3 – Kurze Nachricht (formell)',
    en: 'A short, polite formal message (here: to your landlord) in about 40 words.',
    minutes: 15,
    instr: 'Schreiben Sie eine E-Mail (circa 40 Wörter). Vergessen Sie nicht die Anrede und den Gruß am Schluss.',
    instrEn: 'Write an email (about 40 words). Don’t forget the greeting and the closing.',
    tip: 'Formal style: Sie, Ihnen, Ihr – and the fixed frame “Sehr geehrter Herr …, … Mit freundlichen Grüßen”. Be polite: “leider”, “Es tut mir leid”, and use the Konjunktiv II for your suggestion (“Wäre es möglich …?”, “Könnte der Handwerker …?”).',
    gloss: [
      ['der Vermieter', 'landlord'],
      ['der Handwerker', 'tradesman, technician'],
      ['die Heizung', 'heating'],
      ['prüfen', 'to check, inspect'],
      ['sich entschuldigen', 'to apologise'],
      ['der Termin', 'appointment'],
      ['vorschlagen', 'to suggest'],
    ],
    kind: 'write',
    task: 'Ihr Vermieter, Herr Albrecht, hat Ihnen geschrieben: Am Donnerstag zwischen 8 und 12 Uhr kommt ein Handwerker, um die Heizung in Ihrer Wohnung zu prüfen. Sie können an diesem Tag aber nicht zu Hause sein.\n\nSchreiben Sie Herrn Albrecht eine E-Mail. Entschuldigen Sie sich höflich und berichten Sie, warum Sie nicht da sein können. Machen Sie einen Vorschlag für einen anderen Termin.',
    taskEn: 'Your landlord, Mr Albrecht, has written to you: on Thursday between 8 and 12 a technician is coming to check the heating in your flat. But you can’t be at home that day.\n\nWrite Mr Albrecht an email. Apologise politely and explain why you can’t be there. Suggest another appointment.',
    points: [
      'Entschuldigen Sie sich höflich.',
      'Berichten Sie, warum Sie nicht zu Hause sein können.',
      'Machen Sie einen Vorschlag für einen anderen Termin.',
    ],
    pointsEn: [
      'Apologise politely.',
      'Explain why you can’t be at home.',
      'Suggest another appointment.',
    ],
    count: 40,
    model:
      'Sehr geehrter Herr Albrecht,\n\nvielen Dank für Ihre Nachricht. Leider kann ich am Donnerstagvormittag nicht zu Hause sein, weil ich an diesem Tag eine wichtige Prüfung habe. Das tut mir sehr leid. Wäre es vielleicht am Freitag ab 14 Uhr möglich?\n\nMit freundlichen Grüßen\nAndrea Novak',
    modelEn:
      'Dear Mr Albrecht,\n\nthank you for your message. Unfortunately I can’t be at home on Thursday morning because I have an important exam that day. I’m very sorry. Would Friday from 2 pm perhaps be possible?\n\nKind regards\nAndrea Novak',
    redemittel: [
      ['Sehr geehrter Herr … / Sehr geehrte Frau …', 'Dear Mr … / Dear Ms …'],
      ['Vielen Dank für Ihre Nachricht.', 'Thank you for your message.'],
      ['Leider kann ich am … nicht …, weil …', 'Unfortunately I can’t … on …, because …'],
      ['Das tut mir sehr leid.', 'I’m very sorry.'],
      ['Wäre es vielleicht am … möglich?', 'Would … perhaps be possible?'],
      ['Könnte der Handwerker auch am … kommen?', 'Could the technician also come on …?'],
      ['Mit freundlichen Grüßen', 'Kind regards'],
    ],
    check: [
      'Formal greeting and closing (Sehr geehrter … / Mit freundlichen Grüßen)?',
      'Sie-form all the way through?',
      'Apology, reason and new suggestion included?',
      'Polite question in the Konjunktiv II (Wäre …? Könnte …?)?',
      'About 40 words – not much more?',
    ],
  });
})();
