window.addEventListener("load", () => {
    let prevURL = document.referrer.split("/");
    

    let form = document.querySelector("form");
    let divUsername = document.querySelector(".field.username");
    
    terminosCB = document.querySelector("#terminos");

    if (!prevURL.includes("register")) {
        terminosCB.checked = false
    }
    
    let name = document.querySelector("#username");
    let card = document.createElement("p");

    // name.addEventListener("change", (e) => {
    //     if(name.value == ""){
    //         card.innerHTML += "no es asi";
    //         divUsername.appendChild(card);
    //     }else{
    //         divUsername.removeChild(card);
    //     }
    // })
    const formulario = document.querySelector('form');
    const inputs = document.querySelectorAll('form input');
    
    const expresiones = {
        username: /^[a-zA-Z0-9\,\.\-\_\^\*\¡\¿\?\=\)\(\/\&\%\$\#\"\!]{4,16}$/, // Letras, numeros, guion y guion_bajo
        password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }


    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "username":
                validarCampo(expresiones.username, e.target, 'username');
            break;
            case "password":
                validarCampo(expresiones.password, e.target, 'password');
            break;
            case "email":
                validarCampo(expresiones.email, e.target, 'email');
            break;
        }
    }

    const validarCampo = (expresion, input, campo) => {
        let div = document.querySelector(`.field.${campo}`)
        let icon = document.createElement("i")
        div.appendChild(icon)
        if(expresion.test(input.value)){
            icon.classList.add("fas", "fa-exclamation-circle");

        } else {
            icon.classList.remove("fas", "fa-exclamation-circle");
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });


});