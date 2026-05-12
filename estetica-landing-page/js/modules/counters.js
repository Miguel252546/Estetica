/**
 * Counters Module
 * Propósito: Contadores animados que se activan al hacer scroll
 * Dependencias: Ninguna
 */

export function initCounters() {
  const counters = document.querySelectorAll('.metric-number[data-value]');

  if (counters.length === 0) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetValue = parseInt(counter.dataset.value, 10);
        const duration = parseInt(counter.dataset.duration, 10) || 2000;
        const isDecimal = counter.dataset.decimal === 'true';

        animateCounter(counter, targetValue, duration, isDecimal);
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => counterObserver.observe(counter));

  // Check reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    counters.forEach(counter => {
      const value = counter.dataset.value;
      const isDecimal = counter.dataset.decimal === 'true';
      counter.textContent = isDecimal ? (parseFloat(value) / 10).toFixed(1) : value;
    });
  }
}

function animateCounter(element, target, duration, isDecimal) {
  const startTime = performance.now();
  const startValue = 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out cubic)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = startValue + (target - startValue) * easeOut;

    if (isDecimal) {
      element.textContent = (currentValue / 10).toFixed(1);
    } else {
      element.textContent = Math.floor(currentValue);
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = isDecimal ? (target / 10).toFixed(1) : target;
    }
  }

  requestAnimationFrame(update);
}