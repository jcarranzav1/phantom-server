const { getUserById } = require('./api/User/user.service');
const { validateJwt } = require('./auth/auth.service');

async function context({ req }) {
  let currentUser = '';
  const authHeader = req.headers?.authorization;
  if (authHeader) {
    const [, token] = authHeader.split(' ');
    try {
      const decoded = await validateJwt(token);

      if (!decoded) throw new Error('Token is not valid');

      const user = await getUserById(decoded.id);
      currentUser = user;
    } catch (error) {
      throw new Error(error);
    }
  }

  return { currentUser };
}

module.exports = context;
