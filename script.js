document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if (!navLinks) return;
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) navLinks.querySelector('a')?.focus();
    });
    document.addEventListener('click', (e) => {
      if (!navLinks) return;
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Theme toggle (persisted)
  const themeToggle = document.getElementById('theme-toggle');
  function setTheme(dark) {
    if (dark) {
      document.documentElement.classList.add('dark');
      if (themeToggle) themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      if (themeToggle) themeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }
  const saved = localStorage.getItem('theme');
  setTheme(saved === 'dark');
  if (themeToggle) themeToggle.addEventListener('click', () => setTheme(!document.documentElement.classList.contains('dark')));

  // Form handling (client-side validation + toast)
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]');
      if (email && !email.checkValidity()) {
        showToast('Please enter a valid email address');
        email.focus();
        return;
      }
      showToast('Thanks — your message was sent');
      form.reset();
    });
  }

  // Project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card[data-tags]');
  function applyFilter(filter) {
    cards.forEach((c) => {
      const tags = c.getAttribute('data-tags') || '';
      if (filter === 'all' || tags.split(',').map((t) => t.trim()).includes(filter)) c.style.display = '';
      else c.style.display = 'none';
    });
  }
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  // Modal with focus management
  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.innerHTML = '<div class="modal-card" role="dialog" aria-modal="true" tabindex="-1"><button class="modal-close" aria-label="Close">✕</button><h3 class="modal-title"></h3><p class="modal-desc muted"></p><p class="modal-links"></p></div>';
  document.body.appendChild(modal);
  const modalCard = modal.querySelector('.modal-card');
  const modalTitle = modal.querySelector('.modal-title');
  const modalDesc = modal.querySelector('.modal-desc');
  const modalLinks = modal.querySelector('.modal-links');
  const modalClose = modal.querySelector('.modal-close');
  let lastFocused = null;

  function trapFocus(e) {
    if (!modal.classList.contains('open')) return;
    const focusable = modal.querySelectorAll('a, button, textarea, input, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openModalFromCard(card) {
    lastFocused = document.activeElement;
    const title = card.getAttribute('data-title') || card.querySelector('h3')?.textContent || '';
    const desc = card.getAttribute('data-desc') || card.querySelector('p')?.textContent || '';
    const link = card.querySelector('a.link')?.href || null;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalLinks.innerHTML = link ? ('<a class="link" href="' + link + '" target="_blank" rel="noopener noreferrer">Open project →</a>') : '';
    modal.classList.add('open');
    modalCard.focus();
    document.addEventListener('keydown', trapFocus);
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => openModalFromCard(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openModalFromCard(card);
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.removeEventListener('keydown', trapFocus);
    if (lastFocused) lastFocused.focus();
  }

  modalClose.addEventListener('click', () => closeModal());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Escape to close menu or modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
      if (modal.classList.contains('open')) closeModal();
    }
  });

  // Toast
  function showToast(text) {
    const t = document.createElement('div');
    t.className = 'site-toast';
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('hide'), 2200);
    setTimeout(() => t.remove(), 3000);
  }

  // Smooth in-page scrolling
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
document.addEventListener('DOMContentLoaded', function(){
  // Mobile menu toggle
  document.addEventListener('DOMContentLoaded', function(){
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if(menuToggle){
      menuToggle.addEventListener('click', ()=>{
        if(!navLinks) return;
        const open = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if(open){
          const firstLink = navLinks.querySelector('a');
          firstLink?.focus();
        }
      });
      document.addEventListener('click', (e)=>{
        if(!navLinks) return;
        if(navLinks.classList.contains('open') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)){
          navLinks.classList.remove('open');
          menuToggle.setAttribute('aria-expanded','false');
        }
      });
    }

    // Theme toggle (persisted)
    const themeToggle = document.getElementById('theme-toggle');
    function setTheme(dark){
      if(dark){
        document.documentElement.classList.add('dark');
        if(themeToggle) themeToggle.textContent = '☀️';
        localStorage.setItem('theme','dark');
      } else {
        document.documentElement.classList.remove('dark');
        if(themeToggle) themeToggle.textContent = '🌙';
        localStorage.setItem('theme','light');
      }
    }
    const saved = localStorage.getItem('theme');
    setTheme(saved === 'dark');
    if(themeToggle){
      themeToggle.addEventListener('click', ()=>{
        setTheme(!document.documentElement.classList.contains('dark'));
      });
    }

    // Form handling (shows a small toast)
    const form = document.querySelector('form');
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        const email = form.querySelector('input[type="email"]');
        if(email && !email.checkValidity()){
          showToast('Please enter a valid email address');
          email.focus();
          return;
        }
        showToast('Thanks — your message was sent');
        form.reset();
      });
    }

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card[data-tags]');
    function applyFilter(filter){
      cards.forEach(c=>{
        const tags = c.getAttribute('data-tags') || '';
        if(filter === 'all' || tags.split(',').map(t=>t.trim()).includes(filter)){
          c.style.display = '';
        } else {
          c.style.display = 'none';
        }
      });
    }
    filterBtns.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        filterBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.getAttribute('data-filter'));
      });
    });

    // Modal markup with focus management
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = '<div class="modal-card" role="dialog" aria-modal="true" tabindex="-1"><button class="modal-close" aria-label="Close">✕</button><h3 class="modal-title"></h3><p class="modal-desc muted"></p><p class="modal-links"></p></div>';
    document.body.appendChild(modal);
    const modalCard = modal.querySelector('.modal-card');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDesc = modal.querySelector('.modal-desc');
    const modalLinks = modal.querySelector('.modal-links');
    const modalClose = modal.querySelector('.modal-close');
    let lastFocused = null;

    function trapFocus(e){
      if(!modal.classList.contains('open')) return;
      const focusable = modal.querySelectorAll('a, button, textarea, input, [tabindex]:not([tabindex="-1"])');
      if(focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length -1];
      if(e.key === 'Tab'){
        if(e.shiftKey && document.activeElement === first){
          e.preventDefault(); last.focus();
        } else if(!e.shiftKey && document.activeElement === last){
          e.preventDefault(); first.focus();
        }
      }
    }

    function openModalFromCard(card){
      lastFocused = document.activeElement;
      const title = card.getAttribute('data-title') || card.querySelector('h3')?.textContent || '';
      const desc = card.getAttribute('data-desc') || card.querySelector('p')?.textContent || '';
      const link = card.querySelector('a.link')?.href || null;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalLinks.innerHTML = link ? ('<a class="link" href="'+link+'" target="_blank" rel="noopener noreferrer">Open project →</a>') : '';
      modal.classList.add('open');
      modalCard.focus();
      document.addEventListener('keydown', trapFocus);
    }

    cards.forEach(card=>{
      card.addEventListener('click', ()=>openModalFromCard(card));
      card.addEventListener('keydown', (e)=>{ if(e.key==='Enter') openModalFromCard(card); });
    });

    function closeModal(){
      modal.classList.remove('open');
      document.removeEventListener('keydown', trapFocus);
      if(lastFocused) lastFocused.focus();
    }

    modalClose.addEventListener('click', ()=>closeModal());
    modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

    // Close mobile menu and modal with Escape key
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){
        if(navLinks && navLinks.classList.contains('open')){
          navLinks.classList.remove('open');
          if(menuToggle) menuToggle.setAttribute('aria-expanded','false');
        }
        if(modal.classList.contains('open')){
          closeModal();
        }
      }
    });

    // Simple toast
    function showToast(text){
      const t = document.createElement('div');
      t.className = 'site-toast';
      t.textContent = text;
      document.body.appendChild(t);
      setTimeout(()=>{t.classList.add('hide');},2200);
      setTimeout(()=>t.remove(),3000);
    }

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(href && href.startsWith('#')){
          const el = document.querySelector(href);
          if(el){
            e.preventDefault();
            el.scrollIntoView({behavior:'smooth',block:'start'});
          }
        }
      });
    });

  });


        // Simple toast
        function showToast(text){
          const t = document.createElement('div');
          t.className = 'site-toast';
          t.textContent = text;
          document.body.appendChild(t);
          setTimeout(()=>{t.classList.add('hide');},2200);
          setTimeout(()=>t.remove(),3000);
        }

        // Smooth scroll for in-page anchors
        document.querySelectorAll('a[href^="#"]').forEach(a=>{
          a.addEventListener('click', function(e){
            const href = this.getAttribute('href');
            if(href && href.startsWith('#')){
              const el = document.querySelector(href);
              if(el){
                e.preventDefault();
                el.scrollIntoView({behavior:'smooth',block:'start'});
              }
            }
          });
        });

      });
