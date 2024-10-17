import { NextFunction, Response, Request } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { generateAcToken } from "../utils/utils.js";

interface Payload {
	userId: string;
	iat: number;
}

const jwtVerify = async (req: Request, res: Response, next: NextFunction) => {
	const accessToken = req.cookies.acToken;
	const refreshToken = req.cookies.rfToken;

	if (!accessToken && !refreshToken) {
		return res.status(403).json({ error: "Tokens not found" });
	} else if (!accessToken && refreshToken) {
		const acToken = newAcToken(refreshToken);
		res.cookie("acToken", acToken, { maxAge: 1000 * 30, sameSite: true })
		next();
	} else {
		const accessSecret = process.env.JWT_ACCESS_SECRET || "";
		jwt.verify(accessToken, accessSecret, (err: JsonWebTokenError | unknown, decodedPayload: Payload | unknown) => {
			if (err) {
				return res.status(403).json({ error: "Invalid access token", details: err });
			}
			if (decodedPayload) {
				console.log(decodedPayload)
			}
			next();
		});
	}
};

export default jwtVerify;

const newAcToken = (rfToken: string) => {
	const refreshSecret = process.env.JWT_REFRESH_SECRET || "";
	const token = jwt.verify(rfToken, refreshSecret, (err: JsonWebTokenError | unknown, payload: Payload | unknown) => {
		if (err) return null;
		//@ts-ignore
		return generateAcToken(payload.userId);
	})
	return token;
}
