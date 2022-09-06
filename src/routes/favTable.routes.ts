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

router.get(
  "/",
  validate(body("userId").trim().isInt().toInt().notEmpty()),
  async (req, res) => {
    try {
      const Body = req.body;
      const { userId } = Body;

      const fullRes = await prisma.favTable.findMany({
        where: { userId },
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

router.post(
  "/create",
  validate(
    body("storeId").trim().isInt().toInt().notEmpty(),
    body("userId").trim().isInt().toInt().notEmpty()
  ),
  async (req, res) => {
    try {
      const Body = req.body;

      //const { storeId, userId }= Body;
      const checkexist = await prisma.favTable.findFirst({
        where: {
          storeId: Body.storeId,
          userId: Body.userId,
        },
      });
      if (!checkexist) {
        const fullRes = await prisma.favTable.create({
          data: Body,
        });
        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "The relation already exist",
              param: ["storeId", "userId"],
              value: [Body.storeId, Body.userId],
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
  "/delete",
  validate(
    body("storeId").trim().isInt().toInt().notEmpty(),
    body("userId").trim().isInt().toInt().notEmpty()
  ),
  async (req, res) => {
    try {
      const Body = req.body;
      const { storeId, userId } = Body;
      const checkexist = await prisma.favTable.findFirst({
        where: {
          storeId,
          userId,
        },
      });
      if (checkexist) {
        const fullRes = await prisma.favTable.deleteMany({
          where: {
            AND: [{ storeId: Body.storeId }, { userId: Body.userId }],
          },
        });
        res.status(202).send(fullRes);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "Unable to find the relation that match",
              param: ["storeId", "userId"],
              value: [storeId, userId],
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
