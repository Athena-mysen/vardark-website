const nav = document.getElementById('nav');
const burger = document.getElementById('navBurger');
const menu = document.getElementById('mobileMenu');

if (nav && burger && menu) {
  const setMenuOpen = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Lukk meny' : 'Åpne meny');
    menu.setAttribute('aria-hidden', String(!open));
    menu.toggleAttribute('inert', !open);
    burger.classList.toggle('is-open', open);
    menu.classList.toggle('is-open', open);
  };

  window.addEventListener(
    'scroll',
    () => nav.classList.toggle('nav--scrolled', window.scrollY > 40),
    { passive: true },
  );

  burger.addEventListener('click', () => {
    setMenuOpen(burger.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      burger.focus();
    }
  });
}
