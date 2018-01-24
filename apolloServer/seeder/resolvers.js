// This file will hold our resolver. 
// Resolvers tell our server how to respond to a query. We will be writing a basic resolver for our app.

// Resolve function object ( root query object )
const resolveFunctions = {
  // This RootQuery object correlates directly to the schema we declared in schema.js.
  RootQuery: {
    // The first argument is the rootValue, the second argument is the actual query that we will be getting, and the third is the context. 
    president(_, { name }, ctx) {
      // ctx.constructor.President is creating a new instance of the President class we created in connectors.js.
      const president = new ctx.constructor.President();
      return president.findPresident(name);
    },
    allPresidents(ctx) {
      const president = new ctx.constructor.President();
      return  president
    }
  },
};

module.exports = resolveFunctions;