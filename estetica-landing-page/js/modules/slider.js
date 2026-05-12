/**
 * Slider Module
 * Propósito: Slider de testimonios con auto-scroll y scroll-snap
 * Dependencias: Ninguna
 */

let autoScrollInterval = null;
let isPaused = false;

export function initSlider() {
  const slider = document.querySelector('.testimonios-slider');
  const dotsContainer = document.querySelector('.testimonios-dots');

  if (!slider) return;

  const cards = slider.querySelectorAll('.testimonio-card');
  if (cards.length === 0) return;

  // Create dots if container exists
  if (dotsContainer) {
    cards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Ir a testimonio ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => scrollToCard(index));
      dotsContainer.appendChild(dot);
    });
  }

  // Auto-scroll
  function startAutoScroll() {
    if (autoScrollInterval) return;

    autoScrollInterval = setInterval(() => {
      if (!isPaused) {
        const sliderWidth = slider.offsetWidth;
        const scrollLeft = slider.scrollLeft;
        const maxScroll = slider.scrollWidth - sliderWidth;

        if (scrollLeft >= maxScroll - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const nextCard = cards[Math.floor(scrollLeft / sliderWidth) + 1];
          if (nextCard) {
            nextCard.scrollIntoView({ behavior: 'smooth', inline: 'start' });
          }
        }
      }
    }, 5000);
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  // Pause on hover and focus
  slider.addEventListener('mouseenter', () => {
    isPaused = true;
    stopAutoScroll();
  });

  slider.addEventListener('mouseleave', () => {
    isPaused = false;
    startAutoScroll();
  });

  slider.addEventListener('focusin', () => {
    isPaused = true;
    stopAutoScroll();
  });

  slider.addEventListener('focusout', () => {
    isPaused = false;
    startAutoScroll();
  });

  // Grab to scroll (touch/mouse)
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    stopAutoScroll();
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.style.cursor = 'grab';
    startAutoScroll();
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.cursor = 'grab';
    startAutoScroll();
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

  // Update dots on scroll
  slider.addEventListener('scroll', () => {
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('button');
      const cardWidth = cards[0].offsetWidth + 32; // gap
      const currentIndex = Math.round(slider.scrollLeft / cardWidth);

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
  });

  // Auto-scroll deshabilitado porrequest
  // startAutoScroll();

  // Handle reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    stopAutoScroll();
  }
}

function scrollToCard(index) {
  const slider = document.querySelector('.testimonios-slider');
  const cards = slider.querySelectorAll('.testimonio-card');
  cards[index].scrollIntoView({ behavior: 'auto', inline: 'start' });
}