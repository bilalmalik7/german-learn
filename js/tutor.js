/* Bruno, the AI tutor (claude.ai viewer only) + the Talk page with a speaking drill that works everywhere. */
(function () {
  'use strict';
  const { $, $$, esc, attr, shuffle, Store, Speech, Rec, AI, speechScore } = GL;

  const levelOfDay = (n) => (n <= 7 ? 'A1' : n <= 14 ? 'A1' : n <= 21 ? 'A2' : 'B1');

  /* Ask Claude to correct a German text. Resolves the parsed JSON. */
  async function aiCorrect({ task, taskEn, text, level }) {
    const sample = await AI.get();
    if (!sample) throw { code: 'not_granted' };
    const prompt = `You are a precise and encouraging German teacher. A learner at CEFR level ${level} answered this task:
Task: "${task}"${taskEn ? ` (${taskEn})` : ''}

Learner's text:
"""
${String(text).slice(0, 4000)}
"""

Find every mistake in grammar, spelling, word order, gender, case, verb form, adjective endings and word choice. Keep the learner's meaning and style; do not rewrite sentences that are already correct. Ignore missing punctuation at the very end.
Reply with only a JSON object in exactly this shape:
{"score": <0-100 grammar accuracy>, "corrected": "<the full corrected text>", "mistakes": [{"wrong": "<wrong words>", "right": "<corrected words>", "why": "<short English explanation naming the rule>"}], "good": "<one English sentence on what was done well>", "next": "<one concrete English tip on what to practise next>"}
If the text has no mistakes, "mistakes" is [] and "corrected" repeats the text.`;
    const r = await sample.json(prompt, { modelTier: 'default' });
    if (!r || typeof r !== 'object') throw { code: 'invalid_json' };
    r.mistakes = Array.isArray(r.mistakes) ? r.mistakes.filter((m) => m && m.wrong != null) : [];
    return r;
  }

  function correctionHTML(r) {
    const score = Math.max(0, Math.min(100, Math.round(+r.score || 0)));
    const cls = score >= 85 ? '' : score >= 60 ? 'mid' : 'low';
    return `<div class="ai-box">
      <div class="row"><span class="ai-badge">✨ Bruno’s correction</span><span class="score-badge ${cls}">${score}/100</span>
        ${r.mistakes.length ? `<span class="muted">${r.mistakes.length} mistake${r.mistakes.length > 1 ? 's' : ''}</span>` : '<span class="muted">No mistakes – perfekt!</span>'}</div>
      ${r.mistakes.length ? `<ul class="mistake-list">${r.mistakes.map((m) => `<li><span class="m-wrong">${esc(m.wrong)}</span> → <span class="m-right">${esc(m.right)}</span><small>${esc(m.why || '')}</small></li>`).join('')}</ul>` : ''}
      ${r.corrected ? `<div class="ai-corrected"><b>Corrected version</b> <button class="btn tiny ghost" data-say="${attr(r.corrected)}">🔊 Listen</button><p>${esc(r.corrected)}</p></div>` : ''}
      ${r.good ? `<p>👍 ${esc(r.good)}</p>` : ''}
      ${r.next ? `<p>🎯 ${esc(r.next)}</p>` : ''}
    </div>`;
  }

  /* Button + result area that corrects whatever getText() returns. Shown only where the AI tutor is available. */
  function mountCorrector(slot, getText, ctx) {
    AI.get().then((sample) => {
      if (!sample || !slot.isConnected) return;
      slot.innerHTML = `<button class="btn purple" type="button">✨ Check my German with Bruno (AI)</button><div class="ai-out"></div>`;
      const btn = $('button', slot), out = $('.ai-out', slot);
      btn.onclick = async () => {
        const text = (getText() || '').trim();
        if (text.split(/\s+/).length < 2) { out.innerHTML = '<p class="muted">Write at least one full sentence first.</p>'; return; }
        btn.disabled = true;
        out.innerHTML = `<div class="ai-thinking">${GL.charSVG('bruno', 'idle talking')}<span>Bruno is reading your text<span class="dots"></span></span></div>`;
        try {
          const r = await aiCorrect(Object.assign({ text }, ctx));
          out.innerHTML = correctionHTML(r);
          Store.addXP(10);
          GL.sfx(r.mistakes.length ? 'pop' : 'done');
        } catch (e) {
          out.innerHTML = `<p class="muted">${esc(AI.errorText(e))}</p>`;
          if (AI.disabled) slot.innerHTML = '';
        }
        btn.disabled = false;
      };
    });
  }

  /* "Ask Bruno" box for grammar topics. */
  function mountAsk(slot, topic) {
    AI.get().then((sample) => {
      if (!sample || !slot.isConnected) return;
      slot.innerHTML = `<div class="ai-ask"><h3>💬 Ask Bruno about “${esc(topic.title)}”</h3>
        <p class="muted">Anything unclear? Ask in English or German – Bruno answers with examples.</p>
        <div class="row"><input class="txt-in" id="askIn" placeholder="e.g. Why is it „mit dem“ and not „mit den“?" style="flex:1;min-width:0"><button class="btn purple" id="askBtn">Ask</button></div>
        <div class="ai-answer" id="askOut"></div></div>`;
      const inp = $('#askIn', slot), out = $('#askOut', slot), btn = $('#askBtn', slot);
      let ctl = null;
      const go = async () => {
        const q = inp.value.trim();
        if (!q) { inp.focus(); return; }
        ctl && ctl.abort();
        ctl = new AbortController();
        btn.disabled = true;
        out.innerHTML = '<p class="muted">Bruno is thinking<span class="dots"></span></p>';
        const lesson = GL.stripTags(topic.html).replace(/\{\{|\}\}|\[\[|\]\]/g, '').replace(/\s+/g, ' ').slice(0, 3500);
        try {
          await sample(`You are Bruno, a friendly German tutor in a beginner course. The learner is studying "${topic.title}" (${topic.level}).
Lesson summary: ${lesson}

Answer the learner's question in simple English (under 170 words). Include 2–4 short German example sentences, each followed by its English translation in brackets. Use plain text, no markdown tables.
Question: ${q}`, { signal: ctl.signal, onText: ({ text }) => { out.innerHTML = `<div class="ai-box"><p style="white-space:pre-line">${esc(text)}</p></div>`; } });
        } catch (e) {
          const msg = AI.errorText(e);
          if (msg) out.innerHTML = (e.text ? `<div class="ai-box"><p style="white-space:pre-line">${esc(e.text)}</p></div>` : '') + `<p class="muted">${esc(msg)}</p>`;
          if (AI.disabled) slot.innerHTML = '';
        }
        btn.disabled = false;
      };
      btn.onclick = go;
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
    });
  }

  /* ---------- Talk page ---------- */
  function micButton(target) {
    if (!Rec.supported) return null;
    const b = document.createElement('button');
    b.className = 'btn rec'; b.type = 'button'; b.textContent = '🎤'; b.title = 'Speak instead of typing';
    b.onclick = async () => {
      b.classList.add('listening'); b.textContent = '👂';
      try { const alts = await Rec.listen(); target.value = (target.value ? target.value + ' ' : '') + alts[0]; target.dispatchEvent(new Event('input')); }
      catch (e) { GL.toast(GL.Dialogue.micError(e)); }
      b.classList.remove('listening'); b.textContent = '🎤';
    };
    return b;
  }

  function drill(root) {
    const st = (Store.state.trainer.talk = Store.state.trainer.talk || { level: 'A1' });
    let level = st.level, list = [], i = 0;
    const load = () => { list = shuffle(GL.talkQuestions.filter((q) => level === 'all' || q[0] === level)); i = 0; };
    load();
    const draw = () => {
      const q = list[i % list.length];
      const char = ['lena', 'max', 'sofia', 'bruno', 'weber', 'yilmaz'][i % 6];
      root.innerHTML = `
        <div class="chips" style="margin-bottom:14px">${['A1', 'A2', 'B1', 'all'].map((l) => `<button class="chip ${l === level ? 'on' : ''}" data-l="${l}">${l === 'all' ? 'All levels' : l}</button>`).join('')}
          <span class="spacer"></span><span class="pill">${(i % list.length) + 1} / ${list.length}</span></div>
        ${GL.charBubble(char, esc(q[1]), esc(q[2]), { wave: true })}
        <label class="muted" for="tAns">Answer out loud in a full sentence${Rec.supported ? ' (🎤) or type it' : ', then type it'}:</label>
        <div class="row" style="margin-top:6px;align-items:stretch"><textarea class="txt-in" id="tAns" rows="2" style="flex:1;min-width:0" placeholder="Ich …"></textarea></div>
        <div class="row" style="margin-top:10px"><button class="btn ghost" id="tModel">👀 Model answer</button><span id="tAi"></span><span class="spacer"></span><button class="btn" id="tNext">Next question ➜</button></div>
        <div id="tModelBox" class="hidden" style="margin-top:12px"><div class="ex"><button class="say-btn" data-say="${attr(q[3])}">🔊</button><span class="ex-de">${esc(q[3])}</span><span class="ex-en">Say it aloud, then adapt it to your own life.</span></div></div>
        <div id="tAiOut"></div>`;
      const ta = $('#tAns', root);
      const mic = micButton(ta);
      if (mic) ta.parentNode.appendChild(mic);
      setTimeout(() => { const svg = $('.char-bubble svg', root); GL.charSay(svg, q[1], char); }, 250);
      $('#tModel', root).onclick = () => $('#tModelBox', root).classList.toggle('hidden');
      $('#tNext', root).onclick = () => { i++; Store.addXP(2); draw(); };
      $$('.chips [data-l]', root).forEach((b) => (b.onclick = () => { level = b.dataset.l; st.level = level; Store.save(); load(); draw(); }));
      const slot = $('#tAi', root);
      mountCorrector(slot, () => ta.value, { task: q[1], taskEn: q[2], level: q[0] });
      // keep the corrector's output below the buttons
      const obs = new MutationObserver(() => { const o = $('.ai-out', slot); if (o) { $('#tAiOut', root).appendChild(o); obs.disconnect(); } });
      obs.observe(slot, { childList: true });
    };
    draw();
  }

  function chat(root, sc) {
    const c = GL.chars[sc.char];
    const formal = /Sie/.test(sc.setting);
    const rules = `You are role-playing as ${c.name} (${c.role}) in a German speaking-practice app. Scenario: ${sc.setting}
The learner's level is CEFR ${sc.level}.
Rules:
- Stay in character. "reply" is ONLY German at ${sc.level} level: 1–3 short sentences, everyday words, and usually end with a question so the conversation continues.
- ${formal ? 'Address the learner with "Sie".' : 'Address the learner with "du".'}
- Check the learner's LAST message for mistakes in grammar, spelling, word order, gender, case, verb forms, adjective endings and word choice. Be accurate and kind. Ignore capitalisation of the first word and final punctuation.
Reply with only a JSON object in exactly this shape:
{"reply": "<German>", "reply_en": "<English translation of reply>", "corrected": "<learner's last message corrected, identical if correct>", "mistakes": [{"wrong": "...", "right": "...", "why": "<short English rule>"}], "praise": "<very short English encouragement>"}
The conversation starts with your line: "${sc.opener}"`;
    const turns = [{ role: 'user', content: rules }, { role: 'assistant', content: sc.opener }];
    let ctl = null, busy = false, count = 0;

    root.innerHTML = `<p><a href="#/talk" id="cBack">← All scenarios</a></p>
      <div class="chat-head">${GL.charSVG(sc.char, 'idle')}<div><span class="level ${sc.level}">${sc.level}</span><h2 style="margin:.2em 0">${esc(sc.de)}</h2><p class="muted" style="margin:0">${esc(sc.setting)}</p></div></div>
      <div class="chat" id="chatLog"></div>
      <div class="chat-input">
        <textarea class="txt-in" id="cIn" rows="2" placeholder="Antworte auf Deutsch … (Enter to send)"></textarea>
        <div class="row" style="gap:8px"><button class="btn green" id="cSend">Send ➜</button><button class="btn ghost small" id="cEnd">🏁 Finish & get feedback</button></div>
      </div>
      <div class="umlauts" id="cUml">${['ä', 'ö', 'ü', 'ß'].map((x) => `<button type="button" data-ch="${x}" tabindex="-1">${x}</button>`).join('')}</div>
      <div id="cSummary"></div>`;
    const log = $('#chatLog', root), inp = $('#cIn', root), head = $('.chat-head svg', root);
    const mic = micButton(inp);
    if (mic) $('.chat-input .row', root).prepend(mic);
    $('#cUml', root).onmousedown = (e) => e.preventDefault();
    $('#cUml', root).onclick = (e) => { const u = e.target.closest('[data-ch]'); if (!u) return; const s = inp.selectionStart ?? inp.value.length; inp.value = inp.value.slice(0, s) + u.dataset.ch + inp.value.slice(s); inp.focus(); inp.setSelectionRange(s + 1, s + 1); };

    const addBot = (de, en) => {
      const el = document.createElement('div');
      el.className = 'msg bot';
      el.innerHTML = `<div class="av">${GL.charSVG(sc.char)}</div><div class="bub"><div class="ln-de">${esc(de)}</div>${en ? `<div class="ln-en">${esc(en)}</div>` : ''}<button class="btn tiny ghost" data-say="${attr(de)}" data-char="${sc.char}">🔊</button></div>`;
      log.appendChild(el); el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      GL.charSay(head, de, sc.char);
      return el;
    };
    const addMe = (text) => {
      const el = document.createElement('div');
      el.className = 'msg me';
      el.innerHTML = `<div class="bub"><div class="ln-de">${esc(text)}</div><div class="fix"></div></div>`;
      log.appendChild(el); el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return el;
    };
    addBot(sc.opener, '');

    const send = async () => {
      const text = inp.value.trim();
      if (!text || busy) return;
      const sample = await AI.get();
      if (!sample) return;
      busy = true; inp.value = ''; count++;
      const me = addMe(text);
      turns.push({ role: 'user', content: text });
      const wait = document.createElement('div');
      wait.className = 'msg bot'; wait.innerHTML = `<div class="av">${GL.charSVG(sc.char)}</div><div class="bub typing"><span></span><span></span><span></span></div>`;
      log.appendChild(wait); wait.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      ctl = new AbortController();
      try {
        const keep = turns.length > 22 ? [turns[0], turns[1], ...turns.slice(-20)] : turns;
        const r = await sample.json(keep, { cache: false, signal: ctl.signal });
        wait.remove();
        const reply = String((r && r.reply) || '').trim() || '…';
        const mistakes = Array.isArray(r && r.mistakes) ? r.mistakes.filter((m) => m && m.wrong) : [];
        $('.fix', me).innerHTML = mistakes.length
          ? `<div class="fix-box">✏️ <b>${esc(r.corrected || '')}</b>${mistakes.map((m) => `<small><span class="m-wrong">${esc(m.wrong)}</span> → <span class="m-right">${esc(m.right)}</span> – ${esc(m.why || '')}</small>`).join('')}</div>`
          : `<div class="fix-box ok">✔ ${esc((r && r.praise) || 'Perfekt!')}</div>`;
        GL.sfx(mistakes.length ? 'pop' : 'ok');
        turns.push({ role: 'assistant', content: reply });
        addBot(reply, r && r.reply_en);
        Store.addXP(mistakes.length ? 3 : 5);
      } catch (e) {
        wait.remove();
        turns.pop();
        const msg = AI.errorText(e);
        if (msg) $('.fix', me).innerHTML = `<div class="fix-box">${esc(msg)}</div>`;
        inp.value = text;
      }
      busy = false;
      inp.focus();
    };
    $('#cSend', root).onclick = send;
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
    $('#cEnd', root).onclick = async () => {
      const out = $('#cSummary', root);
      if (count < 2) { out.innerHTML = '<p class="muted">Send at least two messages first.</p>'; return; }
      const sample = await AI.get();
      if (!sample) return;
      out.innerHTML = '<p class="muted">Bruno is preparing your feedback<span class="dots"></span></p>';
      const transcript = turns.slice(1).map((t) => (t.role === 'user' ? 'Learner: ' : c.name + ': ') + t.content).join('\n');
      try {
        const r = await sample.json(`You are a German teacher. Here is a practice conversation of a CEFR ${sc.level} learner:\n${transcript.slice(-6000)}\n\nGive feedback on the LEARNER's German only. Reply with only JSON: {"score": <0-100>, "strengths": ["<English>", "<English>"], "focus": [{"topic": "<grammar topic>", "example_wrong": "<from the learner>", "example_right": "<corrected>"}], "phrases": ["<useful German phrase for this situation>", "<another>", "<another>"]}`);
        out.innerHTML = `<div class="ai-box"><div class="row"><span class="ai-badge">🏁 Conversation feedback</span><span class="score-badge ${r.score >= 85 ? '' : r.score >= 60 ? 'mid' : 'low'}">${Math.round(+r.score || 0)}/100</span></div>
          ${(r.strengths || []).length ? `<p><b>Strengths</b></p><ul>${r.strengths.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
          ${(r.focus || []).length ? `<p><b>Practise next</b></p><ul class="mistake-list">${r.focus.map((f) => `<li><b>${esc(f.topic)}</b>${f.example_wrong ? `<small><span class="m-wrong">${esc(f.example_wrong)}</span> → <span class="m-right">${esc(f.example_right || '')}</span></small>` : ''}</li>`).join('')}</ul>` : ''}
          ${(r.phrases || []).length ? `<p><b>Useful phrases</b></p>${r.phrases.map((p) => `<div class="ex"><button class="say-btn" data-say="${attr(p)}">🔊</button><span class="ex-de">${esc(p)}</span><span class="ex-en"></span></div>`).join('')}` : ''}</div>`;
        Store.addXP(15); GL.confetti(70); GL.sfx('done');
      } catch (e) { out.innerHTML = `<p class="muted">${esc(AI.errorText(e))}</p>`; }
    };
    return () => ctl && ctl.abort();
  }

  GL.viewTalk = function (sub) {
    return {
      html: `<h1>💬 Sprechen – Talk</h1>
        <p class="muted">Grammar becomes automatic only when you use it. Answer real questions out loud, and – where available – have a full conversation with the characters while Bruno corrects every sentence.</p>
        <div id="aiSection"></div>
        <div class="card"><h2>🗣️ Speaking drill: ${GL.talkQuestions.length} everyday questions</h2>
          <p class="muted">The character asks, you answer aloud in a full sentence, then compare with the model answer. Do 10 a day.</p>
          <div id="drillRoot"></div></div>`,
      mount() {
        drill($('#drillRoot'));
        const ai = $('#aiSection');
        AI.get().then((sample) => {
          if (!ai.isConnected) return;
          if (!sample) {
            ai.innerHTML = `<div class="note">The AI conversation partner and automatic corrections are available when you open this course on claude.ai. The speaking drill below works everywhere.</div>`;
            return;
          }
          const sc = sub && GL.talkScenarios.find((x) => x.id === sub);
          if (sc) {
            ai.innerHTML = '<div class="card" id="chatRoot"></div>';
            const stop = chat($('#chatRoot'), sc);
            const my = location.hash;
            const iv = setInterval(() => { if (location.hash !== my) { stop(); clearInterval(iv); } }, 500);
            $('#drillRoot').closest('.card').classList.add('hidden');
            return;
          }
          ai.innerHTML = `<div class="card"><h2>🤖 Conversation with the characters <span class="ai-badge">AI</span></h2>
            <p class="muted">Pick a situation. Type (or speak) your answers in German – the character replies, and every message you send is corrected with a short explanation.</p>
            <div class="grid grid-3">${GL.talkScenarios.map((s) => `<a class="topic-card scen" href="#/talk/${s.id}"><div class="row" style="gap:10px;align-items:center">${GL.charSVG(s.char, 'idle')}<div style="min-width:0"><span class="level ${s.level}">${s.level}</span><b>${esc(s.de)}</b><small>${esc(s.title)} · with ${esc(GL.chars[s.char].name)}</small></div></div></a>`).join('')}</div></div>`;
        });
      },
    };
  };

  GL.Tutor = { aiCorrect, correctionHTML, mountCorrector, mountAsk, levelOfDay };
})();
