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
      .toInt()
      .withMessage("Must be a integer number")
      .notEmpty(),
    body("orderId")
      .trim()
      .isInt()
      .toInt()
      .withMessage("Must be a integer number")
      .notEmpty(),
    body("email").trim().isEmail().withMessage("Invalid Email").notEmpty(),
    body("supportTypeNameEn")
      .trim()
      .isString()
      .withMessage("Cannot be blank")
      .notEmpty(),
    body("title").trim().isString().withMessage("Cannot be blank").notEmpty(),
    body("description")
      .trim()
      .isString()
      .withMessage("Cannot be blank")
      .notEmpty()
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const { email, supportTypeNameEn, title, description, orderId, userId } =
        Body;

      const checkexist = await prisma.ticketSupport.findFirst({
        where: {
          OR: [{ orderId }],
        },
      });

      if (!checkexist) {
        const fullRes = await prisma.ticketSupport.create({
          data: {
            userId,
            orderId,
            email,
            supportTypeNameEn,
            title,
            description,
            statusNameEn: "Open", // status must be in the database otherwise dead
          },
        });
        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "A tick for this order already exist",
              param: "orderId",
              value: Body.orderId,
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
