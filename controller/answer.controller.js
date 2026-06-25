const Answer = require("../models/answer.model");

// ======================
// AJOUT REPONSE
// ======================
exports.addAnswer = async (req, res) => {
  try {
    const { contenu } = req.body;

    if (!contenu) {
      return res.status(400).json({
        message: "Le contenu est obligatoire",
      });
    }

    const answer = new Answer({
      content: contenu,
      author: req.user.id,
      question: req.params.questionId,
      votes: 0,
      voters: [],
      comments: [],
    });

    await answer.save();

    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// GET ANSWERS BY QUESTION
// ======================
exports.getAnswersByQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({
      question: req.params.questionId,
    })
      .populate("author", "prenom nom")
      .sort({ createdAt: -1 });

    res.json(answers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// DELETE ANSWER (CORRIGÉ)
// ======================
exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answerId);

    if (!answer) {
      return res.status(404).json({
        message: "Réponse introuvable",
      });
    }

    // 🔥 IMPORTANT : sécurité (seul l'auteur peut supprimer)
    if (answer.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Non autorisé à supprimer cette réponse",
      });
    }

    await Answer.findByIdAndDelete(req.params.answerId);

    res.json({ message: "Réponse supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// UPDATE ANSWER
// ======================
exports.updateAnswer = async (req, res) => {
  try {
    const { contenu } = req.body;

    const answer = await Answer.findById(req.params.answerId);

    if (!answer) {
      return res.status(404).json({
        message: "Réponse introuvable",
      });
    }

    if (answer.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Non autorisé",
      });
    }

    answer.content = contenu || answer.content;

    await answer.save();

    res.json({
      message: "Réponse modifiée",
      answer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// VOTE ANSWER
// ======================
exports.voteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answerId);

    if (!answer) {
      return res.status(404).json({
        message: "Réponse introuvable",
      });
    }

    const userId = req.user.id;

    if (!answer.voters) answer.voters = [];
    if (!answer.votes) answer.votes = 0;

    const alreadyVoted = answer.voters.includes(userId);

    if (alreadyVoted) {
      answer.voters = answer.voters.filter(
        (id) => id.toString() !== userId
      );
      answer.votes = Math.max(0, answer.votes - 1);
    } else {
      answer.voters.push(userId);
      answer.votes += 1;
    }

    await answer.save();

    res.json({
      votes: answer.votes,
      liked: !alreadyVoted,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};