document.addEventListener('DOMContentLoaded', () => {
  const clockEl = document.getElementById('clock');
  const yearEl = document.getElementById('year');
  const cursor = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const updateClock = () => {
    if (!clockEl) return;
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(now);
    const hour = parts.find((p) => p.type === 'hour')?.value ?? '--';
    const minute = parts.find((p) => p.type === 'minute')?.value ?? '--';
    clockEl.textContent = `${hour}:${minute} ET`;
    clockEl.setAttribute('datetime', now.toISOString());
  };

  updateClock();
  setInterval(updateClock, 30000);

  if (finePointer && cursor && ring) {
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;

    document.addEventListener('mousemove', (e) => {
      x = e.clientX;
      y = e.clientY;
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });

    const animateRing = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

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
