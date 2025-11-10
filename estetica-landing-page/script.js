// Header dinámico y funcionalidades interactivas
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const form = document.querySelector('.contacto-form');
    const viewportMeta = document.querySelector('meta[name="viewport"]');

    // Header dinámico al hacer scroll
    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Cambiar título dinámicamente según la sección visible
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        // Actualizar el título del header según la sección
        updateHeaderTitle(currentSection);
    }

    // Función para actualizar el título del header
    function updateHeaderTitle(sectionId) {
        const logo = document.querySelector('.logo span');
        const titles = {
            'hero': 'Estética Bella',
            'servicios': 'Nuestros Servicios',
            'accesorios': 'Accesorios Exclusivos',
            'contacto': 'Reserva tu Turno'
        };

        if (titles[sectionId]) {
            logo.textContent = titles[sectionId];
        } else {
            logo.textContent = 'Estética Bella';
        }
    }

    // Menú hamburguesa para móviles
    function toggleMobileMenu() {
        if (!navList || !hamburger) return;
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
    }

    // Cerrar menú móvil al hacer clic en un enlace
    function closeMobileMenu() {
        if (!navList || !hamburger) return;
        navList.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    // Smooth scroll para enlaces de navegación
    function smoothScroll(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Animaciones al hacer scroll (Intersection Observer)
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observar elementos que necesitan animación
        const animatedElements = document.querySelectorAll('.servicio-card, .accesorio-card, .contacto-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Validación y envío del formulario
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validación básica
        if (!data.nombre || !data.email || !data.servicio) {
            showNotification('Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Por favor, ingresa un email válido.', 'error');
            return;
        }

        // Simular envío del formulario
        showNotification('¡Gracias! Tu consulta ha sido enviada. Te contactaremos pronto.', 'success');
        form.reset();
    }

    // Sistema de notificaciones
    function showNotification(message, type = 'info') {
        // Remover notificación existente si hay una
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover después de 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Efecto parallax suave para el hero
    function handleParallax() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }

    // Contador animado para precios (opcional)
    function animateCounters() {
        const counters = document.querySelectorAll('.servicio-price, .accesorio-price');

        counters.forEach(counter => {
            const text = counter.textContent || '';
            const match = text.match(/[\d\.,]+/);
            if (!match) return;
            const raw = match[0].replace(/[^\d]/g, '');
            const number = parseInt(raw, 10);
            if (isNaN(number) || number <= 0) return;

            let current = 0;
            const steps = 50;
            const increment = Math.ceil(number / steps);
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    counter.textContent = text; // restaurar texto original
                    clearInterval(timer);
                } else {
                    const formatted = current.toLocaleString('es-AR');
                    counter.textContent = text.replace(match[0], formatted);
                }
            }, 20);
        });
    }

    // Event Listeners
    window.addEventListener('scroll', () => {
        handleScroll();
        handleParallax();
    });

    if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            smoothScroll(targetId);
            closeMobileMenu();
        });
    });

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Inicializar animaciones
    setupScrollAnimations();

    // Animar contadores cuando la página carga
    setTimeout(animateCounters, 1000);

    // Efecto de escritura para el título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Aplicar efecto de escritura al título principal (preservando HTML)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // No aplicar el efecto de escritura para preservar el span
        // El efecto de escritura se desactiva para mantener el HTML original
    }

    // Lazy loading para imágenes (si se agregan en el futuro)
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    setupLazyLoading();

    // Prevenir zoom en inputs en iOS
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (window.innerWidth < 768 && viewportMeta) {
                viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
        });
        
        input.addEventListener('blur', () => {
            if (viewportMeta) viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
        });
    });

    // Mejorar accesibilidad del menú hamburguesa
    if (hamburger) {
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });
    }

    // Cerrar menú móvil al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (hamburger && navList && !hamburger.contains(e.target) && !navList.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Mejorar navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
});
