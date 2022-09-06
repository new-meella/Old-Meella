import express from "express";
import { body, check, param } from "express-validator";
import { validate } from "../utils";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

// all pickuptimes
router.get("/Pickuptime", async (req, res) => {
  const fullRes = await prisma.pickUpTimeTag.findMany();

  res.send(fullRes);
});

router.post(
  "/create",
  validate(
    body("tagNameEn")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Cannot be blank"),
    body("tagNameTh")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Cannot be blank"),
    body("tagType")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Incorrect Date Format")
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const { tagNameEn, tagNameTh, tagType } = Body;
      const fullRes = await prisma.tag.upsert({
        where: { tagNameEn },
        update: { tagNameTh, tagType },
        create: {
          tagNameEn,
          tagNameTh,
          tagType,
        },
      });
      res.send(fullRes);
    } catch (err) {
      console.log(`An Error occurred when querying the database\n${err}`);
      res
        .status(400)
        .send(`An Error occurred when querying the database\n${err}`);
    }
  }
);

router.post(
  "/StoreTag/create",
  validate(
    body("storeId").trim().isInt().notEmpty(),
    body("tagNameEn").trim().isString().notEmpty()
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const { tagNameEn } = Body;
      const checkexist = await prisma.storeTag.findFirst({
        where: { storeId: parseInt(Body.storeId), tagNameEn },
      });
      if (!checkexist) {
        const fullRes = await prisma.storeTag.create({
          data: { storeId: parseInt(Body.storeId), tagNameEn },
        });
        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "The relation already exist",
              param: ["storeId", "tagNameEn"],
              value: [parseInt(Body.storeId), tagNameEn],
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

//Many-Many ProductTag Link
router.post(
  "/productTag/create",
  validate(
    body("productId").trim().isInt().toInt().notEmpty(),
    body("tagNameEn").trim().isString().notEmpty()
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const { productId, tagNameEn } = Body;
      const checkexist = await prisma.productTag.findFirst({
        where: { productId, tagNameEn },
      });
      if (!checkexist) {
        const fullRes = await prisma.productTag.create({
          data: { productId, tagNameEn },
        });
        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "The relation already exist",
              param: ["productId", "tagNameEn"],
              value: [parseInt(Body.productId), tagNameEn],
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

router.delete(
  "/PickUpTimeTag/delete",
  validate(
    body("pickUpTimeNameEn")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Cannot be blank")
  ),
  async (req, res) => {
    try {
      const { pickUpTimeNameEn } = req.body;
      const checkexist = await prisma.pickUpTimeTag.findFirst({
        where: {
          pickUpTimeNameEn,
        },
      });
      if (checkexist) {
        const fullRes = await prisma.pickUpTimeTag.delete({
          where: {
            pickUpTimeNameEn,
          },
        });
        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "Unable to find the PickUpTimeTag",
              param: "pickUpTimeNameEn",
              value: pickUpTimeNameEn,
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
),
  router.post(
    "/Pickuptime/create",
    validate(
      body("pickUpTimeNameEn")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("Cannot be blank"),
      body("pickUpTime")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("Incorrect Date Format")
    ),
    async (req, res) => {
      try {
        const Body = req.body;
        const { pickUpTimeNameEn, pickUpTime } = Body;
        const checkexist = await prisma.pickUpTimeTag.findFirst({
          where: {
            OR: [{ pickUpTimeNameEn }, { pickUpTime }],
          },
        });

        if (!checkexist) {
          const time = await prisma.pickUpTimeTag.create({
            data: {
              pickUpTimeNameEn,
              pickUpTime,
            },
          });
          res.status(202).send(time);
        } else {
          res.status(409).send("the tag already exists");
        }
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
    body("tagNameEn")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Cannot be blank")
  ),
  async (req, res) => {
    try {
      const { tagNameEn } = req.body;
      const checkexist = await prisma.tag.findFirst({
        where: {
          tagNameEn,
        },
      });
      if (checkexist) {
        const fullRes = await prisma.tag.delete({
          where: {
            tagNameEn,
          },
        });
        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "Unable to find the tag",
              param: "tagNameEn",
              value: tagNameEn,
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

router.delete(
  "/productTag/delete",
  validate(
    body("productId").trim().isInt().toInt().notEmpty(),
    body("tagNameEn").trim().isString().notEmpty()
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const { productId, tagNameEn } = Body;
      const checkexist = await prisma.productTag.findFirst({
        where: {
          productId,
          tagNameEn,
        },
      });
      if (checkexist) {
        const fullRes = await prisma.productTag.deleteMany({
          where: {
            AND: [{ productId, tagNameEn }],
          },
        });
        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "Unable to find the relation that match",
              param: ["productId", "tagNameEn"],
              value: [productId, tagNameEn],
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

router.delete(
  "/storeTag/delete",
  validate(
    body("storeId").trim().isInt().toInt().notEmpty(),
    body("tagNameEn").trim().isString().notEmpty()
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const { storeId, tagNameEn } = Body;
      const checkexist = await prisma.storeTag.findFirst({
        where: {
          storeId,
          tagNameEn,
        },
      });
      if (checkexist) {
        const fullRes = await prisma.storeTag.deleteMany({
          where: {
            AND: [{ storeId, tagNameEn }],
          },
        });
        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "Unable to find the relation that match",
              param: ["storeId", "tagNameEn"],
              value: [storeId, tagNameEn],
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
