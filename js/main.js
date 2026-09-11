import { initNavigation } from './navigation.js';
import { initCarousels } from './carousel.js';
import { initAnimations } from './animations.js';
import { initSpotlightText } from './spotlight.js';

const FORM_ENDPOINT = '/api/contact';

function initNewsletterForms() {
  document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const success = form.querySelector('.form-status.success');
    const error = form.querySelector('.form-status.error');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      success?.classList.remove('is-visible');
      error?.classList.remove('is-visible');
      const valid = input?.checkValidity();
      if (!valid) {
        error?.classList.add('is-visible');
        input?.focus();
        return;
      }
      // Static reconstruction: deliberately does not post to Webflow.
      // Replace this mock with fetch(FORM_ENDPOINT, ...) when a backend exists.
      success?.classList.add('is-visible');
      form.reset();
    });
  });
}

initNavigation();
initCarousels();
initAnimations();
initSpotlightText();
initNewsletterForms();

window.__INDUSTRIAL_CONFIG__ = { FORM_ENDPOINT };
