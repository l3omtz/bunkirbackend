import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DealsSchema = new Schema({
    text : { type: String},
    image : { type: String},
    company : { type: String},
})

export const DealsCollection = mongoose.model('deals', DealsSchema);
module.exports = mongoose.model('deals', DealsSchema);
export default DealsCollection