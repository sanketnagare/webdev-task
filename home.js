 // Retrieve the email from localStorage
 const username = localStorage.getItem("username");
        
 // Update the content of the "setusername" element with the retrieved email
//  let setusername = document.getElementById("setusername");
//  if (setusername) {
//      setusername.textContent = username;
//  }
 function getLoggedInUser() {
    const loggedInUserJson = localStorage.getItem("loggedInUser");
    return JSON.parse(loggedInUserJson);
}

// Function to update the user's details in localStorage
function updateLoggedInUser(user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
}

function updateUserDetailsInArray(usersArray, loggedInUser) {
    const updatedUsersArray = usersArray.map((user) => {
        if (user.email === loggedInUser.email) {
            user.name = loggedInUser.name;
            user.phone = loggedInUser.phone;
            user.DOB = loggedInUser.DOB;
        }
        return user;
    });
    return updatedUsersArray;
}

function displayUserDetails(user) {
    if (user) {
        const userDetailsModal = document.getElementById("view-details-modal");

        if (userDetailsModal) {
            const modalTitle = userDetailsModal.querySelector(".modal-title");
            const modalBody = userDetailsModal.querySelector(".view-modal-body");

            modalTitle.textContent = "User Details";

            const userDetailsHtml = `
                <p><strong>Name:</strong> <span>${user.name}</span></p>
                <p><strong>E-mail:</strong> <span>${user.email}</span></p>
                <p><strong>Phone:</strong> <span>${user.phone}</span></p>
                <p><strong>Date of birth:</strong> <span>${user.DOB}</span></p>
            `;

            modalBody.innerHTML = userDetailsHtml;
        }
    }
}

const viewDetailsLink = document.getElementById("view-details");
if (viewDetailsLink) {
    viewDetailsLink.addEventListener("click", function() {
        const loggedInUser = getLoggedInUser();
        displayUserDetails(loggedInUser);
    });
}


 //edit details modal
 var editsuccess = document.getElementById("edit-details-success");
 const editDetailsForm = document.getElementById("edit-details-form");

 const editNameInput = document.getElementById("editName");
 const editPhoneInput = document.getElementById("editPhone");
 const editDOBInput = document.getElementById("editDOB");

 function populateFormWithUserData() {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const user = storedUsers.find((user) => user.email === username);

    if (user) {
        editNameInput.value = user.name;
        editPhoneInput.value = user.phone;
        editDOBInput.value = user.DOB;
    }
 }


 if (editDetailsForm) {
    $('#edit-details-modal').on('shown.bs.modal', function () {
        const loggedInUser = getLoggedInUser();
        editNameInput.value = loggedInUser.name;
        editPhoneInput.value = loggedInUser.phone;
        editDOBInput.value = loggedInUser.DOB;
        editNameInput.classList.remove("is-invalid");
        editPhoneInput.classList.remove("is-invalid");
        document.getElementById("name-error").style.display = "none";
        document.getElementById("phone-error").style.display = "none";
    });

    editDetailsForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get the current logged-in user
        const loggedInUser = getLoggedInUser();

        // Update user details with new values
        // loggedInUser.name = editNameInput.value.trim();
        // loggedInUser.phone = editPhoneInput.value.trim();
        // loggedInUser.DOB = editDOBInput.value.trim();

        const newName = editNameInput.value.trim();
        const newPhone = editPhoneInput.value.trim();

        const nameRegex = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
        const phoneRegex = /^\d{10}$/;

        if(!nameRegex.test(newName)){
            editNameInput.classList.add("is-invalid");
            document.getElementById("name-error").style.display = "block";
            return;
        } else {
            editNameInput.classList.remove("is-invalid");
            document.getElementById("name-error").style.display = "none";
        }
        
        if(!phoneRegex.test(newPhone)) {
            editPhoneInput.classList.add("is-invalid")
            document.getElementById("phone-error").style.display = "block";
            return;
        }
        else{
            editPhoneInput.classList.remove("is-invalid");
            document.getElementById("phone-error").style.display = "none";
        }


        loggedInUser.name = editNameInput.value.trim();
        loggedInUser.phone = editPhoneInput.value.trim();
        loggedInUser.DOB = editDOBInput.value.trim();

        const storedUsers = JSON.parse(localStorage.getItem("users"));

        //update array with new values
        const updatedUsers = updateUserDetailsInArray(storedUsers, loggedInUser);

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Store the updated loggedInUser object in localStorage
        updateLoggedInUser(loggedInUser);

        // Display a success message
        editsuccess.className = "show";
        setTimeout(function() {
            editsuccess.className = editsuccess.className.replace("show", "");
        }, 2000);

        // Close the modal
        $('#edit-details-modal').modal('hide');

        // Display updated user details
        displayUserDetails(loggedInUser);
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


//using only email

//  function viewDetails(email) {

//     //get data from local storage
//     const storedUsers = JSON.parse(localStorage.getItem("users"));

//     //find user with matching email
//     const user = storedUsers.find((user) => user.email === email);

//     if(user) {

//         const userDetails = document.getElementById("view-details-modal");

//         if(userDetails) {
//             const modalTitle = userDetails.querySelector(".modal-title");
//             const modalBody = userDetails.querySelector(".modal-body");

//             modalTitle.textContent = "User Details";

//             const userDetailsHtml = `
//             <p><strong>Name:</strong> ${user.name}</p>
//             <p><strong>Email:</strong> ${user.email}</p>
//             <p><strong>Phone:</strong> ${user.phone}</p>
//             <p><strong>Date of birth:</strong> ${user.DOB}</p>
//             `;

//             modalBody.innerHTML = userDetailsHtml;
//         }
//     }
//  }



//  const viewDetailsLink = document.getElementById("view-details");
//  if(viewDetailsLink) {
//     viewDetailsLink.addEventListener("click", function() {
//         viewDetails(username);
//     })
//  }






//  if(editDetailsForm) {

//     $('#edit-details-modal').on('shown.bs.modal', function () {
//         populateFormWithUserData();
//     });

//     editDetailsForm.addEventListener("submit", function(event) {
//         event.preventDefault();

//         //local data
//         const storedUsers = JSON.parse(localStorage.getItem("users"));

       
//         const loggedInUser = getLoggedInUser();

//         //new values from the form
//         const newName = editNameInput.value.trim();
//         const newPhone = editPhoneInput.value.trim();
//         const DOB = editDOBInput.value.trim();

        
//         console.log("before update..."+JSON.stringify(storedUsers));
//         //update with new values
//         const updatedUsers = storedUsers.map((user) => {
//             if(user.email === username) { 
//                 user.name = newName;
//                 user.phone = newPhone;
//                 user.DOB = DOB;
//             }
//             editsuccess.className = "show"

//             setTimeout(function() {
//                 editsuccess.className = editsuccess.className.replace("show", "");
//             }, 2000);
//             return user;
//         });

//         //update in JSON array in localstorage
//         localStorage.setItem("users", JSON.stringify(updatedUsers));
//         console.log("after update...."+JSON.stringify(updatedUsers));
//         //close modal
//         $('#edit-details-modal').modal('hide');

//         viewDetails(username)
//     })
 



