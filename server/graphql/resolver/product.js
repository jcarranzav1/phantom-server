const { GraphQLUpload } = require('graphql-upload');
const {
  allProducts,
  productByPage,
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
    productByPage,
  },
  Mutation: {
    addProduct: createProduct,
    updateProduct,
    deleteProduct,
  },
};
