document.addEventListener("DOMContentLoaded", function() {
    
    const phoneInputField = document.querySelector("#phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
    preferredCountries: ["in","us"],
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });


    //login for checkbox roles
    var adminCheckboxes = document.querySelectorAll('input.adminSubOption');
    var userCheckboxes = document.querySelectorAll('input.userSubOption');
    var adminCheckAll = document.getElementById('adminOption');
    var userCheckAll = document.getElementById('userOption');

    var adminCheckedValues = [];
    var userCheckedValues = [];

    //to update admin array
    function updateAdminCheckedValues() {
        adminCheckedValues = [];
        document.querySelectorAll('input.adminSubOption:checked').forEach(function (checkbox) {
            adminCheckedValues.push(checkbox.value.trim());
        });
    }

    //to update user array
    function updateUserCheckedValues() {
        userCheckedValues = [];
        document.querySelectorAll('input.userSubOption:checked').forEach(function (checkbox) {
            userCheckedValues.push(checkbox.value.trim());
        });
    }

    function uncheckUserCheckboxes() {
        userCheckboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
        // Uncheck the "Check All" checkbox for users
        userCheckAll.checked = false; 
    }

    function uncheckAdminCheckboxes() {
        adminCheckboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
        // Uncheck the "Check All" checkbox for admins
        adminCheckAll.checked = false; 
    }

    //adding event to sub admin checkboxes
    for (var i = 0; i < adminCheckboxes.length; i++) {
        adminCheckboxes[i].addEventListener('change', function () {
            updateAdminCheckedValues();
            uncheckUserCheckboxes(); // Uncheck all user checkboxes when any admin checkbox is checked
            var checkedCount = adminCheckedValues.length;

            adminCheckAll.checked = checkedCount > 0;
            adminCheckAll.indeterminate = checkedCount > 0 && checkedCount < adminCheckboxes.length;
        });
    }

    //adding event to sub user checkboxes
    for (var i = 0; i < userCheckboxes.length; i++) {
        userCheckboxes[i].addEventListener('change', function () {
            updateUserCheckedValues();
            // Uncheck all admin checkboxes when any user checkbox is checked
            uncheckAdminCheckboxes(); 
            var checkedCount = userCheckedValues.length;

            userCheckAll.checked = checkedCount > 0;
            userCheckAll.indeterminate = checkedCount > 0 && checkedCount < userCheckboxes.length;
        });
    }

    //adding event to adminCheckAll checkbox
    adminCheckAll.addEventListener('change', function () {
        for (var i = 0; i < adminCheckboxes.length; i++) {
            adminCheckboxes[i].checked = this.checked;
        }
        updateAdminCheckedValues();
        //uncheck all user checkboxes when adminCheckAll is checked
        uncheckUserCheckboxes(); 
    });

    //adding event to userCheckAll checkbox
    userCheckAll.addEventListener('change', function () {
        for (var i = 0; i < userCheckboxes.length; i++) {
            userCheckboxes[i].checked = this.checked;
        }
        updateUserCheckedValues();
        // Uncheck all admin checkboxes when userCheckAll is checked
        uncheckAdminCheckboxes(); 
    });


    //submit form function
    document.getElementById("signupForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const isAdmin = document.querySelectorAll("input.adminSubOption:checked").length > 0;
        const isUser = document.querySelectorAll("input.userSubOption:checked").length > 0;

        if(isAdmin && isUser) {
            console.log("Select one admin or user");
            return;
        }


        let selectedRole = "";

        console.log(typeof(isAdmin));

        if(isAdmin) {
            selectedRole = 'admin';
        } else if(isUser) {
            selectedRole = 'user';
        }

        let checkedValues;

        if(isAdmin) {
            checkedValues = adminCheckedValues;
        }else if(isUser) {
            checkedValues = userCheckedValues;
        }


        //calling the function
        submitSignupForm(phoneInput, checkedValues, selectedRole);
    })
})


//taking skills array from localstorage
const skills = JSON.parse(localStorage.getItem("skills"))

//taking languages from localtorage
let languages = JSON.parse(localStorage.getItem("languages"));

let selectElement = document.getElementById("preffered-language");
//set languages to the select list
languages.forEach(language => {
    let option = document.createElement("option");
    option.value = language;
    option.text = language;
    selectElement.add(option);
})

//jqeuery suggestions plugin
$('input[name="skills"]').amsifySuggestags({
    type : 'amsify',
    suggestions: skills,
    whiteList: true
});


