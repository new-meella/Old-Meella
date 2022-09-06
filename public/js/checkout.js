let cartManages = document.getElementsByClassName("cart-manage")
let quantityEls = []
let totalPriceTag = document.getElementById("total-price")
let finalPriceTag = document.getElementById("final-price")
let selectCheckboxes = document.getElementsByClassName("checkbox")
let deleteButton = document.getElementById("delete-button")
let productList = document.getElementById("product-list")
let menuBars = document.getElementsByClassName("menu-bar")

let selectAllBox = selectCheckboxes[0]
let selectAll = false
let selectors = []
let selected = []

for (let i=1; i<selectCheckboxes.length; i++) {
    selectors.push(selectCheckboxes[i])
    selected.push(false)
}

let total = 0
let prices = []
let quantities = []

const updatePrices = () => {
    total = 0
    for (let i=0; i<prices.length; i++) {
        total += prices[i] * quantities[i]
    }
    totalPriceTag.textContent = total + " Baht"
    finalPriceTag.textContent = total + " Baht"
}

const checkSelectAll = () => {
    selectAll = true
    for (let i=0; i<selected.length; i++) {
        if (!selected[i]) {
            selectAll = false
            break
        }
    }
    selectAllBox.children[0].style.opacity = selectAll ? 1 : 0
}

for (let i=0; i<cartManages.length; i++) {
    quantityEls.push(cartManages[i].getElementsByClassName("quantity")[0])
    let increaseButton = cartManages[i].getElementsByClassName("increase")[0]
    let decreaseButton = cartManages[i].getElementsByClassName("decrease")[0]
    let priceTag = cartManages[i].getElementsByClassName("price-tag")[0].children[0]

    quantities.push(parseInt(quantityEls[i].textContent))
    prices.push(parseInt(priceTag.textContent))

    increaseButton.addEventListener("click", () => {
        quantities[i] += 1
        quantityEls[i].textContent = quantities[i]
        updatePrices()
    })

    decreaseButton.addEventListener("click", () => {
        quantities[i] -= quantities[i] > 0 ? 1 : 0
        quantityEls[i].textContent = quantities[i]
        updatePrices()
    })
}

for (let i=0; i<selectors.length; i++) {
    selectors[i].addEventListener("click", () => {
        selected[i] = !selected[i]
        selectors[i].children[0].style.opacity = selected[i] ? 1 : 0
        checkSelectAll()
    })
}

selectAllBox.addEventListener("click", () => {
    selectAll = !selectAll
    selectAllBox.children[0].style.opacity = selectAll ? 1 : 0
    for (let i=0; i<selectors.length; i++) {
        if (selected[i] != "deleted") {
            selected[i] = selectAll
            selectors[i].children[0].style.opacity = selected[i] ? 1 : 0
        }
    }
})

deleteButton.addEventListener("click", () => {
    let count = 0
    for (let i=0; i<selected.length; i++) {
        if (selected[i]) {
            menuBars[i].style.display = "none"
            selected[i] = "deleted"
        }
        if (selected[i] == "deleted") {
            count++
        }
    }
    if (count == selected.length) {
        let emptyAlert = document.getElementById("empty-alert")
        emptyAlert.style.display = "block"
    }
})

updatePrices()