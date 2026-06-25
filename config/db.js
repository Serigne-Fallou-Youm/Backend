const mongoose = require('mongoose');


// creation de la fonction qui gere la connexion avec la bd

const connectDB = async () => {

    try {
        // attendre la base de donnee
        await mongoose.connect(process.env.URL_MONGO);
        console.log('MongoDB connecte');
    }catch (error) {
        // recuperer les erreurs
            console.log('erreur mongoDB');
            console.log('erreur mongoDB',error);

            //process.exit(0)-> le programme s'est termine normalement (succes)
            //process.exit(1)-> le programme s'est termine a cause d'une erreur

            process.exit(1);
    }
}
module.exports = connectDB; 