const generateMenu = (idx) => {
  return {
    productName: "Choco donut " + idx,
    productDescription:
      "A wonderful donut topped up with dark chocolate plus special rainbow on it",
    distance: "3.5km",
    location: "Sweet Circle, Pathumwan",
    originalPrice: 30 + idx + " THB",
    price: 12 + idx + " THB",
    image: "/img/donut.png",
  };
};

const menuList = [];
for (let i = 0; i < 3; i++) {
  menuList.push(generateMenu(i));
}

const landingPageData = {
  menus: [
    {
      productName: "Choco donut " + "0",
      productDescription:
        "A wonderful donut topped up with dark chocolate plus special rainbow on it",
      distance: "3.5km",
      location: "Sweet Circle, Pathumwan",
      originalPrice: 30 + "4" + " THB",
      price: 12 + "4" + " THB",
      image: "/img/donut.png",
    },
    {
      productName: "Choco donut " + "1",
      productDescription:
        "A wonderful donut topped up with dark chocolate plus special rainbow on it",
      distance: "3.5km",
      location: "Sweet Circle, Pathumwan",
      originalPrice: 30 + "4" + " THB",
      price: 12 + "4" + " THB",
      image: "/img/donut.png",
    },
    {
      productName: "Choco donut " + "3",
      productDescription:
        "A wonderful donut topped up with dark chocolate plus special rainbow on it",
      distance: "3.5km",
      location: "Sweet Circle, Pathumwan",
      originalPrice: 30 + "4" + " THB",
      price: 12 + "4" + " THB",
      image: "/img/donut.png",
    },
    {
      productName: "Choco donut " + "4",
      productDescription:
        "A wonderful donut topped up with dark chocolate plus special rainbow on it",
      distance: "3.5km",
      location: "Sweet Circle, Pathumwan",
      originalPrice: 30 + "4" + " THB",
      price: 12 + 4 + " THB",
      image: "/img/donut.png",
    },
  ],
};

module.exports = landingPageData;
