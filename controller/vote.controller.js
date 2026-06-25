const Question = require('../models/question.model');
const Answer = require('../models/answer.model');




// ======================
// VOTER UNE QUESTION
// ======================


exports.voteQuestion = async(req,res)=>{


    try{


        const {type} = req.body;


        const question = await Question.findById(req.params.id);



        if(!question){

            return res.status(404).json({

                message:"Question introuvable"

            });

        }



        if(type === "up"){

            question.votes += 1;

        }


        if(type === "down"){

            question.votes -= 1;

        }



        await question.save();



        res.json({

            message:"Vote enregistré",

            votes:question.votes

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};










// ======================
// VOTER UNE REPONSE
// ======================


exports.voteAnswer = async(req,res)=>{


    try{


        const {type} = req.body;



        const answer = await Answer.findById(req.params.id);



        if(!answer){

            return res.status(404).json({

                message:"Réponse introuvable"

            });

        }




        if(type === "up"){


            answer.votes += 1;


        }



        if(type === "down"){


            answer.votes -= 1;


        }



        await answer.save();




        res.json({

            message:"Vote enregistré",

            votes:answer.votes

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};