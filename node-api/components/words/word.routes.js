let express = require('express');
let wordController = require('./word.controller');
let router = express.Router();

router.use('/words', wordController);

module.exports = router;