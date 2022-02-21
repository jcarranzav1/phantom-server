const { GraphQLUpload } = require('graphql-upload');
const {
  allProducts,
  productById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../../api/Product/product.controller');
const { payment } = require('../../api/Stripe/stripe.controller');
const {
  loginUserHandler,
  createUserHandler,
  allUsers,
  userById,
  ownProfile,
  updateProfile,
} = require('../../api/User/user.controller');

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    products: allProducts,
    product: productById,
    users: allUsers,
    user: userById,
    profile: ownProfile,
  },
  Mutation: {
    addProduct: createProduct,
    updateProduct,
    deleteProduct,
    createUser: createUserHandler,
    loginUser: loginUserHandler,
    updateProfile,
    payment,
  },
};

module.exports = resolvers;
