let Word = require('./word.model');

function createWord(req, res, next) {
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
    word.save().then(data => {
        res.status(201).send(data);
    }).catch(next);
}

function getAllWords(req, res, next) {
    Word.find().then(data => {
        res.status(200).send(data);
    }).catch(next);
}

function getWordById(req, res, next) {
    Word.findById(req.params.id).then(data => {
        res.status(200).send(data);
    }).catch(next);
}

function getWordsByLanguage(req, res, next) {
    Word.find({ lang: req.params.language }).then(data => {
        res.status(200).send(data);
    }).catch(next);
}

function getAllLanguages(req, res, next) {
    Word.find({}, { _id: 0, lang: 1 }).then(data => {
        data = removeDuplicates(data, 'lang');
        res.status(200).send(data);
    }).catch(next);
}

function getAllCategoriesByLanguage(req, res, next) {
    Word.find({}, { _id: 0, category: 1 })
        .find({ lang: req.params.language })
        .then(data => {
            data = removeDuplicates(data, 'category')
            res.status(200).send(data);
        }).catch(next);
}

function getWordsByLanguageAndCategory(req, res, next) {
    Word.find({ lang: req.params.language, category: req.params.category })
        .then(data => {
            res.status(200).send(data);
        }).catch(next);
}

function updateWord(req, res, next) {
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
    Word.findByIdAndUpdate(req.params.id, {
        text: req.body.text,
        lang: req.body.lang,
        translation: req.body.translation,
        category: req.body.category,
        description: req.body.description
    }, { new: true }).then(data => {
        res.status(200).send(data);
    }).catch(next);
}

function deleteWord(req, res, next) {
    Word.findByIdAndRemove(req.params.id).then(data => {
        res.status(200).send('Word deleted succesfully!');
    }).catch(next);
}

// Removes duplicate languages or categories 
// Is sync which is bad.. 
function removeDuplicates(data, duplicateType) {
    let collection = {};
    // removes duplicates from collection
    data.forEach(function (item) {
        if (duplicateType === 'lang') {
            collection[item.lang] = collection[item.lang] || {};
        }
        if (duplicateType === 'category') {
            collection[item.lang] = collection[item.lang] || {};
        }
    });
    JSON.stringify(collection);
    // make the output data look pretty
    let outputData = [];
    for (let thing in collection) {
        if (duplicateType === 'lang') {
            outputData.push({ lang: thing });
        }
        if (duplicateType === 'category') {
            outputData.push({ category: thing });
        }
    }
    JSON.stringify(outputData);
    return outputData;
}

module.exports = {
    getAllWords: getAllWords,
    getAllLanguages: getAllLanguages,
    getAllCategoriesByLanguage: getAllCategoriesByLanguage,
    getWordsByLanguage: getWordsByLanguage,
    getWordsByLanguageAndCategory: getWordsByLanguageAndCategory,
    getWordById: getWordById,
    createWord: createWord,
    updateWord: updateWord,
    deleteWord: deleteWord
};