const section = document.querySelector("section"),
closeBtn = section.querySelectorAll("#closex");

closeBtn.forEach(cBtn => {
cBtn.addEventListener("click", () => {
    section.classList.add("show");
})
});




var box1 = document.querySelector(".box1");
var box2 = document.querySelector(".box2");
var box3 = document.querySelector(".box3");
var box4 = document.querySelector(".box4");

//box1 start//
box1.addEventListener("click", function () {
    var data1 = document.querySelector(".data1");
    data1.classList.toggle("show");
})
box1.addEventListener("click", function () {
    var data1 = document.querySelector(".data1");
    box1.classList.toggle("show");
})
//box1 end//

//box2 start//
box2.addEventListener("click", function () {
    var data2 = document.querySelector(".data2");
    data2.classList.toggle("show");
})
box2.addEventListener("click", function () {
    var data2 = document.querySelector(".data2");
    box2.classList.toggle("show");
})
//box2 end//

//box3 start//
box3.addEventListener("click", function () {
    var data3 = document.querySelector(".data3");
    data3.classList.toggle("show");
})
box3.addEventListener("click", function () {
    var data3 = document.querySelector(".data3");
    box3.classList.toggle("show");
})
//box3 end//

//box4 start//
box4.addEventListener("click", function () {
    var data4 = document.querySelector(".data4");
    data4.classList.toggle("show");
})
box4.addEventListener("click", function () {
    var data4 = document.querySelector(".data4");
    box4.classList.toggle("show");
})
//box4 end//



var cookieSetting = document.querySelector("#mySidebar");
cookieSetting.addEventListener("click", function () {
    var scroll = document.querySelector(".scroll");
    scroll.classList.toggle("show");
})


function HidePassword() {
    const password = document.querySelector("#password")
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
        document.getElementById("togglePassword").style.display = "inline-block";
        document.getElementById("ShowPassword").style.display = "none";
        document.getElementById("password").style.position = "absolute";
        document.getElementById("password").style.left = "60px";
        document.getElementById("password").style.top = "7px";
        document.getElementById("password").style.width = "300px";
        document.getElementById("password").style.fontFamily = "M PLUS 1";
        document.getElementById("password").style.fontSize = "18px";
        document.getElementById("password").style.border = "none";
        document.getElementById("password").style.outline = "none";
        document.getElementById("togglePassword").style.position = "absolute";
        document.getElementById("togglePassword").style.top = "10px";
        document.getElementById("togglePassword").style.left = "370px";
    }
    else {
        x.type = "password";
        document.getElementById("togglePassword").style.display = "none";
        document.getElementById("ShowPassword").style.display = "inline-block";

    }
}