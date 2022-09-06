import express from "express";
import { body, check, param } from "express-validator";
import { validate } from "../utils";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.post(
  "/create",
  validate(
    body("statusNameEn")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Cannot be blank")
      .notEmpty(),
    body("statusNameTh")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Cannot be blank")
      .notEmpty()
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const { statusNameEn, statusNameTh } = Body;
      const fullRes = await prisma.status.upsert({
        where: { statusNameEn },
        update: { statusNameEn, statusNameTh },
        create: {
          statusNameEn,
          statusNameTh,
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
export default router;
