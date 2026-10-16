/* EXAM PRACTICE – A1 (Goethe-Zertifikat A1 / telc Deutsch A1 “Start Deutsch 1”): practice set + mock exam.
   Original texts written for Deutsch30 in the official task formats. */
(function () {
  'use strict';
  const E = (GL.exam = GL.exam || {});
  const T = (E.tasks = E.tasks || {});
  const add = (t) => (T[t.id] = t);
  const RF = ['Richtig', 'Falsch'];

  /* ---------- shared instructions ---------- */
  const H1 = {
    level: 'A1', exam: 'both', module: 'hoeren', teil: 1, kind: 'mc', plays: 2, minutes: 8,
    title: 'Hören Teil 1 – Kurze Gespräche',
    en: 'Six short everyday conversations – choose a, b or c. You hear each one twice.',
    instr: 'Sie hören sechs kurze Gespräche. Sie hören jeden Text zweimal. Kreuzen Sie an: a, b oder c.',
    instrEn: 'You will hear six short conversations. You hear each text twice. Tick a, b or c.',
    tip: 'Read the question first and underline the key word (wann? wie viel? wo?). Listen to the END: people often correct themselves – “nein”, “Entschuldigung”, “doch nicht” mean the first answer is wrong.',
  };
  const H2 = {
    level: 'A1', exam: 'both', module: 'hoeren', teil: 2, kind: 'mc', plays: 1, minutes: 5,
    title: 'Hören Teil 2 – Ansagen',
    en: 'Four public announcements (station, airport, shop, radio) – decide Richtig (true) or Falsch (false). You hear each one only once.',
    instr: 'Sie hören vier Ansagen. Sie hören jeden Text einmal. Kreuzen Sie an: Richtig oder Falsch.',
    instrEn: 'You will hear four announcements. You hear each text once. Tick: true or false.',
    tip: 'You hear each text only ONCE, so read the statement very carefully before you press play. Compare the numbers, times and places in the statement with what you hear.',
  };
  const H3 = {
    level: 'A1', exam: 'both', module: 'hoeren', teil: 3, kind: 'mc', plays: 2, minutes: 7,
    title: 'Hören Teil 3 – Nachrichten am Telefon',
    en: 'Five messages on an answering machine – choose a, b or c. You hear each one twice.',
    instr: 'Sie hören fünf Nachrichten am Telefon. Sie hören jeden Text zweimal. Kreuzen Sie an: a, b oder c.',
    instrEn: 'You will hear five telephone messages. You hear each text twice. Tick a, b or c.',
    tip: 'The caller usually says who they are first, then the important information (a new time, a new place, what you should do). Listen for words like “nicht … sondern” (not … but) – the new information comes after “sondern”.',
  };
  const L1 = {
    level: 'A1', exam: 'both', module: 'lesen', teil: 1, kind: 'mc', minutes: 8,
    title: 'Lesen Teil 1 – Kurze Mitteilungen',
    en: 'Two short emails or notes – decide if five statements are Richtig (true) or Falsch (false).',
    instr: 'Lesen Sie die zwei Texte und die Aufgaben 1 bis 5. Sind die Aussagen richtig oder falsch? Kreuzen Sie an.',
    instrEn: 'Read the two texts and tasks 1 to 5. Are the statements true or false? Tick.',
    tip: 'Read the statement first, then find the sentence in the text that talks about the same thing. Watch out for small changes: a different day, a different person, “nicht”.',
  };
  const L2 = {
    level: 'A1', exam: 'both', module: 'lesen', teil: 2, kind: 'mc', minutes: 8,
    title: 'Lesen Teil 2 – Anzeigen und Internetseiten',
    en: 'Five situations, each with two short adverts or web pages – choose a or b: where do you find the right information?',
    instr: 'Lesen Sie die Texte und die Aufgaben 1 bis 5. Wo finden Sie Informationen? Kreuzen Sie an: a oder b.',
    instrEn: 'Read the texts and tasks 1 to 5. Where do you find information? Tick a or b.',
    tip: 'Read the situation twice and find the ONE important detail (a day, a time, a price, “am Abend”, “am Wochenende”). Both texts are about the topic – only one fits that detail.',
  };
  const L3 = {
    level: 'A1', exam: 'both', module: 'lesen', teil: 3, kind: 'mc', minutes: 8,
    title: 'Lesen Teil 3 – Schilder und Aushänge',
    en: 'Five signs and notices (shop door, station, doctor’s office …) – decide Richtig (true) or Falsch (false).',
    instr: 'Lesen Sie die Texte und die Aufgaben 1 bis 5. Kreuzen Sie an: Richtig oder Falsch.',
    instrEn: 'Read the texts and tasks 1 to 5. Tick: true or false.',
    tip: 'Signs are short, so every word counts. Check days (Mo–Fr = Monday to Friday), times and little words like “nicht”, “kein”, “nur”, “frei”.',
  };
  const S1 = {
    level: 'A1', exam: 'both', module: 'schreiben', teil: 1, kind: 'form', minutes: 8,
    title: 'Schreiben Teil 1 – Formular',
    en: 'Read a short text about a person and fill in five missing pieces of information in a form.',
    tip: 'Underline the information in the text first. Write only the answer (one word or a number) – no full sentences. Copy names and addresses letter by letter.',
  };
  const S2 = {
    level: 'A1', exam: 'both', module: 'schreiben', teil: 2, kind: 'write', minutes: 12, count: 30,
    title: 'Schreiben Teil 2 – Kurze Mitteilung',
    en: 'Write a short message (about 30 words) that answers three given points.',
    instr: 'Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie nicht die Anrede und den Gruß.',
    instrEn: 'Write one or two sentences for each point (about 30 words). Do not forget the greeting and the closing.',
    tip: 'Tick off the three points one by one. Short, correct sentences are better than long ones. Start with “Liebe …/Lieber …” and end with “Viele Grüße” and your name.',
  };

  /* =====================================================================
     PRACTICE SET
     ===================================================================== */

  add(Object.assign({}, H1, {
    id: 'a1-hoeren-1',
    gloss: [['der Zug', 'train'], ['das Gleis', 'platform'], ['kosten', 'to cost'], ['der Stock', 'floor (of a building)'], ['das Erdgeschoss', 'ground floor'], ['die Handynummer', 'mobile number'], ['die Party', 'party'], ['das Brötchen', 'bread roll'], ['der Kuchen', 'cake']],
    items: [
      { audio: [['lena', 'Entschuldigung, wann fährt der nächste Zug nach Hamburg?'], ['max', 'Um neun Uhr fünfzehn … Moment, nein, der Zug fährt heute leider nicht.'], ['max', 'Der nächste Zug nach Hamburg fährt um neun Uhr fünfzig.'], ['lena', 'Neun Uhr fünfzig. Und von welchem Gleis?'], ['max', 'Von Gleis sieben.']],
        q: 'Wann fährt der Zug nach Hamburg?', o: ['Um 9:15 Uhr.', 'Um 9:50 Uhr.', 'Um 10:15 Uhr.'], a: 1,
        ex: 'The man first says “neun Uhr fünfzehn” (9:15), but then: “der Zug fährt heute leider nicht” (the train isn’t running today). “Der nächste Zug … fährt um neun Uhr fünfzig” = the next train leaves at 9:50.' },
      { audio: [['sofia', 'Einen Kaffee und ein Stück Kuchen, bitte. Was kostet das?'], ['jonas', 'Der Kaffee kostet zwei Euro achtzig und der Kuchen drei Euro fünfzig.'], ['jonas', 'Zusammen sind das sechs Euro dreißig.'], ['sofia', 'Hm, dann nehme ich nur den Kaffee, bitte.']],
        q: 'Wie viel bezahlt die Frau?', o: ['2,80 €', '3,50 €', '6,30 €'], a: 0,
        ex: 'Coffee = “zwei Euro achtzig” (2.80 €), cake = 3.50 €, together 6.30 €. But at the end she says “dann nehme ich nur den Kaffee” (then I’ll only take the coffee) – so she pays 2.80 €.' },
      { audio: [['becker', 'Entschuldigung, wo finde ich hier Schuhe?'], ['tim', 'Schuhe sind im ersten Stock.'], ['tim', 'Ach nein, Entschuldigung! Die Schuhe sind jetzt im dritten Stock. Der Aufzug ist da hinten.'], ['becker', 'Im dritten Stock. Vielen Dank!']],
        q: 'Wo sind die Schuhe?', o: ['Im Erdgeschoss.', 'Im ersten Stock.', 'Im dritten Stock.'], a: 2,
        ex: 'He first says “im ersten Stock” (on the first floor), then corrects himself: “Ach nein, Entschuldigung! Die Schuhe sind jetzt im dritten Stock” = the shoes are now on the third floor.' },
      { audio: [['kaya', 'Frau Klein, wie ist Ihre Handynummer, bitte?'], ['klein', 'Null eins sieben sechs, vierunddreißig, achtundfünfzig, einundzwanzig.'], ['kaya', 'Also null eins sieben sechs, dreiundvierzig …'], ['klein', 'Nein, vierunddreißig. Dann achtundfünfzig und einundzwanzig.'], ['kaya', 'Gut, danke schön.']],
        q: 'Wie ist die Handynummer von Frau Klein?', o: ['0176 34 58 21', '0176 43 58 21', '0176 34 85 12'], a: 0,
        ex: '“vierunddreißig” = 34 (in German you say the 4 first: four-and-thirty). The man says “dreiundvierzig” (43) by mistake, and she corrects him: “Nein, vierunddreißig.” Then “achtundfünfzig” = 58, “einundzwanzig” = 21.' },
      { audio: [['lisa', 'Hallo Jonas! Kommst du am Samstag zu meiner Party?'], ['jonas', 'Am Samstag? Da arbeite ich leider.'], ['lisa', 'Ach, Entschuldigung, die Party ist nicht am Samstag. Sie ist am Freitag!'], ['jonas', 'Am Freitag? Super, da komme ich gern.']],
        q: 'Wann ist die Party?', o: ['Am Donnerstag.', 'Am Freitag.', 'Am Samstag.'], a: 1,
        ex: 'Lisa first says “am Samstag” (on Saturday), then corrects it: “die Party ist nicht am Samstag. Sie ist am Freitag” = the party is not on Saturday, it’s on Friday.' },
      { audio: [['weber', 'Guten Morgen! Ich möchte zehn Brötchen, bitte.'], ['hoffmann', 'Zehn Brötchen, gern.'], ['weber', 'Ach nein, warten Sie. Nur acht Brötchen. Und ein Brot, bitte.'], ['hoffmann', 'Acht Brötchen und ein Brot. Das macht sechs Euro zwanzig.']],
        q: 'Wie viele Brötchen kauft die Frau?', o: ['8', '10', '12'], a: 0,
        ex: 'She first asks for “zehn Brötchen” (10 rolls), then says “Ach nein, warten Sie. Nur acht Brötchen” = oh no, wait – only eight rolls. The baker repeats: “Acht Brötchen und ein Brot.”' },
    ],
  }));

  add(Object.assign({}, H2, {
    id: 'a1-hoeren-2',
    gloss: [['die Verspätung', 'delay'], ['pünktlich', 'on time'], ['der Flug', 'flight'], ['der Ausgang', 'gate / exit'], ['das Angebot', 'special offer'], ['das Kilo', 'kilo'], ['das Wetter', 'weather'], ['der Regen / es regnet', 'rain / it’s raining'], ['die Sonne scheint', 'the sun is shining']],
    items: [
      { audio: [['_', 'Achtung an Gleis drei: Der ICE nach Frankfurt hat heute circa zwanzig Minuten Verspätung. Wir bitten um Entschuldigung.']],
        q: 'Der Zug nach Frankfurt kommt pünktlich.', o: RF, a: 1,
        ex: 'Falsch. The announcement says “zwanzig Minuten Verspätung” = 20 minutes delay. “pünktlich” (on time) is not true.' },
      { audio: [['_', 'Letzter Aufruf für den Flug LH 1234 nach Wien. Die Passagiere gehen bitte sofort zum Ausgang B zwölf. Vielen Dank.']],
        q: 'Die Passagiere nach Wien sollen zum Ausgang B 12 gehen.', o: RF, a: 0,
        ex: 'Richtig. “Die Passagiere gehen bitte sofort zum Ausgang B zwölf” = passengers please go immediately to gate B12. (“Letzter Aufruf” = last call.)' },
      { audio: [['_', 'Liebe Kundinnen und Kunden, heute im Angebot: Äpfel aus Deutschland, das Kilo für nur ein Euro neunundneunzig.'], ['_', 'Und alle Säfte sind heute zwanzig Prozent billiger.']],
        q: 'Ein Kilo Äpfel kostet heute 2,99 €.', o: RF, a: 1,
        ex: 'Falsch. “das Kilo für nur ein Euro neunundneunzig” = one kilo for only 1.99 € – not 2.99 €.' },
      { audio: [['_', 'Und jetzt das Wetter für morgen: Am Vormittag regnet es im ganzen Land.'], ['_', 'Am Nachmittag scheint dann überall die Sonne, bei achtzehn Grad.']],
        q: 'Morgen Nachmittag ist es sonnig.', o: RF, a: 0,
        ex: 'Richtig. “Am Nachmittag scheint dann überall die Sonne” = in the afternoon the sun shines everywhere. The rain (“es regnet”) is only “am Vormittag” (in the morning).' },
    ],
  }));

  add(Object.assign({}, H3, {
    id: 'a1-hoeren-3',
    gloss: [['der Termin', 'appointment'], ['zurückrufen', 'to call back'], ['sich treffen', 'to meet'], ['der Eingang', 'entrance'], ['kaufen', 'to buy'], ['fertig', 'ready / finished'], ['abholen', 'to pick up'], ['die Reparatur', 'repair'], ['der Raum', 'room (classroom)']],
    items: [
      { audio: [['richter', 'Guten Tag, Frau Becker, hier ist die Praxis Doktor Hoffmann.'], ['richter', 'Ihr Termin am Dienstag um zehn Uhr geht leider nicht. Können Sie am Mittwoch um zehn Uhr kommen?'], ['richter', 'Bitte rufen Sie uns zurück. Vielen Dank.']],
        q: 'Wann soll Frau Becker zum Arzt kommen?', o: ['Am Dienstag um 10 Uhr.', 'Am Mittwoch um 10 Uhr.', 'Am Mittwoch um 11 Uhr.'], a: 1,
        ex: '“Ihr Termin am Dienstag … geht leider nicht” = your appointment on Tuesday is not possible. “Können Sie am Mittwoch um zehn Uhr kommen?” = can you come on Wednesday at 10?' },
      { audio: [['max', 'Hallo Lena, hier ist Max. Wir treffen uns heute nicht im Café, sondern im Park.'], ['max', 'Ich warte am Eingang. Bis um vier!']],
        q: 'Wo treffen sich Lena und Max?', o: ['Im Park.', 'Im Café.', 'Am Bahnhof.'], a: 0,
        ex: '“nicht im Café, sondern im Park” = not in the café but in the park. The new information comes after “sondern”.' },
      { audio: [['mia', 'Hallo Papa, hier ist Mia. Ich bin noch in der Schule.'], ['mia', 'Kannst du bitte Milch und Brot kaufen? Eier haben wir noch. Danke! Tschüss!']],
        q: 'Was soll Papa kaufen?', o: ['Milch und Eier.', 'Brot und Eier.', 'Milch und Brot.'], a: 2,
        ex: '“Kannst du bitte Milch und Brot kaufen?” = can you please buy milk and bread? “Eier haben wir noch” = we still have eggs – so no eggs.' },
      { audio: [['frank', 'Guten Tag, Herr Wolf, hier ist Fahrrad Schulz. Ihr Fahrrad ist fertig. Sie können es ab morgen abholen.'], ['frank', 'Wir haben bis achtzehn Uhr dreißig geöffnet. Die Reparatur kostet fünfundvierzig Euro.']],
        q: 'Wie viel kostet die Reparatur?', o: ['45 €', '54 €', '18,30 €'], a: 0,
        ex: '“Die Reparatur kostet fünfundvierzig Euro” = the repair costs 45 €. (“fünfundvierzig” = five-and-forty = 45.) 18:30 is the closing time, not a price.' },
      { audio: [['vogel', 'Hallo, hier ist Jana Vogel von der Volkshochschule.'], ['vogel', 'Der Deutschkurs am Montag ist jetzt nicht im Raum zwölf, sondern im Raum zwanzig. Der Kurs beginnt wie immer um achtzehn Uhr.']],
        q: 'In welchem Raum ist der Deutschkurs?', o: ['In Raum 12.', 'In Raum 18.', 'In Raum 20.'], a: 2,
        ex: '“nicht im Raum zwölf, sondern im Raum zwanzig” = not in room 12 but in room 20. “achtzehn Uhr” (18:00) is the start time.' },
    ],
  }));

  add(Object.assign({}, L1, {
    id: 'a1-lesen-1',
    gloss: [['die Tante', 'aunt'], ['die Wohnung', 'flat / apartment'], ['das Museum', 'museum'], ['mitkommen', 'to come along'], ['sich treffen', 'to meet'], ['das Büro', 'office'], ['krank', 'ill / sick'], ['anrufen', 'to phone'], ['die Besprechung', 'meeting']],
    items: [
      { text: 'Liebe Lena,\n\nwie geht es dir? Ich bin jetzt in Berlin und wohne bei meiner Tante. Die Wohnung ist sehr schön, aber klein.\n\nAm Samstag möchte ich ins Museum gehen. Kommst du mit? Wir können uns um elf Uhr am Bahnhof treffen. Bitte schreib mir bis Freitag.\n\nViele Grüße\nSofia',
        q: 'Sofia wohnt in Berlin bei ihrer Tante.', o: RF, a: 0,
        ex: 'Richtig. “Ich bin jetzt in Berlin und wohne bei meiner Tante” = I am in Berlin now and live at my aunt’s.' },
      { q: 'Sofia und Lena treffen sich am Samstag im Museum.', o: RF, a: 1,
        ex: 'Falsch. They want to go to the museum, but they meet at the station: “Wir können uns um elf Uhr am Bahnhof treffen” = we can meet at 11 at the station.' },
      { text: 'Liebe Frau Meier,\n\nich bin morgen nicht im Büro. Mein Sohn ist krank. Am Donnerstag arbeite ich wieder.\n\nKönnen Sie bitte um 14 Uhr Herrn Kaya anrufen? Seine Nummer ist 0341 556782. Die Besprechung am Mittwoch machen wir dann am Freitag.\n\nDanke und viele Grüße\nThomas Braun',
        q: 'Herr Braun ist krank.', o: RF, a: 1,
        ex: 'Falsch. “Mein Sohn ist krank” = my son is ill. Herr Braun stays at home because of his son.' },
      { q: 'Frau Meier soll Herrn Kaya anrufen.', o: RF, a: 0,
        ex: 'Richtig. “Können Sie bitte um 14 Uhr Herrn Kaya anrufen?” = can you please call Mr Kaya at 2 pm?' },
      { q: 'Die Besprechung ist am Mittwoch.', o: RF, a: 1,
        ex: 'Falsch. “Die Besprechung am Mittwoch machen wir dann am Freitag” = we’ll have Wednesday’s meeting on Friday instead.' },
    ],
  }));

  add(Object.assign({}, L2, {
    id: 'a1-lesen-2',
    gloss: [['ankommen / an', 'to arrive / arr.'], ['abfahren / ab', 'to depart / dep.'], ['der Anfänger', 'beginner'], ['der Kinderarzt', 'children’s doctor'], ['der Bereitschaftsdienst', 'out-of-hours doctor service'], ['gebraucht', 'used / second-hand'], ['der Lieferservice', 'delivery service'], ['der Ruhetag', 'closing day']],
    items: [
      { text: 'a) www.bahn.de – Sonntag: München Hbf ab 8:12 Uhr – Salzburg Hbf an 9:42 Uhr. Preis: 32,90 €\n\nb) www.bahn.de – Sonntag: München Hbf ab 9:35 Uhr – Salzburg Hbf an 11:05 Uhr. Preis: 29,90 €',
        q: 'Sie möchten am Sonntag mit dem Zug von München nach Salzburg fahren. Sie möchten vor 10 Uhr in Salzburg sein.', o: ['a', 'b'], a: 0,
        ex: 'a: the train arrives “an 9:42 Uhr” (arr. 9:42) – before 10. In b it arrives at 11:05 – too late, even if it is cheaper.' },
      { text: 'a) Volkshochschule: Deutsch A1 – Montag und Mittwoch, 9:00 bis 12:00 Uhr. Anmeldung im Büro, Raum 3.\n\nb) Sprachschule Lingua: Deutsch für Anfänger – Dienstag und Donnerstag, 18:30 bis 20:00 Uhr. Kleine Gruppen!',
        q: 'Sie arbeiten am Tag. Sie suchen einen Deutschkurs am Abend.', o: ['a', 'b'], a: 1,
        ex: 'b: the course is “18:30 bis 20:00 Uhr” – in the evening (“am Abend”). Course a is from 9 to 12 – in the morning.' },
      { text: 'a) Ärztlicher Bereitschaftsdienst – Sie brauchen einen Arzt am Wochenende oder in der Nacht? Rufen Sie an: 116 117\n\nb) Kinderarztpraxis Dr. Lange – Sprechzeiten: Montag bis Freitag 8 bis 12 Uhr, Dienstag und Donnerstag auch 15 bis 18 Uhr',
        q: 'Es ist Samstag. Ihr Kind ist krank und Sie brauchen einen Arzt.', o: ['a', 'b'], a: 0,
        ex: 'a: “am Wochenende” = at the weekend – Saturday is the weekend. The children’s doctor in b is only open “Montag bis Freitag” (Monday to Friday).' },
      { text: 'a) Fahrrad Krüger – Neue Fahrräder von Top-Marken ab 499 €. Jetzt auch E-Bikes!\n\nb) Gebrauchte Fahrräder – gut und billig, ab 60 €. Jeden Samstag auf dem Flohmarkt am Rathaus.',
        q: 'Sie möchten ein Fahrrad kaufen. Es soll nicht viel kosten.', o: ['a', 'b'], a: 1,
        ex: 'b: “gut und billig, ab 60 €” = good and cheap, from 60 €. In a the bikes cost “ab 499 €” (from 499 €) – that is a lot.' },
      { text: 'a) Pizzeria Roma – Wir bringen Ihre Pizza nach Hause! Lieferservice täglich bis 23 Uhr. Tel. 0221 334455\n\nb) Restaurant Da Marco – Pizza und Pasta wie in Italien. Montag Ruhetag. Reservierung: 0221 778899',
        q: 'Sie möchten heute Abend Pizza essen, aber Sie möchten nicht aus dem Haus gehen.', o: ['a', 'b'], a: 0,
        ex: 'a: “Wir bringen Ihre Pizza nach Hause” = we bring your pizza to your home (“Lieferservice” = delivery). For b you must go to the restaurant.' },
    ],
  }));

  add(Object.assign({}, L3, {
    id: 'a1-lesen-3',
    gloss: [['der Urlaub', 'holiday / vacation'], ['geschlossen', 'closed'], ['die Sprechzeiten', 'office hours (doctor)'], ['der Automat', 'ticket machine'], ['die Fahrkarte', 'ticket'], ['der Stock', 'floor'], ['der Eintritt', 'admission / entry fee'], ['frei', 'free (no cost)']],
    items: [
      { text: 'Bäckerei Schmidt\nLiebe Kunden, vom 1. bis 14. August machen wir Urlaub. Ab 15. August sind wir wieder für Sie da!',
        q: 'Die Bäckerei ist im August zwei Wochen geschlossen.', o: RF, a: 0,
        ex: 'Richtig. “vom 1. bis 14. August machen wir Urlaub” = from 1st to 14th August we are on holiday – that is two weeks.' },
      { text: 'Praxis Dr. Peters\nSprechzeiten: Mo, Di, Do 8–13 Uhr\nMittwoch und Freitag geschlossen',
        q: 'Am Mittwochvormittag kann man zum Arzt gehen.', o: RF, a: 1,
        ex: 'Falsch. “Mittwoch und Freitag geschlossen” = closed on Wednesday and Friday.' },
      { text: 'Fahrkarten bitte am Automaten kaufen!\nIm Zug kein Fahrkartenverkauf.',
        q: 'Man kann die Fahrkarte im Zug kaufen.', o: RF, a: 1,
        ex: 'Falsch. “Im Zug kein Fahrkartenverkauf” = no ticket sales on the train. You must buy it “am Automaten” (at the machine).' },
      { text: 'Volkshochschule\nDer Kurs „Kochen für Anfänger“ ist heute in Raum 104 (1. Stock). Raum 201 ist heute geschlossen.',
        q: 'Der Kochkurs ist heute im ersten Stock.', o: RF, a: 0,
        ex: 'Richtig. “in Raum 104 (1. Stock)” = in room 104 (first floor). “Kochen” = cooking.' },
      { text: 'Hallenbad\nMontag bis Freitag 7–21 Uhr, Samstag und Sonntag 9–18 Uhr\nKinder unter 6 Jahren: Eintritt frei',
        q: 'Kinder unter sechs Jahren müssen nichts bezahlen.', o: RF, a: 0,
        ex: 'Richtig. “Kinder unter 6 Jahren: Eintritt frei” = children under 6: free admission (“frei” here = free of charge).' },
    ],
  }));

  add(Object.assign({}, S1, {
    id: 'a1-schreiben-1',
    instr: 'Ihre Freundin Anna Nowak möchte einen Deutschkurs an der Volkshochschule machen. Im Anmeldeformular fehlen fünf Informationen. Helfen Sie Ihrer Freundin und schreiben Sie die fünf fehlenden Informationen in das Formular.',
    instrEn: 'Your friend Anna Nowak wants to take a German course at the adult education centre. Five pieces of information are missing in the registration form. Help your friend and write the five missing pieces of information in the form.',
    gloss: [['das Formular', 'form'], ['die Anmeldung', 'registration'], ['das Herkunftsland', 'country of origin'], ['das Alter', 'age'], ['die Hausnummer', 'house number'], ['die Krankenschwester', 'nurse'], ['bar bezahlen', 'to pay in cash'], ['die Überweisung', 'bank transfer']],
    text: 'Anna Nowak kommt aus Polen. Sie ist 29 Jahre alt und wohnt seit März in Leipzig. Ihre Adresse ist Karl-Liebknecht-Straße 15, 04107 Leipzig. Anna ist Krankenschwester. Sie arbeitet am Vormittag. Sie möchte am Abend einen Deutschkurs machen. Anna hat noch kein Bankkonto in Deutschland. Sie möchte den Kurs bar bezahlen.',
    textEn: 'Anna Nowak comes from Poland. She is 29 years old and has lived in Leipzig since March. Her address is Karl-Liebknecht-Straße 15, 04107 Leipzig. Anna is a nurse. She works in the mornings. She wants to do a German course in the evening. Anna doesn’t have a bank account in Germany yet. She wants to pay for the course in cash.',
    fields: [
      { label: 'Herkunftsland', a: 'Polen' },
      { label: 'Alter', a: '29', alt: ['29 Jahre', 'neunundzwanzig'] },
      { label: 'Straße, Hausnummer', a: 'Karl-Liebknecht-Straße 15', alt: ['Karl-Liebknecht-Str. 15', 'Karl-Liebknecht-Strasse 15'] },
      { label: 'Kurszeit (Vormittag / Abend)', a: 'Abend', alt: ['am Abend', 'abends'] },
      { label: 'Zahlung (bar / Überweisung)', a: 'bar', alt: ['in bar', 'Bar'] },
    ],
  }));

  add(Object.assign({}, S2, {
    id: 'a1-schreiben-2',
    gloss: [['die Lehrerin', 'teacher (female)'], ['leider', 'unfortunately'], ['krank', 'ill'], ['das Fieber', 'fever'], ['die Hausaufgaben', 'homework'], ['schicken', 'to send'], ['wieder', 'again']],
    task: 'Sie sind krank und können morgen nicht zum Deutschkurs kommen. Schreiben Sie eine E-Mail an Ihre Lehrerin, Frau Schmidt.',
    taskEn: 'You are ill and cannot come to the German course tomorrow. Write an email to your teacher, Ms Schmidt.',
    points: ['Warum kommen Sie nicht?', 'Bitten Sie um die Hausaufgaben.', 'Wann kommen Sie wieder?'],
    pointsEn: ['Why aren’t you coming?', 'Ask for the homework.', 'When will you come back?'],
    model: 'Liebe Frau Schmidt,\n\nleider kann ich morgen nicht zum Kurs kommen. Ich bin krank und habe Fieber. Können Sie mir bitte die Hausaufgaben schicken? Am Montag komme ich wieder.\n\nViele Grüße\nCarlos',
    modelEn: 'Dear Ms Schmidt,\n\nunfortunately I can’t come to the course tomorrow. I am ill and have a fever. Could you please send me the homework? I’ll be back on Monday.\n\nBest wishes\nCarlos',
    redemittel: [['Liebe Frau …, / Lieber Herr …,', 'Dear Ms … / Dear Mr … (formal)'], ['Leider kann ich morgen nicht kommen.', 'Unfortunately I can’t come tomorrow.'], ['Ich bin krank.', 'I am ill.'], ['Ich habe Fieber / Kopfschmerzen.', 'I have a fever / a headache.'], ['Können Sie mir bitte … schicken?', 'Could you please send me …?'], ['Am Montag komme ich wieder.', 'I’ll be back on Monday.'], ['Vielen Dank!', 'Thank you very much!'], ['Viele Grüße', 'Best wishes (closing)']],
    check: ['Greeting (“Liebe Frau Schmidt,”) and closing (“Viele Grüße” + name)?', 'Point 1: why you can’t come?', 'Point 2: asked for the homework?', 'Point 3: when you come back?', 'Verb in position 2 (“Am Montag komme ich …”)?', 'About 30 words?'],
  }));

  add({
    id: 'a1-sprechen-1', level: 'A1', exam: 'both', module: 'sprechen', teil: 1, kind: 'speak', minutes: 3,
    title: 'Sprechen Teil 1 – Sich vorstellen',
    en: 'Introduce yourself using seven key words, then spell a word (your name) and say a number (your phone number).',
    instr: 'Stellen Sie sich vor. Dann buchstabieren Sie Ihren Namen und sagen Sie Ihre Telefonnummer.',
    instrEn: 'Introduce yourself. Then spell your name and say your phone number.',
    tip: 'Say one simple sentence for each card word. Practise spelling with the German alphabet (A = ah, E = eh, I = ih, J = jott, V = fau, W = weh) and say phone numbers in single digits or pairs.',
    gloss: [['der Name', 'name'], ['das Alter', 'age'], ['das Land', 'country'], ['der Wohnort', 'place where you live'], ['die Sprache', 'language'], ['der Beruf', 'job'], ['das Hobby', 'hobby'], ['buchstabieren', 'to spell']],
    task: 'Stellen Sie sich bitte vor.\nName? – Alter? – Land? – Wohnort? – Sprachen? – Beruf? – Hobby?\nDanach: Buchstabieren Sie Ihren Familiennamen. Sagen Sie Ihre Telefonnummer.',
    taskEn: 'Please introduce yourself.\nName? – Age? – Country? – Where you live? – Languages? – Job? – Hobby?\nAfterwards: spell your surname. Say your phone number.',
    cards: [{ t: 'Name?', en: 'Name?' }, { t: 'Alter?', en: 'Age?' }, { t: 'Land?', en: 'Country?' }, { t: 'Wohnort?', en: 'Where do you live?' }, { t: 'Sprachen?', en: 'Languages?' }, { t: 'Beruf?', en: 'Job?' }, { t: 'Hobby?', en: 'Hobby?' }],
    model: [
      ['Guten Tag! Mein Name ist Ravi Sharma.', 'Hello! My name is Ravi Sharma.'],
      ['Ich bin zweiunddreißig Jahre alt.', 'I am 32 years old.'],
      ['Ich komme aus Indien.', 'I come from India.'],
      ['Ich wohne jetzt in Köln.', 'I live in Cologne now.'],
      ['Ich spreche Hindi, Englisch und ein bisschen Deutsch.', 'I speak Hindi, English and a little German.'],
      ['Ich bin Ingenieur von Beruf.', 'I am an engineer by profession.'],
      ['Mein Hobby ist Kochen. Ich spiele auch gern Cricket.', 'My hobby is cooking. I also like playing cricket.'],
      ['Mein Familienname ist Sharma. Ich buchstabiere: S – H – A – R – M – A.', 'My surname is Sharma. I’ll spell it: S – H – A – R – M – A.'],
      ['Meine Telefonnummer ist null eins fünf sieben, zwei drei vier, fünf sechs, sieben acht.', 'My phone number is 0157 234 56 78.'],
      ['Danke schön!', 'Thank you!'],
    ],
    redemittel: [['Mein Name ist … / Ich heiße …', 'My name is …'], ['Ich bin … Jahre alt.', 'I am … years old.'], ['Ich komme aus …', 'I come from …'], ['Ich wohne in …', 'I live in …'], ['Ich spreche …', 'I speak …'], ['Ich bin … von Beruf. / Ich arbeite als …', 'I am a … by profession. / I work as …'], ['Mein Hobby ist … / Ich … gern.', 'My hobby is … / I like to …'], ['Ich buchstabiere: …', 'I’ll spell it: …'], ['Meine Telefonnummer ist …', 'My phone number is …']],
    check: ['One sentence for all 7 key words?', 'Verb in position 2 (“Ich wohne …”, “Mein Hobby ist …”)?', 'Spelled your name with German letter names?', 'Said your phone number clearly, digit by digit?', 'No “ein/eine” before your job (“Ich bin Ingenieur”, not “ein Ingenieur”)?'],
  });

  add({
    id: 'a1-sprechen-2', level: 'A1', exam: 'both', module: 'sprechen', teil: 2, kind: 'speak', minutes: 4,
    title: 'Sprechen Teil 2 – Fragen stellen und antworten',
    en: 'You get word cards on a topic: ask your partner a question with the word on your card, then answer your partner’s question.',
    instr: 'Sie bekommen eine Karte. Stellen Sie eine Frage mit dem Wort. Ihr Partner / Ihre Partnerin antwortet.',
    instrEn: 'You get a card. Ask a question with the word. Your partner answers.',
    tip: 'Use a question word (Was? Wann? Wo? Wie viel?) or start with the verb for a yes/no question (“Trinkst du …?”). Keep the answer short but complete: one full sentence.',
    gloss: [['das Frühstück', 'breakfast'], ['das Lieblingsessen', 'favourite food'], ['das Obst', 'fruit'], ['der Kaffee', 'coffee'], ['das Restaurant', 'restaurant'], ['das Getränk', 'drink'], ['kochen', 'to cook'], ['gern', 'gladly (with a verb = like doing)']],
    task: 'Thema: Essen und Trinken. Ziehen Sie eine Karte. Fragen Sie Ihren Partner / Ihre Partnerin mit dem Wort auf der Karte. Antworten Sie auf seine / ihre Frage.',
    taskEn: 'Topic: food and drink. Take a card. Ask your partner a question with the word on the card. Answer his / her question.',
    cards: [
      { t: 'Thema: Essen und Trinken – Wort: Frühstück', en: 'Topic: food and drink – word: breakfast' },
      { t: 'Thema: Essen und Trinken – Wort: Lieblingsessen', en: 'Topic: food and drink – word: favourite food' },
      { t: 'Thema: Essen und Trinken – Wort: Obst', en: 'Topic: food and drink – word: fruit' },
      { t: 'Thema: Essen und Trinken – Wort: Kaffee', en: 'Topic: food and drink – word: coffee' },
      { t: 'Thema: Essen und Trinken – Wort: Restaurant', en: 'Topic: food and drink – word: restaurant' },
      { t: 'Thema: Essen und Trinken – Wort: Getränk', en: 'Topic: food and drink – word: drink' },
    ],
    model: [
      ['Was isst du zum Frühstück?', 'What do you eat for breakfast?'],
      ['Ich esse Brot mit Käse und trinke Tee.', 'I eat bread with cheese and drink tea.'],
      ['Was ist dein Lieblingsessen?', 'What is your favourite food?'],
      ['Mein Lieblingsessen ist Pizza.', 'My favourite food is pizza.'],
      ['Isst du gern Obst?', 'Do you like eating fruit?'],
      ['Ja, ich esse sehr gern Äpfel und Bananen.', 'Yes, I really like eating apples and bananas.'],
      ['Wie viel Kaffee trinkst du am Tag?', 'How much coffee do you drink a day?'],
      ['Ich trinke zwei Tassen Kaffee am Tag.', 'I drink two cups of coffee a day.'],
      ['Gehst du oft ins Restaurant?', 'Do you often go to a restaurant?'],
      ['Nein, nicht oft. Ich koche lieber zu Hause.', 'No, not often. I prefer cooking at home.'],
      ['Was ist dein Lieblingsgetränk?', 'What is your favourite drink?'],
      ['Mein Lieblingsgetränk ist Orangensaft.', 'My favourite drink is orange juice.'],
    ],
    redemittel: [['Was isst du gern?', 'What do you like to eat?'], ['Was trinkst du gern?', 'What do you like to drink?'], ['Isst / Trinkst du gern …?', 'Do you like eating / drinking …?'], ['Wann …? / Wo …? / Wie viel …?', 'When …? / Where …? / How much …?'], ['Was ist dein Lieblings…?', 'What is your favourite …?'], ['Ja, sehr gern.', 'Yes, very much.'], ['Nein, nicht so gern.', 'No, not so much.'], ['Ich esse lieber …', 'I prefer to eat …']],
    check: ['Your question really uses the word on the card?', 'Question word first, or verb first for yes/no questions?', 'Answer is a full sentence?', 'du-form with your partner (“isst du”, “trinkst du”)?'],
  });

  add({
    id: 'a1-sprechen-3', level: 'A1', exam: 'both', module: 'sprechen', teil: 3, kind: 'speak', minutes: 4,
    title: 'Sprechen Teil 3 – Bitten formulieren und reagieren',
    en: 'You get picture cards: make a polite request with the picture, then react to your partner’s request.',
    instr: 'Sie bekommen eine Karte mit einem Bild. Formulieren Sie eine Bitte. Ihr Partner / Ihre Partnerin reagiert.',
    instrEn: 'You get a card with a picture. Make a request. Your partner reacts.',
    tip: 'The easiest pattern: “Können Sie / Kannst du bitte …?” or simply the thing + “bitte” (“Einen Kaffee, bitte”). React with “Ja, gern.”, “Hier, bitte.” or “Tut mir leid, …”.',
    gloss: [['das Fenster', 'window'], ['öffnen / aufmachen', 'to open'], ['der Kuli', 'pen (ballpoint)'], ['das Salz', 'salt'], ['das Handy', 'mobile phone'], ['das Glas Wasser', 'glass of water'], ['Tut mir leid.', 'I’m sorry.'], ['natürlich', 'of course']],
    task: 'Ziehen Sie eine Karte mit einem Bild. Bitten Sie Ihren Partner / Ihre Partnerin um etwas. Ihr Partner / Ihre Partnerin reagiert. Dann tauschen Sie die Rollen.',
    taskEn: 'Take a card with a picture. Ask your partner for something. Your partner reacts. Then swap roles.',
    cards: [
      { t: '🪟 Fenster', en: 'window' }, { t: '☕ Kaffee', en: 'coffee' }, { t: '🖊️ Kuli', en: 'pen' },
      { t: '🧂 Salz', en: 'salt' }, { t: '📱 Handy', en: 'mobile phone' }, { t: '💧 Wasser', en: 'water' },
    ],
    model: [
      ['Können Sie bitte das Fenster öffnen?', 'Could you open the window, please?'],
      ['Ja, natürlich. Gern.', 'Yes, of course. Gladly.'],
      ['Einen Kaffee, bitte!', 'A coffee, please!'],
      ['Gern. Mit Milch und Zucker?', 'Sure. With milk and sugar?'],
      ['Kannst du mir bitte einen Kuli geben?', 'Can you give me a pen, please?'],
      ['Ja, hier, bitte.', 'Yes, here you are.'],
      ['Gibst du mir bitte das Salz?', 'Could you pass me the salt, please?'],
      ['Hier, bitte schön.', 'Here you are.'],
      ['Kann ich bitte kurz dein Handy haben? Ich möchte telefonieren.', 'Can I have your mobile for a moment, please? I want to make a call.'],
      ['Tut mir leid, ich habe mein Handy nicht dabei.', 'Sorry, I don’t have my phone with me.'],
      ['Ein Glas Wasser, bitte.', 'A glass of water, please.'],
      ['Ja, gern. Einen Moment, bitte.', 'Yes, sure. One moment, please.'],
    ],
    redemittel: [['Können Sie bitte …?', 'Could you … please? (formal)'], ['Kannst du bitte …?', 'Can you … please? (informal)'], ['Ich möchte bitte …', 'I would like … please.'], ['Haben Sie …?', 'Do you have …?'], ['Ja, gern. / Ja, natürlich.', 'Yes, sure. / Yes, of course.'], ['Hier, bitte.', 'Here you are.'], ['Tut mir leid, …', 'Sorry, …'], ['Danke schön! – Bitte schön!', 'Thank you! – You’re welcome!']],
    check: ['Did you say “bitte”?', 'Verb at the end with können (“Können Sie … öffnen?”)?', 'Correct article (das Fenster, den Kuli, das Salz)?', 'Did you react politely to your partner’s request?'],
  });

  /* =====================================================================
     MOCK EXAM (Modelltest)
     ===================================================================== */

  add(Object.assign({}, H1, {
    id: 'mock-a1-hoeren-1',
    gloss: [['das Zimmer', 'room (hotel)'], ['reservieren', 'to book'], ['die Karte', 'ticket'], ['die Ermäßigung', 'discount'], ['halb drei', 'half past two'], ['geradeaus', 'straight on'], ['links / rechts', 'left / right'], ['der Friseur', 'hairdresser'], ['der Tisch', 'table'], ['die Person', 'person']],
    items: [
      { audio: [['lange', 'Guten Abend. Ich habe ein Zimmer reserviert. Mein Name ist Lange.'], ['berg', 'Ja, Frau Lange, Sie haben Zimmer dreihundertzwölf … Oh, Entschuldigung, das ist falsch.'], ['berg', 'Sie haben Zimmer zweihundertdreizehn, im zweiten Stock.'], ['lange', 'Danke. Und wann gibt es Frühstück?'], ['berg', 'Von sieben bis zehn Uhr.']],
        q: 'Welches Zimmer hat Frau Lange?', o: ['Zimmer 213', 'Zimmer 231', 'Zimmer 312'], a: 0,
        ex: 'He first says “dreihundertzwölf” (312), then “das ist falsch” (that’s wrong) and corrects it: “zweihundertdreizehn” = two hundred and thirteen = 213. In German you say the units before the tens: drei-zehn = 13.' },
      { audio: [['jana', 'Zwei Karten für den Film um acht, bitte.'], ['peters', 'Das macht achtzehn Euro.'], ['jana', 'Ich bin Studentin. Gibt es eine Ermäßigung?'], ['peters', 'Ja. Dann kostet Ihre Karte nur sieben Euro. Zusammen sind das sechzehn Euro.']],
        q: 'Wie viel bezahlt die Frau für die zwei Karten?', o: ['7 €', '16 €', '18 €'], a: 1,
        ex: 'First the price is “achtzehn Euro” (18 €). Then she gets a student discount (“Ermäßigung”): “Zusammen sind das sechzehn Euro” = together that’s 16 €. 7 € is only her own ticket.' },
      { audio: [['demir', 'Guten Tag, ich brauche einen Termin bei Doktor Braun.'], ['schmidt', 'Können Sie morgen um Viertel nach acht kommen?'], ['demir', 'Da arbeite ich leider. Geht es auch am Nachmittag?'], ['schmidt', 'Ja, um halb drei.'], ['demir', 'Halb drei – das passt gut. Vielen Dank!']],
        q: 'Wann ist der Termin?', o: ['Um 15:30 Uhr.', 'Um 8:15 Uhr.', 'Um 14:30 Uhr.'], a: 2,
        ex: '“Viertel nach acht” (8:15) doesn’t work for him. The new time is “halb drei” = half past two (literally “half three”, i.e. half an hour BEFORE three) = 14:30. Careful: “halb drei” is NOT 3:30.' },
      { audio: [['meier', 'Entschuldigung, wo ist hier die Post?'], ['krueger', 'Gehen Sie hier geradeaus und dann die zweite Straße links. Die Post ist neben der Apotheke.'], ['meier', 'Also die zweite Straße rechts?'], ['krueger', 'Nein, links. Neben der Apotheke.']],
        q: 'Wo ist die Post?', o: ['Zweite Straße links, neben der Apotheke.', 'Zweite Straße rechts, neben der Apotheke.', 'Erste Straße links, neben der Bank.'], a: 0,
        ex: '“die zweite Straße links” = the second street on the left, “neben der Apotheke” = next to the pharmacy. The woman asks “rechts?” (right?) and he says “Nein, links.”' },
      { audio: [['vogel', 'Guten Tag, ich möchte einen Termin am Donnerstag, bitte.'], ['wolf', 'Donnerstag ist leider alles voll. Geht es am Freitag um zehn?'], ['vogel', 'Freitag arbeite ich. Und am Montag?'], ['wolf', 'Montag haben wir geschlossen. Aber am Dienstag um elf ist noch ein Termin frei.'], ['vogel', 'Gut, dann Dienstag.']],
        q: 'Wann geht die Frau zum Friseur?', o: ['Am Dienstag.', 'Am Donnerstag.', 'Am Freitag.'], a: 0,
        ex: 'Thursday is “alles voll” (fully booked), on Friday she works, on Monday they are “geschlossen” (closed). “Am Dienstag um elf ist noch ein Termin frei” – she says “Gut, dann Dienstag” = OK, Tuesday then.' },
      { audio: [['sofia', 'Guten Tag, ich möchte einen Tisch für Samstagabend reservieren.'], ['yilmaz', 'Gern. Für wie viele Personen?'], ['sofia', 'Für vier … Nein, warten Sie, meine Eltern kommen auch mit. Für sechs Personen, bitte.'], ['yilmaz', 'Sechs Personen am Samstag um neunzehn Uhr. Gern.']],
        q: 'Für wie viele Personen ist der Tisch?', o: ['Für zwei Personen.', 'Für vier Personen.', 'Für sechs Personen.'], a: 2,
        ex: 'She starts with “für vier” (for four), then: “meine Eltern kommen auch mit” (my parents are coming too) – “für sechs Personen” = for six people.' },
    ],
  }));

  add(Object.assign({}, H2, {
    id: 'mock-a1-hoeren-2',
    gloss: [['der Regionalexpress', 'regional express train'], ['die Abfahrt', 'departure'], ['das Kaufhaus', 'department store'], ['die Kasse', 'checkout / till'], ['der Passagier', 'passenger'], ['später', 'later'], ['das Fest', 'festival / party'], ['der Eintritt ist frei', 'admission is free']],
    items: [
      { audio: [['_', 'Information zu Gleis fünf: Der Regionalexpress nach Dresden fährt heute nicht von Gleis fünf, sondern von Gleis acht.'], ['_', 'Abfahrt: sechzehn Uhr vierzig.']],
        q: 'Der Zug nach Dresden fährt heute von Gleis 5.', o: RF, a: 1,
        ex: 'Falsch. “nicht von Gleis fünf, sondern von Gleis acht” = not from platform 5 but from platform 8.' },
      { audio: [['_', 'Liebe Kundinnen und Kunden, unser Kaufhaus schließt in fünfzehn Minuten. Bitte kommen Sie jetzt zu den Kassen.'], ['_', 'Morgen sind wir ab neun Uhr wieder für Sie da. Vielen Dank für Ihren Einkauf!']],
        q: 'Das Kaufhaus öffnet morgen um 9 Uhr.', o: RF, a: 0,
        ex: 'Richtig. “Morgen sind wir ab neun Uhr wieder für Sie da” = tomorrow we are there for you again from 9 o’clock.' },
      { audio: [['_', 'Information für die Passagiere des Fluges EW 742 nach London: Ihr Flug hat dreißig Minuten Verspätung.'], ['_', 'Die neue Abflugzeit ist dreizehn Uhr fünfzehn. Bitte gehen Sie zum Ausgang A zweiundzwanzig.']],
        q: 'Der Flug nach London startet später.', o: RF, a: 0,
        ex: 'Richtig. “Ihr Flug hat dreißig Minuten Verspätung” = your flight is 30 minutes late, so it leaves later (“später”) – at 13:15.' },
      { audio: [['_', 'Und hier ein Tipp für das Wochenende: Am Sonntag ist im Stadtpark das große Sommerfest. Es beginnt um elf Uhr.'], ['_', 'Für Kinder gibt es Spiele und Musik. Und das Beste: Der Eintritt ist frei!']],
        q: 'Man muss für das Sommerfest bezahlen.', o: RF, a: 1,
        ex: 'Falsch. “Der Eintritt ist frei” = admission is free – you don’t have to pay (“bezahlen”).' },
    ],
  }));

  add(Object.assign({}, H3, {
    id: 'mock-a1-hoeren-3',
    gloss: [['das Konzert', 'concert'], ['vor dem Theater', 'in front of the theatre'], ['die Zahnarztpraxis', 'dentist’s office'], ['mitbringen', 'to bring (along)'], ['die Versichertenkarte', 'health insurance card'], ['der Kühlschrank', 'fridge'], ['der Hausmeister', 'caretaker'], ['die Heizung', 'heating'], ['das Möbelhaus', 'furniture store']],
    items: [
      { audio: [['jana', 'Hallo Tim, hier ist Jana. Ich habe zwei Karten für das Konzert am Freitag! Das Konzert beginnt um acht.'], ['jana', 'Wir treffen uns um halb acht vor dem Theater, okay? Ruf mich bitte an. Tschüss!']],
        q: 'Wann treffen sich Tim und Jana?', o: ['Um 19:30 Uhr.', 'Um 20:00 Uhr.', 'Um 20:30 Uhr.'], a: 0,
        ex: '“Wir treffen uns um halb acht” = we meet at half past seven (half an hour before eight) = 19:30. “um acht” (20:00) is when the concert starts.' },
      { audio: [['meier', 'Guten Tag, Herr Demir, hier ist die Zahnarztpraxis Doktor Klein. Sie haben morgen um neun Uhr einen Termin.'], ['meier', 'Sie müssen nichts bezahlen, aber bringen Sie bitte Ihre Versichertenkarte mit. Bis morgen!']],
        q: 'Was soll Herr Demir mitbringen?', o: ['Geld.', 'Seine Versichertenkarte.', 'Seinen Pass.'], a: 1,
        ex: '“Sie müssen nichts bezahlen” = you don’t have to pay – so no money. “bringen Sie bitte Ihre Versichertenkarte mit” = please bring your health insurance card.' },
      { audio: [['lena', 'Hallo Jonas, hier ist Mama. Ich komme heute später nach Hause, erst um sieben. Das Essen ist im Kühlschrank.'], ['lena', 'Mach bitte deine Hausaufgaben und ruf Oma an. Sie hat heute Geburtstag!']],
        q: 'Warum soll Jonas Oma anrufen?', o: ['Oma ist krank.', 'Oma kommt heute zum Essen.', 'Oma hat Geburtstag.'], a: 2,
        ex: '“ruf Oma an. Sie hat heute Geburtstag!” = call Grandma. It’s her birthday today! “Das Essen ist im Kühlschrank” (the food is in the fridge) is for Jonas, not for Oma.' },
      { audio: [['peters', 'Guten Tag, Frau Richter, hier spricht Peters, der Hausmeister. Am Donnerstag kommt der Techniker für die Heizung.'], ['peters', 'Er kommt zwischen acht und zwölf Uhr. Sind Sie da zu Hause? Bitte rufen Sie mich zurück.']],
        q: 'Wann kommt der Techniker?', o: ['Am Donnerstagvormittag.', 'Am Donnerstagnachmittag.', 'Am Dienstagvormittag.'], a: 0,
        ex: '“Am Donnerstag” = on Thursday, “zwischen acht und zwölf Uhr” = between 8 and 12 o’clock – that is the morning (“Vormittag”). Don’t mix up Donnerstag (Thursday) and Dienstag (Tuesday).' },
      { audio: [['lisa', 'Guten Tag, hier ist das Möbelhaus Wohnwelt. Ihr Tisch ist schon da, aber die Stühle kommen erst nächste Woche.'], ['lisa', 'Sie können den Tisch ab Mittwoch abholen. Bitte rufen Sie uns an. Vielen Dank!']],
        q: 'Was ist schon im Möbelhaus?', o: ['Die Stühle.', 'Der Tisch.', 'Der Tisch und die Stühle.'], a: 1,
        ex: '“Ihr Tisch ist schon da” = your table is already here. “die Stühle kommen erst nächste Woche” = the chairs only come next week.' },
    ],
  }));

  add(Object.assign({}, L1, {
    id: 'mock-a1-lesen-1',
    gloss: [['die Einladung', 'invitation'], ['das Grillen', 'barbecue'], ['erst', 'not until / only'], ['mitbringen', 'to bring along'], ['der Salat', 'salad'], ['dürfen', 'to be allowed to'], ['der Nachbar', 'neighbour'], ['feiern', 'to celebrate'], ['laut', 'loud'], ['eingeladen', 'invited']],
    items: [
      { text: 'Hallo Lisa,\n\nvielen Dank für deine Einladung! Ich komme gern am Sonntag zum Grillen. Aber ich kann erst um drei Uhr kommen, denn am Vormittag muss ich arbeiten.\n\nSoll ich etwas mitbringen? Ich kann einen Salat machen. Mein Bruder Emre ist am Wochenende auch bei mir. Darf er mitkommen?\n\nLiebe Grüße\nSelin',
        q: 'Selin arbeitet am Sonntagvormittag.', o: RF, a: 0,
        ex: 'Richtig. “Ich komme gern am Sonntag … Aber … am Vormittag muss ich arbeiten” = I’m coming on Sunday, but in the morning I have to work.' },
      { q: 'Selin möchte einen Kuchen mitbringen.', o: RF, a: 1,
        ex: 'Falsch. “Ich kann einen Salat machen” = I can make a salad. There is no cake (“Kuchen”).' },
      { q: 'Selin kommt allein zum Grillen.', o: RF, a: 1,
        ex: 'Falsch. “Mein Bruder Emre … Darf er mitkommen?” = may my brother come along? She wants to come with her brother, not alone (“allein”).' },
      { text: 'Liebe Nachbarn,\n\nam Samstag, den 12. Mai, feiere ich meinen 30. Geburtstag. Die Party beginnt um 20 Uhr in meiner Wohnung im 3. Stock.\n\nEs ist vielleicht ein bisschen laut. Das tut mir leid! Sie sind natürlich auch herzlich eingeladen.\n\nViele Grüße\nPaul Hoffmann, Wohnung 7',
        q: 'Herr Hoffmann wohnt im dritten Stock.', o: RF, a: 0,
        ex: 'Richtig. “in meiner Wohnung im 3. Stock” = in my flat on the third floor.' },
      { q: 'Die Nachbarn dürfen nicht zur Party kommen.', o: RF, a: 1,
        ex: 'Falsch. “Sie sind natürlich auch herzlich eingeladen” = of course you are warmly invited too. The neighbours may come.' },
    ],
  }));

  add(Object.assign({}, L2, {
    id: 'mock-a1-lesen-2',
    gloss: [['das Hallenbad', 'indoor swimming pool'], ['täglich', 'daily'], ['die Familienkarte', 'family ticket'], ['der Balkon', 'balcony'], ['möbliert', 'furnished'], ['schicken', 'to send'], ['Geld abheben', 'to withdraw money'], ['der Geldautomat', 'cash machine / ATM'], ['kostenlos', 'free of charge']],
    items: [
      { text: 'a) Hallenbad Nord – Montag bis Freitag 6:30 bis 22:00 Uhr. Achtung: Am Wochenende bis 30. Juni geschlossen!\n\nb) Freizeitbad Aqua – täglich 9:00 bis 21:00 Uhr. Familienkarte (2 Erwachsene + Kinder): 25 €',
        q: 'Sie möchten am Samstag mit Ihren Kindern schwimmen gehen.', o: ['a', 'b'], a: 1,
        ex: 'b: “täglich” = every day, so also on Saturday – and there is a “Familienkarte” (family ticket). Pool a is “Am Wochenende … geschlossen” (closed at the weekend).' },
      { text: 'a) 3-Zimmer-Wohnung, 75 m², Küche, Bad, Balkon, 2. Stock. Miete: 850 € warm. Tel. 0761 223344\n\nb) 1-Zimmer-Apartment, 30 m², großer Balkon, möbliert, ideal für Studenten. Miete: 520 € warm.',
        q: 'Sie suchen eine Wohnung mit Balkon für Ihre Familie (zwei Erwachsene und ein Kind).', o: ['a', 'b'], a: 0,
        ex: 'a: “3-Zimmer-Wohnung, 75 m²” – three rooms, big enough for a family, and it has a “Balkon”. b has a balcony too, but it is only one room (“1-Zimmer”, 30 m²) – “ideal für Studenten”.' },
      { text: 'a) Blumen Berg – frische Blumen jeden Tag! Marktplatz 3. Montag bis Samstag 8 bis 18 Uhr.\n\nb) www.blumenpost24.de – Wir bringen Ihre Blumen in ganz Deutschland zu Ihren Freunden. Bestellen Sie heute – schon morgen da!',
        q: 'Sie möchten Ihrer Freundin Blumen schicken. Sie wohnt in einer anderen Stadt.', o: ['a', 'b'], a: 1,
        ex: 'b: “Wir bringen Ihre Blumen in ganz Deutschland zu Ihren Freunden” = we bring your flowers to your friends all over Germany. Shop a only sells flowers at the market square.' },
      { text: 'a) Sparkasse am Hauptbahnhof – Geldautomat: 24 Stunden geöffnet, jeden Tag. Beratung: Montag bis Freitag 9 bis 16 Uhr.\n\nb) Volksbank Innenstadt, Goethestraße 4 – Öffnungszeiten: Montag bis Freitag 8:30 bis 17:00 Uhr. Samstag und Sonntag geschlossen.',
        q: 'Sie sind am Hauptbahnhof und brauchen Geld. Es ist Sonntag.', o: ['a', 'b'], a: 0,
        ex: 'a: “Geldautomat: 24 Stunden geöffnet, jeden Tag” = cash machine open 24 hours, every day – also on Sunday, and it is at the main station. Bank b is “Samstag und Sonntag geschlossen”.' },
      { text: 'a) Volkshochschule: Intensivkurs Deutsch A1 – Montag bis Freitag, 8:30 bis 12:45 Uhr, 4 Wochen. Preis: 380 €\n\nb) Sprachcafé International – Jeden Samstag 10 bis 12 Uhr im Bürgerhaus: Deutsch sprechen mit Muttersprachlern. Kostenlos!',
        q: 'Sie möchten Deutsch sprechen üben, aber Sie haben nur am Samstag Zeit.', o: ['a', 'b'], a: 1,
        ex: 'b: “Jeden Samstag 10 bis 12 Uhr” = every Saturday 10–12, “Deutsch sprechen” = speak German. Course a is “Montag bis Freitag” (Monday to Friday) only.' },
    ],
  }));

  add(Object.assign({}, L3, {
    id: 'mock-a1-lesen-3',
    gloss: [['die Öffnungszeiten', 'opening hours'], ['die Bauarbeiten', 'construction work'], ['halten', 'to stop (bus)'], ['die Haltestelle', 'bus stop'], ['das Frühstück', 'breakfast'], ['fotografieren', 'to take photos'], ['der Blitz', 'flash'], ['umziehen / umgezogen', 'to move (house) / moved'], ['wie immer', 'as always']],
    items: [
      { text: 'Supermarkt Frischmarkt\nNeue Öffnungszeiten ab 1. Oktober:\nMo–Sa 7:00–22:00 Uhr',
        q: 'Ab Oktober ist der Supermarkt auch am Sonntag geöffnet.', o: RF, a: 1,
        ex: 'Falsch. “Mo–Sa” = Montag bis Samstag (Monday to Saturday). Sunday (“Sonntag”) is not on the sign, so it is closed.' },
      { text: 'Linie 12\nWegen Bauarbeiten hält der Bus vom 3. bis 7. Juni nicht hier.\nBitte gehen Sie zur Haltestelle „Rathaus“ (200 m).',
        q: 'Vom 3. bis 7. Juni muss man zur Haltestelle „Rathaus“ gehen.', o: RF, a: 0,
        ex: 'Richtig. “der Bus hält … nicht hier” = the bus doesn’t stop here. “Bitte gehen Sie zur Haltestelle „Rathaus“” = please go to the “Rathaus” stop.' },
      { text: 'Hotel Sonne – Frühstück\nMo–Fr 6:30–10:00 Uhr\nSa, So 7:30–11:00 Uhr\nim Restaurant im Erdgeschoss',
        q: 'Am Sonntag kann man um 10:30 Uhr frühstücken.', o: RF, a: 0,
        ex: 'Richtig. “Sa, So 7:30–11:00 Uhr” = Saturday and Sunday 7:30 to 11:00 – so 10:30 is fine. (On weekdays breakfast ends at 10:00.)' },
      { text: 'Museum für Stadtgeschichte\nFotografieren erlaubt – aber bitte ohne Blitz!\nEssen und Trinken nur im Café.',
        q: 'Im Museum darf man keine Fotos machen.', o: RF, a: 1,
        ex: 'Falsch. “Fotografieren erlaubt” = taking photos is allowed – only “ohne Blitz” (without flash).' },
      { text: 'Praxis Dr. Wolf\nWir sind umgezogen! Neue Adresse: Bahnhofstraße 22, 2. Stock\nTelefon wie immer: 0711 234567',
        q: 'Die Praxis hat eine neue Telefonnummer.', o: RF, a: 1,
        ex: 'Falsch. The address is new (“Wir sind umgezogen” = we have moved), but “Telefon wie immer” = phone number as always – it is the same.' },
    ],
  }));

  add(Object.assign({}, S1, {
    id: 'mock-a1-schreiben-1',
    instr: 'Ihr Freund Kenji Tanaka möchte einen Ausweis für die Stadtbibliothek. Im Formular fehlen fünf Informationen. Helfen Sie Ihrem Freund und schreiben Sie die fünf fehlenden Informationen in das Formular.',
    instrEn: 'Your friend Kenji Tanaka wants a card for the city library. Five pieces of information are missing in the form. Help your friend and write the five missing pieces of information in the form.',
    gloss: [['der Ausweis', 'card / ID'], ['die Bibliothek', 'library'], ['geboren', 'born'], ['der Koch', 'cook / chef'], ['früher', 'in the past / before'], ['die Tochter', 'daughter'], ['privat', 'private'], ['die Arbeit', 'work']],
    text: 'Kenji Tanaka ist in Osaka in Japan geboren. Er wohnt seit drei Jahren mit seiner Frau und seiner Tochter Yuki in Hannover. Die Adresse ist Lindenallee 8, 30159 Hannover. Früher war Kenji Lehrer, aber jetzt arbeitet er als Koch in einem Restaurant in der Georgstraße. Seine Handynummer ist 0157 8824310. Im Restaurant hat er auch ein Telefon, aber da möchte er keine Anrufe. Yuki ist sieben Jahre alt und liest sehr gern. Sie möchte auch einen Ausweis.',
    textEn: 'Kenji Tanaka was born in Osaka in Japan. He has lived in Hanover with his wife and his daughter Yuki for three years. The address is Lindenallee 8, 30159 Hanover. Kenji used to be a teacher, but now he works as a cook in a restaurant in Georgstraße. His mobile number is 0157 8824310. He also has a phone at the restaurant, but he doesn’t want calls there. Yuki is seven years old and loves reading. She wants a card too.',
    fields: [
      { label: 'Herkunftsland', a: 'Japan' },
      { label: 'Straße, Hausnummer', a: 'Lindenallee 8' },
      { label: 'Beruf', a: 'Koch' },
      { label: 'Telefon (privat)', a: '0157 8824310', alt: ['01578824310', '0157-8824310', '0157/8824310'] },
      { label: 'Ausweis auch für Kinder? (ja / nein)', a: 'ja', alt: ['Ja'] },
    ],
  }));

  add(Object.assign({}, S2, {
    id: 'mock-a1-schreiben-2',
    gloss: [['der Geburtstag', 'birthday'], ['Alles Gute!', 'All the best! / Happy birthday!'], ['die Einladung', 'invitation'], ['leider', 'unfortunately'], ['besuchen', 'to visit'], ['Zeit haben', 'to have time'], ['zusammen', 'together']],
    task: 'Ihre Freundin Sara hat am Samstag Geburtstag und macht eine Party. Sie können nicht kommen. Schreiben Sie Sara eine Nachricht.',
    taskEn: 'Your friend Sara has her birthday on Saturday and is having a party. You can’t come. Write Sara a message.',
    points: ['Gratulieren Sie Sara.', 'Warum können Sie nicht kommen?', 'Machen Sie einen Vorschlag für ein Treffen.'],
    pointsEn: ['Congratulate Sara.', 'Why can’t you come?', 'Suggest a time to meet.'],
    model: 'Liebe Sara,\n\nalles Gute zum Geburtstag! Vielen Dank für die Einladung. Leider kann ich am Samstag nicht kommen. Meine Eltern besuchen mich. Hast du am Sonntag Zeit? Dann können wir zusammen Kaffee trinken.\n\nLiebe Grüße\nAnna',
    modelEn: 'Dear Sara,\n\nhappy birthday! Thank you very much for the invitation. Unfortunately I can’t come on Saturday. My parents are visiting me. Do you have time on Sunday? Then we can have coffee together.\n\nLove\nAnna',
    redemittel: [['Liebe … / Lieber …', 'Dear … (informal)'], ['Alles Gute zum Geburtstag!', 'Happy birthday!'], ['Vielen Dank für die Einladung.', 'Thank you for the invitation.'], ['Leider kann ich nicht kommen.', 'Unfortunately I can’t come.'], ['Ich muss arbeiten. / Meine Eltern besuchen mich.', 'I have to work. / My parents are visiting me.'], ['Hast du am … Zeit?', 'Do you have time on …?'], ['Wir können zusammen …', 'We can … together.'], ['Liebe Grüße', 'Love / Best wishes (informal closing)']],
    check: ['Greeting (“Liebe Sara,”) and closing (“Liebe Grüße” + name)?', 'Point 1: birthday wishes?', 'Point 2: a reason why you can’t come?', 'Point 3: a suggestion (day/time + what to do)?', 'du-form for a friend (“Hast du …?”)?', 'About 30 words?'],
  }));
})();
