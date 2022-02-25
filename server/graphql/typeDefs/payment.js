const { gql } = require('apollo-server-express');

module.exports = gql`
  type Payment {
    status: Boolean!
  }
  input PaymentInput {
    id: ID!
    amount: Float!
  }
  extend type Mutation {
    payment(input: PaymentInput!): Payment
  }
`;
