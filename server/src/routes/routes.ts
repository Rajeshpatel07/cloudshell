import { Router } from "express";
import { home, buildContainer, pruneContainer, stopContainer, restartContainer, signup, login } from "../controller/controller.js";
import jwtVerify from "../middlewares/jwt.js";

const router = Router();



router.route("/home").get(jwtVerify, home);

router.route("/signup").post(signup);
router.route("/login").post(login)


router.route("/restart/:id").get(jwtVerify, restartContainer);

router.route("/create").post(jwtVerify, buildContainer);

router.route("/stop/:id").delete(jwtVerify, stopContainer);

router.route("/prune/:id").delete(jwtVerify, pruneContainer);

export default router;
