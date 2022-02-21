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
    user: User!
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
    products: [Product!]!
    createdAt: String
    updatedAt: String
  }

  type UserAuth {
    user: User
    token: String!
  }

  type BillingAddres {
    id: ID
    city: String
    country: String
    postalCode: String
    line1: String
  }

  """
  ********************
  """
  input ProductInput {
    model: String!
    price: String!
    category: String!
    description: String
    photo: Upload
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

  input UpdateAccountInput {
    firstName: String
    lastName: String
    cellphone: String
    photo: Upload
    description: String
  }

  input PaymentInput {
    tokenId: ID!
    amount: Float!
  }
  """
  ********************
  """
  type Query {
    products: [Product!]!
    product(id: ID!): Product!
    users: [User!]!
    user(id: ID!): User
    profile: User!
  }

  type Mutation {
    addProduct(input: ProductInput!): Product
    updateProduct(id: ID!, input: ProductInput!): Product
    deleteProduct(id: ID!): Product
    createUser(input: CreateAccountInput!): User
    updateProfile(id: ID!, input: UpdateAccountInput!): User
    loginUser(input: LoginInput): UserAuth
    payment(input: PaymentInput!): BillingAddres
  }
`;
