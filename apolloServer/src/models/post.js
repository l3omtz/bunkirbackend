import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: { type: String },
    user: { type: String }
})

export const PostCollection = mongoose.model('posts', postSchema);
module.exports = mongoose.model('posts', postSchema);
export default PostCollection;
