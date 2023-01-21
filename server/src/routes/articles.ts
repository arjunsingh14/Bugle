import { Router } from "express";
import { getHeadlines, getSources, updateSources } from "../controllers/articles";


const router = Router();

router.route("/articles").get(getHeadlines).patch(updateSources);
router.route("/articles/:sources").get(getSources);
export default router;