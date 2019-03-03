let express = require('express');
let wordService = require('./word.services');
let router = express.Router();

router.get('/', wordService.getAllWords);

router.get('/:id', wordService.getWordById);

router.get('/filter/lang', wordService.getAllLanguages);

router.get('/filter/lang/:language', wordService.getWordsByLanguage);

router.get('/filter/lang/cat/:language', wordService.getAllCategoriesByLanguage);

router.get('/filter/lang/cat/:language&:category', wordService.getWordsByLanguageAndCategory);

router.post('/', wordService.createWord);

router.put('/', wordService.updateWord);

router.delete('/', wordService.deleteWord);

module.exports = router;