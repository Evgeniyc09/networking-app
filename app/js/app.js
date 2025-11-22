document.addEventListener('DOMContentLoaded', () => {
  let openCount = 0;
  const body = document.body;

  const getScrollbarWidth = () =>
    window.innerWidth - document.documentElement.clientWidth;

  function lockScroll() {
    if (openCount === 0) {
      const sw = getScrollbarWidth();
      body.dataset._prevOverflow = body.style.overflow || '';
      body.dataset._prevPaddingRight = body.style.paddingRight || '';
      if (sw > 0) body.style.paddingRight = sw + 'px';
      body.style.overflow = 'hidden';
      body.classList.add('scroll-locked');
    }
    openCount++;
  }

  function unlockScroll() {
    openCount = Math.max(0, openCount - 1);
    if (openCount === 0) {
      body.style.overflow = body.dataset._prevOverflow || '';
      body.style.paddingRight = body.dataset._prevPaddingRight || '';
      body.classList.remove('scroll-locked');
      delete body.dataset._prevOverflow;
      delete body.dataset._prevPaddingRight;
    }
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal || modal.classList.contains('active')) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    lockScroll();
  }

  function closeModal(modal) {
    if (!modal || !modal.classList.contains('active')) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    unlockScroll();
  }

  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-modal-open]');
    const closeBtn = e.target.closest('[data-modal-close]');


    if (openBtn) {
      if (openBtn.tagName === 'A') e.preventDefault();
      const href = openBtn.getAttribute('href');
      if (href && (href === '#' || href.startsWith('#'))) e.preventDefault();
      const id = openBtn.getAttribute('data-modal-open');
      if (id) openModal(id);
      return;
    }
    if (closeBtn) {
      const modal = closeBtn.closest('.modal');
      closeModal(modal);
      return;
    }

      if (e.target.matches('.modal__overlay')) {
        const modal = e.target.closest('.modal');
        closeModal(modal);
        return;
      }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active')
        .forEach((modal) => closeModal(modal));
    }
  });
});

document.addEventListener('input', function(e) {
  if (!e.target.matches('.auto-textarea')) return;
  e.target.style.height = 'auto';
  e.target.style.height = e.target.scrollHeight + 'px';
});


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.auto-textarea').forEach(el => {
    el.style.height = el.scrollHeight + 'px';
  });
})

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tabs-wrapper').forEach(wrapper => {
    const buttons = wrapper.querySelectorAll('.tab-btn');
    const contents = wrapper.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        wrapper.querySelector('#' + tabId).classList.add('active');
      });
    });
  });
});

  function initMultiSelects() {
    const widgets = document.querySelectorAll('.ms');
    if (!widgets.length) return;

    function closeAll() {
      widgets.forEach(w => w.classList.remove('is-open'));
    }

    widgets.forEach(widget => {
      const trigger = widget.querySelector('.ms__trigger');
      const menu = widget.querySelector('.ms__menu');
      const hidden = widget.querySelector('input[type="hidden"]');
      const checkboxes = widget.querySelectorAll('input[type="checkbox"]');
      const placeholder = widget.dataset.placeholder || 'Выберите';

      if (!trigger || !menu || !hidden) return;

      trigger.textContent = placeholder;

      function updateState() {
        const selected = [];
        const labels = [];

        checkboxes.forEach(cb => {
          if (cb.checked) {
            selected.push(cb.value);
            const labelEl = cb.closest('.ms__option')?.querySelector('span');
            labels.push(labelEl ? labelEl.textContent.trim() : cb.value);
          }
        });

        hidden.value = selected.join(',');

        if (!selected.length) {
          trigger.textContent = placeholder;
        } else if (selected.length === 1) {
          trigger.textContent = labels[0];
        } else {
          trigger.textContent = `Выбрано: ${selected.length}`;
        }
      }

      trigger.addEventListener('click', e => {
        e.stopPropagation();
        const willOpen = !widget.classList.contains('is-open');
        closeAll();
        if (willOpen) widget.classList.add('is-open');
      });

      checkboxes.forEach(cb => {
        cb.addEventListener('change', updateState);
      });

      document.addEventListener('click', () => {
        widget.classList.remove('is-open');
      });

      updateState();
    });
  }

  document.addEventListener('DOMContentLoaded', initMultiSelects);
