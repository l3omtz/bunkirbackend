import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const strainsSchema = new Schema({
    ailments : { type: String},
    cbd : { type: String},
    details : { type: String},
    imgUrl : { type: String},
    loc : { type: String},
    location : [
        { type: String}
    ],
    name : { type: String},
    ratio : { type: String},
    thc : { type: String},
    type : { type: String},
})

export const StrainCollection = mongoose.model('strains', strainsSchema);
export default StrainCollection;
