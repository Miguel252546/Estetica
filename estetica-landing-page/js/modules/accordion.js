/**
 * Accordion Module
 * Propósito: FAQ accordion con animación de height
 * Dependencias: Ninguna
 */

export function initAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items (accordion behavior)
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', !isOpen);
    });

    // Initialize ARIA attributes
    question.setAttribute('aria-expanded', item.classList.contains('open'));
    question.setAttribute('aria-controls', item.querySelector('.faq-answer').id);
  });

  // Keyboard navigation
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach((question, index) => {
    question.addEventListener('keydown', (e) => {
      let targetIndex;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          targetIndex = (index + 1) % questions.length;
          questions[targetIndex].focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          targetIndex = (index - 1 + questions.length) % questions.length;
          questions[targetIndex].focus();
          break;
        case 'Home':
          e.preventDefault();
          questions[0].focus();
          break;
        case 'End':
          e.preventDefault();
          questions[questions.length - 1].focus();
          break;
      }
    });
  });

  // Check reduced motion - disable animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    const answers = document.querySelectorAll('.faq-answer');
    answers.forEach(answer => {
      answer.style.transition = 'none';
      answer.style.maxHeight = 'none';
    });
  }
}