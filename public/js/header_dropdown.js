/* for my account */

const myAccount = document.querySelector(".my_account_text");
const optionsContainer1 = document.querySelector(".options-container1");

const optionsList1 = document.querySelectorAll(".option1");

myAccount.addEventListener("click", () => {
  optionsContainer1.classList.toggle("active");
});

optionsList1.forEach(o1 => {
  o1.addEventListener("click", () => {
    myAccount.innerHTML = o1.querySelector("label").innerHTML;
    optionsContainer1.classList.remove("active");
  });
});

/* for our story */

const ourStory = document.querySelector(".our_story_text");
const optionsContainer2 = document.querySelector(".options-container2");

const optionsList2 = document.querySelectorAll(".option2");

ourStory.addEventListener("click", () => {
  optionsContainer2.classList.toggle("active");
});

optionsList2.forEach(o2 => {
  o2.addEventListener("click", () => {
    ourStory.innerHTML = o2.querySelector("label").innerHTML;
    optionsContainer2.classList.remove("active");
  });
});