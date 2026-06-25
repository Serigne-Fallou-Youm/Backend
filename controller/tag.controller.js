const Question = require('../models/question.model');


// ======================
// TOUS LES TAGS UNIQUES
// ======================

exports.getAllTags = async (req, res) => {

    try {

        const questions = await Question.find({}, 'tags');

        let tags = [];

        questions.forEach(q => {
            tags = tags.concat(q.tags);
        });

        const uniqueTags = [...new Set(tags)];

        res.json(uniqueTags);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// ======================
// QUESTIONS PAR TAG
// ======================

exports.getQuestionsByTag = async (req, res) => {

    try {

        const questions = await Question.find({
            tags: req.params.tag
        })
        .populate("auteur", "prenom nom")
        .sort({ createdAt: -1 });

        res.json(questions);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};