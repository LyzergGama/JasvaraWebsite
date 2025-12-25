document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.getElementById("mobileHamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const dropdownToggle = document.querySelector(".mobile-dropdown-toggle");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }

  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", () => {
      dropdownToggle.parentElement.classList.toggle("active");
    });
  }

/* ========= LAYANAN KAMI ========= */
document.querySelectorAll(".lk-card").forEach(card => {
  card.addEventListener("click", () => {
    const popup = document.getElementById(card.dataset.popup);
    if (popup) popup.classList.add("active");
  });
});

document.querySelectorAll(".lk-popup-overlay").forEach(popup => {
  popup.addEventListener("click", e => {
    if (e.target === popup) popup.classList.remove("active");
  });
});

/* ========= PACKAGE POPUP ========= */
const pkgData = {
  1: [
    'assets/package/16.webp',
    'assets/package/17.webp',
    'assets/package/18.webp',
    'assets/package/19.webp'
  ],
  2: [
    'assets/package/20.webp',
    'assets/package/21.webp',
    'assets/package/22.webp',
    'assets/package/23.webp'
  ]
};

const pkgOverlay = document.getElementById("pkg-overlay");
const pkgContent = document.getElementById("pkg-carousel-inner");
const pkgClose = document.getElementById("pkg-popup-close");

const zoomOverlay = document.getElementById("pkg-zoom-overlay");
const zoomImg = document.getElementById("pkg-zoom-img");

const isMobile = () => window.innerWidth <= 768;

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i,i+size));
  return out;
}

document.querySelectorAll(".pkg-card[data-pkg]").forEach(card => {
  card.addEventListener("click", () => {
    const images = pkgData[card.dataset.pkg];
    if(!images) return;

    pkgContent.innerHTML = "";

    const perSlide = isMobile() ? 1 : 4;
    const slides = chunk(images, perSlide);

    slides.forEach((group, i) => {
      const div = document.createElement("div");
      div.className = `carousel-item ${i===0?"active":""}`;

      const groupHTML = group.map(src => 
        `<img src="${src}" class="pkg-popup-img" style="width:${100/perSlide}%">`
      ).join("");

      div.innerHTML = `<div class="slide-group">${groupHTML}</div>`;
      pkgContent.appendChild(div);
    });

    pkgOverlay.classList.add("active");

    // zoom for desktop only
    document.querySelectorAll(".pkg-popup-img").forEach(img => {
      img.addEventListener("click", () => {
        if(isMobile()) return;
        zoomImg.src = img.src;
        zoomOverlay.classList.add("active");
      });
    });
  });
});

pkgClose.addEventListener("click", () => {
  pkgOverlay.classList.remove("active");
  pkgContent.innerHTML = "";
});

pkgOverlay.addEventListener("click", e => {
  if(e.target===pkgOverlay){
    pkgOverlay.classList.remove("active");
    pkgContent.innerHTML="";
  }
});

zoomOverlay.addEventListener("click", () => {
  zoomOverlay.classList.remove("active");
  zoomImg.src = "";
});

  const overlay = document.getElementById("portfolio-overlay");
  const box = document.querySelector(".portfolio-box");
  const modelImg = document.getElementById("model-img");
  const closeBtn = document.querySelector(".portfolio-close");

  // carousel inner terpisah
  const carouselInnerSMM = document.getElementById("carousel-inner-smm");
  const carouselInnerTSP = document.getElementById("carousel-inner-tsp");

  const data = {
    smm: {
      model: "assets/model/POP UP ORANG SMM.png",
      path: "assets/portofolio/SMM/",
      images: [
        "1.jpg","2.jpg","3.jpg",
        "4.jpg","5.jpg","6.jpg",
        "7.jpg","8.jpg","9.jpg",
        "10.jpg","11.jpg","12.jpg",
        "13.jpg","14.jpg","15.jpg",
        "16.jpg","17.jpg"
      ]
    },
    tsp: {
      model: "assets/model/POP UP ORANG TSP.png",
      path: "assets/portofolio/TSP/",
      images: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg"]
    }
  };

  function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) {
      out.push(arr.slice(i, i + size));
    }
    return out;
  }

  document.querySelectorAll(".porto-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      const d = data[type];

      box.classList.remove("smm", "tsp");
      box.classList.add(type);

      modelImg.src = d.model;

      // hide semua carousel
      document.querySelectorAll(".portfolio-carousel").forEach(c => c.classList.remove("active"));

      // pilih carousel sesuai type
      const activeCarousel = type === "smm" ? document.querySelector(".smm-carousel") : document.querySelector(".tsp-carousel");
      activeCarousel.classList.add("active");

      // pilih inner carousel sesuai type
      const carouselInner = type === "smm" ? carouselInnerSMM : carouselInnerTSP;
      carouselInner.innerHTML = "";

      const isMobile = window.innerWidth <= 768;
      const perSlide = isMobile ? 1 : (type === "smm" ? 3 : 1);

      const slides = chunk(d.images, perSlide);

      slides.forEach((group, i) => {
        const slide = document.createElement("div");
        slide.className = `carousel-item ${i === 0 ? "active" : ""}`;
        slide.innerHTML = `
          <div class="slide-group">
            ${group.map(img => `<img src="${d.path + img}">`).join("")}
          </div>
        `;
        carouselInner.appendChild(slide);
      });

      overlay.classList.add("active");
    });
  });

  closeBtn.onclick = () => overlay.classList.remove("active");

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") overlay.classList.remove("active");
  });


const partnersSwiper = new Swiper('.partners-swiper', {
  slidesPerView: 'auto',        // penting buat smooth
  spaceBetween: 24,
  loop: true,

  speed: 6000,                  // makin besar = makin smooth
  autoplay: {
    delay: 1,                   // JANGAN 0
    disableOnInteraction: false,
  },

  allowTouchMove: false,
  grabCursor: false,

  freeMode: true,               // KUNCI UTAMA
  freeModeMomentum: false,      // biar stabil

  breakpoints: {
    0: {
      spaceBetween: 16,
    },
    768: {
      spaceBetween: 20,
    },
    1200: {
      spaceBetween: 24,
    }
  }
});




});
