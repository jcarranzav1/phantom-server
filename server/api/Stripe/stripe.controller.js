/* eslint-disable import/order */
const {
  stripe: { secret: KEY },
} = require('../../config');
const { getUserById } = require('../User/user.service');
const stripe = require('stripe')(KEY);

async function payment(parent, args, context) {
  const { currentUser } = context;

  if (!currentUser) throw new Error('You must to be logged  to pay a product');
  const user = await getUserById(currentUser.id);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: args.input.amount,
      currency: 'usd',
      receipt_email: user.email,
      payment_method: args.input.id,
      confirm: true,
    });
    console.log(paymentIntent);
    if (!paymentIntent) return { status: false };
    return { status: true };
    /* return { clientSecret: paymentIntent.client_secret }; */
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  payment,
};
