import {
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLList,
	GraphQLString,
	GraphQLInt,
	GraphQLObjectType,
	GraphQLEnumType,
	GraphQLInterfaceType
} from 'graphql';

import StrainCollection from '../models/strains';
import UserCollection from '../models/user';

const StrainType = new GraphQLObjectType({
	name: 'Strain',
	fields: () => ({
		_id: { type: GraphQLString },
		ailments: { type: GraphQLString },
		cbd: { type:GraphQLString },
		details: { type: GraphQLString },
        imgUrl: { type: GraphQLString },
        loc: { type: GraphQLString },
        location: { type: new GraphQLList(GraphQLString)},
        name: { type: GraphQLString },
        ratio: { type: GraphQLString },
        thc: { type: GraphQLString },
        type: { type: GraphQLString },
	})
});

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		_id: { type: GraphQLString },
		dob: { type: GraphQLString },
		email: { type: GraphQLString },
		imgUrl: { type: GraphQLString },
		name: { type: GraphQLString },
		phone: { type: GraphQLString }
	})
})

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createStrain: {
			type: StrainType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				type: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, args) {
				return StrainCollection.create({
					name: args.name,
					type: args.type
				}).then(res => res);
			}
		},
		deleteStrain: {
			type: StrainType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, args) {
				return StrainCollection.findByIdAndRemove(args.id).then(res => console.log(res));
			}
		},
		updateStrain: {
			type: StrainType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				ailments: { type: GraphQLString },
				cbd: { type:GraphQLString },
				details: { type: GraphQLString },
				imgUrl: { type: GraphQLString },
				loc: { type: GraphQLString },
				location: { type: GraphQLString },
				name: { type: GraphQLString },
				ratio: { type: GraphQLString },
				thc: { type: GraphQLString },
				type: { type: GraphQLString },
			},
			resolve: async(root, args) => await StrainCollection.findByIdAndUpdate(args.id, args, { new: true })			
		},
		createUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				phone: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parentValue, args) {
				return UserCollection.create({
					name: args.name,
					email: args.email,
					phone: args.phone
				}).then(res => res);
			}
		}
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: {
		strain: {
			type: StrainType,
			args: {
				id: { type: GraphQLString }
			},
			resolve:  ( root, args, context, info) => {
				return StrainCollection.findOne({ '_id': args.id }, (strain, err) => {
					console.log(err, args.id);
				});
			}
		},
		strains: {
			type: new GraphQLList(StrainType),
			resolve: (parentValue, args) => {
				return StrainCollection.find({});
			}
		},
		user: {
			type: UserType,
			args: {
				id: { type: GraphQLString }
			},
			resolve:  ( root, args, context, info) => {
				return UserCollection.findOne({ '_id': args.id }, (strain, err) => {
					console.log(err, args.id);
				});
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve: (parentValue, args) => {
				return UserCollectiont.find({});
			}
		}
	}
});

const schema =  new GraphQLSchema({
	query: RootQuery,
	mutation: mutation
});

export default schema;