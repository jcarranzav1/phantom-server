const {
  getAllAdmins,
  getAdminById,
  createAdmin: create,
  updateAdmin: update,
  signInAdmin,
  signUpAdmin,
} = require('./admin.service');

async function allAdmins() {
  const response = getAllAdmins();
  return response;
}
async function AdminById(parent, args) {
  const response = getAdminById(args.id);
  return response;
}

async function createAdmin(parent, args) {
  const response = await create(args.input);
  return response;
}

async function updateAdmin(parent, args) {
  const response = await update(args.id, args.input);
  return response;
}

async function loginAdminHandler(parent, args) {
  const { email, password } = args.input;
  const Admin = await signInAdmin(email, password);
  return Admin;
}

async function createAdminHandler(parent, args) {
  const Admin = await signUpAdmin(args.input);
  return Admin;
}

module.exports = {
  allAdmins,
  AdminById,
  createAdmin,
  updateAdmin,
  loginAdminHandler,
  createAdminHandler,
};
