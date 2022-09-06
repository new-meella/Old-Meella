import express from "express";
import { body, check, param } from "express-validator";
import { validate } from "../utils";
import { PrismaClient, Prisma } from "@prisma/client";
import {
  meellaPercent,
  gbPercent,
  storePercent,
  DEVMODE,
} from "./meellaDependancies";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/detail/:orderId", async (req, res) => {
  try {
    const fullRes = await prisma.order.findFirst({
      where: {
        orderId: parseInt(req.params.orderId),
      },
    });
    // res.send(fullRes);
    res.render("order_details.ejs");
  } catch (err) {
    if (err instanceof Prisma.PrismaClientValidationError) {
      // The .code property can be accessed in a type-safe manner
      res.status(415).send(`Error: Invaild data type for input`);
    } else {
      res.status(400).send(`Block of code to handle errors\n ${err}`);
    }
  }
});
//! NEED FIXING // INVALID PRODUCT BRICK THE SERVER
router.post(
  "/create",
  validate(
    body("storeId").trim().isInt().toInt().notEmpty(),
    body("userId").trim().isInt().toInt().notEmpty(),
    body("couponId").trim().isInt().toInt().optional({ nullable: true }),
    body("pickUpTimeNameEn").trim().isString().notEmpty(),
    body("orderNote").trim().isString().optional({ nullable: true }),
    body("paymentName").trim().isString().notEmpty(),
    body("product").isArray().notEmpty()
  ),
  async (req, res) => {
    var numItems = 0;
    var subTotal = 0;
    var totalFinalPrice = 0; // if no discount then totalFinalPrice = subTotal
    var totalOriginalPrice = 0;
    var totalGbCut = 0;
    var totalStoreCut = 0;
    var totalMeellaCut = 0;
    var d = new Date();
    const Body = req.body;
    const { storeId, userId, pickUpTimeNameEn, orderNote, paymentName } =
      req.body;

    var productQuantity = JSON.parse("{}");
    var allqueryproduct = []; //! CHECK HERE
    // console.log(1);

    for (let x in req.body.product) {
      allqueryproduct.push(req.body.product[x].productId); //! CHECK HERE
    }
    // console.log(12);

    const allproductinfo = await prisma.product.findMany({
      where: {
        productId: { in: allqueryproduct },
      },
    });
    if (Body.product.length != allproductinfo.length) {
      res.status(400).json({
        errors: [
          {
            msg: `Some product is not found in the database. Check the productId for storeId ${Body.storeId}`,
            param: "productId",
            value: Body.product,
          },
        ],
      });
    } else {
      for (var i = 0; i < allproductinfo.length; i++) {
        var tempKey = allproductinfo[i].productId.toString();

        productQuantity[tempKey] = [
          allproductinfo[i].ogPrice,
          allproductinfo[i].meellaPrice,
          allproductinfo[i].gbCut,
          allproductinfo[i].meellaCut,
          allproductinfo[i].storeCut,
        ];
      }
      //console.log(allproductinfo);
      var raw_productId = [];
      for (let x in req.body.product) {
        //! CHECK HERE adter implicit
        raw_productId.push(req.body.product[x].productId);
        numItems += req.body.product[x].quantity;
        totalOriginalPrice +=
          req.body.product[x].quantity *
          parseInt(
            productQuantity[req.body.product[x].productId.toString()][0]
          );
        subTotal +=
          req.body.product[x].quantity *
          parseInt(
            productQuantity[req.body.product[x].productId.toString()][1]
          );
        totalGbCut +=
          req.body.product[x].quantity *
          parseInt(
            productQuantity[req.body.product[x].productId.toString()][2]
          );
        totalMeellaCut +=
          req.body.product[x].quantity *
          parseInt(
            productQuantity[req.body.product[x].productId.toString()][3]
          );
        totalStoreCut +=
          req.body.product[x].quantity *
          parseInt(
            productQuantity[req.body.product[x].productId.toString()][4]
          );
      }
      //   console.log(123);

      if (req.body.couponId != null) {
        const fullcoupon = await prisma.coupon.findFirst({
          where: {
            couponId: parseInt(Body.couponId),
          },
        });
        if (fullcoupon?.expiredAt != null && fullcoupon.expiredAt > d) {
          if (fullcoupon.discountAmount != null) {
            totalFinalPrice = subTotal - fullcoupon.discountAmount;
            if (totalFinalPrice < 0) {
              totalFinalPrice = 0;
            }
          } else if (fullcoupon.discountPercentage != null) {
            totalFinalPrice = subTotal * (1 - fullcoupon.discountPercentage);
          }

          totalGbCut = Math.round(totalFinalPrice * gbPercent);
          totalStoreCut = Math.round(totalFinalPrice * storePercent);
          totalMeellaCut = Math.round(totalFinalPrice * meellaPercent);
          const couponResponse = "Coupon accepted";
        } else {
          const couponResponse = "Coupon expired";
        }
      }
      //   console.log(1234);

      try {
        const fullRes = await prisma.order.create({
          data: {
            statusNameEn: "Pending",
            paymentName,
            userId,
            storeId,
            pickUpTimeNameEn,
            orderNote,
            numItems: numItems,
            totalPrice: subTotal,
            totalOriginalPrice: totalOriginalPrice,
            totalFinalPrice: totalFinalPrice,
            totalGbCut: totalGbCut,
            totalStoreCut: totalStoreCut,
            totalMeellaCut: totalMeellaCut,
            orderProduct: {
              create: req.body.product,
            },
          },
        });
        /*         const incrementproduct = await prisma.product.update({
      }) */
        res.send(
          `OrderRecieved \n \t subtotal:${subTotal} \n \t numItems:${numItems} \n \t OGPrice:${totalOriginalPrice}`
        );
      } catch (err) {
        console.log(d, " -  order fucked up laa");
        res.status(400).json({
          errors: [
            {
              msg: err,
            },
          ],
        });
        console.log(err);
      }
      /* if (DEVMODE) {
        console.log("new order created");
      } */
    }
  }
);
4;
export default router;
