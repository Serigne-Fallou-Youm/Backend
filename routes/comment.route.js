const express = require('express');
const router = express.Router();

const {
    creerComment,
    getCommentsByAnswer,
    supprimerComment
} = require('../controller/comment.controller');

const authMiddleware = require('../middlewares/user.middleware');


// ➜ Ajouter un commentaire
router.post('/:answerId', authMiddleware, creerComment);


// ➜ Récupérer les commentaires d'une réponse
router.get('/:answerId', getCommentsByAnswer);


// ➜ Supprimer un commentaire
router.delete('/:id', authMiddleware, supprimerComment);


module.exports = router;