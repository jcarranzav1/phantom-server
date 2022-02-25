const uploadToCloudinary = require('../../utils/uploadToCloudinary');
const {
  getAllProducts,
  getProductById,
  createProduct: create,
  updateProduct: update,
  deleteProduct: removeProduct,
  getProductByPage,
} = require('./product.service');

async function allProducts() {
  const response = await getAllProducts();
  return response;
}

async function productByPage(parent, args) {
  const response = await getProductByPage(args.page, args.limit);
  return response;
}

async function productById(parent, args) {
  const response = await getProductById(args.id);
  return response;
}

async function createProduct(parent, args, context) {
  const { currentUser } = context;

  if (!currentUser) throw new Error('You must to be logged  to create a new product');
  if (!currentUser.isAdmin) throw new Error('Only admins can create a new product');

  if (args.input.photo) {
    const file = await uploadToCloudinary(args.input.photo);
    const photo = file.url;
    const response = await create({ ...args.input, user: currentUser.id, photo });
    return response;
  }
  const response = await create({ ...args.input, user: currentUser.id });

  return response;
}

async function updateProduct(parent, args, context) {
  const { currentUser } = context;

  if (!currentUser) throw new Error('You must to be logged  to update the products');
  if (!currentUser.isAdmin) throw new Error('Only admins can update the products');

  if (args.input.photo) {
    const file = await uploadToCloudinary(args.input.photo);
    const photo = file.url;
    const response = await update(args.id, { ...args.input, user: currentUser.id, photo });
    return response;
  }

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
  productByPage,
  productById,
  createProduct,
  updateProduct,
  deleteProduct,
};
