const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/user.middleware");

const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  likeQuestion,
  dislikeQuestion,
  getByTag,
  searchQuestions,
  markBestAnswer,
} = require("../controller/question.controller");

// ======================
// ROUTES SPÉCIFIQUES
// ======================

// Rechercher une question
router.get("/search", searchQuestions);

// Questions par tag
router.get("/tag/:tag", getByTag);

// Liste des questions
router.get("/", getAllQuestions);

// Détail d'une question
router.get("/:id", getQuestionById);

// ======================
// ROUTES PROTÉGÉES
// ======================

// Créer une question
router.post("/", authMiddleware, createQuestion);

// Modifier une question
router.put("/:id", authMiddleware, updateQuestion);

// Supprimer une question
router.delete("/:id", authMiddleware, deleteQuestion);

// Like
router.patch("/:id/like", authMiddleware, likeQuestion);

// Dislike
router.patch("/:id/dislike", authMiddleware, dislikeQuestion);

// Définir la meilleure réponse
router.patch(
  "/:questionId/best/:answerId",
  authMiddleware,
  markBestAnswer
);

module.exports = router;