const { ApolloServer } = require('apollo-server-express');
const { port, database } = require('./server/config');
const app = require('./server');
const { connect } = require('./server/database');

const typeDefs = require('./server/graphql/typeDefs');
const resolvers = require('./server/graphql/resolver');
const context = require('./server/context');

connect({
  protocol: database.protocol,
  url: database.url,
  username: database.username,
  password: database.password,
});

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api' });

  app.listen({ port }, () => console.log(`Server running at http://localhost:${port}/api`));
}

setImmediate(startServer);
