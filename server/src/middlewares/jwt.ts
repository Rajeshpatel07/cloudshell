import { NextFunction, Response, Request } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken";

interface payload {
	ID: string;
	iat: number;
}

const jwtVerify = async (req: Request, res: Response, next: NextFunction) => {
	const accessToken = req.cookies.acToken;
	if (!accessToken) return res.status(403).json({ err: "invalid accessToken" });

	const accessSecret = process.env.JWT_ACCESS_SECRET || " ";

	verify(accessToken, accessSecret, (err: JsonWebTokenError | unknown, payload: payload | unknown) => {
		if (err) {
			return res.status(403).json({ err: "invalid accessToken" });
		}
		else {
			console.log(payload);
			next();
		}
	})
}

export default jwtVerify;
