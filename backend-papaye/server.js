const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 8082;

//Connexion to Database (URL in .env)
const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
  .catch(err => {
    console.log("Authentification to mongoose failed")
    console.log(err.message)
  });

const connection = mongoose.connection;
connection.once('open', () => { console.log("MongoDB database connection established successfully") });

app.use(cors());
app.use(express.json());

//routes
const userRoutes = require('./routes/users')
const exerciseRoutes = require('./routes/exercises')
const receipeRoutes = require('./routes/receipes')
const authRoutes = require('./routes/authentification')
const trainingRoutes = require('./routes/training')
const socialRoutes = require('./routes/socialposts')

app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/receipes', receipeRoutes);
app.use('/trainings', trainingRoutes);
app.use('/social', socialRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));