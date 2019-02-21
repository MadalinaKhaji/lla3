let express = require('express');

let app = express();

let cors = require('cors');

app.use(cors());

let bodyParser = require('body-parser');

app.use(bodyParser.json());

let mongoose = require('mongoose');
let config = require('./api/config/database');

mongoose.Promise = global.Promise;

mongoose.connect(config.url, { useNewUrlParser: true })
    .then(function () {
        console.log('Succesfully connected to the db');
    })
    .catch(function (err) {
        console.log('Error connecting to the db. Ending process..', err);
        process.exit();
    });

app.use(function (req, res, next) {
    console.log(new Date().toString() + " => " + req.originalUrl + req.body);
    next();
});

let path = require('path');

app.use(express.static(path.join(__dirname, './api/public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api', function (req, res) {
    res.json(
        {
            status: 'Working API',
            message: 'Welcome to the LLA3 api'
        }
    );
});

let wordRoute = require('./api/routes/word.routes');

app.use('/api', wordRoute);

app.use(function (req, res, next) {
    res.status(404).send('Error 404 - We found nothing - Try something else!');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Error 500 - Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("App is running on port " + PORT);
});