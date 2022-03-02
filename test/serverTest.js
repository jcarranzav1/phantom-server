const { ApolloServer } = require('apollo-server-express');
const app = require('../server');
const typeDefs = require('../server/graphql/typeDefs');
const resolvers = require('../server/graphql/resolver');
const context = require('../server/context');

const createApolloServer = async (port) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api' });
  return app.listen({ port });
};

module.exports = createApolloServer;
