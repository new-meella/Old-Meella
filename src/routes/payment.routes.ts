import express from "express";
import { body, check, param } from "express-validator";
import { validate } from "../utils";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

// all payment method
router.get("/", async (req, res) => {
  const fullRes = await prisma.paymentType.findMany();

  res.send(fullRes);
});

// all bank names
router.get("/Banks", async (req, res) => {
  const fullRes = await prisma.bankName.findMany();

  res.json(fullRes);
});

//create bank account
router.post(
  "banks/create",
  validate(
    body("bankName").trim().isString().notEmpty(),
    body("bankNameOfficial").trim().isString().notEmpty()
    //body("pickUpTimeNameEn").isArray().notEmpty()
  ),
  async (req, res) => {
    const Body = req.body;
    const { bankName } = Body;
    try {
      const checkexist = await prisma.bankName.findFirst({
        where: {
          OR: [
            { bankName: req.body.bankName },
            { bankNameOfficial: req.body.bankNameOfficial },
          ],
        },
      });

      if (!checkexist) {
        const fullRes = await prisma.bankName.create({
          data: {
            bankName: req.body.bankName,
            bankNameOfficial: req.body.bankNameOfficial,
          },
        });
        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "BankName already exist",
              param: "bankName",
              value: bankName,
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
// create payment method
router.post(
  "/PaymentType/create",
  validate(
    body("paymentName")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Cannot be blank")
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const { paymentName } = Body;
      const checkexist = await prisma.paymentType.findFirst({
        where: {
          paymentName,
        },
      });
      if (!checkexist) {
        const paymenttype = await prisma.paymentType.create({
          data: {
            paymentName,
          },
        });
        var message = `${req.body.paymentTypeName} created at id:${paymenttype.paymentName} `;
        res.status(201).json(paymenttype);
      } else {
        res.status(409).send("The payment method already exist");
      }
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

router.delete(
  "/bankaccount/delete",
  validate(
    body("storeOwnerId")
      .trim()
      .isInt()
      .toInt()
      .notEmpty()
      .withMessage("Cannot be blank")
  ),
  async (req, res) => {
    try {
      const checkexist = await prisma.storeOwner.findFirst({
        where: {
          storeOwnerId: parseInt(req.body.storeOwnerId),
          NOT: { bankAccountObject: null },
        },
      });
      if (checkexist) {
        const fullRes = await prisma.storeOwner.update({
          where: { storeOwnerId: parseInt(req.body.storeOwnerId) },
          data: {
            bankAccountObject: { delete: true },
          },
        });
        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "Cant find bank account or user to delete",
              param: "storeOwnerId",
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
