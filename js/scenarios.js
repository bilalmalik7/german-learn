/* Real-life scenarios: animated multi-scene stories where you (Alex) speak at the key moments. */
(function () {
  'use strict';
  const { $, $$, esc, attr, shuffle, Store, Speech, Rec, speechScore } = GL;

  /* ---------- illustrated, animated backgrounds (viewBox 800×400) ---------- */
  // floor with perspective tiles converging towards the back wall
  const floor = (c1, c2) => `<rect y="300" width="800" height="100" fill="${c1}"/>
    <g stroke="${c2}" stroke-width="1.4" opacity=".5">${[-500, -340, -180, -20, 140, 300, 460, 620, 780, 940, 1100, 1260].map((x) => `<line x1="${400 + (x - 400) * 0.45}" y1="300" x2="${x}" y2="400"/>`).join('')}${[311, 328, 352, 386].map((y) => `<line x1="0" y1="${y}" x2="800" y2="${y}"/>`).join('')}</g>
    <rect y="300" width="800" height="6" fill="${c2}"/><rect y="306" width="800" height="26" fill="#000" opacity=".05"/>`;
  // distant passers-by (silhouettes walking across the back of the scene)
  const person = (c, k) => `<g transform="scale(${k})"><circle cx="0" cy="-66" r="9.5" fill="${c}"/><path d="M-12 -54 q12 -5 24 0 l3 32 h-6 l-1.5 22 h-6 l-1.5 -17 l-1.5 17 h-6 l-1.5 -22 h-6 z" fill="${c}"/><rect class="bag" x="10" y="-30" width="9" height="13" rx="2" fill="${c}" opacity=".8"/></g>`;
  const crowd = (y, n = 3, cols = ['#7d8a99', '#93a1b0', '#6b7887'], speed = 1) => Array.from({ length: n }, (_, i) => `<g class="walker ${i % 2 ? 'rev' : ''}" style="animation-duration:${(16 + i * 5) / speed}s;animation-delay:-${(i * 6.7) % 20}s"><g transform="translate(0,${y + (i % 2) * 6})"><g class="wbob">${person(cols[i % cols.length], 0.78 + (i % 3) * 0.07)}</g></g></g>`).join('');
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
      ${floor('#c9ced6', '#aab1bc')}${crowd(300, 3)}
      <rect x="430" y="215" width="330" height="100" rx="6" fill="#457b9d"/><rect x="420" y="205" width="350" height="16" rx="4" fill="#a8dadc"/>
      ${sign(520, 228, 150, 'Check-in', '#1d3557')}
      <g class="belt-slide"><rect x="330" y="268" width="60" height="44" rx="8" fill="#e63946"/><rect x="350" y="258" width="20" height="12" rx="3" fill="none" stroke="#333" stroke-width="3"/></g>`,
    security: () => `<rect width="800" height="300" fill="#eef2f3"/>
      ${sign(290, 26, 220, 'Sicherheitskontrolle', '#2b2d42')}
      ${floor('#cfd5da', '#b4bcc3')}${crowd(300, 2)}
      <rect x="80" y="232" width="380" height="26" rx="6" fill="#495057"/><rect x="80" y="258" width="380" height="50" fill="#6c757d"/>
      <g class="belt-move"><rect x="90" y="206" width="70" height="28" rx="4" fill="#adb5bd"/><rect x="100" y="196" width="40" height="14" rx="3" fill="#264653"/></g>
      <g class="belt-move d2"><rect x="90" y="206" width="70" height="28" rx="4" fill="#adb5bd"/><rect x="104" y="192" width="30" height="20" rx="3" fill="#e9c46a"/></g>
      <rect x="200" y="150" width="120" height="84" rx="10" fill="#8d99ae"/><rect x="214" y="170" width="92" height="64" fill="#2b2d42"/>
      <rect x="560" y="90" width="22" height="214" fill="#6c757d"/><rect x="680" y="90" width="22" height="214" fill="#6c757d"/><rect x="560" y="80" width="142" height="26" rx="6" fill="#6c757d"/>
      <circle class="blink" cx="631" cy="93" r="7" fill="#2ec4b6"/>`,
    gate: () => `<rect width="800" height="300" fill="#e6ebf0"/>
      ${windowSky(40, 30, 720, 190)}<g transform="translate(470,170)">${planeShape(2)}</g>
      <path d="M40 30 V220 M220 30 V220 M400 30 V220 M580 30 V220 M760 30 V220" stroke="#6c7a89" stroke-width="7"/>
      ${floor('#b8c0cc', '#9aa5b1')}${crowd(300, 3)}
      <g><rect x="40" y="236" width="160" height="34" rx="6" fill="#ffce00"/><text x="120" y="260" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="22" font-weight="700" fill="#1d1d1d">Gate B15</text></g>
      <g><rect x="250" y="236" width="230" height="34" rx="6" fill="#1d2433"/><text class="blink" x="365" y="259" text-anchor="middle" font-family="monospace" font-size="15" font-weight="700" fill="#ffce00">WIEN 10:10 VERSPÄTET</text></g>
      ${[520, 580, 640, 700].map((x) => `<rect x="${x}" y="268" width="50" height="30" rx="6" fill="#457b9d"/><rect x="${x}" y="252" width="50" height="18" rx="6" fill="#5c8fb5"/>`).join('')}`,
    cabin: () => `<rect width="800" height="400" fill="#dfe6ee"/><path d="M0 0 H800 V60 Q400 110 0 60 Z" fill="#f4f6f8"/>
      ${[80, 260, 440, 620].map((x) => `<g><rect x="${x}" y="90" width="90" height="110" rx="45" fill="#90caf9"/><g class="clouds"><ellipse cx="${x + 30}" cy="150" rx="22" ry="10" fill="#fff"/><ellipse cx="${x + 70}" cy="125" rx="16" ry="8" fill="#fff"/></g><rect x="${x}" y="90" width="90" height="110" rx="45" fill="none" stroke="#b0bec5" stroke-width="8"/></g>`).join('')}
      <rect y="300" width="800" height="100" fill="#546e7a"/>
      ${[30, 190, 350, 510, 670].map((x) => `<rect x="${x}" y="240" width="110" height="100" rx="18" fill="#1e3a5f"/><rect x="${x + 8}" y="232" width="94" height="24" rx="10" fill="#2c5282"/>`).join('')}`,
    baggage: () => `<rect width="800" height="300" fill="#edf0f3"/>
      ${sign(250, 24, 300, 'Gepäckausgabe · Baggage claim', '#ffce00', '#1d1d1d')}
      ${floor('#c7cdd4', '#adb5bd')}${crowd(300, 2)}
      <rect x="40" y="232" width="720" height="60" rx="30" fill="#495057"/><rect x="60" y="244" width="680" height="36" rx="18" fill="#343a40"/>
      <g class="carousel"><rect x="0" y="226" width="56" height="34" rx="6" fill="#2a9d8f"/><rect x="140" y="222" width="48" height="38" rx="6" fill="#264653"/><rect x="300" y="228" width="60" height="32" rx="6" fill="#f4a261"/><rect x="470" y="224" width="52" height="36" rx="6" fill="#6d597a"/></g>
      ${clock(720, 110)}`,
    reception: () => `<rect width="800" height="300" fill="#f1f3f5"/><rect x="0" y="0" width="800" height="60" fill="#e9ecef"/>
      <g><circle cx="400" cy="110" r="34" fill="#2ec4b6"/><text x="400" y="122" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="30" font-weight="700" fill="#fff">T</text><text x="400" y="176" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="26" font-weight="600" fill="#1f2a48">TechNord</text></g>
      ${plant(60)}${plant(700)}
      ${floor('#d6d0c4', '#bfb7a8')}${crowd(300, 1)}
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

  /* ---------- more places ---------- */
  const shelf = (x, y, w, rows, colors) => `<g><rect x="${x}" y="${y}" width="${w}" height="${rows * 44 + 10}" fill="#dfe3e8"/>${Array.from({ length: rows }, (_, r) => `<rect x="${x}" y="${y + 40 + r * 44}" width="${w}" height="6" fill="#9aa5b1"/>${Array.from({ length: Math.floor(w / 22) }, (_, k) => `<rect x="${x + 4 + k * 22}" y="${y + 12 + r * 44 + ((k * 7 + r * 3) % 3) * 3}" width="17" height="${28 - ((k * 7 + r * 3) % 3) * 3}" rx="2" fill="${colors[(k + r * 2) % colors.length]}"/>`).join('')}`).join('')}</g>`;
  const counterDesk = (x, w, top, front) => `<rect x="${x}" y="226" width="${w}" height="90" rx="6" fill="${front}"/><rect x="${x - 10}" y="214" width="${w + 20}" height="16" rx="5" fill="${top}"/><rect x="${x}" y="230" width="${w}" height="8" fill="#000" opacity=".12"/>`;
  const screen = (x, y) => `<rect x="${x}" y="${y}" width="70" height="48" rx="4" fill="#263238"/><rect x="${x + 5}" y="${y + 5}" width="60" height="36" fill="#80deea"/><rect x="${x + 30}" y="${y + 48}" width="10" height="10" fill="#37474f"/>`;
  const depBoard = (x, y, title, rows) => `<g><rect x="${x}" y="${y}" width="300" height="${34 + rows.length * 22}" rx="6" fill="#0b2a5b"/><text x="${x + 12}" y="${y + 22}" font-family="monospace" font-size="12" fill="#9fb3d1">${title}</text>
    ${rows.map((r, i) => `<text class="${i === 0 ? 'blink' : ''}" x="${x + 12}" y="${y + 46 + i * 22}" font-family="monospace" font-size="13" font-weight="700" fill="#fff">${r}</text>`).join('')}</g>`;
  const trainShape = (x, y, w, c = '#f2f2f2', stripe = '#e30613') => `<g><rect x="${x}" y="${y}" width="${w}" height="120" rx="26" fill="${c}" stroke="#8d99ae" stroke-width="2"/><rect x="${x}" y="${y + 84}" width="${w}" height="10" fill="${stripe}"/>${Array.from({ length: Math.floor((w - 60) / 70) }, (_, i) => `<rect x="${x + 40 + i * 70}" y="${y + 22}" width="52" height="38" rx="8" fill="#37474f"/><rect x="${x + 44 + i * 70}" y="${y + 26}" width="20" height="30" rx="4" fill="#90a4ae" opacity=".5"/>`).join('')}<rect x="${x + w - 20}" y="${y + 30}" width="16" height="50" rx="8" fill="#37474f"/></g>`;
  const windowNight = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#1d3557"/>${[[0.2, 0.3], [0.5, 0.2], [0.8, 0.4], [0.35, 0.6], [0.7, 0.7]].map(([a, b], i) => `<circle class="blink" style="animation-delay:${i * 0.4}s" cx="${x + a * w}" cy="${y + b * h}" r="2" fill="#fff"/>`).join('')}<circle cx="${x + w * 0.82}" cy="${y + h * 0.22}" r="12" fill="#fff3c4"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#6d4c41" stroke-width="8"/>`;
  const lamp = (x) => `<g><line x1="${x}" y1="0" x2="${x}" y2="40" stroke="#555" stroke-width="2"/><path d="M${x - 22} 62 L${x - 12} 40 H${x + 12} L${x + 22} 62 Z" fill="#f4a261"/><ellipse cx="${x}" cy="66" rx="30" ry="6" fill="#ffe8a3" opacity=".7"/></g>`;

  Object.assign(BG, {
    station: () => `<rect width="800" height="300" fill="#e7e2d8"/><path d="M0 0 H800 V40 Q400 -10 0 40Z" fill="#cfc6b6"/>
      ${[100, 300, 500, 700].map((x) => `<path d="M${x - 90} 40 Q${x} -20 ${x + 90} 40" stroke="#8d8577" stroke-width="5" fill="none"/>`).join('')}
      ${depBoard(40, 50, 'ABFAHRT    ZUG     NACH          GLEIS', ['10:12  ICE 597  München Hbf    7', '10:20  RE 1     Magdeburg      3', '10:34  S 5      Potsdam       12'])}
      ${clock(400, 80)}
      ${floor('#cbbfae', '#b3a693')}${crowd(300, 4)}
      ${counterDesk(450, 320, '#ced4da', '#e30613')}
      ${sign(500, 112, 220, 'DB Reisezentrum', '#e30613')}${screen(640, 166)}`,
    platform: () => `<rect width="800" height="300" fill="#b7c6d6"/><rect width="800" height="90" fill="#8fa7bf"/>
      <path d="M0 40 H800" stroke="#6c7a89" stroke-width="10"/>${[60, 260, 460, 660].map((x) => `<rect x="${x}" y="40" width="10" height="200" fill="#6c7a89"/>`).join('')}
      <g class="train-in">${trainShape(-60, 120, 940)}</g>
      <rect x="0" y="240" width="800" height="60" fill="#9aa5b1"/><rect x="0" y="236" width="800" height="8" fill="#fff" opacity=".9"/>
      <g><rect x="560" y="70" width="200" height="56" rx="6" fill="#0b2a5b"/><text x="572" y="92" font-family="monospace" font-size="12" fill="#9fb3d1">GLEIS 7</text><text class="blink" x="572" y="114" font-family="monospace" font-size="14" font-weight="700" fill="#fff">ICE 597 München</text></g>
      ${floor('#a5aeb8', '#8d97a2')}${crowd(300, 2)}
      <rect x="0" y="300" width="800" height="10" fill="#ffce00" opacity=".9"/>`,
    train: () => `<rect width="800" height="400" fill="#e3e7ec"/><rect width="800" height="50" fill="#cfd6de"/>
      <rect x="40" y="70" width="720" height="150" rx="20" fill="#9ccbe8"/>
      <g class="landscape far"><path d="M0 180 Q100 120 200 170 T400 160 T600 170 T800 150 T1000 170 T1200 160 V220 H0Z" fill="#8fbf9f"/></g>
      <g class="landscape">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<g transform="translate(${60 + i * 160},0)"><rect x="-3" y="170" width="6" height="40" fill="#6d4c41"/><circle cx="0" cy="160" r="22" fill="#3d8b5f"/></g>`).join('')}<rect x="0" y="205" width="1600" height="15" fill="#7a9a6a"/></g>
      ${[40, 280, 520].map((x) => `<rect x="${x + 228}" y="70" width="12" height="150" fill="#cfd6de"/>`).join('')}
      <rect x="40" y="70" width="720" height="150" rx="20" fill="none" stroke="#cfd6de" stroke-width="12"/>
      <rect y="300" width="800" height="100" fill="#5c6b7a"/>
      ${[20, 210, 400, 590].map((x) => `<g><rect x="${x}" y="230" width="170" height="120" rx="20" fill="#24476b"/><rect x="${x + 12}" y="222" width="146" height="34" rx="12" fill="#2f5d8a"/><rect x="${x + 40}" y="232" width="90" height="10" rx="4" fill="#fff" opacity=".7"/></g>`).join('')}`,
    hotel: () => `<rect width="800" height="300" fill="#efe4d2"/><rect width="800" height="300" fill="url(#none)"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${i * 100}" y="0" width="50" height="300" fill="#e8dcc6"/>`).join('')}
      ${lamp(200)}${lamp(600)}
      <g><text x="400" y="110" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#7a5a2e">Hotel Lindenhof</text><text x="400" y="134" text-anchor="middle" font-family="Georgia, serif" font-size="14" letter-spacing="6" fill="#a1887f">★ ★ ★ ★</text></g>
      <rect x="560" y="150" width="190" height="60" rx="4" fill="#6d4c41"/>${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${580 + i * 30}" cy="170" r="4" fill="#ffd166"/><rect x="${577 + i * 30}" y="174" width="6" height="16" rx="2" fill="#ffd166"/>`).join('')}
      ${plant(40)}
      ${floor('#8d6e63', '#795548')}${crowd(300, 1, ['#8a7a6a'])}
      ${counterDesk(430, 340, '#d7c4a3', '#5d4037')}
      <circle cx="500" cy="208" r="9" fill="#ffd166"/><rect x="491" y="208" width="18" height="5" fill="#c9a227"/>`,
    hotelroom: () => `<rect width="800" height="300" fill="#e9e1f0"/>
      ${windowNight(520, 40, 220, 160)}
      <rect x="70" y="60" width="150" height="100" fill="#ffe0b2" stroke="#8d6e63" stroke-width="6"/><path d="M80 150 L130 100 L160 130 L190 105 L210 150Z" fill="#81c784"/>
      ${floor('#a1887f', '#8d6e63')}
      <rect x="240" y="200" width="300" height="110" rx="10" fill="#fff"/><rect x="240" y="180" width="300" height="40" rx="10" fill="#d1c4e9"/><rect x="230" y="150" width="20" height="160" rx="6" fill="#6d4c41"/>
      <rect x="560" y="236" width="70" height="70" rx="6" fill="#8d6e63"/><rect x="592" y="206" width="6" height="30" fill="#5d4037"/><path d="M576 210 L584 186 H606 L614 210 Z" fill="#ffd166"/><ellipse cx="595" cy="200" rx="40" ry="26" fill="#ffe8a3" opacity=".25"/>`,
    breakfast: () => `<rect width="800" height="300" fill="#fff8e7"/>
      <rect x="40" y="40" width="260" height="160" fill="#bde0fe"/><rect x="40" y="40" width="260" height="160" fill="none" stroke="#c9a227" stroke-width="8"/><circle cx="250" cy="80" r="20" fill="#ffd166"/>
      ${sign(470, 30, 280, 'Frühstücksbuffet 6:30–10:30', '#7a5a2e')}
      ${floor('#d7b48f', '#c19a6b')}${crowd(300, 2, ['#9c8a75', '#7f7365'])}
      ${counterDesk(400, 380, '#fff', '#c9a227')}
      ${[[430, '#f4a261'], [500, '#e9c46a'], [570, '#e76f51'], [640, '#2a9d8f'], [710, '#b5651d']].map(([x, c]) => `<ellipse cx="${x}" cy="208" rx="26" ry="8" fill="#fff" stroke="#ccc"/><circle cx="${x - 8}" cy="200" r="7" fill="${c}"/><circle cx="${x + 6}" cy="198" r="8" fill="${c}"/>`).join('')}
      <g><rect x="740" y="160" width="26" height="46" rx="6" fill="#6d4c41"/><path class="steam" d="M752 150 q6 -10 0 -20" stroke="#adb5bd" stroke-width="3" fill="none"/></g>`,
    market: () => `<rect width="800" height="300" fill="#f5f7fa"/><rect width="800" height="26" fill="#2a9d8f"/>
      ${sign(40, 36, 150, 'Obst & Gemüse', '#2a9d8f')}${sign(600, 36, 160, 'Getränke', '#264653')}
      ${shelf(30, 80, 250, 5, ['#e63946', '#f4a261', '#2a9d8f', '#e9c46a', '#457b9d', '#8ab17d'])}
      ${shelf(520, 80, 250, 5, ['#264653', '#e76f51', '#a8dadc', '#ffb703', '#6d597a'])}
      <rect x="300" y="90" width="200" height="200" fill="#e9ecef"/><path d="M300 90 L360 160 H440 L500 90" fill="#dee2e6"/>${shelf(360, 160, 80, 3, ['#ffb703', '#e63946', '#2a9d8f'])}
      ${floor('#e6e9ed', '#cdd3da')}${crowd(300, 2, ['#8896a5', '#a2acb8'])}
      <g transform="translate(330,250)"><rect x="0" y="0" width="70" height="40" rx="4" fill="none" stroke="#6c757d" stroke-width="4"/><path d="M0 0 l-10 -12" stroke="#6c757d" stroke-width="4"/><circle cx="12" cy="52" r="6" fill="#495057"/><circle cx="58" cy="52" r="6" fill="#495057"/></g>`,
    deli: () => `<rect width="800" height="300" fill="#fbf3e8"/>
      ${sign(470, 26, 280, 'Frische-Theke · Käse & Wurst', '#8d2a1e')}
      <rect x="40" y="40" width="300" height="150" fill="#efe1cd"/>${[60, 130, 200, 270].map((x, i) => `<path d="M${x} 60 v60" stroke="#8d6e63" stroke-width="3"/><ellipse cx="${x}" cy="130" rx="16" ry="26" fill="${['#c1121f', '#bc6c25', '#dda15e', '#9c6644'][i]}"/>`).join('')}
      ${floor('#d9c7ae', '#c4b096')}
      <rect x="360" y="196" width="420" height="120" rx="8" fill="#e8e8e8"/><path d="M360 196 L400 140 H780 V196 Z" fill="#cfe8f3" opacity=".7" stroke="#9fb7c4" stroke-width="2"/>
      ${[[400, '#ffd166'], [460, '#f4a261'], [520, '#ffe8a3'], [580, '#e5989b'], [640, '#c9184a'], [700, '#ffd166']].map(([x, c]) => `<path d="M${x} 190 l20 -26 l20 26 z" fill="${c}"/>`).join('')}
      <rect x="360" y="190" width="420" height="10" fill="#bfc5ca"/>`,
    checkout: () => `<rect width="800" height="300" fill="#eef2f5"/><rect width="800" height="26" fill="#2a9d8f"/>
      ${shelf(30, 60, 200, 4, ['#e63946', '#ffb703', '#2a9d8f', '#457b9d'])}
      <g><rect x="620" y="50" width="70" height="40" rx="6" fill="#2a9d8f"/><text x="655" y="78" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="22" font-weight="700" fill="#fff">3</text><line x1="655" y1="26" x2="655" y2="50" stroke="#888" stroke-width="2"/></g>
      ${floor('#dfe4e9', '#c5ccd4')}${crowd(300, 2)}
      <rect x="300" y="226" width="480" height="90" rx="6" fill="#adb5bd"/><rect x="290" y="212" width="320" height="18" rx="4" fill="#343a40"/>
      <g class="belt-move" style="animation-duration:5s"><rect x="300" y="196" width="26" height="18" rx="3" fill="#e63946"/><rect x="340" y="190" width="18" height="24" rx="3" fill="#ffb703"/></g>
      <rect x="610" y="196" width="50" height="20" rx="3" fill="#495057"/><rect class="beep" x="620" y="200" width="30" height="5" fill="#e63946"/>
      ${screen(690, 150)}`,
    practice: () => `<rect width="800" height="300" fill="#f1f8f6"/>
      <g><rect x="40" y="30" width="250" height="70" rx="8" fill="#fff" stroke="#2a9d8f" stroke-width="3"/><text x="165" y="60" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="20" fill="#1b6f66">Praxis Dr. Braun</text><text x="165" y="84" text-anchor="middle" font-family="Nunito, sans-serif" font-size="13" fill="#555">Allgemeinmedizin · Mo–Fr 8–12</text></g>
      <rect x="330" y="40" width="120" height="150" rx="6" fill="#fff"/><path d="M350 70 h80 M350 95 h80 M350 120 h60 M350 145 h70" stroke="#b0bec5" stroke-width="5"/>
      ${clock(520, 70)}
      ${floor('#dfe8e5', '#c3d3ce')}
      ${[50, 120, 190].map((x) => `<rect x="${x}" y="260" width="56" height="12" rx="4" fill="#2a9d8f"/><rect x="${x}" y="226" width="56" height="38" rx="6" fill="#3fb5a3"/><rect x="${x + 6}" y="272" width="6" height="30" fill="#555"/><rect x="${x + 44}" y="272" width="6" height="30" fill="#555"/>`).join('')}
      ${counterDesk(450, 320, '#fff', '#2a9d8f')}${screen(660, 160)}`,
    exam: () => `<rect width="800" height="300" fill="#eef6f8"/>
      <g><rect x="60" y="40" width="120" height="170" rx="4" fill="#fff" stroke="#b0bec5" stroke-width="3"/>${['E', 'F P', 'T O Z', 'L P E D'].map((t, i) => `<text x="120" y="${80 + i * 34}" text-anchor="middle" font-family="monospace" font-weight="700" font-size="${30 - i * 6}" fill="#222">${t}</text>`).join('')}</g>
      <rect x="560" y="50" width="190" height="130" fill="#bde0fe"/><rect x="560" y="50" width="190" height="130" fill="none" stroke="#90a4ae" stroke-width="6"/><path d="M560 115 H750" stroke="#90a4ae" stroke-width="4"/>
      ${floor('#d7e3e7', '#bccbd0')}
      <rect x="220" y="230" width="320" height="22" rx="8" fill="#a8dadc"/><rect x="220" y="216" width="80" height="20" rx="8" fill="#fff"/><rect x="240" y="252" width="10" height="50" fill="#78909c"/><rect x="510" y="252" width="10" height="50" fill="#78909c"/>
      <g><rect x="600" y="196" width="150" height="110" rx="6" fill="#fff" stroke="#cfd8dc" stroke-width="3"/><path d="M600 240 H750 M675 196 V306" stroke="#cfd8dc" stroke-width="3"/><rect x="616" y="170" width="20" height="26" rx="3" fill="#90caf9"/><rect x="644" y="178" width="30" height="18" rx="3" fill="#e0e0e0"/></g>`,
    pharmacy: () => `<rect width="800" height="300" fill="#f7f9f9"/>
      <g><rect x="40" y="24" width="80" height="80" rx="10" fill="#d62828"/><text x="80" y="88" text-anchor="middle" font-family="Georgia, serif" font-size="66" font-weight="700" fill="#fff">A</text></g>
      <text x="140" y="74" font-family="Fredoka, sans-serif" font-size="26" fill="#d62828">Linden-Apotheke</text>
      ${shelf(420, 40, 350, 4, ['#fff', '#e0f2f1', '#ffcdd2', '#bbdefb', '#fff9c4'])}
      ${floor('#e3e7e8', '#c9cfd1')}${crowd(300, 1)}
      ${counterDesk(400, 380, '#e0e0e0', '#2a9d8f')}<rect x="520" y="186" width="34" height="28" rx="4" fill="#fff" stroke="#999"/><rect x="560" y="194" width="24" height="20" rx="3" fill="#ffcdd2"/>`,
    bank: () => `<rect width="800" height="300" fill="#eef1f6"/>
      <g><rect x="40" y="30" width="200" height="60" rx="8" fill="#0b3d91"/><text x="140" y="70" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="24" fill="#fff">Stadtbank</text></g>
      <rect x="290" y="40" width="200" height="140" fill="#bcd4f6"/>${[300, 340, 390, 440].map((x, i) => `<rect x="${x}" y="${90 + (i % 2) * 20}" width="34" height="${90 - (i % 2) * 20}" fill="#7d93b2"/>`).join('')}<rect x="290" y="40" width="200" height="140" fill="none" stroke="#5c6b7a" stroke-width="6"/>
      <g><rect x="60" y="130" width="90" height="170" rx="8" fill="#5c6b7a"/><rect x="72" y="146" width="66" height="44" fill="#80deea"/><rect x="78" y="205" width="54" height="8" fill="#263238"/>${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect x="${80 + c * 18}" y="${222 + r * 14}" width="12" height="9" rx="2" fill="#cfd8dc"/>`).join('')).join('')}<text x="105" y="125" text-anchor="middle" font-family="Nunito, sans-serif" font-size="12" font-weight="800" fill="#5c6b7a">Geldautomat</text></g>
      ${plant(720)}
      ${floor('#c9d1dc', '#adb7c5')}
      <rect x="400" y="236" width="300" height="16" rx="4" fill="#d7ccc8"/><rect x="420" y="252" width="12" height="54" fill="#8d6e63"/><rect x="670" y="252" width="12" height="54" fill="#8d6e63"/>${screen(600, 188)}<rect x="470" y="226" width="60" height="10" fill="#fff"/>`,
    interview: () => `<rect width="800" height="300" fill="#eaeef3"/>
      <rect x="0" y="0" width="800" height="230" fill="#dfe6ee"/>${[0, 1, 2, 3].map((i) => `<rect x="${40 + i * 190}" y="30" width="170" height="190" fill="#c7dcef" opacity=".8"/><rect x="${40 + i * 190}" y="30" width="170" height="190" fill="none" stroke="#9aa9b8" stroke-width="5"/>`).join('')}
      ${[0, 1, 2, 3].map((i) => `<rect x="${60 + i * 190}" y="${110 + (i % 2) * 30}" width="50" height="${106 - (i % 2) * 30}" fill="#9fb3c8" opacity=".7"/><rect x="${130 + i * 190}" y="${80 + (i % 3) * 20}" width="60" height="${136 - (i % 3) * 20}" fill="#9fb3c8" opacity=".55"/>`).join('')}
      <g><circle cx="680" cy="70" r="26" fill="#3a86ff"/><text x="680" y="80" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="28" font-weight="700" fill="#fff">G</text></g>
      ${floor('#b9c2cd', '#9fa9b6')}
      <rect x="300" y="250" width="480" height="16" rx="6" fill="#f5f5f5"/><rect x="320" y="266" width="10" height="40" fill="#9aa5b1"/><rect x="750" y="266" width="10" height="40" fill="#9aa5b1"/>
      <rect x="380" y="232" width="56" height="20" rx="2" fill="#fff" stroke="#ccc"/><rect x="460" y="230" width="20" height="22" rx="3" fill="#3a86ff"/>`,
    shop: () => `<rect width="800" height="300" fill="#fbeff4"/>
      ${sign(300, 24, 200, 'MODEHAUS KÖHLER', '#1f1f1f')}
      ${[60, 520].map((bx) => `<g><line x1="${bx}" y1="90" x2="${bx + 220}" y2="90" stroke="#6c757d" stroke-width="5"/>${[0, 1, 2, 3, 4, 5].map((i) => `<g class="hanger" style="animation-delay:${i * 0.3}s"><path d="M${bx + 20 + i * 36} 90 l-14 14 h28 z" fill="none" stroke="#555" stroke-width="2"/><path d="M${bx + 6 + i * 36} 104 h28 l4 70 h-36 z" fill="${['#e63946', '#457b9d', '#2a9d8f', '#f4a261', '#6d597a', '#e9c46a'][i]}"/></g>`).join('')}<rect x="${bx + 100}" y="90" width="8" height="210" fill="#6c757d"/></g>`).join('')}
      ${floor('#e8d5dc', '#d4bcc5')}${crowd(300, 1, ['#a3899a'])}
      ${counterDesk(470, 300, '#fff', '#c9184a')}${screen(640, 166)}`,
    fitting: () => `<rect width="800" height="300" fill="#f7eef2"/>
      ${[80, 300].map((x) => `<g><rect x="${x}" y="30" width="180" height="270" fill="#fff"/><line x1="${x}" y1="36" x2="${x + 180}" y2="36" stroke="#888" stroke-width="5"/><path class="curtain" d="M${x} 36 h${170} q-10 130 0 264 h-170 q10 -130 0 -264z" fill="#9d4edd"/></g>`).join('')}
      <rect x="560" y="40" width="160" height="240" rx="80" fill="#cfe8f3" stroke="#c9a227" stroke-width="8"/><path d="M600 80 l30 -20 M610 110 l50 -36" stroke="#fff" stroke-width="6" opacity=".7"/>
      ${floor('#e2cfd6', '#cdb5be')}`,
    post: () => `<rect width="800" height="300" fill="#fff9db"/><rect width="800" height="30" fill="#ffcc00"/>
      <g><rect x="40" y="50" width="70" height="70" rx="10" fill="#ffcc00"/><rect x="52" y="68" width="46" height="32" rx="3" fill="#fff" stroke="#1d1d1d" stroke-width="3"/><path d="M52 70 l23 18 l23 -18" stroke="#1d1d1d" stroke-width="3" fill="none"/><text x="125" y="96" font-family="Fredoka, sans-serif" font-size="28" font-weight="700" fill="#1d1d1d">Post · Filiale</text></g>
      ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${60 + c * 52}" y="${150 + r * 40}" width="44" height="32" rx="3" fill="#c8a165" stroke="#8d6e63"/><path d="M${60 + c * 52} ${158 + r * 40} h44" stroke="#e9c46a" stroke-width="3"/>`).join('')).join('')}
      ${floor('#e9dfb8', '#d3c79c')}${crowd(300, 1)}
      ${counterDesk(430, 340, '#ffe066', '#ffcc00')}${screen(650, 160)}<g><rect x="470" y="186" width="60" height="28" rx="2" fill="#c8a165"/><rect x="470" y="196" width="60" height="6" fill="#e9c46a"/></g>`,
    police: () => `<rect width="800" height="300" fill="#e8eef3"/>
      <g><rect x="250" y="24" width="300" height="56" rx="8" fill="#1b4965"/><text x="400" y="62" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="30" font-weight="700" letter-spacing="4" fill="#fff">POLIZEI</text><circle class="siren" cx="270" cy="52" r="8" fill="#3a86ff"/><circle class="siren" style="animation-delay:.5s" cx="530" cy="52" r="8" fill="#3a86ff"/></g>
      <rect x="40" y="100" width="180" height="130" fill="#fff" stroke="#b0bec5" stroke-width="3"/><text x="130" y="128" text-anchor="middle" font-family="Nunito, sans-serif" font-size="14" font-weight="800" fill="#1b4965">Hinweise</text>${[150, 170, 190, 210].map((y) => `<path d="M60 ${y} h140" stroke="#cfd8dc" stroke-width="5"/>`).join('')}
      ${clock(320, 150)}
      ${floor('#c3ced8', '#a8b5c2')}
      ${counterDesk(420, 360, '#cfd8dc', '#1b4965')}${screen(660, 160)}<rect x="560" y="200" width="50" height="14" rx="2" fill="#fff"/>`,
    street: () => `<rect width="800" height="300" fill="#cfe8ff"/>
      ${[[0, 90, '#d9a679'], [170, 60, '#e9c46a'], [360, 80, '#f4a261'], [560, 50, '#a8dadc']].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="${x === 560 ? 240 : 190}" height="${300 - y}" fill="${c}"/>${[0, 1, 2].map((r) => [0, 1, 2].map((k) => `<rect x="${x + 22 + k * 56}" y="${y + 24 + r * 60}" width="34" height="40" fill="#fff" opacity=".85"/>`).join('')).join('')}`).join('')}
      ${floor('#9e9e9e', '#7f7f7f')}${crowd(300, 3)}
      <g><path d="M90 250 h120" stroke="#555" stroke-width="5"/>${[110, 150, 190].map((x) => `<path d="M${x} 250 v50" stroke="#555" stroke-width="4"/>`).join('')}<circle cx="125" cy="282" r="18" fill="none" stroke="#333" stroke-width="4"/><circle cx="175" cy="282" r="18" fill="none" stroke="#333" stroke-width="4"/><path d="M125 282 l20 -24 l30 24 M145 258 h20" stroke="#e63946" stroke-width="4" fill="none"/></g>`,
    doorway: () => `<rect width="800" height="300" fill="#e8d9c5"/>
      <rect x="320" y="40" width="170" height="262" rx="4" fill="#7b4b2a"/><rect x="336" y="56" width="138" height="110" rx="4" fill="#8d5a35"/><rect x="336" y="180" width="138" height="110" rx="4" fill="#8d5a35"/><circle cx="460" cy="180" r="6" fill="#ffd166"/>
      <g><rect x="510" y="140" width="40" height="60" rx="4" fill="#cfd8dc"/><circle class="beep" cx="530" cy="182" r="6" fill="#ffd166"/><text x="530" y="160" text-anchor="middle" font-family="Nunito, sans-serif" font-size="8" font-weight="800" fill="#333">Lena · Max</text></g>
      <rect x="130" y="60" width="120" height="90" fill="#ffcc80" stroke="#8d6e63" stroke-width="6"/><g><rect x="600" y="230" width="60" height="70" rx="4" fill="#8d6e63"/><rect x="618" y="190" width="24" height="40" rx="10" fill="#6a994e"/><path d="M630 190 v-30 M630 175 l-14 -12 M630 170 l14 -12" stroke="#386641" stroke-width="5" stroke-linecap="round"/></g>
      ${floor('#a1887f', '#8d6e63')}<rect x="330" y="300" width="150" height="16" rx="4" fill="#6d4c41"/>`,
    dining: () => `<rect width="800" height="300" fill="#f3e3cf"/>
      ${windowNight(520, 40, 220, 150)}
      <rect x="70" y="50" width="180" height="120" fill="#ffd6a5" stroke="#8d6e63" stroke-width="6"/><circle cx="160" cy="110" r="30" fill="#e76f51" opacity=".7"/>
      ${lamp(400)}
      ${floor('#a47551', '#8d6040')}
      <rect x="180" y="262" width="440" height="14" rx="5" fill="#fffaf0"/><rect x="180" y="276" width="440" height="34" fill="#f1e4d0"/>
      ${[260, 340, 460, 540].map((x) => `<ellipse cx="${x}" cy="262" rx="26" ry="6" fill="#fff" stroke="#ddd"/>`).join('')}
      ${[380, 420].map((x) => `<rect x="${x - 4}" y="236" width="8" height="26" fill="#fffde7"/><path class="flicker" d="M${x} 226 q6 6 0 12 q-6 -6 0 -12z" fill="#ffb703"/>`).join('')}
      <g><rect x="476" y="230" width="14" height="32" rx="4" fill="#6a040f"/><rect x="480" y="220" width="6" height="12" fill="#6a040f"/></g>`,
  });

  Object.assign(BG, {
    emptyflat: () => `<rect width="800" height="300" fill="#f5f1ea"/>
      <rect x="470" y="40" width="240" height="190" fill="#bde0fe"/><path d="M490 230 V150 h40 v80 M560 230 V120 h50 v110 M640 230 V170 h50 v60" fill="#a9c4dc"/><rect x="470" y="40" width="240" height="190" fill="none" stroke="#fff" stroke-width="10"/><path d="M590 40 V230" stroke="#fff" stroke-width="6"/>
      <rect x="80" y="70" width="130" height="232" rx="4" fill="#fff" stroke="#d6cfc2" stroke-width="4"/><circle cx="192" cy="190" r="5" fill="#b0a48f"/>
      <rect x="290" y="250" width="110" height="40" rx="4" fill="#e9ecef" stroke="#adb5bd" stroke-width="3"/><path d="M300 262 h90 M300 274 h90" stroke="#adb5bd" stroke-width="2"/>
      ${floor('#d9b38c', '#c39a6e')}
      <g><rect x="250" y="276" width="56" height="34" fill="#c8a165"/><rect x="250" y="286" width="56" height="5" fill="#e9c46a"/><rect x="262" y="250" width="44" height="28" fill="#b98f55"/></g>`,
    salon: () => `<rect width="800" height="300" fill="#fdf0f5"/>
      ${sign(300, 22, 200, 'Salon Schnittpunkt', '#b5179e')}
      ${[60, 300, 540].map((x) => `<g><rect x="${x}" y="70" width="170" height="150" rx="80" fill="#e3f2fd" stroke="#d4af37" stroke-width="6"/><path d="M${x + 40} 110 l40 -24 M${x + 50} 140 l70 -44" stroke="#fff" stroke-width="6" opacity=".7"/><rect x="${x + 10}" y="226" width="150" height="10" rx="4" fill="#fff"/><circle cx="${x + 40}" cy="218" r="6" fill="#b5179e"/><rect x="${x + 110}" y="206" width="12" height="20" rx="3" fill="#7209b7"/></g>`).join('')}
      ${floor('#ece4e8', '#d6c9cf')}
      <g><rect x="330" y="246" width="80" height="16" rx="6" fill="#222"/><rect x="330" y="214" width="80" height="36" rx="10" fill="#333"/><rect x="364" y="262" width="12" height="40" fill="#888"/><ellipse cx="370" cy="304" rx="34" ry="6" fill="#888"/></g>`,
    phoneshop: () => `<rect width="800" height="300" fill="#f3efff"/><rect width="800" height="28" fill="#5a189a"/>
      ${sign(40, 40, 230, 'Funkwelt · Mobilfunk', '#5a189a')}
      <rect x="40" y="96" width="330" height="120" rx="8" fill="#fff"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${58 + i * 62}" y="112" width="40" height="76" rx="8" fill="#212529"/><rect x="${62 + i * 62}" y="118" width="32" height="62" rx="4" fill="${['#48cae4', '#f72585', '#ffd166', '#06d6a0', '#8338ec'][i]}"/>`).join('')}
      <g><rect x="440" y="40" width="320" height="110" rx="10" fill="#240046"/><text x="600" y="78" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="22" fill="#fff">Tarif „Smart 20“</text><text class="blink" x="600" y="112" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="26" font-weight="700" fill="#ffd166">20 GB · 19,99 €</text><text x="600" y="136" text-anchor="middle" font-family="Nunito, sans-serif" font-size="12" fill="#c8b6ff">monatlich kündbar</text></g>
      ${floor('#e6e0f2', '#cfc6e3')}${crowd(300, 1, ['#8f84a6'])}
      ${counterDesk(450, 320, '#fff', '#3c096c')}${screen(640, 166)}`,
    hospital: () => `<rect width="800" height="300" fill="#eef6f9"/><rect width="800" height="40" fill="#dbe9ef"/>
      <g><rect x="40" y="56" width="250" height="44" rx="6" fill="#d00000"/><text x="165" y="86" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="22" font-weight="700" fill="#fff">NOTAUFNAHME</text></g>
      <g><rect x="330" y="56" width="44" height="44" rx="6" fill="#fff" stroke="#d00000" stroke-width="3"/><path d="M352 64 v28 M338 78 h28" stroke="#d00000" stroke-width="8"/></g>
      <rect x="560" y="60" width="190" height="140" rx="4" fill="#fff" stroke="#b0bec5" stroke-width="3"/><path d="M580 130 l20 0 l10 -30 l14 60 l12 -40 l10 10 h44" stroke="#2ec4b6" stroke-width="3" fill="none" class="beep"/>
      ${floor('#dce8ec', '#c2d3d9')}
      <g><rect x="120" y="226" width="320" height="22" rx="8" fill="#fff" stroke="#cfd8dc" stroke-width="2"/><rect x="120" y="212" width="90" height="20" rx="8" fill="#e3f2fd"/><rect x="140" y="248" width="10" height="44" fill="#90a4ae"/><rect x="410" y="248" width="10" height="44" fill="#90a4ae"/><circle cx="145" cy="296" r="6" fill="#546e7a"/><circle cx="415" cy="296" r="6" fill="#546e7a"/></g>
      <g><path d="M500 300 V150" stroke="#90a4ae" stroke-width="4"/><path d="M486 150 h28" stroke="#90a4ae" stroke-width="4"/><rect x="490" y="156" width="20" height="30" rx="6" fill="#bbdefb" stroke="#90a4ae"/></g>`,
    gym: () => `<rect width="800" height="300" fill="#e9ecef"/><rect width="800" height="300" fill="url(#none)"/>
      <rect x="0" y="0" width="800" height="70" fill="#212529"/><text x="400" y="46" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="28" font-weight="700" letter-spacing="6" fill="#ef476f">FIT &amp; FROH</text>
      <rect x="40" y="90" width="300" height="160" fill="#cfe2f3" stroke="#adb5bd" stroke-width="5"/><path d="M190 90 V250" stroke="#adb5bd" stroke-width="4"/>
      ${floor('#495057', '#343a40')}
      <g><rect x="420" y="190" width="150" height="70" rx="10" fill="#343a40"/><rect x="430" y="172" width="130" height="20" rx="6" fill="#212529"/><rect x="440" y="260" width="110" height="10" fill="#adb5bd" class="belt-slide"/><path d="M560 190 l20 -60" stroke="#6c757d" stroke-width="6"/><rect x="566" y="116" width="34" height="22" rx="4" fill="#212529"/><rect x="570" y="120" width="26" height="14" fill="#06d6a0" class="blink"/></g>
      <g><rect x="630" y="240" width="140" height="8" rx="4" fill="#adb5bd"/>${[640, 660, 740, 760].map((x) => `<rect x="${x}" y="222" width="10" height="44" rx="3" fill="#212529"/>`).join('')}<path d="M650 300 v-50 M760 300 v-50" stroke="#6c757d" stroke-width="5"/></g>
      ${crowd(300, 2, ['#5c677d', '#7d8597'], 1.6)}`,
    stairwell: () => `<rect width="800" height="300" fill="#e9e1d3"/>
      <path d="M0 300 L0 230 L80 230 L80 200 L160 200 L160 170 L240 170 L240 140 L320 140 L320 110 L400 110 V300 Z" fill="#c9b79c"/><path d="M0 230 L400 110" stroke="#6d4c41" stroke-width="6"/><path d="M20 230 v-60 M120 200 v-60 M220 170 v-60 M320 140 v-60" stroke="#6d4c41" stroke-width="3"/><path d="M20 170 L320 80" stroke="#6d4c41" stroke-width="6"/>
      <rect x="470" y="50" width="160" height="252" rx="4" fill="#5d4037"/><rect x="486" y="66" width="128" height="100" rx="4" fill="#6d4c41"/><rect x="486" y="180" width="128" height="106" rx="4" fill="#6d4c41"/><circle cx="600" cy="180" r="6" fill="#ffd166"/><rect x="520" y="110" width="60" height="16" rx="3" fill="#ffd166"/><text x="550" y="123" text-anchor="middle" font-family="Nunito, sans-serif" font-size="10" font-weight="800" fill="#333">Wagner</text>
      <g class="beep"><path d="M650 120 q14 -10 0 -20 M664 128 q24 -18 0 -36" stroke="#e63946" stroke-width="3" fill="none"/><text x="690" y="110" font-size="22">🎵</text></g>
      <rect x="680" y="160" width="80" height="60" fill="#fff" stroke="#adb5bd" stroke-width="2"/><text x="720" y="180" text-anchor="middle" font-family="Nunito, sans-serif" font-size="9" font-weight="800" fill="#333">HAUSORDNUNG</text><path d="M692 192 h56 M692 202 h56 M692 212 h40" stroke="#ced4da" stroke-width="3"/>
      ${floor('#b0a089', '#97866e')}`,
    marketstall: () => `<rect width="800" height="300" fill="#dff3ff"/>
      <g class="clouds"><ellipse cx="160" cy="60" rx="50" ry="16" fill="#fff"/><ellipse cx="560" cy="44" rx="40" ry="13" fill="#fff"/></g>
      ${[0, 1, 2].map((k) => `<rect x="${k * 270 - 20}" y="70" width="250" height="230" fill="${['#f4a261', '#e9c46a', '#a8dadc'][k]}" opacity=".5"/>`).join('')}
      ${floor('#c2b8a3', '#a99f89')}${crowd(300, 3, ['#7d8a99', '#9c8a75', '#6b7887'])}
      <path d="M340 110 L780 110 L760 70 L360 70 Z" fill="#e63946"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<path d="M${360 + i * 40} 70 l20 0 l-6 40 l-34 0 z" fill="#fff" opacity="${i % 2 ? 0 : 0.9}"/>`).join('')}
      <path d="M356 110 V300 M764 110 V300" stroke="#8d6e63" stroke-width="8"/>
      <rect x="350" y="214" width="420" height="100" fill="#8d6e63"/><rect x="340" y="204" width="440" height="16" rx="4" fill="#a1887f"/>
      ${[[380, '#e63946', 'Äpfel 2,80 €/kg'], [480, '#f4a261', 'Möhren 1,50 €'], [580, '#2a9d8f', 'Salat 1,20 €'], [680, '#9d4edd', 'Pflaumen 3,90 €']].map(([x, c, t]) => `<g><rect x="${x - 40}" y="176" width="84" height="30" rx="4" fill="#c8a165"/>${[0, 1, 2, 3, 4].map((j) => `<circle cx="${x - 26 + j * 13}" cy="${176 - (j % 2) * 6}" r="8" fill="${c}"/>`).join('')}<rect x="${x - 34}" y="140" width="72" height="18" rx="3" fill="#fff"/><text x="${x + 2}" y="153" text-anchor="middle" font-family="Nunito, sans-serif" font-size="9" font-weight="800" fill="#333">${t}</text></g>`).join('')}`,
  });

  // lighting per background: '' = daylight, 'evening' = warm, 'night' = dark blue, 'cool' = fluorescent
  const MOOD = { restaurant: 'evening', dining: 'evening', doorway: 'evening', hotelroom: 'evening', security: 'cool', amt: 'cool', counter: 'cool', police: 'cool', exam: 'cool', practice: 'cool', checkout: 'cool', hospital: 'cool', stairwell: 'night', phoneshop: 'cool' };

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

  const speakMode = () => Rec.supported && !(GL.Speak && GL.Speak.micBlocked) && Store.state.settings.sceneSpeak !== false;

  function player(sc) {
    let token = 0, sceneIdx = 0, stepIdx = 0, choices = 0, firstTry = 0, auto = true, showEn = Store.state.settings.showEn;
    return {
      html: `<p><a href="#/scenes">← All scenes</a></p>
        <div class="scn-player">
          <div class="scn-top"><div><span class="scn-big-icon">${sc.icon}</span> <b>${esc(sc.title)}</b> <span class="muted">· ${esc(sc.en)}</span></div>
            <div class="scn-dots">${sc.scenes.map((s, i) => `<span data-i="${i}" title="${attr(s.title)}"></span>`).join('')}</div></div>
          <div class="scn-stage" id="scnStage"><div class="scn-cam"><svg class="scn-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice"></svg><div class="scn-actors"></div></div><div class="scn-light"></div><div class="scn-announce"></div><div class="scn-caption"></div><div class="scn-card-overlay"></div></div>
          <div class="scn-controls row"><button class="btn ghost small" id="scnAuto">⏸ Pause after each line</button><button class="btn ghost small" id="scnReplay">🔁 Repeat line</button><button class="btn ghost small" id="scnEn">${showEn ? '🙈 Hide English' : '👀 Show English'}</button>${Rec.supported ? `<button class="btn ghost small" id="scnSpeak">${speakMode() ? '🎤 Speak mode: on' : '🖱️ Speak mode: off'}</button>` : ''}<span class="spacer"></span><span class="pill" id="scnScore">🎯 0 / 0</span></div>
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
        const spBtn = $('#scnSpeak');
        if (spBtn) spBtn.onclick = () => { Store.state.settings.sceneSpeak = !speakMode(); Store.save(); spBtn.textContent = speakMode() ? '🎤 Speak mode: on' : '🖱️ Speak mode: off'; GL.toast(speakMode() ? 'Speak mode on: say your lines out loud at each 🎤 moment.' : 'Speak mode off: choose the right sentence.'); };
        let waitNext = null, pos = {};
        const cam = $('.scn-cam', stage);
        const camera = (x, k = 1.07) => {
          if (x == null) { cam.style.transform = ''; return; }
          cam.style.transformOrigin = `${x}% 75%`;
          cam.style.transform = `scale(${k})`;
        };
        const actorList = () => $$('.scn-actor', actorsEl).map((el) => ({ el, x: pos[el.dataset.c] }));

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
          pos = positions(s.cast.filter((c) => c !== 'ansage'));
          stage.dataset.mood = s.mood || MOOD[s.bg] || '';
          camera(null);
          actorsEl.innerHTML = s.cast.filter((c) => c !== 'ansage').map((c) => `<div class="scn-actor walk-in-${c === 'alex' ? 'l' : 'r'} ${pos[c] > 60 ? 'side-r' : ''}" data-c="${c}" style="left:${pos[c]}%">
            <div class="scn-bubble"></div>${GL.charSVG(c, 'idle walking')}<span class="nm">${(s.bg === 'phone' || s.call) && c !== 'alex' ? '📞 ' : ''}${esc(GL.chars[c].name)}</span></div>`).join('');
          setTimeout(() => $$('svg.char', actorsEl).forEach((x) => x.classList.remove('walking')), 1300);
          const ov = $('.scn-card-overlay', stage);
          ov.innerHTML = `<div><small>Szene ${i + 1} von ${sc.scenes.length}</small><b>${esc(s.title)}</b><span>${esc(s.en)}</span></div>`;
          ov.classList.remove('show'); void ov.offsetWidth; ov.classList.add('show');
          log.insertAdjacentHTML('beforeend', `<div class="scn-log-title">Szene ${i + 1}: ${esc(s.title)}</div>`);
        }
        function speakLine(c, de, my) {
          $$('.scn-bubble', actorsEl).forEach((b) => b.classList.remove('show'));
          const en = (lastLine && lastLine[2]) || '';
          if (c === '_') {
            // narration: a caption on stage, not spoken
            const cap = $('.scn-caption', stage);
            cap.innerHTML = `<span>${esc(de)}</span>${en ? `<small>${esc(en)}</small>` : ''}`;
            cap.classList.add('show');
            camera(null);
            return GL.sleep(1600 + de.length * 35).then(() => cap.classList.remove('show'));
          }
          if (c === 'ansage') {
            const an = $('.scn-announce', stage);
            an.innerHTML = `<b>📢 Durchsage</b><span class="sb-de">${esc(de)}</span>${en ? `<span class="sb-en">${esc(en)}</span>` : ''}`;
            an.classList.add('show');
            camera(null);
            GL.lookAt(actorList(), null);
            GL.sfx('chime');
            const t0 = Date.now();
            return GL.sleep(1400).then(() => (alive(my) ? Speech.speak(de, { char: 'ansage' }) : null)).then(async () => {
              const rest = 1400 + de.length * 45 - (Date.now() - t0);
              if (rest > 0 && alive(my)) await GL.sleep(rest);
              an.classList.remove('show');
            });
          }
          const actor = $(`.scn-actor[data-c="${c}"]`, actorsEl);
          $$('.scn-actor', actorsEl).forEach((a) => a.classList.toggle('speaking', a === actor));
          actorsEl.classList.toggle('has-speaker', !!actor);
          if (actor) {
            const b = $('.scn-bubble', actor);
            b.innerHTML = `<span class="sb-de">${esc(de)}</span>${en ? `<span class="sb-en">${esc(en)}</span>` : ''}`;
            b.classList.add('show');
            camera(pos[c], 1.06);
            GL.lookAt(actorList(), pos[c]);
          }
          const svg = actor && $('svg.char', actor);
          const t0 = Date.now();
          return GL.charSay(svg, de, c).then(async () => {
            const rest = 500 + de.length * 42 - (Date.now() - t0);
            if (rest > 0 && alive(my)) await GL.sleep(rest);
            if (actor) actor.classList.remove('speaking');
            actorsEl.classList.remove('has-speaker');
          });
        }
        function addLog(c, de, en) {
          if (c === '_') log.insertAdjacentHTML('beforeend', `<div class="scn-log-note">🎬 ${esc(de)}${en ? ` <span class="ln-en">– ${esc(en)}</span>` : ''}</div>`);
          else log.insertAdjacentHTML('beforeend', `<div class="ln ${c === 'alex' ? 'right' : ''}"><div class="av">${GL.charSVG(c)}</div><div class="bub" data-say="${attr(de)}" data-char="${c}"><div class="ln-who">${esc(GL.chars[c].name)}</div><div class="ln-de">${esc(de)}</div><div class="ln-en">${esc(en || '')}</div></div></div>`);
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
            camera(pos.alex, 1.05);
            GL.lookAt(actorList(), pos.alex);
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
            // speak mode: say the line instead of clicking it
            if (speakMode() && GL.Speak) {
              const opts = $('.opts', panel);
              opts.classList.add('hidden');
              opts.insertAdjacentHTML('beforebegin', '<div class="scn-speak"><div class="sp-slot"></div><button class="btn tiny ghost" id="scnShowOpts">🖱️ Show the options instead</button></div>');
              const showOpts = () => { opts.classList.remove('hidden'); const b = $('#scnShowOpts'); b && b.remove(); };
              $('#scnShowOpts').onclick = showOpts;
              let fails = 0;
              GL.Speak.attempt($('.scn-speak .sp-slot', panel), {
                targets: [st.o[st.a]], wrong: st.o.filter((_, k) => k !== st.a), noListen: true, hideTarget: true, pass: 80, wrongHint: st.ex,
                label: 'Say your answer out loud',
                onBlocked: () => { showOpts(); const sp = $('.scn-speak', panel); sp && sp.remove(); GL.toast('Microphone not available here – choose the sentence instead.'); },
                onResult: (r) => {
                  if (r.ok) { pickOpt($(`.opt[data-i="${st.a}"]`, panel)); const ss = $('#scnSay'); ss && ss.remove(); const sp = $('.scn-speak', panel); sp && sp.remove(); return; }
                  if (r.matchedWrong) { const wb = $$('.opt', panel).find((b) => st.o[+b.dataset.i] === r.matchedWrong); if (wb) pickOpt(wb); }
                  else { tries++; fails++; }
                  if (fails >= 2 || r.matchedWrong) showOpts();
                },
              });
            }
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
          camera(null);
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
          GL.track && GL.track('scene', `Real-life scene „${sc.title}“: ${pct}% on the first try`);
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
