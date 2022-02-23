const _ = require('lodash');
const order = require('./order');
const user = require('./user');
const payment = require('./payment');
const product = require('./product');

module.exports = _.merge({}, user, product, payment, order);
