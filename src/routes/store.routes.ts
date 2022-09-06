import express from "express";
import { body, check, param } from "express-validator";
import { validate } from "../utils";
import { PrismaClient, Prisma } from "@prisma/client";
import { PassThrough } from "stream";
import { cleanDate } from "./meellaDependancies";
const prisma = new PrismaClient();
const router = express.Router();
router.use(express.static("public"));
// GET : all order of store

router.get(
  "/history",
  validate(
    body("storeId")
      .trim()
      .isInt()
      .toInt()
      .notEmpty()
      .withMessage("Cannot be blank"),
    body("orderBy").trim().isString().notEmpty().withMessage("Cannot be blank")
  ),
  async (req, res) => {
    try {
      const fullRes = await prisma.order.findMany({
        where: {
          storeId: parseInt(req.body.storeId),
        },
        orderBy: {
          createdAt: req.body.orderBy,
        },
      });
      res.send(fullRes);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
        // The .code property can be accessed in a type-safe manner
        res.status(415).send(`Error: Invaild data type for input`);
      } else {
        res.status(400).send(`Block of code to handle errors\n ${err}`);
      }
    }
  }
);

router.get(
  "/dashboard/:storeId",
  validate(
    param("storeId").isInt().withMessage("Must be a integer number").notEmpty(),
    body("CreatedAtLower").isString().optional({ nullable: true }),
    body("CreatedAtHigher").isString().optional({ nullable: true })
  ),
  async (req, res) => {
    //!WORKING
    //TODO: Much sold, much earned, current coupon, not picked up order, Best Seller by Quantity and Total Earned
    try {
      if (req.body != null) {
        const Body = req.body;
        const { CreatedAtLower, CreatedAtHigher } = Body;
        /* 
        const SumRes = await prisma.order.aggregate({
          // GET: Much sold & Much Earned

          where: {
            storeId: parseInt(req.params.storeId),
            AND: [
              { createdAt: { gte: CreatedAtLower } },
              { createdAt: { lte: CreatedAtHigher } },
            ],
          },
          _sum: { totalStoreCut: true, numItems: true },
        });
        //TODO: fix the coupon layout
        const aptCoupons = await prisma.coupon.findMany({
          // GET : Current Coupon
          where: {
            OR: [
              { aptStore: parseInt(req.params.storeId) },
              { aptStore: null },
            ],
          },
        });
        const bestSellerRes = await prisma.order.findMany({
          where: {
            storeId: parseInt(req.params.storeId),
            AND: [
              { createdAt: { gte: CreatedAtLower } },
              { createdAt: { lte: CreatedAtHigher } },
            ],
          },
          take: 10,
        }); // GET : Current Coupon
        const halfRes = await prisma.order.findMany({
          where: {
            storeId: parseInt(req.params.storeId),
            AND: [
              { createdAt: { gte: CreatedAtLower } },
              { createdAt: { lte: CreatedAtHigher } },
            ],
          },
          take: 10,
        }); // GET : Current Coupon */
        const topSalesList = await prisma.order.findMany({
          where: {
            statusNameEn: "Pending",
          },
        }); // GET : Current Coupon
        const currentOrderList = await prisma.order.findMany({
          where: {
            statusNameEn: "Pending",
          },
          select: {
            createdAt: true,
            orderId: true,
            pickUpTimeNameEn: true,
          },
        }); // GET : Current Coupon
        const orderHistoryList = await prisma.order.findMany({
          where: {
            statusNameEn: "Completed",
          },
          select: {
            createdAt: true,
            orderId: true,
            totalFinalPrice: true,
          },
        }); // GET : Current Coupon

        // Cleaning response
        var temp1 = JSON.stringify(currentOrderList);
        var currentOrderListJson = JSON.parse(temp1);
        for (let i = 0; i < currentOrderListJson.length; i++) {
          currentOrderListJson[i].date = cleanDate(
            currentOrderListJson[i].createdAt
          );
          currentOrderListJson[i].name =
            "food" + currentOrderListJson[i].orderId;
          currentOrderListJson[i].pickUpTime =
            currentOrderListJson[i].pickUpTimeNameEn;
          delete currentOrderListJson.createdAt;
          delete currentOrderListJson.pickUpTimeNameEn;
        }
        var temp = JSON.stringify(orderHistoryList);
        var orderHistoryListJson = JSON.parse(temp);
        for (let i = 0; i < orderHistoryListJson.length; i++) {
          orderHistoryListJson[i].date = cleanDate(
            orderHistoryListJson[i].createdAt
          );
          orderHistoryListJson[i].orderName =
            "food" + orderHistoryListJson[i].orderId;
          orderHistoryListJson[i].price =
            orderHistoryListJson[i].totalFinalPrice;
          delete orderHistoryListJson.createdAt;
          delete orderHistoryListJson.totalFinalPrice;
        }

        const fullRes = {
          currentOrderList: currentOrderListJson,
          topSalesList: [
            { productName: "Choco donut neED FXIING", numberSold: 123123 },
          ],
          orderHistoryList: orderHistoryListJson,
        };
        // const fullRes = { ...halfRes, ...SumRes, aptCoupons };
        /* res.send(fullRes); // req.params.storeId

        /* const generateMenu1 = () => {
          return {
            name: "Choco donut ",
            orderId: 1,
            pickUpTime: "After 19:00",
            date: "12/02/2022",
          };
        };

        const currentOrderList = [];
        for (let i = 0; i < 4; i++) {
          currentOrderList.push(generateMenu1());
        }

        //i
        const generateMenu2 = () => {
          return {
            productName: "Choco donut",
            numberSold: 123123,
          };
        };

        const topSalesList = [];
        for (let i = 0; i < 11; i++) {
          topSalesList.push(generateMenu2());
        }
        //

        const generateMenu3 = () => {
          return {
            date: "10/02/2022",
            orderName: "Order Choco donut ",
            price: 300,
          };
        };
        const orderHistoryList = [];
        for (let i = 0; i < 11; i++) {
          orderHistoryList.push(generateMenu3());
        }

        //
        const storeDashBoardData = {
          topSalesList: topSalesList,
          currentOrderList: currentOrderList,
          orderHistoryList: orderHistoryList,
        }; */
        // res.send(fullRes);
        res.render("store_dashboard.ejs", fullRes);
      } else {
        const Body = req.body;
        const { CreatedAtLower, CreatedAtHigher } = Body;

        const SumRes = await prisma.order.aggregate({
          // GET: Much sold & Much Earned

          where: {
            storeId: parseInt(req.params.storeId),
          },
          _sum: { totalStoreCut: true, numItems: true },
        });
        //TODO: fix the coupon layout
        const aptCoupons = await prisma.coupon.findMany({
          // GET : Current Coupon
          where: {
            OR: [
              { aptStore: parseInt(req.params.storeId) },
              { aptStore: null },
            ],
          },
        });
        const bestSellerRes = await prisma.order.findMany({
          where: {
            storeId: parseInt(req.params.storeId),
          },
          take: 10,
        }); // GET : Current Coupon
        const halfRes = await prisma.order.findMany({
          where: {
            storeId: parseInt(req.params.storeId),
          },
          take: 10,
        }); // GET : Current Coupon
        const topSalesList = await prisma.order.findMany({
          where: {
            statusNameEn: "Pending",
          },
        }); // GET : Current Coupon
        const currentOrderList = await prisma.order.findMany({
          where: {
            statusNameEn: "Pending",
          },
        }); // GET : Current Coupon
        const orderHistoryList = await prisma.order.findMany({
          where: {
            statusNameEn: "Completed",
          },
        }); // GET : Current Coupon
        const fullRes = { currentOrderList, topSalesList, orderHistoryList };
        // const fullRes = { ...halfRes, ...SumRes, aptCoupons };
        /* res.send(fullRes); // req.params.storeId */
        const storeDashBoardData = require("../../test_data/storeDashBoard");
        res.render("store_dashboard.ejs", storeDashBoardData);
      }
    } catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
        // The .code property can be accessed in a type-safe manner
        res.status(415).send(`Error: Invaild data type for input${err}`);
      } else {
        res.status(400).send(`Block of code to handle errors\n ${err}`);
      }
    }
  }
);

