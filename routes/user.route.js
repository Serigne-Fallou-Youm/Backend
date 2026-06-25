const express = require("express");

const { 
    inscription, 
    connexion,
    getProfile
} = require("../controller/user.controller");


const router = express.Router();



router.post("/inscription", inscription);

router.post("/connexion", connexion);


router.get("/profile/:id", getProfile);



module.exports = router;