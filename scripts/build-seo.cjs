#!/usr/bin/env node
/* Builds static, crawlable SEO pages from the course data (no JavaScript needed to read them):
     /grammar, /grammar/<topic>     – every grammar topic A1–B1
     /lessons, /lessons/day-<n>      – the 30 lessons (goals, words, dialogue, recap)
     /vocabulary, /vocabulary/<topic> – exam word lists by topic
     /reading, /reading/<text>       – graded reading texts with questions
   and sitemap.xml. Run:  node scripts/build-seo.cjs   (re-run after changing content). */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..'), SITE = 'https://german-30.vercel.app';
const TODAY = new Date().toISOString().slice(0, 10);

/* ---------- load the course data ---------- */
const ctx = { console, GL: { days: [], grammar: {}, scenarios: [], reading: [] } };
ctx.window = ctx; vm.createContext(ctx);
for (const f of ['grammar.js', 'grammar2.js', 'grammar-extra.js', 'week1.js', 'week2.js', 'week3.js', 'week4.js', 'exam-words.js', 'reading.js', 'reading2.js'])
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/data', f), 'utf8'), ctx, { filename: f });
const G = ctx.GL;

/* ---------- helpers ---------- */
const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (s) => String(s || '').replace(/<[^>]+>/g, '').replace(/\{\{([^|}]+)\|[^}]*\}\}/g, '$1').replace(/\[\[([^\]]+)\]\]/g, '$1').replace(/\s+/g, ' ').trim();
const clip = (s, n) => { s = strip(s); return s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)).replace(/[,;:–-]$/, '') + '…'; };
const slug = (s) => String(s).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const rich = (html) => String(html)
  .replace(/\{\{([^|}]+)\|([^}]*)\}\}/g, (_, de, en) => `<div class="ex"><span class="ex-de" lang="de">${de}</span><span class="ex-en">${en}</span></div>`)
  .replace(/\[\[([^\]]+)\]\]/g, (_, de) => `<b lang="de">${de}</b>`);
const LV = { A1: 'A1 – beginner', A2: 'A2 – elementary', B1: 'B1 – intermediate' };
const levelOf = (l) => String(l || '').slice(0, 2);
const pages = []; // for the sitemap

function write(rel, html) {
  const file = path.join(ROOT, rel + (rel.endsWith('/') || rel === '' ? 'index.html' : '.html'));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function layout({ url, title, desc, h1, kicker, lead, body, crumbs, jsonld = [], lang = 'en', cta }) {
  const canonical = SITE + url;
  const bc = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ name: 'Home', url: '/' }, ...crumbs].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: SITE + c.url })) };
  const ld = [bc, ...jsonld].map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n  ');
  pages.push({ url, pr: crumbs.length === 1 ? '0.8' : '0.6' });
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Deutsch30">
  <meta property="og:title" content="${esc(title.replace(/ \| Deutsch30$/, ''))}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE}/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#1f2a48">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Crect width='30' height='10' fill='%23222'/%3E%3Crect y='10' width='30' height='10' fill='%23dd0000'/%3E%3Crect y='20' width='30' height='10' fill='%23ffce00'/%3E%3C/svg%3E">
  <link rel="apple-touch-icon" href="/icon-192.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@400;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/landing.css">
  ${ld}
</head>
<body>
  <header class="lp-top">
    <a class="lp-logo" href="/"><span class="lp-flag" aria-hidden="true"><i></i><i></i><i></i></span><span>Deutsch<b>30</b></span></a>
    <nav aria-label="Main">
      <a href="/lessons">Lessons</a>
      <a href="/grammar">Grammar</a>
      <a href="/vocabulary">Vocabulary</a>
      <a href="/reading">Reading</a>
      <a class="lp-cta" href="/#/day/1">Start free</a>
    </nav>
  </header>
  <main class="lp-wrap">
    <nav class="lp-crumbs" aria-label="Breadcrumb"><a href="/">Home</a>${crumbs.map((c, i) => i === crumbs.length - 1 ? ` › <span>${esc(c.name)}</span>` : ` › <a href="${c.url}">${esc(c.name)}</a>`).join('')}</nav>
    <section class="lp-hero lp-hero-sm">
      ${kicker ? `<span class="lp-kicker">${kicker}</span>` : ''}
      <h1>${h1}</h1>
      ${lead ? `<p class="lp-lead">${lead}</p>` : ''}
      ${cta ? `<div class="lp-btns">${cta}</div>` : ''}
    </section>
