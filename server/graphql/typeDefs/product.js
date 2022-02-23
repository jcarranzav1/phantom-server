const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Upload
  type Product {
    id: ID!
    model: String!
    price: Float!
    category: String!
    description: String
    photo: String
    user: User
    createdAt: String
    updatedAt: String
  }

  input ProductInput {
    model: String!
    price: String!
    category: String!
    description: String
    photo: Upload
  }

  extend type Query {
    products: [Product!]!
    product(id: ID!): Product!
  }

  extend type Mutation {
    addProduct(input: ProductInput!): Product
    updateProduct(id: ID!, input: ProductInput!): Product
    deleteProduct(id: ID!): Product
  }
`;
