// humburger css
$(document).ready(function () {
  $("#hamburger-icon").click(function () {
    $(this).toggleClass("open");
  });
});

//end

$(".frequently-ans").hide();
$(".frequently-ans:first").show();

$(".frequently-ques").click(function () {
  var activTab = $(this).attr("rel");
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $("#" + activTab).slideUp(300);
    console.log(activTab);
  } else {
    $(".frequently-ques").removeClass("active");
    $(this).addClass("active");
    $(".frequently-ans").slideUp(300);
    $("#" + activTab).slideDown(300);
  }
  console.log(activTab);
});

// portfolio-sec slider js
var swiper = new Swiper(".portfolio-swiper", {
  grabCursor: true,
  autoHeight: true,
  autoplay: true,
  loop: false,
  pagination: {
    el: ".portfolio-swiper .swiper-pagination",
  },
  breakpoints: {
    // when window width is >= 740px
    740: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  },
});

var swiper = new Swiper("#testimonials", {
  slidesPerView: 1,
  passiveListeners: false,
  margin: false,
  autoplay: true,
  autoHeight: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  },
});
