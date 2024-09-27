// START OF COLLAPSIBLE CERTS JS
var coll = document.getElementsByClassName("collapsible");
for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
// END OF COLLAPSIBLE CERTS JS

// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

// Change style of navbar on scroll
window.onscroll = function() {
  var navbar = document.getElementById("myNavbar");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    navbar.className = "w3-bar w3-card w3-animate-top w3-white";
  } else {
    navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
  }
};

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// START OF TEXT SLIDESHOW CODE
let slideIndex = 0;
function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  if (slides.length === 0) return; // Exit if there are no slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 6000); // Change image every 6 seconds
}
showSlides();
// END OF TEXT SLIDESHOW CODE

// Cookie banner
document.addEventListener("DOMContentLoaded", function() {
  if (!localStorage.getItem("cookiesAccepted")) {
      document.getElementById("cookieConsent").style.display = "block";
  }

  document.getElementById("acceptCookies").onclick = function() {
      localStorage.setItem("cookiesAccepted", "true");
      document.getElementById("cookieConsent").style.display = "none";
  };

  document.getElementById("declineCookies").onclick = function() {
      window.location.href = "about.html#cookies-info";
  };
});
