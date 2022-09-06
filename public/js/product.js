let isFav = false;
let favButton = document.getElementById("fav-button");
let starButtons = document.getElementById("review-summary").getElementsByClassName("star");

let likeButtons = document.getElementById("more-menu").getElementsByClassName("like-button");

let currentRating = 0;
let like = [false, false, false];

favButton.addEventListener("click", () => {
    isFav = !isFav;
    favButton.src = "/img/" + (isFav ? "full_heart" : "heart") + ".png";
})

for (let i=0; i<starButtons.length; i++) {
    starButtons[i].addEventListener("click", () => {
        currentRating = i;
        for (let a=0; a<starButtons.length; a++) {
            starButtons[a].src = "/img/star-" + (a <= currentRating? "yellow": "grey") + ".png";
        }
    })
}

for (let i=0; i<likeButtons.length; i++) {
    likeButtons[i].addEventListener("click", () => {
        like[i] = !like[i];
        likeButtons[i].src = "/img/" + (like[i] ? "full_heart" : "heart") + ".png";
    })
}