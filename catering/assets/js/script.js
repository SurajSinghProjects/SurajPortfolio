var swiper = new Swiper('.mySwiper', {
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    speed: 1500,
    autoplay: {
        autoplay: true,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },

});