//function for form submit
function submitSignupForm(phoneInput, checkedValues, selectedRole) {

    let fnameInput = document.getElementById("fname");
    let lnameInput = document.getElementById("lname");
    let emailInput = document.getElementById("email");
    let dobInput = document.getElementById('DOB');
    let genderInput = document.querySelector('input[name="inlineRadioOptions"]:checked');
    let addressInput = document.getElementById('address');
    let languageInput = document.getElementById('preffered-language');
    let passwordInput = document.getElementById("password");
    let confirmPasswordInput = document.getElementById("confirmpassword");

    const phoneNumber = phoneInput.getNumber();

    //skills tagnames array
    let tagNames = window.amsifySuggestagsInstance.tagNames;
    console.log("Tag Names:", tagNames);

    
    let fnameValue = fname.value.trim();
    let lnameValue = lname.value.trim();
    let emailValue = emailInput.value.trim();
    let dobValue = dobInput.value.trim();
    let genderValue = genderInput ? genderInput.value.trim() : null;
    let addressValue = addressInput.value.trim();
    let languageValue = languageInput.value;
    let passwordValue = passwordInput.value.trim();
    let confirmPasswordValue = confirmPasswordInput.value.trim();

    //ERROR FIELDS
    var fnameerror = document.getElementById("fname-error");
    var lnameerror = document.getElementById("lname-error");
    var emailerror = document.getElementById("email-error");
    var phoneerror = document.getElementById("phone-error");
    var doberror = document.getElementById("DOB-error");
    var gendererror = document.getElementById("gender-error");
    var passworderror = document.getElementById("password-error");
    var addresserror = document.getElementById("address-error");
    var lang_error = document.getElementById("lang-error");
    var correct = document.getElementById("correctbar");
    
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    

    // VALIDATIONS //

    const nameRegex = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
    if(!nameRegex.test(fnameValue)){
        fnameerror.innerHTML = "Name can contain only characters";
        fnameInput.classList.add("is-invalid");
        fnameerror.style.display = "block"
        return;
    } else {
        fnameInput.classList.remove("is-invalid");
        fnameerror.style.display = "none"
    }

    if(!nameRegex.test(lnameValue)){
        lnameerror.innerHTML = "Name can contain only characters";
        lnameInput.classList.add("is-invalid");
        lnameerror.style.display = "block"
        return;
    } else {
        lnameInput.classList.remove("is-invalid");
        lnameerror.style.display = "none"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ((!emailRegex.test(emailValue))){
        emailerror.innerHTML = "Invalid email format";
        emailInput.classList.add("red-border");
        emailerror.style.display = "block"
        return; 
    }else {
        emailInput.classList.remove("red-border");
        emailerror.style.display = "none"
    }

    console.log("Phone Number:", phoneNumber);
    const indianPhoneNumberRegex = /^\+91\d{10}$/;
    if (!indianPhoneNumberRegex.test(phoneNumber) || phoneNumber === "") {
        phoneerror.textContent = "Phone number should be 10 digits long";
        phoneerror.style.display = "block";
        return;
    } else {
        phoneerror.textContent = ""; 
        phoneerror.style.display = "none";
    }

    if(dobValue === ""){
        doberror.innerHTML = "Please select Date of birth";
        dobInput.classList.add("is-invalid")
        doberror.style.display = "block"
        return;
    } else{
        dobInput.classList.remove("is-invalid");
        doberror.style.display = "none"
    }

    if (genderValue === null) {
        gendererror.innerHTML = "Please select a gender";
        // Check if genderInput is not null before adding the class
        if (genderInput) {
            genderInput.classList.add("is-invalid");
        }
        gendererror.style.display = "block";
        return;
    } else {
        // Check if genderInput is not null before removing the class
        if (genderInput) {
            genderInput.classList.remove("is-invalid");
        }
        gendererror.style.display = "none";
    }

    if(addressValue === "") {
        addresserror.innerHTML = "Adress cannot be empty";
        addressInput.classList.add("is-invalid")
        addresserror.style.display = "block"
        return;
    } else{
        addressInput.classList.remove("is-invalid");
        addresserror.style.display = "none";
    }

    if(languageValue==="") {
        lang_error.innerHTML = "Please select language";
        languageInput.classList.add("is-invalid")
        lang_error.style.display = "block"
        return;
    } else{
        languageInput.classList.remove("is-invalid");
        lang_error.style.display = "none";
    }
    

    const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if(!passregex.test(passwordValue)) {
        passworderror.innerHTML = "Invalid password";
        passwordInput.classList.add("is-invalid")
        passworderror.style.display = "block"
        return;
    } else{
        passwordInput.classList.remove("is-invalid");
        passworderror.style.display = "none"
    }

    if(passwordValue !== confirmPasswordValue) {
        passworderror.innerHTML = "password not matching";
        passwordInput.classList.add("is-invalid")
        passworderror.style.display = "block"
        return;
    } else{
        passwordInput.classList.remove("is-invalid");
        passworderror.style.display = "none"
    }

    const emailExists = storedUsers.some(user => user.email === emailValue)
    if(emailExists){
        emailerror.innerHTML = "email already exist, use differnt email"
        emailInput.classList.add("red-border");
        emailerror.style.display = "block"
        return;
    } else{
        emailInput.classList.remove("red-border");
        emailerror.style.display = "none"
    }

    // VALIDATIONS END HERE //



    //creation of new user object
    const newuser = {
        "id": storedUsers.length + 1,
        "email": emailValue,
        "fname": fnameValue ,
        "lname": lnameValue,
        "phone": phoneNumber,
        "DOB": dobValue,
        "gender": genderValue,
        "address": addressValue,
        "skills": tagNames,
        "preferredLanguage": languageValue,
        "role": selectedRole,
        "permissions": checkedValues,
        "password": passwordValue
    } 


    //Push the newuser to users array
    storedUsers.push(newuser);

    //store the new users array to localstorage
    localStorage.setItem("users", JSON.stringify(storedUsers));

    correct.className = "show"

    setTimeout(function() {
        correct.className = correct.className.replace("show", "");
        window.location.href = "login.html";
    }, 2000);

}



