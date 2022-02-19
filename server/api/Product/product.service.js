const Product = require('./product.model');

async function getAllProducts() {
  const products = await Product.find();
  return products;
}

async function getProductById(id) {
  const product = await Product.findById(id);
  return product;
}

async function createProduct(payload) {
  const newProduct = new Product(payload);
  const savedProduct = await newProduct.save();
  return savedProduct;
}

async function updateProduct(id, payload) {
  const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedProduct;
}

async function deleteProduct(id) {
  const deletedProduct = await Product.findByIdAndDelete(id);
  return deletedProduct;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
