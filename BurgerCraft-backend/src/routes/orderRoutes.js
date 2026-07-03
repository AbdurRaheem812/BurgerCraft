import Router from "express";
import { placeOrderController, getOrdersController, getOrderByIdController, updateOrderController, deleteOrderController} from "../controllers/orderController.js"; 
import { verifyToken } from "../middlewares/authentication.js";

const router = Router();

router.use(verifyToken); 

router.post('/place-order', placeOrderController);
router.get('/get-orders/:id', getOrdersController);
router.delete('/delete-order/:id', deleteOrderController);

export default router;  