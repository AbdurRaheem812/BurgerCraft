import Order from "../model/Order.js";

export const placeOrder = async (orderData) => {
    const order = new Order(orderData);
    return await order.save();
};

export const getOrders = async () => {
    return await Order.find().populate("userId", "username email phoneNumber");
};

export const getOrderById = async (id) => {
    return await Order.findById(id).populate("userId", "username email phoneNumber");
};

export const updateOrder = async (id, updateData) => {
    return await Order.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteOrder = async (id) => {
    return await Order.findByIdAndDelete(id);
};
