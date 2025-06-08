// fixed header js
$(window).scroll(function () {
  if ($(window).scrollTop() >= 5) {
    $(".header").addClass("fixed-header");
  } else {
    $(".header").removeClass("fixed-header");
  }
});

// hamburger js *********
const navSlide = () => {
  // Look for .hamburger
  var hamburger = document.querySelector(".hamburger");

  // On click
  hamburger.addEventListener("click", function () {
    // Toggle class "is-active"
    hamburger.classList.toggle("is-active");
    // Do something else, like open/close menu
  });
};
navSlide();

//end*********

/*************end *****************************/
// Get all the dropdown from document
document.querySelectorAll(".dropdown-toggle").forEach(dropDownFunc);

// Dropdown Open and Close function
function dropDownFunc(dropDown) {
  if (dropDown.classList.contains("hover-dropdown") === true) {
    dropDown.onmouseover = dropDown.onmouseout = dropdownHover;

    function dropdownHover(e) {
      if (e.type == "mouseover") {
        // Close the opend dropdowns
        closeDropdown();

        // add the open and active class(Opening the DropDown)
        this.parentElement.classList.add("dropdown-open");
        this.nextElementSibling.classList.add("dropdown-active");
      }

      if (e.type == "mouseout") {
        // close the dropdown after user leave the list
        e.target.nextElementSibling.onmouseleave = closeDropdown;
      }
      // console.log(e);
    }
  }
}

// Close the openend Dropdowns
function closeDropdown() {
  console.log("run");

  // remove the open and active class from other opened Dropdown (Closing the opend DropDown)
  document
    .querySelectorAll(".dropdown-container")
    .forEach(function (container) {
      container.classList.remove("dropdown-open");
    });

  document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
    menu.classList.remove("dropdown-active");
  });
  document.querySelectorAll(".nav-item").forEach(function (contain) {
    contain.onmouseleave = closeDropdown;
  });
}

// close the dropdown on mouse out from the dropdown list
document.querySelectorAll(".dropdown-menu").forEach(function (dropDownList) {
  // close the dropdown after user leave the list
  dropDownList.onmouseleave = closeDropdown;
});

// custom year javascript

const date = new Date().getFullYear();
document.getElementById("custom_year").innerHTML = date;
