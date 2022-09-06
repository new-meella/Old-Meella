const express = require("express");
const app = express();
const port = 3000;

const landingPageData = require("./test_data/landingPageData");
const shopPageData = require("./test_data/shopPageData");
const productPageData = require("./test_data/productPageData");
const checkoutPageData = require("./test_data/checkoutPageData");
const paymentMethodData = require("./test_data/paymentMethodData");
const orderHistoryPricePageData = require("./test_data/orderHistoryPageData");
const menuSettingData = require("./test_data/menuSettingData");
const storeDashBoardData = require("./public/storeDashBoard");
app.use(express.static("public"));
app.set("view engine", "ejs");

// Jajah part start
app.get("/", (req, res) => {
  res.render("index.ejs", landingPageData);
});

app.get("/search", (req, res) => {
  res.render("shop.ejs", shopPageData);
});

app.get("/product/:productId", (req, res) => {
  // a product page
  res.render("product.ejs", productPageData);
});

app.get("/checkout", (req, res) => {
  //! PopUp
  //TODO need to add to backend
  res.render("checkout.ejs", checkoutPageData);
});

app.get("/payment-method", (req, res) => {
  //TODO need to add to backend
  //! need more polish
  res.render("payment_method.ejs", paymentMethodData);
});

app.get("/order-history", (req, res) => {
  res.render("order_history.ejs", orderHistoryPricePageData);
});
// Jajah part end

// Game part start
app.get("/store/hi", (req, res) => {
  //TODO touch up

  res.render("store_dashboard.ejs", storeDashBoardData);
});
// Game part end

// Kam part start

app.get("/reset-password", (req, res) => {
  // in landingpage
  //TODO still need to add handler to backend
  res.render("reset-password.ejs");
});

app.get("/forgot-password", (req, res) => {
  //TODO still need to add handler to backend
  res.render("forgot-password.ejs");
});

app.get("/user/profile", (req, res) => {
  //! PopUp- not sure
  //! need more polish
  //TODO need to add to backend
  res.render("profile-customer.ejs");
});

app.get("/cookie-policy", (req, res) => {
  res.render("cookie_policy.ejs");
});

app.get("/sign-in", (req, res) => {
  //TODO need to add to backend
  res.render("sign_in.ejs");
});

app.get("/privacy-pop-up", (req, res) => {
  res.render("privacy_pop_up.ejs");
});

app.get("/store/sign-up", (req, res) => {
  //TODO still need to add handler to backend
  res.render("sign_up_store3.ejs");
});

app.get("/sign-up-", (req, res) => {
  //! PopUp- not sure
  //TODO need to add to backend
  res.render("sign_up_store1.ejs");
});

app.get("/user/sign-up", (req, res) => {
  // post request for signup created
  res.render("sign_up_customer.ejs");
});

app.get("/sign-up", (req, res) => {
  //! PopUp- not sure
  //TODO need to add to backend
  res.render("sign_up.ejs");
});

app.get("/privacy-notice", (req, res) => {
  //! PopUp- not sure
  //TODO need to add to backend
  res.render("privacy_notice_full.ejs");
});

app.get("/userTermCondit", (req, res) => {
  //TODO need to add to backend
  //! PopUp- not sure
  res.render("UserT&C.ejs");
});

app.get("/restaurantTermCondit", (req, res) => {
  //TODO need to add to backend
  //! PopUp - not sure
  res.render("RestaurantT&C.ejs");
});
// Kam part end

// Fing part start
app.get("/payment-card-success", (req, res) => {
  //TODO need to add to backend
  res.render("payment_card_success.ejs");
});

app.get("/payment-card-scan", (req, res) => {
  //TODO need to add to backend
  res.render("payment_card_scan.ejs");
});

app.get("/payment-card-no-account", (req, res) => {
  //TODO need to add to backend
  res.render("payment_card_no_account.ejs");
});

app.get("/order/detail/:orderId", (req, res) => {
  //TODO add injextion to backend
  res.render("order_details.ejs");
});

app.get("/user/my-coupon", (req, res) => {
  //TODO add injextion to backend
  res.render("my_coupon.ejs");
});

app.get("/my-coupon-qr", (req, res) => {
  //! not sure what this is for
  //TODO need to add to backend
  res.render("my_coupon_qr.ejs");
});

app.get("/store/billing-history", (req, res) => {
  //TODO need to add injection with JSON
  res.render("billing_history.ejs");
});

// Fing part end

// P'New part start
app.get("/about-us", (req, res) => {
  res.render("about-meella.ejs");
});

app.get("/contract", (req, res) => {
  //TODO -broken page link
  res.render("contract-for-partner-meella.ejs");
});

app.get("/add-menu-page", (req, res) => {
  //TODO -need to connect POST request
  res.render("create-a-menu-meella.ejs");
});

app.get("/product/edit-menu-page", (req, res) => {
  //TODO -need to connect POST request
  res.render("menu-setting-meella.ejs");
});

app.get("/store/edit-profile-page", (req, res) => {
  //TODO -need to connect POST request
  res.render("edit-profile-meella.ejs");
});

app.get("/store/profile-page", (req, res) => {
  // options of edit, billing , dashboard
  //TODO -need to connect POST request
  res.render("store-profile.ejs");
});
// P'New part end

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}/`);
});
