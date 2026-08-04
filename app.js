document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const HASH_ALIASES = {
    home: 'top',
    bio: 'about',
    portfolio: 'work',
    'skill-summary': 'stack',
    'other-info': 'record',
  };

  const remapHash = () => {
    const key = window.location.hash.slice(1);
    const target = HASH_ALIASES[key];
    if (target) {
      window.location.replace(`#${target}`);
    }
  };
  remapHash();
  window.addEventListener('hashchange', remapHash);

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  const topbar = document.querySelector('.topbar');
  const hero = document.querySelector('.hero');
  const syncTopbar = () => {
    if (!topbar || !hero) return;
    const pastHero = window.scrollY > hero.offsetHeight - 80;
    topbar.classList.toggle('on-paper', pastHero);
  };
  syncTopbar();
  window.addEventListener('scroll', syncTopbar, { passive: true });
  window.addEventListener('resize', syncTopbar);
});
