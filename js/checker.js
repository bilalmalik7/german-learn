/* OFFLINE WRITING COACH – checks German texts without any AI or server.
   1. Rules for typical learner mistakes (on top of the writing studio's quick check). They use a word list that is
      built from the course data: nouns with gender and plural, verbs with all their forms, adjectives.
   2. An exam-style score like Goethe/telc markers give: task, coherence, vocabulary, structures – plus an estimated level.
   3. Task coverage, a corrected version, strengths and concrete tips with links to the grammar pages.
   4. "Mistake hunt": a correct course sentence with one typical mistake – the learner finds and fixes it. */
(function () {
  'use strict';
  const esc = (s) => GL.esc(s);

  /* ================= word list ================= */
  const SEP = ['kennen', 'spazieren', 'zurück', 'zusammen', 'weiter', 'fern', 'fest', 'statt', 'teil', 'los', 'weg', 'hin', 'her', 'vor', 'nach', 'mit', 'auf', 'aus', 'ein', 'ab', 'an', 'bei', 'zu', 'um'];
  const BASES = 'fangen rufen stehen kaufen kommen gehen sehen laden holen nehmen bringen machen räumen ziehen steigen fahren stellen hören schlafen sagen geben zeigen legen packen schauen füllen melden setzen treten halten lassen passen suchen schreiben fallen denken lernen hängen schalten probieren kochen wachen sprechen arbeiten bauen rechnen spielen lesen tragen reisen laufen lachen sitzen liegen schließen fliegen wandern planen prüfen drucken hören bieten biegen fühlen nutzen wählen werfen ziehen leihen'.split(' ');
  const PRON = { ich: [0], du: [1], er: [2], es: [2], man: [2], sie: [2, 5], wir: [3], ihr: [4] };
  const MODAL = new Set('kann kannst können könnt muss musst müssen müsst will willst wollen wollt darf darfst dürfen dürft soll sollst sollen sollt möchte möchtest möchten möchtet werde wirst wird werden werdet könnte könntest könnten könntet würde würdest würden würdet müsste müsstest müssten dürfte dürften sollte solltest sollten wollte wollten konnte konnten musste mussten'.split(' '));
  const DETLIKE = /^(meine|meinen|meinem|meiner|deine|deinen|deinem|seine|seinen|seinem|ihre|ihren|ihrem|unsere|unseren|eure|euren|keine|keinen|einen|eine|gern|gerne)$/;
  const HABEN = new Set('habe hast hat haben habt'.split(' '));
  const SEIN = new Set('bin bist ist sind seid'.split(' '));
  const ADJ_LIST = ('neu alt groß klein gut schlecht schön hässlich teuer billig lang kurz hoch nett freundlich lecker frisch warm kalt heiß rot blau grün gelb schwarz weiß braun grau bunt modern interessant langweilig wichtig schwer leicht einfach schnell langsam laut leise hell dunkel sauber schmutzig ruhig voll leer jung eigen ganz letzt nächst erst zweit dritt ander deutsch englisch indisch türkisch toll lieb best richtig falsch gesund krank müde glücklich traurig froh wunderbar herrlich typisch normal beliebt bekannt berühmt offen kostenlos günstig preiswert privat öffentlich international persönlich beruflich sozial möbliert zentral fremd nah weit klar sicher gefährlich bequem praktisch süß sauer scharf salzig fett dick dünn stark schwach reich arm fleißig faul lustig ernst höflich ehrlich wütend nervös zufrieden pünktlich spät früh gemütlich herzlich kreativ fair klug dumm gleich verschieden wenig viel lecker golden silbern hübsch elegant günstig zuverlässig flexibel selbstständig erfahren aktuell regional lokal frei besetzt geöffnet geschlossen kaputt gemeinsam täglich wöchentlich monatlich jährlich ideal perfekt super schick spannend aufregend anstrengend nützlich hilfsbereit ordentlich pünktlich vegetarisch vegan neugierig traurig').split(' ');
  const ADJ_IRREG = { teur: 'teuer', hoh: 'hoch', dunkl: 'dunkel', sau: 'sauer', flexibl: 'flexibel' };

  let LX = null;
  function umlaut(w) {
    const m = /^(.*?)(au|Au|a|A|o|O|u|U)([^aouäöüAOUÄÖÜ]*)$/.exec(w);
    if (!m) return w;
    return m[1] + { au: 'äu', Au: 'Äu', a: 'ä', A: 'Ä', o: 'ö', O: 'Ö', u: 'ü', U: 'Ü' }[m[2]] + m[3];
  }
  function pluralOf(sg, note) {
    note = String(note || '').trim();
    if (!note) return null;
    if (/^die\s+\S/.test(note)) return note.replace(/^die\s+/, '').split(/[\s,/]/)[0];
    const m = /^(¨)?-([a-zäöüß]*)$/.exec(note);
    return m ? (m[1] ? umlaut(sg) : sg) + m[2] : null;
  }
  function regular(inf) {
    const el = /[^aeiouäöü](el|er)n$/.test(inf);
    const stem = el ? inf.slice(0, -1) : inf.endsWith('en') ? inf.slice(0, -2) : inf.slice(0, -1);
    const eIns = /[td]$/.test(stem) || /[^aeiouäöülrhmn][mn]$/.test(stem);
    const sib = /([sßzx]|tz)$/.test(stem);
    const ich = el && stem.endsWith('el') ? [stem.slice(0, -2) + 'le', stem + 'e'] : [stem + 'e'];
    const t = eIns ? 'et' : 't';
    const pres = [ich, [stem + (eIns ? 'est' : sib ? 't' : 'st')], [stem + t], [inf], [stem + t], [inf]];
    const pt = stem + (eIns ? 'ete' : 'te');
    const prat = ['', 'st', '', 'n', 't', 'n'].map((e) => [pt + e]);
    const insep = /^(be|ver|er|ent|emp|ge|zer|miss|über|unter|hinter|wider)/.test(inf) && inf.length > 6;
    const pp = /ieren$/.test(inf) || insep ? stem + t : 'ge' + stem + t;
    return { pres, prat, pp, aux: 'haben', stem };
  }
  function build() {
    const L = { nouns: {}, plurals: {}, verbs: {}, fin: new Map(), inf: new Set(), pp: new Map(), adj: new Set(ADJ_LIST) };
    const addNoun = (w, g, pl) => {
      if (!w || !/^\p{Lu}/u.test(w) || !/^(der|die|das)$/.test(g)) return;
      const k = w.toLowerCase();
      const cur = L.nouns[k];
      if (!cur) L.nouns[k] = { w, g, pl: pl || null };
      else if (!cur.pl && pl) cur.pl = pl;
      if (pl && pl !== '-' && pl.toLowerCase() !== k) L.plurals[pl.toLowerCase()] = { w: pl, sg: w, g };
    };
    const art = (s) => /^(der|die|das)\s+(\p{Lu}[\p{L}-]*)$/u.exec(String(s || '').trim());
    (GL.days || []).forEach((d) => (d.vocab || []).forEach((v) => { const m = art(v[0]); if (m) addNoun(m[2], m[1], pluralOf(m[2], v[1])); }));
    (GL.drillNouns || []).forEach(([g, w, pl]) => addNoun(w, { m: 'der', f: 'die', n: 'das' }[g], pl));
    (GL.massNouns || []).forEach(([g, w]) => addNoun(w, { m: 'der', f: 'die', n: 'das' }[g]));
    const W = GL.exam && GL.exam.words;
    if (W) Object.values(W.themes || {}).forEach((th) => th.words.forEach(([de, pl]) => {
      const m = art(de);
      if (m) addNoun(m[2], m[1], pluralOf(m[2], pl));
      else if (/^[a-zäöüß]+$/.test(de) && !/(en|ern|eln)$/.test(de)) L.adj.add(de);
    }));
    const pairs = (list) => (list || []).forEach((p) => { const m = Array.isArray(p) && art(p[0]); if (m) addNoun(m[2], m[1]); });
    Object.values((GL.exam && GL.exam.tasks) || {}).forEach((t) => pairs(t.gloss));
    (GL.life || []).forEach((t) => pairs(t.words));
    ((GL.listening && GL.listening.clips) || []).forEach((c) => pairs(c.gloss));
    [['Euro', 'der', 'Euro'], ['Cent', 'der', 'Cent'], ['Uhr', 'die', 'Uhren'], ['Jahr', 'das', 'Jahre'], ['Monat', 'der', 'Monate'], ['Woche', 'die', 'Wochen'], ['Tag', 'der', 'Tage'], ['Stunde', 'die', 'Stunden'], ['Minute', 'die', 'Minuten'], ['Kind', 'das', 'Kinder'], ['Freund', 'der', 'Freunde'], ['Freundin', 'die', 'Freundinnen'], ['Kollege', 'der', 'Kollegen'], ['Kollegin', 'die', 'Kolleginnen'], ['Job', 'der', 'Jobs'], ['Termin', 'der', 'Termine'], ['Problem', 'das', 'Probleme'], ['Zeit', 'die', 'Zeiten'], ['Geld', 'das', 'Gelder'], ['Lust', 'die', null], ['Hunger', 'der', null], ['Durst', 'der', null], ['Angst', 'die', 'Ängste'], ['Ahnung', 'die', 'Ahnungen'], ['Party', 'die', 'Partys'], ['Wochenende', 'das', 'Wochenenden'], ['Park', 'der', 'Parks'], ['Hause', 'das', null],
      ...'Deutsch Englisch Hindi Urdu Arabisch Türkisch Spanisch Französisch Italienisch Russisch Polnisch Chinesisch Japanisch Persisch Bengali Punjabi Tamil Portugiesisch Ukrainisch Rumänisch Griechisch Kurdisch'.split(' ').map((w) => [w, 'das', null])]
      .forEach(([w, g, pl]) => addNoun(w, g, pl));

    const V = L.verbs;
    const put = (inf, d) => { if (!V[inf]) V[inf] = d; };
    (GL.verbs || []).forEach(([inf, , pres, prat, perf]) => {
      const sp = (s) => String(s || '').split(',').map((x) => x.split('/').map((y) => y.trim()).filter(Boolean));
      const pf = String(perf || '').split(' ');
      put(inf, { pres: sp(pres), prat: prat ? sp(prat) : null, aux: pf[0] === 'sein' ? 'sein' : pf[0] ? 'haben' : null, pp: pf[1] || null });
    });
    if (W) (W.verbs || []).forEach(([inf, erF, pr, perf]) => {
      if (V[inf]) return;
      const sepM = /\s(\p{Ll}+)$/u.exec(erF.replace(/^(er|sie|es)\s+/, '')); // "ruft an"
      const er = erF.replace(/^(er|sie|es)\s+/, '').replace(/\s+\p{Ll}+$/u, '').trim();
      const base = sepM && inf.startsWith(sepM[1]) ? inf.slice(sepM[1].length) : inf;
      const r = regular(base);
      let du = er;
      if (MODAL.has(er) || /^(weiß|mag)$/.test(er)) du = er + (er.endsWith('ß') ? 't' : 'st');
      else if (er.endsWith('t')) {
        const s = er.slice(0, -1);
        if (/([sßzx])$/.test(s)) du = er;
        else if (/d$/.test(r.stem)) du = s + 'st';
        else if (/t$/.test(r.stem) && !er.endsWith('et')) du = er + 'st';
        else if (er.endsWith('et') && /[td]$/.test(r.stem)) du = r.stem + 'est';
        else du = s + 'st';
      }
      const p1 = String(pr || '').replace(/\s+\p{Ll}+$/u, '').trim();
      const prat = p1 ? (p1.endsWith('te') ? ['', 'st', '', 'n', 't', 'n'] : ['', 'st', '', 'en', 't', 'en']).map((e) => [p1 + e]) : null;
      const pf = String(perf || '').split(/\s+/);
      put(base === inf ? inf : base, { pres: [r.pres[0], [du], [er], [base], r.pres[4], [base]], prat, aux: pf[0] === 'ist' ? 'sein' : 'haben', pp: pf[1] && base === inf ? pf[1] : r.pp });
      if (base !== inf) put(inf, { sepOf: base, sep: sepM[1], aux: pf[0] === 'ist' ? 'sein' : 'haben', pp: pf[1] || null });
    });
    (GL.days || []).forEach((d) => (d.vocab || []).forEach((v) => {
      const inf = String(v[0] || '').trim();
      if (!/^[a-zäöüß]+(en|ern|eln)$/.test(inf) || V[inf] || !/^to\s/.test(String(v[2] || ''))) return;
      const r = regular(inf);
      const f = String(v[1] || '');
      let erM = /(?:^|[,·;]\s*)(?:er|sie|es)\s+(\p{Ll}+)(?!\p{Ll}|\s+\p{Ll})/u.exec(f) || /^(\p{Ll}+t)$/u.exec(f.trim());
      if (erM && /^(hat|ist|hatte|war|wird)$/.test(erM[1])) erM = null;
      if (erM && erM[1] !== r.pres[2][0]) { r.pres[2] = [erM[1]]; r.pres[1] = [erM[1].replace(/t$/, '') + (/[sßzx]t$/.test(erM[1]) ? 't' : 'st')]; }
      const pm = /\b(ist|hat)\s+(\p{Ll}+)/u.exec(f);
      if (pm) { r.aux = pm[1] === 'ist' ? 'sein' : 'haben'; r.pp = pm[2]; }
      put(inf, r);
    }));
    // separable verbs: prefix + known base
    const known = (b) => V[b] || BASES.includes(b);
    Object.keys(V).forEach((inf) => {
      const d = V[inf];
      if (d.sepOf) return;
      const p = SEP.find((x) => inf.startsWith(x) && inf.length > x.length + 3 && known(inf.slice(x.length)));
      if (p && !/^(antworten|beginnen|bekommen|besuchen|erzählen|verstehen|vergessen|umarmen)$/.test(inf)) { d.sep = p; d.sepOf = inf.slice(p.length); }
    });
    const formsOf = (inf) => {
      const d = V[inf]; if (!d) return null;
      if (d.sepOf) { const b = V[d.sepOf] || regular(d.sepOf); if (!V[d.sepOf]) V[d.sepOf] = b; return { pres: b.pres, prat: b.prat, sep: d.sep, base: d.sepOf, pp: d.pp || (b.pp ? d.sep + b.pp : null), aux: d.aux || b.aux }; }
      return { pres: d.pres, prat: d.prat, pp: d.pp, aux: d.aux };
    };
    Object.keys(V).forEach((inf) => {
      const f = formsOf(inf); if (!f) return;
      L.inf.add(inf);
      const addF = (form, p, t, joined) => { const k = form.toLowerCase(); if (!L.fin.has(k)) L.fin.set(k, []); L.fin.get(k).push({ inf, p, t, joined }); };
      ['pres', 'prat'].forEach((t) => (f[t] || []).forEach((alts, p) => (alts || []).forEach((form) => {
        if (!form) return;
        if (f.sep) addF(f.sep + form, p, t, true);
        else addF(form, p, t, false);
      })));
      if (f.pp && f.pp.length >= 5 && /(t|en|n)$/.test(f.pp)) L.pp.set(f.pp.toLowerCase(), { inf, aux: f.aux || 'haben' });
      V[inf].forms = f;
    });
    const K2 = { können: 'könnte', müssen: 'müsste', dürfen: 'dürfte', haben: 'hätte', werden: 'würde', mögen: 'möchte' };
    Object.entries(K2).forEach(([inf, st]) => ['', 'st', '', 'n', 't', 'n'].forEach((e, p) => { const k = st + e; if (!L.fin.has(k)) L.fin.set(k, []); L.fin.get(k).push({ inf, p, t: 'k2', joined: false }); }));
    ['wäre', 'wärst', 'wäre', 'wären', 'wärt', 'wären'].forEach((k, p) => { if (!L.fin.has(k)) L.fin.set(k, []); L.fin.get(k).push({ inf: 'sein', p, t: 'k2', joined: false }); });
    return L;
  }
  const lex = () => LX || (LX = build());

  /* ================= helpers ================= */
  const RX = /\n|[\p{L}\p{N}]+(?:[-'’][\p{L}\p{N}]+)*|[^\s\p{L}\p{N}]/gu;
  function tokenize(text) {
    const out = []; let m; RX.lastIndex = 0;
    while ((m = RX.exec(text))) { const t = m[0]; out.push({ t, lo: t.toLowerCase(), s: m.index, e: m.index + t.length, w: /^[\p{L}\p{N}]/u.test(t), cap: /^\p{Lu}/u.test(t), i: out.length }); }
    return out;
  }
  const BOUND = new Set(['.', '!', '?', ';', ':', ',', '\n', '(', ')', '„', '“', '"', '–', '-', '—', '/']);
  const SENT = new Set(['.', '!', '?', '\n']);
  const COORD = new Set(['und', 'oder', 'aber', 'sondern', 'denn', 'and']);
  const SUB_STRICT = new Set(['weil', 'dass', 'obwohl', 'damit', 'nachdem', 'bevor', 'falls', 'sodass', 'sobald', 'solange', 'ob', 'wenn', 'seitdem', 'indem', 'ehe']);
  const SUB_SOFT = new Set(['als', 'während', 'bis', 'wie', 'wo', 'wann', 'warum', 'was', 'wer', 'woher', 'wohin', 'wieso', 'weshalb', 'welche', 'welcher', 'welches']);
  const PRONS = new Set(['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'man']);
  /* clauses: runs of word tokens between punctuation; each also split at und/oder/aber/sondern/denn */
  function segments(tok) {
    const segs = []; let cur = [], sent = true, afterComma = false;
    const close = (bt) => {
      if (cur.length) {
        let part = [], first = true, conj = '';
        cur.forEach((t) => {
          if (COORD.has(t.lo)) {
            if (part.length) segs.push({ toks: part, sent: first && sent, afterComma, coord: !first || !!conj, conj });
            part = []; first = false; conj = t.lo; return;
          }
          part.push(t);
        });
        if (part.length) segs.push({ toks: part, sent: first && sent, afterComma, coord: !first || !!conj, conj, end: bt ? bt.t : '' });
      }
      cur = [];
    };
    tok.forEach((t) => {
      if (t.w) { cur.push(t); return; }
      if (BOUND.has(t.t)) { close(t); afterComma = t.t === ','; if (SENT.has(t.t)) { sent = true; afterComma = false; } else sent = false; }
    });
    close(null);
    segs.forEach((s) => {
      const f = s.toks[0];
      s.sub = !!f && (SUB_STRICT.has(f.lo) || (SUB_SOFT.has(f.lo) && (s.afterComma || (f.lo === 'als' || f.lo === 'während') && s.sent) && s.toks.length > 2 && (PRONS.has(s.toks[1].lo) || /^(der|die|das|mein|meine|dein|deine|sein|seine|ihr|ihre|unser|unsere|ein|eine|man)$/.test(s.toks[1].lo) || (s.toks[1].cap && !/^(bis|während|als|seit)$/.test(f.lo)))));
      if (s.sub && /^(damit|seitdem|indem|bis|ob)$/.test(f.lo) && s.toks[1] && !s.toks[1].cap && isFinite(s.toks[1].lo) && !PRONS.has(s.toks[1].lo)) s.sub = false; // "Damit dürfen Sie …", "Seitdem helfe ich …"
      if (s.sub && f.lo === 'als' && s.toks[1] && s.toks[1].cap && !PRONS.has(s.toks[1].lo) && s.toks[2] && isFinite(s.toks[2].lo)) s.sub = false; // "Als Kind habe ich …"
    });
    return segs;
  }
  const isFinite = (lo) => lex().fin.has(lo);
  const finOf = (lo) => lex().fin.get(lo) || [];
  const isInf = (lo) => lex().inf.has(lo) || /^\p{Ll}+zu\p{Ll}+en$/u.test(lo) === false && false;
  const isPP = (lo) => lex().pp.has(lo) || (/^ge\p{Ll}{3,}(t|en)$/u.test(lo) && !/^(gegen|genug|gestern|gerne?|genau|gesund|gelb|gemeinsam|gefährlich|gewöhnlich|geduldig|gemütlich|gerecht|gespannt|gelten|geben|gehen|genießen|gewinnen|gehören|gefallen|geschehen)$/.test(lo));
  const isNounTok = (t) => t.cap && !!lex().nouns[t.lo];
  const nounInfo = (t) => lex().nouns[t.lo] || null;
  const pluralInfo = (t) => lex().plurals[t.lo] || null;
  const capFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const keepCase = (orig, rep) => (/^\p{Lu}/u.test(orig) ? capFirst(rep) : rep);
  const span = (text, a, b) => text.slice(a.s, b.e);
  /* finite form of a verb for a person (and tense) */
  function formFor(inf, p, t) {
    const d = lex().verbs[inf]; const f = d && d.forms; if (!f) return null;
    const row = (f[t] || [])[p]; if (!row || !row[0]) return null;
    return (f.sep && t ? row[0] : row[0]);
  }
  const PERSON_EN = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];

  /* ================= rules ================= */
  const SEV = { case: 1, verb: 1, word_order: 1, grammar: 0.9, vocabulary: 0.8, spelling: 0.6, punctuation: 0.4, style: 0.3 };
  const TOPIC = { case: 'cases-overview', verb: 'present-regular', word_order: 'word-order', spelling: 'gender-articles', punctuation: 'subordinate', style: 'du-sie' };
  const WRONG_PP = { gegeht: 'gegangen', gegehen: 'gegangen', gekommt: 'gekommen', geseht: 'gesehen', gesehet: 'gesehen', geesst: 'gegessen', gegesst: 'gegessen', geessen: 'gegessen', getrinkt: 'getrunken', getrinken: 'getrunken', geschreibt: 'geschrieben', geschreiben: 'geschrieben', gelest: 'gelesen', geleset: 'gelesen', gesprecht: 'gesprochen', gesprechen: 'gesprochen', gefahrt: 'gefahren', gefliegt: 'geflogen', gefliegen: 'geflogen', geschlaft: 'geschlafen', genehmt: 'genommen', genehmen: 'genommen', gebringt: 'gebracht', gebringen: 'gebracht', gedenkt: 'gedacht', gewisst: 'gewusst', gekennt: 'gekannt', gefindet: 'gefunden', gefinden: 'gefunden', getrefft: 'getroffen', getreffen: 'getroffen', gehelft: 'geholfen', gehelfen: 'geholfen', gesitzt: 'gesessen', geschwimmt: 'geschwommen', gelauft: 'gelaufen', gebleibt: 'geblieben', gebleiben: 'geblieben', geseid: 'gewesen', gesind: 'gewesen', gewerdet: 'geworden', gestudiert: 'studiert', gebesucht: 'besucht', geverstanden: 'verstanden', geversteht: 'verstanden', gearbeit: 'gearbeitet', geaufstanden: 'aufgestanden', geeinkauft: 'eingekauft', geangerufen: 'angerufen', gefernsehen: 'ferngesehen', getelefoniert: 'telefoniert', gepassiert: 'passiert', gebekommen: 'bekommen', gebekommt: 'bekommen', geerzählt: 'erzählt', gebezahlt: 'bezahlt', geverkauft: 'verkauft', gebeginnt: 'begonnen', gegebt: 'gegeben', genennt: 'genannt', gerennt: 'gerannt', gestehen: 'gestanden', gestanden_: 'gestanden', gewascht: 'gewaschen', gefangt: 'gefangen', gehaltet: 'gehalten', gerufet: 'gerufen', geruft: 'gerufen', gesingt: 'gesungen', getragt: 'getragen', gewerft: 'geworfen', geziehen: 'gezogen', geverlieren: 'verloren', geverliert: 'verloren', geverloren: 'verloren', geschliesst: 'geschlossen', geschließt: 'geschlossen', geessen_: 'gegessen' };
  const ENGLISH = { and: 'und', the: 'der/die/das', is: 'ist', are: 'sind', with: 'mit', but: 'aber', because: 'weil / denn', very: 'sehr', yes: 'ja', my: 'mein', your: 'dein / Ihr', have: 'haben', has: 'hat', this: 'dies- / das', that: 'dass / das', of: 'von', to: 'zu / nach', it: 'es', not: 'nicht', from: 'aus / von', what: 'was', when: 'wann / wenn / als', where: 'wo', why: 'warum', how: 'wie', please: 'bitte', thanks: 'danke', thank: 'danke', sorry: 'Entschuldigung / Es tut mir leid', hello: 'hallo', family: 'Familie', school: 'Schule', house: 'Haus', work: 'Arbeit', weekend: 'Wochenende', friend: 'Freund', friends: 'Freunde', city: 'Stadt', people: 'Leute', we: 'wir', you: 'du / Sie', they: 'sie', also_: '' };
  const ACC_VERBS = /^(habe|hast|hat|haben|habt|gibt|möchte|möchtest|möchten|brauche|brauchst|braucht|brauchen|kaufe|kaufst|kauft|kaufen|suche|suchst|sucht|suchen|nehme|nimmst|nimmt|nehmen|esse|isst|essen|trinke|trinkst|trinkt|trinken|sehe|siehst|sieht|sehen|bestelle|bestellst|bestellt|bestellen|kenne|kennst|kennt|kennen|liebe|liebst|liebt|lieben|besuche|besuchst|besucht|besuchen|mache|machst|macht|machen|finde|findest|findet|finden|schreibe|schreibst|schreibt|schreiben|lese|liest|lesen|bekomme|bekommst|bekommt|bekommen|treffe|triffst|trifft|treffen|frage|fragst|fragt|fragen|bezahle|bezahlst|bezahlt|bezahlen|miete|mietest|mietet|mieten|suche)$/;
  const DAT_VERBS = /^(helfe|hilfst|hilft|helfen|helft|danke|dankst|dankt|danken|gratuliere|gratulierst|gratuliert|gratulieren|gefällt|gefallen|gehört|gehören|antworte|antwortest|antwortet|antworten|schmeckt|schmecken|passt|passen|fehlt|fehlen|folge|folgst|folgt|folgen|vertraue|vertraust|vertraut|vertrauen|geht|tut)$/;
  const ACC_PRON_VERBS = /^(besuche|besuchst|besucht|besuchen|liebe|liebst|liebt|lieben|frage|fragst|fragt|fragen|kenne|kennst|kennt|kennen|brauche|brauchst|braucht|brauchen|vermisse|vermisst|vermissen|treffe|triffst|trifft|treffen|heirate|heiratest|heiratet|heiraten|verstehe|verstehst|versteht|verstehen|störe|störst|stört|stören|rufe|rufst|ruft|rufen|lade|lädst|lädt|laden)$/;
  const REFL = /^(freue|freust|freut|freuen|interessiere|interessierst|interessiert|interessieren|erinnere|erinnerst|erinnert|erinnern|kümmere|kümmerst|kümmert|kümmern|bedanke|bedankst|bedankt|bedanken|beeile|beeilst|beeilt|beeilen|fühle|fühlst|fühlt|fühlen|ärgere|ärgerst|ärgert|ärgern|langweile|langweilst|langweilt|langweilen|beschwere|beschwerst|beschwert|beschweren|bewerbe|bewirbst|bewirbt|bewerben|verabschiede|verabschiedest|verabschiedet|verabschieden|entschuldige|entschuldigst|entschuldigt|entschuldigen|unterhalte|unterhältst|unterhält|unterhalten)$/;
  const REFL_P = { ich: 'mich', du: 'dich', er: 'sich', sie: 'sich', es: 'sich', man: 'sich', wir: 'uns', ihr: 'euch' };
  const COMP_WIE = /^(größer|kleiner|älter|jünger|besser|schlechter|mehr|weniger|lieber|schöner|teurer|billiger|schneller|langsamer|länger|kürzer|höher|wärmer|kälter|einfacher|schwerer|leichter|wichtiger|interessanter|größer|näher|später|früher|öfter|ruhiger|lauter|günstiger|moderner|anders)$/;
  const NUMW = { zwei: 2, drei: 3, vier: 4, fünf: 5, sechs: 6, sieben: 7, acht: 8, neun: 9, zehn: 10, elf: 11, zwölf: 12, zwanzig: 20, dreißig: 30, vierzig: 40, fünfzig: 50, hundert: 100, beide: 2, beiden: 2, viele: 3, vielen: 3, mehrere: 3, einige: 3 };
  const UNITS = /^(euro|cent|kilo|gramm|meter|kilometer|liter|prozent|uhr|mal|grad|stück|glas|paar|dollar|pfund|minute_)$/;
  const ADV1 = /^(heute|morgen|gestern|dann|danach|jetzt|später|zuerst|leider|deshalb|deswegen|trotzdem|außerdem|manchmal|oft|normalerweise|abends|morgens|mittags|nachmittags|natürlich|vielleicht|hoffentlich|zum|zur|am|im|um|in|an|auf|nach|vor|seit|mit|bei|ab|während|wegen|trotz|letzte|letzten|letztes|nächste|nächsten|nächstes|jeden|jede|jedes|diese|diesen|dieses|hier|dort|da|endlich|plötzlich|schließlich|früher|bald|immer|meistens|selten|nie|sonst|also)$/;
  const QW = /^(wo|wann|was|wie|warum|woher|wohin|wer|wen|wem|welche|welcher|welches|welchen|wieso|weshalb)$/;
  const LETTER_OPEN = /^(liebe|lieber|hallo|hi|sehr|guten)$/;

  function rules(text, ctx) {
    const L = lex(), tok = tokenize(text), W = tok.filter((t) => t.w), segs = segments(tok);
    const out = [];
    const add = (a, b, right, category, rule, explanation, o = {}) => out.push(Object.assign({ at: a.s, wrong: text.slice(a.s, b.e), right, category, rule, explanation, auto: true }, o));
    const nextW = (t, k = 1) => { let j = t.i; let n = 0; while (++j < tok.length) { if (tok[j].t === '\n' || BOUND.has(tok[j].t)) return null; if (tok[j].w && ++n === k) return tok[j]; } return null; };
    const prevTok = (t) => (t.i > 0 ? tok[t.i - 1] : null);

    // 1. subject–verb agreement (main clauses: pronoun + verb / verb + pronoun; subordinate clauses: pronoun … final verb)
    const agree = (P, V, swap) => {
      const ps = P.t === 'Sie' && !(prevTok(P) && (SENT.has(prevTok(P).t) || /^[:„“"»«(–-]$/.test(prevTok(P).t))) && P.i > 0 ? [5] : PRON[P.lo];
      if (!ps) return;
      if (P.lo === 'ihr') { const nx = nextW(P); if (P.t === 'Ihr' || (nx && (nx.cap || DETLIKE.test(nx.lo) || /^(mein|dein|sein|unser|euer|ihr)\p{Ll}*$/u.test(nx.lo)))) return; }
      if (P.lo === 'es' && /^(sind|waren|gibt|gab|werden|wurden)$/.test(V.lo)) return;
      const pp0 = prevTok(P); if (!swap && pp0 && /^(und|oder|sowie)$/.test(pp0.lo)) return; // "Max und ich finden …"
      if (DETLIKE.test(V.lo)) return;
      const fs = finOf(V.lo).filter((f) => !f.joined || true);
      if (!fs.length || fs.some((f) => ps.includes(f.p))) return;
      const f = fs[0];
      const want = ps.map((p) => formFor(f.inf, p, f.t)).filter(Boolean);
      const uniq = [...new Set(want)];
      if (!uniq.length) return;
      const right = uniq.map((w) => (swap ? `${keepCase(V.t, w)} ${P.t}` : `${P.t} ${f.joined ? (lex().verbs[f.inf].forms.sep + w) : w}`)).join(' / ');
      add(swap ? V : P, swap ? P : V, right, 'verb', 'Verb ending (conjugation)', `With „${P.lo === 'sie' ? 'sie' : P.t}“ the verb form is <b>${esc(uniq.join(' / '))}</b>, not „${esc(V.t)}“. Present tense endings: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.`, { sev: 1, topic: 'present-regular' });
    };
    segs.forEach((s) => {
      const t = s.toks;
      if (s.sub) {
        const P = t[1], V = t[t.length - 1];
        if (P && PRON[P.lo] && V && V !== P && isFinite(V.lo) && t.length >= 3) agree(P, V, false);
        return;
      }
      if (t.length >= 2 && PRON[t[0].lo] && isFinite(t[1].lo) && !COORD.has(t[1].lo)) agree(t[0], t[1], false);
      for (let k = 0; k < Math.min(t.length - 1, 4); k++) {
        const V = t[k], P = t[k + 1];
        if (!PRON[P.lo] || !isFinite(V.lo)) continue;
        if (k > 0 && (PRON[t[k - 1].lo] || t[k - 1].cap && isNounTok(t[k - 1]) && k === 1 && !ADV1.test(t[k - 1].lo))) break;
        if ((k === 0 && !s.coord) || (k > 0 && (ADV1.test(t[0].lo) || QW.test(t[0].lo)))) { agree(P, V, true); break; }
      }
    });
    // 1b. "ich mach / ich hab" – spoken short forms
    W.forEach((t, k) => {
      const n = W[k + 1]; if (t.lo !== 'ich' || !n) return;
      if (/^(hab|mach|geh|komm|lern|arbeit|spiel|wohn|trink|kauf|hör|sag|frag|brauch|find|glaub|seh|ess)$/.test(n.lo) && L.fin.has(n.lo + 'e')) add(t, n, `${t.t} ${n.t}e`, 'verb', 'Write the full verb form', `In writing use the full form: ich ${n.lo}<b>e</b>. („ich ${n.lo}“ is spoken German.)`, { sev: 0.5 });
    });

    // 2. modal / werden + infinitive must go to the end; haben/sein + participle must go to the end (main clauses)
    segs.forEach((s) => {
      if (s.sub) return;
      const t = s.toks;
      for (let k = 0; k < Math.min(t.length, 4); k++) {
        const A = t[k];
        const isMod = MODAL.has(A.lo), isAux = HABEN.has(A.lo) || SEIN.has(A.lo);
        if (!isMod && !isAux) continue;
        let j = k + 1;
        if (t[j] && PRON[t[j].lo]) j++;
        const X = t[j];
        if (!X) break;
        if (DETLIKE.test(X.lo)) break;
        const ok = isMod ? (L.inf.has(X.lo) && !X.cap) : (!X.cap && (L.pp.has(X.lo) || /^ge\p{Ll}{3,}(t|en)$/u.test(X.lo)) && isPP(X.lo));
        if (!ok) break;
        const rest = t.slice(j + 1);
        if (!rest.length || rest.every((r) => L.inf.has(r.lo) || isPP(r.lo) || MODAL.has(r.lo))) break;
        if (rest[0].lo === 'zu' || (isAux && X.lo === 'gefallen')) break;
        const moved = t.filter((r) => r !== X).map((r) => r.t).join(' ') + ' ' + X.t;
        const what = isMod ? (A.lo.startsWith('wer') || A.lo === 'wird' || A.lo === 'wirst' ? '„werden“ (future)' : 'a modal verb') : (HABEN.has(A.lo) ? '„haben“' : '„sein“') + ' in the Perfekt';
        add(t[0], t[t.length - 1], moved, 'word_order', isMod ? 'Infinitive at the end' : 'Participle at the end', `With ${what}, the second verb (${isMod ? 'infinitive' : 'participle'} „${esc(X.t)}“) goes to the <b>end</b> of the sentence: … ${esc(t.slice(j + 1).map((r) => r.t).join(' '))} <b>${esc(X.t)}</b>.`, { sev: 1, topic: isMod ? 'modals' : 'perfekt-haben' });
        break;
      }
    });

    // 3. separable verbs: unsplit in a main clause ("Ich aufstehe") or prefix right after the verb ("Ich rufe an meine Mutter")
    segs.forEach((s) => {
      if (s.sub) return;
      const t = s.toks;
      t.slice(0, 4).forEach((V, k) => {
        const fs = finOf(V.lo).filter((f) => f.joined && f.t === 'pres');
        if (!fs.length || k === t.length - 1 || V.cap || k < 1 || !PRONS.has(t[k - 1].lo)) return;
        const d = L.verbs[fs[0].inf].forms; const base = V.lo.slice(d.sep.length);
        const right = t.map((r) => (r === V ? keepCase(V.t, base) : r.t)).join(' ') + ' ' + d.sep;
        add(t[0], t[t.length - 1], right, 'word_order', 'Separable verb', `„${esc(fs[0].inf)}“ is a separable verb: in a main clause the prefix „${d.sep}“ goes to the <b>end</b>: … ${esc(base)} … <b>${d.sep}</b>.`, { sev: 1, topic: 'separable' });
      });
    });
    const SEPPAT = [
      [/^(stehe|stehst|steht|stehen)$/, 'auf', /^(um|am|jeden|früh|spät|immer|morgens|\d+)$/],
      [/^(rufe|rufst|ruft|rufen)$/, 'an', /^(dich|mich|sie|ihn|euch|uns|meine|meinen|meinem|deine|deinen|den|die|das|einen|eine|morgen|heute|später|bitte|ihre|seine|meine)$/],
      [/^(kaufe|kaufst|kauft|kaufen)$/, 'ein', /^(im|in|bei|am|um|heute|morgen|immer|jeden|oft|samstags|für)$/],
      [/^(sehe|siehst|sieht|sehen)$/, 'fern', /./],
      [/^(lade|lädst|lädt|laden)$/, 'ein', /^(dich|euch|sie|ihn|meine|meinen|deine|zu|zur|zum|alle|meine)$/],
      [/^(komme|kommst|kommt|kommen)$/, 'an', /^(um|am|in|im|heute|morgen|spät|pünktlich)$/],
      [/^(fange|fängst|fängt|fangen)$/, 'an', /^(um|am|mit|heute|morgen|jetzt|bald|im)$/],
      [/^(räume|räumst|räumt|räumen)$/, 'auf', /^(mein|meine|das|die|den|heute|morgen|immer|jeden)$/],
      [/^(hole|holst|holt|holen)$/, 'ab', /^(dich|euch|sie|ihn|mein|meine|meinen|den|die|das|vom|am|um|morgen)$/],
      [/^(komme|kommst|kommt|kommen)$/, 'mit', /^(heute|morgen|gern|ins|zum|zur|in)$/],
      [/^(lerne|lernst|lernt|lernen)$/, 'kennen', /./],
      [/^(gehe|gehst|geht|gehen)$/, 'aus', /^(heute|morgen|am|mit|oft|gern)$/],
    ];
    W.forEach((V, k) => {
      const P = W[k + 1], N = W[k + 2];
      if (!P || !N || P.s - V.e > 2 || N.s - P.e > 2) return;
      SEPPAT.forEach(([vre, pre, next]) => {
        if (!vre.test(V.lo) || P.lo !== pre || !next.test(N.lo) || COORD.has(N.lo) || BOUND.has(tok[P.i + 1] && tok[P.i + 1].t)) return;
        // find clause end
        let j = N.i; while (j + 1 < tok.length && tok[j + 1].w) j++;
        const end = tok[j];
        const right = `${V.t} ${text.slice(N.s, end.e)} ${pre}`;
        add(V, end, right, 'word_order', 'Separable verb', `„${pre}${V.lo.replace(/^(stehe|steh)/, 'steh')}…“ – the prefix „${pre}“ of a separable verb goes to the <b>end</b> of the main clause.`, { sev: 0.9, topic: 'separable' });
      });
    });

    // 4. wrong participles & haben + infinitive at the end
    W.forEach((t) => { const r = WRONG_PP[t.lo]; if (r) add(t, t, r, 'verb', 'Perfekt: participle', `The Perfekt form of this verb is <b>${r}</b>. Irregular verbs end in -en (gegangen, gegessen); verbs on -ieren and with be-/ver-/er- have no ge- (studiert, besucht).`, { sev: 1, topic: 'perfekt-haben' }); });
    segs.forEach((s) => {
      if (s.sub) return;
      const t = s.toks; const A = t.slice(0, 3).find((x) => HABEN.has(x.lo)); const last = t[t.length - 1];
      if (!A || last === A || t.some((x) => MODAL.has(x.lo)) || !L.inf.has(last.lo) || last.cap) return;
      const prev = t[t.length - 2]; if (prev && /^(zu|um)$/.test(prev.lo)) return;
      const d = L.verbs[last.lo]; const pp = d && d.forms && d.forms.pp; if (!pp || pp === last.lo || /^(lassen|sehen|hören|helfen)$/.test(last.lo)) return;
      add(last, last, pp, 'verb', 'Perfekt: haben + participle', `Perfekt = haben/sein + <b>participle</b>: „${esc(A.t)} … ${pp}“ (not the infinitive „${esc(last.t)}“).`, { sev: 1, topic: 'perfekt-haben' });
    });
    // 5. sein instead of haben ("ich bin gegessen")
    const HABEN_PP = /^(gegessen|getrunken|gekauft|gemacht|gelernt|gesehen|gelesen|geschrieben|gespielt|gearbeitet|gekocht|besucht|gesprochen|geschlafen|telefoniert|studiert|gewohnt|geholfen|getroffen|gefunden|genommen|gebracht|bestellt|bezahlt|gewartet|gefragt|geantwortet|gesagt|erzählt|gezeigt|gefrühstückt|gehört|verstanden|vergessen|bekommen|gesucht|gehabt|eingekauft|angerufen|ferngesehen|aufgeräumt|gefeiert|gebucht|gegeben)$/;
    const SEIN_TO_H = { bin: 'habe', bist: 'hast', ist: 'hat', sind: 'haben', seid: 'habt' };
    segs.forEach((s) => {
      const t = s.toks;
      const i = t.findIndex((x) => SEIN.has(x.lo)); if (i < 0) return;
      const subj = s.sub ? t[1] : (i > 0 ? t[i - 1] : t[i + 1]);
      if (!subj || !/^(ich|du|wir|ihr)$/.test(subj.lo)) return;
      const P = t.slice(i + 1).find((x) => HABEN_PP.test(x.lo));
      if (!P || (prevTok(P) && prevTok(P).lo === 'wie')) return;
      const A = t[i];
      add(A, A, keepCase(A.t, SEIN_TO_H[A.lo]), 'verb', 'Perfekt with haben', `„${esc(P.t)}“ forms the Perfekt with <b>haben</b>: ${SEIN_TO_H[A.lo]} … ${esc(P.t)}. Only verbs of movement/change (gehen, fahren, kommen, aufstehen …) use sein.`, { sev: 1, topic: 'perfekt-sein' });
    });

    // 6. adjective endings after der/ein-words
    const DEF = /^(der|die|das|den|dem|des|dieser|diese|dieses|diesen|diesem)$/;
    const EIN = /^(k?ein|mein|dein|sein|ihr|unser|euer|eur)(e|en|em|er|es)?$/;
    const adjParse = (lo) => {
      for (const e of ['en', 'em', 'er', 'es', 'e']) {
        if (!lo.endsWith(e)) continue;
        const st = lo.slice(0, -e.length);
        if (L.adj.has(st) || ADJ_IRREG[st]) return { st, e };
      }
      return null;
    };
    const expect = (det, g, pl) => {
      const d = det.toLowerCase();
      let m;
      if (/^dies/.test(d)) { const map = { dieser: 'der', diese: 'die', dieses: 'das', diesen: 'den', diesem: 'dem' }; return expect(map[d], g, pl); }
      if (DEF.test(d)) {
        if (d === 'der') return pl ? 'en' : g === 'der' ? 'e' : g === 'die' ? 'en' : '';
        if (d === 'die') return pl ? 'en' : g === 'die' ? 'e' : '';
        if (d === 'das') return !pl && g === 'das' ? 'e' : '';
        if (d === 'den') return pl || g === 'der' ? 'en' : '';
        if (d === 'dem' || d === 'des') return !pl && (g === 'der' || g === 'das') ? 'en' : '';
      }
      if ((m = EIN.exec(d))) {
        const e = m[2] || (m[1] === 'unser' || m[1] === 'euer' ? '' : '');
        if (m[1] === 'eur' && !m[2]) return '';
        if (!e) return pl ? '' : g === 'der' ? 'er' : g === 'das' ? 'es' : '';
        if (e === 'e') return pl ? 'en' : g === 'die' ? 'e' : '';
        if (e === 'en') return pl || g === 'der' ? 'en' : '';
        if (e === 'em' || e === 'es') return !pl && (g === 'der' || g === 'das') ? 'en' : '';
        if (e === 'er') return pl || g === 'die' ? 'en' : '';
      }
      return '';
    };
    for (let k = 0; k + 2 < W.length; k++) {
      const D = W[k], A = W[k + 1], N = W[k + 2];
      if (!(DEF.test(D.lo) || EIN.test(D.lo)) || A.cap || !N.cap || A.s - D.e > 2 || N.s - A.e > 2) continue;
      const pD = prevTok(D); if (pD && pD.t === ',' && /^(der|die|das|den|dem)$/.test(D.lo)) continue; // relative pronoun
      if (/^(weniger|mehr|viel|wenig|beide|andere)$/.test(A.lo)) continue;
      const ap = adjParse(A.lo); if (!ap) continue;
      if (/^(leute|eltern|geschwister|ferien|kosten|nebenkosten|lebensmittel|öffnungszeiten|möbel|papiere|daten|unterlagen|kenntnisse|sprachkenntnisse|zeiten)$/.test(N.lo) && D.lo === 'die' && ap.e === 'en') continue;
      const ni = nounInfo(N), pi = pluralInfo(N);
      let g, pl;
      if (ni && !(pi && pi.sg.toLowerCase() !== N.lo)) { g = ni.g; pl = false; if (ni.pl && ni.pl.toLowerCase() === N.lo && /^(die|den|der|keine|meine|deine|seine|ihre|unsere|eure|keinen|meinen|deinen|seinen|ihren|unseren|euren)$/.test(D.lo) && ((D.lo === 'die' && g !== 'die') || (D.lo === 'den' && g !== 'der'))) pl = true; }
      else if (pi) { g = pi.g; pl = true; }
      else continue;
      if (/^(der|das)$/.test(D.lo) && !pl && D.lo !== g && !(D.lo === 'der' && g === 'die')) continue; // article error – other rule
      const e = expect(D.t, g, pl);
      if (!e || e === ap.e) continue;
      const stem = ADJ_IRREG[ap.st] ? ap.st : ap.st;
      const right = stem + e;
      add(A, A, right, 'case', 'Adjective ending', `After „${esc(D.t)}“ with ${pl ? 'a plural noun' : `${g} ${esc(N.t)}`} the adjective ends in <b>-${e}</b>: ${esc(D.t)} ${esc(right)} ${esc(N.t)}.`, { sev: 0.9, topic: EIN.test(D.lo) ? 'adj-indefinite' : 'adj-definite' });
    }

    // 6b. wrong article in front of adjective + noun ("ein neue Wohnung")
    for (let k = 0; k + 2 < W.length; k++) {
      const D = W[k], A = W[k + 1], N = W[k + 2];
      if (A.cap || !N.cap || A.s - D.e > 2 || N.s - A.e > 2) continue;
      const ap = adjParse(A.lo); const ni = nounInfo(N);
      if (!ap || !ni || pluralInfo(N)) continue;
      const d = D.lo, g = ni.g, st = ap.st;
      let right = '', fixable = true;
      if (d === 'ein' && g === 'die') right = `${keepCase(D.t, 'eine')} ${st}e`;
      else if ((d === 'eine' || d === 'einen') && g === 'das') right = `${keepCase(D.t, 'ein')} ${st}es`;
      else if (d === 'einen' && g === 'die') right = `${keepCase(D.t, 'eine')} ${st}e`;
      else if (d === 'eine' && g === 'der') { right = `${keepCase(D.t, 'ein')} ${st}er / ${keepCase(D.t, 'einen')} ${st}en`; fixable = false; }
      else if (d === 'die' && g === 'das') right = `${keepCase(D.t, 'das')} ${st}e`;
      else if (d === 'das' && g === 'die') right = `${keepCase(D.t, 'die')} ${st}e`;
      else if ((d === 'die' || d === 'das') && g === 'der') { right = `${keepCase(D.t, 'der')} ${st}e / ${keepCase(D.t, 'den')} ${st}en`; fixable = false; }
      if (!right) continue;
      add(D, A, right, 'case', `Gender: ${g} ${N.t}`, `„${esc(N.t)}“ is ${{ der: 'masculine', die: 'feminine', das: 'neuter' }[g]} (${g} ${esc(ni.w)}), so the article and the adjective ending must match: ${esc(right)} ${esc(N.t)}.`, { sev: 1, topic: 'gender-articles', fix: fixable });
    }
    // 6c. plural subject + singular verb ("Die Kinder ist müde") and the other way round
    segs.forEach((s) => {
      const t = s.toks; if (s.sub || t.length < 3) return;
      const D = t[0], N = t[1], V = t[2];
      const pD = prevTok(D); if (pD && /^(und|oder|sowie)$/.test(pD.lo)) return;
      if (!N.cap || V.cap || !isFinite(V.lo) || (t[3] && PRONS.has(t[3].lo))) return;
      const fs = finOf(V.lo).filter((f) => /^(sein|haben|werden|können|müssen|wollen|dürfen|sollen|möchten)$/.test(f.inf) || f.inf === 'mögen');
      if (!fs.length) return;
      const pi = pluralInfo(N), ni = nounInfo(N);
      const plDet = /^(die|meine|deine|seine|ihre|unsere|eure|keine|viele|alle|einige|beide|zwei|drei|vier)$/.test(D.lo);
      const sgDet = /^(der|das|ein|mein|dein|sein|unser|euer|kein|dieser|dieses|eine|meine)$/.test(D.lo);
      let want = -1;
      if (pi && plDet && !(ni && ni.w === N.t && !pi)) want = 5;
      else if (ni && !pi && sgDet && (D.lo !== 'die' || ni.g === 'die')) want = 2;
      if (want < 0 || fs.some((f) => f.p === want || (want === 5 && f.p === 3))) return;
      const right = formFor(fs[0].inf, want, fs[0].t); if (!right || right === V.lo) return;
      add(V, V, right, 'verb', want === 5 ? 'Plural subject → plural verb' : 'Singular subject → singular verb', `The subject „${esc(D.t)} ${esc(N.t)}“ is ${want === 5 ? 'plural' : 'singular'}, so the verb is <b>${esc(right)}</b>.`, { sev: 1, topic: 'present-regular' });
    });

    // 7. dative plural -n
    for (let k = 0; k + 1 < W.length; k++) {
      const P = W[k]; if (!/^(mit|von|zu|aus|bei|seit|nach|vor|in|gegenüber|außer)$/.test(P.lo)) continue;
      let j = k + 1, det = W[j];
      if (!det) continue;
      const pluralDet = /^(den|meinen|deinen|seinen|ihren|unseren|euren|keinen|vielen|allen|beiden|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|zwanzig|\d+)$/.test(det.lo) && !(det.lo === '1');
      if (!pluralDet) continue;
      if (/^(in|vor|nach)$/.test(P.lo) && !/^(\d+|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|zwanzig|den|vielen|einigen)$/.test(det.lo)) continue;
      j++;
      if (W[j] && !W[j].cap && adjParse(W[j].lo)) j++;
      const N = W[j]; if (!N || !N.cap) continue;
      const pi = pluralInfo(N), ni = nounInfo(N);
      if (ni && ni.g === 'der' && N.t === ni.w && /^(den|meinen|deinen|seinen|ihren|unseren|euren|keinen)$/.test(det.lo)) continue;
      let plWord = null;
      if (pi) plWord = N.t;
      else if (ni && ni.pl && /^(\d+|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|zwanzig|vielen|allen|beiden)$/.test(det.lo) && ni.pl !== ni.w) continue; // plural-after-number rule
      else if (ni && ni.pl && ni.pl === ni.w && det.lo !== 'den') continue;
      else if (ni && ni.pl === ni.w) plWord = N.t;
      if (!plWord || /[ns]$/.test(plWord) || UNITS.test(N.lo)) continue;
      add(N, N, plWord + 'n', 'case', 'Dative plural: -n', `In the dative plural, nouns add <b>-n</b>: ${esc(P.t)} ${esc(det.t)} ${esc(plWord)}<b>n</b>.`, { sev: 0.9, topic: 'dative' });
    }

    // 8. contractions (more natural)
    const CONTR = { 'in dem': 'im', 'an dem': 'am', 'zu dem': 'zum', 'von dem': 'vom', 'bei dem': 'beim', 'in das': 'ins', 'an das': 'ans' };
    for (let k = 0; k + 2 < W.length; k++) {
      const a = W[k], b = W[k + 1], n = W[k + 2];
      const key = a.lo + ' ' + b.lo; let rep = CONTR[key];
      if (key === 'zu der') { const ni = nounInfo(n); if (ni && ni.g === 'die') rep = 'zur'; }
      if (!rep || !n.cap || b.s - a.e > 1) continue;
      const pv = prevTok(a); if (pv && pv.t === ',') continue; // relative clause: „das Haus, in dem …“
      if (key === 'in das' || key === 'an das') { const ni = nounInfo(n); if (!ni || ni.g !== 'das') continue; }
      add(a, b, keepCase(a.t, rep), 'style', 'Contraction', `German normally contracts „${key}“ to <b>${rep}</b>: ${rep} ${esc(n.t)}.`, { sev: 0.3, topic: 'prep-acc-dat' });
    }

    // 9. nicht ein / nicht + noun → kein
    for (let k = 0; k + 1 < W.length; k++) {
      const a = W[k], b = W[k + 1]; if (a.lo !== 'nicht') continue;
      const pv = W[k - 1]; if (pv && /^(noch|auch|gar|überhaupt)$/.test(pv.lo) && false) continue;
      if (/^(ein|eine|einen|einem|einer)$/.test(b.lo)) { const rep = 'k' + b.lo; add(a, b, rep, 'grammar', 'kein instead of nicht ein', `To say “not a / no” before a noun, use <b>${rep}</b> („nicht ein“ only for emphasis: not even one).`, { sev: 0.9, topic: 'negation-basics' }); continue; }
      const NKEIN = { zeit: 'keine', geld: 'kein', lust: 'keine', hunger: 'keinen', durst: 'keinen', angst: 'keine', problem: 'kein', ahnung: 'keine', auto: 'kein', kinder: 'keine', interesse: 'kein', glück: 'kein', fieber: 'kein', termin: 'keinen' };
      const endQ = text.slice(b.e).search(/[.!?\n]/); const isQ = endQ >= 0 && text[b.e + endQ] === '?';
      if (b.cap && NKEIN[b.lo] && !isQ) add(a, b, `${NKEIN[b.lo]} ${b.t}`, 'grammar', 'kein + noun', `Nouns without an article are negated with <b>kein</b>: „${NKEIN[b.lo]} ${esc(b.t)}“, not „nicht ${esc(b.t)}“.`, { sev: 0.9, topic: 'negation-basics' });
    }

    // 10. English words
    W.forEach((t, k) => {
      if (t.lo === 'also' || !ENGLISH[t.lo] || (t.lo === 'so' || t.lo === 'in' || t.lo === 'am') || (t.t === t.t.toUpperCase() && t.t.length <= 4)) return;
      if (/^(you|we|they|it|of|to|is|has|this|that|from|what|when|where|why|how|not|my|your|have|with|but|very|yes|the|and|are|because|please|thanks|thank|sorry|hello|family|school|house|work|weekend|friend|friends|city|people)$/.test(t.lo) && !(t.lo === 'hello' && W.length < 3)) {
        if (t.lo === 'city' || t.lo === 'team') return;
        add(t, t, ENGLISH[t.lo], 'vocabulary', 'English word', `„${esc(t.t)}“ is English. In German: <b>${esc(ENGLISH[t.lo])}</b>.`, { sev: 0.8, fix: !/\//.test(ENGLISH[t.lo]) });
      }
    });

    // 11. register and letter format
    const lines = text.split('\n');
    const formal = !!ctx.formal || /\bSehr geehrte/.test(text) || /(^|[^.!?\n]\s)(Ihnen|Ihre|Ihren|Ihrem|Ihrer)\b/.test(text);
    const informalGreet = /^(Liebe|Lieber|Hallo|Hi)\s+(?!Frau|Herr|Damen|Familie)\p{Lu}/mu.test(text);
    if (formal) W.forEach((t) => { if (/^(du|dich|dir|dein|deine|deinen|deinem|deiner|deines)$/.test(t.lo) && !(t.lo === 'dir' && false)) add(t, t, { du: 'Sie', dich: 'Sie', dir: 'Ihnen', dein: 'Ihr', deine: 'Ihre', deinen: 'Ihren', deinem: 'Ihrem', deiner: 'Ihrer', deines: 'Ihres' }[t.lo], 'style', 'Formal letter: Sie', 'This is a formal text (Sehr geehrte …): use <b>Sie / Ihnen / Ihr</b> – not du.', { sev: 0.8, topic: 'du-sie', fix: false }); });
    if (informalGreet && !ctx.formal && /(^|[,;]\s|\b(und|aber|dass|weil|ob|wenn|können|könnten|würden|haben|sind|möchten)\s)(Sie|Ihnen)\b/.test(text) && /\b(du|dich|dir|dein\w*)\b/i.test(text)) {
      const m = /\b(Ihnen|Sie)\b/.exec(text.replace(/^.*$/m, (x) => ' '.repeat(x.length)));
      if (m) out.push({ at: m.index, wrong: m[0], right: m[0] === 'Ihnen' ? 'dir' : 'du', category: 'style', rule: 'du or Sie – not both', explanation: 'You started informally (Liebe/Lieber + first name): stay with <b>du / dir / dein</b> in the whole text.', auto: true, sev: 0.6, fix: false });
    }
    const closeM = /^\s*(Viele Grüße|Liebe Grüße|Herzliche Grüße|Beste Grüße|Mit freundlichen Grüßen|Viele liebe Grüße|LG|Bis bald|Tschüss)\s*(,)?\s*$/m.exec(text);
    if (closeM && closeM[2]) { const at = closeM.index + closeM[0].indexOf(','); out.push({ at: at - 0, wrong: ',', right: '', category: 'punctuation', rule: 'No comma after the closing', explanation: 'German letters have <b>no comma</b> after „Viele Grüße“ / „Mit freundlichen Grüßen“.', auto: true, sev: 0.3, fix: true, del: true }); }
    if (closeM && /Sehr geehrte/.test(text) && /^(Viele|Liebe|Herzliche) Grüße|LG|Tschüss/.test(closeM[1])) out.push({ at: closeM.index + closeM[0].indexOf(closeM[1]), wrong: closeM[1], right: 'Mit freundlichen Grüßen', category: 'style', rule: 'Formal closing', explanation: 'A formal letter (Sehr geehrte …) ends with <b>Mit freundlichen Grüßen</b>.', auto: true, sev: 0.5 });
    if (closeM && informalGreet && !formal && closeM[1] === 'Mit freundlichen Grüßen') out.push({ at: closeM.index + closeM[0].indexOf(closeM[1]), wrong: closeM[1], right: 'Viele Grüße', category: 'style', rule: 'Informal closing', explanation: 'To a friend you write <b>Viele Grüße / Liebe Grüße</b>; „Mit freundlichen Grüßen“ is for formal letters.', auto: true, sev: 0.4 });
    let pos = 0;
    lines.forEach((ln, li) => {
      const g = /^\s*((Liebe|Lieber|Hallo|Hi|Sehr geehrte|Sehr geehrter|Guten Tag)\b[^,\n]{0,40}?)\s*$/.exec(ln);
      if (g && li < 3 && ln.trim().split(/\s+/).length <= 6 && !/[.!?]$/.test(ln.trim()) && !/Grüße|Gruß/.test(ln)) out.push({ at: pos + ln.indexOf(g[1]), wrong: g[1], right: g[1] + ',', category: 'punctuation', rule: 'Comma after the greeting', explanation: 'After the greeting put a <b>comma</b>: „Liebe Anna,“ / „Sehr geehrte Damen und Herren,“.', auto: true, sev: 0.3 });
      if (li > 0 && /,\s*$/.test(lines[li - 1]) && /^\s*(Liebe|Lieber|Hallo|Hi|Sehr|Guten)\b/.test(lines[li - 1]) && li <= 3) {
        const m2 = /^(\s*)(Ich|Wie|Vielen|Danke|Heute|Es|Hier|Wir|Leider|Gestern|Morgen|Mir|Bei|Am|Hast|Kannst|Hoffentlich|Ja|Nein|Gerne|Schon|Erst|Seit|Endlich)\b/.exec(ln);
        if (m2) out.push({ at: pos + m2[1].length, wrong: m2[2], right: m2[2].toLowerCase(), category: 'spelling', rule: 'Small letter after the greeting', explanation: 'After „Liebe Anna,“ the text continues with a <b>small letter</b> (unless the word is a noun or „Sie“): „vielen Dank …“', auto: true, sev: 0.3 });
      }
      pos += ln.length + 1;
    });

    // 12. als / wie; wenn → als (once in the past)
    for (let k = 0; k + 1 < W.length; k++) {
      const a = W[k], b = W[k + 1];
      if (COMP_WIE.test(a.lo) && b.lo === 'wie') add(b, b, 'als', 'grammar', 'Comparative + als', `After a comparative (${esc(a.t)}) German uses <b>als</b>: ${esc(a.t)} als … („so … wie“ = as … as).`, { sev: 0.9, topic: 'comparison' });
      if (a.lo === 'so' && W[k + 2] && W[k + 2].lo === 'als' && L.adj.has(b.lo)) add(W[k + 2], W[k + 2], 'wie', 'grammar', 'so … wie', '„as … as“ = <b>so … wie</b>: so groß wie …', { sev: 0.9, topic: 'comparison' });
    }
    { const re = /\b(Wenn|wenn)\s+(ich|er|sie|wir)\s+((?:noch\s+)?(?:klein|jung|ein Kind|Kind|Kinder|Student|Studentin|Schüler|Schülerin|in \p{Lu}\p{L}+)\s+(?:war|waren))\b/gu; let m;
      while ((m = re.exec(text))) out.push({ at: m.index, wrong: m[1], right: m[1] === 'Wenn' ? 'Als' : 'als', category: 'grammar', rule: 'als (once, in the past)', explanation: 'For one situation/period in the past use <b>als</b>: „Als ich ein Kind war, …“. „wenn“ = whenever / if.', auto: true, sev: 0.9, topic: 'subordinate' }); }

    // 13. denn + verb at the end ("denn ich krank bin")
    segs.forEach((s) => {
      if (s.conj !== 'denn') return;
      const t = s.toks; const last = t[t.length - 1];
      if (t.length < 3 || !PRON[t[0].lo] || isFinite(t[1].lo) || !isFinite(last.lo) || MODAL.has(t[t.length - 2] && t[t.length - 2].lo)) return;
      const right = [t[0].t, last.t, ...t.slice(1, -1).map((x) => x.t)].join(' ');
      add(t[0], last, right, 'word_order', 'denn: normal word order', '„denn“ does not change the word order (verb in position 2): denn ich <b>bin</b> krank. Only „weil“ sends the verb to the end.', { sev: 1, topic: 'conjunctions' });
    });

    // 14. plural after numbers ("zwei Kind")
    for (let k = 0; k + 1 < W.length; k++) {
      const n = W[k]; const v = NUMW[n.lo] || (/^\d+$/.test(n.lo) && +n.lo >= 2 && +n.lo < 1000 ? +n.lo : 0);
      if (!v) continue;
      const nx = tok[n.i + 1]; if (nx && /^[.:,]$/.test(nx.t) && /^\d/.test(n.lo)) continue;
      let j = k + 1; if (W[j] && !W[j].cap && adjParse(W[j].lo) && W[j].i === W[k].i + 1) j++;
      const N = W[j]; if (!N || !N.cap || UNITS.test(N.lo) || N.i !== W[j - 1].i + 1) continue;
      const ni = nounInfo(N); if (!ni || !ni.pl || ni.pl === ni.w || pluralInfo(N)) continue;
      if (/^(jahr|monat|tag|woche|stunde|minute)$/.test(N.lo) && W[k - 1] && /^(seit|vor|in|nach|alle)$/.test(W[k - 1].lo) && false) continue;
      let pl = ni.pl; const prep = W[k - 1];
      if (prep && /^(mit|von|seit|vor|zu|aus|bei|nach|in)$/.test(prep.lo) && !/[ns]$/.test(pl)) pl += 'n';
      add(N, N, pl, 'grammar', 'Plural after a number', `After „${esc(n.t)}“ the noun is plural: ${esc(n.t)} <b>${esc(pl)}</b> (der/die/das ${esc(ni.w)} → die ${esc(ni.pl)}).`, { sev: 0.9, topic: 'plural' });
    }

    // 15. "Ich bin 25 Jahre" without "alt"
    { const re = /\b(bin|bist|ist|sind)\s+(\d{1,2}|\p{Ll}+zig|zehn|elf|zwölf|\p{Ll}+zehn)\s+Jahre\b(?!\s+alt)/gu; let m;
      while ((m = re.exec(text))) out.push({ at: m.index, wrong: m[0], right: m[0] + ' alt', category: 'vocabulary', rule: 'Age: … Jahre alt', explanation: 'Age: „Ich bin 25 Jahre <b>alt</b>.“ (or just „Ich bin 25.“)', auto: true, sev: 0.4 }); }
    // 16. seit + Perfekt (hint)
    { const re = /\b(habe|hast|hat|haben|habt)\b[^.!?\n]{0,30}\bseit\b[^.!?\n]{0,30}\b(gewohnt|gearbeitet|gelernt|studiert)\b/g; let m;
      while ((m = re.exec(text))) out.push({ at: m.index, wrong: m[0], right: '', category: 'verb', rule: 'seit + present tense', explanation: 'If it is still true now, German uses the <b>present</b> with „seit“: „Ich wohne seit zwei Jahren in Berlin.“ (not Perfekt).', auto: true, sev: 0.5, fix: false, topic: 'prepositions-time' }); }

    // 17. spacing & punctuation
    { const re = /(\p{L}) +([,.!?;:])(?!\d)/gu; let m; while ((m = re.exec(text))) out.push({ at: m.index + 1, wrong: text.slice(m.index + 1, m.index + m[0].length), right: m[2], category: 'punctuation', rule: 'No space before punctuation', explanation: 'No space before , . ! ? – but one space after.', auto: true, sev: 0.2 }); }
    { const re = /([,.;!?])(\p{L}{2,})/gu; let m; while ((m = re.exec(text))) { const before = text.slice(Math.max(0, m.index - 3), m.index); if (/(z\.B|d\.h|u\.a|\.[A-Z])$/i.test(before + m[1]) || /\d$/.test(before) || /^(de|com|net|org)$/i.test(m[2])) continue; out.push({ at: m.index, wrong: m[0], right: m[1] + ' ' + m[2], category: 'punctuation', rule: 'Space after punctuation', explanation: 'Put a space after a comma or full stop.', auto: true, sev: 0.2 }); } }
    // 18. "Ich" with a capital in the middle of a sentence
    W.forEach((t) => { if (t.t !== 'Ich') return; const p = prevTok(t); if (!p || SENT.has(p.t) || p.t === ':' || p.t === '„' || p.t === '"' || p.t === '(') return; if (/^[“"»«]$/.test(p.t) && p.i > 0 && SENT.has(tok[p.i - 1].t)) return; if (p.t === ',' && /^\s*(Liebe|Lieber|Hallo|Hi|Sehr)\b/.test(text.slice(0, p.s).split('\n').pop())) return; add(t, t, 'ich', 'spelling', '„ich“ is small', 'In German „ich“ (I) is written with a small letter – except at the start of a sentence.', { sev: 0.5 }); });

    // 20. modal verb + zu ("Ich möchte zu lernen")
    segs.forEach((s) => {
      const t = s.toks; if (!t.some((x) => MODAL.has(x.lo))) return;
      for (let k = 1; k + 1 < t.length; k++) if (t[k].lo === 'zu' && L.inf.has(t[k + 1].lo) && !t[k + 1].cap) add(t[k], t[k + 1], t[k + 1].t, 'grammar', 'Modal verb without zu', `Modal verbs (können, müssen, möchten …) take the infinitive <b>without zu</b>: … ${esc(t[k + 1].t)}.`, { sev: 0.9, topic: 'modals' });
    });
    // 22. question word order ("Wo du wohnst?")
    { const sents = text.split(/(?<=[.!?\n])/); let off = 0;
      sents.forEach((sn) => {
        const m = /^(\s*)(\p{Lu}\p{Ll}*)\s+(ich|du|er|sie|es|wir|ihr|Sie|man)\s+(\p{Ll}+)\b/u.exec(sn);
        if (m && /\?\s*$/.test(sn) && QW.test(m[2].toLowerCase()) && isFinite(m[4])) {
          out.push({ at: off + m[1].length, wrong: `${m[2]} ${m[3]} ${m[4]}`, right: `${m[2]} ${m[4]} ${m[3]}`, category: 'word_order', rule: 'W-question: verb in position 2', explanation: `In a W-question the verb comes right after the question word: <b>${m[2]} ${m[4]} ${m[3]}</b> …?`, auto: true, sev: 1, topic: 'word-order-v2' });
        }
        off += sn.length;
      }); }
    // 24. "Ich mag spielen" → "Ich spiele gern"
    for (let k = 0; k + 2 < W.length; k++) {
      const a = W[k], b = W[k + 1], c = W[k + 2];
      if (a.lo === 'ich' && b.lo === 'mag' && L.inf.has(c.lo) && !c.cap) {
        const f = formFor(c.lo, 0, 'pres'); if (!f) continue;
        add(a, c, `${a.t} ${f} gern`, 'vocabulary', 'gern instead of mögen + verb', `To say you like DOING something use <b>gern</b>: „Ich ${f} gern …“ („mögen“ is used with nouns: Ich mag Pizza.)`, { sev: 0.6, topic: 'gern' });
      }
    }
    // 26. accusative after more verbs (masculine nouns): "Es gibt ein Park"
    for (let k = 0; k + 2 < W.length; k++) {
      const v = W[k]; if (!ACC_VERBS.test(v.lo)) continue;
      let j = k + 1; if (W[j] && (PRONS.has(W[j].lo) || W[j].lo === 'es') && W[j].s - v.e <= 2) j++;
      const d = W[j]; if (!d || !/^(ein|kein|mein|dein|sein|unser|ihr|euer)$/.test(d.lo)) continue;
      if (tok.slice(v.i, d.i).some((x) => BOUND.has(x.t))) continue;
      let n = W[j + 1]; if (n && !n.cap && adjParse(n.lo)) { if (/er$/.test(n.lo)) continue; n = W[j + 2]; }
      if (!n || !n.cap) continue; const ni = nounInfo(n); if (!ni || ni.g !== 'der' || pluralInfo(n)) continue;
      if (/^(ist|sind|bin|bist|wird|werden|heißt)$/.test(v.lo)) continue;
      add(d, d, d.lo === 'euer' ? 'euren' : d.t + 'en', 'case', 'Accusative: -en for masculine nouns', `„${esc(v.t)}“ takes an accusative object. ${esc(n.t)} is masculine (der ${esc(ni.w)}) → ${esc(d.t)}<b>en</b> ${esc(n.t)}.`, { sev: 1, topic: 'accusative' });
    }
    // 27. fahren in + city (direction) – hint
    { const re = /\b(fahre|fährst|fährt|fahren|fliege|fliegst|fliegt|fliegen|reise|reist|reisen|ziehe|ziehst|zieht|ziehen)\s+(?:\p{Ll}+\s+)?in\s+(\p{Lu}\p{Ll}+)\b(?!\s+(?:herum|Urlaub))/gu; let m;
      while ((m = re.exec(text))) { if (lex().nouns[m[2].toLowerCase()] || /^(Deutschland|Indien|Pakistan|Italien|Spanien|England|Frankreich|Österreich|Polen|China|Japan|Amerika|Europa|Afrika|Asien|Berlin|Hamburg|München|Köln|Frankfurt|Wien|Stuttgart|Düsseldorf|Leipzig|Dresden|Hannover|Bremen|Nürnberg|Delhi|Mumbai|Lahore|Karachi|Paris|London|Rom)$/.test(m[2]) === false) continue;
        const at = m.index + m[0].lastIndexOf('in ' + m[2]);
        out.push({ at, wrong: 'in ' + m[2], right: 'nach ' + m[2], category: 'vocabulary', rule: 'Direction: nach + city/country', explanation: 'Going TO a city or country: <b>nach</b> Berlin, nach Indien. („in Berlin“ = being inside Berlin.)', auto: true, sev: 0.6, topic: 'two-way-prep', fix: false }); } }
    // 29. "Wann ich Zeit habe, …" → Wenn
    { const re = /(^|[.!?\n]\s*)(Wann)\s+(ich|du|er|sie|es|wir|ihr|man)\b([^.!?\n]*),/g; let m;
      while ((m = re.exec(text))) out.push({ at: m.index + m[1].length, wrong: 'Wann', right: 'Wenn', category: 'grammar', rule: 'wenn (if/when) vs. wann (question)', explanation: '„wann“ is only for questions (When?). For “if / whenever” use <b>wenn</b>.', auto: true, sev: 0.9, topic: 'subordinate' }); }

    // 30. subordinate clauses: verb at the end / missing comma before the main clause
    segs.forEach((s) => {
      if (!s.sub) return;
      const t = s.toks; if (t.length < 3) return;
      let fi = -1;
      for (let k = 1; k < t.length; k++) if (!t[k].cap && isFinite(t[k].lo) && !(k === 1 && /^(sein|ihr)$/.test(t[k].lo)) && !(DETLIKE.test(t[k].lo) && t[k + 1] && t[k + 1].cap)) { fi = k; break; }
      if (fi < 0 || fi === t.length - 1) return;
      const F = t[fi], R = t.slice(fi + 1);
      const RL = R[R.length - 1]; if (R.length <= 2 && R.every((r) => L.inf.has(r.lo) || isPP(r.lo) || isFinite(r.lo)) && isFinite(RL.lo) && (MODAL.has(RL.lo) || HABEN.has(RL.lo) || SEIN.has(RL.lo) || /^(werde|wirst|wird|werden|werdet|würde|würden)$/.test(RL.lo))) return;
      if (isFinite(R[0].lo) && !MODAL.has(F.lo) && !HABEN.has(F.lo) && !SEIN.has(F.lo) && s.sent && R.length > 1 && PRONS.has(R[1].lo)) {
        add(F, R[0], `${F.t}, ${R[0].t}`, 'punctuation', 'Comma between the two clauses', `The subordinate clause („${esc(t[0].t)} …“) ends with its verb „${esc(F.t)}“ – put a <b>comma</b> before the main clause.`, { sev: 0.4, topic: 'subordinate' });
        return;
      }
      if (fi >= 1 && R.length && !(R.every((r) => L.inf.has(r.lo) || isPP(r.lo) || isFinite(r.lo)) && !(MODAL.has(F.lo) || HABEN.has(F.lo) || SEIN.has(F.lo)))) {
        if (fi === 1 && PRONS.has(R[0].lo) === false && t[0].lo !== 'wie' && SUB_SOFT.has(t[0].lo) === false && !PRONS.has(t[1].lo) && R.length && !R.some((r) => PRONS.has(r.lo))) return;
        const moved = [...t.filter((x) => x !== F).map((x) => x.t), F.t].join(' ');
        add(t[0], t[t.length - 1], moved, 'word_order', `Verb at the end after „${t[0].lo}“`, `„${esc(t[0].lo)}“ starts a subordinate clause: the conjugated verb „${esc(F.t)}“ goes to the <b>end</b>.`, { sev: 1, topic: 'subordinate' });
      }
    });
    // relative clause: ", der wohnt in …" (hint)
    segs.forEach((s) => {
      if (!s.afterComma || s.toks.length < 3) return;
      const [r, v, w3] = s.toks; if (!/^(der|die|das|den|dem|denen)$/.test(r.lo) || !isFinite(v.lo) || v.cap) return;
      if ((r.lo === 'das' && /^(ist|war|sind|waren|klingt|stimmt|passt|geht|macht)$/.test(v.lo)) || (w3 && PRONS.has(w3.lo))) return;
      const pv = prevTok(r); const pw = pv && tok[pv.i - 1]; if (!pw || !pw.w || !pw.cap || !isNounTok(pw)) return;
      const moved = [r.t, ...s.toks.slice(2).map((x) => x.t), v.t].join(' ');
      add(r, s.toks[s.toks.length - 1], moved, 'word_order', 'Relative clause: verb at the end', `In a relative clause („…, ${esc(r.t)} …“ = who/which) the verb goes to the <b>end</b>: …, ${esc(moved)}.`, { sev: 0.6, topic: 'relative', fix: false });
    });
    // 31. after a fronted clause or time phrase: verb first, then subject
    segs.forEach((s, si) => {
      const t = s.toks;
      if (s.afterComma && !s.sub && !s.coord && si > 0 && segs[si - 1].sub && segs[si - 1].sent && t.length >= 2 && PRONS.has(t[0].lo) && isFinite(t[1].lo) && t[0].s > segs[si - 1].toks[0].s) {
        add(t[0], t[1], `${t[1].t} ${t[0].t}`, 'word_order', 'Verb first after the subordinate clause', `When a sentence starts with a subordinate clause (${esc(segs[si - 1].toks[0].t)} …), the main clause starts with the <b>verb</b>: …, <b>${esc(t[1].t)} ${esc(t[0].t)}</b> …`, { sev: 1, topic: 'word-order' });
        return;
      }
      if (!s.sent || s.sub || t.length < 3) return;
      if (!ADV1.test(t[0].lo) || PRONS.has(t[0].lo) || COORD.has(t[0].lo)) return;
      for (let k = 1; k < Math.min(t.length - 1, 5); k++) {
        if (isFinite(t[k].lo) && !t[k].cap) break;
        if (!t[k].cap && !PRONS.has(t[k].lo) && !/^(\d+|der|die|das|dem|den|des|am|im|um|in|an|auf|mit|nach|vor|seit|bei|zum|zur|ab|ein|einer|einem|jeden|jede|jedes|letzte|letzten|letztes|nächste|nächsten|nächstes|diese|diesen|dieses|meinem|meiner|meinen|halb|viertel|uhr|morgens|abends|früh|spät|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|ersten|zweiten|vielen|zwanzig|dreißig)$/.test(t[k].lo)) break;
        if (PRONS.has(t[k].lo) && !(isFinite(t[k + 1].lo) && !t[k + 1].cap)) break;
        if (PRONS.has(t[k].lo) && isFinite(t[k + 1].lo) && !t[k + 1].cap) {
          add(t[k], t[k + 1], `${t[k + 1].t} ${t[k].t}`, 'word_order', 'Verb in position 2', `The sentence starts with „${esc(t.slice(0, k).map((x) => x.t).join(' '))}“, so the verb comes next and the subject follows: <b>${esc(t[k + 1].t)} ${esc(t[k].t)}</b>.`, { sev: 1, topic: 'word-order-v2' });
          break;
        }
      }
    });
    // 32. nouns need capitals (bigger word list than the quick check)
    W.forEach((t) => {
      if (t.cap || t.lo.length < 3) return;
      const n = L.nouns[t.lo]; if (!n) return;
      if (L.fin.has(t.lo) || L.inf.has(t.lo) || L.adj.has(t.lo) || /^(morgen|abend|mittag|recht|angst|schuld|leid|teil|weg|ende|bitte|danke|heute|essen|leben|trinken|wissen|kosten|reisen|treffen|laufen|schreiben|lesen|spielen|lernen|arbeiten|wohnen|kaufen|fahren|gehen|kommen|leute)$/.test(t.lo)) return;
      const p = prevTok(t); if (p && /^(zu|ich|du|er|wir|ihr|man|sie|es)$/i.test(p.lo)) return;
      const nx = nextW(t); if (nx && (PRONS.has(nx.lo) || (adjParse(t.lo) && nx.cap))) return;
      if (/^(junge|junger|jungen|alte|alten|kleine|kleinen|gute|guten|neue|neuen|deutsche|deutschen|sorge|sorgen|grillen|essen|lernen|leben)$/.test(t.lo)) return;
      add(t, t, n.w, 'spelling', 'Nouns with a capital letter', `All nouns are capitalised in German: ${n.g} <b>${esc(n.w)}</b>.`, { sev: 0.6, topic: 'gender-articles' });
    });
    // 36. adjectives/verbs with a capital in the middle of a sentence
    W.forEach((t) => {
      if (!t.cap || t.t === t.t.toUpperCase()) return;
      const p = prevTok(t); if (!p || SENT.has(p.t) || /^[:„"(“…–-]$/.test(p.t)) return;
      if (p.w && p.cap) return; // names: Herr Braun, Max Weiß
      if (p.w && /^(in|auf|mit|und|oder|ins|im|am|zum|zur|für|aus|von)$/.test(p.lo)) return; // "in Blau", "Fit und Froh"
      if (p.w && adjParse(p.lo) && !L.fin.has(p.lo)) return; // gute Fahrt
      if (L.nouns[t.lo] || L.plurals[t.lo] || /^(Sie|Ihnen|Ihr|Ihre|Ihren|Ihrem|Ihrer|Ihres|Du|Dich|Dir|Dein|Deine|Euch|Ihr)$/.test(t.t)) return;
      if (!(L.adj.has(t.lo) || (L.fin.has(t.lo) && !L.inf.has(t.lo)))) return;
      if (/^(der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines|beim|zum|im|vom|am|ins|etwas|nichts|viel|wenig|alles|kein|keine|mein|dein|sein|ihr|unser|euer|fürs|ans|aufs|übers|vieles|allen|alle|sehr)$/i.test(p.lo)) return;
      const nx = nextW(t); if (nx && nx.cap && L.adj.has(t.lo)) return; // "Neue Straße", names
      add(t, t, t.lo, 'spelling', 'Small letter', `Only nouns (and names) have a capital letter: „${esc(t.lo)}“.`, { sev: 0.5 });
    });
    // 37. das / dass
    segs.forEach((s) => {
      if (!s.afterComma || !s.toks.length) return;
      const f = s.toks[0]; const pv = prevTok(f); const pw = pv && tok[pv.i - 1];
      if (!pw || !pw.w) return;
      if (f.lo === 'das' && /^(glaube|glaubst|glaubt|denke|denkst|denkt|hoffe|hoffst|hofft|weiß|weißt|finde|findest|findet|meine|meinst|meint|sage|sagst|sagt|schreibe|schreibt|wusste|dachte|glaubte|hoffen|wissen|denken|sicher|froh|schade|wichtig|klar|möglich|gut|toll|bekannt)$/.test(pw.lo) && s.toks[1] && (PRONS.has(s.toks[1].lo) || (s.toks[1].cap && s.toks.length > 2 && isFinite(s.toks[s.toks.length - 1].lo))) && !(s.toks[1].cap && isFinite((s.toks[2] || {}).lo || ''))) add(f, f, 'dass', 'spelling', 'dass (conjunction)', 'After verbs like glauben/denken/hoffen/wissen the conjunction is <b>dass</b> (double s): „Ich glaube, dass …“', { sev: 0.9, topic: 'subordinate' });
      if (f.lo === 'dass' && pw.cap && nounInfo(pw) && nounInfo(pw).g === 'das' && !pluralInfo(pw)) add(f, f, 'das', 'spelling', 'das (relative pronoun)', `After a neuter noun (das ${esc(pw.t)}) the relative pronoun is <b>das</b> (which/that): „das ${esc(pw.t)}, das …“`, { sev: 0.9, topic: 'relative' });
    });
    // 39. dative verbs with accusative pronouns and the other way round
    for (let k = 0; k + 1 < W.length; k++) {
      const v = W[k]; let p = W[k + 1];
      if (v.lo === 'geht' && p.lo === 'es' && W[k + 2]) p = W[k + 2];
      if (DAT_VERBS.test(v.lo) && /^(mich|dich|ihn)$/.test(p.lo) && !(v.lo === 'geht' && !W.slice(k - 2, k).some((x) => x.lo === 'wie' || x.lo === 'es')) && !(v.lo === 'tut' && !W.slice(k + 2, k + 4).some((x) => x.lo === 'leid' || x.lo === 'weh'))) {
        const r = { mich: 'mir', dich: 'dir', ihn: 'ihm' }[p.lo];
        add(p, p, r, 'case', 'Dative verb', `„${esc(v.t)}“ takes the <b>dative</b>: ${esc(v.t)} ${r} (mir, dir, ihm, ihr, uns, euch, ihnen/Ihnen).`, { sev: 1, topic: 'dative' });
      }
      if (ACC_PRON_VERBS.test(v.lo) && /^(mir|dir|ihm)$/.test(p.lo)) {
        if (/^(rufe|rufst|ruft|rufen)$/.test(v.lo) && !W.slice(k + 2, k + 6).some((x) => x.lo === 'an')) continue;
        if (/^(lade|lädst|lädt|laden)$/.test(v.lo) && !W.slice(k + 2, k + 8).some((x) => x.lo === 'ein')) continue;
        const r = { mir: 'mich', dir: 'dich', ihm: 'ihn' }[p.lo];
        add(p, p, r, 'case', 'Accusative object', `„${esc(v.t)}“ takes the <b>accusative</b>: ${esc(v.t)} ${r} (mich, dich, ihn, sie, uns, euch).`, { sev: 1, topic: 'pronouns-cases' });
      }
    }
    // 40. reflexive verbs: missing or wrong pronoun ("Ich freue auf …", "Ich freue mir")
    for (let k = 0; k + 1 < W.length; k++) {
      const v = W[k], n = W[k + 1]; if (!REFL.test(v.lo)) continue;
      const subj = W[k - 1] && PRON[W[k - 1].lo] ? W[k - 1] : (n && PRON[n.lo] ? n : null);
      if (!subj) continue;
      const want = REFL_P[subj.lo]; if (!want) continue;
      const after = subj === n ? W[k + 2] : n; if (!after) continue;
      if (/^(mir|dir)$/.test(after.lo) && /^(mich|dich)$/.test(want)) { add(after, after, want, 'case', 'Reflexive pronoun', `„sich ${esc(v.lo)}“ uses the accusative reflexive pronoun: ${esc(subj.t)} ${esc(v.t)} <b>${want}</b>.`, { sev: 1, topic: 'reflexive' }); continue; }
      if (/^(auf|über|für|an|um|sehr|schon|so|gut|schlecht|nicht|wohl|bei)$/.test(after.lo) && !/^(fühle|fühlst|fühlt|fühlen)$/.test(v.lo) || (/^(fühle|fühlst|fühlt|fühlen)$/.test(v.lo) && /^(gut|schlecht|nicht|wohl|krank|müde)$/.test(after.lo))) {
        if (/^(interessiert|erinnert)$/.test(v.lo) && subj !== W[k - 1]) continue;
        add(v, after, `${v.t} ${want} ${after.t}`, 'grammar', 'Reflexive verb', `This is a reflexive verb: ${esc(subj.t)} ${esc(v.t)} <b>${want}</b> …`, { sev: 0.9, topic: 'reflexive' });
      }
    }
    return out;
  }

  /* ================= merging, corrections, statistics ================= */
  function check(text, ctx = {}) {
    const quick = (GL.Writing && GL.Writing.quickCheck ? GL.Writing.quickCheck(text, ctx) : []).filter((m) => !/^Verb at the end after|^Nouns with a capital letter/.test(m.rule)).map((m) => Object.assign({ sev: SEV[m.category] || 0.6 }, m));
    let extra = [];
    try { extra = rules(text, ctx); } catch (e) { console.warn('checker', e); }
    const all = [];
    quick.concat(extra.map((m) => Object.assign({ sev: SEV[m.category] || 0.6 }, m))).forEach((m) => {
      if (m.at == null || m.at < 0) return;
      const e = m.at + Math.max(1, m.wrong.length);
      if (all.some((x) => m.at < x.at + Math.max(1, x.wrong.length) && e > x.at && (x.category === m.category || x.rule === m.rule || (x.at === m.at && x.wrong === m.wrong)))) return;
      all.push(m);
    });
    return all.sort((a, b) => a.at - b.at);
  }
  function applyFixes(text, mistakes) {
    let out = text, last = Infinity;
    mistakes.slice().sort((a, b) => b.at - a.at).forEach((m) => {
      if (m.fix === false || (!m.right && !m.del) || /\s\/\s|\//.test(m.right || '')) return;
      const e = m.at + m.wrong.length;
      if (e > last || text.substr(m.at, m.wrong.length) !== m.wrong) return;
      out = out.slice(0, m.at) + (m.right || '') + out.slice(e);
      last = m.at;
    });
    return out;
  }
  const CONNECT = ['und', 'aber', 'oder', 'denn', 'weil', 'dass', 'wenn', 'obwohl', 'deshalb', 'deswegen', 'trotzdem', 'außerdem', 'dann', 'danach', 'zuerst', 'später', 'schließlich', 'zum schluss', 'erstens', 'zweitens', 'einerseits', 'andererseits', 'zum beispiel', 'also', 'nämlich', 'sondern', 'damit', 'bevor', 'nachdem', 'während', 'als', 'ob', 'falls', 'sodass', 'darum', 'daher', 'allerdings', 'jedoch', 'leider', 'zum glück', 'außerdem', 'sowohl', 'entweder', 'weder'];
  const STRUCT = [
    ['sub', 'subordinate clauses (weil, dass, wenn …)', /\b(weil|dass|wenn|obwohl|ob|damit|nachdem|bevor|falls|sobald)\b/gi],
    ['perfekt', 'Perfekt (habe … gemacht)', /\b(habe|hast|hat|haben|habt|bin|bist|ist|sind|seid)\b[^.!?\n]{0,60}?\b(ge\p{Ll}{3,}(?:t|en)|\p{Ll}+iert|besucht|bekommen|verstanden|vergessen|erzählt|bezahlt)\b/giu],
    ['modal', 'modal verbs (kann, muss, möchte …)', /\b(kann|kannst|können|muss|musst|müssen|will|willst|wollen|darf|darfst|dürfen|soll|sollst|sollen|möchte|möchtest|möchten)\b/gi],
    ['konj2', 'Konjunktiv II (würde, hätte, wäre, könnte)', /\b(würde|würdest|würden|hätte|hättest|hätten|wäre|wärst|wären|könnte|könntest|könnten|sollte|solltest|müsste)\b/gi],
    ['prat', 'Präteritum (war, hatte, ging …)', /\b(war|warst|waren|hatte|hattest|hatten|ging|kam|konnte|musste|wollte|sagte|machte|wurde)\b/gi],
    ['passiv', 'passive (wird gemacht)', /\b(wird|werden|wurde|wurden)\b[^.!?\n]{0,40}?\bge\p{Ll}{3,}(?:t|en)\b/giu],
    ['zuinf', 'zu + infinitive / um … zu', /\b(zu|um)\s+(?:\p{Ll}+\s+){0,4}?\p{Ll}*zu\p{Ll}+en\b|\bzu\s+\p{Ll}+en\b/giu],
    ['relative', 'relative clauses (…, der/die/das …)', /,\s*(der|die|das|den|dem|denen|deren|dessen)\s+(?:\p{L}+\s+){1,8}?\p{Ll}+(?=[,.!?])/giu],
    ['compare', 'comparisons (größer als …)', /\b\p{Ll}+er\s+als\b|\bam\s+\p{Ll}+sten\b/giu],
  ];
  const STOP = new Set('der die das den dem des ein eine einen einem einer eines und oder aber denn weil dass wenn ob als wie wo was wer wann warum ich du er sie es wir ihr mich dich sich uns euch mir dir ihm ihnen mein dein sein unser euer bitte danke ja nein nicht kein keine auch noch schon sehr so zu im am um an auf aus bei mit nach von vor für über unter ist sind bin bist war hat habe haben hast wird werden kann können muss müssen will möchte soll gern mal doch man hier dort da dann jetzt heute alle viel viele mehr etwas nichts diese dieser dieses ihre ihren ihrem ihrer ihres seine seinen deine deinen dein meine meinen ihr sie schreiben schreibt schreibe sagen sagt erzählen erzählt beschreiben beschreibt nennen antworten antwortet teilen mitteilen informieren fragen fragt bitten machen geben warum welche welcher welches etwas einen kurz kurzen text brief e-mail email nachricht sms freund freundin beitrag'.split(' '));
  const SYN = [
    [/dank/, ['dank', 'danke', 'bedank']],
    [/entschuldig|tut.*leid/, ['entschuldig', 'leid', 'verzeih', 'sorry']],
    [/einlad/, ['einlad', 'eingeladen', 'party', 'feier']],
    [/vorschlag|vorschlagen|vorschlage/, ['vorschlag', 'wie waere', 'lass uns', 'wollen wir', 'koennten wir', 'sollen wir', 'treffen wir', 'koennen wir']],
    [/termin|uhrzeit|zeitpunkt|wann|treffpunkt/, ['termin', 'uhr', 'montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag', 'samstag', 'sonntag', 'morgen', 'abend', 'nachmittag', 'woche', 'wochenende', 'datum']],
    [/grund|warum|begruend|weshalb/, ['weil', 'denn', 'deshalb', 'darum', 'grund', 'naemlich', 'deswegen']],
    [/meinung|ihre ansicht|was halten|finden sie/, ['meinung', 'finde', 'denke', 'glaube', 'meiner', 'ich meine', 'persoenlich']],
    [/erfahrung/, ['erfahrung', 'frueher', 'einmal', 'letzt', 'als ich', 'ich habe']],
    [/vorteil|nachteil/, ['vorteil', 'nachteil', 'positiv', 'negativ', 'einerseits', 'andererseits']],
    [/wunsch|wuensch/, ['wuensch', 'moechte', 'wuerde', 'haette gern']],
    [/hilf|helf/, ['hilf', 'helf', 'hilfe', 'unterstuetz']],
    [/absag|nicht kommen|keine zeit/, ['leider', 'nicht kommen', 'kann nicht', 'absag', 'keine zeit']],
    [/gratulier|glueckwunsch|geburtstag/, ['gratulier', 'glueckwunsch', 'alles gute', 'geburtstag']],
    [/ort|wo\b|treffen/, ['treffpunkt', 'adresse', 'strasse', 'bahnhof', 'cafe', 'restaurant', 'bei mir', 'bei dir', 'im ', 'am ']],
  ];
  const foldS = (s) => String(s).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  function coverage(text, points) {
    const T = ' ' + foldS(text).replace(/[^a-z0-9?]+/g, ' ') + ' ';
    const words = T.trim().split(' ');
    return points.map((p) => {
      const de = Array.isArray(p) ? p[0] : String(p);
      const f = foldS(de);
      const keys = f.replace(/[^a-z ]+/g, ' ').split(' ').filter((w) => w.length >= 4 && !STOP.has(w) && !STOP.has(w.replace(/(en|e|n|t|st)$/, ''))).map((w) => w.slice(0, Math.min(w.length, 5)));
      let hits = keys.filter((k) => words.some((w) => w.startsWith(k)));
      SYN.forEach(([re, alts]) => { if (re.test(f) && alts.some((a) => (a.endsWith(' ') ? T.includes(' ' + a) : words.some((w) => w.startsWith(a)) || T.includes(' ' + a + ' ')))) hits.push('~'); });
      if (/frag|fragen sie|stellen sie.*frage|nach\b/.test(f) && /\?/.test(text)) hits.push('?');
      return { point: de, done: hits.length > 0, note: hits.length ? '' : 'not found automatically – check it yourself' };
    });
  }
  function stats(text, mistakes) {
    const words = (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []);
    const n = words.length;
    const sents = text.split(/[.!?\n]+/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length >= 2);
    const lo = foldS(text);
    const conns = CONNECT.filter((c) => new RegExp('(^|[^a-z])' + foldS(c).replace(/\s/g, '\\s+') + '([^a-z]|$)').test(lo));
    const structs = STRUCT.filter(([, , re]) => { re.lastIndex = 0; return re.test(text); }).map(([k, label]) => ({ k, label }));
    const firsts = sents.map((s) => s.split(/\s+/)[0].toLowerCase());
    const startVar = firsts.length ? new Set(firsts).size / firsts.length : 1;
    const content = words.map((w) => w.toLowerCase()).filter((w) => w.length > 3 && !STOP.has(w));
    const ttr = content.length ? new Set(content).size / content.length : 0;
    const W = GL.exam && GL.exam.words;
    let lv = 0;
    if (W) {
      const set = (window.__examLvSet = window.__examLvSet || (() => { const s = new Set(); Object.values(W.themes).forEach((th) => { if (th.level !== 'A1') th.words.forEach(([de]) => { const w = de.replace(/^(der|die|das|sich)\s+/, '').toLowerCase(); if (w.length > 3) s.add(w); }); }); return s; })());
      lv = new Set(words.map((w) => w.toLowerCase()).filter((w) => set.has(w))).size;
    }
    const english = mistakes.filter((m) => m.rule === 'English word').length;
    const err = mistakes.reduce((s, m) => s + (m.sev != null ? m.sev : SEV[m.category] || 0.6), 0);
    const subClauses = (text.match(/\b(weil|dass|wenn|obwohl|ob|damit|nachdem|bevor|falls|als)\b/gi) || []).length;
    return { words: n, sentences: sents.length, avgLen: sents.length ? Math.round(n / sents.length) : n, connectors: conns, structures: structs, startVar, ttr, levelWords: lv, english, err, subClauses, lines: text.split('\n').filter((l) => l.trim()).length };
  }
  const clamp = (x) => Math.max(0, Math.min(100, Math.round(x)));
  function criteria(st, cov, ctx) {
    const need = ctx.count || (ctx.words && ctx.words[0]) || ({ A1: 30, A2: 40, B1: 80 }[ctx.level] || 40);
    const lenR = Math.min(1, st.words / need);
    const letter = !!ctx.letter;
    const greet = /^(\s*)(Liebe|Lieber|Hallo|Hi|Sehr geehrte|Guten Tag)/m.test(ctx.text || '');
    const closing = /(Grüße|Gruß|Bis bald|Tschüss|Mit freundlichen)/.test(ctx.text || '');
    const covR = cov.length ? cov.filter((c) => c.done).length / cov.length : 1;
    const task = clamp(covR * 65 + lenR * 25 + (letter ? (greet ? 5 : 0) + (closing ? 5 : 0) : st.sentences >= 3 ? 10 : st.sentences * 3));
    const cn = st.connectors.length;
    const coherence = clamp(Math.min(cn, 5) * 12 + st.startVar * 25 + (st.sentences >= 3 ? 15 : st.sentences * 5));
    const vocab = clamp(15 + Math.min(1, st.ttr / 0.75) * 45 + Math.min(st.levelWords, 8) * 5 - st.english * 10 + (st.words >= need ? 0 : -10 * (1 - lenR)));
    const acc = Math.max(0, 100 - (st.err / Math.max(st.words, 8)) * 100 * 5);
    const want = { A1: 2, A2: 3, B1: 5 }[ctx.level] || 3;
    const structures = clamp(acc * 0.72 + Math.min(1, st.structures.length / want) * 28);
    const total = clamp(task * 0.2 + coherence * 0.15 + vocab * (0.6 + 0.4 * acc / 100) * 0.2 + structures * 0.45);
    return { task, coherence, vocab, structures, acc: clamp(acc), total };
  }
  function estimateLevel(st, crit) {
    if (st.words < 20) return 'A1';
    const types = st.structures.length;
    if (types >= 4 && st.subClauses >= 2 && crit.acc >= 60 && st.words >= 60) return 'B1';
    if (types >= 2 && crit.acc >= 45 && st.words >= 30) return 'A2';
    return 'A1';
  }
  const CAT_EN = { case: 'cases & endings', verb: 'verb forms', word_order: 'word order', spelling: 'spelling & capitals', punctuation: 'punctuation', style: 'style', vocabulary: 'word choice', grammar: 'grammar' };
  function analyze(text, ctx = {}) {
    ctx = Object.assign({}, ctx, { text });
    if (ctx.letter == null) ctx.letter = /^(\s*)(Liebe|Lieber|Hallo|Hi|Sehr geehrte|Guten Tag)/m.test(text) || /mail|brief|nachricht|sms|schreiben sie (an|ihre)/i.test(String(ctx.task || ''));
    const mistakes = check(text, ctx);
    const st = stats(text, mistakes);
    const pts = (ctx.points || []).map((p) => (Array.isArray(p) ? p[0] : p)).filter(Boolean);
    const cov = pts.length ? coverage(text, pts) : [];
    const crit = criteria(st, cov, ctx);
    const level = estimateLevel(st, crit);
    let corrected = applyFixes(text, mistakes);
    for (let pass = 0; pass < 3; pass++) { const nx = applyFixes(corrected, check(corrected, ctx)); if (nx === corrected) break; corrected = nx; }
    const counts = {}; mistakes.forEach((m) => (counts[m.category] = (counts[m.category] || 0) + 1));
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    const strengths = [], tips = [];
    if (cov.length && cov.every((c) => c.done)) strengths.push(`All ${cov.length} task points seem to be covered.`);
    if (st.connectors.length >= 3) strengths.push(`You connect your ideas with ${st.connectors.length} different connectors (${st.connectors.slice(0, 5).join(', ')}).`);
    if (st.structures.some((s) => s.k === 'sub')) strengths.push('You use subordinate clauses (weil, dass, wenn …) – that is B1 style.');
    if (st.structures.length >= 3) strengths.push(`Varied grammar: ${st.structures.slice(0, 4).map((s) => s.label.replace(/ \(.*\)/, '')).join(', ')}.`);
    if (!counts.spelling) strengths.push('No spelling or capitalisation mistakes found.');
    if (st.startVar >= 0.8 && st.sentences >= 4) strengths.push('Your sentences start in different ways – nice to read.');
    const need = ctx.count || (ctx.words && ctx.words[0]) || 0;
    if (need && st.words < need * 0.85) tips.push(`Write more: you have ${st.words} words, the task needs about ${need}.`);
    cov.filter((c) => !c.done).forEach((c) => tips.push(`Answer this point: „${c.point}“.`));
    if (st.connectors.length < 3) tips.push('Use more connectors: deshalb, trotzdem, außerdem, weil, denn, zuerst … danach.');
    if (top && top[1] >= 2) tips.push(`Most of your mistakes are about ${CAT_EN[top[0]]} – practise it: <a href="#/grammar/${TOPIC[top[0]] || 'word-order'}">grammar</a> · <a href="#/trainer">trainer</a>.`);
    if (st.startVar < 0.6 && st.sentences >= 4) tips.push('Many sentences start the same way. Try: Am Wochenende … / Danach … / Leider …');
    if (!st.structures.some((s) => s.k === 'sub') && ctx.level !== 'A1') tips.push('Add a reason with „weil“ (verb at the end): … , weil ich viel arbeiten muss.');
    if (ctx.letter && !/(Grüße|Gruß|Bis bald|Tschüss|Mit freundlichen)/.test(text)) tips.push('End your letter with a closing: Viele Grüße / Mit freundlichen Grüßen + your name.');
    if (ctx.letter && !/^(\s*)(Liebe|Lieber|Hallo|Hi|Sehr geehrte|Guten Tag)/m.test(text)) tips.push('Start with a greeting: Liebe Anna, / Sehr geehrte Damen und Herren,');
    const n = mistakes.length;
    const summary = `${crit.total >= 85 ? 'Excellent work!' : crit.total >= 70 ? 'Good work!' : crit.total >= 55 ? 'Not bad – you are on the way.' : 'Keep going – every text makes you better.'} ${n ? `The coach found ${n} point${n > 1 ? 's' : ''} to improve${top ? `, mostly ${CAT_EN[top[0]]}` : ''}.` : 'No typical mistakes found.'}${cov.length ? ` Task points: ${cov.filter((c) => c.done).length} of ${cov.length}.` : ''}`;
    return { score: crit.total, level, summary, mistakes, corrected, improved: '', strengths: strengths.slice(0, 4), tips: tips.slice(0, 5), coverage: cov, criteria: crit, stats: st, offline: true };
  }
  function criteriaHTML(r) {
    const c = r.criteria; if (!c) return '';
    const rows = [['🎯', 'Task', 'Erfüllung', c.task, 'All points answered, right length and form'], ['🧩', 'Coherence', 'Kohärenz', c.coherence, 'Connectors, logical order, varied sentences'], ['📚', 'Vocabulary', 'Wortschatz', c.vocab, 'Varied and fitting words, no English'], ['🏗️', 'Structures', 'Strukturen', c.structures, 'Correct grammar and varied structures']];
    const st = r.stats || {};
    return `<div class="ck-crit">${rows.map(([ic, en, de, v, tip], i) => `<div class="ck-row" title="${GL.attr(tip)}" style="animation-delay:${i * 0.08}s"><span class="ck-ic">${ic}</span><span class="ck-l"><b>${en}</b><small>${de}</small></span><span class="ck-track"><i class="${v >= 75 ? 'hi' : v >= 55 ? 'mid' : 'lo'}" style="--w:${v}%"></i></span><b class="ck-v">${v}</b></div>`).join('')}</div>
      <div class="ck-facts"><span>📝 ${st.words || 0} words</span><span>🔗 ${(st.connectors || []).length} connectors</span><span>🏗️ ${(st.structures || []).length} structures</span><span>✅ accuracy ${c.acc}%</span></div>`;
  }

  /* ================= mistake hunt ================= */
  function sentencePool(maxDay) {
    const out = [];
    const ok = (s) => typeof s === 'string' && /^[A-ZÄÖÜ]/.test(s) && /[.!?]$/.test(s) && !/[„“"()…]/.test(s) && s.split(/\s+/).length >= 4 && s.split(/\s+/).length <= 14;
    (GL.days || []).forEach((d) => {
      if (maxDay && d.day > maxDay) return;
      (d.vocab || []).forEach((v) => { if (ok(v[3])) out.push({ s: v[3], en: v[4] || '', day: d.day }); });
      (d.exercises || []).forEach((e) => { if (e.t === 'order' && ok(e.a)) out.push({ s: e.a, en: e.en || '', day: d.day }); if (e.t === 'tr' && ok([].concat(e.a)[0])) out.push({ s: [].concat(e.a)[0], en: e.en || '', day: d.day }); });
    });
    return out;
  }
  const HUNTS = [
    (s) => { const m = /\b(der|die|das|Der|Die|Das)\s+(\p{Lu}\p{L}+)\b/u.exec(s); if (!m) return null; const ni = lex().nouns[m[2].toLowerCase()]; if (!ni || ni.g !== m[1].toLowerCase() || lex().plurals[m[2].toLowerCase()]) return null; const other = ['der', 'die', 'das'].filter((x) => x !== ni.g)[Math.random() < 0.5 ? 0 : 1]; return { wrong: s.slice(0, m.index) + keepCase(m[1], other) + ' ' + m[2] + s.slice(m.index + m[0].length), rule: 'Article (der/die/das)', ex: `„${m[2]}“ is ${ni.g} ${m[2]}.`, topic: 'gender-articles' }; },
    (s) => { const m = /\s(\p{Lu}\p{Ll}{3,})\b/u.exec(s.slice(1)); if (!m) return null; const w = m[1]; if (!lex().nouns[w.toLowerCase()]) return null; const at = 1 + m.index + 1; return { wrong: s.slice(0, at) + w.toLowerCase() + s.slice(at + w.length), rule: 'Nouns have capitals', ex: `„${w}“ is a noun – nouns are always capitalised.`, topic: 'gender-articles' }; },
    (s) => { const m = /\b(Ich|ich)\s+(\p{Ll}+e)\b/u.exec(s); if (!m) return null; const f = finOf(m[2].toLowerCase()).find((x) => x.p === 0 && x.t === 'pres'); if (!f) return null; const du = formFor(f.inf, 1, 'pres'); if (!du || du === m[2]) return null; return { wrong: s.slice(0, m.index) + m[1] + ' ' + du + s.slice(m.index + m[0].length), rule: 'Verb ending', ex: `With „ich“ the verb ends in -e: ich ${m[2]}.`, topic: 'present-regular' }; },
    (s) => { const m = /^(Heute|Morgen|Dann|Jetzt|Am Wochenende|Am Montag|Am Abend|Im Sommer|Danach|Gestern|Leider|Abends)\s+(\p{Ll}+)\s+(ich|du|er|sie|wir|ihr|es)\b/u.exec(s); if (!m || !isFinite(m[2])) return null; return { wrong: `${m[1]} ${m[3]} ${m[2]}` + s.slice(m[0].length), rule: 'Verb in position 2', ex: `After „${m[1]}“ the verb comes next: ${m[1]} ${m[2]} ${m[3]} …`, topic: 'word-order-v2' }; },
    (s) => { const m = /,\s*(weil|dass|wenn|obwohl)\s+(ich|du|er|sie|es|wir|ihr|man)\s+([^,.!?]+?)\s+(\p{Ll}+)([.!?])$/u.exec(s); if (!m || !isFinite(m[4])) return null; return { wrong: s.slice(0, m.index) + `, ${m[1]} ${m[2]} ${m[4]} ${m[3]}${m[5]}`, rule: 'Verb at the end', ex: `After „${m[1]}“ the verb goes to the end: … ${m[1]} ${m[2]} ${m[3]} ${m[4]}.`, topic: 'subordinate' }; },
    (s) => { const m = /\b(bin|bist|ist|sind|seid)\b([^.!?]*?)\b(gegangen|gefahren|gekommen|geflogen|geblieben|aufgestanden|angekommen|gelaufen|umgezogen|gewesen)\b/.exec(s); if (!m) return null; const H = { bin: 'habe', bist: 'hast', ist: 'hat', sind: 'haben', seid: 'habt' }[m[1]]; return { wrong: s.slice(0, m.index) + H + m[2] + m[3] + s.slice(m.index + m[0].length), rule: 'Perfekt with sein', ex: `„${m[3]}“ uses sein in the Perfekt: ${m[1]} … ${m[3]}.`, topic: 'perfekt-sein' }; },
    (s) => { const m = /\bmit\s+(dem|der)\s+/.exec(s); if (!m) return null; return { wrong: s.slice(0, m.index) + 'mit ' + (m[1] === 'dem' ? 'den' : 'die') + ' ' + s.slice(m.index + m[0].length), rule: 'Dative after mit', ex: '„mit“ always takes the dative: mit dem / mit der.', topic: 'dative' }; },
    (s) => { const m = /(\p{L}),\s+(weil|dass|wenn|obwohl)\b/u.exec(s); if (!m) return null; return { wrong: s.slice(0, m.index + 1) + ' ' + s.slice(m.index + m[0].indexOf(m[2])), rule: 'Comma before weil/dass', ex: `There is always a comma before „${m[2]}“.`, topic: 'subordinate' }; },
    (s) => { const m = /\beinen\s+(\p{Lu}\p{L}+)/u.exec(s); if (!m) return null; return { wrong: s.slice(0, m.index) + 'ein ' + m[1] + s.slice(m.index + m[0].length), rule: 'Accusative -en', ex: `${m[1]} is masculine and an object (accusative): einen ${m[1]}.`, topic: 'accusative' }; },
    (s) => { const m = /\b(kann|kannst|können|muss|musst|müssen|möchte|möchtest|möchten|will|willst|wollen)\s+((?:\S+\s+){1,4}?)(\p{Ll}+en)([.!?])$/u.exec(s); if (!m || !lex().inf.has(m[3]) || m[2].trim().split(/\s+/).length < 1) return null; return { wrong: s.slice(0, m.index) + `${m[1]} ${m[3]} ${m[2].trim()}${m[4]}`, rule: 'Infinitive at the end', ex: `With a modal verb the infinitive goes to the end: ${m[1]} … ${m[3]}.`, topic: 'modals' }; },
  ];
  function hunt(maxDay) {
    const pool = GL.shuffle(sentencePool(maxDay));
    for (const p of pool.slice(0, 60)) {
      const fns = GL.shuffle(HUNTS.slice());
      for (const fn of fns) { let r = null; try { r = fn(p.s); } catch (e) { r = null; } if (r && r.wrong !== p.s) return Object.assign({ right: p.s, en: p.en, day: p.day }, r); }
    }
    return null;
  }
  const normS = (s) => String(s).replace(/\s+/g, ' ').replace(/\s+([,.!?])/g, '$1').trim();

  function viewHunt() {
    const st = (GL.Store.state.hunt = GL.Store.state.hunt || { n: 0, ok: 0, streak: 0, best: 0 });
    return {
      html: `<p><a href="#/writing">← Writing studio</a></p>
        <div class="ck-hunt-head"><div><h1 style="margin:0">🕵️ Mistake hunt</h1><p class="muted" style="margin:.3em 0 0">Every sentence has <b>one</b> typical mistake. Find it and fix it – exactly what examiners look for in your writing.</p></div>
          <div class="ck-hunt-stats"><span>🔥 <b id="hkStreak">${st.streak}</b> in a row</span><span>🏆 best <b id="hkBest">${st.best}</b></span><span>✅ <b id="hkOk">${st.ok}</b> / ${st.n}</span></div></div>
        <div class="card ck-hunt" id="hkCard"></div>`,
      mount() {
        const card = document.getElementById('hkCard');
        const maxDay = GL.Store.state.settings.unlockAll ? 30 : GL.Store.nextDay();
        const next = () => {
          const h = hunt(maxDay);
          if (!h) { card.innerHTML = '<p>No sentences found.</p>'; return; }
          card.innerHTML = `<div class="ck-hunt-q"><span class="ck-badge">Find the mistake</span><p class="ck-wrong">${esc(h.wrong)}</p>${h.en ? `<p class="muted" style="margin:.2em 0 .8em">🇬🇧 ${esc(h.en)}</p>` : ''}
            <textarea class="txt-in ck-fix" rows="2" spellcheck="false">${esc(h.wrong)}</textarea>
            <div class="umlauts">${['ä', 'ö', 'ü', 'ß'].map((c) => `<button type="button" class="btn tiny ghost" data-c="${c}">${c}</button>`).join('')}</div>
            <div class="row" style="margin-top:10px"><button class="btn green" id="hkCheck" type="button">✅ Check</button><button class="btn ghost" id="hkHint" type="button">💡 Hint</button><button class="btn ghost" id="hkSkip" type="button">⏭ Show answer</button></div>
            <div id="hkOut"></div></div>`;
          const ta = card.querySelector('.ck-fix');
          ta.focus();
          card.querySelector('.umlauts').onclick = (e) => { const b = e.target.closest('[data-c]'); if (!b) return; const s = ta.selectionStart; ta.value = ta.value.slice(0, s) + b.dataset.c + ta.value.slice(ta.selectionEnd); ta.focus(); ta.selectionStart = ta.selectionEnd = s + 1; };
          const out = document.getElementById('hkOut');
          const done = (ok, shown) => {
            st.n++; if (ok) { st.ok++; st.streak++; st.best = Math.max(st.best, st.streak); } else st.streak = 0;
            GL.Store.save();
            if (ok) { GL.Store.addXP(st.streak >= 5 ? 4 : 3); GL.sfx('ok'); if (GL.Game) GL.Game.count('write', 1); if (st.streak && st.streak % 5 === 0) GL.confetti(80); }
            else GL.sfx(shown ? 'pop' : 'bad');
            document.getElementById('hkStreak').textContent = st.streak; document.getElementById('hkBest').textContent = st.best; document.getElementById('hkOk').textContent = st.ok;
            out.innerHTML = `<div class="ck-res ${ok ? 'ok' : 'bad'}"><b>${ok ? '✅ Richtig! Gut gefunden.' : shown ? '👀 The correct sentence:' : '❌ Not quite. The correct sentence:'}</b>
              <p class="ck-diff">${GL.Writing.diffHTML(h.wrong, h.right)}</p><p style="margin:.3em 0"><b>${esc(h.rule)}:</b> ${esc(h.ex)} <a href="#/grammar/${h.topic}">Grammar →</a></p>
              <div class="row"><button class="btn tiny ghost" data-say="${GL.attr(h.right)}">🔊 Listen</button><button class="btn green" id="hkNext" type="button">Next sentence →</button></div></div>`;
            ['hkCheck', 'hkHint', 'hkSkip'].forEach((id) => (document.getElementById(id).disabled = true));
            document.getElementById('hkNext').onclick = next;
            document.getElementById('hkNext').focus();
          };
          document.getElementById('hkCheck').onclick = () => {
            const v = normS(ta.value);
            if (v === normS(h.wrong)) { out.innerHTML = '<p class="muted">You didn’t change anything yet – find the mistake and correct it in the box.</p>'; return; }
            done(v === normS(h.right) || v.replace(/[.!?]$/, '') === normS(h.right).replace(/[.!?]$/, ''), false);
          };
          document.getElementById('hkHint').onclick = () => { out.innerHTML = `<p class="ck-hint">💡 Look at: <b>${esc(h.rule)}</b></p>`; };
          document.getElementById('hkSkip').onclick = () => done(false, true);
          ta.onkeydown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); document.getElementById('hkCheck').click(); } };
        };
        next();
      },
    };
  }

  GL.Checker = { analyze, check, applyFixes, criteriaHTML, coverage, hunt, viewHunt, lex, tokenize };
})();
