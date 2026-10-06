/* Grammar topics – Weeks 1 & 2 (Days 1–14).
   Markup: {{Deutsch|English}} = example with audio, [[Deutsch]] = clickable word. */
(function () {
  'use strict';
  /* table helper: tb(headers, rows, sayColumns) */
  const tb = (head, rows, say = []) =>
    '<div class="gtable-wrap"><table class="gtable"><thead><tr>' + head.map((h) => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>' +
    rows.map((r) => '<tr>' + r.map((c, i) => '<td>' + (say.includes(i) && c && c !== '–' ? '[[' + c + ']]' : c) + '</td>').join('') + '</tr>').join('') +
    '</tbody></table></div>';
  GL.tb = tb;
  const G = (id, o) => (GL.grammar[id] = o);

  /* ===================== DAY 1 ===================== */
  G('pronouns-sein', {
    title: 'Personal pronouns & the verb “sein” (to be)', de: 'Personalpronomen und das Verb „sein“', level: 'A1', day: 1,
    summary: 'ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind',
    html: `
<p>Every German sentence needs a subject. The most common subjects are the <b>personal pronouns</b>. Learn them together with <b>sein</b> (to be) – the most important verb in German. It is irregular, so you simply memorise it.</p>
${tb(['Pronoun', 'English', 'sein', 'Example'], [
      ['ich', 'I', 'bin', '[[Ich bin Lena.]]'],
      ['du', 'you (one friend, family, child)', 'bist', '[[Du bist nett.]]'],
      ['er', 'he (also “it” for der-words)', 'ist', '[[Er ist Student.]]'],
      ['sie', 'she (also “it” for die-words)', 'ist', '[[Sie ist müde.]]'],
      ['es', 'it', 'ist', '[[Es ist gut.]]'],
      ['wir', 'we', 'sind', '[[Wir sind Freunde.]]'],
      ['ihr', 'you (several friends)', 'seid', '[[Ihr seid super.]]'],
      ['sie', 'they', 'sind', '[[Sie sind aus Spanien.]]'],
      ['Sie', 'you (formal – one or more people)', 'sind', '[[Sind Sie Frau Weber?]]'],
    ], [0, 2])}
<div class="note"><b>One word, three meanings:</b> <i>sie / Sie</i>. Look at the verb and the capital letter:<br>
[[sie ist]] = she is · [[sie sind]] = they are · [[Sie sind]] = you are (formal, always with capital S).</div>
<h3>What you use “sein” for</h3>
{{Ich bin Max.|Name: I am Max.}}
{{Ich bin Lehrerin.|Job: I am a teacher. (female)}}
{{Ich bin 25 Jahre alt.|Age: I am 25 years old.}}
{{Wir sind müde.|Feeling/state: We are tired.}}
{{Das ist Lena. Sie ist aus Berlin.|Introducing: This is Lena. She is from Berlin.}}
<div class="warn"><b>Two classic mistakes</b><br>
1. No article with jobs and nationalities: <b>Ich bin Student.</b> (not <s>ein Student</s>). <br>
2. Age uses <b>sein</b>, not haben: <b>Ich bin 30.</b> (not <s>Ich habe 30 Jahre</s>).</div>
<div class="tip">Jobs and nationalities usually have a female form with <b>-in</b>: [[der Student → die Studentin]], [[der Lehrer → die Lehrerin]], [[der Spanier → die Spanierin]].</div>
<h3>Capital letters</h3>
<p>German capitalises <b>all nouns</b> (Name, Lehrer, Tag), the formal <b>Sie/Ihnen/Ihr</b> and the first word of a sentence. <b>ich</b> is written small (unlike English “I”).</p>`,
  });

  G('du-sie', {
    title: 'du, ihr or Sie? Greetings & introductions', de: 'Duzen und Siezen · Begrüßung', level: 'A1', day: 1,
    summary: 'informal du/ihr vs formal Sie; Hallo, Guten Tag, Tschüss …',
    html: `
<p>German has two ways to say “you”. Choosing the right one is part of good grammar <i>and</i> good manners.</p>
${tb(['', 'Informal', 'Formal'], [
      ['one person', '<b>du</b> – [[Wie heißt du?]]', '<b>Sie</b> – [[Wie heißen Sie?]]'],
      ['several people', '<b>ihr</b> – [[Woher kommt ihr?]]', '<b>Sie</b> – [[Woher kommen Sie?]]'],
      ['used with', 'friends, family, children, classmates, often young people & online', 'adults you don’t know, at work, shops, officials, older people'],
      ['name', 'first name: [[Hallo, Lena!]]', 'Herr/Frau + surname: [[Guten Tag, Frau Weber!]]'],
    ])}
<div class="rule"><b>Rule of thumb:</b> when in doubt, use <b>Sie</b>. If someone offers <i>du</i> ([[Wollen wir uns duzen?]] – “Shall we say du?”), switch happily.</div>
<h3>Greetings through the day</h3>
${tb(['German', 'English', 'When'], [
      ['Hallo!', 'Hello! / Hi!', 'informal, any time'],
      ['Guten Morgen!', 'Good morning!', 'until ~11 am'],
      ['Guten Tag!', 'Good day / Hello', 'formal, daytime'],
      ['Guten Abend!', 'Good evening!', 'from ~6 pm'],
      ['Gute Nacht!', 'Good night!', 'before sleeping'],
      ['Tschüss!', 'Bye!', 'informal'],
      ['Auf Wiedersehen!', 'Goodbye!', 'formal'],
      ['Bis morgen! / Bis später!', 'See you tomorrow / later!', 'any'],
    ], [0])}
<div class="note">Regional: [[Moin!]] (North Germany), [[Servus!]] and [[Grüß Gott!]] (Bavaria & Austria), [[Grüezi!]] (Switzerland).</div>
<h3>Introducing yourself – the core sentences</h3>
{{Ich heiße Sofia.|My name is Sofia. (literally: I am called Sofia.)}}
{{Mein Name ist Sofia Romero.|My name is Sofia Romero.}}
{{Ich komme aus Spanien.|I come from Spain.}}
{{Ich wohne in Berlin.|I live in Berlin.}}
{{Ich spreche Spanisch und ein bisschen Deutsch.|I speak Spanish and a little German.}}
<h3>Asking others</h3>
${tb(['', 'du (informal)', 'Sie (formal)'], [
      ['Name?', 'Wie heißt du?', 'Wie heißen Sie?'],
      ['From?', 'Woher kommst du?', 'Woher kommen Sie?'],
      ['Live?', 'Wo wohnst du?', 'Wo wohnen Sie?'],
      ['How are you?', 'Wie geht’s dir?', 'Wie geht es Ihnen?'],
    ], [1, 2])}
{{Wie geht’s? – Gut, danke! Und dir?|How are you? – Good, thanks! And you?}}
{{Es geht. / Nicht so gut.|So-so. / Not so good.}}
<div class="tip">Ending of the verb changes with the person: <b>du</b> → <b>-st</b> (heißt, kommst, wohnst), <b>Sie</b> → <b>-en</b> (heißen, kommen, wohnen). Tomorrow you learn the full system.</div>`,
  });

  /* ===================== DAY 2 ===================== */
  G('present-regular', {
    title: 'Present tense of regular verbs', de: 'Präsens – regelmäßige Verben', level: 'A1', day: 2,
    summary: 'stem + -e, -st, -t, -en, -t, -en',
    html: `
<p>German verbs in the dictionary end in <b>-en</b> (sometimes <b>-n</b>): <i>wohnen, kommen, lernen</i>. Remove the ending → you get the <b>stem</b> (<i>wohn-, komm-, lern-</i>). Then add the ending for each person.</p>
<div class="formula">stem + ending</div>
${tb(['Person', 'Ending', 'wohnen (to live)', 'kommen (to come)', 'lernen (to learn)'], [
      ['ich', '-<b>e</b>', 'wohn<b>e</b>', 'komm<b>e</b>', 'lern<b>e</b>'],
      ['du', '-<b>st</b>', 'wohn<b>st</b>', 'komm<b>st</b>', 'lern<b>st</b>'],
      ['er/sie/es', '-<b>t</b>', 'wohn<b>t</b>', 'komm<b>t</b>', 'lern<b>t</b>'],
      ['wir', '-<b>en</b>', 'wohn<b>en</b>', 'komm<b>en</b>', 'lern<b>en</b>'],
      ['ihr', '-<b>t</b>', 'wohn<b>t</b>', 'komm<b>t</b>', 'lern<b>t</b>'],
      ['sie/Sie', '-<b>en</b>', 'wohn<b>en</b>', 'komm<b>en</b>', 'lern<b>en</b>'],
    ], [2, 3, 4])}
<div class="tip">Memory trick: <b>e – st – t – en – t – en</b>. Say it like a rhythm 10 times. wir and sie/Sie always look like the infinitive.</div>
<h3>Special case 1: stem ends in -t, -d (or consonant + m/n)</h3>
<p>Add an extra <b>-e-</b> before -st and -t so you can pronounce it:</p>
${tb(['', 'arbeiten (to work)', 'finden (to find)', 'öffnen (to open)'], [
      ['du', 'arbeit<b>est</b>', 'find<b>est</b>', 'öffn<b>est</b>'],
      ['er/sie/es', 'arbeit<b>et</b>', 'find<b>et</b>', 'öffn<b>et</b>'],
      ['ihr', 'arbeit<b>et</b>', 'find<b>et</b>', 'öffn<b>et</b>'],
    ], [1, 2, 3])}
<h3>Special case 2: stem ends in -s, -ß, -z, -x</h3>
<p>The <b>du</b> form only adds <b>-t</b> (the s-sound is already there):</p>
{{du heißt · du tanzt · du sitzt · du reist|you are called · you dance · you sit · you travel}}
<h3>Special case 3: verbs in -eln / -ern</h3>
<p>Infinitive ends in only <b>-n</b>, so wir/sie forms end in -n: [[wir wandern]], [[sie sammeln]]. With -eln the ich form drops an e: [[ich sammle]].</p>
<h3>One tense, many meanings</h3>
<p>The German present covers English “I live”, “I am living”, “I do live” – and the <b>future</b> when you add a time word:</p>
{{Ich lerne Deutsch.|I learn / I am learning German.}}
{{Morgen fahre ich nach Hamburg.|Tomorrow I am going to Hamburg.}}
<div class="warn">There is no “-ing” form and no “do” helper: <b>Wohnst du hier?</b> (not <s>Tust du hier wohnen?</s>).</div>`,
  });

  G('word-order-v2', {
    title: 'Word order: verb in position 2 & questions', de: 'Satzbau: Verb an Position 2, W-Fragen, Ja/Nein-Fragen', level: 'A1', day: 2,
    summary: 'The conjugated verb is always the 2nd element in a statement',
    html: `
<p>This is the <b>most important rule of German word order</b>. In a statement, the conjugated verb is always in <b>position 2</b>. Position 1 can be the subject – or something else (time, place, object). Then the subject jumps <i>behind</i> the verb.</p>
<div class="slots"><span>Ich<small>1 · subject</small></span><span class="v">lerne<small>2 · VERB</small></span><span>heute Deutsch.<small>rest</small></span></div>
<div class="slots"><span>Heute<small>1 · time</small></span><span class="v">lerne<small>2 · VERB</small></span><span class="s">ich<small>subject</small></span><span>Deutsch.</span></div>
<div class="slots"><span>Deutsch<small>1 · object</small></span><span class="v">lerne<small>2 · VERB</small></span><span class="s">ich</span><span>heute.</span></div>
{{Ich wohne in Berlin.|I live in Berlin.}}
{{In Berlin wohne ich.|In Berlin I live. (emphasis on Berlin)}}
{{Am Wochenende spiele ich Fußball.|At the weekend I play football.}}
<div class="warn">English allows “Today I learn…”. German does NOT: <s>Heute ich lerne</s> ✗ → <b>Heute lerne ich</b> ✓. A “position” can be several words: <i>Am Wochenende</i> = one position.</div>
<h3>W-questions (open questions)</h3>
<p>Question word in position 1, verb in position 2, then the subject.</p>
<div class="slots"><span>Wo<small>1 · W-word</small></span><span class="v">wohnst<small>2 · VERB</small></span><span class="s">du<small>subject</small></span><span>?</span></div>
${tb(['W-word', 'English', 'Example'], [
      ['wer?', 'who?', 'Wer ist das?'],
      ['was?', 'what?', 'Was machst du?'],
      ['wo?', 'where? (place)', 'Wo wohnst du?'],
      ['woher?', 'where from?', 'Woher kommst du?'],
      ['wohin?', 'where to?', 'Wohin gehst du?'],
      ['wie?', 'how?', 'Wie heißt du?'],
      ['wann?', 'when?', 'Wann kommst du?'],
      ['warum?', 'why?', 'Warum lernst du Deutsch?'],
      ['wie viel? / wie viele?', 'how much? / how many?', 'Wie viele Sprachen sprichst du?'],
      ['wie alt?', 'how old?', 'Wie alt bist du?'],
    ], [0, 2])}
<h3>Yes/no questions</h3>
<p>The verb goes to <b>position 1</b>. Your voice goes up at the end.</p>
<div class="slots"><span class="v">Wohnst<small>1 · VERB</small></span><span class="s">du<small>subject</small></span><span>in Berlin?</span></div>
{{Kommst du aus Spanien? – Ja, ich komme aus Madrid.|Do you come from Spain? – Yes, I come from Madrid.}}
{{Lernt ihr Deutsch? – Nein, wir lernen Englisch.|Are you learning German? – No, we are learning English.}}
<div class="tip">Answer a W-question with information, a yes/no question with <b>ja</b> or <b>nein</b> + a full sentence. Full sentences train your grammar!</div>`,
  });

  G('numbers', {
    title: 'Numbers 0 – 1,000,000', de: 'Die Zahlen', level: 'A1', day: 2,
    summary: 'eins, zwei … einundzwanzig – units before tens!',
    html: `
${tb(['0–12', '', '13–19', '', 'tens', ''], [
      ['0', 'null', '13', 'dreizehn', '10', 'zehn'],
      ['1', 'eins', '14', 'vierzehn', '20', 'zwanzig'],
      ['2', 'zwei', '15', 'fünfzehn', '30', 'dreißig'],
      ['3', 'drei', '16', 'sechzehn', '40', 'vierzig'],
      ['4', 'vier', '17', 'siebzehn', '50', 'fünfzig'],
      ['5', 'fünf', '18', 'achtzehn', '60', 'sechzig'],
      ['6', 'sechs', '19', 'neunzehn', '70', 'siebzig'],
      ['7', 'sieben', '', '', '80', 'achtzig'],
      ['8', 'acht', '', '', '90', 'neunzig'],
      ['9', 'neun', '', '', '100', '(ein)hundert'],
      ['10', 'zehn', '', '', '1000', '(ein)tausend'],
      ['11', 'elf', '', '', '', ''],
      ['12', 'zwölf', '', '', '', ''],
    ], [1, 3, 5])}
<div class="warn">Irregular spellings: <b>sech</b>zehn, <b>sech</b>zig (no s) · <b>sieb</b>zehn, <b>sieb</b>zig (no en) · drei<b>ß</b>ig (with ß, not -zig).</div>
<h3>21 – 99: “one-and-twenty”</h3>
<p>German says the <b>units first</b>, then <b>und</b>, then the tens – all in one word:</p>
{{21 = einundzwanzig|one-and-twenty}}
{{34 = vierunddreißig|four-and-thirty}}
{{57 = siebenundfünfzig|seven-and-fifty}}
{{99 = neunundneunzig|nine-and-ninety}}
<p>Note: alone it is <b>eins</b>, but in compounds <b>ein</b>-: einundzwanzig, einhundert.</p>
<h3>Big numbers</h3>
{{125 = hundertfünfundzwanzig|one hundred twenty-five}}
{{2026 = zweitausendsechsundzwanzig|2026 (as a year too)}}
{{1990 = neunzehnhundertneunzig|1990 – years before 2000 use “hundred”}}
{{1.000.000 = eine Million|one million (Germans use a dot for thousands)}}
<h3>Prices, phone numbers, age</h3>
{{3,50 € – drei Euro fünfzig|€3.50 (comma for decimals!)}}
{{Meine Nummer ist null eins sieben sechs …|My number is 0176 … (digit by digit or in pairs)}}
{{Wie alt bist du? – Ich bin dreiundzwanzig.|How old are you? – I am 23.}}
<div class="tip">On the phone Germans often say <b>zwo</b> instead of zwei so it doesn’t sound like drei.</div>`,
  });

  /* ===================== DAY 3 ===================== */
  G('gender-articles', {
    title: 'Noun gender & articles (der, die, das / ein, eine)', de: 'Genus und Artikel', level: 'A1', day: 3,
    summary: 'Every noun is masculine, feminine or neuter',
    html: `
<p>Every German noun has a grammatical gender: <b class="g-der">masculine (der)</b>, <b class="g-die">feminine (die)</b> or <b class="g-das">neuter (das)</b>. The gender is often <i>not logical</i> – so <b>always learn a noun with its article</b>: not “Tisch” but “<span class="g-der">der</span> Tisch”.</p>
${tb(['', 'masculine', 'feminine', 'neuter', 'plural'], [
      ['definite (“the”)', '<b class="g-der">der</b> Tisch', '<b class="g-die">die</b> Lampe', '<b class="g-das">das</b> Buch', '<b class="g-pl">die</b> Bücher'],
      ['indefinite (“a”)', '<b class="g-der">ein</b> Tisch', '<b class="g-die">eine</b> Lampe', '<b class="g-das">ein</b> Buch', '– Bücher'],
      ['negative (“no”)', '<b class="g-der">kein</b> Tisch', '<b class="g-die">keine</b> Lampe', '<b class="g-das">kein</b> Buch', '<b class="g-pl">keine</b> Bücher'],
      ['pronoun', '<b>er</b>', '<b>sie</b>', '<b>es</b>', '<b>sie</b>'],
    ])}
<div class="note">There is no “a” in the plural: [[Das sind Bücher.]] = These are books.</div>
<h3>Pronouns follow the grammar, not the meaning</h3>
<p>A table is “he” in German, a lamp is “she”:</p>
{{Wo ist der Tisch? – Er ist da.|Where is the table? – It (“he”) is there.}}
{{Die Lampe ist neu. Sie ist schön.|The lamp is new. It (“she”) is beautiful.}}
{{Das Buch? Es ist interessant.|The book? It is interesting.}}
<h3>Gender clues (they work most of the time)</h3>
${tb(['Gender', 'Endings & groups', 'Examples'], [
      ['<b class="g-die">die</b>', '-ung, -heit, -keit, -schaft, -ion, -tät, -ik, -ur, -ei, -ie, -in (female person); most nouns in -e', 'die Zeitung, die Freiheit, die Information, die Universität, die Musik, die Bäckerei, die Lehrerin, die Lampe'],
      ['<b class="g-der">der</b>', '-er (person/tool), -ling, -ismus, -or, -ig; days, months, seasons, weather, directions; male persons', 'der Lehrer, der Computer, der Frühling, der Motor, der Montag, der Mai, der Sommer, der Regen, der Norden'],
      ['<b class="g-das">das</b>', '-chen, -lein (always!), -um, -ment, -o; verbs used as nouns; young beings', 'das Mädchen, das Brötchen, das Museum, das Dokument, das Auto, das Kino, das Essen, das Kind, das Baby'],
    ])}
<div class="warn"><b>das Mädchen</b> (the girl) is neuter because of <i>-chen</i>. Grammar beats logic!</div>
<h3>Compound nouns</h3>
<p>German glues nouns together. The <b>last noun decides the gender</b>:</p>
{{das Haus + die Tür = die Haustür|front door}}
{{die Tür + der Schlüssel = der Türschlüssel|door key}}
<div class="tip">Colour-learning works: imagine all <span class="g-der">der</span> words as blue, <span class="g-die">die</span> words as red and <span class="g-das">das</span> words as green – just like in the vocabulary cards.</div>`,
  });

  G('plural', {
    title: 'Plural of nouns', de: 'Der Plural', level: 'A1', day: 3,
    summary: 'Five plural patterns; the plural article is always “die”',
    html: `
<p>Good news: in the plural, the article is always <b>die</b>. Bad news: the plural ending must be learned with each noun. There are five patterns:</p>
${tb(['Pattern', 'Singular → Plural', 'Typical for'], [
      ['<b>-e</b> (often + umlaut)', 'der Tisch → die Tisch<b>e</b><br>der Stuhl → die St<b>ü</b>hl<b>e</b>', 'many masculine & neuter nouns'],
      ['<b>-er</b> (+ umlaut if possible)', 'das Kind → die Kind<b>er</b><br>das Buch → die B<b>ü</b>ch<b>er</b><br>das Haus → die H<b>ä</b>us<b>er</b>', 'short neuter nouns'],
      ['<b>-(e)n</b>', 'die Lampe → die Lampe<b>n</b><br>die Frau → die Frau<b>en</b><br>die Lehrerin → die Lehrerin<b>nen</b>', 'almost all feminine nouns'],
      ['<b>-s</b>', 'das Auto → die Auto<b>s</b><br>das Handy → die Handy<b>s</b>', 'foreign words, words ending in a vowel (-a, -o, -i, -y)'],
      ['<b>no ending</b> (sometimes umlaut)', 'der Lehrer → die Lehrer<br>das Zimmer → die Zimmer<br>die Mutter → die M<b>ü</b>tter', 'masc./neuter in -er, -el, -en, and -chen/-lein'],
    ], [1])}
<h3>How dictionaries show it</h3>
${tb(['Dictionary', 'Means'], [
      ['der Tisch, <b>-e</b>', 'die Tische'],
      ['das Buch, <b>-¨er</b>', 'die Bücher (umlaut + er)'],
      ['die Lampe, <b>-n</b>', 'die Lampen'],
      ['der Lehrer, <b>-</b>', 'die Lehrer (no change)'],
      ['der Vater, <b>-¨</b>', 'die Väter (only umlaut)'],
    ])}
<div class="tip">Quick rules: feminine → <b>-(e)n</b> (about 90 %) · -chen / -lein → no change · English loan words → <b>-s</b>. In this course, the plural is printed under every noun – say it aloud with the singular: „der Tisch – die Tische“.</div>`,
  });

  G('haben', {
    title: 'The verb “haben” (to have)', de: 'Das Verb „haben“', level: 'A1', day: 3,
    summary: 'ich habe, du hast, er hat, wir haben, ihr habt, sie haben',
    html: `
${tb(['Person', 'haben', 'Example'], [
      ['ich', 'habe', 'Ich habe Zeit.'],
      ['du', '<b>hast</b>', 'Hast du ein Handy?'],
      ['er/sie/es', '<b>hat</b>', 'Sie hat eine Wohnung.'],
      ['wir', 'haben', 'Wir haben Hunger.'],
      ['ihr', 'habt', 'Habt ihr Kinder?'],
      ['sie/Sie', 'haben', 'Haben Sie Fragen?'],
    ], [1, 2])}
<p>Note the irregular forms: <b>du hast</b>, <b>er hat</b> (no b!).</p>
<h3>Useful expressions with haben</h3>
{{Ich habe Hunger. / Ich habe Durst.|I am hungry. / I am thirsty. (lit. I have hunger/thirst)}}
{{Ich habe Zeit. / Ich habe keine Zeit.|I have time. / I have no time.}}
{{Hast du Lust?|Do you feel like it?}}
{{Wir haben Glück!|We are lucky!}}
<div class="warn">English “I am hungry/thirsty/lucky” → German uses <b>haben</b> + noun. But age uses <b>sein</b>: Ich <b>bin</b> 20.</div>
<div class="note">After <i>haben</i>, a masculine noun changes <b>ein → einen</b>: [[Ich habe einen Bruder.]] You’ll learn why on Day 5 (accusative). For now: feminine, neuter and plural stay the same – [[Ich habe eine Schwester.]] [[Ich habe ein Zimmer.]]</div>`,
  });

  /* ===================== DAY 4 ===================== */
  G('possessives', {
    title: 'Possessive articles (my, your, his …)', de: 'Possessivartikel', level: 'A1', day: 4,
    summary: 'mein, dein, sein, ihr, unser, euer, ihr/Ihr – endings like ein',
    html: `
<p>Possessive articles (“my, your…”) take the <b>same endings as ein/eine</b>. The ending depends on the noun that follows, not on the owner.</p>
${tb(['Person', 'Possessive', 'masc. / neuter', 'feminine / plural'], [
      ['ich', 'my', 'mein Vater / mein Kind', 'mein<b>e</b> Mutter / mein<b>e</b> Eltern'],
      ['du', 'your', 'dein Bruder', 'dein<b>e</b> Schwester'],
      ['er / es', 'his / its', 'sein Sohn', 'sein<b>e</b> Tochter'],
      ['sie', 'her', 'ihr Mann', 'ihr<b>e</b> Familie'],
      ['wir', 'our', 'unser Opa', 'unser<b>e</b> Oma'],
      ['ihr', 'your (pl.)', 'euer Onkel', '<b>eure</b> Tante'],
      ['sie', 'their', 'ihr Haus', 'ihr<b>e</b> Kinder'],
      ['Sie', 'your (formal)', 'Ihr Name', 'Ihr<b>e</b> Adresse'],
    ], [2, 3])}
<div class="warn"><b>euer</b> loses its middle e when it gets an ending: <b>eure</b> Tante (not <s>euere</s>).</div>
<h3>sein or ihr? It depends on the owner</h3>
{{Max und seine Schwester|Max and his sister (owner = Max → sein)}}
{{Lena und ihr Bruder|Lena and her brother (owner = Lena → ihr)}}
{{Die Kinder und ihre Eltern|the children and their parents}}
<div class="rule">Two decisions: 1) <b>Who owns?</b> → choose the word (mein, sein, ihr …). 2) <b>Which noun follows?</b> → choose the ending (-, -e …).</div>
{{Das ist mein Bruder. Er heißt Tom.|This is my brother. His name is Tom.}}
{{Ist das Ihr Koffer, Frau Weber?|Is this your suitcase, Mrs Weber?}}
<div class="tip">After <i>haben</i> and other accusative verbs the masculine form becomes <b>meinen, deinen, seinen …</b> (Day 5): [[Ich liebe meinen Vater.]]</div>`,
  });

  G('negation-basics', {
    title: 'Saying no: nein, nicht, kein & doch', de: 'Verneinung – Grundlagen', level: 'A1', day: 4,
    summary: 'kein for nouns without/with ein, nicht for everything else',
    html: `
<p>German has two words for “not”: <b>kein</b> and <b>nicht</b>.</p>
<div class="rule"><b>kein</b> = “not a / no” → negates nouns that would have <b>ein</b> or <b>no article</b>.<br><b>nicht</b> = “not” → negates verbs, adjectives, names and nouns with <b>der/die/das</b> or a possessive.</div>
${tb(['Positive', 'Negative'], [
      ['Das ist ein Hund.', 'Das ist <b>kein</b> Hund.'],
      ['Ich habe eine Schwester.', 'Ich habe <b>keine</b> Schwester.'],
      ['Ich habe Zeit.', 'Ich habe <b>keine</b> Zeit.'],
      ['Wir haben Kinder.', 'Wir haben <b>keine</b> Kinder.'],
      ['Ich bin müde.', 'Ich bin <b>nicht</b> müde.'],
      ['Er kommt.', 'Er kommt <b>nicht</b>.'],
      ['Das ist mein Bruder.', 'Das ist <b>nicht</b> mein Bruder.'],
      ['Das ist Lena.', 'Das ist <b>nicht</b> Lena.'],
    ], [0, 1])}
<p><b>kein</b> takes the endings of <b>ein</b>: kein (m/n), keine (f), keine (plural).</p>
<h3>ja – nein – doch</h3>
<p>Answering a <b>negative</b> question with “yes, it is so” needs <b>doch</b>:</p>
{{Hast du keine Geschwister? – Doch, ich habe einen Bruder.|Don’t you have siblings? – Yes I do, I have a brother.}}
{{Kommst du nicht? – Doch, ich komme!|Aren’t you coming? – Yes, I am!}}
{{Kommst du nicht? – Nein, ich komme nicht.|Aren’t you coming? – No, I’m not.}}
<div class="warn">Never say <s>nicht ein</s>: ✗ Ich habe nicht ein Auto → ✓ Ich habe <b>kein</b> Auto.</div>
<p>The exact position of <i>nicht</i> in longer sentences comes on Day 10.</p>`,
  });

  /* ===================== DAY 5 ===================== */
  G('accusative', {
    title: 'The accusative case (direct object)', de: 'Der Akkusativ', level: 'A1', day: 5,
    summary: 'Only masculine changes: der → den, ein → einen',
    html: `
<p>German nouns change their article depending on their <b>role</b> in the sentence. This is called <b>case</b>. So far you have used the <b>nominative</b> – the subject (who does something). Now meet the <b>accusative</b> – the <b>direct object</b> (what/whom the action affects).</p>
<div class="slots"><span class="s">Der Mann<small>WHO? nominative</small></span><span class="v">kauft<small>verb</small></span><span>den Kaffee.<small>WHAT? accusative</small></span></div>
<div class="rule">Great news: <b>only masculine nouns change</b> in the accusative! der → <b>den</b>, ein → <b>einen</b>, kein → <b>keinen</b>, mein → <b>meinen</b>.</div>
${tb(['', 'masculine', 'feminine', 'neuter', 'plural'], [
      ['Nominativ', 'der / ein / kein Tee', 'die / eine Cola', 'das / ein Wasser', 'die / – Brötchen'],
      ['<b>Akkusativ</b>', 'd<b>en</b> / ein<b>en</b> / kein<b>en</b> Tee', 'die / eine Cola', 'das / ein Wasser', 'die / – Brötchen'],
    ])}
{{Ich trinke einen Kaffee.|I drink a coffee. (der Kaffee)}}
{{Ich nehme den Kuchen.|I’ll take the cake. (der Kuchen)}}
{{Er kauft eine Banane.|He buys a banana. (die Banane – no change)}}
{{Wir brauchen kein Brot.|We don’t need bread. (das Brot – no change)}}
<h3>Verbs that take an accusative object</h3>
<p>Most verbs with an object: <b>haben, möchten, brauchen, kaufen, essen, trinken, nehmen, sehen, suchen, finden, lieben, mögen, bestellen, bezahlen, kennen, besuchen</b> – and the very useful <b>es gibt</b> (there is/are):</p>
{{Es gibt einen Supermarkt hier.|There is a supermarket here.}}
{{Gibt es hier einen Bäcker?|Is there a bakery here?}}
<h3>Questions</h3>
<p>Person: <b>wen?</b> (whom?) · Thing: <b>was?</b> (what?)</p>
{{Wen besuchst du? – Ich besuche meinen Opa.|Whom are you visiting? – I’m visiting my grandpa.}}
<div class="note">Because the article shows the role, German word order is flexible: [[Den Kaffee trinkt der Mann.]] still means “The man drinks the coffee.”</div>
<div class="tip">Pronouns: masculine <b>er → ihn</b> in the accusative: [[Der Kaffee ist gut. Ich nehme ihn.]] (I’ll take it.) – <i>sie</i> and <i>es</i> stay the same.</div>
<div class="warn"><b>sein</b> (to be) never takes the accusative: [[Das ist ein Kaffee.]] (not <s>einen</s>) – both sides are nominative.</div>`,
  });

  G('moechten', {
    title: '“möchten” – polite wishes & ordering', de: '„möchten“ und höfliches Bestellen', level: 'A1', day: 5,
    summary: 'ich möchte, du möchtest, er möchte – “would like”',
    html: `
<p><b>möchten</b> = “would like”. It is the polite way to ask for things – in cafés, shops, everywhere.</p>
${tb(['Person', 'möchten'], [
      ['ich', 'möchte'], ['du', 'möchtest'], ['er/sie/es', 'möchte'],
      ['wir', 'möchten'], ['ihr', 'möchtet'], ['sie/Sie', 'möchten'],
    ], [1])}
<div class="warn">er/sie/es <b>möchte</b> – no <s>-t</s>! (ich and er forms are the same.)</div>
<h3>Two patterns</h3>
{{Ich möchte einen Tee, bitte.|möchten + accusative: I’d like a tea, please.}}
{{Ich möchte zahlen.|möchten + infinitive at the END: I’d like to pay.}}
{{Möchtest du heute Abend ins Kino gehen?|Would you like to go to the cinema tonight?}}
<h3>Ordering like a native</h3>
${tb(['Phrase', 'English'], [
      ['Ich hätte gern einen Cappuccino.', 'I’d like a cappuccino. (very common)'],
      ['Ich nehme den Apfelkuchen.', 'I’ll take the apple cake.'],
      ['Für mich ein Wasser, bitte.', 'A water for me, please.'],
      ['Was darf es sein?', 'What can I get you? (waiter)'],
      ['Sonst noch etwas?', 'Anything else?'],
      ['Zusammen oder getrennt?', 'Together or separately? (paying)'],
      ['Die Rechnung, bitte! / Zahlen, bitte!', 'The bill, please!'],
      ['Stimmt so.', 'Keep the change.'],
    ], [0])}
<div class="tip">Avoid <b>Ich will …</b> when ordering – it sounds like “I want!”. Use <b>Ich möchte</b> or <b>Ich hätte gern</b>.</div>`,
  });

  /* ===================== DAY 6 ===================== */
  G('stem-changing', {
    title: 'Verbs with a vowel change (e → i, e → ie, a → ä)', de: 'Verben mit Vokalwechsel', level: 'A1', day: 6,
    summary: 'Only du and er/sie/es change: du sprichst, er fährt',
    html: `
<p>Some common verbs change their stem vowel – but <b>only in the du and er/sie/es forms</b>. The endings stay regular.</p>
${tb(['', 'e → i: sprechen', 'e → ie: lesen', 'a → ä: fahren'], [
      ['ich', 'spreche', 'lese', 'fahre'],
      ['du', 'spr<b>i</b>chst', 'l<b>ie</b>st', 'f<b>ä</b>hrst'],
      ['er/sie/es', 'spr<b>i</b>cht', 'l<b>ie</b>st', 'f<b>ä</b>hrt'],
      ['wir', 'sprechen', 'lesen', 'fahren'],
      ['ihr', 'sprecht', 'lest', 'fahrt'],
      ['sie/Sie', 'sprechen', 'lesen', 'fahren'],
    ], [1, 2, 3])}
<h3>The most important ones</h3>
${tb(['Type', 'Verb', 'du', 'er/sie/es'], [
      ['e → i', 'essen (eat)', 'isst', 'isst'],
      ['e → i', 'geben (give)', 'gibst', 'gibt'],
      ['e → i', 'helfen (help)', 'hilfst', 'hilft'],
      ['e → i', 'nehmen (take)', '<b>nimmst</b>', '<b>nimmt</b>'],
      ['e → i', 'treffen (meet)', 'triffst', 'trifft'],
      ['e → i', 'vergessen (forget)', 'vergisst', 'vergisst'],
      ['e → ie', 'sehen (see)', 'siehst', 'sieht'],
      ['e → ie', 'empfehlen (recommend)', 'empfiehlst', 'empfiehlt'],
      ['a → ä', 'schlafen (sleep)', 'schläfst', 'schläft'],
      ['a → ä', 'tragen (carry, wear)', 'trägst', 'trägt'],
      ['a → ä', 'waschen (wash)', 'wäschst', 'wäscht'],
      ['a → ä', 'fallen (fall)', 'fällst', 'fällt'],
      ['a → ä', 'halten (hold, stop)', 'hältst', 'hält'],
      ['au → äu', 'laufen (run, walk)', 'läufst', 'läuft'],
    ], [1, 2, 3])}
<div class="note">Spelling details: <b>nehmen → du nimmst</b> (double m, no h) · <b>essen → du isst</b> · <b>lesen → du liest</b> (s-stem: only -t) · <b>halten → er hält</b> (no extra -et).</div>
<h3>Special: wissen (to know a fact)</h3>
${tb(['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'], [['weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen']], [0, 1, 2, 3, 4, 5])}
{{Ich weiß es nicht.|I don’t know (it).}}
<div class="tip"><b>wissen</b> = know a fact · <b>kennen</b> = be familiar with a person/place: [[Ich kenne Lena.]] · [[Ich weiß, wo sie wohnt.]]</div>`,
  });

  G('gern', {
    title: 'Likes & preferences: gern, lieber, am liebsten, mögen', de: 'gern – lieber – am liebsten · mögen', level: 'A1', day: 6,
    summary: 'Ich spiele gern Tennis. Ich mag Pizza.',
    html: `
<p>To say you <b>like doing</b> something, add <b>gern</b> after the verb. German doesn’t use “like” as a verb here!</p>
{{Ich spiele gern Fußball.|I like playing football.}}
{{Lena liest gern.|Lena likes reading.}}
{{Ich koche nicht gern.|I don’t like cooking.}}
<h3>Comparison: gern → lieber → am liebsten</h3>
${tb(['', 'Meaning', 'Example'], [
      ['gern', 'like doing', 'Ich trinke gern Tee.'],
      ['lieber', 'prefer doing', 'Ich trinke lieber Kaffee.'],
      ['am liebsten', 'like doing most of all', 'Am liebsten trinke ich Kakao.'],
    ], [0, 2])}
<h3>mögen + noun</h3>
<p>To say you like a <b>thing or person</b>, use <b>mögen</b>:</p>
${tb(['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'], [['mag', 'magst', 'mag', 'mögen', 'mögt', 'mögen']], [0, 1, 2, 3, 4, 5])}
{{Ich mag Pizza.|I like pizza.}}
{{Magst du Hunde?|Do you like dogs?}}
{{Ich mag den Film nicht.|I don’t like the film. (accusative!)}}
<div class="rule"><b>Activity</b> → verb + gern · <b>Thing/person</b> → mögen + accusative · <b>Polite wish</b> → möchten.</div>
<div class="warn">Don’t mix them: ✗ <s>Ich mag spielen Fußball</s> → ✓ <b>Ich spiele gern Fußball.</b></div>
<h3>How often?</h3>
<p>[[immer]] (always) · [[oft]] (often) · [[manchmal]] (sometimes) · [[selten]] (rarely) · [[nie]] (never)</p>
{{Ich gehe oft ins Kino, aber ich tanze nie.|I often go to the cinema, but I never dance.}}`,
  });

  /* ===================== DAY 7 ===================== */
  G('time', {
    title: 'Telling the time, days, months & dates', de: 'Uhrzeit, Wochentage, Monate, Datum', level: 'A1', day: 7,
    summary: 'halb drei = 2:30! um, am, im',
    html: `
{{Wie spät ist es? / Wie viel Uhr ist es?|What time is it?}}
<h3>Two systems</h3>
${tb(['Time', 'Official (radio, trains)', 'Everyday'], [
      ['8:00', 'acht Uhr', 'acht (Uhr)'],
      ['8:05', 'acht Uhr fünf', 'fünf nach acht'],
      ['8:15', 'acht Uhr fünfzehn', 'Viertel nach acht'],
      ['8:20', 'acht Uhr zwanzig', 'zwanzig nach acht'],
      ['8:25', 'acht Uhr fünfundzwanzig', 'fünf vor halb neun'],
      ['8:30', 'acht Uhr dreißig', '<b>halb neun</b>'],
      ['8:35', 'acht Uhr fünfunddreißig', 'fünf nach halb neun'],
      ['8:45', 'acht Uhr fünfundvierzig', 'Viertel vor neun'],
      ['20:10', 'zwanzig Uhr zehn', 'zehn nach acht (abends)'],
    ], [1, 2])}
<div class="warn"><b>halb neun = 8:30</b> (half <i>to</i> nine), not 9:30! German looks forward to the next hour.</div>
<h3>Prepositions of time</h3>
${tb(['Preposition', 'Used with', 'Examples'], [
      ['<b>um</b>', 'clock times', 'um 8 Uhr, um halb zehn'],
      ['<b>am</b>', 'days, parts of the day, dates', 'am Montag, am Morgen, am Abend, am Wochenende, am 3. Mai'],
      ['<b>in der</b>', 'night', 'in der Nacht'],
      ['<b>im</b>', 'months, seasons', 'im Mai, im Sommer, im Winter'],
      ['–', 'years', '2026 / im Jahr 2026 (never <s>in 2026</s>)'],
      ['<b>von … bis</b>', 'from … to', 'von 9 bis 17 Uhr, von Montag bis Freitag'],
    ], [2])}
<h3>Days, parts of the day, months</h3>
<p><b>Days (all der):</b> [[Montag]], [[Dienstag]], [[Mittwoch]], [[Donnerstag]], [[Freitag]], [[Samstag]], [[Sonntag]]</p>
<p><b>Parts of the day:</b> [[der Morgen]], [[der Vormittag]], [[der Mittag]], [[der Nachmittag]], [[der Abend]], [[die Nacht]]</p>
<p><b>Months (all der):</b> [[Januar]], [[Februar]], [[März]], [[April]], [[Mai]], [[Juni]], [[Juli]], [[August]], [[September]], [[Oktober]], [[November]], [[Dezember]]</p>
<div class="tip">Add <b>-s</b> for habits: [[montags]] (on Mondays), [[abends]] (in the evenings), [[morgens]]. Written small!</div>
<h3>Dates (ordinal numbers)</h3>
<p>1–19: number + <b>-te</b>, from 20: number + <b>-ste</b>. Irregular: <b>erste, dritte, siebte, achte</b>.</p>
{{Heute ist der erste Mai.|Today is the 1st of May. (der 1. Mai)}}
{{Ich habe am dritten Oktober Geburtstag.|My birthday is on the 3rd of October. (am = dative → -en)}}
{{Der zwanzigste Juli|the 20th of July}}
<div class="note">Written: a dot after the number = ordinal: <b>3. Oktober</b>. Dates go day.month.year: <b>03.10.2026</b>.</div>`,
  });

  G('review-week1', {
    title: 'Cheat sheet: Week 1', de: 'Zusammenfassung Woche 1', level: 'A1', day: 7,
    summary: 'Everything from Days 1–6 on one page',
    html: `
<h3>Verbs</h3>
${tb(['', 'sein', 'haben', 'wohnen', 'sprechen', 'fahren', 'möchten'], [
      ['ich', 'bin', 'habe', 'wohne', 'spreche', 'fahre', 'möchte'],
      ['du', 'bist', 'hast', 'wohnst', 'sprichst', 'fährst', 'möchtest'],
      ['er/sie/es', 'ist', 'hat', 'wohnt', 'spricht', 'fährt', 'möchte'],
      ['wir', 'sind', 'haben', 'wohnen', 'sprechen', 'fahren', 'möchten'],
      ['ihr', 'seid', 'habt', 'wohnt', 'sprecht', 'fahrt', 'möchtet'],
      ['sie/Sie', 'sind', 'haben', 'wohnen', 'sprechen', 'fahren', 'möchten'],
    ])}
<h3>Articles: nominative & accusative</h3>
${tb(['', 'masc.', 'fem.', 'neut.', 'plural'], [
      ['Nom.', 'der / ein / kein / mein', 'die / eine / keine / meine', 'das / ein / kein / mein', 'die / – / keine / meine'],
      ['Akk.', 'd<b>en</b> / ein<b>en</b> / kein<b>en</b> / mein<b>en</b>', 'die / eine / keine / meine', 'das / ein / kein / mein', 'die / – / keine / meine'],
    ])}
<h3>Word order</h3>
<div class="slots"><span>Am Montag</span><span class="v">lerne</span><span class="s">ich</span><span>Deutsch.</span></div>
<div class="slots"><span>Was</span><span class="v">lernst</span><span class="s">du</span><span>?</span></div>
<div class="slots"><span class="v">Lernst</span><span class="s">du</span><span>Deutsch?</span></div>
<h3>Top 5 mistakes to avoid</h3>
<ol>
<li><s>Ich bin ein Student</s> → <b>Ich bin Student.</b></li>
<li><s>Heute ich gehe</s> → <b>Heute gehe ich.</b></li>
<li><s>Ich habe nicht ein Auto</s> → <b>Ich habe kein Auto.</b></li>
<li><s>Ich möchte ein Kaffee</s> → <b>Ich möchte einen Kaffee.</b></li>
<li><s>Er nehmt</s> → <b>Er nimmt.</b></li>
</ol>`,
  });

  /* ===================== DAY 8 ===================== */
  G('separable', {
    title: 'Separable & inseparable verbs', de: 'Trennbare und untrennbare Verben', level: 'A1', day: 8,
    summary: 'Ich stehe um 7 Uhr auf. – the prefix jumps to the end',
    html: `
<p>Many German verbs have a <b>prefix</b>: <i>auf|stehen</i> (get up), <i>ein|kaufen</i> (shop), <i>an|rufen</i> (call). In a main clause the prefix <b>separates and goes to the very end</b>.</p>
<div class="slots"><span class="s">Ich</span><span class="v">stehe<small>pos. 2</small></span><span>um 7 Uhr</span><span class="v2">auf.<small>END</small></span></div>
<p>The verb and its prefix form a <b>bracket</b> (die Satzklammer) around the rest of the sentence. This bracket is everywhere in German!</p>
${tb(['Infinitive', 'Statement', 'Question'], [
      ['aufstehen (get up)', 'Ich stehe früh auf.', 'Wann stehst du auf?'],
      ['einkaufen (go shopping)', 'Wir kaufen heute ein.', 'Kaufst du heute ein?'],
      ['anrufen (call)', 'Sie ruft ihre Mutter an.', 'Rufst du mich an?'],
      ['fernsehen (watch TV)', 'Er sieht jeden Abend fern.', 'Siehst du oft fern?'],
      ['mitkommen (come along)', 'Kommst du mit?', 'Kommt Lena auch mit?'],
      ['aufräumen (tidy up)', 'Ich räume mein Zimmer auf.', 'Räumst du auf?'],
      ['anfangen (begin)', 'Der Kurs fängt um 9 an.', 'Wann fängt der Film an?'],
    ], [1, 2])}
<p>Common separable prefixes: <b>ab-, an-, auf-, aus-, ein-, fern-, los-, mit-, nach-, vor-, weg-, zu-, zurück-</b>. They are <b>stressed</b>: [[AUFstehen]], [[EINkaufen]].</p>
<h3>When does the verb stay together?</h3>
<ul>
<li>In the infinitive (e.g. with modal verbs – Day 9): [[Ich muss früh aufstehen.]]</li>
<li>At the end of a subordinate clause (Day 18): [[…, weil ich früh aufstehe.]]</li>
</ul>
<h3>Inseparable prefixes never separate</h3>
<p><b>be-, emp-, ent-, er-, ge-, miss-, ver-, zer-</b> stay glued and are <b>not stressed</b>:</p>
{{Ich verstehe das nicht.|I don’t understand that. (verstehen)}}
{{Wir besuchen unsere Oma.|We visit our grandma. (besuchen)}}
{{Er bekommt ein Geschenk.|He gets a present. (bekommen ≠ become!)}}
<div class="warn"><b>bekommen</b> = to get/receive. “To become” is <b>werden</b>.</div>
<h3>Imperative</h3>
{{Steh auf! Mach das Fenster zu!|Get up! Close the window!}}`,
  });

  /* ===================== DAY 9 ===================== */
  G('modals', {
    title: 'Modal verbs (können, müssen, wollen …)', de: 'Modalverben', level: 'A1', day: 9,
    summary: 'modal in position 2, infinitive at the end',
    html: `
<p>Modal verbs express ability, obligation, permission and wishes. They work with a second verb in the <b>infinitive at the end</b> of the sentence (the sentence bracket again!).</p>
<div class="slots"><span class="s">Ich</span><span class="v">kann<small>modal · pos. 2</small></span><span>gut</span><span class="v2">schwimmen.<small>infinitive · END</small></span></div>
${tb(['', 'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'mögen'], [
      ['ich', 'k<b>a</b>nn', 'm<b>u</b>ss', 'w<b>i</b>ll', 'd<b>a</b>rf', 'soll', 'm<b>a</b>g'],
      ['du', 'k<b>a</b>nnst', 'm<b>u</b>sst', 'w<b>i</b>llst', 'd<b>a</b>rfst', 'sollst', 'm<b>a</b>gst'],
      ['er/sie/es', 'k<b>a</b>nn', 'm<b>u</b>ss', 'w<b>i</b>ll', 'd<b>a</b>rf', 'soll', 'm<b>a</b>g'],
      ['wir', 'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'mögen'],
      ['ihr', 'könnt', 'müsst', 'wollt', 'dürft', 'sollt', 'mögt'],
      ['sie/Sie', 'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'mögen'],
    ], [1, 2, 3, 4, 5, 6])}
<div class="rule">Three patterns: 1) <b>ich = er/sie/es</b> (no -t!) 2) the vowel changes in the singular (except sollen) 3) the second verb goes to the end as an infinitive.</div>
<h3>Meanings</h3>
${tb(['Modal', 'Meaning', 'Example'], [
      ['können', 'can, be able to, be possible', 'Ich kann Deutsch sprechen.'],
      ['müssen', 'must, have to', 'Ich muss heute arbeiten.'],
      ['wollen', 'want to (strong)', 'Wir wollen nach Berlin fahren.'],
      ['dürfen', 'may, be allowed to', 'Darf ich hier rauchen?'],
      ['sollen', 'should, be supposed to (someone else wants it)', 'Der Arzt sagt, ich soll viel trinken.'],
      ['möchten', 'would like to (polite)', 'Ich möchte einen Kaffee trinken.'],
    ], [2])}
<h3>Watch the negatives!</h3>
{{Du musst nicht kommen.|You don’t have to come. (not necessary)}}
{{Du darfst nicht kommen.|You must not come. (forbidden)}}
<div class="warn"><b>nicht müssen</b> = don’t have to · <b>nicht dürfen</b> = must not. Also: <b>Ich will</b> means “I want”, NOT “I will”!</div>
<h3>Questions and separable verbs</h3>
{{Kannst du mir helfen?|Can you help me?}}
{{Wann musst du aufstehen?|When do you have to get up? (separable verb stays together at the end)}}
<div class="tip">If the meaning is clear, the infinitive can be dropped: [[Ich muss nach Hause.]] (…gehen) · [[Kannst du Deutsch?]] (…sprechen)</div>`,
  });

  /* ===================== DAY 10 ===================== */
  G('negation', {
    title: 'Negation in detail: where does “nicht” go?', de: 'Die Position von „nicht“', level: 'A1', day: 10,
    summary: 'nicht at the end – but before the 2nd verb part, adjectives and prepositions',
    html: `
<p>Reminder: <b>kein</b> negates nouns with ein/no article. Everything else is negated with <b>nicht</b>. Now let’s place <i>nicht</i> perfectly.</p>
<h3>Rule 1 – whole sentence: nicht goes to the end…</h3>
{{Ich komme nicht.|I’m not coming.}}
{{Ich kenne den Mann nicht.|I don’t know the man. (after the definite object)}}
{{Wir arbeiten morgen nicht.|We aren’t working tomorrow. (after time expressions)}}
<h3>Rule 2 – …but BEFORE these:</h3>
${tb(['Before…', 'Example'], [
      ['the 2nd part of the verb bracket (infinitive, prefix, participle)', 'Ich kann heute nicht kommen. / Er ruft nicht an.'],
      ['adjectives & adverbs of manner', 'Das ist nicht gut. / Sie spricht nicht schnell.'],
      ['prepositional phrases (place, direction)', 'Ich wohne nicht in Berlin. / Er geht nicht ins Kino.'],
      ['complements of sein / werden', 'Das ist nicht mein Handy.'],
    ], [1])}
<h3>Rule 3 – contrast: nicht before the word you negate</h3>
{{Nicht ich habe das gesagt, sondern Max.|It wasn’t me who said that, but Max.}}
{{Ich trinke nicht Kaffee, sondern Tee.|I don’t drink coffee but tea. (contrast)}}
<h3>kein vs. nicht – the full picture</h3>
${tb(['Use kein', 'Use nicht'], [
      ['Ich habe <b>keinen</b> Hunger.', 'Ich bin <b>nicht</b> hungrig.'],
      ['Er hat <b>kein</b> Auto.', 'Er fährt <b>nicht</b> Auto. (fixed verb+noun)'],
      ['Wir haben <b>keine</b> Zeit.', 'Das ist <b>nicht</b> meine Zeit.'],
      ['Sie spricht <b>kein</b> Englisch.', 'Sie spricht <b>nicht</b> gut Englisch.'],
    ], [0, 1])}
<h3>More negative words</h3>
${tb(['Positive', 'Negative'], [
      ['etwas (something)', 'nichts (nothing)'],
      ['jemand (someone)', 'niemand (nobody)'],
      ['immer / oft (always / often)', 'nie / niemals (never)'],
      ['schon (already)', 'noch nicht (not yet)'],
      ['noch (still)', 'nicht mehr (no longer)'],
      ['ein … (a)', 'kein … mehr (no more)'],
    ], [0, 1])}
{{Ich habe noch nichts gegessen.|I haven’t eaten anything yet.}}
<div class="warn">German uses only <b>one</b> negative: ✗ <s>Ich habe nicht nichts</s> → ✓ <b>Ich habe nichts.</b></div>`,
  });

  G('imperative', {
    title: 'The imperative (giving instructions)', de: 'Der Imperativ', level: 'A1', day: 10,
    summary: 'Komm! Kommt! Kommen Sie!',
    html: `
<p>Use the imperative for instructions, requests, advice and invitations. There are three forms, depending on whom you talk to.</p>
${tb(['To…', 'How to build it', 'kommen', 'nehmen', 'aufstehen'], [
      ['du', 'du-form minus -st (and no “du”)', 'Komm!', 'Nimm!', 'Steh auf!'],
      ['ihr', 'ihr-form (without “ihr”)', 'Kommt!', 'Nehmt!', 'Steht auf!'],
      ['Sie', 'Sie-form, verb first + Sie', 'Kommen Sie!', 'Nehmen Sie!', 'Stehen Sie auf!'],
    ], [2, 3, 4])}
<h3>du-form details</h3>
<ul>
<li>e → i / ie verbs keep the change: [[Nimm!]] [[Iss!]] [[Lies!]] [[Sprich!]] [[Gib mir das!]] [[Hilf mir!]]</li>
<li>a → ä verbs do NOT: [[Fahr langsam!]] [[Schlaf gut!]] (not <s>fähr</s>)</li>
<li>Stems in -t/-d add -e: [[Warte!]] [[Arbeite!]] [[Finde es!]]</li>
</ul>
<h3>sein is special</h3>
{{Sei leise! · Seid leise! · Seien Sie leise!|Be quiet! (du / ihr / Sie)}}
<h3>Sound friendly</h3>
<p>German imperatives can sound harsh. Add <b>bitte</b>, <b>mal</b> or <b>doch</b>:</p>
{{Komm doch mal vorbei!|Why don’t you drop by!}}
{{Mach bitte das Fenster zu.|Please close the window.}}
{{Nehmen Sie bitte Platz.|Please take a seat.}}
<div class="tip">Let’s…: <b>verb (wir-form) + wir</b> → [[Gehen wir!]] (Let’s go!) or [[Lass uns gehen!]]</div>`,
  });

  /* ===================== DAY 11 ===================== */
  G('dative', {
    title: 'The dative case (indirect object)', de: 'Der Dativ', level: 'A1', day: 11,
    summary: 'dem, der, dem, den + n · wem? · mir, dir, ihm …',
    html: `
<p>The <b>dative</b> marks the <b>indirect object</b> – the person who <i>receives</i> something or <i>benefits</i>. Question: <b>wem?</b> (to whom?)</p>
<div class="slots"><span class="s">Ich<small>Nom.</small></span><span class="v">gebe</span><span>dem Kind<small>WHOM? Dat.</small></span><span>einen Ball.<small>WHAT? Akk.</small></span></div>
${tb(['', 'masculine', 'feminine', 'neuter', 'plural'], [
      ['Nominativ', 'der / ein', 'die / eine', 'das / ein', 'die / –'],
      ['Akkusativ', 'den / einen', 'die / eine', 'das / ein', 'die / –'],
      ['<b>Dativ</b>', 'd<b>em</b> / ein<b>em</b>', 'd<b>er</b> / ein<b>er</b>', 'd<b>em</b> / ein<b>em</b>', 'd<b>en</b> / – + <b>n</b>'],
    ])}
<div class="rule">Memory: <b>-m, -r, -m, -n</b>. Possessives and kein work the same: meinem, meiner, meinem, meinen · keinem, keiner …<br>Plural nouns add <b>-n</b>: den Kinder<b>n</b>, mit meinen Freunde<b>n</b> (but not after -n or -s: den Frauen, den Autos).</div>
<h3>Verbs with two objects (Dat + Akk)</h3>
<p>geben, schenken, zeigen, erklären, bringen, schreiben, schicken, kaufen, empfehlen, sagen:</p>
{{Ich schenke meiner Mutter Blumen.|I give my mother flowers.}}
{{Kannst du dem Lehrer das Problem erklären?|Can you explain the problem to the teacher?}}
<div class="note">Order of two nouns: <b>dative before accusative</b>. (Pronoun rules on Day 14.)</div>
<h3>Verbs that take ONLY a dative object</h3>
${tb(['Verb', 'Example'], [
      ['helfen (help)', 'Ich helfe dir.'],
      ['danken (thank)', 'Ich danke Ihnen.'],
      ['gefallen (please → like)', 'Die Stadt gefällt mir.'],
      ['gehören (belong to)', 'Das Buch gehört dem Lehrer.'],
      ['schmecken (taste)', 'Schmeckt dir die Suppe?'],
      ['passen (fit, suit)', 'Der Termin passt mir.'],
      ['antworten (answer)', 'Antworte mir bitte!'],
      ['gratulieren (congratulate)', 'Wir gratulieren dir!'],
      ['wehtun (hurt)', 'Mir tut der Kopf weh.'],
    ], [1])}
<h3>Personal pronouns in the dative</h3>
${tb(['Nom.', 'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie', 'Sie'], [['<b>Dat.</b>', 'mir', 'dir', 'ihm', 'ihr', 'ihm', 'uns', 'euch', 'ihnen', 'Ihnen']], [1, 2, 3, 4, 5, 6, 7, 8, 9])}
<h3>Everyday dative phrases</h3>
{{Wie geht es dir? – Mir geht es gut.|How are you? – I’m fine.}}
{{Mir ist kalt. / Mir ist langweilig.|I’m cold. / I’m bored.}}
{{Das gefällt mir. / Es tut mir leid.|I like that. / I’m sorry.}}
<div class="warn"><b>Ich bin kalt</b> means “I am a cold person”! Say <b>Mir ist kalt.</b></div>`,
  });

  /* ===================== DAY 12 ===================== */
  G('prep-acc-dat', {
    title: 'Prepositions with accusative & with dative', de: 'Präpositionen mit Akkusativ und Dativ', level: 'A1', day: 12,
    summary: 'durch, für, gegen, ohne, um · aus, bei, mit, nach, seit, von, zu',
    html: `
<p>Every preposition “controls” a case. Learn the two fixed groups by heart – they never change.</p>
<h3>Always accusative: durch, für, gegen, ohne, um (+ bis, entlang)</h3>
${tb(['Preposition', 'Meaning', 'Example'], [
      ['durch', 'through', 'Wir gehen durch den Park.'],
      ['für', 'for', 'Das Geschenk ist für dich.'],
      ['gegen', 'against; around (time)', 'Ich bin gegen den Plan. / gegen 8 Uhr'],
      ['ohne', 'without', 'Ich trinke Kaffee ohne Zucker.'],
      ['um', 'around; at (time)', 'Wir sitzen um den Tisch. / um 9 Uhr'],
      ['bis', 'until, by', 'bis nächsten Montag'],
    ], [2])}
<div class="tip">Mnemonic: <b>DOGFU</b> = <b>D</b>urch, <b>O</b>hne, <b>G</b>egen, <b>F</b>ür, <b>U</b>m.</div>
<h3>Always dative: aus, bei, mit, nach, seit, von, zu (+ gegenüber, ab, außer)</h3>
${tb(['Preposition', 'Meaning', 'Example'], [
      ['aus', 'from (origin), out of', 'Ich komme aus der Türkei. / aus dem Haus'],
      ['bei', 'at (someone’s place / company), near', 'Ich wohne bei meinen Eltern. / Sie arbeitet bei Siemens.'],
      ['mit', 'with; by (transport)', 'Ich fahre mit dem Bus. / mit meiner Freundin'],
      ['nach', 'to (cities, countries, home); after', 'Ich fliege nach Wien. / nach dem Essen'],
      ['seit', 'since, for (still continuing)', 'Ich lerne seit einer Woche Deutsch.'],
      ['von', 'from; of; by', 'ein Brief von meinem Bruder / von 9 bis 5'],
      ['zu', 'to (people, places, events)', 'Ich gehe zum Arzt. / zur Schule'],
      ['gegenüber', 'opposite', 'gegenüber dem Bahnhof'],
    ], [2])}
<div class="tip">Sing it to the “Blue Danube” waltz: <i>aus – bei – mit – nach – seit – von – zu</i>… ♪</div>
<h3>Contractions</h3>
${tb(['Long', 'Short'], [
      ['zu dem', '<b>zum</b> (zum Bahnhof)'], ['zu der', '<b>zur</b> (zur Arbeit)'],
      ['bei dem', '<b>beim</b> (beim Arzt)'], ['von dem', '<b>vom</b> (vom Bahnhof)'],
    ])}
<h3>to / at: nach, zu, in – and home</h3>
${tb(['Where to?', 'Where?'], [
      ['<b>nach</b> Berlin, <b>nach</b> Spanien (no article)', '<b>in</b> Berlin, <b>in</b> Spanien'],
      ['<b>in die</b> Schweiz, <b>in die</b> USA (with article)', '<b>in der</b> Schweiz, <b>in den</b> USA'],
      ['<b>zum</b> Arzt, <b>zur</b> Post, <b>zu</b> Lena', '<b>beim</b> Arzt, <b>bei der</b> Post, <b>bei</b> Lena'],
      ['<b>nach Hause</b> (going home)', '<b>zu Hause</b> (at home)'],
    ], [0, 1])}
<div class="warn"><b>seit + present tense</b> for actions that are still going on: [[Ich wohne seit drei Jahren hier.]] = I <i>have been living</i> here for three years. (Not <s>Ich habe … gewohnt</s>.)</div>`,
  });

  /* ===================== DAY 13 ===================== */
  G('two-way-prep', {
    title: 'Two-way prepositions: Wo? (dative) vs Wohin? (accusative)', de: 'Wechselpräpositionen', level: 'A1', day: 13,
    summary: 'an, auf, hinter, in, neben, über, unter, vor, zwischen',
    html: `
<p>Nine prepositions can take <b>either</b> case. The question decides:</p>
<div class="rule"><b>Wo?</b> (where – location, no change of place) → <b>Dativ</b><br><b>Wohin?</b> (where to – movement to a new place) → <b>Akkusativ</b></div>
{{Ich bin in der Küche.|Wo? I am in the kitchen. (Dativ)}}
{{Ich gehe in die Küche.|Wohin? I’m going into the kitchen. (Akkusativ)}}
{{Das Buch liegt auf dem Tisch.|Wo? The book is lying on the table.}}
{{Ich lege das Buch auf den Tisch.|Wohin? I put the book on the table.}}
${tb(['Preposition', 'Meaning', 'Wo? + Dativ', 'Wohin? + Akkusativ'], [
      ['in', 'in, into', 'im Kino', 'ins Kino'],
      ['an', 'at, on (vertical), by (water)', 'an der Wand / am Meer', 'an die Wand / ans Meer'],
      ['auf', 'on (horizontal surface)', 'auf dem Tisch', 'auf den Tisch'],
      ['über', 'above, over, across', 'über dem Sofa', 'über die Straße'],
      ['unter', 'under', 'unter dem Bett', 'unter das Bett'],
      ['vor', 'in front of', 'vor dem Haus', 'vor das Haus'],
      ['hinter', 'behind', 'hinter der Tür', 'hinter die Tür'],
      ['neben', 'next to', 'neben dem Fenster', 'neben das Fenster'],
      ['zwischen', 'between', 'zwischen den Stühlen', 'zwischen die Stühle'],
    ], [2, 3])}
<p>Contractions: <b>in dem → im</b>, <b>an dem → am</b>, <b>in das → ins</b>, <b>an das → ans</b>.</p>
<h3>Verb pairs: put (Akk) vs be located (Dat)</h3>
${tb(['Wohin? (action, + Akk)', 'Wo? (state, + Dat)'], [
      ['stellen – Ich stelle die Flasche auf den Tisch. (upright)', 'stehen – Die Flasche steht auf dem Tisch.'],
      ['legen – Ich lege das Handy auf das Bett. (flat)', 'liegen – Das Handy liegt auf dem Bett.'],
      ['setzen – Ich setze mich auf das Sofa.', 'sitzen – Ich sitze auf dem Sofa.'],
      ['hängen – Ich hänge das Bild an die Wand.', 'hängen – Das Bild hängt an der Wand.'],
    ], [0, 1])}
<div class="tip">The action verbs (stellen, legen, setzen, hängen) are regular; the state verbs (stehen, liegen, sitzen, hängen) are irregular. Action → accusative. State → dative.</div>
<h3>Giving directions</h3>
{{Gehen Sie geradeaus und dann die zweite Straße links.|Go straight ahead and then take the second street on the left.}}
{{An der Ampel biegen Sie rechts ab.|At the traffic light turn right.}}
{{Gehen Sie über die Brücke. Die Post ist neben der Bank.|Cross the bridge. The post office is next to the bank.}}
<div class="note">Time uses the dative: [[vor einer Woche]] (a week ago) · [[in zwei Tagen]] (in two days) · [[am Wochenende]].</div>`,
  });

  /* ===================== DAY 14 ===================== */
  G('pronouns-cases', {
    title: 'Personal pronouns in all cases & word order of objects', de: 'Personalpronomen: Nominativ, Akkusativ, Dativ', level: 'A1', day: 14,
    summary: 'ich–mich–mir · er–ihn–ihm · pronoun order',
    html: `
${tb(['Nominativ', 'Akkusativ', 'Dativ', 'Possessive'], [
      ['ich', 'mich', 'mir', 'mein'],
      ['du', 'dich', 'dir', 'dein'],
      ['er', 'ihn', 'ihm', 'sein'],
      ['sie', 'sie', 'ihr', 'ihr'],
      ['es', 'es', 'ihm', 'sein'],
      ['wir', 'uns', 'uns', 'unser'],
      ['ihr', 'euch', 'euch', 'euer'],
      ['sie', 'sie', 'ihnen', 'ihr'],
      ['Sie', 'Sie', 'Ihnen', 'Ihr'],
    ], [0, 1, 2, 3])}
<div class="tip">Look at the patterns: <b>-ich/-ir</b> (mich/mir, dich/dir), masculine <b>ihn/ihm</b> (like den/dem), plural <b>uns/euch</b> are the same in Akk and Dat.</div>
{{Siehst du mich? – Ja, ich sehe dich.|Do you see me? – Yes, I see you.}}
{{Kannst du mir helfen? – Ja, ich helfe dir.|Can you help me? – Yes, I’ll help you.}}
{{Der Film? Ich finde ihn super.|The film? I think it’s great. (der Film → ihn)}}
<h3>Order of two objects</h3>
${tb(['Situation', 'Rule', 'Example'], [
      ['two nouns', 'Dativ before Akkusativ', 'Ich gebe dem Mann das Buch.'],
      ['pronoun + noun', 'pronoun first', 'Ich gebe ihm das Buch. / Ich gebe es dem Mann.'],
      ['two pronouns', 'Akkusativ before Dativ', 'Ich gebe es ihm.'],
    ], [2])}
<div class="rule">Short words (pronouns) come before long words (nouns). Two pronouns: <b>Akk before Dat</b> (“es ihm”, “ihn ihr”).</div>
{{Wann bringst du mir das Buch? – Ich bringe es dir morgen.|When will you bring me the book? – I’ll bring it to you tomorrow.}}`,
  });

  G('review-week2', {
    title: 'Cheat sheet: Week 2', de: 'Zusammenfassung Woche 2', level: 'A1', day: 14,
    summary: 'Sentence bracket, cases & prepositions on one page',
    html: `
<h3>The sentence bracket (Satzklammer)</h3>
<div class="slots"><span>Ich</span><span class="v">stehe</span><span>um 7 Uhr</span><span class="v2">auf.</span></div>
<div class="slots"><span>Ich</span><span class="v">muss</span><span>um 7 Uhr</span><span class="v2">aufstehen.</span></div>
<h3>Articles in three cases</h3>
${tb(['', 'masc.', 'fem.', 'neut.', 'plural'], [
      ['Nom.', 'der / ein', 'die / eine', 'das / ein', 'die / –'],
      ['Akk.', 'den / einen', 'die / eine', 'das / ein', 'die / –'],
      ['Dat.', 'dem / einem', 'der / einer', 'dem / einem', 'den / – (+n)'],
    ])}
<h3>Prepositions</h3>
${tb(['Accusative', 'Dative', 'Two-way (Wo? Dat / Wohin? Akk)'], [
      ['durch, für, gegen, ohne, um, bis', 'aus, bei, mit, nach, seit, von, zu, gegenüber', 'an, auf, hinter, in, neben, über, unter, vor, zwischen'],
    ])}
<h3>Top 5 mistakes</h3>
<ol>
<li><s>Ich muss aufstehen um 7</s> → <b>Ich muss um 7 aufstehen.</b></li>
<li><s>Du musst nicht rauchen</s> (= don’t have to) vs <b>Du darfst nicht rauchen</b> (= forbidden).</li>
<li><s>mit der Bus</s> → <b>mit dem Bus</b> (mit + Dativ).</li>
<li><s>Ich bin kalt</s> → <b>Mir ist kalt.</b></li>
<li><s>Ich gehe in der Küche</s> → <b>Ich gehe in die Küche</b> (Wohin? → Akk).</li>
</ol>`,
  });
})();
