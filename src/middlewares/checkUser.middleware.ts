import { NextFunction, Request, Response } from "express";

import admin from "../lib/firebase";
import prisma from "../lib/prisma";

export const checkUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const sessionCookie = req.cookies.session || "";

	try {
		const decodedIdToken = await admin
			.auth()
			.verifySessionCookie(sessionCookie, true);

		const user = await prisma.user.findUnique({
			where: { firebaseUserId: decodedIdToken.uid },
			rejectOnNotFound: true,
		});

		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ status: 401, message: "Unauthorized" });
	}
};
