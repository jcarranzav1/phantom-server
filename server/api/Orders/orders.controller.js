const { getUserById } = require('../User/user.service');
const {
  getAllOrders,
  getOrderById,
  createOrder: create,
  updateOrder: update,
  deleteOrder: removeProduct,
  orderByUser,
} = require('./orders.service');

async function allOrders(parent, args, context) {
  const { currentUser } = context;
  if (!currentUser) throw new Error('You must to be logged  to see all orders');
  if (!currentUser.isAdmin) throw new Error('Only admins can see all orders');
  const response = await getAllOrders();
  return response;
}
async function orderById(parent, args) {
  const response = await getOrderById(args.id);
  return response;
}

async function myOrders(parent, args, context) {
  const { currentUser } = context;
  if (!currentUser) throw new Error('You must to be logged  to see your orders');
  const response = await orderByUser(currentUser.id);
  return response;
}

async function orderByUserId(parent, args, context) {
  const { currentUser } = context;
  if (!currentUser) throw new Error('You must to be logged  to see user orders');
  if (!currentUser.isAdmin) throw new Error('Only admins can see all user orders');
  const response = await orderByUser(currentUser.id);
  return response;
}

async function createOrder(parent, args, context) {
  const { currentUser } = context;

  if (!currentUser) throw new Error('You must to be logged  to create a pay order');

  const user = await getUserById(currentUser.id);
  const {
    city, country, postalCode, address,
  } = user;
  const response = await create({
    ...args.input,
    billingAddress: {
      city, country, postalCode, line1: address,
    },
    user: user.id,
  });
  console.log(response);
  return response;
}

async function updateOrder(parent, args, context) {
  const { currentUser } = context;

  if (!currentUser) throw new Error('You must to be logged  to update a pay order');
  if (!currentUser.isAdmin) throw new Error('Only admins can update a pay order');

  const response = await update(args.id, args.input);
  return response;
}

async function deleteOrder(parent, args, context) {
  const { currentUser } = context;

  if (!currentUser) throw new Error('You must to be logged  to remove a pay order');
  if (!currentUser.isAdmin) throw new Error('Only admins can remove a pay order');

  const response = await removeProduct(args.id);
  return response;
}

module.exports = {
  allOrders,
  myOrders,
  orderById,
  orderByUserId,
  createOrder,
  updateOrder,
  deleteOrder,
};
