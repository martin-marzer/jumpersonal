window.addEventListener("load", () => {
   let form = document.getElementById("password")
let eyePsw = document.querySelector(".field.psw .eyePsw")
eyePsw.addEventListener("click", () => {
    if (eyePsw.className != "fas fa-eye-slash eyePsw") {
        eyePsw.className = "fas fa-eye-slash eyePsw"
        form.type = "text"
    }else {
        eyePsw.className = "fas fa-eye eyePsw"
        form.type = "password"
    }
});

let buttonToDelete = document.getElementById("delete-button")
buttonToDelete.onclick = () => {
    let inputs = document.querySelectorAll(".field input")
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        input.value = ""
        
    }
} 
})



