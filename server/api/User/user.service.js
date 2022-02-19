const { signToken } = require('../../auth/auth.service');
const User = require('./user.model');

async function getAllUsers() {
  const users = await User.find();
  return users;
}

async function getUserById(id) {
  const user = await User.findById(id);
  return user;
}

async function createUser(payload) {
  const newUser = new User(payload);
  const savedUser = await newUser.save();
  return savedUser;
}

async function updateUser(id, payload) {
  const updatedUser = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedUser;
}

async function signInUser(email, password) {
  const user = await User.findOne({ email }).exec();
  if (!user) {
    throw new Error('User or password incorrect');
  }
  const verified = await user.verifyPassword(password);
  if (!verified) {
    throw new Error('User or password incorrect');
  }
  const { _id: id } = user;
  const token = signToken(id);

  return {
    user,
    token,
  };
}

async function signUpUser(payload) {
  const { password, confirmPassword } = payload;
  const verified = password === confirmPassword;

  if (!verified) {
    throw new Error('confirm password do not match with password');
  }

  const user = await createUser(payload);

  const { _id: id } = user;
  const token = signToken(id);

  return {
    user,
    token,
  };
}
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  signInUser,
  signUpUser,
};
