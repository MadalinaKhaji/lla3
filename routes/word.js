let express = require('express');

let router = express.Router();

const config = require("../config/database");
const WordModel = require("../models/word.model");

// Save Word
router.post('/word', function(req, res, next) {
    if(!req.body) {
        return res.status(400).send('Request body is missing!');
    }

    let model = new WordModel(req.body);
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                return res.status(500).send(doc);
            }
            res.status(201).send(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

// Get All Words
router.get('/words', function(req, res, next) {
    WordModel.find(function(err, words) {
        if(err) {
            res.send(err);
        }
        res.json(words);
    });
});

// Get Word by Category 
router.get('/word', function(req, res) {
    // need to check for all required fields !
    if(!req.query.category) {
        return res.status(400).send('Missing URL parameter: category');
    }

    WordModel.findOne({
        category: req.query.category
    })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

// Update Word
router.put('/word', function(req, res) {
    if(!req.query.category) {
        return res.status(400).send('Missing URL parameter: category');
    }

    WordModel.findOneAndUpdate({
        category: req.query.category
    },  req.body, { 
        new : true 
    })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

// Delete Word
router.delete('/word', function(req, res) {
    if(!req.query.category) {
        return res.status(400).send('Missing URL parameter: category');
    }

    WordModel.findOneAndRemove({
        category: req.query.category
    })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});


router.get('/error', function(req, res) {
    throw new Error('This a forced error to test 500.');
})

module.exports = router;