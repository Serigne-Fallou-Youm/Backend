const Question = require("../models/question.model");
const Answer = require("../models/answer.model");

// ======================
// CREATE QUESTION
// ======================
exports.createQuestion = async (req, res) => {
  try {
    const { titre, description, tags } = req.body;

    const question = await Question.create({
      titre,
      description,
      tags,
      auteur: req.user.id,
    });

    res.status(201).json({
      message: "Question créée",
      question,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// GET ALL QUESTIONS
// ======================
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("auteur", "prenom nom")
      .sort({ createdAt: -1 });

    const result = await Promise.all(
      questions.map(async (q) => {
        const reponses = await Answer.countDocuments({
          question: q._id,
        });

        return {
          ...q.toObject(),
          reponses,
        };
      })
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// GET QUESTION BY ID
// ======================
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      "auteur",
      "prenom nom"
    );

    if (!question) {
      return res.status(404).json({
        message: "Question introuvable",
      });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// UPDATE QUESTION
// ======================
exports.updateQuestion = async (req, res) => {
  try {
    const { titre, description, tags } = req.body;

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question introuvable",
      });
    }

    question.titre = titre || question.titre;
    question.description = description || question.description;
    question.tags = tags || question.tags;

    await question.save();

    res.json({
      message: "Question modifiée",
      question,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// DELETE QUESTION
// ======================
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question introuvable",
      });
    }

    await Question.findByIdAndDelete(req.params.id);

    res.json({
      message: "Question supprimée",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// VOTE QUESTION
// ======================
exports.voteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question introuvable",
      });
    }

    question.votes = (question.votes || 0) + 1;

    await question.save();

    res.json({
      message: "Vote ajouté",
      votes: question.votes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// BEST ANSWER
// ======================
exports.markBestAnswer = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      return res.status(404).json({
        message: "Question introuvable",
      });
    }

    question.bestAnswer = req.params.answerId;

    await question.save();

    res.json({
      message: "Meilleure réponse définie",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// SEARCH QUESTIONS
// ======================
exports.searchQuestions = async (req, res) => {
  try {
    const { q } = req.query;

    const questions = await Question.find({
      titre: {
        $regex: q || "",
        $options: "i",
      },
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// FILTER BY TAG
// ======================
exports.getByTag = async (req, res) => {
  try {
    const questions = await Question.find({
      tags: req.params.tag,
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};