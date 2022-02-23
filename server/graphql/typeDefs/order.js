const { gql } = require('apollo-server-express');

module.exports = gql`
  type Cart {
    product: Product!
    quantity: Int!
    id: ID
  }

  type Order {
    id: ID!
    idPayment: String!
    products: [Cart!]!
    billingAddress: billingAddress
    amount: Float!
    user: User
  }

  input CartInput {
    product: ID!
    quantity: Float
  }

  input OrderInput {
    idPayment: String!
    products: [CartInput]!
    amount: Float!
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
