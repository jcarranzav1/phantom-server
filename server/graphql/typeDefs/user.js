const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Upload
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

  extend type Query {
    users: [User!]!
    user(id: ID!): User
    profile: User!
  }

  extend type Mutation {
    createUser(input: CreateAccountInput!): User
    updateProfile(input: UpdateAccountInput!): User
    loginUser(input: LoginInput): UserAuth
  }
`;
