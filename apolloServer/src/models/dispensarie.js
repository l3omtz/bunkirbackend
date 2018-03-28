import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DispensarieSchema = new Schema({
    Image: { type: String },
    lat: { type: String },
    lng: { type: String },
    name: { type: String },
    phone: { type: String },
    url: { type: String }
})

module.exports = mongoose.model('dispensaries', DispensarieSchema);
export default DispensarieSchema;
