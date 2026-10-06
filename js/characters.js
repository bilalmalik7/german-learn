/* Animated SVG characters. Each character blinks, bobs, can talk (mouth animation) and wave. */
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
  };

  const looks = {
    lena: { skin: '#f6d1b5', shade: '#e3b293', hair: '#c4552d', brow: '#8a3a1e', hairStyle: 'long', shirt: '#2a9d8f', collar: '#fff' },
    max: { skin: '#f1c7a3', shade: '#d9a982', hair: '#5a3b24', brow: '#3e2716', hairStyle: 'short', shirt: '#3a86ff', collar: '#1d4fa8' },
    sofia: { skin: '#d9a47e', shade: '#bf8a64', hair: '#2b1d16', brow: '#1d1410', hairStyle: 'curly', shirt: '#ffce00', collar: '#e0a800' },
    weber: { skin: '#f3d3be', shade: '#dcb39a', hair: '#b9b9c3', brow: '#8c8c99', hairStyle: 'bun', shirt: '#9b5de5', collar: '#6a32b8', glasses: true },
    yilmaz: { skin: '#d6a27c', shade: '#bd875f', hair: '#1f1a17', brow: '#14110f', hairStyle: 'short', shirt: '#2a9d8f', collar: '#fff', mustache: true, apron: true },
    braun: { skin: '#f0cdb2', shade: '#d8ad8f', hair: '#8a8a8a', brow: '#666', hairStyle: 'side', shirt: '#ffffff', collar: '#577590', glasses: true, coat: true },
  };

  function hair(o, layer) {
    const c = o.hair;
    switch (o.hairStyle) {
      case 'long':
        return layer === 'back'
          ? `<path d="M52 104 C44 52 80 34 102 36 C128 36 160 56 150 106 L156 172 C140 182 120 176 116 162 L84 162 C80 176 58 182 44 172 Z" fill="${c}"/>`
          : `<path d="M57 96 C58 58 88 44 108 48 C132 52 148 72 145 98 C130 76 108 66 84 72 C72 76 62 86 57 96 Z" fill="${c}"/>`;
      case 'short':
        return layer === 'back' ? '' :
          `<path d="M55 100 C48 56 82 38 106 42 C134 46 152 66 146 100 C142 84 132 72 116 68 C102 78 76 76 62 86 Z" fill="${c}"/>`;
      case 'side':
        return layer === 'back' ? '' :
          `<path d="M56 98 C52 62 78 44 104 46 C132 48 150 66 145 96 C138 80 128 70 98 70 C80 72 66 82 56 98 Z" fill="${c}"/>`;
      case 'bun':
        return layer === 'back'
          ? `<circle cx="100" cy="40" r="20" fill="${c}"/>`
          : `<path d="M56 100 C52 60 80 46 102 48 C126 48 150 62 145 100 C138 78 120 66 100 66 C82 66 64 78 56 100 Z" fill="${c}"/>`;
      case 'curly': {
        if (layer === 'back') return `<path d="M50 110 C40 60 70 34 102 36 C136 36 164 62 150 112 L150 150 C130 158 70 158 50 150 Z" fill="${c}"/>`;
        let s = '';
        [[62, 78], [74, 62], [92, 54], [110, 54], [128, 62], [140, 78], [58, 94], [144, 94]].forEach(([x, y]) => (s += `<circle cx="${x}" cy="${y}" r="13" fill="${c}"/>`));
        return s;
      }
    }
    return '';
  }

  function human(id) {
    const o = looks[id];
    return `
    <g class="char-inner">
      <g class="torso">
        <path d="M36 222 C36 178 62 160 100 160 C138 160 164 178 164 222 Z" fill="${o.shirt}"/>
        ${o.coat ? `<path d="M100 162 L86 222 M100 162 L114 222" stroke="#d7dde3" stroke-width="3"/><path d="M84 160 L100 184 L116 160" fill="${o.collar}"/>` : `<path d="M84 160 Q100 178 116 160" fill="none" stroke="${o.collar}" stroke-width="6" stroke-linecap="round"/>`}
        ${o.apron ? `<path d="M70 178 H130 V222 H70 Z" fill="#f4f1de" opacity=".95"/><path d="M78 178 L72 162 M122 178 L128 162" stroke="#f4f1de" stroke-width="4"/>` : ''}
      </g>
      <path d="M86 138 h28 v26 a14 9 0 0 1 -28 0 z" fill="${o.shade}"/>
      <g class="head">
        ${hair(o, 'back')}
        <ellipse cx="56" cy="104" rx="8" ry="11" fill="${o.shade}"/>
        <ellipse cx="144" cy="104" rx="8" ry="11" fill="${o.shade}"/>
        <ellipse cx="100" cy="100" rx="45" ry="49" fill="${o.skin}"/>
        ${hair(o, 'front')}
        <path class="brow" d="M73 88 q10 -6 19 0" stroke="${o.brow}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
        <path class="brow" d="M108 88 q10 -6 19 0" stroke="${o.brow}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
        <g class="eyes">
          <ellipse cx="83" cy="103" rx="5" ry="6.5" fill="#2b2b2b"/><ellipse cx="117" cy="103" rx="5" ry="6.5" fill="#2b2b2b"/>
          <circle cx="85" cy="100.5" r="1.7" fill="#fff"/><circle cx="119" cy="100.5" r="1.7" fill="#fff"/>
        </g>
        ${o.glasses ? `<g fill="none" stroke="#333" stroke-width="2.4"><circle cx="83" cy="103" r="12"/><circle cx="117" cy="103" r="12"/><path d="M95 103 h10 M71 101 l-12 -3 M129 101 l12 -3"/></g>` : ''}
        <circle cx="70" cy="120" r="7" fill="#ff7b9c" opacity=".3"/><circle cx="130" cy="120" r="7" fill="#ff7b9c" opacity=".3"/>
        <path d="M100 106 q-5 10 2 12" stroke="${o.shade}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        ${o.mustache ? `<path d="M84 124 q8 -8 16 -2 q8 -6 16 2 q-8 4 -16 0 q-8 4 -16 0z" fill="${o.hair}"/>` : ''}
        <g class="mouth">
          <path class="m-closed" d="M88 128 q12 10 24 0" stroke="#8a3b46" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path class="m-open" d="M88 127 q12 3 24 0 q-2 14 -12 14 q-10 0 -12 -14z" fill="#7a2e3a"/>
        </g>
      </g>
      <g class="arm">
        <path d="M148 186 q24 -18 26 -52" stroke="${o.shirt}" stroke-width="15" stroke-linecap="round" fill="none"/>
        <circle cx="174" cy="128" r="10" fill="${o.skin}"/>
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

  /* Returns SVG markup for a character. extra classes e.g. 'waving', 'small'. */
  GL.charSVG = function (id, cls = '') {
    const c = GL.chars[id] || GL.chars.bruno;
    const body = id === 'bruno' || !looks[id] ? bear() : human(id);
    return `<svg class="char char-${id} ${cls}" viewBox="0 0 200 222" role="img" aria-label="${c.name}">${body}</svg>`;
  };

  /* Speak a line while animating the character's mouth. */
  GL.charSay = function (svgEl, text, charId, opts = {}) {
    return GL.Speech.speak(text, Object.assign({}, opts, {
      char: charId,
      onstart: () => svgEl && svgEl.classList.add('talking'),
      onend: () => svgEl && svgEl.classList.remove('talking'),
    })).then(() => svgEl && svgEl.classList.remove('talking'));
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
