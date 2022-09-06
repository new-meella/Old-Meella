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

const prisma = new PrismaClient();
const router = express.Router();

// specific product
router.get(
  "json/:productId",

  async (req, res) => {
    const fullRes = await prisma.product.findFirst({
      where: {
        productId: parseInt(req.params.productId),
      },
    });

    res.send(fullRes);
    // res.render("product.ejs", productPageData);
  }
);
router.get(
  "/:productId",
  validate(param("productId").trim().isInt().toInt().notEmpty()),

  async (req, res) => {
    try {
      const fullRes = await prisma.product.findFirst({
        where: { productId: parseInt(req.params.productId) },
        select: {
          storeId: true,
          nameEn: true,
          nameTh: true,
          description: true,
          image: true,
          ogPrice: true,
          meellaPrice: true,
          storeObject: {
            select: {
              coordinate: true,
              subDistrict: true,
              district: true,
              nameEn: true,
              storeId: true,
            },
          },
          productTag: { select: { tagNameEn: true } },
        },
      });
      if (fullRes == null) {
        res.send("404mf");
      } else {
        // to return the "more" product from this store
        const moreProducts = await prisma.product.findMany({
          where: { storeId: fullRes?.storeId },
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
        var temp1 = JSON.stringify(moreProducts);
        var resJson1 = JSON.parse(temp1);
        for (let i = 0; i < resJson1.length; i++) {
          var data = resJson1[i];
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

          delete data.nameEn,
            delete data.nameTh,
            delete data.description,
            delete data.ogPrice,
            delete data.meellaPrice,
            delete data.storeObject;
        }
        console.log("final resJson1:");
        console.log(resJson1);

        // reuturn the single product
        var temp2 = JSON.stringify(fullRes);
        var resJson2 = JSON.parse(temp2);

        console.log("start :");
        console.log(resJson2);
        resJson2.productName = resJson2.nameEn;
        resJson2.productDetail = resJson2.description;
        resJson2.restaurant = resJson2.storeObject.nameEn;

        var productTag = Array();
        for (let i = 0; i < resJson2.productTag.length; i++) {
          productTag.push(resJson2.productTag[i]["tagNameEn"]);
        }
        resJson2.productTag = productTag;

        var storeCoordinate = resJson2.storeObject.coordinate.split(",");
        resJson2.distance =
          distanceStore(
            parseFloat(userCoordinate[0]),
            parseFloat(userCoordinate[1]),
            parseFloat(storeCoordinate[0]),
            parseFloat(storeCoordinate[1])
          ) + " m";

        resJson2.location =
          resJson2.storeObject.subDistrict +
          ", " +
          resJson2.storeObject.district;
        resJson2.averageRating = "";
        (resJson2.reviewCount = resJson2.ratings = [5, 17, 4, 3, 1]),
          (resJson2.day = "Today"),
          (resJson2.openTime = "10:00"),
          (resJson2.closeTime = "20.00"),
          (resJson2.originalPrice = (resJson2.ogPrice / 100).toString());
        resJson2.price = (resJson2.meellaPrice / 100).toString();
        resJson2.productImage = resJson2.image;

        resJson2.comments = [];
        resJson2.moreMenus = resJson1;

        delete resJson2.nameEn;
        delete resJson2.nameTh;
        delete resJson2.description;
        delete resJson2.ogPrice;
        delete resJson2.meellaPrice;
        delete resJson2.storeObject;

        console.log("final resJson2:");
        console.log(resJson2);

        res.render("product.ejs", resJson2);
      }
    } catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
        res.status(400).send(`b.Block of code to handle errors\n ${err}`);
      }
    }
  }
);

