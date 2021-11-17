window.addEventListener("load", () => {
  Array.prototype.forEach.call(
    document.querySelectorAll(".file-upload__button"),
    function (button) {
      const hiddenInput = button.parentElement.querySelector(
        ".file-upload__input"
      );
      const label = button.parentElement.querySelector(".file-upload__label");
      const defaultLabelText = "Ningun archivo seleccionado";

      // Set default text for label
      label.textContent = defaultLabelText;
      label.title = defaultLabelText;

      button.addEventListener("click", function () {
        hiddenInput.click();
      });

      hiddenInput.addEventListener("change", function () {
        const filenameList = Array.prototype.map.call(hiddenInput.files, function (
          file
        ) {
          return file.name;
        });

        label.textContent = filenameList.join(", ") || defaultLabelText;
        label.title = label.textContent;
      });
    }
  );

  let fechaValue = document.getElementById("fechaValue")
  if (fechaValue && fechaValue.valueAsDate == undefined) {
    let today = new Date();
    fechaValue.valueAsDate = today
  }

  let buttonToDelete = document.getElementById("delete-button")
  buttonToDelete.addEventListener("click", () => {
    let inputs = document.querySelectorAll("form input")
    let textA = document.querySelector("form textarea")
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      input.value = ""
    }
    textA.value = ""
  })

})