${body}
    <section class="lp-band"><h2>Practise this in the free course</h2><p>Audio for every word, speaking practice with your microphone, exercises with instant feedback and Goethe &amp; telc exam practice – free, no sign-up.</p><a class="lp-btn primary" href="/#/day/1">Start Day 1 free →</a></section>
  </main>
  <footer class="lp-foot">
    <div class="cols">
      <div><b>Learn German</b><a href="/">Free German course</a><a href="/lessons">30 lessons A1–B1</a><a href="/grammar">German grammar A–Z</a><a href="/vocabulary">German vocabulary lists</a><a href="/reading">German reading texts</a></div>
      <div><b>Exams</b><a href="/goethe-telc-exam-preparation">Goethe &amp; telc exam prep</a><a href="/#/exam">A1 · A2 · B1 practice tests</a><a href="/#/myplan">Personal study plan</a></div>
      <div><b>Guides</b><a href="/learn-german-pakistan">Learn German in Pakistan</a><a href="/german-in-urdu">German in Urdu</a><a href="/german-for-work-in-germany">German for jobs in Germany</a><a href="/deutsch-lernen">Deutsch lernen kostenlos</a></div>
    </div>
    <small>Deutsch30 is a free, independent learning website. Goethe-Zertifikat and telc are trademarks of their owners; this site is not affiliated with them.</small>
  </footer>
</body>
</html>
`;
}
const course = (name, desc, level) => ({ '@context': 'https://schema.org', '@type': 'LearningResource', name, description: desc, inLanguage: 'de', educationalLevel: level ? `CEFR ${level}` : 'CEFR A1–B1', learningResourceType: 'lesson', isAccessibleForFree: true, provider: { '@type': 'EducationalOrganization', name: 'Deutsch30', url: SITE + '/' } });

/* ================= GRAMMAR ================= */
const GR = Object.entries(G.grammar).map(([id, g]) => ({ id, ...g, lv: levelOf(g.level) }));
const gUrl = (id) => `/grammar/${slug(id)}`;
for (const g of GR) {
  const same = GR.filter((x) => x.lv === g.lv && x.id !== g.id).slice(0, 6);
  const i = GR.indexOf(g), prev = GR[i - 1], next = GR[i + 1];
  const t = strip(g.title);
  const desc = clip(`German grammar ${g.lv}: ${t}. ${g.summary || ''} Clear explanation with tables and examples, plus free exercises.`, 158);
  write(gUrl(g.id).slice(1), layout({
    url: gUrl(g.id), crumbs: [{ name: 'Grammar', url: '/grammar' }, { name: t, url: gUrl(g.id) }],
    title: `${clip(t, 40)} – German ${g.lv} | Deutsch30`, desc,
    kicker: `German grammar · ${LV[g.lv] || g.lv}${g.day ? ` · Day ${g.day}` : ''}`, h1: esc(t),
    lead: `${g.de ? `<span lang="de">${esc(g.de)}</span> – ` : ''}${esc(strip(g.summary || ''))}`,
    cta: `<a class="lp-btn primary" href="/#/grammar/${encodeURIComponent(g.id)}">🔊 Open with audio &amp; exercises</a>${g.day ? `<a class="lp-btn" href="/lessons/day-${g.day}">Lesson day ${g.day}</a>` : ''}`,
    body: `    <article class="lp-gram">${rich(g.html)}</article>
    <nav class="lp-pn">${prev ? `<a href="${gUrl(prev.id)}">← ${esc(strip(prev.title))}</a>` : '<span></span>'}${next ? `<a href="${gUrl(next.id)}">${esc(strip(next.title))} →</a>` : ''}</nav>
    <h2>More ${g.lv} grammar</h2>
    <div class="lp-grid">${same.map((x) => `<a class="lp-card lp-link" href="${gUrl(x.id)}"><h3>${esc(strip(x.title))}</h3><p>${esc(clip(x.summary, 90))}</p></a>`).join('')}</div>`,
    jsonld: [course(t, desc, g.lv)],
  }));
}
write('grammar/', layout({
  url: '/grammar', crumbs: [{ name: 'Grammar', url: '/grammar' }],
  title: 'German Grammar A–Z: All Topics A1 to B1, Explained | Deutsch30',
  desc: `All ${GR.length} German grammar topics from A1 to B1 in simple English: articles, cases, verbs, word order, Perfekt, adjective endings, passive – with tables and examples.`,
  kicker: 'German grammar A1 → B1', h1: 'German grammar A–Z – every topic, simply explained',
  lead: `${GR.length} topics in the order you need them: from <i>ich bin</i> and der/die/das to relative clauses, Konjunktiv II and the passive. Each topic has tables, example sentences and links to free exercises.`,
  cta: '<a class="lp-btn primary" href="/#/grammar">Open the interactive grammar</a><a class="lp-btn" href="/lessons">30-day lessons</a>',
  body: ['A1', 'A2', 'B1'].map((l) => `    <h2>${LV[l]}</h2>\n    <div class="lp-grid">${GR.filter((g) => g.lv === l).map((g) => `<a class="lp-card lp-link" href="${gUrl(g.id)}"><h3>${esc(strip(g.title))}</h3><p>${esc(clip(g.summary, 90))}</p></a>`).join('')}</div>`).join('\n'),
}));

/* ================= LESSONS ================= */
const gTitle = (id) => (G.grammar[id] ? strip(G.grammar[id].title) : id);
for (const d of G.days) {
  const lv = levelOf(d.level), t = strip(d.title);
  const desc = clip(`German lesson day ${d.day} (${d.level}): ${t}. ${d.vocab.length} words with examples, grammar, a dialogue and exercises – free online.`, 158);
  const dl = (d.dialogues || [])[0];
  write(`lessons/day-${d.day}`, layout({
    url: `/lessons/day-${d.day}`, crumbs: [{ name: 'Lessons', url: '/lessons' }, { name: `Day ${d.day}`, url: `/lessons/day-${d.day}` }],
    title: `German Lesson ${d.day}: ${clip(t, 34)} | Deutsch30`, desc,
    kicker: `Lesson ${d.day} of 30 · ${d.level}`, h1: `Day ${d.day}: ${esc(t)}`, lead: esc(strip(d.subtitle || '')),
    cta: `<a class="lp-btn primary" href="/#/day/${d.day}">▶ Start this lesson (with audio)</a>`,
    body: `    <h2>What you learn today</h2>
    <ul class="lp-goals">${(d.goals || []).map((g) => `<li>${strip(g) === g ? esc(g) : g}</li>`).join('')}</ul>
    ${(d.grammar || []).length ? `<h2>Grammar</h2><div class="lp-grid">${d.grammar.map((id) => G.grammar[id] ? `<a class="lp-card lp-link" href="${gUrl(id)}"><h3>${esc(gTitle(id))}</h3><p>${esc(clip(G.grammar[id].summary, 90))}</p></a>` : '').join('')}</div>` : ''}
    <h2>Vocabulary (${d.vocab.length} words)</h2>
    <div class="lp-tablewrap"><table class="lp-table"><thead><tr><th>German</th><th>English</th><th>Example</th></tr></thead><tbody>
