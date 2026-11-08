/**
 * Contact page: field validation, loading state on submit, toast notifications.
 * Sends through EmailJS (script must be loaded before this file).
 */
(function () {
  'use strict';

  const EMAILJS = {
    publicKey: 'hVmWtLUYKqxevkNgU',
    serviceId: 'service_wn1a6ao',
    templateId: 'template_mriyar6',
  };

  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const btnLabel = submitBtn.querySelector('.btn-label');
  const counter = document.getElementById('messageCount');
  const MESSAGE_MAX = 1000;

  if (window.emailjs) emailjs.init(EMAILJS.publicKey);

  /* ---------- Validation rules (return '' when valid) ---------- */
  const rules = {
    name(v) {
      if (!v) return 'Please enter your full name.';
      if (v.length < 2) return 'Name must be at least 2 characters.';
      if (!/^[\p{L}\s.'-]+$/u.test(v)) return 'Name can only contain letters and spaces.';
      return '';
    },
    email(v) {
      if (!v) return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Please enter a valid email address.';
      return '';
    },
    phone(v) {
      if (!v) return ''; // optional
      const digits = v.replace(/[\s\-()]/g, '');
      if (!/^\+?\d{10,15}$/.test(digits)) return 'Enter a valid phone number, e.g. +8801XXXXXXXXX.';
      return '';
    },
    message(v) {
      if (!v) return 'Please tell us about your project.';
      if (v.length < 10) return 'Message must be at least 10 characters.';
      if (v.length > MESSAGE_MAX) return `Message must be under ${MESSAGE_MAX} characters.`;
      return '';
    },
  };

  const fields = Object.keys(rules).map((n) => form.elements[n]);

  function validateField(input) {
    const value = input.value.trim();
    const error = rules[input.name](value);
    const errorEl = document.getElementById(`${input.name}-error`);

    input.classList.toggle('is-invalid', !!error);
    input.classList.toggle('is-valid', !error && value !== '');
    input.setAttribute('aria-invalid', error ? 'true' : 'false');
    if (errorEl) errorEl.textContent = error;
    return !error;
  }

  fields.forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    // Re-validate live only after the field was flagged, so we don't nag while typing
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) validateField(input);
    });
  });

  form.elements.message.addEventListener('input', (e) => {
    counter.textContent = `${e.target.value.length} / ${MESSAGE_MAX}`;
  });

  /* ---------- Toast ---------- */
  function showToast(type, title, message, duration = 5000) {
    let box = document.getElementById('toast-container');
    if (!box) {
      box = document.createElement('div');
      box.id = 'toast-container';
      box.setAttribute('aria-live', 'polite');
      document.body.appendChild(box);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    toast.innerHTML = `
      <span class="toast-icon" aria-hidden="true">${type === 'error' ? '!' : '✓'}</span>
      <div>
        <div class="toast-title"></div>
        <div class="toast-msg"></div>
      </div>
      <button type="button" class="toast-close" aria-label="Close notification">&times;</button>`;
    toast.querySelector('.toast-title').textContent = title;
    toast.querySelector('.toast-msg').textContent = message;

    const remove = () => {
      toast.classList.add('is-leaving');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    };
    toast.querySelector('.toast-close').addEventListener('click', remove);
    box.appendChild(toast);
    setTimeout(remove, duration);
  }

  /* ---------- Loading state ---------- */
  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.classList.toggle('is-loading', isLoading);
    submitBtn.setAttribute('aria-busy', isLoading ? 'true' : 'false');
    btnLabel.textContent = isLoading ? 'Sending...' : 'Send Message';
  }

  function resetFormState() {
    form.reset();
    fields.forEach((input) => {
      input.classList.remove('is-invalid', 'is-valid');
      input.removeAttribute('aria-invalid');
      const errorEl = document.getElementById(`${input.name}-error`);
      if (errorEl) errorEl.textContent = '';
    });
    counter.textContent = `0 / ${MESSAGE_MAX}`;
  }

  /* ---------- Submit ---------- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return; // block double submits

    // Honeypot: bots fill hidden fields, humans don't
    if (form.elements.website && form.elements.website.value) return;

    const results = fields.map(validateField);
    const firstInvalid = fields[results.indexOf(false)];
    if (firstInvalid) {
      firstInvalid.focus();
      showToast('error', 'Check your details', 'Please fix the highlighted fields and try again.');
      return;
    }

    if (!window.emailjs) {
      showToast('error', 'Something went wrong', 'Email service failed to load. Please refresh and try again.');
      return;
    }

    setLoading(true);
    try {
      await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, form);
      showToast('success', 'Message sent successfully!', "Thanks for reaching out. We'll get back to you soon.");
      resetFormState();
    } catch (err) {
      console.error('EmailJS error:', err);
      showToast('error', 'Failed to send message', 'Please try again, or contact us by phone or email.');
    } finally {
      setLoading(false);
    }
  });
})();