const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/user.middleware');

const {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    deleteQuestion,
    voteQuestion,
    getByTag,
    searchQuestions,
    markBestAnswer
} = require('../controller/question.controller');


// ======================
// IMPORTANT: routes spécifiques AVANT /:id
// ======================

// search
router.get('/search', searchQuestions);

// tag
router.get('/tag/:tag', getByTag);

// create
router.post('/', authMiddleware, createQuestion);

// list
router.get('/', getAllQuestions);

// detail
router.get('/:id', getQuestionById);

// delete
router.delete('/:id', authMiddleware, deleteQuestion);

// vote
router.patch('/:id/vote', authMiddleware, voteQuestion);

// best answer
router.patch(
    '/:questionId/best/:answerId',
    authMiddleware,
    markBestAnswer
);

module.exports = router;