// This file will hold our Mongoose model
const Mongoose = require('mongoose');

// The Schema
const PresidentSchema = Mongoose.Schema({
    name: String,
    party: String,
    term: String
})

// President is type of the schema
const President = Mongoose.model('President', PresidentSchema);

// export the model to use in the seed
module.exports = President;