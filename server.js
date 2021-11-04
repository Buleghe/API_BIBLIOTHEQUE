const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');

const bookRoutes = require('./routes/books.routes')
const memoireRoutes = require('./routes/memoire.routes');

require('dotenv').config({path: './config/.env'});

require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();


// const corsOptions = {
//   origin: process.env.CLIENT_URL,
  
//   credentials: true,
//   'allowedHeaders': ['sessionId', 'Content-Type'],
//   'exposedHeaders': ['sessionId'],
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'preflightContinue': false,
//   "optionsSuccessStatus": 204
// }
// app.use(cors(corsOptions));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload())
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// routes
app.use('/api/user', userRoutes);

app.use('/api/book',bookRoutes);
app.use('/api/memoire',memoireRoutes)
app.get('/test',(req,res)=>{
  res.status(200).json({message:'ressut'})
})

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})