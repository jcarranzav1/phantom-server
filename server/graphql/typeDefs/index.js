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

  type billingAddress {
    city: String
    country: String
    postalCode: String
    line1: String
  }

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

  input CartInput {
    product: ID!
    quantity: Float
  }

  input OrderInput {
    idPayment: String!
    products: [CartInput]!
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
    orders: [Order!]!
    myOrders: [Order!]!
    userOders: [Order!]!
  }

  type Mutation {
    addProduct(input: ProductInput!): Product
    updateProduct(id: ID!, input: ProductInput!): Product
    deleteProduct(id: ID!): Product
    createUser(input: CreateAccountInput!): User
    updateProfile(input: UpdateAccountInput!): User
    loginUser(input: LoginInput): UserAuth
    payment(input: PaymentInput!): billingAddress
    createOrder(input: OrderInput): Order
  }
`;
