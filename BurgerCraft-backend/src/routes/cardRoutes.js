import Router from "express";
import { addCardController } from "../controllers/cardController.js";
import { verifyToken } from "../middlewares/authentication.js";
import { hashCardNumberMiddleware } from "../middlewares/hashCardMiddleware.js";
import { validateSaveCard } from "../validator/authValidator.js";

const router = Router();


router.use(verifyToken);

router.post("/add-card", hashCardNumberMiddleware, validateSaveCard, addCardController);

export default router;