//  frequently accordian css
// var acc = document.querySelectorAll(".frequently-ques");
// var i;

// for (i = 0; i < acc.length; i++) {
//     acc[i].addEventListener("click", function() {
//         this.classList.toggle("active");
//         var panel = this.nextElementSibling;
//         if (panel.style.display === "block" && !panel.classList.contains('active')) {
//             panel.style.display = "none";
//         } else {
//             panel.style.display = "block";
//             panel.style.transition = "all 0.9s ease-in-out 0.7s";
//         }
//     });
// }

$(".frequently-ans").hide();
$(".frequently-ans:first").show();

$(".frequently-ques").click(function() {
    var activTab = $(this).attr("rel");
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $("#" + activTab).slideUp(1000);

    } else {
        $(".frequently-ques").removeClass('active');
        $(this).addClass('active');
        $(".frequently-ans").slideUp(1000);
        $("#" + activTab).slideDown(1000);

    }
});

// $(".frequently-ans").hide();
// $(".frequently-ans:first").show();

// $(".frequently-ques").click(function() {
//     $(".frequently-ans").hide();
//     var activTab = $(this).attr("rel");
//     $(this).addClass("active");
//     if (this.classList.contains('active')) {
//         $(this).classList.addClass('active');
//         $("#" + activTab).slideDown(2000);
//     } else {
//         $(this).classList.removeClass('active');
//         $("#" + activTab).slideUp(2000);
//     }
// });

/******************************
    BOTTOM SCROLL TOP BUTTON
 ******************************/

// declare variable
var scrollTop = $(".nav-hide");

$(window).scroll(function() {
    // declare variable
    var topPos = $(this).scrollTop();

    // if user scrolls down - show scroll to top button
    if (topPos > 100) {
        $(scrollTop).css("opacity", "0");

    } else {
        $(scrollTop).css("opacity", "1");
    }

}); // scroll END

//Click event to scroll to top
$(scrollTop).click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 800);
    return false;

}); // click() scroll top EMD

// add active class selected list
let list = document.querySelectorAll(".list");
for (let i = 0; i < list.length; i++) {
    list[i].onclick = function() {
        let j = 0
        while (j < list.length) {
            list[j++].className = 'list';
        }
        list[i].className = 'list active';
    }
}

// toggle class
$(".title").hide();
let Mtoggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
var title = document.querySelector(".title");
Mtoggle.onclick = function() {
    Mtoggle.classList.toggle('active');
    navigation.classList.toggle('active');
    $(".title").slideToggle("slow");
}