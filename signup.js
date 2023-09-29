document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("signupForm").addEventListener("submit", function(event) {
        event.preventDefault();
        submitSignupForm();
    })
})

function submitSignupForm() {

    let emailInput = document.getElementById("email");
    let nameInput = document.getElementById("name");
    let phoneInput = document.getElementById("phone");
    let dobInput = document.getElementById('DOB');
    let passwordInput = document.getElementById("password");

    let email = emailInput.value.trim();
    let name = nameInput.value.trim();
    let phone = phoneInput.value.trim();
    let dob = dobInput.value.trim();
    let password = passwordInput.value.trim();

    var emailerror = document.getElementById("email-error");
    var nameerror = document.getElementById("name-error");
    var phoneerror = document.getElementById("phone-error");
    var doberror = document.getElementById("DOB-error");
    var passworderror = document.getElementById("password-error");

    var correct = document.getElementById("correctbar");

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ((!emailRegex.test(email))){
        emailerror.innerHTML = "Invalid email format";
        emailInput.classList.add("red-border");
        emailerror.style.display = "block"
        return; 
    }else {
        emailInput.classList.remove("red-border");
        emailerror.style.display = "none"
    }

    const nameRegex = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
    if(!nameRegex.test(name)){
        nameerror.innerHTML = "Name can contain only characters";
        nameInput.classList.add("is-invalid");
        nameerror.style.display = "block"
        return;
    } else {
        nameInput.classList.remove("is-invalid");
        nameerror.style.display = "none"
    }

    const phoneRegex = /^\d{10}$/;
    if(!phoneRegex.test(phone)) {
        phoneerror.innerHTML = "Phone number should be 10 digits long";
        phoneInput.classList.add("is-invalid")
        phoneerror.style.display = "block"
        return;
    }
    else{
        phoneInput.classList.remove("is-invalid");
        phoneerror.style.display = "none"
    }


    const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if(!passregex.test(password)) {
        passworderror.innerHTML = "Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character";
        passwordInput.classList.add("is-invalid")
        passworderror.style.display = "block"
        return;
    }
    else{
        passwordInput.classList.remove("is-invalid");
        passworderror.style.display = "none"
    }

    const emailExists = storedUsers.some(user => user.email === email)
    if(emailExists){
        emailerror.innerHTML = "email already exist, use differnt email"
        emailInput.classList.add("red-border");
        emailerror.style.display = "block"
        return;
    }
    else{
        emailInput.classList.remove("red-border");
        nameerror.style.display = "none"
    }


    const newuser = {
        "id": storedUsers.length + 1,
        "email": email,
        "name": name,
        "phone":phone,
        "DOB":dob,
        "password":password
    }

    storedUsers.push(newuser);

    localStorage.setItem("users", JSON.stringify(storedUsers));

    correct.className = "show"

    setTimeout(function() {
        correct.className = correct.className.replace("show", "");
        window.location.href = "login.html";
    }, 2000);





}



