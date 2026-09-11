export function initNavigation() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let lastFocus = null;

  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    lastFocus?.focus?.();
  };

  const openMenu = () => {
    if (!toggle || !menu) return;
    lastFocus = document.activeElement;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    menu.querySelector(focusableSelector)?.focus();
  };

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    open ? closeMenu() : openMenu();
  });

  menu?.addEventListener('click', (event) => {
    if (event.target.closest('a[href^="#"]')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.classList.contains('is-open')) closeMenu();
    if (event.key !== 'Tab' || !menu?.classList.contains('is-open')) return;
    const items = [...menu.querySelectorAll(focusableSelector)];
    if (!items.length) return;
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  const overlay = document.querySelector('[data-cart-overlay]');
  const drawer = document.querySelector('[data-cart-drawer]');
  const openers = document.querySelectorAll('[data-cart-open]');
  const closers = document.querySelectorAll('[data-cart-close]');
  let cartLastFocus = null;

  const closeCart = () => {
    overlay?.classList.remove('is-open');
    overlay?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-open');
    cartLastFocus?.focus?.();
  };
  const openCart = () => {
    closeMenu();
    cartLastFocus = document.activeElement;
    overlay?.classList.add('is-open');
    overlay?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-open');
    requestAnimationFrame(() => drawer?.focus());
  };
  openers.forEach((button) => button.addEventListener('click', openCart));
  closers.forEach((button) => button.addEventListener('click', closeCart));
  overlay?.addEventListener('click', (event) => { if (event.target === overlay) closeCart(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && overlay?.classList.contains('is-open')) closeCart(); });
}
