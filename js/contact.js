
var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var contactForm = document.getElementById("contactForm");
var successMessage = document.getElementById("successMessage");

userName.value = localStorage.getItem("userName") || "";
userEmail.value = localStorage.getItem("userEmail") || "";

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    localStorage.setItem("userName", userName.value);
    localStorage.setItem("userEmail", userEmail.value);

    successMessage.innerHTML = "Thank you " + userName.value + "! Your information has been saved.";

});
