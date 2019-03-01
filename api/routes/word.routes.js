let express = require('express');

let router = express.Router();

let words = require('../controllers/word.controller');

// Create new word
router.post('/words', words.create);

// Get all words
router.get('/words', words.findAll);

// Get word by id 
router.get('/words/:wordId', words.findOne);

// Get all languages from all the words 
// I do not like how this route looks 
router.get('/word/languages/', words.findAllLanguages);

// Update word with id 
router.put('/words/:wordId', words.update);

// Delete word with id
router.delete('/words/:wordId', words.delete);

module.exports = router;