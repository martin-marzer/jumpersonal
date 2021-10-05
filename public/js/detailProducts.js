// Get the modal
let modal = document.getElementsByClassName("data");

// Get the button that opens the modal
let btnModal = document.getElementsByClassName("myBtn");


// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close");

console.log()
for (let i = 0; i < modal.length; i++) {
    if (modal[i].style.display = "block") {
      if (i == 0) {
        span[0].onclick = () => {
          modal[i].style.display = "none";
        }
      }
      else if (i == 1) {
        span[1].onclick = function() {
          modal[i].style.display = "none";
        }
      }
      else if (i == 2) {
        span[2].onclick = function() {
          modal[i].style.display = "none";
        }
      }
    
    }
  if ( modal[i].style.display = "none") {
    if (i == 0) {
      btnModal[0].onclick = function() {
        modal[i].style.display = "block";
      }
    }
    else if (i == 1) {
      btnModal[1].onclick = function() {
        modal[i].style.display = "block";
      }
    }
    else if (i == 2) {
      btnModal[2].onclick = function() {
        modal[i].style.display = "block";
      }
    }
  }

}
let link = document.getElementsByClassName("breadcrumbs-link")[1];
let prevLink = document.referrer
let prevLinkArray = prevLink.split("/")

if (prevLinkArray.length == 0) {
  link.href = "/sneakers/OrderByReleaseDateDESC"
}
else if (prevLinkArray.includes("sneakers")) {
  link.href = document.referrer
}
else {
  link.href = "/sneakers/OrderByReleaseDateDESC"
}

