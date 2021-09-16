let btn = document.querySelector("#btn");
let sliderbar = document.querySelector(".sliderbar");
let searchBtn = document.querySelector(".bx-search");

btn.onclick = function(){
    sliderbar.classList.toggle("active");
}
searchBtn.onclick = function(){
    sliderbar.classList.toggle("active");
}