// GET a store info
router.get("/:storeId", async (req, res) => {
  const fullRes = await prisma.store.findFirst({
    where: {
      storeId: parseInt(req.params.storeId),
      // TODO add include later
    },
  });
  res.send(fullRes); // req.params.storeId
});

// GET a store all product
router.get("/:storeId/Products", async (req, res) => {
  const fullRes = await prisma.product.findMany({
    where: {
      storeId: parseInt(req.params.storeId),
      // TODO add include later
    },
  });
  res.send(fullRes); // req.params.storeId
});

// GET : return all store
router.get("/", async (req, res) => {
  const fullRes = await prisma.store.findMany({});
  res.send(fullRes); // req.params.storeId
});

// POST : create  a store
router.post(
  "/create",
  validate(
    body("storeOwnerId")
      .isInt()
      .withMessage("Must be a integer number")
      .notEmpty(),
    body("phoneNumber")
      .isMobilePhone("th-TH")
      .withMessage("Must be a valid phone number")
      .notEmpty(),

    body("coordinate").isString().notEmpty(),
    body("foodType").isString().notEmpty(),
    body("nameEn").isString().notEmpty(),
    body("nameTh").isString().notEmpty(),
    body("aboutUs").isString().notEmpty(),
    body("location").isString().notEmpty(),
    body("image").isString().notEmpty(),
    body("district").isString().notEmpty(),
    body("province").isString().notEmpty(),
    body("subDistrict").isString().notEmpty(),
    body("coordinate").isString().notEmpty()
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const {
        nameEn,
        nameTh,
        phoneNumber,
        foodType,
        aboutUs,
        location,
        image,
        district,
        province,
        subDistrict,
        coordinate,
      } = Body;
      {
        const checknameEn = await prisma.store.findFirst({
          where: {
            nameEn,
          },
        });
        const checknameTh = await prisma.store.findFirst({
          where: {
            nameTh,
          },
        });
        if (!checknameEn && !checknameTh) {
          const store = await prisma.store.create({
            data: {
              storeOwnerId: parseInt(Body.storeOwnerId),
              nameEn,
              nameTh,
              phoneNumber,
              foodType,
              aboutUs,
              image,
              location,
              district,
              province,
              subDistrict,
              coordinate,
            },
          });
          console.log("A store is created");
          res.send(store);
        } else if (checknameEn || checknameTh) {
          res.status(409).send("Both names already exists");
        } else if (checknameEn) {
          res.status(409).send("The English name already exists");
        } else {
          res.status(409).send("The Thai name already exists");
        }
      }
    } catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
        // The .code property can be accessed in a type-safe manner
        res.status(415).send(`Error: Invaild data type for input${err}`);
      } else {
        res.status(400).send(`Block of code to handle errors\n ${err}`);
      }
    }
  }
);

