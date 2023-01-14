import { Router } from "express";
import { getHeadlines } from "../controllers/articles";
const router = Router();

router.route("/articles").get(getHeadlines);

export default router;