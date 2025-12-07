// script.js — small interactions: hero blurfade, smooth scroll, year
document.addEventListener('DOMContentLoaded', function(){
  // Hero logo blurfade
  const heroLogo = document.getElementById('heroLogo');
  if(heroLogo){
    // wait a small moment then show
    setTimeout(()=> heroLogo.classList.add('show'), 350);
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

const partnersSwiper = new Swiper(".partners-swiper", {
  slidesPerView: 6,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },
  speed: 4000, // semakin besar, semakin lambat scroll
  freeMode: true,
  grabCursor: true,
  breakpoints: {
    320: { slidesPerView: 2 },
    576: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    992: { slidesPerView: 5 },
    1200: { slidesPerView: 6 },
  },
});

const portfolioSwiper = new Swiper(".portfolio-swiper", {
  slidesPerView: 1.4,         // ada "peek"
  centeredSlides: true,       // slide tengah fokus
  spaceBetween: 30,           // jarak antar slide
  loop: true,
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
