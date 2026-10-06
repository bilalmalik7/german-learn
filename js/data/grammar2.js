/* Grammar topics – Weeks 3 & 4 (Days 15–30). */
(function () {
  'use strict';
  const tb = GL.tb;
  const G = (id, o) => (GL.grammar[id] = o);

  /* ===================== DAY 15 ===================== */
  G('perfekt-haben', {
    title: 'Perfekt (spoken past) with “haben”', de: 'Das Perfekt mit „haben“', level: 'A1', day: 15,
    summary: 'Ich habe gestern Pizza gegessen.',
    html: `
<p>When Germans <b>talk</b> about the past, they mostly use the <b>Perfekt</b>. It has two parts – another sentence bracket:</p>
<div class="formula">haben / sein (position 2) + Partizip II (end)</div>
<div class="slots"><span class="s">Ich</span><span class="v">habe<small>pos. 2</small></span><span>gestern Pizza</span><span class="v2">gegessen.<small>participle · END</small></span></div>
<p>Most verbs use <b>haben</b>. (Movement & change verbs use <i>sein</i> – tomorrow.)</p>
<h3>How to build the Partizip II</h3>
${tb(['Verb type', 'Pattern', 'Examples'], [
      ['regular (weak)', '<b>ge</b> + stem + <b>t</b>', 'machen → <b>ge</b>mach<b>t</b>, kaufen → gekauft, spielen → gespielt, lernen → gelernt, hören → gehört, wohnen → gewohnt'],
      ['stem in -t/-d', '<b>ge</b> + stem + <b>et</b>', 'arbeiten → gearbeit<b>et</b>, warten → gewartet, kosten → gekostet'],
      ['irregular (strong)', '<b>ge</b> + (new) stem + <b>en</b>', 'sehen → geseh<b>en</b>, essen → gegessen, trinken → getrunk<b>en</b>, schreiben → geschrieben'],
      ['mixed', '<b>ge</b> + new stem + <b>t</b>', 'bringen → gebracht, denken → gedacht, kennen → gekannt, wissen → gewusst'],
      ['-ieren verbs', 'NO ge-, + <b>t</b>', 'studieren → studiert, telefonieren → telefoniert, fotografieren → fotografiert'],
      ['inseparable prefix (be-, ver-, er-, ent-, emp-, ge-, miss-, zer-)', 'NO ge-', 'besuchen → besucht, verstehen → verstanden, erklären → erklärt, bekommen → bekommen, vergessen → vergessen'],
    ], [2])}
<h3>Common irregular participles with haben</h3>
${tb(['Infinitive', 'Partizip II', 'Infinitive', 'Partizip II'], [
      ['essen', 'gegessen', 'trinken', 'getrunken'],
      ['sehen', 'gesehen', 'lesen', 'gelesen'],
      ['schreiben', 'geschrieben', 'sprechen', 'gesprochen'],
      ['nehmen', 'genommen', 'geben', 'gegeben'],
      ['finden', 'gefunden', 'helfen', 'geholfen'],
      ['treffen', 'getroffen', 'schlafen', 'geschlafen'],
      ['singen', 'gesungen', 'waschen', 'gewaschen'],
      ['tun', 'getan', 'haben', 'gehabt'],
    ], [0, 1, 2, 3])}
<h3>Word order</h3>
{{Gestern habe ich einen Film gesehen.|Yesterday I watched a film. (verb 2nd, participle last)}}
{{Hast du schon gefrühstückt?|Have you had breakfast yet?}}
{{Was hast du am Wochenende gemacht?|What did you do at the weekend?}}
{{Ich habe gestern nicht gearbeitet.|I didn’t work yesterday. (nicht before the participle)}}
<div class="note">The German Perfekt translates English simple past <i>and</i> present perfect: “I ate” and “I have eaten” are both <b>Ich habe gegessen</b>.</div>`,
  });

  /* ===================== DAY 16 ===================== */
  G('perfekt-sein', {
    title: 'Perfekt with “sein” & separable verbs', de: 'Das Perfekt mit „sein“ · trennbare Verben', level: 'A1', day: 16,
    summary: 'Ich bin nach Berlin gefahren. Ich bin aufgestanden.',
    html: `
<div class="rule">Use <b>sein</b> instead of haben with verbs that have <b>no accusative object</b> and express:<br>
1. <b>movement from A to B</b>: gehen, fahren, fliegen, kommen, laufen, reisen, schwimmen, fallen, steigen, umziehen<br>
2. <b>a change of state</b>: aufstehen, aufwachen, einschlafen, werden, sterben, wachsen, passieren<br>
3. and: <b>sein, bleiben</b></div>
${tb(['', 'gehen (sein)'], [
      ['ich', 'bin gegangen'], ['du', 'bist gegangen'], ['er/sie/es', 'ist gegangen'],
      ['wir', 'sind gegangen'], ['ihr', 'seid gegangen'], ['sie/Sie', 'sind gegangen'],
    ], [1])}
{{Wir sind nach Italien geflogen.|We flew to Italy.}}
{{Was ist passiert?|What happened?}}
{{Ich bin zu Hause geblieben.|I stayed at home.}}
{{Er ist Arzt geworden.|He became a doctor.}}
<h3>Separable verbs: -ge- goes in the middle</h3>
${tb(['Infinitive', 'Partizip II', 'Example'], [
      ['aufstehen', 'auf<b>ge</b>standen', 'Ich bin um 7 Uhr aufgestanden.'],
      ['einkaufen', 'ein<b>ge</b>kauft', 'Hast du schon eingekauft?'],
      ['anrufen', 'an<b>ge</b>rufen', 'Lena hat mich angerufen.'],
      ['fernsehen', 'fern<b>ge</b>sehen', 'Wir haben ferngesehen.'],
      ['mitkommen', 'mit<b>ge</b>kommen', 'Max ist mitgekommen.'],
      ['ankommen', 'an<b>ge</b>kommen', 'Der Zug ist pünktlich angekommen.'],
      ['ausprobieren', 'ausprobiert (-ieren: no ge)', 'Ich habe das Rezept ausprobiert.'],
    ], [1, 2])}
<h3>The big list: participles you need every day</h3>
${tb(['Infinitive', 'Perfekt', 'Infinitive', 'Perfekt'], [
      ['gehen', 'ist gegangen', 'kommen', 'ist gekommen'],
      ['fahren', 'ist gefahren', 'fliegen', 'ist geflogen'],
      ['laufen', 'ist gelaufen', 'schwimmen', 'ist geschwommen'],
      ['bleiben', 'ist geblieben', 'sein', 'ist gewesen'],
      ['werden', 'ist geworden', 'passieren', 'ist passiert'],
      ['aufstehen', 'ist aufgestanden', 'einschlafen', 'ist eingeschlafen'],
      ['essen', 'hat gegessen', 'trinken', 'hat getrunken'],
      ['schlafen', 'hat geschlafen', 'sprechen', 'hat gesprochen'],
      ['sehen', 'hat gesehen', 'lesen', 'hat gelesen'],
      ['nehmen', 'hat genommen', 'treffen', 'hat getroffen'],
      ['bringen', 'hat gebracht', 'denken', 'hat gedacht'],
      ['vergessen', 'hat vergessen', 'verstehen', 'hat verstanden'],
    ], [1, 3])}
<div class="warn">With an accusative object, movement verbs take <b>haben</b>: [[Ich bin nach Hause gefahren.]] but [[Ich habe das Auto gefahren.]]</div>
<div class="note">In southern Germany, Austria and Switzerland people also say <i>ich bin gesessen / gestanden / gelegen</i>. In the north: <i>ich habe gesessen</i>. Both are correct.</div>`,
  });

  /* ===================== DAY 17 ===================== */
  G('praeteritum-basic', {
    title: 'Präteritum of sein, haben & modal verbs', de: 'Präteritum: war, hatte, konnte …', level: 'A2', day: 17,
    summary: 'ich war, ich hatte, ich konnte, es gab',
    html: `
<p>For <b>sein, haben</b> and the <b>modal verbs</b>, Germans prefer the simple past (Präteritum) even when speaking. “Ich war im Kino” sounds more natural than “Ich bin im Kino gewesen”.</p>
${tb(['', 'sein', 'haben', 'können', 'müssen', 'wollen', 'dürfen', 'sollen'], [
      ['ich', 'war', 'hatte', 'konnte', 'musste', 'wollte', 'durfte', 'sollte'],
      ['du', 'warst', 'hattest', 'konntest', 'musstest', 'wolltest', 'durftest', 'solltest'],
      ['er/sie/es', 'war', 'hatte', 'konnte', 'musste', 'wollte', 'durfte', 'sollte'],
      ['wir', 'waren', 'hatten', 'konnten', 'mussten', 'wollten', 'durften', 'sollten'],
      ['ihr', 'wart', 'hattet', 'konntet', 'musstet', 'wolltet', 'durftet', 'solltet'],
      ['sie/Sie', 'waren', 'hatten', 'konnten', 'mussten', 'wollten', 'durften', 'sollten'],
    ], [1, 2, 3, 4, 5, 6, 7])}
<div class="rule">1) ich = er/sie/es (no ending). 2) Modal verbs <b>lose their umlaut</b>: können → konnte, müssen → musste, dürfen → durfte. 3) mögen → mochte, wissen → wusste.</div>
{{Gestern war ich müde.|Yesterday I was tired.}}
{{Wir hatten keine Zeit.|We had no time.}}
{{Als Kind konnte ich nicht schwimmen.|As a child I couldn’t swim.}}
{{Ich musste lange warten.|I had to wait a long time.}}
{{Früher gab es hier ein Kino.|There used to be a cinema here. (es gibt → es gab)}}
<h3>Past time expressions</h3>
<p>[[gestern]] (yesterday) · [[vorgestern]] (the day before yesterday) · [[letzte Woche]] · [[letztes Jahr]] · [[vor zwei Jahren]] (two years ago) · [[früher]] (in the past) · [[damals]] (back then) · [[als Kind]] (as a child)</p>
<div class="tip">Mix like natives: Präteritum for <i>war/hatte/modals</i>, Perfekt for everything else: [[Ich war gestern in der Stadt und habe ein Buch gekauft.]]</div>`,
  });

  /* ===================== DAY 18 ===================== */
  G('conjunctions', {
    title: 'Connecting sentences: und, aber, denn, deshalb …', de: 'Konjunktionen und Konnektoren', level: 'A2', day: 18,
    summary: 'Position 0 conjunctions vs adverbs that take position 1',
    html: `
<p>There are three kinds of connectors – each has its own word order. Mastering this makes your German sound fluent.</p>
<h3>Type 1 – “position 0”: und, aber, oder, denn, sondern</h3>
<p>They stand <b>between</b> two main clauses and do <b>not</b> count as a position. Normal word order follows.</p>
<div class="slots"><span>Ich bin müde,</span><span style="background:var(--gold);color:#3b2a00">denn<small>pos. 0</small></span><span class="s">ich<small>1</small></span><span class="v">habe<small>2</small></span><span>schlecht geschlafen.</span></div>
${tb(['Conjunction', 'Meaning', 'Example'], [
      ['und', 'and', 'Ich lerne Deutsch und mein Bruder lernt Englisch.'],
      ['aber', 'but', 'Das Hotel ist schön, aber es ist teuer.'],
      ['oder', 'or', 'Trinkst du Tee oder möchtest du Kaffee?'],
      ['denn', 'because, for', 'Ich bleibe zu Hause, denn ich bin krank.'],
      ['sondern', 'but rather (after a negative)', 'Er kommt nicht heute, sondern morgen.'],
    ], [2])}
<div class="tip">Mnemonic <b>ADUSO</b>: <b>A</b>ber, <b>D</b>enn, <b>U</b>nd, <b>S</b>ondern, <b>O</b>der.</div>
<h3>Type 2 – adverbs in position 1: deshalb, trotzdem, dann …</h3>
<p>These words <b>take position 1</b>, so the verb comes right after them and the subject follows the verb.</p>
<div class="slots"><span>Ich bin müde,</span><span>deshalb<small>1</small></span><span class="v">gehe<small>2</small></span><span class="s">ich</span><span>ins Bett.</span></div>
${tb(['Adverb', 'Meaning', 'Example'], [
      ['deshalb / deswegen / darum', 'that’s why, therefore', 'Es regnet, deshalb bleibe ich zu Hause.'],
      ['trotzdem', 'nevertheless, anyway', 'Es regnet, trotzdem gehe ich spazieren.'],
      ['dann / danach', 'then / afterwards', 'Zuerst frühstücke ich, dann gehe ich zur Arbeit.'],
      ['außerdem', 'besides, also', 'Die Wohnung ist groß, außerdem ist sie billig.'],
      ['sonst', 'otherwise', 'Beeil dich, sonst verpasst du den Bus.'],
    ], [2])}
<h3>Two-part connectors</h3>
{{Ich trinke entweder Tee oder Kaffee.|either … or}}
{{Sie spricht sowohl Englisch als auch Deutsch.|both … and}}
{{Er hat weder Zeit noch Geld.|neither … nor}}
{{Sie ist nicht nur klug, sondern auch nett.|not only … but also}}
<p>Type 3 (subordinating conjunctions like <i>weil, dass</i>) send the verb to the end – see the next topic.</p>`,
  });

  G('subordinate', {
    title: 'Subordinate clauses: weil, dass, wenn, ob, als …', de: 'Nebensätze', level: 'A2', day: 18,
    summary: 'The conjugated verb goes to the END',
    html: `
<p>A subordinate clause cannot stand alone. It starts with a <b>subordinating conjunction</b>, is separated by a <b>comma</b>, and its <b>conjugated verb goes to the very end</b>.</p>
<div class="slots"><span>Ich lerne Deutsch,</span><span style="background:var(--gold);color:#3b2a00">weil</span><span class="s">ich</span><span>in Berlin</span><span class="v">wohne.<small>END</small></span></div>
${tb(['Conjunction', 'Meaning', 'Example'], [
      ['weil', 'because', 'Ich bleibe zu Hause, weil ich krank bin.'],
      ['dass', 'that', 'Ich glaube, dass er recht hat.'],
      ['wenn', 'if; when(ever)', 'Wenn das Wetter gut ist, gehen wir schwimmen.'],
      ['ob', 'whether, if (yes/no)', 'Ich weiß nicht, ob sie kommt.'],
      ['als', 'when (one event in the past)', 'Als ich klein war, wohnte ich in Köln.'],
      ['obwohl', 'although', 'Er arbeitet, obwohl er krank ist.'],
      ['bevor', 'before', 'Bevor ich schlafe, lese ich.'],
      ['während', 'while', 'Während ich koche, höre ich Musik.'],
      ['damit', 'so that', 'Ich spreche langsam, damit du mich verstehst.'],
      ['bis', 'until', 'Warte, bis ich komme.'],
      ['seit(dem)', 'since', 'Seit ich hier wohne, bin ich glücklich.'],
    ], [2])}
<h3>Verb-final with two verbs</h3>
<p>The <b>conjugated</b> verb is the very last word – after the infinitive or participle. Separable verbs join again.</p>
{{…, weil ich heute arbeiten muss.|…because I have to work today.}}
{{…, weil ich gestern viel gearbeitet habe.|…because I worked a lot yesterday.}}
{{…, weil ich jeden Tag früh aufstehe.|…because I get up early every day. (auf + stehe together)}}
<h3>Subordinate clause first → “verb, verb”</h3>
<p>The whole subordinate clause counts as <b>position 1</b>. So the main clause starts with its verb:</p>
<div class="slots"><span>Wenn ich Zeit habe,<small>pos. 1 (whole clause)</small></span><span class="v">komme<small>2</small></span><span class="s">ich</span><span>mit.</span></div>
{{Weil es regnet, bleiben wir zu Hause.|Because it’s raining, we’re staying at home.}}
<h3>wenn – als – wann</h3>
${tb(['Word', 'Use', 'Example'], [
      ['als', 'one single event / period in the past', 'Als ich 18 war, habe ich den Führerschein gemacht.'],
      ['wenn', 'present/future “if/when”, or repeated events (“whenever”)', 'Wenn ich nach Hause komme, rufe ich dich an.'],
      ['wann', 'question “when?” (also indirect)', 'Weißt du, wann der Zug kommt?'],
    ], [2])}
<h3>Indirect questions</h3>
<p>W-word or <b>ob</b> works like a conjunction: verb to the end.</p>
{{Wo wohnt er? → Weißt du, wo er wohnt?|Do you know where he lives?}}
{{Kommt sie? → Ich frage mich, ob sie kommt.|I wonder whether she is coming.}}
<div class="warn"><b>weil</b> vs <b>denn</b>: same meaning, different order! [[…, weil ich krank bin.]] · [[…, denn ich bin krank.]]</div>`,
  });

  /* ===================== DAY 19 ===================== */
  G('reflexive', {
    title: 'Reflexive verbs (sich freuen, sich waschen …)', de: 'Reflexive Verben', level: 'A2', day: 19,
    summary: 'mich, dich, sich, uns, euch, sich – and mir/dir',
    html: `
<p>Reflexive verbs have a pronoun that refers back to the subject: <i>Ich wasche <b>mich</b></i> (I wash myself). Many German verbs are reflexive where English isn’t.</p>
${tb(['Person', 'Akkusativ', 'Dativ', 'Example'], [
      ['ich', 'mich', 'mir', 'Ich freue mich. / Ich wasche mir die Hände.'],
      ['du', 'dich', 'dir', 'Du freust dich. / Du putzt dir die Zähne.'],
      ['er/sie/es', '<b>sich</b>', '<b>sich</b>', 'Er freut sich.'],
      ['wir', 'uns', 'uns', 'Wir treffen uns.'],
      ['ihr', 'euch', 'euch', 'Ihr beeilt euch.'],
      ['sie/Sie', '<b>sich</b>', '<b>sich</b>', 'Setzen Sie sich, bitte!'],
    ], [3])}
<div class="rule">Use the <b>dative</b> reflexive pronoun (mir, dir) when there is <b>another accusative object</b> – typically a body part or clothing:<br>
[[Ich wasche mich.]] → [[Ich wasche mir die Haare.]] · [[Ich ziehe mich an.]] → [[Ich ziehe mir eine Jacke an.]]</div>
<h3>Common reflexive verbs</h3>
${tb(['Verb', 'Meaning', 'Example'], [
      ['sich freuen auf + Akk', 'look forward to', 'Ich freue mich auf das Wochenende.'],
      ['sich freuen über + Akk', 'be happy about', 'Sie freut sich über das Geschenk.'],
      ['sich interessieren für + Akk', 'be interested in', 'Interessierst du dich für Kunst?'],
      ['sich erinnern an + Akk', 'remember', 'Ich erinnere mich an den Tag.'],
      ['sich fühlen', 'feel', 'Ich fühle mich nicht gut.'],
      ['sich beeilen', 'hurry', 'Beeil dich!'],
      ['sich setzen', 'sit down', 'Setz dich!'],
      ['sich ausruhen', 'rest', 'Ich muss mich ausruhen.'],
      ['sich anziehen / ausziehen / umziehen', 'get dressed / undressed / changed', 'Ich ziehe mich schnell an.'],
      ['sich treffen (mit)', 'meet (up)', 'Wir treffen uns um acht.'],
      ['sich erkälten', 'catch a cold', 'Ich habe mich erkältet.'],
      ['sich vorstellen', 'introduce oneself', 'Darf ich mich vorstellen?'],
      ['sich (Dat) etwas vorstellen', 'imagine sth.', 'Das kann ich mir vorstellen.'],
      ['sich entschuldigen', 'apologise', 'Ich entschuldige mich.'],
    ], [2])}
<h3>Word order</h3>
<p>The reflexive pronoun comes <b>right after the conjugated verb</b> – or after a subject pronoun in inverted order:</p>
{{Morgen treffe ich mich mit Lena.|Tomorrow I’m meeting Lena.}}
{{Ich habe mich sehr gefreut.|I was very happy. (Perfekt: always haben)}}
{{…, weil ich mich nicht gut fühle.|…because I don’t feel well.}}
<div class="note">Reflexive verbs always build the Perfekt with <b>haben</b>.</div>
<h3>At the doctor’s: what hurts?</h3>
{{Mir tut der Kopf weh. / Ich habe Kopfschmerzen.|My head hurts. / I have a headache.}}
{{Mir tun die Füße weh.|My feet hurt. (plural → tun)}}`,
  });

  /* ===================== DAY 20 ===================== */
  G('adj-definite', {
    title: 'Adjective endings 1: after der, die, das', de: 'Adjektivdeklination nach dem bestimmten Artikel', level: 'A2', day: 20,
    summary: 'Only -e or -en: the five -e endings',
    html: `
<p>After a noun or <i>sein</i>, adjectives have <b>no ending</b>: [[Der Pullover ist rot.]] But <b>before a noun</b> they need an ending: [[der rote Pullover]].</p>
<p>After <b>der / die / das</b> (and <b>dieser, jeder, welcher, alle</b>) the article already shows gender and case – so the adjective only takes <b>-e</b> or <b>-en</b>.</p>
${tb(['', 'masculine', 'feminine', 'neuter', 'plural'], [
      ['Nom.', 'der neu<b>e</b> Rock', 'die neu<b>e</b> Hose', 'das neu<b>e</b> Hemd', 'die neu<b>en</b> Schuhe'],
      ['Akk.', 'den neu<b>en</b> Rock', 'die neu<b>e</b> Hose', 'das neu<b>e</b> Hemd', 'die neu<b>en</b> Schuhe'],
      ['Dat.', 'dem neu<b>en</b> Rock', 'der neu<b>en</b> Hose', 'dem neu<b>en</b> Hemd', 'den neu<b>en</b> Schuhen'],
      ['Gen.', 'des neu<b>en</b> Rocks', 'der neu<b>en</b> Hose', 'des neu<b>en</b> Hemds', 'der neu<b>en</b> Schuhe'],
    ], [1, 2, 3, 4])}
<div class="rule"><b>The five -e’s:</b> nominative singular (all three genders) + accusative feminine & neuter. <b>Everything else: -en.</b></div>
<div class="tip">A trick: if the article is <b>der, die</b> or <b>das</b> in its “dictionary form” (unchanged) and the noun is singular → <b>-e</b>. If the article has changed (den, dem, des) or it’s plural → <b>-en</b>.</div>
{{Der blaue Pullover ist schön.|The blue pullover is nice.}}
{{Ich nehme den blauen Pullover.|I’ll take the blue pullover. (Akk masc → -en)}}
{{Die schwarze Jacke gefällt mir.|I like the black jacket.}}
{{Mit dem neuen Handy mache ich tolle Fotos.|With the new phone I take great photos.}}
<h3>dieser, jeder, welcher</h3>
<p>Same endings as der/die/das: <b>dieser</b> (m), <b>diese</b> (f), <b>dieses</b> (n), <b>diese</b> (pl) · Akk: <b>diesen</b> … Adjectives after them behave exactly as after der.</p>
{{Welche Farbe hat dieser lange Mantel?|What colour is this long coat?}}
<div class="note">Spelling: adjectives in -el / -er lose an e: [[dunkel → die dunkle Farbe]], [[teuer → das teure Auto]]. <b>hoch → hohe</b>: [[der hohe Berg]].</div>`,
  });

  /* ===================== DAY 21 ===================== */
  G('adj-indefinite', {
    title: 'Adjective endings 2: after ein, kein, mein', de: 'Adjektivdeklination nach dem unbestimmten Artikel', level: 'A2', day: 21,
    summary: 'ein neuer Rock, ein neues Hemd',
    html: `
<p>After <b>ein, kein</b> and possessives (<b>mein, dein …</b>), three forms of the article have <b>no ending</b> (ein Rock, ein Hemd). There the adjective must show the gender itself.</p>
${tb(['', 'masculine', 'feminine', 'neuter', 'plural (keine/meine)'], [
      ['Nom.', 'ein neu<b>er</b> Rock', 'eine neu<b>e</b> Hose', 'ein neu<b>es</b> Hemd', 'meine neu<b>en</b> Schuhe'],
      ['Akk.', 'einen neu<b>en</b> Rock', 'eine neu<b>e</b> Hose', 'ein neu<b>es</b> Hemd', 'meine neu<b>en</b> Schuhe'],
      ['Dat.', 'einem neu<b>en</b> Rock', 'einer neu<b>en</b> Hose', 'einem neu<b>en</b> Hemd', 'meinen neu<b>en</b> Schuhen'],
      ['Gen.', 'eines neu<b>en</b> Rocks', 'einer neu<b>en</b> Hose', 'eines neu<b>en</b> Hemds', 'meiner neu<b>en</b> Schuhe'],
    ], [1, 2, 3, 4])}
<div class="rule">Same as after <i>der</i> – except the three “naked” places: <b>ein neu-er</b> (masc. nom.), <b>ein neu-es</b> (neut. nom. & akk.). Think: <b>der → -er</b>, <b>das → -es</b>.</div>
{{Das ist ein guter Film.|That’s a good film. (der Film → -er)}}
{{Ich habe ein kleines Problem.|I have a small problem. (das Problem → -es)}}
{{Sie trägt eine rote Jacke.|She is wearing a red jacket.}}
{{Er fährt mit seinem alten Fahrrad.|He rides his old bike.}}`,
  });

  G('adj-strong', {
    title: 'Adjective endings 3: without an article', de: 'Adjektivdeklination ohne Artikel', level: 'A2', day: 21,
    summary: 'guter Wein, frische Milch, kaltes Wasser',
    html: `
<p>When there is <b>no article</b> (or after numbers, <i>viel, wenig, etwas</i>), the adjective takes the endings of the definite article itself – it has to do all the work.</p>
${tb(['', 'masculine', 'feminine', 'neuter', 'plural'], [
      ['Nom.', 'gut<b>er</b> Wein', 'frisch<b>e</b> Milch', 'kalt<b>es</b> Wasser', 'nett<b>e</b> Leute'],
      ['Akk.', 'gut<b>en</b> Wein', 'frisch<b>e</b> Milch', 'kalt<b>es</b> Wasser', 'nett<b>e</b> Leute'],
      ['Dat.', 'gut<b>em</b> Wein', 'frisch<b>er</b> Milch', 'kalt<b>em</b> Wasser', 'nett<b>en</b> Leuten'],
      ['Gen.', 'gut<b>en</b> Weins', 'frisch<b>er</b> Milch', 'kalt<b>en</b> Wassers', 'nett<b>er</b> Leute'],
    ], [1, 2, 3, 4])}
<div class="tip">Compare with der/die/das: d<b>er</b> → gut<b>er</b>, di<b>e</b> → frisch<b>e</b>, da<b>s</b> → kalt<b>es</b>, de<b>m</b> → gut<b>em</b>. Only genitive masc./neut. is <b>-en</b>.</div>
{{Ich trinke gern heißen Tee mit frischer Milch.|I like drinking hot tea with fresh milk.}}
{{Hier gibt es leckeres Essen und nette Leute.|There is tasty food and nice people here.}}
{{Viele Grüße! Liebe Anna, …|Best wishes! Dear Anna, … (letters)}}
<h3>The one principle behind all three tables</h3>
<div class="note">German wants the <b>gender/case signal exactly once</b> before the noun. If the article shows it (der, den, dem…), the adjective relaxes with -e/-en. If the article is missing or “naked” (ein), the adjective shows the signal (-er, -es, -em…).</div>`,
  });

  G('review-week3', {
    title: 'Cheat sheet: Week 3', de: 'Zusammenfassung Woche 3', level: 'A2', day: 21,
    summary: 'Past tenses, clauses, reflexives and adjective endings',
    html: `
<h3>Past</h3>
<div class="slots"><span>Gestern</span><span class="v">habe</span><span class="s">ich</span><span>Pizza</span><span class="v2">gegessen.</span></div>
<div class="slots"><span>Ich</span><span class="v">bin</span><span>nach Hause</span><span class="v2">gefahren.</span></div>
<p>Spoken: Perfekt (haben/sein + Partizip II) – but <b>war, hatte, konnte, musste…</b> in Präteritum.</p>
<h3>Clauses</h3>
${tb(['Type', 'Words', 'Verb position'], [
      ['Position 0', 'und, aber, oder, denn, sondern', 'normal (2nd)'],
      ['Adverb (pos. 1)', 'deshalb, trotzdem, dann, außerdem, sonst', 'right after the adverb'],
      ['Subordinating', 'weil, dass, wenn, ob, als, obwohl, bevor, damit …', 'END'],
    ])}
<h3>Adjective endings at a glance</h3>
${tb(['', 'masc.', 'fem.', 'neut.', 'plural'], [
      ['der … Nom', 'der gute', 'die gute', 'das gute', 'die guten'],
      ['ein … Nom', 'ein guter', 'eine gute', 'ein gutes', 'keine guten'],
      ['– … Nom', 'guter', 'gute', 'gutes', 'gute'],
      ['der … Akk', 'den guten', 'die gute', 'das gute', 'die guten'],
      ['ein … Akk', 'einen guten', 'eine gute', 'ein gutes', 'keine guten'],
      ['any … Dat', 'dem/einem guten · gutem', 'der/einer guten · guter', 'dem/einem guten · gutem', 'den guten · guten'],
    ])}
<h3>Top 5 mistakes</h3>
<ol>
<li><s>Ich habe nach Berlin gefahren</s> → <b>Ich bin nach Berlin gefahren.</b></li>
<li><s>…, weil ich bin krank</s> → <b>…, weil ich krank bin.</b></li>
<li><s>Wenn ich war ein Kind</s> → <b>Als ich ein Kind war, …</b></li>
<li><s>Ich freue auf …</s> → <b>Ich freue mich auf …</b></li>
<li><s>ein gute Film</s> → <b>ein guter Film.</b></li>
</ol>`,
  });

  /* ===================== DAY 22 ===================== */
  G('comparison', {
    title: 'Comparing: comparative & superlative', de: 'Komparativ und Superlativ', level: 'A2', day: 22,
    summary: 'schnell – schneller – am schnellsten · als / wie',
    html: `
${tb(['Positive', 'Comparative (+er)', 'Superlative (am …sten)'], [
      ['schnell', 'schnell<b>er</b>', 'am schnell<b>sten</b>'],
      ['klein', 'klein<b>er</b>', 'am klein<b>sten</b>'],
      ['schön', 'schön<b>er</b>', 'am schön<b>sten</b>'],
      ['teuer', 'teu<b>rer</b>', 'am teuer<b>sten</b>'],
    ], [0, 1, 2])}
<h3>Short adjectives often get an umlaut</h3>
${tb(['Positive', 'Comparative', 'Superlative'], [
      ['alt', 'älter', 'am ältesten'], ['jung', 'jünger', 'am jüngsten'],
      ['groß', 'größer', 'am größten'], ['kalt', 'kälter', 'am kältesten'],
      ['warm', 'wärmer', 'am wärmsten'], ['lang', 'länger', 'am längsten'],
      ['kurz', 'kürzer', 'am kürzesten'], ['oft', 'öfter', 'am häufigsten'],
    ], [0, 1, 2])}
<div class="note">After <b>-d, -t, -s, -ß, -z, -sch</b> the superlative adds <b>-esten</b> (easier to say): am ält<b>esten</b>, am heiß<b>esten</b>, am kürz<b>esten</b>, am interessant<b>esten</b>. Exception: groß → am größten.</div>
<h3>Irregular – learn by heart!</h3>
${tb(['Positive', 'Comparative', 'Superlative'], [
      ['gut', '<b>besser</b>', 'am <b>besten</b>'],
      ['viel', '<b>mehr</b>', 'am <b>meisten</b>'],
      ['gern', '<b>lieber</b>', 'am <b>liebsten</b>'],
      ['hoch', '<b>höher</b>', 'am <b>höchsten</b>'],
      ['nah', '<b>näher</b>', 'am <b>nächsten</b>'],
      ['bald', '<b>eher</b>', 'am <b>ehesten</b>'],
    ], [0, 1, 2])}
<h3>Comparing two things</h3>
{{Max ist größer als Lena.|Max is taller than Lena. (comparative + als)}}
{{Lena ist so groß wie Sofia.|Lena is as tall as Sofia. (so … wie)}}
{{Der Zug ist nicht so schnell wie das Flugzeug.|The train is not as fast as the plane.}}
{{Im Sommer ist es am schönsten.|It’s nicest in summer.}}
<div class="warn"><b>als</b> after a comparative, <b>wie</b> after so/genauso. Never <s>mehr schnell</s> – always <b>schneller</b>.</div>
<h3>Before a noun: normal adjective endings</h3>
{{Ich suche eine größere Wohnung.|I’m looking for a bigger flat.}}
{{Das ist der beste Kuchen der Stadt!|This is the best cake in town! (der beste – no “am”)}}
<div class="tip"><b>immer + comparative</b> = more and more: [[Mein Deutsch wird immer besser!]] · <b>je … desto</b> = the … the: [[Je mehr ich übe, desto besser spreche ich.]]</div>`,
  });

  /* ===================== DAY 23 ===================== */
  G('genitive', {
    title: 'The genitive case (possession)', de: 'Der Genitiv', level: 'B1', day: 23,
    summary: 'des Mannes, der Frau · wegen, trotz, während',
    html: `
<p>The genitive shows <b>possession or belonging</b> (“of”). Question: <b>wessen?</b> (whose?). It is common in writing; in speech people often use <i>von + Dativ</i>.</p>
${tb(['', 'masculine', 'feminine', 'neuter', 'plural'], [
      ['definite', 'd<b>es</b> Mann<b>es</b>', 'd<b>er</b> Frau', 'd<b>es</b> Kind<b>es</b>', 'd<b>er</b> Kinder'],
      ['indefinite', 'ein<b>es</b> Mann<b>es</b>', 'ein<b>er</b> Frau', 'ein<b>es</b> Kind<b>es</b>', '–'],
      ['possessive', 'mein<b>es</b> Vater<b>s</b>', 'mein<b>er</b> Mutter', 'mein<b>es</b> Auto<b>s</b>', 'mein<b>er</b> Eltern'],
    ], [1, 2, 3, 4])}
<div class="rule">Masculine & neuter nouns add <b>-s</b> (longer words: des Vater<b>s</b>, des Auto<b>s</b>) or <b>-es</b> (one syllable or ending in s/ß/z/x: des Mann<b>es</b>, des Haus<b>es</b>). Feminine and plural nouns never change.</div>
{{das Auto meines Vaters|my father’s car (the car of my father)}}
{{die Farbe der Tasche|the colour of the bag}}
{{am Ende des Tages|at the end of the day}}
<h3>Names</h3>
{{Lenas Bruder · Max’ Fahrrad|Lena’s brother (no apostrophe!) · Max’s bike (name ends in -s/-x/-z → apostrophe)}}
<h3>Spoken alternative: von + Dativ</h3>
{{das Auto von meinem Vater|my father’s car (colloquial)}}
<h3>Prepositions with genitive</h3>
${tb(['Preposition', 'Meaning', 'Example'], [
      ['wegen', 'because of', 'Wegen des Regens bleiben wir zu Hause.'],
      ['trotz', 'despite', 'Trotz des Wetters gehen wir spazieren.'],
      ['während', 'during', 'Während des Films schlafe ich ein.'],
      ['(an)statt', 'instead of', 'Statt eines Autos kaufe ich ein Fahrrad.'],
      ['innerhalb / außerhalb', 'inside / outside of', 'innerhalb einer Woche'],
    ], [2])}
<div class="note">In everyday speech you will often hear <i>wegen dem Regen</i> (dative). In exams and writing, use the genitive.</div>
<p>Adjectives in the genitive mostly end in <b>-en</b>: [[des neuen Autos]], [[wegen des schlechten Wetters]]. Without article, feminine/plural: <b>-er</b>: [[trotz starker Schmerzen]].</p>`,
  });

  G('n-declension', {
    title: 'n-declension (weak masculine nouns)', de: 'Die n-Deklination', level: 'B1', day: 23,
    summary: 'der Student → den/dem/des Studenten',
    html: `
<p>A group of masculine nouns adds <b>-(e)n in every case except the nominative singular</b>.</p>
${tb(['', 'der Student', 'der Junge', 'der Herr', 'der Bär'], [
      ['Nom.', 'der Student', 'der Junge', 'der Herr', 'der Bär'],
      ['Akk.', 'den Student<b>en</b>', 'den Junge<b>n</b>', 'den Herr<b>n</b>', 'den Bär<b>en</b>'],
      ['Dat.', 'dem Student<b>en</b>', 'dem Junge<b>n</b>', 'dem Herr<b>n</b>', 'dem Bär<b>en</b>'],
      ['Gen.', 'des Student<b>en</b>', 'des Junge<b>n</b>', 'des Herr<b>n</b>', 'des Bär<b>en</b>'],
      ['Plural', 'die Student<b>en</b>', 'die Junge<b>n</b>', 'die Herr<b>en</b>', 'die Bär<b>en</b>'],
    ], [1, 2, 3, 4])}
<h3>Which nouns?</h3>
<ul>
<li>Masculine nouns in <b>-e</b> for people/animals: der Junge, der Kollege, der Kunde, der Neffe, der Franzose, der Löwe, der Affe</li>
<li>Foreign words in <b>-ent, -ant, -ist, -oge, -at</b>: der Student, der Präsident, der Elefant, der Polizist, der Tourist, der Biologe, der Soldat</li>
<li>Some others: der Mensch, der Herr, der Nachbar, der Bär, der Held, der Prinz</li>
</ul>
{{Ich kenne den Studenten.|I know the student.}}
{{Kannst du dem Kollegen helfen?|Can you help the colleague?}}
{{Sehr geehrter Herr Braun, …|Dear Mr Braun, … (letter: Herr is nominative here)}}
{{Ich schreibe Herrn Braun eine E-Mail.|I’m writing Mr Braun an email.}}
<div class="note">Special: <b>der Name</b> → des Name<b>ns</b> (also der Gedanke, der Glaube).</div>`,
  });

  /* ===================== DAY 24 ===================== */
  G('verb-prep', {
    title: 'Verbs with fixed prepositions', de: 'Verben mit Präpositionen', level: 'B1', day: 24,
    summary: 'warten auf + Akk, denken an + Akk, Angst haben vor + Dat …',
    html: `
<p>Many verbs (and adjectives) are tied to a specific preposition with a fixed case. The preposition is often different from English – learn them as a unit: <b>warten auf + Akk</b>.</p>
${tb(['Verb + preposition', 'Case', 'Meaning', 'Example'], [
      ['warten auf', 'Akk', 'wait for', 'Ich warte auf den Bus.'],
      ['denken an', 'Akk', 'think of', 'Ich denke oft an dich.'],
      ['sich freuen auf', 'Akk', 'look forward to', 'Wir freuen uns auf die Ferien.'],
      ['sich freuen über', 'Akk', 'be happy about', 'Er freut sich über den Brief.'],
      ['sich interessieren für', 'Akk', 'be interested in', 'Ich interessiere mich für Musik.'],
      ['sich erinnern an', 'Akk', 'remember', 'Erinnerst du dich an mich?'],
      ['sich ärgern über', 'Akk', 'be annoyed about', 'Sie ärgert sich über den Lärm.'],
      ['sich kümmern um', 'Akk', 'take care of', 'Ich kümmere mich um die Kinder.'],
      ['sich gewöhnen an', 'Akk', 'get used to', 'Ich gewöhne mich an das Wetter.'],
      ['sprechen über', 'Akk', 'talk about', 'Wir sprechen über das Problem.'],
      ['bitten um', 'Akk', 'ask for', 'Ich bitte dich um Hilfe.'],
      ['glauben an', 'Akk', 'believe in', 'Sie glaubt an sich.'],
      ['Lust haben auf', 'Akk', 'feel like', 'Ich habe Lust auf Pizza.'],
      ['sprechen mit', 'Dat', 'talk to/with', 'Ich spreche mit meinem Chef.'],
      ['Angst haben vor', 'Dat', 'be afraid of', 'Hast du Angst vor Hunden?'],
      ['träumen von', 'Dat', 'dream of', 'Ich träume von einem Haus am Meer.'],
      ['teilnehmen an', 'Dat', 'take part in', 'Ich nehme an dem Kurs teil.'],
      ['fragen nach', 'Dat', 'ask about', 'Er fragt nach dem Weg.'],
      ['erzählen von', 'Dat', 'tell about', 'Erzähl mir von deiner Reise!'],
      ['halten von', 'Dat', 'think of (opinion)', 'Was hältst du von der Idee?'],
      ['einladen zu', 'Dat', 'invite to', 'Ich lade dich zu meiner Party ein.'],
      ['gehören zu', 'Dat', 'be part of', 'Das gehört zu meinen Aufgaben.'],
    ], [3])}
<div class="tip">Rule of thumb: <b>auf</b> and <b>über</b> in these fixed phrases almost always take the <b>accusative</b>. <b>von, mit, zu, nach, bei</b> are always dative anyway.</div>
<div class="warn">✗ <s>Ich warte für den Bus</s> (English “wait for”) → ✓ <b>Ich warte auf den Bus.</b></div>`,
  });

  G('da-wo', {
    title: 'da-compounds & wo-compounds (darauf, worauf …)', de: 'Präpositionaladverbien: da(r)- und wo(r)-', level: 'B1', day: 24,
    summary: 'Worauf wartest du? – Ich warte darauf.',
    html: `
<p>When the object of a preposition is a <b>thing or idea</b> (not a person), German combines <b>da(r)- + preposition</b> for “it/that” and <b>wo(r)- + preposition</b> for questions. Add <b>-r-</b> when the preposition starts with a vowel.</p>
${tb(['Preposition', 'Question (thing)', 'Answer (thing)', 'Person'], [
      ['auf', '<b>wor</b>auf?', '<b>dar</b>auf', 'auf wen? – auf ihn/sie'],
      ['an', '<b>wor</b>an?', '<b>dar</b>an', 'an wen? – an ihn/sie'],
      ['für', '<b>wo</b>für?', '<b>da</b>für', 'für wen? – für ihn/sie'],
      ['über', '<b>wor</b>über?', '<b>dar</b>über', 'über wen? – über ihn/sie'],
      ['mit', '<b>wo</b>mit?', '<b>da</b>mit', 'mit wem? – mit ihm/ihr'],
      ['von', '<b>wo</b>von?', '<b>da</b>von', 'von wem? – von ihm/ihr'],
      ['nach', '<b>wo</b>nach?', '<b>da</b>nach', 'nach wem? – nach ihm/ihr'],
    ], [1, 2, 3])}
{{Worauf wartest du? – Auf den Bus. Ich warte schon lange darauf.|What are you waiting for? – For the bus. I’ve been waiting for it for ages.}}
{{Auf wen wartest du? – Auf Lena. Ich warte auf sie.|Who are you waiting for? – For Lena. I’m waiting for her.}}
{{Wofür interessierst du dich? – Für Fotografie.|What are you interested in? – Photography.}}
{{Was hältst du davon?|What do you think of it?}}
<h3>da-compound pointing to a clause</h3>
<p>The da-word can announce a <i>dass</i>-clause or <i>zu</i>-infinitive:</p>
{{Ich freue mich darauf, dich zu sehen.|I’m looking forward to seeing you.}}
{{Denk bitte daran, dass wir morgen früh losfahren.|Please remember that we leave early tomorrow.}}
<div class="warn">For people never use da-/wo-: ✗ <s>Ich denke daran</s> (about my mum) → ✓ <b>Ich denke an sie.</b></div>`,
  });

  /* ===================== DAY 25 ===================== */
  G('futur1', {
    title: 'Future tense (Futur I) & the verb “werden”', de: 'Futur I · werden', level: 'A2', day: 25,
    summary: 'Ich werde morgen arbeiten. · Ich werde Arzt.',
    html: `
${tb(['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'], [['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden']], [0, 1, 2, 3, 4, 5])}
<div class="formula">werden (pos. 2) + infinitive (end)</div>
{{Ich werde nächstes Jahr in Deutschland studieren.|I will study in Germany next year.}}
{{Es wird morgen regnen.|It will rain tomorrow. (prediction)}}
{{Ich werde dich nie vergessen.|I will never forget you. (promise)}}
{{Er wird wohl krank sein.|He is probably ill. (assumption with wohl)}}
<div class="note">Very often Germans simply use the <b>present tense + time word</b> for the future: [[Morgen fliege ich nach Wien.]] Futur I sounds more formal, emphatic or like a prediction.</div>
<h3>werden as a full verb = “to become / get”</h3>
{{Ich will Ärztin werden.|I want to become a doctor.}}
{{Es wird dunkel. / Mir wird schlecht.|It’s getting dark. / I’m feeling sick.}}
<div class="rule">Three faces of <b>werden</b>:<br>werden + noun/adjective = <b>become</b> · werden + infinitive = <b>future</b> · werden + Partizip II = <b>passive</b> (Day 28).</div>`,
  });

  G('praeteritum-full', {
    title: 'Präteritum (simple past) of all verbs', de: 'Das Präteritum', level: 'B1', day: 25,
    summary: 'machte, ging, kam, sah … – for stories and written texts',
    html: `
<p>In books, newspapers, fairy tales and reports, the past is told in the <b>Präteritum</b>. You need to <b>recognise</b> it when reading and listening – and use it in writing.</p>
<h3>Regular verbs: stem + te + ending</h3>
${tb(['', 'machen', 'arbeiten', 'endings'], [
      ['ich', 'mach<b>te</b>', 'arbeit<b>ete</b>', '-te'],
      ['du', 'mach<b>test</b>', 'arbeit<b>etest</b>', '-test'],
      ['er/sie/es', 'mach<b>te</b>', 'arbeit<b>ete</b>', '-te'],
      ['wir', 'mach<b>ten</b>', 'arbeit<b>eten</b>', '-ten'],
      ['ihr', 'mach<b>tet</b>', 'arbeit<b>etet</b>', '-tet'],
      ['sie/Sie', 'mach<b>ten</b>', 'arbeit<b>eten</b>', '-ten'],
    ], [1, 2])}
<h3>Irregular verbs: new stem + ending (ich & er: no ending!)</h3>
${tb(['', 'gehen', 'kommen', 'endings'], [
      ['ich', 'ging', 'kam', '–'], ['du', 'ging<b>st</b>', 'kam<b>st</b>', '-st'], ['er/sie/es', 'ging', 'kam', '–'],
      ['wir', 'ging<b>en</b>', 'kam<b>en</b>', '-en'], ['ihr', 'ging<b>t</b>', 'kam<b>t</b>', '-t'], ['sie/Sie', 'ging<b>en</b>', 'kam<b>en</b>', '-en'],
    ], [1, 2])}
<h3>Principal parts of important irregular verbs</h3>
${tb(['Infinitive', 'Präteritum', 'Perfekt', 'English'], [
      ['gehen', 'ging', 'ist gegangen', 'go'], ['kommen', 'kam', 'ist gekommen', 'come'],
      ['sehen', 'sah', 'hat gesehen', 'see'], ['geben', 'gab', 'hat gegeben', 'give'],
      ['nehmen', 'nahm', 'hat genommen', 'take'], ['finden', 'fand', 'hat gefunden', 'find'],
      ['fahren', 'fuhr', 'ist gefahren', 'drive, go'], ['lesen', 'las', 'hat gelesen', 'read'],
      ['sprechen', 'sprach', 'hat gesprochen', 'speak'], ['trinken', 'trank', 'hat getrunken', 'drink'],
      ['essen', 'aß', 'hat gegessen', 'eat'], ['schreiben', 'schrieb', 'hat geschrieben', 'write'],
      ['bleiben', 'blieb', 'ist geblieben', 'stay'], ['laufen', 'lief', 'ist gelaufen', 'run'],
      ['stehen', 'stand', 'hat gestanden', 'stand'], ['sitzen', 'saß', 'hat gesessen', 'sit'],
      ['liegen', 'lag', 'hat gelegen', 'lie'], ['rufen', 'rief', 'hat gerufen', 'call'],
      ['schlafen', 'schlief', 'hat geschlafen', 'sleep'], ['treffen', 'traf', 'hat getroffen', 'meet'],
      ['helfen', 'half', 'hat geholfen', 'help'], ['fallen', 'fiel', 'ist gefallen', 'fall'],
      ['fliegen', 'flog', 'ist geflogen', 'fly'], ['werden', 'wurde', 'ist geworden', 'become'],
      ['denken', 'dachte', 'hat gedacht', 'think'], ['bringen', 'brachte', 'hat gebracht', 'bring'],
      ['kennen', 'kannte', 'hat gekannt', 'know'], ['wissen', 'wusste', 'hat gewusst', 'know (fact)'],
    ], [0, 1, 2])}
{{Es war einmal ein König. Er hatte drei Töchter.|Once upon a time there was a king. He had three daughters.}}
{{Sie stand auf, trank einen Kaffee und ging zur Arbeit.|She got up, drank a coffee and went to work.}}`,
  });

  G('plusquamperfekt', {
    title: 'Plusquamperfekt (past perfect)', de: 'Das Plusquamperfekt', level: 'B1', day: 25,
    summary: 'hatte/war + Partizip II – the past before the past',
    html: `
<p>Use it for an action that happened <b>before</b> another past action. It is built like the Perfekt, but with <b>hatte / war</b>.</p>
<div class="formula">hatte / war + Partizip II</div>
{{Als ich ankam, war der Zug schon abgefahren.|When I arrived, the train had already left.}}
{{Ich hatte das Buch schon gelesen.|I had already read the book.}}
<h3>nachdem (after)</h3>
<p><b>nachdem</b> + Plusquamperfekt, main clause in Präteritum/Perfekt:</p>
{{Nachdem wir gegessen hatten, gingen wir spazieren.|After we had eaten, we went for a walk.}}`,
  });

  /* ===================== DAY 26 ===================== */
  G('konjunktiv2', {
    title: 'Konjunktiv II: would, could – politeness, wishes, “if”', de: 'Der Konjunktiv II', level: 'B1', day: 26,
    summary: 'würde, hätte, wäre, könnte – Wenn ich Zeit hätte, …',
    html: `
<p>Konjunktiv II expresses the <b>unreal</b>: wishes, dreams, hypothetical situations – and it makes requests <b>very polite</b>.</p>
<h3>The forms you need</h3>
${tb(['', 'würde (+inf.)', 'wäre', 'hätte', 'könnte', 'müsste', 'sollte'], [
      ['ich', 'würde', 'wäre', 'hätte', 'könnte', 'müsste', 'sollte'],
      ['du', 'würdest', 'wär(e)st', 'hättest', 'könntest', 'müsstest', 'solltest'],
      ['er/sie/es', 'würde', 'wäre', 'hätte', 'könnte', 'müsste', 'sollte'],
      ['wir', 'würden', 'wären', 'hätten', 'könnten', 'müssten', 'sollten'],
      ['ihr', 'würdet', 'wär(e)t', 'hättet', 'könntet', 'müsstet', 'solltet'],
      ['sie/Sie', 'würden', 'wären', 'hätten', 'könnten', 'müssten', 'sollten'],
    ], [1, 2, 3, 4, 5, 6])}
<div class="rule">For most verbs: <b>würde + infinitive</b> (end). For <b>sein, haben</b> and <b>modal verbs</b> use their own forms (wäre, hätte, könnte, müsste, dürfte, sollte, wollte). Also common: <b>wüsste</b> (wissen), <b>gäbe</b> (es gäbe), <b>ginge</b>, <b>käme</b>.</div>
<h3>1. Polite requests</h3>
{{Könnten Sie mir bitte helfen?|Could you help me, please?}}
{{Würden Sie bitte das Fenster schließen?|Would you close the window, please?}}
{{Ich hätte gern ein Glas Wasser.|I would like a glass of water.}}
{{Hätten Sie kurz Zeit?|Would you have a moment?}}
<h3>2. Wishes</h3>
{{Ich wäre jetzt gern am Strand.|I’d love to be at the beach now.}}
{{Wenn ich doch mehr Zeit hätte!|If only I had more time!}}
<h3>3. Unreal conditions (“if”)</h3>
<div class="slots"><span>Wenn ich reich <b>wäre</b>,<small>wenn-clause: verb END</small></span><span class="v">würde<small>pos. 2</small></span><span class="s">ich</span><span>um die Welt</span><span class="v2">reisen.</span></div>
{{Wenn ich Zeit hätte, würde ich mitkommen.|If I had time, I would come along.}}
{{Was würdest du machen, wenn du im Lotto gewinnen würdest?|What would you do if you won the lottery?}}
<h3>4. Advice</h3>
{{An deiner Stelle würde ich zum Arzt gehen.|If I were you, I would go to the doctor.}}
{{Du solltest mehr schlafen.|You should sleep more.}}
<h3>Past: hätte/wäre + Partizip II</h3>
{{Wenn ich das gewusst hätte, wäre ich gekommen.|If I had known that, I would have come.}}
<div class="warn">Don’t confuse: <b>würde</b> (would) – <b>wurde</b> (became / was …-ed) – <b>werde</b> (will). One dot pair changes everything!</div>`,
  });

  /* ===================== DAY 27 ===================== */
  G('relative', {
    title: 'Relative clauses (der, die, das, dem, denen …)', de: 'Relativsätze', level: 'B1', day: 27,
    summary: 'Der Mann, der dort steht, … · die Stadt, in der ich wohne',
    html: `
<p>Relative clauses describe a noun: “the man <i>who</i>…”, “the book <i>that</i>…”. In German the relative pronoun looks almost like the definite article.</p>
${tb(['', 'masculine', 'feminine', 'neuter', 'plural'], [
      ['Nom.', 'der', 'die', 'das', 'die'],
      ['Akk.', 'den', 'die', 'das', 'die'],
      ['Dat.', 'dem', 'der', 'dem', '<b>denen</b>'],
      ['Gen.', '<b>dessen</b>', '<b>deren</b>', '<b>dessen</b>', '<b>deren</b>'],
    ])}
<div class="rule"><b>Gender & number</b> come from the noun it refers to. <b>Case</b> comes from its role <i>inside</i> the relative clause. The <b>verb goes to the end</b>, and there are commas around the clause.</div>
<h3>Step by step</h3>
<ol><li>Find the noun: <i>der Mann</i> → masculine singular.</li><li>What does it do in the new clause? <i>Ich kenne ihn</i> → accusative → <b>den</b>.</li><li>Verb to the end.</li></ol>
{{Der Mann, der dort steht, ist mein Lehrer.|The man who is standing there is my teacher. (Nom.)}}
{{Der Mann, den ich gestern getroffen habe, ist Arzt.|The man (whom) I met yesterday is a doctor. (Akk.)}}
{{Die Frau, der ich geholfen habe, war sehr nett.|The woman I helped was very nice. (Dat. – helfen)}}
{{Die Kinder, denen ich Deutsch beibringe, sind toll.|The children to whom I teach German are great. (Dat. pl.)}}
{{Das ist die Kollegin, deren Mann Koch ist.|That’s the colleague whose husband is a chef. (Gen.)}}
<h3>With prepositions</h3>
<p>The preposition comes <b>first</b> and decides the case:</p>
{{Die Stadt, in der ich wohne, ist schön.|The city I live in is beautiful.}}
{{Das ist der Freund, mit dem ich Fußball spiele.|That’s the friend I play football with.}}
{{Der Bus, auf den ich warte, ist zu spät.|The bus I’m waiting for is late.}}
<h3>was and wo</h3>
{{Das ist alles, was ich weiß.|That’s all (that) I know. (after alles, nichts, etwas, das, superlatives)}}
{{Berlin ist die Stadt, wo ich geboren bin.|Berlin is the city where I was born. (wo for places)}}
<div class="warn">German never drops the relative pronoun (English “the man I met”): always <b>der Mann, den ich getroffen habe</b>. And never use <s>was</s> for a normal noun: ✗ <s>das Buch, was</s> → ✓ <b>das Buch, das</b>.</div>`,
  });

  /* ===================== DAY 28 ===================== */
  G('passive', {
    title: 'The passive voice', de: 'Das Passiv', level: 'B1', day: 28,
    summary: 'werden + Partizip II: Das Haus wird gebaut.',
    html: `
<p>The passive focuses on the <b>action</b>, not on who does it. It is common in news, instructions, recipes and official texts.</p>
<div class="formula">werden + Partizip II</div>
${tb(['Tense', 'Passive', 'English'], [
      ['Präsens', 'Das Auto <b>wird</b> repariert.', 'The car is being repaired.'],
      ['Präteritum', 'Das Auto <b>wurde</b> repariert.', 'The car was repaired.'],
      ['Perfekt', 'Das Auto <b>ist</b> repariert <b>worden</b>.', 'The car has been repaired.'],
      ['with modal', 'Das Auto <b>muss</b> repariert <b>werden</b>.', 'The car must be repaired.'],
      ['Futur', 'Das Auto <b>wird</b> repariert <b>werden</b>.', 'The car will be repaired.'],
    ], [1])}
<div class="warn">In the passive Perfekt use <b>worden</b>, not <s>geworden</s>.</div>
<h3>From active to passive</h3>
<div class="slots"><span class="s">Der Mechaniker</span><span class="v">repariert</span><span>das Auto.<small>Akk</small></span></div>
<div class="slots"><span class="s">Das Auto<small>Nom</small></span><span class="v">wird</span><span>(vom Mechaniker)</span><span class="v2">repariert.</span></div>
<p>The accusative object becomes the subject (nominative). The doer is often left out, or added with <b>von + Dativ</b> (person) / <b>durch + Akk</b> (means, cause).</p>
{{Der Brief wurde von meiner Oma geschrieben.|The letter was written by my grandma.}}
{{Die Stadt wurde durch ein Erdbeben zerstört.|The city was destroyed by an earthquake.}}
<h3>Recipes & instructions</h3>
{{Zuerst werden die Kartoffeln geschält.|First the potatoes are peeled.}}
{{Hier wird nicht geraucht!|No smoking here! (impersonal passive)}}
<div class="note">Dative stays dative: [[Mir wurde geholfen.]] (I was helped.) – there is no nominative subject.</div>
<h3>Alternative: man</h3>
{{Man spricht hier Deutsch. = Hier wird Deutsch gesprochen.|German is spoken here.}}
<h3>State passive: sein + Partizip II</h3>
{{Die Tür wird geschlossen. → Die Tür ist geschlossen.|The door is being closed (action) → the door is closed (result).}}`,
  });

  /* ===================== DAY 29 ===================== */
  G('infinitive-zu', {
    title: 'Infinitive with zu, um … zu, ohne … zu', de: 'Infinitiv mit „zu“', level: 'B1', day: 29,
    summary: 'Ich habe keine Zeit, Deutsch zu lernen. · um … zu',
    html: `
<p>After many verbs, nouns and adjectives, a second verb comes as <b>zu + infinitive</b> at the end.</p>
{{Ich versuche, jeden Tag Deutsch zu sprechen.|I try to speak German every day.}}
{{Hast du Lust, ins Kino zu gehen?|Do you feel like going to the cinema?}}
{{Es ist wichtig, regelmäßig zu üben.|It is important to practise regularly.}}
<h3>Typical triggers</h3>
<ul>
<li><b>Verbs:</b> anfangen/beginnen, aufhören, versuchen, vergessen, vorhaben, planen, hoffen, sich freuen, erlauben, empfehlen, bitten</li>
<li><b>Noun + haben:</b> Lust haben, Zeit haben, Angst haben, keine Ahnung haben</li>
<li><b>Es ist + adjective:</b> es ist wichtig / schwer / leicht / schön / verboten</li>
<li><b>Es macht Spaß</b>, …</li>
</ul>
<h3>Separable verbs: zu in the middle</h3>
{{Ich habe vergessen, dich anzurufen.|I forgot to call you. (an-zu-rufen)}}
{{Es ist schwer, früh aufzustehen.|It’s hard to get up early.}}
<div class="warn">NO zu after <b>modal verbs</b>, <b>werden</b>, <b>lassen</b>, and verbs of perception/movement (sehen, hören, gehen, bleiben): [[Ich kann schwimmen.]] [[Ich gehe einkaufen.]]</div>
<h3>um … zu – purpose (in order to)</h3>
{{Ich lerne Deutsch, um in Deutschland zu arbeiten.|I’m learning German in order to work in Germany.}}
<div class="rule"><b>um … zu</b> when the subject is the same. Different subjects → <b>damit</b>: [[Ich spreche langsam, damit du mich verstehst.]]</div>
<h3>ohne … zu & (an)statt … zu</h3>
{{Er ging, ohne Tschüss zu sagen.|He left without saying goodbye.}}
{{Statt zu lernen, hat sie ferngesehen.|Instead of studying, she watched TV.}}
<div class="tip"><b>brauchen nicht zu</b> = don’t need to: [[Du brauchst nicht zu kommen.]] (= Du musst nicht kommen.)</div>`,
  });

  G('word-order', {
    title: 'Master word order: the German sentence map', de: 'Satzbau komplett: Felder, TeKaMoLo', level: 'B1', day: 29,
    summary: 'Vorfeld – verb – Mittelfeld – verb 2 · TeKaMoLo',
    html: `
<h3>The main-clause map</h3>
${tb(['Vorfeld (1)', 'Verb (2)', 'Mittelfeld', 'Verb part 2 (end)'], [
      ['Ich', 'stehe', 'jeden Tag um 7 Uhr', 'auf.'],
      ['Gestern', 'habe', 'ich mit Lena im Café', 'gesprochen.'],
      ['Morgen', 'muss', 'ich leider sehr früh', 'arbeiten.'],
      ['–', 'Kannst', 'du mir bitte', 'helfen?'],
    ], [])}
<h3>Order inside the Mittelfeld: TeKaMoLo</h3>
<p>Adverbial information usually follows: <b>Te</b>mporal (when) – <b>Ka</b>usal (why) – <b>Mo</b>dal (how) – <b>Lo</b>kal (where).</p>
<div class="slots"><span>Ich fahre</span><span class="s">morgen<small>Te – wann?</small></span><span style="background:var(--teal);color:#fff">wegen der Arbeit<small>Ka – warum?</small></span><span style="background:var(--purple);color:#fff">mit dem Zug<small>Mo – wie?</small></span><span class="v">nach Berlin.<small>Lo – wohin?</small></span></div>
{{Ich fahre morgen wegen der Arbeit mit dem Zug nach Berlin.|I’m going to Berlin by train tomorrow for work.}}
<h3>Full order in the Mittelfeld</h3>
<ol>
<li>Pronouns (Nom → Akk → Dat): <i>…, dass <b>er es ihr</b> gibt</i></li>
<li>Nominal subject (if not in pos. 1)</li>
<li>Dative noun → time → reason → manner → accusative noun → place</li>
<li><b>nicht</b> before the part it negates (often just before the end)</li>
</ol>
{{Ich habe meiner Schwester gestern im Kaufhaus ein Geschenk gekauft.|I bought my sister a present in the department store yesterday.}}
<h3>Subordinate-clause map</h3>
${tb(['Connector', 'Subject', 'Mittelfeld', 'Verbs (end)'], [
      ['…, weil', 'ich', 'heute nicht', 'kommen kann.'],
      ['…, dass', 'er', 'gestern im Kino', 'gewesen ist.'],
      ['…, ob', 'du', 'morgen', 'mitkommst.'],
    ], [])}
<div class="note">Advanced (B1): Perfekt of modal verbs uses a double infinitive: [[Ich habe nicht kommen können.]] In a subordinate clause: [[…, weil ich nicht habe kommen können.]] – in speech most people say [[…, weil ich nicht kommen konnte.]]</div>`,
  });

  G('lassen', {
    title: 'The verb “lassen”', de: 'Das Verb „lassen“', level: 'B1', day: 29,
    summary: 'let, leave, have something done',
    html: `
${tb(['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'], [['lasse', 'lässt', 'lässt', 'lassen', 'lasst', 'lassen']], [0, 1, 2, 3, 4, 5])}
<p>Präteritum: <b>ließ</b> · Perfekt: <b>hat gelassen</b> (with another infinitive: <b>hat … machen lassen</b>).</p>
{{Ich lasse mein Auto reparieren.|I’m having my car repaired. (someone else does it)}}
{{Ich lasse mir die Haare schneiden.|I’m getting my hair cut.}}
{{Lass mich in Ruhe!|Leave me alone!}}
{{Lass uns gehen!|Let’s go!}}
{{Ich habe mein Handy zu Hause gelassen.|I left my phone at home.}}
{{Lassen Sie mich Ihnen helfen.|Let me help you.}}
<div class="warn">No <i>zu</i> after lassen: ✗ <s>Ich lasse das Auto zu reparieren</s>.</div>`,
  });

  /* ===================== DAY 30 ===================== */
  G('cases-overview', {
    title: 'The four cases – master overview', de: 'Die vier Fälle im Überblick', level: 'B1', day: 30,
    summary: 'All articles, pronouns and triggers in one place',
    html: `
<h3>What each case does</h3>
${tb(['Case', 'Question', 'Main job', 'Triggered by'], [
      ['Nominativ', 'wer? was?', 'subject; after sein/werden/bleiben', '—'],
      ['Akkusativ', 'wen? was?', 'direct object', 'most verbs; durch, für, gegen, ohne, um, bis; two-way preps + Wohin?'],
      ['Dativ', 'wem?', 'indirect object (receiver)', 'helfen, danken, gefallen, gehören…; aus, bei, mit, nach, seit, von, zu; two-way preps + Wo?'],
      ['Genitiv', 'wessen?', 'possession (“of”)', 'wegen, trotz, während, statt'],
    ])}
<h3>Definite article & dieser</h3>
${tb(['', 'masc.', 'fem.', 'neut.', 'plural'], [
      ['Nom.', 'der', 'die', 'das', 'die'],
      ['Akk.', 'den', 'die', 'das', 'die'],
      ['Dat.', 'dem', 'der', 'dem', 'den (+n)'],
      ['Gen.', 'des (+s)', 'der', 'des (+s)', 'der'],
    ])}
<h3>Indefinite article / kein / possessives</h3>
${tb(['', 'masc.', 'fem.', 'neut.', 'plural'], [
      ['Nom.', 'ein / mein', 'eine / meine', 'ein / mein', 'keine / meine'],
      ['Akk.', 'einen / meinen', 'eine / meine', 'ein / mein', 'keine / meine'],
      ['Dat.', 'einem / meinem', 'einer / meiner', 'einem / meinem', 'keinen / meinen (+n)'],
      ['Gen.', 'eines / meines (+s)', 'einer / meiner', 'eines / meines (+s)', 'keiner / meiner'],
    ])}
<h3>Personal pronouns</h3>
${tb(['Nom.', 'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie/Sie'], [
      ['Akk.', 'mich', 'dich', 'ihn', 'sie', 'es', 'uns', 'euch', 'sie/Sie'],
      ['Dat.', 'mir', 'dir', 'ihm', 'ihr', 'ihm', 'uns', 'euch', 'ihnen/Ihnen'],
    ])}
<h3>Adjective endings (summary)</h3>
${tb(['', 'after der/die/das', 'after ein/kein/mein', 'no article'], [
      ['m. Nom', 'der gute Wein', 'ein guter Wein', 'guter Wein'],
      ['f. Nom/Akk', 'die gute Milch', 'eine gute Milch', 'gute Milch'],
      ['n. Nom/Akk', 'das gute Brot', 'ein gutes Brot', 'gutes Brot'],
      ['m. Akk', 'den guten Wein', 'einen guten Wein', 'guten Wein'],
      ['Dat. m/n', 'dem guten Wein', 'einem guten Wein', 'gutem Wein'],
      ['Dat. f', 'der guten Milch', 'einer guten Milch', 'guter Milch'],
      ['Plural Nom/Akk', 'die guten Leute', 'keine guten Leute', 'gute Leute'],
      ['Plural Dat', 'den guten Leuten', 'keinen guten Leuten', 'guten Leuten'],
    ], [1, 2, 3])}
<div class="tip">Practise with one sentence in all cases: [[Der neue Nachbar ist nett.]] [[Ich kenne den neuen Nachbarn.]] [[Ich helfe dem neuen Nachbarn.]] [[Das ist das Auto des neuen Nachbarn.]] (Nachbar = n-declension!)</div>`,
  });
})();
