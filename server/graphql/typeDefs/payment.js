const { gql } = require('apollo-server-express');

module.exports = gql`
  type Payment {
    clientSecret: ID!
  }
  input PaymentInput {
    amount: Float!
  }
  extend type Mutation {
    payment(input: PaymentInput!): Payment
  }
`;
