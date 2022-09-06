import { Router } from "express";
import { body } from "express-validator";

import admin from "../lib/firebase";
import prisma from "../lib/prisma";
import { validate } from "../utils";

const router = Router();

interface SignUpBody {
  idToken: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface SignInBody {
  idToken: string;
}

async function verifyIdToken(idToken: string) {
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    return decodedIdToken;
  } catch (error) {
    console.log(error);
    return null;
  }
}

router.post(
  "/signUp",
  validate<SignUpBody>(
    body("idToken").isString(),
    body("userName").isString().trim(),
    body("firstName").isString().trim(),
    body("lastName").isString().trim(),
    body("email").isEmail(),
    body("phoneNumber").isMobilePhone("th-TH")
  ),
  async (req, res) => {
    const idToken = req.body.idToken.toString();

    const decodedIdToken = await verifyIdToken(idToken);
    if (!decodedIdToken) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid idtoken" });
    }

    // A user that was not recently signed in is trying to set a session cookie.
    // To guard against ID token theft, require re-authentication.
    if (new Date().getTime() / 1000 - decodedIdToken.auth_time > 5 * 60) {
      return res.status(401).end("Recent sign in required!");
    }

    // TODO: add database function
    const { userName, firstName, lastName, email, phoneNumber } = req.body;
    const firebaseUserId = decodedIdToken.uid;
    const user = {
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      firebaseUserId,
    };

    try {
      const fullRes = await prisma.user.create({
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }

    res.status(201).json({ status: "created" });
  }
);

router.post(
  "/signIn",
  validate<SignInBody>(body("idToken").isString()),
  async (req, res) => {
    // Get the ID token passed
    const idToken: string = req.body.idToken.toString();

    const decodedIdToken = await verifyIdToken(idToken);
    if (!decodedIdToken) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid idtoken" });
    }

    try {
      await prisma.user.findUnique({
        where: { firebaseUserId: decodedIdToken.uid },
        rejectOnNotFound: true,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ status: "error", message: "This user hasn't register yet" });
    }

    // Set session expiration to 1 days.
    const expiresIn = 60 * 60 * 24 * 1 * 1000;
    // Create session cookie and set it.
    const sessionCookie: string = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    const options = { maxAge: expiresIn, httpOnly: true, secure: true };
    res.cookie("session", sessionCookie, options);
    res.json({ status: "success" });
  }
);

export default router;
