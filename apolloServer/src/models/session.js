import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema model of data 
const sessionSchema = new Schema({
    day: { type: Number },
    slot: { type: String },
    title: { type: String },
    speakers: [{ type: String }]
});

const strainsSchema = new Schema({
    // _id: { type: String},
    ailments : { type: String},
    cbd : { type: String},
    details : { type: String},
    imgUrl : { type: String},
    loc : { type: String},
    location : [
        { type: String},
    ],
    name : { type: String},
    ratio : { type: String},
    thc : { type: String},
    type : { type: String},
})

export const StrainCollection = mongoose.model('strains', strainsSchema);
export default StrainCollection;
