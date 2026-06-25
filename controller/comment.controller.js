const Comment = require('../models/comment.model');




// ======================
// AJOUTER UN COMMENTAIRE
// ======================


exports.creerComment = async (req, res) => {


    try {


        const { contenu, answer } = req.body;



        const comment = await Comment.create({

            contenu,

            answer,

            auteur: req.user.id

        });



        res.status(201).json({

            message:"Commentaire ajouté",

            comment

        });



    } catch(error) {


        console.log(error);


        res.status(500).json({

            message:"Erreur serveur"

        });


    }

};







// ======================
// AFFICHER LES COMMENTAIRES D'UNE REPONSE
// ======================


exports.getCommentsByAnswer = async(req,res)=>{


    try{


        const comments = await Comment.find({

            answer:req.params.answerId

        })

        .populate(
            "auteur",
            "prenom nom"
        )

        .sort({
            createdAt:-1
        });



        res.json(comments);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// ======================
// SUPPRIMER UN COMMENTAIRE
// ======================


exports.supprimerComment = async(req,res)=>{


    try{


        await Comment.findByIdAndDelete(req.params.id);



        res.json({

            message:"Commentaire supprimé"

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};