document.addEventListener("DOMContentLoaded", function() {

//listner for login form submit
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    submitLoginForm();
});

//to store object of active login user
function storeLoggedInUser(user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
}

//function to handle login submission
function submitLoginForm() {
    let emailInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

    var correct = document.getElementById("correctbar");
    var error = document.getElementById("errorbar");

    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();

    // Retrieve user data
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

   //to track login status
   let isLoggedIn = false;
   
   
   //check if email exist
   for(const user of storedUsers) {
    if(user.email===email && user.password===password) {
        isLoggedIn = true;
        break;
    }
   }

    let isValidUser = false; // to track if a valid user is found

    //validations
    for (const user of storedUsers) {
        if (email === user.email && password === user.password) {
            isValidUser = true;
            break; 
        } 
        else if (email !== user.email && password === user.password) {
            emailInput.classList.add("red-border");
            passwordInput.classList.remove("red-border");
        } 
        else if (password !== user.password && email === user.email) {
            passwordInput.classList.add("red-border");
            emailInput.classList.remove("red-border");
        }
        else if(email==="" && password===""){
            passwordInput.classList.add("red-border");
            emailInput.classList.add("red-border");
        }
    }
    
    
    if(isValidUser && isLoggedIn) {
        emailInput.classList.remove("red-border");
        passwordInput.classList.remove("red-border");

        correct.className = "show"

        setTimeout(function() {
            correct.className = correct.className.replace("show", "");

            // localStorage.setItem("username", email);   
            const loggedInUser = storedUsers.find((user) => user.email === email);
            storeLoggedInUser(loggedInUser);
            window.location.href = "home.html";
        }, 2000);
    } else{
        error.className = "show"
        setTimeout(function() {
            error.className = error.className.replace("show", "")
        }, 2000);
    }
}

//empty all fields when modal open
$('#forgot-password').on('show.bs.modal', function (e) {
    document.querySelector(".resetemail").value = "";
    document.querySelector(".newpassword").value = "";
    document.querySelector(".confirm-new-password").value = "";
    document.querySelector("#password-error").style.display = "none"; 
});

document.getElementById("save-changes-button").addEventListener("click", function() {


    const forgotEmailInput = document.querySelector(".resetemail");
    const newPasswordInput = document.querySelector(".newpassword");
    const confirmNewPassInput = document.querySelector(".confirm-new-password");

    const passwordResetSuccess = document.getElementById("password-reset-success");
    var passwordError = document.getElementById("password-error");
    
    const resetEmail = forgotEmailInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmNewPassword = confirmNewPassInput.value.trim();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find((user) => user.email === resetEmail);

    if(resetEmail==="" || newPassword==="" || confirmNewPassword==="") {
        passwordError.innerHTML = "Fields cannot be empty"
        forgotEmailInput.classList.add("red-border");
        newPasswordInput.classList.add("red-border");
        confirmNewPassInput.classList.add("red-border");        
        passwordError.style.display = "block"
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ((!emailRegex.test(resetEmail))){
        passwordError.innerHTML = "Invalid email format";
        forgotEmailInput.classList.add("red-border");
        newPasswordInput.classList.remove("red-border");
        confirmNewPassInput.classList.remove("red-border");
        passwordError.style.display = "block";
        return; 
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if(!regex.test(newPassword)) {
        passwordError.innerHTML = "Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character";
        passwordError.style.display = "block";
        forgotEmailInput.classList.remove("red-border");
        newPasswordInput.classList.add("red-border");
        confirmNewPassInput.classList.add("red-border");    
        return;
    } else{
        passwordError.style.display = "none";
    }



    if(user) {
        if(newPassword === confirmNewPassword ) {
            forgotEmailInput.classList.remove("red-border");
            newPasswordInput.classList.remove("red-border");
            confirmNewPassInput.classList.remove("red-border");

            user.password = newPassword;

            localStorage.setItem("users", JSON.stringify(storedUsers));

            // Display the success message after a delay
            const passwordResetSuccess = document.getElementById("password-reset-success");
            passwordResetSuccess.style.display = "block";

            passwordError.style.display = "none"; //hide the error
            
            setTimeout(function() {
                passwordResetSuccess.style.display = "none";
                $('#forgot-password').modal('hide');
            }, 2000);


        } else {
            passwordError.innerHTML = "Password is not matching"
            passwordError.style.display = "block";
            passwordResetSuccess.style.display = "none"; // Hide the success message if it was displayed earlier
            forgotEmailInput.classList.remove("red-border");
            newPasswordInput.classList.add("red-border");
            confirmNewPassInput.classList.add("red-border");  
        }
    } else {
        passwordError.style.display = "block";
        passwordResetSuccess.style.display = "none"; // Hide the success message if it was displayed earlier
    }
    }

)}
) 