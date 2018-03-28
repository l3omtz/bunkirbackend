import mongoose from 'mongoose';
import postSchema from './post';
var PostSchema = require('./post.js').schema; //<-- .schema was added

const Schema = mongoose.Schema;

const userSchema = new Schema({
    dob: { type: String },
    email: { type: String },
    userImage: { type: String },
    name: { type: String },
    phone: { type: String },
    posts: [{ type: PostSchema }],
    password: { type: String },
    userName: { type: String },
    jwt: {type: String },
})

export const UserCollection = mongoose.model('users', userSchema);

export default UserCollection;
