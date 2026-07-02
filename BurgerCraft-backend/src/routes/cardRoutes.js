import Router from "express";
import { addCardController, getUserCardsController, removeCardController } from "../controllers/cardController.js";
import { verifyToken } from "../middlewares/authentication.js";
import { hashCardNumberMiddleware } from "../middlewares/hashCardMiddleware.js";

const router = Router();


router.use(verifyToken);

router.post("/add-card", hashCardNumberMiddleware, addCardController);

export default router;