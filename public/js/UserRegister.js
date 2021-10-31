window.addEventListener("load", () => {
    let prevURL = document.referrer.split("/");
    
    let name = document.querySelector("#username");
    let form = document.querySelector("form");
    let divUsername = document.querySelector(".field.username");
    
    terminosCB = document.querySelector("#terminos");

    if (!prevURL.includes("register")) {
        terminosCB.checked = false
    }
    

    let card = document.createElement("p");

    name.addEventListener("change", (e) => {
        if(name.value == ""){
            card.innerHTML += "no es asi";
            divUsername.appendChild(card);
        }else{
            divUsername.removeChild(card);
        }
    })
});