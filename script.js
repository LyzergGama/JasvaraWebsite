document.addEventListener("DOMContentLoaded", () => {

   const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // auto close saat klik menu
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
  
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
      'assets/package/23.webp',
      'assets/package/23.webp'
    ]
  };

  const pkgOverlay = document.getElementById("pkg-overlay");
  const pkgContent = document.getElementById("pkg-popup-content");

  const zoomOverlay = document.getElementById("pkg-zoom-overlay");
  const zoomImg = document.getElementById("pkg-zoom-img");

  const isMobile = () => window.innerWidth <= 768;

  /* ===== OPEN PACKAGE ===== */
  document.querySelectorAll(".pkg-card[data-pkg]").forEach(card => {
    card.addEventListener("click", () => {
      const images = pkgData[card.dataset.pkg];
      if (!images) return;

      pkgContent.innerHTML = "";

      images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.className = "pkg-popup-img";

        img.addEventListener("click", () => {
          if (isMobile()) return; // MOBILE: ga pake zoom layer

          zoomImg.src = src;
          zoomOverlay.classList.add("active");
        });

        pkgContent.appendChild(img);
      });

      pkgOverlay.classList.add("active");
    });
  });

  /* ===== CLOSE PACKAGE ===== */
  pkgOverlay.addEventListener("click", e => {
    if (e.target === pkgOverlay) {
      pkgOverlay.classList.remove("active");
      pkgContent.innerHTML = "";
    }
  });

  /* ===== CLOSE ZOOM ===== */
  zoomOverlay.addEventListener("click", () => {
    zoomOverlay.classList.remove("active");
    zoomImg.src = "";
  });
  

const overlay = document.getElementById("portfolio-overlay");
const box = document.querySelector(".portfolio-box");
const carouselInner = document.getElementById("carousel-inner");
const modelImg = document.getElementById("model-img");
const closeBtn = document.querySelector(".portfolio-close");

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
    images: ["1.jpg","2.jpg","3.jpg"]
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
    carouselInner.innerHTML = "";

    const perSlide = type === "smm" ? 3 : 1;
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

/* CLOSE */
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
