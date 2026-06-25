const express = require("express");
const router = express.Router();

const Answer = require("../models/answer.model");

const {
  addAnswer,
  getAnswersByQuestion,
  deleteAnswer,
  voteAnswer,
  updateAnswer,
} = require("../controller/answer.controller");

const authMiddleware = require("../middlewares/user.middleware");

// ======================
// ADD ANSWER
// ======================
router.post("/:questionId", authMiddleware, addAnswer);

// ======================
// GET ANSWERS
// ======================
router.get("/:questionId", getAnswersByQuestion);

// ======================
// UPDATE ANSWER
// ======================
router.put("/:answerId", authMiddleware, updateAnswer);

// ======================
// VOTE
// ======================
router.patch("/vote/:answerId", authMiddleware, voteAnswer);

// ======================
// DELETE
// ======================
router.delete("/:answerId", authMiddleware, deleteAnswer);

// ======================
// COMMENT
// ======================
router.post("/:answerId/comment", authMiddleware, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answerId);

    if (!answer) {
      return res.status(404).json({
        message: "Réponse introuvable",
      });
    }

    if (!answer.comments) answer.comments = [];

    answer.comments.push({
      user: req.user.id,
      text: req.body.text,
    });

    await answer.save();

    res.json(answer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;