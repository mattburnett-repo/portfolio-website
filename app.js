document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  const cursor = document.querySelector('.cursor');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (finePointer && cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });

    document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('lg'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('lg'));
    });
  }

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

  // Soften topbar over the video hero
  const topbar = document.querySelector('.topbar');
  const hero = document.querySelector('.hero');
  const syncTopbar = () => {
    if (!topbar || !hero) return;
    const pastHero = window.scrollY > hero.offsetHeight - 80;
    topbar.classList.toggle('on-paper', pastHero);
  };
  syncTopbar();
  window.addEventListener('scroll', syncTopbar, { passive: true });
});
