function HidePassword1() {
    const password = document.querySelector("#new_password")
    var x = document.getElementById("new_password");
    if (x.type === "password") {
        x.type = "text";
        document.getElementById("togglePassword1").style.display = "inline-block";
        document.getElementById("ShowPassword1").style.display = "none";
        document.getElementById("password").style.position = "absolute";
        document.getElementById("password").style.left = "60px";
        document.getElementById("password").style.top = "7px";
        document.getElementById("password").style.width = "300px";
        document.getElementById("password").style.fontFamily = "M PLUS 1";
        document.getElementById("password").style.fontSize = "18px";
        document.getElementById("togglePassword1").style.position = "absolute";
        document.getElementById("togglePassword1").style.top = "10px";
        document.getElementById("togglePassword1").style.left = "370px";
    }
    else {
        x.type = "password";
        document.getElementById("togglePassword1").style.display = "none";
        document.getElementById("ShowPassword1").style.display = "inline-block";

    }
}

function HidePassword2() {
    const password = document.querySelector("#comfirm_password")
    var x = document.getElementById("comfirm_password");
    if (x.type === "password") {
        x.type = "text";
        document.getElementById("togglePassword2").style.display = "inline-block";
        document.getElementById("ShowPassword2").style.display = "none";
        document.getElementById("password").style.position = "absolute";
        document.getElementById("password").style.left = "60px";
        document.getElementById("password").style.top = "7px";
        document.getElementById("password").style.width = "300px";
        document.getElementById("password").style.fontFamily = "M PLUS 1";
        document.getElementById("password").style.fontSize = "18px";
        document.getElementById("togglePassword2").style.position = "absolute";
        document.getElementById("togglePassword2").style.top = "10px";
        document.getElementById("togglePassword2").style.left = "370px";
    }
    else {
        x.type = "password";
        document.getElementById("togglePassword2").style.display = "none";
        document.getElementById("ShowPassword2").style.display = "inline-block";

    }
}