const User = require('../models/user.model');
const Question = require('../models/question.model');
const Answer = require('../models/answer.model');


// ======================
// PROFIL UTILISATEUR
// ======================

exports.getUserProfile = async (req, res) => {

    try {

        const userId = req.params.id;

        const user = await User.findById(userId).select('-password');

        const questions = await Question.find({ auteur: userId });

        const answers = await Answer.find({ auteur: userId });

        res.json({
            user,
            stats: {
                questions: questions.length,
                answers: answers.length
            },
            questions,
            answers
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};