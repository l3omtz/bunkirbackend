import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import graphqlHTTP from 'express-graphql';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import schema from './src/data/schema';
import mongoose from 'mongoose';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphql, execute, subscribe } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import config from './src/data/config';
import jwt from 'express-jwt';
import { createServer } from 'http';


const app = express();
const PORT = process.env.PORT || 3000;
const SUBSCRIPTIONS_PATH = '/subscriptions';

app.use(bodyParser.json());

(async() => {
	try {

		
		await mongoose.connect(config.database);
		console.log('connected');

		app.use('/graphql',  graphqlExpress({
			schema: schema
		}));

		app.use('/graphiql', graphiqlExpress({
			endpointURL: '/graphql',
			subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
		}));

		const graphQLServer = createServer(app);

		graphQLServer.listen(PORT, () => {
			console.log(`GraphQL subscription server is now running on http://localhost:${PORT}`);
			new SubscriptionServer({
				execute,
				subscribe,
				schema: schema,
				onConnect: () => console.log('client sub connected')
			},
			{
				server: graphQLServer,
				path: '/subscriptions'
			});
		});

		const jsonSchema = await graphql(schema, introspectionQuery);
		await fs.writeFile('src/data/schema.json', JSON.stringify(jsonSchema, null, 2), err => {
			if (err) throw err;

			console.log('schema.json created successfully.');
		});

		// app.listen(PORT, () => {
		// 	console.info('==> Listening on port %s. (soosap-graphql)', PORT);
		// });
	} catch (err) {
		console.log(err);
	}
})();
  