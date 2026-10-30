/* SPEAK IN 2 MINUTES (#/fast) – the fast track for everyday German.
   12 sprints in the order you need them in real life. Each sprint teaches ONE sentence pattern
   (a frame you can fill with many words) plus the 5 phrases people use most in that situation.
   lines:  [German, English, sounds-like (English spelling, CAPS = stress)]
   pattern: frame with {x}; fill = [German, English] words that fit the gap
   listen: [what you hear, [English options], index of the right one]
   talk:   a mini role-play – ['you', German, English] lines are spoken by the learner */
(function () {
  'use strict';
  GL.fast = [
    {
      id: 'hallo', ico: '👋', color: '#ff8c42', title: 'Hallo!', en: 'Say hello & goodbye', where: 'Everywhere, every day', char: 'lena',
      lines: [
        ['Hallo!', 'Hello!', 'HAH-loh'],
        ['Guten Morgen!', 'Good morning!', 'GOO-ten MOR-gen'],
        ['Wie geht’s?', 'How are you?', 'vee GATES'],
        ['Gut, danke. Und dir?', 'Good, thanks. And you?', 'goot, DAHN-kuh. oont deer'],
        ['Tschüss, bis später!', 'Bye, see you later!', 'chooss, biss SHPAY-ter'],
      ],
      pattern: { frame: 'Guten {x}!', en: 'Good {x}!', fill: [['Morgen', 'morning'], ['Tag', 'day / afternoon'], ['Abend', 'evening']], note: 'Morning until about 11, “Tag” during the day, “Abend” from about 6 pm. At night you say „Gute Nacht“.' },
      listen: [
        ['Guten Abend!', ['Good evening!', 'Good night!', 'Good morning!'], 0],
        ['Wie geht’s?', ['What’s your name?', 'How are you?', 'Where are you?'], 1],
        ['Bis später!', ['See you later!', 'Thank you!', 'Not bad!'], 0],
      ],
      talk: [
        ['lena', 'Hallo! Wie geht’s?', 'Hi! How are you?'],
        ['you', 'Gut, danke. Und dir?', 'Good, thanks. And you?'],
        ['lena', 'Super, danke! Ich muss los. Tschüss!', 'Great, thanks! I have to go. Bye!'],
        ['you', 'Tschüss, bis später!', 'Bye, see you later!'],
      ],
    },
    {
      id: 'ich', ico: '🙋', color: '#3a86ff', title: 'Ich heiße …', en: 'Introduce yourself', where: 'Meeting new people', char: 'max',
      lines: [
        ['Ich heiße Alex.', 'My name is Alex.', 'ish HY-suh AH-lex'],
        ['Ich komme aus Pakistan.', 'I come from Pakistan.', 'ish KOM-muh ows pah-kis-TAHN'],
        ['Ich wohne in Berlin.', 'I live in Berlin.', 'ish VOH-nuh in bair-LEEN'],
        ['Und du? Wie heißt du?', 'And you? What’s your name?', 'oont doo? vee HYST doo'],
        ['Freut mich!', 'Nice to meet you!', 'froyt mish'],
      ],
      pattern: { frame: 'Ich komme aus {x}.', en: 'I come from {x}.', fill: [['Pakistan', 'Pakistan'], ['Indien', 'India'], ['Syrien', 'Syria'], ['Spanien', 'Spain'], ['Amerika', 'America']], note: 'Swap in your own country. A few take “der/die”: aus der Türkei, aus der Schweiz, aus den USA.' },
      listen: [
        ['Ich wohne in Hamburg.', ['I live in Hamburg.', 'I come from Hamburg.', 'I work in Hamburg.'], 0],
        ['Wie heißt du?', ['Where do you live?', 'How old are you?', 'What’s your name?'], 2],
        ['Freut mich!', ['Excuse me!', 'Nice to meet you!', 'Good luck!'], 1],
      ],
      talk: [
        ['max', 'Hallo, ich bin Max. Wie heißt du?', 'Hi, I’m Max. What’s your name?'],
        ['you', 'Ich heiße Alex. Freut mich!', 'My name is Alex. Nice to meet you!'],
        ['max', 'Woher kommst du?', 'Where are you from?'],
        ['you', 'Ich komme aus Pakistan.', 'I come from Pakistan.'],
        ['max', 'Cool! Und wo wohnst du?', 'Cool! And where do you live?'],
        ['you', 'Ich wohne in Berlin.', 'I live in Berlin.'],
      ],
    },
    {
      id: 'bitte', ico: '🆘', color: '#e5386d', title: 'Wie bitte?', en: 'When you don’t understand', where: 'The 5 lines that save you', char: 'weber',
      lines: [
        ['Entschuldigung!', 'Excuse me! / Sorry!', 'ent-SHOOL-dee-goong'],
        ['Ich verstehe nicht.', 'I don’t understand.', 'ish fair-SHTAY-uh nisht'],
        ['Langsamer, bitte.', 'Slower, please.', 'LAHNG-zah-mer, BIT-tuh'],
        ['Noch einmal, bitte.', 'Once more, please.', 'nokh INE-mahl, BIT-tuh'],
        ['Sprechen Sie Englisch?', 'Do you speak English?', 'SHPREKH-en zee ENG-lish'],
      ],
      pattern: { frame: '{x}, bitte.', en: '{x}, please.', fill: [['Langsamer', 'Slower'], ['Noch einmal', 'Once more'], ['Lauter', 'Louder'], ['Einen Moment', 'One moment']], note: 'Add „bitte“ to almost anything and it becomes a polite request. „Danke“ = thanks, „Bitte“ is also “you’re welcome”.' },
      listen: [
        ['Ich verstehe nicht.', ['I don’t know.', 'I don’t understand.', 'I don’t want to.'], 1],
        ['Noch einmal, bitte.', ['Once more, please.', 'One moment, please.', 'Slower, please.'], 0],
        ['Sprechen Sie Englisch?', ['Are you English?', 'Do you speak English?', 'Do you understand?'], 1],
      ],
      talk: [
        ['weber', 'Der Müll kommt immer am Donnerstag in die gelbe Tonne!', 'The rubbish always goes in the yellow bin on Thursday!'],
        ['you', 'Entschuldigung, ich verstehe nicht.', 'Sorry, I don’t understand.'],
        ['weber', 'Ah, okay. Der Müll – am Donnerstag.', 'Ah, okay. The rubbish – on Thursday.'],
        ['you', 'Langsamer, bitte. Noch einmal, bitte.', 'Slower, please. Once more, please.'],
        ['weber', 'Don-ners-tag. Kein Problem!', 'Thurs-day. No problem!'],
        ['you', 'Ah, Donnerstag! Danke schön!', 'Ah, Thursday! Thank you very much!'],
      ],
    },
    {
      id: 'moechte', ico: '☕', color: '#a0693c', title: 'Ich möchte …', en: 'Order food & drinks', where: 'Café, bakery, restaurant', char: 'yilmaz',
      lines: [
        ['Ich möchte einen Kaffee, bitte.', 'I’d like a coffee, please.', 'ish MÖSH-tuh INE-en kah-FAY, BIT-tuh'],
        ['Ein Wasser, bitte.', 'A water, please.', 'ine VAH-ser, BIT-tuh'],
        ['Zum Mitnehmen, bitte.', 'To take away, please.', 'tsoom MIT-nay-men'],
        ['Die Rechnung, bitte.', 'The bill, please.', 'dee REKH-noong, BIT-tuh'],
        ['Das war lecker!', 'That was delicious!', 'dahs vahr LECK-er'],
      ],
      pattern: { frame: 'Ich möchte {x}, bitte.', en: 'I’d like {x}, please.', fill: [['einen Kaffee', 'a coffee'], ['einen Tee', 'a tea'], ['ein Brötchen', 'a bread roll'], ['ein Stück Kuchen', 'a piece of cake'], ['eine Cola', 'a cola']], note: 'Masculine words get „einen“ (einen Kaffee), neuter „ein“ (ein Wasser), feminine „eine“ (eine Cola). Don’t worry – people understand you anyway!' },
      listen: [
        ['Zum Mitnehmen oder hier?', ['Cash or card?', 'To take away or here?', 'Big or small?'], 1],
        ['Die Rechnung, bitte.', ['The menu, please.', 'The bill, please.', 'The table, please.'], 1],
        ['Das macht vier Euro fünfzig.', ['That’s €4.50.', 'That’s €5.40.', 'That’s €14.50.'], 0],
      ],
      talk: [
        ['yilmaz', 'Guten Tag! Was möchten Sie?', 'Good afternoon! What would you like?'],
        ['you', 'Ich möchte einen Kaffee, bitte.', 'I’d like a coffee, please.'],
        ['yilmaz', 'Gern. Zum Mitnehmen oder hier?', 'Sure. To take away or here?'],
        ['you', 'Zum Mitnehmen, bitte.', 'To take away, please.'],
        ['yilmaz', 'Das macht drei Euro.', 'That’s three euros.'],
        ['you', 'Hier, bitte. Danke!', 'Here you are. Thanks!'],
      ],
    },
    {
      id: 'haben', ico: '🛒', color: '#2d6a4f', title: 'Haben Sie …?', en: 'Shopping & paying', where: 'Supermarket, shops, market', char: 'demir',
      lines: [
        ['Haben Sie Milch?', 'Do you have milk?', 'HAH-ben zee milkh'],
        ['Was kostet das?', 'How much is this?', 'vahs KOS-tet dahs'],
        ['Ich nehme das.', 'I’ll take this.', 'ish NAY-muh dahs'],
        ['Kann ich mit Karte zahlen?', 'Can I pay by card?', 'kahn ish mit KAR-tuh TSAH-len'],
        ['Eine Tüte, bitte.', 'A bag, please.', 'INE-uh TÜ-tuh, BIT-tuh'],
      ],
      pattern: { frame: 'Haben Sie {x}?', en: 'Do you have {x}?', fill: [['Milch', 'milk'], ['Brot', 'bread'], ['Eier', 'eggs'], ['Reis', 'rice'], ['das in Größe M', 'this in size M']], note: 'One question, endless shopping. „Wo finde ich …?“ = Where do I find …?' },
      listen: [
        ['Das kostet zwei Euro.', ['That costs €2.', 'That costs €12.', 'That costs €20.'], 0],
        ['Bar oder mit Karte?', ['Bag or no bag?', 'Cash or card?', 'Here or to go?'], 1],
        ['Brauchen Sie eine Tüte?', ['Do you need a bag?', 'Do you have a card?', 'Do you want a receipt?'], 0],
      ],
      talk: [
        ['you', 'Entschuldigung, haben Sie Reis?', 'Excuse me, do you have rice?'],
        ['demir', 'Ja, im Gang drei.', 'Yes, in aisle three.'],
        ['you', 'Danke! Was kostet das?', 'Thanks! How much is this?'],
        ['demir', 'Zwei Euro neunzig.', 'Two ninety.'],
        ['you', 'Ich nehme das. Kann ich mit Karte zahlen?', 'I’ll take it. Can I pay by card?'],
        ['demir', 'Ja, klar!', 'Yes, of course!'],
      ],
    },
    {
      id: 'wo', ico: '🧭', color: '#12a189', title: 'Wo ist …?', en: 'Ask for the way', where: 'Street, station, building', char: 'berg',
      lines: [
        ['Wo ist der Bahnhof?', 'Where is the train station?', 'voh ist dair BAHN-hohf'],
        ['Wo ist die Toilette?', 'Where is the toilet?', 'voh ist dee toy-LET-tuh'],
        ['Geradeaus und dann links.', 'Straight on and then left.', 'guh-RAH-duh-ows oont dahn links'],
        ['Rechts, bitte.', 'Right, please.', 'rekhts, BIT-tuh'],
        ['Ist das weit?', 'Is it far?', 'ist dahs vite'],
      ],
      pattern: { frame: 'Wo ist {x}?', en: 'Where is {x}?', fill: [['der Bahnhof', 'the station'], ['die Toilette', 'the toilet'], ['die Haltestelle', 'the bus stop'], ['der Supermarkt', 'the supermarket'], ['die Apotheke', 'the pharmacy']], note: 'Listen for the 3 key words in the answer: links (left), rechts (right), geradeaus (straight on).' },
      listen: [
        ['Gehen Sie links.', ['Go left.', 'Go right.', 'Go straight on.'], 0],
        ['Das ist nicht weit, fünf Minuten.', ['It’s far, 50 minutes.', 'It’s not far, five minutes.', 'It’s closed for five minutes.'], 1],
        ['Die Toilette ist rechts.', ['The toilet is on the left.', 'The toilet is upstairs.', 'The toilet is on the right.'], 2],
      ],
      talk: [
        ['you', 'Entschuldigung, wo ist der Bahnhof?', 'Excuse me, where is the station?'],
        ['berg', 'Geradeaus und dann rechts.', 'Straight on and then right.'],
        ['you', 'Ist das weit?', 'Is it far?'],
        ['berg', 'Nein, nur fünf Minuten zu Fuß.', 'No, only five minutes on foot.'],
        ['you', 'Vielen Dank!', 'Thank you very much!'],
      ],
    },
    {
      id: 'zahlen', ico: '🔢', color: '#9b5de5', title: 'Eins, zwei, drei', en: 'Numbers, prices & time', where: 'Prices, times, phone numbers', char: 'frank',
      lines: [
        ['eins, zwei, drei, vier, fünf', '1, 2, 3, 4, 5', 'ines, tsvy, dry, feer, fünf'],
        ['sechs, sieben, acht, neun, zehn', '6, 7, 8, 9, 10', 'zex, ZEE-ben, akht, noyn, tsayn'],
        ['Wie spät ist es?', 'What time is it?', 'vee SHPAYT ist es'],
        ['Es ist drei Uhr.', 'It’s three o’clock.', 'es ist dry oor'],
        ['Um wie viel Uhr?', 'At what time?', 'oom vee feel oor'],
      ],
      pattern: { frame: 'Es ist {x} Uhr.', en: 'It’s {x} o’clock.', fill: [['eins', 'one'], ['vier', 'four'], ['sieben', 'seven'], ['zehn', 'ten'], ['zwölf', 'twelve']], note: 'Big trick: 21 = einundzwanzig – “one-and-twenty”. The small number comes first!' },
      listen: [
        ['Es ist acht Uhr.', ['It’s 6 o’clock.', 'It’s 8 o’clock.', 'It’s 10 o’clock.'], 1],
        ['Der Zug kommt um neun Uhr.', ['The train comes at 9.', 'The train comes at 5.', 'The train is 9 minutes late.'], 0],
        ['Das kostet fünfundzwanzig Euro.', ['€52', '€25', '€15'], 1],
      ],
      talk: [
        ['you', 'Entschuldigung, wie spät ist es?', 'Excuse me, what time is it?'],
        ['frank', 'Es ist zehn Uhr.', 'It’s ten o’clock.'],
        ['you', 'Und der Zug nach München? Um wie viel Uhr?', 'And the train to Munich? At what time?'],
        ['frank', 'Um elf Uhr, Gleis sieben.', 'At eleven, platform seven.'],
        ['you', 'Elf Uhr, Gleis sieben. Danke!', 'Eleven, platform seven. Thanks!'],
      ],
    },
    {
      id: 'kann', ico: '🙏', color: '#1d3557', title: 'Kann ich …?', en: 'Ask for things politely', where: 'Office, shop, friends', char: 'hoffmann',
      lines: [
        ['Kann ich hier sitzen?', 'Can I sit here?', 'kahn ish heer ZIT-sen'],
        ['Können Sie mir helfen?', 'Can you help me?', 'KÖN-nen zee meer HEL-fen'],
        ['Kann ich bitte bezahlen?', 'Can I pay, please?', 'kahn ish BIT-tuh buh-TSAH-len'],
        ['Natürlich!', 'Of course!', 'nah-TÜR-likh'],
        ['Leider nicht.', 'Unfortunately not.', 'LY-der nisht'],
      ],
      pattern: { frame: 'Kann ich {x}?', en: 'Can I {x}?', fill: [['hier sitzen', 'sit here'], ['das probieren', 'try this'], ['einen Termin haben', 'have an appointment'], ['mit Karte zahlen', 'pay by card'], ['das Fenster öffnen', 'open the window']], note: 'Golden rule: „kann“ goes 2nd, the action word goes to the very END. Kann ich … sitzen?' },
      listen: [
        ['Können Sie mir helfen?', ['Can you help me?', 'Can I help you?', 'Can you hear me?'], 0],
        ['Leider nicht.', ['Not yet.', 'Unfortunately not.', 'Not bad.'], 1],
        ['Natürlich, kein Problem.', ['Of course, no problem.', 'Naturally, it’s a problem.', 'Maybe later.'], 0],
      ],
      talk: [
        ['you', 'Guten Tag. Können Sie mir helfen?', 'Good afternoon. Can you help me?'],
        ['hoffmann', 'Natürlich. Was brauchen Sie?', 'Of course. What do you need?'],
        ['you', 'Kann ich einen Termin haben?', 'Can I have an appointment?'],
        ['hoffmann', 'Ja. Am Montag um neun Uhr?', 'Yes. On Monday at nine?'],
        ['you', 'Ja, das passt. Danke!', 'Yes, that works. Thanks!'],
      ],
    },
    {
      id: 'arzt', ico: '🩺', color: '#d00000', title: 'Mir geht’s nicht gut', en: 'Doctor & emergencies', where: 'Doctor, pharmacy, 112', char: 'braun',
      lines: [
        ['Mir geht es nicht gut.', 'I don’t feel well.', 'meer gate es nisht goot'],
        ['Ich habe Kopfschmerzen.', 'I have a headache.', 'ish HAH-buh KOPF-shmair-tsen'],
        ['Ich brauche einen Arzt.', 'I need a doctor.', 'ish BROW-khuh INE-en artst'],
        ['Hilfe!', 'Help!', 'HIL-fuh'],
        ['Rufen Sie bitte 112!', 'Please call 112!', 'ROO-fen zee BIT-tuh ines-ines-tsvy'],
      ],
      pattern: { frame: 'Ich habe {x}.', en: 'I have {x}.', fill: [['Kopfschmerzen', 'a headache'], ['Bauchschmerzen', 'a stomach ache'], ['Fieber', 'a fever'], ['Husten', 'a cough'], ['Halsschmerzen', 'a sore throat']], note: 'Body part + „schmerzen“ = pain: Kopf (head), Bauch (belly), Hals (throat), Rücken (back). 112 = ambulance & fire.' },
      listen: [
        ['Was fehlt Ihnen?', ['What’s wrong with you?', 'What’s your name?', 'What do you need?'], 0],
        ['Haben Sie Fieber?', ['Do you have a cough?', 'Do you have a fever?', 'Do you have pain?'], 1],
        ['Nehmen Sie die Tabletten dreimal am Tag.', ['Take the pills three times a day.', 'Take three pills now.', 'Take the pills for three days.'], 0],
      ],
      talk: [
        ['braun', 'Guten Tag. Was fehlt Ihnen?', 'Hello. What’s wrong?'],
        ['you', 'Mir geht es nicht gut. Ich habe Kopfschmerzen.', 'I don’t feel well. I have a headache.'],
        ['braun', 'Haben Sie auch Fieber?', 'Do you also have a fever?'],
        ['you', 'Ja, ich habe Fieber.', 'Yes, I have a fever.'],
        ['braun', 'Okay. Bleiben Sie zwei Tage im Bett.', 'Okay. Stay in bed for two days.'],
        ['you', 'Danke, Herr Doktor.', 'Thank you, doctor.'],
      ],
    },
    {
      id: 'gern', ico: '😊', color: '#f4a300', title: 'Ich … gern', en: 'Small talk: work & hobbies', where: 'Colleagues, neighbours, friends', char: 'wagner',
      lines: [
        ['Was machst du beruflich?', 'What do you do for work?', 'vahs MAKHST doo buh-ROOF-likh'],
        ['Ich arbeite als Koch.', 'I work as a cook.', 'ish AR-by-tuh ahls kokh'],
        ['Was machst du gern?', 'What do you like doing?', 'vahs makhst doo gairn'],
        ['Ich spiele gern Fußball.', 'I like playing football.', 'ish SHPEE-luh gairn FOOS-bahl'],
        ['Das ist toll!', 'That’s great!', 'dahs ist toll'],
      ],
      pattern: { frame: 'Ich {x} gern.', en: 'I like {x}.', fill: [['koche', 'cooking'], ['lese', 'reading'], ['reise', 'travelling'], ['spiele Fußball', 'playing football'], ['höre Musik', 'listening to music']], note: 'Say what you do + „gern“ = you like doing it. „nicht gern“ = you don’t like it. Ich koche nicht gern.' },
      listen: [
        ['Ich arbeite als Ingenieur.', ['I work as an engineer.', 'I’m studying engineering.', 'I’m looking for work.'], 0],
        ['Ich lese gern.', ['I like reading.', 'I read a lot.', 'I don’t like reading.'], 0],
        ['Ich koche nicht gern.', ['I like cooking.', 'I don’t like cooking.', 'I can’t cook.'], 1],
      ],
      talk: [
        ['wagner', 'Was machst du beruflich?', 'What do you do for work?'],
        ['you', 'Ich arbeite als Koch. Und du?', 'I work as a cook. And you?'],
        ['wagner', 'Ich bin Lehrer. Was machst du gern in der Freizeit?', 'I’m a teacher. What do you like doing in your free time?'],
        ['you', 'Ich spiele gern Fußball.', 'I like playing football.'],
        ['wagner', 'Ich auch! Das ist toll!', 'Me too! That’s great!'],
      ],
    },
    {
      id: 'gestern', ico: '⏪', color: '#577590', title: 'Ich habe … gemacht', en: 'Talk about yesterday', where: 'Monday at work, catching up', char: 'jonas',
      lines: [
        ['Was hast du gestern gemacht?', 'What did you do yesterday?', 'vahs hahst doo GES-tern guh-MAKHT'],
        ['Ich habe gearbeitet.', 'I worked.', 'ish HAH-buh guh-AR-by-tet'],
        ['Ich war zu Hause.', 'I was at home.', 'ish vahr tsoo HOW-zuh'],
        ['Ich habe einen Film gesehen.', 'I watched a film.', 'ish HAH-buh INE-en film guh-ZAY-en'],
        ['Es war schön.', 'It was nice.', 'es vahr shön'],
      ],
      pattern: { frame: 'Ich habe {x}.', en: 'I {x}.', fill: [['gearbeitet', 'worked'], ['gekocht', 'cooked'], ['Deutsch gelernt', 'learned German'], ['Freunde getroffen', 'met friends'], ['lange geschlafen', 'slept in']], note: 'The past in 1 trick: „Ich habe“ + ge…t at the END. gearbeitet, gekocht, gelernt. Movement uses „bin“: Ich bin gefahren.' },
      listen: [
        ['Ich habe gekocht.', ['I’m cooking.', 'I cooked.', 'I will cook.'], 1],
        ['Wir waren im Kino.', ['We were at the cinema.', 'We are going to the cinema.', 'We were at home.'], 0],
        ['Es war langweilig.', ['It was great.', 'It was long.', 'It was boring.'], 2],
      ],
      talk: [
        ['jonas', 'Morgen! Was hast du am Wochenende gemacht?', 'Morning! What did you do at the weekend?'],
        ['you', 'Ich war zu Hause. Ich habe einen Film gesehen.', 'I was at home. I watched a film.'],
        ['jonas', 'Und wie war er?', 'And how was it?'],
        ['you', 'Es war schön. Und du?', 'It was nice. And you?'],
        ['jonas', 'Ich habe Freunde getroffen.', 'I met friends.'],
      ],
    },
    {
      id: 'wollen', ico: '📅', color: '#c1121f', title: 'Wollen wir …?', en: 'Make plans', where: 'Friends, dates, colleagues', char: 'sofia',
      lines: [
        ['Hast du heute Zeit?', 'Do you have time today?', 'hahst doo HOY-tuh tsite'],
        ['Wollen wir ins Kino gehen?', 'Shall we go to the cinema?', 'VOL-len veer ins KEE-noh GAY-en'],
        ['Gern! Wann?', 'Gladly! When?', 'gairn! vahn'],
        ['Um sieben Uhr?', 'At seven?', 'oom ZEE-ben oor'],
        ['Leider kann ich nicht.', 'Sorry, I can’t.', 'LY-der kahn ish nisht'],
      ],
      pattern: { frame: 'Wollen wir {x}?', en: 'Shall we {x}?', fill: [['ins Kino gehen', 'go to the cinema'], ['Kaffee trinken', 'have a coffee'], ['zusammen kochen', 'cook together'], ['spazieren gehen', 'go for a walk'], ['morgen telefonieren', 'talk on the phone tomorrow']], note: 'Same rule as „kann“: „wollen“ 2nd, the action at the END. Answer: „Gern!“ (yes!) or „Leider nicht.“ (sorry, no).' },
      listen: [
        ['Hast du am Samstag Zeit?', ['Are you free on Saturday?', 'Is it Saturday?', 'Do you work on Saturday?'], 0],
        ['Leider kann ich nicht.', ['I’d love to.', 'Sorry, I can’t.', 'I don’t know.'], 1],
        ['Treffen wir uns um acht?', ['Shall we meet at eight?', 'Shall we eat at eight?', 'We met at eight.'], 0],
      ],
      talk: [
        ['sofia', 'Hey! Hast du heute Zeit?', 'Hey! Do you have time today?'],
        ['you', 'Ja! Wollen wir ins Kino gehen?', 'Yes! Shall we go to the cinema?'],
        ['sofia', 'Gern! Wann?', 'I’d love to! When?'],
        ['you', 'Um sieben Uhr?', 'At seven?'],
        ['sofia', 'Perfekt. Bis später!', 'Perfect. See you later!'],
        ['you', 'Bis später!', 'See you later!'],
      ],
    },
  ];
})();
