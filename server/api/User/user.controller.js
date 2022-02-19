const {
  getAllUsers,
  getUserById,
  createUser: create,
  updateUser: update,
  signInUser,
  signUpUser,
} = require('./user.service');

async function allUsers() {
  const response = getAllUsers();
  return response;
}
async function userById(parent, args) {
  const response = getUserById(args.id);
  return response;
}
async function ownProfile(parent, args, context) {
  const { currentUser } = context;
  if (!currentUser) throw new Error('You must to be logged in to see your profile');
  const response = getUserById(currentUser.id);
  return response;
}

async function createUser(parent, args) {
  const response = await create(args.input);
  return response;
}

async function updateUser(parent, args) {
  const response = await update(args.id, args.input);
  return response;
}

async function loginUserHandler(parent, args) {
  const { email, password } = args.input;
  const user = await signInUser(email, password);
  return user;
}

async function createUserHandler(parent, args) {
  const user = await signUpUser(args.input);
  return user;
}

module.exports = {
  allUsers,
  userById,
  ownProfile,
  createUser,
  updateUser,
  loginUserHandler,
  createUserHandler,
};
