let Word = require('../models/word.model');

// Create and save new word to the db
exports.create = function (req, res) {
    if (!req.body) {
        return res.status(400).send('Request body is empty!');
    }

    if (!req.body.text) {
        return res.status(400).send('Required value for: text!');
    }

    if (!req.body.lang) {
        return res.status(400).send('Required value for: lang!');
    }

    if (!req.body.category) {
        return res.status(400).send('Required value for: category!');
    }

    let word = new Word({
        text: req.body.text,
        lang: req.body.lang,
        translation: req.body.translation,
        category: req.body.category,
        description: req.body.description
    });

    word.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

// Get and return all words from the db 
exports.findAll = function (req, res) {
    Word.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

// Get word by id 
exports.findOne = function (req, res) {
    Word.findById(req.params.wordId)
        .then(data => {
            if (!data) {
                return res.status(404).send('Could not find word with id: ' + req.params.wordId);
            }
            res.status(200).send(data);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send('Could not find word with id: ' + req.params.wordId);
            }
            return res.status(500).send('Error getting word with id: ' + req.params.wordId);
        });
};

// Update word by id
exports.update = function (req, res) {
    if (!req.body) {
        return res.status(400).send('Request body is empty!');
    }

    if (!req.body.text) {
        return res.status(400).send('Required value for: text!');
    }

    if (!req.body.lang) {
        return res.status(400).send('Required value for: lang!');
    }

    if (!req.body.category) {
        return res.status(400).send('Required value for: category!');
    }

    Word.findByIdAndUpdate(req.params.wordId, {
        text: req.body.text,
        lang: req.body.lang,
        translation: req.body.translation,
        category: req.body.category,
        description: req.body.description
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send('Could not find word with id: ' + req.params.wordId);
            }
            res.status(200).send(data);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send('Could not find word with id: ' + req.params.wordId);
            }
            return res.status(500).send('Error getting word with id: ' + req.params.wordId);
        })
};

// Delete word by id 
exports.delete = function (req, res) {
    Word.findByIdAndRemove(req.params.wordId)
    .then(data => {
        if (!data) {
            return res.status(404).send('Could not find word with id: ' + req.params.wordId);
        }
        res.status(200).send('Word deleted succesfully!');
    })
    .catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send('Could not find word with id: ' + req.params.wordId);
        }
        return res.status(500).send('Could not delete word with id: ' + req.params.wordId);
    });
};
