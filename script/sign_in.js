
document.getElementById("SIgnin_btn").addEventListener("click",function(){
    const username = document.getElementById("Signin_input").value
    const password = document.getElementById("Signin_password").value

    if (username === "admin" && password === "admin123") {

        window.location.assign("home.html");

    }else {
        alert("Invalid username or password. Please try again.");
    }
})