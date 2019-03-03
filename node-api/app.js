let express = require('express');
let app = express();
let cors = require('cors');
let bodyParser = require('body-parser');
let path = require('path');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db = require('./config/database');

let wordRoute = require('./components/words/word.routes');

app.use('/api', wordRoute);

app.use(express.static(path.join(__dirname, './public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use(function (req, res, next) {
    res.status(404).send('Error 404 - We found nothing - Try something else!');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Error 500 - Something broke!');
});

module.exports = app;