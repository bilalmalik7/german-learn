/* EXAM PRACTICE – telc Deutsch B1 (Zertifikat Deutsch): practice tasks + a full mock exam
   (Leseverstehen, Sprachbausteine, Hörverstehen, Schriftlicher Ausdruck, Mündlicher Ausdruck Teil 2).
   Original texts written for Deutsch30 in the official task formats. */
(function () {
  'use strict';
  const E = (GL.exam = GL.exam || {});
  const T = (E.tasks = E.tasks || {});
  const add = (t) => (T[t.id] = t);

  /* ---------- shared instructions ---------- */
  const RF = ['Richtig', 'Falsch'];
  const L1 = {
    title: 'Leseverstehen Teil 1 – Globalverstehen',
    en: 'Ten headlines and five short newspaper texts – find the headline that fits each text. Five headlines are left over.',
    minutes: 15,
    instr: 'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie, welche Überschrift (a–j) am besten zu welchem Text (1–5) passt.',
    instrEn: 'First read the ten headlines. Then read the five texts and decide which headline (a–j) fits each text (1–5) best.',
    tip: 'Find the MAIN idea of each text in one sentence before you look at the headlines. Wrong headlines often repeat a word from the text but describe a detail or the opposite.',
  };
  const L2 = {
    title: 'Leseverstehen Teil 2 – Detailverstehen',
    en: 'A longer newspaper article with five multiple-choice questions (a, b or c) about details.',
    minutes: 15,
    instr: 'Lesen Sie zuerst den Text und lösen Sie dann die Aufgaben 1–5. Welche Lösung (a, b oder c) ist jeweils richtig?',
    instrEn: 'First read the text and then do tasks 1–5. Which answer (a, b or c) is right in each case?',
    tip: 'The questions follow the order of the text. Find the paragraph for each question and compare carefully: wrong options use words from the text but change a detail (number, person, place, “all” vs. “some”).',
  };
  const L3 = {
    title: 'Leseverstehen Teil 3 – Selektives Verstehen',
    en: 'Ten situations and twelve adverts – find the right advert for each person. For one situation there is no advert (x).',
    minutes: 15,
    instr: 'Lesen Sie zuerst die zehn Situationen und dann die zwölf Anzeigen. Welche Anzeige passt zu welcher Situation? Sie können jede Anzeige nur einmal verwenden. Für eine Situation gibt es keine passende Anzeige. In diesem Fall markieren Sie ein x.',
    instrEn: 'First read the ten situations and then the twelve adverts. Which advert fits which situation? You can use each advert only once. For one situation there is no suitable advert. In that case mark x.',
    tip: 'Underline the two or three conditions in each situation (who? when? how much?). An advert only fits if it matches ALL of them – choose x if every candidate fails one condition.',
  };
  const S1 = {
    title: 'Sprachbausteine Teil 1 – Grammatik im Brief',
    en: 'A letter with ten gaps – choose the right word (a, b or c) for each gap. Mostly grammar.',
    minutes: 10,
    instr: 'Lesen Sie den folgenden Text und entscheiden Sie, welches Wort (a, b oder c) in die Lücken 1–10 passt.',
    instrEn: 'Read the following text and decide which word (a, b or c) fits gaps 1–10.',
    tip: 'Read the whole sentence, not only the gap. Check: Does the verb go to the end (weil, dass, obwohl) or stay in position 2 (denn, deshalb)? Which case does the preposition or verb need?',
  };
  const S2 = {
    title: 'Sprachbausteine Teil 2 – Wortschatz',
    en: 'A text with ten gaps and fifteen words in a box – put the right word in each gap. Five words are left over.',
    minutes: 10,
    instr: 'Lesen Sie den folgenden Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken 1–10 passt. Sie können jedes Wort im Kasten nur einmal verwenden. Nicht alle Wörter passen in den Text.',
    instrEn: 'Read the following text and decide which word from the box fits gaps 1–10. You can use each word only once. Not all words fit in the text.',
    tip: 'Fill in the gaps you are sure about first and cross those words out. Then look at fixed combinations: verb + preposition (sich wenden an), noun + preposition (Interesse an), and word classes (noun, verb, connector).',
  };
  const H1 = {
    title: 'Hörverstehen Teil 1 – Globalverstehen',
    en: 'Five short radio texts (news, weather, tips) – decide if each statement is right or wrong. You hear each text only ONCE.',
    minutes: 5,
    instr: 'Sie hören fünf kurze Texte. Sie hören jeden Text nur einmal. Entscheiden Sie beim Hören, ob die Aussagen richtig oder falsch sind.',
    instrEn: 'You will hear five short texts. You hear each text only once. Decide while listening whether the statements are right or wrong.',
    tip: 'Read the statement before the text starts. The statement is about the main topic, not small details – ask yourself: What is this radio message mainly about?',
  };
  const H2 = {
    title: 'Hörverstehen Teil 2 – Detailverstehen',
    en: 'A radio interview – decide if ten statements are right or wrong. You hear the interview twice.',
    minutes: 10,
    instr: 'Sie hören ein Gespräch. Sie hören das Gespräch zweimal. Entscheiden Sie beim Hören, ob die Aussagen 1–10 richtig oder falsch sind. Lesen Sie jetzt die Aufgaben.',
    instrEn: 'You will hear a conversation. You hear it twice. Decide while listening whether statements 1–10 are right or wrong. Read the statements now.',
    tip: 'The statements follow the order of the interview. Mark your first answer during the first listening and check the uncertain ones the second time. Watch out for corrections: “Nicht ganz …”, “Nein, eigentlich …”.',
  };
  const H3 = {
    title: 'Hörverstehen Teil 3 – Selektives Verstehen',
    en: 'Five short announcements and phone messages – decide if each statement is right or wrong. You hear each text twice.',
    minutes: 5,
    instr: 'Sie hören fünf kurze Texte. Sie hören jeden Text zweimal. Entscheiden Sie beim Hören, ob die Aussagen richtig oder falsch sind.',
    instrEn: 'You will hear five short texts. You hear each text twice. Decide while listening whether the statements are right or wrong.',
    tip: 'Here you need ONE piece of information (time, platform, day, price). Read the statement first and listen only for that point – it is often changed or corrected in the message.',
  };
  const W = {
    title: 'Schriftlicher Ausdruck – Brief / E-Mail',
    en: 'Write a letter or email (about 120 words) answering a letter or an advert. Write something about all four points.',
    minutes: 30,
    instr: 'Schreiben Sie einen Brief oder eine E-Mail. Schreiben Sie etwas zu allen vier Punkten. Überlegen Sie sich eine passende Reihenfolge der Punkte. Vergessen Sie nicht Anrede und Gruß.',
    instrEn: 'Write a letter or email. Write something about all four points. Think of a suitable order for the points. Don’t forget the greeting and closing.',
    tip: 'Plan one short paragraph per point and connect your sentences (deshalb, außerdem, weil, aber). Leave five minutes to check verb position, endings and spelling – a missing point costs many marks.',
    kind: 'write',
    count: 120,
  };

  /* =====================================================================
     PRACTICE TASKS
     ===================================================================== */

  add(Object.assign({}, L1, {
    id: 'telc-b1-lesen-1', level: 'B1', exam: 'telc', module: 'lesen', teil: 1, kind: 'match',
    gloss: [['der Wochenmarkt', 'weekly market'], ['der Stand, die Stände', 'stall(s)'], ['ausleihen', 'to borrow'], ['der Ausbildungsvertrag', 'apprenticeship contract'], ['das Handwerk', 'skilled trades'], ['die Rücksendung', 'return (of goods)'], ['die Gebühr', 'fee'], ['die Kantine', 'canteen'], ['der Speiseplan', 'menu (for the week)'], ['der Umbau', 'rebuilding / renovation']],
    ads: [
      { k: 'a', t: 'Neue Fahrradwege in der Innenstadt' },
      { k: 'b', t: 'Bibliothek: Länger lesen und ausleihen' },
      { k: 'c', t: 'Markt bekommt einen neuen Platz' },
      { k: 'd', t: 'Mieten in der Stadt steigen weiter' },
      { k: 'e', t: 'Bibliothek schließt – Bücher nur noch online' },
      { k: 'f', t: 'Schulessen wird gesünder' },
      { k: 'g', t: 'Handwerk: Mehr junge Leute beginnen eine Ausbildung' },
      { k: 'h', t: 'Sportverein sucht Trainerinnen und Trainer' },
      { k: 'i', t: 'Online-Shopping: Zurückschicken nicht mehr gratis' },
      { k: 'j', t: 'Online-Händler senken ihre Preise' },
    ],
    items: [
      { q: 'Seit über dreißig Jahren findet der Wochenmarkt jeden Mittwoch und Samstag auf dem Rathausplatz statt. Ab dem 1. März müssen die Kunden aber einen anderen Weg nehmen: Weil der Rathausplatz umgebaut wird, stehen die rund 40 Stände dann auf dem Parkplatz am Stadtpark. Die Händler sind nicht begeistert, denn sie befürchten weniger Kunden. Die Stadt verspricht aber neue Fahrradständer und eine zusätzliche Bushaltestelle direkt am neuen Standort.', a: 'c', ex: 'The market moves: „stehen die rund 40 Stände dann auf dem Parkplatz am Stadtpark“ (the stalls will then stand in the car park by the city park). The bike stands are only a detail, so (a) “new cycle paths” is wrong.' },
      { q: 'Wer nach der Arbeit noch Bücher ausleihen möchte, hatte bisher Pech: Die Stadtbibliothek schloss schon um 18 Uhr. Das ändert sich jetzt. Ab nächster Woche ist sie von Dienstag bis Freitag bis 21 Uhr geöffnet, samstags sogar bis 16 Uhr. Möglich wird das durch ein neues System: Am Abend öffnen die Besucher die Tür selbst mit ihrem Bibliotheksausweis und leihen Medien an Automaten aus.', a: 'b', ex: 'Main idea: longer opening hours – „bis 21 Uhr geöffnet“ (open until 9 pm). The library does not close, so (e) is the opposite.' },
      { q: 'Lange Zeit war es schwierig, junge Leute für einen Beruf im Handwerk zu begeistern. In diesem Jahr sieht es anders aus: Die Handwerkskammer meldet zwölf Prozent mehr Ausbildungsverträge als im Vorjahr. Besonders beliebt sind Elektriker, Tischler und Kfz-Mechatroniker. Trotzdem sind noch rund 300 Plätze frei, zum Beispiel bei Bäckereien und Metzgereien. Interessierte können sich noch bis Ende September bewerben.', a: 'g', ex: '„zwölf Prozent mehr Ausbildungsverträge als im Vorjahr“ = 12 % more apprenticeship contracts than last year → more young people are starting an apprenticeship.' },
      { q: 'Schuhe in drei Größen bestellen und zwei Paar zurückschicken – für viele Kunden ist das normal. Doch immer mehr Online-Händler machen da nicht mehr mit. Seit Kurzem verlangen mehrere große Modegeschäfte im Internet eine Gebühr von 2,95 Euro pro Rücksendung. Der Grund: Jedes zurückgeschickte Paket kostet die Firmen viel Geld und ist schlecht für die Umwelt. Verbraucherschützer raten, vor der Bestellung genau die Größentabelle zu lesen.', a: 'i', ex: '„verlangen … eine Gebühr von 2,95 Euro pro Rücksendung“ (they charge a fee of €2.95 per return) → sending things back is no longer free. Nothing is said about lower prices (j).' },
      { q: 'In den Kantinen der städtischen Schulen gibt es ab dem neuen Schuljahr weniger Pommes und mehr Gemüse. Jeden Tag steht ein vegetarisches Gericht auf dem Speiseplan, und statt süßer Limonade gibt es kostenloses Wasser. Die Idee kommt von Eltern und Lehrern, die sich Sorgen um die Gesundheit der Kinder machen. Der Preis für ein Mittagessen bleibt gleich: Es kostet weiterhin 3,50 Euro.', a: 'f', ex: '„weniger Pommes und mehr Gemüse … statt süßer Limonade … Wasser“ (fewer chips, more vegetables, water instead of lemonade) → school food becomes healthier.' },
    ],
  }));

  add(Object.assign({}, L2, {
    id: 'telc-b1-lesen-2', level: 'B1', exam: 'telc', module: 'lesen', teil: 2, kind: 'mc',
    gloss: [['verzichten auf (+ Akk.)', 'to do without'], ['die Versicherung', 'insurance'], ['buchen', 'to book'], ['die Umstellung', 'adjustment / change'], ['der Anbieter', 'provider'], ['ersetzen', 'to replace'], ['knapp', 'scarce'], ['ausgebucht', 'fully booked'], ['frühzeitig', 'early / in good time'], ['ausbauen', 'to expand']],
    text: 'Teilen statt besitzen – immer mehr Städter verzichten aufs eigene Auto\n\nAls das alte Auto von Familie Hartmann vor zwei Jahren kaputtging, musste sich die Familie aus Leipzig entscheiden: ein neues kaufen oder ganz darauf verzichten? „Wir haben gerechnet und waren überrascht“, erzählt Katrin Hartmann. „Mit Versicherung, Steuer, Reparaturen und Parkplatz hat uns das Auto fast 300 Euro im Monat gekostet – obwohl es meistens nur vor dem Haus stand.“\n\nHeute nutzt die vierköpfige Familie Carsharing. Wenn sie ein Auto braucht, bucht sie es per App, holt es an einer Station in der Nähe ab und bringt es danach wieder zurück. Bezahlt wird pro Stunde und pro Kilometer. Für den Großeinkauf am Samstag oder den Besuch bei den Großeltern reicht das völlig. Zur Arbeit und zur Schule fahren alle mit dem Rad oder der Straßenbahn. „Am Anfang war es eine Umstellung“, gibt Hartmann zu. „Man kann nicht mehr spontan losfahren. Aber inzwischen planen wir besser und geben nur noch etwa 80 Euro im Monat für Autos aus.“\n\nSo wie den Hartmanns geht es vielen. Nach Angaben des Bundesverbands Carsharing sind in Deutschland inzwischen mehr als fünf Millionen Menschen bei einem Anbieter angemeldet – doppelt so viele wie vor fünf Jahren. Ein Carsharing-Auto ersetzt nach Studien bis zu zehn private Autos. Das ist vor allem in Großstädten wichtig, wo Parkplätze knapp und teuer sind.\n\nDoch nicht überall funktioniert das Modell. Auf dem Land gibt es oft keine Stationen, und Busse fahren selten. „Wer in einem kleinen Dorf wohnt und jeden Tag 30 Kilometer zur Arbeit fährt, braucht weiterhin ein eigenes Auto“, sagt der Verkehrsexperte Martin Seidel. Auch in der Stadt gibt es Probleme: Am Freitagabend und vor Feiertagen sind die Autos oft schnell ausgebucht. Seidel empfiehlt deshalb, frühzeitig zu reservieren.\n\nDie Stadt Leipzig will das Angebot weiter ausbauen. Bis Ende nächsten Jahres sollen 50 neue Stationen entstehen, die meisten in Wohngebieten am Stadtrand. Außerdem plant man sogenannte Mobilitätspunkte, an denen man Leihfahrräder, E-Roller und Carsharing-Autos an einem Ort findet. Familie Hartmann freut sich darauf: „Dann wird es noch einfacher.“',
    items: [
      { q: 'Warum hat Familie Hartmann kein eigenes Auto mehr?', o: ['Sie konnte die Reparatur nicht bezahlen.', 'Das Auto war teuer, obwohl sie es wenig benutzt hat.', 'Sie hatte keinen Parkplatz vor dem Haus.'], a: 1, ex: '„fast 300 Euro im Monat … obwohl es meistens nur vor dem Haus stand“ (almost €300 a month although it mostly just stood in front of the house). The repair and the parking space are mentioned, but they are not the reason.' },
      { q: 'Wofür benutzt die Familie heute Carsharing?', o: ['Für den Weg zur Arbeit und zur Schule.', 'Für spontane Ausflüge.', 'Für bestimmte Fahrten, zum Beispiel zum Großeinkauf.'], a: 2, ex: '„Für den Großeinkauf am Samstag oder den Besuch bei den Großeltern reicht das völlig.“ To work and school they go by bike or tram, and „Man kann nicht mehr spontan losfahren“ (you can’t just set off spontaneously any more).' },
      { q: 'Was sagt der Bundesverband Carsharing?', o: ['Die Zahl der Nutzer hat sich in fünf Jahren verdoppelt.', 'In Deutschland gibt es fünf Millionen Carsharing-Autos.', 'Jedes Carsharing-Auto ersetzt genau zehn private Autos.'], a: 0, ex: '„mehr als fünf Millionen Menschen … doppelt so viele wie vor fünf Jahren“ (twice as many as five years ago). Five million are people, not cars, and the text says „bis zu zehn“ (up to ten), not exactly ten.' },
      { q: 'Was rät Martin Seidel?', o: ['Auch auf dem Land Carsharing zu nutzen.', 'Ein Auto rechtzeitig zu reservieren.', 'Am Freitag lieber mit dem Bus zu fahren.'], a: 1, ex: '„Seidel empfiehlt deshalb, frühzeitig zu reservieren.“ (He recommends booking early.) frühzeitig = rechtzeitig. He says people in villages still need their own car.' },
      { q: 'Was plant die Stadt Leipzig?', o: ['Neue Stationen vor allem im Stadtzentrum.', 'Orte, an denen man verschiedene Verkehrsmittel leihen kann.', 'Kostenlose Leihfahrräder für Familien.'], a: 1, ex: '„Mobilitätspunkte, an denen man Leihfahrräder, E-Roller und Carsharing-Autos an einem Ort findet“ (places where you find hire bikes, e-scooters and car-sharing cars in one place). The new stations are mostly „am Stadtrand“ (on the outskirts), not in the centre.' },
    ],
  }));

  add(Object.assign({}, L3, {
    id: 'telc-b1-lesen-3', level: 'B1', exam: 'telc', module: 'lesen', teil: 3, kind: 'match', x: true,
    gloss: [['der Anfängerkurs', 'beginners’ course'], ['die Werkstatt', 'workshop'], ['das Werkzeug', 'tools'], ['die Spende', 'donation'], ['der Lauftreff', 'running group'], ['gebraucht', 'used / second-hand'], ['die Ausrüstung', 'equipment'], ['rückenfreundlich', 'good for your back'], ['verpachten', 'to lease out'], ['der Kleingarten', 'allotment garden']],
    ads: [
      { k: 'a', title: 'Tanzschule Rhythmus', t: 'Salsa für Paare! Neuer Anfängerkurs ab 3. Oktober, donnerstags 19:00–20:30 Uhr. 8 Abende für 120 € pro Paar. Keine Vorkenntnisse nötig.' },
      { k: 'b', title: 'TSV Grünwald – Schwimmabteilung', t: 'Nie schwimmen gelernt? Kein Problem! Schwimmkurse für Erwachsene in kleinen Gruppen. Mittwochabend gemischt, Samstagvormittag nur für Frauen.' },
      { k: 'c', title: 'Fahrradwerkstatt „Selbst ist die Frau / der Mann“', t: 'Wir zeigen Ihnen, wie Sie Bremsen, Licht und Reifen selbst reparieren. Werkzeug ist vorhanden. Jeden Mittwoch 16–20 Uhr im Jugendzentrum. Kosten: eine Spende.' },
      { k: 'd', title: 'Kochstudio Würze', t: 'Indische Küche zum Mitmachen: Currys, Fladenbrot und Chutneys. Freitag, 18 Uhr, 49 € inklusive Essen und Getränken.' },
      { k: 'e', title: 'Lauftreff im Stadtpark', t: 'Laufen Sie mit uns in den Tag! Jeden Dienstag und Donnerstag um 7 Uhr morgens am Haupteingang. Für jedes Tempo – kostenlos und ohne Anmeldung.' },
      { k: 'f', title: 'Fotokurs für Einsteiger', t: 'Lernen Sie, mit Ihrer Spiegelreflexkamera bessere Bilder zu machen. Wochenendworkshop im Botanischen Garten, 89 €.' },
      { k: 'g', title: 'Fahrradmarkt', t: 'Gebrauchte Fahrräder kaufen und verkaufen! Sonntag, 10–14 Uhr, auf dem Schulhof der Goetheschule. Verkäufer bitte ab 9 Uhr kommen.' },
      { k: 'h', title: 'Kletterhalle Steilwand', t: 'Schnupperkurs für Kinder von 8 bis 12 Jahren: samstags 10–12 Uhr. Ausrüstung inklusive, 15 € pro Termin.' },
      { k: 'i', title: 'Yoga am Abend', t: 'Rückenfreundliches Yoga für alle, die viel sitzen. Montag und Mittwoch, 18:30 Uhr. 10er-Karte 90 €, erste Stunde gratis.' },
      { k: 'j', title: 'Sprachcafé im Stadtteilzentrum', t: 'Deutsch sprechen in gemütlicher Runde – bei Kaffee und Kuchen. Für alle, die Deutsch lernen. Jeden Freitag ab 17 Uhr, kostenlos.' },
      { k: 'k', title: 'Gartenverein Sonnenblick', t: 'Kleingarten zu verpachten: 300 m² mit Gartenhaus und Obstbäumen, 10 Minuten vom Zentrum. 450 € im Jahr.' },
      { k: 'l', title: 'Fitnessstudio FitPlus', t: 'Sommerangebot: 3 Monate trainieren für 59 €! Geöffnet täglich 6–23 Uhr, mit Sauna und Kursen.' },
    ],
    items: [
      { q: 'Ihr Kollege sitzt den ganzen Tag im Büro und hat oft Rückenschmerzen. Er möchte abends etwas dagegen tun.', a: 'i', ex: '„Rückenfreundliches Yoga für alle, die viel sitzen“ at 18:30 – back-friendly and in the evening.' },
      { q: 'Ihre Nachbarin ist 45 Jahre alt und kann nicht schwimmen. Sie möchte es endlich lernen.', a: 'b', ex: '„Nie schwimmen gelernt? … Schwimmkurse für Erwachsene“ (never learnt to swim? swimming courses for adults).' },
      { q: 'Bei Ihrem Freund funktionieren die Bremsen am Fahrrad nicht. Er möchte lernen, das selbst zu reparieren.', a: 'c', ex: '„wie Sie Bremsen, Licht und Reifen selbst reparieren“ (how to repair brakes, lights and tyres yourself). The bike market (g) only sells bikes.' },
      { q: 'Sie möchten vor der Arbeit Sport machen, aber kein Geld dafür ausgeben.', a: 'e', ex: '„um 7 Uhr morgens … kostenlos“ – early morning and free. The gym (l) also opens at 6, but it costs €59.' },
      { q: 'Ihre Schwester und ihr Mann suchen ein gemeinsames Hobby für einen Abend pro Woche.', a: 'a', ex: '„Salsa für Paare … donnerstags 19:00–20:30 Uhr“ – for couples, one evening a week.' },
      { q: 'Ihr Sohn ist zehn und möchte am Wochenende eine neue Sportart ausprobieren.', a: 'h', ex: '„Schnupperkurs für Kinder von 8 bis 12 Jahren: samstags“ – a taster course for children aged 8–12 on Saturdays.' },
      { q: 'Eine Bekannte aus Spanien lernt Deutsch und möchte mehr Gelegenheiten zum Sprechen haben.', a: 'j', ex: '„Deutsch sprechen in gemütlicher Runde … Für alle, die Deutsch lernen“ (speak German in a relaxed group, for all German learners).' },
      { q: 'Sie haben ein neues Fahrrad bekommen und möchten Ihr altes verkaufen.', a: 'g', ex: '„Gebrauchte Fahrräder kaufen und verkaufen“ (buy and sell used bikes). The workshop (c) is for repairs, not for selling.' },
      { q: 'Ein Freund möchte lernen, italienische Gerichte zu kochen.', a: 'x', ex: 'There is no Italian cooking course. Kochstudio Würze (d) only offers „Indische Küche“ (Indian cooking) → x.' },
      { q: 'Ihre Eltern wohnen in einer Wohnung ohne Balkon und möchten gern ihr eigenes Obst und Gemüse anbauen.', a: 'k', ex: '„Kleingarten zu verpachten … mit Gartenhaus und Obstbäumen“ – an allotment garden where they can grow their own fruit and vegetables.' },
    ],
  }));

  add(Object.assign({}, S1, {
    id: 'telc-b1-sprachbausteine-1', level: 'B1', exam: 'telc', module: 'sprachbausteine', teil: 1, kind: 'cloze',
    gloss: [['umziehen (ist umgezogen)', 'to move (house)'], ['die Stelle', 'job / position'], ['der Krankenpfleger', 'male nurse'], ['zu Fuß erreichen', 'to reach on foot'], ['die Schifffahrt', 'boat trip'], ['sich gewöhnen an (+ Akk.)', 'to get used to'], ['der Hafen', 'harbour'], ['das Gästebett', 'guest bed']],
    text: 'Liebe Carla,\n\nvielen Dank für deine E-Mail! Entschuldige, dass ich dir erst jetzt antworte, aber die letzten Wochen waren sehr stressig. Wie du weißt, bin ich im Mai [1] Hamburg umgezogen. [2] ich hier eine Stelle als Krankenpfleger gefunden habe, musste alles sehr schnell gehen.\n\nMeine neue Wohnung liegt mitten in der Stadt. Sie ist zwar kleiner [3] meine alte, aber dafür kann ich alles zu Fuß erreichen: den Supermarkt, die Bäckerei und sogar das Krankenhaus. Ein Auto brauche ich hier nicht mehr, deshalb habe ich [4] verkauft.\n\nDie Nachbarn sind sehr nett. Gleich in der ersten Woche hat mich eine ältere Dame zum Kaffee [5]. Sie wohnt schon seit 40 Jahren in diesem Haus und kennt jeden.\n\nNur eine Sache stört mich: Es ist ziemlich laut, [6] direkt vor meinem Fenster eine Straßenbahn fährt. Am Anfang konnte ich deshalb kaum schlafen, aber jetzt habe ich mich [7] gewöhnt.\n\nHast du Lust, mich bald zu besuchen? Im Oktober habe ich eine Woche Urlaub. Dann könnten wir zusammen den Hafen anschauen und eine Schifffahrt [8] der Elbe machen. Ein Gästebett habe ich auch, du musst [9] kein Hotel buchen.\n\nSchreib mir bald, [10] Tage dir am besten passen!\n\nLiebe Grüße\nTobias',
    gaps: [
      { o: ['nach', 'auf', 'zu'], a: 0, ex: 'Moving TO a city or country without an article → nach: „nach Hamburg umziehen“. zu is used for people and places with an article (zu meinen Eltern, zum Bahnhof); auf does not go with city names.' },
      { o: ['Weil', 'Denn', 'Deshalb'], a: 0, ex: 'The verb „habe“ is at the END of the clause → subordinate clause → Weil. Denn and deshalb need normal word order (verb in position 2).' },
      { o: ['als', 'wie', 'dann'], a: 0, ex: 'Comparative + als: „kleiner als meine alte“ (smaller than my old one). wie is used with the base form: „so klein wie“.' },
      { o: ['es', 'ihn', 'sie'], a: 0, ex: 'The pronoun replaces „das Auto“ (neuter, accusative) → es.' },
      { o: ['eingeladen', 'einladen', 'eingeladet'], a: 0, ex: 'Perfekt with „hat“ needs the past participle at the end: einladen → eingeladen (strong verb, separable prefix ein- + ge- + laden + en).' },
      { o: ['obwohl', 'da', 'damit'], a: 1, ex: 'A reason: it is loud BECAUSE a tram runs outside → da (= weil). obwohl = although, damit = so that.' },
      { o: ['daran', 'darauf', 'damit'], a: 0, ex: 'sich gewöhnen an + Akk. → da(r) + an = daran: „Ich habe mich daran gewöhnt.“ (I have got used to it.)' },
      { o: ['auf', 'über', 'in'], a: 0, ex: 'A boat trip ON a river: „eine Schifffahrt auf der Elbe“ (auf + Dativ, position). über der Elbe would mean “above the Elbe”.' },
      { o: ['also', 'trotzdem', 'sondern'], a: 0, ex: 'Consequence: I have a guest bed, SO you don’t need a hotel → also. trotzdem (nevertheless) and sondern (but rather, after a negative) don’t make sense.' },
      { o: ['welche', 'welcher', 'welches'], a: 0, ex: 'Question word before a plural noun in the nominative: „welche Tage“ (which days). welcher = masc. singular, welches = neuter singular.' },
    ],
  }));

  add(Object.assign({}, S2, {
    id: 'telc-b1-sprachbausteine-2', level: 'B1', exam: 'telc', module: 'sprachbausteine', teil: 2, kind: 'cloze',
    gloss: [['das Mitglied', 'member'], ['mitteilen', 'to inform'], ['das Probetraining', 'trial session'], ['der Mitgliedsbeitrag', 'membership fee'], ['erhöhen', 'to raise'], ['die Geschäftsstelle', 'office (of a club)'], ['sich wenden an (+ Akk.)', 'to contact / turn to'], ['begrüßen', 'to welcome']],
    words: ['dass', 'ob', 'in', 'an', 'Platz', 'Interesse', 'Lust', 'spätestens', 'wegen', 'trotz', 'ändert', 'wechselt', 'auch', 'wenden', 'begrüßen'],
    text: 'Liebe Mitglieder des TSV Blau-Weiß,\n\nwir freuen uns, Ihnen mitteilen zu können, [1] unsere neue Sporthalle endlich fertig ist. Ab dem 1. September finden alle Kurse [2] der neuen Halle in der Lindenstraße statt. Die alte Halle wird nicht mehr genutzt.\n\nIn der neuen Halle haben wir viel mehr [3] und können zwei neue Kurse anbieten: Badminton für Anfänger und Rückengymnastik für Senioren. Wer [4] an einem dieser Kurse hat, kann im August kostenlos an einem Probetraining teilnehmen. Bitte melden Sie sich dafür [5] bis zum 20. Juli im Büro an.\n\nLeider müssen wir auch die Mitgliedsbeiträge erhöhen. [6] der höheren Kosten für Strom und Heizung zahlen Erwachsene ab Januar 8 Euro statt 6 Euro im Monat. Für Kinder und Jugendliche [7] sich nichts.\n\nEs gibt noch eine gute Nachricht: Ab sofort können Sie sich [8] online für alle Kurse anmelden. Das spart Zeit und Papier.\n\nBei Fragen [9] Sie sich bitte an unsere Geschäftsstelle. Wir sind montags bis freitags von 9 bis 13 Uhr für Sie da.\n\nWir freuen uns darauf, Sie bald in der neuen Halle zu [10]!\n\nMit sportlichen Grüßen\nIhr Vorstand',
    gaps: [
      { a: 'dass', ex: 'mitteilen, dass … = to inform that … (a fact). ob (whether) is for open yes/no questions.' },
      { a: 'in', ex: 'Location inside a building → in + Dativ: „in der neuen Halle“. an der Halle would mean “at/next to the hall”.' },
      { a: 'Platz', ex: '„mehr Platz haben“ = to have more space/room.' },
      { a: 'Interesse', ex: 'Interesse an + Dativ: „Interesse an einem Kurs haben“. Lust needs auf: „Lust auf einen Kurs“ – so Lust doesn’t fit with an.' },
      { a: 'spätestens', ex: '„spätestens bis zum 20. Juli“ = by 20 July at the latest.' },
      { a: 'wegen', ex: 'Reason + Genitiv: „wegen der höheren Kosten“ (because of the higher costs). trotz (despite) is the opposite meaning.' },
      { a: 'ändert', ex: '„Für Kinder ändert sich nichts.“ = Nothing changes for children (sich ändern). wechseln is not reflexive in this sense.' },
      { a: 'auch', ex: '„Sie können sich auch online anmelden“ = you can ALSO register online (in addition to the office).' },
      { a: 'wenden', ex: 'sich wenden an + Akk. = to contact: „Wenden Sie sich bitte an unsere Geschäftsstelle.“' },
      { a: 'begrüßen', ex: '„Wir freuen uns darauf, Sie … zu begrüßen“ = we look forward to welcoming you. zu + infinitive at the end.' },
    ],
  }));

  add(Object.assign({}, H1, {
    id: 'telc-b1-hoeren-1', level: 'B1', exam: 'telc', module: 'hoeren', teil: 1, kind: 'mc', plays: 1,
    gloss: [['das Gewitter', 'thunderstorm'], ['der Stau', 'traffic jam'], ['die Spur', 'lane'], ['der Eintritt', 'admission'], ['die Führung', 'guided tour'], ['die Umfrage', 'survey'], ['im Durchschnitt', 'on average'], ['die Verbraucherzentrale', 'consumer advice centre'], ['die Vorkasse', 'payment in advance']],
    items: [
      { audio: [['_', 'Und nun das Wetter für morgen: Am Vormittag ist es in ganz Bayern noch freundlich und trocken. Ab dem Mittag ziehen von Westen dichte Wolken auf.'], ['_', 'Am Nachmittag regnet es dann überall, örtlich gibt es auch Gewitter. Die Temperaturen erreichen 19 bis 23 Grad.']], q: 'Morgen wird es den ganzen Tag sonnig.', o: RF, a: 1, ex: 'Only the morning is dry; „Am Nachmittag regnet es dann überall“ (in the afternoon it rains everywhere).' },
      { audio: [['_', 'Autofahrer auf der A9 in Richtung München brauchen im Moment viel Geduld. Wegen eines Unfalls zwischen Ingolstadt-Nord und Ingolstadt-Süd ist nur eine Spur frei.'], ['_', 'Der Stau ist inzwischen zehn Kilometer lang. Die Polizei empfiehlt, die Autobahn schon in Denkendorf zu verlassen.']], q: 'Auf der A9 gibt es wegen eines Unfalls einen langen Stau.', o: RF, a: 0, ex: '„Wegen eines Unfalls … Der Stau ist inzwischen zehn Kilometer lang.“ (Because of an accident, the jam is now 10 km long.)' },
      { audio: [['_', 'Am Wochenende lädt der Tierpark zum Tag der offenen Tür ein. Kinder unter 14 Jahren haben am Samstag und Sonntag freien Eintritt, Erwachsene zahlen den halben Preis.'], ['_', 'Außerdem gibt es Führungen hinter die Kulissen. Die Parkplätze am Tierpark sind begrenzt – nehmen Sie lieber die Straßenbahn.']], q: 'Am Wochenende ist der Tierpark für alle Besucher kostenlos.', o: RF, a: 1, ex: 'Only children under 14 go in free; „Erwachsene zahlen den halben Preis“ (adults pay half price).' },
      { audio: [['_', 'Die Deutschen essen immer weniger Fleisch. Das zeigt eine neue Umfrage. Im Durchschnitt isst jeder Deutsche pro Jahr etwa 52 Kilo Fleisch – vor zehn Jahren waren es noch über 60 Kilo.'], ['_', 'Vor allem junge Menschen greifen lieber zu Gemüse, Tofu oder Fleischersatz.']], q: 'Laut einer Umfrage essen die Deutschen heute weniger Fleisch als früher.', o: RF, a: 0, ex: '„Die Deutschen essen immer weniger Fleisch“ – 52 kg today, over 60 kg ten years ago.' },
      { audio: [['_', 'Achtung beim Online-Shopping: Die Verbraucherzentrale warnt vor falschen Internetseiten, die Markenkleidung extrem billig anbieten. Wer dort bestellt, bekommt oft gar keine Ware.'], ['_', 'Experten raten: Bezahlen Sie bei unbekannten Shops nie per Vorkasse, und lesen Sie die Bewertungen anderer Kunden.']], q: 'Die Verbraucherzentrale stellt neue günstige Online-Shops vor.', o: RF, a: 1, ex: 'It is a warning: „Die Verbraucherzentrale warnt vor falschen Internetseiten“ (warns about fake websites). It does not recommend cheap shops.' },
    ],
  }));

  add(Object.assign({}, H2, {
    id: 'telc-b1-hoeren-2', level: 'B1', exam: 'telc', module: 'hoeren', teil: 2, kind: 'mc', plays: 2,
    gloss: [['die Ausbildung', 'apprenticeship / vocational training'], ['die Tischlerin', '(female) carpenter / joiner'], ['das Studium abbrechen', 'to drop out of university'], ['skeptisch', 'sceptical'], ['die Werkstatt', 'workshop'], ['die Berufsschule', 'vocational school'], ['der Blockunterricht', 'block teaching (several weeks at a time)'], ['die Gesellin', 'qualified journeywoman'], ['die Meisterschule', 'master craftsman school'], ['das Praktikum', 'internship']],
    audio: [
      ['braun', 'Herzlich willkommen bei „Beruf und Leben“! Mein Gast heute ist Lisa Kessler. Sie ist 24 Jahre alt und macht eine Ausbildung zur Tischlerin. Hallo, Frau Kessler!'],
      ['jana', 'Hallo, vielen Dank für die Einladung.'],
      ['braun', 'Frau Kessler, Sie haben nach dem Abitur zuerst studiert, oder?'],
      ['jana', 'Ja, genau. Ich habe drei Semester Betriebswirtschaft studiert. Aber ich habe schnell gemerkt, dass das nichts für mich ist.'],
      ['jana', 'Den ganzen Tag am Schreibtisch sitzen und nur Theorie lernen – mir hat die praktische Arbeit total gefehlt.'],
      ['braun', 'Und dann haben Sie das Studium abgebrochen?'],
      ['jana', 'Ja. Das war keine leichte Entscheidung. Mein Vater fand die Idee von Anfang an gut, er repariert selbst gern Sachen. Aber meine Mutter war erst ziemlich skeptisch. Sie hatte Angst, dass ich später wenig verdiene.'],
      ['braun', 'Und heute?'],
      ['jana', 'Heute ist sie richtig stolz. Letzte Woche habe ich ihr einen kleinen Tisch gebaut, der steht jetzt in ihrem Wohnzimmer.'],
      ['braun', 'Wie sieht denn ein normaler Arbeitstag bei Ihnen aus?'],
      ['jana', 'Ich stehe früh auf. Um halb sieben bin ich schon unterwegs, und um sieben fangen wir in der Werkstatt an. Feierabend ist meistens um halb vier.'],
      ['braun', 'Und die Berufsschule? Gehen Sie da jede Woche hin?'],
      ['jana', 'Nein, bei uns ist das anders. Wir haben Blockunterricht, also dreimal im Jahr drei Wochen am Stück. In der Zeit bin ich gar nicht im Betrieb.'],
      ['braun', 'Ganz ehrlich: Kann man von einem Ausbildungsgehalt leben?'],
      ['jana', 'Na ja, im zweiten Jahr bekomme ich ungefähr 900 Euro. Ich wohne in einer WG, das ist günstig. Aber große Sprünge kann ich nicht machen. Urlaub zum Beispiel ist im Moment nicht drin.'],
      ['braun', 'Im Handwerk arbeiten ja immer noch mehr Männer als Frauen. Wie ist das bei Ihnen?'],
      ['jana', 'In unserer Werkstatt sind wir sieben Leute, und ich bin die einzige Frau. Aber die Kollegen haben mich vom ersten Tag an super aufgenommen. Das war nie ein Problem.'],
      ['braun', 'Was gefällt Ihnen am meisten an Ihrem Beruf?'],
      ['jana', 'Dass ich am Abend sehe, was ich gemacht habe. Morgens liegt da ein Stück Holz, und am Ende steht da ein Regal oder ein Stuhl. Das ist ein tolles Gefühl.'],
      ['braun', 'Und wie geht es nach der Ausbildung weiter? Gleich eine eigene Werkstatt?'],
      ['jana', 'Irgendwann vielleicht. Aber zuerst möchte ich ein paar Jahre als Gesellin arbeiten und Erfahrung sammeln. Danach mache ich vielleicht die Meisterschule.'],
      ['braun', 'Zum Schluss: Was raten Sie jungen Leuten, die nicht wissen, ob eine Ausbildung das Richtige für sie ist?'],
      ['jana', 'Macht unbedingt vorher ein Praktikum! Zwei Wochen in einem Betrieb zeigen einem mehr als jede Broschüre.'],
      ['braun', 'Vielen Dank, Frau Kessler, und weiterhin viel Erfolg!'],
    ],
    items: [
      { q: 'Frau Kessler hat ihr Studium abgeschlossen, bevor sie die Ausbildung begonnen hat.', o: RF, a: 1, ex: 'She studied for three semesters and then „das Studium abgebrochen“ (dropped out) – she did not finish.' },
      { q: 'Im Studium hat ihr die praktische Arbeit gefehlt.', o: RF, a: 0, ex: '„mir hat die praktische Arbeit total gefehlt“ (I really missed practical work).' },
      { q: 'Ihre Eltern waren sofort von ihrer Entscheidung begeistert.', o: RF, a: 1, ex: 'Only her father liked the idea; „meine Mutter war erst ziemlich skeptisch“ (my mother was quite sceptical at first).' },
      { q: 'Die Arbeit in der Werkstatt beginnt um sieben Uhr.', o: RF, a: 0, ex: '„Um halb sieben bin ich schon unterwegs, und um sieben fangen wir in der Werkstatt an.“ 6:30 is when she leaves home; work starts at 7.' },
      { q: 'Sie geht jede Woche einen Tag in die Berufsschule.', o: RF, a: 1, ex: '„Nein … Wir haben Blockunterricht, also dreimal im Jahr drei Wochen am Stück“ (three weeks at a time, three times a year).' },
      { q: 'Mit ihrem Ausbildungsgehalt kann sie sich alles leisten, was sie möchte.', o: RF, a: 1, ex: '„große Sprünge kann ich nicht machen. Urlaub … ist im Moment nicht drin“ (I can’t afford much; a holiday isn’t possible at the moment).' },
      { q: 'Die Kollegen in der Werkstatt haben sie gut aufgenommen.', o: RF, a: 0, ex: '„die Kollegen haben mich vom ersten Tag an super aufgenommen“ (my colleagues welcomed me really well from day one).' },
      { q: 'Besonders gut gefällt ihr, dass sie am Ende des Tages ein Ergebnis sieht.', o: RF, a: 0, ex: '„Dass ich am Abend sehe, was ich gemacht habe.“ (That in the evening I see what I have made.)' },
      { q: 'Direkt nach der Ausbildung möchte sie eine eigene Werkstatt eröffnen.', o: RF, a: 1, ex: '„Irgendwann vielleicht. Aber zuerst möchte ich ein paar Jahre als Gesellin arbeiten“ – first a few years of work, maybe later the Meisterschule.' },
      { q: 'Sie rät jungen Leuten, vor der Ausbildung ein Praktikum zu machen.', o: RF, a: 0, ex: '„Macht unbedingt vorher ein Praktikum!“ (Definitely do an internship first!)' },
    ],
  }));

  add(Object.assign({}, H3, {
    id: 'telc-b1-hoeren-3', level: 'B1', exam: 'telc', module: 'hoeren', teil: 3, kind: 'mc', plays: 2,
    gloss: [['die Verspätung', 'delay'], ['das Gleis', 'platform / track'], ['die Wagenreihung', 'order of the carriages'], ['dringend', 'urgent'], ['das Rezept', 'prescription'], ['das Freibad', 'outdoor pool'], ['das Hallenbad', 'indoor pool'], ['das Sonderangebot', 'special offer'], ['die Bremse', 'brake'], ['abholen', 'to pick up']],
    items: [
      { audio: [['_', 'Achtung am Gleis 7: Der ICE 578 nach Hamburg, planmäßige Abfahrt vierzehn Uhr zwölf, hat heute etwa 20 Minuten Verspätung.'], ['_', 'Außerdem fährt der Zug heute nicht von Gleis 7, sondern von Gleis 9 ab. Bitte beachten Sie auch die geänderte Wagenreihung.']], q: 'Der ICE nach Hamburg fährt heute von Gleis 7 ab.', o: RF, a: 1, ex: '„nicht von Gleis 7, sondern von Gleis 9“ – the platform has changed to 9.' },
      { audio: [['_', 'Sie sind verbunden mit der Praxis Dr. Albers. Wir sind vom 12. bis zum 23. August im Urlaub. In dringenden Fällen wenden Sie sich bitte an die Praxis Dr. Lindner in der Bahnhofstraße 4.'], ['_', 'Ab dem 26. August sind wir wieder für Sie da. Rezepte können Sie jederzeit auch online bestellen.']], q: 'Während des Urlaubs soll man in dringenden Fällen zu einer anderen Praxis gehen.', o: RF, a: 0, ex: '„In dringenden Fällen wenden Sie sich bitte an die Praxis Dr. Lindner“ (in urgent cases please contact Dr Lindner’s practice).' },
      { audio: [['mia', 'Hallo, hier ist Mia. Wegen Samstag: Wir wollten uns ja um zehn am Freibad treffen. Das Freibad ist aber wegen Reparaturen geschlossen.'], ['mia', 'Wollen wir stattdessen ins Hallenbad am Marktplatz gehen? Dann aber lieber um elf, ich muss vorher noch einkaufen. Ruf mich kurz zurück!']], q: 'Mia schlägt vor, sich um elf Uhr zu treffen.', o: RF, a: 0, ex: 'First they planned 10 o’clock, but now: „Dann aber lieber um elf“ (better at eleven then).' },
      { audio: [['_', 'Liebe Kundinnen und Kunden, nur heute bis 20 Uhr: alle Bio-Äpfel und Bio-Birnen 30 Prozent günstiger! Und an unserer Fleischtheke gibt es frische Hähnchenbrust für nur 8 Euro 99 das Kilo.'], ['_', 'Bitte beachten Sie: Kasse 3 ist heute geschlossen. Vielen Dank für Ihren Einkauf.']], q: 'Das Sonderangebot für Obst gilt die ganze Woche.', o: RF, a: 1, ex: '„nur heute bis 20 Uhr“ (only today until 8 pm) – not the whole week.' },
      { audio: [['schulz', 'Guten Tag, Herr Kowalski, hier ist Fahrrad Hübner. Ihr Rad ist fertig. Wir haben die Bremsen erneuert und das Licht repariert, die Kette war doch in Ordnung. Das macht zusammen 65 Euro.'], ['schulz', 'Sie können das Rad ab morgen früh um neun abholen. Heute schließen wir leider schon um 16 Uhr.']], q: 'Herr Kowalski kann sein Fahrrad heute noch abholen.', o: RF, a: 1, ex: '„Sie können das Rad ab morgen früh um neun abholen“ (from 9 tomorrow morning) – today the shop closes early.' },
    ],
  }));

  add(Object.assign({}, W, {
    id: 'telc-b1-schreiben', level: 'B1', exam: 'telc', module: 'schreiben', teil: 1,
    gloss: [['das Abitur', 'school-leaving exam (A levels)'], ['die Ausbildung als Koch', 'training as a cook'], ['das Studium', 'university studies'], ['die Erfahrung', 'experience'], ['der Rat', 'advice'], ['das Praktikum', 'internship'], ['zufrieden', 'satisfied'], ['in Ruhe', 'calmly / without hurry']],
    task: 'Sie haben von Ihrem Freund Jonas folgende E-Mail bekommen:\n\n„Hallo! Wie geht es dir? Bei mir gibt es große Neuigkeiten: Im Sommer mache ich mein Abitur, und danach weiß ich noch nicht genau, was ich machen soll. Meine Eltern möchten, dass ich studiere. Aber eigentlich möchte ich lieber eine Ausbildung als Koch machen. Was meinst du? Du hast doch schon Erfahrungen damit. Schreib mir bald! Viele Grüße, Jonas“\n\nAntworten Sie Jonas. Schreiben Sie etwas zu allen vier Punkten unten. Überlegen Sie sich dabei eine passende Reihenfolge der Punkte. Vergessen Sie nicht Anrede und Gruß.',
    taskEn: 'You have received the following email from your friend Jonas:\n\n“Hi! How are you? I have big news: I’m doing my final school exams in the summer, and I don’t really know what to do afterwards. My parents want me to go to university. But actually I’d rather do an apprenticeship as a cook. What do you think? You already have experience with this. Write soon! Best wishes, Jonas”\n\nAnswer Jonas. Write something about all four points below. Think of a suitable order for the points. Don’t forget the greeting and closing.',
    points: ['Dank für die E-Mail und Reaktion auf die Neuigkeiten', 'Ihre eigenen Erfahrungen mit Ausbildung oder Studium', 'Ihr Rat für Jonas', 'Vorschlag für ein Treffen'],
    pointsEn: ['Thanks for the email and reaction to the news', 'Your own experience with training or university', 'Your advice for Jonas', 'Suggestion for a meeting'],
    model: 'Lieber Jonas,\n\nvielen Dank für deine E-Mail! Ich habe mich sehr gefreut, von dir zu hören. Toll, dass du bald dein Abitur machst – ich drücke dir die Daumen!\n\nIch kann gut verstehen, dass die Entscheidung schwer ist. Bei mir war es ähnlich: Nach der Schule habe ich zuerst ein Jahr Informatik studiert, aber das war mir zu theoretisch. Dann habe ich eine Ausbildung als Hotelfachmann gemacht, und heute bin ich sehr zufrieden.\n\nMein Rat: Mach doch zuerst ein Praktikum in einem Restaurant. Dann siehst du, ob dir die Arbeit wirklich Spaß macht. Sprich auch offen mit deinen Eltern. Wenn du ihnen erklärst, warum dir der Beruf so wichtig ist, verstehen sie dich bestimmt.\n\nHast du Lust, dich bald mit mir zu treffen? Ich komme im Mai nach Köln. Wir könnten zusammen essen gehen und in Ruhe über alles sprechen.\n\nLiebe Grüße\nDeniz',
    modelEn: 'Dear Jonas,\n\nthank you very much for your email! I was very happy to hear from you. Great that you’re doing your final exams soon – I’m keeping my fingers crossed for you!\n\nI can understand that the decision is difficult. It was similar for me: after school I first studied computer science for a year, but it was too theoretical for me. Then I did an apprenticeship as a hotel specialist, and today I’m very satisfied.\n\nMy advice: why don’t you do an internship in a restaurant first? Then you’ll see whether you really enjoy the work. Also talk openly to your parents. If you explain to them why the job is so important to you, they will surely understand you.\n\nWould you like to meet up with me soon? I’m coming to Cologne in May. We could go out for a meal together and talk about everything calmly.\n\nBest wishes\nDeniz',
    redemittel: [['Vielen Dank für deine E-Mail!', 'Thank you very much for your email!'], ['Ich habe mich sehr gefreut, von dir zu hören.', 'I was very happy to hear from you.'], ['Ich kann gut verstehen, dass …', 'I can understand that …'], ['Bei mir war es ähnlich: …', 'It was similar for me: …'], ['Mein Rat: …', 'My advice: …'], ['An deiner Stelle würde ich …', 'If I were you, I would …'], ['Hast du Lust, dich … mit mir zu treffen?', 'Would you like to meet up with me …?'], ['Wir könnten zusammen …', 'We could … together'], ['Ich freue mich auf deine Antwort.', 'I look forward to your answer.'], ['Liebe Grüße / Viele Grüße', 'Best wishes (informal)']],
    check: ['Informal greeting (Lieber Jonas,) and closing (Liebe Grüße + name)?', 'All 4 points answered, each in its own paragraph?', 'About 120 words or a little more?', 'du-form used consistently (dir, dich, deine)?', 'Verb at the end after weil, dass, wenn, ob?', 'Sentences connected (deshalb, dann, aber, außerdem)?'],
  }));

  add({
    id: 'telc-b1-sprechen-2', level: 'B1', exam: 'telc', module: 'sprechen', teil: 2, kind: 'speak',
    title: 'Mündlicher Ausdruck Teil 2 – Gespräch über ein Thema',
    en: 'Each partner reads a short text or statistic on the same topic, reports it, talks about own experience and then you discuss together (about 5 minutes).',
    minutes: 6,
    instr: 'Sie haben einen kurzen Text oder eine Grafik zu einem Thema gelesen. Berichten Sie Ihrer Gesprächspartnerin / Ihrem Gesprächspartner kurz, worum es geht. Erzählen Sie dann von Ihren eigenen Erfahrungen und sprechen Sie gemeinsam über das Thema.',
    instrEn: 'You have read a short text or a chart about a topic. Tell your partner briefly what it is about. Then talk about your own experience and discuss the topic together.',
    tip: 'Report your card in 3–4 sentences in your own words (Thema, wichtigste Zahl/Info, deine Meinung). Then ask your partner questions – the examiners want a real conversation, not two monologues.',
    gloss: [['die Umfrage', 'survey'], ['berufstätig', 'working / employed'], ['die Kantine', 'canteen'], ['der Lieferdienst', 'delivery service'], ['der Zeitmangel', 'lack of time'], ['mehrmals', 'several times'], ['vorkochen', 'to cook in advance'], ['die Zutat', 'ingredient']],
    task: 'Thema: Selbst kochen oder Essen bestellen?\n\nKandidat/in A hat einen kurzen Zeitungstext gelesen, Kandidat/in B eine Grafik. Berichten Sie Ihrem Partner / Ihrer Partnerin, was Sie gelesen haben. Erzählen Sie dann, wie das bei Ihnen ist: Kochen Sie selbst? Wie war das in Ihrer Familie oder in Ihrem Heimatland? Sprechen Sie danach gemeinsam über Vor- und Nachteile.',
    taskEn: 'Topic: Cook yourself or order food?\n\nCandidate A has read a short newspaper text, candidate B a chart. Tell your partner what you read. Then say how it is for you: Do you cook yourself? How was it in your family or your home country? Then discuss the advantages and disadvantages together.',
    cards: [
      { t: 'Kandidat/in A – Zeitungstext:\n„Kochen? Keine Zeit!“\nNach einer neuen Umfrage kocht nur noch jeder dritte Berufstätige jeden Tag selbst. Mittags essen viele in der Kantine oder kaufen schnell etwas beim Bäcker. Abends bestellen besonders junge Leute oft beim Lieferdienst. Als Gründe nennen sie Zeitmangel und Stress im Job.', en: 'Candidate A – newspaper text: “Cooking? No time!” According to a new survey, only one in three working people still cooks every day. At lunchtime many eat in the canteen or quickly buy something at the bakery. In the evening young people in particular often order from a delivery service. They give lack of time and stress at work as reasons.' },
      { t: 'Kandidat/in B – Grafik:\n„Wie oft kochen Sie selbst?“ (Umfrage, 1.000 Personen)\n• jeden Tag: 39 %\n• mehrmals pro Woche: 33 %\n• selten: 20 %\n• nie: 8 %', en: 'Candidate B – chart: “How often do you cook yourself?” (survey, 1,000 people) every day 39 % · several times a week 33 % · rarely 20 % · never 8 %' },
    ],
    model: [
      ['In meinem Text geht es darum, dass viele Berufstätige nicht mehr jeden Tag kochen. Nur noch jeder Dritte kocht täglich selbst.', 'My text is about the fact that many working people no longer cook every day. Only one in three still cooks every day.'],
      ['Viele essen mittags in der Kantine, und abends bestellen besonders junge Leute beim Lieferdienst – weil sie keine Zeit haben oder gestresst sind.', 'Many eat in the canteen at lunchtime, and in the evening young people in particular order from a delivery service – because they have no time or are stressed.'],
      ['Interessant! Meine Grafik zeigt etwas Ähnliches, aber nicht so extrem. 39 Prozent der Befragten kochen jeden Tag, 33 Prozent mehrmals pro Woche.', 'Interesting! My chart shows something similar, but not so extreme. 39 percent of the people asked cook every day, 33 percent several times a week.'],
      ['Nur 8 Prozent kochen nie. Das hat mich überrascht, ich dachte, die Zahl wäre höher.', 'Only 8 percent never cook. That surprised me, I thought the number was higher.'],
      ['Und wie ist das bei dir? Kochst du oft selbst?', 'And what about you? Do you often cook yourself?'],
      ['Unter der Woche leider nicht so oft. Ich arbeite bis sechs, und danach bin ich oft zu müde. Aber am Sonntag koche ich gern und mache gleich etwas für Montag und Dienstag mit.', 'During the week unfortunately not very often. I work until six and afterwards I’m often too tired. But on Sundays I like cooking and make something for Monday and Tuesday at the same time.'],
      ['Das ist eine gute Idee. Bei mir ist es anders: Ich koche fast jeden Abend, weil es günstiger und gesünder ist.', 'That’s a good idea. It’s different for me: I cook almost every evening because it’s cheaper and healthier.'],
      ['In meinem Heimatland, in der Türkei, hat meine Mutter jeden Tag frisch gekocht. Essen bestellen war für uns etwas ganz Besonderes.', 'In my home country, Turkey, my mother cooked fresh food every day. Ordering food was something really special for us.'],
      ['Das kenne ich. In Polen ist es bei meinen Großeltern genauso. Aber ich finde, Bestellen hat auch Vorteile. Es geht schnell, und man kann Gerichte aus vielen Ländern probieren.', 'I know that. In Poland it’s exactly the same with my grandparents. But I think ordering also has advantages. It’s quick and you can try dishes from many countries.'],
      ['Das stimmt. Aber es ist ziemlich teuer, und man weiß nicht genau, was im Essen ist. Außerdem produziert man viel Verpackungsmüll.', 'That’s true. But it’s quite expensive and you don’t know exactly what’s in the food. Besides, you produce a lot of packaging waste.'],
      ['Da hast du recht. Vielleicht ist die Lösung, einfache Gerichte zu kochen, die schnell gehen – zum Beispiel Nudeln mit Gemüse in zwanzig Minuten.', 'You’re right. Maybe the solution is to cook simple dishes that are quick – for example pasta with vegetables in twenty minutes.'],
      ['Genau. Oder man kocht zusammen mit Freunden. Dann macht es mehr Spaß, und man isst nicht allein.', 'Exactly. Or you cook together with friends. Then it’s more fun and you don’t eat alone.'],
      ['Gute Idee! Vielleicht können wir das mal zusammen machen.', 'Good idea! Maybe we can do that together some time.'],
      ['Sehr gern! Dann koche ich mein Lieblingsgericht aus der Türkei.', 'I’d love to! Then I’ll cook my favourite dish from Turkey.'],
    ],
    redemittel: [['In meinem Text geht es um …', 'My text is about …'], ['Die Grafik zeigt, dass …', 'The chart shows that …'], ['… Prozent der Befragten …', '… percent of the people asked …'], ['Das hat mich überrascht.', 'That surprised me.'], ['Wie ist das bei dir?', 'What about you?'], ['Bei mir ist es anders / ähnlich.', 'It’s different / similar for me.'], ['In meinem Heimatland …', 'In my home country …'], ['Ein Vorteil / Nachteil ist, dass …', 'One advantage / disadvantage is that …'], ['Da hast du recht, aber …', 'You’re right, but …'], ['Ich bin da anderer Meinung.', 'I see it differently.']],
    check: ['Did you report the main information of your card in your own words?', 'Did you mention at least one number from the chart or text?', 'Did you talk about your own experience and your home country?', 'Did you ask your partner questions and react to their answers?', 'Did you give at least one advantage and one disadvantage?'],
  });

  /* =====================================================================
     MOCK EXAM – telc Deutsch B1
     ===================================================================== */

  add(Object.assign({}, L1, {
    id: 'mock-telc-lesen-1', level: 'B1', exam: 'telc', module: 'lesen', teil: 1, kind: 'match',
    gloss: [['die Bohrmaschine', 'drill'], ['der Stadtteil', 'district'], ['verleihen', 'to lend'], ['die Gewerkschaft', 'trade union'], ['der Warnstreik', 'warning strike'], ['betroffen', 'affected'], ['belegt', 'occupied / booked'], ['unter freiem Himmel', 'outdoors'], ['ausfallen', 'to be cancelled'], ['der Ladenschluss', 'closing time (shops)']],
    ads: [
      { k: 'a', t: 'Nachbarschafts-App bringt Menschen im Viertel zusammen' },
      { k: 'b', t: 'Neue Buslinie zum Flughafen' },
      { k: 'c', t: 'Montag: Busse bleiben im Depot' },
      { k: 'd', t: 'Weniger Touristen an Nord- und Ostsee' },
      { k: 'e', t: 'Urlaub am Meer: Kaum noch freie Zimmer' },
      { k: 'f', t: 'Tierheim sucht ein Zuhause für Katzen' },
      { k: 'g', t: 'Sport im Park – kostenlos und für alle' },
      { k: 'h', t: 'Fitnessstudios werden teurer' },
      { k: 'i', t: 'Traditionsbäckerei schließt nach 80 Jahren' },
      { k: 'j', t: 'Lebensmittel: Günstig kaufen statt wegwerfen' },
    ],
    items: [
      { q: '„Kann mir jemand eine Bohrmaschine leihen?“ – Solche Fragen stellen die Bewohner des Stadtteils Lindenau jetzt einfach online. Seit einem halben Jahr gibt es dort eine App, über die sich Nachbarn kennenlernen, Dinge verleihen oder gemeinsam etwas unternehmen können. Schon 2.000 Menschen machen mit. „Früher kannte ich in meinem Haus niemanden, heute treffen wir uns jeden Monat zum Grillen“, erzählt eine Nutzerin begeistert.', a: 'a', ex: 'An app „über die sich Nachbarn kennenlernen“ (through which neighbours get to know each other) → the app brings people in the district together.' },
      { q: 'Wer am Montag mit dem Bus zur Arbeit oder zur Schule fahren will, sollte einen anderen Weg planen. Die Gewerkschaft hat die Busfahrer der städtischen Verkehrsbetriebe zu einem ganztägigen Warnstreik aufgerufen. Sie fordern mehr Geld und kürzere Schichten. Straßenbahnen und S-Bahnen fahren nach Plan. Auch die Linie zum Flughafen ist nicht betroffen, denn sie wird von einer privaten Firma betrieben.', a: 'c', ex: '„ganztägigen Warnstreik“ of the bus drivers on Monday → the buses stay in the depot. The airport line is mentioned, but there is no NEW line (b).' },
      { q: 'Wer noch spontan Urlaub an der Nord- oder Ostsee machen möchte, hat schlechte Karten. Laut Tourismusverband sind Hotels und Ferienwohnungen in den Sommerferien zu über 95 Prozent belegt. Viele Deutsche verbringen ihren Urlaub lieber im eigenen Land, weil Flüge teuer geworden sind. Freie Zimmer gibt es fast nur noch im September – dann aber oft zu günstigeren Preisen.', a: 'e', ex: '„zu über 95 Prozent belegt“ (over 95 % booked) → hardly any free rooms. There are MORE tourists, not fewer, so (d) is the opposite.' },
      { q: 'Yoga am Morgen, Fitness am Abend – und das alles ohne Mitgliedsbeitrag: Von Juni bis September bietet die Stadt in fünf Parks Sportkurse unter freiem Himmel an. Eine Anmeldung ist nicht nötig, man kommt einfach vorbei. Die Trainerinnen und Trainer kommen aus Sportvereinen der Stadt. Nur bei starkem Regen fallen die Kurse aus. Das Programm findet man auf der Internetseite der Stadt.', a: 'g', ex: '„ohne Mitgliedsbeitrag … in fünf Parks Sportkurse“ (sports classes in five parks without a membership fee) → sport in the park, free for everyone. Gyms (h) are not the topic.' },
      { q: 'Ein Brötchen vom Morgen für 30 Cent oder eine große Portion Nudeln für drei Euro: Über eine neue App verkaufen Bäckereien, Restaurants und Supermärkte am Abend Essen, das sie sonst wegwerfen müssten. Die Kunden bestellen und bezahlen in der App und holen ihre Tüte kurz vor Ladenschluss ab. Was genau drin ist, ist oft eine Überraschung. Schon über 300 Geschäfte in der Region machen mit.', a: 'j', ex: '„Essen, das sie sonst wegwerfen müssten“ (food they would otherwise have to throw away) is sold cheaply. The bakery is open – nothing closes (i).' },
    ],
  }));

  add(Object.assign({}, L2, {
    id: 'mock-telc-lesen-2', level: 'B1', exam: 'telc', module: 'lesen', teil: 2, kind: 'mc',
    gloss: [['die Buchhandlung', 'bookshop'], ['der Umsatz', 'turnover / sales'], ['aufgeben', 'to give up'], ['die Lesung', 'author reading'], ['beraten', 'to advise'], ['der Handelsverband', 'retail association'], ['die Ladenfläche', 'shop premises'], ['der Zuschuss', 'subsidy / grant'], ['sich lohnen', 'to be worth it'], ['das Viertel', 'quarter (¼)']],
    text: 'Der Laden um die Ecke wehrt sich\n\nAls Sabine Krüger vor fünfzehn Jahren ihre kleine Buchhandlung in der Kasseler Innenstadt eröffnete, kamen die Kunden noch von allein. „Damals war der Samstag der wichtigste Tag. Der Laden war so voll, dass man kaum durchkam“, erinnert sie sich. Heute sieht das anders aus. Viele Menschen bestellen ihre Bücher lieber im Internet – bequem vom Sofa aus und oft schon am nächsten Tag geliefert.\n\nVor drei Jahren war Krüger kurz davor aufzugeben. Der Umsatz war um ein Drittel gesunken, gleichzeitig war die Miete gestiegen. „Ich hatte zwei Möglichkeiten: schließen oder etwas Neues ausprobieren“, sagt sie. Sie entschied sich für das Neue. Zuerst baute sie eine eigene Internetseite, auf der Kunden Bücher bestellen können. Wer bis 18 Uhr bestellt, kann das Buch am nächsten Morgen im Laden abholen. Kunden, die in der Innenstadt wohnen, bekommen es auch mit dem Fahrrad nach Hause gebracht.\n\nAußerdem hat Krüger aus ihrem Laden einen Treffpunkt gemacht. Einmal im Monat gibt es Lesungen mit Autorinnen und Autoren aus der Region, und dienstags trifft sich ein Lesekreis in der kleinen Café-Ecke, die sie hinten im Laden eingerichtet hat. „Die Leute wollen nicht nur ein Produkt kaufen. Sie wollen beraten werden und andere Menschen treffen. Das kann das Internet nicht“, meint sie.\n\nMit ihrer Idee ist sie nicht allein. Nach einer Umfrage des Handelsverbands verkauft inzwischen fast jedes zweite kleine Geschäft in Deutschland seine Waren auch online. Trotzdem schließen jedes Jahr Tausende Läden. Besonders schwer haben es Modegeschäfte und Elektronikhändler, weil die Preise im Internet oft deutlich niedriger sind.\n\nAuch die Städte haben das Problem erkannt. Kassel unterstützt Geschäfte, die in leere Ladenflächen einziehen, im ersten Jahr mit einem Zuschuss zur Miete. Außerdem soll die Innenstadt schöner werden: mit mehr Bänken, Bäumen und Spielplätzen. „Die Menschen müssen wieder gern in die Stadt kommen, auch wenn sie gar nichts kaufen wollen“, sagt ein Sprecher der Stadt.\n\nFür Sabine Krüger hat sich die Arbeit gelohnt. Ihr Umsatz ist wieder fast so hoch wie früher – etwa ein Viertel davon kommt aus dem Onlineshop. Den Samstag mag sie trotzdem immer noch am liebsten.',
    items: [
      { q: 'Warum wollte Frau Krüger vor drei Jahren fast aufhören?', o: ['Sie hatte keine Lust mehr auf die Arbeit.', 'Sie verkaufte weniger und musste mehr Miete zahlen.', 'Ihr Laden war samstags zu voll.'], a: 1, ex: '„Der Umsatz war um ein Drittel gesunken, gleichzeitig war die Miete gestiegen.“ (Sales had fallen by a third and at the same time the rent had gone up.) The full shop on Saturdays was in the past.' },
      { q: 'Welchen Service bietet Frau Krüger heute an?', o: ['Sie schickt bestellte Bücher mit der Post in die ganze Stadt.', 'Man kann online bestellen und das Buch am nächsten Tag im Laden abholen.', 'Online bestellte Bücher sind billiger als im Laden.'], a: 1, ex: '„Wer bis 18 Uhr bestellt, kann das Buch am nächsten Morgen im Laden abholen.“ Delivery is only by bike and only in the city centre – not by post to the whole city.' },
      { q: 'Was ist für Frau Krüger der Vorteil eines Ladens gegenüber dem Internet?', o: ['Die Preise sind niedriger.', 'Die Auswahl ist größer.', 'Man wird beraten und trifft andere Menschen.'], a: 2, ex: '„Sie wollen beraten werden und andere Menschen treffen. Das kann das Internet nicht.“ (They want advice and to meet other people. The internet can’t do that.)' },
      { q: 'Was zeigt die Umfrage des Handelsverbands?', o: ['Fast die Hälfte der kleinen Geschäfte verkauft auch im Internet.', 'Modegeschäfte haben die wenigsten Probleme.', 'Immer weniger Läden müssen schließen.'], a: 0, ex: '„fast jedes zweite kleine Geschäft … verkauft … auch online“ (almost every second small shop also sells online) = almost half. Fashion shops have it especially hard, and thousands still close every year.' },
      { q: 'Wie hilft die Stadt Kassel?', o: ['Sie bezahlt für alle Geschäfte die Miete.', 'Neue Geschäfte in leeren Läden bekommen im ersten Jahr Geld für die Miete.', 'Sie baut neue Parkplätze in der Innenstadt.'], a: 1, ex: '„Geschäfte, die in leere Ladenflächen einziehen, im ersten Jahr mit einem Zuschuss zur Miete“ – only new shops in empty premises, only in the first year, and only a contribution.' },
    ],
  }));

  add(Object.assign({}, L3, {
    id: 'mock-telc-lesen-3', level: 'B1', exam: 'telc', module: 'lesen', teil: 3, kind: 'match', x: true,
    gloss: [['die Ferienwohnung', 'holiday flat'], ['Haustiere erlaubt', 'pets allowed'], ['möbliert', 'furnished'], ['der Pendler', 'commuter'], ['warm (Miete)', 'rent incl. heating'], ['der Stellplatz', 'pitch / parking space'], ['die Gastfamilie', 'host family'], ['kündbar', 'can be cancelled'], ['die Möbelmontage', 'furniture assembly'], ['die Unterkunft', 'accommodation']],
    ads: [
      { k: 'a', title: 'Ferienwohnung „Strandgut“, Ostsee', t: 'Für 2–4 Personen, nur 200 m zum Strand, Terrasse mit Meerblick. Haustiere erlaubt! Ab 75 € pro Nacht.' },
      { k: 'b', title: 'Jugendherberge am Bodensee', t: 'Zimmer für Familien und Gruppen, Fahrradverleih, Frühstück inklusive. Ideal für Klassenfahrten.' },
      { k: 'c', title: 'Umzugsservice Schnell & Sicher', t: 'Wir helfen beim Umzug innerhalb der Stadt – auch kurzfristig. Mit Möbelmontage und Kartons. Kostenloses Angebot!' },
      { k: 'd', title: 'WG-Zimmer frei', t: '14 m² in netter 3er-WG, 5 Minuten zur Uni. 380 € warm. Frei ab 1. November. Nur Nichtraucher.' },
      { k: 'e', title: 'Wohnen auf Zeit', t: 'Möblierte 1-Zimmer-Wohnung für Pendler, Montag bis Freitag, zentral gelegen, Internet inklusive. 550 € im Monat.' },
      { k: 'f', title: 'Reparaturcafé Nordstadt', t: 'Kaputter Toaster, Lampe oder Hose? Gemeinsam reparieren statt wegwerfen! Jeden ersten Samstag im Monat, 14–17 Uhr. Eintritt frei.' },
      { k: 'g', title: 'Agentur Saubermann', t: 'Wir vermitteln zuverlässige Reinigungskräfte für Ihren Haushalt – stundenweise oder regelmäßig.' },
      { k: 'h', title: 'Sprachreisen Sun & Learn', t: 'Englisch lernen auf Malta: 2 Wochen Unterricht am Vormittag, Freizeit am Strand, Unterkunft in Gastfamilien. 1.290 €.' },
      { k: 'i', title: 'Campingplatz Seeblick', t: 'Stellplätze für Zelte und Wohnmobile direkt am See. Kinderspielplatz, Bootsverleih. Geöffnet von Mai bis September.' },
      { k: 'j', title: 'Kochkurs „Schnell und gesund“', t: 'Für Berufstätige: gesunde Gerichte in 30 Minuten. 4 Abende, jeweils dienstags, 95 €.' },
      { k: 'k', title: 'Fahrschule Wagner', t: 'Führerschein Klasse B: Intensivkurs in den Ferien – in drei Wochen zum Führerschein! Ab 17 Jahren.' },
      { k: 'l', title: 'Frischkiste', t: 'Bio-Obst und -Gemüse aus der Region – jede Woche bis an Ihre Haustür. Jederzeit kündbar.' },
    ],
    items: [
      { q: 'Ein Student sucht ab November ein günstiges Zimmer in der Nähe der Universität.', a: 'd', ex: '„5 Minuten zur Uni … Frei ab 1. November“ – near the university and free from November.' },
      { q: 'Ihre Kollegin arbeitet unter der Woche in Ihrer Stadt und fährt am Wochenende nach Hause. Sie sucht eine Unterkunft.', a: 'e', ex: '„Möblierte 1-Zimmer-Wohnung für Pendler, Montag bis Freitag“ – a flat for commuters during the week.' },
      { q: 'Familie Berger möchte mit ihrem Hund eine Woche Urlaub am Meer machen.', a: 'a', ex: '„200 m zum Strand … Haustiere erlaubt!“ – by the sea and pets are allowed. The campsite (i) is by a lake, not the sea.' },
      { q: 'Ihr Toaster funktioniert nicht mehr, aber Sie möchten keinen neuen kaufen.', a: 'f', ex: '„Kaputter Toaster … Gemeinsam reparieren statt wegwerfen!“ (repair together instead of throwing away).' },
      { q: 'Ein Bekannter hat wenig Zeit, möchte aber lernen, sich gesünder zu ernähren.', a: 'j', ex: '„Für Berufstätige: gesunde Gerichte in 30 Minuten“ – healthy dishes that are quick to make.' },
      { q: 'Ihre Nichte ist 18 und möchte in den Sommerferien schnell Auto fahren lernen.', a: 'k', ex: '„Intensivkurs in den Ferien – in drei Wochen zum Führerschein!“ (intensive course in the holidays).' },
      { q: 'Sie haben wenig Zeit zum Einkaufen und möchten regelmäßig frisches Gemüse nach Hause geliefert bekommen.', a: 'l', ex: '„jede Woche bis an Ihre Haustür“ (every week to your front door).' },
      { q: 'Ein Freund möchte in seinem Urlaub sein Englisch verbessern.', a: 'h', ex: '„Englisch lernen auf Malta … Freizeit am Strand“ – a language holiday.' },
      { q: 'Ihre Freunde möchten im Sommer mit dem Zelt an einem See Urlaub machen.', a: 'i', ex: '„Stellplätze für Zelte … direkt am See … Mai bis September“ – tent pitches by a lake in summer.' },
      { q: 'Ihre Eltern suchen ein Hotel in den Bergen für ihren Skiurlaub im Winter.', a: 'x', ex: 'No advert offers a hotel in the mountains in winter. The campsite is closed in winter and the others are by the sea or a lake → x.' },
    ],
  }));

  add(Object.assign({}, S1, {
    id: 'mock-telc-sprachbausteine-1', level: 'B1', exam: 'telc', module: 'sprachbausteine', teil: 1, kind: 'cloze',
    gloss: [['zurückkommen (ist zurückgekommen)', 'to come back'], ['die Welle', 'wave'], ['zuschauen (+ Dat.)', 'to watch'], ['der Besitzer', 'owner'], ['die Gegend', 'area / region'], ['der Ausflug', 'excursion'], ['sich ärgern über (+ Akk.)', 'to be annoyed about'], ['sich ein Bild machen', 'to get an idea / picture']],
    text: 'Liebe Sandra,\n\nendlich habe ich Zeit, dir von unserem Urlaub zu erzählen! Wir sind gestern Abend [1] Portugal zurückgekommen. Die zwei Wochen waren wunderschön, [2] das Wetter am Anfang nicht so gut war.\n\nWir haben in einem kleinen Hotel gewohnt, [3] direkt am Meer lag. Jeden Morgen haben wir auf der Terrasse gefrühstückt und [4] Wellen zugeschaut. Die Besitzer waren sehr freundlich und haben uns viele Tipps gegeben, [5] wir die Gegend besser kennenlernen konnten.\n\nDas Highlight war ein Ausflug nach Lissabon. Die Stadt ist viel schöner, [6] ich gedacht hatte! Wir sind mit der alten Straßenbahn gefahren und haben den ganzen Tag Fotos gemacht. Leider hat Paul dort seine Sonnenbrille verloren – er ärgert sich immer noch [7].\n\nUnd du? Hast du schon Pläne für den Sommer? Wenn du Lust hast, [8] wir nächstes Jahr zusammen fahren. Zu viert wäre es bestimmt noch lustiger! Ich schicke dir am Wochenende ein paar Fotos, dann kannst du [9] selbst ein Bild machen.\n\nIch freue mich [10], bald von dir zu hören!\n\nViele Grüße\nNina',
    gaps: [
      { o: ['aus', 'zu', 'bei'], a: 0, ex: 'Coming back FROM a country → aus: „aus Portugal zurückkommen“. zu is not used with country names (zu meinen Eltern, zum Bahnhof), bei = at someone’s place or near a place.' },
      { o: ['obwohl', 'weil', 'trotzdem'], a: 0, ex: 'A contrast with the verb at the end (… nicht so gut war) → obwohl (although). trotzdem would need verb in position 2: „Trotzdem war …“.' },
      { o: ['das', 'die', 'der'], a: 0, ex: 'Relative pronoun for „das Hotel“ (neuter), subject of the clause → das.' },
      { o: ['die', 'den', 'der'], a: 1, ex: 'zuschauen takes the Dativ: „den Wellen zuschauen“ (dative plural: den + noun with -n).' },
      { o: ['damit', 'dass', 'um'], a: 0, ex: 'Purpose with a subject (wir) and the verb at the end → damit (so that). um … zu needs an infinitive without its own subject.' },
      { o: ['als', 'wie', 'dass'], a: 0, ex: 'Comparative + als: „viel schöner, als ich gedacht hatte“ (much more beautiful than I had thought).' },
      { o: ['darüber', 'darauf', 'davon'], a: 0, ex: 'sich ärgern über + Akk. → darüber: „Er ärgert sich darüber.“' },
      { o: ['könnten', 'konnten', 'hätten'], a: 0, ex: 'A polite suggestion uses Konjunktiv II: „Wenn du Lust hast, könnten wir … fahren.“ konnten is past tense, hätten doesn’t go with fahren.' },
      { o: ['dir', 'dich', 'du'], a: 0, ex: 'sich ein Bild machen: the reflexive pronoun is Dativ because „ein Bild“ is the Akkusativ object → „du machst dir ein Bild“.' },
      { o: ['darauf', 'daran', 'dafür'], a: 0, ex: 'sich freuen auf + Akk. = to look forward to (something in the future) → darauf.' },
    ],
  }));

  add(Object.assign({}, S2, {
    id: 'mock-telc-sprachbausteine-2', level: 'B1', exam: 'telc', module: 'sprachbausteine', teil: 2, kind: 'cloze',
    gloss: [['der Fahrgast, die Fahrgäste', 'passenger(s)'], ['abschaffen', 'to abolish'], ['das Abo', 'subscription'], ['die Ermäßigung', 'reduction / discount'], ['der Feiertag', 'public holiday'], ['das Kundenzentrum', 'customer centre'], ['prüfen', 'to check'], ['mitnehmen', 'to take along']],
    words: ['Änderung', 'Meinung', 'auf', 'in', 'per', 'mit', 'ankommen', 'bekommen', 'richtig', 'weiterhin', 'mitnehmen', 'solange', 'obwohl', 'Fahrt', 'Karte'],
    text: 'Liebe Fahrgäste,\n\nab dem 1. Januar gibt es bei den Stadtwerken eine wichtige [1]: Die Monatskarte aus Papier wird abgeschafft. Stattdessen haben alle Abo-Kunden ihr Ticket dann [2] dem Smartphone oder als Chipkarte.\n\nWenn Sie bereits ein Abo haben, müssen Sie nichts tun. Wir schicken Ihnen Ihre neue Chipkarte automatisch [3] Post. Sie sollte spätestens Mitte Dezember bei Ihnen [4]. Bitte prüfen Sie, ob Ihre Adresse noch [5] ist. Änderungen können Sie online im Kundenportal eintragen.\n\nDie Preise bleiben gleich. Schüler, Studierende und Rentner erhalten [6] eine Ermäßigung von 25 Prozent.\n\nNeu ist außerdem: Mit Ihrer Monatskarte dürfen Sie am Wochenende und an Feiertagen eine zweite Person kostenlos [7]. Auch Fahrräder sind dann ohne zusätzliches Ticket erlaubt, [8] genug Platz im Bus ist.\n\nHaben Sie noch Fragen? Unser Team berät Sie gern persönlich [9] unserem Kundenzentrum am Hauptbahnhof oder telefonisch unter 0800 123 456.\n\nWir wünschen Ihnen eine gute [10]!\nIhre Stadtwerke',
    gaps: [
      { a: 'Änderung', ex: '„eine wichtige Änderung“ = an important change. The following sentence explains it.' },
      { a: 'auf', ex: 'Something stored ON a device: „auf dem Smartphone“ (auf + Dativ).' },
      { a: 'per', ex: '„per Post schicken“ = to send by post (per without article). mit would need an article: „mit der Post“.' },
      { a: 'ankommen', ex: '„bei Ihnen ankommen“ = to arrive at your place. The subject is the card (sie), so bekommen doesn’t fit.' },
      { a: 'richtig', ex: '„ob Ihre Adresse noch richtig ist“ = whether your address is still correct.' },
      { a: 'weiterhin', ex: '„erhalten weiterhin eine Ermäßigung“ = will continue to get a discount (as before – the prices stay the same).' },
      { a: 'mitnehmen', ex: '„eine zweite Person kostenlos mitnehmen“ = take a second person along for free. Modal verb dürfen + infinitive at the end.' },
      { a: 'solange', ex: '„solange genug Platz im Bus ist“ = as long as there is enough room on the bus (condition). obwohl (although) makes no sense here.' },
      { a: 'in', ex: 'Location inside a place → in + Dativ: „in unserem Kundenzentrum“.' },
      { a: 'Fahrt', ex: '„Gute Fahrt!“ = have a good journey (by bus/train/car) – a typical closing for transport companies.' },
    ],
  }));

  add(Object.assign({}, H1, {
    id: 'mock-telc-hoeren-1', level: 'B1', exam: 'telc', module: 'hoeren', teil: 1, kind: 'mc', plays: 1,
    gloss: [['die Ausstellung', 'exhibition'], ['der Eröffnungstag', 'opening day'], ['die Hitze', 'heat'], ['die Mannschaft', 'team'], ['die Tabelle', 'league table'], ['gesperrt', 'closed (road/bridge)'], ['umleiten', 'to divert'], ['die Studie', 'study'], ['täglich', 'daily']],
    items: [
      { audio: [['_', 'Und hier unser Tipp für das Wochenende: Im Stadtmuseum beginnt am Samstag die Ausstellung „Unsere Stadt vor hundert Jahren“. Zu sehen sind alte Fotos, Postkarten und Filme.'], ['_', 'Am Eröffnungstag ist der Eintritt frei, danach kostet er sechs Euro.']], q: 'Das Museum zeigt eine Ausstellung über moderne Kunst.', o: RF, a: 1, ex: 'The exhibition is about „Unsere Stadt vor hundert Jahren“ (our town a hundred years ago) – old photos and films, not modern art.' },
      { audio: [['_', 'Die Hitze bleibt: Auch in den nächsten Tagen werden Temperaturen bis 35 Grad erwartet. Ärzte raten, viel Wasser zu trinken und in der Mittagszeit nicht in die Sonne zu gehen.'], ['_', 'Besonders ältere Menschen und kleine Kinder sollten gut aufpassen.']], q: 'In der Meldung geht es um Tipps für heiße Tage.', o: RF, a: 0, ex: '„Die Hitze bleibt … Ärzte raten, viel Wasser zu trinken“ – advice for hot days.' },
      { audio: [['_', 'Sport: Der FC Rot-Weiß hat gestern Abend vor 20.000 Zuschauern gegen Hansa Nord verloren. Zwei zu eins stand es am Ende für die Gäste.'], ['_', 'Damit verliert die Mannschaft den ersten Platz in der Tabelle. Das nächste Spiel ist am Samstag in Bremen.']], q: 'Der FC Rot-Weiß hat sein Spiel gewonnen.', o: RF, a: 1, ex: '„Der FC Rot-Weiß hat … verloren“ (lost) and it loses first place in the table.' },
      { audio: [['_', 'Wichtige Information für alle Pendler: Ab Montag wird die Mainbrücke für vier Wochen gesperrt. Autofahrer werden über die Ringstraße umgeleitet.'], ['_', 'Fußgänger und Radfahrer können die Brücke aber weiterhin benutzen.']], q: 'Autos können eine Brücke vier Wochen lang nicht benutzen.', o: RF, a: 0, ex: '„Ab Montag wird die Mainbrücke für vier Wochen gesperrt. Autofahrer werden … umgeleitet.“ Only pedestrians and cyclists may still use it.' },
      { audio: [['_', 'Die Deutschen verbringen immer mehr Freizeit zu Hause. Laut einer neuen Studie schauen sie im Durchschnitt fast vier Stunden täglich Filme und Serien oder sind im Internet.'], ['_', 'Treffen mit Freunden und Sport kommen erst auf Platz drei und vier.']], q: 'Die Studie zeigt, dass viele Menschen ihre Freizeit vor allem zu Hause verbringen.', o: RF, a: 0, ex: '„Die Deutschen verbringen immer mehr Freizeit zu Hause.“ (Germans spend more and more free time at home.)' },
    ],
  }));

  add(Object.assign({}, H2, {
    id: 'mock-telc-hoeren-2', level: 'B1', exam: 'telc', module: 'hoeren', teil: 2, kind: 'mc', plays: 2,
    gloss: [['der Unverpackt-Laden', 'zero-waste (package-free) shop'], ['die Bankkauffrau', '(female) bank clerk'], ['die Städtereise', 'city trip'], ['der Behälter', 'container'], ['abfüllen', 'to fill (into a container)'], ['wiegen', 'to weigh'], ['das Pfandglas', 'deposit jar'], ['in Teilzeit', 'part-time'], ['das Lastenrad', 'cargo bike'], ['die Verpackung', 'packaging']],
    audio: [
      ['hoffmann', 'Guten Tag und willkommen zu unserer Sendung „Menschen in der Stadt“. Bei mir im Studio ist heute Katharina Wendt.'],
      ['hoffmann', 'Sie hat vor zwei Jahren in Münster einen Unverpackt-Laden eröffnet. Herzlich willkommen, Frau Wendt!'],
      ['vogel', 'Danke schön, ich freue mich, hier zu sein.'],
      ['hoffmann', 'Was haben Sie gemacht, bevor Sie den Laden eröffnet haben?'],
      ['vogel', 'Ich war zwölf Jahre lang Bankkauffrau. Das war ein sicherer Job, aber irgendwann wollte ich etwas machen, was mir wirklich wichtig ist.'],
      ['hoffmann', 'Und die Idee hatten Sie im Urlaub, habe ich gehört – in Spanien?'],
      ['vogel', 'Nicht ganz. In Spanien war ich auch, aber die Idee kam mir bei einer Städtereise nach Kopenhagen. Dort habe ich zum ersten Mal so einen Laden gesehen und war sofort begeistert.'],
      ['hoffmann', 'Erklären Sie unseren Hörern doch kurz, wie das Einkaufen bei Ihnen funktioniert.'],
      ['vogel', 'Ganz einfach: Die Kunden bringen ihre eigenen Gläser, Dosen oder Stoffbeutel mit. Sie füllen Nudeln, Reis, Müsli oder Öl genau in der Menge ab, die sie brauchen. Dann wird gewogen.'],
      ['hoffmann', 'Und wenn man seine Dose zu Hause vergessen hat?'],
      ['vogel', 'Kein Problem. Man kann bei uns Gläser kaufen oder ein Pfandglas ausleihen und es beim nächsten Mal zurückbringen.'],
      ['hoffmann', 'Woher kommen Ihre Produkte?'],
      ['vogel', 'Wir haben ungefähr 400 Produkte, und die meisten kommen aus der Region, also aus dem Münsterland. Nur Kaffee, Reis und Gewürze kommen natürlich von weiter her.'],
      ['hoffmann', 'Viele denken ja, dass so ein Einkauf teuer ist. Stimmt das?'],
      ['vogel', 'Teilweise. Manche Sachen sind etwas teurer als im Supermarkt, andere sind sogar günstiger. Und man kauft nur so viel, wie man wirklich braucht. Man wirft also weniger weg.'],
      ['hoffmann', 'Wie war der Anfang für Sie?'],
      ['vogel', 'Ehrlich gesagt sehr anstrengend. Im ersten Jahr habe ich oft sechzig Stunden pro Woche gearbeitet. Heute habe ich zum Glück zwei Mitarbeiterinnen, die mir in Teilzeit helfen.'],
      ['hoffmann', 'Wer kauft bei Ihnen ein?'],
      ['vogel', 'Am Anfang kamen vor allem Studierende und junge Familien. Inzwischen kommen aber auch viele ältere Leute. Manche sagen, der Laden erinnert sie an die Geschäfte aus ihrer Kindheit.'],
      ['hoffmann', 'Haben Sie Pläne für die Zukunft? Vielleicht einen zweiten Laden?'],
      ['vogel', 'Nein, ein zweites Geschäft wäre mir zu viel. Aber ich möchte einen Lieferservice mit dem Lastenrad anbieten – für Menschen, die nicht mehr so gut zu Fuß sind.'],
      ['hoffmann', 'Und was raten Sie Hörern, die weniger Verpackung benutzen möchten?'],
      ['vogel', 'Fangen Sie klein an! Nehmen Sie zum Beispiel einen Stoffbeutel mit auf den Markt und kaufen Sie Obst und Gemüse ohne Plastik. Man muss nicht alles auf einmal ändern.'],
      ['hoffmann', 'Vielen Dank, Frau Wendt, und weiterhin viel Erfolg!'],
    ],
    items: [
      { q: 'Frau Wendt hat früher in einer Bank gearbeitet.', o: RF, a: 0, ex: '„Ich war zwölf Jahre lang Bankkauffrau.“ (I was a bank clerk for twelve years.)' },
      { q: 'Die Idee für den Laden hatte sie in einem Urlaub in Spanien.', o: RF, a: 1, ex: '„Nicht ganz. In Spanien war ich auch, aber die Idee kam mir bei einer Städtereise nach Kopenhagen.“ – Copenhagen, not Spain.' },
      { q: 'Ohne eigene Behälter kann man in ihrem Laden nicht einkaufen.', o: RF, a: 1, ex: '„Kein Problem. Man kann bei uns Gläser kaufen oder ein Pfandglas ausleihen.“ (You can buy jars or borrow a deposit jar.)' },
      { q: 'Die meisten Produkte kommen aus der Region.', o: RF, a: 0, ex: '„die meisten kommen aus der Region, also aus dem Münsterland“.' },
      { q: 'Im Unverpackt-Laden ist alles teurer als im Supermarkt.', o: RF, a: 1, ex: '„Manche Sachen sind etwas teurer …, andere sind sogar günstiger.“ – only some things are more expensive.' },
      { q: 'Im ersten Jahr hat Frau Wendt sehr viel gearbeitet.', o: RF, a: 0, ex: '„Im ersten Jahr habe ich oft sechzig Stunden pro Woche gearbeitet.“' },
      { q: 'Heute arbeitet sie ganz allein im Laden.', o: RF, a: 1, ex: '„Heute habe ich zum Glück zwei Mitarbeiterinnen, die mir in Teilzeit helfen.“ (two part-time employees).' },
      { q: 'Inzwischen kaufen auch ältere Menschen bei ihr ein.', o: RF, a: 0, ex: '„Inzwischen kommen aber auch viele ältere Leute.“ (Now many older people come too.)' },
      { q: 'Frau Wendt plant, ein zweites Geschäft zu eröffnen.', o: RF, a: 1, ex: '„Nein, ein zweites Geschäft wäre mir zu viel.“ She plans a delivery service by cargo bike instead.' },
      { q: 'Sie empfiehlt, mit kleinen Schritten anzufangen.', o: RF, a: 0, ex: '„Fangen Sie klein an! … Man muss nicht alles auf einmal ändern.“ (Start small – you don’t have to change everything at once.)' },
    ],
  }));

  add(Object.assign({}, H3, {
    id: 'mock-telc-hoeren-3', level: 'B1', exam: 'telc', module: 'hoeren', teil: 3, kind: 'mc', plays: 2,
    gloss: [['die Abflugzeit', 'departure time'], ['das Gate', 'gate'], ['die Hausverwaltung', 'property management'], ['der Techniker', 'technician'], ['der Hausmeister', 'caretaker'], ['die Kasse', 'checkout / box office'], ['ausfallen', 'to be cancelled'], ['die Hallenschuhe', 'indoor sports shoes'], ['die Vorstellung', 'showing / performance']],
    items: [
      { audio: [['_', 'Information für die Passagiere des Fluges LH 1234 nach Wien: Ihr Flug hat heute Verspätung. Die neue Abflugzeit ist sechzehn Uhr vierzig.'], ['_', 'Das Boarding beginnt um sechzehn Uhr zehn an Gate B 22 – nicht wie angezeigt an Gate B 12. Wir bitten um Ihr Verständnis.']], q: 'Das Boarding für den Flug nach Wien ist an Gate B 12.', o: RF, a: 1, ex: '„an Gate B 22 – nicht wie angezeigt an Gate B 12“ – the gate shown on the screen is wrong.' },
      { audio: [['krueger', 'Guten Tag, Frau Yilmaz, hier spricht Herr Brandt von der Hausverwaltung. Der Techniker für Ihre Heizung kommt nicht wie geplant am Dienstag, sondern schon am Montag zwischen acht und zwölf Uhr.'], ['krueger', 'Wenn Sie da nicht zu Hause sind, geben Sie Ihren Schlüssel bitte vorher beim Hausmeister ab. Vielen Dank!']], q: 'Der Techniker kommt am Montagvormittag.', o: RF, a: 0, ex: '„nicht wie geplant am Dienstag, sondern schon am Montag zwischen acht und zwölf Uhr“ – Monday morning.' },
      { audio: [['_', 'Liebe Kundinnen und Kunden, unser Kaufhaus schließt in 15 Minuten. Bitte gehen Sie jetzt zu den Kassen. Die Kassen im Erdgeschoss sind bis zwanzig Uhr fünfzehn geöffnet.'], ['_', 'Morgen, am Samstag, sind wir wie gewohnt ab neun Uhr für Sie da. Wir wünschen Ihnen einen schönen Abend.']], q: 'Morgen öffnet das Kaufhaus später als sonst.', o: RF, a: 1, ex: '„wie gewohnt ab neun Uhr“ (from nine o’clock as usual) – not later.' },
      { audio: [['tim', 'Hi, hier ist Tim. Das Volleyballtraining heute fällt doch nicht aus, wie ich zuerst gedacht habe. Aber wir trainieren in der kleinen Halle, nicht in der Turnhalle der Schule.'], ['tim', 'Bring bitte deine Hallenschuhe mit und sei um sieben da, nicht erst um halb acht. Bis später!']], q: 'Das Training beginnt heute um halb acht.', o: RF, a: 1, ex: '„sei um sieben da, nicht erst um halb acht“ (be there at seven, not at half past seven).' },
      { audio: [['_', 'Sie sind verbunden mit dem Kino Lichtspiel. Wichtig für diese Woche: Am Mittwoch ist wieder Kinotag – alle Vorstellungen kosten dann nur sechs Euro.'], ['_', 'Karten bekommen Sie online oder an der Kasse. Die Kasse öffnet eine halbe Stunde vor der ersten Vorstellung.']], q: 'Am Mittwoch sind die Kinokarten günstiger.', o: RF, a: 0, ex: '„Am Mittwoch ist wieder Kinotag – alle Vorstellungen kosten dann nur sechs Euro.“' },
    ],
  }));

  add(Object.assign({}, W, {
    id: 'mock-telc-schreiben', level: 'B1', exam: 'telc', module: 'schreiben', teil: 1,
    gloss: [['der Verein', 'club'], ['das Mitglied', 'member'], ['die Mitgliedschaft', 'membership'], ['das Schnuppertraining', 'free trial session'], ['der Anfänger', 'beginner'], ['der Mitgliedsbeitrag', 'membership fee'], ['der Schläger', 'racket'], ['ausleihen', 'to borrow / hire']],
    task: 'Sie haben in der Zeitung folgende Anzeige gelesen:\n\n„Tennisclub Grün-Gelb – neue Mitglieder willkommen! Ob Anfänger oder Profi: Bei uns spielen Jung und Alt zusammen. 6 Außenplätze, 2 Hallenplätze, Training in kleinen Gruppen. Kostenloses Schnuppertraining jeden Samstag. Kontakt: info@tc-gruen-gelb.de“\n\nSie interessieren sich für eine Mitgliedschaft. Schreiben Sie eine E-Mail an den Verein. Schreiben Sie etwas zu allen vier Punkten unten. Überlegen Sie sich dabei eine passende Reihenfolge der Punkte. Vergessen Sie nicht Anrede und Gruß.',
    taskEn: 'You read the following advert in the newspaper:\n\n“Tennis Club Green-Yellow – new members welcome! Beginners or pros: young and old play together here. 6 outdoor courts, 2 indoor courts, training in small groups. Free taster session every Saturday. Contact: info@tc-gruen-gelb.de”\n\nYou are interested in becoming a member. Write an email to the club. Write something about all four points below. Think of a suitable order for the points. Don’t forget the greeting and closing.',
    points: ['Grund für Ihr Schreiben', 'Ihre Erfahrungen mit Sport', 'Fragen zu Trainingszeiten und Kosten', 'Termin für ein Schnuppertraining'],
    pointsEn: ['Reason for writing', 'Your experience with sport', 'Questions about training times and costs', 'Date for a taster session'],
    model: 'Sehr geehrte Damen und Herren,\n\nich habe Ihre Anzeige in der Stadtzeitung gelesen und interessiere mich sehr für eine Mitgliedschaft in Ihrem Verein.\n\nIch bin 32 Jahre alt und treibe schon lange gern Sport. Früher habe ich in einem Verein Volleyball gespielt, aber seit meinem Umzug nach Augsburg habe ich leider keine Mannschaft mehr. Tennis habe ich bisher nur ein paar Mal im Urlaub gespielt, ich bin also Anfängerin.\n\nDeshalb habe ich einige Fragen: Gibt es Trainingsgruppen für Erwachsene am Abend? Ich arbeite nämlich bis 17 Uhr. Außerdem würde ich gern wissen, wie hoch der Mitgliedsbeitrag ist und ob man Schläger ausleihen kann.\n\nGern würde ich zuerst an einem Schnuppertraining teilnehmen. Würde es Ihnen am Samstag, dem 14. Juni, passen?\n\nIch freue mich auf Ihre Antwort.\n\nMit freundlichen Grüßen\nElena Petrova',
    modelEn: 'Dear Sir or Madam,\n\nI read your advert in the city newspaper and I am very interested in becoming a member of your club.\n\nI am 32 years old and have enjoyed doing sport for a long time. I used to play volleyball in a club, but since moving to Augsburg I unfortunately no longer have a team. So far I have only played tennis a few times on holiday, so I am a beginner.\n\nThat is why I have some questions: Are there training groups for adults in the evening? You see, I work until 5 pm. I would also like to know how much the membership fee is and whether you can hire rackets.\n\nI would like to take part in a taster session first. Would Saturday, 14 June, suit you?\n\nI look forward to your answer.\n\nYours faithfully\nElena Petrova',
    redemittel: [['Sehr geehrte Damen und Herren,', 'Dear Sir or Madam,'], ['ich habe Ihre Anzeige in … gelesen.', 'I read your advert in …'], ['Ich interessiere mich für …', 'I am interested in …'], ['Ich hätte noch einige Fragen: …', 'I have a few questions: …'], ['Ich würde gern wissen, ob / wie …', 'I would like to know whether / how …'], ['Könnten Sie mir bitte mitteilen, …', 'Could you please tell me …'], ['Würde es Ihnen am … passen?', 'Would … suit you?'], ['Ich freue mich auf Ihre Antwort.', 'I look forward to your answer.'], ['Mit freundlichen Grüßen', 'Yours sincerely / faithfully']],
    check: ['Formal greeting (Sehr geehrte Damen und Herren,) and closing (Mit freundlichen Grüßen + name)?', 'Sie-form used consistently (Ihnen, Ihre)?', 'All 4 points answered?', 'At least two indirect questions (ob …, wie hoch …) with the verb at the end?', 'About 120 words?', 'Date written correctly (am Samstag, dem 14. Juni)?'],
  }));
})();
