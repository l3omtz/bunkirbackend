import { model } from 'mongoose';

// This file will hold our connector. 
// A connector is the piece of code that links a GraphQL server to a specific backend (MongoDB, S3).
const PresidentModel = require('./model');

class President {
    constructor() {
        this.findPresident = (name) => {
            const person = PresidentModel.findOne({name}, (err, data) => {
                return data;
            });
            return person;
        }
    }
};

module.exports = { President };