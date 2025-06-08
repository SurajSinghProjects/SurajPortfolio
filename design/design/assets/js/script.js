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

// scroll js

$('#arrowBtn').on('click', (e) => { gsap.to(window, { scrollTo: innerHeight, duration: 1.5, ease: 'power1.inOut' }); })


jQuery('.livicon-evo').addLiviconEvo({
    name: check.svg,
    style: lines,
    tryToSharpen: true
});