router.post(
  "/create",
  validate(
    body("storeId").trim().isInt().toInt().notEmpty(),
    body("quantity").trim().isInt().toInt().notEmpty(),
    body("meellaPrice").trim().isInt().toInt().notEmpty(),
    body("quantity").trim().isInt().toInt().notEmpty(),
    body("ogPrice").trim().isInt().toInt().notEmpty(),

    body("nameEn").trim().isString().notEmpty(),
    body("nameTh").trim().isString().notEmpty(),
    body("description").trim().isString().notEmpty(),
    body("image").trim().isString().notEmpty(),

    body("meellaCut").trim().isInt().optional({ nullable: true }),
    body("gbCut").trim().isInt().optional({ nullable: true }),
    body("storeCut").trim().isInt().optional({ nullable: true })
  ),
  async (req, res) => {
    //! NOTE: Currency is in Stang Baht
    var meellaCut;
    var gbCut;
    var storeCut;
    const Body = req.body;
    try {
      const checkexist = await prisma.product.findFirst({
        where: {
          OR: [
            {
              AND: [{ storeId: req.body.storeId }, { nameEn: req.body.nameEn }],
            },
            {
              AND: [{ storeId: req.body.storeId }, { nameEn: req.body.nameTh }],
            },
          ],
        },
      });

      if (!checkexist) {
        if (
          Body.meellaCut != null &&
          Body.gbCut != null &&
          Body.storeCut != null
        ) {
          meellaCut = Body.meellaCut;
          gbCut = Body.gbCut;
          storeCut = Body.storeCut;
        } else {
          meellaCut = Math.round(meellaPercent * Body.meellaPrice);
          gbCut = Math.round(gbPercent * Body.meellaPrice);
          storeCut = Math.round(storePercent * Body.meellaPrice);
        }

        /* if (storeCut + gbCut + meellaCut != req.body.meellaPrice) {
          res.status(500).send("Arithmetic error. try a different price");
        } else {} */
        const product = await prisma.product.create({
          data: {
            storeId: req.body.storeId,
            nameEn: req.body.nameEn,
            nameTh: req.body.nameTh,
            description: req.body.descriptsion,
            image: req.body.image,
            quantity: req.body.quantity,
            meellaPrice: req.body.meellaPrice,
            ogPrice: req.body.ogPrice,
            pickUpTimeNameEn: req.body.pickUpTimeNameEn,
            meellaCut: parseInt(meellaCut),
            gbCut: parseInt(gbCut),
            storeCut: parseInt(storeCut),
          },
        });
        res.status(202).send(product);
      } else {
        res.status(409).send("the product already exists in this store");
      }
    } catch (err) {
      console.log(`An Error occurred when querying the database\n${err}`);
      res
        .status(400)
        .send(`An Error occurred when querying the database\n${err}`);
    }
  }
);

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

router.put(
  "/edit",
  validate(
    body("productId").trim().isInt().toInt().notEmpty(),
    body("storeId").trim().isInt().toInt().notEmpty(),
    body("quantity").trim().isInt().toInt().notEmpty(),
    body("meellaPrice").trim().isInt().toInt().notEmpty(),
    body("quantity").trim().isInt().toInt().notEmpty(),
    body("ogPrice").trim().isInt().toInt().notEmpty(),

    body("nameEn").trim().isString().notEmpty(),
    body("nameTh").trim().isString().notEmpty(),
    body("description").trim().isString().notEmpty(),
    body("image").trim().isString().notEmpty(),

    body("meellaCut").trim().isInt().optional({ nullable: true }),
    body("gbCut").trim().isInt().optional({ nullable: true }),
    body("storeCut").trim().isInt().optional({ nullable: true })
  ),
  async (req, res) => {
    //! NOTE: Currency is in Stang Baht
    var meellaCut;
    var gbCut;
    var storeCut;
    const Body = req.body;
    try {
      if (
        Body.meellaCut != null &&
        Body.gbCut != null &&
        Body.storeCut != null
      ) {
        meellaCut = Body.meellaCut;
        gbCut = Body.gbCut;
        storeCut = Body.storeCut;
      } else {
        meellaCut = Math.round(meellaPercent * Body.meellaPrice);
        gbCut = Math.round(gbPercent * Body.meellaPrice);
        storeCut = Math.round(storePercent * Body.meellaPrice);
      }

      /* if (storeCut + gbCut + meellaCut != req.body.meellaPrice) {
              res.status(500).send("Arithmetic error. try a different price");
            } else {} */
      const product = await prisma.product.update({
        where: { productId: parseInt(req.body.productId) },

        data: {
          storeId: parseInt(req.body.storeId),
          nameEn: req.body.nameEn,
          nameTh: req.body.nameTh,
          description: req.body.descriptsion,
          image: req.body.image,
          quantity: parseInt(req.body.quantity),
          meellaPrice: parseInt(req.body.meellaPrice),
          ogPrice: parseInt(req.body.ogPrice),
          pickUpTimeNameEn: req.body.pickUpTimeNameEn,
          meellaCut: parseInt(meellaCut),
          gbCut: parseInt(gbCut),
          storeCut: parseInt(storeCut),
        },
      });
      res.status(202).send(product);
    } catch (err) {
      console.log(`An Error occurred when querying the database\n${err}`);
      res
        .status(400)
        .send(`An Error occurred when querying the database\n${err}`);
    }
  }
);

router.get("/add-menu-page", (req, res) => {
  //TODO inject Tags to the page
  res.render("create-a-menu-meella.ejs");
});

router.get("/edit-menu-page", (req, res) => {
  //TODO inject ALL MENU INFO Tags to the page
  res.render("menu-setting-meella.ejs");
});

export default router;
