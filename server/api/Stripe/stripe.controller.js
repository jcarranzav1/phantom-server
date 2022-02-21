/* eslint-disable import/order */
const {
  stripe: { secret: KEY },
} = require('../../config');
const { updateUser } = require('../User/user.service');
const stripe = require('stripe')(KEY);

async function payment(parent, args, context) {
  const { currentUser } = context;

  if (!currentUser) throw new Error('You must to be logged  to pay a product');
  try {
    const charge = await stripe.charges.create({
      source: args.input.tokenId,
      amount: args.input.amount,
      currency: 'usd',
    });
    const {
      id,
      billing_details: { address },
    } = charge;

    const {
      city, country, postal_code: postalCode, line1,
    } = address;

    await updateUser(currentUser.id, {
      city,
      country,
      postalCode,
      address: line1,
    });

    return {
      id,
      city,
      country,
      postalCode,
      line1,
    };
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  payment,
};
