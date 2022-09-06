const bankListElem = document.getElementById("account-list")
const backEditElem = document.getElementById("add-account")

document.getElementById("edit-account-btn").addEventListener('click', () => {
    bankListElem.style.display = "none"
    backEditElem.style.display = "block"
    console.log("tesets")
})