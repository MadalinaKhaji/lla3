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

// Get words by language 
exports.findByLanguage = function (req, res) {
    Word.find( { lang: req.params.language })
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


// Get all languages from words and remove duplicates 
exports.findAllLanguages = function(req, res) {
    Word.find( {}, { _id: 0, lang: 1} )
        .then(data => {
            if (!data) {
                return res.status(404).send('Could not find word with lang: da-en');
            }

            // remove duplicates
            let languages = {};
            data.forEach(function(item) {
                languages[item.lang] = languages[item.lang] || {};
            });
            JSON.stringify(languages);

            // make the output data look pretty
            let outputData = [];
            for(let language in languages) {
                outputData.push({lang: language});
            }
            JSON.stringify(outputData);
            
            res.status(200).send(outputData);
        })
        .catch(err => {
            if (err.name === 'NotFound') {
                return res.status(404).send('Could not find word with lang: da-en');
            }
            return res.status(500).send('Error getting word with lang');
        });
}

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
        });
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
