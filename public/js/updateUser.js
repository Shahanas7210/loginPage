// const { default: swal } = require("sweetalert");




const form = document.getElementById("form");

    function showError(input, message) {
      const formControl = input.parentElement;
      formControl.classList.remove("success");
      formControl.classList.add("error");
      const small = formControl.querySelector("small");
      small.innerText = message;
    }

    function showSuccess(input) {
      const formControl = input.parentElement;
      formControl.classList.remove("error");
      formControl.classList.add("success");
      const small = formControl.querySelector("small");
      small.innerText = "";
    }

    function validateEmail(email) {
      const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
      return emailRegex.test(email);
    }

    function validatePassword(password) {
      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return passRegex.test(password);
    }

    function validateForm() {
      const nameInput = document.getElementById("name1");
      const emailInput = document.getElementById("email");
      const phoneNumberInput = document.getElementById("phoneNumber");
      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");
      const confirmPasswordInput = document.getElementById("confirmPassword");
      const genderInputs = document.querySelectorAll('input[name="gender"]');

      let isValid = true;

      if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required");
        isValid = false;
      } else {
        showSuccess(nameInput);
      }

      if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, "Invalid Email address");
        isValid = false;
      } else {
        showSuccess(emailInput);
      }

      if (phoneNumberInput.value.trim().length !== 10) {
        showError(phoneNumberInput, "Invalid Number");
        isValid = false;
      } else {
        showSuccess(phoneNumberInput);
      }

      if (usernameInput.value.trim() === "") {
        showError(usernameInput, "Please enter your username");
        isValid = false;
      } else {
        showSuccess(usernameInput);
      }

      if (!validatePassword(passwordInput.value.trim())) {
        showError(passwordInput, "Minimum eight characters, at least one uppercase letter, one lowercase letter, and one number");
        isValid = false;
      } else {
        showSuccess(passwordInput);
      }

      if (confirmPasswordInput.value.trim() !== passwordInput.value.trim()) {
        showError(confirmPasswordInput, "Password & confirm password must be the same");
        isValid = false;
      } else {
        showSuccess(confirmPasswordInput);
      }

      let isGenderSelected = false;
      genderInputs.forEach((input) => {
        if (input.checked) {
          isGenderSelected = true;
        }
      });

      if (!isGenderSelected) {
        const genderError = document.getElementById("errorGender");
        genderError.innerText = "Select any one of the gender";
        isValid = false;
      } else {
        const genderError = document.getElementById("errorGender");
        genderError.innerText = "";
      }

      return isValid;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const isValid = validateForm();

      if (isValid) {
        var unindexed_array=$("form").serializeArray();
        var data={};
        $.map(unindexed_array,function(n,i){
            data[n["name"]]=n['value']
        })
        console.log(data.id);
        
        var request={
            "url": `http://localhost:3001/api/users/${data.id}`,

            
            "method":"put",
            "data":data
        }
        $.ajax(request).done(function(response){
          swal("Good job!", "You clicked the button!", "success").then((result) => {
            redirectToLogin()
        }).catch((err) => {
            console.log("Press ok");
        });
        })
      }
    });

    function redirectToLogin() {
      window.location.href = "/userDetails";
    }
    