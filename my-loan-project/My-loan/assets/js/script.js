// fixes header js
$(window).scroll(function() {
    if ($(window).scrollTop() >= 100) {
        $('header').addClass('fixed-header');
    } else {
        $('header').removeClass('fixed-header');
    }
});
// owl carousel slider
$(document).ready(function() {

    if ($('.brands_slider').length) {
        var brandsSlider = $('.brands_slider');

        brandsSlider.owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 2000,
            nav: false,
            dots: false,
            responsive: {
                0: {
                    items: 2,
                    margin: 10
                },
                600: {
                    items: 3,
                    margin: 20
                },
                1000: {
                    items: 4,
                    margin: 30
                },
                1300: {
                    items: 5,
                    margin: 30
                }
            }
        });

        if ($('.brands_prev').length) {
            var prev = $('.brands_prev');
            prev.on('click', function() {
                brandsSlider.trigger('prev.owl.carousel');
            });
        }

        if ($('.brands_next').length) {
            var next = $('.brands_next');
            next.on('click', function() {
                brandsSlider.trigger('next.owl.carousel');
            });
        }
    }


});
// --------------------- password Toggle Start
var clicked = 0;

$(".toggle-password").click(function(e) {
    e.preventDefault();

    $(this).toggleClass("toggle-password");
    if (clicked == 0) {
        $(this).html('<img src="assets/images/eyes-open.svg" alt="Eye Close">');
        clicked = 1;
    } else {
        $(this).html('<img src="assets/images/eyes-close.svg" alt="Eye Close">');
        clicked = 0;
    }

    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});