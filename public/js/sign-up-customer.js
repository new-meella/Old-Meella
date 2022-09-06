function HidePassword() {
    const password = document.querySelector("#password")
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
        document.getElementById("togglePassword").style.display = "inline-block";
        document.getElementById("ShowPassword").style.display = "none";
        document.getElementById("password").style.position = "absolute";
        document.getElementById("password").style.left = "12px";
        document.getElementById("password").style.top = "5px";
        document.getElementById("password").style.width = "300px";
        document.getElementById("password").style.fontFamily = "M PLUS 1";
        document.getElementById("password").style.fontSize = "18px";
        document.getElementById("password").style.border = "none";
        document.getElementById("password").style.outline = "none";
        document.getElementById("togglePassword").style.position = "absolute";
        document.getElementById("togglePassword").style.top = "6px";
        document.getElementById("togglePassword").style.left = "315px";
    }
    else {
        x.type = "password";
        document.getElementById("togglePassword").style.display = "none";
        document.getElementById("ShowPassword").style.display = "inline-block";

    }
}