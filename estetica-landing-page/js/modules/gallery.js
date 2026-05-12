/**
 * Gallery Module
 * Propósito: Grid masonry y lightbox nativo
 * Dependencias: Ninguna (sin librerías externas)
 */

let currentImageIndex = 0;
let galleryImages = [];

export function initGallery() {
  const galleryItems = document.querySelectorAll('.galeria-item');

  if (galleryItems.length === 0) return;

  // Collect all images
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      galleryImages.push({
        src: img.src,
        alt: img.alt || `Galería imagen ${index + 1}`
      });

      item.addEventListener('click', () => openLightbox(index));
    }
  });

  createLightbox();
}

function createLightbox() {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'Galería de imágenes');
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Cerrar">
        <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <button class="lightbox-nav lightbox-prev" aria-label="Imagen anterior">
        <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <img src="" alt="" id="lightbox-img">
      <button class="lightbox-nav lightbox-next" aria-label="Siguiente imagen">
        <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
  `;

  document.body.appendChild(lightbox);

  // Event listeners
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const lightboxImg = lightbox.querySelector('#lightbox-img');

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  nextBtn.addEventListener('click', () => navigateLightbox(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox.querySelector('#lightbox-img');

  lightboxImg.src = galleryImages[index].src;
  lightboxImg.alt = galleryImages[index].alt;

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentImageIndex += direction;

  if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  } else if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }

  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox.querySelector('#lightbox-img');

  lightboxImg.src = galleryImages[currentImageIndex].src;
  lightboxImg.alt = galleryImages[currentImageIndex].alt;
}