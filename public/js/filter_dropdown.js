const filterButton = document.querySelector(".filter_button");
const filterDropDown = document.querySelector(".filter_drop_down");


filterButton.addEventListener("click", () => {
  filterDropDown.classList.toggle("active");
});

forEach(o1 => {
  o1.addEventListener("click", () => {
    filterDropDown.classList.remove("active");
  });
});