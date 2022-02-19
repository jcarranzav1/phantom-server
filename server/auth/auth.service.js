const { sign, verify } = require('jsonwebtoken');

const {
  token: { expires, secret },
} = require('../config');

async function signToken(id, expiresIn = expires) {
  const response = sign({ id }, secret, {
    expiresIn,
  });
  return response;
}

async function validateJwt(token) {
  try {
    const payload = verify(token, secret);
    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  signToken,
  validateJwt,
};
