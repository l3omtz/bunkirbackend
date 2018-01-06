// This file will hold our GraphQL schema

// The President type that will define the fields we will be using.
// The RootQuery type which tells the schema to allow the president query
// The schema type which tells the server which types represent the root query
const typeDefinitions = `
    type President {
        name: String
        party: String
        term: String
    }
    type RootQuery {
        president(name: String, party: String, term: String): President
    }
    schema {
        query: RootQuery
    }
`

module.exports = [typeDefinitions];