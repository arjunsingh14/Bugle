import { Router } from "express";
import { getHeadlines, getSources } from "../controllers/articles";
const router = Router();

router.route("/articles").get(getHeadlines);
router.route("/articles/:sources").get(getSources);

export default router;