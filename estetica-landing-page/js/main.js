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
import { initAccordion } from './modules/accordion.js';
import { initForm } from './modules/form.js';
import { initFloatingButtons } from './modules/floating-buttons.js';

document.addEventListener('DOMContentLoaded', () => {
  // Limpiar cualquier hash que intente hacer scroll automático
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  
  initNavbar();
  initRevealOnScroll();
  initParallax();
  initCounters();
  initGallery();
  initAccordion();
  initForm();
  initFloatingButtons();

  console.log('Estética Bella - Landing page initialized');
});