let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');
let config = require('./api/config/database');

mongoose.connect(config.database, { useNewUrlParser: true });

let db = mongoose.connection;

db.on('connected', function () {
    console.log('Connected to db: ' + config.database);
});
db.on('error', function (err) {
    console.log('Db error: ' + err);
});

let app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log(new Date().toString() + " => " + req.originalUrl + req.body);
    next();
});

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

let wordRoute = require('./api/routes/words');

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