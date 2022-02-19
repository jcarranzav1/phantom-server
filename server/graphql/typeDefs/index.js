const { gql } = require('apollo-server-express');

module.exports = gql`
  type Product {
    id: ID!
    model: String!
    price: Float!
    category: String!
    description: String
    photo: String
    createdAt: String
    updatedAt: String
  }
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    confirmPassword: String!
    cellphone: String
    isAdmin: Boolean
    photo: String
    createdAt: String
    updatedAt: String
  }

  type UserAuth {
    user: User
    token: String!
  }

  type Admin {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    confirmPassword: String!
    cellphone: String
    photo: String
    createdAt: String
    updatedAt: String
  }

  type AdminAuth {
    admin: Admin
    token: String!
  }

  """
  ********************
  """
  input ProductInput {
    model: String!
    price: Float!
    category: String!
    description: String
    photo: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateAccountInput {
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    confirmPassword: String!
    isAdmin: Boolean
  }

  """
  ********************
  """
  type Query {
    products: [Product!]
    product(id: ID!): Product!
  }

  type Mutation {
    addProduct(input: ProductInput!): Product
    updateProduct(id: ID!, input: ProductInput!): Product
    deleteProduct(id: ID!): Product
    createUser(input: CreateAccountInput!): UserAuth
    loginUser(input: LoginInput): UserAuth
    createAdmin(input: CreateAccountInput!): AdminAuth
    loginAdmin(input: LoginInput): AdminAuth
  }
`;
