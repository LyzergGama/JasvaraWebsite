document.addEventListener("DOMContentLoaded", () => {

  const App = {};

  /* ================= MOBILE NAV ================= */
  App.mobileNav = (() => {
    const hamburger = document.getElementById("mobileHamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    const dropdownToggle = document.querySelector(".mobile-dropdown-toggle");

    function init() {
      if (!hamburger || !mobileMenu) return;

      hamburger.onclick = () => mobileMenu.classList.toggle("active");
      if (dropdownToggle) {
        dropdownToggle.onclick = () =>
          dropdownToggle.parentElement.classList.toggle("active");
      }
    }

    return { init };
  })();


  /* ================= LK POPUP ================= */
  App.lkPopup = (() => {
    const overlay = document.querySelector(".lk-popup-overlay");
    const imgEl = overlay?.querySelector("img");
    const section = document.querySelector("#lk-section");

    function init() {
      if (!overlay || !imgEl || !section) return;

      document.querySelectorAll(".lk-card").forEach(card => {
        card.onclick = () => {
          const img = card.querySelector("img");
          overlay.style.backgroundImage = `url('${section.dataset.bg}')`;
          imgEl.src = img.src;
          overlay.classList.add("active");
        };
      });

      overlay.onclick = e => {
        if (e.target === overlay) overlay.classList.remove("active");
      };

      document.addEventListener("keydown", e => {
        if (e.key === "Escape") overlay.classList.remove("active");
      });
    }

    return { init };
  })();


  /* ================= PACKAGE POPUP ================= */
  App.packagePopup = (() => {
    const data = {
      1: [
        { src: "assets/package/16.webp", title: "Paket Gen Z" },
        { src: "assets/package/17.webp", title: "Paket Gen Alpha" },
        { src: "assets/package/18.webp", title: "Paket Gen Beta" },
        { src: "assets/package/19.webp", title: "Paket Gen Sandwich" }
      ],
      2: [
        { src: "assets/package/21.jpg", title: "Paket Gen Z" },
        { src: "assets/package/22.jpg", title: "Paket Gen Alpha" },
        { src: "assets/package/23.jpg", title: "Paket Gen Beta" },
        { src: "assets/package/24.jpg", title: "Paket Gen Sandwich" }
      ]
    };

    const section = document.getElementById("pkg-section");
    const overlay = document.getElementById("pkg-overlay");
    const inner = document.getElementById("pkg-carousel-inner");
    const closeBtn = document.getElementById("pkg-popup-close");

    const zoomOverlay = document.getElementById("pkg-zoom-overlay");
    const zoomImg = document.getElementById("pkg-zoom-img");

    const isMobile = () => window.innerWidth <= 768;

    function chunk(arr, size) {
      const out = [];
      for (let i = 0; i < arr.length; i += size)
        out.push(arr.slice(i, i + size));
      return out;
    }

    function init() {
      if (!section || !overlay || !inner) return;

      document.querySelectorAll(".pkg-card[data-pkg]").forEach(card => {
        card.onclick = () => {
          const items = data[card.dataset.pkg];
          if (!items) return;

          inner.innerHTML = "";
          const perSlide = isMobile() ? 1 : 4;

          chunk(items, perSlide).forEach((group, i) => {
            const slide = document.createElement("div");
            slide.className = `carousel-item ${i === 0 ? "active" : ""}`;
            slide.innerHTML = `
              <div class="slide-group">
                ${group.map(it => `
                  <div class="pkg-popup-item" style="width:${100/perSlide}%">
                    <img src="${it.src}" class="pkg-popup-img">
                    <div class="pkg-popup-text">${it.title}</div>
                  </div>`).join("")}
              </div>`;
            inner.appendChild(slide);
          });

          overlay.classList.add("active");

          document.querySelectorAll(".pkg-popup-img").forEach(img => {
            img.onclick = () => {
              if (isMobile()) return;
              zoomImg.src = img.src;
              zoomOverlay.classList.add("active");
            };
          });
        };
      });

      closeBtn.onclick = () => {
        overlay.classList.remove("active");
        inner.innerHTML = "";
      };

      overlay.onclick = e => {
        if (e.target === overlay) closeBtn.onclick();
      };

      zoomOverlay.onclick = () => zoomOverlay.classList.remove("active");
    }

    return { init };
  })();

/* ===============================
   PORTFOLIO DATA (HARDCODED)
================================ */
const data = {
  smm: {
    model: "assets/model/POP UP ORANG SMM.png",
    images: [
      { src: "assets/portofolio/SMM/1.jpg",  name: "Brand 1"  },
      { src: "assets/portofolio/SMM/2.jpg",  name: "Brand 2"  },
      { src: "assets/portofolio/SMM/3.jpg",  name: "Brand 3"  },
      { src: "assets/portofolio/SMM/4.jpg",  name: "Brand 4"  },
      { src: "assets/portofolio/SMM/5.jpg",  name: "Brand 5"  },
      { src: "assets/portofolio/SMM/6.jpg",  name: "Brand 6"  },
      { src: "assets/portofolio/SMM/7.jpg",  name: "Brand 7"  },
      { src: "assets/portofolio/SMM/8.jpg",  name: "Brand 8"  },
      { src: "assets/portofolio/SMM/9.jpg",  name: "Brand 9"  },
      { src: "assets/portofolio/SMM/10.jpg", name: "Brand 10" },
      { src: "assets/portofolio/SMM/11.jpg", name: "Brand 11" },
      { src: "assets/portofolio/SMM/12.jpg", name: "Brand 12" },
      { src: "assets/portofolio/SMM/13.jpg", name: "Brand 13" },
      { src: "assets/portofolio/SMM/14.jpg", name: "Brand 14" },
      { src: "assets/portofolio/SMM/15.jpg", name: "Brand 15" },
      { src: "assets/portofolio/SMM/16.jpg", name: "Brand 16" }
    ]
  },

  tsp: {
    model: "assets/model/POP UP ORANG TSP.png",
    images: [
      { src: "assets/portofolio/TSP/1.jpg", name: "Brand A" },
      { src: "assets/portofolio/TSP/2.jpg", name: "Brand B" },
      { src: "assets/portofolio/TSP/3.jpg", name: "Brand C" },
      { src: "assets/portofolio/TSP/4.jpg", name: "Brand D" },
      { src: "assets/portofolio/TSP/5.jpg", name: "Brand E" },
      { src: "assets/portofolio/TSP/6.jpg", name: "Brand F" },
      { src: "assets/portofolio/TSP/7.jpg", name: "Brand G" },
      { src: "assets/portofolio/TSP/8.jpg", name: "Brand H" }
    ]
  }
};


/* ===============================
   PORTFOLIO OVERLAY CAROUSEL
   STABLE PNP VERSION
================================ */

const overlay  = document.getElementById("portfolio-overlay");
const track    = overlay.querySelector(".slider-track");
const modelImg = overlay.querySelector(".portfolio-model img");
const header   = overlay.querySelector(".portfolio-header");
const closeBtn = overlay.querySelector(".portfolio-close");

let currentData = null;

let scrollX   = 0;
let velocity  = 0;
let dragging  = false;

let startX = 0;
let lastX  = 0;
let lastTime = 0;

const AUTO_SPEED = 0.35;   // base auto scroll
const FRICTION   = 0.88;   // inertia decay

/* ===============================
   PREVENT NATIVE DRAG
================================ */
track.addEventListener("dragstart", e => e.preventDefault());
track.addEventListener("mousedown", e => e.preventDefault());

/* ===============================
   OPEN
================================ */
document.querySelectorAll(".porto-btn").forEach(btn => {
  btn.addEventListener("click", () => openPortfolio(btn.dataset.type));
});

function openPortfolio(type){
  currentData = data[type];
  if (!currentData) return;

  overlay.classList.add("active", type);
  modelImg.src = currentData.model;
  header.textContent = type === "smm" ? "PORTFOLIO SMM" : "PORTFOLIO TSP";

  buildItems();
  scrollX  = track.scrollWidth / 4;
  velocity = 0;
}

/* ===============================
   CLOSE
================================ */
closeBtn?.addEventListener("click", () => {
  overlay.classList.remove("active", "smm", "tsp");
  dragging = false;
  velocity = 0;
});

/* ===============================
   BUILD
================================ */
function buildItems(){
  track.innerHTML = "";

  currentData.images.forEach(item => {
    const card = document.createElement("div");
    card.className = "portfolio-card";
    card.innerHTML = `
      <div class="portfolio-image">
        <img src="${item.src}" draggable="false">
      </div>
      <div class="portfolio-brand">${item.name}</div>
    `;
    track.appendChild(card);
  });

  /* duplicate for infinite loop */
  track.innerHTML += track.innerHTML;
}

/* ===============================
   DRAG
================================ */
track.addEventListener("mousedown", e => {
  dragging = true;
  startX   = e.pageX;
  lastX   = scrollX;
  lastTime = performance.now();
  velocity = 0;
});

window.addEventListener("mouseup", () => {
  dragging = false;
});

window.addEventListener("mousemove", e => {
  if (!dragging) return;

  const dx = e.movementX;

  scrollX -= dx;
  velocity = dx * -0.8;
});

/* ===============================
   LOOP
================================ */
function animate(){
  if (!dragging) {
    velocity *= FRICTION;

    if (Math.abs(velocity) < 0.02) velocity = 0;

    scrollX += velocity + AUTO_SPEED;
  }

  const limit = track.scrollWidth / 2;

  if (scrollX >= limit) scrollX -= limit;
  if (scrollX < 0)      scrollX += limit;

  track.style.transform = `translateX(${-scrollX}px)`;
  requestAnimationFrame(animate);
}

animate();
/* ================= SWIPER ================= */
App.swiper = (() => {
  let swiperInstance = null;

  function init() {
    if (typeof Swiper === "undefined") return;

      swiperInstance = new Swiper('.partners-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 24,
        loop: true,

        speed: 6000, // kecepatan jalan
        freeMode: true, // ⬅️ PENTING
        freeModeMomentum: false, // biar smooth terus

        autoplay: {
          delay: 0,
          disableOnInteraction: false, // ⬅️ autoplay LANJUT
        },

        allowTouchMove: true, // ⬅️ USER BISA GESER
        grabCursor: true,
      });

  }

  return { init };
})();


/* ================= INIT ALL ================= */
Object.values(App).forEach(m => m.init && m.init());

});
