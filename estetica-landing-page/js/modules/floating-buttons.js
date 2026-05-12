/**
 * Floating Buttons Module
 * Propósito: WhatsApp floating button y scroll-to-top
 * Dependencias: Ninguna
 */

export function initFloatingButtons() {
  initScrollToTop();
}

function initScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-to-top');

  if (!scrollBtn) return;

  let ticking = false;

  function updateVisibility() {
    const scrollY = window.scrollY;

    if (scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Click handler
  const link = scrollBtn.querySelector('a');
  if (link) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Check reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    scrollBtn.style.transition = 'opacity 0s';
  }
}