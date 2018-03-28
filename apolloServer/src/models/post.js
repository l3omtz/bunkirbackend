import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var CommentSchema = require('./comment.js').schema; //<-- .schema was added

const postSchema = new Schema({
    text: { type: String },
    user: { type: String },
    image: { type: String},
    timeStamp: { type: String },
    comments: [{ type: CommentSchema }],
})

export const PostCollection = mongoose.model('posts', postSchema);
module.exports = mongoose.model('posts', postSchema);
export default PostCollection;
