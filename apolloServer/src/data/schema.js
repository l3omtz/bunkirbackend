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

import _ from 'lodash';
import config from './config';
import pubsub from './subscriptions';

import StrainCollection from '../models/strains';
import UserCollection from '../models/user';
import PostCollection from '../models/post';
import DispensarieCollection from '../models/dispensarie';

const POST_ADDED = "postAdded";
const COMMENT_ADDED = 'commentAdded';

// ***
// Types
// ***
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

const DispensarieType = new GraphQLObjectType({
	name: 'Dispensaire',
	fields: () => ({
		_id: { type: GraphQLString },
		Image: { type: GraphQLString },
		lat: { type: GraphQLString },
		lng: { type: GraphQLString },
		name: { type: GraphQLString },
		phone: { type: GraphQLString },
		url: { type: GraphQLString }
	})
});

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		_id: { type: GraphQLString },
		dob: { type: GraphQLString },
		email: { type: GraphQLString },
		userImage: { type: GraphQLString },
		name: { type: GraphQLString },
		phone: { type: GraphQLString },
		posts: { 
			type: new GraphQLList(PostType) ,
			// resolve: async (root, args) => await
		},
		password: { type: GraphQLString },
		userName: { type: GraphQLString },
		jwt: { type: GraphQLString },
	})
});

const SignInType = new GraphQLObjectType({
	name: 'SignIn',
	fields: () => ({
		password: { type: GraphQLString },
		userName: { type: GraphQLString },
		_id: { type: GraphQLString },
		jwt: { type: GraphQLString }
	})
});

const PostType = new GraphQLObjectType({
	name: 'Post',
	fields: () => ({
		_id: { type: GraphQLString },
		text: { type: GraphQLString },
		user: { type: GraphQLString },
		image: { type: GraphQLString },
		timeStamp: { type: GraphQLString },
		comments: {
			type: new GraphQLList(CommentType)
		}
	})
})

const CommentType = new GraphQLObjectType({
	name: 'Comment',
	fields: () => ({
		_id: { type: GraphQLString },
		text: { type: GraphQLString },
		userId: { type: GraphQLString },
		postId: { type : GraphQLString },
		timeStamp: { type: GraphQLString }
	})
})

const ErrorType = new GraphQLObjectType({
	name: 'Error',
	fields: () => ({
		message: { type: GraphQLString }
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
			resolve: async(global, args) => await StrainCollection.findByIdAndUpdate(args.id, args, { new: true })			
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
		signIn :{ // <-- Only query that is pertected... FOR NOW.
			type: SignInType,
			args: {
				userName: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve: async ( global, args, context, secret) => {
				try {
					let user = await UserCollection.findOne({ 'userName': args.userName });
					let auth = await bcrypt.compare(args.password, user.password);
					if (auth){
						user.jwt = jwt.sign({_id: user._id}, config.secret);
						await jwt.verify(user.jwt, config.secret);
						return user;
						
					} else {
						console.log("INVALID CREDS :(");
						return 'Wrong username or password';
					}
				}
				catch(err) {
					console.log(err);
				}
			}
		},
		createUser: {
			type: UserType,
			args: {
				dob: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				phone: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				userName: { type: new GraphQLNonNull(GraphQLString) },
				userImage: { type: GraphQLString }
			},
			resolve: async (parentValue, args) => {
				try {
					let salt = await bcrypt.genSalt(10);
					let hash = await bcrypt.hash(args.password, salt);
					args.password = hash;
					let newUser =  await UserCollection.create(args)
					newUser.jwt = jwt.sign({_id: newUser._id}, config.secret);
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
				userImage: { type: GraphQLString },
				name: { type: GraphQLString },
				phone: { type: GraphQLString }
			},
			resolve: async(global, args) => await UserCollection.findByIdAndUpdate(args.id, args, { new: true })			
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
				image: { type: GraphQLString },
				timeStamp: { type: GraphQLString }
			},
			resolve: async (global, args) => {
				try {
					let post = await PostCollection.create({user: args.userId, text: args.text, image: args.image, timeStamp: args.timeStamp})
					// Add to users post array 
					await UserCollection.findByIdAndUpdate(args.userId, { $push: { posts: post }}, { new: true })
					pubsub.publish(POST_ADDED, {postAdded : post });
					return post
				}
				catch(err) {
					console.log(err)
				}
			},
			subscription: {
				postAdded: {
					subscribe: () => pubsub.asyncIterator(POST_ADDED)
				}
			}
		},
		deletePost: {
			type: PostType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: async (parentValue, args) => await PostCollection.findByIdAndRemove(args.id)
		},
		// **
		// * COMMENT MUTATIONS
		// **
		createComment: {
			type: CommentType,
			args: {
				userId: { type: new GraphQLNonNull(GraphQLString) },
				text: { type: new GraphQLNonNull(GraphQLString) },
				timeStamp: { type: GraphQLString },
				postId: { type: GraphQLString }
			},
			resolve: async (global, args) => {
				try {
					let post = await PostCollection.findByIdAndUpdate(args.postId, { $push: {comments:  args}}, { new: true});
					pubsub.publish(COMMENT_ADDED, {commentAdded : args });
					return _.last(post.comments); 
				}
				catch(err) {
					console.log('post comment eror: ', err);
				}
			},
			subscription: {
				commentAdded: {
					subscribe: () => pubsub.asyncIterator(COMMENT_ADDED)
				}
			}
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
			resolve:  async ( global, args, context, info) => await StrainCollection.findOne({ '_id': args.id })
		},
		strains: {
			type: new GraphQLList(StrainType),
			resolve: async (parentValue, args) => await StrainCollection.find({})
		},
		// **
		// * DISPENSAIRES QUERY
		// **
		dispensarie: {
			type: DispensarieType,
			args: {
				id: { type: GraphQLString }
			},
			resolve:  async ( global, args, context, info) => await DispensarieCollection.findOne({ '_id': args.id })
		},
		dispensaries: {
			type: new GraphQLList(DispensarieType),
			resolve: async (parentValue, args) => await DispensarieCollection.find({})
		},
		// **
		// * USER QUERY
		// **
		user: {
			type: UserType,
			args: {
				id: { type: GraphQLString }
			},
			resolve:  async ( global, args, context, info ) => {
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
			resolve: async ( global, args, context, info ) => await PostCollection.findOne({ '_id': args.id })
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve: async (parentValue, args) => await PostCollection.find({})
		},
		postsByUser: {
			type: new GraphQLList(PostType),
			args: {
				id: { type: GraphQLString }
			},
			resolve: async (parentValue, args) => await PostCollection.find({ 'user': args.id })
		}
	}
});

const Subscription = new GraphQLObjectType({
	name: 'Subscription',
	fields: {
		postAdded: {
			type: PostType,
			subscribe: () => pubsub.asyncIterator(POST_ADDED)
		}
	},
});

const schema =  new GraphQLSchema({
	query: RootQuery,
	mutation: mutation,
	subscription: Subscription
});

export default schema;