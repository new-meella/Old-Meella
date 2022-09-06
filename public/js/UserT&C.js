function myFnc(e) {

    var elem = document.getElementById("navID"),
        Style = window.getComputedStyle(elem),
        right = Style.getPropertyValue("right");

    if (right == "0px") {
        elem.style.right = "-414px";

    } else {
        elem.style.right = "0px";
    }

}