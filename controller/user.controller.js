const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Question = require('../models/question.model');
const Answer = require('../models/answer.model');



// ======================
// INSCRIPTION
// ======================

exports.inscription = async (req, res) => {

    try {

        const { prenom, nom, email, password } = req.body;


        const userExiste = await User.findOne({ email });


        if (userExiste) {

            return res.status(400).json({
                message: "Utilisateur existe déjà"
            });

        }


        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);



        const user = await User.create({

            prenom,
            nom,
            email,
            password: hashPassword

        });



        res.status(201).json({

            message: "Inscription réussie",

            user: {

                id: user._id,
                prenom: user.prenom,
                nom: user.nom,
                email: user.email

            }

        });



    } catch(error) {


        console.log(error);


        res.status(500).json({

            message:"Erreur serveur"

        });

    }

};






// ======================
// CONNEXION
// ======================


exports.connexion = async (req,res)=>{


    try{


        const {email,password} = req.body;



        const user = await User.findOne({email});



        if(!user){


            return res.status(400).json({

                message:"Utilisateur introuvable"

            });

        }




        const passwordCorrect = await bcrypt.compare(

            password,

            user.password

        );




        if(!passwordCorrect){


            return res.status(400).json({

                message:"Mot de passe incorrect"

            });


        }





        const token = jwt.sign(

            {
                id:user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"1d"
            }

        );





        res.json({


            message:"Connexion réussie",


            token,


            user:{


                id:user._id,

                prenom:user.prenom,

                nom:user.nom,

                email:user.email


            }


        });



    }catch(error){


        console.log(error);


        res.status(500).json({

            message:"Erreur serveur"

        });


    }


};







// ======================
// PROFIL UTILISATEUR
// ======================


exports.getProfile = async (req,res)=>{


    try{


        const userId = req.params.id;



        const user = await User.findById(userId)
            .select("-password");



        if(!user){


            return res.status(404).json({

                message:"Utilisateur introuvable"

            });


        }





        // Questions de l'utilisateur

        const questions = await Question.find({

            auteur:userId

        });







        // Réponses de l'utilisateur

        const answers = await Answer.find({

            author:userId

        }).populate("question");







// Calcul des likes reçus

let totalVotes = 0;

// Likes reçus sur les questions
questions.forEach((question) => {
    totalVotes += question.likes.length;
});

// Si ton modèle Answer possède aussi des likes
answers.forEach((answer) => {
    if (answer.likes) {
        totalVotes += answer.likes.length;
    }
});






        res.json({


            user,



            statistiques:{


                questions: questions.length,


                reponses: answers.length,


                votes: totalVotes


            },



            mesQuestions: questions,


            mesReponses: answers



        });






    }catch(error){


        console.log(error);



        res.status(500).json({

            message:"Erreur serveur"

        });


    }


};