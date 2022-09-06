import express from "express";
import { body, check, param } from "express-validator";
import { validate } from "../utils";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.post(
  "/create",
  validate(
    body("userId")
      .trim()
      .isInt()
      .withMessage("Must be a integer number")
      .notEmpty(),
    body("storeId")
      .trim()
      .isInt()
      .withMessage("Must be a integer number")
      .notEmpty(),
    body("orderId")
      .trim()
      .isInt()
      .withMessage("Must be a integer number")
      .notEmpty(),
    body("rating")
      .trim()
      .isInt()
      .withMessage("Must be a integer number between 1-5")
      .notEmpty(),
    body("title").trim().isString().optional({ nullable: true }),
    body("description").trim().trim().isString().optional({ nullable: true })
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const fullRes = await prisma.review.create({
        data: {
          userId: parseInt(Body.userId), // still need to parse here
          storeId: parseInt(Body.storeId), // express validator dont throw error
          orderId: parseInt(Body.orderId), // when given "1"
          rating: parseInt(Body.rating), // so prsima will freak
          title: Body.title,
          description: Body.description,
        },
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

router.delete(
  "/delete",
  validate(
    body("reviewId")
      .trim()
      .isInt()
      .toInt()
      .notEmpty()
      .withMessage("Cannot be blank")
  ),
  async (req, res) => {
    try {
      const { reviewId } = req.body;
      const checkexist = await prisma.review.findFirst({
        where: {
          reviewId,
        },
      });
      if (checkexist) {
        const fullRes = await prisma.review.delete({
          where: {
            reviewId,
          },
        });
        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "Unable to find the review",
              param: "reviewId",
              value: reviewId,
            },
          ],
        });
      }
    } catch (err) {
      console.log(`An Error occurred when querying the database\n${err}`);
      res
        .status(400)
        .send(`An Error occurred when querying the database\n${err}`);
    }
  }
);

export default router;
