// barra de navegacion para el celular  

$('.btn-menu').click(function(){
  $("#opacity-mobile").addClass("show-opacity");
  $(".sidenav").addClass("open-menu");
  $('body').css('overflow', 'hidden');
});


$('.closebtn-overlay').click(function(){
  $("#opacity-mobile").removeClass("show-opacity");
  $(".sidenav").removeClass("open-menu");
  $('body').css('overflow', 'auto');
});





// search mobile
$('#jumpstore-search-btn').click(function(){
  $(".jumpstore-search-mobile").addClass("open");
});
$('.closebtn').click(function(){
  $(".jumpstore-search-mobile").removeClass("open");
});

// acordion del footer
let acc = document.getElementsByClassName("jumpstore-arrow");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}


// button to scroll up according its height (lo q dice pero en español jeje)

let btn = $('.button-scroll');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

let urlArraySelected = window.location.pathname.split("/");
// console.log(urlArraySelected)
let links = document.querySelectorAll(".row ul li a")
let linksMobile = document.querySelectorAll(".overlay-content .links li a")
// console.log(links)

if (urlArraySelected[1] == "") {
  links[0].classList.add("selected")
  linksMobile[0].classList.add("selected-mobile")
}
else if (urlArraySelected.length >= 2 && urlArraySelected.includes("sneakers")) {
  links[1].classList.add("selected")
  linksMobile[1].classList.add("selected-mobile")
}
else if (urlArraySelected.length == 2 && urlArraySelected.includes("carrito") ) {
  linksMobile[4].classList.add("selected-mobile")
}