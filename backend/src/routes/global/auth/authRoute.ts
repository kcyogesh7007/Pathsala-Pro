import epxress from "express";
import authC from "../../../controllers/global/auth/authController";
const router = epxress.Router();

router.route("/register").post(authC.registerUser);
router.route("/login").post(authC.loginUser);

export default router;
