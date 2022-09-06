import express from "express";
import { body, check, param } from "express-validator";
import { validate } from "../utils";
import { PrismaClient, Prisma } from "@prisma/client";

import {
  meellaPercent,
  gbPercent,
  storePercent,
  distanceStore,
  userCoordinate,
  DEVMODE,
} from "./meellaDependancies";
import { LOADIPHLPAPI } from "dns";
const prisma = new PrismaClient();
const router = express.Router();

router.use(express.static("public")); // for static
// TODO need to add customer profile edit
router.get("/", async (req, res) => {
  try {
    const fullRes = await prisma.product.findMany({
      take: 3,
      select: {
        nameEn: true,
        nameTh: true,
        description: true,
        image: true,
        ogPrice: true,
        meellaPrice: true,
        storeObject: {
          select: {
            coordinate: true,
            location: true,
            subDistrict: true,
            district: true,
          },
        },
      },
    });
    var temp1 = JSON.stringify(fullRes);
    var resJson = JSON.parse(temp1);
    for (let i = 0; i < resJson.length; i++) {
      var data = resJson[i];
      data.productName = data.nameEn;
      data.productDescription = data.description;
      var storeCoordinate = data.storeObject.coordinate.split(",");
      data.distance =
        distanceStore(
          parseFloat(userCoordinate[0]),
          parseFloat(userCoordinate[1]),
          parseFloat(storeCoordinate[0]),
          parseFloat(storeCoordinate[1])
        ) + " m";

      data.location =
        data.storeObject.subDistrict + ", " + data.storeObject.district;
      data.originalPrice = (data.ogPrice / 100).toString();
      data.price = (data.meellaPrice / 100).toString();
      data.image = "img/donut.png";

      delete data.nameEn,
        delete data.nameTh,
        delete data.description,
        delete data.ogPrice,
        delete data.meellaPrice,
        delete data.storeObject;
    }
    console.log(resJson);
    const menus = { menus: resJson };
    res.render("index.ejs", menus);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientValidationError) {
      // The .code property can be accessed in a type-safe manner
      res.status(415).send(`Error: Invaild data type for input`);
    } else {
      res.status(400).send(`b.Block of code to handle errors\n ${err}`);
    }
  }
});

router.get("/about-us", (req, res) => {
  res.render("about-meella.ejs");
});

router.get("/reset-password", (req, res) => {
  res.render("reset-password.ejs");
});
router.get("/forgot-password", (req, res) => {
  res.render("forgot-password.ejs");
});

router.get("/cookie-policy", (req, res) => {
  res.render("cookie_policy.ejs");
});

router.get("/privacy-pop-up", (req, res) => {
  res.render("privacy_pop_up.ejs");
});
router.get("/contract", (req, res) => {
  //TODO broken page link
  res.render("contract-for-partner-meella.ejs");
});

export default router;