${d.vocab.map((v) => `      <tr><td lang="de"><b>${esc(v[0])}</b>${v[1] ? ` <small>${esc(v[1])}</small>` : ''}</td><td>${esc(v[2])}</td><td><span lang="de">${esc(v[3] || '')}</span>${v[4] ? `<br><small>${esc(v[4])}</small>` : ''}</td></tr>`).join('\n')}
    </tbody></table></div>
    ${dl ? `<h2>Dialogue: ${esc(strip(dl.title))}</h2><p class="lp-muted">${esc(dl.setting || '')}</p><div class="lp-dialog">${dl.lines.map((l) => `<p><b>${esc(l[0].charAt(0).toUpperCase() + l[0].slice(1))}:</b> <span lang="de">${esc(l[1])}</span><br><small>${esc(l[2] || '')}</small></p>`).join('')}</div>` : ''}
    ${(d.recap || []).length ? `<h2>Summary</h2><ul class="lp-goals">${d.recap.map((r) => `<li>${esc(strip(r))}</li>`).join('')}</ul>` : ''}
    ${d.culture ? `<div class="lp-note"><b>🇩🇪 Culture tip:</b> ${d.culture}</div>` : ''}
    <nav class="lp-pn">${d.day > 1 ? `<a href="/lessons/day-${d.day - 1}">← Day ${d.day - 1}</a>` : '<span></span>'}${d.day < G.days.length ? `<a href="/lessons/day-${d.day + 1}">Day ${d.day + 1} →</a>` : ''}</nav>`,
    jsonld: [course(`German lesson day ${d.day}: ${t}`, desc, lv)],
  }));
}
write('lessons/', layout({
  url: '/lessons', crumbs: [{ name: 'Lessons', url: '/lessons' }],
  title: 'Learn German in 30 Days: Free Lessons A1 to B1 | Deutsch30',
  desc: 'A free 30-day German course for beginners: one lesson a day with vocabulary, grammar, dialogues and exercises – from your first “Hallo” to B1 level.',
  kicker: '30-day German course', h1: 'Learn German in 30 days – free lessons from A1 to B1',
  lead: 'Every day has new words with examples, a grammar topic, a dialogue with the characters, exercises, speaking and writing. Read the overview here, then learn with audio in the app.',
  cta: '<a class="lp-btn primary" href="/#/day/1">Start Day 1</a><a class="lp-btn" href="/#/plan">See the interactive plan</a>',
  body: [[1, 1, 7], [2, 8, 14], [3, 15, 21], [4, 22, 99]].map(([w, a, z]) => `    <h2>Week ${w}</h2>\n    <div class="lp-grid">${G.days.filter((d) => d.day >= a && d.day <= z).map((d) => `<a class="lp-card lp-link" href="/lessons/day-${d.day}"><small class="lp-muted">Day ${d.day} · ${esc(d.level)}</small><h3>${esc(strip(d.title))}</h3><p>${esc(clip(d.subtitle, 90))}</p></a>`).join('')}</div>`).join('\n'),
}));

/* ================= VOCABULARY ================= */
const TH = Object.entries(G.exam.words.themes).map(([k, th]) => ({ k, ...th }));
for (const th of TH) {
  const en = th.words.slice(0, 4).map((w) => w[2]).join(', ');
  const desc = clip(`${th.words.length} German words for “${th.title}” (${th.level}) with article, plural and English – ${en} … Free list for Goethe and telc exams.`, 158);
  write(`vocabulary/${th.k}`, layout({
    url: `/vocabulary/${th.k}`, crumbs: [{ name: 'Vocabulary', url: '/vocabulary' }, { name: th.title, url: `/vocabulary/${th.k}` }],
    title: `German Words: ${th.title} (${th.level}) – List | Deutsch30`, desc,
    kicker: `German vocabulary · ${th.level}`, h1: `${th.icon || ''} German words: ${esc(th.title)}`,
    lead: `${th.words.length} important words for this topic with article, plural and English meaning – the words you need for everyday life and the A1–B1 exams.`,
    cta: `<a class="lp-btn primary" href="/#/exam/words/${th.k}">🔊 Learn them with audio</a><a class="lp-btn" href="/#/trainer">Vocabulary trainer</a>`,
    body: `    <div class="lp-tablewrap"><table class="lp-table"><thead><tr><th>German</th><th>Plural</th><th>English</th></tr></thead><tbody>
