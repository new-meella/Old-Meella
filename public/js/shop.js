const categoryButtons = document
  .getElementById("category-box")
  .getElementsByTagName("div");
const categorySelects = [];

const pickUpButtons = document
  .getElementById("pick-up-box")
  .getElementsByTagName("div");
const pickUpSelects = [];

const likeButtons = document.getElementsByClassName("like-button");
const likeSelects = [];

for (let i = 0; i < categoryButtons.length; i++) {
  categorySelects.push(false);
  categoryButtons[i].addEventListener("click", () => {
    categorySelects[i] = !categorySelects[i];
    categoryButtons[i].style.backgroundColor = categorySelects[i]
      ? "#F4D06F"
      : "#F3F3F3";
  });
}

for (let i = 0; i < pickUpButtons.length; i++) {
  pickUpSelects.push(false);
  pickUpButtons[i].addEventListener("click", () => {
    pickUpSelects[i] = !pickUpSelects[i];
    pickUpButtons[i].style.backgroundColor = pickUpSelects[i]
      ? "#F4D06F"
      : "#F3F3F3";
  });
}

for (let i = 0; i < likeButtons.length; i++) {
  likeSelects.push(false);
  likeButtons[i].addEventListener("click", () => {
    likeSelects[i] = !likeSelects[i];
    likeButtons[i].src =
      "/img/" + (likeSelects[i] ? "full_heart" : "heart") + ".png";
  });
}
