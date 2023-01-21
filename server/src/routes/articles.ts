import { Router } from "express";
import { getHeadlines, getSources, updateSources } from "../controllers/articles";


const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route("/articles").get(getHeadlines).patch(updateSources);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route("/articles/:sources").get(getSources);
export default router;