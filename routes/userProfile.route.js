const express = require('express');
const router = express.Router();

const {
    getUserProfile
} = require('../controller/userProfile.controller');


// profil utilisateur
router.get('/:id', getUserProfile);


module.exports = router;