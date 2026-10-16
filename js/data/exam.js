/* EXAM PREP – telc & Goethe, A1 → B1 in 12 weeks.
   Formats follow the official exam descriptions (Goethe-Zertifikat A1/A2/B1, telc Deutsch A1/A2/B1) as published
   2025/26 – learners should check goethe.de / telc.net for the latest details and use the free official model tests.
   All practice texts in this course are original (written for this course in the official task formats). */
(function () {
  'use strict';
  const E = (GL.exam = GL.exam || {});

  /* ---------- exam formats ---------- */
  E.formats = {
    A1: {
      title: 'A1 – Start Deutsch 1', color: '#22b573',
      intro: 'Goethe-Zertifikat A1 “Start Deutsch 1” and telc Deutsch A1 “Start Deutsch 1” were developed together and have the same format. You show that you can handle very simple everyday situations: introduce yourself, understand short announcements, fill in a form, write a short message.',
      goethe: {
        name: 'Goethe-Zertifikat A1: Start Deutsch 1',
        total: 'Written ≈ 65 min · Speaking ≈ 15 min (group of up to 4, no preparation time)',
        pass: 'Result out of 100 points – passed with 60 points or more. All four parts are taken on one day (no modules).',
        parts: [
          ['🎧', 'Hören', '≈ 20 min', 'Teil 1: short everyday dialogues → a/b/c (heard twice) · Teil 2: announcements (station, shop) → richtig/falsch (heard once) · Teil 3: phone messages → a/b/c (heard twice)'],
          ['📖', 'Lesen', '25 min', 'Teil 1: short emails/letters → richtig/falsch · Teil 2: two adverts or web pages per situation → choose a or b · Teil 3: signs and notices → richtig/falsch'],
          ['✍️', 'Schreiben', '20 min', 'Teil 1: fill in a form with 5 pieces of information from a text · Teil 2: a short message (≈ 30 words) covering 3 given points'],
          ['🗣️', 'Sprechen', '≈ 15 min', 'Teil 1: introduce yourself (name, age, country, home, languages, job, hobby) + spell / say a number · Teil 2: ask and answer questions with word cards on a topic · Teil 3: make and react to requests with picture cards'],
        ],
      },
      telc: {
        name: 'telc Deutsch A1 (Start Deutsch 1)',
        total: 'Same format as the Goethe exam (written ≈ 65 min, speaking ≈ 15 min in a group).',
        pass: 'Passed with 60 % of the points.',
        parts: [['🔁', 'Same tasks', '', 'Hören, Lesen, Schreiben and Sprechen with the same parts and task types as above.']],
      },
      strategies: [
        ['🎧 Hören', 'Read the question BEFORE you listen and underline the key word (Uhrzeit, Ort, Preis …). Numbers and times are tested a lot – practise them daily.'],
        ['📖 Lesen', 'You don’t need to understand every word. Look for the information the question asks for. In Teil 2 the situation decides: read it twice.'],
        ['✍️ Schreiben', 'Teil 2: write 1–2 sentences for EACH of the 3 points, plus greeting and ending. Simple correct sentences beat long wrong ones.'],
        ['🗣️ Sprechen', 'Learn your self-introduction by heart. In Teil 2 and 3 you only need simple questions and requests: “Wo …?”, “Haben Sie …?”, “Können Sie bitte …?”'],
      ],
      official: [['Goethe A1 Modellsatz & Übungssätze', 'https://www.goethe.de/de/spr/kup/prf/prf/sd1.html'], ['telc Deutsch A1 Übungstest', 'https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/']],
    },
    A2: {
      title: 'A2 – Goethe-Zertifikat A2 / telc Deutsch A2', color: '#3a86ff',
      intro: 'At A2 you understand texts and conversations about familiar topics (work, shopping, family, travel), write short emails and talk about yourself and plan things together.',
      goethe: {
        name: 'Goethe-Zertifikat A2',
        total: 'Written ≈ 90 min (Lesen 30 · Hören 30 · Schreiben 30) · Speaking ≈ 15 min in pairs',
        pass: 'Result out of 100 points – passed with 60 points or more.',
        parts: [
          ['📖', 'Lesen', '30 min', 'Teil 1: newspaper article → a/b/c · Teil 2: store guide / information board → a/b/c · Teil 3: email → a/b/c · Teil 4: adverts → match situations to adverts'],
          ['🎧', 'Hören', '≈ 30 min', 'Teil 1: radio announcements → a/b/c · Teil 2: a conversation → match people/days to things · Teil 3: short dialogues → a/b/c · Teil 4: radio interview → ja/nein'],
          ['✍️', 'Schreiben', '30 min', 'Teil 1: a short SMS/message (20–30 words, 3 points) · Teil 2: an email to a known person or office (30–40 words, 3 points)'],
          ['🗣️', 'Sprechen', '≈ 15 min', 'Teil 1: ask and answer questions with cards · Teil 2: talk about yourself (a topic card with 4 questions) · Teil 3: plan something together (find a time in your diaries)'],
        ],
      },
      telc: {
        name: 'telc Deutsch A2',
        total: 'Written (Hören, Lesen, Schreiben) and an oral exam in pairs (≈ 15 min). Very similar task types: global/detail listening and reading, a short message, talking about yourself and planning together.',
        pass: 'Passed with 60 % of the points.',
        parts: [['ℹ️', 'Tip', '', 'If you live in Germany, many integration courses end with the “Deutsch-Test für Zuwanderer” (DTZ, A2–B1) by telc – its tasks are very close to the A2/B1 tasks you train here.']],
      },
      strategies: [
        ['📖 Lesen', 'Teil 4 (adverts): first read all situations, then the adverts. Cross out each advert you use.'],
        ['🎧 Hören', 'For ja/nein tasks: the speakers often say the opposite word (nicht, kein, nie). Listen for negation!'],
        ['✍️ Schreiben', 'Use connectors: und, aber, denn, deshalb. Always answer all 3 points – missing points cost the most.'],
        ['🗣️ Sprechen', 'Teil 3: say no politely and suggest something else: “Am Montag kann ich leider nicht. Wie wäre es mit Dienstag?”'],
      ],
      official: [['Goethe A2 Übungsmaterialien', 'https://www.goethe.de/de/spr/kup/prf/prf/gzsd2.html'], ['telc Deutsch A2', 'https://www.telc.net/']],
    },
    B1: {
      title: 'B1 – Goethe-Zertifikat B1 / telc Deutsch B1', color: '#9b5de5',
      intro: 'B1 is the level for everyday independence – and often for citizenship, many jobs and training. You understand the main points of clear texts, talk about experiences and opinions, and write emails and short opinion texts.',
      goethe: {
        name: 'Goethe-Zertifikat B1',
        total: 'Four modules: Lesen 65 min · Hören ≈ 40 min · Schreiben 60 min · Sprechen 15 min in pairs (15 min preparation). Modules can be taken together or separately.',
        pass: 'Each module out of 100 points – a module is passed with 60 points. Modules do not balance each other out.',
        parts: [
          ['📖', 'Lesen', '65 min · 30 items', 'Teil 1: a blog/personal text → richtig/falsch · Teil 2: two newspaper texts → a/b/c · Teil 3: adverts → match 7 situations · Teil 4: readers’ opinions → ja/nein (for or against?) · Teil 5: rules/instructions (e.g. house rules) → a/b/c'],
          ['🎧', 'Hören', '≈ 40 min · 30 items', 'Teil 1: short texts (messages, announcements) → richtig/falsch + a/b/c · Teil 2: a talk or guided tour → a/b/c · Teil 3: a conversation → richtig/falsch · Teil 4: a radio discussion → who says what?'],
          ['✍️', 'Schreiben', '60 min', 'Aufgabe 1: private email to a friend (≈ 80 words, 3 points) · Aufgabe 2: opinion post in an online forum (≈ 80 words) · Aufgabe 3: short formal message, e.g. to a teacher or boss (≈ 40 words)'],
          ['🗣️', 'Sprechen', '15 min', 'Teil 1: plan something together with your partner · Teil 2: present a topic (5 parts: topic, experience, situation in your country, pros/cons + opinion, end) · Teil 3: react to your partner’s presentation and answer questions'],
        ],
      },
      telc: {
        name: 'telc Deutsch B1 (Zertifikat Deutsch)',
        total: 'Written ≈ 150 min: Leseverstehen (3 parts) + Sprachbausteine (2 parts) 90 min · Hörverstehen (3 parts) ≈ 30 min · Schriftlicher Ausdruck 30 min (a letter/email with 4 points). Oral in pairs ≈ 15 min (+ 20 min preparation).',
        pass: 'Written exam 225 points, oral exam 75 points – you need 60 % in BOTH (135 written and 45 oral).',
        parts: [
          ['📖', 'Leseverstehen', '', 'Teil 1: match headlines to short texts (global) · Teil 2: a longer article → a/b/c (detail) · Teil 3: adverts → match situations (selective)'],
          ['🧩', 'Sprachbausteine', '', 'Teil 1: a letter with gaps → choose a/b/c (grammar) · Teil 2: a text with gaps → choose words from a list (vocabulary)'],
          ['🎧', 'Hörverstehen', '', 'Teil 1: radio texts → richtig/falsch (global) · Teil 2: interview → richtig/falsch (detail) · Teil 3: short announcements/messages → richtig/falsch (selective)'],
          ['✍️', 'Schriftlicher Ausdruck', '30 min', 'A semi-formal or personal letter/email answering 4 guiding points (Leitpunkte).'],
          ['🗣️', 'Mündlich', '≈ 15 min', 'Teil 1: get to know each other (Kontaktaufnahme) · Teil 2: talk about a topic (a short text/statistic) · Teil 3: plan something together'],
        ],
      },
      strategies: [
        ['⏱️ Time', 'Goethe Lesen: about 10–15 minutes per part. telc: do Sprachbausteine quickly (grammar you know!) to have time for reading.'],
        ['📖 Lesen', 'Teil 4 (Goethe): ask only “Is this person FOR or AGAINST?”. Teil 3 (adverts): one situation has NO advert (0 / x).'],
        ['🎧 Hören', 'Read all questions in the pause before each part. In discussions (Teil 4) write the speaker’s first letter next to each statement.'],
        ['✍️ Schreiben', 'Formula: greeting → 1 sentence intro → each point in 2 sentences → closing → name. Count words. Use 3–4 connectors (weil, deshalb, außerdem, trotzdem).'],
        ['🗣️ Sprechen', 'Planning: make suggestions, react, agree on a plan. Presentation: use the 5-slide structure and Redemittel – practise it 10 times out loud.'],
      ],
      official: [['Goethe B1 Übungsmaterialien', 'https://www.goethe.de/de/spr/kup/prf/prf/gzb1.html'], ['telc Deutsch B1 Übungstest', 'https://www.telc.net/en/language-examinations/certificate-exams/german/zertifikat-deutsch-telc-deutsch-b1/']],
    },
  };

  /* ---------- the 12-week roadmap ----------
     Plan: about 2–3 hours a day, 6 days a week, Sunday = review + rest.
     Items: [type, value, label, minutes]  type: day | grammar | task | words | notes | mock | review | scene | format */
  const W = (o) => o;
  E.weeks = [
    W({ n: 1, level: 'A1', title: 'Hallo Deutsch! Sounds, sein & the present tense', can: ['Greet people and introduce yourself', 'Say where you come from and where you live', 'Use sein and regular verbs in the present', 'Count to 100 and ask W-questions'], themes: ['person', 'numbers'], notes: 1,
      days: [
        [['day', 1, 'Course Day 1: Hallo! sein & introducing yourself', 150]],
        [['day', 2, 'Course Day 2: Verbs, questions & numbers', 150]],
        [['day', 3, 'Course Day 3: Nouns, articles & haben', 150]],
        [['words', 'person', 'Exam words: Person & Familie', 30], ['words', 'numbers', 'Exam words: Zahlen, Zeit & Datum', 30], ['grammar', 'question-words', 'Grammar: question words', 30], ['task', 'a1-sprechen-1', 'Exam: Sprechen Teil 1 – introduce yourself', 30]],
        [['format', 'A1', 'Read: how the A1 exam works', 20], ['task', 'a1-hoeren-1', 'Exam: Hören Teil 1 (dialogues)', 30], ['task', 'a1-schreiben-1', 'Exam: Schreiben Teil 1 (form)', 30], ['notes', 1, 'Notes sheet 1: verbs & sentence order', 20]],
        [['review', 'cards', 'Review your flashcards', 30], ['scene', 'supermarkt', 'Real-life scene: Im Supermarkt', 15], ['task', 'a1-lesen-3', 'Exam: Lesen Teil 3 (signs)', 25]],
      ] }),
    W({ n: 2, level: 'A1', title: 'Family, café & free time: accusative, kein/nicht, vowel change', can: ['Talk about your family (mein, dein …)', 'Order in a café (accusative, möchten)', 'Say what you like doing (gern)', 'Tell the time and talk about the week'], themes: ['food', 'leisure'], notes: 2,
      days: [
        [['day', 4, 'Course Day 4: possessives & saying “no”', 150]],
        [['day', 5, 'Course Day 5: accusative & ordering', 150]],
        [['day', 6, 'Course Day 6: vowel-change verbs & gern', 150]],
        [['day', 7, 'Course Day 7: time, days & Week 1 review', 150]],
        [['words', 'food', 'Exam words: Essen & Trinken', 30], ['words', 'leisure', 'Exam words: Alltag & Freizeit', 30], ['task', 'a1-hoeren-2', 'Exam: Hören Teil 2 (announcements)', 25], ['task', 'a1-sprechen-2', 'Exam: Sprechen Teil 2 (questions with cards)', 30]],
        [['task', 'a1-lesen-1', 'Exam: Lesen Teil 1 (emails)', 25], ['notes', 2, 'Notes sheet 2: articles, cases, kein/nicht', 20], ['scene', 'airport', 'Real-life scene: Am Flughafen', 15], ['review', 'cards', 'Review your flashcards', 30]],
      ] }),
    W({ n: 3, level: 'A1', title: 'Daily routine, modal verbs, imperative & dative', can: ['Describe your day (separable verbs)', 'Say what you can, must and may do', 'Give instructions (imperative)', 'Talk about presents and people (dative)'], themes: ['home', 'shopping'], notes: 3,
      days: [
        [['day', 8, 'Course Day 8: separable verbs & daily routine', 150]],
        [['day', 9, 'Course Day 9: modal verbs', 150]],
        [['day', 10, 'Course Day 10: negation & imperative', 150]],
        [['day', 11, 'Course Day 11: the dative case', 150]],
        [['words', 'home', 'Exam words: Wohnen', 30], ['words', 'shopping', 'Exam words: Einkaufen & Kleidung', 30], ['task', 'a1-hoeren-3', 'Exam: Hören Teil 3 (phone messages)', 25], ['task', 'a1-schreiben-2', 'Exam: Schreiben Teil 2 (message)', 30]],
        [['task', 'a1-lesen-2', 'Exam: Lesen Teil 2 (adverts a/b)', 25], ['task', 'a1-sprechen-3', 'Exam: Sprechen Teil 3 (requests)', 30], ['notes', 3, 'Notes sheet 3: separable verbs, modals, imperative', 20], ['review', 'mistakes', 'Repeat your mistakes', 30]],
      ] }),
    W({ n: 4, level: 'A1', title: 'Prepositions, pronouns – and your A1 mock exam 🏁', can: ['Use prepositions with accusative and dative', 'Give and understand directions in town', 'Use pronouns in all cases', 'Pass an A1 mock exam (60 %+)'], themes: ['city', 'body'], notes: 4, milestone: 'A1',
      days: [
        [['day', 12, 'Course Day 12: prepositions with acc. & dat.', 150]],
        [['day', 13, 'Course Day 13: two-way prepositions & directions', 150]],
        [['day', 14, 'Course Day 14: pronouns & Week 2 review', 150]],
        [['words', 'city', 'Exam words: Stadt & Verkehr', 30], ['words', 'body', 'Exam words: Körper & Gesundheit', 30], ['notes', 4, 'Notes sheet 4: prepositions & dative', 20], ['format', 'A1', 'Re-read the A1 strategies', 15]],
        [['mock', 'A1', '🏁 A1 MOCK EXAM (timed)', 70], ['review', 'mistakes', 'Go through every mistake of the mock', 30]],
        [['task', 'a1-sprechen-1', 'Speaking: introduce yourself again – fluently', 20], ['task', 'a1-schreiben-2', 'Writing: one more message', 25], ['scene', 'restaurant', 'Real-life scene: Im Restaurant', 15], ['review', 'quiz', 'Grammar quiz', 20]],
      ] }),
    W({ n: 5, level: 'A2', title: 'Talking about the past: Perfekt & Präteritum', can: ['Tell what you did (Perfekt with haben and sein)', 'Talk about a trip', 'Use war, hatte, konnte', 'Understand short radio announcements'], themes: ['work', 'travel'], notes: 5,
      days: [
        [['day', 15, 'Course Day 15: Perfekt with haben', 150]],
        [['day', 16, 'Course Day 16: Perfekt with sein', 150]],
        [['day', 17, 'Course Day 17: war, hatte, konnte', 150]],
        [['words', 'work', 'Exam words: Arbeit & Beruf', 30], ['words', 'travel', 'Exam words: Reisen & Urlaub', 30], ['grammar', 'irregular-verbs', 'Grammar: irregular verbs (table)', 30], ['verbs', 0, 'Learn 20 irregular verbs', 30]],
        [['format', 'A2', 'Read: how the A2 exam works', 20], ['task', 'a2-lesen-1', 'Exam: Lesen Teil 1 (article)', 25], ['task', 'a2-hoeren-1', 'Exam: Hören Teil 1 (radio)', 25], ['notes', 5, 'Notes sheet 5: Perfekt', 20]],
        [['task', 'a2-sprechen-2', 'Exam: Sprechen Teil 2 (talk about yourself)', 30], ['scene', 'bahnhof', 'Real-life scene: Am Bahnhof', 15], ['review', 'cards', 'Review your flashcards', 30]],
      ] }),
    W({ n: 6, level: 'A2', title: 'Connecting sentences, health & adjective endings', can: ['Give reasons with weil and denn', 'Use dass, wenn and ob', 'Talk about health (reflexive verbs)', 'Describe things with adjectives'], themes: ['weather', 'media'], notes: 6,
      days: [
        [['day', 18, 'Course Day 18: weil, dass, wenn', 150]],
        [['day', 19, 'Course Day 19: reflexive verbs & health', 150]],
        [['day', 20, 'Course Day 20: adjective endings after der/die/das', 150]],
        [['words', 'weather', 'Exam words: Wetter & Natur', 30], ['words', 'media', 'Exam words: Medien & Kommunikation', 30], ['connectors', 0, 'Learn the connectors (word order!)', 30], ['task', 'a2-schreiben-1', 'Exam: Schreiben Teil 1 (SMS)', 25]],
        [['task', 'a2-lesen-3', 'Exam: Lesen Teil 3 (email)', 25], ['task', 'a2-hoeren-4', 'Exam: Hören Teil 4 (interview ja/nein)', 25], ['notes', 6, 'Notes sheet 6: subordinate clauses', 20], ['scene', 'arzt', 'Real-life scene: Beim Arzt', 15]],
        [['task', 'a2-sprechen-1', 'Exam: Sprechen Teil 1 (question cards)', 25], ['review', 'mistakes', 'Repeat your mistakes', 30], ['review', 'cards', 'Review your flashcards', 30]],
      ] }),
    W({ n: 7, level: 'A2', title: 'Flats, comparing & everyday A2 grammar', can: ['Use adjective endings after ein/kein/mein', 'Compare things (größer, am größten)', 'Use time prepositions correctly', 'Write a short email (30–40 words)'], themes: ['school', 'feelings'], notes: 7,
      days: [
        [['day', 21, 'Course Day 21: adjective endings after ein & without article', 150]],
        [['day', 22, 'Course Day 22: comparing things', 150]],
        [['grammar', 'prepositions-time', 'Grammar: time prepositions', 40], ['grammar', 'modal-particles', 'Grammar: modal particles (doch, mal, ja)', 30], ['words', 'school', 'Exam words: Schule & Lernen', 30], ['task', 'a2-schreiben-2', 'Exam: Schreiben Teil 2 (email)', 30]],
        [['words', 'feelings', 'Exam words: Feste & Gefühle', 30], ['task', 'a2-lesen-4', 'Exam: Lesen Teil 4 (adverts)', 30], ['task', 'a2-sprechen-3', 'Exam: Sprechen Teil 3 (plan together)', 30], ['notes', 7, 'Notes sheet 7: adjective endings', 20]],
        [['scene', 'wohnung', 'Real-life scene: Wohnungsbesichtigung', 15], ['scene', 'kleidung', 'Real-life scene: Kleidung kaufen', 15], ['writing', 0, 'Writing studio: one A2 text with AI feedback', 40]],
        [['review', 'quiz', 'Grammar quiz', 20], ['review', 'cards', 'Review your flashcards', 30], ['verbs', 0, 'Irregular verbs: next 20', 30]],
      ] }),
    W({ n: 8, level: 'A2', title: 'A2 exam week 🏁', can: ['Know every A2 task type', 'Manage your time in the exam', 'Pass an A2 mock exam (60 %+)', 'Speak for 1–2 minutes about yourself'], themes: [], notes: 8, milestone: 'A2',
      days: [
        [['format', 'A2', 'Re-read the A2 formats & strategies', 20], ['task', 'a2-lesen-1', 'Lesen Teil 1 again – timed', 15], ['task', 'a2-lesen-4', 'Lesen Teil 4 again – timed', 15], ['task', 'a2-hoeren-1', 'Hören Teil 1 again', 20]],
        [['task', 'a2-schreiben-1', 'Schreiben Teil 1 – new attempt', 20], ['task', 'a2-schreiben-2', 'Schreiben Teil 2 – new attempt', 25], ['redemittel', 0, 'Useful phrases for writing & speaking', 30]],
        [['mock', 'A2', '🏁 A2 MOCK EXAM (timed)', 90], ['review', 'mistakes', 'Go through every mistake', 30]],
        [['task', 'a2-sprechen-2', 'Speaking: talk about yourself (record it!)', 25], ['task', 'a2-sprechen-3', 'Speaking: plan together', 25], ['notes', 8, 'Notes sheet 8: comparison & A2 exam checklist', 20]],
        [['scene', 'bank', 'Real-life scene: Konto eröffnen', 15], ['scene', 'post', 'Real-life scene: Auf der Post', 15], ['review', 'quiz', 'Grammar quiz', 20]],
        [['review', 'cards', 'Big flashcard review', 40], ['words', 'person', 'Repeat 2 word topics you find hard', 30]],
      ] }),
    W({ n: 9, level: 'B1', title: 'Genitive, verbs with prepositions & da-/wo-words', can: ['Use the genitive and n-declension', 'Use 40 verbs with their prepositions', 'Ask with wo- and answer with da-', 'Read longer newspaper texts'], themes: ['society', 'officialdom'], notes: 9,
      days: [
        [['day', 23, 'Course Day 23: genitive & n-declension', 150]],
        [['day', 24, 'Course Day 24: verbs with prepositions', 150]],
        [['prepverbs', 0, 'Learn 20 verbs with prepositions', 30], ['words', 'society', 'Exam words: Gesellschaft & Umwelt', 30], ['format', 'B1', 'Read: how the B1 exams work (Goethe & telc)', 30]],
        [['task', 'b1-lesen-1', 'Exam: Lesen Teil 1 (blog)', 25], ['task', 'b1-lesen-2', 'Exam: Lesen Teil 2 (article)', 30], ['notes', 9, 'Notes sheet 9: genitive & verbs with prepositions', 20]],
        [['words', 'officialdom', 'Exam words: Behörden, Bank & Verträge', 30], ['task', 'b1-hoeren-1', 'Exam: Hören Teil 1', 25], ['task', 'b1-schreiben-1', 'Exam: Schreiben Aufgabe 1 (email 80 words)', 40]],
        [['scene', 'behoerde', 'Real-life scene: Ausländerbehörde', 15], ['prepverbs', 0, 'Next 20 verbs with prepositions', 30], ['review', 'cards', 'Review your flashcards', 30]],
      ] }),
    W({ n: 10, level: 'B1', title: 'Stories, wishes & relative clauses', can: ['Tell stories in the Präteritum & Plusquamperfekt', 'Talk about wishes and give advice (Konjunktiv II)', 'Describe people and things with relative clauses', 'Write an opinion text'], themes: ['jobb1', 'opinion'], notes: 10,
      days: [
        [['day', 25, 'Course Day 25: Präteritum, Plusquamperfekt & future', 150]],
        [['day', 26, 'Course Day 26: Konjunktiv II', 150]],
        [['day', 27, 'Course Day 27: relative clauses', 150]],
        [['words', 'jobb1', 'Exam words: Bewerbung & Arbeitswelt', 30], ['task', 'b1-lesen-3', 'Exam: Lesen Teil 3 (adverts)', 30], ['task', 'b1-schreiben-2', 'Exam: Schreiben Aufgabe 2 (forum opinion)', 40]],
        [['words', 'opinion', 'Exam words: Meinung & Diskussion', 30], ['task', 'b1-lesen-4', 'Exam: Lesen Teil 4 (opinions)', 25], ['task', 'b1-hoeren-3', 'Exam: Hören Teil 3 (conversation)', 25], ['notes', 10, 'Notes sheet 10: past tenses, Konjunktiv II, relative clauses', 20]],
        [['task', 'b1-sprechen-1', 'Exam: Sprechen Teil 1 (plan together)', 30], ['scene', 'interview', 'Real-life scene: Vorstellungsgespräch', 15], ['review', 'mistakes', 'Repeat your mistakes', 30]],
      ] }),
    W({ n: 11, level: 'B1', title: 'Passive, zu-infinitive – and B1 writing & speaking intensive', can: ['Use the passive (wird gemacht)', 'Use zu + infinitive, um … zu, lassen', 'Give a 3-minute presentation', 'Write all three Goethe B1 texts and the telc letter'], themes: [], notes: 11,
      days: [
        [['day', 28, 'Course Day 28: the passive', 150]],
        [['day', 29, 'Course Day 29: zu-infinitives, lassen & word order', 150]],
        [['day', 30, 'Course Day 30: the big review', 150]],
        [['task', 'b1-schreiben-3', 'Exam: Schreiben Aufgabe 3 (formal message)', 25], ['task', 'telc-b1-schreiben', 'telc: Schriftlicher Ausdruck (letter, 4 points)', 35], ['redemittel', 0, 'Useful phrases for B1 writing', 30], ['notes', 11, 'Notes sheet 11: passive & infinitive', 20]],
        [['task', 'b1-sprechen-2', 'Exam: Sprechen Teil 2 – prepare your presentation', 45], ['task', 'b1-sprechen-3', 'Exam: Sprechen Teil 3 (feedback & questions)', 20], ['task', 'telc-b1-sprechen-2', 'telc: Gespräch über ein Thema', 25]],
        [['task', 'telc-b1-sprachbausteine-1', 'telc: Sprachbausteine Teil 1', 20], ['task', 'telc-b1-sprachbausteine-2', 'telc: Sprachbausteine Teil 2', 20], ['task', 'b1-lesen-5', 'Exam: Lesen Teil 5 (rules)', 20], ['task', 'b1-hoeren-4', 'Exam: Hören Teil 4 (discussion)', 25]],
      ] }),
    W({ n: 12, level: 'B1', title: 'B1 exam week – you are ready! 🎓', can: ['Pass a B1 mock exam in every module', 'Manage time: 65 · 40 · 60 · 15 minutes', 'Present a topic without notes', 'Know what to bring on exam day'], themes: [], notes: 12, milestone: 'B1',
      days: [
        [['mock', 'B1', '🏁 B1 MOCK EXAM – Lesen & Hören', 105], ['review', 'mistakes', 'Check every mistake', 30]],
        [['task', 'b1-schreiben-1', 'Writing: email (timed 20 min)', 25], ['task', 'b1-schreiben-2', 'Writing: forum post (timed 25 min)', 30], ['task', 'b1-schreiben-3', 'Writing: formal message (timed 15 min)', 20]],
        [['task', 'b1-sprechen-2', 'Speaking: presentation – record yourself 3 times', 40], ['task', 'b1-sprechen-1', 'Speaking: planning – with a partner if you can', 25], ['redemittel', 0, 'Phrases for speaking', 20]],
        [['mock', 'telc-B1', '🏁 telc B1 MOCK (Lesen, Sprachbausteine, Hören)', 90], ['notes', 12, 'Notes sheet 12: exam-day checklist', 15]],
        [['format', 'B1', 'Re-read all strategies', 20], ['prepverbs', 0, 'Last round: verbs with prepositions', 25], ['connectors', 0, 'Last round: connectors', 20], ['review', 'quiz', 'Grammar quiz', 20]],
        [['review', 'cards', 'Light review only – rest, sleep well, you are ready! 💪', 30]],
      ] }),
  ];

  /* ---------- notes sheets (Merkzettel) – short, printable ---------- */
  const T = (rows, head) => `<table class="xm-tbl">${head ? `<tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr>` : ''}${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
  E.notes = [
    { n: 1, title: 'Verbs & sentence order', html: `<h4>Present tense endings (regular)</h4>${T([['ich', 'mach<b>e</b>', 'I make'], ['du', 'mach<b>st</b>', 'you make'], ['er/sie/es', 'mach<b>t</b>', 'he/she/it makes'], ['wir', 'mach<b>en</b>', 'we make'], ['ihr', 'mach<b>t</b>', 'you (pl.) make'], ['sie/Sie', 'mach<b>en</b>', 'they/you (formal) make']])}
      <h4>sein & haben – learn by heart</h4>${T([['ich bin', 'ich habe'], ['du bist', 'du hast'], ['er ist', 'er hat'], ['wir sind', 'wir haben'], ['ihr seid', 'ihr habt'], ['sie sind', 'sie haben']], ['sein (to be)', 'haben (to have)'])}
      <h4>The golden rule: the verb is in position 2</h4><p>Ich <b>wohne</b> in Berlin. · Heute <b>wohne</b> ich in Berlin. · Wo <b>wohnst</b> du? – Yes/no question: verb first: <b>Wohnst</b> du in Berlin?</p>` },
    { n: 2, title: 'Articles, cases, kein & nicht', html: `<h4>Articles: nominative & accusative</h4>${T([['der', 'den', 'ein / einen', 'kein / keinen'], ['die', 'die', 'eine / eine', 'keine / keine'], ['das', 'das', 'ein / ein', 'kein / kein'], ['die (pl.)', 'die', '– / –', 'keine / keine']], ['Nom.', 'Akk.', 'ein (N/A)', 'kein (N/A)'])}
      <p>Only <b>masculine</b> changes in the accusative: der → <b>den</b>, ein → <b>einen</b>. Ich habe <b>einen</b> Bruder. Ich trinke <b>den</b> Kaffee.</p>
      <h4>kein or nicht?</h4><p><b>kein</b> = no / not a (before nouns with ein or no article): Ich habe <b>kein</b> Auto. · <b>nicht</b> = not (everything else): Ich komme <b>nicht</b>. Das ist <b>nicht</b> mein Auto.</p>
      <h4>Possessives</h4><p>mein (my) · dein (your) · sein (his) · ihr (her/their) · unser (our) · euer (your pl.) · Ihr (your formal) – endings like <b>ein</b>: mein<b>e</b> Mutter, mein<b>en</b> Vater (Akk.).</p>` },
    { n: 3, title: 'Separable verbs, modal verbs, imperative', html: `<h4>Separable verbs: prefix goes to the END</h4><p>aufstehen → Ich <b>stehe</b> um 7 Uhr <b>auf</b>. · einkaufen → Wir <b>kaufen</b> heute <b>ein</b>. Common prefixes: an-, auf-, aus-, ein-, mit-, vor-, zu-, fern-.</p>
      <h4>Modal verbs: modal in position 2, infinitive at the END</h4>${T([['können', 'can', 'ich kann'], ['müssen', 'must / have to', 'ich muss'], ['dürfen', 'may / be allowed', 'ich darf'], ['wollen', 'want', 'ich will'], ['sollen', 'should', 'ich soll'], ['möchten', 'would like', 'ich möchte']])}<p>Ich <b>muss</b> heute <b>arbeiten</b>. · <b>Kannst</b> du mir <b>helfen</b>?</p>
      <h4>Imperative</h4><p>du: <b>Komm!</b> (no -st, no du) · ihr: <b>Kommt!</b> · Sie: <b>Kommen Sie!</b> – with bitte: Hilf mir bitte!</p>` },
    { n: 4, title: 'Dative & prepositions', html: `<h4>Dative articles</h4>${T([['der → dem', 'ein → einem', 'mein → meinem'], ['die → der', 'eine → einer', 'meine → meiner'], ['das → dem', 'ein → einem', 'mein → meinem'], ['die (pl.) → den + -n', '– ', 'meinen Kindern']])}
      <h4>Prepositions</h4>${T([['+ Akkusativ', 'durch, für, gegen, ohne, um'], ['+ Dativ', 'aus, bei, mit, nach, seit, von, zu'], ['two-way (Wo? = Dat. · Wohin? = Akk.)', 'an, auf, hinter, in, neben, über, unter, vor, zwischen']])}
      <p>Wo bist du? – Ich bin <b>im</b> (in dem) Park. · Wohin gehst du? – Ich gehe <b>in den</b> Park.</p><p>Short forms: im, am, zum, zur, beim, vom, ins.</p>` },
    { n: 5, title: 'The Perfekt (spoken past)', html: `<h4>Form: haben/sein (position 2) + Partizip II (END)</h4><p>Ich <b>habe</b> Pizza <b>gegessen</b>. · Wir <b>sind</b> nach Hamburg <b>gefahren</b>.</p>
      <h4>sein or haben?</h4><p><b>sein</b> with movement from A to B (gehen, fahren, fliegen, kommen) and change of state (aufstehen, einschlafen, werden) + sein, bleiben, passieren. Everything else: <b>haben</b>.</p>
      <h4>Partizip II</h4>${T([['regular', 'ge…t', 'machen → gemacht'], ['irregular', 'ge…en', 'schreiben → geschrieben'], ['separable', 'prefix + ge…', 'einkaufen → eingekauft'], ['be-, ver-, er-, -ieren', 'no ge-', 'besuchen → besucht, studieren → studiert']])}` },
    { n: 6, title: 'Connecting sentences', html: `<h4>Three groups of connectors</h4>${T([['und, aber, oder, denn, sondern', 'position 0 – normal order', 'Ich bleibe zu Hause, <b>denn</b> ich bin krank.'], ['deshalb, trotzdem, dann, außerdem, sonst', 'position 1 – verb comes next', 'Ich bin krank, <b>deshalb bleibe</b> ich zu Hause.'], ['weil, dass, wenn, ob, als, obwohl', 'subordinate clause – verb at the END', 'Ich bleibe zu Hause, <b>weil</b> ich krank <b>bin</b>.']], ['connector', 'word order', 'example'])}
      <h4>Präteritum you need from A2</h4><p>war (was) · hatte (had) · konnte (could) · musste (had to) · wollte (wanted) · durfte (was allowed) – ich/er war, du warst, wir/sie waren.</p>` },
    { n: 7, title: 'Adjective endings', html: `<h4>After der/die/das (definite)</h4>${T([['der neu<b>e</b> Tisch', 'den neu<b>en</b> Tisch', 'dem neu<b>en</b> Tisch'], ['die neu<b>e</b> Lampe', 'die neu<b>e</b> Lampe', 'der neu<b>en</b> Lampe'], ['das neu<b>e</b> Sofa', 'das neu<b>e</b> Sofa', 'dem neu<b>en</b> Sofa'], ['die neu<b>en</b> Stühle', 'die neu<b>en</b> Stühle', 'den neu<b>en</b> Stühlen']], ['Nom.', 'Akk.', 'Dat.'])}<p>Rule: <b>-e</b> in the five “easy” places (Nom. sing. + Akk. fem./neut.), everywhere else <b>-en</b>.</p>
      <h4>After ein/kein/mein</h4><p>The adjective shows the gender when the article can’t: ein neu<b>er</b> Tisch · ein neu<b>es</b> Sofa · eine neu<b>e</b> Lampe – otherwise mostly <b>-en</b>.</p>
      <h4>Without article</h4><p>The adjective takes the article’s ending: kalt<b>er</b> Kaffee, kalt<b>e</b> Milch, kalt<b>es</b> Wasser.</p>` },
    { n: 8, title: 'Comparing & the A2 exam checklist', html: `<h4>Comparison</h4><p>klein – klein<b>er</b> – am klein<b>sten</b> · alt – <b>ä</b>lter – am <b>ä</b>ltesten · gut – <b>besser</b> – am <b>besten</b> · viel – <b>mehr</b> – am <b>meisten</b> · gern – <b>lieber</b> – am <b>liebsten</b>.</p><p>Berlin ist größer <b>als</b> Hamburg. · Hamburg ist <b>so</b> schön <b>wie</b> Berlin.</p>
      <h4>A2 exam checklist</h4><ul><li>✅ All 3 points in every writing task</li><li>✅ Greeting and ending in every message</li><li>✅ Connectors: und, aber, denn, deshalb, weil</li><li>✅ Speaking: ask back – “Und du?”, “Was meinst du?”</li><li>✅ Bring your passport/ID and the invitation letter</li></ul>` },
    { n: 9, title: 'Genitive & verbs with prepositions', html: `<h4>Genitive (whose?)</h4><p>des Mann<b>es</b>, des Kind<b>es</b>, der Frau, der Kinder – <i>das Auto <b>meines Vaters</b></i>. Prepositions with genitive: wegen, trotz, während, statt (spoken often with dative).</p>
      <h4>n-declension</h4><p>Some masculine nouns add <b>-(e)n</b> in all cases except nominative: der Kollege → den/dem/des Kolleg<b>en</b>; also Student, Junge, Mensch, Nachbar, Herr (→ Herrn).</p>
      <h4>Verbs with prepositions – learn them as a unit</h4><p>warten <b>auf</b> + Akk · sich freuen <b>auf</b> + Akk (future) / <b>über</b> + Akk (now) · denken <b>an</b> + Akk · sich interessieren <b>für</b> · Angst haben <b>vor</b> + Dat · teilnehmen <b>an</b> + Dat</p>
      <h4>da- and wo-</h4><p>Things: <b>Worauf</b> wartest du? – Ich warte <b>darauf</b>. · People: <b>Auf wen</b> wartest du? – <b>Auf ihn</b>.</p>` },
    { n: 10, title: 'Past tenses, Konjunktiv II & relative clauses', html: `<h4>Präteritum (written past)</h4><p>regular: mach<b>te</b> · irregular: ging, kam, sah, fuhr, schrieb, nahm – ich/er ging, du gingst, wir/sie gingen.</p>
      <h4>Plusquamperfekt (before the past)</h4><p><b>hatte/war</b> + Partizip II: Nachdem ich gegessen <b>hatte</b>, ging ich los.</p>
      <h4>Konjunktiv II (wishes, polite, advice)</h4><p><b>würde</b> + infinitive: Ich würde gern reisen. · wäre, hätte, könnte, müsste, sollte: Wenn ich Zeit <b>hätte</b>, <b>würde</b> ich mehr lernen. · Du <b>solltest</b> mehr schlafen.</p>
      <h4>Relative pronouns</h4>${T([['der', 'den', 'dem', 'dessen'], ['die', 'die', 'der', 'deren'], ['das', 'das', 'dem', 'dessen'], ['die (pl.)', 'die', 'denen', 'deren']], ['Nom.', 'Akk.', 'Dat.', 'Gen.'])}<p>Der Mann, <b>der</b> dort steht, ist mein Lehrer. · Die Frau, <b>der</b> ich helfe … (verb at the END)</p>` },
    { n: 11, title: 'Passive, zu-infinitive, lassen', html: `<h4>Passive: werden + Partizip II</h4>${T([['present', 'Das Haus <b>wird gebaut</b>.'], ['Präteritum', 'Das Haus <b>wurde gebaut</b>.'], ['Perfekt', 'Das Haus <b>ist gebaut worden</b>.'], ['with modal', 'Das Haus <b>muss gebaut werden</b>.']])}<p>Who did it? <b>von</b> + Dat: Das Buch wurde <b>von</b> Goethe geschrieben.</p>
      <h4>zu + infinitive</h4><p>Ich habe keine Lust, heute <b>zu</b> arbeiten. · Es ist wichtig, Deutsch <b>zu</b> lernen. · separable: an<b>zu</b>rufen. · <b>um … zu</b> (in order to): Ich lerne, <b>um</b> in Deutschland <b>zu</b> arbeiten.</p>
      <h4>lassen</h4><p>Ich <b>lasse</b> mein Auto <b>reparieren</b>. (I have my car repaired.) · Lass mich das machen!</p>` },
    { n: 12, title: 'B1 exam day', html: `<h4>The day before</h4><ul><li>📄 Passport / ID + invitation (with room and times)</li><li>✏️ Pens (ink/blue), watch without internet (phones are switched off)</li><li>😴 Sleep! No new material the evening before</li></ul>
      <h4>Writing formula (Goethe & telc)</h4><ol><li>Greeting: Liebe/Lieber … / Sehr geehrte Damen und Herren,</li><li>1 sentence why you write</li><li>Every point = 2 sentences (+ a connector)</li><li>Closing sentence: Ich freue mich auf deine Antwort.</li><li>Viele Grüße / Mit freundlichen Grüßen + name</li></ol>
      <h4>Speaking</h4><ul><li>Planning: suggest – react – agree (“Gut, dann machen wir es so.”)</li><li>Presentation: 5 parts, 3 minutes, look at your partner</li><li>If you don’t understand: “Könnten Sie das bitte wiederholen?” – this is allowed!</li></ul>
      <h4>Results</h4><p>Goethe: each module needs 60/100. telc: 60 % written AND 60 % oral. Results usually arrive after a few weeks.</p>` },
  ];
})();
