const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    contenu: {
        type: String,
        required: true
    },

    answer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
        required: true
    },

    auteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true });


module.exports = mongoose.model('Comment', commentSchema);