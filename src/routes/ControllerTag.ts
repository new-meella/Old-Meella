import express from "express";
import { body, check, param } from "express-validator";
import { validate } from "../utils";
import { PrismaClient, Prisma } from "@prisma/client";
import { ALL } from "dns";
const prisma = new PrismaClient();
const router = express.Router();

exports.createTag = (req, res) => {
  try {
    const Body = req.body;
    const { tagNameEn, tagNameTh, tagType } = Body;
    const fullRes = prisma.tag.upsert({
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
};

export default exports;
