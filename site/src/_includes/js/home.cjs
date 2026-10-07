// Inlined into the homepage. Everything on the page reads and links without
// it; this adds the menu, tabs, language picker and the old ?lang= links.
(function (root) {
  // The first browser language we have a page for. Portuguese readers get
  // the Brazilian page, Traditional Chinese regions the zh-Hant one.
  function matchLanguage(preferred, codes) {
    for (var i = 0; i < preferred.length; i++) {
      var want = String(preferred[i] || '').toLowerCase();
      if (!want) continue;
      if (/^zh-(tw|hk|mo|hant)/.test(want)) want = 'zh-hant';
      else if (/^zh\b/.test(want)) continue;
      else if (/^pt\b/.test(want)) want = 'pt-br';
      for (var j = 0; j < codes.length; j++) {
        var code = codes[j].toLowerCase();
        if (code === want || code === want.split('-')[0]) return codes[j];
      }
    }
    return null;
  }

  // Where an old /?lang=xx link should land, or null to stay.
  function langRedirect(search, hash, langs) {
    var found = /[?&]lang=([A-Za-z-]+)(?:&|$)/.exec(search);
    if (!found) return null;
    for (var i = 0; i < langs.length; i++) {
      if (langs[i].code.toLowerCase() === found[1].toLowerCase()) {
        return langs[i].code === 'en' ? null : langs[i].path + hash;
      }
    }
    return null;
  }

  // localStorage that never throws: private windows and blocked site data.
  function storage(win) {
    return {
      get: function (key) { try { return win.localStorage.getItem(key); } catch (e) { return null; } },
      set: function (key, value) { try { win.localStorage.setItem(key, value); } catch (e) { /* not kept */ } },
    };
  }

  if (typeof module !== 'undefined') module.exports = { matchLanguage: matchLanguage, langRedirect: langRedirect, storage: storage };
  var doc = root.document;
  if (!doc) return;

  var page = doc.documentElement;
  var langs = JSON.parse(page.getAttribute('data-langs'));
  var current = page.getAttribute('data-lang');
  var store = storage(root);

  if (current === 'en') {
    var target = langRedirect(root.location.search, root.location.hash, langs);
    if (target) { root.location.replace(target); return; }
  }
  page.className += ' js';

  function all(selector) { return Array.prototype.slice.call(doc.querySelectorAll(selector)); }
  function on(selector, handler) {
    all(selector).forEach(function (el) {
      el.addEventListener('click', function (event) { handler(el, event); });
    });
  }

  var menu = doc.getElementById('menu');
  on('[data-menu-open]', function () { menu.classList.add('show'); });
  on('[data-menu-close], #menu a:not([data-dropdown])', function () { menu.classList.remove('show'); });

  function closeDropdowns() {
    all('.dropdown-menu.show').forEach(function (list) { list.classList.remove('show'); });
    all('[data-dropdown]').forEach(function (el) { el.setAttribute('aria-expanded', 'false'); });
  }
  on('[data-dropdown]', function (el, event) {
    event.preventDefault();
    event.stopPropagation();
    var list = el.parentNode.querySelector('.dropdown-menu');
    var open = list.classList.contains('show');
    closeDropdowns();
    if (!open) { list.classList.add('show'); el.setAttribute('aria-expanded', 'true'); }
  });
  doc.addEventListener('click', closeDropdowns);

  on('[data-tab]', function (el, event) {
    event.preventDefault();
    all('[data-tab]').forEach(function (tab) {
      tab.classList.toggle('active', tab === el);
      tab.setAttribute('aria-selected', String(tab === el));
    });
    all('[data-pane]').forEach(function (pane) {
      pane.classList.toggle('active', pane.getAttribute('data-pane') === el.getAttribute('data-tab'));
    });
  });

  var dialog = doc.getElementById('languages');
  on('[data-languages-open]', function () { if (dialog.showModal) dialog.showModal(); else dialog.setAttribute('open', ''); });
  on('[data-languages-close]', function () { if (dialog.close) dialog.close(); else dialog.removeAttribute('open'); });
  on('#languages a, .lang-prompt a', function (el) { store.set('blokada_lang', el.getAttribute('data-lang')); });

  var prompt = doc.querySelector('.lang-prompt');
  var wanted = matchLanguage(root.navigator.languages || [root.navigator.language], langs.map(function (l) { return l.code; }));
  if (wanted && wanted !== current && !store.get('blokada_lang') && !store.get('blokada_lang_prompt')) {
    var link = prompt.querySelector('[data-lang="' + wanted + '"]');
    if (link) { link.hidden = false; prompt.hidden = false; }
  }
  on('[data-prompt-close]', function () { prompt.hidden = true; store.set('blokada_lang_prompt', 'closed'); });
})(typeof window !== 'undefined' ? window : this);
