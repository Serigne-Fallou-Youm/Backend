const express = require('express');
const router = express.Router();

const {
    getAllTags,
    getQuestionsByTag
} = require('../controller/tag.controller');


// tous les tags
router.get('/', getAllTags);

// questions par tag
router.get('/:tag', getQuestionsByTag);


module.exports = router;