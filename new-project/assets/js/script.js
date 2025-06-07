$(window).scroll(function() {
    var sticky = $('.header'),
        scroll = $(window).scrollTop();
    if (scroll >= 100) sticky.addClass('fixed-header').css("transition", "all 0.5s ease-in-out");
    else sticky.removeClass('fixed-header').css("transition", "all 0.5s ease-in-out");
});

// window.onscroll = function() { scrollFunction() };

// function scrollFunction() {
//     if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//         document.getElementById("dynamic").style.padding = "12px 42px 12px 42px";
//         document.getElementsByClassName("dynamic").style.height = "50";
//     } else {
//         document.getElementById("dynamic").style.padding = "18px 42px 18px 42px";
//         document.getElementsByClassName("dynamic").style.height = "60";
//     }
// }
// humburger css
$('document').ready(function() {
    var trigger = $('#hamburger'),
        isClosed = true;

    trigger.click(function() {
        burgerTime();
    });

    function burgerTime() {
        if (isClosed == false) {
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = true;
        } else {
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = false;
        }
    }

});

//end

$(".frequently-ans").hide();
$(".frequently-ans:first").show();

$(".frequently-ques").click(function() {
    var activTab = $(this).attr("rel");
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $("#" + activTab).slideUp(300);

    } else {
        $(".frequently-ques").removeClass('active');
        $(this).addClass('active');
        $(".frequently-ans").slideUp(300);
        $("#" + activTab).slideDown(300);

    }
});

// case-studies-sec slider js
var swiper = new Swiper(".mySwiper", {
    grabCursor: true,
    loop: false,
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 1,
            spaceBetween: 10,

        },
        // when window width is >= 544px
        580: {
            slidesPerView: 1,
            spaceBetween: 10,

        },
        // when window width is >= 640px
        640: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // when window width is >= 740px
        740: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        1200: {
            slidesPerView: 1,
            slidesPerGroup: 1,

        }

    }
});

// testimonials-sec slider js
var swiper = new Swiper(".secondSlider", {
    grabCursor: true,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 1,
            spaceBetween: 10,

        },
        // when window width is >= 544px
        580: {
            slidesPerView: 1,
            spaceBetween: 10,

        },
        // when window width is >= 640px
        640: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // when window width is >= 740px
        740: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1200: {
            slidesPerView: 2,
            spaceBetween: 10,
            slidesPerGroup: 2

        }

    }
});