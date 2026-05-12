/**
 * Main JavaScript - Entry Point
 * Propósito: Inicializar todos los módulos de la aplicación
 * Dependencias: Ninguna (módulos importados)
 */

import { initNavbar } from './modules/navbar.js';
import { initRevealOnScroll } from './modules/reveal.js';
import { initParallax } from './modules/parallax.js';
import { initCounters } from './modules/counters.js';
import { initGallery } from './modules/gallery.js';
import { initSlider } from './modules/slider.js';
import { initAccordion } from './modules/accordion.js';
import { initForm } from './modules/form.js';
import { initFloatingButtons } from './modules/floating-buttons.js';

document.addEventListener('DOMContentLoaded', () => {
  // Evitar scroll automático a cualquier hash al cargar
  if (window.location.hash) {
    window.scrollTo(0, 0);
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  initNavbar();
  initRevealOnScroll();
  initParallax();
  initCounters();
  initGallery();
  initSlider();
  initAccordion();
  initForm();
  initFloatingButtons();

  console.log('Estética Bella - Landing page initialized');
});

// También ejecutar antes de que cargue cualquier recurso
if (window.location.hash) {
  sessionStorage.setItem('scrollToTop', 'true');
}
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('scrollToTop', 'true');
});