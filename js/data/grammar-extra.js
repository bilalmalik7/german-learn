/* Reference-only grammar topics (not tied to a single day) – completes the A–Z. */
(function () {
  'use strict';
  const tb = GL.tb;
  const G = (id, o) => (GL.grammar[id] = o);

  G('irregular-verbs', {
    title: 'Irregular verbs – master list', de: 'Liste der unregelmäßigen Verben', level: 'A2',
    summary: 'Present (er), Präteritum, Perfekt of 60 key verbs',
    html: `
<p>Learn verbs in their <b>principal parts</b>: infinitive – er-form present – Präteritum – Perfekt. Say them as a chant: <i>sprechen – spricht – sprach – hat gesprochen</i>.</p>
${tb(['Infinitive', 'er/sie/es (present)', 'Präteritum', 'Perfekt', 'English'], [
      ['backen', 'backt', 'backte', 'hat gebacken', 'bake'],
      ['beginnen', 'beginnt', 'begann', 'hat begonnen', 'begin'],
      ['bekommen', 'bekommt', 'bekam', 'hat bekommen', 'get, receive'],
      ['bieten', 'bietet', 'bot', 'hat geboten', 'offer'],
      ['bitten', 'bittet', 'bat', 'hat gebeten', 'ask, request'],
      ['bleiben', 'bleibt', 'blieb', 'ist geblieben', 'stay'],
      ['brechen', 'bricht', 'brach', 'hat gebrochen', 'break'],
      ['bringen', 'bringt', 'brachte', 'hat gebracht', 'bring'],
      ['denken', 'denkt', 'dachte', 'hat gedacht', 'think'],
      ['dürfen', 'darf', 'durfte', 'hat gedurft', 'be allowed'],
      ['empfehlen', 'empfiehlt', 'empfahl', 'hat empfohlen', 'recommend'],
      ['essen', 'isst', 'aß', 'hat gegessen', 'eat'],
      ['fahren', 'fährt', 'fuhr', 'ist gefahren', 'drive, go'],
      ['fallen', 'fällt', 'fiel', 'ist gefallen', 'fall'],
      ['finden', 'findet', 'fand', 'hat gefunden', 'find'],
      ['fliegen', 'fliegt', 'flog', 'ist geflogen', 'fly'],
      ['geben', 'gibt', 'gab', 'hat gegeben', 'give'],
      ['gefallen', 'gefällt', 'gefiel', 'hat gefallen', 'please'],
      ['gehen', 'geht', 'ging', 'ist gegangen', 'go'],
      ['gewinnen', 'gewinnt', 'gewann', 'hat gewonnen', 'win'],
      ['haben', 'hat', 'hatte', 'hat gehabt', 'have'],
      ['halten', 'hält', 'hielt', 'hat gehalten', 'hold, stop'],
      ['heißen', 'heißt', 'hieß', 'hat geheißen', 'be called'],
      ['helfen', 'hilft', 'half', 'hat geholfen', 'help'],
      ['kennen', 'kennt', 'kannte', 'hat gekannt', 'know'],
      ['kommen', 'kommt', 'kam', 'ist gekommen', 'come'],
      ['können', 'kann', 'konnte', 'hat gekonnt', 'can'],
      ['lassen', 'lässt', 'ließ', 'hat gelassen', 'let, leave'],
      ['laufen', 'läuft', 'lief', 'ist gelaufen', 'run, walk'],
      ['leihen', 'leiht', 'lieh', 'hat geliehen', 'lend'],
      ['lesen', 'liest', 'las', 'hat gelesen', 'read'],
      ['liegen', 'liegt', 'lag', 'hat gelegen', 'lie'],
      ['mögen', 'mag', 'mochte', 'hat gemocht', 'like'],
      ['müssen', 'muss', 'musste', 'hat gemusst', 'must'],
      ['nehmen', 'nimmt', 'nahm', 'hat genommen', 'take'],
      ['nennen', 'nennt', 'nannte', 'hat genannt', 'name'],
      ['rennen', 'rennt', 'rannte', 'ist gerannt', 'run'],
      ['riechen', 'riecht', 'roch', 'hat gerochen', 'smell'],
      ['rufen', 'ruft', 'rief', 'hat gerufen', 'call'],
      ['scheinen', 'scheint', 'schien', 'hat geschienen', 'shine, seem'],
      ['schlafen', 'schläft', 'schlief', 'hat geschlafen', 'sleep'],
      ['schließen', 'schließt', 'schloss', 'hat geschlossen', 'close'],
      ['schneiden', 'schneidet', 'schnitt', 'hat geschnitten', 'cut'],
      ['schreiben', 'schreibt', 'schrieb', 'hat geschrieben', 'write'],
      ['schwimmen', 'schwimmt', 'schwamm', 'ist geschwommen', 'swim'],
      ['sehen', 'sieht', 'sah', 'hat gesehen', 'see'],
      ['sein', 'ist', 'war', 'ist gewesen', 'be'],
      ['singen', 'singt', 'sang', 'hat gesungen', 'sing'],
      ['sitzen', 'sitzt', 'saß', 'hat gesessen', 'sit'],
      ['sprechen', 'spricht', 'sprach', 'hat gesprochen', 'speak'],
      ['stehen', 'steht', 'stand', 'hat gestanden', 'stand'],
      ['steigen', 'steigt', 'stieg', 'ist gestiegen', 'climb, rise'],
      ['sterben', 'stirbt', 'starb', 'ist gestorben', 'die'],
      ['tragen', 'trägt', 'trug', 'hat getragen', 'carry, wear'],
      ['treffen', 'trifft', 'traf', 'hat getroffen', 'meet'],
      ['trinken', 'trinkt', 'trank', 'hat getrunken', 'drink'],
      ['tun', 'tut', 'tat', 'hat getan', 'do'],
      ['vergessen', 'vergisst', 'vergaß', 'hat vergessen', 'forget'],
      ['verlieren', 'verliert', 'verlor', 'hat verloren', 'lose'],
      ['verstehen', 'versteht', 'verstand', 'hat verstanden', 'understand'],
      ['waschen', 'wäscht', 'wusch', 'hat gewaschen', 'wash'],
      ['werden', 'wird', 'wurde', 'ist geworden', 'become'],
      ['werfen', 'wirft', 'warf', 'hat geworfen', 'throw'],
      ['wissen', 'weiß', 'wusste', 'hat gewusst', 'know (fact)'],
      ['wollen', 'will', 'wollte', 'hat gewollt', 'want'],
      ['ziehen', 'zieht', 'zog', 'hat/ist gezogen', 'pull / move'],
    ], [0, 1, 2, 3])}
<div class="tip">Vowel patterns help: <b>i – a – u</b> (trinken, trank, getrunken; finden, fand, gefunden; singen, sang, gesungen) · <b>ei – ie – ie</b> (schreiben, schrieb, geschrieben; bleiben, blieb, geblieben) · <b>ie – o – o</b> (fliegen, flog, geflogen).</div>`,
  });

  G('konjunktiv1', {
    title: 'Konjunktiv I (indirect speech)', de: 'Der Konjunktiv I – indirekte Rede', level: 'B1',
    summary: 'Er sagt, er sei krank. – used in news',
    html: `
<p>Konjunktiv I reports what someone <b>said</b> without confirming it. You meet it mainly in <b>news and newspapers</b>. You need to <i>recognise</i> it; in speech people use the indicative or Konjunktiv II.</p>
${tb(['', 'sein', 'haben', 'werden', 'können', 'kommen'], [
      ['ich', 'sei', '(hätte)', '(würde)', 'könne', '(käme)'],
      ['du', 'sei(e)st', 'habest', 'werdest', 'könnest', 'kommest'],
      ['er/sie/es', '<b>sei</b>', '<b>habe</b>', '<b>werde</b>', '<b>könne</b>', '<b>komme</b>'],
      ['wir', 'seien', '(hätten)', '(würden)', '(könnten)', '(kämen)'],
      ['sie/Sie', 'seien', '(hätten)', '(würden)', '(könnten)', '(kämen)'],
    ], [1, 2, 3, 4, 5])}
<p>Formation: stem + <b>-e</b> (er komm<b>e</b>, er hab<b>e</b>). When the form looks like the indicative, Konjunktiv II is used instead (in brackets).</p>
{{Der Minister sagte, die Lage sei stabil.|The minister said the situation was stable.}}
{{Sie erklärte, sie habe keine Zeit.|She explained that she had no time.}}
{{Er sagt, er komme morgen.|He says he is coming tomorrow.}}
<div class="note">Past: <b>sei / habe + Partizip II</b>: [[Er sagte, er habe das nicht gewusst.]]</div>`,
  });

  G('futur2', {
    title: 'Futur II (future perfect)', de: 'Das Futur II', level: 'B1',
    summary: 'Ich werde es geschafft haben. – also for assumptions about the past',
    html: `
<div class="formula">werden + Partizip II + haben/sein</div>
{{Morgen um diese Zeit werde ich die Prüfung geschrieben haben.|By this time tomorrow I will have written the exam.}}
<p>More common: an <b>assumption about the past</b>, usually with <i>wohl</i>:</p>
{{Er wird wohl den Bus verpasst haben.|He has probably missed the bus.}}
{{Sie wird schon nach Hause gegangen sein.|She has probably gone home already.}}`,
  });

  G('modal-particles', {
    title: 'Modal particles: doch, mal, ja, denn, eben …', de: 'Modalpartikeln', level: 'A2',
    summary: 'The little words that make you sound native',
    html: `
<p>Germans constantly use small words that add <b>tone and feeling</b>. They have no exact translation, but without them your German sounds like a textbook.</p>
${tb(['Particle', 'Effect', 'Example'], [
      ['mal', 'softens requests (“just”)', 'Kannst du mal kommen?'],
      ['doch', 'encourages; “come on”; contradicts', 'Komm doch mit! / Das weißt du doch!'],
      ['ja', '“as we both know”; surprise', 'Das ist ja toll! / Du weißt ja, ich habe keine Zeit.'],
      ['denn', 'makes questions friendlier / curious', 'Was machst du denn hier?'],
      ['eben / halt', 'that’s just how it is', 'Das ist halt so.'],
      ['schon', 'reassurance; “sure, but”', 'Das schaffst du schon! / Das ist schon schön, aber teuer.'],
      ['eigentlich', '“actually”, changes topic', 'Wie heißt du eigentlich?'],
      ['wohl', 'probably', 'Er ist wohl krank.'],
    ], [2])}
<div class="tip">Start with three: <b>mal</b> in requests, <b>denn</b> in questions, <b>doch</b> in invitations: [[Komm doch mal vorbei!]]</div>`,
  });

  G('question-words', {
    title: 'All question words (welcher, was für ein …)', de: 'Fragewörter komplett', level: 'A1',
    summary: 'wer, wen, wem, wessen, welcher, was für ein, womit …',
    html: `
${tb(['Question word', 'Meaning', 'Example'], [
      ['wer / wen / wem / wessen', 'who / whom (Akk) / to whom (Dat) / whose', 'Wem gehört das? – Mir.'],
      ['was', 'what', 'Was ist das?'],
      ['welcher / welche / welches', 'which (one)', 'Welchen Film möchtest du sehen?'],
      ['was für ein(e)', 'what kind of', 'Was für ein Auto hast du?'],
      ['wo / wohin / woher', 'where / where to / where from', 'Woher kommst du?'],
      ['wann / seit wann / bis wann', 'when / since when / until when', 'Seit wann wohnst du hier?'],
      ['wie lange / wie oft', 'how long / how often', 'Wie oft machst du Sport?'],
      ['wie viel / wie viele', 'how much / how many', 'Wie viele Geschwister hast du?'],
      ['warum / wieso / weshalb', 'why', 'Warum lernst du Deutsch?'],
      ['womit / wofür / worüber …', 'with what / for what / about what', 'Worüber sprecht ihr?'],
    ], [2])}
<div class="note"><b>welcher</b> declines like <i>der</i> (welchen, welchem …). <b>was für ein</b> declines like <i>ein</i>: [[Mit was für einem Bus fährst du?]]</div>`,
  });

  G('es-uses', {
    title: 'The many jobs of “es”', de: 'Das Wort „es“', level: 'A2',
    summary: 'es gibt, es regnet, es geht mir gut …',
    html: `
<p>Besides “it”, <b>es</b> is a grammatical placeholder in many fixed expressions:</p>
${tb(['Use', 'Example'], [
      ['es gibt + Akk (there is/are)', 'Es gibt hier einen Park.'],
      ['weather', 'Es regnet. Es schneit. Es ist kalt.'],
      ['time', 'Es ist acht Uhr. Es ist spät.'],
      ['how someone is', 'Wie geht es dir? – Es geht mir gut.'],
      ['es geht um (it is about)', 'Es geht um deine Zukunft.'],
      ['es tut mir leid', 'Es tut mir leid!'],
      ['place-holder in position 1', 'Es kommen heute viele Gäste. (= Heute kommen viele Gäste.)'],
      ['announcing a clause', 'Es ist schön, dass du da bist.'],
    ], [1])}`,
  });

  G('indefinite-pronouns', {
    title: 'man, jemand, niemand, etwas, nichts, alle …', de: 'Indefinitpronomen', level: 'A2',
    summary: 'man sagt … · Hat jemand Zeit?',
    html: `
${tb(['Pronoun', 'Meaning', 'Example'], [
      ['man', 'one, you, people (general)', 'Wie sagt man das auf Deutsch?'],
      ['jemand / niemand', 'someone / nobody', 'Ist jemand da? – Nein, niemand.'],
      ['etwas / nichts', 'something / nothing', 'Möchtest du etwas trinken? – Nein, nichts, danke.'],
      ['alles / alle', 'everything / everybody', 'Alles klar! Alle sind da.'],
      ['jeder / jede / jedes', 'every(one)', 'Jeder kann Deutsch lernen.'],
      ['einer / eine / eins', 'one (of them)', 'Hast du einen Stift? – Ja, ich habe einen.'],
      ['keiner / keine / keins', 'none, nobody', 'Hast du ein Auto? – Nein, ich habe keins.'],
      ['viele / einige / wenige', 'many / some / few', 'Viele Leute sprechen Englisch.'],
    ], [2])}
<div class="warn"><b>man</b> always takes the er/sie/es verb form: [[Man spricht hier Deutsch.]] Its accusative is <b>einen</b>, dative <b>einem</b>.</div>
<div class="note">With <b>etwas/nichts/viel</b> + adjective, the adjective becomes a capitalised noun with -es: [[etwas Neues]], [[nichts Besonderes]], [[viel Gutes]].</div>`,
  });

  G('adjective-nouns', {
    title: 'Adjectives & participles used as nouns or adjectives', de: 'Partizipien als Adjektive · nominalisierte Adjektive', level: 'B1',
    summary: 'der lachende Junge, das gekochte Ei, ein Deutscher',
    html: `
<h3>Participles as adjectives</h3>
<p><b>Partizip I</b> (infinitive + d) = something happening: [[der lachende Junge]] (the laughing boy), [[kochendes Wasser]].<br><b>Partizip II</b> = something done/finished: [[das gekochte Ei]] (the boiled egg), [[die geschlossene Tür]]. They take normal adjective endings.</p>
<h3>Adjectives as nouns</h3>
<p>Some adjectives become nouns but <b>keep adjective endings</b>:</p>
${tb(['', 'after der', 'after ein'], [
      ['masc.', 'der Deutsche, der Bekannte', 'ein Deutscher, ein Bekannter'],
      ['fem.', 'die Deutsche, die Bekannte', 'eine Deutsche, eine Bekannte'],
      ['plural', 'die Deutschen', '– Deutsche'],
    ], [1, 2])}
{{Er ist Deutscher, sie ist Deutsche.|He is German, she is German.}}
{{Das Gute ist, dass wir Zeit haben.|The good thing is that we have time.}}
<p>Others: der/die Erwachsene (adult), Verwandte (relative), Kranke (sick person), Angestellte (employee), Jugendliche (young person).</p>`,
  });

  G('demonstratives', {
    title: 'Demonstratives: dieser, jener, der da', de: 'Demonstrativpronomen', level: 'A2',
    summary: 'dieser Film, der da, das hier',
    html: `
<p><b>dieser</b> (this) declines like <i>der</i>: dieser Mann, diese Frau, dieses Kind, diese Leute; Akk diesen Mann …</p>
{{Dieser Pullover ist schön, aber der da ist billiger.|This pullover is nice, but that one there is cheaper.}}
<p>In speech, the definite article is used as a stressed pronoun: [[Der ist nett.]] (He’s nice.) · [[Die kenne ich nicht.]] (I don’t know her.) · [[Das finde ich gut.]]</p>
<div class="note"><b>jener</b> (that) exists but is rare in speech – use <b>der … da / dort</b>.</div>`,
  });

  G('hin-her', {
    title: 'hin & her – direction words', de: 'hin und her', level: 'A2',
    summary: 'Komm her! Geh hin! · hinein, heraus, herunter …',
    html: `
<p><b>her</b> = towards the speaker · <b>hin</b> = away from the speaker.</p>
{{Komm her! – Geh hin!|Come here! – Go there!}}
{{Woher kommst du? – Wohin gehst du?|Where are you from? – Where are you going?}}
<p>Combined with prepositions: <b>herein / hinein</b> (in), <b>heraus / hinaus</b> (out), <b>herunter / hinunter</b> (down), <b>herauf / hinauf</b> (up). Colloquially shortened to <b>rein, raus, runter, rauf</b>.</p>
{{Kommen Sie herein! / Komm rein!|Come in!}}
{{Ich gehe raus.|I’m going out.}}`,
  });

  G('word-formation', {
    title: 'Word formation: build 1000 words from 100', de: 'Wortbildung', level: 'A2',
    summary: '-ung, -heit, -keit, -lich, -bar, un-, compound nouns',
    html: `
<p>German builds words like LEGO. Knowing these pieces multiplies your vocabulary.</p>
${tb(['Piece', 'Function', 'Examples'], [
      ['-ung (die)', 'verb → noun', 'wohnen → die Wohnung, erklären → die Erklärung'],
      ['-heit / -keit (die)', 'adjective → noun', 'frei → die Freiheit, möglich → die Möglichkeit'],
      ['-er (der) / -erin (die)', 'person who does', 'lehren → der Lehrer / die Lehrerin'],
      ['-lich / -ig', 'noun → adjective', 'der Freund → freundlich, die Lust → lustig'],
      ['-bar', '“-able”', 'essen → essbar, trinken → trinkbar'],
      ['-los', '“-less”', 'die Arbeit → arbeitslos, das Ende → endlos'],
      ['un-', 'opposite', 'glücklich → unglücklich, möglich → unmöglich'],
      ['-chen / -lein (das)', 'small/cute', 'das Brot → das Brötchen, das Haus → das Häuschen'],
    ], [])}
<h3>Compound nouns</h3>
{{der Kühlschrank = kühl + der Schrank|fridge = cool + cupboard}}
{{das Krankenhaus = krank + das Haus|hospital = sick + house}}
{{der Handschuh = die Hand + der Schuh|glove = hand + shoe}}
<div class="tip">The last part gives the gender and the main meaning. Often an <b>-s-</b> or <b>-n-</b> glues the parts: die Arbeit<b>s</b>zeit, die Straße<b>n</b>bahn.</div>`,
  });

  G('prepositions-time', {
    title: 'Time prepositions: vor, seit, ab, in, nach, bis …', de: 'Temporale Präpositionen', level: 'A2',
    summary: 'vor zwei Jahren · seit einem Jahr · in einer Woche',
    html: `
${tb(['Preposition', 'Meaning', 'Example'], [
      ['um', 'at (clock)', 'um 8 Uhr'],
      ['am', 'on (day, date, part of day)', 'am Montag, am 5. Mai, am Abend'],
      ['im', 'in (month, season)', 'im Juli, im Winter'],
      ['vor + Dat', 'ago; before', 'vor zwei Jahren / vor dem Essen'],
      ['nach + Dat', 'after', 'nach der Arbeit'],
      ['seit + Dat', 'since / for (still true)', 'seit einem Jahr'],
      ['ab + Dat', 'from … on', 'ab nächster Woche'],
      ['in + Dat', 'in (future)', 'in einer Stunde'],
      ['bis', 'until / by', 'bis Freitag, bis morgen'],
      ['von … bis', 'from … to', 'von 9 bis 17 Uhr'],
      ['während + Gen', 'during', 'während der Pause'],
      ['innerhalb + Gen', 'within', 'innerhalb einer Woche'],
      ['für + Akk', 'for (planned duration)', 'Ich fahre für zwei Wochen nach Italien.'],
    ], [2])}
<div class="warn">“for two years” (still continuing) = <b>seit zwei Jahren</b> + present tense. “for two weeks” (planned) = <b>für zwei Wochen</b>. Completed duration: just the accusative: [[Ich war zwei Wochen in Italien.]]</div>`,
  });
})();
