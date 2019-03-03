let mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/lladb';

mongoose.Promise = global.Promise;

mongoose.connect(url, { useNewUrlParser: true })
    .then(function () {
        console.log('Succesfully connected to the db');
    })
    .catch(function (err) {
        console.log('Error connecting to the db. Ending process..', err);
        process.exit();
    });