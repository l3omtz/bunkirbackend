import {
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLList,
	GraphQLString,
	GraphQLInt,
	GraphQLObjectType,
} from 'graphql';

import Strain from '../models/session';

export const StrainType = new GraphQLObjectType({
	name: 'Strain',
	fields: () => ({
		ailments: { type: new GraphQLNonNull(GraphQLString) },
		cbd: { type: new GraphQLNonNull(GraphQLString) },
		details: { type: new GraphQLNonNull(GraphQLString) },
        imgUrl: { type: new GraphQLNonNull(GraphQLString) },
        loc: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLList(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        ratio: { type: new GraphQLNonNull(GraphQLString) },
        thc: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
	})
});

export const strainsType = new GraphQLObjectType({
	name: 'strains',
	fields: () => ({
		strains: {
			type: new GraphQLList(strainType),
			resolve: async () =>  await Strain.find({})
		}
	})
});

const schema =  new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: {
			strain: {
				type: StrainType,
				args: {
					id: { type: GraphQLString }
				},
				resolve:  ( root, args, context, info) => {
					return Strain.findOne({ '_id': args.id }, (err, strain) => {
						console.log(strain);
						// strain
					  })
				}
			}
		}
	})
});

export default schema;