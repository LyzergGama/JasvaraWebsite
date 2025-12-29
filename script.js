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

const popupOverlay = document.querySelector(".lk-popup-overlay");
const popupImg = popupOverlay.querySelector("img");
const section = document.querySelector("#lk-section");

/* OPEN POPUP */
document.querySelectorAll(".lk-card").forEach(card => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    const bg = section.dataset.bg;

    popupOverlay.style.backgroundImage = `url('${bg}')`;
    popupImg.src = img.src;

    popupOverlay.classList.add("active");
  });
});

/* CLOSE POPUP (CLICK OUTSIDE) */
popupOverlay.addEventListener("click", e => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove("active");
  }
});

/* CLOSE POPUP (ESC) */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    popupOverlay.classList.remove("active");
  }
});
/* ========= PACKAGE POPUP ========= */
const pkgData = {
  1: [
    { src: "assets/package/16.webp", title: "Paket Gen Z" },
    { src: "assets/package/17.webp", title: "Paket Gen Alpha" },
    { src: "assets/package/18.webp", title: "Paket Gen Beta" },
    { src: "assets/package/19.webp", title: "Paket Gen Sandwich" }
  ],
  2: [
    { src: "assets/package/21.webp", title: "Paket Gen Z" },
    { src: "assets/package/22.webp", title: "Paket Gen Alpha" },
    { src: "assets/package/23.webp", title: "Paket Gen Beta" },
    { src: "assets/package/24.webp", title: "Paket Gen Sandwich" }
  ]
};


/* ================= PACKAGE SECTION ================= */

// ELEMENTS
const pkgSection = document.getElementById("pkg-section");
const pkgOverlay = document.getElementById("pkg-overlay");
const pkgContent = document.getElementById("pkg-carousel-inner");
const pkgClose = document.getElementById("pkg-popup-close");

const pkgZoomOverlay = document.getElementById("pkg-zoom-overlay");
const pkgZoomImg = document.getElementById("pkg-zoom-img");

const isMobile = () => window.innerWidth <= 768;

// UTILITY
function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// OPEN PACKAGE POPUP
document.querySelectorAll(".pkg-card[data-pkg]").forEach(card => {
  card.addEventListener("click", () => {
    const data = pkgData[card.dataset.pkg];
    if (!data) return;

    pkgContent.innerHTML = "";

    const perSlide = isMobile() ? 1 : 4;
    const slides = chunk(data, perSlide);

    slides.forEach((group, index) => {
      const slide = document.createElement("div");
      slide.className = `carousel-item ${index === 0 ? "active" : ""}`;

      const itemsHTML = group.map(item => `
        <div class="pkg-popup-item" style="width:${100 / perSlide}%">
          <img src="${item.src}" class="pkg-popup-img" />
          <div class="pkg-popup-text">${item.title}</div>
        </div>
      `).join("");

      slide.innerHTML = `<div class="slide-group">${itemsHTML}</div>`;
      pkgContent.appendChild(slide);
    });

    pkgOverlay.classList.add("active");

    // DESKTOP ZOOM (SECOND ZOOM)
    document.querySelectorAll(".pkg-popup-img").forEach(img => {
      img.addEventListener("click", () => {
        if (isMobile()) return;
        pkgZoomImg.src = img.src;
        pkgZoomOverlay.classList.add("active");
      });
    });
  });
});

// CLOSE MAIN POPUP
pkgClose.addEventListener("click", () => {
  pkgOverlay.classList.remove("active");
  pkgContent.innerHTML = "";
});

// CLICK OUTSIDE POPUP
pkgOverlay.addEventListener("click", e => {
  if (e.target === pkgOverlay) {
    pkgOverlay.classList.remove("active");
    pkgContent.innerHTML = "";
  }
});

// CLOSE ZOOM
pkgZoomOverlay.addEventListener("click", () => {
  pkgZoomOverlay.classList.remove("active");
  pkgZoomImg.src = "";
});



const overlay = document.getElementById("portfolio-overlay");
const box = document.querySelector(".portfolio-box");
const modelImg = document.getElementById("model-img");
const closeBtn = document.querySelector(".portfolio-close");

const carouselInnerSMM = document.getElementById("carousel-inner-smm");
const carouselInnerTSP = document.getElementById("carousel-inner-tsp");

const data = {
  smm: {
    model: "assets/model/POP UP ORANG SMM.png",
    path: "assets/portofolio/SMM/",
    images: [
      "1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg",
      "7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg",
      "13.jpg","14.jpg","15.jpg","16.jpg","17.jpg"
    ]
  },
  tsp: {
    model: "assets/model/POP UP ORANG TSP.png",
    path: "assets/portofolio/TSP/",
    images: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg"]
  }
};

function chunk(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

document.querySelectorAll(".porto-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    const d = data[type];

    box.className = "portfolio-box " + type;
    modelImg.src = d.model;

    document.querySelectorAll(".portfolio-carousel")
      .forEach(c => c.classList.remove("active"));

    const carousel = document.querySelector(`.${type}-carousel`);
    carousel.classList.add("active");

    const inner = type === "smm" ? carouselInnerSMM : carouselInnerTSP;
    inner.innerHTML = "";

    const isMobile = window.innerWidth <= 768;
    const perSlide = isMobile ? 1 : (type === "smm" ? 3 : 1);

    chunk(d.images, perSlide).forEach((group,i)=>{
      const slide = document.createElement("div");
      slide.className = `carousel-item ${i===0?"active":""}`;
      slide.innerHTML = `
        <div class="slide-group">
          ${group.map(img=>`
            <img class="portfolio-slide-img" src="${d.path+img}">
          `).join("")}
        </div>
      `;
      inner.appendChild(slide);
    });

    overlay.classList.add("active");
  });
});

closeBtn.onclick = () => overlay.classList.remove("active");
document.addEventListener("keydown", e=>{
  if(e.key==="Escape") overlay.classList.remove("active");
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
