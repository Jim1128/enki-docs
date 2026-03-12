(function () {
  var VALID_USER = 'enkiai';
  var VALID_PASS = 'enki2026';

  function spawnParticles() {
    var c = document.getElementById('login-particles');
    if (!c) return;
    for (var i = 0; i < 18; i++) {
      var p = document.createElement('div');
      p.className = 'lp';
      var s = Math.random() * 3 + 1.5;
      p.style.cssText =
        'width:' + s + 'px;height:' + s + 'px;' +
        'left:' + (Math.random() * 100) + '%;' +
        'bottom:' + (-s * 2) + 'px;' +
        '--dx:' + (Math.random() * 80 - 40) + 'px;' +
        'animation-duration:' + (Math.random() * 12 + 8) + 's;' +
        'animation-delay:' + (Math.random() * 10) + 's;opacity:0';
      c.appendChild(p);
    }
  }

  function isAuthed() {
    try { return localStorage.getItem('enki-auth') === '1'; } catch(e) { return false; }
  }

  function dismissGate() {
    var gate = document.getElementById('login-gate');
    if (gate) {
      gate.classList.add('hidden');
      setTimeout(function () { if (gate.parentNode) gate.parentNode.removeChild(gate); }, 700);
    }
    document.body.classList.remove('login-active');
    document.body.style.overflow = '';
  }

  function toggleEye() {
    var pass = document.getElementById('login-pass');
    var btn  = document.getElementById('eye-btn');
    if (!pass || !btn) return;
    var show = pass.type === 'password';
    pass.type = show ? 'text' : 'password';
    btn.innerHTML = show
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    pass.focus();
  }

  window.handleLogin = function (e) {
    e.preventDefault();
    var userEl  = document.getElementById('login-user');
    var passEl  = document.getElementById('login-pass');
    var btn     = document.getElementById('login-btn');
    var errEl   = document.getElementById('login-error');
    var errMsg  = document.getElementById('login-error-msg');
    var card    = document.getElementById('login-card');
    var success = document.getElementById('login-success-overlay');

    var user = (userEl.value || '').trim();
    var pass = (passEl.value || '').trim();

    btn.classList.add('loading');
    btn.disabled = true;
    errEl.classList.remove('visible');

    setTimeout(function () {
      btn.classList.remove('loading');
      btn.disabled = false;

      if (user === VALID_USER && pass === VALID_PASS) {
        try { localStorage.setItem('enki-auth', '1'); } catch(ex) {}
        if (success) success.classList.add('flash');
        btn.style.background = 'linear-gradient(135deg,#10b981,#047857)';
        var t = btn.querySelector('.btn-text');
        if (t) t.textContent = 'Access Granted';
        setTimeout(dismissGate, 900);
      } else {
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
        errEl.classList.add('visible');
        if (errMsg) errMsg.textContent = user !== VALID_USER
          ? 'Unknown username. Please check and try again.'
          : 'Incorrect password. Please try again.';
        passEl.value = '';
        passEl.focus();
      }
    }, 800);
  };

  var eyeBtn = document.getElementById('eye-btn');
  if (eyeBtn) eyeBtn.addEventListener('click', toggleEye);

  if (isAuthed()) { dismissGate(); }
  else {
    spawnParticles();
    var u = document.getElementById('login-user');
    if (u) u.focus();
  }
})();

function toggleTheme() {
  var html    = document.documentElement;
  var isLight = html.classList.toggle('light');
  var icon    = document.getElementById('theme-icon');
  var label   = document.getElementById('theme-label');
  if (icon)  icon.textContent  = isLight ? '🌙' : '☀️';
  if (label) label.textContent = isLight ? 'Dark' : 'Light';
  try { localStorage.setItem('enki-theme', isLight ? 'light' : 'dark'); } catch(e) {}
}

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}
document.addEventListener('click', function (e) {
  var menu = document.getElementById('mobile-menu');
  var btn  = document.getElementById('hamburger');
  if (menu && menu.classList.contains('open') && !menu.contains(e.target) && !btn.contains(e.target))
    closeMenu();
});
window.addEventListener('resize', function () {
  if (window.innerWidth > 900) closeMenu();
});

(function () {
  try {
    if (localStorage.getItem('enki-theme') === 'light') {
      document.documentElement.classList.add('light');
      document.addEventListener('DOMContentLoaded', function () {
        var icon  = document.getElementById('theme-icon');
        var label = document.getElementById('theme-label');
        if (icon)  icon.textContent  = '🌙';
        if (label) label.textContent = 'Dark';
      });
    }
  } catch(e) {}
})();

document.addEventListener('DOMContentLoaded', function () {
  var NAV_HEIGHT = 70;
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT, behavior: 'smooth' });
    });
  });
});