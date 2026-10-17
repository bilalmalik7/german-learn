/* LIVING IN GERMANY – topics 7–12 (getting around, shopping, everyday culture, family, emergencies, free time).
   Practical facts in English + the German you need (original texts for Deutsch30). */
(function () {
  'use strict';
  GL.life = GL.life || [];
  GL.life.push(
    { id: 'mobilitaet', n: 7, icon: '🚆', title: 'Getting around', de: 'Unterwegs', color: '#0081a7', level: 'A2',
      intro: 'Buses, trams and trains take you almost everywhere in Germany – often you don’t need a car at all. But the system has its own rules: there are usually no ticket barriers, some tickets must be validated, and inspectors are strict. Here is what you need to know about Deutsche Bahn, the Deutschlandticket, cycling and your driving licence.',
      facts: [
        ['🚆', 'Deutsche Bahn & the DB Navigator app', 'Long-distance trains (ICE, IC/EC) are run by Deutsche Bahn; regional trains (RE, RB, S-Bahn) by DB and other companies. The free DB Navigator app shows the timetable (Fahrplan), the platform (Gleis), delays (Verspätung) and where you have to change (umsteigen) – and it sells tickets.'],
        ['🎫', 'Deutschlandticket', 'A monthly subscription (Abo) for all local and regional public transport in Germany: buses, trams, U-Bahn, S-Bahn and regional trains (RE, RB) in 2nd class. It is generally not valid on long-distance trains (ICE, IC, EC). The ticket is personal, you can cancel it monthly, and many employers offer it cheaper as a Jobticket.'],
        ['🗺️', 'Local transport', 'In cities, buses, trams, U-Bahn and S-Bahn usually belong to one transport association (Verkehrsverbund) with zones or price levels. A day ticket (Tageskarte) or a monthly ticket (Monatskarte) is often cheaper than several single tickets.'],
        ['🎟️', 'Buying and validating tickets', 'Buy your ticket before the journey: at a ticket machine (Fahrkartenautomat), in the app or at the travel centre; on some buses you can also buy one from the driver. Some paper tickets – often multi-trip tickets for buses, trams and the U-Bahn – must be stamped in a small machine (Entwerter) before or at the start of the journey. Without the stamp they are not valid.'],
        ['👮', 'Ticket checks', 'There are usually no barriers – instead, inspectors check tickets at random, sometimes in plain clothes. Without a valid ticket you pay a penalty fare (erhöhtes Beförderungsentgelt) of generally about 60 €, and repeated fare dodging (Schwarzfahren) can be reported to the police.'],
        ['🚧', 'Delays and replacement buses', 'Trains are often late, and during construction work replacement buses (Schienenersatzverkehr, SEV) run instead of trains. Check the app before you leave. If you reach your destination 60 minutes late or more, you can usually get part of the fare back (Fahrgastrechte).'],
        ['🚲', 'Cycling rules', 'Your bike needs lights (white at the front, red at the back), reflectors, two brakes and a bell. You must use a bike lane (Radweg) marked with a blue bike sign; otherwise you may also ride on the road, always on the right – but as an adult never on the pavement, unless a sign allows it. Holding your phone or riding through a red light costs a fine; helmets are not compulsory but recommended.'],
        ['🚗', 'Driving licence', 'Licences from EU/EEA countries are valid in Germany. Most other licences are only valid for 6 months after you move here – then you need a German licence. Apply early at the Führerscheinstelle: depending on your country, you may need a theory and/or a practical test, and usually also an eye test and a first-aid course.']
      ],
      steps: [
        'Install the DB Navigator app and the app of your local transport association.',
        'Check whether a Deutschlandticket pays off for you – and ask your employer or university about a Jobticket or semester ticket.',
        'Always buy (and, if necessary, stamp) your ticket before the journey starts.',
        'Carry a photo ID when you travel with a personal ticket.',
        'Get lights, a bell and a strong lock for your bike.',
        'If you have a non-EU licence, contact the Führerscheinstelle in your first months.'
      ],
      phrases: [
        ['Eine Fahrkarte nach Hamburg, bitte – hin und zurück.', 'A return ticket to Hamburg, please.'],
        ['Von welchem Gleis fährt der Zug nach Köln?', 'Which platform does the train to Cologne leave from?'],
        ['Muss ich umsteigen?', 'Do I have to change?'],
        ['Wie viel Verspätung hat der Zug?', 'How late is the train?'],
        ['Ich habe meinen Anschluss verpasst. Was kann ich tun?', 'I’ve missed my connection. What can I do?'],
        ['Gilt das Deutschlandticket auch in diesem Zug?', 'Is the Deutschlandticket valid on this train too?'],
        ['Wo kann ich die Fahrkarte entwerten?', 'Where can I validate (stamp) the ticket?'],
        ['Wann fährt der nächste Bus zum Bahnhof?', 'When does the next bus to the station leave?'],
        ['Hält diese Straßenbahn am Rathaus?', 'Does this tram stop at the town hall?'],
        ['Wo fährt der Ersatzbus ab?', 'Where does the replacement bus leave from?'],
        ['Ist hier noch frei?', 'Is this seat free?'],
        ['Entschuldigung, darf ich mal vorbei? Ich muss hier aussteigen.', 'Excuse me, may I get past? I need to get off here.'],
        ['Kann ich mein Fahrrad mitnehmen?', 'Can I take my bike with me?'],
        ['Ich möchte meinen Führerschein umschreiben lassen.', 'I’d like to have my driving licence converted.']
      ],
      words: [
        ['die Fahrkarte', 'ticket'],
        ['der Fahrplan', 'timetable'],
        ['das Gleis', 'platform, track'],
        ['die Verspätung', 'delay'],
        ['umsteigen', 'to change (trains, buses)'],
        ['der Anschluss', 'connection'],
        ['die Haltestelle', 'stop (bus, tram)'],
        ['entwerten', 'to validate (stamp) a ticket'],
        ['der Fahrkartenautomat', 'ticket machine'],
        ['die Fahrkartenkontrolle', 'ticket inspection'],
        ['der Schienenersatzverkehr (SEV)', 'rail replacement bus service'],
        ['ausfallen', 'to be cancelled (train, bus)'],
        ['der Radweg', 'bike lane, cycle path'],
        ['der Führerschein', 'driving licence']
      ],
      dialogue: { title: 'Fahrkartenkontrolle', place: 'In der Regionalbahn', lines: [
        ['frank', 'Guten Tag, die Fahrkarten, bitte!', 'Hello, tickets, please!'],
        ['alex', 'Guten Tag. Ich habe das Deutschlandticket auf dem Handy. Hier, bitte.', 'Hello. I have the Deutschlandticket on my phone. Here you are.'],
        ['frank', 'Danke. Haben Sie auch einen Ausweis dabei? Das Ticket ist personengebunden.', 'Thank you. Do you also have ID with you? The ticket is personal.'],
        ['alex', 'Ja, natürlich. Hier ist mein Aufenthaltstitel.', 'Yes, of course. Here is my residence permit.'],
        ['frank', 'Alles in Ordnung. Gute Fahrt!', 'Everything’s fine. Have a good journey!'],
        ['alex', 'Eine Frage noch: Ich muss in Hamburg umsteigen. Erreiche ich meinen Anschluss nach Lüneburg?', 'One more question: I have to change in Hamburg. Will I make my connection to Lüneburg?'],
        ['frank', 'Ja, kein Problem. Wir haben nur fünf Minuten Verspätung, und Ihr Anschluss fährt erst in zwanzig Minuten.', 'Yes, no problem. We’re only five minutes late, and your connection doesn’t leave for another twenty minutes.'],
        ['alex', 'Super. Und meine Schwester besucht mich nächste Woche. Sie hat eine Mehrfahrtenkarte für den Bus. Muss sie die Karte entwerten?', 'Great. And my sister is visiting me next week. She has a multi-trip ticket for the bus. Does she have to validate it?'],
        ['frank', 'Ja, unbedingt! Sie muss die Karte gleich beim Einsteigen stempeln. Ohne Stempel ist sie nicht gültig – und dann kostet es sechzig Euro.', 'Yes, definitely! She has to stamp the ticket as soon as she gets on. Without a stamp it isn’t valid – and then it costs sixty euros.'],
        ['alex', 'Gut zu wissen. Vielen Dank!', 'Good to know. Thank you very much!']
      ] },
      read: { kind: 'notice', title: 'Schienenersatzverkehr',
        text: 'Bauarbeiten: Schienenersatzverkehr (SEV)\n\nLiebe Fahrgäste,\nvom 3. bis 14. November fahren zwischen Neustadt Hbf und Bergheim keine Züge der Linie RB 23. Grund sind Bauarbeiten an den Gleisen.\n\nBitte nutzen Sie die Ersatzbusse. Sie fahren alle 30 Minuten. Die Haltestelle in Neustadt finden Sie vor dem Bahnhof am Ausgang Nord.\n\nBitte beachten Sie:\n– Die Fahrt mit dem Bus dauert etwa 20 Minuten länger. Planen Sie mehr Zeit ein.\n– Ihre Fahrkarte gilt auch im Ersatzbus.\n– Fahrräder können im Bus leider nicht mitgenommen werden.\n\nAktuelle Informationen finden Sie in der App DB Navigator.\nWir bitten um Ihr Verständnis.',
        q: [
          { q: 'Warum fahren zwischen Neustadt und Bergheim keine Züge?', o: ['Wegen eines Streiks.', 'Wegen Bauarbeiten an den Gleisen.', 'Weil es zu wenige Fahrgäste gibt.'], a: 1, ex: 'The notice says: „Grund sind Bauarbeiten an den Gleisen.“ – the reason is construction work on the tracks.' },
          { q: 'Wo fahren die Ersatzbusse in Neustadt ab?', o: ['Vor dem Bahnhof am Ausgang Nord.', 'Von Gleis 3.', 'In Bergheim am Rathaus.'], a: 0, ex: '„Die Haltestelle in Neustadt finden Sie vor dem Bahnhof am Ausgang Nord.“' },
          { q: 'Was ist richtig?', o: ['Man braucht für den Bus eine neue Fahrkarte.', 'Man kann das Fahrrad im Bus mitnehmen.', 'Die Fahrt dauert länger als sonst.'], a: 2, ex: '„Die Fahrt mit dem Bus dauert etwa 20 Minuten länger.“ Your ticket is also valid on the bus („Ihre Fahrkarte gilt auch im Ersatzbus“), but bikes are not allowed.' }
        ] },
      tips: [
        'Your Deutschlandticket is personal: always carry a photo ID (passport, ID card or residence permit) – inspectors may ask for it.',
        'Let people get off first, then get on. On escalators, stand on the right and walk on the left.',
        'The Deutschlandticket does not include your bike – on trains you usually need an extra bike ticket (Fahrradkarte).',
        'Lock your bike to something fixed with a strong lock – bike theft is very common in German cities.'
      ],
      links: [['#/scenes/bahnhof', '🎬 Scene: At the train station'], ['#/scenes/polizei', '🎬 Scene: My bike has been stolen!']] },

    { id: 'einkaufen', n: 8, icon: '🛒', title: 'Shopping', de: 'Einkaufen', color: '#f2b705', level: 'A1',
      intro: 'Shopping in Germany is easy once you know the rules: shops close on Sundays, you bring your own bag, and empty bottles are worth money. Here is how to shop smart – from the discounter to the pharmacy – and how to return something that is broken.',
      facts: [
        ['🕗', 'Opening hours', 'Almost all shops are closed on Sundays and public holidays. From Monday to Saturday, supermarkets are often open until 8 or 10 pm, but small shops and shops in villages close earlier. Exceptions: bakeries may open for a few hours on Sunday morning, and shops in big train stations, airports and petrol stations are open on Sundays too.'],
        ['♻️', 'Pfand – money for empty bottles', 'Most drinks bottles and cans have a deposit (Pfand): 25 cents for single-use plastic bottles and cans (Einweg), usually 8 or 15 cents for reusable bottles (Mehrweg). Take them back to the bottle machine (Pfandautomat) in a supermarket and redeem the voucher (Pfandbon) at the checkout.'],
        ['🛍️', 'Bring your own bag', 'Thin plastic carrier bags have been banned since 2022, and the bags sold at the checkout (paper, cloth or reusable plastic) cost money. Most people bring a shopping bag, a backpack or a basket – and pack quickly, because cashiers are fast.'],
        ['💳', 'Paying', 'Cash is still common. The girocard (German debit card) is accepted almost everywhere; credit cards and paying by phone work in most supermarkets and chains, but not always in small shops, bakeries, kiosks or at the market. Look for signs like „Nur Barzahlung“ (cash only) or „Kartenzahlung ab 10 €“.'],
        ['🧾', 'Receipt, returns and exchange', 'Keep the receipt (Kassenbon). If something is faulty, you have a legal right to a repair or replacement for 2 years (Gewährleistung) – this is called a Reklamation. Exchanging something you simply don’t like (Umtausch) is voluntary: many shops allow it within 14 or 30 days with the receipt, sometimes only for a voucher (Gutschein).'],
        ['🏪', 'Discounters, supermarkets & more', 'Discounters (e.g. Aldi, Lidl, Penny, Netto) are cheaper and have fewer brands; supermarkets (e.g. Edeka, Rewe) offer more choice. For spices, rice, lentils or halal meat, try Turkish, Asian or Indian shops. Weekly special offers (Angebote) are in leaflets and apps.'],
        ['🧴', 'Drogerie', 'Toiletries, cosmetics, cleaning products, nappies and baby food are sold in drugstores (Drogerie, e.g. dm or Rossmann) – often cheaper than in the supermarket. They also sell vitamins, but not medicines like painkillers.'],
        ['💊', 'Apotheke – only for medicine', 'Almost all medicines – even simple painkillers or cough medicine – are only sold in pharmacies (Apotheke), not in supermarkets. For prescription medicine you need a prescription (Rezept) from a doctor; with public health insurance you usually pay only a small co-payment (Zuzahlung).']
      ],
      steps: [
        'Always carry a shopping bag – and a little cash.',
        'Do your shopping by Saturday: on Sundays and public holidays almost all shops are closed.',
        'Collect empty Pfand bottles and cans and take them back to the Pfandautomat.',
        'Keep the receipt for bigger purchases like electronics or clothes.',
        'Compare prices: check the weekly offers and the discounters.',
        'Buy medicine at the Apotheke and toiletries at the Drogerie.'
      ],
      phrases: [
        ['Entschuldigung, wo finde ich Reis?', 'Excuse me, where can I find rice?'],
        ['Was kostet das?', 'How much is this?'],
        ['Haben Sie das auch eine Nummer größer?', 'Do you have this one size bigger?'],
        ['Kann ich mit Karte zahlen?', 'Can I pay by card?'],
        ['Brauchen Sie eine Tüte?', 'Do you need a bag?'],
        ['Nein, danke, ich habe eine Tasche dabei.', 'No, thanks, I have a bag with me.'],
        ['Sammeln Sie Punkte?', 'Do you collect (loyalty) points?'],
        ['Möchten Sie den Kassenbon?', 'Would you like the receipt?'],
        ['Der Pfandautomat nimmt die Flasche nicht.', 'The bottle machine won’t take the bottle.'],
        ['Ich möchte das umtauschen. Hier ist der Kassenbon.', 'I’d like to exchange this. Here is the receipt.'],
        ['Das ist kaputt. Ich möchte es reklamieren.', 'This is broken. I’d like to return it as faulty.'],
        ['Kann ich mein Geld zurückbekommen?', 'Can I get my money back?'],
        ['Bis wann haben Sie heute geöffnet?', 'How late are you open today?'],
        ['Ich hätte gern etwas gegen Kopfschmerzen.', 'I’d like something for a headache.']
      ],
      words: [
        ['der Supermarkt', 'supermarket'],
        ['der Discounter', 'discount supermarket'],
        ['die Kasse', 'checkout, till'],
        ['der Kassenbon', 'receipt'],
        ['das Pfand', 'deposit (on bottles and cans)'],
        ['der Pfandautomat', 'bottle return machine'],
        ['die Tüte', 'bag (plastic or paper)'],
        ['das Angebot', 'special offer'],
        ['die Öffnungszeiten (Pl.)', 'opening hours'],
        ['umtauschen', 'to exchange'],
        ['die Reklamation', 'complaint, return of faulty goods'],
        ['die Drogerie', 'drugstore (toiletries, cosmetics)'],
        ['die Apotheke', 'pharmacy'],
        ['bar zahlen', 'to pay cash']
      ],
      dialogue: { title: 'Reklamation und Umtausch', place: 'Im Elektrogeschäft', lines: [
        ['lisa', 'Guten Tag! Kann ich Ihnen helfen?', 'Hello! Can I help you?'],
        ['alex', 'Ja, bitte. Ich habe letzte Woche diesen Wasserkocher gekauft, aber er funktioniert nicht mehr.', 'Yes, please. I bought this kettle last week, but it doesn’t work any more.'],
        ['lisa', 'Oh, das tut mir leid. Haben Sie den Kassenbon dabei?', 'Oh, I’m sorry. Do you have the receipt with you?'],
        ['alex', 'Ja, hier ist er.', 'Yes, here it is.'],
        ['lisa', 'Danke. Möchten Sie einen neuen Wasserkocher oder lieber das Geld zurück?', 'Thank you. Would you like a new kettle, or would you prefer your money back?'],
        ['alex', 'Einen neuen, bitte. Und noch eine Frage: Kann ich diese Kopfhörer umtauschen? Die Farbe gefällt mir nicht.', 'A new one, please. And one more question: can I exchange these headphones? I don’t like the colour.'],
        ['lisa', 'Sind sie noch originalverpackt?', 'Are they still in the original packaging?'],
        ['alex', 'Ja, ich habe sie nicht benutzt.', 'Yes, I haven’t used them.'],
        ['lisa', 'Dann ist das kein Problem. Umtausch ist bei uns innerhalb von vierzehn Tagen möglich. Welche Farbe möchten Sie?', 'Then that’s no problem. You can exchange things here within fourteen days. Which colour would you like?'],
        ['alex', 'Schwarz, bitte.', 'Black, please.'],
        ['lisa', 'Hier, bitte. Brauchen Sie eine Tüte?', 'Here you are. Do you need a bag?'],
        ['alex', 'Nein, danke. Ich habe eine Tasche dabei.', 'No, thank you. I have a bag with me.']
      ] },
      read: { kind: 'form', title: 'Kassenbon',
        text: 'FRISCHMARKT LINDNER\nBahnhofstraße 12, Neustadt\n\nVollmilch 1 l: 1,09 €\nBasmatireis 1 kg: 2,99 €\nBananen 0,85 kg × 1,79 €/kg: 1,52 €\nMineralwasser 6 × 0,49 €: 2,94 €\nPfand Einweg 6 × 0,25 €: 1,50 €\nPfandbon (Leergut): −2,00 €\n\nSUMME: 8,04 €\nBezahlt mit girocard: 8,04 €\n\n14.10.2026, 18:42 Uhr, Kasse 3\n\nÖffnungszeiten: Mo–Sa 7–22 Uhr\nUmtausch nur mit Kassenbon innerhalb von 14 Tagen. Lebensmittel sind vom Umtausch ausgeschlossen.\nVielen Dank für Ihren Einkauf!',
        q: [
          { q: 'Wie hat die Person bezahlt?', o: ['Bar.', 'Mit Kreditkarte.', 'Mit girocard.'], a: 2, ex: '„Bezahlt mit girocard“ – the girocard is the German debit card.' },
          { q: 'Was bedeutet „Pfandbon (Leergut): −2,00 €“?', o: ['Die Person hat leere Flaschen zurückgegeben und bezahlt 2 € weniger.', 'Die Bananen waren 2 € billiger.', 'Die Person hat eine Tüte für 2 € gekauft.'], a: 0, ex: 'The customer returned empty bottles (Leergut) at the Pfandautomat. The voucher (Pfandbon) was worth 2 € and was taken off the total.' },
          { q: 'Kann man hier am Sonntag einkaufen?', o: ['Ja, von 7 bis 22 Uhr.', 'Nein, der Markt ist nur von Montag bis Samstag geöffnet.', 'Ja, aber nur bis 12 Uhr.'], a: 1, ex: '„Mo–Sa 7–22 Uhr“ means Monday to Saturday. Like almost all shops, the supermarket is closed on Sundays.' }
        ] },
      tips: [
        'At the checkout, put your things on the belt and use the divider (Warentrenner). Cashiers scan very fast – it’s fine to put everything back into the trolley and pack at the shelf after the checkout.',
        'Cashiers often ask „Sammeln Sie Punkte?“ – they mean a loyalty card. If you don’t have one, just say „Nein, danke“.',
        'In some supermarkets you weigh loose fruit and vegetables yourself and stick the price label on – look for the scales and a sign like „Bitte selbst wiegen“.',
        'Need something on a Sunday? Try the shops in big train stations or at petrol stations – but prices are higher there.',
        'Bought something online? You can usually send it back within 14 days without giving a reason (Widerrufsrecht).'
      ],
      links: [['#/scenes/supermarkt', '🎬 Scene: At the supermarket'], ['#/scenes/kleidung', '🎬 Scene: Buying & exchanging clothes'], ['#/scenes/markt', '🎬 Scene: At the farmers’ market']] },

    { id: 'alltag', n: 9, icon: '🤝', title: 'Everyday life & culture', de: 'Alltag & Kultur', color: '#9c6644', level: 'A2',
      intro: 'Every country has unwritten rules – and in Germany, knowing them makes life much easier. When do you say „du“, why is everyone so quiet on Sundays, and what do you bring to a party? This guide explains everyday culture, so you feel at home faster and avoid awkward moments.',
      facts: [
        ['🤝', 'du or Sie?', 'Use „Sie“ with adults you don’t know, at offices, with your landlord and usually at work until someone offers you „du“. Use „du“ with friends, family and children – and often with young people and with colleagues in modern companies. Usually the older or more senior person offers the „du“.'],
        ['⏰', 'Punctuality', 'Being on time (pünktlich) is important: for work, appointments and the doctor, arrive a few minutes early. If you are going to be late, call or send a message before the meeting starts.'],
        ['👋', 'Greetings', 'In formal situations people shake hands firmly and look you in the eyes; friends often hug. Say „Guten Tag“ or „Hallo“ when you enter a small shop, a waiting room or a lift. Regional greetings: „Moin“ in the north, „Grüß Gott“ or „Servus“ in the south.'],
        ['🤫', 'Quiet hours (Ruhezeiten)', 'Night-time quiet (Nachtruhe) is usually from 10 pm to 6 or 7 am, and Sundays and public holidays are quiet all day (Sonntagsruhe). Many house rules (Hausordnung) also have a quiet time at lunchtime. Avoid drilling, loud music and throwing bottles into the bottle bank at these times.'],
        ['♻️', 'Separating rubbish', 'Germans separate their rubbish carefully: paper, packaging (yellow bin or bag), organic waste (Biomüll), residual waste (Restmüll), and glass by colour at the bottle bank. Bin colours can differ between cities – check the rules for your building.'],
        ['🎁', 'Invitations', 'If you are invited to someone’s home, be on time and bring a small gift – flowers, wine, chocolates or something from your home country. For barbecues and parties, guests often bring a salad or drinks. Many Germans take their shoes off at home – just ask.'],
        ['☕', 'Kaffee und Kuchen', 'On weekend afternoons, especially on Sundays around 3 pm, many families meet for coffee and cake. On their birthday, Germans often bring cake to work or invite their friends themselves.'],
        ['🗣️', 'Direct communication', 'Germans often say clearly what they think, e.g. „Das funktioniert so nicht.“ This is usually meant factually, not rudely. Good small-talk topics are work, the weekend, holidays, hobbies, the weather and football; avoid asking about salary, age or religion when you first meet someone.']
      ],
      steps: [
        'Use „Sie“ with adults until they offer you „du“.',
        'Be on time – and send a message if you are running late.',
        'Read the Hausordnung of your building and learn the quiet hours.',
        'Find out how rubbish is separated where you live.',
        'Bring a small gift when you are invited to someone’s home.',
        'Learn the typical greeting of your region.'
      ],
      phrases: [
        ['Freut mich, Sie kennenzulernen.', 'Nice to meet you.'],
        ['Wollen wir uns duzen?', 'Shall we say „du“ to each other?'],
        ['Wie war Ihr Wochenende?', 'How was your weekend?'],
        ['Haben Sie schon Pläne für den Urlaub?', 'Do you already have plans for your holiday?'],
        ['Entschuldigung, ich komme etwa zehn Minuten später.', 'Sorry, I’ll be about ten minutes late.'],
        ['Vielen Dank für die Einladung!', 'Thank you very much for the invitation!'],
        ['Soll ich etwas mitbringen?', 'Shall I bring anything?'],
        ['Das ist eine Kleinigkeit für dich.', 'This is a little something for you.'],
        ['Soll ich die Schuhe ausziehen?', 'Shall I take my shoes off?'],
        ['Der Kuchen schmeckt wirklich lecker!', 'The cake is really delicious!'],
        ['Prost! Auf einen schönen Abend!', 'Cheers! To a lovely evening!'],
        ['Könnten Sie die Musik bitte etwas leiser machen?', 'Could you turn the music down a little, please?'],
        ['Ich sehe das ein bisschen anders.', 'I see that a bit differently.'],
        ['Herzlichen Glückwunsch zum Geburtstag!', 'Happy birthday!']
      ],
      words: [
        ['duzen', 'to say „du“ to someone'],
        ['siezen', 'to say „Sie“ to someone'],
        ['pünktlich', 'on time, punctual'],
        ['höflich', 'polite'],
        ['die Einladung', 'invitation'],
        ['das Gastgeschenk', 'small gift for the host'],
        ['der Gastgeber / die Gastgeberin', 'host'],
        ['die Ruhezeit', 'quiet hours'],
        ['die Hausordnung', 'house rules'],
        ['die Mülltrennung', 'separating rubbish'],
        ['der Feierabend', 'end of the working day'],
        ['der Smalltalk', 'small talk'],
        ['gemütlich', 'cosy, relaxed'],
        ['der Kuchen', 'cake']
      ],
      dialogue: { title: 'Smalltalk in der Kaffeeküche', place: 'Im Büro', lines: [
        ['becker', 'Guten Morgen! Na, wie war Ihr Wochenende?', 'Good morning! So, how was your weekend?'],
        ['alex', 'Guten Morgen! Sehr schön, danke. Ich war am Samstag zum ersten Mal wandern. Und Ihres?', 'Good morning! Very nice, thanks. On Saturday I went hiking for the first time. And yours?'],
        ['becker', 'Ganz ruhig. Am Sonntag waren wir bei meiner Mutter – Kaffee und Kuchen, wie immer.', 'Very quiet. On Sunday we were at my mother’s – coffee and cake, as always.'],
        ['alex', 'Das klingt gemütlich! Übrigens, da steht ein Kuchen auf dem Tisch. Von wem ist der?', 'That sounds cosy! By the way, there’s a cake on the table. Who is it from?'],
        ['becker', 'Von mir. Ich habe heute Geburtstag, und bei uns bringt das Geburtstagskind den Kuchen mit.', 'From me. It’s my birthday today, and here the birthday person brings the cake.'],
        ['alex', 'Oh, herzlichen Glückwunsch zum Geburtstag!', 'Oh, happy birthday!'],
        ['becker', 'Danke! Sagen Sie mal, wir arbeiten jetzt schon drei Monate zusammen. Wollen wir uns duzen? Ich bin Anja.', 'Thank you! Tell me, we’ve been working together for three months now. Shall we say „du“? I’m Anja.'],
        ['alex', 'Sehr gern! Ich bin Alex. Darf ich ein Stück Kuchen probieren?', 'I’d love to! I’m Alex. May I try a piece of cake?'],
        ['becker', 'Klar, nimm dir! Der ist mit Äpfeln aus meinem Garten.', 'Sure, help yourself! It’s made with apples from my garden.'],
        ['alex', 'Mmh, der schmeckt super! Danke, und einen schönen Geburtstag noch!', 'Mmm, it tastes great! Thanks, and have a lovely rest of your birthday!']
      ] },
      read: { kind: 'email', title: 'Einladung zur Einweihungsparty',
        text: 'Betreff: Einladung zu meiner Einweihungsparty\n\nHallo zusammen,\nich bin endlich umgezogen und möchte das mit euch feiern!\n\nWann? Samstag, 14. November, ab 19 Uhr\nWo? Lindenstraße 8, 3. Stock (bei Sommer klingeln)\n\nFür Getränke und Musik sorge ich. Es wäre toll, wenn jeder einen Salat oder einen Snack mitbringt. Bitte keine Geschenke – ihr seid das Geschenk!\n\nWichtig: Bis 22 Uhr können wir auf dem Balkon sitzen, danach feiern wir drinnen weiter – wegen der Nachbarn.\n\nBitte sagt mir bis Mittwoch Bescheid, ob ihr kommt. Partner und Kinder sind herzlich willkommen!\n\nLiebe Grüße\nJana',
        q: [
          { q: 'Was sollen die Gäste mitbringen?', o: ['Ein Geschenk für die Wohnung.', 'Getränke und Musik.', 'Einen Salat oder einen Snack.'], a: 2, ex: '„Es wäre toll, wenn jeder einen Salat oder einen Snack mitbringt.“ Jana organises the drinks and music herself („Für Getränke und Musik sorge ich“) and asks for no presents.' },
          { q: 'Warum feiern die Gäste ab 22 Uhr drinnen?', o: ['Weil es draußen zu kalt ist.', 'Wegen der Nachbarn.', 'Weil dann das Essen kommt.'], a: 1, ex: '„… danach feiern wir drinnen weiter – wegen der Nachbarn.“ From 10 pm it’s Nachtruhe (night-time quiet).' },
          { q: 'Bis wann sollen die Gäste Jana antworten?', o: ['Bis Mittwoch.', 'Bis Samstag um 19 Uhr.', 'Sie müssen nicht antworten.'], a: 0, ex: '„Bitte sagt mir bis Mittwoch Bescheid, ob ihr kommt.“ – „Bescheid sagen“ means to let someone know. Always reply to an invitation, even if you can’t come.' }
        ] },
      tips: [
        '„Wie geht’s?“ is a real question for many Germans – a short, honest answer („Gut, danke – ein bisschen müde“) is normal.',
        'Don’t wish someone a happy birthday before the actual day – many Germans believe it brings bad luck.',
        'When you clink glasses and say „Prost!“, look the other person in the eyes.',
        'Germany is very regional: dialects, food and traditions differ a lot between north and south, east and west. Ask people about their region – most love to talk about it.'
      ],
      links: [['#/scenes/abendessen', '🎬 Scene: Dinner at friends’ place'], ['#/scenes/nachbar', '🎬 Scene: Trouble with the neighbour'], ['#/writing', '✍️ Writing: reply to an invitation']] },

    { id: 'familie', n: 10, icon: '👪', title: 'Family, Kita & school', de: 'Familie, Kita & Schule', color: '#e05297', level: 'A2',
      intro: 'Moving to Germany with children? Then Kita and school will be a big part of your life. Childcare places can be hard to find, school is compulsory, and teachers expect parents to take part. Here is how the system works – and what to say when your child is sick or you want to talk to the teacher.',
      facts: [
        ['🧸', 'Finding a Kita place', 'From the age of 1, every child has a legal right to a childcare place – in a Kita (Krippe for under-3s, Kindergarten from 3) or with a childminder (Tagesmutter). But places are scarce in many cities, so register early and at several Kitas at once. In some cities you first need a voucher (Kita-Gutschein) from the youth welfare office (Jugendamt); fees depend on the state and often on your income.'],
        ['🌱', 'Settling in (Eingewöhnung)', 'In the first weeks a parent stays at the Kita with the child, and the time without the parent gets longer step by step. This often takes two to four weeks – plan time off work for it.'],
        ['💉', 'Check-ups and vaccinations', 'Free check-ups for children (U-Untersuchungen) at the paediatrician are recorded in a yellow booklet (das gelbe Heft). Kitas and schools require proof of measles vaccination (Masernschutz), so keep the vaccination record (Impfpass) ready.'],
        ['🏫', 'School is compulsory', 'All children who live in Germany must go to school (Schulpflicht), usually from about age 6, for at least nine years. Homeschooling is not allowed. Children who don’t speak German yet often start in a special class (Willkommensklasse or Vorbereitungsklasse) to learn the language first.'],
        ['📚', 'Grundschule and after', 'Primary school (Grundschule) lasts four years (six in Berlin and Brandenburg). After that, children move to a secondary school such as a Gymnasium, Realschule or Gesamtschule – the system differs from state to state. The first school day (Einschulung) is a big celebration, and children get a Schultüte (a large cone with sweets and small gifts).'],
        ['👪', 'Elternabend & Elterngespräch', 'Several times a year there is a parents’ evening (Elternabend) for the whole class, where parents also elect class representatives (Elternvertreter). For a one-to-one talk with the teacher, ask for an appointment (Elterngespräch).'],
        ['🤒', 'When your child is sick', 'Call or message the Kita or school in the morning before it starts (Kind krank melden). Schools usually want a written excuse (Entschuldigung) from you afterwards and a doctor’s note (Attest) for longer absences. Working parents with public health insurance can stay at home with a sick child under 12 and get child sickness benefit (Kinderkrankengeld) – you need a doctor’s certificate.'],
        ['💶', 'Kindergeld', 'Parents who live in Germany can usually get child benefit (Kindergeld) every month for each child, generally until 18 – longer if the child is still in education. Apply at the Familienkasse of the Federal Employment Agency (Bundesagentur für Arbeit); you need your own and your child’s tax ID (Steuer-ID). For non-EU citizens it depends on the residence permit.']
      ],
      steps: [
        'Put your child on the waiting lists of several Kitas as early as possible.',
        'Ask the Jugendamt whether you need a Kita-Gutschein in your city.',
        'Find a paediatrician (Kinderarzt) and bring your child’s vaccination record.',
        'Contact the school or the education office (Schulamt) to register your child for school.',
        'Plan two to four weeks off work for the Eingewöhnung.',
        'Apply for Kindergeld at the Familienkasse.',
        'Save the phone number of the Kita or the school office for sick days.'
      ],
      phrases: [
        ['Ich möchte mein Kind für die Kita anmelden.', 'I’d like to register my child for the Kita.'],
        ['Haben Sie noch einen Platz frei?', 'Do you still have a place available?'],
        ['Wie lange dauert die Eingewöhnung?', 'How long does the settling-in period take?'],
        ['Bis wann muss ich mein Kind abholen?', 'By what time do I have to pick up my child?'],
        ['Mein Sohn ist krank und kann heute nicht kommen.', 'My son is ill and can’t come today.'],
        ['Meine Tochter hat Fieber.', 'My daughter has a temperature.'],
        ['Ich hätte gern einen Termin für ein Elterngespräch.', 'I’d like an appointment for a parent–teacher meeting.'],
        ['Wie kommt mein Kind in der Klasse zurecht?', 'How is my child getting on in class?'],
        ['Mein Kind spricht noch nicht so gut Deutsch.', 'My child doesn’t speak German very well yet.'],
        ['Gibt es eine Sprachförderung?', 'Is there extra German language support?'],
        ['Was muss mein Kind mitbringen?', 'What does my child need to bring?'],
        ['Leider kann ich nicht zum Elternabend kommen.', 'Unfortunately I can’t come to the parents’ evening.'],
        ['Heute holt ihn meine Schwester ab.', 'Today my sister is picking him up.']
      ],
      words: [
        ['die Kita (Kindertagesstätte)', 'daycare centre'],
        ['die Krippe', 'nursery (for children under 3)'],
        ['die Tagesmutter', 'childminder'],
        ['die Eingewöhnung', 'settling-in period'],
        ['die Schulpflicht', 'compulsory schooling'],
        ['die Grundschule', 'primary school'],
        ['der Elternabend', 'parents’ evening'],
        ['das Elterngespräch', 'parent–teacher meeting'],
        ['die Entschuldigung', 'excuse note (for school); apology'],
        ['das Attest', 'doctor’s note'],
        ['das Kindergeld', 'child benefit'],
        ['die Familienkasse', 'family benefits office'],
        ['der Kinderarzt / die Kinderärztin', 'paediatrician'],
        ['das Zeugnis', 'school report']
      ],
      dialogue: { title: 'Kind krank melden', place: 'Am Telefon mit dem Schulsekretariat', lines: [
        ['lange', 'Grundschule am Park, Sekretariat, Lange. Guten Morgen!', 'Park Primary School, school office, Lange speaking. Good morning!'],
        ['alex', 'Guten Morgen, hier spricht Alex Sharma. Mein Sohn Arjun ist in der Klasse zwei b. Er ist leider krank und kann heute nicht kommen.', 'Good morning, this is Alex Sharma. My son Arjun is in class 2b. Unfortunately he’s ill and can’t come today.'],
        ['lange', 'Oh, gute Besserung! Was hat er denn?', 'Oh, I hope he gets well soon! What’s wrong with him?'],
        ['alex', 'Er hat Fieber und Halsschmerzen. Ich gehe heute mit ihm zum Kinderarzt.', 'He has a temperature and a sore throat. I’m taking him to the paediatrician today.'],
        ['lange', 'In Ordnung, ich sage seiner Klassenlehrerin Bescheid. Bitte geben Sie ihm eine schriftliche Entschuldigung mit, wenn er wiederkommt.', 'All right, I’ll let his class teacher know. Please give him a written excuse note when he comes back.'],
        ['alex', 'Mache ich. Braucht er auch ein Attest vom Arzt?', 'I will. Does he also need a doctor’s note?'],
        ['lange', 'Für ein paar Tage reicht Ihre Entschuldigung. Ein Attest brauchen wir nur, wenn er länger krank ist.', 'For a few days your note is enough. We only need a doctor’s note if he’s ill for longer.'],
        ['alex', 'Gut. Und was ist mit den Hausaufgaben?', 'Good. And what about his homework?'],
        ['lange', 'Am besten fragen Sie andere Eltern aus der Klasse, oder Sie schreiben Frau Maurer eine Nachricht.', 'It’s best to ask other parents in the class, or you can send Ms Maurer a message.'],
        ['alex', 'Vielen Dank, Frau Lange. Auf Wiederhören!', 'Thank you very much, Ms Lange. Goodbye!'],
        ['lange', 'Auf Wiederhören – und gute Besserung für Arjun!', 'Goodbye – and I hope Arjun gets well soon!']
      ] },
      read: { kind: 'letter', title: 'Elternbrief: Einladung zum Elternabend',
        text: 'Grundschule am Park\n\nLiebe Eltern der Klasse 1a,\n\nherzlich willkommen an unserer Schule! Hiermit lade ich Sie zum ersten Elternabend ein:\nDienstag, 22. September, 19:30 Uhr, Raum 104\n\nThemen:\n– Unterricht und Hausaufgaben in Klasse 1\n– Ausflug in den Zoo am 9. Oktober\n– Wahl der Elternvertreter\n\nBitte geben Sie Ihrem Kind jeden Tag ein gesundes Frühstück und eine Trinkflasche mit. Süßigkeiten sind in der Schule nicht erlaubt.\n\nWenn Ihr Kind krank ist, rufen Sie bitte bis 7:45 Uhr im Sekretariat an.\n\nSie können nicht zum Elternabend kommen? Dann melden Sie sich bitte kurz bei mir.\n\nMit freundlichen Grüßen\nSabine Hahn\nKlassenlehrerin',
        q: [
          { q: 'Wann ist der Elternabend?', o: ['Am 9. Oktober im Zoo.', 'Am Dienstag, 22. September, um 19:30 Uhr.', 'Jeden Morgen um 7:45 Uhr.'], a: 1, ex: 'The letter says: „Dienstag, 22. September, 19:30 Uhr, Raum 104“. The 9th of October is the date of the zoo trip.' },
          { q: 'Was sollen die Kinder jeden Tag mitbringen?', o: ['Ein gesundes Frühstück und eine Trinkflasche.', 'Süßigkeiten für die Pause.', 'Geld für den Ausflug.'], a: 0, ex: '„Bitte geben Sie Ihrem Kind jeden Tag ein gesundes Frühstück und eine Trinkflasche mit.“ Sweets are not allowed.' },
          { q: 'Was machen die Eltern, wenn ihr Kind krank ist?', o: ['Sie schreiben der Lehrerin am Abend eine E-Mail.', 'Sie kommen zum Elternabend.', 'Sie rufen bis 7:45 Uhr im Sekretariat an.'], a: 2, ex: '„Wenn Ihr Kind krank ist, rufen Sie bitte bis 7:45 Uhr im Sekretariat an.“' }
        ] },
      tips: [
        'Go to the Elternabend even if your German is still basic – it’s the best way to meet the teacher and other parents. You can bring someone to translate for you.',
        'Ask whether there is a group chat for the parents of the class – a lot of practical information (trips, things to bring, changes) is shared there.',
        'Keep speaking your mother tongue at home – it helps your child’s development, and they will learn German quickly at Kita and school.',
        'Children in German Kitas play outside in almost any weather – give them rain trousers (Matschhose) and rubber boots (Gummistiefel).'
      ],
      links: [['#/writing', '✍️ Writing: notes and emails (e.g. Krankmeldung)'], ['#/scenes/arzt', '🎬 Scene: At the doctor’s & pharmacy']] },

    { id: 'notfall', n: 11, icon: '🚑', title: 'Emergencies', de: 'Notfall', color: '#a4161a', level: 'A2',
      intro: 'In an emergency, every minute counts – and you may have to speak German under stress. Learn the important numbers by heart, know which service to call, and practise the key sentences now. Calls to 112 and 110 are free from any phone.',
      facts: [
        ['🚑', '112 – fire brigade & ambulance', 'Call 112 for fires, serious accidents and life-threatening situations such as unconsciousness, chest pain, heavy bleeding or breathing problems. The call is free from any phone and the number works in the whole EU.'],
        ['🚓', '110 – police', 'Call 110 for crimes, violence, burglary, threats and serious traffic accidents; if someone is injured, call 112 first. To report something later, e.g. a stolen bike, go to a police station or use the online police station (Onlinewache / Internetwache) of your state.'],
        ['🩺', '116117 – doctor on call', 'When your doctor’s practice is closed (evenings, weekends, public holidays) and you need a doctor urgently – but it isn’t life-threatening – call the medical on-call service (ärztlicher Bereitschaftsdienst) at 116117. The call is free; they tell you where the nearest on-call practice is or send a doctor if necessary.'],
        ['💊', 'Pharmacy on duty', 'At night, on Sundays and on public holidays, one pharmacy in your area is always open (Apotheken-Notdienst). Every pharmacy has a notice in the window that shows the pharmacy on duty – you can also find it online. A small extra fee (Notdienstgebühr) may apply.'],
        ['☎️', 'The 5 W-questions', 'On an emergency call, answer: Wo ist es passiert? (Where?) – Was ist passiert? (What?) – Wie viele Verletzte? (How many injured?) – Welche Verletzungen? (What injuries?) And then: Warten auf Rückfragen – wait for questions and don’t hang up first.'],
        ['🏥', 'Notaufnahme (A&E)', 'The emergency department of a hospital (Notaufnahme) is for serious cases – take your health insurance card (Gesundheitskarte) with you. Patients are treated by urgency, not by arrival time, so with minor problems you may wait for hours.'],
        ['🛂', 'Lost passport or cards', 'Report a lost or stolen passport to the police and contact your embassy or consulate for a new one. If your residence permit card is lost, inform the Ausländerbehörde. Block lost bank cards immediately – the central blocking number is 116 116.'],
        ['📝', 'Reporting a theft (Anzeige)', 'Report a theft at any police station (Polizeiwache) or online. You get a reference number (Aktenzeichen), which you need for your insurance. For a stolen bike, the frame number (Rahmennummer) helps – write it down now.']
      ],
      steps: [
        'Save 112, 110 and 116117 in your phone – and teach your children the number 112.',
        'Practise saying your full address in German, including the floor and the name on the doorbell.',
        'Always carry your health insurance card.',
        'Keep copies or photos of your passport and residence permit in a safe place.',
        'Write down the frame number of your bike and the card blocking number 116 116.',
        'Find out where the nearest hospital with a Notaufnahme is.',
        'Do a first-aid course (Erste-Hilfe-Kurs) – you need one for a German driving licence anyway.'
      ],
      phrases: [
        ['Hilfe! Rufen Sie bitte einen Krankenwagen!', 'Help! Please call an ambulance!'],
        ['Hier ist ein Unfall passiert.', 'There has been an accident here.'],
        ['Ein Mann ist bewusstlos.', 'A man is unconscious.'],
        ['Sie blutet stark.', 'She is bleeding heavily.'],
        ['Es brennt!', 'There’s a fire!'],
        ['Die Adresse ist Goethestraße zwölf, dritter Stock.', 'The address is Goethestraße 12, third floor.'],
        ['Mein Kind hat hohes Fieber. Was soll ich tun?', 'My child has a high temperature. What should I do?'],
        ['Wo ist die nächste Notaufnahme?', 'Where is the nearest emergency department?'],
        ['Welche Apotheke hat heute Notdienst?', 'Which pharmacy is on duty today?'],
        ['Ich möchte einen Diebstahl anzeigen.', 'I’d like to report a theft.'],
        ['Mein Handy wurde gestohlen.', 'My phone has been stolen.'],
        ['Ich habe meinen Reisepass verloren.', 'I’ve lost my passport.'],
        ['Bleiben Sie bitte am Telefon.', 'Please stay on the line.'],
        ['Können Sie bitte langsamer sprechen?', 'Could you speak more slowly, please?']
      ],
      words: [
        ['der Notruf', 'emergency call, emergency number'],
        ['der Krankenwagen', 'ambulance'],
        ['die Feuerwehr', 'fire brigade'],
        ['der Notarzt / die Notärztin', 'emergency doctor'],
        ['die Notaufnahme', 'emergency department (A&E)'],
        ['der Bereitschaftsdienst', 'on-call (out-of-hours) service'],
        ['die Notdienstapotheke', 'pharmacy on emergency duty'],
        ['der Unfall', 'accident'],
        ['verletzt', 'injured'],
        ['bewusstlos', 'unconscious'],
        ['der Diebstahl', 'theft'],
        ['die Anzeige', 'police report'],
        ['die Verlustanzeige', 'report of a lost item'],
        ['die Versichertenkarte', 'health insurance card']
      ],
      dialogue: { title: 'Anruf beim ärztlichen Bereitschaftsdienst', place: 'Am Telefon (116117)', lines: [
        ['vogel', 'Ärztlicher Bereitschaftsdienst, guten Abend. Wie kann ich Ihnen helfen?', 'Medical on-call service, good evening. How can I help you?'],
        ['alex', 'Guten Abend. Meine Tochter ist vier Jahre alt und hat seit heute Mittag hohes Fieber. Die Kinderarztpraxis hat am Wochenende geschlossen.', 'Good evening. My daughter is four years old and has had a high temperature since lunchtime. The paediatrician’s practice is closed at the weekend.'],
        ['vogel', 'Wie hoch ist das Fieber?', 'How high is her temperature?'],
        ['alex', 'Neununddreißig Komma acht. Sie hat auch Ohrenschmerzen und weint viel.', 'Thirty-nine point eight. She also has earache and is crying a lot.'],
        ['vogel', 'Trinkt sie genug? Und ist sie wach und reagiert normal?', 'Is she drinking enough? And is she awake and reacting normally?'],
        ['alex', 'Ja, sie trinkt ein bisschen und spricht mit mir.', 'Yes, she’s drinking a little and talking to me.'],
        ['vogel', 'Gut, das klingt nicht lebensgefährlich. Kommen Sie bitte in die Kinder-Bereitschaftspraxis am Klinikum Nord. Sie ist heute bis zweiundzwanzig Uhr geöffnet.', 'Good, that doesn’t sound life-threatening. Please come to the children’s on-call practice at Klinikum Nord. It’s open until 10 pm today.'],
        ['alex', 'Was muss ich mitbringen?', 'What do I need to bring?'],
        ['vogel', 'Die Versichertenkarte Ihrer Tochter. Und wenn es ihr schlechter geht, zum Beispiel bei Atemnot, rufen Sie sofort die eins eins zwei an.', 'Your daughter’s health insurance card. And if she gets worse – for example if she has trouble breathing – call 112 immediately.'],
        ['alex', 'Verstanden. Vielen Dank für Ihre Hilfe!', 'Understood. Thank you very much for your help!'],
        ['vogel', 'Gern. Gute Besserung für Ihre Tochter!', 'You’re welcome. I hope your daughter gets well soon!']
      ] },
      read: { kind: 'notice', title: 'Apotheken-Notdienst',
        text: 'Apotheke am Markt\n\nLiebe Kundinnen und Kunden,\nunsere Apotheke ist jetzt geschlossen.\n\nNotdienst hat heute:\nLöwen-Apotheke\nBahnhofstraße 21, Neustadt\n(etwa 10 Minuten zu Fuß, gegenüber vom Hauptbahnhof)\n\nDer Notdienst beginnt heute um 8:30 Uhr und endet morgen früh um 8:30 Uhr.\nBitte beachten Sie: Nachts sowie an Sonn- und Feiertagen kann eine Notdienstgebühr anfallen.\n\nBei Lebensgefahr: Notruf 112\nÄrztlicher Bereitschaftsdienst: 116117\n\nWeitere Notdienst-Apotheken finden Sie im Internet oder im Aushang jeder Apotheke.\n\nUnsere Öffnungszeiten: Mo–Fr 8–18:30 Uhr, Sa 8–13 Uhr',
        q: [
          { q: 'Welche Apotheke hat heute Notdienst?', o: ['Die Apotheke am Markt.', 'Die Löwen-Apotheke in der Bahnhofstraße.', 'Keine – heute sind alle Apotheken geschlossen.'], a: 1, ex: '„Notdienst hat heute: Löwen-Apotheke, Bahnhofstraße 21“. The Apotheke am Markt itself is closed.' },
          { q: 'Bis wann hat die Löwen-Apotheke Notdienst?', o: ['Bis heute um 18:30 Uhr.', 'Bis Samstag um 13 Uhr.', 'Bis morgen früh um 8:30 Uhr.'], a: 2, ex: '„Der Notdienst … endet morgen früh um 8:30 Uhr.“ A pharmacy’s emergency service usually runs for 24 hours.' },
          { q: 'Welche Nummer ruft man bei Lebensgefahr an?', o: ['Die 112.', 'Die 116117.', 'Die Nummer der Apotheke.'], a: 0, ex: '„Bei Lebensgefahr: Notruf 112“. 116117 is the medical on-call service for cases that are urgent but not life-threatening.' }
        ] },
      tips: [
        'The most important information on an emergency call is WHERE you are. Learn your address by heart – street, house number, floor and the name on the doorbell.',
        '112 is for life-threatening situations. If you need a doctor tonight but it’s not an emergency, call 116117 – don’t go to the Notaufnahme with a cold.',
        'In Germany everyone must help in an emergency as far as they can – at least by calling 112. Not helping can be a criminal offence (unterlassene Hilfeleistung).',
        'Speak slowly and use simple words: „Unfall“, „verletzt“, „Feuer“, „bewusstlos“. If you don’t understand, say „Langsamer, bitte!“ – and never hang up first.'
      ],
      links: [['#/scenes/notfall', '🎬 Scene: An emergency'], ['#/scenes/polizei', '🎬 Scene: My bike has been stolen!'], ['#/scenes/arzt', '🎬 Scene: At the doctor’s & pharmacy']] },

    { id: 'freizeit', n: 12, icon: '⚽', title: 'Free time & friends', de: 'Freizeit & Freunde', color: '#7cb518', level: 'A2',
      intro: 'Work and German classes are important – but friends and free time are what make a new country feel like home. Germans often meet new people through clubs, courses and regular activities rather than by chance, so the best way to make friends is to join something. Here is where to start.',
      facts: [
        ['⚽', 'Vereine (clubs)', 'Germany has hundreds of thousands of clubs (Vereine): sports, music, choirs, gardening, chess – even cricket. Membership is often cheap, and most clubs let you try a session for free (Probetraining). Joining a club is one of the best ways to make German friends.'],
        ['🎓', 'Volkshochschule (VHS)', 'Almost every town has an adult education centre (Volkshochschule) with affordable courses in languages, cooking, IT, yoga, art and much more. Many also offer German and integration courses, and there are often reduced fees for people with a low income.'],
        ['📚', 'Libraries', 'Public libraries (Stadtbibliothek / Stadtbücherei) lend books, films, games and e-books. A library card (Bibliotheksausweis) is cheap or even free – bring your ID and your registration certificate (Meldebescheinigung). Many libraries also have free Wi-Fi, quiet workplaces and German conversation groups.'],
        ['📅', 'Public holidays (Feiertage)', 'Some public holidays are nationwide, e.g. New Year’s Day, Good Friday, Easter Monday, 1 May, 3 October (Day of German Unity) and Christmas (25 and 26 December). Others exist only in some federal states (Bundesländer), e.g. Epiphany, Corpus Christi or All Saints’ Day. Shops are closed – check the holiday calendar for your state.'],
        ['🎄', 'Festivals and traditions', 'Christmas markets (Weihnachtsmärkte) open in late November with mulled wine (Glühwein) and gingerbread. Carnival (Karneval / Fasching) is celebrated in February or March, especially in Cologne, Düsseldorf and Mainz. The Oktoberfest in Munich starts in September – and in summer almost every town has its own Stadtfest.'],
        ['☕', 'Meeting people', 'Try a language café (Sprachcafé) or find a tandem partner – you help with your language, they help with German. Volunteering (Ehrenamt), international groups and a regular get-together at a pub (Stammtisch) are also great ways to meet people.'],
        ['🥾', 'Nature and hiking', 'Germans love being outdoors: hiking (Wandern), cycling, picnics and swimming in lakes. Stay on the paths in nature reserves (Naturschutzgebiet), take your rubbish home and only barbecue where it is allowed. Wild camping is generally not allowed.'],
        ['🎟️', 'Culture for less', 'Museums, theatres, cinemas and swimming pools often have discounts for students, children and people with a low income. Some cities also have a social pass (Sozialpass) with reduced prices.']
      ],
      steps: [
        'Get a library card at your local library.',
        'Look through the VHS programme and book a course that interests you.',
        'Find a club and ask for a free trial session (Probetraining).',
        'Visit a Sprachcafé or look for a tandem partner.',
        'Check the public holidays in your Bundesland.',
        'Say yes when colleagues or neighbours invite you – and invite them back.'
      ],
      phrases: [
        ['Was machst du gern in deiner Freizeit?', 'What do you like doing in your free time?'],
        ['Ich spiele gern Badminton, und ich koche gern.', 'I like playing badminton, and I like cooking.'],
        ['Hast du am Wochenende Zeit?', 'Are you free at the weekend?'],
        ['Hast du Lust, mitzukommen?', 'Would you like to come along?'],
        ['Wann und wo treffen wir uns?', 'When and where shall we meet?'],
        ['Leider kann ich nicht. Vielleicht nächstes Mal?', 'Unfortunately I can’t. Maybe next time?'],
        ['Kann ich zu einem Probetraining kommen?', 'Can I come to a trial session?'],
        ['Wie hoch ist der Mitgliedsbeitrag?', 'How much is the membership fee?'],
        ['Ich möchte mich für den Kurs anmelden.', 'I’d like to sign up for the course.'],
        ['Gibt es noch freie Plätze?', 'Are there any places left?'],
        ['Ich hätte gern einen Bibliotheksausweis.', 'I’d like a library card.'],
        ['Bis wann muss ich das Buch zurückgeben?', 'By when do I have to return the book?'],
        ['Ich suche einen Tandempartner für Deutsch und Englisch.', 'I’m looking for a tandem partner for German and English.'],
        ['Morgen ist Feiertag – da haben alle Geschäfte zu.', 'Tomorrow is a public holiday – all the shops are closed.']
      ],
      words: [
        ['die Freizeit', 'free time'],
        ['der Verein', 'club, association'],
        ['das Mitglied', 'member'],
        ['der Mitgliedsbeitrag', 'membership fee'],
        ['das Probetraining', 'free trial session'],
        ['die Volkshochschule (VHS)', 'adult education centre'],
        ['der Kurs', 'course'],
        ['die Bibliothek', 'library'],
        ['ausleihen', 'to borrow'],
        ['der Feiertag', 'public holiday'],
        ['der Weihnachtsmarkt', 'Christmas market'],
        ['das Ehrenamt', 'volunteer work'],
        ['wandern', 'to hike'],
        ['sich verabreden', 'to arrange to meet']
      ],
      dialogue: { title: 'Im Sprachcafé', place: 'In der Stadtbibliothek', lines: [
        ['lena', 'Hallo! Bist du zum ersten Mal hier im Sprachcafé?', 'Hi! Is this your first time at the language café?'],
        ['alex', 'Ja. Ich wohne erst seit zwei Monaten hier und möchte mehr Deutsch sprechen.', 'Yes. I’ve only been living here for two months and I want to speak more German.'],
        ['lena', 'Super! Ich bin Lena. Was machst du gern in deiner Freizeit?', 'Great! I’m Lena. What do you like doing in your free time?'],
        ['alex', 'Ich spiele gern Cricket, aber das kennt hier fast niemand. Und ich koche gern.', 'I like playing cricket, but hardly anyone here knows it. And I like cooking.'],
        ['lena', 'Echt? Ich glaube, es gibt in der Stadt sogar einen Cricketverein. Frag doch mal nach einem Probetraining!', 'Really? I think there’s even a cricket club in town. Why don’t you ask about a trial session?'],
        ['alex', 'Gute Idee! Und was machst du gern?', 'Good idea! And what do you like doing?'],
        ['lena', 'Ich wandere gern. Am Sonntag gehe ich mit Freunden im Wald wandern. Hast du Lust, mitzukommen?', 'I like hiking. On Sunday I’m going hiking in the forest with friends. Would you like to come along?'],
        ['alex', 'Ja, gern! Wann und wo treffen wir uns?', 'Yes, I’d love to! When and where shall we meet?'],
        ['lena', 'Um zehn Uhr am Bahnhof. Bring gute Schuhe und etwas zu essen mit!', 'At ten o’clock at the station. Bring good shoes and something to eat!'],
        ['alex', 'Mache ich. Ich bringe Samosas für alle mit!', 'Will do. I’ll bring samosas for everyone!'],
        ['lena', 'Lecker! Gib mir deine Nummer, dann schicke ich dir die Details.', 'Yum! Give me your number and I’ll send you the details.']
      ] },
      read: { kind: 'notice', title: 'VHS-Kurs: Deutsche Küche',
        text: 'Volkshochschule Neustadt – Programm Herbst\n\nKurs 3105: Deutsche Küche für Einsteiger\n\nSie möchten typische deutsche Gerichte kochen? In diesem Kurs lernen Sie Klassiker wie Kartoffelsuppe, Käsespätzle und Apfelkuchen. Es gibt auch vegetarische Rezepte. Am Ende jedes Abends essen wir zusammen.\nDer Kurs ist auch für Teilnehmende mit wenig Deutschkenntnissen (ab A2) geeignet.\n\nTermine: 4 Abende, donnerstags, 18:00–21:00 Uhr, ab 5. November\nOrt: VHS-Haus, Schulstraße 3, Lehrküche (Raum 012)\nGebühr: 59 €, plus 20 € für Lebensmittel (bitte am ersten Abend bar bezahlen)\nBitte mitbringen: Schürze, Geschirrtuch und eine Dose für Reste\n\nAnmeldung online oder im VHS-Büro (Mo–Fr 9–12 Uhr). Maximal 12 Teilnehmende.\nEine Abmeldung ist bis eine Woche vor Kursbeginn kostenlos.',
        q: [
          { q: 'Wann findet der Kurs statt?', o: ['Jeden Samstag am Vormittag.', 'An vier Donnerstagabenden ab dem 5. November.', 'Jeden Tag im November.'], a: 1, ex: '„4 Abende, donnerstags, 18:00–21:00 Uhr, ab 5. November“.' },
          { q: 'Was muss man zusätzlich zur Kursgebühr bezahlen?', o: ['20 € für Lebensmittel.', 'Die Schürze.', 'Die Anmeldung im VHS-Büro.'], a: 0, ex: '„Gebühr: 59 €, plus 20 € für Lebensmittel“ – the food money is paid in cash on the first evening.' },
          { q: 'Bis wann kann man sich kostenlos abmelden?', o: ['Bis zum ersten Kursabend.', 'Bis zum Ende des Kurses.', 'Bis eine Woche vor Kursbeginn.'], a: 2, ex: '„Eine Abmeldung ist bis eine Woche vor Kursbeginn kostenlos.“ – „sich abmelden“ means to cancel your registration.' }
        ] },
      tips: [
        'Germans can seem reserved at first, but friendships grow over time. Keep going to the same club or course – once you are a regular, people open up.',
        'Many Germans plan their free time in advance. Instead of asking „Hast du heute Zeit?“, suggest a day a few days ahead.',
        'In restaurants and bars, groups usually pay separately – the waiter asks „Zusammen oder getrennt?“',
        'At Christmas markets you pay a deposit (Pfand) for your mug – return it to get your money back, or keep it as a souvenir.',
        'Christmas Eve (24 December) and New Year’s Eve are not official public holidays, but most shops close early.'
      ],
      links: [['#/scenes/fitness', '🎬 Scene: At the gym'], ['#/scenes/restaurant', '🎬 Scene: At the restaurant'], ['#/writing', '✍️ Writing practice']] }
  );
})();
