import { Router } from "express";
import { home, buildContainer, pruneContainer, stopContainer, restartContainer, signup, login } from "../controller/controller.js";

const router = Router();

router.route("/").get(home);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/restart/:id").get(restartContainer);
router.route("/create").post(buildContainer);
router.route("/stop").delete(stopContainer);
router.route("/prune").delete(pruneContainer);


export default router;
