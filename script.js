// script.js — small interactions: hero blurfade, smooth scroll, year
document.addEventListener('DOMContentLoaded', function(){
  // Hero logo blurfade
  const heroLogo = document.getElementById('heroLogo');
  if(heroLogo){
    // wait a small moment then show
    setTimeout(()=> heroLogo.classList.add('visible'), 350);
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // collapse navbar on mobile if open
        const bsCollapse = document.querySelector('.navbar-collapse');
        if(bsCollapse && bsCollapse.classList.contains('show')){
          const btn = document.querySelector('.navbar-toggler');
          if(btn) btn.click();
        }
      }
    });
  });

  // Footer year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;
});

// Fade-in hero image on load
window.addEventListener("load", () => {
  const logo = document.getElementById("hero-logo");
  if (logo) logo.classList.add("show");
});
