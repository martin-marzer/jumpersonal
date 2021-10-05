
//esto es para el selected cuando se selecciona te lleva a ese link, 
// lo sacas (eso esta en el ejs seleccionado según su link) y te lleva al products (default) 
document.getElementById('sort-order').onchange = function() {
  let urlArray = window.location.pathname.split("/");
  if (this.options[this.selectedIndex].value != "") {
    console.log(urlArray)
    if (urlArray.length > 3) {
        window.location.href= '/sneakers/' + this.options[this.selectedIndex].value + "/"  + urlArray[3]
    }
    else{
      window.location.href= '/sneakers/' + this.options[this.selectedIndex].value
    }
  } else {
    window.location.href= '/sneakers' ;
  }
};


// let nose = window.location.pathname
let nose = window.location.pathname.split("/").pop();

// // console.log(nose)


let urlArray = window.location.pathname.split("/");


// console.log(urlArray)


// dependiendo q dispositivo se corre x funcion
let width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

//esto es para mostrar en los dispositivos moviles el sidenav de los filtros
if (width <= 992 ) {
  $('.btn').click(function(){
    $(".sidenav-filter").addClass("open-filter");
    $('body').css('overflow', 'hidden');
  });
  $('.closebtn-filter').click(function(){
    $(".sidenav-filter").removeClass("open-filter");
    $('body').css('overflow', 'auto');
  });
  

}


// esto es la logica de lo q sucede con los filtros
if (width <= 768 ) {

  // ESTO ES PARA EL CELULARASDAS
//aCELUARRRRRRRRR function

let formPhone = document.getElementById("form-mobile") 

let buttonPhone = document.getElementById("button-form-mobile")
let resetButtonPhone = document.getElementById("button-form-reset-mobile")


const checkboxesPhone = document.querySelectorAll(".each-filter-mobile input[type='checkbox']");
let checkboxValuesPhone = [];


if (checkboxValuesPhone.length == 0 && urlArray.length == 3) {
  buttonPhone.disabled = true;
} else if (checkboxValuesPhone.length == 0 && urlArray.length > 3) {
  buttonPhone.disabled = false;
}





checkboxesPhone.forEach((box) => {
  if (box.checked == true) {
    checkboxValuesPhone.push(box.value)
    
  } else {
  const index = checkboxValuesPhone.indexOf(box.value);
      if (index > -1) {
        checkboxValuesPhone.splice(index, 1);
      }

      // form.action = window.location.href  
      // + "/" + checkboxValuesPhone.join("+")
  }
  box.addEventListener("change", () => hola());
  function hola() {

    if (box.checked == true) {
      checkboxValuesPhone.push(box.value)
      buttonPhone.disabled = false;
      

    } else {
      const index = checkboxValuesPhone.indexOf(box.value);
        if (index > -1) {
          checkboxValuesPhone.splice(index, 1);
        }

      // // console.log(checkboxValuesPhone);
    }
    // // console.log(checkboxValuesPhone);

    if (urlArray.length <= 3) {
      if (checkboxValuesPhone.length == 0 ) {
        buttonPhone.disabled = true;
        formPhone.action = window.location.href
      }
      else if (checkboxValuesPhone.length > 0 ) {
        formPhone.action = window.location.href + "/" + checkboxValuesPhone.join("+")
      }
    } 
    else if (urlArray.length == 4){
      if (checkboxValuesPhone.length == 0 ) {
        var hola = urlArray.slice(0, -1);
        buttonPhone.disabled = false;
        formPhone.action = window.location.protocol  +  hola.join("/")
      }
      else if (checkboxValuesPhone.length > 0 ) {
        // let withoutLast = urlArray.pop()
        urlArray[3] = checkboxValuesPhone.join("+")
        // console.log(urlArray[3]);
        formPhone.action = window.location.protocol  +  urlArray.join("/")
        // console.log(urlArray)
      }
    }

    
  }

  resetButtonPhone.onclick = () => {
    checkboxesPhone.forEach(box => box.checked = false)
    if (urlArray.length <= 3) {
      formPhone.action = window.location.protocol + urlArray.join("/")
    }
    else if (urlArray.length == 4) {
      formPhone.action = window.location.protocol + urlArray.slice(0,3).join("/")
    }
  }

});

} else if (width >= 769) {



  let form = document.getElementById("form-desk")  
// // console.log(form);

let button = document.getElementById("button-form")
let resetButton = document.getElementById("button-form-reset")
// // console.log(button);


const checkboxes = document.querySelectorAll(".each-filter input[type='checkbox']") 
let checkboxValues = [];


if (checkboxValues.length == 0 && urlArray.length == 3) {
  button.disabled = true;

} else if (checkboxValues.length == 0 && urlArray.length > 3) {
  button.disabled = false;
}



checkboxes.forEach((box) => {
  if (box.checked == true) {
    checkboxValues.push(box.value)
    
  } else {
  const index = checkboxValues.indexOf(box.value);
      if (index > -1) {
        checkboxValues.splice(index, 1);
      }

      // form.action = window.location.href  
      // + "/" + checkboxValues.join("+")
  }
  box.addEventListener("change", () => hola());
  function hola() {

    if (box.checked == true) {
      checkboxValues.push(box.value)
      button.disabled = false;
      

    } else {
      const index = checkboxValues.indexOf(box.value);
        if (index > -1) {
          checkboxValues.splice(index, 1);
        }

      // // console.log(checkboxValues);
    }
    // console.log(checkboxValues);

    if (urlArray.length <= 3) {
      if (checkboxValues.length == 0 ) {
        button.disabled = true;
        form.action = window.location.href

      }
      else if (checkboxValues.length > 0 ) {
        form.action = window.location.href + "/" + checkboxValues.join("+")
      }
    } 
    else if (urlArray.length == 4){
      // console.log(checkboxValues)
      if (checkboxValues.length == 0 ) {
        let hola = urlArray.slice(0, -1);
        button.disabled = false;
        form.action = window.location.protocol  +  hola.join("/")
      }
      else if (checkboxValues.length > 0 ) {
        // let withoutLast = urlArray.pop()
        urlArray[3] = checkboxValues.join("+")
        // // console.log(urlArray[3]);
        form.action = window.location.protocol  +  urlArray.join("/")
        // // console.log(urlArray)

      }
    }
  }
  resetButton.onclick = () => {
    checkboxes.forEach(box => box.checked = false)
    if (urlArray.length <= 3) {
      form.action = window.location.protocol + urlArray.join("/")
    }
    else if (urlArray.length == 4) {
      form.action = window.location.protocol + urlArray.slice(0,3).join("/")
    }
  }
});
}






