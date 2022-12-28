import { Router } from "express";
import { register } from "../controllers/user";
const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route("/register").post(register);
router.route("/session").post();

export default router;




