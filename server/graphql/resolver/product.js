const { GraphQLUpload } = require('graphql-upload');
const {
  allProducts,
  productById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../../api/Product/product.controller');

module.exports = {
  Upload: GraphQLUpload,
  Query: {
    products: allProducts,
    product: productById,
  },
  Mutation: {
    addProduct: createProduct,
    updateProduct,
    deleteProduct,
  },
};
