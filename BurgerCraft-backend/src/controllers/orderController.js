import { placeOrder, getOrders, getOrderById, updateOrder, deleteOrder } from "../services/orderServices.js";

export const placeOrderController = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      userId: req.user.id,
    };
    const order = await placeOrder(orderData);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    const orders = await getOrders(req.params.id, req.user.id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const deleteOrderController = async (req, res) => {
  try {
    const order = await deleteOrder(req.params.id, req.user.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found or unauthorized" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}