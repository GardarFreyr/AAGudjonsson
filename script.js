// AAGuðjónsson ehf. — small progressive enhancements
(function () {
  // ?kynning hides the draft labels and preview strip for client presentations
  if (new URLSearchParams(location.search).has('kynning')) {
    document.documentElement.classList.add('no-drafts');
  }

  // Mobile menu
  var burger = document.querySelector('.burger');
  var mnav = document.getElementById('mnav');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Loka valmynd' : 'Valmynd');
    mnav.hidden = !open;
  }
  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });
  mnav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !mnav.hidden) { setMenu(false); burger.focus(); }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', function (m) {
    if (m.matches) setMenu(false);
  });

  // Highlight the current section in the desktop nav
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-main a'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) spy.observe(s); });

    // Subtle reveal on scroll
    var rv = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); rv.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rv').forEach(function (el) { rv.observe(el); });
  } else {
    document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('in'); });
  }

  // Demo form: validates in Icelandic, never sends anything
  var form = document.getElementById('fyrirspurn');
  var note = form.querySelector('.sent');
  var messages = {
    nafn: { valueMissing: 'Vinsamlegast skráðu nafn.' },
    netfang: { valueMissing: 'Vinsamlegast skráðu netfang.', typeMismatch: 'Netfangið virðist ekki rétt, t.d. nafn@dæmi.is.' },
    lysing: { valueMissing: 'Segðu okkur í stuttu máli frá verkinu.' }
  };
  function check(field) {
    var m = messages[field.name];
    if (!m) return true;
    var err = document.getElementById('err-' + field.name);
    var msg = '';
    if (field.validity.valueMissing || (field.required && !field.value.trim())) msg = m.valueMissing;
    else if (field.validity.typeMismatch) msg = m.typeMismatch || '';
    err.textContent = msg;
    if (msg) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid');
    return !msg;
  }
  Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (f) {
    f.addEventListener('blur', function () { if (f.value) check(f); });
    f.addEventListener('input', function () { if (f.hasAttribute('aria-invalid')) check(f); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstBad = null;
    Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (f) {
      if (!check(f) && !firstBad) firstBad = f;
    });
    if (firstBad) { note.hidden = true; firstBad.focus(); return; }
    var name = form.nafn.value.trim().split(/\s+/)[0];
    note.innerHTML = '';
    var b = document.createElement('b');
    b.textContent = 'Takk, ' + name + '. ';
    note.appendChild(b);
    note.appendChild(document.createTextNode('Formið virkar rétt, en þetta er kynningarútgáfa og fyrirspurnin var ekki send. Á fullbúnum vef berst hún beint til AAGuðjónsson.'));
    note.hidden = false;
    note.focus();
  });

  var ar = document.getElementById('ar');
  if (ar) ar.textContent = new Date().getFullYear();
})();
