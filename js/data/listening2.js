/* LISTENING GYM – part 2: 36 more everyday audio clips (original texts written for Deutsch30). */
(function () {
  'use strict';
  const L = (GL.listening = GL.listening || {});
  const RF = ['Richtig', 'Falsch'];

  L.clips = (L.clips || []).concat([
    /* ---------- BAHNHOF ---------- */
    { id: 'bahnhof-wagenreihung', level: 'A1', place: 'bahnhof', icon: '🚃', title: 'Wo hält die erste Klasse?', en: 'Where does first class stop?',
      audio: [
        ['_', 'An Gleis vier fährt ein: der ICE nach München.'],
        ['_', 'Die Wagen der ersten Klasse halten heute im Abschnitt A. Das Bordrestaurant ist in der Mitte des Zuges.'],
      ],
      q: [
        { q: 'Wo halten die Wagen der ersten Klasse?', o: ['im Abschnitt A', 'im Abschnitt D', 'in der Mitte des Zuges'], a: 0,
          ex: '„Die Wagen der ersten Klasse halten heute im Abschnitt A.“ – first-class carriages stop in section A. The restaurant is in the middle.' },
        { q: 'Der Zug fährt nach München.', o: RF, a: 0,
          ex: '„der ICE nach München“ – the ICE to Munich.' },
      ],
      gloss: [['einfahren', 'to arrive (train coming in)'], ['der Wagen', 'carriage, coach'], ['der Abschnitt', 'section (of the platform)'], ['das Bordrestaurant', 'restaurant car']] },

    { id: 'bahnhof-reservierung', level: 'A2', place: 'bahnhof', icon: '💺', title: 'Mein reservierter Platz', en: 'My reserved seat',
      audio: [
        ['richter', 'Entschuldigung, ich glaube, das ist mein Platz. Ich habe Platz fünfundfünfzig reserviert.'],
        ['demir', 'Oh, wirklich? Moment … Das hier ist Wagen elf, oder?'],
        ['richter', 'Nein, das ist Wagen zwölf. Wagen elf ist der nächste, da hinten.'],
        ['demir', 'Ach so, dann sitze ich falsch. Tut mir leid! Ich nehme schnell meine Tasche.'],
        ['richter', 'Kein Problem, das passiert ja oft.'],
      ],
      q: [
        { q: 'In welchem Wagen sitzen die beiden?', o: ['in Wagen elf', 'in Wagen zwölf', 'in Wagen fünfundfünfzig'], a: 1,
          ex: '„Nein, das ist Wagen zwölf.“ – no, this is carriage 12. The man thought he was in carriage 11. 55 is the seat number.' },
        { q: 'Was macht der Mann?', o: ['Er bleibt sitzen.', 'Er zeigt seine Fahrkarte.', 'Er sucht seinen Platz in einem anderen Wagen.'], a: 2,
          ex: '„dann sitze ich falsch … Ich nehme schnell meine Tasche“ – he is in the wrong seat and takes his bag to go to carriage 11.' },
      ],
      gloss: [['reservieren', 'to reserve'], ['der Platz', 'seat'], ['falsch sitzen', 'to sit in the wrong place'], ['Das passiert oft.', 'That happens often.']] },

    { id: 'bahnhof-zugteilung', level: 'B1', place: 'bahnhof', icon: '🔀', title: 'Der Zug wird geteilt', en: 'The train is split',
      audio: [
        ['_', 'Liebe Fahrgäste, wir erreichen in wenigen Minuten Hamm in Westfalen.'],
        ['_', 'In Hamm wird unser Zug geteilt. Bitte beachten Sie: Nur der vordere Zugteil fährt weiter nach Münster und Emden.'],
        ['_', 'Der hintere Zugteil fährt weiter über Dortmund nach Köln. Bitte prüfen Sie jetzt, ob Sie im richtigen Zugteil sitzen.'],
        ['_', 'Ein Wechsel zwischen den Zugteilen ist nur in Hamm auf dem Bahnsteig möglich. Wir haben dort einen Aufenthalt von etwa acht Minuten.'],
        ['_', 'Fahrgäste mit Fahrrädern finden den Fahrradwagen im hinteren Zugteil, direkt neben dem Bistro.'],
      ],
      q: [
        { q: 'Sie wollen nach Münster. Was müssen Sie tun?', o: ['im hinteren Zugteil sitzen', 'in Dortmund umsteigen', 'im vorderen Zugteil sitzen'], a: 2,
          ex: '„Nur der vordere Zugteil fährt weiter nach Münster und Emden.“ – only the front part continues to Münster.' },
        { q: 'Wie kann man den Zugteil wechseln?', o: ['durch den Zug gehen, wann man will', 'in Hamm auf dem Bahnsteig', 'im Bistro fragen'], a: 1,
          ex: '„Ein Wechsel … ist nur in Hamm auf dem Bahnsteig möglich“ – you can only change parts on the platform in Hamm.' },
        { q: 'Wo ist der Fahrradwagen?', o: ['im hinteren Zugteil', 'im vorderen Zugteil', 'ganz vorne neben der Lok'], a: 0,
          ex: '„den Fahrradwagen im hinteren Zugteil, direkt neben dem Bistro“ – the bike carriage is in the rear part, next to the bistro.' },
      ],
      gloss: [['teilen', 'to split, divide'], ['der Zugteil', 'part of the train'], ['vordere / hintere', 'front / rear'], ['der Aufenthalt', 'stop, stay (time at a station)'], ['der Bahnsteig', 'platform']] },

    /* ---------- FLUGHAFEN ---------- */
    { id: 'flughafen-gatewechsel', level: 'A1', place: 'flughafen', icon: '🛫', title: 'Neues Gate', en: 'New gate',
      audio: [
        ['_', 'Achtung, eine Information für Passagiere des Fluges LH vierhundertzwanzig nach Istanbul.'],
        ['_', 'Ihr Flug startet heute nicht von Gate B neun, sondern von Gate C vierzehn. Das Boarding beginnt um sechzehn Uhr zehn.'],
      ],
      q: [
        { q: 'Von welchem Gate startet der Flug?', o: ['B 9', 'C 14', 'C 4'], a: 1,
          ex: '„nicht von Gate B neun, sondern von Gate C vierzehn“ – not from B9 but from C14.' },
        { q: 'Wann beginnt das Boarding?', o: ['um 16:10 Uhr', 'um 14:10 Uhr', 'um 16:20 Uhr'], a: 0,
          ex: '„um sechzehn Uhr zehn“ – at 16:10 (4:10 pm).' },
      ],
      gloss: [['der Passagier', 'passenger'], ['der Flug', 'flight'], ['starten', 'to take off'], ['das Boarding', 'boarding']] },

    { id: 'flughafen-kind-gesucht', level: 'A2', place: 'flughafen', icon: '🧒', title: 'Ein Kind sucht seine Eltern', en: 'A child is looking for its parents',
      audio: [
        ['_', 'Eine Durchsage: Die Eltern von Emil, sechs Jahre alt, werden gebeten, zum Informationsschalter in Terminal eins zu kommen.'],
        ['_', 'Emil trägt eine rote Jacke und hat einen blauen Rucksack. Er wartet bei unseren Mitarbeitern am Informationsschalter, gegenüber vom Café.'],
        ['_', 'Ich wiederhole: Die Eltern von Emil bitte zum Informationsschalter in Terminal eins.'],
      ],
      q: [
        { q: 'Wo wartet Emil?', o: ['im Café', 'am Gate in Terminal zwei', 'am Informationsschalter'], a: 2,
          ex: '„Er wartet … am Informationsschalter, gegenüber vom Café“ – he is waiting at the information desk, opposite the café.' },
        { q: 'Was trägt Emil?', o: ['eine blaue Jacke und einen roten Rucksack', 'eine rote Jacke und einen blauen Rucksack', 'eine rote Mütze'], a: 1,
          ex: '„eine rote Jacke und … einen blauen Rucksack“ – a red jacket and a blue backpack. Listen to which colour goes with which thing.' },
      ],
      gloss: [['die Durchsage', 'announcement'], ['gebeten werden', 'to be asked'], ['der Informationsschalter', 'information desk'], ['gegenüber von', 'opposite'], ['wiederholen', 'to repeat']] },

    { id: 'flughafen-ueberbucht', level: 'B1', place: 'flughafen', icon: '🎟️', title: 'Der Flug ist überbucht', en: 'The flight is overbooked',
      audio: [
        ['meier', 'Guten Morgen. Ihren Pass und Ihre Buchungsnummer, bitte. … Ah, Sie fliegen nach Wien.'],
        ['kaya', 'Genau. Ich möchte auch einen Koffer aufgeben.'],
        ['meier', 'Gern. Ich muss Ihnen aber leider sagen: Der Flug ist heute überbucht. Wir suchen Freiwillige, die später fliegen.'],
        ['kaya', 'Hm. Und was bekomme ich dafür?'],
        ['meier', 'Sie würden mit dem Flug um vierzehn Uhr dreißig fliegen, also vier Stunden später. Dafür bekommen Sie einen Gutschein über zweihundertfünfzig Euro und ein Mittagessen.'],
        ['kaya', 'Na ja, eigentlich habe ich um zwei einen Termin in Wien. Das schaffe ich dann nicht.'],
        ['meier', 'Verstehe. Dann bleiben Sie natürlich auf Ihrem Flug. Ihr Sitzplatz ist schon reserviert, Platz achtzehn C, am Gang.'],
        ['kaya', 'Super, danke. Dann passt das so.'],
      ],
      q: [
        { q: 'Was bietet die Mitarbeiterin an?', o: ['einen Gutschein und ein Mittagessen', 'einen Platz in der Business Class', 'ein Hotelzimmer für eine Nacht'], a: 0,
          ex: '„einen Gutschein über zweihundertfünfzig Euro und ein Mittagessen“ – a €250 voucher and lunch, if he takes a later flight.' },
        { q: 'Warum nimmt der Mann das Angebot nicht an?', o: ['Er will mehr Geld.', 'Er hat einen Termin in Wien.', 'Er hat keinen Koffer.'], a: 1,
          ex: '„eigentlich habe ich um zwei einen Termin in Wien. Das schaffe ich dann nicht.“ – he has an appointment at two and would not make it.' },
        { q: 'Der Mann fliegt mit dem Flug um 14:30 Uhr.', o: RF, a: 1,
          ex: '„Dann bleiben Sie natürlich auf Ihrem Flug.“ – he stays on his original flight; 14:30 was only the offer.' },
      ],
      gloss: [['überbucht', 'overbooked'], ['der/die Freiwillige', 'volunteer'], ['der Gutschein', 'voucher'], ['einen Koffer aufgeben', 'to check in a suitcase'], ['am Gang', 'aisle (seat)']] },

    /* ---------- EINKAUFEN ---------- */
    { id: 'einkaufen-angebot', level: 'A1', place: 'einkaufen', icon: '🍓', title: 'Angebot im Supermarkt', en: 'Special offer in the supermarket',
      audio: [
        ['_', 'Liebe Kundinnen und Kunden, heute im Angebot: frische Erdbeeren aus Deutschland, die Schale nur ein Euro neunundneunzig.'],
        ['_', 'Und an unserer Käsetheke: alle Käsesorten zwanzig Prozent billiger. Nur heute!'],
      ],
      q: [
        { q: 'Was kosten die Erdbeeren?', o: ['2,99 €', '1,20 €', '1,99 €'], a: 2,
          ex: '„die Schale nur ein Euro neunundneunzig“ – one punnet only €1.99.' },
        { q: 'Was ist an der Käsetheke billiger?', o: ['nur ein Käse', 'alle Käsesorten', 'Käse und Wurst'], a: 1,
          ex: '„alle Käsesorten zwanzig Prozent billiger“ – all kinds of cheese 20 % cheaper.' },
      ],
      gloss: [['das Angebot', 'special offer'], ['die Erdbeere', 'strawberry'], ['die Schale', 'punnet, small box'], ['die Käsetheke', 'cheese counter'], ['billiger', 'cheaper']] },

    { id: 'einkaufen-pfand', level: 'A2', place: 'einkaufen', icon: '🧾', title: 'Der Pfandbon', en: 'The deposit receipt',
      audio: [
        ['becker', 'Hallo! Haben Sie eine Payback-Karte?'],
        ['novak', 'Nein, leider nicht. Aber ich habe hier noch einen Pfandbon.'],
        ['becker', 'Danke. Der Bon ist über drei Euro zwanzig. Dann macht das zusammen noch vierzehn Euro achtzig.'],
        ['novak', 'Kann ich mit Karte zahlen?'],
        ['becker', 'Ja, klar. Stecken Sie die Karte einfach hier rein. … So, brauchen Sie den Kassenbon?'],
        ['novak', 'Ja, bitte. Danke, schönen Tag noch!'],
      ],
      q: [
        { q: 'Wie viel muss der Mann noch bezahlen?', o: ['14,80 €', '3,20 €', '18,00 €'], a: 0,
          ex: '„Dann macht das zusammen noch vierzehn Euro achtzig.“ – after the deposit receipt (€3.20) he still has to pay €14.80.' },
        { q: 'Wie bezahlt der Mann?', o: ['bar', 'mit Payback-Karte', 'mit Karte'], a: 2,
          ex: '„Kann ich mit Karte zahlen?“ – „Ja, klar.“ He pays by card. He doesn’t have a Payback card (loyalty card).' },
      ],
      gloss: [['der Pfandbon', 'receipt for returned bottles (deposit)'], ['das Pfand', 'deposit'], ['der Kassenbon', 'receipt'], ['bar zahlen', 'to pay cash'], ['mit Karte zahlen', 'to pay by card']] },

    { id: 'einkaufen-reklamation', level: 'B1', place: 'einkaufen', icon: '💻', title: 'Der Laptop ist kaputt', en: 'The laptop is broken',
      audio: [
        ['hahn', 'Guten Tag, was kann ich für Sie tun?'],
        ['peters', 'Hallo. Also, ich habe vor drei Wochen hier diesen Laptop gekauft, und jetzt geht er nicht mehr an. Einfach schwarz.'],
        ['hahn', 'Oh, das ist ärgerlich. Haben Sie den Kassenbon dabei?'],
        ['peters', 'Ja, hier. Ich hätte gern einfach einen neuen, ne?'],
        ['hahn', 'Das verstehe ich. Wir müssen das Gerät aber zuerst an den Hersteller schicken. Der prüft dann, was kaputt ist.'],
        ['peters', 'Und wie lange dauert das?'],
        ['hahn', 'Normalerweise zwei bis drei Wochen. Wenn man ihn nicht reparieren kann, bekommen Sie ein neues Gerät oder Ihr Geld zurück.'],
        ['peters', 'Na ja, drei Wochen ohne Laptop … Ich brauche den für die Arbeit.'],
        ['hahn', 'Wir können Ihnen solange ein Leihgerät geben. Das ist kostenlos, Sie müssen nur hier unterschreiben.'],
        ['peters', 'Ah, okay, das ist gut. Dann machen wir das so.'],
      ],
      q: [
        { q: 'Was ist das Problem?', o: ['Der Laptop ist zu langsam.', 'Der Laptop geht nicht mehr an.', 'Der Bildschirm ist kaputt.'], a: 1,
          ex: '„jetzt geht er nicht mehr an. Einfach schwarz.“ – it doesn’t switch on any more.' },
        { q: 'Was passiert jetzt mit dem Laptop?', o: ['Der Mann bekommt sofort einen neuen.', 'Der Mann bekommt sein Geld zurück.', 'Der Laptop geht an den Hersteller.'], a: 2,
          ex: '„Wir müssen das Gerät aber zuerst an den Hersteller schicken.“ – it is sent to the manufacturer first. A new one or money back comes only if it can’t be repaired.' },
        { q: 'Der Mann muss für das Leihgerät bezahlen.', o: RF, a: 1,
          ex: '„Das ist kostenlos, Sie müssen nur hier unterschreiben.“ – the loan device is free; he only has to sign.' },
      ],
      gloss: [['angehen', 'to switch on (by itself)'], ['ärgerlich', 'annoying'], ['der Hersteller', 'manufacturer'], ['das Leihgerät', 'loan device'], ['unterschreiben', 'to sign']] },

    /* ---------- ARZT ---------- */
    { id: 'arzt-anmeldung', level: 'A1', place: 'arzt', icon: '🪪', title: 'An der Anmeldung', en: 'At the reception',
      audio: [
        ['klein', 'Guten Morgen. Haben Sie einen Termin?'],
        ['wolf', 'Ja, um neun Uhr bei Doktor Lange.'],
        ['klein', 'Gut. Ihre Versichertenkarte, bitte. … Danke. Nehmen Sie bitte noch im Wartezimmer Platz.'],
      ],
      q: [
        { q: 'Was möchte die Frau sehen?', o: ['den Pass', 'die Versichertenkarte', 'eine Überweisung'], a: 1,
          ex: '„Ihre Versichertenkarte, bitte.“ – your health insurance card, please.' },
        { q: 'Wohin geht der Mann jetzt?', o: ['ins Wartezimmer', 'nach Hause', 'zu Doktor Lange ins Zimmer'], a: 0,
          ex: '„Nehmen Sie bitte noch im Wartezimmer Platz.“ – please take a seat in the waiting room.' },
      ],
      gloss: [['die Anmeldung', 'reception (at a practice)'], ['der Termin', 'appointment'], ['die Versichertenkarte', 'health insurance card'], ['das Wartezimmer', 'waiting room']] },

    { id: 'arzt-zahnschmerzen', level: 'A2', place: 'arzt', icon: '🦷', title: 'Zahnschmerzen', en: 'Toothache',
      audio: [
        ['frank', 'Zahnarztpraxis Doktor Berg, guten Tag.'],
        ['tim', 'Guten Tag, Tim Schneider hier. Ich habe seit gestern starke Zahnschmerzen. Unten links.'],
        ['frank', 'Oh, das tut mir leid. Haben Sie auch Fieber oder ist die Wange dick?'],
        ['tim', 'Nein, Fieber nicht. Aber ich kann nicht richtig essen.'],
        ['frank', 'Dann kommen Sie am besten heute noch in unsere Schmerzsprechstunde, zwischen elf und zwölf Uhr. Sie müssen aber vielleicht ein bisschen warten.'],
        ['tim', 'Das ist kein Problem. Vielen Dank!'],
      ],
      q: [
        { q: 'Wo hat der Mann Schmerzen?', o: ['oben links', 'unten rechts', 'unten links'], a: 2,
          ex: '„Unten links.“ – bottom left.' },
        { q: 'Wann soll der Mann kommen?', o: ['heute zwischen 11 und 12 Uhr', 'morgen um 11 Uhr', 'heute um 12:30 Uhr'], a: 0,
          ex: '„heute noch in unsere Schmerzsprechstunde, zwischen elf und zwölf Uhr“ – today, during the emergency pain hour from 11 to 12.' },
      ],
      gloss: [['die Zahnschmerzen (Pl.)', 'toothache'], ['die Wange', 'cheek'], ['dick', 'swollen (here), thick'], ['die Schmerzsprechstunde', 'walk-in hour for patients in pain']] },

    { id: 'arzt-blutwerte', level: 'B1', place: 'arzt', icon: '🩸', title: 'Die Blutwerte', en: 'The blood results',
      audio: [
        ['schmidt', 'So, Herr Yilmaz, Ihre Blutwerte sind da. Also, im Großen und Ganzen sieht das gut aus.'],
        ['yilmaz', 'Na, da bin ich erleichtert. Aber warum bin ich dann immer so müde?'],
        ['schmidt', 'Genau das sieht man hier: Ihr Eisenwert ist zu niedrig. Das macht müde, und man kann sich schlecht konzentrieren.'],
        ['yilmaz', 'Ach so. Und was kann ich da machen?'],
        ['schmidt', 'Ich verschreibe Ihnen Eisentabletten. Die nehmen Sie bitte jeden Morgen vor dem Frühstück, mit einem Glas Wasser, nicht mit Tee oder Kaffee.'],
        ['yilmaz', 'Okay. Und wie lange?'],
        ['schmidt', 'Erst mal drei Monate. Essen Sie auch mehr Linsen, Spinat und Vollkornbrot. Dann machen wir noch mal einen Bluttest.'],
        ['yilmaz', 'Gut. Soll ich dafür schon einen Termin machen?'],
        ['schmidt', 'Ja, machen Sie das gleich vorne an der Anmeldung. Und kommen Sie dann bitte nüchtern, also ohne Frühstück.'],
      ],
      q: [
        { q: 'Was ist das Problem von Herrn Yilmaz?', o: ['Er hat zu wenig Eisen.', 'Er hat zu viel Zucker im Blut.', 'Er schläft zu wenig.'], a: 0,
          ex: '„Ihr Eisenwert ist zu niedrig. Das macht müde“ – his iron level is too low, which makes him tired.' },
        { q: 'Wie soll er die Tabletten nehmen?', o: ['abends mit Tee', 'morgens nach dem Frühstück mit Kaffee', 'morgens vor dem Frühstück mit Wasser'], a: 2,
          ex: '„jeden Morgen vor dem Frühstück, mit einem Glas Wasser, nicht mit Tee oder Kaffee“ – every morning before breakfast, with water.' },
        { q: 'Zum nächsten Bluttest soll er nichts essen.', o: RF, a: 0,
          ex: '„kommen Sie dann bitte nüchtern, also ohne Frühstück“ – come with an empty stomach, without breakfast.' },
      ],
      gloss: [['die Blutwerte (Pl.)', 'blood test results'], ['erleichtert', 'relieved'], ['der Eisenwert', 'iron level'], ['verschreiben', 'to prescribe'], ['nüchtern', 'with an empty stomach']] },

    /* ---------- TELEFON ---------- */
    { id: 'telefon-terminerinnerung', level: 'A1', place: 'telefon', icon: '📞', title: 'Erinnerung an den Termin', en: 'Appointment reminder',
      audio: [
        ['jana', 'Guten Tag, hier ist die Physiotherapie Jung. Wir möchten Sie an Ihren Termin erinnern: morgen, Dienstag, um Viertel nach drei.'],
        ['jana', 'Bitte bringen Sie ein Handtuch mit. Vielen Dank und bis morgen!'],
      ],
      q: [
        { q: 'Wann ist der Termin?', o: ['am Dienstag um 3:45 Uhr', 'am Dienstag um 15:15 Uhr', 'am Donnerstag um 15:15 Uhr'], a: 1,
          ex: '„morgen, Dienstag, um Viertel nach drei“ – tomorrow, Tuesday, at quarter past three (15:15). „Viertel vor vier“ would be 3:45.' },
        { q: 'Was soll man mitbringen?', o: ['eine Wasserflasche', 'die Versichertenkarte', 'ein Handtuch'], a: 2,
          ex: '„Bitte bringen Sie ein Handtuch mit.“ – please bring a towel.' },
      ],
      gloss: [['erinnern an', 'to remind of'], ['Viertel nach drei', 'quarter past three'], ['das Handtuch', 'towel'], ['mitbringen', 'to bring along']] },

    { id: 'telefon-bank-karte', level: 'A2', place: 'telefon', icon: '💳', title: 'Anruf von der Bank', en: 'Call from the bank',
      audio: [
        ['weber', 'Guten Tag, Weber von der Stadtsparkasse. Spreche ich mit Herrn Novak?'],
        ['novak', 'Ja, am Apparat.'],
        ['weber', 'Herr Novak, Ihre neue Bankkarte ist da. Ihre alte Karte ist nur noch bis Ende des Monats gültig.'],
        ['novak', 'Ah, gut. Schicken Sie mir die neue Karte nach Hause?'],
        ['weber', 'Nein, Sie müssen sie in der Filiale abholen. Bringen Sie bitte Ihren Ausweis mit. Die PIN bleibt gleich.'],
        ['novak', 'Okay, ich komme morgen vorbei. Danke!'],
      ],
      q: [
        { q: 'Was muss Herr Novak machen?', o: ['die Karte in der Filiale abholen', 'auf einen Brief warten', 'eine neue PIN bestellen'], a: 0,
          ex: '„Sie müssen sie in der Filiale abholen.“ – he must pick it up at the branch. The PIN stays the same.' },
        { q: 'Die alte Karte funktioniert schon heute nicht mehr.', o: RF, a: 1,
          ex: '„Ihre alte Karte ist nur noch bis Ende des Monats gültig.“ – the old card is still valid until the end of the month.' },
      ],
      gloss: [['am Apparat', 'speaking (on the phone)'], ['gültig', 'valid'], ['die Filiale', 'branch'], ['abholen', 'to pick up'], ['der Ausweis', 'ID card']] },

    { id: 'telefon-jobcenter', level: 'B1', place: 'telefon', icon: '📠', title: 'Nachricht vom Jobcenter', en: 'Message from the Jobcenter',
      audio: [
        ['lange', 'Guten Tag, Herr Kaya, hier spricht Monika Lange vom Jobcenter, Ihre Ansprechpartnerin.'],
        ['lange', 'Es geht um Ihren Termin am Donnerstag. Den muss ich leider verschieben, weil ich an dem Tag auf einer Fortbildung bin.'],
        ['lange', 'Ich schlage Ihnen stattdessen Montag, den zwölften, um zehn Uhr vor. Wenn das nicht passt, rufen Sie mich bitte bis Freitag zurück.'],
        ['lange', 'Bringen Sie bitte zum Termin Ihren aktuellen Mietvertrag und die Bescheinigung von Ihrem Deutschkurs mit.'],
        ['lange', 'Die Bewerbungen, die Sie mir geschickt haben, habe ich übrigens bekommen. Das sieht schon sehr gut aus.'],
        ['lange', 'Sie erreichen mich unter null fünf eins eins, vier sechs acht, zwei drei. Vielen Dank und auf Wiederhören.'],
      ],
      q: [
        { q: 'Warum ruft Frau Lange an?', o: ['Herr Kaya hat seinen Termin vergessen.', 'Sie muss den Termin verschieben.', 'Sie braucht noch Bewerbungen.'], a: 1,
          ex: '„Den muss ich leider verschieben, weil ich an dem Tag auf einer Fortbildung bin.“ – she has to postpone the appointment because of a training course.' },
        { q: 'Was soll Herr Kaya mitbringen?', o: ['seine Bewerbungen', 'seinen Pass und ein Foto', 'den Mietvertrag und die Kursbescheinigung'], a: 2,
          ex: '„Ihren aktuellen Mietvertrag und die Bescheinigung von Ihrem Deutschkurs“ – the rental contract and the course certificate. She already has the applications.' },
        { q: 'Wann soll Herr Kaya zurückrufen?', o: ['nur wenn der Montag nicht passt', 'auf jeden Fall bis Donnerstag', 'am Montag um zehn'], a: 0,
          ex: '„Wenn das nicht passt, rufen Sie mich bitte bis Freitag zurück.“ – only if the new date doesn’t suit him.' },
      ],
      gloss: [['der/die Ansprechpartner/in', 'contact person'], ['verschieben', 'to postpone'], ['die Fortbildung', 'training course'], ['die Bescheinigung', 'certificate, confirmation'], ['die Bewerbung', 'job application']] },

    /* ---------- RADIO ---------- */
    { id: 'radio-flohmarkt', level: 'A1', place: 'radio', icon: '📻', title: 'Tipp fürs Wochenende', en: 'Tip for the weekend',
      audio: [
        ['_', 'Unser Tipp für Sonntag: der große Flohmarkt am Rathausplatz, von acht bis sechzehn Uhr.'],
        ['_', 'Der Eintritt ist frei. Für Kinder gibt es ein Kinderkarussell.'],
      ],
      q: [
        { q: 'Wann ist der Flohmarkt?', o: ['am Samstag', 'am Sonntag', 'am Freitag'], a: 1,
          ex: '„Unser Tipp für Sonntag“ – our tip for Sunday.' },
        { q: 'Was kostet der Eintritt?', o: ['acht Euro', 'sechzehn Euro', 'nichts'], a: 2,
          ex: '„Der Eintritt ist frei.“ – entry is free. 8 and 16 are the times.' },
      ],
      gloss: [['der Flohmarkt', 'flea market'], ['der Eintritt', 'entry, admission'], ['frei', 'free (no charge)'], ['das Karussell', 'merry-go-round']] },

    { id: 'radio-unwetter', level: 'A2', place: 'radio', icon: '⛈️', title: 'Unwetterwarnung', en: 'Severe weather warning',
      audio: [
        ['_', 'Und jetzt eine Unwetterwarnung des Deutschen Wetterdienstes für ganz Niedersachsen.'],
        ['_', 'Heute Nachmittag ab etwa fünfzehn Uhr kommen starke Gewitter mit Hagel und Sturm. Es kann bis zu dreißig Liter Regen pro Quadratmeter geben.'],
        ['_', 'Bitte bleiben Sie, wenn möglich, im Haus und parken Sie Ihr Auto nicht unter Bäumen.'],
        ['_', 'Morgen wird es dann ruhiger: Sonne und Wolken bei zweiundzwanzig Grad.'],
      ],
      q: [
        { q: 'Was kommt heute Nachmittag?', o: ['Gewitter mit Hagel und Sturm', 'Schnee und Glatteis', 'sehr heißes Wetter'], a: 0,
          ex: '„starke Gewitter mit Hagel und Sturm“ – strong thunderstorms with hail and storm winds.' },
        { q: 'Was soll man nicht machen?', o: ['im Haus bleiben', 'das Auto unter Bäumen parken', 'die Fenster schließen'], a: 1,
          ex: '„parken Sie Ihr Auto nicht unter Bäumen“ – don’t park your car under trees.' },
      ],
      gloss: [['das Unwetter', 'severe weather'], ['das Gewitter', 'thunderstorm'], ['der Hagel', 'hail'], ['der Sturm', 'storm, gale'], ['der Quadratmeter', 'square metre']] },

    { id: 'radio-bahnstreik', level: 'B1', place: 'radio', icon: '🪧', title: 'Streik bei der Bahn', en: 'Rail strike',
      audio: [
        ['_', 'Pendler müssen sich ab morgen auf große Probleme einstellen: Die Lokführergewerkschaft hat zu einem Streik bei der Deutschen Bahn aufgerufen.'],
        ['_', 'Der Streik beginnt morgen früh um zwei Uhr und soll bis Donnerstagabend dauern.'],
        ['_', 'Im Fernverkehr will die Bahn nur etwa ein Fünftel der Züge fahren lassen. Auch viele Regionalzüge und S-Bahnen fallen aus.'],
        ['_', 'Busse, U-Bahnen und Straßenbahnen der städtischen Verkehrsbetriebe sind nicht betroffen und fahren normal.'],
        ['_', 'Wer eine Fahrkarte für die Streiktage hat, kann sie kostenlos stornieren oder später nutzen. Die Zugbindung ist aufgehoben.'],
        ['_', 'Die Gewerkschaft fordert mehr Geld und kürzere Arbeitszeiten. Die Bahn nennt den Streik unnötig.'],
      ],
      q: [
        { q: 'Welche Verkehrsmittel fahren normal?', o: ['die Fernzüge', 'die S-Bahnen', 'Busse und Straßenbahnen'], a: 2,
          ex: '„Busse, U-Bahnen und Straßenbahnen … sind nicht betroffen und fahren normal.“ – city buses, underground and trams are not affected.' },
        { q: 'Was können Fahrgäste mit einer Fahrkarte für die Streiktage machen?', o: ['Sie kostenlos stornieren oder später fahren', 'Nur mit dem Bus fahren', 'Nichts – das Geld ist weg'], a: 0,
          ex: '„kann sie kostenlos stornieren oder später nutzen“ – cancel free of charge or use it later.' },
        { q: 'Wie lange soll der Streik dauern?', o: ['nur einen Tag', 'bis Donnerstagabend', 'eine ganze Woche'], a: 1,
          ex: '„soll bis Donnerstagabend dauern“ – it is to last until Thursday evening.' },
      ],
      gloss: [['der Pendler', 'commuter'], ['die Gewerkschaft', 'trade union'], ['ausfallen', 'to be cancelled'], ['betroffen', 'affected'], ['stornieren', 'to cancel (a booking)'], ['die Zugbindung', 'restriction to a specific train']] },

    /* ---------- ARBEIT ---------- */
    { id: 'arbeit-kantine', level: 'A1', place: 'arbeit', icon: '🍽️', title: 'Mittagessen in der Kantine', en: 'Lunch in the canteen',
      audio: [
        ['mia', 'Gehst du mit in die Kantine?'],
        ['jonas', 'Ja, gern. Was gibt es heute?'],
        ['mia', 'Nudeln mit Tomatensoße oder Fisch mit Kartoffeln.'],
        ['jonas', 'Hm, ich nehme die Nudeln. Ich esse keinen Fisch.'],
      ],
      q: [
        { q: 'Was isst der Mann?', o: ['Fisch mit Kartoffeln', 'Nudeln mit Tomatensoße', 'eine Suppe'], a: 1,
          ex: '„ich nehme die Nudeln. Ich esse keinen Fisch.“ – he takes the pasta; he doesn’t eat fish.' },
      ],
      gloss: [['die Kantine', 'canteen'], ['die Nudeln (Pl.)', 'pasta, noodles'], ['die Soße', 'sauce'], ['nehmen', 'to take, to have (food)']] },

    { id: 'arbeit-zeiterfassung', level: 'A2', place: 'arbeit', icon: '⏱️', title: 'Pause und Stempeln', en: 'Breaks and clocking in',
      audio: [
        ['yildiz', 'Also, noch eine wichtige Sache: Morgens stempelst du hier am Eingang mit deinem Mitarbeiterausweis.'],
        ['demir', 'Okay. Und wenn ich gehe, auch?'],
        ['yildiz', 'Genau, beim Gehen auch. Und in der Mittagspause musst du nicht stempeln, die wird automatisch abgezogen. Dreißig Minuten.'],
        ['demir', 'Und wann machen die anderen Mittagspause?'],
        ['yildiz', 'Meistens so um halb eins. Aber das ist flexibel, zwischen zwölf und zwei, wie du willst.'],
        ['demir', 'Super, danke. Das ist ja einfach.'],
      ],
      q: [
        { q: 'Wann muss man stempeln?', o: ['nur am Morgen', 'vor und nach der Mittagspause', 'beim Kommen und beim Gehen'], a: 2,
          ex: '„Morgens stempelst du …“ – „Und wenn ich gehe, auch?“ – „Genau, beim Gehen auch.“ – when arriving and leaving, not for lunch.' },
        { q: 'Wie lang ist die Mittagspause?', o: ['30 Minuten', '2 Stunden', '45 Minuten'], a: 0,
          ex: '„die wird automatisch abgezogen. Dreißig Minuten.“ – 30 minutes are deducted automatically.' },
      ],
      gloss: [['stempeln', 'to clock in/out'], ['der Mitarbeiterausweis', 'staff ID card'], ['abziehen', 'to deduct'], ['flexibel', 'flexible']] },

    { id: 'arbeit-probezeit', level: 'B1', place: 'arbeit', icon: '🤝', title: 'Gespräch am Ende der Probezeit', en: 'Talk at the end of the probation period',
      audio: [
        ['hoffmann', 'Frau Rana, schön, dass Sie da sind. Wie Sie wissen, endet Ihre Probezeit nächsten Monat. Wie geht es Ihnen denn bei uns?'],
        ['sofia', 'Ehrlich gesagt sehr gut. Das Team ist super, und ich habe viel gelernt. Nur am Anfang war die Sprache manchmal schwierig.'],
        ['hoffmann', 'Das merkt man aber kaum noch. Also, wir sind sehr zufrieden mit Ihnen. Die Kunden loben Sie, und Sie arbeiten sehr genau.'],
        ['sofia', 'Oh, danke, das freut mich.'],
        ['hoffmann', 'Ein Punkt noch: Bei Telefonaten mit Kunden könnten Sie etwas sicherer werden. Wir bezahlen Ihnen gern einen Kurs für Telefonieren im Beruf.'],
        ['sofia', 'Ja, gern. Das wäre wirklich hilfreich.'],
        ['hoffmann', 'Gut. Dann bleibt es dabei: Wir übernehmen Sie nach der Probezeit, und Ihr Vertrag wird unbefristet.'],
        ['sofia', 'Das ist ja toll! Vielen Dank, Herr Hoffmann.'],
      ],
      q: [
        { q: 'Was war für die Frau am Anfang schwierig?', o: ['das Team', 'die Sprache', 'die Arbeitszeiten'], a: 1,
          ex: '„Nur am Anfang war die Sprache manchmal schwierig.“ – only at the beginning was the language sometimes difficult.' },
        { q: 'Was soll die Frau verbessern?', o: ['Telefonate mit Kunden', 'genauer arbeiten', 'pünktlicher sein'], a: 0,
          ex: '„Bei Telefonaten mit Kunden könnten Sie etwas sicherer werden.“ – she could become more confident on the phone with customers. „Sie arbeiten sehr genau“ is praise.' },
        { q: 'Die Frau bekommt einen unbefristeten Vertrag.', o: RF, a: 0,
          ex: '„Ihr Vertrag wird unbefristet.“ – her contract becomes permanent.' },
      ],
      gloss: [['die Probezeit', 'probation period'], ['zufrieden', 'satisfied'], ['loben', 'to praise'], ['übernehmen', 'to keep on (an employee)'], ['unbefristet', 'permanent, open-ended']] },

    /* ---------- SCHULE ---------- */
    { id: 'schule-kita-schliesstag', level: 'A1', place: 'schule', icon: '🏫', title: 'Die Kita ist zu', en: 'The Kita is closed',
      audio: [
        ['vogel', 'Liebe Eltern, am Freitag ist die Kita geschlossen. Wir haben einen Teamtag.'],
        ['vogel', 'Am Montag sind wir wieder ab sieben Uhr für Ihre Kinder da.'],
      ],
      q: [
        { q: 'Wann ist die Kita geschlossen?', o: ['am Montag', 'am Freitag', 'am Samstag'], a: 1,
          ex: '„am Freitag ist die Kita geschlossen“ – the Kita is closed on Friday.' },
        { q: 'Am Montag öffnet die Kita um sieben Uhr.', o: RF, a: 0,
          ex: '„Am Montag sind wir wieder ab sieben Uhr … da.“ – on Monday they are open again from seven.' },
      ],
      gloss: [['die Kita', 'day-care centre'], ['geschlossen', 'closed'], ['der Teamtag', 'staff day (no children)'], ['ab sieben Uhr', 'from seven o’clock']] },

    { id: 'schule-klassenfahrt', level: 'A2', place: 'schule', icon: '🚌', title: 'Elternabend: die Klassenfahrt', en: 'Parents’ evening: the class trip',
      audio: [
        ['_', 'Herzlich willkommen zum Elternabend! Heute geht es vor allem um unsere Klassenfahrt im Mai.'],
        ['_', 'Wir fahren fünf Tage an die Ostsee, in eine Jugendherberge in Travemünde. Wir fahren mit dem Zug.'],
        ['_', 'Die Fahrt kostet zweihundertzehn Euro. Bitte überweisen Sie das Geld bis zum fünfzehnten März.'],
        ['_', 'Wenn Sie finanzielle Hilfe brauchen, sprechen Sie mich bitte an. Das bleibt natürlich unter uns.'],
      ],
      q: [
        { q: 'Wie fährt die Klasse an die Ostsee?', o: ['mit dem Bus', 'mit dem Auto', 'mit dem Zug'], a: 2,
          ex: '„Wir fahren mit dem Zug.“ – we are going by train.' },
        { q: 'Bis wann sollen die Eltern bezahlen?', o: ['bis zum 15. März', 'bis zum 5. Mai', 'bis zum 10. März'], a: 0,
          ex: '„bis zum fünfzehnten März“ – by 15 March. The trip itself is in May.' },
      ],
      gloss: [['die Klassenfahrt', 'class trip'], ['die Jugendherberge', 'youth hostel'], ['überweisen', 'to transfer (money)'], ['finanzielle Hilfe', 'financial help'], ['unter uns', 'between us (confidential)']] },

    { id: 'schule-dtz-pruefung', level: 'B1', place: 'schule', icon: '📝', title: 'Anmeldung zur Prüfung', en: 'Registering for the exam',
      audio: [
        ['meier', 'So, alle mal kurz herhören, bitte. Ich habe wichtige Infos zur Prüfung „Deutsch-Test für Zuwanderer“.'],
        ['meier', 'Die Prüfung ist am Samstag, den achten Juni. Der schriftliche Teil beginnt um neun Uhr, die mündliche Prüfung ist am Nachmittag.'],
        ['tim', 'Frau Meier, müssen wir uns selbst anmelden?'],
        ['meier', 'Nein, das mache ich für euch. Aber ich brauche bis nächsten Mittwoch eine Kopie von eurem Pass oder Aufenthaltstitel.'],
        ['tim', 'Und was kostet die Prüfung?'],
        ['meier', 'Für euch nichts, sie ist Teil des Integrationskurses. Wer aber nicht kommt und sich nicht abmeldet, muss die Prüfung später vielleicht selbst bezahlen.'],
        ['tim', 'Okay. Und wann bekommen wir die Ergebnisse?'],
        ['meier', 'Das dauert leider ein bisschen, ungefähr sechs bis acht Wochen. Die Zertifikate bekommt ihr dann hier in der Schule.'],
      ],
      q: [
        { q: 'Was müssen die Teilnehmer bis Mittwoch abgeben?', o: ['eine Anmeldung', 'die Prüfungsgebühr', 'eine Kopie vom Pass oder Aufenthaltstitel'], a: 2,
          ex: '„ich brauche bis nächsten Mittwoch eine Kopie von eurem Pass oder Aufenthaltstitel“ – the teacher registers them herself.' },
        { q: 'Wann ist die mündliche Prüfung?', o: ['am Samstagnachmittag', 'am Samstag um neun Uhr', 'am Mittwoch'], a: 0,
          ex: '„die mündliche Prüfung ist am Nachmittag“ – the oral exam is in the afternoon of the same Saturday. 9 o’clock is the written part.' },
        { q: 'Die Teilnehmer bekommen ihre Zertifikate per Post.', o: RF, a: 1,
          ex: '„Die Zertifikate bekommt ihr dann hier in der Schule.“ – they get the certificates at the school.' },
      ],
      gloss: [['herhören', 'to listen (up)'], ['schriftlich / mündlich', 'written / oral'], ['der Aufenthaltstitel', 'residence permit'], ['sich abmelden', 'to cancel one’s registration'], ['das Ergebnis', 'result']] },

    /* ---------- AMT ---------- */
    { id: 'amt-oeffnungszeiten', level: 'A1', place: 'amt', icon: '🏛️', title: 'Öffnungszeiten vom Bürgeramt', en: 'Opening hours of the citizens’ office',
      audio: [
        ['_', 'Willkommen beim Bürgeramt. Leider rufen Sie außerhalb unserer Öffnungszeiten an.'],
        ['_', 'Wir sind montags bis freitags von acht bis zwölf Uhr für Sie da, donnerstags auch von vierzehn bis achtzehn Uhr.'],
      ],
      q: [
        { q: 'Wann ist das Bürgeramt auch am Nachmittag offen?', o: ['am Montag', 'am Freitag', 'am Donnerstag'], a: 2,
          ex: '„donnerstags auch von vierzehn bis achtzehn Uhr“ – on Thursdays also from 2 to 6 pm.' },
      ],
      gloss: [['das Bürgeramt', 'citizens’ office'], ['die Öffnungszeiten (Pl.)', 'opening hours'], ['außerhalb', 'outside (of)'], ['donnerstags', 'on Thursdays']] },

    { id: 'amt-steuer-id', level: 'A2', place: 'amt', icon: '🔢', title: 'Wo ist meine Steuer-ID?', en: 'Where is my tax ID?',
      audio: [
        ['richter', 'Guten Tag, was kann ich für Sie tun?'],
        ['berg', 'Hallo. Ich habe mich vor sechs Wochen angemeldet, aber ich habe noch keinen Brief mit meiner Steuer-ID bekommen. Mein Arbeitgeber braucht die Nummer.'],
        ['richter', 'Die Steuer-ID schickt das Bundeszentralamt für Steuern, nicht wir. Aber ich kann im System nachsehen. … Aha, der Brief ist an uns zurückgekommen. Steht Ihr Name am Briefkasten?'],
        ['berg', 'Oh … nein. Mein Name steht noch nicht am Briefkasten.'],
        ['richter', 'Das ist das Problem. Schreiben Sie Ihren Namen an den Briefkasten und beantragen Sie die Nummer online noch einmal.'],
        ['berg', 'Okay, das mache ich. Danke schön!'],
      ],
      q: [
        { q: 'Warum braucht der Mann die Steuer-ID?', o: ['für die Bank', 'für seinen Arbeitgeber', 'für die Krankenkasse'], a: 1,
          ex: '„Mein Arbeitgeber braucht die Nummer.“ – his employer needs the number.' },
        { q: 'Was ist das Problem?', o: ['Sein Name steht nicht am Briefkasten.', 'Er hat sich nicht angemeldet.', 'Er hat die falsche Adresse angegeben.'], a: 0,
          ex: '„Mein Name steht noch nicht am Briefkasten.“ – the letter came back because the post couldn’t find his name.' },
      ],
      gloss: [['die Steuer-ID', 'tax identification number'], ['der Arbeitgeber', 'employer'], ['nachsehen', 'to check, look up'], ['der Briefkasten', 'letterbox'], ['beantragen', 'to apply for']] },

    { id: 'amt-fuehrerschein', level: 'B1', place: 'amt', icon: '🚗', title: 'Den Führerschein umschreiben', en: 'Converting a driving licence',
      audio: [
        ['hahn', 'Fahrerlaubnisbehörde, Hahn, guten Tag.'],
        ['demir', 'Guten Tag, Demir hier. Ich wohne seit vier Monaten in Deutschland und habe einen Führerschein aus Pakistan. Kann ich damit hier fahren?'],
        ['hahn', 'Also, mit einem Führerschein aus Pakistan dürfen Sie in Deutschland sechs Monate fahren. Danach brauchen Sie einen deutschen Führerschein.'],
        ['demir', 'Oh, dann habe ich nicht mehr viel Zeit. Was muss ich machen?'],
        ['hahn', 'Sie müssen den Führerschein umschreiben lassen. Für Pakistan heißt das: Sie machen eine theoretische und eine praktische Prüfung.'],
        ['demir', 'Echt? Ich fahre schon seit zehn Jahren Auto.'],
        ['hahn', 'Das verstehe ich, aber das ist leider die Regel. Fahrstunden sind keine Pflicht, wir empfehlen aber ein paar Stunden in einer Fahrschule.'],
        ['demir', 'Na ja, okay. Und was brauche ich für den Antrag?'],
        ['hahn', 'Ein biometrisches Foto, einen Sehtest, einen Erste-Hilfe-Kurs und eine Übersetzung von Ihrem Führerschein. Den Antrag stellen Sie am besten gleich, das dauert ein paar Wochen.'],
      ],
      q: [
        { q: 'Wie lange darf Herr Demir mit seinem Führerschein in Deutschland fahren?', o: ['vier Monate', 'sechs Monate', 'zehn Jahre'], a: 1,
          ex: '„dürfen Sie in Deutschland sechs Monate fahren“ – six months. He has lived here for four months; he has driven for ten years.' },
        { q: 'Was muss er machen?', o: ['nur einen Sehtest', 'Pflicht-Fahrstunden in einer Fahrschule', 'eine theoretische und eine praktische Prüfung'], a: 2,
          ex: '„Sie machen eine theoretische und eine praktische Prüfung.“ – he must take a theory and a practical test. Driving lessons are recommended, not required („keine Pflicht“).' },
        { q: 'Herr Demir soll den Antrag bald stellen.', o: RF, a: 0,
          ex: '„Den Antrag stellen Sie am besten gleich, das dauert ein paar Wochen.“ – best to apply right away, it takes a few weeks.' },
      ],
      gloss: [['die Fahrerlaubnisbehörde', 'driving licence office'], ['umschreiben lassen', 'to have (a licence) converted'], ['die Pflicht', 'obligation'], ['der Sehtest', 'eye test'], ['die Übersetzung', 'translation']] },

    /* ---------- WOHNEN ---------- */
    { id: 'wohnen-wasser-aus', level: 'A1', place: 'wohnen', icon: '🚰', title: 'Kein Wasser am Mittwoch', en: 'No water on Wednesday',
      audio: [
        ['krueger', 'Hallo, hier ist Krüger, der Hausmeister. Am Mittwoch gibt es von neun bis zwölf Uhr kein Wasser im Haus.'],
        ['krueger', 'Wir reparieren eine Leitung im Keller. Danke für Ihr Verständnis!'],
      ],
      q: [
        { q: 'Wann gibt es kein Wasser?', o: ['am Mittwoch von 9 bis 12 Uhr', 'am Mittwoch den ganzen Tag', 'am Montag von 9 bis 12 Uhr'], a: 0,
          ex: '„Am Mittwoch … von neun bis zwölf Uhr kein Wasser“ – on Wednesday from 9 to 12.' },
        { q: 'Was macht der Hausmeister?', o: ['Er repariert die Heizung.', 'Er putzt den Keller.', 'Er repariert eine Leitung.'], a: 2,
          ex: '„Wir reparieren eine Leitung im Keller.“ – they are repairing a pipe in the basement.' },
      ],
      gloss: [['der Hausmeister', 'caretaker'], ['die Leitung', 'pipe'], ['der Keller', 'basement, cellar'], ['das Verständnis', 'understanding']] },

    { id: 'wohnen-hausparty', level: 'A2', place: 'wohnen', icon: '🎉', title: 'Einladung zur Party', en: 'Party invitation',
      audio: [
        ['lisa', 'Hallo! Ich bin Lisa, ich wohne oben im dritten Stock. Ich wollte Ihnen nur sagen: Am Samstag feiere ich meinen Geburtstag.'],
        ['schulz', 'Oh, herzlichen Glückwunsch schon mal!'],
        ['lisa', 'Danke! Es kann ein bisschen laut werden, aber spätestens um Mitternacht machen wir die Musik leiser. Und kommen Sie doch auch vorbei!'],
        ['schulz', 'Das ist nett, danke. Soll ich etwas mitbringen?'],
        ['lisa', 'Nein, nicht nötig. Es gibt genug zu essen. Ab acht Uhr geht’s los.'],
        ['schulz', 'Super, dann komme ich gern kurz vorbei.'],
      ],
      q: [
        { q: 'Warum feiert Lisa?', o: ['Sie hat Geburtstag.', 'Sie ist neu eingezogen.', 'Sie hat eine neue Arbeit.'], a: 0,
          ex: '„Am Samstag feiere ich meinen Geburtstag.“ – she is celebrating her birthday.' },
        { q: 'Was soll der Nachbar mitbringen?', o: ['einen Salat', 'etwas zu trinken', 'nichts'], a: 2,
          ex: '„Nein, nicht nötig. Es gibt genug zu essen.“ – not necessary, there is enough food.' },
        { q: 'Die Party beginnt um Mitternacht.', o: RF, a: 1,
          ex: '„Ab acht Uhr geht’s los.“ – it starts at eight. At midnight the music gets quieter.' },
      ],
      gloss: [['der Stock', 'floor, storey'], ['feiern', 'to celebrate'], ['spätestens', 'at the latest'], ['vorbeikommen', 'to drop by'], ['Es geht los.', 'It starts.']] },

    { id: 'wohnen-nebenkosten', level: 'B1', place: 'wohnen', icon: '🧮', title: 'Die Nebenkostenabrechnung', en: 'The utility bill statement',
      audio: [
        ['klein', 'Hausverwaltung Sommer, Klein am Apparat.'],
        ['max', 'Guten Tag, hier ist Max Weber aus der Lindenstraße zwölf. Ich habe die Nebenkostenabrechnung bekommen und soll dreihundertvierzig Euro nachzahlen. Das ist ja ziemlich viel.'],
        ['klein', 'Ja, das hören wir gerade öfter. Die Heizkosten sind letztes Jahr stark gestiegen, das betrifft leider alle Mieter im Haus.'],
        ['max', 'Okay, aber hier steht auch Gartenpflege. Wir haben doch gar keinen Garten, nur einen Hof.'],
        ['klein', 'Moment, ich schaue mal nach … Oh, da haben Sie recht. Das ist ein Fehler, der Posten gehört zu einem anderen Haus. Das sind sechsundachtzig Euro.'],
        ['max', 'Aha. Und was mache ich jetzt?'],
        ['klein', 'Sie bekommen eine neue Abrechnung per Post. Zahlen Sie bitte erst dann. Und ab nächstem Monat wird Ihre Vorauszahlung um zwanzig Euro erhöht, damit Sie nächstes Jahr nicht wieder so viel nachzahlen.'],
        ['max', 'Na gut, das ist wahrscheinlich besser so. Vielen Dank für die Hilfe.'],
      ],
      q: [
        { q: 'Warum ist die Nachzahlung so hoch?', o: ['Die Miete ist gestiegen.', 'Die Heizkosten sind gestiegen.', 'Herr Weber hat zu spät bezahlt.'], a: 1,
          ex: '„Die Heizkosten sind letztes Jahr stark gestiegen“ – heating costs rose sharply last year.' },
        { q: 'Welcher Fehler ist in der Abrechnung?', o: ['die Kosten für die Gartenpflege', 'die falsche Adresse', 'die Heizkosten'], a: 0,
          ex: '„Wir haben doch gar keinen Garten … Das ist ein Fehler“ – garden maintenance is on the bill, but the house has no garden.' },
        { q: 'Was soll Herr Weber jetzt machen?', o: ['sofort 340 € überweisen', 'zur Hausverwaltung kommen', 'auf die neue Abrechnung warten'], a: 2,
          ex: '„Sie bekommen eine neue Abrechnung per Post. Zahlen Sie bitte erst dann.“ – wait for the new statement before paying.' },
      ],
      gloss: [['die Nebenkostenabrechnung', 'annual utility/service charge statement'], ['nachzahlen', 'to pay extra (afterwards)'], ['die Hausverwaltung', 'property management'], ['der Posten', 'item (on a bill)'], ['die Vorauszahlung', 'advance payment']] },

    /* ---------- STADT ---------- */
    { id: 'stadt-cafe-verwechslung', level: 'A1', place: 'stadt', icon: '☕', title: 'Falsche Bestellung', en: 'Wrong order',
      audio: [
        ['becker', 'So, einmal Cappuccino und ein Stück Apfelkuchen.'],
        ['peters', 'Entschuldigung, ich habe einen Tee bestellt, keinen Cappuccino.'],
        ['becker', 'Oh, Entschuldigung! Ich bringe Ihnen sofort den Tee.'],
      ],
      q: [
        { q: 'Was hat der Mann bestellt?', o: ['einen Cappuccino', 'einen Tee', 'einen Kaffee'], a: 1,
          ex: '„ich habe einen Tee bestellt, keinen Cappuccino“ – he ordered tea, not a cappuccino.' },
      ],
      gloss: [['bestellen', 'to order'], ['ein Stück Kuchen', 'a piece of cake'], ['sofort', 'immediately'], ['Entschuldigung!', 'Sorry! / Excuse me!']] },

    { id: 'stadt-umleitung', level: 'A2', place: 'stadt', icon: '🚧', title: 'Der Bus fährt eine Umleitung', en: 'The bus takes a diversion',
      audio: [
        ['_', 'Liebe Fahrgäste, hier spricht Ihr Busfahrer.'],
        ['_', 'Die Goethestraße ist wegen einer Baustelle gesperrt. Wir fahren deshalb eine Umleitung über die Bahnhofstraße.'],
        ['_', 'Die Haltestellen Goetheplatz und Stadtbibliothek können wir heute leider nicht anfahren.'],
        ['_', 'Für die Stadtbibliothek steigen Sie bitte an der nächsten Haltestelle, Marktplatz, aus. Von dort sind es nur fünf Minuten zu Fuß.'],
      ],
      q: [
        { q: 'Warum fährt der Bus eine Umleitung?', o: ['wegen einer Baustelle', 'wegen eines Unfalls', 'wegen einer Demonstration'], a: 0,
          ex: '„wegen einer Baustelle gesperrt“ – closed because of construction work.' },
        { q: 'Sie wollen zur Stadtbibliothek. Wo steigen Sie aus?', o: ['am Goetheplatz', 'an der Bahnhofstraße', 'am Marktplatz'], a: 2,
          ex: '„Für die Stadtbibliothek steigen Sie bitte an der nächsten Haltestelle, Marktplatz, aus.“ – get off at Marktplatz and walk five minutes.' },
      ],
      gloss: [['die Umleitung', 'diversion'], ['die Baustelle', 'construction site'], ['gesperrt', 'closed (road)'], ['anfahren', 'to stop at, to serve (a stop)'], ['zu Fuß', 'on foot']] },

    { id: 'stadt-museumsfuehrung', level: 'B1', place: 'stadt', icon: '🖼️', title: 'Führung im Museum', en: 'Guided tour in the museum',
      audio: [
        ['lena', 'Guten Tag und herzlich willkommen im Stadtmuseum! Ich bin Lena und begleite Sie heute durch die Ausstellung „Hundert Jahre Hafen“.'],
        ['lena', 'Die Führung dauert etwa eine Stunde. Wir beginnen hier im Erdgeschoss mit alten Fotos und gehen dann in den ersten Stock zu den Schiffsmodellen.'],
        ['lena', 'Bitte fotografieren Sie ohne Blitz, denn die alten Fotos sind sehr empfindlich. Essen und Trinken sind in den Ausstellungsräumen leider nicht erlaubt.'],
        ['lena', 'Ihre Jacken und Taschen können Sie gern in die Schließfächer neben der Kasse legen. Dafür brauchen Sie eine Ein-Euro-Münze, die bekommen Sie danach zurück.'],
        ['lena', 'Und noch ein Tipp: Nach der Führung können Sie mit Ihrer Eintrittskarte auch kostenlos auf unsere Dachterrasse mit Museumscafé. Na ja, den Kaffee müssen Sie natürlich selbst bezahlen.'],
        ['lena', 'Gut, haben Sie noch Fragen? Nein? Dann gehen wir los.'],
      ],
      q: [
        { q: 'Was sieht man im ersten Stock?', o: ['alte Fotos', 'das Museumscafé', 'Schiffsmodelle'], a: 2,
          ex: '„gehen dann in den ersten Stock zu den Schiffsmodellen“ – the ship models are on the first floor. The old photos are on the ground floor.' },
        { q: 'Was ist im Museum erlaubt?', o: ['fotografieren ohne Blitz', 'im Ausstellungsraum essen', 'Taschen in die Ausstellung mitnehmen'], a: 0,
          ex: '„Bitte fotografieren Sie ohne Blitz“ – photos are fine without flash. Eating and drinking are not allowed.' },
        { q: 'Für das Schließfach muss man einen Euro bezahlen.', o: RF, a: 1,
          ex: '„eine Ein-Euro-Münze, die bekommen Sie danach zurück“ – you need a €1 coin but you get it back, so it costs nothing.' },
      ],
      gloss: [['die Führung', 'guided tour'], ['die Ausstellung', 'exhibition'], ['der Blitz', 'flash (camera)'], ['empfindlich', 'delicate, sensitive'], ['das Schließfach', 'locker']] },

    /* ---------- FREIZEIT ---------- */
    { id: 'freizeit-kinokasse', level: 'A1', place: 'freizeit', icon: '🎬', title: 'An der Kinokasse', en: 'At the cinema box office',
      audio: [
        ['mia', 'Hallo, zwei Karten für den Film um acht, bitte.'],
        ['tim', 'Gern. Reihe zehn oder Reihe fünfzehn?'],
        ['mia', 'Reihe zehn, bitte.'],
        ['tim', 'Das macht zusammen achtzehn Euro.'],
      ],
      q: [
        { q: 'Wie viele Karten kauft die Frau?', o: ['eine Karte', 'zehn Karten', 'zwei Karten'], a: 2,
          ex: '„zwei Karten für den Film um acht“ – two tickets for the film at eight.' },
        { q: 'Wo sitzt die Frau?', o: ['in Reihe 10', 'in Reihe 15', 'in Reihe 8'], a: 0,
          ex: '„Reihe zehn, bitte.“ – row 10.' },
      ],
      gloss: [['die Kinokasse', 'cinema box office'], ['die Karte', 'ticket'], ['der Film', 'film, movie'], ['die Reihe', 'row']] },

    { id: 'freizeit-training-verlegt', level: 'A2', place: 'freizeit', icon: '⚽', title: 'Das Training ist verlegt', en: 'Training has been moved',
      audio: [
        ['wolf', 'Hallo zusammen, hier ist euer Trainer Thomas. Kurze Info: Die Sporthalle ist nächste Woche wegen Renovierung geschlossen.'],
        ['wolf', 'Deshalb trainieren wir am Dienstag nicht in der Halle, sondern draußen auf dem Sportplatz hinter der Schule.'],
        ['wolf', 'Wir fangen eine halbe Stunde früher an, also schon um achtzehn Uhr. Bringt bitte Fußballschuhe und warme Sachen mit.'],
        ['wolf', 'Das Spiel am Samstag findet aber ganz normal statt. Bis Dienstag!'],
      ],
      q: [
        { q: 'Wo ist das Training am Dienstag?', o: ['in der Sporthalle', 'auf dem Sportplatz hinter der Schule', 'im Schwimmbad'], a: 1,
          ex: '„nicht in der Halle, sondern draußen auf dem Sportplatz hinter der Schule“ – outside on the sports ground behind the school.' },
        { q: 'Wann beginnt das Training?', o: ['um 18:00 Uhr', 'um 18:30 Uhr', 'um 17:30 Uhr'], a: 0,
          ex: '„eine halbe Stunde früher …, also schon um achtzehn Uhr“ – half an hour earlier, at 18:00. Normally it starts at 18:30.' },
      ],
      gloss: [['das Training', 'training'], ['die Sporthalle', 'sports hall'], ['die Renovierung', 'renovation'], ['der Sportplatz', 'sports ground'], ['stattfinden', 'to take place']] },

    { id: 'freizeit-konzert', level: 'B1', place: 'freizeit', icon: '🎤', title: 'Durchsage vor dem Konzert', en: 'Announcement before the concert',
      audio: [
        ['_', 'Liebe Konzertbesucherinnen und -besucher, herzlich willkommen in der Stadthalle!'],
        ['_', 'Wegen technischer Probleme beginnt das Konzert heute nicht um zwanzig Uhr, sondern etwa vierzig Minuten später. Wir bitten um Ihr Verständnis.'],
        ['_', 'In der Zwischenzeit bekommen Sie an allen Getränkeständen mit Ihrer Eintrittskarte ein Getränk gratis.'],
        ['_', 'Bitte beachten Sie: Wer die Halle jetzt verlässt, kann mit seiner Karte wieder hinein. Nach Beginn des Konzerts ist das nicht mehr möglich.'],
        ['_', 'Nach dem Konzert fahren Sonderbusse vom Haupteingang zum Hauptbahnhof, und zwar bis ein Uhr nachts. Ihre Eintrittskarte gilt als Fahrkarte.'],
      ],
      q: [
        { q: 'Wann beginnt das Konzert ungefähr?', o: ['um 20:00 Uhr', 'um 20:40 Uhr', 'um 21:40 Uhr'], a: 1,
          ex: '„nicht um zwanzig Uhr, sondern etwa vierzig Minuten später“ – about 40 minutes after 8 pm, so around 20:40.' },
        { q: 'Was bekommt man mit der Eintrittskarte?', o: ['ein T-Shirt', 'eine Gratis-Fahrt mit dem Taxi', 'ein Getränk gratis'], a: 2,
          ex: '„mit Ihrer Eintrittskarte ein Getränk gratis“ – a free drink with your ticket.' },
        { q: 'Man kann während des Konzerts rausgehen und wieder reinkommen.', o: RF, a: 1,
          ex: '„Nach Beginn des Konzerts ist das nicht mehr möglich.“ – after the concert has started, re-entry is no longer possible.' },
      ],
      gloss: [['der Besucher / die Besucherin', 'visitor'], ['gratis', 'free of charge'], ['der Getränkestand', 'drinks stand'], ['verlassen', 'to leave'], ['der Sonderbus', 'extra / special bus'], ['gelten als', 'to count as']] },
  ]);
})();
