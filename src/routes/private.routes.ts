import { Router } from "express";
import { checkUser } from "../middlewares/checkUser.middleware";

const router = Router();

router.use(checkUser);

router.post("/signOut", (req, res) => {
	res.clearCookie("session");
});
