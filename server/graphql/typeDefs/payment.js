const { gql } = require('apollo-server-express');

module.exports = gql`
  type billingAddress {
    city: String
    country: String
    postalCode: String
    line1: String
  }
  input PaymentInput {
    tokenId: ID!
    amount: Float!
  }
  extend type Mutation {
    payment(input: PaymentInput!): billingAddress
  }
`;
