import { Request as ExpressRequest, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";

type Dict<T = any> = Record<any, T>;

interface Request<T extends Dict> extends ExpressRequest {
	body: T;
}

export const validate = <T extends Dict = Dict>(
	...validations: ValidationChain[]
) => {
	return async (req: Request<T>, res: Response, next: NextFunction) => {
		await Promise.all(validations.map((validation) => validation.run(req)));

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}

		res.status(400).json({ errors: errors.array() });
	};
};
