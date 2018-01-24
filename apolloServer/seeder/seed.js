// This file will hold the code that will seed our database with the our data we create
const request = require('request-promise');
const President = require('./model');

const seed = () => {
    request('https://mysafeinfo.com/api/data?list=presidents&format=json')
    .then(res => JSON.parse(res))
    .then(res => {
        // Map through the data and set it to match our schema.
        const data = res.map( (d) => {
            const obj = {};
            obj.name = d.nm;
            obj.partt = d.pp;
            obj.term = d.tm;
            return obj;
        });
        // Use forEach function on the returned data and populate the database with this data.
        data.forEach(d => {
            const president = new President(d);
            president.save( (err, item) => {
                // console.log(item); 
            });
        });
    })
    .catch(err => {
        console.error(err);
    });
};

// Exports seed function 
module.exports = seed;