$(".hamburger").click(function() {
    $("body").toggleClass("bodyFix");
});
$(window).scroll(function() {
    if ($(window).scrollTop() >= 10) {
        $('.header').addClass('fixed-header');
    } else {
        $('.header').removeClass('fixed-header');
    }
});

const navSlide = () => {
    // Look for .hamburger
    var hamburger = document.querySelector(".hamburger");

    // On click
    hamburger.addEventListener("click", function() {
        // Toggle class "is-active"
        hamburger.classList.toggle("is-active");
        // Do something else, like open/close menu

    });
}
navSlide();
// count js 
/*
jQuery(document).ready(function($) {
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

});
*/

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoHeight: true,
    grabCursor: true,
    speed: 800,
    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
// our service slider

var swiper = new Swiper(".secondSwiper", {
    spaceBetween: 30,
    grabCursor: true,
    // autoHeight: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {

        // when window width is >= 740px
        320: {
            autoHeight: true,
        },
        740: {

            spaceBetween: 30,
            slidesPerView: "auto",
            centeredSlides: true,
            autoHeight: false,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 3,

        },
        1300: {
            slidesPerView: 4,
        }
    }
});
// ------------ Slider Js End
// phone no. js
// -----Country Code Selection
$("#phone").intlTelInput({
    initialCountry: "in",
    separateDialCode: true,

});
//Typing Text

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

};

// ------------- pricing step js Start

jQuery(document).ready(function() {
    //listen to dropdown for change
    jQuery("#change_chart").change(function() {
        var current_tab = '#' + $(this).val();
        jQuery(current_tab).addClass('active');
        jQuery(current_tab).addClass('show');
        jQuery(current_tab).siblings().removeClass('active');
        jQuery(current_tab).siblings().removeClass('show');
    });

});

// range slider js start
"use strict";

function customSlider(slider, progress, thumb) {
    var maxVal = slider.getAttribute('max'); //val
    const val = (slider.value / maxVal) * 100 + "%";
    progress.style.width = val;
    thumb.style.left = val;
}

var range_slider = document.querySelectorAll(".range-slider");
for (let i = 0; i < range_slider.length; i++) {
    let slider = range_slider[i].querySelector(".slider");
    let thumb = range_slider[i].querySelector(".slider-thumb");
    let progress = range_slider[i].querySelector(".progress");
    console.log(slider);

    customSlider(slider, progress, thumb);
    slider.addEventListener("input", () => {
        customSlider(slider, progress, thumb);

    });

}

function sliderInputChange(event) {
    var Id = '#' + $(event).attr('name')
    var sliderInputVal = $(event).val()
    $(event).addClass('sunkdsnfks')
    $(Id + ' li').removeClass('active next-slide');
    $(Id + ' li.level-' + sliderInputVal).addClass('active');
    $(Id + ' li.active').next().addClass('next-slide');
}

//****************** Tab fixed js start*********************//
// Cache our vars for the fixed sidebar on scroll
var $sidebar = $('#myNavTab');
// Get & Store the original top of our #sidebar-nav so we can test against it
var sidebarTop = $sidebar.position().top - 100;
console.log(sidebarTop);
// Edit the `- 10` to control when it should disappear when the footer is hit.
var blogHeight = $('#tabContent').outerHeight() - (-280);

// Add the function below to the scroll event
$(window).scroll(fixSidebarOnScroll);

// On window scroll, this fn is called (binded above)
function fixSidebarOnScroll() {
    // Cache our scroll top position (our current scroll position)
    var windowScrollTop = $(window).scrollTop();

    // Add or remove our sticky class on these conditions
    if (windowScrollTop >= blogHeight || windowScrollTop <= sidebarTop) {
        // Remove when the scroll is greater than our #content.OuterHeight()
        // or when our sticky scroll is above the original position of the sidebar
        $sidebar.removeClass('tab-sticky');
    }
    // Scroll is past the original position of sidebar
    else if (windowScrollTop >= sidebarTop) {
        // Otherwise add the sticky if $sidebar doesnt have it already!
        if (!$sidebar.hasClass('tab-sticky')) {
            $sidebar.addClass('tab-sticky');
        }
    }
}


function videoAutoPlay(event) {
    debugger;
    let playId = $(event).attr('data-bs-target');
    // console.log(playId);
    // close function
    $(".btn-close").click(function() {
        if (($('.modal.opened').find('video').attr('autoplay') === 'autoplay')) {
            $(".modal.opened").find('video').get(0).pause();
            // Remove the specific class
            $('.modal').removeClass('opened');

        }
    });
    $('.modal').find('video').each(function() {
        $(this).get(0).pause();
    });
    $(playId).addClass('opened');
    // 
    if (($('.modal.opened').find('video').attr('autoplay') === 'autoplay')) {
        $('.modal.opened').find('video').get(0).play();

    } else {
        $('.modal').find('video').get(0).pause();
    }
}