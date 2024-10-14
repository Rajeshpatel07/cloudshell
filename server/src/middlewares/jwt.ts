import { Response, Request, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { generateAcToken } from "../utils/utils.js";

interface Payload {
	userId: string;
	iat: number;
}

// Type guard to check if an object is a Payload
const isPayload = (object: any): object is Payload => {
	return 'userId' in object && typeof object.userId === 'string';
  };

  const jwtVerify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.cookies);
        const accessToken = req.cookies.acToken;
        const refreshToken = req.cookies.rfToken;

        if (!accessToken && !refreshToken) {
            res.status(403).json({ error: "Tokens not found" });
        } else if (!accessToken && refreshToken) {
            const acToken = await newAcToken(refreshToken);
            console.log(acToken);
            res.cookie("acToken", acToken, { maxAge: 1000 * 30, sameSite: true });
        } else {
            const accessSecret = process.env.JWT_ACCESS_SECRET || "";
            jwt.verify(accessToken, accessSecret, (err: JsonWebTokenError | unknown, decodedPayload: Payload | unknown) => {
                if (err) {
                    res.status(403).json({ error: "Invalid access token", details: err });
                    return;
                }
                if (decodedPayload) {
                    console.log(decodedPayload);
                }
            });
        }
        next();
    } catch (err) {
        next(err);
    }
};

export default jwtVerify;

const newAcToken = async (rfToken: string): Promise<string | null> => {
	return new Promise((resolve, reject) => {
	  const refreshSecret = process.env.JWT_REFRESH_SECRET || "";
	  jwt.verify(rfToken, refreshSecret, (err: JsonWebTokenError | unknown, payload: unknown) => {
		if (err) {
		  reject(err);
		  return;
		}
		if (isPayload(payload)) {
		  const token = generateAcToken(payload.userId);
		  resolve(token);
		} else {
		  reject(new Error("Invalid payload structure"));
		}
	  });
	});
  };














