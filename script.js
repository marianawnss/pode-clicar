/* =========================================================
   Pode Clicar? — Lógica do jogo
   Organização deste arquivo:
     1. Configuração e estado
     2. Funções auxiliares (criar elementos, ícones)
     3. Preferências de leitura (letra, animações, contraste)
     4. Navegação entre telas
     5. Telas: categorias, simulação, feedback, resultado, revisão, biblioteca
     6. Eventos
   Os textos e desafios ficam em data.js.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 1. CONFIGURAÇÃO E ESTADO ---------- */

  var DATA = window.PC_DATA;
  if (!DATA) {
    document.body.insertAdjacentHTML('afterbegin',
      '<p style="padding:1rem;font:18px sans-serif">Não foi possível carregar os desafios (arquivo data.js). Verifique se ele está na mesma pasta do index.html.</p>');
    return;
  }

  var SHUFFLE_OPTIONS = true;          // embaralha a ordem das alternativas a cada partida
  var PREFS_KEY = 'podeclicar:preferencias';
  var FONT_STEPS = [100, 112.5, 125, 140]; // porcentagens do tamanho da letra
  var SCREEN_TITLES = {
    home: 'Pode Clicar? — Pense antes de clicar',
    how: 'Como funciona — Pode Clicar?',
    categories: 'Escolha um tema — Pode Clicar?',
    play: 'Simulação — Pode Clicar?',
    results: 'Seu resultado — Pode Clicar?',
    review: 'Revisar respostas — Pode Clicar?',
    library: 'Dicas de segurança — Pode Clicar?'
  };
  var SCREEN_HEADINGS = {
    home: 'home-title', how: 'how-title', categories: 'cat-title', play: 'play-title',
    results: 'results-title', review: 'review-title', library: 'library-title'
  };

  var STATUS = {
    safe:    { short: 'Segura',    title: 'Boa escolha!',                 icon: 'check-circle' },
    partial: { short: 'Parcial',   title: 'Quase lá: falta um cuidado',   icon: 'half' },
    risky:   { short: 'Arriscada', title: 'Atenção: aqui há um risco',    icon: 'alert' }
  };

  /* Valida os dados: ignora (com aviso no console) desafios mal formados. */
  var CATEGORY_BY_ID = {};
  DATA.CATEGORIES.forEach(function (c) { CATEGORY_BY_ID[c.id] = c; });

  var TIP_BY_ID = {};
  DATA.TIPS.forEach(function (t) { TIP_BY_ID[t.id] = t; });

  var CHALLENGES = DATA.CHALLENGES.filter(function (c) {
    var ok = c && c.id && CATEGORY_BY_ID[c.category] && DATA.DIFFICULTY[c.difficulty] &&
      c.scene && Array.isArray(c.options) && c.options.length >= 2 &&
      c.options.some(function (o) { return o.status === 'safe'; }) &&
      c.options.every(function (o) { return STATUS[o.status] && o.text && o.feedback; });
    if (!ok) { console.warn('Desafio ignorado por estar incompleto:', c && c.id); }
    return ok;
  }).map(function (c) {
    return Object.assign({}, c, { points: DATA.DIFFICULTY[c.difficulty].points });
  });

  var state = {
    screen: 'home',
    mode: null,        // 'all' ou o id de uma categoria
    queue: [],         // desafios desta partida (com alternativas embaralhadas)
    index: 0,          // posição do desafio atual
    answers: {},       // id do desafio -> { optionId, status, points }
    selected: null,    // alternativa marcada, antes de confirmar
    finished: false,
    libFrom: 'home'    // de onde o usuário abriu a biblioteca
  };

  /* ---------- 2. FUNÇÕES AUXILIARES ---------- */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* Cria um elemento: el('p', { class: 'x', text: 'Olá' }, filho1, filho2) */
  function el(tag, props) {
    var node = document.createElement(tag);
    var p = props || {};
    Object.keys(p).forEach(function (k) {
      var v = p[k];
      if (v === null || v === undefined || v === false) { return; }
      if (k === 'class') { node.className = v; }
      else if (k === 'text') { node.textContent = v; }
      else if (k === 'dataset') { Object.keys(v).forEach(function (d) { node.dataset[d] = v[d]; }); }
      else { node.setAttribute(k, v === true ? '' : v); }
    });
    for (var i = 2; i < arguments.length; i++) { appendKids(node, arguments[i]); }
    return node;
  }
  function appendKids(node, kid) {
    if (kid === null || kid === undefined || kid === false) { return; }
    if (Array.isArray(kid)) { kid.forEach(function (k) { appendKids(node, k); }); return; }
    node.appendChild(typeof kid === 'object' && kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  function setKids(node) {
    while (node.firstChild) { node.removeChild(node.firstChild); }
    for (var i = 1; i < arguments.length; i++) { appendKids(node, arguments[i]); }
  }

  /* Ícones: desenhos simples em SVG, sem depender de arquivos externos. */
  var ICONS = {
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    news: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8z"/>',
    key: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/>',
    gift: '<path d="M20 12v10H4V12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
    alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    'help-circle': '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/>',
    half: '<circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    sliders: '<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    redo: '<path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
    clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    pointer: '<path d="M5 3l14 7-6 2-2 6z" fill="currentColor"/>',
    play: '<path d="M7 4l13 8-13 8z" fill="currentColor"/>',
    bulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.74V16h8v-1.26A7 7 0 0 0 12 2z"/>'
  };
  function iconSvg(name) {
    return '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">' +
      (ICONS[name] || '') + '</svg>';
  }
  function icon(name, extra) {
    var s = el('span', { class: 'icon' + (extra ? ' ' + extra : ''), 'aria-hidden': 'true' });
    s.innerHTML = iconSvg(name); // conteúdo fixo escrito neste arquivo, nunca vindo do usuário
    return s;
  }
  function hydrateIcons(root) {
    $$('[data-icon]', root || document).forEach(function (n) {
      if (n.dataset.hydrated) { return; }
      n.classList.add('icon');
      n.setAttribute('aria-hidden', 'true');
      n.innerHTML = iconSvg(n.dataset.icon);
      n.dataset.hydrated = '1';
    });
  }

  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pointsFor(challenge, status) {
    if (status === 'safe') { return challenge.points; }
    if (status === 'partial') { return Math.round(challenge.points / 2); }
    return 0;
  }

  function percent(part, total) {
    return total > 0 ? Math.round((part / total) * 100) : 0;
  }

  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

  function currentChallenge() { return state.queue[state.index] || null; }

  function isGameInProgress() {
    return state.queue.length > 0 && !state.finished && Object.keys(state.answers).length > 0;
  }

  function resetGame() {
    state.mode = null;
    state.queue = [];
    state.index = 0;
    state.answers = {};
    state.selected = null;
    state.finished = false;
  }

  /* ---------- 3. PREFERÊNCIAS DE LEITURA ---------- */

  var prefs = { fs: 0, motionOff: false, contrast: false };

  function loadPrefs() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    prefs.motionOff = !!reduce; // respeita a configuração do aparelho
    try {
      var raw = window.localStorage.getItem(PREFS_KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        if (typeof saved.fs === 'number' && saved.fs >= 0 && saved.fs < FONT_STEPS.length) { prefs.fs = saved.fs; }
        if (typeof saved.motionOff === 'boolean') { prefs.motionOff = saved.motionOff; }
        if (typeof saved.contrast === 'boolean') { prefs.contrast = saved.contrast; }
      }
    } catch (e) { /* sem armazenamento: o jogo funciona do mesmo jeito */ }
  }
  function savePrefs() {
    try { window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch (e) { /* ignora */ }
  }
  function applyPrefs() {
    document.documentElement.style.fontSize = FONT_STEPS[prefs.fs] + '%';
    document.documentElement.dataset.motion = prefs.motionOff ? 'off' : 'on';
    document.documentElement.dataset.contrast = prefs.contrast ? 'high' : 'normal';
    $('#fs-output').textContent = (prefs.fs + 1) + ' de ' + FONT_STEPS.length;
    $('#opt-motion').checked = prefs.motionOff;
    $('#opt-contrast').checked = prefs.contrast;
  }
  function resetPrefs() {
    try { window.localStorage.removeItem(PREFS_KEY); } catch (e) { /* ignora */ }
    prefs = { fs: 0, motionOff: false, contrast: false };
    loadPrefsKeepingDefaultsOnly();
    applyPrefs();
  }
  function loadPrefsKeepingDefaultsOnly() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    prefs.motionOff = !!reduce;
  }
  function toggleSettings(force) {
    var panel = $('#settings-panel');
    var btn = $('#btn-settings');
    var open = typeof force === 'boolean' ? force : panel.hidden;
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  }

  /* ---------- 4. NAVEGAÇÃO ENTRE TELAS ---------- */

  function focusHeading(screen) {
    var h = document.getElementById(SCREEN_HEADINGS[screen]);
    window.scrollTo(0, 0);
    if (h) { h.focus({ preventScroll: true }); }
  }

  /* go('home') mostra a tela e prepara seu conteúdo. */
  function go(name, opts) {
    var o = opts || {};
    if (name === 'play' && !currentChallenge()) { name = 'categories'; }
    if (name === 'library' && state.screen !== 'library') { state.libFrom = state.screen; }

    $$('[data-screen]').forEach(function (s) {
      if (s.tagName === 'SECTION') { s.hidden = s.dataset.screen !== name; }
    });
    state.screen = name;
    document.body.dataset.screen = name;
    document.title = SCREEN_TITLES[name] || SCREEN_TITLES.home;
    toggleSettings(false);

    if (name === 'categories') { renderCategories(); }
    if (name === 'play') { renderPlay(); }
    if (name === 'results') { renderResults(); }
    if (name === 'review') { renderReview(); }
    if (name === 'library') { updateLibraryBackLabel(); }

    if (o.push !== false) {
      try { window.history.pushState({ screen: name }, '', window.location.href); } catch (e) { /* ignora */ }
    }
    if (o.focus !== false) { focusHeading(name); }
  }

  function confirmLeave() {
    if (!isGameInProgress()) { return true; }
    return window.confirm('Sair do desafio? O progresso desta partida será perdido.');
  }

  /* ---------- 5. TELAS ---------- */

  /* ===== Tela 3: categorias ===== */
  function challengesOf(categoryId) {
    return CHALLENGES.filter(function (c) { return c.category === categoryId; });
  }

  function renderCategories() {
    var list = $('#category-list');
    var items = DATA.CATEGORIES.map(function (cat) {
      var count = challengesOf(cat.id).length;
      return el('li', { class: 'card' },
        el('div', { class: 'card__icon' }, icon(cat.icon)),
        el('h2', { class: 'card__title', text: cat.title }),
        el('p', { class: 'card__text', text: cat.description }),
        el('p', { class: 'card__count', text: plural(count, 'desafio disponível', 'desafios disponíveis') }),
        count > 0
          ? el('button', { type: 'button', class: 'btn btn--soft', 'data-action': 'start-cat', dataset: { cat: cat.id },
              'aria-label': 'Jogar o tema ' + cat.title }, 'Jogar este tema')
          : el('p', { class: 'card__empty', text: 'Em breve, novos desafios neste tema.' })
      );
    });
    setKids(list, items);
  }

  /* ===== Início de uma partida ===== */
  function startGame(mode) {
    if (isGameInProgress() &&
        !window.confirm('Há um jogo em andamento. Começar um novo e perder o progresso?')) {
      return;
    }
    var pool = mode === 'all' ? CHALLENGES : challengesOf(mode);
    if (!pool.length) {
      go('categories');
      return;
    }
    resetGame();
    state.mode = mode;
    state.queue = pool.map(function (c) {
      return Object.assign({}, c, { options: SHUFFLE_OPTIONS ? shuffle(c.options) : c.options.slice() });
    });
    go('play');
  }

  /* ===== Tela 4: simulação ===== */
  function renderRich(text) {
    // [[texto]] vira um "link" fictício que não pode ser clicado
    var frag = document.createDocumentFragment();
    String(text).split(/(\[\[.+?\]\])/g).forEach(function (part) {
      var m = part.match(/^\[\[(.+)\]\]$/);
      if (m) {
        frag.appendChild(el('span', { class: 'fake-link' }, m[1],
          el('span', { class: 'sr-only', text: ' (link fictício, não clicável)' })));
      } else if (part) {
        frag.appendChild(document.createTextNode(part));
      }
    });
    return frag;
  }

  function simBar() {
    return el('div', { class: 'sim-bar' }, icon('shield'), 'Simulação educativa: nada aqui é real');
  }

  function sceneChat(s) {
    var msgs = s.messages.map(function (m) {
      if (m.from === 'system') {
        return el('div', { class: 'bubble bubble--system' }, renderRich(m.text),
          m.time ? el('span', { class: 'bubble__time', text: m.time }) : null);
      }
      var inner = [];
      if (m.audio) {
        var bars = [8, 14, 10, 18, 12, 20, 9, 16, 11, 19, 8, 13, 17, 10, 15];
        inner.push(el('div', { class: 'audio' },
          el('span', { class: 'audio__play' }, icon('play')),
          el('span', { class: 'audio__wave', 'aria-hidden': 'true' },
            bars.map(function (h) { return el('i', { style: 'height:' + h + 'px' }); })),
          el('span', { class: 'audio__time', text: m.audio.duration })));
        inner.push(el('p', { class: 'audio__caption' }, el('strong', { text: 'Áudio. ' }), m.audio.caption));
      }
      if (m.text) { inner.push(el('span', { class: 'bubble__text' }, renderRich(m.text))); }
      return el('div', { class: 'bubble bubble--' + (m.from === 'me' ? 'me' : 'them') }, inner,
        m.time ? el('span', { class: 'bubble__time', text: m.time }) : null);
    });
    return el('div', { class: 'phone', role: 'group', 'aria-label': 'Simulação: conversa de mensagens com ' + s.contact },
      simBar(),
      el('div', { class: 'phone__app', text: s.appName }),
      el('div', { class: 'phone__head' },
        el('span', { class: 'avatar' }, icon('user')),
        el('span', { class: 'phone__who' }, el('strong', { text: s.contact }), el('small', { text: s.contactSub || '' }))),
      el('div', { class: 'phone__body' }, msgs));
  }

  function sceneCall(s) {
    var lines = s.lines.map(function (l) { return el('p', { class: 'bubble bubble--them' }, l); });
    return el('div', { class: 'phone phone--call', role: 'group', 'aria-label': 'Simulação: ligação recebida de ' + s.callerName },
      simBar(),
      el('div', { class: 'call' },
        el('p', { class: 'call__label', text: 'Chamada recebida' }),
        el('span', { class: 'avatar avatar--big' }, icon('phone')),
        el('p', { class: 'call__name', text: s.callerName }),
        el('p', { class: 'call__number', text: s.callerNumber }),
        el('div', { class: 'call__buttons', 'aria-hidden': 'true' },
          el('span', { class: 'call__btn call__btn--no', text: 'Recusar' }),
          el('span', { class: 'call__btn call__btn--yes', text: 'Atender' }))),
      el('div', { class: 'phone__body' },
        el('p', { class: 'speech-title', text: 'O que a pessoa diz ao telefone:' }), lines));
  }

  function scenePost(s) {
    return el('article', { class: 'phone post', 'aria-label': 'Simulação: publicação em rede social de ' + s.author },
      simBar(),
      el('div', { class: 'phone__app', text: s.network }),
      el('div', { class: 'phone__head' },
        el('span', { class: 'avatar' }, icon('user')),
        el('span', { class: 'phone__who' }, el('strong', { text: s.author }), el('small', { text: s.handle + ' · ' + s.time }))),
      el('p', { class: 'post__text' }, renderRich(s.text)),
      s.image ? el('div', { class: 'post__image' }, icon(s.image.icon), el('span', { text: s.image.caption })) : null,
      s.stats ? el('p', { class: 'post__stats' }, s.stats.map(function (t) { return el('span', { text: t }); })) : null);
  }

  function sceneApp(s) {
    return el('div', { class: 'phone', role: 'group', 'aria-label': 'Simulação: tela de aplicativo, ' + s.appName },
      simBar(),
      el('div', { class: 'phone__app', text: s.appName }),
      el('h2', { class: 'app__heading', text: s.heading }),
      el('ul', { class: 'app__rows' }, s.rows.map(function (r) {
        return el('li', { class: 'app__row' }, icon(r.icon || 'info'),
          el('span', {}, el('strong', { text: r.label }), el('small', { text: r.value })));
      })),
      s.note ? el('p', { class: 'app__note', text: s.note }) : null);
  }

  function renderScene(scene) {
    if (scene.type === 'chat') { return sceneChat(scene); }
    if (scene.type === 'call') { return sceneCall(scene); }
    if (scene.type === 'post') { return scenePost(scene); }
    if (scene.type === 'app') { return sceneApp(scene); }
    return el('p', { class: 'error', text: 'Esta situação não pôde ser exibida.' });
  }

  function updateProgress() {
    var total = state.queue.length;
    var done = Object.keys(state.answers).length;
    var bar = $('#progress');
    bar.setAttribute('aria-valuemax', String(total));
    bar.setAttribute('aria-valuenow', String(done));
    bar.setAttribute('aria-valuetext', done + ' de ' + total + ' situações respondidas');
    $('#progress-fill').style.width = percent(done, total) + '%';
    $('#progress-text').textContent = done + ' de ' + total + ' respondidas';
  }

  function showError(msg) {
    var box = $('#play-error');
    if (!msg) { box.hidden = true; box.textContent = ''; return; }
    box.hidden = false;
    box.textContent = msg;
  }

  function renderPlay() {
    var ch = currentChallenge();
    if (!ch) { go('categories', { push: false }); return; }
    var cat = CATEGORY_BY_ID[ch.category];
    var diff = DATA.DIFFICULTY[ch.difficulty];

    $('#play-meta').textContent = 'Situação ' + (state.index + 1) + ' de ' + state.queue.length +
      ' — ' + cat.title + ' — Dificuldade: ' + diff.label;
    $('#play-title').textContent = ch.title;
    $('#play-context').textContent = ch.context;
    $('#play-question').textContent = ch.question || 'O que você faria nesta situação?';
    setKids($('#play-scene'), renderScene(ch.scene));
    updateProgress();
    showError('');

    var list = $('#options-list');
    var letters = ['A', 'B', 'C', 'D'];
    setKids(list, ch.options.map(function (opt, i) {
      var input = el('input', { type: 'radio', name: 'alternativa', value: opt.id, id: 'opt-' + opt.id });
      return el('label', { class: 'option', 'for': 'opt-' + opt.id, dataset: { id: opt.id } },
        input,
        el('span', { class: 'option__letter', 'aria-hidden': 'true', text: letters[i] }),
        el('span', { class: 'option__text', text: opt.text }),
        el('span', { class: 'option__tick', 'aria-hidden': 'true' }, icon('check')));
    }));
    state.selected = null;

    var answered = state.answers[ch.id];
    if (answered) {
      showFeedback(ch, false);
    } else {
      $('#play-options').hidden = false;
      $('#play-actions').hidden = false;
      $('#play-feedback').hidden = true;
    }
  }

  function selectOption(id) {
    state.selected = id;
    $$('.option', $('#options-list')).forEach(function (lab) {
      lab.classList.toggle('is-selected', lab.dataset.id === id);
    });
    showError('');
  }

  /* ===== Tela 5: confirmar e mostrar feedback ===== */
  function confirmChoice() {
    var ch = currentChallenge();
    if (!ch) { return; }
    if (state.answers[ch.id]) { return; } // já respondida: evita pontuação duplicada
    if (!state.selected) {
      showError('Escolha uma das alternativas antes de confirmar.');
      var first = $('input[name="alternativa"]');
      if (first) { first.focus(); }
      return;
    }
    var opt = ch.options.filter(function (o) { return o.id === state.selected; })[0];
    if (!opt) { showError('Não foi possível registrar a escolha. Tente de novo.'); return; }

    state.answers[ch.id] = { optionId: opt.id, status: opt.status, points: pointsFor(ch, opt.status) };
    updateProgress();
    showFeedback(ch, true);
  }

  function showFeedback(ch, focusIt) {
    var ans = state.answers[ch.id];
    var opt = ch.options.filter(function (o) { return o.id === ans.optionId; })[0];
    var meta = STATUS[ans.status];
    var isLast = state.index >= state.queue.length - 1;
    var safeOptions = ch.options.filter(function (o) { return o.status === 'safe'; });

    var box = $('#play-feedback');
    setKids(box,
      el('div', { class: 'verdict verdict--' + ans.status },
        icon(meta.icon, 'verdict__icon'),
        el('div', {},
          el('h2', { id: 'feedback-title', tabindex: '-1', text: meta.title }),
          el('p', { class: 'verdict__points', text: ans.points + ' de ' + ch.points + ' pontos nesta situação' }))),
      el('div', { class: 'fb-block' },
        el('h3', { text: 'Sua escolha' }),
        el('p', { text: opt.text })),
      el('div', { class: 'fb-block' },
        el('h3', { text: 'O que isso significa' }),
        el('p', { text: opt.feedback })),
      ans.status !== 'safe'
        ? el('div', { class: 'fb-block fb-block--safe' },
            el('h3', { text: safeOptions.length > 1 ? 'Atitudes mais seguras' : 'A atitude mais segura' }),
            el('ul', {}, safeOptions.map(function (o) { return el('li', { text: o.text }); })))
        : null,
      el('div', { class: 'fb-block' },
        el('h3', { text: 'Sinais de alerta nesta situação' }),
        el('ul', {}, ch.signs.map(function (s) { return el('li', { text: s }); }))),
      el('div', { class: 'fb-tip' },
        icon('bulb'),
        el('div', {}, el('h3', { text: 'Dica prática' }), el('p', { text: ch.tip }))),
      el('details', { class: 'fb-more' },
        el('summary', { text: 'Entender melhor (explicação técnica)' }),
        el('p', { text: ch.technical })),
      el('div', { class: 'actions' },
        el('button', { type: 'button', class: 'btn btn--primary btn--big', 'data-action': 'next' },
          isLast ? 'Ver meu resultado' : 'Próxima situação', icon('arrow-right')),
        el('button', { type: 'button', class: 'btn btn--soft', 'data-action': 'open-tip', dataset: { topic: ch.libTopic } },
          'Ler mais nas dicas'))
    );

    $('#play-options').hidden = true;
    $('#play-actions').hidden = true;
    showError('');
    box.hidden = false;
    if (focusIt) {
      var t = $('#feedback-title');
      if (t) { t.focus({ preventScroll: true }); }
      box.scrollIntoView({ behavior: prefs.motionOff ? 'auto' : 'smooth', block: 'start' });
    }
  }

  function nextStep() {
    var ch = currentChallenge();
    if (!ch || !state.answers[ch.id]) { return; }
    if (state.index < state.queue.length - 1) {
      state.index += 1;
      state.selected = null;
      renderPlay();
      focusHeading('play');
    } else {
      state.finished = true;
      go('results');
    }
  }

  /* ===== Tela 6: resultado ===== */
  function computeResults() {
    var r = { total: state.queue.length, answered: 0, safe: 0, partial: 0, risky: 0,
      points: 0, maxPoints: 0, byCategory: [], safeSkills: [], attention: [] };
    var cats = {};
    state.queue.forEach(function (ch) {
      r.maxPoints += ch.points;
      var c = cats[ch.category];
      if (!c) { c = cats[ch.category] = { id: ch.category, total: 0, safe: 0, points: 0, maxPoints: 0 }; }
      c.total += 1;
      c.maxPoints += ch.points;
      var a = state.answers[ch.id];
      if (!a) { return; }
      r.answered += 1;
      r.points += a.points;
      c.points += a.points;
      if (a.status === 'safe') { r.safe += 1; c.safe += 1; r.safeSkills.push(ch.skill); }
      else {
        if (a.status === 'partial') { r.partial += 1; } else { r.risky += 1; }
        r.attention.push(ch);
      }
    });
    r.percent = percent(r.safe, r.total);
    DATA.CATEGORIES.forEach(function (cat) { if (cats[cat.id]) { r.byCategory.push(cats[cat.id]); } });
    return r;
  }

  function levelFor(pct) {
    var chosen = DATA.LEVELS[0];
    DATA.LEVELS.forEach(function (l) { if (pct >= l.min) { chosen = l; } });
    return chosen;
  }

  function statCard(value, label) {
    return el('li', { class: 'stat' }, el('strong', { text: String(value) }), el('span', { text: label }));
  }

  function renderResults() {
    var box = $('#results-content');
    if (!state.queue.length || !Object.keys(state.answers).length) {
      setKids(box,
        el('div', { class: 'empty' },
          el('p', { text: 'Você ainda não respondeu nenhuma situação, por isso não há resultado para mostrar.' }),
          el('button', { type: 'button', class: 'btn btn--primary btn--big', 'data-action': 'start-all' }, 'Começar o desafio')));
      return;
    }
    var r = computeResults();
    var level = levelFor(r.percent);
    var partialNote = r.answered < r.total
      ? el('p', { class: 'error', text: 'Atenção: você respondeu ' + r.answered + ' de ' + r.total + ' situações.' }) : null;

    setKids(box,
      partialNote,
      el('div', { class: 'level' },
        icon(level.icon, 'level__icon'),
        el('div', {},
          el('p', { class: 'level__label', text: 'Seu nível nesta partida' }),
          el('h2', { class: 'level__name', text: level.name }),
          el('p', { text: level.text }))),

      el('ul', { class: 'stats', 'aria-label': 'Números da partida' },
        statCard(r.points + ' de ' + r.maxPoints, 'pontos'),
        statCard(r.safe, r.safe === 1 ? 'acerto' : 'acertos'),
        statCard(r.partial, r.partial === 1 ? 'resposta parcial' : 'respostas parciais'),
        statCard(r.risky, r.risky === 1 ? 'resposta incorreta' : 'respostas incorretas'),
        statCard(r.percent + '%', 'de acertos')),

      el('section', { 'aria-labelledby': 'res-cat' },
        el('h2', { id: 'res-cat', text: 'Desempenho por tema' }),
        el('ul', { class: 'catbars' }, r.byCategory.map(function (c) {
          var pct = percent(c.safe, c.total);
          return el('li', {},
            el('div', { class: 'catbars__head' },
              el('strong', { text: CATEGORY_BY_ID[c.id].title }),
              el('span', { text: plural(c.safe, 'acerto', 'acertos') + ' em ' + c.total + ' (' + pct + '%)' })),
            el('div', { class: 'catbars__track', 'aria-hidden': 'true' }, el('span', { style: 'width:' + pct + '%' })));
        }))),

      el('div', { class: 'two-col' },
        el('section', { 'aria-labelledby': 'res-good' },
          el('h2', { id: 'res-good', text: 'O que você demonstrou' }),
          r.safeSkills.length
            ? el('ul', { class: 'ticks' }, r.safeSkills.map(function (s) { return el('li', { text: s }); }))
            : el('p', { text: 'Nenhum acerto completo desta vez, e tudo bem. O importante é aprender. Veja as dicas abaixo.' })),
        el('section', { 'aria-labelledby': 'res-warn' },
          el('h2', { id: 'res-warn', text: 'Merece mais atenção' }),
          r.attention.length
            ? el('ul', { class: 'dots' }, r.attention.map(function (ch) { return el('li', { text: ch.skill }); }))
            : el('p', { text: 'Nenhum assunto em destaque nesta partida. Continue praticando e releia as dicas de vez em quando.' }))),

      r.attention.length
        ? el('section', { 'aria-labelledby': 'res-rec' },
            el('h2', { id: 'res-rec', text: 'Recomendações para você' }),
            el('ul', { class: 'recs' }, r.attention.map(function (ch) {
              var tip = TIP_BY_ID[ch.libTopic];
              return el('li', { class: 'rec' },
                el('h3', { text: ch.skill }),
                el('p', { text: ch.tip }),
                tip ? el('button', { type: 'button', class: 'btn btn--soft btn--small', 'data-action': 'open-tip', dataset: { topic: tip.id } },
                  'Ler: ' + tip.title) : null);
            })))
        : null,

      el('p', { class: 'disclaimer' },
        'Este resultado é só um retrato desta partida e serve para incentivar o aprendizado. Ele não garante que alguém esteja protegido contra golpes: eles mudam o tempo todo. Em caso de dúvida, pare, pense e confirme por outro canal.'),

      el('div', { class: 'actions' },
        el('button', { type: 'button', class: 'btn btn--primary btn--big', 'data-action': 'replay' }, icon('redo'), 'Jogar novamente'),
        el('button', { type: 'button', class: 'btn btn--soft btn--big', 'data-action': 'review' }, icon('clipboard'), 'Revisar minhas respostas'),
        el('button', { type: 'button', class: 'btn btn--soft btn--big', 'data-go': 'library' }, icon('book'), 'Ver dicas de segurança'),
        el('button', { type: 'button', class: 'btn btn--ghost', 'data-go': 'categories' }, 'Escolher outro tema'))
    );
  }

  /* ===== Revisão das respostas ===== */
  function renderReview() {
    var box = $('#review-content');
    var answered = state.queue.filter(function (ch) { return state.answers[ch.id]; });
    if (!answered.length) {
      setKids(box,
        el('div', { class: 'empty' },
          el('p', { text: 'Ainda não há respostas para revisar. Jogue algumas situações primeiro.' }),
          el('button', { type: 'button', class: 'btn btn--primary btn--big', 'data-action': 'start-all' }, 'Começar o desafio')));
      return;
    }
    setKids(box,
      el('p', { class: 'lead', text: 'Toque em uma situação para ver o que você escolheu e a explicação.' }),
      el('div', { class: 'review' }, answered.map(function (ch, i) {
        var ans = state.answers[ch.id];
        var meta = STATUS[ans.status];
        var chosen = ch.options.filter(function (o) { return o.id === ans.optionId; })[0];
        var safeOptions = ch.options.filter(function (o) { return o.status === 'safe'; });
        return el('details', { class: 'review__item review__item--' + ans.status, open: ans.status !== 'safe' },
          el('summary', {},
            icon(meta.icon, 'review__icon'),
            el('span', { class: 'review__sum' },
              el('strong', { text: (i + 1) + '. ' + ch.title }),
              el('small', { text: meta.short + ' — ' + ans.points + ' de ' + ch.points + ' pontos' })),
            icon('chevron', 'review__chev')),
          el('div', { class: 'review__body' },
            el('h3', { text: 'Sua resposta' }), el('p', { text: chosen.text }),
            el('h3', { text: 'Explicação' }), el('p', { text: chosen.feedback }),
            ans.status !== 'safe'
              ? [el('h3', { text: safeOptions.length > 1 ? 'Atitudes mais seguras' : 'A atitude mais segura' }),
                 el('ul', {}, safeOptions.map(function (o) { return el('li', { text: o.text }); }))]
              : null,
            el('h3', { text: 'Dica prática' }), el('p', { text: ch.tip })));
      })),
      el('div', { class: 'actions' },
        el('button', { type: 'button', class: 'btn btn--primary btn--big', 'data-action': 'back-from-review' }, 'Voltar ao resultado'),
        el('button', { type: 'button', class: 'btn btn--soft btn--big', 'data-action': 'replay' }, 'Jogar novamente')));
  }

  /* ===== Tela 7: biblioteca ===== */
  function renderLibrary() {
    setKids($('#library-list'), DATA.TIPS.map(function (tip) {
      return el('details', { class: 'tip', id: 'tip-' + tip.id },
        el('summary', {},
          icon(tip.icon, 'tip__icon'),
          el('span', { class: 'tip__title', text: tip.title }),
          icon('chevron', 'tip__chev')),
        el('div', { class: 'tip__body' },
          el('p', { text: tip.intro }),
          el('ul', {}, tip.items.map(function (t) { return el('li', { text: t }); }))));
    }));
  }

  function openLibraryTopic(id) {
    go('library', { focus: false });
    var det = document.getElementById('tip-' + id);
    if (!det) { focusHeading('library'); return; }
    det.open = true;
    window.setTimeout(function () {
      det.scrollIntoView({ behavior: prefs.motionOff ? 'auto' : 'smooth', block: 'start' });
      var sum = $('summary', det);
      if (sum) { sum.focus({ preventScroll: true }); }
    }, 0);
  }

  function updateLibraryBackLabel() {
    var labels = { play: 'Voltar ao jogo', results: 'Voltar ao resultado', review: 'Voltar à revisão' };
    $('#library-back-label').textContent = labels[state.libFrom] || 'Voltar';
  }

  function backFromLibrary() {
    var to = state.libFrom || 'home';
    if (to === 'library') { to = 'home'; }
    if (to === 'play' && !currentChallenge()) { to = 'home'; }
    go(to);
  }

  /* ---------- 6. EVENTOS ---------- */

  var ACTIONS = {
    'brand': function () { if (confirmLeave()) { go('home'); } },
    'start-all': function () { startGame('all'); },
    'start-cat': function (node) { startGame(node.dataset.cat); },
    'confirm': confirmChoice,
    'next': nextStep,
    'exit-game': function () {
      if (confirmLeave()) { resetGame(); go('categories'); }
    },
    'replay': function () { startGame(state.mode || 'all'); },
    'review': function () { go('review'); },
    'back-from-review': function () { go('results'); },
    'back-from-library': backFromLibrary,
    'open-tip': function (node) { openLibraryTopic(node.dataset.topic); },
    'font-up': function () { prefs.fs = Math.min(FONT_STEPS.length - 1, prefs.fs + 1); applyPrefs(); savePrefs(); },
    'font-down': function () { prefs.fs = Math.max(0, prefs.fs - 1); applyPrefs(); savePrefs(); },
    'reset-prefs': resetPrefs
  };

  function init() {
    loadPrefs();
    applyPrefs();
    hydrateIcons(document);
    renderLibrary();
    var count = $('#fact-count');
    if (count) { count.textContent = String(CHALLENGES.length); }

    document.addEventListener('click', function (e) {
      var goBtn = e.target.closest('[data-go]');
      if (goBtn) { go(goBtn.dataset.go); return; }
      var act = e.target.closest('[data-action]');
      if (act && ACTIONS[act.dataset.action]) { ACTIONS[act.dataset.action](act); }
    });

    $('#options-list').addEventListener('change', function (e) {
      if (e.target && e.target.name === 'alternativa') { selectOption(e.target.value); }
    });

    $('#btn-settings').addEventListener('click', function () { toggleSettings(); });
    $('#opt-motion').addEventListener('change', function (e) { prefs.motionOff = e.target.checked; applyPrefs(); savePrefs(); });
    $('#opt-contrast').addEventListener('change', function (e) { prefs.contrast = e.target.checked; applyPrefs(); savePrefs(); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !$('#settings-panel').hidden) {
        toggleSettings(false);
        $('#btn-settings').focus();
      }
    });
    document.addEventListener('click', function (e) {
      var panel = $('#settings-panel');
      if (!panel.hidden && !e.target.closest('#settings-panel') && !e.target.closest('#btn-settings')) {
        toggleSettings(false);
      }
    });

    // Botão "voltar" do celular ou do navegador
    window.addEventListener('popstate', function (e) {
      var target = (e.state && e.state.screen) || 'home';
      go(target, { push: false });
    });
    try { window.history.replaceState({ screen: 'home' }, '', window.location.href); } catch (e) { /* ignora */ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
