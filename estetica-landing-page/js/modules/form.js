/**
 * Form Module
 * Propósito: Validación de formulario con estados visuales
 * Dependencias: Ninguna
 */

export function initForm() {
  const form = document.querySelector('.contacto-form');

  if (!form) return;

  const inputs = form.querySelectorAll('input, select, textarea');

  // Add input event listeners for real-time validation
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => {
      if (input.parentElement.classList.contains('error')) {
        validateInput(input);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate all inputs
    inputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    // Simulate form submission (replace with actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success state
    submitBtn.textContent = '¡Enviado!';
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');

    // Reset form
    form.reset();

    // Remove success state after delay
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.classList.remove('success');
    }, 3000);

    // Create success message
    showNotification('Tu mensaje ha sido enviado. Te contactaremos pronto.', 'success');
  });
}

function validateInput(input) {
  const parent = input.parentElement;
  let isValid = true;

  // Check required
  if (input.required && !input.value.trim()) {
    isValid = false;
  }

  // Check email pattern
  if (input.type === 'email' && input.value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.value)) {
      isValid = false;
    }
  }

  // Check phone pattern (simple)
  if (input.type === 'tel' && input.value) {
    const phonePattern = /^[\d\s\-\+\(\)]{8,}$/;
    if (!phonePattern.test(input.value)) {
      isValid = false;
    }
  }

  // Update visual state
  parent.classList.remove('error', 'valid');

  if (input.value.trim()) {
    if (isValid) {
      parent.classList.add('valid');
    } else {
      parent.classList.add('error');
    }
  }

  return isValid;
}

function showNotification(message, type = 'info') {
  // Remove existing notification
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    z-index: 10000;
    transform: translateX(120%);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    font-family: var(--font-body);
    max-width: 360px;
  `;

  notification.textContent = message;
  document.body.appendChild(notification);

  // Animate in
  requestAnimationFrame(() => {
    notification.style.transform = 'translateX(0)';
  });

  // Remove after delay
  setTimeout(() => {
    notification.style.transform = 'translateX(120%)';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}