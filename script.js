(() => {
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  const year = document.getElementById('year');
  const form = document.getElementById('quoteForm');
  const formError = document.getElementById('formError');

  if (year) year.textContent = new Date().getFullYear();

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      siteNav.classList.toggle('is-open', !isOpen);
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
        siteNav.classList.remove('is-open');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
        siteNav.classList.remove('is-open');
        menuToggle.focus();
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const subject = `Quote enquiry — ${data.get('service')}`;
      const body = [
        'Hello Top Hat Home Maintenance Services,',
        '',
        'I would like to enquire about a quote.',
        '',
        `Name: ${data.get('name')}`,
        `Phone: ${data.get('phone')}`,
        `Email: ${data.get('email') || 'Not provided'}`,
        `Service: ${data.get('service')}`,
        `Suburb: ${data.get('suburb') || 'Not provided'}`,
        '',
        'Project details:',
        data.get('details') || 'Not provided',
        '',
        'Thank you.'
      ].join('\n');

      const mailto = `mailto:tophatpainting@hatmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      if (formError) formError.hidden = false;
    });
  }
})();
