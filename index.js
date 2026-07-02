const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');

dotenv.config();

const app = express();


// ======================
// CONNEXION BDD
// ======================
connectDB();


// ======================
// MIDDLEWARES
// ======================

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://front-node-flame.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());



// ======================
// ROUTES API
// ======================

const tagRoute = require('./routes/tag.route');
const userProfileRoute = require('./routes/userProfile.route');


app.use('/api/user', userProfileRoute);

app.use('/api/tags', tagRoute);


// Auth
app.use('/api/auth', require('./routes/user.route'));


// Questions
app.use('/api/questions', require('./routes/question.route'));




// Answers
app.use('/api/answers', require('./routes/answer.route'));


// Comments
app.use('/api/comments', require('./routes/comment.route'));



// ======================
// TEST
// ======================

app.get('/', (req,res)=>{
    res.send("🚀 Backend Mini StackOverflow fonctionne correctement");
});



// ======================
// PORT
// ======================

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});