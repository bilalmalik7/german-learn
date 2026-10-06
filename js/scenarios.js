/* Real-life scenarios: animated multi-scene stories where you (Alex) speak at the key moments. */
(function () {
  'use strict';
  const { $, $$, esc, attr, shuffle, Store, Speech, Rec, speechScore } = GL;

  /* ---------- illustrated, animated backgrounds (viewBox 800×400) ---------- */
  const floor = (c1, c2) => `<rect y="300" width="800" height="100" fill="${c1}"/><rect y="300" width="800" height="6" fill="${c2}"/>`;
  const sign = (x, y, w, txt, bg = '#1d3557', fg = '#fff') => `<g><rect x="${x}" y="${y}" width="${w}" height="34" rx="6" fill="${bg}"/><text x="${x + w / 2}" y="${y + 23}" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-size="18" font-weight="600" fill="${fg}">${txt}</text></g>`;
  const plant = (x) => `<g><rect x="${x}" y="262" width="34" height="40" rx="4" fill="#b5651d"/><circle cx="${x + 10}" cy="250" r="18" fill="#2a9d8f"/><circle cx="${x + 26}" cy="244" r="16" fill="#3fb5a3"/><circle cx="${x + 17}" cy="230" r="15" fill="#2a9d8f"/></g>`;
  const clock = (x, y) => `<g><circle cx="${x}" cy="${y}" r="22" fill="#fff" stroke="#333" stroke-width="3"/><line x1="${x}" y1="${y}" x2="${x}" y2="${y - 13}" stroke="#333" stroke-width="3" stroke-linecap="round"/><line class="tick" x1="${x}" y1="${y}" x2="${x + 15}" y2="${y}" stroke="#e63946" stroke-width="2" stroke-linecap="round" style="transform-origin:${x}px ${y}px"/></g>`;
  const board = (x, y, rows) => `<g><rect x="${x}" y="${y}" width="250" height="${30 + rows.length * 22}" rx="6" fill="#1d2433"/>
    <text x="${x + 12}" y="${y + 20}" font-family="monospace" font-size="12" fill="#8d99ae">FLUG   ZIEL       ZEIT  GATE</text>
    ${rows.map((r, i) => `<text class="${i === 0 ? 'blink' : ''}" x="${x + 12}" y="${y + 42 + i * 22}" font-family="monospace" font-size="13" font-weight="700" fill="#ffce00">${r}</text>`).join('')}</g>`;
  const windowSky = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#bde0fe"/><rect x="${x}" y="${y + h - 30}" width="${w}" height="30" fill="#a3d9a5"/>`;
  const planeShape = (scale = 1) => `<g transform="scale(${scale})"><ellipse cx="0" cy="0" rx="60" ry="11" fill="#fff" stroke="#9aa5b1" stroke-width="2"/><path d="M-10 0 L-30 -34 L-18 -34 L14 0 Z" fill="#e63946"/><path d="M-50 -2 L-62 -22 L-54 -22 L-40 -2Z" fill="#e63946"/><circle cx="44" cy="-2" r="3" fill="#457b9d"/><circle cx="30" cy="-2" r="3" fill="#457b9d"/><circle cx="16" cy="-2" r="3" fill="#457b9d"/></g>`;

  const BG = {
    checkin: () => `<rect width="800" height="300" fill="#e9eef4"/>
      ${windowSky(300, 30, 470, 170)}<g class="fly-across"><g transform="translate(0,90)">${planeShape(0.8)}</g></g>
      <path d="M300 30 V200 M417 30 V200 M535 30 V200 M652 30 V200 M770 30 V200" stroke="#6c7a89" stroke-width="6"/>
      ${board(30, 30, ['LH2340 WIEN     09:40 B12', 'EW8044 KÖLN     10:05 A04', 'LH0170 FRANKF.  10:30 B03'])}
      ${floor('#c9ced6', '#aab1bc')}
      <rect x="430" y="215" width="330" height="100" rx="6" fill="#457b9d"/><rect x="420" y="205" width="350" height="16" rx="4" fill="#a8dadc"/>
      ${sign(520, 228, 150, 'Check-in', '#1d3557')}
      <g class="belt-slide"><rect x="330" y="268" width="60" height="44" rx="8" fill="#e63946"/><rect x="350" y="258" width="20" height="12" rx="3" fill="none" stroke="#333" stroke-width="3"/></g>`,
    security: () => `<rect width="800" height="300" fill="#eef2f3"/>
      ${sign(290, 26, 220, 'Sicherheitskontrolle', '#2b2d42')}
      ${floor('#cfd5da', '#b4bcc3')}
      <rect x="80" y="232" width="380" height="26" rx="6" fill="#495057"/><rect x="80" y="258" width="380" height="50" fill="#6c757d"/>
      <g class="belt-move"><rect x="90" y="206" width="70" height="28" rx="4" fill="#adb5bd"/><rect x="100" y="196" width="40" height="14" rx="3" fill="#264653"/></g>
      <g class="belt-move d2"><rect x="90" y="206" width="70" height="28" rx="4" fill="#adb5bd"/><rect x="104" y="192" width="30" height="20" rx="3" fill="#e9c46a"/></g>
      <rect x="200" y="150" width="120" height="84" rx="10" fill="#8d99ae"/><rect x="214" y="170" width="92" height="64" fill="#2b2d42"/>
      <rect x="560" y="90" width="22" height="214" fill="#6c757d"/><rect x="680" y="90" width="22" height="214" fill="#6c757d"/><rect x="560" y="80" width="142" height="26" rx="6" fill="#6c757d"/>
      <circle class="blink" cx="631" cy="93" r="7" fill="#2ec4b6"/>`,
    gate: () => `<rect width="800" height="300" fill="#e6ebf0"/>
      ${windowSky(40, 30, 720, 190)}<g transform="translate(470,170)">${planeShape(2)}</g>
      <path d="M40 30 V220 M220 30 V220 M400 30 V220 M580 30 V220 M760 30 V220" stroke="#6c7a89" stroke-width="7"/>
      ${floor('#b8c0cc', '#9aa5b1')}
      <g><rect x="40" y="236" width="160" height="34" rx="6" fill="#ffce00"/><text x="120" y="260" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="22" font-weight="700" fill="#1d1d1d">Gate B15</text></g>
      <g><rect x="250" y="236" width="230" height="34" rx="6" fill="#1d2433"/><text class="blink" x="365" y="259" text-anchor="middle" font-family="monospace" font-size="15" font-weight="700" fill="#ffce00">WIEN 10:10 VERSPÄTET</text></g>
      ${[520, 580, 640, 700].map((x) => `<rect x="${x}" y="268" width="50" height="30" rx="6" fill="#457b9d"/><rect x="${x}" y="252" width="50" height="18" rx="6" fill="#5c8fb5"/>`).join('')}`,
    cabin: () => `<rect width="800" height="400" fill="#dfe6ee"/><path d="M0 0 H800 V60 Q400 110 0 60 Z" fill="#f4f6f8"/>
      ${[80, 260, 440, 620].map((x) => `<g><rect x="${x}" y="90" width="90" height="110" rx="45" fill="#90caf9"/><g class="clouds"><ellipse cx="${x + 30}" cy="150" rx="22" ry="10" fill="#fff"/><ellipse cx="${x + 70}" cy="125" rx="16" ry="8" fill="#fff"/></g><rect x="${x}" y="90" width="90" height="110" rx="45" fill="none" stroke="#b0bec5" stroke-width="8"/></g>`).join('')}
      <rect y="300" width="800" height="100" fill="#546e7a"/>
      ${[30, 190, 350, 510, 670].map((x) => `<rect x="${x}" y="240" width="110" height="100" rx="18" fill="#1e3a5f"/><rect x="${x + 8}" y="232" width="94" height="24" rx="10" fill="#2c5282"/>`).join('')}`,
    baggage: () => `<rect width="800" height="300" fill="#edf0f3"/>
      ${sign(250, 24, 300, 'Gepäckausgabe · Baggage claim', '#ffce00', '#1d1d1d')}
      ${floor('#c7cdd4', '#adb5bd')}
      <rect x="40" y="232" width="720" height="60" rx="30" fill="#495057"/><rect x="60" y="244" width="680" height="36" rx="18" fill="#343a40"/>
      <g class="carousel"><rect x="0" y="226" width="56" height="34" rx="6" fill="#2a9d8f"/><rect x="140" y="222" width="48" height="38" rx="6" fill="#264653"/><rect x="300" y="228" width="60" height="32" rx="6" fill="#f4a261"/><rect x="470" y="224" width="52" height="36" rx="6" fill="#6d597a"/></g>
      ${clock(720, 110)}`,
    reception: () => `<rect width="800" height="300" fill="#f1f3f5"/><rect x="0" y="0" width="800" height="60" fill="#e9ecef"/>
      <g><circle cx="400" cy="110" r="34" fill="#2ec4b6"/><text x="400" y="122" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="30" font-weight="700" fill="#fff">T</text><text x="400" y="176" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="26" font-weight="600" fill="#1f2a48">TechNord</text></g>
      ${plant(60)}${plant(700)}
      ${floor('#d6d0c4', '#bfb7a8')}
      <rect x="440" y="222" width="320" height="94" rx="10" fill="#1f2a48"/><rect x="430" y="212" width="340" height="16" rx="6" fill="#adb5bd"/>
      ${clock(150, 110)}`,
    office: () => `<rect width="800" height="300" fill="#f3efe7"/>
      <rect x="470" y="40" width="280" height="170" fill="#90caf9"/><g fill="#5c6b7a">${[490, 530, 580, 630, 680].map((x, i) => `<rect x="${x}" y="${110 + (i % 3) * 20}" width="36" height="${100 - (i % 3) * 20}"/>`).join('')}</g>
      <rect x="470" y="40" width="280" height="170" fill="none" stroke="#8d6e63" stroke-width="8"/>
      <rect x="60" y="60" width="150" height="190" fill="#a1887f"/>${[0, 1, 2].map((i) => `<rect x="70" y="${80 + i * 60}" width="130" height="8" fill="#6d4c41"/><rect x="80" y="${62 + i * 60}" width="14" height="18" fill="#e76f51"/><rect x="98" y="${58 + i * 60}" width="12" height="22" fill="#2a9d8f"/><rect x="114" y="${64 + i * 60}" width="16" height="16" fill="#e9c46a"/>`).join('')}
      ${clock(330, 80)}
      ${floor('#bfa98a', '#a58f71')}
      <rect x="430" y="246" width="330" height="18" rx="4" fill="#795548"/><rect x="450" y="264" width="12" height="50" fill="#5d4037"/><rect x="728" y="264" width="12" height="50" fill="#5d4037"/>
      <rect x="560" y="196" width="80" height="50" rx="4" fill="#263238"/><rect x="566" y="202" width="68" height="38" fill="#4fc3f7" class="blink"/>`,
    desk: () => BG.office().replace('class="blink"', 'class="screen-black"'),
    meeting: () => `<rect width="800" height="300" fill="#eef1f6"/>
      <rect x="260" y="30" width="280" height="160" rx="8" fill="#1f2a48"/><rect x="274" y="44" width="252" height="132" fill="#fff"/>
      ${[0, 1, 2, 3].map((i) => `<rect class="grow" style="animation-delay:${i * 0.2}s" x="${300 + i * 55}" y="${160 - (i + 1) * 25}" width="34" height="${(i + 1) * 25}" fill="${['#3a86ff', '#2ec4b6', '#ffbe0b', '#e63946'][i]}"/>`).join('')}
      <text x="400" y="66" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="16" fill="#1f2a48">Projekt: Neue App · Ende Mai</text>
      ${plant(40)}${clock(700, 80)}
      ${floor('#c3cad6', '#a9b2c1')}
      <ellipse cx="400" cy="300" rx="300" ry="34" fill="#8d6e63"/><ellipse cx="400" cy="294" rx="300" ry="30" fill="#a1887f"/>`,
    canteen: () => `<rect width="800" height="300" fill="#fff4e6"/>
      <rect x="470" y="30" width="290" height="120" rx="8" fill="#2b2d42"/><text x="615" y="62" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="20" fill="#ffce00">Heute</text>
      <text x="615" y="94" text-anchor="middle" font-family="Nunito, sans-serif" font-size="16" fill="#fff">Schnitzel mit Kartoffelsalat · 6,50 €</text>
      <text x="615" y="122" text-anchor="middle" font-family="Nunito, sans-serif" font-size="16" fill="#fff">Gemüsesuppe (vegetarisch) · 4,20 €</text>
      ${floor('#e0c9a6', '#c9b08a')}
      <rect x="40" y="200" width="380" height="110" rx="8" fill="#adb5bd"/><rect x="30" y="190" width="400" height="16" rx="6" fill="#ced4da"/>
      ${[70, 170, 270].map((x) => `<g><rect x="${x}" y="160" width="70" height="32" rx="6" fill="#6c757d"/><path class="steam" d="M${x + 25} 150 q8 -12 0 -24 q-8 -12 0 -24" stroke="#adb5bd" stroke-width="3" fill="none"/></g>`).join('')}`,
    amt: () => `<rect width="800" height="300" fill="#eceff1"/>
      ${sign(40, 24, 200, 'Bürgeramt', '#37474f')}
      <g><rect x="480" y="24" width="270" height="110" rx="8" fill="#263238"/><text x="500" y="56" font-family="monospace" font-size="15" fill="#90a4ae">NUMMER     SCHALTER</text>
      <text class="blink" x="500" y="88" font-family="monospace" font-size="24" font-weight="700" fill="#ffce00">B47   →   3</text><text x="500" y="118" font-family="monospace" font-size="18" fill="#cfd8dc">B46   →   1</text></g>
      ${clock(330, 70)}
      ${floor('#b0bec5', '#90a4ae')}
      ${[60, 130, 200, 270, 340].map((x) => `<rect x="${x}" y="262" width="56" height="12" rx="4" fill="#ef6c00"/><rect x="${x}" y="226" width="56" height="38" rx="6" fill="#fb8c00"/><rect x="${x + 6}" y="274" width="6" height="28" fill="#555"/><rect x="${x + 44}" y="274" width="6" height="28" fill="#555"/>`).join('')}`,
    counter: () => `<rect width="800" height="300" fill="#e8eaf0"/>
      ${sign(560, 24, 190, 'Schalter 3', '#37474f')}
      <rect x="60" y="40" width="200" height="140" rx="6" fill="#cfd8dc"/><text x="160" y="80" text-anchor="middle" font-family="Nunito, sans-serif" font-size="14" fill="#455a64">Anmeldung</text><text x="160" y="104" text-anchor="middle" font-family="Nunito, sans-serif" font-size="14" fill="#455a64">Meldebescheinigung</text><text x="160" y="128" text-anchor="middle" font-family="Nunito, sans-serif" font-size="14" fill="#455a64">Reisepass</text>
      ${plant(320)}
      ${floor('#b0bec5', '#90a4ae')}
      <rect x="380" y="232" width="400" height="80" rx="6" fill="#78909c"/><rect x="370" y="222" width="420" height="14" rx="5" fill="#b0bec5"/>
      <rect x="600" y="172" width="70" height="50" rx="4" fill="#263238"/><rect x="606" y="178" width="58" height="38" fill="#80deea"/>
      <g class="stamp"><rect x="470" y="196" width="22" height="26" rx="3" fill="#c62828"/><rect x="462" y="190" width="38" height="10" rx="3" fill="#5d4037"/></g>
      <rect x="510" y="214" width="60" height="8" fill="#fff"/>`,
    home: () => `<rect width="800" height="300" fill="#fff3e0"/>
      <rect x="520" y="40" width="200" height="140" fill="#90caf9"/><rect x="520" y="40" width="200" height="140" fill="none" stroke="#a1887f" stroke-width="8"/><path d="M620 40 V180 M520 110 H720" stroke="#a1887f" stroke-width="5"/>
      <rect x="90" y="60" width="120" height="90" fill="#ffcc80" stroke="#8d6e63" stroke-width="6"/><circle cx="150" cy="100" r="18" fill="#ef6c00"/>
      ${plant(730)}
      ${floor('#d7b48f', '#c19a6b')}
      <rect x="60" y="230" width="260" height="70" rx="20" fill="#7e57c2"/><rect x="60" y="210" width="260" height="40" rx="18" fill="#9575cd"/>`,
    phone: () => BG.home() + `<g class="ring"><rect x="370" y="140" width="56" height="96" rx="10" fill="#263238"/><rect x="376" y="150" width="44" height="72" rx="4" fill="#4fc3f7"/><text x="398" y="194" text-anchor="middle" font-size="22">📞</text></g>`,
    restaurant: () => `<rect width="800" height="300" fill="#f6e3c8"/><rect width="800" height="70" fill="#e9cfa9"/>
      <rect x="560" y="70" width="200" height="130" fill="#1d3557"/>${[[590, 100], [650, 90], [720, 120], [700, 160], [610, 150]].map(([x, y]) => `<circle class="blink" style="animation-delay:${(x % 7) * 0.2}s" cx="${x}" cy="${y}" r="2.5" fill="#fff"/>`).join('')}<rect x="560" y="70" width="200" height="130" fill="none" stroke="#6d4c41" stroke-width="8"/>
      ${[160, 360].map((x) => `<g class="swing" style="transform-origin:${x}px 0px"><line x1="${x}" y1="0" x2="${x}" y2="90" stroke="#5d4037" stroke-width="3"/><path d="M${x - 30} 120 L${x - 14} 90 H${x + 14} L${x + 30} 120 Z" fill="#e76f51"/><circle cx="${x}" cy="124" r="8" fill="#ffe8a3"/></g>`).join('')}
      <text x="80" y="210" font-family="Fredoka, sans-serif" font-size="26" fill="#6d4c41">Zur Linde</text>
      ${floor('#a1887f', '#8d6e63')}
      <rect x="300" y="262" width="240" height="12" rx="4" fill="#fffaf0"/><rect x="300" y="274" width="240" height="30" fill="#efe6d8"/>
      <rect x="410" y="240" width="10" height="22" fill="#fffde7"/><path class="flicker" d="M415 230 q6 6 0 12 q-6 -6 0 -12z" fill="#ffb703"/>`,
  };

  /* ---------- player ---------- */
  function progressOf(id) { return ((Store.state.scenes = Store.state.scenes || {})[id]) || {}; }

  function list() {
    return {
      html: `<h1>🎬 Real-life scenes</h1>
        <p class="muted">Ten-minute animated situations you will really meet in Germany. Watch, learn the phrases you need, and speak at the key moments – you are <b>Alex</b>.</p>
        <div class="grid grid-2">${GL.scenarios.map((s) => {
          const p = progressOf(s.id);
          return `<a class="card scn-card" href="#/scenes/${s.id}" style="margin:0">
            <div class="scn-thumb"><svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">${BG[(s.scenes.find((x) => !['home', 'phone'].includes(x.bg)) || s.scenes[0]).bg]()}</svg><span class="scn-icon">${s.icon}</span></div>
            <div class="row" style="margin-top:12px"><span class="level ${s.level}">${s.level}</span><span class="path-tag">≈ ${s.minutes} min · ${s.scenes.length} scenes</span>${p.best != null ? `<span class="score-badge ${p.best >= 80 ? '' : 'mid'}">${p.best}%</span>` : ''}</div>
            <h2 style="margin:.4em 0 .2em">${esc(s.title)}</h2><p class="muted" style="margin:0">${esc(s.en)} – ${esc(s.intro[1])}</p></a>`;
        }).join('')}</div>`,
    };
  }

  function player(sc) {
    let token = 0, sceneIdx = 0, stepIdx = 0, choices = 0, firstTry = 0, auto = true, showEn = Store.state.settings.showEn;
    return {
      html: `<p><a href="#/scenes">← All scenes</a></p>
        <div class="scn-player">
          <div class="scn-top"><div><span class="scn-big-icon">${sc.icon}</span> <b>${esc(sc.title)}</b> <span class="muted">· ${esc(sc.en)}</span></div>
            <div class="scn-dots">${sc.scenes.map((s, i) => `<span data-i="${i}" title="${attr(s.title)}"></span>`).join('')}</div></div>
          <div class="scn-stage" id="scnStage"><svg class="scn-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice"></svg><div class="scn-actors"></div><div class="scn-card-overlay"></div></div>
          <div class="scn-controls row"><button class="btn ghost small" id="scnAuto">⏸ Pause after each line</button><button class="btn ghost small" id="scnReplay">🔁 Repeat line</button><button class="btn ghost small" id="scnEn">${showEn ? '🙈 Hide English' : '👀 Show English'}</button><span class="spacer"></span><span class="pill" id="scnScore">🎯 0 / 0</span></div>
          <div class="card scn-panel" id="scnPanel"></div>
          <div class="scn-log" id="scnLog"></div>
        </div>`,
      mount() {
        const stage = $('#scnStage'), panel = $('#scnPanel'), log = $('#scnLog');
        const actorsEl = $('.scn-actors', stage);
        let lastLine = null;
        const alive = (my) => my === token && stage.isConnected;
        const setScore = () => { $('#scnScore').textContent = `🎯 ${firstTry} / ${choices}`; };
        $('#scnAuto').onclick = (e) => { auto = !auto; e.target.textContent = auto ? '⏸ Pause after each line' : '▶ Play lines automatically'; if (auto && waitNext) waitNext(); };
        $('#scnReplay').onclick = () => { if (lastLine) speakLine(lastLine[0], lastLine[1], token); };
        $('#scnEn').onclick = (e) => { showEn = !showEn; e.target.textContent = showEn ? '🙈 Hide English' : '👀 Show English'; stage.classList.toggle('no-en', !showEn); log.classList.toggle('hide-en', !showEn); };
        stage.classList.toggle('no-en', !showEn); log.classList.toggle('hide-en', !showEn);
        let waitNext = null;

        const positions = (cast) => {
          const others = cast.filter((c) => c !== 'alex');
          const pos = { alex: 16 };
          const slots = others.length === 1 ? [74] : others.length === 2 ? [56, 84] : [50, 68, 86];
          others.forEach((c, i) => (pos[c] = slots[i]));
          return pos;
        };
        function setupScene(i) {
          const s = sc.scenes[i];
          $$('.scn-dots span').forEach((d, k) => { d.className = k < i ? 'done' : k === i ? 'now' : ''; });
          $('.scn-bg', stage).innerHTML = BG[s.bg] ? BG[s.bg]() : '';
          const pos = positions(s.cast);
          actorsEl.innerHTML = s.cast.map((c) => `<div class="scn-actor walk-in-${c === 'alex' ? 'l' : 'r'} ${pos[c] > 60 ? 'side-r' : ''}" data-c="${c}" style="left:${pos[c]}%">
            <div class="scn-bubble"></div>${GL.charSVG(c, 'idle walking')}<span class="nm">${s.bg === 'phone' && c !== 'alex' ? '📞 ' : ''}${esc(GL.chars[c].name)}</span></div>`).join('');
          setTimeout(() => $$('svg.char', actorsEl).forEach((x) => x.classList.remove('walking')), 1300);
          const ov = $('.scn-card-overlay', stage);
          ov.innerHTML = `<div><small>Szene ${i + 1} von ${sc.scenes.length}</small><b>${esc(s.title)}</b><span>${esc(s.en)}</span></div>`;
          ov.classList.remove('show'); void ov.offsetWidth; ov.classList.add('show');
          log.insertAdjacentHTML('beforeend', `<div class="scn-log-title">Szene ${i + 1}: ${esc(s.title)}</div>`);
        }
        function speakLine(c, de, my) {
          const actor = $(`.scn-actor[data-c="${c}"]`, actorsEl);
          $$('.scn-actor', actorsEl).forEach((a) => a.classList.toggle('speaking', a === actor));
          $$('.scn-bubble', actorsEl).forEach((b) => b.classList.remove('show'));
          if (actor) {
            const b = $('.scn-bubble', actor);
            const en = (lastLine && lastLine[2]) || '';
            b.innerHTML = `<span class="sb-de">${esc(de)}</span>${en ? `<span class="sb-en">${esc(en)}</span>` : ''}`;
            b.classList.add('show');
          }
          const svg = actor && $('svg.char', actor);
          const t0 = Date.now();
          return GL.charSay(svg, de, c).then(async () => {
            const rest = 500 + de.length * 42 - (Date.now() - t0);
            if (rest > 0 && alive(my)) await GL.sleep(rest);
            if (actor) actor.classList.remove('speaking');
          });
        }
        function addLog(c, de, en) {
          log.insertAdjacentHTML('beforeend', `<div class="ln ${c === 'alex' ? 'right' : ''}"><div class="av">${GL.charSVG(c)}</div><div class="bub" data-say="${attr(de)}" data-char="${c}"><div class="ln-who">${esc(GL.chars[c].name)}</div><div class="ln-de">${esc(de)}</div><div class="ln-en">${esc(en || '')}</div></div></div>`);
          log.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function phrasesPanel(i) {
          const s = sc.scenes[i];
          panel.innerHTML = `<h3>📌 What you need to say here</h3>
            <p class="muted">Listen to each phrase and repeat it aloud. Then start the scene.</p>
            ${s.phrases.map((p) => `<div class="ex"><button class="say-btn" data-say="${attr(p[0])}" aria-label="Listen">🔊</button><span class="ex-de">${esc(p[0])}</span><span class="ex-en">${esc(p[1])}</span></div>`).join('')}
            <div class="row" style="margin-top:12px"><button class="btn green big" id="scnGo">▶ Start scene ${i + 1}</button></div>`;
          $('#scnGo').onclick = () => playScene(i);
        }

        async function playScene(i) {
          const my = ++token;
          const s = sc.scenes[i];
          panel.innerHTML = `<p class="muted center" style="margin:0">🎧 Listen … you will speak at the 🎤 moments.</p>`;
          for (stepIdx = 0; stepIdx < s.steps.length; stepIdx++) {
            if (!alive(my)) return;
            const st = s.steps[stepIdx];
            if (Array.isArray(st)) {
              lastLine = st;
              addLog(st[0], st[1], st[2]);
              await speakLine(st[0], st[1], my);
              if (!alive(my)) return;
              if (!auto) await new Promise((res) => { panel.innerHTML = `<div class="row" style="justify-content:center"><button class="btn" id="scnNext">Next line ➜</button></div>`; waitNext = () => { waitNext = null; res(); }; $('#scnNext').onclick = waitNext; });
              else await GL.sleep(250);
            } else {
              await choose(st, my);
            }
          }
          if (!alive(my)) return;
          sceneDone(i);
        }

        function choose(st, my) {
          return new Promise((resolve) => {
            choices++; setScore();
            let tries = 0;
            const order = shuffle(st.o.map((o, i) => i));
            panel.innerHTML = `<div class="your-turn"><b>🎤 Your turn!</b> <span>${esc(st.prompt)}</span>
              <div class="opts" style="margin-top:10px">${order.map((i, k) => `<button class="opt" data-i="${i}"><span class="kbd-hint">${k + 1}</span>${esc(st.o[i])}</button>`).join('')}</div><div id="scnFb"></div></div>`;
            const alexEl = $('.scn-actor[data-c="alex"]', actorsEl);
            alexEl && alexEl.classList.add('thinking');
            const pickOpt = (b) => {
              if (b.disabled) return;
              const ok = +b.dataset.i === st.a;
              tries++;
              if (ok) {
                if (tries === 1) firstTry++;
                setScore(); GL.sfx('ok');
                b.classList.add('right');
                $$('.opt', panel).forEach((x) => (x.disabled = true));
                alexEl && alexEl.classList.remove('thinking');
                const de = st.o[st.a];
                lastLine = ['alex', de, ''];
                addLog('alex', de, '');
                $('#scnFb').innerHTML = `<div class="feedback ok">✔ Richtig! ${st.ex ? `<div class="expl">📘 ${st.ex}</div>` : ''}
                  <div class="row" style="margin-top:8px">${Rec.supported ? '<button class="btn small rec" id="scnSay">🎤 Say it yourself</button>' : '<span class="muted">Now say it out loud!</span>'}<span class="spacer"></span><button class="btn green" id="scnCont">Continue ➜</button></div><div id="scnSayRes"></div></div>`;
                speakLine('alex', de, my);
                Store.addXP(tries === 1 ? 5 : 2);
                const say = $('#scnSay');
                if (say) say.onclick = async () => {
                  say.classList.add('listening'); say.textContent = '👂 Listening…';
                  try { const alts = await Rec.listen(); const best = alts.map((a) => ({ a, s: speechScore(de, a) })).sort((x, y) => y.s.score - x.s.score)[0]; $('#scnSayRes').innerHTML = GL.Dialogue.scoreHTML(best.s, best.a); }
                  catch (e) { $('#scnSayRes').innerHTML = `<p class="muted">${GL.Dialogue.micError(e)}</p>`; }
                  say.classList.remove('listening'); say.textContent = '🎤 Try again';
                };
                $('#scnCont').onclick = () => { Speech.stop(); resolve(); };
              } else {
                GL.sfx('bad');
                b.classList.add('wrong', 'shake'); b.disabled = true;
                if (tries === 1) Store.addMistake({ t: 'mc', q: st.prompt, o: st.o, a: st.a, ex: st.ex || '' }, null);
                $('#scnFb').innerHTML = `<div class="feedback bad">✘ Not quite – try again. ${st.ex ? `<div class="expl">💡 ${st.ex}</div>` : ''}</div>`;
              }
            };
            $$('.opt', panel).forEach((b) => (b.onclick = () => pickOpt(b)));
            const keys = (e) => {
              if (!panel.isConnected || !$('.your-turn', panel)) { document.removeEventListener('keydown', keys); return; }
              const k = parseInt(e.key, 10); const b = $$('.opt', panel)[k - 1];
              if (b) pickOpt(b);
            };
            document.addEventListener('keydown', keys);
            if (!alive(my)) resolve();
          });
        }

        function sceneDone(i) {
          const last = i === sc.scenes.length - 1;
          $$('.scn-dots span')[i].className = 'done';
          GL.sfx('pop');
          if (!last) {
            panel.innerHTML = `<div class="center"><h3>✅ Scene ${i + 1} done: ${esc(sc.scenes[i].title)}</h3><button class="btn green big" id="scnNextScene">Next scene: ${esc(sc.scenes[i + 1].title)} ➜</button></div>`;
            $('#scnNextScene').onclick = () => {
              $$('.scn-actor', actorsEl).forEach((a) => { if (a.dataset.c !== 'alex') a.classList.add('walk-out'); });
              setTimeout(() => { if (!stage.isConnected) return; sceneIdx = i + 1; setupScene(sceneIdx); phrasesPanel(sceneIdx); }, 700);
            };
            return;
          }
          const pct = choices ? Math.round((firstTry / choices) * 100) : 100;
          const p = progressOf(sc.id);
          Store.state.scenes[sc.id] = { done: true, best: Math.max(p.best || 0, pct), at: GL.todayStr() };
          Store.addXP(30); Store.save();
          GL.confetti(); GL.sfx('done');
          $$('svg.char', actorsEl).forEach((x) => x.classList.add('happy', 'waving'));
          panel.innerHTML = `<div class="center">${GL.charSVG('bruno', 'happy waving')}<h2>🎉 Geschafft! ${esc(sc.title)}</h2>
            <p><span class="score-badge ${pct >= 80 ? '' : pct >= 50 ? 'mid' : 'low'}">${pct}%</span> right on the first try (${firstTry} of ${choices}) · +30 XP</p>
            <p class="muted">Play it again with “Pause after each line” and say every line of Alex out loud – that’s the best speaking practice.</p>
            <div class="row" style="justify-content:center"><a class="btn ghost" href="#/scenes">All scenes</a><button class="btn" id="scnAgain">🔁 Play again</button></div></div>`;
          $('#scnAgain').onclick = () => { token++; choices = firstTry = 0; setScore(); log.innerHTML = ''; sceneIdx = 0; setupScene(0); phrasesPanel(0); };
        }

        panel.innerHTML = `<div class="center">${GL.charBubble('alex', esc(sc.intro[0]), esc(sc.intro[1]), {})}<button class="btn green big" id="scnBegin">▶ Begin – ${sc.scenes.length} scenes, ≈ ${sc.minutes} min</button></div>`;
        $('.scn-bg', stage).innerHTML = BG[sc.scenes[0].bg]();
        $('#scnBegin').onclick = () => { setupScene(0); phrasesPanel(0); };
        // stop everything when leaving the page
        const iv = setInterval(() => { if (!stage.isConnected) { token++; clearInterval(iv); } }, 500);
      },
    };
  }

  GL.viewScenes = function (id) {
    const sc = id && GL.scenarios.find((s) => s.id === id);
    return sc ? player(sc) : list();
  };
  GL.sceneBG = BG;
})();
