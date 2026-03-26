import express from "express";
import instituteC from "../../controllers/institute/instituteController";
import Middleware from "../../middleware/middleware";
const router = express.Router();

router.route("/").post(Middleware.isLoggedIn, instituteC.createInstitute);

export default router;
