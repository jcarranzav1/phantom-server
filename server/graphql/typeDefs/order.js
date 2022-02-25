const { gql } = require('apollo-server-express');

module.exports = gql`
  type Cart {
    product: Product!
    quantity: Int!
    id: ID
  }

  type billingAddress {
    city: String
    country: String
    postalCode: String
    line1: String
  }

  type Order {
    id: ID!
    products: [Cart!]!
    billingAddress: billingAddress
    amount: Float!
    user: User
  }

  input billingAddressInput {
    city: String
    country: String
    postalCode: String
    line1: String
  }
  input CartInput {
    product: ID!
    quantity: Float
  }

  input OrderInput {
    products: [CartInput]!
    amount: Float!
    billingAddress: billingAddressInput
  }

  extend type Query {
    orders: [Order!]!
    myOrders: [Order!]!
    userOders: [Order!]!
  }
  extend type Mutation {
    createOrder(input: OrderInput): Order
  }
`;