// PUT : edit a store
router.put(
  "/edit",
  validate(
    body("storeId").trim().isInt().toInt().notEmpty(),
    body("storeOwnerId")
      .isInt()
      .toInt()
      .withMessage("Must be a integer number")
      .notEmpty(),
    body("phoneNumber")
      .isMobilePhone("th-TH")
      .withMessage("Must be a valid phone number")
      .notEmpty(),

    body("foodType").isString().notEmpty(),
    body("nameEn").isString().notEmpty(),
    body("nameTh").isString().notEmpty(),
    body("aboutUs").isString().notEmpty(),
    body("location").isString().notEmpty(),
    body("image").isString().notEmpty(),
    body("district").isString().notEmpty(),
    body("province").isString().notEmpty(),
    body("subDistrict").isString().notEmpty()
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const { nameEn, nameTh, phoneNumber, foodType, aboutUs, location } = Body;
      {
        const checknameEn = await prisma.store.findFirst({
          where: {
            nameEn,
          },
        });
        const checknameTh = await prisma.store.findFirst({
          where: {
            nameTh,
          },
        });

        var sameNameEn = true;
        var sameNameTh = true;
        if (checknameEn != null || checknameEn == {})
          if (checknameEn?.storeId == Body.storeId) {
            sameNameEn = true;
          } else {
            sameNameEn = false;
          }

        if (checknameTh != null || checknameTh == {})
          if (checknameTh?.storeId == Body.storeId) {
            sameNameTh = true;
          } else {
            sameNameTh = false;
          }
        if (!checknameEn && !checknameTh && sameNameTh && sameNameEn) {
          const store = await prisma.store.update({
            where: { storeId: parseInt(Body.storeId) },

            data: {
              storeOwnerId: parseInt(Body.storeOwnerId),
              nameEn,
              nameTh,
              phoneNumber,
              foodType,
              aboutUs,
              location,
            },
          });
          console.log("A store is created");
          res.send(store);
        } else if (!sameNameTh || !sameNameEn) {
          res.status(400).json({
            errors: [
              {
                msg: "Both English and Thai name is being used by other store",
                param: ["nameEn", "nameTh"],
                value: [nameEn, nameTh],
              },
            ],
          });
        } else if (sameNameEn) {
          res.status(400).json({
            errors: [
              {
                msg: "Both English name is being used by other store",
                param: "nameEn",
                value: nameEn,
              },
            ],
          });
        } else {
          res.status(400).json({
            errors: [
              {
                msg: "Both Thai name is being used by other store",
                param: "nameTh",
                value: nameTh,
              },
            ],
          });
        }
      }
    } catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
        // The .code property can be accessed in a type-safe manner
        res.status(415).send(`Error: Invaild data type  input${err}`);
      } else {
        res.status(400).send(`Block of code to handle errors\n ${err}`);
      }
    }
  }
);

router.get("/store/edit-profile-page", (req, res) => {
  //TODO inject ALL STORE INFO to the page
  res.render("edit-profile-meella.ejs");
});

router.get("/profile", (req, res) => {
  // options of edit, billing , dashboard
  //TODO inject ALL MENU INFO Tags to the page
  //TODO inject, Name, location , numMenu, Review, Tag [STOREBLOCK]
});

router.get("/billing-history", (req, res) => {
  //TODO need to add to backend
  res.render("billing_history.ejs");
});

router.get("/sign-up", (req, res) => {
  //TODO need to add to backend
  res.render("sign_up_store3.ejs");
});
router.get("*", async (req, res) => {
  res.status(404).send("status 404, page not found");
});
router.post("*", async (req, res) => {
  res.status(404).send("status 404, page not found");
});
router.put("*", async (req, res) => {
  res.status(404).send("status 404, page not found");
});
router.delete("*", async (req, res) => {
  res.status(404).send("status 404, page not found");
});

export default router;
