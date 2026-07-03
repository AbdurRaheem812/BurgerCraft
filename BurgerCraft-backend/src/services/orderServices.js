import Order from "../models/Order.js";

export const placeOrder = async (orderData) => {
    const order = new Order(orderData);
    return await order.save();
};

export const getOrders = async (id, userId) => {
    return await Order.find({ _id: id, userId }).populate("userId", "username email phoneNumber");
};

export const deleteOrder = async (id, userId) => {
    return await Order.findOneAndDelete({ _id: id, userId });
};
