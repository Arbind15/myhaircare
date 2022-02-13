const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    if (document.getElementById('eye').style.display == "inline") {
        document.getElementById('eye').style.display = "none";
        document.getElementById('eye_s').style.display = "inline";
    } else {
        document.getElementById('eye').style.display = "inline";
        document.getElementById('eye_s').style.display = "none";
    }
});