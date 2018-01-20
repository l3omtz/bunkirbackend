const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');

const PORT = 8080;
const app = express();
const { apolloExpress, graphiqlExpress } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

Mongoose.Promise = global.Promise; // <-- Global promise to the mongoose object
Mongoose.connect('mongodb://localhost/apollo', (err) => { // <-- Connect to MongoDB throuhg port 
  if (err) {
    return err;
  }
  return true;
});

// Import seed method abd call it to seed the database with the data 
const seed = require('./seed');

seed();

const Schema = require('./schema');
const Resolvers = require('./resolvers');
const Connectors = require('./connectors');

// Pass in our Schema and Resolvers to makeExecutableSchema from graphql-tools.
// makeExecutableSchema takes a single argument: an object of options. 
// Only the typeDefs and resolvers options are required.
const executableSchema = makeExecutableSchema({
  // typeDefs is a required argument and should be an array of 
  // GraphQL schema language strings or a function that takes no arguments 
  // and returns an array of GraphQL schema language strings.
  typeDefs: Schema,
  // Return promises. 
  // In order to respond to queries, a schema needs to have resolve functions for all fields
  resolvers: Resolvers,
});

// Use the /graphql endpoint to call the apolloExpress method, passing in the schema and context.
app.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
  context: {
    constructor: Connectors,
  },
}));

// The /graphiql endpoint to call the graphiqlExpress method and set up a graphiql instance.
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}/graphql`
));