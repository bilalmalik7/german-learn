/* Animated SVG characters: shaded faces, eyes that look at the speaker, lip-sync from the spoken text,
   automatic expressions (smile / worried / curious), talking gestures, breathing and blinking. */
(function () {
  'use strict';

  GL.chars = {
    bruno: { name: 'Bruno', role: 'Your tutor – a bear from Berlin', gender: 'm', pitch: 0.75, rate: 0.95, color: '#a0693c' },
    lena: { name: 'Lena', role: 'Student from Berlin', gender: 'f', pitch: 1.1, rate: 1, color: '#e76f51' },
    max: { name: 'Max', role: 'Lena’s friend from Hamburg', gender: 'm', pitch: 1.0, rate: 1, color: '#3a86ff' },
    sofia: { name: 'Sofia', role: 'Exchange student from Spain', gender: 'f', pitch: 1.3, rate: 1, color: '#f4a261' },
    weber: { name: 'Frau Weber', role: 'Neighbour & landlady', gender: 'f', pitch: 0.9, rate: 0.92, color: '#9b5de5' },
    yilmaz: { name: 'Herr Yılmaz', role: 'Owns the café “Sonnenschein”', gender: 'm', pitch: 0.85, rate: 0.95, color: '#2a9d8f' },
    braun: { name: 'Dr. Braun', role: 'Family doctor', gender: 'm', pitch: 0.7, rate: 0.9, color: '#577590' },
    alex: { name: 'Alex (you)', role: 'That’s you in the real-life scenes', pitch: 1.0, rate: 1, color: '#ff8c42' },
    schmidt: { name: 'Frau Schmidt', role: 'Airline staff', gender: 'f', pitch: 1.05, rate: 1, color: '#1d3557' },
    wolf: { name: 'Herr Wolf', role: 'Airport security', gender: 'm', pitch: 0.8, rate: 0.95, color: '#34495e' },
    novak: { name: 'Herr Novak', role: 'Baggage service in Vienna', gender: 'm', pitch: 0.9, rate: 0.95, color: '#5c677d' },
    becker: { name: 'Frau Becker', role: 'Team leader at TechNord', gender: 'f', pitch: 0.95, rate: 0.95, color: '#6c757d' },
    jonas: { name: 'Jonas', role: 'Colleague at TechNord', gender: 'm', pitch: 1.1, rate: 1.05, color: '#43aa8b' },
    hoffmann: { name: 'Herr Hoffmann', role: 'Clerk at the Bürgeramt', gender: 'm', pitch: 0.75, rate: 0.9, color: '#8d6e63' },
    mia: { name: 'Mia', role: 'Waitress at „Zur Linde“', gender: 'f', pitch: 1.2, rate: 1.05, color: '#c1121f' },
    kaya: { name: 'Herr Kaya', role: 'Deutsche Bahn staff', gender: 'm', pitch: 0.9, rate: 1, color: '#c8102e' },
    lange: { name: 'Frau Lange', role: 'Hotel receptionist', gender: 'f', pitch: 1.05, rate: 1, color: '#7b2d43' },
    demir: { name: 'Herr Demir', role: 'Supermarket staff', gender: 'm', pitch: 0.85, rate: 1, color: '#2d6a4f' },
    vogel: { name: 'Frau Vogel', role: 'Medical assistant at the practice', gender: 'f', pitch: 1.15, rate: 1.05, color: '#0f9b8e' },
    neumann: { name: 'Herr Neumann', role: 'Pharmacist', gender: 'm', pitch: 0.8, rate: 0.95, color: '#48cae4' },
    richter: { name: 'Frau Richter', role: 'Bank advisor', gender: 'f', pitch: 0.95, rate: 0.95, color: '#003f88' },
    krueger: { name: 'Herr Krüger', role: 'HR manager', gender: 'm', pitch: 0.75, rate: 0.95, color: '#343a40' },
    meier: { name: 'Frau Meier', role: 'Head of department', gender: 'f', pitch: 0.9, rate: 0.95, color: '#6d597a' },
    lisa: { name: 'Lisa', role: 'Shop assistant', gender: 'f', pitch: 1.25, rate: 1.05, color: '#ff006e' },
    peters: { name: 'Herr Peters', role: 'Post office clerk', gender: 'm', pitch: 0.85, rate: 0.95, color: '#ffcc00' },
    hahn: { name: 'Frau Hahn', role: 'Police officer', gender: 'f', pitch: 1.0, rate: 0.95, color: '#1b4965' },
    frank: { name: 'Frau Frank', role: 'Train conductor', gender: 'f', pitch: 1.0, rate: 1, color: '#c8102e' },
    berg: { name: 'Herr Berg', role: 'Fellow traveller', gender: 'm', pitch: 0.8, rate: 0.92, color: '#6b705c' },
    jana: { name: 'Jana', role: 'Cashier at the supermarket', gender: 'f', pitch: 1.2, rate: 1.05, color: '#2a9d8f' },
    schulz: { name: 'Herr Schulz', role: 'Landlord', gender: 'm', pitch: 0.75, rate: 0.95, color: '#7a8b6f' },
    yildiz: { name: 'Frau Yıldız', role: 'Hairdresser', gender: 'f', pitch: 1.1, rate: 1.05, color: '#b5179e' },
    tim: { name: 'Tim', role: 'Phone shop assistant', gender: 'm', pitch: 1.1, rate: 1.08, color: '#5a189a' },
    falk: { name: 'Leitstelle 112', role: 'Emergency dispatcher', gender: 'm', pitch: 0.85, rate: 0.95, color: '#d00000' },
    klein: { name: 'Dr. Klein', role: 'Emergency room doctor', gender: 'f', pitch: 1.0, rate: 1, color: '#4ea8de' },
    lorenz: { name: 'Frau Lorenz', role: 'Clerk at the immigration office', gender: 'f', pitch: 0.9, rate: 0.92, color: '#8d6e63' },
    kevin: { name: 'Kevin', role: 'Fitness trainer', gender: 'm', pitch: 1.0, rate: 1.08, color: '#ef476f' },
    wagner: { name: 'Herr Wagner', role: 'New neighbour', gender: 'm', pitch: 0.95, rate: 1.02, color: '#6c757d' },
    brandt: { name: 'Frau Brandt', role: 'Market stall owner', gender: 'f', pitch: 0.95, rate: 0.95, color: '#588157' },
    ansage: { name: 'Durchsage', role: 'Announcement', gender: 'f', pitch: 1.05, rate: 0.95, color: '#ffce00' },
  };

  /* Looks. eyes = iris colour. Accessories: glasses, cap, tie, scarf, beard, mustache, apron, coat, hood, blazer, badge, scrubs, vest, polo. */
  const looks = {
    lena: { skin: '#f6d1b5', hair: '#c4552d', hairStyle: 'long', shirt: '#2a9d8f', collar: '#ffffff', eyes: '#3d7a3a' },
    max: { skin: '#f1c7a3', hair: '#5a3b24', hairStyle: 'short', shirt: '#3a86ff', collar: '#1d4fa8', eyes: '#3b6fb6', polo: true },
    sofia: { skin: '#d9a47e', hair: '#2b1d16', hairStyle: 'curly', shirt: '#ffce00', collar: '#e0a800', eyes: '#4a2c1a' },
    weber: { skin: '#f3d3be', hair: '#b9b9c3', hairStyle: 'bun', shirt: '#9b5de5', collar: '#6a32b8', glasses: true, eyes: '#5a6d8a' },
    yilmaz: { skin: '#d6a27c', hair: '#1f1a17', hairStyle: 'short', shirt: '#2a9d8f', collar: '#ffffff', mustache: true, apron: true, eyes: '#3a2414' },
    braun: { skin: '#f0cdb2', hair: '#8a8a8a', hairStyle: 'side', shirt: '#ffffff', collar: '#577590', glasses: true, coat: true, tie: '#577590', eyes: '#4b6b8a' },
    alex: { skin: '#c99272', hair: '#2b1d16', hairStyle: 'side', shirt: '#ff8c42', collar: '#e06d1f', hood: true, eyes: '#3a2414' },
    schmidt: { skin: '#f3d0b8', hair: '#d9a648', hairStyle: 'bun', shirt: '#1d3557', collar: '#14243d', scarf: '#e63946', blazer: true, badge: true, eyes: '#3b6fb6' },
    wolf: { skin: '#e9c2a0', hair: '#4a3426', hairStyle: 'buzz', shirt: '#34495e', collar: '#22313f', cap: '#22313f', badge: true, eyes: '#4a5a3a' },
    novak: { skin: '#e2b593', hair: '#3b2a20', hairStyle: 'side', shirt: '#5c677d', collar: '#3e4656', beard: true, badge: true, eyes: '#4a2c1a' },
    becker: { skin: '#f1cfb4', hair: '#6b4a3a', hairStyle: 'bob', shirt: '#495057', collar: '#ffffff', glasses: true, blazer: true, eyes: '#4a2c1a' },
    jonas: { skin: '#f0c8a8', hair: '#b07a34', hairStyle: 'curly', shirt: '#43aa8b', collar: '#2d7d65', eyes: '#3d7a3a' },
    hoffmann: { skin: '#efcfb5', hair: '#9a9a9a', hairStyle: 'bald', shirt: '#8d6e63', collar: '#ffffff', glasses: true, tie: '#1d3557', vest: true, eyes: '#5a6d8a' },
    mia: { skin: '#f5d5c0', hair: '#7a2e1f', hairStyle: 'ponytail', shirt: '#222222', collar: '#444444', apron: true, eyes: '#3d7a3a' },
    kaya: { skin: '#cf9a74', hair: '#1f1a17', hairStyle: 'short', shirt: '#1d2a44', collar: '#eef1f4', cap: '#c8102e', tie: '#c8102e', blazer: true, badge: true, eyes: '#3a2414' },
    lange: { skin: '#f4d2bc', hair: '#e6c27a', hairStyle: 'long', shirt: '#7b2d43', collar: '#ffffff', blazer: true, badge: true, eyes: '#3b6fb6' },
    demir: { skin: '#c88f68', hair: '#241a14', hairStyle: 'short', shirt: '#2d6a4f', collar: '#1b4332', beard: true, polo: true, badge: true, eyes: '#3a2414' },
    vogel: { skin: '#f2cdb4', hair: '#5b3a29', hairStyle: 'ponytail', shirt: '#0f9b8e', collar: '#0b7268', scrubs: true, badge: true, eyes: '#4a2c1a' },
    neumann: { skin: '#eac4a6', hair: '#c9c9c9', hairStyle: 'side', shirt: '#ffffff', collar: '#48cae4', coat: true, glasses: true, eyes: '#5a6d8a' },
    richter: { skin: '#e7b996', hair: '#1e1e24', hairStyle: 'bob', shirt: '#003f88', collar: '#ffffff', blazer: true, eyes: '#3a2414' },
    krueger: { skin: '#efcbb0', hair: '#7d7d7d', hairStyle: 'side', shirt: '#343a40', collar: '#ffffff', blazer: true, tie: '#9d0208', eyes: '#4b6b8a' },
    meier: { skin: '#f0cfb8', hair: '#a8a8b3', hairStyle: 'bob', shirt: '#6d597a', collar: '#ffffff', glasses: true, blazer: true, eyes: '#3d7a3a' },
    lisa: { skin: '#e8b48f', hair: '#2b1d16', hairStyle: 'ponytail', shirt: '#ff006e', collar: '#c9005a', badge: true, eyes: '#4a2c1a' },
    peters: { skin: '#f1c9aa', hair: '#6b4a2f', hairStyle: 'buzz', shirt: '#ffcc00', collar: '#1d3557', polo: true, badge: true, mustache: true, eyes: '#3b6fb6' },
    frank: { skin: '#e8b896', hair: '#5a3825', hairStyle: 'ponytail', shirt: '#1d2a44', collar: '#eef1f4', scarf: '#c8102e', blazer: true, badge: true, eyes: '#4a2c1a' },
    berg: { skin: '#f0c8a8', hair: '#d6d6d6', hairStyle: 'side', shirt: '#6b705c', collar: '#a5a58d', scarf: '#bc4749', mustache: true, eyes: '#4b6584' },
    jana: { skin: '#f6d2b8', hair: '#2b2b2b', hairStyle: 'bob', shirt: '#2a9d8f', collar: '#1d7a6f', polo: true, badge: true, eyes: '#5a3e2b' },
    schulz: { skin: '#eec3a1', hair: '#6b4f3a', hairStyle: 'side', shirt: '#7a8b6f', collar: '#ffffff', beard: true, vest: true, eyes: '#4b6584' },
    yildiz: { skin: '#dcaa84', hair: '#3b1f1a', hairStyle: 'long', shirt: '#222222', collar: '#b5179e', apron: true, eyes: '#4a2c1a' },
    tim: { skin: '#f2cbb0', hair: '#c58b4a', hairStyle: 'short', shirt: '#5a189a', collar: '#3c096c', polo: true, badge: true, eyes: '#3b6fb6' },
    falk: { skin: '#e5b896', hair: '#4a3426', hairStyle: 'buzz', shirt: '#d00000', collar: '#9d0208', badge: true, eyes: '#4a5a3a' },
    klein: { skin: '#f1cdb3', hair: '#3b2a20', hairStyle: 'ponytail', shirt: '#4ea8de', collar: '#2a7fb8', scrubs: true, badge: true, glasses: true, eyes: '#4a2c1a' },
    lorenz: { skin: '#f3d6c2', hair: '#9e9e9e', hairStyle: 'bob', shirt: '#8d6e63', collar: '#ffffff', glasses: true, blazer: true, eyes: '#5a6d8a' },
    kevin: { skin: '#b9825e', hair: '#1a1a1a', hairStyle: 'buzz', shirt: '#ef476f', collar: '#c9184a', polo: true, eyes: '#3a2414' },
    wagner: { skin: '#f0c8a8', hair: '#2b2b2b', hairStyle: 'curly', shirt: '#6c757d', collar: '#495057', hood: true, beard: true, eyes: '#4a2c1a' },
    brandt: { skin: '#f0c9ae', hair: '#c9c9c9', hairStyle: 'bun', shirt: '#588157', collar: '#3a5a40', apron: true, scarf: '#e9c46a', eyes: '#3d7a3a' },
    hahn: { skin: '#f3cfb6', hair: '#8c5a3c', hairStyle: 'bun', shirt: '#1b4965', collar: '#13344a', cap: '#13344a', badge: true, eyes: '#3d7a3a' },
  };

  /* ---------- colour helpers ---------- */
  const hex = (c) => { c = c.replace('#', ''); if (c.length === 3) c = c.split('').map((x) => x + x).join(''); return [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16)); };
  const toHex = (a) => '#' + a.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const mix = (c, t, p) => { const a = hex(c), b = hex(t); return toHex(a.map((v, i) => v + (b[i] - v) * p)); };
  const light = (c, p) => mix(c, '#ffffff', p), dark = (c, p) => mix(c, '#000000', p);
  let uidN = 0;

  function hair(o, layer, fill) {
    const c = fill;
    switch (o.hairStyle) {
      case 'long':
        return layer === 'back'
          ? `<path d="M50 104 C42 50 80 32 102 34 C130 34 162 56 152 106 L158 174 C142 184 122 178 116 162 L84 162 C78 178 58 184 42 174 Z" fill="${c}"/>`
          : `<path d="M56 98 C56 58 86 42 108 46 C134 50 150 72 146 100 C134 80 116 68 92 70 C76 74 64 84 56 98 Z" fill="${c}"/><path d="M100 52 C92 60 84 66 74 72" stroke="${dark(o.hair, 0.25)}" stroke-width="1.5" fill="none" opacity=".5"/>`;
      case 'bob':
        return layer === 'back'
          ? `<path d="M50 104 C44 52 80 34 102 36 C128 36 160 56 150 106 L152 140 C140 150 126 146 124 138 L76 138 C74 146 60 150 48 140 Z" fill="${c}"/>`
          : `<path d="M55 104 C52 60 82 44 104 46 C130 48 150 66 146 104 C140 84 128 72 112 66 C108 74 92 80 70 82 C62 88 58 96 55 104 Z" fill="${c}"/>`;
      case 'ponytail':
        return layer === 'back'
          ? `<path d="M128 56 C160 52 168 90 156 130 C150 150 140 160 132 164 C142 140 146 110 132 84 Z" fill="${c}"/>`
          : `<path d="M56 100 C52 60 80 44 104 46 C128 48 150 64 145 100 C138 80 124 68 104 66 C86 66 66 78 56 100 Z" fill="${c}"/><circle cx="136" cy="62" r="5" fill="${dark(o.hair, 0.35)}"/>`;
      case 'short':
        return layer === 'back' ? '' :
          `<path d="M55 100 C48 56 82 38 106 42 C134 46 152 66 146 100 C142 84 132 72 116 68 C102 78 76 76 62 86 Z" fill="${c}"/>`;
      case 'buzz':
        return layer === 'back' ? '' :
          `<path d="M57 92 C56 60 80 48 102 48 C126 48 146 60 143 92 C136 74 120 66 100 66 C80 66 64 74 57 92 Z" fill="${c}" opacity=".92"/>`;
      case 'side':
        return layer === 'back' ? '' :
          `<path d="M56 98 C52 62 78 44 104 46 C132 48 150 66 145 96 C138 80 128 70 98 70 C80 72 66 82 56 98 Z" fill="${c}"/><path d="M98 70 C112 58 128 56 140 64" stroke="${dark(o.hair, 0.3)}" stroke-width="1.6" fill="none" opacity=".5"/>`;
      case 'bun':
        return layer === 'back'
          ? `<circle cx="100" cy="40" r="20" fill="${c}"/><path d="M86 40 q14 -10 28 0" stroke="${dark(o.hair, 0.3)}" stroke-width="1.5" fill="none" opacity=".5"/>`
          : `<path d="M56 100 C52 60 80 46 102 48 C126 48 150 62 145 100 C138 78 120 66 100 66 C82 66 64 78 56 100 Z" fill="${c}"/>`;
      case 'bald':
        return layer === 'back' ? '' :
          `<path d="M56 110 C53 94 57 80 64 72 L69 106 Z M144 110 C147 94 143 80 136 72 L131 106 Z" fill="${c}"/>`;
      case 'curly': {
        if (layer === 'back') return `<path d="M48 112 C38 60 70 32 102 34 C138 34 166 62 152 114 L152 150 C130 160 70 160 48 150 Z" fill="${c}"/>`;
        let s = '';
        [[62, 78], [74, 62], [92, 54], [110, 54], [128, 62], [140, 78], [58, 94], [144, 94], [84, 66], [118, 66]].forEach(([x, y]) => (s += `<circle cx="${x}" cy="${y}" r="13" fill="${c}"/>`));
        return s;
      }
    }
    return '';
  }

  function human(id) {
    const o = looks[id];
    const u = 'c' + ++uidN;
    const shade = dark(o.skin, 0.13), lip = mix(dark(o.skin, 0.32), '#b5485a', 0.45);
    const hd = o.coat ? '#f4f6f8' : o.shirt;
    return `<defs>
        <radialGradient id="${u}s" cx="46%" cy="40%" r="68%"><stop offset="0" stop-color="${light(o.skin, 0.1)}"/><stop offset=".65" stop-color="${o.skin}"/><stop offset="1" stop-color="${shade}"/></radialGradient>
        <linearGradient id="${u}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${light(o.hair, 0.18)}"/><stop offset="1" stop-color="${dark(o.hair, 0.18)}"/></linearGradient>
        <linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${light(hd, 0.1)}"/><stop offset="1" stop-color="${dark(hd, 0.2)}"/></linearGradient>
      </defs>
      <g class="char-inner">
      <g class="torso">
        <path d="M26 222 C28 190 46 170 74 162 L100 158 L126 162 C154 170 172 190 174 222 Z" fill="url(#${u}b)"/>
        <path d="M26 222 C28 196 38 180 56 171 C47 186 45 205 47 222 Z" fill="#000" opacity=".1"/><path d="M174 222 C172 196 162 180 144 171 C153 186 155 205 153 222 Z" fill="#000" opacity=".1"/>
        <path d="M54 182 Q47 202 48 222 M146 182 Q153 202 152 222" stroke="#000" stroke-width="1.5" fill="none" opacity=".12"/>
        ${o.coat ? `<path d="M80 162 L100 200 L120 162 L112 160 L100 178 L88 160 Z" fill="${o.shirt === '#ffffff' ? o.collar : o.shirt}"/><path d="M100 200 V222" stroke="#cfd6dc" stroke-width="2"/><circle cx="108" cy="208" r="2" fill="#adb5bd"/>` : ''}
        ${o.blazer ? `<path d="M84 160 L100 196 L116 160 L126 164 L106 222 H94 L74 164 Z" fill="${o.collar}"/><path d="M74 164 L92 190 L86 162 Z M126 164 L108 190 L114 162 Z" fill="${dark(o.shirt, 0.18)}"/>` : ''}
        ${o.scrubs ? `<path d="M84 160 L100 184 L116 160" fill="none" stroke="${o.collar}" stroke-width="5" stroke-linejoin="round"/>` : ''}
        ${o.polo ? `<path d="M84 160 L94 172 L100 164 L106 172 L116 160 Z" fill="${o.collar}"/><path d="M100 164 V186" stroke="${dark(o.shirt, 0.25)}" stroke-width="1.5"/><circle cx="100" cy="176" r="1.6" fill="#fff"/>` : ''}
        ${!o.coat && !o.blazer && !o.scrubs && !o.polo ? `<path d="M84 160 Q100 178 116 160" fill="none" stroke="${o.collar}" stroke-width="6" stroke-linecap="round"/>` : ''}
        ${o.vest ? `<path d="M72 166 L92 222 H64 C64 196 66 178 72 166 Z M128 166 L108 222 H136 C136 196 134 178 128 166 Z" fill="${dark(o.shirt, 0.2)}"/>` : ''}
        ${o.apron ? `<path d="M70 178 H130 V222 H70 Z" fill="#f4f1de" opacity=".95"/><path d="M78 178 L72 162 M122 178 L128 162" stroke="#f4f1de" stroke-width="4"/><rect x="88" y="190" width="24" height="14" rx="3" fill="none" stroke="#d8d2b8" stroke-width="2"/>` : ''}
        ${o.tie ? `<path d="M100 166 L95 174 L100 210 L105 174 Z" fill="${o.tie}"/><path d="M96 166 h8 l-2 6 h-4 z" fill="${dark(o.tie, 0.25)}"/>` : ''}
        ${o.scarf ? `<path d="M82 160 Q100 176 118 160 L114 172 Q100 182 86 172 Z" fill="${o.scarf}"/><path d="M108 170 l10 18 l8 -4 l-8 -16z" fill="${dark(o.scarf, 0.15)}"/>` : ''}
        ${o.hood ? `<path d="M64 168 Q100 198 136 168" fill="none" stroke="${o.collar}" stroke-width="9" stroke-linecap="round"/><path d="M94 180 v18 M106 180 v18" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>` : ''}
        ${o.badge ? `<rect x="122" y="184" width="22" height="13" rx="2" fill="#fff" stroke="${dark(o.shirt, 0.3)}" stroke-width="1"/><rect x="125" y="188" width="16" height="2" fill="#999"/><rect x="125" y="192" width="10" height="2" fill="#bbb"/>` : ''}
      </g>
      <path d="M86 132 h28 v28 q-14 11 -28 0 z" fill="${shade}"/>
      <ellipse cx="100" cy="146" rx="17" ry="6" fill="#000" opacity=".13"/>
      <g class="head">
        ${hair(o, 'back', `url(#${u}h)`)}
        <path d="M49 100 c-6 -2 -9 8 -6 14 c3 7 8 9 11 6 Z" fill="${shade}"/><path d="M151 100 c6 -2 9 8 6 14 c-3 7 -8 9 -11 6 Z" fill="${shade}"/>
        <path d="M55 98 C55 60 76 49 100 49 C124 49 145 60 145 98 C145 128 129 148 100 151 C71 148 55 128 55 98 Z" fill="url(#${u}s)"/>
        <path d="M60 116 C66 136 82 148 100 150 C84 144 70 132 64 112 Z" fill="#000" opacity=".06"/>
        ${hair(o, 'front', `url(#${u}h)`)}
        ${o.cap ? `<path d="M52 82 C56 46 144 46 148 82 Z" fill="${o.cap}"/><path d="M50 82 H160 Q158 91 148 91 H50 Z" fill="${dark(o.cap, 0.2)}"/><circle cx="100" cy="64" r="6.5" fill="#ffce00"/>` : ''}
        <path class="brow bl" d="M71 89 q10 -8 21 -2 l-1 3.2 q-9 -4.6 -19 1.6 z" fill="${dark(o.hair, 0.15)}"/>
        <path class="brow br" d="M129 89 q-10 -8 -21 -2 l1 3.2 q9 -4.6 19 1.6 z" fill="${dark(o.hair, 0.15)}"/>
        <g class="eyes">
          <ellipse cx="83" cy="103" rx="6.6" ry="4.8" fill="#fbfbf8"/><ellipse cx="117" cy="103" rx="6.6" ry="4.8" fill="#fbfbf8"/>
          <g class="iris"><circle cx="83" cy="103" r="3.7" fill="${o.eyes || '#4a2c1a'}"/><circle cx="117" cy="103" r="3.7" fill="${o.eyes || '#4a2c1a'}"/>
            <circle cx="83" cy="103" r="1.9" fill="#111"/><circle cx="117" cy="103" r="1.9" fill="#111"/>
            <circle cx="84.3" cy="101.6" r="1.1" fill="#fff"/><circle cx="118.3" cy="101.6" r="1.1" fill="#fff"/></g>
          <path d="M76 101 q7 -6 14 0 M110 101 q7 -6 14 0" stroke="#2b2b2b" stroke-width="1.7" fill="none" stroke-linecap="round"/>
        </g>
        ${o.glasses ? `<g fill="rgba(180,210,240,.16)" stroke="#2f2f2f" stroke-width="2.2"><rect x="71" y="94" width="24" height="18" rx="7"/><rect x="105" y="94" width="24" height="18" rx="7"/><path d="M95 102 h10 M71 100 l-13 -3 M129 100 l13 -3" fill="none"/></g>` : ''}
        <ellipse class="blush" cx="70" cy="121" rx="8" ry="5" fill="#ff7b9c" opacity=".22"/><ellipse class="blush" cx="130" cy="121" rx="8" ry="5" fill="#ff7b9c" opacity=".22"/>
        <path d="M101 104 q-3 9 -6 13 q4 3.5 9 1.5" stroke="${dark(o.skin, 0.25)}" stroke-width="2" fill="none" stroke-linecap="round"/>
        <ellipse cx="100" cy="117" rx="7" ry="3" fill="#000" opacity=".05"/>
        ${o.beard ? `<path d="M60 112 C62 152 84 154 100 154 C116 154 138 152 140 112 C134 134 120 142 100 142 C80 142 66 134 60 112 Z" fill="url(#${u}h)"/>` : ''}
        ${o.mustache ? `<path d="M84 124 q8 -8 16 -2 q8 -6 16 2 q-8 4 -16 0 q-8 4 -16 0z" fill="${dark(o.hair, 0.05)}"/>` : ''}
        <g class="mouth">
          <path class="m-closed" d="M88 129 q12 8 24 0" stroke="${lip}" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path class="m-smile" d="M85 127 q15 13 30 0 q-15 5 -30 0 z" fill="${dark(lip, 0.3)}" stroke="${lip}" stroke-width="2.2" stroke-linejoin="round"/>
          <path class="m-sad" d="M90 133 q10 -6 20 0" stroke="${lip}" stroke-width="3" fill="none" stroke-linecap="round"/>
          <g class="m-a"><path d="M87 126 q13 -2 26 0 q-2 15 -13 15 q-11 0 -13 -15z" fill="#4a1520" stroke="${lip}" stroke-width="1.6"/><path d="M90 127 h20 v3 q-10 2 -20 0 z" fill="#fff"/><ellipse cx="100" cy="137" rx="6" ry="3" fill="#d4626f"/></g>
          <g class="m-e"><path d="M86 127 q14 -1 28 0 q-3 7 -14 7 q-11 0 -14 -7z" fill="#4a1520" stroke="${lip}" stroke-width="1.6"/><path d="M89 127.5 h22 v2.5 q-11 1.5 -22 0z" fill="#fff"/></g>
          <ellipse class="m-o" cx="100" cy="131" rx="5.5" ry="6.5" fill="#4a1520" stroke="${lip}" stroke-width="1.8"/>
          <path class="m-m" d="M90 130 q10 2 20 0" stroke="${lip}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
        </g>
      </g>
      <g class="arm-talk"><path d="M154 222 Q151 202 134 189" stroke="url(#${u}b)" stroke-width="16" stroke-linecap="round" fill="none"/><path d="M134 188 c-6 -6 -14 -5 -16 1 c-2 6 4 11 11 10 c5 -1 7 -6 5 -11z" fill="${o.skin}"/><path d="M121 186 l-6 -6 M124 184 l-4 -8 M128 183 l-1 -8" stroke="${o.skin}" stroke-width="3.6" stroke-linecap="round"/></g>
      <g class="arm">
        <path d="M148 186 q24 -18 26 -52" stroke="url(#${u}b)" stroke-width="15" stroke-linecap="round" fill="none"/>
        <circle cx="174" cy="128" r="9.5" fill="${o.skin}"/><path d="M168 122 l-3 -8 M172 120 l-1 -9 M177 120 l1 -9 M181 123 l3 -7" stroke="${o.skin}" stroke-width="3.4" stroke-linecap="round"/>
      </g>
    </g>`;
  }

  function bear() {
    return `
    <g class="char-inner">
      <g class="torso">
        <path d="M40 222 C40 176 64 156 100 156 C136 156 160 176 160 222 Z" fill="#a0693c"/>
        <ellipse cx="100" cy="200" rx="34" ry="26" fill="#e8c49a"/>
        <path d="M62 160 Q100 182 138 160 L140 172 Q100 194 60 172 Z" fill="#222"/>
        <path d="M60 172 Q100 194 140 172 L141 182 Q100 204 59 182 Z" fill="#dd0000"/>
        <path d="M59 182 Q100 204 141 182 L140 192 Q100 214 60 192 Z" fill="#ffce00"/>
        <path d="M124 186 l10 30 l12 -4 l-8 -30z" fill="#dd0000"/>
      </g>
      <g class="head">
        <circle cx="56" cy="52" r="20" fill="#a0693c"/><circle cx="56" cy="52" r="10" fill="#e8c49a"/>
        <circle cx="144" cy="52" r="20" fill="#a0693c"/><circle cx="144" cy="52" r="10" fill="#e8c49a"/>
        <ellipse cx="100" cy="100" rx="56" ry="54" fill="#a0693c"/>
        <path class="brow" d="M70 80 q10 -6 18 0" stroke="#5b3a1f" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path class="brow" d="M112 80 q10 -6 18 0" stroke="#5b3a1f" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <g class="eyes">
          <ellipse cx="80" cy="96" rx="6" ry="7.5" fill="#1d1d1d"/><ellipse cx="120" cy="96" rx="6" ry="7.5" fill="#1d1d1d"/>
          <circle cx="82" cy="93" r="2" fill="#fff"/><circle cx="122" cy="93" r="2" fill="#fff"/>
        </g>
        <ellipse cx="100" cy="122" rx="28" ry="22" fill="#e8c49a"/>
        <ellipse cx="100" cy="110" rx="10" ry="7" fill="#3b2314"/>
        <circle cx="66" cy="118" r="8" fill="#ff7b9c" opacity=".35"/><circle cx="134" cy="118" r="8" fill="#ff7b9c" opacity=".35"/>
        <g class="mouth">
          <path class="m-closed" d="M88 126 q12 10 24 0" stroke="#3b2314" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path class="m-open" d="M88 125 q12 3 24 0 q-2 15 -12 15 q-10 0 -12 -15z" fill="#6b2230"/>
        </g>
      </g>
      <g class="arm">
        <path d="M148 186 q24 -18 26 -52" stroke="#a0693c" stroke-width="18" stroke-linecap="round" fill="none"/>
        <circle cx="174" cy="128" r="12" fill="#a0693c"/><circle cx="174" cy="128" r="6" fill="#e8c49a"/>
      </g>
    </g>`;
  }

  /* Returns SVG markup for a character. extra classes e.g. 'waving', 'smile'. */
  GL.charSVG = function (id, cls = '') {
    const c = GL.chars[id] || GL.chars.bruno;
    const isHuman = id !== 'bruno' && looks[id];
    if (id === 'ansage') return `<svg class="char char-ansage ${cls}" viewBox="0 0 200 222" role="img" aria-label="${c.name}"><circle cx="100" cy="111" r="80" fill="#ffce00"/><path d="M58 92 h22 l34 -26 v90 l-34 -26 h-22 z" fill="#1f2a48"/><path d="M128 84 q18 27 0 54 M142 70 q30 41 0 82" stroke="#1f2a48" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`;
    return `<svg class="char char-${id} ${isHuman ? 'human' : ''} ${cls}" viewBox="0 0 200 222" role="img" aria-label="${c.name}">${isHuman ? human(id) : bear()}</svg>`;
  };

  /* Expression from what is said. */
  GL.emotionOf = function (text) {
    const t = String(text);
    if (/leider|tut mir (sehr )?leid|oh nein|problem|schlimm|krank|verloren|gestohlen|fehlt|schade|weh|kaputt|entschuldigung, aber|verspätung|ärger/i.test(t)) return 'worried';
    if (/\?\s*$/.test(t)) return 'curious';
    if (/super|toll|wunderbar|herzlich|willkommen|freut|prima|klasse|perfekt|schön|danke|gern|gute reise|viel spaß|lecker/i.test(t)) return 'smile';
    return '';
  };

  /* Mouth shape for the letter being spoken. */
  const visemeFor = (ch) => (/[aäAÄ]/.test(ch) ? 'a' : /[eiEIyY]/.test(ch) ? 'e' : /[oöuüOÖUÜ]/.test(ch) ? 'o' : /[mbpMBP]/.test(ch) ? 'm' : /[\s.,!?;:–]/.test(ch) ? '' : 'e');

  /* Speak a line while lip-syncing and gesturing. */
  GL.charSay = function (svgEl, text, charId, opts = {}) {
    const plain = String(text);
    const human = svgEl && svgEl.classList.contains('human');
    let iv = null, t0 = 0, base = 0, baseAt = 0;
    const emo = GL.emotionOf(plain);
    const stop = () => {
      clearInterval(iv); iv = null;
      if (svgEl) { svgEl.classList.remove('talking', 'gest'); delete svgEl.dataset.v; if (emo) setTimeout(() => svgEl.classList.remove(emo), 900); }
    };
    return GL.Speech.speak(plain, Object.assign({}, opts, {
      char: charId,
      onstart: () => {
        if (!svgEl) return;
        svgEl.classList.add('talking');
        ['smile', 'worried', 'curious'].forEach((e) => svgEl.classList.remove(e));
        if (emo) svgEl.classList.add(emo);
        if (human && plain.length > 34 && Math.random() < 0.65) svgEl.classList.add('gest');
        if (human) {
          t0 = baseAt = Date.now();
          const cps = 13.5 * ((GL.Store.state.settings.rate || 0.9) * ((GL.chars[charId] || {}).rate || 1)) * (opts.slow ? 0.65 : 1);
          iv = setInterval(() => {
            const i = Math.min(plain.length - 1, base + Math.floor(((Date.now() - baseAt) / 1000) * cps));
            const v = visemeFor(plain[i] || ' ');
            if (v) svgEl.dataset.v = v; else delete svgEl.dataset.v;
          }, 85);
        }
      },
      onboundary: (idx) => { base = idx; baseAt = Date.now(); },
      onend: stop,
    })).then(stop);
  };

  /* Make every character on a stage look towards the speaker (x positions in %). */
  GL.lookAt = function (actors, speakerX) {
    actors.forEach(({ el, x }) => {
      const svg = el.querySelector('svg.char');
      if (!svg) return;
      const dx = speakerX == null || Math.abs(speakerX - x) < 1 ? 0 : speakerX > x ? 1.8 : -1.8;
      svg.style.setProperty('--lx', dx + 'px');
    });
  };

  /* Character with a speech bubble block. */
  GL.charBubble = function (id, de, en, opts = {}) {
    const c = GL.chars[id];
    return `<div class="char-bubble ${opts.cls || ''}">
      <div class="cb-char">${GL.charSVG(id, 'idle ' + (opts.wave ? 'waving' : ''))}<span class="cb-name">${c.name}</span></div>
      <div class="bubble">
        <p class="b-de">${de}</p>
        ${en ? `<p class="b-en">${en}</p>` : ''}
        <button class="btn tiny ghost cb-play" data-char="${id}" data-text="${GL.attr(GL.stripTags(de))}">🔊 Listen</button>
      </div>
    </div>`;
  };

  document.addEventListener('click', (e) => {
    const b = e.target.closest('.cb-play');
    if (!b) return;
    const svg = b.closest('.char-bubble').querySelector('svg.char');
    GL.charSay(svg, b.dataset.text, b.dataset.char);
  });
})();
