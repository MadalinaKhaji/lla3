let express = require('express');

let app = express();

let wordRoute = require('./routes/word');

let path = require('path');

let bodyParser = require('body-parser');

app.use(bodyParser.json());

let mongoose = require('mongoose');

let config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', function() {
    console.log('Connected to db: ' + config.database);
});

mongoose.connection.on('error', function(err) {
    console.log('Db error: ' + err);
})

app.use(function(req, res, next) {
    console.log(new Date().toString() + " => " + req.originalUrl + req.body);
    next();
})

app.use(wordRoute);

app.use(express.static('public'));

app.use(function(req, res, next) {
    res.status(404).send('We found nothing! Try something else..');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, 'public/500.html'));
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("App is running on port " + PORT);
});