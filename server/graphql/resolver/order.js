const {
  createOrder,
  allOrders,
  myOrders,
  orderByUserId,
  orderById,
} = require('../../api/Orders/orders.controller');

module.exports = {
  Query: {
    orders: allOrders,
    myOrders,
    userOders: orderByUserId,
    order: orderById,
  },
  Mutation: {
    createOrder,
  },
};
