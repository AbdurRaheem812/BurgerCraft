import Order from "../models/Order.js";

export const placeOrder = async (orderData) => {
    const order = new Order(orderData);
    return await order.save();
};

export const getOrders = async (userId) => {
    return await Order.find({ userId }).populate("userId", "username email phoneNumber");
};

export const getOrderById = async (id) => {
    return await Order.findById(id).populate("userId", "username email phoneNumber");
};

export const deleteOrder = async (id, userId) => {
    return await Order.findOneAndDelete({ _id: id, userId });
};
