/* READING ROOM – A1 and A2 texts. Original texts written for Deutsch30. */
(function () {
  'use strict';
  GL.reading = GL.reading || [];
  GL.reading.push(
    /* ---------- A1 ---------- */
    { id: 'a1-meine-familie', level: 'A1', icon: '👨‍👩‍👧', type: 'story', title: 'Meine Familie', en: 'My family', minutes: 3,
      text: 'Hallo! Ich heiße Priya Sharma. Ich komme aus Indien, aus Pune. Ich bin 28 Jahre alt und wohne jetzt in Köln. Ich bin Krankenschwester von Beruf.\n\n' +
        'Ich bin verheiratet. Mein Mann heißt Arjun. Er ist 31 und arbeitet als Ingenieur bei einer Firma in Köln. Wir haben eine Tochter. Sie heißt Anika und ist vier Jahre alt. Sie geht in die Kita und spricht schon gut Deutsch – besser als Papa!\n\n' +
        'Meine Eltern wohnen in Indien. Mein Vater ist Lehrer, meine Mutter ist Ärztin. Ich habe auch einen Bruder. Er heißt Rohan und studiert in Berlin. Wir telefonieren jeden Sonntag.\n\n' +
        'Mein Hobby ist Kochen. Am Wochenende kocht die ganze Familie zusammen.',
      words: [['der Mann', 'husband; man'], ['verheiratet', 'married'], ['die Tochter', 'daughter'], ['die Eltern', 'parents'], ['der Vater', 'father'],
        ['die Mutter', 'mother'], ['der Bruder', 'brother'], ['die Krankenschwester', 'nurse (female)'], ['von Beruf', 'by profession'], ['wohnen', 'to live (somewhere)'],
        ['arbeiten', 'to work'], ['die Kita', 'nursery, day-care centre'], ['telefonieren', 'to talk on the phone'], ['das Hobby', 'hobby'], ['kochen', 'to cook'], ['zusammen', 'together']],
      q: [
        { q: 'Woher kommt Priya?', o: ['Aus Pakistan', 'Aus Indien', 'Aus der Türkei'], a: 1, ex: '„Ich komme aus Indien, aus Pune.“' },
        { q: 'Was ist Arjun von Beruf?', o: ['Ingenieur', 'Lehrer', 'Arzt'], a: 0, ex: '„Er … arbeitet als Ingenieur bei einer Firma in Köln.“' },
        { q: 'Wie alt ist Anika?', o: ['Zwei Jahre', 'Acht Jahre', 'Vier Jahre'], a: 2, ex: '„Sie heißt Anika und ist vier Jahre alt.“' },
        { q: 'Wo wohnt Rohan?', o: ['In Köln', 'In Berlin', 'In Pune'], a: 1, ex: '„Er heißt Rohan und studiert in Berlin.“' },
        { q: 'Was ist Priyas Hobby?', o: ['Kochen', 'Lesen', 'Sport'], a: 0, ex: '„Mein Hobby ist Kochen.“' }],
      task: 'Now write 4–5 sentences about your own family: names, ages, jobs and where they live.' },

    { id: 'a1-mein-tag', level: 'A1', icon: '⏰', type: 'story', title: 'Mein Tag', en: 'My day', minutes: 3,
      text: 'Ich heiße Tomasz und komme aus Polen. Ich wohne in Hamburg und arbeite in einem Lager. Mein Tag beginnt sehr früh.\n\n' +
        'Um fünf Uhr klingelt mein Wecker. Ich stehe sofort auf, dusche und trinke einen Kaffee. Frühstück esse ich nicht zu Hause. Um Viertel vor sechs fahre ich mit dem Fahrrad zur Arbeit. Die Arbeit beginnt um sechs Uhr.\n\n' +
        'Um zehn Uhr mache ich Pause. Dann esse ich ein Brötchen mit Käse. Um vierzehn Uhr ist die Arbeit zu Ende. Ich fahre nach Hause und schlafe eine Stunde.\n\n' +
        'Am Nachmittag lerne ich Deutsch. Am Abend koche ich und telefoniere mit meiner Freundin in Krakau. Sie fragt immer: „Tomasz, warum gehst du so früh ins Bett?“ Ich sage: „Mein Wecker!“ Um neun Uhr schlafe ich.',
      words: [['der Wecker', 'alarm clock'], ['klingeln', 'to ring'], ['duschen', 'to take a shower'], ['das Frühstück', 'breakfast'], ['früh', 'early'],
        ['das Lager', 'warehouse'], ['das Fahrrad', 'bicycle'], ['die Arbeit', 'work'], ['die Pause', 'break'], ['das Brötchen', 'bread roll'],
        ['der Käse', 'cheese'], ['zu Ende sein', 'to be over, to end'], ['der Nachmittag', 'afternoon'], ['der Abend', 'evening'], ['schlafen', 'to sleep'], ['ins Bett gehen', 'to go to bed']],
      q: [
        { q: 'Wo arbeitet Tomasz?', o: ['In einer Bäckerei', 'In einem Lager', 'In einem Büro'], a: 1, ex: '„Ich … arbeite in einem Lager.“' },
        { q: 'Wann klingelt der Wecker?', o: ['Um fünf Uhr', 'Um sechs Uhr', 'Um Viertel vor sechs'], a: 0, ex: '„Um fünf Uhr klingelt mein Wecker.“' },
        { q: 'Wie fährt Tomasz zur Arbeit?', o: ['Mit dem Bus', 'Mit dem Auto', 'Mit dem Fahrrad'], a: 2, ex: '„Um Viertel vor sechs fahre ich mit dem Fahrrad zur Arbeit.“' },
        { q: 'Was isst Tomasz in der Pause?', o: ['Ein Brötchen mit Käse', 'Eine Pizza', 'Nichts'], a: 0, ex: '„Um zehn Uhr mache ich Pause. Dann esse ich ein Brötchen mit Käse.“' },
        { q: 'Was macht Tomasz am Nachmittag?', o: ['Er arbeitet.', 'Er kocht.', 'Er lernt Deutsch.'], a: 2, ex: '„Am Nachmittag lerne ich Deutsch.“ He cooks in the evening.' }],
      task: 'Describe your own day with times: when do you get up, work or study, eat and sleep?' },

    { id: 'a1-in-der-baeckerei', level: 'A1', icon: '🥐', type: 'story', title: 'In der Bäckerei', en: 'At the bakery', minutes: 3,
      text: 'Es ist Samstag, acht Uhr. Amira geht in die Bäckerei Schulz. Sie kommt aus Syrien und wohnt seit drei Monaten in Leipzig.\n\n' +
        '„Guten Morgen! Was möchten Sie?“, fragt die Verkäuferin.\n„Guten Morgen. Ich möchte sechs Brötchen, bitte.“\n„Normale Brötchen oder Körnerbrötchen?“\n„Vier normale und zwei Körnerbrötchen.“\n' +
        '„Gern. Noch etwas?“\n„Ja, ein Brot. Was ist das hier?“\n„Das ist ein Roggenbrot. Es ist sehr lecker.“\n„Gut, dann nehme ich das Roggenbrot. Und zwei Stück Apfelkuchen, bitte.“\n„Das macht neun Euro vierzig.“\n\n' +
        'Amira bezahlt mit Karte. Zu Hause wartet die Familie. Ihr Sohn ruft: „Mama, wo ist der Kuchen?“ Amira lacht. Der Kuchen ist für Sonntag!',
      words: [['die Bäckerei', 'bakery'], ['das Brötchen', 'bread roll'], ['das Körnerbrötchen', 'wholegrain roll (with seeds)'], ['möchten', 'would like'], ['die Verkäuferin', 'shop assistant (female)'],
        ['das Brot', 'bread, loaf'], ['das Roggenbrot', 'rye bread'], ['lecker', 'tasty'], ['nehmen', 'to take'], ['das Stück', 'piece'],
        ['der Kuchen', 'cake'], ['Noch etwas?', 'Anything else?'], ['Das macht …', 'That comes to …'], ['bezahlen', 'to pay'], ['die Karte', 'card'], ['warten', 'to wait']],
      q: [
        { q: 'Woher kommt Amira?', o: ['Aus Syrien', 'Aus Polen', 'Aus Indien'], a: 0, ex: '„Sie kommt aus Syrien …“' },
        { q: 'Wie viele Körnerbrötchen kauft Amira?', o: ['Vier', 'Sechs', 'Zwei'], a: 2, ex: '„Vier normale und zwei Körnerbrötchen.“' },
        { q: 'Welches Brot nimmt sie?', o: ['Ein Weißbrot', 'Ein Roggenbrot', 'Kein Brot'], a: 1, ex: '„Gut, dann nehme ich das Roggenbrot.“' },
        { q: 'Wie viel kostet alles?', o: ['9,40 €', '4,90 €', '6,40 €'], a: 0, ex: '„Das macht neun Euro vierzig.“' },
        { q: 'Wann isst die Familie den Kuchen?', o: ['Am Samstag', 'Heute Abend', 'Am Sonntag'], a: 2, ex: '„Der Kuchen ist für Sonntag!“' }],
      task: 'Write a short dialogue: you buy breakfast for your family at a German bakery.' },

    { id: 'a1-treffen-am-samstag', level: 'A1', icon: '💬', type: 'chat', title: 'Treffen am Samstag', en: 'Meeting on Saturday', minutes: 3,
      text: 'Mia: Hallo Kemal! Hast du am Samstag Zeit?\n' +
        'Kemal: Hi Mia! Ja, aber erst am Nachmittag. Bis vier Uhr arbeite ich.\n' +
        'Mia: Super! Wir gehen ins Kino. Kommst du mit?\n' +
        'Kemal: Gern! Welcher Film?\n' +
        'Mia: Eine Komödie. Der Film beginnt um fünf.\n' +
        'Kemal: Okay. Wo treffen wir uns?\n' +
        'Mia: Vor dem Kino am Marktplatz. Um halb fünf?\n' +
        'Kemal: Halb fünf ist schwierig. Die Arbeit ist um vier zu Ende, und der Bus braucht vierzig Minuten. Ist Viertel vor fünf okay?\n' +
        'Mia: Ja, kein Problem. Jonas kommt auch.\n' +
        'Kemal: Toll! Und danach? Essen wir zusammen?\n' +
        'Mia: Gute Idee! Es gibt eine neue Pizzeria in der Bahnhofstraße.\n' +
        'Kemal: Perfekt. Ich habe Hunger – schon jetzt! 😄\n' +
        'Mia: Haha. Bis Samstag!\n' +
        'Kemal: Bis dann! 👋',
      words: [['Zeit haben', 'to have time'], ['der Nachmittag', 'afternoon'], ['das Kino', 'cinema'], ['der Film', 'film, movie'], ['die Komödie', 'comedy'],
        ['beginnen', 'to begin'], ['sich treffen', 'to meet'], ['schwierig', 'difficult'], ['der Bus', 'bus'], ['brauchen', 'to need; to take (time)'],
        ['kein Problem', 'no problem'], ['danach', 'afterwards'], ['zusammen', 'together'], ['die Idee', 'idea'], ['der Hunger', 'hunger'], ['Bis dann!', 'See you then!']],
      q: [
        { q: 'Was machen Mia und Kemal am Samstag zuerst?', o: ['Sie gehen ins Kino.', 'Sie essen Pizza.', 'Sie arbeiten zusammen.'], a: 0, ex: '„Wir gehen ins Kino.“ – Pizza comes „danach“.' },
        { q: 'Wann beginnt der Film?', o: ['Um halb fünf', 'Um fünf Uhr', 'Um Viertel vor fünf'], a: 1, ex: '„Der Film beginnt um fünf.“' },
        { q: 'Warum ist halb fünf schwierig für Kemal?', o: ['Er hat kein Geld.', 'Er mag keine Komödien.', 'Er arbeitet bis vier und fährt dann Bus.'], a: 2, ex: '„Die Arbeit ist um vier zu Ende, und der Bus braucht vierzig Minuten.“' },
        { q: 'Wo treffen sie sich?', o: ['Am Bahnhof', 'In der Pizzeria', 'Vor dem Kino am Marktplatz'], a: 2, ex: '„Vor dem Kino am Marktplatz.“' },
        { q: 'Wer kommt auch mit?', o: ['Jonas', 'Lena', 'Kemals Bruder'], a: 0, ex: '„Jonas kommt auch.“' }],
      task: 'Write a short chat with a friend: suggest an activity, a time and a place to meet.' },

    { id: 'a1-wohnungsanzeige', level: 'A1', icon: '🏠', type: 'ad', title: 'Wohnung zu vermieten', en: 'Flat for rent', minutes: 3,
      text: '2-Zimmer-Wohnung in Dortmund-Hörde\n\n' +
        'Schöne, helle Wohnung im dritten Stock, 55 Quadratmeter. Die Wohnung hat zwei Zimmer, eine Küche, ein Bad mit Dusche und einen Balkon. Die Küche ist neu. Es gibt keinen Aufzug.\n\n' +
        'Miete: 520 Euro kalt, plus 150 Euro Nebenkosten. Kaution: zwei Monatsmieten.\n\n' +
        'Die Wohnung ist ruhig und nicht weit vom Zentrum. Die U-Bahn ist nur fünf Minuten zu Fuß entfernt. Ein Supermarkt und eine Apotheke sind auch in der Nähe. Haustiere sind leider nicht erlaubt.\n\n' +
        'Frei ab 1. Dezember. Ideal für Paare oder Singles.\n\n' +
        'Interesse? Rufen Sie Frau Becker an: Montag bis Freitag von 9 bis 17 Uhr.',
      words: [['die Wohnung', 'flat, apartment'], ['das Zimmer', 'room'], ['hell', 'bright'], ['die Küche', 'kitchen'], ['das Bad', 'bathroom'],
        ['der Balkon', 'balcony'], ['der Aufzug', 'lift, elevator'], ['die Miete', 'rent'], ['kalt (Miete)', 'without heating and other costs'], ['die Nebenkosten', 'additional costs (heating, water …)'],
        ['die Kaution', 'deposit'], ['ruhig', 'quiet'], ['zu Fuß', 'on foot'], ['in der Nähe', 'nearby'], ['das Haustier', 'pet'], ['erlaubt', 'allowed']],
      q: [
        { q: 'Wie viele Zimmer hat die Wohnung?', o: ['Eins', 'Zwei', 'Drei'], a: 1, ex: '„Die Wohnung hat zwei Zimmer …“' },
        { q: 'Was kostet die Wohnung warm (Miete plus Nebenkosten)?', o: ['520 Euro', '150 Euro', '670 Euro'], a: 2, ex: '„520 Euro kalt, plus 150 Euro Nebenkosten“ = 670 Euro.' },
        { q: 'In welchem Stock ist die Wohnung?', o: ['Im dritten Stock', 'Im Erdgeschoss', 'Im fünften Stock'], a: 0, ex: '„Schöne, helle Wohnung im dritten Stock …“' },
        { q: 'Was ist richtig?', o: ['Es gibt einen Aufzug.', 'Die U-Bahn ist in der Nähe.', 'Hunde und Katzen sind willkommen.'], a: 1, ex: '„Die U-Bahn ist nur fünf Minuten zu Fuß entfernt.“' },
        { q: 'Wann kann man Frau Becker anrufen?', o: ['Am Wochenende', 'Jeden Tag bis 20 Uhr', 'Montag bis Freitag, 9 bis 17 Uhr'], a: 2, ex: '„Rufen Sie Frau Becker an: Montag bis Freitag von 9 bis 17 Uhr.“' }],
      task: 'Describe your dream flat in 4–5 sentences: rooms, size, rent and location.' },

    { id: 'a1-mein-wochenende', level: 'A1', icon: '⚽', type: 'blog', title: 'Mein Wochenende', en: 'My weekend', minutes: 3,
      text: 'Hallo, ich bin Chidi! Ich komme aus Nigeria und studiere Informatik in Frankfurt. Von Montag bis Freitag habe ich viel Stress: Uni, Bibliothek, Hausaufgaben. Aber das Wochenende ist super!\n\n' +
        'Am Samstag schlafe ich lange – bis zehn Uhr. Dann frühstücke ich mit meinem Mitbewohner Felix. Wir essen Eier, Brot und Obst. Am Nachmittag spiele ich Fußball im Park. Am Abend gehen wir oft in eine Bar, oder wir kochen zu Hause für Freunde. Ich koche gern Jollof-Reis. Alle lieben Jollof-Reis!\n\n' +
        'Am Sonntag ist alles ruhig. Die Geschäfte sind zu. Ich gehe spazieren, oder ich lese ein Buch. Am Abend telefoniere ich mit meiner Familie in Lagos. Meine Mutter fragt immer: „Chidi, isst du genug?“ Ich sage: „Ja, Mama!“\n\n' +
        'Und was machst du am Wochenende?',
      words: [['das Wochenende', 'weekend'], ['studieren', 'to study (at university)'], ['die Bibliothek', 'library'], ['die Hausaufgaben', 'homework'], ['lange schlafen', 'to sleep in'],
        ['frühstücken', 'to have breakfast'], ['der Mitbewohner', 'flatmate (male)'], ['das Obst', 'fruit'], ['der Fußball', 'football'], ['der Park', 'park'],
        ['oft', 'often'], ['der Freund', 'friend'], ['ruhig', 'quiet'], ['das Geschäft', 'shop'], ['spazieren gehen', 'to go for a walk'], ['genug', 'enough']],
      q: [
        { q: 'Was studiert Chidi?', o: ['Medizin', 'Informatik', 'Deutsch'], a: 1, ex: '„Ich … studiere Informatik in Frankfurt.“' },
        { q: 'Bis wann schläft Chidi am Samstag?', o: ['Bis zehn Uhr', 'Bis acht Uhr', 'Bis zwölf Uhr'], a: 0, ex: '„Am Samstag schlafe ich lange – bis zehn Uhr.“' },
        { q: 'Was macht Chidi am Samstagnachmittag?', o: ['Er liest ein Buch.', 'Er geht einkaufen.', 'Er spielt Fußball.'], a: 2, ex: '„Am Nachmittag spiele ich Fußball im Park.“' },
        { q: 'Warum ist der Sonntag ruhig?', o: ['Chidi ist krank.', 'Die Geschäfte sind zu.', 'Felix schläft.'], a: 1, ex: '„Am Sonntag ist alles ruhig. Die Geschäfte sind zu.“' },
        { q: 'Was fragt Chidis Mutter immer?', o: ['„Isst du genug?“', '„Lernst du genug?“', '„Schläfst du genug?“'], a: 0, ex: '„Chidi, isst du genug?“' }],
      task: 'Answer Chidi’s question: what do you do on Saturday and on Sunday?' },

    { id: 'a1-wetter-jahreszeiten', level: 'A1', icon: '🌦️', type: 'info', title: 'Das Wetter in Deutschland', en: 'The weather in Germany', minutes: 3,
      text: 'Deutschland hat vier Jahreszeiten: Frühling, Sommer, Herbst und Winter. Das Wetter ist oft anders als in Indien oder Brasilien!\n\n' +
        'Im Frühling ist es mild. Es regnet oft, aber die Sonne scheint auch. Die Blumen blühen, und die Tage sind wieder lang.\n\n' +
        'Im Sommer ist es warm, manchmal sehr heiß – über 30 Grad. Viele Menschen gehen ins Schwimmbad oder grillen im Park. Die Kinder haben sechs Wochen Sommerferien.\n\n' +
        'Im Herbst sind die Blätter gelb, rot und braun. Es ist windig und kühl, oft auch neblig.\n\n' +
        'Im Winter ist es kalt und dunkel. Die Temperatur ist oft unter null Grad. Manchmal schneit es. Um halb fünf am Nachmittag ist es schon dunkel!\n\n' +
        'Tipp: Das Wetter in Deutschland ändert sich schnell. Nehmen Sie immer einen Regenschirm mit – und eine Jacke!',
      words: [['die Jahreszeit', 'season'], ['der Frühling', 'spring'], ['der Sommer', 'summer'], ['der Herbst', 'autumn'], ['der Winter', 'winter'],
        ['das Wetter', 'weather'], ['regnen', 'to rain'], ['die Sonne', 'sun'], ['scheinen', 'to shine'], ['heiß', 'hot'],
        ['das Schwimmbad', 'swimming pool'], ['windig', 'windy'], ['kühl', 'cool'], ['dunkel', 'dark'], ['schneien', 'to snow'], ['der Regenschirm', 'umbrella']],
      q: [
        { q: 'Wie viele Jahreszeiten hat Deutschland?', o: ['Zwei', 'Vier', 'Sechs'], a: 1, ex: '„Deutschland hat vier Jahreszeiten …“' },
        { q: 'Wie ist das Wetter im Frühling?', o: ['Mild, mit Regen und Sonne', 'Sehr heiß', 'Kalt und dunkel'], a: 0, ex: '„Im Frühling ist es mild. Es regnet oft, aber die Sonne scheint auch.“' },
        { q: 'Was machen viele Menschen im Sommer?', o: ['Sie fahren Ski.', 'Sie bleiben immer zu Hause.', 'Sie gehen ins Schwimmbad oder grillen.'], a: 2, ex: '„Viele Menschen gehen ins Schwimmbad oder grillen im Park.“' },
        { q: 'Welche Farben haben die Blätter im Herbst?', o: ['Grün und blau', 'Gelb, rot und braun', 'Weiß und grau'], a: 1, ex: '„Im Herbst sind die Blätter gelb, rot und braun.“' },
        { q: 'Was ist der Tipp im Text?', o: ['Nehmen Sie immer einen Regenschirm mit.', 'Gehen Sie im Winter nicht raus.', 'Reisen Sie nur im Sommer.'], a: 0, ex: '„Nehmen Sie immer einen Regenschirm mit – und eine Jacke!“' }],
      task: 'Write about the weather and seasons in your home country. Which season do you like best?' },

    { id: 'a1-die-einkaufsliste', level: 'A1', icon: '🛒', type: 'story', title: 'Die Einkaufsliste', en: 'The shopping list', minutes: 3,
      text: 'Heute ist Freitag. Raj und seine Frau Meera haben am Abend Gäste. Meera schreibt eine Einkaufsliste: Reis, Zwiebeln, Tomaten, ein Kilo Hähnchen, Joghurt, Milch und Bananen.\n\n' +
        'Raj geht in den Supermarkt. Aber oh nein – die Einkaufsliste ist zu Hause! Er ruft Meera an. Sie geht nicht ans Telefon. Was jetzt?\n\n' +
        'Raj kauft Reis, Tomaten und Hähnchen. Dann denkt er: „Milch? Ja, Milch.“ Er kauft auch Schokolade und Chips. Die sind nicht auf der Liste, aber Raj mag Schokolade. An der Kasse bezahlt er 23 Euro.\n\n' +
        'Zu Hause sieht Meera die Tüte. „Wo sind die Zwiebeln? Und der Joghurt?“, fragt sie. Raj sagt: „Aber ich habe Schokolade!“ Meera lacht nicht. Raj geht noch einmal in den Supermarkt. Diesmal nimmt er die Liste mit.',
      words: [['die Einkaufsliste', 'shopping list'], ['die Gäste', 'guests'], ['der Reis', 'rice'], ['die Zwiebel', 'onion'], ['die Tomate', 'tomato'],
        ['das Hähnchen', 'chicken (food)'], ['der Joghurt', 'yoghurt'], ['die Milch', 'milk'], ['der Supermarkt', 'supermarket'], ['kaufen', 'to buy'],
        ['die Schokolade', 'chocolate'], ['die Kasse', 'checkout, till'], ['bezahlen', 'to pay'], ['die Tüte', 'bag (plastic/paper)'], ['noch einmal', 'once more, again'], ['diesmal', 'this time']],
      q: [
        { q: 'Warum kauft Raj ein?', o: ['Am Abend kommen Gäste.', 'Er hat Geburtstag.', 'Der Kühlschrank ist kaputt.'], a: 0, ex: '„Raj und seine Frau Meera haben am Abend Gäste.“' },
        { q: 'Wo ist die Einkaufsliste?', o: ['Im Supermarkt', 'In Rajs Tasche', 'Zu Hause'], a: 2, ex: '„Aber oh nein – die Einkaufsliste ist zu Hause!“' },
        { q: 'Welche Sachen sind nicht auf der Liste?', o: ['Milch', 'Schokolade und Chips', 'Reis'], a: 1, ex: '„Er kauft auch Schokolade und Chips. Die sind nicht auf der Liste …“' },
        { q: 'Was fehlt in der Tüte?', o: ['Die Zwiebeln und der Joghurt', 'Die Tomaten', 'Das Hähnchen'], a: 0, ex: '„Wo sind die Zwiebeln? Und der Joghurt?“' },
        { q: 'Was macht Raj am Ende?', o: ['Er kocht.', 'Er geht noch einmal in den Supermarkt.', 'Er isst die Schokolade.'], a: 1, ex: '„Raj geht noch einmal in den Supermarkt.“' }],
      task: 'Write your own shopping list for a dinner with friends and say what you want to cook.' },

    { id: 'a1-einladung-geburtstag', level: 'A1', icon: '🎂', type: 'email', title: 'Einladung zum Geburtstag', en: 'Birthday invitation', minutes: 3,
      text: 'Liebe Kolleginnen und Kollegen,\n\n' +
        'am Samstag, den 14. Juni, werde ich 30 Jahre alt! Das möchte ich mit euch feiern.\n\n' +
        'Die Party ist bei mir zu Hause: Gartenstraße 12 in Nürnberg. Sie beginnt um 19 Uhr. Wir grillen im Garten. Es gibt Würstchen, Gemüse, Salate und Getränke. Ich mache auch Baklava – nach dem Rezept von meiner Oma aus Istanbul!\n\n' +
        'Bitte bringt kein Geschenk mit – nur gute Laune! Eure Partner und Kinder sind auch herzlich willkommen.\n\n' +
        'Mit dem Bus ist es einfach: Linie 36 bis zur Haltestelle „Gartenstraße“. Parkplätze gibt es leider nicht viele.\n\n' +
        'Bitte antwortet bis Mittwoch, den 11. Juni. Ich brauche die Zahl für das Essen.\n\n' +
        'Ich freue mich auf euch!\n\nViele Grüße\nElif',
      words: [['der Kollege', 'colleague'], ['feiern', 'to celebrate'], ['die Party', 'party'], ['beginnen', 'to begin'], ['grillen', 'to have a barbecue'],
        ['der Garten', 'garden'], ['das Würstchen', 'sausage'], ['das Gemüse', 'vegetables'], ['das Getränk', 'drink'], ['das Rezept', 'recipe'],
        ['das Geschenk', 'present, gift'], ['die Laune', 'mood'], ['herzlich willkommen', 'very welcome'], ['die Haltestelle', 'stop (bus/tram)'], ['der Parkplatz', 'parking space'],
        ['antworten', 'to answer'], ['sich freuen auf', 'to look forward to']],
      q: [
        { q: 'Warum gibt es eine Party?', o: ['Elif hat Geburtstag.', 'Elif hat eine neue Wohnung.', 'Elif hat einen neuen Job.'], a: 0, ex: '„… werde ich 30 Jahre alt! Das möchte ich mit euch feiern.“' },
        { q: 'Wann beginnt die Party?', o: ['Um 17 Uhr', 'Um 19 Uhr', 'Um 21 Uhr'], a: 1, ex: '„Sie beginnt um 19 Uhr.“' },
        { q: 'Was macht Elif nach dem Rezept von ihrer Oma?', o: ['Pizza', 'Salat', 'Baklava'], a: 2, ex: '„Ich mache auch Baklava – nach dem Rezept von meiner Oma aus Istanbul!“' },
        { q: 'Was sollen die Gäste mitbringen?', o: ['Ein Geschenk', 'Gute Laune', 'Getränke'], a: 1, ex: '„Bitte bringt kein Geschenk mit – nur gute Laune!“' },
        { q: 'Bis wann sollen die Gäste antworten?', o: ['Bis Mittwoch, 11. Juni', 'Bis Samstag, 14. Juni', 'Bis Montag'], a: 0, ex: '„Bitte antwortet bis Mittwoch, den 11. Juni.“' }],
      task: 'Write a short reply to Elif: say thank you, say if you can come and ask one question.' },

    { id: 'a1-meine-stadt', level: 'A1', icon: '🏙️', type: 'blog', title: 'Meine Stadt Freiburg', en: 'My city Freiburg', minutes: 3,
      text: 'Ich heiße Mariana und komme aus Brasilien. Seit einem Jahr wohne ich in Freiburg. Freiburg ist eine Stadt im Südwesten von Deutschland. Hier wohnen etwa 230.000 Menschen.\n\n' +
        'Freiburg ist nicht sehr groß, aber sehr schön. Die Altstadt ist alt und romantisch. In der Mitte steht das Münster – eine große, alte Kirche. Auf dem Münsterplatz ist jeden Tag außer Sonntag ein Markt. Dort kaufe ich Obst, Gemüse und Blumen.\n\n' +
        'Viele Menschen fahren hier Fahrrad. Es gibt auch Straßenbahnen. Ich habe kein Auto, ich brauche keins.\n\n' +
        'Freiburg ist eine Studentenstadt. Es gibt viele Cafés und Kneipen. Und die Sonne scheint hier oft – Freiburg ist sehr sonnig und warm. Das gefällt mir!\n\n' +
        'Nur eine Sache ist schwierig: Die Wohnungen sind sehr teuer.',
      words: [['die Stadt', 'town, city'], ['wohnen', 'to live (somewhere)'], ['die Altstadt', 'old town'], ['das Münster', 'cathedral, minster'], ['die Kirche', 'church'],
        ['außer', 'except'], ['der Markt', 'market'], ['die Blume', 'flower'], ['das Fahrrad', 'bicycle'], ['die Straßenbahn', 'tram'],
        ['das Auto', 'car'], ['brauchen', 'to need'], ['die Kneipe', 'pub, bar'], ['sonnig', 'sunny'], ['teuer', 'expensive'], ['schwierig', 'difficult']],
      q: [
        { q: 'Woher kommt Mariana?', o: ['Aus Brasilien', 'Aus Spanien', 'Aus Indien'], a: 0, ex: '„Ich heiße Mariana und komme aus Brasilien.“' },
        { q: 'Was ist das Münster?', o: ['Ein Markt', 'Eine große, alte Kirche', 'Ein Café'], a: 1, ex: '„… das Münster – eine große, alte Kirche.“' },
        { q: 'Wann gibt es keinen Markt auf dem Münsterplatz?', o: ['Am Montag', 'Am Samstag', 'Am Sonntag'], a: 2, ex: '„… jeden Tag außer Sonntag ein Markt.“' },
        { q: 'Hat Mariana ein Auto?', o: ['Ja, ein kleines.', 'Nein, sie braucht keins.', 'Ja, aber sie fährt nie.'], a: 1, ex: '„Ich habe kein Auto, ich brauche keins.“' },
        { q: 'Was ist in Freiburg schwierig?', o: ['Es gibt keine Cafés.', 'Das Wetter ist schlecht.', 'Die Wohnungen sind teuer.'], a: 2, ex: '„Nur eine Sache ist schwierig: Die Wohnungen sind sehr teuer.“' }],
      task: 'Write 5 sentences about your town or city: where it is, what is there and what you like.' },

    { id: 'a1-cafe-speisekarte', level: 'A1', icon: '☕', type: 'info', title: 'Die Speisekarte', en: 'The menu', minutes: 3,
      text: 'Café Sonnenschein – Speisekarte\n\n' +
        'Frühstück (von 8 bis 11:30 Uhr)\nKleines Frühstück: Kaffee oder Tee, ein Brötchen, Butter, Marmelade – 5,90 €\n' +
        'Großes Frühstück: Kaffee oder Tee, Orangensaft, zwei Brötchen, Käse, Wurst, ein Ei – 11,50 €\n' +
        'Vegetarisches Frühstück: Tee, Brot, Käse, Tomaten, Gurken, Hummus – 9,80 €\n\n' +
        'Warme Speisen (ab 12 Uhr)\nTomatensuppe mit Brot – 6,50 €\nSpaghetti mit Gemüse – 10,90 €\nSchnitzel mit Pommes und Salat – 14,90 €\n\n' +
        'Kuchen\nApfelkuchen – 3,80 €\nKäsekuchen – 4,20 €\n\n' +
        'Getränke\nKaffee – 2,90 €, Cappuccino – 3,60 €, Tee – 2,80 €, Mineralwasser – 2,50 €, Apfelschorle – 3,20 €\n\n' +
        'Montag Ruhetag. Wir haben WLAN. Kartenzahlung ab 10 Euro möglich. Hunde sind willkommen!',
      words: [['die Speisekarte', 'menu'], ['das Frühstück', 'breakfast'], ['die Butter', 'butter'], ['die Marmelade', 'jam'], ['der Orangensaft', 'orange juice'],
        ['die Wurst', 'sausage, cold meat'], ['das Ei', 'egg'], ['vegetarisch', 'vegetarian'], ['die Speise', 'dish, meal'], ['die Suppe', 'soup'],
        ['die Pommes', 'chips, fries'], ['der Käsekuchen', 'cheesecake'], ['das Mineralwasser', 'mineral water'], ['die Apfelschorle', 'apple juice with sparkling water'], ['der Ruhetag', 'closing day'],
        ['die Kartenzahlung', 'card payment'], ['möglich', 'possible']],
      q: [
        { q: 'Bis wann gibt es Frühstück?', o: ['Bis 11:30 Uhr', 'Bis 12 Uhr', 'Den ganzen Tag'], a: 0, ex: '„Frühstück (von 8 bis 11:30 Uhr)“' },
        { q: 'Was kostet ein großes Frühstück?', o: ['5,90 €', '9,80 €', '11,50 €'], a: 2, ex: '„Großes Frühstück: … – 11,50 €“' },
        { q: 'Sie essen kein Fleisch. Was passt?', o: ['Schnitzel mit Pommes', 'Das große Frühstück', 'Spaghetti mit Gemüse'], a: 2, ex: 'Schnitzel is meat and the big breakfast has „Wurst“; „Spaghetti mit Gemüse“ has no meat.' },
        { q: 'Wann ist das Café geschlossen?', o: ['Am Sonntag', 'Am Montag', 'Am Freitag'], a: 1, ex: '„Montag Ruhetag.“' },
        { q: 'Sie trinken nur einen Kaffee (2,90 €). Können Sie mit Karte bezahlen?', o: ['Ja, immer.', 'Nein, erst ab 10 Euro.', 'Nur am Wochenende.'], a: 1, ex: '„Kartenzahlung ab 10 Euro möglich.“' }],
      task: 'You are at Café Sonnenschein with a friend. Write what you both order and how much it costs.' },

    { id: 'a1-aushang-buslinie', level: 'A1', icon: '🚌', type: 'info', title: 'Information: Buslinie 12', en: 'Notice: bus route 12', minutes: 3,
      text: 'Wichtige Information für unsere Fahrgäste\n\n' +
        'Buslinie 12: Bahnhof – Rathaus – Krankenhaus – Uni\n\n' +
        'Vom 3. bis 14. März ist die Goethestraße eine Baustelle. Die Haltestelle „Rathaus“ ist in dieser Zeit geschlossen. Bitte benutzen Sie die Haltestelle „Marktplatz“. Sie ist nur 200 Meter entfernt.\n\n' +
        'Abfahrt am Bahnhof, Montag bis Freitag:\n6:10 – 6:40 – 7:10 – 7:30 – 7:50 Uhr, dann alle 20 Minuten bis 19:10 Uhr. Danach fährt der Bus alle 30 Minuten. Der letzte Bus fährt um 23:40 Uhr.\n\n' +
        'Samstag und Sonntag: alle 30 Minuten von 7:10 bis 23:10 Uhr.\n\n' +
        'Fahrkarten bekommen Sie am Automaten oder in der App. Im Bus können Sie nicht mehr bar bezahlen.\n\n' +
        'Fragen? Rufen Sie uns an: Montag bis Samstag von 7 bis 20 Uhr.\n\n' +
        'Wir danken für Ihr Verständnis!\nIhre Stadtwerke',
      words: [['der Fahrgast', 'passenger'], ['die Buslinie', 'bus route'], ['das Rathaus', 'town hall'], ['das Krankenhaus', 'hospital'], ['die Baustelle', 'roadworks, building site'],
        ['die Haltestelle', 'stop (bus/tram)'], ['geschlossen', 'closed'], ['benutzen', 'to use'], ['entfernt', 'away (distance)'], ['die Abfahrt', 'departure'],
        ['alle 20 Minuten', 'every 20 minutes'], ['letzte', 'last'], ['die Fahrkarte', 'ticket'], ['der Automat', 'ticket machine'], ['bar bezahlen', 'to pay cash'], ['das Verständnis', 'understanding']],
      q: [
        { q: 'Warum ist die Haltestelle „Rathaus“ geschlossen?', o: ['Es gibt eine Baustelle.', 'Der Bus ist kaputt.', 'Es ist Wochenende.'], a: 0, ex: '„Vom 3. bis 14. März ist die Goethestraße eine Baustelle.“' },
        { q: 'Welche Haltestelle sollen die Fahrgäste benutzen?', o: ['Uni', 'Krankenhaus', 'Marktplatz'], a: 2, ex: '„Bitte benutzen Sie die Haltestelle „Marktplatz“.“' },
        { q: 'Wie oft fährt der Bus am Samstag?', o: ['Alle 20 Minuten', 'Alle 30 Minuten', 'Jede Stunde'], a: 1, ex: '„Samstag und Sonntag: alle 30 Minuten …“' },
        { q: 'Wann fährt der letzte Bus von Montag bis Freitag?', o: ['Um 19:10 Uhr', 'Um 23:10 Uhr', 'Um 23:40 Uhr'], a: 2, ex: '„Der letzte Bus fährt um 23:40 Uhr.“' },
        { q: 'Was ist richtig?', o: ['Man kann im Bus bar bezahlen.', 'Fahrkarten gibt es am Automaten oder in der App.', 'Die Haltestelle „Marktplatz“ ist zwei Kilometer entfernt.'], a: 1, ex: '„Fahrkarten bekommen Sie am Automaten oder in der App.“' }],
      task: 'Describe how you get to work, school or the course: which bus or train, when it leaves and how long it takes.' },

    /* ---------- A2 ---------- */
    { id: 'a2-erster-arbeitstag', level: 'A2', icon: '🩺', type: 'blog', title: 'Mein erster Arbeitstag', en: 'My first day at work', minutes: 4,
      text: 'Gestern war mein erster Arbeitstag im Klinikum in Stuttgart. Ich heiße Zainab, komme aus Lahore in Pakistan und bin Pflegefachkraft. Ich war sehr nervös, weil ich Angst hatte, dass mein Deutsch nicht gut genug ist.\n\n' +
        'Ich bin schon um sechs Uhr aufgestanden, weil mein Dienst um sieben angefangen hat. Am Eingang hat mich meine Kollegin Frau Hahn abgeholt. Sie hat mir die Station gezeigt: die Zimmer der Patienten, das Büro, die Küche und den Pausenraum. Dann habe ich meine Arbeitskleidung und einen Schlüssel für meinen Spind bekommen.\n\n' +
        'Am Vormittag habe ich mit Frau Hahn zusammen gearbeitet. Wir haben Blutdruck gemessen und Medikamente verteilt. Ein alter Patient, Herr Krüger, hat gefragt: „Woher kommen Sie denn?“ Wir haben ein bisschen über Pakistan gesprochen. Er hat erzählt, dass er als junger Mann in Karatschi war! Die Welt ist klein.\n\n' +
        'Die Mittagspause war kurz, nur dreißig Minuten. In der Kantine habe ich die anderen Kollegen kennengelernt. Alle waren sehr freundlich.\n\n' +
        'Um halb vier war mein Dienst zu Ende. Ich war total müde, aber auch glücklich. Mein Deutsch war gar nicht so schlecht – nur die vielen Abkürzungen auf der Station verstehe ich noch nicht!',
      words: [['der Arbeitstag', 'working day'], ['die Pflegefachkraft', 'qualified nurse / carer'], ['nervös', 'nervous'], ['der Dienst', 'shift, duty'], ['die Kollegin', 'colleague (female)'],
        ['die Station', 'ward'], ['zeigen', 'to show'], ['der Patient', 'patient'], ['der Pausenraum', 'break room'], ['die Arbeitskleidung', 'work clothes'],
        ['der Schlüssel', 'key'], ['der Spind', 'locker'], ['den Blutdruck messen', 'to take blood pressure'], ['das Medikament', 'medicine'], ['verteilen', 'to hand out'],
        ['die Kantine', 'canteen'], ['kennenlernen', 'to get to know, to meet'], ['die Abkürzung', 'abbreviation']],
      q: [
        { q: 'Warum war Zainab nervös?', o: ['Sie hatte Angst, dass ihr Deutsch nicht gut genug ist.', 'Sie hat den Weg nicht gefunden.', 'Sie hatte keine Arbeitskleidung.'], a: 0, ex: '„Ich war sehr nervös, weil ich Angst hatte, dass mein Deutsch nicht gut genug ist.“' },
        { q: 'Wann hat ihr Dienst angefangen?', o: ['Um sechs Uhr', 'Um sieben Uhr', 'Um halb vier'], a: 1, ex: '„… weil mein Dienst um sieben angefangen hat.“ At six she got up.' },
        { q: 'Was hat Zainab am Vormittag gemacht?', o: ['Sie hat in der Küche gekocht.', 'Sie hat im Büro telefoniert.', 'Sie hat Blutdruck gemessen und Medikamente verteilt.'], a: 2, ex: '„Wir haben Blutdruck gemessen und Medikamente verteilt.“' },
        { q: 'Was ist an Herrn Krüger interessant?', o: ['Er kommt aus Pakistan.', 'Er war früher in Karatschi.', 'Er ist Arzt.'], a: 1, ex: '„Er hat erzählt, dass er als junger Mann in Karatschi war!“' },
        { q: 'Was versteht Zainab noch nicht?', o: ['Die Abkürzungen auf der Station', 'Die Patienten', 'Ihre Kollegin'], a: 0, ex: '„… nur die vielen Abkürzungen auf der Station verstehe ich noch nicht!“' }],
      task: 'Write about your first day at a new job, school or course: what happened and how did you feel?' },

    { id: 'a2-beim-arzt', level: 'A2', icon: '🤒', type: 'story', title: 'Beim Hausarzt', en: 'At the GP', minutes: 4,
      text: 'Am Montagmorgen ist Olumide aufgewacht und hatte starke Halsschmerzen. Er hatte auch Fieber und Kopfschmerzen. So konnte er nicht arbeiten. Zuerst hat er seinen Chef angerufen und gesagt, dass er krank ist. Dann hat er bei seinem Hausarzt angerufen. Die Sprechstundenhilfe hat gesagt: „Kommen Sie um halb elf. Bringen Sie bitte Ihre Versichertenkarte mit.“\n\n' +
        'In der Praxis hat Olumide fast eine Stunde im Wartezimmer gewartet, weil viele Leute krank waren. Endlich hat Dr. Neumann ihn aufgerufen. Er hat in den Hals geschaut und Fieber gemessen: 38,9 Grad.\n\n' +
        '„Sie haben eine Mandelentzündung“, hat der Arzt gesagt. „Ich verschreibe Ihnen ein Antibiotikum. Nehmen Sie die Tabletten dreimal am Tag nach dem Essen, sieben Tage lang. Trinken Sie viel und bleiben Sie im Bett.“\n\n' +
        'Olumide hat auch eine Krankmeldung für fünf Tage bekommen. Die Praxis schickt sie heute elektronisch an die Krankenkasse.\n\n' +
        'In der Apotheke hat Olumide die Tabletten geholt. Zu Hause hat er Tee mit Honig getrunken und eine Serie geschaut. Nach drei Tagen ging es ihm schon viel besser. „Aber die Tabletten nehme ich trotzdem weiter“, hat er gesagt, „so wie der Arzt es gesagt hat.“',
      words: [['die Halsschmerzen', 'sore throat'], ['das Fieber', 'fever, temperature'], ['die Kopfschmerzen', 'headache'], ['krank', 'ill, sick'], ['der Hausarzt', 'GP, family doctor'],
        ['die Sprechstundenhilfe', 'doctor’s receptionist'], ['die Versichertenkarte', 'health insurance card'], ['die Praxis', 'doctor’s surgery'], ['das Wartezimmer', 'waiting room'], ['die Mandelentzündung', 'tonsillitis'],
        ['verschreiben', 'to prescribe'], ['das Antibiotikum', 'antibiotic'], ['die Tablette', 'tablet, pill'], ['die Krankmeldung', 'sick note'], ['die Krankenkasse', 'health insurance company'],
        ['die Apotheke', 'pharmacy'], ['trotzdem', 'anyway, nevertheless']],
      q: [
        { q: 'Was hat Olumide zuerst gemacht?', o: ['Er hat seinen Chef angerufen.', 'Er ist in die Apotheke gegangen.', 'Er hat Tee getrunken.'], a: 0, ex: '„Zuerst hat er seinen Chef angerufen und gesagt, dass er krank ist.“' },
        { q: 'Warum hat Olumide so lange gewartet?', o: ['Der Arzt war zu spät.', 'Viele Leute waren krank.', 'Er hatte keinen Termin.'], a: 1, ex: '„… fast eine Stunde im Wartezimmer gewartet, weil viele Leute krank waren.“' },
        { q: 'Wie oft soll er die Tabletten nehmen?', o: ['Einmal am Tag', 'Zweimal am Tag', 'Dreimal am Tag'], a: 2, ex: '„Nehmen Sie die Tabletten dreimal am Tag nach dem Essen …“' },
        { q: 'Wie bekommt die Krankenkasse die Krankmeldung?', o: ['Olumide bringt sie hin.', 'Die Praxis schickt sie elektronisch.', 'Der Chef schickt sie per Post.'], a: 1, ex: '„Die Praxis schickt sie heute elektronisch an die Krankenkasse.“' },
        { q: 'Warum nimmt Olumide die Tabletten nach drei Tagen weiter?', o: ['Weil der Arzt es so gesagt hat.', 'Weil er noch Fieber hat.', 'Weil sie gut schmecken.'], a: 0, ex: '„… nehme ich trotzdem weiter, so wie der Arzt es gesagt hat.“' }],
      task: 'Write about the last time you were ill: what did you have, what did you do and who helped you?' },

    { id: 'a2-umzug', level: 'A2', icon: '📦', type: 'email', title: 'Endlich umgezogen!', en: 'Finally moved!', minutes: 4,
      text: 'Liebe Jana,\n\n' +
        'entschuldige, dass ich so lange nicht geschrieben habe! Die letzten Wochen waren total stressig, weil wir umgezogen sind. Wir wohnen jetzt nicht mehr in der kleinen Wohnung in Bochum, sondern in einer Dreizimmerwohnung in Essen. Mein Mann hat dort eine neue Stelle bekommen.\n\n' +
        'Der Umzug war ein Abenteuer. Wir haben einen Transporter gemietet, und vier Freunde haben uns geholfen. Leider hat es den ganzen Tag geregnet! Die Wohnung ist im vierten Stock, und es gibt keinen Aufzug. Am Abend konnte niemand mehr laufen. Zum Glück ist nur eine Lampe kaputtgegangen.\n\n' +
        'Dann mussten wir viele Sachen erledigen: Wir haben uns beim Bürgeramt angemeldet – das muss man innerhalb von zwei Wochen machen. Wir haben auch der Bank, der Krankenkasse und der Arbeit die neue Adresse gegeben. Und wir haben bei der Post einen Nachsendeauftrag gemacht. So kommen unsere Briefe auch an die neue Adresse.\n\n' +
        'Jetzt sind fast alle Kartons ausgepackt. Die Wohnung ist hell, und wir haben endlich einen Balkon! Die Nachbarn sind nett. Nur das Internet funktioniert noch nicht – der Techniker kommt erst nächste Woche.\n\n' +
        'Besuch uns doch bald! Wir haben jetzt ein Gästezimmer.\n\nLiebe Grüße\nSofia',
      words: [['der Umzug', 'move (house)'], ['die Stelle', 'job, position'], ['das Abenteuer', 'adventure'], ['der Transporter', 'van'], ['mieten', 'to rent, to hire'],
        ['der Aufzug', 'lift, elevator'], ['zum Glück', 'luckily'], ['kaputtgehen', 'to break'], ['erledigen', 'to take care of, to get done'], ['das Bürgeramt', 'citizens’ office (registration)'],
        ['innerhalb von', 'within'], ['die Adresse', 'address'], ['der Nachsendeauftrag', 'mail forwarding order'], ['der Karton', 'cardboard box'], ['hell', 'bright'],
        ['der Nachbar', 'neighbour'], ['funktionieren', 'to work, to function'], ['das Gästezimmer', 'guest room']],
      q: [
        { q: 'Warum ist Sofia umgezogen?', o: ['Die alte Wohnung war zu teuer.', 'Ihr Mann hat in Essen eine neue Stelle.', 'Sie wollte einen Balkon.'], a: 1, ex: '„Mein Mann hat dort eine neue Stelle bekommen.“' },
        { q: 'Wie war das Wetter am Umzugstag?', o: ['Es hat geregnet.', 'Es war sonnig.', 'Es hat geschneit.'], a: 0, ex: '„Leider hat es den ganzen Tag geregnet!“' },
        { q: 'Bis wann muss man sich beim Bürgeramt anmelden?', o: ['Innerhalb von zwei Tagen', 'Innerhalb von zwei Monaten', 'Innerhalb von zwei Wochen'], a: 2, ex: '„… das muss man innerhalb von zwei Wochen machen.“' },
        { q: 'Was ist beim Umzug kaputtgegangen?', o: ['Ein Spiegel', 'Eine Lampe', 'Nichts'], a: 1, ex: '„Zum Glück ist nur eine Lampe kaputtgegangen.“' },
        { q: 'Was funktioniert noch nicht?', o: ['Die Heizung', 'Der Aufzug', 'Das Internet'], a: 2, ex: '„Nur das Internet funktioniert noch nicht …“' }],
      task: 'Write an email to a friend about a move (real or imagined): where, why and what you had to do.' },

    { id: 'a2-urlaub-ostsee', level: 'A2', icon: '🏖️', type: 'email', title: 'Grüße von der Ostsee', en: 'Greetings from the Baltic Sea', minutes: 4,
      text: 'Hallo Lisa,\n\n' +
        'viele Grüße von der Ostsee! Ich bin seit Samstag mit meinem Mann und unserem Sohn in Warnemünde. Wir haben eine kleine Ferienwohnung gemietet, nur fünf Minuten vom Strand entfernt.\n\n' +
        'Die Anreise war leider anstrengend. Wir sind mit dem Zug gefahren, aber in Hamburg haben wir den Anschluss verpasst, weil unser ICE vierzig Minuten Verspätung hatte. Deshalb sind wir erst um elf Uhr abends angekommen.\n\n' +
        'Aber jetzt ist alles wunderbar! Das Wetter ist besser, als ich gedacht habe – meistens sonnig, aber der Wind ist ziemlich kalt. Für mich ist das Wasser zu kalt zum Schwimmen, aber Aarav war schon dreimal im Meer. Er findet das lustig.\n\n' +
        'Gestern haben wir eine Radtour nach Rostock gemacht und frischen Fisch gegessen. Ein Fischbrötchen am Hafen – das musst du probieren! Am Abend sind wir am Strand spazieren gegangen und haben den Sonnenuntergang gesehen. So romantisch!\n\n' +
        'Morgen wollen wir eine Schifffahrt machen. Am Freitag fahren wir leider schon wieder nach Hause.\n\n' +
        'Wie geht es im Büro? Ist viel los? Ich hoffe, dass Herr Wolf nicht zu viel Stress macht. 😉\n\nBis bald und liebe Grüße\nNeha',
      words: [['die Ferienwohnung', 'holiday flat'], ['der Strand', 'beach'], ['entfernt', 'away (distance)'], ['die Anreise', 'journey there'], ['anstrengend', 'exhausting'],
        ['der Anschluss', 'connection (train)'], ['verpassen', 'to miss'], ['die Verspätung', 'delay'], ['ziemlich', 'quite, rather'], ['das Meer', 'sea'],
        ['die Radtour', 'bike trip'], ['frisch', 'fresh'], ['das Fischbrötchen', 'fish sandwich (roll)'], ['der Hafen', 'harbour, port'], ['probieren', 'to try, to taste'],
        ['der Sonnenuntergang', 'sunset'], ['die Schifffahrt', 'boat trip']],
      q: [
        { q: 'Wo macht Neha Urlaub?', o: ['In den Bergen', 'An der Ostsee', 'In Hamburg'], a: 1, ex: '„… viele Grüße von der Ostsee! … in Warnemünde.“' },
        { q: 'Warum sind sie so spät angekommen?', o: ['Sie haben den Anschluss in Hamburg verpasst.', 'Das Auto war kaputt.', 'Sie hatten keine Fahrkarte.'], a: 0, ex: '„… in Hamburg haben wir den Anschluss verpasst, weil unser ICE vierzig Minuten Verspätung hatte.“' },
        { q: 'Wer war schon im Meer schwimmen?', o: ['Neha', 'Nehas Mann', 'Aarav'], a: 2, ex: '„… aber Aarav war schon dreimal im Meer.“ For Neha the water is too cold.' },
        { q: 'Was hat die Familie gestern gemacht?', o: ['Eine Schifffahrt', 'Eine Radtour nach Rostock', 'Einen Ausflug nach Hamburg'], a: 1, ex: '„Gestern haben wir eine Radtour nach Rostock gemacht …“ The boat trip is tomorrow.' },
        { q: 'Wann fahren sie nach Hause?', o: ['Am Samstag', 'Morgen', 'Am Freitag'], a: 2, ex: '„Am Freitag fahren wir leider schon wieder nach Hause.“' }],
      task: 'Write a holiday email to a colleague: where you are, what you have done and what the weather is like.' },

    { id: 'a2-rezept-linsensuppe', level: 'A2', icon: '🍲', type: 'recipe', title: 'Rote Linsensuppe', en: 'Red lentil soup', minutes: 4,
      text: 'Rote Linsensuppe – das Rezept von Leylas Oma\n\n' +
        'Leyla kommt aus Izmir und wohnt seit vier Jahren in Mannheim. „Im Winter habe ich oft Heimweh“, sagt sie. „Dann koche ich die Linsensuppe von meiner Oma. Sie ist einfach, billig und sehr gesund. Und alle Zutaten bekommt man in jedem Supermarkt in Deutschland.“\n\n' +
        'Zutaten für vier Personen:\n250 g rote Linsen, 1 Zwiebel, 1 Karotte, 1 Kartoffel, 2 Esslöffel Butter oder Öl, 1 Esslöffel Tomatenmark, 1,5 Liter Gemüsebrühe, Salz, Pfeffer, Paprikapulver, Kreuzkümmel, 1 Zitrone\n\n' +
        'Zubereitung:\n1. Die Linsen in einem Sieb gut waschen.\n2. Die Zwiebel, die Karotte und die Kartoffel schälen und klein schneiden.\n3. Die Butter in einem großen Topf heiß machen. Die Zwiebel darin etwa drei Minuten braten.\n4. Das Tomatenmark dazugeben und kurz mitbraten.\n5. Linsen, Karotte, Kartoffel und Brühe dazugeben. Alles ungefähr 25 Minuten kochen lassen, bis das Gemüse weich ist.\n6. Die Suppe pürieren und mit Salz, Pfeffer und Kreuzkümmel würzen.\n7. Mit etwas Paprikapulver und einem Stück Zitrone servieren.\n\n' +
        'Leylas Tipp: „Meine deutschen Kollegen waren skeptisch, weil die Suppe so einfach aussieht. Aber dann haben alle noch einen Teller gegessen! Dazu passt frisches Fladenbrot.“',
      words: [['das Heimweh', 'homesickness'], ['die Zutat', 'ingredient'], ['die Linse', 'lentil'], ['die Zwiebel', 'onion'], ['die Kartoffel', 'potato'],
        ['der Esslöffel', 'tablespoon'], ['die Brühe', 'stock, broth'], ['die Zubereitung', 'preparation'], ['waschen', 'to wash'], ['schälen', 'to peel'],
        ['schneiden', 'to cut'], ['der Topf', 'pot, pan'], ['braten', 'to fry'], ['dazugeben', 'to add'], ['weich', 'soft'],
        ['würzen', 'to season'], ['servieren', 'to serve'], ['skeptisch', 'sceptical']],
      q: [
        { q: 'Warum kocht Leyla die Suppe im Winter oft?', o: ['Weil sie Heimweh hat.', 'Weil sie krank ist.', 'Weil ihre Kollegen es wollen.'], a: 0, ex: '„Im Winter habe ich oft Heimweh. Dann koche ich die Linsensuppe von meiner Oma.“' },
        { q: 'Wie lange soll die Suppe kochen?', o: ['Drei Minuten', 'Ungefähr 25 Minuten', 'Eine Stunde'], a: 1, ex: '„Alles ungefähr 25 Minuten kochen lassen …“' },
        { q: 'Was macht man zuerst mit der Zwiebel?', o: ['Man püriert sie.', 'Man wäscht sie im Sieb.', 'Man schält sie und schneidet sie klein.'], a: 2, ex: 'Step 2: „Die Zwiebel … schälen und klein schneiden.“ The lentils are washed in the sieve.' },
        { q: 'Warum waren die Kollegen skeptisch?', o: ['Die Suppe war zu scharf.', 'Die Suppe sieht so einfach aus.', 'Sie mögen keine Linsen.'], a: 1, ex: '„… skeptisch, weil die Suppe so einfach aussieht.“' },
        { q: 'Was passt laut Leyla gut zur Suppe?', o: ['Reis', 'Kartoffelsalat', 'Frisches Fladenbrot'], a: 2, ex: '„Dazu passt frisches Fladenbrot.“' }],
      task: 'Write down a simple recipe from your home country: ingredients and 4–5 steps.' },

    { id: 'a2-brief-hausverwaltung', level: 'A2', icon: '✉️', type: 'letter', title: 'Ein Brief von der Hausverwaltung', en: 'A letter from the property management', minutes: 4,
      text: 'Hausverwaltung Richter GmbH\n\n' +
        'An alle Mieterinnen und Mieter im Haus Lindenallee 23\n\n' +
        'Wartung der Heizung und Ablesen der Wasserzähler\n\n' +
        'Sehr geehrte Mieterinnen und Mieter,\n\n' +
        'bald beginnt die Heizperiode. Deshalb kommt am Dienstag, dem 15. Oktober, ein Techniker ins Haus. Er prüft die Heizkörper in allen Wohnungen und liest die Wasserzähler ab. Das dauert pro Wohnung etwa 15 Minuten.\n\n' +
        'Der Techniker kommt zwischen 8 und 13 Uhr. Wenn Sie an diesem Tag nicht zu Hause sind, können Sie einem Nachbarn den Schlüssel geben. Oder Sie rufen bis Freitag, den 11. Oktober, bei uns an und vereinbaren einen neuen Termin. Bitte machen Sie den Platz vor den Heizkörpern frei.\n\n' +
        'Noch eine Bitte: In den letzten Wochen haben einige Bewohner ihren Müll nicht richtig getrennt. Papier gehört in die blaue Tonne, Verpackungen aus Plastik in die gelbe Tonne und Essensreste in die Biotonne. Außerdem dürfen Fahrräder und Kinderwagen nicht im Treppenhaus stehen, weil das bei einem Feuer gefährlich ist. Bitte stellen Sie sie in den Fahrradkeller.\n\n' +
        'Vielen Dank für Ihre Mithilfe.\n\n' +
        'Mit freundlichen Grüßen\nKarin Richter',
      words: [['die Hausverwaltung', 'property management'], ['der Mieter', 'tenant'], ['die Wartung', 'maintenance, servicing'], ['die Heizung', 'heating'], ['der Heizkörper', 'radiator'],
        ['ablesen', 'to read (a meter)'], ['der Zähler', 'meter'], ['der Techniker', 'technician'], ['prüfen', 'to check'], ['der Schlüssel', 'key'],
        ['vereinbaren', 'to arrange'], ['der Termin', 'appointment'], ['der Müll', 'rubbish, waste'], ['trennen', 'to separate'], ['die Tonne', 'bin'],
        ['die Verpackung', 'packaging'], ['das Treppenhaus', 'stairwell'], ['gefährlich', 'dangerous']],
      q: [
        { q: 'Warum kommt ein Techniker?', o: ['Die Heizung ist kaputt.', 'Er prüft die Heizkörper und liest die Wasserzähler ab.', 'Er repariert den Aufzug.'], a: 1, ex: '„Er prüft die Heizkörper in allen Wohnungen und liest die Wasserzähler ab.“' },
        { q: 'Wann kommt der Techniker?', o: ['Am 15. Oktober zwischen 8 und 13 Uhr', 'Am 11. Oktober am Nachmittag', 'Jeden Dienstag'], a: 0, ex: '„… am Dienstag, dem 15. Oktober … zwischen 8 und 13 Uhr.“' },
        { q: 'Sie sind am 15. Oktober nicht zu Hause. Was können Sie tun?', o: ['Nichts, das ist kein Problem.', 'Den Schlüssel unter die Fußmatte legen.', 'Einem Nachbarn den Schlüssel geben.'], a: 2, ex: '„… können Sie einem Nachbarn den Schlüssel geben.“' },
        { q: 'Wohin gehören Essensreste?', o: ['In die gelbe Tonne', 'In die Biotonne', 'In die blaue Tonne'], a: 1, ex: '„… und Essensreste in die Biotonne.“' },
        { q: 'Warum dürfen Fahrräder nicht im Treppenhaus stehen?', o: ['Weil sie schmutzig sind.', 'Weil die Nachbarn sich ärgern.', 'Weil das bei einem Feuer gefährlich ist.'], a: 2, ex: '„… weil das bei einem Feuer gefährlich ist.“' }],
      task: 'You cannot be at home on 15 October. Write a short email to Frau Richter and ask for a new appointment.' },

    { id: 'a2-zug-verspaetung', level: 'A2', icon: '🚆', type: 'story', title: 'Eine Zugfahrt mit Verspätung', en: 'A delayed train journey', minutes: 4,
      text: 'Am Freitag wollte Ayesha von Frankfurt nach Berlin fahren. Ihre beste Freundin Sana hat am Samstag geheiratet, und Ayesha war Trauzeugin. Sie hatte ein Sparpreis-Ticket für den ICE um 14:13 Uhr gekauft.\n\n' +
        'Am Bahnhof hat sie auf der Anzeigetafel gelesen: „ca. 30 Minuten später“. Ayesha hat einen Kaffee gekauft und gewartet. Dann kam eine Durchsage: „Wegen einer Störung am Stellwerk hat der Zug etwa 70 Minuten Verspätung. Wir bitten um Entschuldigung.“\n\n' +
        'Ayesha hat sofort die App der Bahn geöffnet. Dort hat sie gelesen, dass die Zugbindung aufgehoben ist, wenn ein Zug mindestens 20 Minuten Verspätung hat. Das heißt: Sie durfte auch einen anderen Zug nehmen. Also ist sie in den ICE um 15:13 Uhr eingestiegen. Der Zug war sehr voll, und sie musste eine Stunde im Gang stehen. Erst in Erfurt hat sie einen Sitzplatz gefunden.\n\n' +
        'In Berlin ist sie mit über einer Stunde Verspätung angekommen. Am Abend hat sie online ein Formular für die Fahrgastrechte ausgefüllt. Bei 60 Minuten Verspätung bekommt man 25 Prozent vom Fahrpreis zurück.\n\n' +
        'Und die Hochzeit? Die war wunderschön. Ayesha hat eine Rede gehalten, und am Ende hat sie gesagt: „Liebe Sana, ich wünsche dir eine Ehe ohne Verspätung!“ Alle haben gelacht.',
      words: [['heiraten', 'to get married'], ['die Trauzeugin', 'witness at a wedding (female)'], ['der Sparpreis', 'saver fare'], ['die Anzeigetafel', 'departure board'], ['die Durchsage', 'announcement'],
        ['die Störung', 'fault, disruption'], ['die Verspätung', 'delay'], ['die Entschuldigung', 'apology'], ['die Zugbindung', 'restriction to a specific train'], ['voll', 'full, crowded'],
        ['der Gang', 'aisle'], ['der Sitzplatz', 'seat'], ['das Formular', 'form'], ['die Fahrgastrechte', 'passenger rights'], ['der Fahrpreis', 'fare'],
        ['die Hochzeit', 'wedding'], ['die Rede', 'speech'], ['wünschen', 'to wish']],
      q: [
        { q: 'Warum ist Ayesha nach Berlin gefahren?', o: ['Sie hatte ein Vorstellungsgespräch.', 'Ihre beste Freundin hat geheiratet.', 'Sie wollte Urlaub machen.'], a: 1, ex: '„Ihre beste Freundin Sana hat am Samstag geheiratet, und Ayesha war Trauzeugin.“' },
        { q: 'Warum hatte der Zug Verspätung?', o: ['Wegen einer Störung am Stellwerk', 'Wegen eines Streiks', 'Wegen Schnee'], a: 0, ex: '„Wegen einer Störung am Stellwerk hat der Zug etwa 70 Minuten Verspätung.“' },
        { q: 'Warum durfte Ayesha einen anderen Zug nehmen?', o: ['Sie hatte ein teures Ticket.', 'Der Schaffner hat es ihr am Telefon erlaubt.', 'Die Zugbindung war wegen der Verspätung aufgehoben.'], a: 2, ex: '„… dass die Zugbindung aufgehoben ist, wenn ein Zug mindestens 20 Minuten Verspätung hat.“' },
        { q: 'Wie viel Geld bekommt man bei 60 Minuten Verspätung zurück?', o: ['10 Prozent', '50 Prozent', '25 Prozent'], a: 2, ex: '„Bei 60 Minuten Verspätung bekommt man 25 Prozent vom Fahrpreis zurück.“' },
        { q: 'Was hat Ayesha in ihrer Rede gewünscht?', o: ['Eine Ehe ohne Verspätung', 'Viele Kinder', 'Eine schöne Reise'], a: 0, ex: '„… ich wünsche dir eine Ehe ohne Verspätung!“' }],
      task: 'Write about a journey that went wrong: what happened, what did you do and how did it end?' },

    { id: 'a2-neue-nachbarn', level: 'A2', icon: '🍪', type: 'story', title: 'Die neuen Nachbarn', en: 'The new neighbours', minutes: 4,
      text: 'Frau Vogel ist 78 Jahre alt und wohnt seit über vierzig Jahren im selben Haus in Kassel. Im Juni ist in die Wohnung neben ihr eine neue Familie eingezogen: Hamza, seine Frau Rana und ihre zwei Kinder. Sie kommen aus Aleppo in Syrien.\n\n' +
        'Am Anfang war Frau Vogel skeptisch. Die Kinder waren laut, und die Familie hatte oft Besuch. „Hoffentlich wird das nicht zu anstrengend“, hat sie gedacht.\n\n' +
        'Eine Woche später hat es an ihrer Tür geklingelt. Hamza stand mit einem Teller vor der Tür. „Guten Tag, Frau Vogel. Wir sind die neuen Nachbarn. Meine Frau hat Maamoul gebacken – das sind Kekse mit Datteln. Möchten Sie probieren?“ Frau Vogel hat sich sehr gefreut und die Familie zum Kaffee eingeladen.\n\n' +
        'Seitdem ist viel passiert. Frau Vogel hilft den Kindern bei den Hausaufgaben, weil sie früher Lehrerin war. Hamza trägt ihre schweren Einkaufstaschen in den dritten Stock, und Rana bringt manchmal Essen vorbei. Im Winter war Frau Vogel krank. Da ist Hamza für sie zur Apotheke gegangen.\n\n' +
        'Letzten Sonntag haben sie zusammen Geburtstag gefeiert: Frau Vogel ist 79 geworden. Die Kinder haben ein Bild gemalt: Frau Vogel mit einer Krone. Darauf stand: „Für unsere deutsche Oma“. Frau Vogel hat gesagt, dass das ihr schönstes Geschenk seit Jahren ist.',
      words: [['der Nachbar', 'neighbour'], ['skeptisch', 'sceptical'], ['laut', 'loud, noisy'], ['der Besuch', 'visitors, visit'], ['hoffentlich', 'hopefully'],
        ['anstrengend', 'tiring, exhausting'], ['klingeln', 'to ring (the bell)'], ['der Teller', 'plate'], ['backen', 'to bake'], ['der Keks', 'biscuit, cookie'],
        ['die Dattel', 'date (fruit)'], ['seitdem', 'since then'], ['die Hausaufgaben', 'homework'], ['schwer', 'heavy'], ['die Einkaufstasche', 'shopping bag'],
        ['die Apotheke', 'pharmacy'], ['die Krone', 'crown'], ['das Geschenk', 'present, gift']],
      q: [
        { q: 'Woher kommt Hamzas Familie?', o: ['Aus der Türkei', 'Aus Syrien', 'Aus dem Irak'], a: 1, ex: '„Sie kommen aus Aleppo in Syrien.“' },
        { q: 'Wie hat Frau Vogel am Anfang über die Familie gedacht?', o: ['Sie war skeptisch.', 'Sie war sofort begeistert.', 'Sie hatte keine Meinung.'], a: 0, ex: '„Am Anfang war Frau Vogel skeptisch.“' },
        { q: 'Was hat Hamza mitgebracht?', o: ['Blumen', 'Einen Kuchen', 'Kekse mit Datteln'], a: 2, ex: '„Meine Frau hat Maamoul gebacken – das sind Kekse mit Datteln.“' },
        { q: 'Warum hilft Frau Vogel den Kindern bei den Hausaufgaben?', o: ['Weil die Eltern keine Zeit haben.', 'Weil sie früher Lehrerin war.', 'Weil sie Arabisch spricht.'], a: 1, ex: '„… weil sie früher Lehrerin war.“' },
        { q: 'Was haben die Kinder Frau Vogel geschenkt?', o: ['Ein Bild', 'Eine echte Krone', 'Kekse'], a: 0, ex: '„Die Kinder haben ein Bild gemalt: Frau Vogel mit einer Krone.“' }],
      task: 'Write about your neighbours: who are they, how did you meet and do you help each other?' },

    { id: 'a2-stellenanzeige-bewerbung', level: 'A2', icon: '💼', type: 'ad', title: 'Stellenanzeige und Bewerbung', en: 'Job advert and application', minutes: 4,
      text: 'Bäckerei Hoffmann sucht ab sofort eine Verkäuferin / einen Verkäufer (m/w/d) in Teilzeit (25 Stunden pro Woche).\n\n' +
        'Ihre Aufgaben: Kunden beraten und bedienen, Kasse, Kaffee zubereiten, Regale auffüllen\n' +
        'Wir bieten: ein nettes Team, faire Bezahlung, jeden Tag einen kostenlosen Kaffee, Mitarbeiterrabatt\n' +
        'Sie haben: gute Deutschkenntnisse (mindestens A2), Freude am Kontakt mit Menschen, Zeit am Wochenende. Erfahrung ist schön, aber nicht nötig.\n' +
        'Arbeitszeit: Frühschicht ab 6 Uhr oder Spätschicht bis 19 Uhr\n' +
        'Bewerbung bitte per E-Mail an Herrn Hoffmann.\n\n' +
        'Betreff: Bewerbung als Verkäuferin\n\n' +
        'Sehr geehrter Herr Hoffmann,\n\n' +
        'ich habe Ihre Anzeige im Internet gelesen und interessiere mich sehr für die Stelle als Verkäuferin.\n\n' +
        'Mein Name ist Bruna Silva, ich bin 34 Jahre alt und komme aus Brasilien. Seit zwei Jahren lebe ich in Kiel. In Brasilien habe ich fünf Jahre in einem Café gearbeitet. Dort habe ich Kunden bedient, Kaffee gemacht und an der Kasse gearbeitet. Im Moment besuche ich einen Deutschkurs auf B1-Niveau.\n\n' +
        'Ich arbeite gern im Team und bin freundlich und pünktlich. Ich kann gut früh aufstehen und am Wochenende arbeiten, weil mein Mann dann bei unseren Kindern ist.\n\n' +
        'Über eine Einladung zu einem Vorstellungsgespräch freue ich mich sehr. Meinen Lebenslauf schicke ich Ihnen im Anhang.\n\n' +
        'Mit freundlichen Grüßen\nBruna Silva',
      words: [['die Teilzeit', 'part-time'], ['die Aufgabe', 'task, duty'], ['beraten', 'to advise'], ['bedienen', 'to serve'], ['die Kasse', 'till, checkout'],
        ['der Mitarbeiterrabatt', 'staff discount'], ['die Erfahrung', 'experience'], ['nötig', 'necessary'], ['die Frühschicht', 'early shift'], ['die Spätschicht', 'late shift'],
        ['die Bewerbung', 'application'], ['sich interessieren für', 'to be interested in'], ['die Stelle', 'job, position'], ['pünktlich', 'punctual'], ['das Vorstellungsgespräch', 'job interview'],
        ['der Lebenslauf', 'CV'], ['der Anhang', 'attachment']],
      q: [
        { q: 'Wie viele Stunden pro Woche arbeitet man in dieser Stelle?', o: ['40 Stunden', '25 Stunden', '10 Stunden'], a: 1, ex: '„… in Teilzeit (25 Stunden pro Woche).“' },
        { q: 'Was ist für die Stelle nicht nötig?', o: ['Erfahrung', 'Deutschkenntnisse', 'Zeit am Wochenende'], a: 0, ex: '„Erfahrung ist schön, aber nicht nötig.“' },
        { q: 'Wo hat Bruna früher gearbeitet?', o: ['In einer Bäckerei in Kiel', 'In einem Supermarkt', 'In einem Café in Brasilien'], a: 2, ex: '„In Brasilien habe ich fünf Jahre in einem Café gearbeitet.“' },
        { q: 'Warum kann Bruna am Wochenende arbeiten?', o: ['Ihre Kinder sind in der Kita.', 'Ihr Mann ist dann bei den Kindern.', 'Sie hat keine Kinder.'], a: 1, ex: '„… weil mein Mann dann bei unseren Kindern ist.“' },
        { q: 'Was schickt Bruna mit der E-Mail?', o: ['Ein Foto', 'Ein Zeugnis', 'Ihren Lebenslauf'], a: 2, ex: '„Meinen Lebenslauf schicke ich Ihnen im Anhang.“' }],
      task: 'Find (or imagine) a job advert and write a short application email like Bruna’s.' },

    { id: 'a2-elternbrief-kita', level: 'A2', icon: '🏮', type: 'letter', title: 'Elternbrief der Kita', en: 'Letter to parents from the nursery', minutes: 4,
      text: 'Kita Sonnenblume – Elternbrief\n\n' +
        'Liebe Eltern,\n\n' +
        'der Herbst ist da, und unsere Kinder haben in den letzten Wochen fleißig gebastelt: Jede Gruppe hat bunte Laternen gemacht. Deshalb laden wir Sie herzlich zu unserem Laternenfest ein!\n\n' +
        'Wann? Am Montag, dem 11. November, um 17 Uhr\nWo? Im Garten der Kita. Danach gehen wir zusammen durch den Park.\n\n' +
        'Zuerst singen wir Martinslieder. Dann machen wir einen Laternenumzug. Am Ende gibt es am Feuer Kinderpunsch und Weckmänner. Wer kann einen Kuchen oder Muffins mitbringen? Bitte schreiben Sie Ihren Namen auf die Liste an der Gruppentür. Für die Laternen brauchen Sie einen elektrischen Laternenstab – echte Kerzen sind nicht erlaubt. Und bitte ziehen Sie Ihr Kind warm an!\n\n' +
        'Wichtige Termine:\n– Am Freitag, dem 22. November, ist die Kita wegen einer Fortbildung geschlossen.\n– Ab dem 25. November kommt die Zahnärztin in die Kita. Wenn Ihr Kind nicht untersucht werden soll, sagen Sie bitte der Gruppenleitung Bescheid.\n\n' +
        'Noch eine Bitte: Im Moment sind viele Kinder erkältet. Wenn Ihr Kind Fieber hat, muss es zu Hause bleiben. Es darf erst wieder kommen, wenn es 24 Stunden fieberfrei ist.\n\n' +
        'Herzliche Grüße\nIhr Kita-Team',
      words: [['der Elternbrief', 'letter to parents'], ['basteln', 'to do crafts, to make'], ['die Laterne', 'lantern'], ['das Laternenfest', 'lantern festival'], ['singen', 'to sing'],
        ['der Laternenumzug', 'lantern procession'], ['mitbringen', 'to bring along'], ['der Laternenstab', 'lantern stick'], ['die Kerze', 'candle'], ['erlaubt', 'allowed'],
        ['warm anziehen', 'to dress warmly'], ['die Fortbildung', 'training course'], ['geschlossen', 'closed'], ['untersuchen', 'to examine'], ['Bescheid sagen', 'to let someone know'],
        ['erkältet', 'having a cold'], ['das Fieber', 'fever, temperature'], ['fieberfrei', 'free of fever']],
      q: [
        { q: 'Wann ist das Laternenfest?', o: ['Am 11. November um 17 Uhr', 'Am 22. November um 17 Uhr', 'Am 25. November am Vormittag'], a: 0, ex: '„Am Montag, dem 11. November, um 17 Uhr“' },
        { q: 'Was können die Eltern mitbringen?', o: ['Laternen', 'Kuchen oder Muffins', 'Kinderpunsch'], a: 1, ex: '„Wer kann einen Kuchen oder Muffins mitbringen?“' },
        { q: 'Warum ist die Kita am 22. November geschlossen?', o: ['Wegen des Laternenfests', 'Weil viele Kinder krank sind', 'Wegen einer Fortbildung'], a: 2, ex: '„… ist die Kita wegen einer Fortbildung geschlossen.“' },
        { q: 'Was ist für die Laternen nicht erlaubt?', o: ['Echte Kerzen', 'Elektrische Laternenstäbe', 'Bunte Farben'], a: 0, ex: '„… echte Kerzen sind nicht erlaubt.“' },
        { q: 'Wann darf ein Kind nach Fieber wieder in die Kita?', o: ['Am nächsten Tag', 'Wenn es 24 Stunden fieberfrei ist', 'Nach einer Woche'], a: 1, ex: '„Es darf erst wieder kommen, wenn es 24 Stunden fieberfrei ist.“' }],
      task: 'Write a short message to the Kita: your child is ill and cannot come to the Laternenfest.' },

    { id: 'a2-weihnachtsmarkt', level: 'A2', icon: '🎄', type: 'blog', title: 'Mein erster Weihnachtsmarkt', en: 'My first Christmas market', minutes: 4,
      text: 'Ich heiße Rahul. Letztes Jahr im Dezember hat mich meine Kollegin Anna zum Christkindlesmarkt in Nürnberg mitgenommen. Er ist einer der bekanntesten Weihnachtsmärkte in Deutschland. Ich komme aus Chennai in Indien. Dort ist es im Dezember fast 30 Grad warm. In Nürnberg waren es minus drei Grad! Ich habe zwei Pullover, eine dicke Jacke, eine Mütze und Handschuhe getragen.\n\n' +
        'Auf dem Markt gibt es über 150 Holzhütten. Man kann dort Weihnachtsschmuck, Kerzen, Spielzeug aus Holz und viele andere Geschenke kaufen. Überall hat es nach Zimt, gebrannten Mandeln und Bratwurst gerochen.\n\n' +
        'Anna hat gesagt: „Du musst unbedingt Glühwein probieren!“ Glühwein ist heißer Rotwein mit Gewürzen. Man bekommt ihn in einer Tasse und bezahlt dafür Pfand. Wenn man die Tasse zurückgibt, bekommt man das Geld zurück. Weil ich keinen Alkohol trinke, hatte ich Kinderpunsch. Der war auch lecker! Die Tasse habe ich behalten – als Souvenir.\n\n' +
        'Dann haben wir Nürnberger Rostbratwürste gegessen – drei kleine Würstchen in einem Brötchen. Wir haben auch Lebkuchen gekauft, ein Gebäck mit Honig und Gewürzen.\n\n' +
        'Es war kalt und sehr voll, aber die Stimmung war wunderbar. Dieses Jahr gehe ich wieder hin – und diesmal mit meinen Eltern. Sie kommen zu Besuch aus Indien. Hoffentlich frieren sie nicht zu sehr!',
      words: [['der Weihnachtsmarkt', 'Christmas market'], ['bekannt', 'famous, well-known'], ['die Mütze', 'woolly hat'], ['der Handschuh', 'glove'], ['die Holzhütte', 'wooden hut, stall'],
        ['der Weihnachtsschmuck', 'Christmas decorations'], ['die Kerze', 'candle'], ['das Spielzeug', 'toy(s)'], ['der Zimt', 'cinnamon'], ['die Mandel', 'almond'],
        ['der Glühwein', 'mulled wine'], ['das Gewürz', 'spice'], ['das Pfand', 'deposit'], ['behalten', 'to keep'], ['der Lebkuchen', 'gingerbread'],
        ['die Stimmung', 'atmosphere, mood'], ['frieren', 'to be cold, to freeze']],
      q: [
        { q: 'Wer hat Rahul zum Weihnachtsmarkt mitgenommen?', o: ['Seine Eltern', 'Seine Kollegin Anna', 'Sein Nachbar'], a: 1, ex: '„… hat mich meine Kollegin Anna zum Christkindlesmarkt in Nürnberg mitgenommen.“' },
        { q: 'Wie war das Wetter in Nürnberg?', o: ['Minus drei Grad', 'Fast 30 Grad', 'Plus zehn Grad'], a: 0, ex: '„In Nürnberg waren es minus drei Grad!“ 30 degrees is Chennai.' },
        { q: 'Was hat Rahul getrunken?', o: ['Glühwein', 'Bier', 'Kinderpunsch'], a: 2, ex: '„Weil ich keinen Alkohol trinke, hatte ich Kinderpunsch.“' },
        { q: 'Was passiert, wenn man die Tasse zurückgibt?', o: ['Man bekommt einen Glühwein gratis.', 'Man bekommt das Pfand zurück.', 'Nichts.'], a: 1, ex: '„Wenn man die Tasse zurückgibt, bekommt man das Geld zurück.“' },
        { q: 'Was plant Rahul für dieses Jahr?', o: ['Er fährt nach Indien.', 'Er bleibt zu Hause.', 'Er geht mit seinen Eltern auf den Weihnachtsmarkt.'], a: 2, ex: '„Dieses Jahr gehe ich wieder hin – und diesmal mit meinen Eltern.“' }],
      task: 'Write about a festival in your home country or in Germany: what did you see, eat and drink?' },

    { id: 'a2-sportverein', level: 'A2', icon: '🏐', type: 'interview', title: 'Neu im Sportverein', en: 'New at the sports club', minutes: 4,
      text: 'In unserer Serie „Neue Gesichter“ stellen wir jeden Monat ein neues Mitglied vor. Heute: Wiktoria, 29, aus unserer Volleyball-Mannschaft.\n\n' +
        'Wiktoria, seit wann bist du bei uns im TSV?\nSeit März. Ich bin vor einem Jahr aus Wrocław nach Münster gekommen, weil ich hier an der Uni arbeite. Am Anfang kannte ich niemanden. Dann hat mir eine Kollegin von eurem Verein erzählt.\n\n' +
        'Warum hast du dich für Volleyball entschieden?\nIch habe schon als Schülerin in Polen Volleyball gespielt. Das hat mir immer Spaß gemacht. Außerdem finde ich Mannschaftssport toll, weil man schnell Leute kennenlernt.\n\n' +
        'Wie oft trainierst du?\nZweimal pro Woche, dienstags und donnerstags von 19 bis 21 Uhr in der Sporthalle. Am Wochenende haben wir manchmal Spiele.\n\n' +
        'Was hat dich in Deutschland überrascht?\nDass es für fast alles einen Verein gibt! Und dass nach dem Training alle zusammen etwas trinken gehen. Da habe ich am meisten Deutsch gelernt.\n\n' +
        'Ist der Verein teuer?\nNein, gar nicht. Der Mitgliedsbeitrag für Erwachsene ist 15 Euro im Monat (2025, kann sich ändern). Und das erste Training ist kostenlos – man kann es einfach ausprobieren.\n\n' +
        'Hast du einen Tipp für andere Neue?\nJa: Geht in einen Verein! Egal ob Fußball, Schach oder Chor – so findet man am schnellsten Freunde.',
      words: [['der Verein', 'club, association'], ['das Mitglied', 'member'], ['die Mannschaft', 'team'], ['erzählen', 'to tell'], ['sich entscheiden für', 'to decide on'],
        ['Spaß machen', 'to be fun'], ['außerdem', 'besides, also'], ['kennenlernen', 'to get to know'], ['trainieren', 'to train, to practise'], ['die Sporthalle', 'sports hall'],
        ['überraschen', 'to surprise'], ['der Mitgliedsbeitrag', 'membership fee'], ['der Erwachsene', 'adult'], ['kostenlos', 'free of charge'], ['ausprobieren', 'to try out'],
        ['egal ob', 'no matter whether'], ['der Chor', 'choir']],
      q: [
        { q: 'Warum ist Wiktoria nach Münster gekommen?', o: ['Sie arbeitet an der Uni.', 'Sie studiert dort.', 'Ihr Freund wohnt dort.'], a: 0, ex: '„… weil ich hier an der Uni arbeite.“' },
        { q: 'Wie hat sie vom Verein gehört?', o: ['Im Internet', 'Von einer Kollegin', 'Von ihrem Nachbarn'], a: 1, ex: '„Dann hat mir eine Kollegin von eurem Verein erzählt.“' },
        { q: 'Wann trainiert Wiktoria?', o: ['Montags und mittwochs', 'Nur am Wochenende', 'Dienstags und donnerstags'], a: 2, ex: '„Zweimal pro Woche, dienstags und donnerstags von 19 bis 21 Uhr …“' },
        { q: 'Wo hat Wiktoria am meisten Deutsch gelernt?', o: ['Im Deutschkurs', 'Bei den Spielen am Wochenende', 'Beim Trinken nach dem Training'], a: 2, ex: '„… nach dem Training alle zusammen etwas trinken gehen. Da habe ich am meisten Deutsch gelernt.“' },
        { q: 'Was kostet das erste Training?', o: ['Nichts', '15 Euro', '5 Euro'], a: 0, ex: '„Und das erste Training ist kostenlos …“' }],
      task: 'Which club would you like to join in Germany and why? Write 5–6 sentences.' }
  );
})();
