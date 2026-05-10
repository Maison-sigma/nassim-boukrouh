/* nassimboukrouh.com — interactions */
(() => {
  // ---------- mobile menu ----------
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // ---------- smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // ---------- reveal on scroll ----------
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---------- form ----------
  const form = document.getElementById('applyForm');
  const sent = document.getElementById('formSent');
  const objectif = document.getElementById('objectif');
  const count = document.getElementById('count');
  if (objectif && count) {
    objectif.addEventListener('input', () => {
      count.textContent = objectif.value.length;
      count.classList.toggle('over', objectif.value.length > 200);
    });
  }
  function setErr(name, msg) {
    const el = form.querySelector(`[data-err="${name}"]`);
    if (!el) return;
    if (name === 'objectif') {
      el.innerHTML = msg
        ? msg
        : `<span class="count" id="count">${objectif.value.length}</span> / 200`;
    } else {
      el.textContent = msg || '';
    }
    const input = form.querySelector(`[name="${name}"]`);
    if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      const data = new FormData(form);
      const must = ['prenom','nom','email','ville','objectif'];
      must.forEach(n => {
        const v = (data.get(n) || '').toString().trim();
        if (!v) { setErr(n, 'Champ requis.'); ok = false; }
        else setErr(n, '');
      });
      const email = (data.get('email') || '').toString();
      if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        setErr('email', 'Email invalide.');
        ok = false;
      }
      if (!data.get('profil'))  { setErr('profil',  'Sélectionnez un profil.');   ok = false; } else setErr('profil','');
      if (!data.get('capacite')){ setErr('capacite','Sélectionnez une capacité.'); ok = false; } else setErr('capacite','');
      if (!ok) {
        const firstErr = form.querySelector('[aria-invalid="true"], [data-err]:not(:empty)');
        if (firstErr) {
          const y = firstErr.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        return;
      }
      form.classList.add('is-sent');
      sent.classList.add('is-sent');
      const y = sent.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }

  // ---------- tagline / hero variant tweaks (live) ----------
  const TAGLINES = {
    devenir: `Je vous accompagne à <em class="em-accent">devenir</em> marchand de biens.`,
    triade:  `Apprendre. Sourcer. <em class="em-accent">Co-investir.</em>`,
    ensemble:`Marchand de biens, <em class="em-accent">ensemble.</em>`,
    reseau:  `Le réseau qui <em class="em-accent">opère</em> avec ses membres.`,
  };
  window.__nassim = {
    setTagline(key) {
      const el = document.getElementById('hookTitle');
      if (el && TAGLINES[key]) el.innerHTML = TAGLINES[key];
    },
    setHeroVariant(v) {
      const hero = document.getElementById('hero');
      if (hero) hero.setAttribute('data-variant', v);
    },
    setAccent(hex) {
      document.documentElement.style.setProperty('--accent', hex);
    },
  };
})();
