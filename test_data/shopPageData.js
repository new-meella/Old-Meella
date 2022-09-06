const generateMenu = (idx) => {
    return {
        productName: "Choco donut " + idx,
        productDescription: "A wonderful donut topped up with dark chocolate plus special rainbow on it",
        distance: "3.5km",
        location: "Sweet Circle, Pathumwan",
        originalPrice: (30 + idx) + " THB",
        price: (12 + idx) + " THB",
        image: "/img/donut.png"
    }
}

const menuList = []
for (let i=0; i<11; i++) {
    menuList.push(generateMenu(i))
}

const shopPageData = {
    menus: menuList,
    categories: ["Thai", "Healthy", "Trendy", "Green", "Fast food"],
    pickUpTimes: ["1:00PM", "2:00PM","3:00PM","4:00PM","5:00PM"],
    distanceRange: [1, 15, 1],
    priceRange: [100, 900, 50]
}

module.exports = shopPageData;