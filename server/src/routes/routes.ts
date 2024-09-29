import { Router } from "express";
import { home, buildContainer, pruneContainer, stopContainer, restartContainer } from "../controller/controller.js";

const router = Router();

router.route("/").get(home);
router.route("/restart/:id").get(restartContainer);
router.route("/create").post(buildContainer);
router.route("/stop").delete(stopContainer);
router.route("/prune").delete(pruneContainer);


export default router;
