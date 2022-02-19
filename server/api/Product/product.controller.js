const {
  getAllProducts,
  getProductById,
  createProduct: create,
  updateProduct: update,
  deleteProduct: removeProduct,
} = require('./product.service');

async function allProducts() {
  const response = getAllProducts();
  return response;
}
async function productById(parent, args) {
  const response = getProductById(args.id);
  return response;
}

async function createProduct(parent, args, context) {
  const { currentUser } = context;

  if (!currentUser) throw new Error('You must to be logged  to create a new product');
  if (!currentUser.isAdmin) throw new Error('Only admins can create a new product');

  const response = await create({ ...args.input, user: currentUser.id });
  return response;
}

async function updateProduct(parent, args, context) {
  const { currentUser } = context;

  if (!currentUser) throw new Error('You must to be logged  to update the products');
  if (!currentUser.isAdmin) throw new Error('Only admins can update the products');

  const response = await update(args.id, args.input);
  return response;
}

async function deleteProduct(parent, args, context) {
  const { currentUser } = context;

  if (!currentUser) throw new Error('You must to be logged  to remove products');
  if (!currentUser.isAdmin) throw new Error('Only admins can remove products');

  const response = await removeProduct(args.id);
  return response;
}

module.exports = {
  allProducts,
  productById,
  createProduct,
  updateProduct,
  deleteProduct,
};
