const { mail } = require('../../utils/email');
const uploadToCloudinary = require('../../utils/uploadToCloudinary');
const {
  getAllUsers,
  getUserById,
  createUser: create,
  updateUser: update,
  signInUser,
  signUpUser,
} = require('./user.service');

async function allUsers() {
  const response = await getAllUsers();
  return response;
}
async function userById(parent, args) {
  const response = await getUserById(args.id);
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

async function updateProfile(parent, args, context) {
  const { currentUser } = context;
  if (!currentUser) throw new Error('You must to be logged in to see update profile');

  if (args.input.photo) {
    const file = await uploadToCloudinary(args.input.photo);
    const photo = file.url;
    const response = await update(currentUser.id, { ...args.input, photo });
    return response;
  }
  const response = await update(currentUser.id, args.input);
  return response;
}

async function loginUserHandler(parent, args) {
  const { email, password } = args.input;
  const user = await signInUser(email, password);
  return user;
}

async function createUserHandler(parent, args) {
  const user = await signUpUser(args.input);
  mail({
    email: args.input.email,
    subject: 'Welcome',
    template: 'server/utils/email/templates/welcomeEmail.html',
    data: {
      firstName: args.input.firstName,
    },
  });

  return user;
}

module.exports = {
  allUsers,
  userById,
  ownProfile,
  createUser,
  updateProfile,
  loginUserHandler,
  createUserHandler,
};
