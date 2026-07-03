import Router from "express";
import { placeOrderController, getOrdersController, getOrderByIdController, deleteOrderController} from "../controllers/orderController.js"; 
import { verifyToken } from "../middlewares/authentication.js";

const router = Router();

router.use(verifyToken); 

router.post('/place-order', placeOrderController);
router.get('/get-orders', getOrdersController);
router.get('/get-order/:id', getOrderByIdController);
router.delete('/delete-order/:id', deleteOrderController);

export default router;  