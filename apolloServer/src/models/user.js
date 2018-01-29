import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    dob: { type: String },
    email: { type: String },
    imgUrl: { type: String },
    name: { type: String },
    phone: { type: String }
})

export const UserCollection = mongoose.model('users', userSchema);
export default UserCollection;