${th.words.map((w) => { const g = (/^(der|die|das)\s/.exec(w[0]) || [])[1]; return `      <tr><td lang="de"${g ? ` class="g-${g}"` : ''}><b>${esc(w[0])}</b></td><td lang="de">${esc(w[1] || '–')}</td><td>${esc(w[2])}</td></tr>`; }).join('\n')}
    </tbody></table></div>
    <div class="lp-note"><b>Tip:</b> always learn a noun together with its article – <span class="g-der">der</span> (masculine), <span class="g-die">die</span> (feminine), <span class="g-das">das</span> (neuter). The plural article is always <span class="g-die">die</span>.</div>
    <h2>More word lists</h2>
    <div class="lp-grid">${TH.filter((x) => x.k !== th.k).slice(0, 8).map((x) => `<a class="lp-card lp-link" href="/vocabulary/${x.k}"><h3>${x.icon || ''} ${esc(x.title)}</h3><p>${x.words.length} words · ${x.level}</p></a>`).join('')}</div>`,
    jsonld: [course(`German vocabulary: ${th.title}`, desc, th.level)],
  }));
}
write('vocabulary/', layout({
  url: '/vocabulary', crumbs: [{ name: 'Vocabulary', url: '/vocabulary' }],
  title: 'German Vocabulary Lists by Topic (A1–B1) | Deutsch30',
  desc: `${TH.reduce((a, t) => a + t.words.length, 0)} essential German words in ${TH.length} topics – family, food, home, work, health, travel and more – with article, plural and English. Free.`,
  kicker: 'German vocabulary A1 → B1', h1: 'German vocabulary lists by topic',
  lead: 'The most important words for everyday life in Germany and for the Goethe and telc exams, sorted by topic, with article, plural and English.',
  cta: '<a class="lp-btn primary" href="/#/exam/words">Learn with audio</a><a class="lp-btn" href="/#/games">Play word games</a>',
  body: `    <div class="lp-grid">${TH.map((x) => `<a class="lp-card lp-link" href="/vocabulary/${x.k}"><span class="lp-ico">${x.icon || '📚'}</span><h3>${esc(x.title)}</h3><p>${x.words.length} words · ${x.level}</p></a>`).join('')}</div>`,
}));

/* ================= READING ================= */
const RD = G.reading;
for (const r of RD) {
  const t = strip(r.title);
  const desc = clip(`German reading text ${r.level}: “${t}” (${r.en}). Read it with a word list and answer 5 questions – free practice for beginners.`, 158);
  const paras = r.text.split(/\n\s*\n/).map((p) => `<p lang="de">${esc(p).replace(/\n/g, '<br>')}</p>`).join('\n      ');
  write(`reading/${r.id}`, layout({
    url: `/reading/${r.id}`, crumbs: [{ name: 'Reading', url: '/reading' }, { name: t, url: `/reading/${r.id}` }],
    title: `${clip(t, 34)} – German Reading ${r.level} | Deutsch30`, desc,
    kicker: `German reading · ${r.level} · ${r.minutes || 4} min`, h1: `${r.icon || ''} ${esc(t)}`, lead: esc(r.en),
    cta: `<a class="lp-btn primary" href="/#/read/${r.id}">🔊 Read with audio &amp; tap-to-translate</a>`,
    body: `    <article class="lp-card lp-text">
      ${paras}
    </article>
    <h2>Word list</h2>
    <div class="lp-tablewrap"><table class="lp-table"><tbody>${(r.words || []).map(([de, en]) => `<tr><td lang="de"><b>${esc(de)}</b></td><td>${esc(en)}</td></tr>`).join('')}</tbody></table></div>
    <h2>Questions</h2>
    <ol class="lp-qs">${r.q.map((q) => `<li><b>${esc(q.q)}</b><ul>${q.o.map((o) => `<li>${esc(o)}</li>`).join('')}</ul><details><summary>Show answer</summary><p>✅ ${esc(q.o[q.a])}${q.ex ? ` – ${esc(q.ex)}` : ''}</p></details></li>`).join('')}</ol>
    ${r.task ? `<div class="lp-note"><b>Your turn:</b> ${esc(r.task)}</div>` : ''}
    <h2>More ${r.level} texts</h2>
    <div class="lp-grid">${RD.filter((x) => x.level === r.level && x.id !== r.id).slice(0, 6).map((x) => `<a class="lp-card lp-link" href="/reading/${x.id}"><h3>${x.icon || ''} ${esc(strip(x.title))}</h3><p>${esc(x.en)}</p></a>`).join('')}</div>`,
    jsonld: [course(`German reading: ${t}`, desc, r.level)],
  }));
}
write('reading/', layout({
  url: '/reading', crumbs: [{ name: 'Reading', url: '/reading' }],
  title: 'German Reading Texts for Beginners A1, A2, B1 | Deutsch30',
  desc: `${RD.length} free German reading texts for beginners – stories, e-mails, chats, adverts and news about life in Germany, with word lists and questions (A1–B1).`,
  kicker: 'German reading practice', h1: 'German reading texts for beginners – A1, A2 and B1',
  lead: 'Short texts about everyday life in Germany with a word list and comprehension questions. In the app you can tap any word for its meaning and listen to the text.',
  cta: '<a class="lp-btn primary" href="/#/read">Open the reading room</a>',
  body: ['A1', 'A2', 'B1'].map((l) => `    <h2>${LV[l]}</h2>\n    <div class="lp-grid">${RD.filter((r) => r.level === l).map((r) => `<a class="lp-card lp-link" href="/reading/${r.id}"><span class="lp-ico">${r.icon || '📖'}</span><h3>${esc(strip(r.title))}</h3><p>${esc(r.en)}</p></a>`).join('')}</div>`).join('\n'),
}));

/* ================= SITEMAP ================= */
const top = [['/', '1.0'], ['/learn-german-pakistan', '0.9'], ['/deutsch-lernen', '0.9'], ['/goethe-telc-exam-preparation', '0.9'], ['/german-in-urdu', '0.8'], ['/german-for-work-in-germany', '0.8']];
const all = [...top.map(([url, pr]) => ({ url, pr })), ...pages.filter((p) => p.pr === '0.8'), ...pages.filter((p) => p.pr !== '0.8')];
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map((p) => `  <url><loc>${SITE}${p.url}</loc><lastmod>${TODAY}</lastmod><priority>${p.pr}</priority></url>`).join('\n')}
</urlset>
`);
console.log(`grammar ${GR.length} · lessons ${G.days.length} · vocabulary ${TH.length} · reading ${RD.length} · sitemap ${all.length} URLs`);
