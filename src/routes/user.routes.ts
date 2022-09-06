import express from "express";
import { body, check, param } from "express-validator";
import { validate } from "../utils";
import { PrismaClient, Prisma } from "@prisma/client";
import { meellaPercent } from "./meellaDependancies";
import { LOADIPHLPAPI } from "dns";
const prisma = new PrismaClient();
const router = express.Router();

router.use(express.static("public")); // for static
// TODO need to add customer profile edit

const shortLongMonth = {
  Jan: "January",
  Feb: "Febuary",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};
const numToMonth = {
  "01": "January",
  "02": "Febuary",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

// GET all user
router.get("/all", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
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
        select: {
          totalFinalPrice: true,
          createdAt: true,
          storeObject: { select: { nameEn: true, nameTh: true } },
        },
      });
      console.log(fullRes);

      //create a json object from prisma object
      var temp1 = JSON.stringify(fullRes);
      var resJson = JSON.parse(temp1);

      //change keys to fit the ejs file
      for (let i = 0; i < resJson.length; i++) {
        var data = resJson[i];
        data.restaurantName = data.storeObject.nameEn;
        const cleanDate = data.createdAt.split("-");
        data.date = "".concat(
          cleanDate[2].slice(0, 2),
          "/",
          cleanDate[1],
          "/",
          cleanDate[0]
        );
        data.price = (data.totalFinalPrice / 100).toString();
        data.image = "img/order_hist.png";
        data.menuName = "this is just an order";
        delete data.storeObject;
        delete data.totalFinalPrice;
        delete data.createdAt;
      }

      // sort order by named month with json
      var firstLoop = JSON.parse("{}");
      for (let i = 0; i < resJson.length; i++) {
        console.log(resJson[i]);

        var timestamp = resJson[i].date.toString();
        console.log(timestamp);
        const monthNum = timestamp.slice(3, 5);

        if (firstLoop[monthNum] != undefined) {
          firstLoop[monthNum].push(resJson[i]);
        } else {
          firstLoop[monthNum] = [];
          firstLoop[monthNum].push(resJson[i]);
        }
      }

      // construct the response json
      var orderHistories = Array();
      var temp = Array(firstLoop);
      for (let key of Object.keys(firstLoop)) {
        const keyMonth = key as string;

        orderHistories.push({
          month: numToMonth[keyMonth as keyof typeof numToMonth],
          orders: firstLoop[key],
        });
      }
      res.render("order_history.ejs", { orderHistories });
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

// GET a user info
router.get("/:userId", async (req, res) => {
  const fullRes = await prisma.user.findFirst({
    where: {
      userId: parseInt(req.params.userId),
    },
    select: {
      userId: true,
      userName: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      email: true,
      meellaPoints: true,
    },
  });

  res.send(fullRes);
});

//Create an user
router.post("/create", async (req, res) => {
  try {
    if (
      req.body.hasOwnProperty(
        "userName",
        "firstName",
        "lastName",
        "phoneNumber",
        "email",
        "firebaseUserId"
      )
    ) {
      const checkexist = await prisma.user.findFirst({
        where: {
          OR: [
            { userName: req.body.userName },
            { email: req.body.email },
            { phoneNumber: req.body.phoneNumber },
          ],
        },
      });

      if (!checkexist) {
        const fullRes = await prisma.user.create({
          data: {
            lang: req.body.lang, // "en" or "th"
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            firebaseUserId: req.body.firebaseUserId,
          },
        });

        res.status(202).send(fullRes);
      } else {
        var response = JSON.parse("{}");
        if (checkexist.userName == req.body.userName) {
          response["userName"] = "Taken";
        }
        if (checkexist.email == req.body.email) {
          response["email"] = "Taken";
        }
        if (checkexist.phoneNumber == req.body.phoneNumber) {
          response["phoneNumber"] = "Taken";
        }
        res.status(409).send(response);
      }
    } else {
      res.status(409).send("keys are missing for user");
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientValidationError) {
      // The .code property can be accessed in a type-safe manner
      res.status(415).send(`Error: Invaild data type for input`);
    } else {
      res.status(400).send(`Block of code to handle errors\n ${err}`);
    }
  }
});

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

router.get("/sign-up", (req, res) => {
  res.render("sign_up_customer.ejs");
});

router.get("/profile", (req, res) => {
  res.render("profile-customer.ejs");
});

router.get("/user/my-coupon", (req, res) => {
  res.render("my_coupon.ejs");
});

export default router;
