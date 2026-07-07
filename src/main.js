// === Scroll reveals (blur + fade-up) ===
const initRevealAnimations = () => {
  const reveals = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );

  reveals.forEach((el) => observer.observe(el));
};

// === Sticky CTA: show after hero, hide on final ===
const initStickyCta = () => {
  const sticky = document.querySelector('[data-sticky-cta]');
  if (!sticky) return;

  const hero = document.querySelector('#hero');
  const final = document.querySelector('#final');
  if (!hero || !final) return;

  const showObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        sticky.classList.toggle('opacity-0', entry.isIntersecting);
        sticky.classList.toggle('translate-y-8', entry.isIntersecting);
        sticky.classList.toggle('pointer-events-none', entry.isIntersecting);
      });
    },
    { threshold: 0.1 },
  );
  showObserver.observe(hero);

  const hideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sticky.classList.add('opacity-0', 'translate-y-8', 'pointer-events-none');
        }
      });
    },
    { threshold: 0.3 },
  );
  hideObserver.observe(final);
};

// === Nav: hide on scroll down, show on scroll up ===
const initNavHider = () => {
  const nav = document.querySelector('[data-nav]');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener(
    'scroll',
    () => {
      const current = window.scrollY;
      if (current < 80) {
        nav.classList.remove('-translate-y-full');
      } else if (current > lastScroll && current > 120) {
        nav.classList.add('-translate-y-full');
      } else {
        nav.classList.remove('-translate-y-full');
      }
      lastScroll = current;
    },
    { passive: true },
  );
};

initRevealAnimations();
initStickyCta();
initNavHider();
