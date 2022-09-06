import express from "express";
import { body, check, param } from "express-validator";
import { validate } from "../utils";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.post(
  "/create",
  validate(
    body("supportTypeNameEn").trim().isString().notEmpty(),
    body("supportTypeNameTh").trim().isString().notEmpty()
  ),
  async (req, res) => {
    try {
      const { supportTypeNameEn, supportTypeNameTh } = req.body;
      const fullRes = await prisma.supportTag.upsert({
        where: { supportTypeNameEn },
        update: {},
        create: { supportTypeNameEn, supportTypeNameTh },
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

export default router;
