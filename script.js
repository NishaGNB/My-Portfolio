document.addEventListener('DOMContentLoaded', function(){
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(menuToggle){
    menuToggle.addEventListener('click', ()=>{
      navLinks.classList.toggle('open');
    });
  }

  // Theme toggle (persisted)
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  function setTheme(dark){
    if(dark){
      document.documentElement.classList.add('dark');
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme','dark');
    } else {
      document.documentElement.classList.remove('dark');
      themeToggle.textContent = '🌙';
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
      showToast('Thanks — your message was sent');
      form.reset();
    });
  }

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
