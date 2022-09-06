import express from "express";
import { body, check, param } from "express-validator";
import { validate } from "../utils";
import { PrismaClient, Prisma } from "@prisma/client";
import {
  storePercent,
  distanceStore,
  userCoordinate,
} from "./meellaDependancies";
const prisma = new PrismaClient();
const router = express.Router();

/* function distanceStore(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2); //in metres
} */
// return filted products according to the tag of category and price
router.get(
  "/", //init request for filter

  async (req, res) => {
    try {
      var productRes = await prisma.product.findMany({
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
              location: true,
              subDistrict: true,
              district: true,
            },
          },
        },
      });
      var productResJSON = JSON.parse(JSON.stringify(productRes));
      console.log(productResJSON);

      const max = productResJSON.length;
      //faster way to add location distance
      //calculating the distance between the user and the store
      var storePresent = JSON.parse("{}");
      for (let i = 0; i < productResJSON.length; i++) {
        //calculating the distance between the user and the store
        if (storePresent[productResJSON[i].storeId] === undefined) {
          var storeCoordinate =
            productResJSON[i].storeObject.coordinate.split(",");
          var temp = distanceStore(
            parseFloat(userCoordinate[0]),
            parseFloat(userCoordinate[1]),
            parseFloat(storeCoordinate[0]),
            parseFloat(storeCoordinate[1])
          );
          storePresent[productResJSON[i].storeId] = temp + "m";
        }
      }

      //Adding distance to each product
      var returnProducts = Array();
      // console.log(max);
      // console.log(storePresent);
      for (var i = 0; i < max; i++) {
        if (productResJSON[i].storeId.toString() in storePresent) {
          productResJSON[i]["distance"] =
            storePresent[productResJSON[i].storeId];
          returnProducts.push(productResJSON[i]);
        }
      }
      //changing the format of the productJSON
      for (let i = 0; i < productResJSON.length; i++) {
        var data = productResJSON[i];
        data.productName = data.nameEn;
        data.productDescription = data.description;

        data.location =
          data.storeObject.subDistrict + ", " + data.storeObject.district;
        data.originalPrice = (data.ogPrice / 100).toString();
        data.price = (data.meellaPrice / 100).toString();

        delete data.nameEn;
        delete data.nameTh;
        delete data.description;
        delete data.ogPrice;
        delete data.meellaPrice;
        delete data.storeObject;
        delete data.storeId;
      }
      console.log(productResJSON);

      //END OF PRODUCT

      //extract Categories
      var categoriesRes = await prisma.tag.findMany({
        where: { tagType: { in: ["FoodCategory", "FoodNationality"] } },
        select: { tagNameEn: true },
        orderBy: { tagNameEn: "asc" },
      });
      var categoriesResLIST = Array();
      for (let i = 0; i < categoriesRes.length; i++) {
        categoriesResLIST.push(categoriesRes[i]["tagNameEn"]);
      }

      //extract PickUpTimes
      var PickUpTimesRes = await prisma.pickUpTimeTag.findMany({
        select: { pickUpTimeNameEn: true },
      });
      var PickUpTimesResLIST = Array();
      for (let i = 0; i < PickUpTimesRes.length; i++) {
        PickUpTimesResLIST.push(PickUpTimesRes[i]["pickUpTimeNameEn"]);
      }

      var priceRangeRes = await prisma.product.aggregate({
        _min: { meellaPrice: true },
        _max: { meellaPrice: true },
        _count: { meellaPrice: true },
      });
      //TODO: (future) when caching will need to CHANGE this part
      const fullRes = {
        menus: productResJSON,
        categories: categoriesResLIST,
        pickUpTimes: PickUpTimesResLIST,
        distanceRange: [1, 15, 1],
        priceRange: [priceRangeRes._min, priceRangeRes._max, 50],
      };
      res.render("shop.ejs", fullRes);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
        // The .code property can be accessed in a type-safe manner
        res.status(415).send(`Error: Invaild data type for input`);
      } else {
        res.status(400).send(`b.Block of code to handle errors\n ${err}`);
      }
    }
  }
);
router.get(
  "/product/withresposnse",
  validate(
    body("sortBy").trim().isString().notEmpty(),
    body("orderBy").trim().isString().notEmpty(),
    body("priceLow").trim().isInt().toInt().notEmpty(),
    body("priceHigh").trim().isInt().toInt().notEmpty(),
    body("tag").isArray().optional({ nullable: true })
    //body("pickUpTimeNameEn").isArray().notEmpty()
  ),
  async (req, res) => {
    const Body = req.body;
    const {
      sortBy,
      priceLow,
      priceHigh,
      pickUpTimeHigher,
      pickUpTimeLower,
      tag,
      distance,
      orderBy,
    } = Body;
    try {
      //   console.log(sortBy);

      if (["nameEn", "nameTh", "distance", "price"].includes(sortBy)) {
        if (sortBy === "nameEn" || sortBy === "distance") {
          var fullRes = await prisma.product.findMany({
            where: {
              AND: [
                { meellaPrice: { gte: priceLow } },
                { meellaPrice: { lte: priceHigh } },
                {
                  pickUpTimeTagObject: {
                    pickUpTime: { gte: pickUpTimeLower },
                  },
                },
                {
                  pickUpTimeTagObject: {
                    pickUpTime: { lte: pickUpTimeHigher },
                  },
                },
                {
                  productTag: { some: { tagNameEn: { in: tag } } },
                },
              ],
            },
            orderBy: {
              nameEn: orderBy,
            },
            include: {
              storeObject: { select: { coordinate: true } },
              productTag: { select: { tagNameEn: true } },
            },
          });
        } else if (sortBy === "nameTh") {
          var fullRes = await prisma.product.findMany({
            where: {
              AND: [
                { meellaPrice: { gte: priceLow } },
                { meellaPrice: { lte: priceHigh } },
                {
                  pickUpTimeTagObject: {
                    pickUpTime: { gte: pickUpTimeLower },
                  },
                },
                {
                  pickUpTimeTagObject: {
                    pickUpTime: { lte: pickUpTimeHigher },
                  },
                },
                {
                  productTag: { some: { tagNameEn: { in: tag } } },
                },
              ],
            },
            orderBy: {
              nameTh: orderBy,
            },
            include: {
              storeObject: { select: { coordinate: true } },
              productTag: { select: { tagNameEn: true } },
            },
          });
        } else {
          var fullRes = await prisma.product.findMany({
            where: {
              AND: [
                { meellaPrice: { gte: priceLow } },
                { meellaPrice: { lte: priceHigh } },
                {
                  pickUpTimeTagObject: {
                    pickUpTime: { gte: pickUpTimeLower },
                  },
                },
                {
                  pickUpTimeTagObject: {
                    pickUpTime: { lte: pickUpTimeHigher },
                  },
                },
                {
                  productTag: { some: { tagNameEn: { in: tag } } },
                },
              ],
            },
            orderBy: {
              meellaPrice: orderBy,
            },
            include: {
              storeObject: { select: { coordinate: true } },
              productTag: { select: { tagNameEn: true } },
            },
          });
        }
        //

        //const userCoordinate = Body.userCoordinate.split(",");
        const userCoordinate = "13.736705, 100.533205".split(",");
        var storePresent = JSON.parse("{}");
        for (let i = 0; i < fullRes.length; i++) {
          //calculating the distance between the user and the store
          if (storePresent[fullRes[i].storeId] === undefined) {
            var storeCoordinate = fullRes[i].storeObject.coordinate.split(",");
            var temp = distanceStore(
              parseFloat(userCoordinate[0]),
              parseFloat(userCoordinate[1]),
              parseFloat(storeCoordinate[0]),
              parseFloat(storeCoordinate[1])
            );
            if (temp <= distance) {
              storePresent[fullRes[i].storeId] = temp;
            }
          }
        }
        var returnProducts = Array();
        const max = fullRes.length;
        // console.log(max);
        // console.log(storePresent);

        for (var i = 0; i < max; i++) {
          if (fullRes[i].storeId.toString() in storePresent) {
            fullRes[i]["relDistance"] = storePresent[fullRes[i].storeId];
            returnProducts.push(fullRes[i]);
          }
        }
        /* for (let i = 0; i < fullRes.length; i++) {
          console.log(fullRes[i]);
          fullRes[i]["relDistance"] = storePresent[fullRes[i].storeId];
        }
 */
        res.send(returnProducts);
      } else {
        res.status(400).json({
          errors: [
            {
              msg: "only sortBy 'nameTh', 'nameEn' 'distance' & 'price' are allowed",
              param: "sortBy",
              value: Body.sortBy,
            },
          ],
        });
      }
    } catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
        // The .code property can be accessed in a type-safe manner
        res.status(415).send(`Error: Invaild data type for input`);
      } else {
        res.status(400).send(`b.Block of code to handle errors\n ${err}`);
      }
    }
  }
);

export default router;
