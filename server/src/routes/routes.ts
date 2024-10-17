import { Router } from "express";
import { home, buildContainer, pruneContainer, stopContainer, restartContainer, signup, login, tryDemo, userContainers, contianerInfo } from "../controller/controller.js";
import jwtVerify from "../middlewares/jwt.js";

const router = Router();


//@ts-ignore
router.route("/home").get(jwtVerify, home);

router.route("/signup").post(signup);
router.route("/login").post(login)


router.route("/trydemo").post(tryDemo);

router.route("/c/:userId").get(userContainers);
// @ts-ignore
router.route("/c/create").post(jwtVerify, buildContainer);
//@ts-ignore
router.route("/c/info/:id").get(jwtVerify, contianerInfo);
// @ts-ignore
router.route("/c/stop").put(jwtVerify, stopContainer);
// @ts-ignore
router.route("/c/prune/:id").delete(jwtVerify, pruneContainer);
// @ts-ignore
router.route("/c/restart").put(restartContainer);

export default router;
