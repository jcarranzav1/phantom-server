const Order = require('./orders.model');

async function getAllOrders() {
  const orders = await Order.find().populate('user products.product');
  return orders;
}

async function getOrderById(id) {
  const order = await Order.findById(id).populate('user products.product');
  return order;
}

async function orderByUser(id, page, limit) {
  const orders = await Order.find({ user: id })
    .populate('products.product')
    .limit(limit)
    .skip((page - 1) * limit);
  return orders;
}

async function createOrder(payload) {
  const newOrder = new Order(payload);
  const savedOrder = await newOrder.save();
  return savedOrder;
}

async function updateOrder(id, payload) {
  const updatedOrder = await Order.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedOrder;
}

async function deleteOrder(id) {
  const deletedOrder = await Order.findByIdAndDelete(id);
  return deletedOrder;
}

module.exports = {
  getAllOrders,
  getOrderById,
  orderByUser,
  createOrder,
  updateOrder,
  deleteOrder,
};
