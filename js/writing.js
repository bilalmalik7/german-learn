/* Writing studio: prompts, editor, AI mistake analysis (claude.ai), offline quick check, history. */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store, Speech, AI } = GL;

  const CATS = {
    grammar: ['Grammar', 'General grammar'],
    case: ['Cases & articles', 'der/den/dem, adjective endings, prepositions'],
    verb: ['Verb forms', 'conjugation, tenses, Perfekt with haben/sein'],
    word_order: ['Word order', 'verb 2nd, verb at the end, separable verbs'],
    spelling: ['Spelling & capitals', 'nouns with capitals, umlauts, typos'],
    vocabulary: ['Word choice', 'wrong word, false friends'],
    punctuation: ['Punctuation', 'commas before subordinate clauses'],
    style: ['Style & register', 'du/Sie, repetition, more natural phrasing'],
  };
  const LEVELS = ['A1', 'A2', 'B1'];
  const S = () => {
    const st = (Store.state.studio = Store.state.studio || {});
    st.drafts = st.drafts || {}; st.history = st.history || []; st.filter = st.filter || 'all';
    return st;
  };
  const words = (t) => (String(t).trim().match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length;
  const promptById = (id) => GL.writingPrompts.find((p) => p.id === id);
  const scoreCls = (s) => (s >= 85 ? '' : s >= 60 ? 'mid' : 'low');
  const bestFor = (pid) => S().history.filter((h) => h.pid === pid && h.score != null).reduce((m, h) => Math.max(m, h.score), -1);

  /* ---------- AI analysis ---------- */
  async function aiAnalyze(text, ctx) {
    const sample = await AI.get();
    if (!sample) throw { code: 'not_granted' };
    const up = { A1: 'A2', A2: 'B1', B1: 'B2' }[ctx.level] || 'B1';
    const pts = (ctx.points || []).map((p, i) => `${i + 1}) ${p[0]} (${p[1]})`).join('\n');
    const prompt = `You are an expert German teacher and Goethe/telc examiner. Analyse this text by a learner whose target level is ${ctx.level}.
Task: "${ctx.task || 'Free writing on any topic'}"${ctx.taskEn ? ` (${ctx.taskEn})` : ''}${ctx.formal ? '\nThe text must use the formal register (Sie).' : ''}
${pts ? `Required content points:\n${pts}\n` : ''}
Learner's text:
"""
${String(text).slice(0, 6000)}
"""

Find EVERY error: grammar; cases, articles and adjective endings; verb forms, conjugation and tenses (Perfekt with haben/sein); word order (verb second, verb at the end of subordinate clauses, separable verbs); spelling and capitalisation (nouns!); wrong words and false friends; punctuation (commas before subordinate clauses); register (du/Sie) if the task needs it. Do not mark correct alternatives as errors. Keep the learner's meaning.
Reply with only a JSON object in exactly this shape:
{"score": <0-100 overall: accuracy and task achievement>, "level": "<estimated CEFR level of this text: A1, A2, B1, B2 or C1>", "summary": "<2 encouraging English sentences: overall impression and the most important problem>",
"mistakes": [{"wrong": "<the wrong words copied character for character from the learner's text, as short as possible>", "right": "<the correction>", "category": "<one of: grammar, case, verb, word_order, spelling, vocabulary, punctuation, style>", "rule": "<short rule name, e.g. Dative after mit>", "explanation": "<1-2 simple English sentences explaining why>"}],
"corrected": "<the full text with only the errors fixed, same line breaks>", "improved": "<a more natural and idiomatic version at about level ${up}, keeping the content>",
"strengths": ["<2-3 things done well>"], "tips": ["<2-3 concrete things to practise next>"],
"coverage": [${pts ? '{"point": "<content point>", "done": <true or false>, "note": "<very short English note>"}' : ''}]}
List the mistakes in the order they appear in the text. If there are none, "mistakes" is [] and "corrected" repeats the text.${pts ? ' Give one coverage entry per required point, in order.' : ' "coverage" is [].'}`;
    const r = await sample.json(prompt, { modelTier: 'default' });
    if (!r || typeof r !== 'object') throw { code: 'invalid_json' };
    return normalize(r, text);
  }

  function normalize(r, text) {
    const arr = (x) => (Array.isArray(x) ? x : x ? [x] : []).map((s) => String(s)).filter(Boolean);
    return {
      score: Math.max(0, Math.min(100, Math.round(+r.score || 0))),
      level: /^(A1|A2|B1|B2|C1|C2)$/.test(String(r.level || '').trim()) ? String(r.level).trim() : '',
      summary: String(r.summary || ''),
      mistakes: (Array.isArray(r.mistakes) ? r.mistakes : []).filter((m) => m && (m.wrong || m.right)).map((m) => ({
        wrong: String(m.wrong || ''), right: String(m.right || ''), category: CATS[m.category] ? m.category : 'grammar',
        rule: String(m.rule || ''), explanation: String(m.explanation || m.why || ''),
      })),
      corrected: String(r.corrected || text), improved: String(r.improved || ''),
      strengths: arr(r.strengths).slice(0, 4), tips: arr(r.tips).slice(0, 4),
      coverage: (Array.isArray(r.coverage) ? r.coverage : []).filter((c) => c && c.point).map((c) => ({ point: String(c.point), done: !!c.done, note: String(c.note || '') })),
    };
  }

  /* ---------- offline quick check: common learner mistakes ---------- */
  let NOUNS = null;
  function nouns() {
    if (NOUNS) return NOUNS;
    NOUNS = {};
    const add = (w, g) => { if (w && /^[A-ZÄÖÜ]/.test(w) && !NOUNS[w.toLowerCase()]) NOUNS[w.toLowerCase()] = { g, w }; };
    (GL.days || []).forEach((d) => (d.vocab || []).forEach((v) => { const m = /^(der|die|das)\s+([A-ZÄÖÜ][\p{L}-]*)$/u.exec(v[0]); if (m) add(m[2], m[1]); }));
    (GL.drillNouns || []).forEach(([g, w]) => add(w, { m: 'der', f: 'die', n: 'das' }[g]));
    return NOUNS;
  }
  const genderOfNoun = (w) => (nouns()[String(w).toLowerCase()] || {}).g || null;
  const capFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const keepCase = (orig, rep) => (/^[A-ZÄÖÜ]/.test(orig) ? capFirst(rep) : rep);
  const SEIN = { habe: 'bin', hast: 'bist', hat: 'ist', haben: 'sind', habt: 'seid' };

  function quickCheck(text, ctx = {}) {
    const out = [];
    const add = (at, wrong, right, category, rule, explanation) => {
      if (out.some((m) => at < m.at + m.wrong.length && at + wrong.length > m.at && (m.category === category || m.rule === rule))) return;
      out.push({ at, wrong, right, category, rule, explanation, auto: true });
    };
    const each = (re, fn) => { re.lastIndex = 0; let m; while ((m = re.exec(text))) { fn(m); if (!re.global) break; } };

    // dative prepositions + die/das
    each(/\b(mit|von|zu|aus|bei|seit|nach)\s+(die|das)\s+([A-ZÄÖÜ][\p{L}-]*)/giu, (m) => {
      const [all, p, art, n] = m; const g = genderOfNoun(n); const pl = p.toLowerCase();
      let right = null;
      if (art.toLowerCase() === 'das') right = pl === 'zu' ? keepCase(p, 'zum') + ' ' + n : p + ' dem ' + n;
      else if (g === 'die') right = pl === 'zu' ? keepCase(p, 'zur') + ' ' + n : p + ' der ' + n;
      add(m.index, all, right || '', 'case', `Dative after „${pl}“`, `„${pl}“ always takes the dative: dem (masculine/neuter), der (feminine), den …n (plural). Never „die“ or „das“.`);
    });
    // accusative prepositions + dem/der
    each(/\b(für|durch|gegen|ohne|um)\s+(dem|der)\s+([A-ZÄÖÜ][\p{L}-]*)/giu, (m) => {
      const [all, p, art, n] = m; const g = genderOfNoun(n);
      const right = art.toLowerCase() === 'der' && g === 'die' ? `${p} die ${n}` : g === 'der' ? `${p} den ${n}` : g === 'das' ? `${p} das ${n}` : '';
      add(m.index, all, right, 'case', `Accusative after „${p.toLowerCase()}“`, `„${p.toLowerCase()}“ always takes the accusative: den (masculine), die (feminine), das (neuter), die (plural).`);
    });
    // sein / haben with the wrong person
    const conj = [
      [/\b(ich)\s+(bist|ist|sind|seid)\b/gi, 'bin'], [/\b(ich)\s+(hast|hat|habt)\b/gi, 'habe'],
      [/\b(du)\s+(bin|ist|sind|seid)\b/gi, 'bist'], [/\b(du)\s+(habe|hat|haben|habt)\b/gi, 'hast'],
      [/\b(er)\s+(bin|bist|sind|seid)\b/gi, 'ist'], [/\b(er|es)\s+(habe|hast|haben|habt)\b/gi, 'hat'],
      [/\b(wir)\s+(bin|bist|ist|seid)\b/gi, 'sind'], [/\b(wir)\s+(habe|hast|hat|habt)\b/gi, 'haben'],
    ];
    conj.forEach(([re, right]) => each(re, (m) => /\b(und|oder|sowie)\s+$/i.test(text.slice(Math.max(0, m.index - 8), m.index)) || /^seid$/i.test(m[2]) && /^\s+(\d+|einem|einer|zwei|drei|vier|fünf|langem|kurzem|gestern|wann|letztem|letzter|letzten)\b/i.test(text.slice(m.index + m[0].length)) ? null : add(m.index, m[0], `${m[1]} ${right}`, 'verb', 'Conjugation', `With „${m[1].toLowerCase()}“ the verb form is „${right}“.`)));
    // Perfekt with sein
    each(/\b(habe|hast|hat|haben|habt)\b([^.!?,;]{0,40}?)\b(gegangen|gekommen|geflogen|gelaufen|geblieben|gewesen|geworden|passiert|aufgestanden|angekommen|eingeschlafen|umgezogen|eingestiegen|ausgestiegen|gereist|gestorben|geboren|losgefahren|zurückgekommen)\b/giu, (m) => {
      add(m.index, m[0], keepCase(m[1], SEIN[m[1].toLowerCase()]) + m[2] + m[3], 'verb', 'Perfekt with sein', `„${m[3]}“ is a verb of movement or change: its Perfekt uses <b>sein</b> (ich bin … ${m[3]}), not haben.`);
    });
    // verb in second position inside a subordinate clause
    each(/\b(weil|dass|ob|obwohl|wenn|damit)\s+(ich|du|er|sie|es|wir|ihr|man)\s+(bin|bist|ist|sind|seid|habe|hast|hat|haben|habt|kann|kannst|können|könnt|will|willst|wollen|muss|musst|müssen|möchte|möchtest|möchten|werde|wirst|wird|werden|gehe|gehst|geht|gehen|fahre|fährst|fährt|fahren|komme|kommst|kommt|kommen|mache|machst|macht|machen|arbeite|arbeitest|arbeitet|arbeiten|wohne|wohnst|wohnt|wohnen|finde|findest|findet|finden|mag|magst|mögen|spreche|sprichst|spricht|sprechen|lerne|lernst|lernt|lernen|war|warst|waren|wart|hatte|hattest|hatten|konnte|konntest|konnten|wollte|wollten|musste|mussten|sollte|sollten|würde|würdest|würden|ging|kam|wurde|gab)\s+(?=[\p{L}\d])/giu, (m) => {
      const start = m.index; const rest = text.slice(start);
      const end = rest.search(/[,.!?;:\n]/); const clause = end < 0 ? rest : rest.slice(0, end);
      const tok = clause.trim().split(/\s+/);
      if (tok.length < 4) return;
      const verb = tok.splice(2, 1)[0];
      add(start, clause.trimEnd(), tok.join(' ') + ' ' + verb, 'word_order', `Verb at the end after „${m[1].toLowerCase()}“`, `„${m[1].toLowerCase()}“ starts a subordinate clause: the conjugated verb goes to the <b>end</b> of the clause.`);
    });
    // verb second: time/adverb first, then the verb (not the subject)
    each(/(^|[.!?]\s+)((?:Am|Im|Um|Nach dem|Nach der|Vor dem|Seit)\s+[\p{L}\d.:]+(?:\s+Uhr)?|Heute|Gestern|Morgen|Dann|Danach|Später|Jetzt|Zuerst|Leider|Deshalb|Deswegen|Trotzdem|Manchmal|Oft|Normalerweise|Abends|Morgens|Letzte Woche|Letztes Jahr|Nächste Woche|Nächstes Jahr|In der Freizeit|Am Wochenende)\s+(ich|du|er|sie|es|wir|ihr|man)\s+(\p{Ll}+)\b/gu, (m) => {
      const [, pre, adv, pron, verb] = m;
      if (/^(der|die|das|den|dem|ein|eine|einen|nicht|auch|gern|sehr|oft|schon|noch|immer|nie|und|oder)$/.test(verb)) return;
      add(m.index + pre.length, `${adv} ${pron} ${verb}`, `${adv} ${verb} ${pron}`, 'word_order', 'Verb in position 2', `When a sentence starts with „${adv}“, the verb comes next (position 2) and the subject follows it: ${adv} <b>${verb} ${pron}</b> …`);
    });
    // comma before subordinate clauses
    each(/([\p{L}\d])\s+(weil|dass|obwohl|damit)\b/giu, (m) => {
      const before = text.slice(0, m.index + 1).match(/(\p{L}+)$/u);
      const prev = before ? before[1] : '';
      if (/^(und|oder|aber|so|ohne|als|auch|nur|sondern)$/i.test(prev) || !prev) return;
      const at = m.index + 1 - prev.length;
      add(at, `${prev} ${m[2]}`, `${prev}, ${m[2]}`, 'punctuation', 'Comma before a subordinate clause', `In German there is always a comma before „${m[2].toLowerCase()}“ (and other subordinate clauses).`);
    });
    // formal letters
    each(/\b(Sehr geehrte|Liebe)\s+(Herr)\b/g, (m) => add(m.index, m[0], `${m[1]}r Herr`, 'case', 'Greeting: masculine ending', 'For a man: „Sehr geehrter Herr …“ / „Lieber Herr …“ (adjective ending -er).'));
    each(/\b(Sehr geehrter|Lieber)\s+(Frau)\b/g, (m) => add(m.index, m[0], `${m[1].slice(0, -1)} Frau`, 'case', 'Greeting: feminine ending', 'For a woman: „Sehr geehrte Frau …“ / „Liebe Frau …“.'));
    if (ctx.formal) {
      each(/\b(können|könnten|würden|möchten|haben|sind|wissen|kennen|danke|bitte|helfe|schreibe)\s+(sie|ihnen)\b/gi, (m) => /^[A-Z]/.test(m[2]) ? null : add(m.index, m[0], `${m[1]} ${capFirst(m[2])}`, 'style', 'Formal „Sie“', 'In a formal text, the polite „Sie / Ihnen / Ihr“ is always written with a capital letter.'));
    }
    // article and noun gender
    each(/\b(ein|eine|einen|das|Ein|Eine|Einen|Das)\s+([A-ZÄÖÜ][\p{L}-]+)\b/gu, (m) => {
      const [all, art, n] = m; const g = genderOfNoun(n); if (!g) return;
      const a = art.toLowerCase(); let right = '';
      if (a === 'ein' && g === 'die') right = keepCase(art, 'eine') + ' ' + n;
      else if (a === 'eine' && g === 'das') right = keepCase(art, 'ein') + ' ' + n;
      else if (a === 'eine' && g === 'der') right = keepCase(art, 'ein') + ' / ' + 'einen ' + n;
      else if (a === 'einen' && g === 'die') right = keepCase(art, 'eine') + ' ' + n;
      else if (a === 'einen' && g === 'das') right = keepCase(art, 'ein') + ' ' + n;
      else if (a === 'das' && g === 'der') right = keepCase(art, 'der') + ' / den ' + n;
      else if (a === 'das' && g === 'die') right = keepCase(art, 'die') + ' ' + n;
      if (right) add(m.index, all, right, 'case', `Gender: ${g} ${n}`, `„${n}“ is ${{ der: 'masculine', die: 'feminine', das: 'neuter' }[g]} (${g} ${n}), so the article must match.`);
    });
    // accusative after common verbs (masculine nouns)
    each(/\b(habe|hast|hat|haben|möchte|möchtest|brauche|brauchst|braucht|kaufe|kaufst|kauft|suche|suchst|sucht|nehme|nimmst|nimmt|esse|isst|trinke|trinkst|trinkt|sehe|siehst|sieht|bestelle|bestellst|bestellt|kenne|kennst|kennt|liebe|besuche|besuchst|besucht)\s+((?:ich|du|er|sie|es|wir|ihr|man)\s+)?(ein|kein|mein|dein|sein|unser)\s+([A-ZÄÖÜ][\p{L}-]+)\b(?!\s+(?:gegeben|gewesen))/giu, (m) => {
      const [all, v, pr = '', art, n] = m; if (genderOfNoun(n) !== 'der') return;
      add(m.index + v.length + 1 + pr.length, `${art} ${n}`, `${art}en ${n}`, 'case', 'Accusative: -en for masculine nouns', `„${v}“ takes an accusative object. ${n} is masculine (der ${n}) → ${art}<b>en</b> ${n}.`);
    });
    // fixed expressions
    each(/\b(ich|Ich)\s+habe\s+(\d+)\s+Jahre\b/g, (m) => add(m.index, m[0], `${m[1]} bin ${m[2]} Jahre alt`, 'vocabulary', 'Age with sein', 'Age uses „sein“: Ich bin 25 (Jahre alt).'));
    each(/\b(ich bin|Ich bin|du bist|Du bist)\s+(kalt|warm|heiß)\b/g, (m) => add(m.index, m[0], `${/^[Ii]ch/.test(m[1]) ? keepCase(m[1], 'mir') : keepCase(m[1], 'dir')} ist ${m[2]}`, 'vocabulary', 'Mir ist kalt', 'Feeling cold/warm: „Mir ist kalt.“ („Ich bin kalt“ means your personality is cold.)'));
    each(/\b(gehe|gehst|geht|gehen|fahre|fährst|fährt|fahren|komme|kommst|kommt|kommen|laufe|läufst|läuft)\s+((?:\p{L}+\s+){0,2}?)zu Hause\b(?!\s+an\b)/giu, (m) => add(m.index, m[0], `${m[1]} ${m[2]}nach Hause`, 'vocabulary', 'nach Hause vs. zu Hause', 'Direction (going home): <b>nach Hause</b>. Location (being at home): zu Hause.'));
    each(/\bin\s+((?:19|20)\d\d)\b/gi, (m) => add(m.index, m[0], `im Jahr ${m[1]}`, 'vocabulary', 'Years', 'German uses the year alone („2020 bin ich …“) or „im Jahr 2020“ – not „in 2020“.'));
    each(/\b(seid)\s+(\d+|einem|einer|zwei|drei|vier|fünf|langem|kurzem|gestern|wann|letztem|letzter|letzten)\b/gi, (m) => add(m.index, m[1], 'seit', 'spelling', 'seit vs. seid', '„seit“ = since/for (time). „seid“ = you are (ihr seid).'));
    // spelling: umlaut substitutes and common typos
    const SP = { fur: 'für', uber: 'über', fuer: 'für', ueber: 'über', konnen: 'können', koennen: 'können', mussen: 'müssen', muessen: 'müssen', moechte: 'möchte', mude: 'müde', naturlich: 'natürlich', spater: 'später', fruhstuck: 'Frühstück', brotchen: 'Brötchen', madchen: 'Mädchen', schuler: 'Schüler', grusse: 'Grüße', grüsse: 'Grüße', tschuss: 'tschüss', vieleicht: 'vielleicht', garnicht: 'gar nicht', warscheinlich: 'wahrscheinlich', standart: 'Standard', nähmlich: 'nämlich', addresse: 'Adresse', interresant: 'interessant', intressant: 'interessant', eigendlich: 'eigentlich', entgültig: 'endgültig', seperat: 'separat', bischen: 'bisschen', wochende: 'Wochenende', packet: 'Paket', komputer: 'Computer', strasse: 'Straße', heisse: 'heiße', heisst: 'heißt', gross: 'groß', weiss: 'weiß', schliesslich: 'schließlich' };
    each(/[\p{L}]+/gu, (m) => {
      const w = m[0], r = SP[w.toLowerCase()];
      if (r) add(m.index, w, /^[A-ZÄÖÜ]/.test(r) ? r : keepCase(w, r), 'spelling', 'Spelling', /ue|oe|ae/i.test(w) ? 'Use the real umlaut (ä, ö, ü) – use the buttons under the text box.' : /ss/.test(w) && /ß/.test(r) ? 'After a long vowel or a diphthong (ei, au, ie) German writes <b>ß</b>.' : 'Correct spelling: ' + r + '.');
    });
    // nouns must be capitalised
    each(/(^|[^\p{L}])(\p{Ll}[\p{L}]{2,})(?=[^\p{L}]|$)/gu, (m) => {
      const w = m[2]; const n = nouns()[w];
      if (!n || /en$/.test(w) || /^(morgen|abend|mittag|recht|angst|schuld|leid|teil)$/.test(w)) return;
      if (/\b(ich|du|er|sie|es|wir|ihr|man|zu)\s+$/i.test(text.slice(Math.max(0, m.index - 6), m.index + m[1].length))) return; // a verb form like „ich stelle“
      add(m.index + m[1].length, w, n.w, 'spelling', 'Nouns with a capital letter', `All nouns are capitalised in German: ${n.g} <b>${esc(n.w)}</b>.`);
    });
    // sentence start
    each(/(^|[.!?]\s+)(\p{Ll})/gu, (m) => {
      const before = text.slice(Math.max(0, m.index - 6), m.index + m[1].length);
      if (/(z\.\s?B\.|usw\.|bzw\.|ca\.|d\.\s?h\.|Nr\.|\d\.)\s*$/.test(before)) return;
      const at = m.index + m[1].length; const w = (text.slice(at).match(/^\p{L}+/u) || [m[2]])[0];
      add(at, w, capFirst(w), 'spelling', 'Capital at the start', 'Every sentence starts with a capital letter.');
    });
    // repeated word
    each(/\b(\p{L}+)\s+\1\b/gu, (m) => { if (/^(die|das|der)$/i.test(m[1])) return; add(m.index, m[0], m[1], 'style', 'Repeated word', 'The same word appears twice in a row.'); });
    return out.sort((a, b) => a.at - b.at);
  }

  /* ---------- rendering helpers ---------- */
  function locate(text, mistakes) {
    const spans = [];
    const free = (s, e) => !spans.some((x) => s < x.e && e > x.s);
    mistakes.forEach((m, i) => {
      if (m.at != null && text.substr(m.at, m.wrong.length) === m.wrong && free(m.at, m.at + m.wrong.length)) { spans.push({ s: m.at, e: m.at + m.wrong.length, i }); return; }
      const w = m.wrong.trim(); if (!w) return;
      const tryFind = (hay, needle) => { let from = 0, idx; while ((idx = hay.indexOf(needle, from)) !== -1) { if (free(idx, idx + needle.length)) return idx; from = idx + 1; } return -1; };
      let idx = tryFind(text, w);
      if (idx < 0) idx = tryFind(text.toLowerCase(), w.toLowerCase());
      if (idx >= 0) spans.push({ s: idx, e: idx + w.length, i });
    });
    return spans.sort((a, b) => a.s - b.s);
  }
  function markedHTML(text, mistakes) {
    const spans = locate(text, mistakes);
    let out = '', pos = 0;
    spans.forEach((sp) => { out += esc(text.slice(pos, sp.s)) + `<mark class="wm" data-k="${sp.i}" tabindex="0">${esc(text.slice(sp.s, sp.e))}<sup>${sp.i + 1}</sup></mark>`; pos = sp.e; });
    return out + esc(text.slice(pos));
  }
  /* Word-level diff (LCS) between the learner's text and the corrected one. */
  function diffHTML(a, b) {
    const tok = (s) => s.match(/\s+|[\p{L}\p{N}'’-]+|[^\s\p{L}\p{N}]/gu) || [];
    const A = tok(a), B = tok(b), n = A.length, m = B.length;
    if (n * m > 4e6) return esc(b);
    const W = m + 1, L = new Uint16Array((n + 1) * W);
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i * W + j] = A[i] === B[j] ? L[(i + 1) * W + j + 1] + 1 : Math.max(L[(i + 1) * W + j], L[i * W + j + 1]);
    const ops = []; let i = 0, j = 0;
    while (i < n && j < m) {
      if (A[i] === B[j]) { ops.push(['=', A[i]]); i++; j++; }
      else if (/^\s+$/.test(A[i]) && /^\s+$/.test(B[j])) { ops.push(['=', B[j]]); i++; j++; }
      else if (L[(i + 1) * W + j] >= L[i * W + j + 1]) ops.push(['-', A[i++]]);
      else ops.push(['+', B[j++]]);
    }
    while (i < n) ops.push(['-', A[i++]]);
    while (j < m) ops.push(['+', B[j++]]);
    let changes = 0;
    const html = ops.map(([t, v]) => {
      if (t === '=' || /^\s+$/.test(v)) return t === '-' ? '' : esc(v);
      changes++;
      return t === '-' ? `<del>${esc(v)}</del>` : `<ins>${esc(v)}</ins>`;
    }).join('');
    return changes ? html : esc(b);
  }
  function catCounts(mistakes) {
    const c = {};
    mistakes.forEach((m) => (c[m.category] = (c[m.category] || 0) + 1));
    return c;
  }
  function barsHTML(counts) {
    const ent = Object.entries(counts).filter(([, n]) => n).sort((a, b) => b[1] - a[1]);
    if (!ent.length) return '<p class="muted">No mistakes – nothing to show. 🎉</p>';
    const max = ent[0][1];
    return `<div class="wr-bars">${ent.map(([k, n]) => `<div class="wr-bar" title="${attr(CATS[k][1])}"><span>${esc(CATS[k][0])}</span><div class="track"><i style="width:${Math.max(6, (n / max) * 100)}%"></i></div><b>${n}</b></div>`).join('')}</div>`;
  }
  function ring(score) {
    return `<div class="wr-ring ${scoreCls(score)}" style="--p:${score}"><b>${score}</b><small>/100</small></div>`;
  }
  function sentenceAround(text, wrong) {
    const i = text.indexOf(wrong); if (i < 0) return '';
    const s = Math.max(text.lastIndexOf('.', i), text.lastIndexOf('!', i), text.lastIndexOf('?', i), text.lastIndexOf('\n', i)) + 1;
    const ends = ['.', '!', '?', '\n'].map((c) => text.indexOf(c, i + wrong.length)).filter((x) => x >= 0);
    const e = ends.length ? Math.min(...ends) + 1 : text.length;
    return text.slice(s, e).trim();
  }
  function toNotebook(text, m) {
    if (!m.wrong.trim() || !m.right.trim() || m.wrong.trim() === m.right.trim() || /\//.test(m.right)) return false;
    const ctxS = sentenceAround(text, m.wrong);
    GL.Store.addMistake({ t: 'mc', q: `✍️ From your writing – which is correct?${ctxS ? `<br><i>„${esc(ctxS)}“</i>` : ''}`, o: [m.right.trim(), m.wrong.trim()], a: 0, ex: `${m.rule ? '<b>' + esc(m.rule) + ':</b> ' : ''}${m.auto ? m.explanation : esc(m.explanation)}` }, null);
    return true;
  }

  function resultHTML(text, r, opts = {}) {
    const ms = r.mistakes;
    const counts = catCounts(ms);
    const n = ms.length;
    const pts = opts.points || [];
    return `<div class="wr-result">
      <div class="wr-head">${ring(r.score)}
        <div style="flex:1;min-width:200px"><div class="row"><span class="ai-badge">✨ AI analysis</span>${r.level ? `<span class="level ${esc(r.level.slice(0, 2))}">≈ ${esc(r.level)}</span>` : ''}<span class="muted">${n ? `${n} mistake${n > 1 ? 's' : ''} found` : 'No mistakes – perfekt!'} · ${words(text)} words</span></div>
        ${r.summary ? `<p style="margin:.5em 0 0">${esc(r.summary)}</p>` : ''}</div></div>
      <div class="chips wr-tabs" role="tablist">
        <button class="chip on" data-pane="marked">📝 Your text${n ? ' (marked)' : ''}</button>
        <button class="chip" data-pane="diff">✅ Corrected (changes)</button>
        ${r.improved ? '<button class="chip" data-pane="improved">🌟 More natural</button>' : ''}
      </div>
      <div class="wr-pane" data-pane="marked">${markedHTML(text, ms)}<div class="wr-pop hidden"></div></div>
      <div class="wr-pane hidden" data-pane="diff">${diffHTML(text, r.corrected)}<p class="row" style="margin:10px 0 0"><button class="btn tiny ghost" data-say="${attr(r.corrected)}">🔊 Listen</button></p></div>
      ${r.improved ? `<div class="wr-pane hidden" data-pane="improved">${esc(r.improved)}<p class="row" style="margin:10px 0 0"><button class="btn tiny ghost" data-say="${attr(r.improved)}">🔊 Listen</button><small class="muted">A native-like version one level higher – read it aloud and steal good phrases!</small></p></div>` : ''}
      ${n ? `<h3>🔍 Every mistake explained</h3><ol class="wr-mlist">${ms.map((m, i) => `<li class="wr-m" id="wrm-${i}">
          <div class="row"><span class="wr-num">${i + 1}</span><span class="path-tag">${esc(CATS[m.category][0])}</span>${m.rule ? `<b>${esc(m.rule)}</b>` : ''}<span class="spacer"></span>
            ${m.right ? `<button class="btn tiny ghost" data-say="${attr(m.right)}" aria-label="Listen">🔊</button>` : ''}${opts.noNotebook ? '' : `<button class="btn tiny ghost wr-nb" data-k="${i}">＋ Notebook</button>`}</div>
          <p class="wr-fix">${m.wrong ? `<span class="m-wrong">${esc(m.wrong)}</span>` : '<span class="muted">(missing)</span>'} → <span class="m-right">${esc(m.right || '–')}</span></p>
          ${m.explanation ? `<p class="muted" style="margin:0">${esc(m.explanation)}</p>` : ''}</li>`).join('')}</ol>` : ''}
      <div class="grid grid-2" style="margin-top:6px">
        <div><h3>📊 Mistakes by type</h3>${barsHTML(counts)}</div>
        ${r.coverage.length || pts.length ? `<div><h3>🎯 Task coverage</h3><ul class="wr-cover">${(r.coverage.length ? r.coverage : pts.map((p) => ({ point: p[0], done: null }))).map((c) => `<li class="${c.done ? 'ok' : c.done === false ? 'no' : ''}"><span>${c.done ? '✔' : c.done === false ? '✘' : '•'}</span><div><b>${esc(c.point)}</b>${c.note ? `<small>${esc(c.note)}</small>` : ''}</div></li>`).join('')}</ul></div>` : ''}
      </div>
      ${r.strengths.length ? `<h3>👍 What you did well</h3><ul>${r.strengths.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
      ${r.tips.length ? `<h3>🎯 Practise next</h3><ul>${r.tips.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
      ${opts.actions === false ? '' : `<div class="row" style="margin-top:14px">
        ${n && !opts.noNotebook ? '<button class="btn ghost" id="wrAllNb">❗ Add all to my mistake notebook</button>' : ''}
        <button class="btn" id="wrFixSelf">✍️ Fix it myself, then check again</button>
        <button class="btn ghost" id="wrUseCorr">Use the corrected text</button></div>`}
    </div>`;
  }

  function wireResult(root, text, r) {
    $$('.wr-tabs .chip', root).forEach((b) => (b.onclick = () => {
      $$('.wr-tabs .chip', root).forEach((x) => x.classList.toggle('on', x === b));
      $$('.wr-pane', root).forEach((p) => p.classList.toggle('hidden', p.dataset.pane !== b.dataset.pane));
    }));
    const pane = $('.wr-pane[data-pane="marked"]', root), pop = $('.wr-pop', root);
    const show = (mk) => {
      const m = r.mistakes[+mk.dataset.k]; if (!m) return;
      pop.innerHTML = `<button class="wr-pop-x" aria-label="Close">✖</button><span class="path-tag">${esc(CATS[m.category][0])}</span> ${m.rule ? `<b>${esc(m.rule)}</b>` : ''}
        <p class="wr-fix"><span class="m-wrong">${esc(m.wrong)}</span> → <span class="m-right">${esc(m.right || '–')}</span></p>${m.explanation ? `<p class="muted" style="margin:0">${m.auto ? m.explanation : esc(m.explanation)}</p>` : ''}`;
      pop.classList.remove('hidden');
      const pr = pane.getBoundingClientRect(), mr = mk.getBoundingClientRect();
      pop.style.top = mr.bottom - pr.top + 6 + 'px';
      pop.style.left = Math.max(6, Math.min(pr.width - pop.offsetWidth - 6, mr.left - pr.left)) + 'px';
      $$('.wm', pane).forEach((x) => x.classList.toggle('on', x === mk));
      $$('.wr-m', root).forEach((x) => x.classList.toggle('on', x.id === 'wrm-' + mk.dataset.k));
    };
    if (pane && pop) {
      pane.addEventListener('click', (e) => { const mk = e.target.closest('.wm'); if (mk) show(mk); else if (e.target.closest('.wr-pop-x') || !e.target.closest('.wr-pop')) { pop.classList.add('hidden'); $$('.wm', pane).forEach((x) => x.classList.remove('on')); } });
      pane.addEventListener('keydown', (e) => { const mk = e.target.closest('.wm'); if (mk && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); show(mk); } });
    }
    $$('.wr-nb', root).forEach((b) => (b.onclick = () => {
      const ok = toNotebook(text, r.mistakes[+b.dataset.k]);
      b.disabled = true; b.textContent = ok ? '✔ Added' : '–';
      if (ok) GL.toast('Added to your mistake notebook ❗');
    }));
    const all = $('#wrAllNb', root);
    if (all) all.onclick = () => {
      let k = 0; r.mistakes.forEach((m, i) => { const b = $(`.wr-nb[data-k="${i}"]`, root); if (b && !b.disabled && toNotebook(text, m)) { k++; b.disabled = true; b.textContent = '✔ Added'; } });
      all.disabled = true; GL.toast(k ? `${k} mistake${k > 1 ? 's' : ''} added – practise them under Review → Mistakes.` : 'Nothing new to add.');
    };
  }

  /* ---------- views ---------- */
  function tabsHTML(active) {
    return `<div class="chips" style="margin:6px 0 16px">${[['', '📚 Tasks'], ['free', '✏️ Free writing'], ['history', '🗂️ My texts & progress']].map(([k, l]) => `<a class="chip ${active === k ? 'on' : ''}" href="#/writing${k ? '/' + k : ''}">${l}</a>`).join('')}</div>`;
  }
  function statsTiles() {
    const h = S().history.filter((x) => x.score != null);
    const last = h.slice(-10);
    const avg = last.length ? Math.round(last.reduce((a, x) => a + x.score, 0) / last.length) : null;
    const totalW = S().history.reduce((a, x) => a + (x.words || 0), 0);
    return `<div class="stats wr-stats"><div class="stat"><span class="s-ico">📝</span><div><b>${S().history.length}</b><span>texts analysed</span></div></div><div class="stat"><span class="s-ico">🔤</span><div><b>${totalW}</b><span>words written</span></div></div><div class="stat"><span class="s-ico">🎯</span><div><b>${avg == null ? '–' : avg}</b><span>avg. score (last 10)</span></div></div></div>`;
  }

  function list() {
    const f = S().filter;
    const ps = GL.writingPrompts.filter((p) => f === 'all' || p.level === f);
    return {
      html: `<h1>✍️ Writing studio</h1>
        <p class="muted">Write real texts – emails, stories, opinions. The AI marks <b>every mistake</b> in your text, explains the rule, shows the corrected and a more natural version, and tracks your progress. No AI here? The quick check still finds common mistakes.</p>
        ${tabsHTML('')}${statsTiles()}
        <div class="chips" id="wrFilter" style="margin:14px 0">${['all', ...LEVELS].map((l) => `<button class="chip ${f === l ? 'on' : ''}" data-l="${l}">${l === 'all' ? 'All levels' : l}</button>`).join('')}</div>
        <div class="grid grid-3">${ps.map((p) => { const b = bestFor(p.id), dr = (S().drafts[p.id] || '').trim(); return `<a class="card wr-card" href="#/writing/${p.id}" style="margin:0">
          <div class="row"><span class="wr-ico">${p.icon}</span><span class="level ${p.level}">${p.level}</span><span class="path-tag">${esc(p.cat)}</span>${b >= 0 ? `<span class="score-badge ${scoreCls(b)}">${b}</span>` : dr ? '<span class="path-tag">draft</span>' : ''}</div>
          <h3 style="margin:.5em 0 .2em">${esc(p.title)}</h3><p class="muted" style="margin:0">${esc(p.en)} · ${p.words[0]}–${p.words[1]} words</p></a>`; }).join('')}</div>`,
      mount() {
        $$('#wrFilter .chip').forEach((b) => (b.onclick = () => { S().filter = b.dataset.l; Store.save(); GL.render(); }));
      },
    };
  }

  function editor(p) {
    const free = !p;
    const key = free ? '_free' : p.id;
    const st = S();
    const level = free ? st.freeLevel || 'A2' : p.level;
    return {
      html: `<p><a href="#/writing">← Writing studio</a></p>
        ${free ? tabsHTML('free') : ''}
        <div class="wr-layout">
          <div class="card wr-task">
            ${free ? `<h2 style="margin-top:0">✏️ Free writing</h2><p class="muted">Write about anything: your day, a message, a diary entry, practice for an exam. Choose your level for the analysis.</p>
              <label class="muted" for="wrTopic">Topic (optional)</label><input class="txt-in" id="wrTopic" placeholder="e.g. Mein Traumurlaub" value="${attr(st.freeTopic || '')}" style="width:100%;margin:4px 0 10px">
              <div class="chips" id="wrLevel">${LEVELS.map((l) => `<button class="chip ${l === level ? 'on' : ''}" data-l="${l}">${l}</button>`).join('')}</div>`
            : `<div class="row"><span class="wr-ico">${p.icon}</span><span class="level ${p.level}">${p.level}</span><span class="path-tag">${esc(p.cat)}</span>${p.formal ? '<span class="path-tag">formal · Sie</span>' : ''}</div>
              <h2 style="margin:.4em 0 .2em">${esc(p.title)}</h2>
              <p class="wr-task-de"><button class="say-btn" data-say="${attr(p.task)}" aria-label="Listen">🔊</button> ${esc(p.task)}</p><p class="muted">${esc(p.taskEn)}</p>
              <h4>Your text must include</h4><ul class="wr-points" id="wrPoints">${p.points.map((x) => `<li><span>○</span><div><b>${esc(x[0])}</b><small>${esc(x[1])}</small></div></li>`).join('')}</ul>
              <p class="muted">🎯 ${p.words[0]}–${p.words[1]} words</p>
              <details class="wr-model"><summary>👀 Show a model answer</summary><p style="white-space:pre-line">${esc(p.model)}</p><button class="btn tiny ghost" data-say="${attr(p.model)}">🔊 Listen</button></details>`}
          </div>
          <div class="card wr-edit">
            <textarea class="txt-in wr-text" id="wrText" rows="13" spellcheck="false" placeholder="Schreib hier auf Deutsch …">${esc(st.drafts[key] || '')}</textarea>
            <div class="umlauts" id="wrUml">${['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü', '„', '“'].map((c) => `<button type="button" class="btn tiny ghost" data-c="${c}">${c}</button>`).join('')}</div>
            <div class="wr-meter"><div class="track"><i id="wrBar"></i></div><span id="wrCount" class="muted"></span><span class="spacer"></span><small class="muted" id="wrSaved"></small></div>
            <div class="row" style="margin-top:10px">
              <button class="btn purple hidden" id="wrAnalyze">✨ Analyze my writing</button>
              <button class="btn ghost" id="wrQuick">⚡ Quick check</button>
              <button class="btn ghost" id="wrRead">🔊 Read aloud</button>
              <span id="wrTeacher"></span>
            </div>
            <p class="muted hidden" id="wrNoAi" style="margin:8px 0 0">💡 The full AI analysis works when this course is opened on claude.ai. The quick check finds common mistakes everywhere.</p>
          </div>
        </div>
        <div id="wrOut"></div>`,
      mount() {
        const ta = $('#wrText'), out = $('#wrOut');
        let lvl = level;
        const upd = () => {
          const n = words(ta.value);
          const [mn, mx] = free ? [40, 200] : p.words;
          $('#wrCount').textContent = `${n} word${n === 1 ? '' : 's'} · goal ${mn}–${mx}`;
          const bar = $('#wrBar'); bar.style.width = Math.min(100, (n / mn) * 100) + '%';
          bar.className = n > mx ? 'over' : n >= mn ? 'ok' : '';
        };
        let t = null;
        ta.addEventListener('input', () => {
          upd(); clearTimeout(t);
          t = setTimeout(() => { st.drafts[key] = ta.value; Store.save(); $('#wrSaved').textContent = '✔ Draft saved'; }, 500);
        });
        upd();
        $('#wrUml').onclick = (e) => {
          const b = e.target.closest('[data-c]'); if (!b) return;
          const s = ta.selectionStart, en = ta.selectionEnd;
          ta.value = ta.value.slice(0, s) + b.dataset.c + ta.value.slice(en);
          ta.focus(); ta.selectionStart = ta.selectionEnd = s + 1;
          ta.dispatchEvent(new Event('input'));
        };
        if (free) {
          $('#wrTopic').oninput = (e) => { st.freeTopic = e.target.value; Store.save(); };
          $$('#wrLevel .chip').forEach((b) => (b.onclick = () => { lvl = b.dataset.l; st.freeLevel = lvl; Store.save(); $$('#wrLevel .chip').forEach((x) => x.classList.toggle('on', x === b)); }));
        }
        $('#wrRead').onclick = () => { if (ta.value.trim()) Speech.speak(ta.value); };
        const ctx = () => (free ? { level: lvl, task: st.freeTopic ? 'Free text on the topic: ' + st.freeTopic : '', taskEn: '' } : { level: p.level, task: p.task, taskEn: p.taskEn, points: p.points, formal: p.formal });
        const title = () => (free ? (st.freeTopic || 'Free writing') : p.title);
        GL.sendToTeacherButton($('#wrTeacher'), () => ta.value, '✍️ ' + title());

        const markPoints = (cov) => {
          if (free || !cov || !cov.length) return;
          $$('#wrPoints li').forEach((li, i) => { const c = cov[i]; if (!c) return; li.className = c.done ? 'ok' : 'no'; $('span', li).textContent = c.done ? '✔' : '✘'; });
        };
        const tooShort = () => { if (words(ta.value) < 5) { out.innerHTML = '<div class="card"><p class="muted" style="margin:0">Write at least one or two full sentences first (5+ words).</p></div>'; return true; } return false; };

        $('#wrQuick').onclick = () => {
          if (tooShort()) return;
          const text = ta.value;
          const ms = quickCheck(text, ctx());
          const counts = catCounts(ms);
          out.innerHTML = `<div class="card wr-result"><div class="row"><span class="ai-badge" style="background:var(--gold);color:#1f2a48">⚡ Quick check</span><span class="muted">${ms.length ? `${ms.length} possible mistake${ms.length > 1 ? 's' : ''}` : 'No common mistakes found'}</span></div>
            <p class="muted">Automatic check for typical learner mistakes (cases after prepositions, verb position, capitals, spelling …). It can’t understand meaning – ${AI.disabled ? 'ask your teacher to check the rest.' : 'the ✨ AI analysis finds everything.'}</p>
            <div class="wr-pane" data-pane="marked">${markedHTML(text, ms)}<div class="wr-pop hidden"></div></div>
            ${ms.length ? `<ol class="wr-mlist">${ms.map((m, i) => `<li class="wr-m" id="wrm-${i}"><div class="row"><span class="wr-num">${i + 1}</span><span class="path-tag">${esc(CATS[m.category][0])}</span><b>${esc(m.rule)}</b><span class="spacer"></span>${m.right && !/\//.test(m.right) ? `<button class="btn tiny ghost wr-nb" data-k="${i}">＋ Notebook</button>` : ''}</div>
              <p class="wr-fix"><span class="m-wrong">${esc(m.wrong)}</span>${m.right ? ` → <span class="m-right">${esc(m.right)}</span>` : ''}</p><p class="muted" style="margin:0">${m.explanation}</p></li>`).join('')}</ol>
              <h3>📊 By type</h3>${barsHTML(counts)}` : '<p>✅ Looks good so far!</p>'}</div>`;
          wireResult(out, text, { mistakes: ms });
          GL.sfx(ms.length ? 'pop' : 'ok');
        };

        AI.get().then((sample) => {
          if (!$('#wrAnalyze')) return;
          if (!sample) { $('#wrNoAi').classList.remove('hidden'); return; }
          const btn = $('#wrAnalyze');
          btn.classList.remove('hidden');
          btn.onclick = async () => {
            if (tooShort()) return;
            const text = ta.value;
            btn.disabled = true;
            out.innerHTML = `<div class="card"><div class="ai-thinking">${GL.charSVG('bruno', 'idle talking')}<span>Bruno is reading your text word by word<span class="dots"></span></span></div></div>`;
            out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            try {
              const r = await aiAnalyze(text, ctx());
              const entry = { ts: Date.now(), date: GL.todayStr(), pid: free ? null : p.id, title: title(), level: ctx().level, words: words(text), score: r.score, est: r.level, n: r.mistakes.length, cats: catCounts(r.mistakes), text, r };
              st.history.push(entry);
              if (st.history.length > 40) st.history.splice(0, st.history.length - 40);
              const prev = st.history.filter((h) => h.pid === entry.pid && h !== entry && h.title === entry.title).pop();
              Store.addXP(prev ? 5 : 15); Store.save();
              out.innerHTML = `<div class="card">${prev && prev.score != null ? `<p class="wr-prev">${r.score > prev.score ? `📈 Better than last time: ${prev.score} → <b>${r.score}</b>. Super!` : r.score === prev.score ? `Same score as last time (${prev.score}).` : `Last time: ${prev.score}. Keep going – read the explanations below.`}</p>` : ''}${resultHTML(text, r, { points: free ? [] : p.points })}</div>`;
              wireResult(out, text, r);
              markPoints(r.coverage);
              GL.sfx(r.score >= 85 ? 'done' : 'pop');
              if (r.score >= 90) GL.confetti();
              const fix = $('#wrFixSelf'); if (fix) fix.onclick = () => { ta.focus(); ta.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
              const use = $('#wrUseCorr'); if (use) use.onclick = () => { ta.value = r.corrected; ta.dispatchEvent(new Event('input')); ta.scrollIntoView({ behavior: 'smooth', block: 'center' }); GL.toast('Corrected text loaded – read it aloud once!'); };
            } catch (e) {
              const msg = AI.errorText(e);
              out.innerHTML = msg ? `<div class="card"><p class="muted" style="margin:0">${esc(msg)}</p></div>` : '';
              if (AI.disabled) { btn.classList.add('hidden'); $('#wrNoAi').classList.remove('hidden'); }
            }
            btn.disabled = false;
          };
        });
      },
    };
  }

  function history(ts) {
    const h = S().history;
    if (ts) {
      const e = h.find((x) => String(x.ts) === String(ts));
      if (!e) return history();
      return {
        html: `<p><a href="#/writing/history">← My texts</a></p><div class="card"><div class="row"><h2 style="margin:0">${esc(e.title)}</h2><span class="spacer"></span><small class="muted">${esc(e.date)} · ${e.words} words · level ${esc(e.level || '')}</small></div>
          ${e.r ? resultHTML(e.text, e.r, { actions: false, points: (promptById(e.pid) || {}).points || [] }) : `<p style="white-space:pre-line">${esc(e.text)}</p>`}
          <div class="row" style="margin-top:12px">${e.pid ? `<a class="btn" href="#/writing/${e.pid}">✍️ Write this task again</a>` : '<a class="btn" href="#/writing/free">✏️ Free writing</a>'}</div></div>`,
        mount() { if (e.r) wireResult($('#app'), e.text, e.r); },
      };
    }
    const scored = h.filter((x) => x.score != null);
    const last = scored.slice(-12);
    const totals = {};
    h.forEach((x) => Object.entries(x.cats || {}).forEach(([k, n]) => (totals[k] = (totals[k] || 0) + n)));
    const topCat = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
    return {
      html: `<h1>✍️ Writing studio</h1>${tabsHTML('history')}${statsTiles()}
        ${h.length ? `<div class="grid grid-2" style="margin-top:14px">
          <div class="card" style="margin:0"><h3 style="margin-top:0">📈 Your scores</h3>
            <div class="wr-trend">${last.map((x) => `<a href="#/writing/history/${x.ts}" class="wr-col" title="${attr(x.title)} · ${x.date}: ${x.score}"><i style="height:${Math.max(4, x.score)}%"></i><small>${x.score}</small></a>`).join('')}</div>
            <p class="muted" style="margin:6px 0 0">Last ${last.length} analysed texts, oldest → newest.</p></div>
          <div class="card" style="margin:0"><h3 style="margin-top:0">🧭 Your most common mistakes</h3>${barsHTML(totals)}
            ${topCat ? `<p class="muted">Focus on <b>${esc(CATS[topCat[0]][0])}</b>: ${esc(CATS[topCat[0]][1])}. ${topCat[0] === 'case' ? 'The <a href="#/trainer">Trainer</a> has unlimited article drills.' : topCat[0] === 'verb' ? 'The <a href="#/trainer">Trainer</a> drills every verb form.' : ''}</p>` : ''}</div></div>
          <div class="card"><h3 style="margin-top:0">🗂️ All texts</h3><div class="wr-hist">${h.slice().reverse().map((x) => `<a class="wr-hrow" href="#/writing/history/${x.ts}"><span class="score-badge ${scoreCls(x.score)}">${x.score}</span><b>${esc(x.title)}</b><span class="muted">${x.words} words · ${x.n} mistake${x.n === 1 ? '' : 's'}${x.est ? ' · ≈ ' + esc(x.est) : ''}</span><span class="spacer"></span><small class="muted">${esc(x.date)}</small></a>`).join('')}</div></div>`
        : `<div class="card"><p style="margin:0">No analysed texts yet. Pick a <a href="#/writing">task</a> or try <a href="#/writing/free">free writing</a> – after the ✨ AI analysis your texts and progress appear here.</p></div>`}`,
    };
  }

  GL.viewWriting = function (a, b) {
    if (a === 'free') return editor(null);
    if (a === 'history') return history(b);
    const p = a && promptById(a);
    return p ? editor(p) : list();
  };
  GL.Writing = { quickCheck, diffHTML, markedHTML, normalize };
})();
