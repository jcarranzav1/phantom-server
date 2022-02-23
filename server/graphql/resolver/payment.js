const { payment } = require('../../api/Stripe/stripe.controller');

module.exports = {
  Mutation: {
    payment,
  },
};
