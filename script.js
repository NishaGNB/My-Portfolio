document.addEventListener('DOMContentLoaded', function(){
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(menuToggle){
    menuToggle.addEventListener('click', ()=>{
      if(!navLinks) return;
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Theme toggle (persisted)
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
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

  // Close mobile menu with Escape key
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      if(navLinks && navLinks.classList.contains('open')){
        navLinks.classList.remove('open');
        if(menuToggle) menuToggle.setAttribute('aria-expanded','false');
      }
    }
  });

  // Project filtering and modal
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

  // Modal markup
  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.innerHTML = '<div class="modal-card" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Close">✕</button><h3 class="modal-title"></h3><p class="modal-desc muted"></p><p class="modal-links"></p></div>';
  document.body.appendChild(modal);
  const modalTitle = modal.querySelector('.modal-title');
  const modalDesc = modal.querySelector('.modal-desc');
  const modalLinks = modal.querySelector('.modal-links');
  const modalClose = modal.querySelector('.modal-close');

  function openModalFromCard(card){
    const title = card.getAttribute('data-title') || card.querySelector('h3')?.textContent || '';
    const desc = card.getAttribute('data-desc') || card.querySelector('p')?.textContent || '';
    const link = card.querySelector('a.link')?.href || null;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalLinks.innerHTML = link ? ('<a class="link" href="'+link+'" target="_blank" rel="noopener noreferrer">Open project →</a>') : '';
    modal.classList.add('open');
    modal.querySelector('.modal-card').focus();
  }

  cards.forEach(card=>{
    card.addEventListener('click', ()=>openModalFromCard(card));
    card.addEventListener('keydown', (e)=>{ if(e.key==='Enter') openModalFromCard(card); });
  });

  modalClose.addEventListener('click', ()=>modal.classList.remove('open'));
  modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.classList.remove('open'); });

  // (Resume upload UI removed)

  // Simple toast
  function showToast(text){
    const t = document.createElement('div');
    t.className = 'site-toast';
    t.textContent = text;
    Object.assign(t.style,{position:'fixed',right:'18px',bottom:'18px',padding:'12px 16px',background:'#0b1220',color:'#fff',borderRadius:'8px',boxShadow:'0 6px 18px rgba(2,6,23,0.4)',zIndex:9999});
    document.body.appendChild(t);
    setTimeout(()=>{t.style.opacity='0';t.style.transform='translateY(10px)';},2200);
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
