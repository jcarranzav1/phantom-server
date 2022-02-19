const { loginAdminHandler, createAdminHandler } = require('../../api/Admin/admin.controller');
const {
  allProducts,
  productById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../../api/Product/product.controller');
const {
  loginUserHandler,
  createUserHandler,
  allUsers,
  userById,
  ownProfile,
} = require('../../api/User/user.controller');

const resolvers = {
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
    createAdmin: createAdminHandler,
    loginAdmin: loginAdminHandler,
  },
};

module.exports = resolvers;
