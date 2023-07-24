
const form = document.getElementById("form");
const name1=document.getElementById("name1");
const username=document.getElementById("username");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber")
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

console.log(name1);
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "input-box error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

function success(input){
    formControl=input.parentElement;
    formControl.className="input-box success";
    const small = formControl.querySelector("small");
    small.innerText = "";
}


document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting
validationInput()



    const validationInput = () => {
        const nameValue=name1.value.trim();
        const UsernameValue=username.value.trim();
        const emailValue = email.value.trim();
        const phoneNumberValue = phoneNumber.value.trim();
        const passwordValue = password.value.trim();
        const confirmPasswordValue = confirmPassword.value.trim();
    
        const emailRegex=new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
         
       
       
        if(nameValue===""){
            showError(name1, "name is required");
            
        }else{
            success(name1);
           
        }
    
        if (emailValue === "") {
            showError(email, "Email is required");
            
        }else if(!emailValue.match(emailRegex)){
            showError(email,"Invalid Email address");
            
        }else{
            success(email);
        }
        if(phoneNumberValue===""){
            showError(phoneNumber, 'phone Number is Required')
            
         
        }else if(phoneNumberValue.length!==10){
            
            showError(phoneNumber,"Invalid Number")
            
        }else{
            success(phoneNumber);
        }
        if(UsernameValue===""){
            showError(username,"Please enter your username")
            
        }else{
            success(username);
        }
    
        if (passwordValue === "") {
            showError(password, "Password is required");
            
          } else if (!passRegex.test(passwordValue)) {
            showError(password, "Minimum eight characters, at least one uppercase letter, one lowercase letter, and one number");
            
        } else {
            success(password);
          }
    
        if(confirmPasswordValue===""){
            showError(confirmPassword, "Password is required");
            
        }else if(passwordValue!==confirmPasswordValue){
            showError(confirmPassword, "Password & confirm password must me same");
            
        }else{
            success(confirmPassword);
        }
    
        var radios = document.getElementsByName("gender");
        var formValid = false;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
              formValid = true;
              break;
            }
          }
        
          if (!formValid) {
            
            const genderError=document.getElementById("errorGender");
            genderError.innerText="Select any one of gender";
            
            
          }else{
            const genderError=document.getElementById("errorGender");
            genderError.innerText="";
          }
    
          
    
    }
    





    const formData = new FormData(document.getElementById("userForm"));
    fetch("/api/users", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server, e.g., show a success message, redirect, etc.
        console.log(data);
        window.location.href = "/"; // Redirect to a success page, for example.
    })
    .catch(error => {
        // Handle any errors that occur during form submission
        console.error(error);
        alert("An error occurred while creating the user.");
    });
});