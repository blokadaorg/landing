// Copy buttons and the dark mode toggle. Both are added by script, so a page
// without JavaScript shows no buttons that cannot work.
(function () {
  var root = document.documentElement;
  var labels = {
    copy: root.getAttribute('data-label-copy') || 'Copy',
    copied: root.getAttribute('data-label-copied') || 'Copied',
  };

  var ICON_COPY =
    '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var ICON_DONE =
    '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // Where the clipboard API is missing or refused, select the text instead so
  // one keystroke copies it.
  function selectText(node) {
    var range = document.createRange();
    range.selectNodeContents(node);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function addCopyButton(box, source) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-btn';
    button.setAttribute('aria-label', labels.copy);
    button.title = labels.copy;
    button.innerHTML = ICON_COPY;
    button.addEventListener('click', function () {
      var text = source.textContent.trim();
      var done = function () {
        button.innerHTML = ICON_DONE;
        button.classList.add('is-done');
        button.setAttribute('aria-label', labels.copied);
        button.title = labels.copied;
        setTimeout(function () {
          button.innerHTML = ICON_COPY;
          button.classList.remove('is-done');
          button.setAttribute('aria-label', labels.copy);
          button.title = labels.copy;
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { selectText(source); });
      } else {
        selectText(source);
      }
    });
    box.appendChild(button);
  }

  var boxes = document.querySelectorAll('.copy');
  for (var i = 0; i < boxes.length; i++) {
    addCopyButton(boxes[i], boxes[i].querySelector('code'));
  }
  var blocks = document.querySelectorAll('pre');
  for (var j = 0; j < blocks.length; j++) {
    blocks[j].classList.add('copy-block');
    addCopyButton(blocks[j], blocks[j].querySelector('code') || blocks[j]);
  }

  // Dark mode: follows the system until the reader picks, then remembers.
  var toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  toggle.hidden = false;
  var system = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function current() {
    var chosen = root.getAttribute('data-theme');
    if (chosen) return chosen;
    return system && system.matches ? 'dark' : 'light';
  }
  function show() {
    toggle.setAttribute('aria-pressed', current() === 'dark' ? 'true' : 'false');
    // For parts that can't follow CSS alone, like the comments frame.
    document.dispatchEvent(new CustomEvent('blokada:theme', { detail: current() }));
  }
  toggle.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('blokada_guides_theme', next);
    } catch (e) {
      // Not remembered, but this page still switches.
    }
    show();
  });
  if (system && system.addEventListener) system.addEventListener('change', show);
  show();
})();
