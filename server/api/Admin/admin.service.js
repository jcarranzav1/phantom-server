const { signToken } = require('../../auth/auth.service');
const Admin = require('./admin.model');

async function getAllAdmins() {
  const admins = await Admin.find();
  return admins;
}

async function getAdminById(id) {
  const admin = await Admin.findById(id);
  return admin;
}

async function createAdmin(payload) {
  const newAdmin = new Admin(payload);
  const savedAdmin = await newAdmin.save();
  return savedAdmin;
}

async function updateAdmin(id, payload) {
  const updatedAdmin = await Admin.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedAdmin;
}

async function signInAdmin(email, password) {
  const admin = await Admin.findOne({ email }).exec();

  if (!admin) {
    throw new Error('Admin or password incorrect');
  }
  const verified = await admin.verifyPassword(password);
  if (!verified) {
    throw new Error('Admin or password incorrect');
  }
  const { _id: id } = admin;
  const token = signToken(id);

  return {
    admin,
    token,
  };
}

async function signUpAdmin(payload) {
  const { password, confirmPassword } = payload;
  const verified = password === confirmPassword;

  if (!verified) {
    throw new Error('confirm password do not match with password');
  }

  const admin = await createAdmin(payload);

  const { _id: id } = admin;
  const token = signToken(id);

  return {
    admin,
    token,
  };
}
module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  signInAdmin,
  signUpAdmin,
};
