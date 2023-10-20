document.addEventListener("DOMContentLoaded", function() {
    
    const phoneInputField = document.querySelector("#editPhone");
    const phoneInput = window.intlTelInput(phoneInputField, {
    preferredCountries: ["in","us"],
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
})


// Function to update the user in localStorage
function updateLoggedInUser(user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
}


var allskills = JSON.parse(localStorage.getItem("skills"));


//suggestion plugin code
$('input[name="skills"]').amsifySuggestags({
    type : 'amsify',
    suggestions: allskills,
    whiteList: true,
    tagLimit: 3
});

//saved skills of user display when modal open
const user  = getLoggedInUser();
var skills = user.skills;
skills.forEach(function (skill) {
    window.amsifySuggestagsInstance.addTag(skill);
})


//function to update user in array
function updateUserDetailsInArray(usersArray, loggedInUser) {
    const updatedUsersArray = usersArray.map((user) => {
        if (user.email === loggedInUser.email || user.id === loggedInUser.id) {
            user.fname = loggedInUser.fname;
            user.lname = loggedInUser.lname;
            user.phone = loggedInUser.phone;
            user.email = loggedInUser.email;
            user.DOB = loggedInUser.DOB;
            user.address = loggedInUser.address;
            user.preferredLanguage = loggedInUser.preferredLanguage;
            user.skills = loggedInUser.skills;
        }
        return user;
    });
    return updatedUsersArray;
}


//listener to view user details 
const viewDetailsLink = document.getElementById("view-details");
if (viewDetailsLink) {
    viewDetailsLink.addEventListener("click", function() {
        const loggedInUser = getLoggedInUser();
        displayUserDetails(loggedInUser);
    });
}

//function to get the logged-in user
function getLoggedInUser() {
    const loggedInUserJson = localStorage.getItem("loggedInUser");
    return JSON.parse(loggedInUserJson);
}


//function to display user details in modal
function displayUserDetails(user) {
    if (user) {
        const userDetailsModal = document.getElementById("view-details-modal");

        if (userDetailsModal) {
            const modalTitle = userDetailsModal.querySelector(".modal-title");
            const modalBody = userDetailsModal.querySelector(".view-modal-body");

            modalTitle.textContent = "User Details";

           

            const userDetailsHtml = `
                <p><strong>Name:</strong> <span>${user.fname} ${user.lname}</span></p>
                <p><strong>E-mail:</strong> <span>${user.email}</span></p>
                <p><strong>Phone:</strong> <span>${user.phone}</span></p>
                <p><strong>Date of birth:</strong> <span>${user.DOB}</span></p>
                <p><strong>Address:</strong> <span>${user.address}</span></p>
                <p><strong>Gender:</strong> <span>${user.gender}</span></p>
                <p><strong>Role:</strong> <span>${user.role}</span></p>
                <p><strong>Permissions:</strong> <span>${user.permissions}</span></p>
                <p><strong>Skills:</strong> <span>${user.skills}</span></p>
            `;

            modalBody.innerHTML = userDetailsHtml;
        }
    }
}


 //edit details modal start
 var editsuccess = document.getElementById("edit-details-success");
 const editDetailsForm = document.getElementById("edit-details-form");

 const editFirstNameInput = document.getElementById("editFName");
 const editLastNameInput = document.getElementById("editLName");
 const editPhoneInput = document.getElementById("editPhone");
 const editEmailInput = document.getElementById("editEmail");
 const editDOBInput = document.getElementById("editDOB");
 const editAddressInput = document.getElementById("editAddress");
 const editPrefferedLanguage = document.getElementById("edit-preffered-language");

 let tagNames = window.amsifySuggestagsInstance.tagNames;


let languages = JSON.parse(localStorage.getItem("languages"));


//show user data at start when edit modal open 
 if (editDetailsForm) {
    $(document).ready(function(){
    $(document).on('show.bs.modal','#edit-details-modal', function () {
        const loggedInUser = getLoggedInUser();

        editFirstNameInput.value = loggedInUser.fname;
        editLastNameInput.value = loggedInUser.lname;
        editPhoneInput.value = loggedInUser.phone;
        editEmailInput.value = loggedInUser.email;
        editDOBInput.value = loggedInUser.DOB;
        editAddressInput.value = loggedInUser.address;

        

        editFirstNameInput.classList.remove("is-invalid");
        editLastNameInput.classList.remove("is-invalid");
        editPhoneInput.classList.remove("is-invalid");
        editEmailInput.classList.remove("is-invalid");

        document.getElementById("fname-error").style.display = "none";
        document.getElementById("lname-error").style.display = "none";
        document.getElementById("phone-error").style.display = "none";
        document.getElementById("email-error").style.display = "none";

        editPrefferedLanguage.innerHTML = '';

        languages.forEach(language => {
            let option = document.createElement("option");
            option.value = language;
            option.text = language;

            // Check if the language is in the user's preferred languages
            if (loggedInUser.preferredLanguage === language) {
                option.selected = true;
            }

            editPrefferedLanguage.add(option);
        });
    });

    editDetailsForm.addEventListener("submit", function(event) {
        event.preventDefault();

        //get current logged-in user
        const loggedInUser = getLoggedInUser();

        const newFirstName = editFirstNameInput.value.trim();
        const newLastName = editLastNameInput.value.trim();
        const newPhone = editPhoneInput.value.trim();
        const newEmail = editEmailInput.value.trim();
        const newDOB = editDOBInput.value.trim();
        const newAddress = editAddressInput.value.trim();
        const selectedLanguage = editPrefferedLanguage.value;

        //VALIDATIONS
        const nameRegex = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
        const phoneRegex = /^\+91\d{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!nameRegex.test(newFirstName)){
            editFirstNameInput.classList.add("is-invalid");
            document.getElementById("fname-error").style.display = "block";
            return;
        } else {
            editFirstNameInput.classList.remove("is-invalid");
            document.getElementById("fname-error").style.display = "none";
        }

        if(!nameRegex.test(newLastName)){
            editLastNameInput.classList.add("is-invalid");
            document.getElementById("lname-error").style.display = "block";
            return;
        } else {
            editLastNameInput.classList.remove("is-invalid");
            document.getElementById("lname-error").style.display = "none";
        }

        if(!emailRegex.test(newEmail)) {
            editEmailInput.classList.add("is-invalid");
            document.getElementById("email-error").style.display = "block";
            return;
        }
        else{
            editEmailInput.classList.remove("is-invalid");
            document.getElementById("email-error").style.display = "none";
        }

        //update user details with new values
        loggedInUser.fname = newFirstName;
        loggedInUser.lname = newLastName;
        loggedInUser.phone = newPhone;
        loggedInUser.email = newEmail;
        loggedInUser.DOB = newDOB;
        loggedInUser.address = newAddress;
        loggedInUser.skills = tagNames;


        loggedInUser.preferredLanguage = selectedLanguage;


        const storedUsers = JSON.parse(localStorage.getItem("users"));

        //update array with new values
        const updatedUsers = updateUserDetailsInArray(storedUsers, loggedInUser);

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        //store the updated loggedInUser object in localStorage
        updateLoggedInUser(loggedInUser);


        //close the modal
        $('#edit-details-modal').modal('hide');
        

        //display a success message
        editsuccess.className = "show";
        setTimeout(function() {
            editsuccess.className = editsuccess.className.replace("show", "");
        }, 2000);


        //display updated user details
        displayUserDetails(loggedInUser);
    });

});
}


const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", function() {
        // Clear user session data
        localStorage.removeItem("loggedInUser");

        // Redirect the user to the login page
        window.location.href = "login.html";
    });
}



//sidebar toggle functionanlity
jQuery(document).ready(function($) {
$(function() { 
    $('#toggleSidebar').on('click', function() {
      $('#sidebar, #content').toggleClass('active');
    });
});
}) 

//sub menus toggle
jQuery(document).ready(function($) {
$('.sub-btn').click(function() {
    $('.sub-btn').removeClass('selected');
    $(this).next('.sub-menu').slideToggle(200);
    $(this).find('.dropdown').toggleClass('rotate');//icon rotation to down
    $(this).addClass('selected');
})
}) 

