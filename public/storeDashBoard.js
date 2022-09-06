const generateMenu1 = (idx) => {
  return {
    name: "Choco donut " + idx,
    orderId: idx,
    pickUpTime: "After 19:00",
    date: "12/02/2022",
  };
};

const currentOrderList = [];
for (let i = 0; i < 4; i++) {
  currentOrderList.push(generateMenu1(i));
}

//
const generateMenu2 = (idx) => {
  return {
    productName: "Choco donut",
    numberSold: 123123,
  };
};

const topSalesList = [];
for (let i = 0; i < 11; i++) {
  topSalesList.push(generateMenu2(i));
}
//

const generateMenu3 = (idx) => {
  return {
    date: "10/02/2022",
    orderName: "Order Choco donut " + idx,
    price: 300 + idx,
  };
};
const orderHistoryList = [];
for (let i = 0; i < 11; i++) {
  orderHistoryList.push(generateMenu3(i));
}

//
const storeDashBoardData = {
  topSalesList: topSalesList,
  currentOrderList: currentOrderList,
  orderHistoryList: orderHistoryList,
};

module.exports = storeDashBoardData;


