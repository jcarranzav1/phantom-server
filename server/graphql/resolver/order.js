const {
  createOrder,
  allOrders,
  myOrders,
  orderByUserId,
} = require('../../api/Orders/orders.controller');

module.exports = {
  Query: {
    orders: allOrders,
    myOrders,
    userOders: orderByUserId,
  },
  Mutation: {
    createOrder,
  },
};
