import { Router } from "express";
import { home, buildContainer, pruneContainer, stopContainer, restartContainer, signup, login } from "../controller/controller.js";
import jwtVerify from "../middlewares/jwt.js";

const router = Router();


//@ts-ignore
router.route("/home").get(jwtVerify, home);

router.route("/signup").post(signup);
router.route("/login").post(login)

// @ts-ignore
router.route("/restart/:id").get(jwtVerify, restartContainer);
// @ts-ignore
router.route("/create").post(jwtVerify, buildContainer);
// @ts-ignore
router.route("/stop/:id").delete(jwtVerify, stopContainer);
// @ts-ignore
router.route("/prune/:id").delete(jwtVerify, pruneContainer);

export default router;
