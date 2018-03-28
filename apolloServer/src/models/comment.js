import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: { type: String },
    userId: { type: String },
    postId: { type: String },
    timeStamp: { type: String }
})

module.exports = mongoose.model('comment', CommentSchema);
export default CommentSchema;