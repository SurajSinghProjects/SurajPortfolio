// for fixed header js
window.addEventListener("scroll", handleScroll);
function handleScroll() {
  let headerId = document.getElementById("headerId");
  let pageHeight = window.scrollY;
  if (pageHeight > 20) {
    headerId.classList.add("fixedHeader");
  } else {
    headerId.classList.remove("fixedHeader");
  }
}

// AOS animation js
AOS.init({ disable: "mobile" });

// for copyright date
document.getElementById("date").innerHTML = new Date().getFullYear();

// swiper js
const swiper = new Swiper(".swiper", {
  grabCursor: true,
  autoHeight: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1299: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
