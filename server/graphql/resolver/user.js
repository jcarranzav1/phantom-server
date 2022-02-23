const { GraphQLUpload } = require('graphql-upload');
const {
  loginUserHandler,
  createUserHandler,
  allUsers,
  userById,
  ownProfile,
  updateProfile,
} = require('../../api/User/user.controller');

module.exports = {
  Upload: GraphQLUpload,
  Query: {
    users: allUsers,
    user: userById,
    profile: ownProfile,
  },
  Mutation: {
    createUser: createUserHandler,
    loginUser: loginUserHandler,
    updateProfile,
  },
};
