import express from "express";
import { body, check, param } from "express-validator";
import { validate } from "../utils";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

//create Coupon
router.post(
  "/create",
  validate(
    body("descriptionEn").trim().isString().optional({ nullable: true }),
    body("descriptionTh").trim().isString().optional({ nullable: true }),
    body("code").trim().isString().optional({ nullable: true }),
    body("budget").trim().isInt().toInt().optional({ nullable: true }),
    body("usesPerCustomerPerDay")
      .trim()
      .isInt()
      .toInt()
      .optional({ nullable: true }),
    body("usesPerDay").trim().isInt().toInt().optional({ nullable: true }),
    body("aptStore").trim().isInt().toInt().optional({ nullable: true }),
    body("aptProduct").trim().isInt().toInt().optional({ nullable: true }),
    body("discountAmount").trim().isInt().toInt().optional({ nullable: true }),
    body("quantity").trim().isInt().toInt().optional({ nullable: true }),

    body("discountPercentage")
      .trim()
      .isFloat()
      .toFloat()
      .optional({ nullable: true })
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      /* const { descriptionEn,
        descriptionTh,
        code,
        budget,
        usesPerCustomerPerDay,
        usesPerDay,
        aptStore,
        aptProduct,
        discountAmount,
        quantity,
        discountPercentage} = Body; */
      const fullRes = await prisma.coupon.create({
        data: Body,
      });
      res.status(202).send(fullRes);
    } catch (err) {
      console.log(`An Error occurred when querying the database\n${err}`);
      res
        .status(400)
        .send(`An Error occurred when querying the database\n${err}`);
    }
  }
);

// Coupon to User relation
router.post(
  "/CouponUser",
  validate(
    body("userId").trim().isInt().toInt().notEmpty(),
    body("couponId").trim().isInt().toInt().notEmpty()
  ),
  async (req, res) => {
    const { userId, couponId } = req.body;
    const checkexist = await prisma.userCoupon.findFirst({
      where: {
        userId,
        couponId,
      },
    });
    if (!checkexist) {
      const fullRes = await prisma.userCoupon.create({
        data: {
          userId,
          couponId,
        },
      });
      res.status(202).send(fullRes);
    } else {
      res.status(409).send("the coupon already exists");
    }
  }
);

export default router;
