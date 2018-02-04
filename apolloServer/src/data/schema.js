import {
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLList,
	GraphQLString,
	GraphQLObject,
	GraphQLInt,
	GraphQLObjectType,
	GraphQLEnumType,
	GraphQLInterfaceType
} from 'graphql';

import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import StrainCollection from '../models/strains';
import UserCollection from '../models/user';
import PostCollection from '../models/post';

const StrainType = new GraphQLObjectType({
	name: 'Strain',
	fields: () => ({
		_id: { type: GraphQLString },
		ailments: { type: GraphQLString },
		cbd: { type:GraphQLString },
		details: { type: GraphQLString },
        imgUrl: { type: GraphQLString },
        loc: { type: GraphQLString },
        location: { type: new GraphQLList(GraphQLString) },
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
		phone: { type: GraphQLString },
		posts: { 
			type: new GraphQLList(PostType) ,
			// resolve: async (root, args) => await
		},
		password: { type: GraphQLString },
		userName: { type: GraphQLString },
	})
});

const SignInType = new GraphQLObjectType({
	name: 'SignIn',
	fields: () => ({
		password: { type: GraphQLString },
		userName: { type: GraphQLString }
	})
});

const PostType = new GraphQLObjectType({
	name: 'Post',
	fields: () => ({
		_id: { type: GraphQLString },
		text: { type: GraphQLString },
		user: { type: GraphQLString },
	})
})

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		// **
		// * STRAIN MUTATIONS
		// **
		createStrain: {
			type: StrainType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				type: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: async (parentValue, args) => await StrainCollection.create({ name: args.name, type: args.type })
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
		deleteStrain: {
			type: StrainType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: async (parentValue, args) => await StrainCollection.findByIdAndRemove(args.id)
		},
		// **
		// * USER MUTATIONS
		// **
		createUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				phone: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				userName: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: async (parentValue, args) => {
				try {
					let salt = await bcrypt.genSalt(10);
					let hash = await bcrypt.hash(args.password, salt);
					args.password = hash;
					let newUser =  await UserCollection.create(args)
					return newUser;
				}
				catch(err) {
					console.log("CREATE ERROR: ", err);
				}

			}
		},
		updateUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				dob: { type: GraphQLString },
				email: { type: GraphQLString },
				imgUrl: { type: GraphQLString },
				name: { type: GraphQLString },
				phone: { type: GraphQLString }
			},
			resolve: async(root, args) => await UserCollection.findByIdAndUpdate(args.id, args, { new: true })			
		},
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: async (parentValue, args) => await UserCollection.findByIdAndRemove(args.id)
		},
		// **
		// * POST MUTATIONS
		// **
		createPost: {
			type: PostType,
			args: {
				userId: { type: new GraphQLNonNull(GraphQLString) },
				text: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: async (root, args) => {
				try {
					let post = await PostCollection.create({user: args.userId, text: args.text})
					// Add to users post array 
					await UserCollection.findByIdAndUpdate(args.userId, { $push: { posts: post }}, { new: true })	
					return post
				}
				catch(err) {
					console.log(err)
				}
			}
		},
		deletePost: {
			type: PostType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: async (parentValue, args) => await PostCollection.findByIdAndRemove(args.id)
		}
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: {
		// **
		// * STRAIN QUERY
		// **
		strain: {
			type: StrainType,
			args: {
				id: { type: GraphQLString }
			},
			resolve:  async ( root, args, context, info) => await StrainCollection.findOne({ '_id': args.id })
		},
		strains: {
			type: new GraphQLList(StrainType),
			resolve: async (parentValue, args) => await StrainCollection.find({})
		},
		// **
		// * USER QUERY
		// **
		signIn :{
			type: SignInType,
			args: {
				userName: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve: async ( root, args) => {
				try {
					let user = await UserCollection.findOne({ 'userName': args.userName });
					let auth = await bcrypt.compare(args.password, user.password);
					if (auth){
						console.log("SIGNED IN! :D");
						return user;
					}else {
						console.log("INVALID CREDS :(");
						return null;
					}
				}
				catch(err) {
					console.log(err);
				}
			}
		},
		user: {
			type: UserType,
			args: {
				id: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve:  async ( root, args, context, info ) => {
				try {
					let user = await UserCollection.findOne({ '_id': args.id });
					return user;
				}
				catch(err) {
					console.log(err);
				}
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve: async (parentValue, args) => await UserCollection.find({})
		},
		// **
		// * POST QUERY
		// **
		post: {
			type: PostType,
			args: {
				id: { type: GraphQLString }
			},
			resolve: async ( root, args, context, info ) => await PostCollection.findOne({ '_id': args.id })
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve: async (parentValue, args) => await PostCollection.find({})
		},

	}
});

const schema =  new GraphQLSchema({
	query: RootQuery,
	mutation: mutation
});

export default schema;