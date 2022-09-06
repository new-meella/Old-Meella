import express from "express";
import { body, check, param } from "express-validator";
import { validate } from "../utils";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get(
  "/:userId/Fav",
  validate(
    param("userId")
      .trim()
      .isInt()
      .withMessage("Must be a integer number")
      .toInt()
  ),
  async (req, res) => {
    const fullRes = await prisma.favTable.findMany({
      where: { userId: parseInt(req.params.userId) },
    });
    res.send(fullRes);
    //get all the store information in json format to prevent multiple requests
  }
);

// show all order history of a user
router.get(
  "/history",
  validate(
    body("userId")
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
          userId: parseInt(req.body.userId),
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

router.post(
  "/create",
  validate(
    body("storeId")
      .trim()
      .isInt()
      .withMessage("Must be a integer number")
      .optional({ nullable: true }),
    body("userName").trim().isString().notEmpty(),
    body("firstName").trim().isString().notEmpty(),
    body("lastName").trim().isString().notEmpty(),
    body("phoneNumber").trim().isMobilePhone("th-TH").notEmpty(),
    body("email").trim().isString().isEmail().notEmpty(),
    body("lang").trim().isString().notEmpty()
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const {
        storeId,
        userName,
        firstName,
        lastName,
        phoneNumber,
        email,
        lang,
      } = Body;
      if (lang === "th" || lang === "en") {
        const checkexist = await prisma.storeOwner.findFirst({
          where: {
            userName,
          },
        });
        if (!checkexist) {
          const fullRes = await prisma.storeOwner.create({
            data: {
              storeId,
              userName,
              firstName,
              lastName,
              phoneNumber,
              email,
              lang,
            },
          });
          res.status(202).send(fullRes);
        } else {
          res.status(400).json({
            errors: [
              {
                msg: "This username is taken",
                param: "userName",
                value: Body.userName,
              },
            ],
          });
        }
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "only 'th' & 'en' are allowed",
              param: "lang",
              value: Body.lang,
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

router.put(
  "/edit",
  validate(
    body("storeId").trim().isInt().withMessage("Must be a integer number"),
    body("storeOwnerId").trim().isInt().withMessage("Must be a integer number"),
    body("userName").trim().isString().notEmpty(),
    body("firstName").trim().isString().notEmpty(),
    body("lastName").trim().isString().notEmpty(),
    body("phoneNumber").trim().isMobilePhone("th-TH").notEmpty(),
    body("email").trim().isString().isEmail().notEmpty(),
    body("lang").trim().isString().notEmpty()
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const {
        storeOwnerId,
        storeId,
        userName,
        firstName,
        lastName,
        phoneNumber,
        email,
        lang,
      } = Body;

      if (lang === "th" || lang === "en") {
        const checkUserName = await prisma.storeOwner.findFirst({
          where: {
            userName,
          },
        });
        if (checkUserName != null || checkUserName == {})
          if (checkUserName?.storeId == Body.storeId) {
            const fullRes = await prisma.storeOwner.create({
              data: {
                storeOwnerId,
                storeId,
                userName,
                firstName,
                lastName,
                phoneNumber,
                email,
                lang,
              },
            });
            res.status(202).send(fullRes);
          } else {
            res.status(400).json({
              errors: [
                {
                  msg: "This username is taken",
                  param: "userName",
                  value: Body.userName,
                },
              ],
            });
          }
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "only 'th' & 'en' are allowed",
              param: "lang",
              value: Body.lang,
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

// GET all favorite store of a given user
router.post(
  "/bankaccount/create",
  validate(
    body("accountNumber")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Cannot be blank"),
    body("accountName")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Cannot be blank"),
    body("branch").trim().isString().notEmpty().withMessage("Cannot be blank"),
    body("bankName")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Cannot be blank"),
    body("storeOwnerId")
      .trim()
      .isInt()
      .toInt()
      .notEmpty()
      .withMessage("Cannot be blank")
  ),
  async (req, res) => {
    try {
      const { accountNumber, accountName, branch, bankName, storeOwnerId } =
        req.body;
      /* const fullRes = await prisma.bankAccount.create({
          data: { accountNumber, accountName, branch, bankName },
        }); */
      const dne = await prisma.storeOwner.findFirst({
        where: {
          bankAccountId: null,
          storeOwnerId: parseInt(storeOwnerId),
        },
      });

      if (dne) {
        const fullRes = await prisma.storeOwner.update({
          where: { storeOwnerId: parseInt(storeOwnerId) },
          data: {
            bankAccountObject: {
              create: { accountNumber, accountName, branch, bankName },
            },
          },
        });

        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "This user already have a bankaccount Or the user does not exist",
              param: "bankAccountObject",
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

//Delete user will not be needed
router.delete(
  "/delete",
  validate(
    body("userId")
      .trim()
      .isInt()
      .toInt()
      .notEmpty()
      .withMessage("Cannot be blank")
  ),
  async (req, res) => {
    try {
      const { userId } = req.body;
      const checkexist = await prisma.user.findFirst({
        where: {
          userId,
        },
      });
      if (checkexist) {
        const fullRes = await prisma.user.delete({
          where: {
            userId,
          },
        });
        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "Unable to find the review",
              param: "userId",
              value: userId,
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

// show all coupon of a user
router.get("/:userId/Coupons", async (req, res) => {
  if (req.body.show == "unused") {
    const fullRes = await prisma.userCoupon.findMany({
      where: {
        userId: parseInt(req.params.userId),
        used: false,
      },
    });
    res.send(fullRes);
  } else if (req.body.show == "used") {
    const fullRes = await prisma.userCoupon.findMany({
      where: {
        userId: parseInt(req.params.userId),
        used: true,
      },
    });
    res.send(fullRes);
  } else {
    const fullRes = await prisma.userCoupon.findMany({
      where: {
        userId: parseInt(req.params.userId),
      },
    });
    res.send(fullRes);
  }
});

export default router;
