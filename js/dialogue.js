/* Animated dialogue scenes with role-play. */
(function () {
  'use strict';
  const { $, $$, esc, attr, Speech, Rec, speechScore } = GL;

  const DECO = {
    cafe: ['☕', '🥐', '🍰'], indoor: ['🖼️', '🪴', '💡'], street: ['🏢', '🚲', '🌳'], shop: ['🍎', '🥖', '🧀'],
    doctor: ['🩺', '💊', '📋'], station: ['🚆', '🕒', '🧳'], park: ['🌳', '☀️', '🌼'], home: ['🛋️', '🪴', '🖼️'],
  };
  const POS = [['8%', '12%'], ['78%', '10%'], ['46%', '6%']];

  function render(root, dlg) {
    const scene = dlg.scene || 'park';
    const stageCls = { cafe: 'cafe', indoor: 'indoor', home: 'indoor', street: 'street', shop: 'shop', doctor: 'doctor', station: 'station' }[scene] || '';
    const deco = (DECO[scene] || DECO.park).map((d, i) => `<span class="deco" style="left:${POS[i][0]};top:${POS[i][1]}">${d}</span>`).join('');
    let token = 0;
    let idx = 0;
    let role = '';

    root.innerHTML = `
      <div class="scene-info">
        <h3>🎬 ${esc(dlg.title)}</h3>
        <p class="muted">${esc(dlg.setting || '')}</p>
      </div>
      <div class="stage ${stageCls}">${deco}
        ${dlg.cast.map((c) => `<div class="actor" data-c="${c}">${GL.charSVG(c, 'idle')}<span class="nm">${esc(GL.chars[c].name)}</span></div>`).join('')}
      </div>
      <div class="row" style="margin-top:14px">
        <button class="btn green" id="dPlay">▶ Play dialogue</button>
        <button class="btn ghost" id="dStep">⏭ Next line</button>
        <button class="btn ghost" id="dStop">⏹ Stop</button>
        <button class="btn ghost" id="dAll">📜 Show all text</button>
        <span class="spacer"></span>
        <label class="row" style="gap:6px;font-weight:800">🎭 Role-play as
          <select id="dRole"><option value="">– just listen –</option>${dlg.cast.map((c) => `<option value="${c}">${esc(GL.chars[c].name)}</option>`).join('')}</select>
        </label>
      </div>
      <div class="lines" id="dLines">
        ${dlg.lines.map((l, i) => {
          const right = dlg.cast.indexOf(l[0]) % 2 === 1;
          return `<div class="ln pending ${right ? 'right' : ''}" data-i="${i}">
            <div class="av">${GL.charSVG(l[0])}</div>
            <div class="bub" data-i="${i}"><div class="ln-who">${esc(GL.chars[l[0]].name)}</div><div class="ln-de">${l[1]}</div><div class="ln-en">${esc(l[2] || '')}</div></div>
          </div>`;
        }).join('')}
      </div>
      <div id="dTurn"></div>
      <p class="muted" style="margin-top:12px">💡 <b>Shadowing:</b> play each line, pause, and repeat it out loud with the same melody. Then role-play: pick a character and speak their lines yourself.</p>`;

    const actors = {};
    $$('.actor', root).forEach((a) => (actors[a.dataset.c] = a));
    const lines = $$('.ln', root);

    function setSpeaking(c) {
      Object.entries(actors).forEach(([k, a]) => {
        a.classList.toggle('speaking', k === c);
        a.classList.toggle('dim', !!c && k !== c);
      });
    }
    function reveal(i) {
      lines.forEach((l) => l.classList.remove('now'));
      const l = lines[i];
      l.classList.remove('pending');
      l.classList.add('now');
      l.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    async function playLine(i, my) {
      const [c, de] = dlg.lines[i];
      reveal(i);
      setSpeaking(c);
      const svg = $('svg.char', actors[c]);
      if (role && c === role) {
        await yourTurn(i, my);
      } else {
        // Keep a natural reading pace even when no German voice is available.
        const t0 = Date.now();
        await GL.charSay(svg, GL.stripTags(de), c);
        const rest = 600 + GL.stripTags(de).length * 45 - (Date.now() - t0);
        if (rest > 0 && my === token) await GL.sleep(rest);
      }
      if (my === token) setSpeaking(null);
    }
    function yourTurn(i, my) {
      const box = $('#dTurn', root);
      const de = GL.stripTags(dlg.lines[i][1]);
      return new Promise((resolve) => {
        box.innerHTML = `<div class="your-turn">
          <b>🎤 Your turn!</b> Say: <span class="ln-de">${esc(de)}</span>
          <div class="row" style="margin-top:10px">
            ${Rec.supported ? '<button class="btn rec" id="tMic">🎤 Speak</button>' : '<span class="muted">Say it out loud, then continue. (Speech recognition works in Chrome/Edge.)</span>'}
            <button class="btn ghost small" id="tHear">🔊 Hint</button>
            <button class="btn green small" id="tGo">Continue ➜</button>
          </div><div id="tRes"></div></div>`;
        const done = () => { box.innerHTML = ''; resolve(); };
        $('#tGo', box).onclick = done;
        $('#tHear', box).onclick = () => Speech.speak(de, { char: dlg.lines[i][0] });
        const mic = $('#tMic', box);
        if (mic) mic.onclick = async () => {
          mic.classList.add('listening'); mic.textContent = '👂 Listening…';
          try {
            const alts = await Rec.listen();
            const best = alts.map((a) => ({ a, s: speechScore(de, a) })).sort((x, y) => y.s.score - x.s.score)[0];
            $('#tRes', box).innerHTML = scoreHTML(best.s, best.a);
            if (best.s.score >= 70) { GL.Store.addXP(3); setTimeout(() => { if (my === token) done(); }, 1400); }
          } catch (e) {
            $('#tRes', box).innerHTML = `<p class="muted">${micError(e)}</p>`;
          }
          mic.classList.remove('listening'); mic.textContent = '🎤 Try again';
        };
      });
    }

    async function playFrom(start) {
      const my = ++token;
      for (let i = start; i < dlg.lines.length; i++) {
        if (my !== token) return;
        idx = i + 1;
        await playLine(i, my);
        if (my !== token) return;
        await GL.sleep(350);
      }
      if (my === token) setSpeaking(null);
    }
    function stop() { token++; Speech.stop(); Rec.stop(); setSpeaking(null); $('#dTurn', root).innerHTML = ''; }

    $('#dPlay', root).onclick = () => { stop(); lines.forEach((l) => l.classList.add('pending')); idx = 0; playFrom(0); };
    $('#dStep', root).onclick = () => { stop(); if (idx >= dlg.lines.length) idx = 0; const my = ++token; const i = idx++; playLine(i, my); };
    $('#dStop', root).onclick = stop;
    $('#dAll', root).onclick = () => lines.forEach((l) => l.classList.remove('pending'));
    $('#dRole', root).onchange = (e) => { role = e.target.value; GL.toast(role ? `You are ${GL.chars[role].name}. Press ▶ Play!` : 'Listening mode'); };
    $('#dLines', root).onclick = (e) => {
      const b = e.target.closest('.bub');
      if (!b) return;
      stop();
      const i = +b.dataset.i;
      const my = ++token;
      const [c, de] = dlg.lines[i];
      setSpeaking(c);
      lines.forEach((l) => l.classList.remove('now'));
      lines[i].classList.add('now');
      GL.charSay($('svg.char', actors[c]), GL.stripTags(de), c).then(() => { if (my === token) setSpeaking(null); });
    };
    return { stop };
  }

  function scoreHTML(s, heard) {
    const cls = s.score >= 80 ? '' : s.score >= 50 ? 'mid' : 'low';
    const msg = s.score >= 90 ? 'Ausgezeichnet!' : s.score >= 70 ? 'Sehr gut!' : s.score >= 50 ? 'Fast! Try again.' : 'Listen again and repeat slowly.';
    return `<div class="heard"><span class="score-badge ${cls}">${s.score}%</span> <b>${msg}</b><br>
      ${s.words.map((w) => `<span class="${w.hit ? 'w-ok' : 'w-miss'}">${esc(w.w)}</span>`).join(' ')}
      <br><small class="muted">I heard: “${esc(heard)}”</small></div>`;
  }
  function micError(e) {
    const m = e && e.message;
    if (m === 'not-allowed' || m === 'service-not-allowed') return '🎙️ Microphone access was blocked. Allow the microphone for this site in your browser settings.';
    if (m === 'no-speech') return 'I didn’t hear anything – try again and speak a bit louder.';
    if (m === 'network') return 'Speech recognition needs an internet connection in this browser.';
    if (m === 'unsupported') return 'Speech recognition is not supported in this browser – try Chrome or Edge. You can still practise out loud!';
    return 'Could not recognise speech (' + esc(m) + '). Try again.';
  }

  GL.Dialogue = { render, scoreHTML, micError };
})();
